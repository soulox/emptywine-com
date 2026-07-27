# French Bilingual Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve emptywine in English (`/`, `/design`) and French (`/fr`, `/fr/design`) from a shared page structure, with a language toggle and full SEO (hreflang, per-locale metadata, multilingual sitemap).

**Architecture:** Extract every user-facing string into a typed dictionary (`src/i18n.ts`, `COPY.en`/`COPY.fr`). The two page modules change from exported constant strings to `render*(lang)` functions that interpolate `COPY[lang]`; all CSS/SVG/image data-URIs stay shared literals so the two languages can never drift visually. The Worker routes each language/page to the right render call and emits per-language `<head>` SEO tags.

**Tech Stack:** TypeScript, Cloudflare Workers (`wrangler`), no framework, no build step for the HTML (template literals). No test framework exists — verification is `npm run check` (tsc + `wrangler deploy --dry-run`) plus `curl`/`grep` assertions and headless-Chrome render checks.

## Global Constraints

- Build/CI gate is `npm run check` — must pass after every task.
- No new runtime dependencies; no front-end build step. Plain template-literal HTML, ES5-style inline IIFE JS.
- Existing English URLs `/` and `/preview` must keep working (`/preview` becomes a 301 to `/design`).
- Absolute URLs in SEO tags use `https://emptywine.com`.
- French is formal corporate register (vouvoiement), luxury tone. Delivered as **draft for native review** — do not treat as final.
- Decorative wine terms already in French (Appellation Contrôlée, Grand Réserve, Premier Cru, Blanc de Blancs, Édition Limitée) are identical in both languages — leave them as-is.
- The builder's internal file/function names (`src/preview.ts`, `renderPreview`) stay; only the public route (`/design`) and nav word ("Design") change.
- `lang` values are exactly `'en' | 'fr'`; any external/untrusted `lang` input is coerced to one of these, defaulting to `'en'`.

---

## File Structure

- **Create `src/i18n.ts`** — `Lang` type, `Copy` interface, `COPY: Record<Lang, Copy>`, and helpers: `otherLang(lang)`, `ogLocale(lang)`, `headTags(opts)` (builds the shared per-language `<head>` SEO block).
- **Modify `src/landing.ts`** — `export const LANDING_PAGE` → `export function renderLanding(lang: Lang): string`; strings sourced from `COPY[lang]`; lang-aware `<head>`; EN/FR toggle in nav + footer; builder links point to the language-correct `/design`.
- **Modify `src/preview.ts`** — `export const PREVIEW_PAGE` → `export function renderPreview(lang: Lang): string`; same treatment; localize the few JS-generated strings; back-link + toggle respect language.
- **Modify `src/index.ts`** — import render functions; add `/fr`, `/design`, `/fr/design` routes and `/preview`→`/design` 301s; multilingual `sitemap.xml`; store + Slack-annotate the contact `lang`.

---

## Task 1: i18n module + landing page renders from the dictionary (English only, output unchanged)

**Files:**
- Create: `src/i18n.ts`
- Modify: `src/landing.ts` (whole module: `LANDING_PAGE` const → `renderLanding` function)
- Modify: `src/index.ts` (the `GET /` route)

**Interfaces:**
- Produces: `type Lang = 'en' | 'fr'`; `interface Copy` (see below); `const COPY: Record<Lang, Copy>`; `function otherLang(l: Lang): Lang`; `function ogLocale(l: Lang): string` (returns `'en_US'`/`'fr_FR'`); `function headTags(o: { lang: Lang; path: string; title: string; description: string; ogTitle: string; ogDescription: string }): string`. `renderLanding(lang: Lang): string`.
- Consumes: nothing (first task).

**`Copy` interface** — group the fields; this is the contract every later task uses:

