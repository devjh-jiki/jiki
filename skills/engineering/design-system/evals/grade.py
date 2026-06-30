#!/usr/bin/env python3
"""Auto-grade design-system outputs against auto-checkable assertions.

Re-verification harness. Lay out an iteration dir as:
  <iter>/<eval-name>/with_skill/outputs/<file>
  <iter>/<eval-name>/without_skill/outputs/<file>
where <eval-name> is one of the names in evals.json. Then:

  python3 grade.py <iteration-dir>

Outputs are expected to be self-contained HTML (and review.md / design-system.md
where the eval calls for them). Writes grading.json into each run dir and prints
a summary. Only the 'auto' assertions are checked; 'human' ones need a person.
"""
import json, os, re, sys, glob

ITER = sys.argv[1] if len(sys.argv) > 1 else "."

def read(p): return open(p, encoding="utf-8", errors="ignore").read() if os.path.exists(p) else ""
def html_in(outdir, *names):
    for n in names:
        h = glob.glob(os.path.join(outdir, n))
        if h: return read(h[0])
    h = glob.glob(os.path.join(outdir, "*.html"));  return read(h[0]) if h else ""
def md_in(outdir, *names):
    for n in names:
        h = glob.glob(os.path.join(outdir, n))
        if h: return read(h[0])
    h = glob.glob(os.path.join(outdir, "*.md"));  return read(h[0]) if h else ""

EMOJI = re.compile(r"[\U0001F300-\U0001FAFF\u2600-\u27BF]")

def is_selfcontained_html(t):
    has = "<html" in t.lower() and "<style" in t.lower()
    bad_script = bool(re.search(r'<script[^>]+src=', t, re.I))
    css_link = re.findall(r'<link[^>]+stylesheet[^>]*>', t, re.I)
    bad_css = any("fonts.googleapis" not in l and "fonts.gstatic" not in l for l in css_link)
    return has and not bad_script and not bad_css

def var_defs(t): return len(re.findall(r"--[a-z0-9-]+\s*:", t))
def var_refs(t): return len(re.findall(r"var\(--", t))
def has_4px_scale(t):
    vals = re.findall(r"--space[a-z0-9-]*\s*:\s*(\d+)px", t)
    nums = set(int(v) for v in vals)
    return len({4,8,16}.intersection(nums)) >= 2 or len([n for n in nums if n % 4 == 0]) >= 4
def body_ge_16(t):
    m = re.search(r"--(?:font-size|fs|text)-(?:body|base|md)\s*:\s*(\d+)px", t)
    if m: return int(m.group(1)) >= 16
    m = re.search(r"body\s*\{[^}]*font-size:\s*(\d+)px", t, re.S)
    return int(m.group(1)) >= 16 if m else True
def type_ramp(t):
    sizes = set(re.findall(r"font-size:\s*([\d.]+)(?:px|rem)", t))
    sizes |= set(re.findall(r"--(?:font-size|fs|text)-[a-z0-9-]+\s*:\s*([\d.]+)(?:px|rem)", t))
    refs = set(re.findall(r"var\(--(?:font-size|fs|text)-[a-z0-9-]+\)", t))
    return len(sizes) >= 3 or len(refs) >= 3
def scored_review(t):
    dims = re.findall(r"(token|consist|access|a11y|contrast|hierarch|위계|계층|spacing|간격|slop)", t, re.I)
    scores = re.findall(r"\b\d{1,2}\s*/\s*(?:10|50)\b", t)
    return len(set(d.lower() for d in dims)) >= 4 and len(scores) >= 3
LUMEN = ["#FBFAF7","#5B8C6E","#2A2E2A","#E6E4DD","4A7459","B4533E"]
def uses_lumen(t):
    up = t.upper(); return sum(1 for c in LUMEN if c.upper() in up) >= 4
def has_purple_blue(t):
    return bool(re.search(r"7c3aed|2563eb|violet", t, re.I))

def grade(name, outdir):
    html = html_in(outdir, "index.html", "fixed.html"); res = []
    if name == "greenfield-design-build":
        res += [("Self-contained HTML that renders", is_selfcontained_html(html), "html+style"),
                ("Tokens as CSS custom properties via var()", var_defs(html)>=10 and var_refs(html)>=20, f"{var_defs(html)} defs / {var_refs(html)} refs"),
                ("Two-tier semantic roles present", bool(re.search(r"--color-(text|surface|border|accent)",html)), "semantic roles"),
                ("4px-based spacing scale", has_4px_scale(html), "4px multiples"),
                ("Body >=16px + type ramp", body_ge_16(html) and type_ramp(html), f"ramp:{type_ramp(html)}")]
    elif name == "respect-existing-system":
        res += [("Self-contained HTML that renders", is_selfcontained_html(html), "html+style"),
                ("Uses EXISTING Lumen tokens, not Astryx defaults", uses_lumen(html), "lumen hexes"),
                ("No competing purple/blue palette", not has_purple_blue(html), "no purple/blue")]
    elif name == "review-and-fix-slop":
        review = md_in(outdir, "review.md")
        res += [("Scored review across multiple dimensions", scored_review(review), "dims+scores"),
                ("Fixed HTML removes emoji icons", len(EMOJI.findall(html))==0, f"{len(EMOJI.findall(html))} emoji"),
                ("Fixed HTML removes purple-blue gradient", not has_purple_blue(html), "no purple/blue"),
                ("Fixed HTML uses token system", var_refs(html)>=20, f"{var_refs(html)} var refs")]
    elif name == "docusaurus-theme":
        css = read(glob.glob(os.path.join(outdir,"custom.css"))[0]) if glob.glob(os.path.join(outdir,"custom.css")) else ""
        shades = len(set(re.findall(r"--ifm-color-primary(?:-(?:dark|darker|darkest|light|lighter|lightest))?", css)))
        res += [("Maps onto Infima --ifm-* variables (not parallel system)", css.count("--ifm-")>=8, f"{css.count('--ifm-')} ifm vars"),
                ("Provides 7 primary shades", shades>=7, f"{shades} primary shades"),
                ("Has a [data-theme='dark'] block", "data-theme" in css and "dark" in css, "dark block"),
                ("Targets stable theme class names", bool(re.search(r"theme-doc-markdown|theme-admonition|\.navbar|\.menu",css)), "stable classes")]
    return res

summary = {}
for evald in sorted(glob.glob(os.path.join(ITER,"*"))):
    name = os.path.basename(evald)
    if not os.path.isdir(evald): continue
    for cfg in ("with_skill","without_skill"):
        outdir = os.path.join(evald,cfg,"outputs")
        if not os.path.isdir(outdir): continue
        exps = [{"text":a,"passed":bool(p),"evidence":e} for a,p,e in grade(name,outdir)]
        if not exps: continue
        json.dump({"eval_name":name,"run_id":cfg,"expectations":exps}, open(os.path.join(evald,cfg,"grading.json"),"w"), ensure_ascii=False, indent=2)
        summary.setdefault(name,{})[cfg] = (sum(1 for x in exps if x["passed"]), len(exps), exps)

print("=== DESIGN-SYSTEM AUTO-GRADING ===\n")
for name,cfgs in summary.items():
    print(f"## {name}")
    for cfg in ("with_skill","without_skill"):
        if cfg in cfgs:
            pn,n,exps = cfgs[cfg]; print(f"  {cfg:14s}: {pn}/{n}")
            for x in exps:
                if not x["passed"]: print(f"        FAIL: {x['text']} :: {x['evidence']}")
    print()
