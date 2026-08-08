---
"@dev-hub/skills": patch
---

Fix Claude Code marketplace manifests: mark every plugin entry `strict: false` so the marketplace entry is the full plugin definition, and drop the root `.claude-plugin/plugin.json` whose `dev-hub-skills` name and `SKILL.md` file paths made every plugin fail to load after install.
