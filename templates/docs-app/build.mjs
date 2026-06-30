#!/usr/bin/env node
/* ============================================================
   docs-app — static docs builder
   Turns a tree of Markdown (with Docusaurus-style frontmatter,
   _category_.json grouping, ```mermaid blocks, and :::callouts)
   into a static, token-driven docs site. Zero runtime deps in the
   output (Mermaid loads from CDN in the browser).

   Usage:  node build.mjs            # reads docs.config.json in CWD
           node build.mjs --serve    # build, then serve build/ on :3000
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const CWD = process.cwd();

// ---- config ----
const cfgPath = path.join(CWD, "docs.config.json");
if (!fs.existsSync(cfgPath)) {
  console.error("✗ docs.config.json not found in", CWD);
  process.exit(1);
}
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const SITE_TITLE = cfg.title || "Docs";
const LANG = cfg.lang || "en";
const DOCS_DIR = path.resolve(CWD, cfg.docsDir || "docs");
const OUT_DIR = path.resolve(CWD, cfg.outDir || "build");
const TOPBAR_LINKS = (cfg.topbarLinks || [])
  .map((l) => `<a class="topbar-link" href="${l.href}">${esc(l.label)}</a>`)
  .join("\n    ");
const EDIT_BASE = cfg.editUrlBase || null;
// theme can override template tokens.css; default = template's own
const THEME_TOKENS = cfg.tokens ? path.resolve(CWD, cfg.tokens) : path.join(__dirname, "tokens.css");
// static assets dir copied verbatim into build/static (favicon, images...)
const STATIC_DIR = path.resolve(CWD, cfg.staticDir || "static");
const FAVICON = cfg.favicon || null; // path relative to staticDir, e.g. "img/favicon.ico"

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false,
  highlight(code, lang) {
    if (lang === "mermaid") {
      return `<pre class="mermaid">${esc(code).replace(/\n$/, "")}</pre>`;
    }
    if (lang && hljs.getLanguage(lang)) {
      try { return `<pre><code class="hljs language-${lang}">${hljs.highlight(code, { language: lang }).value}</code></pre>`; } catch {}
    }
    return `<pre><code class="hljs">${esc(code)}</code></pre>`;
  },
});

// heading ids + anchors + collect TOC
let slugCounts = Object.create(null);
function slugify(s) {
  let base = s.toLowerCase().trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\u00c0-\uffff\- ]/g, "")
    .replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "section";
  if (slugCounts[base] == null) { slugCounts[base] = 0; return base; }
  slugCounts[base]++; return base + "-" + slugCounts[base];
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---- frontmatter (minimal YAML: scalar + simple [..] arrays) ----
function parseFrontmatter(raw) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split("\n")) {
    const mm = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!mm) continue;
    let v = mm[2].trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(",").map((x) => x.trim()).filter(Boolean);
    else if (/^["'].*["']$/.test(v)) v = v.slice(1, -1);
    data[mm[1]] = v;
  }
  return { data, body: raw.slice(m[0].length) };
}

// ---- Docusaurus admonitions  :::type title \n ... \n:::  -> .callout html ----
function transformAdmonitions(src) {
  const lines = src.split("\n");
  const out = [];
  const icons = { note: "●", tip: "✦", info: "ℹ", warning: "▲", caution: "▲", danger: "▲" };
  const cls = { note: "", tip: "", info: "", warning: "warn", caution: "caution", danger: "danger" };
  let i = 0;
  while (i < lines.length) {
    const open = /^:::(\w+)(?:\s+(.*))?$/.exec(lines[i]);
    if (open) {
      const type = open[1].toLowerCase();
      const title = (open[2] || type).trim();
      const buf = [];
      i++;
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++; // skip closing :::
      const inner = md.render(buf.join("\n"));
      out.push(
        `<div class="callout ${cls[type] || ""}"><span class="ico" aria-hidden="true">${icons[type] || "●"}</span>` +
        `<div class="body"><div class="callout-title">${esc(title)}</div>${inner}</div></div>`
      );
    } else { out.push(lines[i]); i++; }
  }
  return out.join("\n");
}

// ---- markdown-it render with heading id injection + TOC capture ----
import Token from "markdown-it/lib/token.mjs";
function renderMarkdown(body) {
  slugCounts = Object.create(null);
  const toc = [];
  const tokens = md.parse(transformAdmonitions(body), {});
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === "heading_open" && (t.tag === "h2" || t.tag === "h3")) {
      const inline = tokens[i + 1];
      const text = inline.content;
      const id = slugify(text);
      t.attrSet("id", id);
      // append anchor link to heading content
      const anchor = new Token("html_inline", "", 0);
      anchor.content = ` <a class="heading-anchor" href="#${id}" aria-label="이 섹션 링크">#</a>`;
      inline.children.push(anchor);
      toc.push({ level: t.tag === "h3" ? 3 : 2, id, text });
    }
  }
  return { html: md.renderer.render(tokens, md.options, {}), toc };
}

// ---- link rewriting: Docusaurus doc links -> .html paths ----
function rewriteLinks(html, pageDepth) {
  return html.replace(/(href=")([^"]*?)(#[^"]*)?(")/g, (full, a, p, hash, z) => {
    if (p == null || p === "") return full;
    if (/^(https?:|mailto:|tel:|#)/.test(p)) return full;            // external / pure-hash
    if (/\.[a-z0-9]{2,5}$/i.test(p)) return full;                    // already has an extension (.html, .png, .pdf...)
    // absolute doc link: /kalyx/overview -> <root>kalyx/overview.html ; "/" -> index
    if (p.startsWith("/")) {
      let target = p === "/" ? "index" : p.replace(/^\//, "").replace(/\/$/, "");
      const root = "../".repeat(pageDepth) || "./";
      return `${a}${root}${target}.html${hash || ""}${z}`;
    }
    // relative doc link: ./business-model , ../cheeu-backend/overview -> append .html
    return `${a}${p.replace(/\/$/, "")}.html${hash || ""}${z}`;
  });
}

// ---- collect docs tree ----
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(full));
    else if (e.name.endsWith(".md") || e.name.endsWith(".mdx")) files.push(full);
  }
  return files;
}

function relId(file) {
  return path.relative(DOCS_DIR, file).replace(/\.(md|mdx)$/, "").split(path.sep).join("/");
}

// build pages model
const files = walk(DOCS_DIR);
const pages = files.map((file) => {
  const raw = fs.readFileSync(file, "utf8");
  const { data, body } = parseFrontmatter(raw);
  const id = relId(file); // e.g. "kalyx/overview" or "index"
  const slug = data.slug === "/" ? "index" : (data.slug ? data.slug.replace(/^\//, "") : id);
  const seg = id.split("/");
  const group = seg.length > 1 ? seg[0] : null;
  // title: frontmatter.title > first H1 > sidebar_label > id
  const h1 = /^#\s+(.+)$/m.exec(body);
  const title = data.title || (h1 ? h1[1].trim() : null) || data.sidebar_label || seg[seg.length - 1];
  return {
    file, id, slug, group, body, data,
    title,
    sidebarLabel: data.sidebar_label || title,
    sidebarPos: data.sidebar_position != null ? Number(data.sidebar_position) : 999,
    outRel: slug + ".html",
    depth: slug.split("/").length - 1,
  };
});

// group metadata from _category_.json
const groups = {};
for (const p of pages) {
  if (!p.group) continue;
  if (!groups[p.group]) {
    const catPath = path.join(DOCS_DIR, p.group, "_category_.json");
    let label = p.group, position = 999, linkId = null;
    if (fs.existsSync(catPath)) {
      try {
        const c = JSON.parse(fs.readFileSync(catPath, "utf8"));
        label = c.label || label;
        position = c.position != null ? c.position : position;
        if (c.link && c.link.type === "doc") linkId = c.link.id;
      } catch {}
    }
    groups[p.group] = { key: p.group, label, position, linkId, pages: [] };
  }
  groups[p.group].pages.push(p);
}
for (const g of Object.values(groups)) g.pages.sort((a, b) => a.sidebarPos - b.sidebarPos || a.title.localeCompare(b.title));

const rootPages = pages.filter((p) => !p.group).sort((a, b) => a.sidebarPos - b.sidebarPos);
const sortedGroups = Object.values(groups).sort((a, b) => a.position - b.position || a.label.localeCompare(b.label));

// fast lookup by doc id
const byId = new Map(pages.map((p) => [p.id, p]));

// ---- nav model: explicit cfg.nav (supports nesting) OR auto-generated ----
// node forms:
//   "kalyx/overview"                      -> single doc link
//   { doc: "kalyx/overview" }             -> single doc link
//   { group, link?, items: [...] }        -> (nestable) section
function buildNavTree() {
  if (Array.isArray(cfg.nav) && cfg.nav.length) return cfg.nav.map(normalizeNavNode);
  // auto: root pages, then groups (one level)
  const tree = [];
  for (const p of rootPages) tree.push({ doc: p.id });
  for (const g of sortedGroups) {
    tree.push({ group: g.label, link: g.linkId || undefined, items: g.pages.map((p) => ({ doc: p.id })) });
  }
  return tree;
}
function normalizeNavNode(node) {
  if (typeof node === "string") return { doc: node };
  if (node.items) return { group: node.group, link: node.link, items: node.items.map(normalizeNavNode) };
  return { doc: node.doc, label: node.label };
}
const navTree = buildNavTree();

// flatten nav to an ordered list of pages for prev/next + a quick parent-chain map
const ordered = [];
const crumbMap = new Map(); // pageId -> [ancestor group labels]
(function flatten(nodes, chain) {
  for (const n of nodes) {
    if (n.items) {
      flatten(n.items, chain.concat(n.group));
    } else if (n.doc && byId.has(n.doc)) {
      const p = byId.get(n.doc);
      if (!ordered.includes(p)) ordered.push(p);
      crumbMap.set(p.id, chain);
    }
  }
})(navTree, []);
// any pages not referenced in nav: append so they still build/link
for (const p of pages) if (!ordered.includes(p)) { ordered.push(p); if (!crumbMap.has(p.id)) crumbMap.set(p.id, p.group && groups[p.group] ? [groups[p.group].label] : []); }


// ---- render sidebar from nav tree (recursive, nestable) ----
function sidebarHtml(current) {
  function render2(nodes, level) {
    let out = "";
    for (const n of nodes) {
      if (n.items) {
        const linkPage = n.link ? byId.get(n.link) : null;
        const activeGroup = linkPage && linkPage === current ? " active" : "";
        const titleHtml = linkPage
          ? `<a class="group-title${activeGroup}" href="${relHref(current, linkPage)}">${esc(n.group)}</a>`
          : `<span class="group-title">${esc(n.group)}</span>`;
        out += `<div class="group lvl-${level}">${titleHtml}<div class="group-items">${render2(n.items, level + 1)}</div></div>`;
      } else if (n.doc && byId.has(n.doc)) {
        const p = byId.get(n.doc);
        const label = n.label || p.sidebarLabel;
        const active = p === current ? " active" : "";
        out += `<a class="nav-link lvl-${level}${active}" href="${relHref(current, p)}">${esc(label)}</a>`;
      }
    }
    return out;
  }
  return render2(navTree, 0);
}

function relHref(from, to) {
  const root = "../".repeat(from.depth) || "./";
  return root + to.outRel;
}

function tocHtml(toc) {
  if (!toc.length) return '<div style="color:var(--color-text-secondary);font-size:var(--fs-caption)">—</div>';
  return toc.map((h) => `<a class="${h.level === 3 ? "sub" : ""}" href="#${h.id}">${esc(h.text)}</a>`).join("\n");
}

function breadcrumbs(p) {
  const chain = crumbMap.get(p.id) || [];
  const parts = chain.map(esc).concat(esc(p.title));
  return `<div class="breadcrumbs">${parts.join(" › ")}</div>`;
}

function pagerHtml(p) {
  const idx = ordered.indexOf(p);
  const prev = ordered[idx - 1], next = ordered[idx + 1];
  if (!prev && !next) return "";
  let h = `<nav class="pager" aria-label="Page navigation">`;
  h += prev ? `<a href="${relHref(p, prev)}"><div class="label">이전</div><div class="title">← ${esc(prev.title)}</div></a>` : `<span></span>`;
  h += next ? `<a class="next" href="${relHref(p, next)}"><div class="label">다음</div><div class="title">${esc(next.title)} →</div></a>` : `<span></span>`;
  h += `</nav>`;
  return h;
}

// ---- mermaid loader (only on pages that use it) ----
function mermaidScript() {
  return `<script type="module">
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
function themeFor(t){ return t === "dark" ? "dark" : "neutral"; }
// stash original source so we can re-render on theme change
document.querySelectorAll(".mermaid").forEach(function(el){ el.setAttribute("data-src", el.textContent.trim()); });
function init(t){
  document.querySelectorAll(".mermaid").forEach(function(el){
    el.removeAttribute("data-processed");
    el.innerHTML = el.getAttribute("data-src");
  });
  mermaid.initialize({ startOnLoad:false, theme: themeFor(t), securityLevel:"loose", fontFamily:"var(--font-body)" });
  mermaid.run({ querySelector: ".mermaid" });
}
window.__rerenderMermaid__ = init;
init(document.documentElement.getAttribute("data-theme") || "light");
</script>`;
}

// ---- assemble ----
const shell = fs.readFileSync(path.join(__dirname, "shell.html"), "utf8");

function build() {
  if (fs.existsSync(OUT_DIR)) fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // assets + tokens
  fs.mkdirSync(path.join(OUT_DIR, "assets"), { recursive: true });
  fs.copyFileSync(path.join(__dirname, "assets", "styles.css"), path.join(OUT_DIR, "assets", "styles.css"));
  fs.copyFileSync(path.join(__dirname, "assets", "app.js"), path.join(OUT_DIR, "assets", "app.js"));
  fs.copyFileSync(THEME_TOKENS, path.join(OUT_DIR, "tokens.css"));
  // highlight.js base structural css (colors come from our tokens via .hljs-* mapping)
  fs.writeFileSync(path.join(OUT_DIR, "assets", "hljs.css"), "");

  // copy static/ verbatim (favicon, images) if present
  if (fs.existsSync(STATIC_DIR)) {
    fs.cpSync(STATIC_DIR, path.join(OUT_DIR, "static"), { recursive: true });
  }

  const searchIndex = [];

  for (const p of pages) {
    const { html: rendered, toc } = renderMarkdown(p.body);
    const usesMermaid = /class="mermaid"/.test(rendered);
    const root = "../".repeat(p.depth) || "./";
    const linked = rewriteLinks(rendered, p.depth);

    const descMeta = p.data.description
      ? `<meta name="description" content="${esc(p.data.description)}">`
      : "";

    const faviconTag = FAVICON
      ? `<link rel="icon" href="${root}static/${FAVICON}">`
      : "";

    let html = shell
      .replace(/{{LANG}}/g, LANG)
      .replace(/{{ROOT}}/g, root)
      .replace(/{{SITE_TITLE}}/g, esc(SITE_TITLE))
      .replace(/{{PAGE_TITLE}}/g, esc(p.title))
      .replace(/{{DESCRIPTION_META}}/g, descMeta)
      .replace(/{{FAVICON}}/g, faviconTag)
      .replace(/{{TOPBAR_LINKS}}/g, TOPBAR_LINKS)
      .replace(/{{SIDEBAR}}/g, sidebarHtml(p))
      .replace(/{{BREADCRUMBS}}/g, breadcrumbs(p))
      .replace(/{{CONTENT}}/g, linked)
      .replace(/{{PAGER}}/g, pagerHtml(p))
      .replace(/{{TOC}}/g, tocHtml(toc))
      .replace(/{{MERMAID}}/g, usesMermaid ? mermaidScript() : "");

    const outFile = path.join(OUT_DIR, p.outRel);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);

    // search index entry (strip html)
    const plain = rendered.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    searchIndex.push({
      url: p.outRel,
      title: p.title,
      crumb: (crumbMap.get(p.id) || []).join(" › ") || SITE_TITLE,
      text: plain.slice(0, 2000),
    });
  }

  fs.writeFileSync(path.join(OUT_DIR, "search-index.json"), JSON.stringify(searchIndex));
  console.log(`✓ built ${pages.length} pages → ${path.relative(CWD, OUT_DIR)}/`);
}

build();

// ---- optional dev server ----
if (process.argv.includes("--serve")) {
  const http = await import("node:http");
  const port = cfg.port || 3000;
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon" };
  http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p === "/") p = "/index.html";
    let file = path.join(OUT_DIR, p);
    if (!fs.existsSync(file)) { res.writeHead(404); res.end("404"); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  }).listen(port, () => console.log(`→ http://localhost:${port}`));
}