```ts
export type Lang = 'en' | 'fr';

export interface Copy {
  // shared / nav
  navProcess: string; navLabels: string; navDesign: string; navWhyUs: string; navContact: string;
  navCommission: string;            // nav CTA
  // hero
  heroKicker: string; heroTitleHtml: string;   // may contain <br> and <em>
  heroSub: string; heroCtaCommission: string; heroCtaBuilder: string;
  heroMetaOriginLabel: string; heroMetaOriginValue: string;
  heroMetaFormatLabel: string; heroMetaFormatValue: string;
  heroMetaDeliveryLabel: string; heroMetaDeliveryValue: string;
  // marquee (industries)
  marquee: string[];
  // process
  howKicker: string; howTitleHtml: string; howSub: string;
  howStep1Title: string; howStep1Body: string;
  howStep2Title: string; howStep2Body: string;
  howStep3Title: string; howStep3Body: string;
  // gallery
  galKicker: string; galTitleHtml: string; galNote: string;
  galCard1Name: string; galCard1Desc: string;
  galCard2Name: string; galCard2Desc: string;
  galCard3Name: string; galCard3Desc: string;
  // builder CTA band
  bcKicker: string; bcTitleHtml: string; bcSub: string; bcCta: string;
  // ethos
  ethosKicker: string; ethosQuoteHtml: string;
  ethos1Term: string; ethos1Body: string;
  ethos2Term: string; ethos2Body: string;
  ethos3Term: string; ethos3Body: string;
  // trust (hidden section — still translated)
  trustKicker: string; trustTitleHtml: string;
  // contact
  contactKicker: string; contactTitleHtml: string; contactSub: string;
  contactEmailLabel: string; contactResponseLabel: string; contactResponseValue: string;
  cfName: string; cfNamePh: string; cfNameErr: string;
  cfCompany: string; cfCompanyPh: string; cfCompanyErr: string;
  cfEmail: string; cfEmailPh: string; cfEmailErr: string;
  cfPhone: string; cfPhonePh: string;
  cfMessage: string; cfMessagePh: string; cfHint: string;
  cfSubmit: string; cfSending: string; cfSuccess: string; cfError: string;
  // footer
  footerCopy: string;
  // preview / design builder
  pvBack: string; pvKicker: string; pvTitleHtml: string;
  pvBrand: string; pvBrandPh: string; pvCollection: string; pvCollectionPh: string;
  pvVarietal: string; pvVarietalPh: string; pvVintage: string; pvVintagePh: string;
  pvStyle: string; pvStyleCream: string; pvStyleNoir: string; pvStyleBlanc: string;
  pvTextSizes: string; pvSizeBrand: string; pvSizeCollection: string; pvSizeClass: string;
  pvSizeVarietal: string; pvSizeVintage: string;
  pvCommission: string; pvNoteHtml: string;
  // download modal
  dlKicker: string; dlTitle: string; dlNote: string;
  dlPngSub: string; dlPdfSub: string; dlCommission: string; dlRendering: string;
  // <head> per page
  landingTitle: string; landingDesc: string; landingOgTitle: string; landingOgDesc: string;
  designTitle: string; designDesc: string; designOgTitle: string; designOgDesc: string;
}
```

- [ ] **Step 1: Create `src/i18n.ts` with the type, interface, and `COPY.en`.** Populate `COPY.en` by lifting the **exact current English strings** from `src/landing.ts` and `src/preview.ts` (e.g. `heroTitleHtml: 'the label<br>is the <em>gift</em>'`, `heroSub: 'Give a bottle no one else can give. We design a wine label around your brand — an original, made only for you — and deliver it, beautifully, to every desk and doorstep that matters.'`, `marquee: ['Finance','Technology','Real Estate','Consulting','Luxury Retail','Private Equity','Architecture','Law & Advisory']`, etc.). Add `COPY.fr` as a shallow copy of `COPY.en` for now (`fr: { ...enObject }`) so types are satisfied; real French lands in Task 2/4. Add the helpers:

