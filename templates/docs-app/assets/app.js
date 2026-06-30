/* docs-app — client runtime. No framework. */
(function () {
  var root = document.documentElement;
  var ROOT = window.__DOCS_ROOT__ || "";

  /* ---- theme toggle: persist + system preference ---- */
  var KEY = "docs-theme";
  var saved = localStorage.getItem(KEY);
  if (saved) root.setAttribute("data-theme", saved);
  else if (matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark");
  var toggle = document.getElementById("themeToggle");
  if (toggle) toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
    if (window.__rerenderMermaid__) window.__rerenderMermaid__(next);
  });

  /* ---- mobile sidebar ---- */
  var sidebar = document.getElementById("sidebar");
  var sbToggle = document.getElementById("sidebarToggle");
  if (sbToggle && sidebar) {
    sbToggle.addEventListener("click", function () { sidebar.classList.toggle("open"); });
    sidebar.addEventListener("click", function (e) {
      if (e.target.tagName === "A") sidebar.classList.remove("open");
    });
  }

  /* ---- scroll-spy: highlight TOC entry for heading in view ---- */
  var heads = [].slice.call(document.querySelectorAll(".prose h2[id], .prose h3[id]"));
  var tocLinks = [].slice.call(document.querySelectorAll(".toc a"));
  if (heads.length && tocLinks.length) {
    function mark(id) {
      tocLinks.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + id);
      });
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) mark(e.target.id); });
    }, { rootMargin: "-10% 0px -80% 0px" });
    heads.forEach(function (h) { obs.observe(h); });
  }

  /* ---- search (uses build-time search-index.json) ---- */
  var input = document.getElementById("docsearch");
  var overlay = document.getElementById("searchOverlay");
  if (input && overlay) {
    var index = null, results = null, active = -1, items = [];
    function ensureResults() {
      if (!results) {
        results = document.createElement("div");
        results.className = "search-results";
        overlay.appendChild(results);
      }
      return results;
    }
    function loadIndex() {
      if (index) return Promise.resolve(index);
      return fetch(ROOT + "search-index.json").then(function (r) { return r.json(); }).then(function (j) { index = j; return j; });
    }
    function close() { overlay.hidden = true; if (results) results.innerHTML = ""; active = -1; items = []; }
    function render(q) {
      var box = ensureResults();
      var ql = q.toLowerCase();
      var hits = index.filter(function (d) {
        return d.title.toLowerCase().indexOf(ql) > -1 ||
               d.crumb.toLowerCase().indexOf(ql) > -1 ||
               d.text.toLowerCase().indexOf(ql) > -1;
      }).slice(0, 20);
      items = hits;
      if (!hits.length) { box.innerHTML = '<div class="r-empty">검색 결과 없음</div>'; return; }
      box.innerHTML = hits.map(function (d, i) {
        return '<a href="' + ROOT + d.url + '"' + (i === 0 ? ' class="active"' : '') +
          '><div class="r-title">' + d.title + '</div><div class="r-crumb">' + d.crumb + '</div></a>';
      }).join("");
      active = 0;
    }
    input.addEventListener("input", function () {
      var q = input.value.trim();
      if (q.length < 2) { close(); return; }
      loadIndex().then(function () { overlay.hidden = false; render(q); });
    });
    input.addEventListener("keydown", function (e) {
      if (overlay.hidden) return;
      var links = results ? [].slice.call(results.querySelectorAll("a")) : [];
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, links.length - 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); }
      else if (e.key === "Enter") { if (links[active]) location.href = links[active].getAttribute("href"); }
      else if (e.key === "Escape") { close(); input.blur(); return; }
      links.forEach(function (a, i) { a.classList.toggle("active", i === active); });
    });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); input.focus(); }
    });
  }
})();
