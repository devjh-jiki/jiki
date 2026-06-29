# jiki

> 한국어: [README.md](./README.md)

A public meta-repo / index hub for everything I use as a developer.
The goal is to eliminate "where did I write that down again?".

> Private assets (side-project wiki, daily/travel notes, learning notes not for publishing)
> live in a separate private repo, `vault`. Only publishable things go here.

## Index

| Area | Path | Description |
|------|------|-------------|
| Skills | [`skills/`](./skills) | My own agent skills. Versioned + upstream auto-sync. Installable as a Claude Code plugin. |
| MCP | [`mcp/`](./mcp) | MCP setups per tool. Copy-paste anywhere. |
| Prompts | [`prompts/`](./prompts) | Frequently used prompt commands. |
| Learning / AI | [`learning/ai/`](./learning/ai) | AI learning roadmap + resources + log, from a frontend developer's view. |
| Snippets | [`snippets/`](./snippets) | Frequently used code/config snippets. |

## Skills marketplace

Skills are installable as a Claude Code plugin.

```
/plugin marketplace add devjh-jiki/jiki
/plugin install learning-skills@jiki-skills
/plugin install writing-skills@jiki-skills
/plugin install business-skills@jiki-skills
```

Or with the skills CLI:

```bash
npx skills@latest add devjh-jiki/jiki
```

### Trust levels

Skills are labeled by verification stage:

- **Available** — personally tested and verified. Recommended for external install.
- **Review** — under evaluation; promoted to Available once verified.
- **Private** — personal-setup only; not in the marketplace.

| Skill | Level | Description |
|-------|-------|-------------|
| [write-blog-post](./skills/productivity/write-blog-post) | Available | Turn a draft/learning into a polished Korean tech blog post in the jihoon voice (style + SEO guides). |
| [grill-me](./skills/productivity/grill-me) | Available | Relentless interview to stress-test a plan, decision, or business idea before committing. |
| [open-source-reverse-engineering-coach](./skills/learning/open-source-reverse-engineering-coach) | Available | Learn an open-source project by interactive reverse-engineering. |
| [technical-book-coach](./skills/learning/technical-book-coach) | Available | Coach-style learning from technical books/docs (KO translation + coaching). |
| [biz-opportunity-scout](./skills/business/biz-opportunity-scout) | Available | Validate a business opportunity (TAM/SAM/SOM, unit economics, PMF) with a Go/No-Go. |
| [marketing-copy](./skills/business/marketing-copy) | Available | Turn a product/feature into Korean marketing copy. |
| [product-spec-builder](./skills/business/product-spec-builder) | Available | Turn a rough idea into a buildable PRD. |
| [tdd](./skills/engineering/tdd) | Review | Red-green-refactor TDD (adapted from mattpocock). |
| [diagnosing-bugs](./skills/engineering/diagnosing-bugs) | Review | Disciplined bug diagnosis loop (adapted from mattpocock). |
| [codebase-design](./skills/engineering/codebase-design) | Review | Vocabulary for designing deep modules (adapted from mattpocock). |
| [improve-codebase-architecture](./skills/engineering/improve-codebase-architecture) | Review | Scan for deepening opportunities + report (adapted from mattpocock). |
| [to-prd](./skills/engineering/to-prd) | Review | Synthesize a conversation into a PRD (adapted from mattpocock). |
| [to-issues](./skills/engineering/to-issues) | Review | Break a plan/PRD into vertical-slice issues (adapted from mattpocock). |
| [domain-modeling](./skills/engineering/domain-modeling) | Review | Build domain model, glossary, ADRs (adapted from mattpocock). |
| [grill-with-docs](./skills/engineering/grill-with-docs) | Review | Grilling that also produces docs (adapted from mattpocock). |
| [prototype](./skills/engineering/prototype) | Review | Throwaway prototype to de-risk a design (adapted from mattpocock). |
| [handoff](./skills/productivity/handoff) | Review | Create a session handoff doc (adapted from mattpocock). |
| [writing-great-skills](./skills/productivity/writing-great-skills) | Review | Reference for writing great skills (adapted from mattpocock). |

## Related repos (Organization)

| Repo | Public | Description |
|------|--------|-------------|
| [`jiki`](https://github.com/devjh-jiki/jiki) (this repo) | Public | Index hub |
| [`trending-newsletter`](https://github.com/devjh-jiki/trending-newsletter) | Public | GitHub trending KO newsletter (3 lenses: dev / founder / marketing) |
| [`ai-playground`](https://github.com/devjh-jiki/ai-playground) | Public | Practice projects from AI learning |
| `vault` | Private | Side-project wiki + daily/travel + learning notes |

## Documentation policy

All docs are managed as **English original + Korean `.ko.md` pair** (English is the source of truth).
Editing one side requires updating the other. CI checks for missing pairs. See [CLAUDE.md](./CLAUDE.md).

## License

[MIT](./LICENSE) · Third-party attributions: [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)
