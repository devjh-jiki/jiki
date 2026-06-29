# jiki

> 한국어: [README.ko.md](./README.ko.md)

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
| [open-source-reverse-engineering-coach](./skills/learning/open-source-reverse-engineering-coach) | Available | Learn an open-source project by interactive reverse-engineering. |
| [technical-book-coach](./skills/learning/technical-book-coach) | Available | Coach-style learning from technical books/docs (KO translation + coaching). |

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
