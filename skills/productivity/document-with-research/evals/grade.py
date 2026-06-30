#!/usr/bin/env python3
"""Auto-grade document-with-research outputs against the auto-checkable assertions.

Re-verification harness. Lay out an iteration dir as:
  <iter>/<eval-name>/with_skill/rep-N/outputs/<file>
  <iter>/<eval-name>/without_skill/outputs/<file>
where <eval-name> is one of the names in evals.json. Then:

  python3 grade.py <iteration-dir>

Writes grading.json into each run directory and prints a pass-rate summary.
Only the 'auto' assertions in evals.json are checked here; 'human' assertions
need a person (use the eval-viewer review pass).
"""
import json, os, re, sys, glob

ITER = sys.argv[1] if len(sys.argv) > 1 else "."

def has_korean(t):
    return bool(re.search(r"[\uac00-\ud7a3]", t))

def korean_ratio(t):
    # Measure Korean dominance in PROSE only: drop fenced code blocks and inline code,
    # since technical docs legitimately carry English identifiers (config.yaml, pnpm, allkeys-lru).
    prose = re.sub(r"```.*?```", " ", t, flags=re.S)
    prose = re.sub(r"`[^`]*`", " ", prose)
    prose = re.sub(r"\]\([^)]*\)", "] ", prose)  # drop URLs/paths in links
    prose = re.sub(r"https?://\S+", " ", prose)
    letters = re.findall(r"[A-Za-z\uac00-\ud7a3]", prose)
    if not letters:
        return 0.0
    ko = [c for c in letters if "\uac00" <= c <= "\ud7a3"]
    return len(ko) / len(letters)

def inline_links(t):
    # markdown inline links [text](url)
    return re.findall(r"\[[^\]]+\]\((https?://[^)]+)\)", t)

def code_fences_tagged(t):
    fences = re.findall(r"^```(\w*)", t, re.M)
    opening = fences[::2] if fences else []
    # crude: count ``` lines; every other is an opener. Require at least one tagged opener and no bare openers among openers.
    openers = []
    bare = 0
    state = False
    for line in t.splitlines():
        m = re.match(r"^```(\w*)\s*$", line)
        if m:
            if not state:  # opening
                openers.append(m.group(1))
                if m.group(1) == "":
                    bare += 1
            state = not state
    return (len(openers) > 0, bare == 0, len(openers))

def has_gfm_table(t):
    return bool(re.search(r"^\|.*\|\s*$\n^\|[\s:|-]+\|\s*$", t, re.M))

def has_toc_anchor(t):
    return bool(re.search(r"\]\(#[^\)]+\)", t))

def duplicate_table_rows(t):
    rows = [l.strip() for l in t.splitlines() if l.strip().startswith("|") and not re.match(r"^\|[\s:|-]+\|", l.strip())]
    # ignore header separator; count duplicate data rows (exact)
    seen = {}
    dups = 0
    for r in rows:
        if re.match(r"^\|[\s:|-]+\|?$", r):
            continue
        seen[r] = seen.get(r, 0) + 1
    for r, c in seen.items():
        if c > 1 and r.count("|") >= 2 and not set(r.replace("|","").strip()) <= set("- :"):
            dups += (c - 1)
    return dups

# assertion checkers keyed by eval name -> list of (assertion_text, fn)
def grade_research_brief(t):
    res = []
    res.append(("Written in Korean (matches the request language)", korean_ratio(t) > 0.5, f"korean prose ratio={korean_ratio(t):.2f}"))
    links = inline_links(t)
    res.append(("Key numeric claims carry an inline source link at the point of the claim",
                len(links) >= 3, f"{len(links)} inline http links found"))
    gap = bool(re.search(r"미확인|확인하지 못|unconfirmed|gap|공백|미검증", t, re.I))
    res.append(("Has an explicit gaps/unconfirmed section that honestly flags what could not be verified", gap, "gap/unconfirmed marker present" if gap else "no gap marker"))
    res.append(("Uses GFM tables and at least one anchor-linked table of contents",
                has_gfm_table(t) and has_toc_anchor(t), f"table={has_gfm_table(t)}, toc_anchor={has_toc_anchor(t)}"))
    return res

