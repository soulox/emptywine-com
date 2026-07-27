# emptywine — French bilingual site (i18n + SEO)

**Date:** 2026-07-27
**Status:** Approved design, pending spec review
**Goal:** Serve the site in English and French to target French-speaking corporate buyers, done properly for SEO (hreflang, per-locale metadata, multilingual sitemap), without duplicating page structure.

## Context

The site is a single Cloudflare Worker (`src/index.ts`) serving two pages that are entire HTML documents exported as template-literal strings: `LANDING_PAGE` (`src/landing.ts`) and `PREVIEW_PAGE` (`src/preview.ts`). Routing is sequential `if (method/pathname)` blocks. Existing routes: `/`, `/preview`, `/og.jpg`, `/assets/*`, `/api/bottle/*`, `/api/generate`, `/api/contact`, `/robots.txt`, `/sitemap.xml`. All copy is currently hardcoded English inline in the templates; the only French is decorative wine terminology on label mockups.

## Decisions (locked)

- **URL structure:** English stays at `/` and `/preview` (unchanged — protects current SEO). French at `/fr` and `/fr/preview`. All stable, indexable URLs.
- **Default behaviour:** root stays English; a visible EN/FR toggle switches languages. **No** Accept-Language auto-redirect.
- **Scope:** both pages, full parity (landing + the `/preview` builder, including its UI, download modal, and validation/success messages).
- **Translation:** Claude writes professional corporate French (formal *vous*, luxury register), delivered as **draft for native review** before being treated as final.

## Architecture

One source of structure, two sets of copy — to prevent EN/FR layout drift.

### `src/i18n.ts` (new)
- `export type Lang = 'en' | 'fr';`
- `export interface Copy { ... }` — one field per user-facing string (nav items, hero kicker/title/sub/CTAs/meta, marquee industries, process steps, gallery captions, builder-CTA, ethos, contact form labels/placeholders/hints/validation/success, footer, preview builder UI, download modal, JS strings like "Sending…"/"rendering…", and per-page `<head>` values: title, description, og:title, og:description).
- `export const COPY: Record<Lang, Copy>` with `en` (extracted from current templates) and `fr` (new translations).
- Small helper for the alternate-language URL and locale codes.

### `src/landing.ts`
- Change `export const LANDING_PAGE = \`…\`` → `export function renderLanding(lang: Lang): string`.
- Body references `const t = COPY[lang]` for every string; CSS, SVG, and image data-URIs remain shared literals (unchanged).
- `<head>` becomes lang-aware: `<html lang>`, title, description, canonical, hreflang set, og:locale(+alternate), og:title/description.

### `src/preview.ts`
- Same transform → `export function renderPreview(lang: Lang): string`.
- Inline `<script>` strings that are user-facing ("Sending…" equivalent, "rendering…", download button subtitles) read from a small JSON copy object injected into the page for the active lang; download filename slug logic is unaffected.

### `src/index.ts`
- Routes:
  - `GET /` → `renderLanding('en')`; `GET /fr` and `/fr/` → `renderLanding('fr')`
  - `GET /preview` → `renderPreview('en')`; `GET /fr/preview` → `renderPreview('fr')`
- `sitemap.xml`: list all four page URLs, each `<url>` carrying `xhtml:link rel="alternate" hreflang` entries for en / fr / x-default (requires the `xmlns:xhtml` namespace on `<urlset>`).
- `/api/contact`: unchanged validation (returns JSON codes, language-agnostic). The client posts an explicit `lang` field (`'en'`/`'fr'`) with the form; store it on the record and include it in the Slack message so the owner knows which site the inquiry came from. Slack copy stays English. (`lang` is untrusted input — coerce to exactly `'en'`/`'fr'`, default `'en'`.)
- `robots.txt`: unchanged (already points at the sitemap).

## SEO details

- **hreflang** (in each page `<head>`): `<link rel="alternate" hreflang="en" href="https://emptywine.com{path}">`, `hreflang="fr"` → `/fr{path}`, `hreflang="x-default"` → English. Reciprocal on both language versions.
- **canonical**: each page points to itself (its own language URL).
- **og:locale**: `en_US` / `fr_FR`; `og:locale:alternate` names the other. `og:url` is the current language URL. Same `/og.jpg` image for both.
- **sitemap**: multilingual with `xhtml:link` alternates so Google clusters the language variants.

## UX — language toggle

- A compact **EN · FR** control in the nav; the inactive language links to the counterpart URL of the current page (`/` ⇄ `/fr`, `/preview` ⇄ `/fr/preview`); active language is styled as current and non-link.
- Mirror it in the footer.
- The toggle preserves the page (does not always dump the user on the homepage).

## What stays English

- The **Slack inquiry notification** (audience is the site owner), annotated with the inquiry's source language.
- The **commented-out testimonial section** — gets FR strings in the dictionary but remains hidden until real quotes exist.
- Decorative wine terminology (*Appellation Contrôlée*, *Grand Réserve*, *Premier Cru*, *Blanc de Blancs*, *Édition Limitée*) — already French, identical in both versions.

## Non-goals (YAGNI)

- No third language, no translation-management system, no runtime string interpolation library — a plain typed dictionary is enough.
- No Accept-Language redirect, no cookie-based language memory.
- No separate French OG image (same banner works; only meta text differs).
- No translation of server-side spam/error codes (they are not shown as text to users).

## Testing / verification

- `npm run check` (tsc + wrangler dry-run) passes.
- Local dev: `/`, `/fr`, `/preview`, `/fr/preview` all return 200 with correct `<html lang>` and translated visible copy (headless render checks).
- Each page's `<head>` contains correct reciprocal hreflang, canonical, and og:locale (assert via curl/grep).
- `sitemap.xml` validates: 4 URLs, alternate annotations present.
- Language toggle navigates to the correct counterpart URL from each of the four pages.
- The `/preview` builder works in French: live label updates, style switch, vintage toggle, per-field sizing, print export (PNG/PDF), and localized modal/validation.
- No horizontal overflow at 360px on the French pages (mirrors the English mobile QA).
- Contact submission from `/fr` stores the record and the Slack message notes source language = fr.

## Open item for the owner

- The French copy is **draft for native review** — a native/professional pass is advised before it's the public face of the brand, especially the hero line and value propositions.