```ts
export function otherLang(l: Lang): Lang { return l === 'en' ? 'fr' : 'en'; }
export function ogLocale(l: Lang): string { return l === 'en' ? 'en_US' : 'fr_FR'; }
// path is the English canonical path ('/' or '/design'); fr prefixes with /fr
function urlFor(lang: Lang, path: string): string {
  const base = 'https://emptywine.com';
  if (lang === 'en') return base + path;
  return base + '/fr' + (path === '/' ? '' : path);
}
export function headTags(o: { lang: Lang; path: string; title: string; description: string; ogTitle: string; ogDescription: string }): string {
  const en = urlFor('en', o.path), fr = urlFor('fr', o.path), self = urlFor(o.lang, o.path);
  return [
    '<title>' + o.title + '</title>',
    '<meta name="description" content="' + o.description + '" />',
    '<link rel="canonical" href="' + self + '" />',
    '<link rel="alternate" hreflang="en" href="' + en + '" />',
    '<link rel="alternate" hreflang="fr" href="' + fr + '" />',
    '<link rel="alternate" hreflang="x-default" href="' + en + '" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="emptywine" />',
    '<meta property="og:url" content="' + self + '" />',
    '<meta property="og:title" content="' + o.ogTitle + '" />',
    '<meta property="og:description" content="' + o.ogDescription + '" />',
    '<meta property="og:image" content="https://emptywine.com/og.jpg" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:locale" content="' + ogLocale(o.lang) + '" />',
    '<meta property="og:locale:alternate" content="' + ogLocale(otherLang(o.lang)) + '" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + o.ogTitle + '" />',
    '<meta name="twitter:description" content="' + o.ogDescription + '" />',
    '<meta name="twitter:image" content="https://emptywine.com/og.jpg" />'
  ].join('\n');
}
```

- [ ] **Step 2: Convert `src/landing.ts` to a function.** Change `export const LANDING_PAGE = \`…\`;` to `import { COPY, Lang, headTags } from './i18n';\n\nexport function renderLanding(lang: Lang): string {\n  const t = COPY[lang];\n  const alt = lang === 'en' ? '/fr' : '/';\n  return \`…\`;\n}`. Replace each hardcoded English user-facing string in the template with the matching `${t.field}` (e.g. `<h1>${t.heroTitleHtml}</h1>`, hero sub `<p class="hero-sub">${t.heroSub}</p>`, nav items, process, gallery captions, builder-cta, ethos, contact, footer, and the JS `'Sending...'` → `'${t.cfSending}'`). Replace the `<title>`/description/OG block in `<head>` with `${headTags({ lang, path: '/', title: t.landingTitle, description: t.landingDesc, ogTitle: t.landingOgTitle, ogDescription: t.landingOgDesc })}` and set `<html lang="${lang}">`. Do **not** touch CSS, SVG, or image data-URIs. Leave the language toggle for Task 2 (nav unchanged for now except strings).

- [ ] **Step 3: Update the `/` route in `src/index.ts`.** Change `import { LANDING_PAGE } from './landing';` → `import { renderLanding } from './landing';`. In the `GET /` block: `return new Response(renderLanding('en'), { headers: { 'content-type': 'text/html;charset=UTF-8' } });`.

- [ ] **Step 4: Build.** Run: `npm run check` — Expected: passes (no TS errors, dry-run OK).