def grade_side_project(t):
    res = []
    res.append(("Written in Korean (matches the request language)", korean_ratio(t) > 0.5, f"korean prose ratio={korean_ratio(t):.2f}"))
    tagged, no_bare, n = code_fences_tagged(t)
    res.append(("Has a copy-pasteable quick-start with language-tagged code fences",
                tagged and no_bare, f"{n} code fences, all tagged={no_bare}"))
    facts = {
        "Python 3.10": r"3\.10",
        "config.yaml": r"config\.yaml",
        "interval 300": r"300",
        "Slack": r"[Ss]lack",
        "Discord": r"[Dd]iscord",
        "Telegram": r"[Tt]elegram",
        "Docker": r"[Dd]ocker",
        "seen.db": r"seen\.db",
        "--once": r"--once",
        "--config": r"--config",
        "MIT": r"MIT",
    }
    missing = [k for k, p in facts.items() if not re.search(p, t)]
    res.append(("All provided facts present", len(missing) == 0, "missing: " + (", ".join(missing) if missing else "none")))
    return res

def grade_refine(t):
    res = []
    dups = duplicate_table_rows(t)
    res.append(("No duplicate table rows and all tables render", dups == 0, f"{dups} duplicate data rows"))
    return res

def grade_guide(t):
    res = []
    res.append(("Written in Korean (matches the request language)", korean_ratio(t) > 0.5, f"korean prose ratio={korean_ratio(t):.2f}"))
    # numbered steps: either list-item "1." or heading-numbered "### 1. ..."
    numbered = len(re.findall(r"^\s*\d+\.\s", t, re.M)) + len(re.findall(r"^#{1,4}\s*\d+\.\s", t, re.M))
    res.append(("Uses a numbered how-to/task structure, not a flat paragraph dump",
                numbered >= 4, f"{numbered} numbered steps"))
    return res

def grade_adr(t):
    res = []
    res.append(("Written in Korean (matches the request language)", korean_ratio(t) > 0.5, f"korean prose ratio={korean_ratio(t):.2f}"))
    sections = {
        "Status": r"[Ss]tatus|상태",
        "Context": r"[Cc]ontext|맥락|배경",
        "Decision": r"[Dd]ecision|결정",
        "Consequences": r"[Cc]onsequence|결과|영향",
        "Alternatives": r"[Aa]lternative|대안",
    }
    miss = [k for k, p in sections.items() if not re.search(p, t)]
    res.append(("Follows ADR structure (Status, Context, Decision, Consequences, Alternatives)",
                len(miss) == 0, "missing: " + (", ".join(miss) if miss else "none")))
    backlink = bool(re.search(r"\]\((\.\.?/)?[^)]*architecture\.md", t))
    res.append(("Includes a relative link back to docs/architecture.md (bidirectional linking intent)",
                backlink, "relative architecture.md link present" if backlink else "no back-link"))
    return res

GRADERS = {
    "research-to-brief": grade_research_brief,
    "document-side-project": grade_side_project,
    "refine-messy-readme": grade_refine,
    "guide-from-notes": grade_guide,
    "research-and-link": grade_adr,
}

summary = {}
for evaldir in sorted(glob.glob(os.path.join(ITER, "*"))):
    name = os.path.basename(evaldir)
    if name not in GRADERS or not os.path.isdir(evaldir):
        continue
    grader = GRADERS[name]
    # collect run dirs: with_skill/rep-*/outputs and without_skill/outputs
    runs = []
    for rep in sorted(glob.glob(os.path.join(evaldir, "with_skill", "rep-*"))):
        runs.append((f"with_skill/{os.path.basename(rep)}", os.path.join(rep, "outputs")))
    wo = os.path.join(evaldir, "without_skill", "outputs")
    if os.path.isdir(wo):
        runs.append(("without_skill", wo))
    for run_id, outdir in runs:
        files = glob.glob(os.path.join(outdir, "*"))
        if not files:
            continue
        text = open(files[0], encoding="utf-8", errors="ignore").read()
        expectations = []
        for atext, passed, evidence in grader(text):
            expectations.append({"text": atext, "passed": bool(passed), "evidence": evidence})
        grading = {"eval_name": name, "run_id": run_id, "expectations": expectations}
        rundir = os.path.dirname(outdir)
        with open(os.path.join(rundir, "grading.json"), "w", encoding="utf-8") as f:
            json.dump(grading, f, ensure_ascii=False, indent=2)
        passed_n = sum(1 for e in expectations if e["passed"])
        summary.setdefault(name, {}).setdefault(run_id.split("/")[0], []).append((passed_n, len(expectations)))

# print summary
print("=== AUTO-GRADING SUMMARY (auto-checkable assertions only) ===\n")
for name, configs in summary.items():
    print(f"## {name}")
    for cfg, results in configs.items():
        tot_p = sum(p for p, _ in results)
        tot_n = sum(n for _, n in results)
        rate = 100 * tot_p / tot_n if tot_n else 0
        detail = ", ".join(f"{p}/{n}" for p, n in results)
        print(f"  {cfg:14s}: {tot_p}/{tot_n} auto-assertions passed ({rate:.0f}%)  [per-run: {detail}]")
    print()
