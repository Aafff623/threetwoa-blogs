# ADR-0002: Route WebDAV album traffic through a serverless proxy

## Status

Accepted

## Context

Stage 9 adds album pages that can pull media from a WebDAV server (`source: webdav`). Two constraints make a pure browser-side implementation problematic:

1. **CORS**: Most WebDAV servers (e.g. Nextcloud, ownCloud, NAS) do not send `Access-Control-Allow-Origin` headers suitable for a browser SPA.
2. **Credential exposure**: Storing a WebDAV password in the browser bundle or in public front matter would leak credentials to visitors.

We therefore need an intermediary that can talk to WebDAV on the server side while exposing a safe, CORS-free endpoint to the client.

## Decision

Use **Vercel Serverless Functions** (`api/album-webdav/list.ts` and `api/album-webdav/file.ts`) plus a matching local-dev Vite proxy plugin (`plugins/album-webdav-proxy.ts`).

- `api/album-webdav/list.ts` performs a WebDAV `PROPFIND` and returns a JSON array of media URLs.
- `api/album-webdav/file.ts` proxies individual media files, forwarding `Range` headers so video streaming works.
- The WebDAV login password is read from the `WEBDAV_PASSWORD` environment variable at runtime and never reaches the client.
- Public WebDAV metadata (`url`, `username`) is extracted from album front matter at build time and written to `server/albumWebdavPublicConfig.ts` by `plugins/album-webdav-config.ts`.
- The shared HTTP handling lives in `server/albumWebdavHttp.ts` so the same logic can be reused on Vercel, Netlify, or in local dev.

## Consequences

### Positive

- **Credentials stay server-side**: `WEBDAV_PASSWORD` only exists in environment variables.
- **No CORS issues**: The browser only talks to the same-origin `/api/album-webdav/*` endpoints.
- **Range / video support**: The file proxy preserves `Range` and `Content-Range` headers.
- **Dev/prod parity**: `album-webdav-proxy.ts` routes the same paths through `server/albumWebdavHttp.ts` during `pnpm dev`.

### Negative

- **Platform coupling**: The current `api/` folder targets Vercel Serverless Functions. Moving to Netlify Functions or Cloudflare Workers would require adapter files.
- **Serverless invocations**: Every album list and every media request consumes a function invocation on the hosting platform.
- **Environment variable required**: WebDAV albums fail at runtime if `WEBDAV_PASSWORD` is not configured.
- **Build-time metadata**: Adding or changing a WebDAV album requires a rebuild so `server/albumWebdavPublicConfig.ts` is regenerated.

## Related files

- `server/albumWebdav.ts` — WebDAV `PROPFIND` parser and file proxy.
- `server/albumWebdavEnv.ts` — runtime environment variable loader.
- `server/albumWebdavHttp.ts` — platform-agnostic HTTP handler.
- `server/albumWebdavPublicConfig.ts` — build-generated public WebDAV metadata (ignored by git).
- `api/album-webdav/list.ts` — Vercel function for listing.
- `api/album-webdav/file.ts` — Vercel function for file proxy.
- `plugins/album-webdav-config.ts` — build plugin that generates `albumWebdavPublicConfig.ts`.
- `plugins/album-webdav-proxy.ts` — local dev proxy.
- `.env.example` — documents the required `WEBDAV_PASSWORD` variable.
- `types/album.ts` — type definitions for WebDAV configuration.
- `utils/webdavAlbum.ts` — client-side fetcher for the `/api/album-webdav/list` endpoint.
- `components/AlbumViewer.vue` — consumes the list endpoint and renders media.

## Related decisions

- Supports the Stage 9 gallery feature described in `docs/tutorials/valaxy-09-gallery.md`.
- If the blog is later migrated away from Vercel, revisit this ADR and provide equivalent adapter functions for the new platform.
