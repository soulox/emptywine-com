# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single Cloudflare Worker serving **emptywine** — a marketing/landing site for AI-designed bespoke corporate wine labels. Note: the `README.md` still describes the upstream `text-to-image-template` it was forked from; the actual app has diverged into the wine-gifting site and the README is stale.

## Commands

- `npm run dev` — local dev server (`wrangler dev`)
- `npm run check` — typecheck + deploy dry-run (`tsc && wrangler deploy --dry-run`); use this as the build/CI gate
- `npm run deploy` — deploy to Cloudflare (`wrangler deploy`)
- `npm run cf-typegen` — regenerate `worker-configuration.d.ts` from `wrangler.json` bindings; run after changing bindings
- `npx wrangler tail` — stream live logs from the deployed worker

There is no test suite and no linter configured.

## Architecture

Everything runs in one `fetch` handler. There is no router framework — `src/index.ts` matches `method`/`pathname` with sequential `if` blocks and returns `404` at the end. Routes:

- `GET /` (English) / `GET /fr` (French) → `renderLanding(lang)`
- `GET /design` (English) / `GET /fr/design` (French) → `renderPreview(lang)` (live label-mockup builder)
- `GET /preview` and `/fr/preview` → 301 redirects to the `/design` paths (legacy)
- `GET /og.jpg` → Open Graph share image (1200×630 JPEG from `src/og.ts`)
- `GET /robots.txt`, `GET /sitemap.xml` (multilingual, with en/fr/x-default `xhtml:link` alternates)
- `GET /assets/*` → proxies objects out of the R2 `ASSETS` bucket
- `GET /api/bottle/{hero|cream|noir|blanc|banner|previewBottle}` → AI-generated bottle image, KV-cached
- `POST /api/generate` → AI-generated custom label from `{company, style}` JSON
- `POST /api/contact` → spam-checked (honeypot + timing + per-IP rate limit + validation); stores submissions in KV and fires a Slack notification (`SLACK_WEBHOOK_URL` secret)

**Accounts + orders** (added later; `src/auth.ts`, `src/account.ts`, `src/admin.ts`, `src/email.ts`, `src/label.ts`): customers sign up / log in, submit a finished design from `/design` as an order (login + verified-email gated), then return to `/account` to view/download the proof or reopen the design to edit. Routes (all bilingual EN + `/fr`, `noindex`): `GET /login /signup /forgot /reset /verify /account /account/order/{no}(/proof.pdf)` and APIs `POST /api/{signup,login,logout,forgot,reset,order}`. Admin: `GET /admin` + `POST /api/admin/{login,order-status}` (gated by `ADMIN_TOKEN`, submitted via POST → short-lived KV admin-session cookie, never in a URL). `accountRouter`/`adminRouter` in index.ts run before the 404. Auth = WebCrypto PBKDF2 hashes + KV sessions (`sess:`, `verify:`, `reset:` keys). Email (`src/email.ts`) = **authenticated SMTP submission** to a SmarterMail server, sent from the Worker over a Cloudflare TCP socket (`cloudflare:sockets` `connect` → STARTTLS on :587), config-driven via `SMTP_HOST/PORT/USER/PASSWORD/FROM`; logs the link to console when SMTP is unconfigured (dev). No online payment — orders are quote/invoice-offline requests.

**Bilingual (i18n):** the site is English + French. All user-facing copy lives in a typed dictionary in `src/i18n.ts` (`type Lang = 'en'|'fr'`, `interface Copy`, `COPY.en`/`COPY.fr`, plus `otherLang`/`ogLocale`/`headTags` helpers). The two HTML pages are **entire documents built by `renderLanding(lang)` / `renderPreview(lang)`** in `src/landing.ts` / `src/preview.ts` — they interpolate `COPY[lang]` for strings while all CSS/SVG/image-data-URIs stay shared literals, so the two languages cannot drift visually. A `Copy` field must be added to BOTH `en` and `fr`. `headTags()` emits per-language `<title>`, description, canonical, reciprocal hreflang, and og:locale. There is no front-end build step, no framework; client JS is plain ES5-style IIFEs. French copy is **draft — pending native review**.

### Bindings (`wrangler.json` → `Env` in `worker-configuration.d.ts`)

- `AI` — Workers AI; model used is `@cf/stabilityai/stable-diffusion-xl-base-1.0`
- `CONTACTS` (KV) — **multi-purpose despite the name**: contact submissions (`contact:{id}`), cached bottle images (`bottle:img:{key}:v1`, 7-day TTL), auth sessions (`sess:`, `asess:`), one-shot email tokens (`verify:`, `reset:`), and rate-limit counters (`rl:*`)
- `DB` (D1, database `emptywine`) — relational store for accounts + orders (`users`, `orders`; schema in `migrations/`). **Needs `wrangler d1 create` + the returned `database_id` pasted into `wrangler.json` before deploy**; apply migrations with `wrangler d1 migrations apply emptywine` (`--local` for dev)
- `ASSETS` (R2, bucket `emptywine-assets`) — uploaded static assets served via `/assets/*`
- Secrets (via `wrangler secret put`): `ADMIN_TOKEN`, `SLACK_WEBHOOK_URL`, and SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, optional `SMTP_FROM`). Local dev reads them from `.dev.vars` (gitignored)

### Key cross-file coupling

The bottle-style keys must stay in sync across files:
- `PROMPTS` keys in `src/index.ts` (`hero`, `cream`, `noir`, `blanc`) define which `/api/bottle/{key}` paths are valid; unknown keys fall back to `hero`.
- `landing.ts` requests these via `data-src="/api/bottle/{key}"` and the hero `img.src`.
- `preview.ts` has its own `STYLES` map (`cream`/`noir`/`blanc`) for the **client-side** label overlay — it does not call the AI; it CSS-overlays a label onto `/assets/bottle.png`.

Changing/caching prompts: bump the `:v1` suffix in the KV cache key in `serveBottleImage` to invalidate cached images after a prompt change.

The label's flat surface (CSS + markup for `.label-paper` and the `lbl-*` fields, plus `style-noir`/`style-blanc` theming) lives once in `src/label.ts` (`labelStyles()` / `labelMarkup(cfg, opts)`) and is reused by the builder overlay (`preview.ts`), the order-proof preview, and admin thumbnails — so they can't drift. The builder keeps its own `.label-overlay` positioning and `.label-paper::after` cylinder-curvature CSS; `labelMarkup(cfg,{ids:true})` emits the ids the builder JS drives, `{inlineScales:true}` bakes per-field `--scale-*` for static renders. `LabelConfig` (`src/labelpdf.ts`) is the single design shape — the on-screen builder, `renderLabelPdf`, and a stored order's `design_json` all use it, coerced by `parseLabelConfig` (`src/auth.ts`).

The `/preview` page includes a dev-only label-position adjuster (sliders writing CSS custom properties `--lbl-top` etc.) for calibrating the overlay against a real bottle photo.
