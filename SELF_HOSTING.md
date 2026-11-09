# SRHOE — Self-Hosting Guide

Single-page portfolio. No database, no login, no API keys, no backend services to migrate.
Everything the page needs (photo, three platform logos, two custom fonts, favicon) is inside
this folder.

## What's in here

| Path | What it is |
| --- | --- |
| `src/routes/index.tsx` | The whole page: hero, portrait, the three platform cards, email, footer |
| `src/routes/__root.tsx` | App shell, page metadata, favicon, font preload |
| `src/styles.css` | Tailwind v4 theme, glassmorphism utilities, the two `@font-face` fonts |
| `src/assets/` | `srhoe-portrait.png`, `owlsec-owl-logo.jpeg`, `grayswan-logo.jpeg`, `bigo-live-logo.png` |
| `public/fonts/` | `RogersTypewriter.woff` (headings/body), `SFCartoonistHand.ttf` (card descriptions + email) |
| `public/favicon.png`, `public/robots.txt` | Site icon and crawler rules |
| `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `.prettierrc` | Build and tooling config |
| `bun.lock` | Locked dependency versions |

The animations (portrait fade-in with the drifting dust/particle canvas, staggered card
rise-in, ambient background blobs) are all in `src/routes/index.tsx` and `src/styles.css`,
powered by `framer-motion`. Nothing is fetched from Lovable.

## Requirements

- Node.js 20 or newer (Node 22 recommended), and [Bun](https://bun.sh) or npm.

## Install

```sh
bun install        # recommended, matches bun.lock
# or: npm install
```

## Run locally (development)

```sh
bun run dev        # or: npm run dev
```

Open the URL it prints (default `http://localhost:8080`).

## Build and run on your own server

This project builds for Cloudflare by default. To produce a plain Node server that runs on any
VPS, shared host, Docker container, Railway, Render, Fly.io, etc., add one line to
`vite.config.ts`:

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: { preset: "node-server" },
});
```

Then:

```sh
bun run build      # or: npm run build
node .output/server/index.mjs
```

The site listens on port 3000 by default. Change it with `PORT=8080 node .output/server/index.mjs`.
Put nginx/Caddy in front for HTTPS and point your domain at it.

`bun run preview` (or `npm run preview`) serves the built output locally to check it first.

### Deploying to Cloudflare instead

Leave `vite.config.ts` as it came (no `nitro` line). `bun run build` writes a Cloudflare
Worker build; deploy it with `npx wrangler deploy` (or `npx nitro deploy --prebuilt`).

### Static hosting (Netlify, Vercel, S3, GitHub Pages)

The page has no server-side data, so a static export is possible, but it needs extra
prerendering setup that this guide has not tested. The Node server above is the verified path.

## Notes

- `src/lib/lovable-error-reporting.ts` is inert outside Lovable: it only reports errors when
  Lovable's editor telemetry is present. It is safe to delete, and safe to leave.
- `AGENTS.md` is a Lovable editor note file. It has no effect on the running site.
- Font licensing: `SFCartoonistHand.ttf` is bundled as freeware for personal use; the font's
  own notice points to a purchase for commercial use. Check that before using the site
  commercially.
- The Grey Swan logo file is `src/assets/grayswan-logo.jpeg`.
