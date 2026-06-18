# LANGUAGE

> 本文件服务于 `/improve-codebase-architecture` 等架构 skill。`docs/meta/methodology-routing.md` 提到新版 Matt Pocock 技能将语言合并进 `CONTEXT.md`，但本仓库同时维护 `LANGUAGE.md` 以保留架构/实现层面的词汇一致性。

## Architecture vocabulary

Use these terms exactly when discussing code structure and refactor opportunities.

| Term | Definition |
|------|------------|
| **Module** | Anything with an interface and an implementation: a function, a class, a package, a file, or a configuration slice. |
| **Interface** | Everything a caller must know to use a module: types, invariants, error modes, ordering, and config. Not just the type signature. |
| **Implementation** | The code inside a module. |
| **Depth** | Leverage at the interface. A deep module exposes a small interface for a lot of behaviour. A shallow module has an interface almost as complex as its implementation. |
| **Seam** | A place where behaviour can be altered without editing the module in place. Prefer over "boundary". |
| **Adapter** | A concrete thing that satisfies an interface at a seam. |
| **Leverage** | What callers gain from a deep interface. |
| **Locality** | What maintainers gain from depth: change, bugs, and knowledge concentrated in one place. |

## Naming conventions

### Files and directories

| Path / Pattern | Purpose |
|----------------|---------|
| `valaxy.config.ts` | Valaxy framework and theme configuration. |
| `site.config.ts` | Site-level metadata and feature toggles. |
| `pages/posts/*.md` | Blog posts. |
| `pages/<special>/index.md` | Special list pages (archives, categories, tags, links, about). |
| `components/*.vue` | Custom Vue components, auto-registered globally. |
| `layouts/*.vue` | Layout overrides. |
| `styles/index.scss` | Custom style entry. |
| `styles/css-vars.scss` | CSS variable overrides. |
| `locales/*.yml` | Locale overrides. |
| `.valaxy/components.d.ts` | Generated global component declaration. |
| `.valaxy/route-map.d.ts` | Generated typed route map. |
| `.scratch/<feature>/PRD.md` | Local markdown issue tracker PRD. |
| `.scratch/<feature>/issues/*.md` | Local markdown implementation issues. |
| `docs/adr/000N-*.md` | Architecture Decision Records. |

### Code style

- Use TypeScript for configuration files.
- Use Vue single-file components for custom UI.
- Prefer theme-provided components before writing custom ones.
- Icon classes use `i-ri-*` (Remix Icon via Iconify).
- UnoCSS safelist entries must be literal class strings, not dynamic.

## Terms to avoid

| Avoid | Use instead |
|-------|-------------|
| service | module, provider, adapter |
| API | interface, config surface |
| boundary | seam |
| wrapper | adapter, layout |
| handler | function, module |
| widget | component |
| whitelist | safelist |
| search engine | search provider |
| blog config | site config / Valaxy config |

## Deletion test

When reviewing a module, ask: *If I delete this module, does complexity vanish (shallow/pass-through) or reappear across callers (deep/earning its keep)?* Use the answer to decide whether to deepen, merge, or keep the module.
