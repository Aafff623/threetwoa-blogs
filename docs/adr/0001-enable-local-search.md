# ADR-0001: Enable Valaxy built-in local search

## Status

Accepted

## Context

`threetwoa-blogs` currently has search disabled (`search.enable: false` in `site.config.ts`). Readers cannot search posts or pages. As the blog grows, discoverability will degrade.

We need to choose a search provider. The main candidates are:

1. **Valaxy built-in local search**: Generates a JSON index at build time; query logic runs in the browser.
2. **Algolia DocSearch**: Hosted search; requires an Algolia application, API credentials, and crawler configuration.
3. **Custom Fuse.js search**: Self-built index + UI; more control but more code to maintain.

## Decision

Use **Valaxy's built-in local search**.

## Consequences

### Positive

- **No external dependency**: No API keys, no third-party service, no crawler setup.
- **Static-hosting friendly**: GitHub Pages, Netlify, and Vercel can serve the generated search index as a static file.
- **Scope match**: This is a small personal blog; the built-in provider is sufficient.
- **Theme integration**: `valaxy-theme-sakura` already provides `SakuraSearch`, `SakuraSearchBtn`, and `SakuraSearchTrigger` components.

### Negative

- **Bundle size**: The search index ships with the site, increasing the initial download compared with a server-side provider.
- **Feature ceiling**: No advanced ranking, analytics, or typo-tolerance beyond what Valaxy provides.
- **Relevance control**: Less tunable than Algolia or a custom Fuse.js implementation.

## Related files

- `site.config.ts` — enables/disables search and configures provider options.
- `valaxy.config.ts` — adds search-related icon classes to the UnoCSS safelist.
- `locales/zh-CN.yml`, `locales/en.yml` — override search UI strings.
- `styles/index.scss`, `styles/css-vars.scss` — optional search overlay styling.
- `.valaxy/components.d.ts` — generated registry confirming `SakuraSearch*` components are available.

## Related decisions

- This ADR directly supports the PRD in `.scratch/local-search/PRD.md`.
- If search requirements grow beyond built-in capabilities, revisit ADR-0001 before switching providers.