- [ ] **Step 5: Verify output unchanged.** With `npm run dev` running, run:
`curl -s http://127.0.0.1:8787/ | grep -c 'the label'` → Expected: `1`;
`curl -s http://127.0.0.1:8787/ | grep -o '<html lang="[^"]*"'` → Expected: `<html lang="en"`;
`curl -s http://127.0.0.1:8787/ | grep -c 'data:image/webp'` → Expected: `4` (images intact).
Headless render check (reuse the session's CDP screenshot approach) → hero/gallery/contact look identical to before.

- [ ] **Step 6: Commit.**
```bash
git add src/i18n.ts src/landing.ts src/index.ts
git commit -m "refactor: render landing page from a typed i18n dictionary (en)"
```

---

## Task 2: French landing copy + `/fr` route + language toggle + landing SEO head

**Files:**
- Modify: `src/i18n.ts` (fill real `COPY.fr` landing fields)
- Modify: `src/landing.ts` (add EN/FR toggle markup + CSS in nav and footer)
- Modify: `src/index.ts` (add `GET /fr`)

**Interfaces:**
- Consumes: `renderLanding`, `COPY`, `otherLang`, `headTags` from Task 1.
- Produces: `GET /fr` route; `.lang-toggle` nav/footer control.

- [ ] **Step 1: Fill `COPY.fr` for all landing + shared fields** (draft French, formal register). Use these translations verbatim:

```ts
// nav
navProcess: 'Processus', navLabels: 'Étiquettes', navDesign: 'Design', navWhyUs: 'Pourquoi nous', navContact: 'Contact',
navCommission: 'Commander une étiquette',
// hero
heroKicker: 'Cadeaux d’entreprise en vin sur mesure',
heroTitleHtml: 'l’étiquette<br>est le <em>cadeau</em>',
heroSub: 'Offrez une bouteille que personne d’autre ne peut offrir. Nous concevons une étiquette de vin à l’image de votre marque — une création originale, faite pour vous seul — et la livrons, avec élégance, sur chaque bureau et à chaque porte qui compte.',
heroCtaCommission: 'Commander une étiquette', heroCtaBuilder: 'Essayer le générateur →',
heroMetaOriginLabel: 'Origine', heroMetaOriginValue: 'Domaines de Bordeaux et Bourgogne',
heroMetaFormatLabel: 'Format', heroMetaFormatValue: '75 cl, bouché et ciré',
heroMetaDeliveryLabel: 'Livraison', heroMetaDeliveryValue: 'Nominative, partout',
// marquee
marquee: ['Finance','Technologie','Immobilier','Conseil','Luxe','Capital-investissement','Architecture','Droit & Conseil'],
// process
howKicker: 'Le Processus', howTitleHtml: 'du brief<br>à la <em>bouteille</em>',
howSub: 'Trois étapes, environ trois semaines. Vous n’intervenez que là où cela compte — le brief et l’approbation finale.',
howStep1Title: 'Partagez votre brief', howStep1Body: 'Dites-nous votre marque, l’occasion et l’impression que vous souhaitez laisser. Deux minutes. Aucune expérience en design requise.',
howStep2Title: 'Nous concevons votre étiquette', howStep2Body: 'Notre IA génère une étiquette sur mesure — affinée par notre équipe jusqu’à ce qu’elle soit incontestablement la vôtre. Vous validez chaque détail.',
howStep3Title: 'Livrée pour impressionner', howStep3Body: 'Des bouteilles premium, votre étiquette, un écrin soigné. Livrées à votre porte ou directement à chaque destinataire.',
// gallery
galKicker: 'Design d’étiquette', galTitleHtml: 'chaque étiquette,<br>une <em>histoire</em>',
galNote: 'Chaque design est généré uniquement pour votre marque. Aucun modèle. Rien de tout fait.',
galCard1Name: 'Aldergate &amp; Co', galCard1Desc: 'Le classique ivoire d’un cabinet d’avocats de tradition — filets de bronze, sobriété d’un grand domaine.',
galCard2Name: 'Vireon', galCard2Desc: 'Une entreprise technologique en noir mat et or — affirmée et moderne.',
galCard3Name: 'Solstice Partners', galCard3Desc: 'Le blanc épuré d’un cabinet de conseil — typographie précise, un seul sceau de cire.',
// builder CTA
bcKicker: 'Aperçu en direct', bcTitleHtml: 'voyez-la <em>avant</em><br>de commander',
bcSub: 'Saisissez le nom de votre entreprise, choisissez un style et regardez votre étiquette apparaître sur la bouteille — en quelques secondes. Téléchargez-la prête à imprimer, ou envoyez-la-nous directement.',
bcCta: 'Ouvrir le générateur →',
// ethos
ethosKicker: 'Pourquoi emptywine',
ethosQuoteHtml: 'Une bouteille se boit et s’oublie.\n      <em>Un cadeau qui porte leur nom se garde.</em>',
ethos1Term: 'Aucune ne se ressemble', ethos1Body: 'Chaque étiquette est générée pour votre marque seule — aucun modèle, aucune image de banque, rien qu’une autre entreprise pourrait recevoir.',
ethos2Term: 'Finie à la main', ethos2Body: 'L’IA nous donne la première ébauche en quelques secondes. Nos designers l’affinent jusqu’à ce qu’elle semble pressée par un domaine centenaire.',
ethos3Term: 'Livrée partout', ethos3Body: 'Vin premium, votre étiquette, emballage de présentation. Envoyé à votre bureau en une caisse, ou à chaque destinataire nommément.',
// trust (hidden)
trustKicker: 'En leurs mots', trustTitleHtml: 'des cadeaux dont <em>on se souvient</em>',
// contact
contactKicker: 'Nous contacter', contactTitleHtml: 'commandez<br>votre <em>étiquette</em>',
contactSub: 'Parlez-nous de vos besoins en cadeaux et nous répondrons sous 24 heures avec une proposition et des designs d’exemple.',
contactEmailLabel: 'E-mail', contactResponseLabel: 'Délai de réponse', contactResponseValue: 'Sous 24 heures',
cfName: 'Nom complet', cfNamePh: 'Rosalind Achebe', cfNameErr: 'Veuillez saisir votre nom.',
cfCompany: 'Entreprise', cfCompanyPh: 'Larkfield &amp; Voss', cfCompanyErr: 'Veuillez saisir votre entreprise.',
cfEmail: 'E-mail', cfEmailPh: 'rosalind@larkfield.co', cfEmailErr: 'Veuillez saisir une adresse e-mail valide.',
cfPhone: 'Téléphone (facultatif)', cfPhonePh: '+33 1 42 68 53 00',
cfMessage: 'Occasion & détails', cfMessagePh: 'ex. 200 bouteilles pour notre dîner client annuel en novembre. Étiquette sombre, logo de l’entreprise, Bordeaux de préférence.',
cfHint: 'Plus vous nous en dites, plus le premier échantillon sera juste.',
cfSubmit: 'Envoyer la demande', cfSending: 'Envoi…', cfSuccess: 'Merci — nous vous recontacterons sous 24 heures.',
cfError: 'Une erreur est survenue lors de l’envoi. Réessayez, ou écrivez-nous directement à hello@emptywine.com.',
// footer
footerCopy: '© 2026 emptywine. Tous droits réservés.',
// <head>
landingTitle: 'emptywine — Cadeaux d’entreprise en vin sur mesure',
landingDesc: 'Des étiquettes de vin sur mesure conçues par IA pour vos cadeaux d’entreprise. Votre marque sur chaque bouteille. Une impression inoubliable.',
landingOgTitle: 'emptywine — Cadeaux d’entreprise en vin sur mesure',
landingOgDesc: 'Une étiquette de vin sur mesure à l’image de votre marque, livrée avec élégance sur chaque bureau et à chaque porte qui compte.',
```

(Preview/design French fields are filled in Task 4; for now those `COPY.fr` fields may still hold the English copy carried over from Task 1.)

- [ ] **Step 2: Add the language toggle** to `renderLanding`'s nav and footer. In the nav `<ul class="nav-links">` region add, after the list, a toggle whose "other language" link points at `alt` (already computed: `/fr` on the EN page, `/` on the FR page):

```html
<div class="lang-toggle" aria-label="Language">
  <span class="lang-current">${lang === 'en' ? 'EN' : 'FR'}</span>
  <a href="${alt}" hreflang="${otherLang(lang)}">${lang === 'en' ? 'FR' : 'EN'}</a>
</div>
```

Add CSS near the nav rules:
```css
.lang-toggle { display: inline-flex; align-items: center; gap: 8px; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.12em; }
.lang-toggle .lang-current { color: var(--gold); }
.lang-toggle a { color: var(--text-2); text-decoration: none; transition: color 0.2s; }
.lang-toggle a:hover { color: var(--gold); }
#hero .lang-toggle .lang-current { color: #ecca82; }   /* readable over the dark banner */
#hero .lang-toggle a { color: rgba(253,250,243,0.75); }
```
Import `otherLang` in `landing.ts`. Mirror a compact toggle in the footer too.

- [ ] **Step 3: Add the `GET /fr` route** in `src/index.ts`, immediately after the `GET /` block:
```ts
if (method === 'GET' && (pathname === '/fr' || pathname === '/fr/')) {
  return new Response(renderLanding('fr'), { headers: { 'content-type': 'text/html;charset=UTF-8' } });
}
```

- [ ] **Step 4: Build.** Run: `npm run check` — Expected: passes.

- [ ] **Step 5: Verify.** With dev running:
`curl -s http://127.0.0.1:8787/fr | grep -o '<html lang="[^"]*"'` → `<html lang="fr"`;
`curl -s http://127.0.0.1:8787/fr | grep -c 'l’étiquette'` → `1`;
`curl -s http://127.0.0.1:8787/fr | grep -o 'hreflang="fr" href="[^"]*"'` → `hreflang="fr" href="https://emptywine.com/fr"`;
`curl -s http://127.0.0.1:8787/ | grep -o 'hreflang="fr" href="[^"]*"'` → same (reciprocal);
`curl -s http://127.0.0.1:8787/ | grep -c 'the label'` → `1` (English still English).
Headless: `/fr` renders French copy; toggle link on `/` points to `/fr` and vice-versa; no horizontal overflow at 360px.

- [ ] **Step 6: Commit.**
```bash
git add src/i18n.ts src/landing.ts src/index.ts
git commit -m "feat: French landing page at /fr with language toggle and hreflang"
```

---

## Task 3: Design builder renders from the dictionary (English) at `/design`

**Files:**
- Modify: `src/preview.ts` (`PREVIEW_PAGE` const → `renderPreview(lang)`)
- Modify: `src/index.ts` (serve `/design`)

**Interfaces:**
- Consumes: `COPY`, `Lang`, `headTags`, `otherLang` from Task 1.
- Produces: `renderPreview(lang: Lang): string`; `GET /design` route.

- [ ] **Step 1: Convert `src/preview.ts` to a function** exactly as Task 1 did for landing: `export function renderPreview(lang: Lang): string { const t = COPY[lang]; const alt = lang === 'en' ? '/fr/design' : '/design'; return \`…\`; }`. Replace user-facing strings with `${t.field}` (back-link `${t.pvBack}`, kicker/title, field labels + placeholders, style chips, "Text Sizes" + row labels, "Commission This Label" `${t.pvCommission}`, note, and the download-modal strings). Replace the JS-generated strings: `sub.textContent = 'rendering…'` → uses `${t.dlRendering}`; the two `.dl-btn-sub` originals come from the markup already. Set `<html lang="${lang}">` and replace the `<head>` title/description/OG block with `${headTags({ lang, path: '/design', title: t.designTitle, description: t.designDesc, ogTitle: t.designOgTitle, ogDescription: t.designOgDesc })}`. Add the same `.lang-toggle` markup+CSS to the preview nav (`alt` here is the design counterpart). Do not touch CSS/SVG/data-URIs/label geometry.

- [ ] **Step 2: Serve `/design`** in `src/index.ts`. Change `import { PREVIEW_PAGE } from './preview';` → `import { renderPreview } from './preview';`. Replace the `GET /preview` block with:
```ts
if (method === 'GET' && pathname === '/design') {
  return new Response(renderPreview('en'), { headers: { 'content-type': 'text/html;charset=UTF-8' } });
}
```

- [ ] **Step 3: Point English landing links at `/design`.** In `src/landing.ts`, change the nav "Design" link, the hero builder CTA, and the builder-cta band CTA hrefs from `/preview` to `/design` (English page). (French hrefs handled by the `alt`/lang logic in Task 4; for the EN render they are `/design`.) Simplest: make the builder path a variable `const designPath = lang === 'en' ? '/design' : '/fr/design';` inside `renderLanding` and use it for all three links.

- [ ] **Step 4: Build.** Run: `npm run check` — Expected: passes.

- [ ] **Step 5: Verify parity with old `/preview`.** With dev running:
`curl -s http://127.0.0.1:8787/design | grep -o '<html lang="[^"]*"'` → `<html lang="en"`;
`curl -s http://127.0.0.1:8787/design | grep -c 'data:image/webp'` → `1` (the bottle);
Headless: the `/design` builder works exactly as before — type a brand (label updates), switch style, toggle vintage numeral, move a size slider, open the download modal, export a PNG and a PDF. All function; layout identical to the old `/preview`.

- [ ] **Step 6: Commit.**
```bash
git add src/preview.ts src/index.ts src/landing.ts
git commit -m "refactor: builder renders from dictionary, served at /design (en)"
```

---

## Task 4: French builder at `/fr/design` + preview French copy + toggle

**Files:**
- Modify: `src/i18n.ts` (fill real `COPY.fr` preview/design + `<head>` design fields)
- Modify: `src/index.ts` (add `GET /fr/design`)

**Interfaces:**
- Consumes: `renderPreview` (Task 3), `COPY`.
- Produces: `GET /fr/design` route.

- [ ] **Step 1: Fill `COPY.fr` preview/design fields** (draft French). Use verbatim:

```ts
pvBack: '← Retour au site', pvKicker: 'Aperçu en direct', pvTitleHtml: 'concevez<br>votre <em>étiquette</em>',
pvBrand: 'Marque / nom de l’entreprise', pvBrandPh: 'Larkfield &amp; Voss',
pvCollection: 'Nom de la cuvée', pvCollectionPh: 'The Heritage Reserve',
pvVarietal: 'Vin / cépage', pvVarietalPh: 'Bourgogne · Pinot Noir',
pvVintage: 'Millésime', pvVintagePh: '2025',
pvStyle: 'Style d’étiquette', pvStyleCream: 'Ivoire classique', pvStyleNoir: 'Noir prestige', pvStyleBlanc: 'Blanc épuré',
pvTextSizes: 'Tailles de texte', pvSizeBrand: 'Marque', pvSizeCollection: 'Cuvée', pvSizeClass: 'Réserve',
pvSizeVarietal: 'Cépage', pvSizeVintage: 'Millésime',
pvCommission: 'Commander cette étiquette',
pvNoteHtml: '<b>Mise à jour en direct</b> pendant que vous tapez. Téléchargez un fichier prêt à imprimer, ou confiez-nous la production de la bouteille finale.',
dlKicker: 'Fichier prêt à imprimer', dlTitle: 'Téléchargez votre étiquette',
dlNote: 'Visuel d’étiquette haute résolution, prêt pour l’impression. Choisissez un format :',
dlPngSub: 'image 300 DPI', dlPdfSub: 'document d’impression',
dlCommission: 'Vous préférez qu’on l’imprime et la livre ? Commandez →', dlRendering: 'rendu…',
designTitle: 'Concevez votre étiquette — emptywine',
designDesc: 'Prévisualisez une étiquette de vin sur mesure pour votre marque, en direct. Saisissez votre nom, choisissez un style et voyez-la sur la bouteille.',
designOgTitle: 'Concevez votre étiquette — emptywine',
designOgDesc: 'Prévisualisez une étiquette de vin sur mesure pour votre marque, en direct — saisissez votre nom, choisissez un style, téléchargez-la prête à imprimer.',
```

Leave the on-label default text (`Appellation Contrôlée`, `emptywine`, `Grand Réserve`, `Burgundy · Pinot Noir`, `MMXXV`) as-is in both languages — it is decorative wine vocabulary rendered on the mockup, not UI copy. (The `pvVarietalPh` placeholder uses `Bourgogne` in FR; the live default label text stays `Burgundy · Pinot Noir` unless the user types.)

- [ ] **Step 2: Add `GET /fr/design`** in `src/index.ts`, right after the `GET /design` block:
```ts
if (method === 'GET' && pathname === '/fr/design') {
  return new Response(renderPreview('fr'), { headers: { 'content-type': 'text/html;charset=UTF-8' } });
}
```

- [ ] **Step 3: Build.** Run: `npm run check` — Expected: passes.

- [ ] **Step 4: Verify.** With dev running:
`curl -s http://127.0.0.1:8787/fr/design | grep -o '<html lang="[^"]*"'` → `<html lang="fr"`;
`curl -s http://127.0.0.1:8787/fr/design | grep -c 'Concevez'` → ≥`1`;
`curl -s http://127.0.0.1:8787/fr/design | grep -o 'hreflang="en" href="[^"]*"'` → `hreflang="en" href="https://emptywine.com/design"`.
Headless: `/fr/design` UI is French; builder fully functional (label updates, style switch, vintage toggle, size sliders, PNG/PDF export, French download modal); toggle from `/design` → `/fr/design` and back; no 360px overflow.

- [ ] **Step 5: Commit.**
```bash
git add src/i18n.ts src/index.ts
git commit -m "feat: French builder at /fr/design"
```

---

## Task 5: `/preview` redirects, multilingual sitemap, contact language

**Files:**
- Modify: `src/index.ts` (redirects, sitemap, contact handler + `notifySlack`)
- Modify: `src/landing.ts` (post `lang` from the contact form)

**Interfaces:**
- Consumes: everything prior.
- Produces: 301s for `/preview` and `/fr/preview`; multilingual `sitemap.xml`; `lang` on the stored contact record + Slack message.

- [ ] **Step 1: Add legacy redirects** in `src/index.ts` (before the 404), so old links don't break:
```ts
if (method === 'GET' && pathname === '/preview')     return Response.redirect('https://emptywine.com/design', 301);
if (method === 'GET' && pathname === '/fr/preview')  return Response.redirect('https://emptywine.com/fr/design', 301);
```

- [ ] **Step 2: Replace the `sitemap.xml` body** with a multilingual sitemap (all four URLs, reciprocal `xhtml:link` alternates):
```ts
const loc = (p: string) => 'https://emptywine.com' + p;
const alts = (en: string, fr: string) =>
  '<xhtml:link rel="alternate" hreflang="en" href="' + loc(en) + '"/>' +
  '<xhtml:link rel="alternate" hreflang="fr" href="' + loc(fr) + '"/>' +
  '<xhtml:link rel="alternate" hreflang="x-default" href="' + loc(en) + '"/>';
const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${loc('/')}</loc>${alts('/', '/fr')}<priority>1.0</priority></url>
  <url><loc>${loc('/fr')}</loc>${alts('/', '/fr')}<priority>1.0</priority></url>
  <url><loc>${loc('/design')}</loc>${alts('/design', '/fr/design')}<priority>0.8</priority></url>
  <url><loc>${loc('/fr/design')}</loc>${alts('/design', '/fr/design')}<priority>0.8</priority></url>
</urlset>
`;
```

- [ ] **Step 3: Post `lang` from the contact form.** In `src/landing.ts`'s contact submit script, add `data.lang = ${JSON.stringify(lang)};` when building the payload (so the EN page posts `'en'`, the FR page posts `'fr'`). (The template literal interpolates the render-time `lang`.)

- [ ] **Step 4: Store + notify the language** in the `POST /api/contact` handler. After coercing inputs, add:
```ts
const langRaw = String((body as { lang?: unknown }).lang ?? 'en');
const lang = langRaw === 'fr' ? 'fr' : 'en';
```
Include `lang` in the `env.CONTACTS.put(...)` JSON record, and pass it to `notifySlack`. In `notifySlack`, append a line to the message: `` `*Language:* ${inquiry.lang === 'fr' ? 'French (/fr)' : 'English'}` `` (extend the `inquiry` param type with `lang: string`). Slack copy stays English.

- [ ] **Step 5: Build.** Run: `npm run check` — Expected: passes.

- [ ] **Step 6: Verify.** With dev running:
`curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://127.0.0.1:8787/preview` → `301 https://emptywine.com/design`;
`curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8787/fr/preview` → `301`;
`curl -s http://127.0.0.1:8787/sitemap.xml | grep -c 'hreflang'` → `12` (3 alternates × 4 urls);
`curl -s http://127.0.0.1:8787/sitemap.xml | grep -c '<loc>'` → `4`.
Contact test (clear the local rate-limit key first as in prior sessions): POST a valid inquiry with `"lang":"fr","elapsed":5000` → stored record contains `"lang":"fr"`; if a mock Slack webhook is wired via `.dev.vars`, the payload contains `French (/fr)`.

- [ ] **Step 7: Commit.**
```bash
git add src/index.ts src/landing.ts
git commit -m "feat: /preview 301s, multilingual sitemap, contact language tracking"
```

---

## Post-implementation

- Run the full session verification sweep: `npm run check`; headless screenshots of `/`, `/fr`, `/design`, `/fr/design` at desktop + 360px; confirm all four `<head>`s have correct reciprocal hreflang/canonical/og:locale.
- Update `CLAUDE.md` architecture notes to mention the bilingual routes and `src/i18n.ts` (small doc edit, separate commit).
- Flag to the owner: **French copy is draft — native review recommended** before treating as final, especially the hero line (`l’étiquette est le cadeau`) and value propositions.

## Self-review notes (done)

- **Spec coverage:** URL structure (Tasks 2–5), default+toggle (Task 2/3), full-parity scope (Tasks 1–4), i18n architecture (Task 1), hreflang/canonical/og:locale (`headTags`, Task 1; used 2/3/4), multilingual sitemap (Task 5), `/preview`→`/design` 301 (Task 5), contact language + Slack annotation (Task 5), Slack stays English (Task 5), decorative wine terms untouched (Tasks 1/4 notes), draft-for-review flag (post-impl). All covered.
- **Placeholder scan:** none — French copy is provided verbatim; English is lifted from named source files; all code shown.
- **Type consistency:** `Lang`, `Copy`, `COPY`, `otherLang`, `ogLocale`, `headTags`, `renderLanding`, `renderPreview` names/signatures consistent across tasks; `notifySlack` inquiry type extended with `lang` in Task 5.
