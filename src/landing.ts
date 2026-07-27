import { COPY, Lang, headTags } from './i18n';

export function renderLanding(lang: Lang): string {
  const t = COPY[lang];
  const alt = lang === 'en' ? '/fr' : '/';
  const marqueeHtml = t.marquee.concat(t.marquee).map(function(m) {
    return '    <span class="marquee-item"><strong>' + m + '</strong></span><span class="marquee-dot"></span>';
  }).join('\n');
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
${headTags({ lang, path: '/', title: t.landingTitle, description: t.landingDesc, ogTitle: t.landingOgTitle, ogDescription: t.landingOgDesc })}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2040%2040'%3E%3Ccircle%20cx='20'%20cy='20'%20r='20'%20fill='%238a6a3c'/%3E%3Cpath%20fill='%23fbfaf7'%20d='M18.4%207h3.2v4.4q0%201.1%20.75%201.95l.7%20.8q1.45%201.6%201.45%203.9V30q0%201.5-1.5%201.5h-6.4q-1.5%200-1.5-1.5V18.05q0-2.3%201.45-3.9l.7-.8Q18.4%2012.5%2018.4%2011.4z'/%3E%3Crect%20x='15.4'%20y='22.2'%20width='9.2'%20height='4.4'%20fill='%238a6a3c'/%3E%3C/svg%3E" />
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* champagne-light palette — token names kept from the old theme;
     values remapped so --noir is now the light page and --cream the dark ink */
  --noir:     #fbfaf7;
  --noir-2:   #f4f1ea;
  --noir-3:   #ece7dc;
  --noir-4:   #e4decf;
  --gold:     #836237;
  --gold-2:   #916f3f;
  --gold-3:   #6f5530;
  --gold-dim: rgba(138,106,60,0.14);
  --gold-rule: rgba(138,106,60,0.38);
  --seal:     #836237;
  --cream:    #2a2723;
  --cream-2:  #211f1b;
  --cream-3:  #1a1815;
  --text:     #47423b;
  --text-2:   #6b655c;
  --text-3:   #787061;
  --border:   rgba(42,39,35,0.12);
  --error:    #a24b3a;
}

html { scroll-behavior: smooth; }

body {
  background: var(--noir);
  color: var(--text);
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-weight: 400;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* visible keyboard focus indicator (does not affect mouse users) */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
  border-radius: 2px;
}
/* over the dark hero banner, use a light ring for contrast */
#hero a:focus-visible { outline-color: #fdfaf3; }

body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.02;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* sentinel drives the nav's scrolled state without a scroll listener */
#nav-sentinel {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 60px;
  pointer-events: none;
}

/* ── NAV ── */
#main-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 56px;
  height: 76px;
  transition: background 0.5s ease, border-color 0.5s ease;
  border-bottom: 1px solid transparent;
}

#main-nav.scrolled {
  background: rgba(251,250,247,0.82);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  border-color: var(--border);
  box-shadow: 0 1px 30px rgba(42,39,35,0.05);
}

.nav-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--gold);
  text-decoration: none;
}

.brand-mark {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  color: var(--gold);
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.nav-logo:hover .brand-mark { transform: scale(1.07); }

.brand-word {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--cream);
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 40px;
  list-style: none;
}

.nav-links a {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  color: var(--text-2);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s;
}

.nav-links a:hover { color: var(--gold); }

.nav-cta {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cream);
  text-decoration: none;
  border: 1px solid var(--gold-rule);
  padding: 11px 24px;
  border-radius: 2px;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}

.nav-cta:hover { background: var(--cream); color: var(--noir); border-color: var(--cream); }

/* ── HERO ── */
#hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* full-bleed Tuscany banner */
.hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

.hero-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(to bottom, rgba(22,15,8,0.4) 0%, rgba(22,15,8,0) 15%),
    linear-gradient(100deg, rgba(22,15,8,0.84) 0%, rgba(22,15,8,0.58) 32%, rgba(22,15,8,0.14) 60%, rgba(22,15,8,0) 78%),
    linear-gradient(to top, rgba(22,15,8,0.5) 0%, rgba(22,15,8,0) 34%);
}

.hero-overlay {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 128px 56px 96px;
}

/* light-on-dark treatment for the copy sitting over the photo */
#hero .hero-kicker { color: #e6ca94; }
#hero .hero-kicker::before { background: #e6ca94; opacity: 0.75; }
#hero .hero-copy h1 { color: #fdfaf3; text-shadow: 0 2px 32px rgba(18,12,6,0.4); }
#hero .hero-copy h1 em { color: #ecca82; }
#hero .hero-sub { color: rgba(253,250,243,0.9); }
#hero .hero-meta { border-top-color: rgba(253,250,243,0.26); }
#hero .hero-meta-item { color: rgba(253,250,243,0.86); border-right-color: rgba(253,250,243,0.22); }
#hero .hero-meta-item b { color: #e6ca94; }
#hero .btn-primary { background: #fdfaf3; color: #26221d; }
#hero .btn-primary:hover { background: #ffffff; box-shadow: 0 16px 36px rgba(0,0,0,0.3); }
#hero .btn-ghost { color: rgba(253,250,243,0.92); border-bottom-color: rgba(253,250,243,0.42); }
#hero .btn-ghost:hover { color: #ffffff; border-color: #ffffff; }

/* nav rides light over the hero banner, reverts to dark once scrolled onto light content */
#main-nav .brand-word,
#main-nav .nav-links a,
#main-nav .nav-cta { transition: color 0.4s ease, border-color 0.4s ease, background 0.25s ease; }
#main-nav:not(.scrolled) .brand-word { color: #fdfaf3; }
#main-nav:not(.scrolled) .nav-links a { color: rgba(253,250,243,0.82); }
#main-nav:not(.scrolled) .nav-links a:hover { color: #ffffff; }
#main-nav:not(.scrolled) .nav-cta { color: #fdfaf3; border-color: rgba(253,250,243,0.5); }
#main-nav:not(.scrolled) .nav-cta:hover { background: #fdfaf3; color: #26221d; border-color: #fdfaf3; }

.hero-copy { max-width: 600px; }

.hero-kicker {
  display: block;
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 32px;
  position: relative;
  padding-left: 40px;
}

.hero-kicker::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 24px;
  height: 1px;
  background: var(--gold);
  opacity: 0.65;
}

.hero-copy h1 {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-weight: 300;
  font-size: clamp(3rem, 5.6vw, 5rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  color: var(--cream);
  margin-bottom: 30px;
}

.hero-copy h1 em { font-style: normal; font-weight: 600; color: var(--gold); }

.hero-sub {
  font-size: 1.15rem;
  font-weight: 300;
  color: var(--text-2);
  line-height: 1.8;
  max-width: 440px;
  margin-bottom: 48px;
}

.hero-actions {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
}

.btn-primary {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--noir);
  background: var(--cream);
  text-decoration: none;
  padding: 17px 38px;
  border-radius: 2px;
  transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
}

.btn-primary:hover {
  background: #423d36;
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(42,39,35,0.14);
}

.btn-primary:active { transform: translateY(0) scale(0.98); box-shadow: 0 4px 12px rgba(42,39,35,0.12); }
.nav-cta:active { transform: scale(0.97); }

.btn-ghost {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-2);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  padding-bottom: 3px;
  transition: color 0.2s, border-color 0.2s;
}

.btn-ghost:hover { color: var(--gold); border-color: var(--gold-rule); }

/* hero meta — editorial fact strip, divided by rules (no card boxes) */
.hero-meta {
  display: flex;
  flex-wrap: wrap;
  margin-top: 46px;
  border-top: 1px solid var(--border);
  padding-top: 22px;
}

.hero-meta-item {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--text-2);
  line-height: 1.4;
  padding-right: 22px;
  margin-right: 22px;
  border-right: 1px solid var(--border);
}

.hero-meta-item:last-child { border-right: none; margin-right: 0; padding-right: 0; }

.hero-meta-item b {
  display: block;
  font-weight: 700;
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 5px;
}

/* ── MARQUEE ── */
#marquee {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 20px 0;
  overflow: hidden;
  background: var(--noir-2);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marqueeScroll 30s linear infinite;
}

.marquee-item {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-weight: 600;
  font-size: 0.72rem;
  color: var(--text-3);
  white-space: nowrap;
  padding: 0 26px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.marquee-item strong {
  font-weight: 600;
  color: var(--text-2);
}

.marquee-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  background: var(--gold);
  opacity: 0.42;
  transform: rotate(45deg);
  margin: 0 18px;
  vertical-align: middle;
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ── SECTION BASE ── */
.section-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 56px;
}

.section-kicker {
  display: block;
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 18px;
}

.section-title {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-weight: 300;
  font-size: clamp(2rem, 3.5vw, 3.2rem);
  line-height: 1.06;
  letter-spacing: -0.035em;
  color: var(--cream);
  margin-bottom: 16px;
}

.section-title em { font-style: normal; font-weight: 600; color: var(--gold); }

.section-sub {
  font-size: 1.05rem;
  font-weight: 300;
  color: var(--text-2);
  line-height: 1.8;
  max-width: 460px;
}

/* ── REVEAL ── */
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.85s ease, transform 0.85s ease;
}

.reveal.visible { opacity: 1; transform: none; }
.reveal-d1 { transition-delay: 0.1s; }
.reveal-d2 { transition-delay: 0.2s; }
.reveal-d3 { transition-delay: 0.3s; }
.reveal-d4 { transition-delay: 0.45s; }
.reveal-d5 { transition-delay: 0.6s; }

/* ── HOW IT WORKS ── */
#how {
  padding: 130px 0;
  background: var(--noir-2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

/* asymmetric: sticky heading column + vertical stepped list (no card grid) */
.how-inner {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 88px;
  align-items: start;
}

.how-aside { position: sticky; top: 116px; }

.how-aside .section-sub { margin-top: 22px; }

.how-steps { display: flex; flex-direction: column; }

.how-step {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 34px;
  padding: 42px 0;
  border-top: 1px solid var(--border);
  align-items: baseline;
  transition: opacity 0.4s ease;
}

.how-step:first-child { border-top: none; padding-top: 4px; }
.how-step:last-child { padding-bottom: 4px; }

.step-num {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-weight: 300;
  font-size: 3.1rem;
  line-height: 0.9;
  color: var(--gold-dim);
  letter-spacing: -0.02em;
  min-width: 76px;
}

.step-num b {
  font-size: 0.92rem;
  vertical-align: super;
  color: var(--gold);
  opacity: 0.6;
  font-weight: 400;
  letter-spacing: 0.1em;
}

.step-title {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--cream);
  margin-bottom: 12px;
  line-height: 1.15;
  letter-spacing: -0.01em;
  transition: color 0.25s ease;
}

.how-step:hover .step-title { color: var(--gold-3); }

.step-body {
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-2);
  line-height: 1.78;
  max-width: 46ch;
}

/* ── GALLERY ── */
#gallery { padding: 120px 0; }

.gallery-header {
  margin-bottom: 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
}

.gallery-note {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-style: normal;
  font-size: 1rem;
  color: var(--text-3);
  max-width: 260px;
  text-align: right;
  line-height: 1.75;
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.9fr 1.05fr;
  gap: 40px;
  align-items: end;
}

.g-label-wrap {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* asymmetric vertical stagger — reads as an art-directed shelf, not a 3-up row */
.g-label-wrap:nth-child(1) { transform: translateY(30px); }
.g-label-wrap:nth-child(2) { transform: translateY(-16px); }
.g-label-wrap:nth-child(3) { transform: translateY(48px); }

.g-label {
  transition: transform 0.55s cubic-bezier(0.23, 1, 0.32, 1);
}

.g-label:hover { transform: translateY(-10px) rotate(0deg) !important; }

.g-label-card {
  position: relative;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.g-label-wrap:nth-child(1) .g-label-card { height: 468px; }
.g-label-wrap:nth-child(2) .g-label-card { height: 404px; }
.g-label-wrap:nth-child(3) .g-label-card { height: 436px; }

/* cursor-tracked spotlight glow behind each bottle */
.g-label-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(138,106,60,0.12), transparent 62%);
  opacity: 0;
  transition: opacity 0.45s ease;
  pointer-events: none;
}

.g-label:hover .g-label-card::before { opacity: 1; }

/* photographic bottle with a legible mock-brand label overlaid */
.g-bottle {
  position: relative;
  height: 100%;
  display: inline-flex;
}

.g-bottle-img {
  height: 100%;
  width: auto;
  display: block;
  filter: drop-shadow(-8px 22px 34px rgba(58,44,26,0.2)) drop-shadow(0 5px 12px rgba(58,44,26,0.1));
  transition: transform 0.55s cubic-bezier(0.23,1,0.32,1);
}

.g-label:hover .g-bottle-img { transform: translateY(-6px); }

/* label sits on the bottle body (same proportions as the /preview bottle) */
.g-lbl {
  position: absolute;
  top: 41%;
  left: 17%;
  width: 66%;
  height: 25.5%;
  container-type: size;
  background: linear-gradient(168deg, #faf6ec 0%, #f2e8d5 45%, #e6d8c2 100%);
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8% 9%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.28);
}

/* curvature: soft edges + specular band so the label wraps the round glass */
.g-lbl::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: soft-light;
  background: linear-gradient(90deg,
    rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.18) 9%, rgba(255,255,255,0) 24%,
    rgba(255,255,255,0.48) 38%, rgba(255,255,255,0) 52%,
    rgba(0,0,0,0.12) 82%, rgba(0,0,0,0.55) 100%);
}

.g-lbl-app { font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 5.4cqh; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(60,40,10,0.5); margin-bottom: 5.5cqh; line-height: 1.1; }
.g-lbl-brand { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-weight: 500; font-size: 15cqh; line-height: 1; color: #18110a; margin-bottom: 4cqh; }
.g-lbl-rule { width: 62%; height: 1px; background: linear-gradient(to right, transparent, rgba(130,90,18,0.5), transparent); margin-bottom: 4cqh; }
.g-lbl-class { font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 5cqh; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(60,40,10,0.6); margin-bottom: 3.5cqh; line-height: 1.1; }
.g-lbl-var { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 8cqh; color: rgba(60,40,10,0.46); margin-bottom: 4cqh; line-height: 1.05; }
.g-lbl-year { font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 5.4cqh; letter-spacing: 0.22em; color: rgba(80,55,14,0.62); line-height: 1; }

/* noir + blanc label variants */
.g-lbl-noir { background: linear-gradient(168deg, #17140f 0%, #241f18 100%); }
.g-lbl-noir .g-lbl-brand { color: #d8b25f; }
.g-lbl-noir .g-lbl-app, .g-lbl-noir .g-lbl-class, .g-lbl-noir .g-lbl-var, .g-lbl-noir .g-lbl-year { color: rgba(216,178,95,0.72); }
.g-lbl-noir .g-lbl-rule { background: linear-gradient(to right, transparent, rgba(216,178,95,0.4), transparent); }
.g-lbl-blanc { background: #faf9f7; }
.g-lbl-blanc .g-lbl-brand { color: #1b1512; }
.g-lbl-blanc .g-lbl-app, .g-lbl-blanc .g-lbl-class, .g-lbl-blanc .g-lbl-var, .g-lbl-blanc .g-lbl-year { color: rgba(27,21,18,0.5); }
.g-lbl-blanc .g-lbl-rule { background: linear-gradient(to right, transparent, rgba(27,21,18,0.22), transparent); }

.g-label-name {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.1rem;
  color: var(--text-2);
}

.g-label-desc {
  font-size: 0.92rem;
  font-weight: 300;
  color: var(--text-3);
  line-height: 1.65;
}

/* ── ETHOS ── */
#ethos {
  padding: 130px 0;
  background: var(--noir-2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

#ethos::before {
  content: '';
  position: absolute;
  top: -160px;
  right: -80px;
  width: 620px;
  height: 620px;
  background: radial-gradient(ellipse at center, rgba(200,168,72,0.06) 0%, transparent 68%);
  pointer-events: none;
}

/* asymmetric: oversized pull-quote left, divided rationale list right */
.ethos-inner {
  display: grid;
  grid-template-columns: 1.28fr 0.72fr;
  gap: 80px;
  align-items: start;
  position: relative;
}

.ethos-kicker { text-align: left; }

.ethos-quote {
  position: relative;
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-weight: 300;
  font-size: clamp(2rem, 3.7vw, 3.35rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--cream);
  text-align: left;
  max-width: none;
  margin: 26px 0 0;
}

.ethos-quote em {
  display: block;
  font-style: normal;
  color: var(--gold-2);
  margin-top: 10px;
}

.ethos-quote::before {
  content: '';
  display: block;
  width: 14px;
  height: 14px;
  margin: 0 0 32px;
  background: var(--seal);
  transform: rotate(45deg);
  box-shadow: 0 0 0 5px rgba(138,106,60,0.16);
}

.ethos-list {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
}

.ethos-item {
  background: transparent;
  padding: 26px 0;
  border-top: 1px solid var(--border);
}

.ethos-item:first-child { border-top: none; padding-top: 0; }
.ethos-item:last-child { padding-bottom: 0; }

.ethos-num {
  display: block;
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 12px;
}

.ethos-body {
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-2);
  line-height: 1.7;
}

/* ── LABEL BUILDER CTA ── */
#builder-cta {
  padding: 120px 0;
  border-top: 1px solid var(--border);
}

.builder-cta-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 72px;
  align-items: center;
}

.builder-cta-copy .section-sub { margin: 18px 0 36px; }

/* a stylized label "chip" that hints at the live builder */
.builder-cta-visual {
  justify-self: center;
  width: 260px;
  height: 340px;
  background: linear-gradient(168deg, #faf6ec 0%, #f2e8d5 45%, #e6d8c2 100%);
  border-radius: 4px;
  box-shadow: 0 26px 54px -22px rgba(58,44,26,0.34), 0 6px 16px -8px rgba(58,44,26,0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 30px;
  text-decoration: none;
  position: relative;
  transition: transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease;
}

.builder-cta-visual::before {
  content: '';
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(150,110,25,0.4);
  pointer-events: none;
}

.builder-cta-visual:hover {
  transform: translateY(-8px) rotate(-1.5deg);
  box-shadow: 0 34px 64px -22px rgba(58,44,26,0.4), 0 10px 20px -8px rgba(58,44,26,0.18);
}

.bcv-line { font-family: 'Manrope', sans-serif; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(60,40,10,0.6); }
.bcv-appellation { font-size: 0.5rem; font-weight: 700; margin-bottom: 18px; }
.bcv-brand {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: 2rem;
  color: #18110a;
  margin-bottom: 14px;
  transition: color 0.3s ease;
}
.builder-cta-visual:hover .bcv-brand { color: var(--gold-3); }
.bcv-rule { width: 60%; height: 1px; background: linear-gradient(to right, transparent, rgba(130,90,18,0.5), transparent); margin-bottom: 14px; }
.bcv-class { font-size: 0.5rem; font-weight: 600; margin-bottom: 12px; }
.bcv-year { font-size: 0.56rem; font-weight: 600; letter-spacing: 0.3em; color: rgba(90,62,14,0.7); }

/* ── TRUST / TESTIMONIALS ── */
#trust {
  padding: 120px 0;
  background: var(--noir-2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.trust-header { margin-bottom: 60px; max-width: 620px; }
.trust-header .section-title { margin-top: 14px; }

.trust-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
}

.trust-quote {
  background: var(--noir-2);
  padding: 48px 44px 44px;
  margin: 0;
  position: relative;
}

.trust-quote::before {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  background: var(--seal);
  transform: rotate(45deg);
  margin-bottom: 28px;
  opacity: 0.85;
}

.trust-quote blockquote {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--cream);
  margin: 0 0 26px;
}

.trust-quote figcaption {
  display: flex;
  flex-direction: column;
  gap: 3px;
  border-top: 1px solid var(--border);
  padding-top: 18px;
}

.tq-role {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
}

.tq-meta { font-size: 0.82rem; font-weight: 300; color: var(--text-3); font-style: italic; }

/* ── CONTACT ── */
#contact { padding: 120px 0; }

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: start;
}

.contact-intro { padding-top: 6px; }

.contact-detail {
  margin-top: 44px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
}

.contact-detail-label {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-2);
  margin-bottom: 9px;
  display: block;
}

.contact-detail-value {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-style: normal;
  font-size: 1.1rem;
  color: var(--text-2);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.field-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-2);
}

.field input,
.field textarea {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 1rem;
  font-weight: 300;
  padding: 10px 0;
  outline: none;
  transition: border-color 0.25s;
  width: 100%;
}

.field input:focus,
.field textarea:focus { border-color: var(--gold-rule); }

.field textarea { resize: none; height: 100px; }

.field input::placeholder,
.field textarea::placeholder { color: var(--text-3); }

.field-hint {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--text-3);
  margin-top: 2px;
  letter-spacing: 0;
  text-transform: none;
}

.field-error {
  display: none;
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--error);
  margin-top: 2px;
  letter-spacing: 0;
  text-transform: none;
}

.field.error input,
.field.error textarea { border-color: var(--error); }
.field.error .field-error { display: block; }
.field.error .field-hint { display: none; }

/* honeypot: present in the DOM for bots, off-screen for humans (not display:none) */
.hp-field {
  position: absolute;
  left: -9999px;
  top: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

#contact-error {
  display: none;
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--error);
  padding: 13px 16px;
  border: 1px solid var(--error);
  border-radius: 2px;
  background: rgba(162,75,58,0.05);
}

.contact-form button {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: var(--cream);
  color: var(--noir);
  border: none;
  border-radius: 2px;
  padding: 18px 40px;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.25s, box-shadow 0.25s, transform 0.2s;
}

.contact-form button:hover {
  background: #423d36;
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(42,39,35,0.14);
}
.contact-form button:active { transform: translateY(0) scale(0.98); box-shadow: 0 4px 12px rgba(42,39,35,0.12); }
.contact-form button:disabled { opacity: 0.5; cursor: default; transform: none; }

#contact-success {
  display: none;
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-style: normal;
  font-size: 1.2rem;
  color: var(--gold);
  padding: 28px 0;
  border-top: 1px solid var(--border);
  line-height: 1.7;
}

/* ── FOOTER ── */
footer {
  border-top: 1px solid var(--border);
  padding: 44px 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--gold);
  text-decoration: none;
  opacity: 0.7;
}

.footer-logo .brand-word { font-size: 1.35rem; }
.footer-mark { width: 26px; height: 26px; }

.footer-copy {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
}

.footer-links { display: flex; gap: 28px; }

.footer-links a {
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover { color: var(--gold); }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  #main-nav { padding: 0 36px; }
  .hero-overlay { padding: 112px 36px 84px; }
  .section-wrap { padding: 0 36px; }
  .how-inner { gap: 56px; }
  .ethos-inner { gap: 56px; }
}

/* collapse the asymmetric two-column sections to single column */
@media (max-width: 900px) {
  .nav-links { display: none; }
  .hero-overlay { padding: 100px 24px 80px; }
  .hero-copy { max-width: 100%; }
  .hero-scrim { background: linear-gradient(to top, rgba(22,15,8,0.82) 0%, rgba(22,15,8,0.5) 52%, rgba(22,15,8,0.4) 100%); }
  .section-wrap { padding: 0 24px; }

  .how-inner { grid-template-columns: 1fr; gap: 36px; }
  .how-aside { position: static; }

  .gallery-grid { grid-template-columns: 1fr; gap: 56px; }
  .gallery-header { flex-direction: column; align-items: flex-start; }
  .gallery-note { text-align: left; max-width: 100%; }
  .g-label-wrap:nth-child(1),
  .g-label-wrap:nth-child(2),
  .g-label-wrap:nth-child(3) { transform: none; }
  .g-label-wrap:nth-child(1) .g-label-card,
  .g-label-wrap:nth-child(2) .g-label-card,
  .g-label-wrap:nth-child(3) .g-label-card { height: 360px; }

  .ethos-inner { grid-template-columns: 1fr; gap: 40px; }
  .builder-cta-inner { grid-template-columns: 1fr; gap: 44px; }
  .builder-cta-visual { order: -1; }
  .ethos-quote { margin-bottom: 0; }

  .contact-layout { grid-template-columns: 1fr; gap: 56px; }
  .field-group { grid-template-columns: 1fr; }
  footer { padding: 32px 24px; flex-direction: column; text-align: center; }
  #how, #gallery, #ethos, #contact, #builder-cta, #trust { padding: 84px 0; }
  .trust-grid { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
  .hero-meta-item {
    border-right: none;
    margin-right: 0;
    padding-right: 0;
    flex: 1 1 100%;
    padding-bottom: 12px;
  }
  .hero-meta { gap: 0; }
}

/* respect users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .marquee-track { animation: none; }
  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
</style>
</head>
<body>

<span id="nav-sentinel" aria-hidden="true"></span>

<!-- NAV -->
<nav id="main-nav">
  <a href="#" class="nav-logo" aria-label="emptywine — home">
    <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#8a6a3c"/>
      <path fill="#fbfaf7" d="M18.4 8h3.2v4.2q0 1.1 .75 1.95l.7 .8q1.45 1.6 1.45 3.9V29.4q0 1.5-1.5 1.5h-6.4q-1.5 0-1.5-1.5V20.85q0-2.3 1.45-3.9l.7-.8Q18.4 13.3 18.4 12.2z"/>
      <rect x="15.4" y="22.6" width="9.2" height="4.4" fill="#8a6a3c"/>
    </svg>
    <span class="brand-word">emptywine</span>
  </a>
  <ul class="nav-links">
    <li><a href="#how">${t.navProcess}</a></li>
    <li><a href="#gallery">${t.navLabels}</a></li>
    <li><a href="/preview">${t.navDesign}</a></li>
    <li><a href="#ethos">${t.navWhyUs}</a></li>
    <li><a href="#contact">${t.navContact}</a></li>
  </ul>
  <a href="#contact" class="nav-cta">${t.navCommission}</a>
</nav>

<!-- HERO -->
<section id="hero">
  <img class="hero-bg-img" src="data:image/webp;base64,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" alt="A wine bottle and two glasses of red wine on a wooden table overlooking a sunlit Tuscan vineyard at golden hour" />
  <div class="hero-scrim" aria-hidden="true"></div>
  <div class="hero-overlay">
    <div class="hero-copy">
      <span class="hero-kicker">${t.heroKicker}</span>
      <h1>${t.heroTitleHtml}</h1>
      <p class="hero-sub">${t.heroSub}</p>
      <div class="hero-actions">
        <a href="#contact" class="btn-primary">${t.heroCtaCommission}</a>
        <a href="/preview" class="btn-ghost">${t.heroCtaBuilder}</a>
      </div>
      <div class="hero-meta">
        <div class="hero-meta-item"><b>${t.heroMetaOriginLabel}</b>${t.heroMetaOriginValue}</div>
        <div class="hero-meta-item"><b>${t.heroMetaFormatLabel}</b>${t.heroMetaFormatValue}</div>
        <div class="hero-meta-item"><b>${t.heroMetaDeliveryLabel}</b>${t.heroMetaDeliveryValue}</div>
      </div>
    </div>
  </div>
</section>

<!-- MARQUEE -->
<div id="marquee" aria-hidden="true">
  <div class="marquee-track">
${marqueeHtml}
  </div>
</div>

<!-- HOW IT WORKS -->
<section id="how">
  <div class="section-wrap">
    <div class="how-inner">
      <div class="how-aside">
        <span class="section-kicker reveal">${t.howKicker}</span>
        <h2 class="section-title reveal reveal-d1">${t.howTitleHtml}</h2>
        <p class="section-sub reveal reveal-d2">${t.howSub}</p>
      </div>
      <div class="how-steps">
        <div class="how-step reveal">
          <span class="step-num">01</span>
          <div>
            <h3 class="step-title">${t.howStep1Title}</h3>
            <p class="step-body">${t.howStep1Body}</p>
          </div>
        </div>
        <div class="how-step reveal reveal-d1">
          <span class="step-num">02</span>
          <div>
            <h3 class="step-title">${t.howStep2Title}</h3>
            <p class="step-body">${t.howStep2Body}</p>
          </div>
        </div>
        <div class="how-step reveal reveal-d2">
          <span class="step-num">03</span>
          <div>
            <h3 class="step-title">${t.howStep3Title}</h3>
            <p class="step-body">${t.howStep3Body}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- LABELS GALLERY -->
<section id="gallery">
  <div class="section-wrap">
    <div class="gallery-header">
      <div>
        <span class="section-kicker reveal">${t.galKicker}</span>
        <h2 class="section-title reveal reveal-d1">${t.galTitleHtml}</h2>
      </div>
      <p class="gallery-note reveal reveal-d2">${t.galNote}</p>
    </div>
    <div class="gallery-grid">

      <div class="g-label-wrap reveal">
        <div class="g-label">
          <div class="g-label-card">
            <div class="g-bottle">
              <img class="g-bottle-img" src="data:image/webp;base64,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" alt="Aldergate and Co custom wine label" />
              <div class="g-lbl">
                <span class="g-lbl-app">Appellation Contrôlée</span>
                <span class="g-lbl-brand">Aldergate &amp; Co</span>
                <span class="g-lbl-rule"></span>
                <span class="g-lbl-class">Grand Réserve</span>
                <span class="g-lbl-var">Bordeaux · Cabernet</span>
                <span class="g-lbl-year">MMXXV</span>
              </div>
            </div>
          </div>
        </div>
        <p class="g-label-name">${t.galCard1Name}</p>
        <p class="g-label-desc">${t.galCard1Desc}</p>
      </div>

      <div class="g-label-wrap reveal reveal-d2">
        <div class="g-label">
          <div class="g-label-card">
            <div class="g-bottle">
              <img class="g-bottle-img" src="data:image/webp;base64,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" alt="Vireon custom wine label" />
              <div class="g-lbl g-lbl-noir">
                <span class="g-lbl-app">La Signature</span>
                <span class="g-lbl-brand">Vireon</span>
                <span class="g-lbl-rule"></span>
                <span class="g-lbl-class">Premier Cru</span>
                <span class="g-lbl-var">Napa · Cabernet</span>
                <span class="g-lbl-year">MMXXV</span>
              </div>
            </div>
          </div>
        </div>
        <p class="g-label-name">${t.galCard2Name}</p>
        <p class="g-label-desc">${t.galCard2Desc}</p>
      </div>

      <div class="g-label-wrap reveal reveal-d4">
        <div class="g-label">
          <div class="g-label-card">
            <div class="g-bottle">
              <img class="g-bottle-img" src="data:image/webp;base64,UklGRpI4AABXRUJQVlA4WAoAAAAQAAAAEAEASwQAQUxQSHEMAAARsIfs/yQ10ueHElklzUjIiIORwcFxjwQj5iCywZXBzcFkDiNzD8keWfcKWfdyz+zsvRvCHCaEiJlDR0aWbKNsJGEkEjxQhoyIwUSkpUOLkbax6aKLbqqL4vf9Q81RVb9jZ7OpiJgABF9nrmMAmDKw+4NtBxvv+eCTqN/feH8P1gDle6GQ+aH7WFTQGZ+753hb6fWFufsb/6QIbRMlG0LrFskaW+8bg/333he+Q/Y90+xAhtv3l+J9/5o1B8L9aw+eA5h8MQCNv/vZ6h/0Opn7aHK6j06W7jvPmA5lzczafPGtUgBMsrC5pqonE199J03+axyvrC6AbL8cmUySj9+eGdsiXc/GLPL1zIR01XUkyd9z14rB5Opjm3zeur47D3Ldafgd2TdfkqwO/6Plo7qBx97QD69rh9uHtYMZPsSk6n3T94goLFedhgDM9+Wq9Ndx7nN8+a0nINEMaIg4fne7CXK9oWXB92JvSNbbd8jv5avL8r/bTZLVYfhf4lQFwHQCkdVTCGlmwJmUACj573IwOWIoOHbdFgGZZ3dCkgubF0mQmV/L0g8WuSiWW6WIAccSJErnxluFEoS8+u60MIgPh2So6IpN4swMSFFhOKMfzEe1Y0CvZkBR/bClGRrmHNIMz0S4SMw+gElPwy1bJPbsT7ZALxAtHdINTmS/dpj7AkREO9CdQ5rBvnGsVH6emeciMfsAJj0Nt2yRZAZCkN+C3UOWQPiIBDGg1xTI6JEC+QEK+7PCsCZfBZgMDeREkbtRDznOq+7igqD57XLEgD0Xs0LgkdNPytHqp4YzIkh3QKaf6HdE0ClRDNjTmeL+d4HJ0+oDEUc3NEcfFeLgvG7Y32NwzdBjk//LVofxqBA9tnaoO5/kmoEdW3A0w9kV8n+pYsB5Uy8g1DRsaYavjmVJM7CSnrReYMDZlF4A0GE8OlWPrR1ar+e4ZkBz1NENL+iH5odCPDevHd6I6YbTi+T/srW/x+CaAQcijm5ojmqHAxHdsPtckmuG7hz5v2x1Gtqh4+FU57/wUNG9xDVD2T/mHL3AgLMpvQDgvKEdOgKXdEA7vL9BN9BST5VuoOhu3ZCbqg3899C/bks7/O021w04EnN0w6F57dAc/R+Mg/O64bHWO7rhXJIEKFkXSTs095tcM+DZeUc3HI5qhwMR3VB+Ms41w/smCVCyLuiHHls7/O6mwzUDXr/taAUGPBPRC8Cus0nuf3x2l0ydSZAAjavVMpX/46T/mV0bIdWbjt2y/c6eai2VKYaCKxm/I4ruling8atZ38tN1Qb+e9gOw5euZPQCCuo/szTD4XmbNMPLi1w3NEcdLVejHSa36gae7G3UDETZk9ph+WdBXQ7O64bQiUUuhFaJOpMgIcZPSNSHWTHYUycLpanDEAPxkZBuyAw8lMrsA5gMMeBMShD2zR+XQYrzyntNQRAtHZKjrw6bJEonsl+Oqme4OOYkaev1nDhmG7RDpEk3kDPXphvIOiNFVUJJnpKirdrhuUGTC2TlTwCTnp+ZJFJr8PBGSO+P4kIhPlWhG6zRMjCpYcC374iFJ7rqILd5288bYiEyWiSn8FKOBMsXj8hOf1Y4sZekhgG9pmjIDDcxiUFB7ZAlHHLCkNlvzNgk3nQ3kxeG3XNcQHzx/aelBdv/GRcRUbQGTFbezpCQ7VsHIacM+NOKmMiJfE9KGFjrpC0ooskTRRKC4pdjJG4+EgKTj9eXSOCZT8sgoS8scIGRcaVGMhjQ+ElaaOT07AWYRACVn5LoeX9FHmTyq+OW8CgzXCkNDPjmgEXitz8rAZMDBuwOkww6keMlkMWKYS4FREYbk4SdoxmSxTvtABMdA/b3OSSPi3/eDCY4YNslksrU8U0Q/VPjObmg5J9F13A1S7K58G4+mKgYUP9vTvK59IvHIe7KQZLSdGuhsLZOWHJCidNCYsD+AZtkNXZ6I5hoGLArTBKbPFEC8T45bMsMGb8Rz57RLMntnXaAiYMBjWGHZHfh5CYwYQDbBkiCjePFEGflRE6GKPkXcTw7ZJEcL7Tng4nh20mS5eVflEKIhW1xLktk/KJACOdXSKIT7b7HUHJ6kWQ62wEwf8MTv0mTVFuDjflgvsb+YZJk89k98HGG/PfjJN321MsA8yuU/WmZZPzaywDzqU2/MUnOJ+sK4NPtBkm6PdvoSwx4x5Q1HqkD8yGEXr5mSVvi7a0A85+qGU7ybr9fDB+umLAkjoyBTWC+woCd3Stc5si4sA1+yoCqTk6Sb7dXMR8Bigcskn7rE1+pGTBI/s33AeYXDDujpID29PGNYD6BoqNRRwGI4m8UwS9PJkgR460+UXxqnlQxeRxg3mMonuDKYPY25MMPq0ctZSBnaKMfNE5mSR0z/8kH89zrg5wUksdOl8PbDOi2SS3Nk1u8BWx431AMMts9Vtm7TKppnAKYdxieuknKmRs9EoKHv/TcTVs5iKYrvNSywEk9rdFyzzDgWIJUNBlu8Ary67rSSkJGi2c2XrFJSfniEc8U9WUUJfayRxjQa6oJZa+8wTyBosYRS1HICQPMCw0Rh1Q13VMADzLsnlMXSlzc6gHsObPC1YWidV542yKFtadrvfDnFbWpcV/xn2YcleHGf15wXfkkKW72D64ru2Ypzspf8tzFUHw1qzgU7yp2FarfXuSqw4c3u+v1JClvdiDkrldjXH2uPO4m9sspW30o2b/HTb02qfByk5suGCrkRA7qh/2uYcBZJeLZwTfdgqIDVy0VIrLfd03NLCc1TrW7ZvsNWzdUT+UUKXkKYO746qQqmb1V+XBn9ZQqkTVe6Y7mqyZXJfvzp93xuwwpszVe6Y6fxb/gwIAfLCnUSAnYA0N+daehTvbs0RI8+NDlHKl04kduuGQpVfwHbujPqBRfbHkYxMJR7RBv28D0AlH8/IYHxICLplrl+goeEEIHxnNqZfY+sP1RTprhm1FHNzTO2YH20l0A0wvWWFMx9ALx6F7dYN+q0w4zwbposV4z2Dd/s0UzpLsBphfM3g14wCpWoF8i2uHgEumGsh/P2HqBAf8y9QJQ1JfRDDU9cdIMz6VJN3x9OK0bsPlSRjNsPbvANcPOcII0AwrDGe3Qpx1C/YH/Av8F/gv8F/gv8F/gv0eDYGAXTb2A/JohSzM0ztqkGYqbr9t6gQEXTb0AhPozgf8C/wX+C/wX+C/wX+C/wH+B/x5ZZojrhsK3ZhzNALTGtcNP9MPPAv8F/gv8F/gv8N+juaS7AKYXchMvFUMvEL+9VzfYt+q0w8z/YNBCvWawb7SWaYZ0F8D0gtlbgAf/3770xwDTC2a4BA9escgYqtUN/PZe3WDP1AX+C/wX+C/wX+C/wH+B/wL/Bf4L/Bf4L/Bf4L/Af49O8YuEdvi1oR3KT8RsvcBQcd3SC0D1VO7/T/Hbe12wfdpWKWOo1gU1c1yhzHAJXBhqGrbUKf0xwB4YA9pT6mT2FsCNBR8amuErgynSDCW/mLb1AgPOGXoBYBcesmT3u6TXUSVufFiX547jEzmuSAtvAswNwEsxVVpsgVub9cORJOmGAyOmGlH8B67BU8OWGi3/yC0Mm4eUyJ49WuIWoOyaElkjJWCaYbwS7tUQ5ZOkxDNVLtr8bkyBeOxcmYuAvyTUJ9UOd4e+F3NUx+50F8Oum7bacKNnv7uAhoijOPPPwO2NMa42tPic6x57bjynNJGXi93GgD6VsSdbAeYyoKh7RWESbfAi23gyoS6ZP3kC+HFaVfjS36o98sK1nKLkPq8E8waqJ201sad3wqts25CZUBHKXHvdIwxo/sWfE7aZUQ7KnASYF9Ys+vjT8KWUciRPFcG7bGNow+YrtmpQsqcQzCtrVp8zVINWzlfDwwz49nJWNSjR5CUALdOjSeKcK4Qz/6zHireUhVMLsaxKzDV4iwFoaDny6iBPrzYsBeBGV6On1n8z3LW6Y4Tbtm3nuMwR2Z2+wPLzVuNwZGZ6enoyLnepdl9Y/7GdtbW1tU+fMhPLy8vL8ZSc8eiZMv9gWLvmD22rT5zNWJlMxsxJFtFMlX+sy7Bu5eXBy5cv93/OJYk7a1njlb5zl3nFq/Oei3A5SsT8j2Ht+oWUkUpx6TH+8WbU8bv1t5979+1Tb0fJWs3XsXMesK37yv3AsSxO1tLBws/tNcb8b+1zM+Pj42OfZdeZu+GB+ZHxex+7bvlBfHQsaY7NHH58LLvGhChKKysqKkq/Or9Oy3MeaCuuuPfSmkU/6NpUMjRVVhFC+dgqSlXfDwBWUDgg+isAADAUAZ0BKhEBTAQ+VSiRRiOiqiMiMsshQAqJZ0EopxGv8//sPSKT55enp5sN/7tgLwAc/ny+Z/9HOoCtpjjbY/rf/A5+uDXopeSFNv8uTVawi+M/HoKOdA50DrzPQa/Y71uPWE/dL1AP5L/5tYt7FfiX8AunX5S+hvor+o+6nO73teTj8w/xf8N7derd4juSvdH5x4qv0T/RewH+rHo15PH2T1D/5n/mvWF/1vMz9d+wZ/J/7V1i/219g39diVU2q0zDpnmUYKgY3832/HgfYH368R4/+rgh3BDuBUYlv4/PG50NiMF916U+kxMUTZgUZLqwpl3weinSkKEzYLuYvj6T00h96/nWbz9/na1z9EeFMiwIcvjPNcUvQ+U4nlZ8iIa7/3Z24znhYuN9Gw8rBK7LgesGAy7//crWoHrHgQDXObUYKzhTguciZkbgc3C8k5ixHJWRRquL1A7i0Riowma6I8O3ZsGLvEwmn6qGmw6DJDRsg32QFL/kie+Xylv2+Rbr5c7lSFIctpeLxyanaQlDYcWGjBTrT//8QhHAgUcUYrCgP7nDd0R7z70ai8RXM10R4dwKypxd/blHsj7dvP6UilMUWwl4iaYTDt5zbuLyo+Qoh1fTKGHhJn0I8hIzbzm3mpyhImyeVs3vquuffHGQq/fb/wNISiQZjr+uYwedBywe9E+4Ar+rMNqm3nNvOXreYIINRbOm5W4smaJioodAGkJRIMx9JRUt9YvskT8OAD5/3s6Ir6EeHcEOm/qMFBrE/5/H0/i7VHhzbKIF2FTlfCnG4VPWd0R4dwQmIgtwFqj6lLIt6TRt+bdY+dXUy7Fg08Sgjo3y9f0rQlEhKI0XP4mljR55tzmS5lo8wWd+bYTjDt5zbzXzELwYK2bNihcFK0F2XwUBcfl/0R4dwKz9196CvbgzC8k7OmgfKhHm5G/54bJyvNk1XP0R4UzS3FZB9sPkb9NQSibKcG8SbCzKRWCD/i1TutfHAd3X1w4So4py/hNRIBrmpu9bQcV73WpUdmXHYmZ36bqLjvrZitX9ne0YazbAHdQJogsNcWSDhIU7SDMV3MRmB0/vb2v6FUD7h+ryly4Yuzadcy1kHueXPa/r7BTrRXURZb3ltcEeE3oUHUlUaB9xMYLt3YBtHdPhb/5Wx7YZpdSSzGuCfHGwnrLZAYgL4HmCW09EeXJlQICy6U+p9uZWKYw+H3SjShP3FenertgT+AcpD0ko6m7ELWFwBvbH4fPYxVzrAWvTOfZyhVZ1r4uBj33r5ctsQQYGbS129x6R5Mv/NyMBzAm5hd8nfxzo7Dt6SkamJ/DYnK1M17nWg6SHYjpXlqzuBS8eOROXfplAtpawRZji5NKgJE9Z7MQ9dY5Kij3sc+tQssFefmjxmvIuTv1Q6Vqrf/fFbuIUJVMLIAzhyN8mPk4vuc1j3hbQxoIuc5erNdiG+svBjNK4zeOTSOwumCD+E6hUixVs9DmKB7/TOIjrJ8Jjnfto6G1dgDMgxPTTzYyWZBGqkcGQ19MoV5qQUExfGPH4R2X+K3ZCUv99diu7BAYj9AM5SwfrNjN9CHJdVnNaRb9gA3AhZdNv8yZVaZFF9fNSq8eGo6w3tsqXcqiYX7srXmhAo7HJrKcdh0/ZCDTbYzMHrI6PmE+GYBOqJbx4nTjcCo8uxm/v2KNheFznBSalbUUcmq1qyTv9EYaj5NTuIWs/KUorlwjFr1IqGM+V7+cUAafng4Z0b0DP6n0M5FAB6fc3YpBm0G+GErMbm64dXhKe9RfDx64u3/nyrkJqZqqYeZ0k05T+HAJ93d1UM8UT+fJddA2HwImnn1D74KuSzbi33BI43TFQx5x5GuHaj5PNZjrN06nd6ZkluAU0ayLUCfVgOsLFxPWIqeQjuIHRBYHMZvXCgE75y86iiejsqL8Mqe3+mJgfjFjunR6ga5JeGmnGFNkjSwc/bpr3K/D8O0+puY+tmBbVb0LgT+OXNbuEnkiEyCLGWhyeImdKNHASVmMerGhAmaEt3Sk3uvphXwUc1vlAX2LlZ/0axLx/e2f/VGLtAohjCTSxouxsvNyJofUWEtzcOXJ5+NWQXQR2lhUzrAJ8rSxrcP+sUVm35a0W1VmMm3WfIlA1kHYXQ20oGxFVEF3TGDU0Prt4RGIXkX3AnoCPb32UatdL7rBEhEKJOVK5runYdaS4iqVejS5IOSIdm571sXbDIeveI7qs0HmjpjtrM6B2VZo9ye8hfVSM4gEQFoAQCeDsZ4jzamgw7ROr7Q7ym+IQrAT+qsQq3WzfHA8n0saxxSLcB+rSVZ1g9kCIxJeuFF6OsdFeR9dO7W0nVkJtczA71uuiA1BHxgfstMMNONatvULvPSH5e7bhukc2nTfrqTpS+cmDsmfXgtUh4+CcM6vDm63RDSKsvzPabpPmBmndsxbXFaJvd0dAKDpTN8V2tNHqjPk/Pjvk73YNMd5EseGj/mJULAXh4q13V7oEzwHKoqbWyV5kh80nYyyaoaU7LELjwIIMsX+s7IL3tn/tVHG8dW1mYeUtITUyvAi+Eylt5VlIlOazAbNKoRhsK0m1Bm2ts7pRH2FDAkh3BNFZSmcLBGtW1Kyy/K3Wleyhz1I/yVD4goeX9RLnV1qSiLPdDzM6AGUNjg7JC76Zxl8viTzMgngUMLnLq1HPi3jMlBqMwt29Yhq3d91KP6FzP3C5zPyrZpWxL1rMp6VJ590aAi5GrQnE19ZT/2pSdA8FFvBpP1nc3zDWhRhfMpQoxdtG3B0BgpJ4DeSJzL8UovIPWl06Ht4y4G1ARNVUw8y7u6dl1hW3cerO5pRrw7JU1pGEEKKxtBJfF55+L/C5WjOclgEjlaeADAqPH0Sjt3LBjBBsQi7aSec8cH5Ak96b50BGh9OGzP/b+4mqS+2vr+bJEzWWcvun6hS2SE+7AwgRJF5SsHhruyNQgfMjzKjnkAl/TQAA/vqYgBc//P/hvhtYr/nwggivBuZi9yuk595dVe3//4de8Z2G6bjqfW5dkcdjkMQ4WHW0b9vsgkt4o5mt4lPBkTHY0N6TSEaSH56iqIU8/z4QIT1oCTLrHpObCJCP2ZxpwAEB+l4sLHjQfQ9TaD8JNjvHS2HMttV967cTVnmBHCFATpb7x0ZPZDxz/n6/ZGzEWFPlhgujRThFsgbnKaRjDVpGRykOhRqAcJKKWoUizjWx1rkmH5DP9hE3oa3EFJTFL8MD6o4Ri7k6pYANju4DZ79rZb3UxOP0XzWMS9SyARvNnKn8C+RZT/8frrOhs1pCDVmZiEqG7FdeFA1/w5hUHg7wx8gbiLSzEGQDjSxKmTHVZSMFYYBzMQtZp3NfUAZnTAiB9Ftoo4N9vRFTQ5baRiyc06tiIrzB+J2Ppaf4zO8/fv1YPcY/r4SH2ZICEHCVN6lLbqjXoevQfkiQXb+M0BurV5DBHGwiiPvE3txaxNyFEvNfE/eVGBTFDlNM+4Lfy+a0HJ/p+B7bKcY6fLmRQrJJd70OgQ9KMIgjRsu5s7kYbL5P6xF/l2PtH9Ku+54wgahleekhCfo8HfMgwp0j/5RGBqyuBNFhzkTdK/hapHW0e2fEABAeMC7ULBdRoPTQOz1fM/a6f2vGliwLl6oYPcqpudQE1T9nxfo0ulVYdPITJeJzS+NEAZjCtzsDLpxrEKMvrXSgj1sPxYWZWhShNc7oYW5rtkZhMEMbggO4pH9Wl2GHnHmkKl+m6uCIBcXnEbov/9Sd/pAR2lLsdASKNmgepVx8zG1oVTsCaLI6JxlVoFdwpxM8vP8sGQDDJht3otLsZ+1CFdNKyNweZDOreOaO1a0kTNxex+K9pP3TyacS+uVcagmIUxHSpaqKLxNnyGiU+BCZqnjXlR2fJuWKmWYLySkKB6cYQvYOekQOkHOX+8fgeh8/7vwPkm5djWUE0wEFF8+e8XxCv3enTHlvI4oHVyEWU6bAFp3OI0kP+aJY5r7wCXflKSz31LOSLso3XwdKav0OzYHzkometBHtSyOm6ZZdnHnJex7qkXLwlgSFYYUMdYgABiIt+4f5oKNsxW6GCEkuaqUX/UknubDCbE4Yta1sXeuXrDe6ihX3FW3qmF16qJHcIYHMfiRgBSjYnwVzRiDufb2/zrXk4QbaoiNap0kjAKjbVf5tJBMTPXc1KatLucqd5QnaWGamIaY1FFhyy0rEeMjrvXQSXwihMIcvJIUPJh3FswKh7JNpwNFLznK9lBbbv6JUWe8bBJB88JWKsXrXHN0qAAGjLwtQ+xgGK7Q3fuoCl8gI2Ed590EWwkPZvo+v6fjJ+OUo+gYGJekMpBhyutxR4YmBMUcz2sYCR4SzVZdldOCal8ys5ohfJeKbYyeeQx2SorSGhJJE+wfAe0E7LQxzXrYVUQpRk2/EEqJwobv8rbx4GeaPRPy3ooVVYk0T+F0fHgsQNYZrPWFmMzLez0ERemzNCQ5P5a49VZ7yWdcoNtcIR1g/aUdS9kwGgeBUwx4tdp1bjoj0STnVk18vP3VcF5rgxlp991a6pGi3aS6pvBTTPyB+wwtJx1siGk6OwcHMvuEK0Vh6hKxitN2Zrz5vjXBk8Xh6adSoo6JwcEQqD/VgFOP+j7Ih/nqj5NgIvbnJrxuro0JMAb8hcpx6udP3tD7PYngLFlbG8+0RlvzwN7VjAkUqsL047vNUCFDKWcDm/IvIXisK67VseB1mSwflbSF1ax0/KKzUxqgAASq+EnnqOlqnPDjsqpI6h70P1cnhZh3TjFS8VGPSYprytjZDPMT6JbOJppug9msb0A0HOb19ZDWcj1xgCin0bn0XNJnrPQOgtJjbHYCrn+sWEJuFB02ETht0B/Hm+jNVcYSSUEJ4QqtZo7ijRFyFbOXVkVhqWrW1boJd0Gnu6msfU6+5hqF/8yGDHNOXk1X6Y0x7hv4hmAAAhv0TWZbvVthYA3Hg9c4YiHBu8rg7Yl1gkiET1f5SiWgUNHGzGInaU0fIlNxPXmJ1c1oDwH8uTFvXk0Bdf6uPPJzxEwaOMWijnugdAq4FW37+YnvS4AAqJVXhrGIqP4ioK1BNPDLeL2KPf0Z/IWwMKzs66IHHDz5l0WT8kWUilPB67GgOse+uRWGpltRx6jFUGAAF2/5No4SgOqJGfaV/cZdwE0TytCZIhlByzHLFgSpQFrojiKI21nda0P97V+n13PJo+w46knaQ6lPJ6jfYQQAAYpZK2/M9xENkAEXM+7y+AX1af+LMGFSUNV95B8nDl5tWHvg0Rdsjzf2GvpZ0xpn7vqyh2fqytv91Jx2uWcOwABowZr7tGZXkahFx+kziDUvOchGJLIDAfVzG1AAQMlJ8iEJx6dxh/Mb+vgqkjHkgJi2l8Vzqjg4zz3gZLt7LABRc6/V39km/+gdInZxiTtO0bkGys3fxs36GgAAW39shcUItZIXlDN691g9OGPD6mPYfdTdjXOpQjWpP0Bab5YKq8vm6PPGoTJXKcXk4YCPrPq6n8oyawS5c2FIwQ4k1eAAPQqn2yOiKvMw8jZky/yO/dB8ZKqNL3tH86IOsMLEUThkDVFPpmK4XWowPPQhNF7BsQAKxwuN5mUc1LijOj46KER/tuhdKXlj25qC2VK1OdvIR9EHZE9wupKjhE5hieDNh+gAJlW6Bp22BilN50GmCDRMO52mbaDR7SO0XdswAGRjY3ECWqjXwAAl8SrJetoFXlW9sUqLairrhp3nvMK4wvEmzCc+dyNSnGsmIq/VMuUgib/7s6rdWpHiaRUu0QuZVvWwM6fezQD18z/Kps4Ms+4RyYDM3OkcEqpZLLipBh9jvTmXzSO33mZx/4KKcEx1+Y1Xr9fLWKs31JodXe8yEkrQcoi0l0FkeiAl6gBifTO2MHDHf48zTc40ktXfFVQ5voTbdfheTTV7btPFHZ6m6Gz6PPLjtwN/pL7JOgs6pkpYag8452a8xQZFEdQhqDsUYB1Ff5SEgKMHf1oXB/4Zoko0wVrrXJy2YuhWqbpCStdHHUK2Kx+P4tIr1jolkrXtPwia0bDU+5w+1muuXgAAP+S/fCa6I3v0sMNZTPazH2yBRSOyRRofmT+wpgQJz12aUbLVdGlBS4d16YBLFEtPOL+AItB5XALSy4pQcC/dycku1zyFaXPFGYTUj6AeXD3mUg6CaguO6s1JZfG5t9Nqnf7dRBJQ5iOLhOsmBgxAAAtANO4Fe/IY8VTsbeTUnQhDnPeCkHk3+82eERykpPHwKfL23hVm5vvMuVqlF0tjfOmbJyA5S77PwO3POvYj6R96VCbgvTostUdYQd7W7C6EFf1Tr9XtSMG2FT2IkVV8TYaPWAjl5mXJSAFq+YEfgAPUTWAAC/nbgfPyg0Jizc8gp0gJ7eNFbebC0w3Q6EvvXqnehzaHrc9tO5y4xO+VYwlk8tRWsis/1DxPuoLIOxqAPaLqQAFFxPtO6urxr8dpKau1b17tHsBb0jjMyX01impcBJaxuDBVWiNiFU/TV1ugXWKEkJM1xrvausurOsLSEImTEi6jKqYYIX+r2J8VYMuXgV/0bMe5ZrnWD0tURAV4xjhNvzdJ0+tzCvK0XjW54mAxr6o4hzgAAMxfWlVpCvitCyiX8h0hqLtxAMZXNN72wUeIYqcw/Iq8rgnyHxo5sy0butHtVzmBov2klE28to+qn7WLOMz46P91bdIex7rzD6t3W23udhA2ywT2ZoI1royFZV3ZjfFJGaWrpPcLuFMHL3h4KBjCU0o5SuY7SSOJ9h8lGqCbYf0d9Kc0J/JN1lC/N7X+zmagHqfDBwIGD/jyj5Q27xUsUqxbLgk1RCWnjA6Kw2CXP69uNrvMSk4CE5OUSI0My5rxSBugxerWte7kAiX9FpX3WBmK8dhCBQbmjkIgYaSpVn9bgPHShnaNSWTS/GAAHpt3rf6zhLF9jv9Gms4R/RblDGZZlFlHLQiousWsXglKQlVEDGWfCdWsYgFRraJDcXlTRdV5MzIuyruUpAbiSdQ2sWeaAxIodiKz/BckD3QOVoY+JSaZ5Q0aA2SL9dm/X/e54nPHiWQmA0yatJY2Yg4d8QypBKBKyhPSTxDraW0t9jTAtg9xeMCJxyiAV8ZIZLRW5/qdu5bP90iVDF81rtYq3YzeM9X02QGaPrIzAxqvyp8CpWFK7kGpBv8bmYAPlzPzAKQCRVP3k3LZQ/DnYVKXtt3PtIg3615phsMe5/kbVH1Og5Ski2x8ggwx72UPwdJXIYA3v8dv+OANutAW4GLVrtLX0P++ZH2m2Wo20k+qPpWbBaeeheGM4fcaAxoIcKGH8gc5djJDbTcsj7tHB8H1y3UVwHCWXDjmAPLVia2i1OuXEQTN1AsR00G28BdQ6ofoYNg5Mifh45V9QxmQDUfvzh/JrXvh4l4qixCKrKVjeULAQeX5DSrAh3MO8I879AkTe6MVwaUT56H36ymJhSbOvRcAgGpOBOcy45hrT6H4JQ4B2Ku87xGzRpjBGAw3bjun5WqKik+1OhVIU6TeULztn7d1usTnq+BG76qVyzXOVLBmfffiwY5avgHighKzX9hwiOGOiGuZ9T7paOFi1Mrkz5edQn4fAdaYNUJgOt0HmlIGaeDmgPawhTeL9Oj+UbM5GEIqeU9U+kSPAp6IZNDkLh0vUDzWcOGQKE3iYvIcxh56kLRj5eAQsdpwyR8sQQt8kypiOLY5/NOAotHPYTp7Sf+B4+yaSXB333KOCmTFqVdoRrrJjY7+Z+ObPFUIIHqmr8uW2Ytc3WL5fvJW8eB261oxrN5YFtllRXHjJeRs/biujd/8NZnhePfRmzzLb8viJ4wM01S9dOyQtos7p4JKxGu3Y6c2eoUtqHvOp2LLh0Y3ND8cCNA/diSM50vlOfOzUroXK70cL835NbAPEtJANEb6tIPHgLQKhdmjHhTTCFx0agnCG8UX9FQxxkIb/GyAXuqD2nAJmRlq1JS8aSNfdbWdkh2x3hGqnciFPcdTQQblEMo94c3cdZmri3mwj90WTNBnOW0RQoLguICnFqBu0qLinHPC68SGBdoCS+wLo9wW6Qv5ovWUNGh/EyxpxIJUmOzB9yYGzasLcj8NPCWjqfLhPa2Cdce6A7Dngxn6+c5wOgXX4mmu1vIdmv9KrrGQrJYN4N0Y0dIAmZcFx383FTO3vJV+tp6R3bro3/0HIFw6vdZfrPih2nxuiG0NHeC/rI6HNH+MF2bKYSSSwmsb9pV16ChZK6ZOwAncqTZcu6tBOl/OiJxSejXb4rM2MbtMX3WCZblQmCSAsaK5mK3zXkITmdaWNKB3tD0O7F6N5ZIjMzO/r9GbsyOThkYa4iRYvJ/X2SIimGkse5Vt+LJ1q/XQH4pDLSOCRbNY3i4pFN44iIo5Rf41D5aKQCTmifh2FJS0wvSwZ/F98qrslq5S/J6oGftTXn8jMAELkHu7OOL3iTtTm06/V7JhughtDzF0FY/VeraTRT6AvIJfKZbyjx3HPQS+J8fC8KPBPDnd9B8tI2k2XRir7FgW4IRAzTLml8SukqB6auQ5t3ZtxQJdv3GfxaRrIqtE0129Ha7geM+MXNlUN9e2qKWG37soo0bQiC4M3fWxob9cvPj0RqVc0TEzrnXzC00zSndKp97nEiNmeYaCj8K3SHATPJ6YkA2ziYphluHVcqmKl+Mni+yY2Oy3ay+8tDz0nv+lDnCHJSPNn7NHGECfP1/MnNtE4dvklQuDU/RKgr6x1LnBckjg2sA085walSzHBdgs1cHoPNQuQsFyHjz6V2RmsAX/J7O40sNLRZWw146VEFDf8t0qgIsifOXFz70kRPYth8EJRtV9vhEykaihcaOklTP8VO71ftlwwTCvnOukp/cQVMpBWQ+uZ5PaaT1g7oZ6Wq+mMbBuFRcSMMyT0Xk0ehoepAYx/zph/0wOYWqtKTw+in72GP3Zf1NZ1lCLNM/5YmWX4HUOT/5ejcx+TAHuuDY1uBkv9cFQUvWFXfqK/o52m23ZsH/FmL4oj1Zae4p55vnPxFGKhToN0sjY3EXXLfzi+MsaS0bJYjTsK2/TyAM73n2CnwfRBHT+pt5CmnFQucInN6R9ioLx9OaO6vjovk4pzOuZR+Xa/bAfu+DjZHmscOO6UYrjnhAWOxk+CjwZ//5oBgbbRvn7zoZP5jzirip7UKLjmFawzAR0qAgexeqRKEG3TWx45RtuN6XeG121ER8B0FmdN/uip13kB03/7as6DOA+EZBakoPQTEaL1a6Jcvxh1GRIEA6iwuIVUrl8BbmDy7R8UbSWk/4zL6KBap0bjq8AJqei64EMlLQ6d/YwOVDLKFRDQtgKIR4ne3BuVPTK+uMl2dC1AhEg3O94hBB/puAv5+yQvwAMJ09VVCXIsz5+dOEmZYkqwN0qWPFwOJ0B0P5PQYdrA5D9mT1YqeaAqck7VnkygbU/xavVq2kl8GcHkMF4A9hpccUFpbn7bqENpqEPiFiNW3q3JKM9anznuKl/Fd/e++R+cv5YB7Li+M+Lh4Mq5QdwbCGy5/aduip86h91LqNO4H/C16lv68C5cQW9eQzsfbkqkD9OubU8Bv/4onhVfgcPWguHyB6mUL50fvRocHoG+dYDTza8RYeFVuxRaBbJd2gN4/b2cSn+FwRpfH9jhgH7SUTmZyzqg6s6lOA/xMraMXMn8TZxIeVPaJcYFX/2mVVPAOUX0bziEyfts85nuYJu+aoe4IEKjaX0gk6MbezHeUBhX+rwh22Hyk90PCyVbn3JOGqCaZNPNdDeecZUIC929Y4wB2am28Kfj9TLsL6JLzM6mjk0dAGLVTSgxTZR9f/NkLGk94o6T8Vw8jpjK2NKoR2I4PS09GDkLWPH4A1w7zkdg5otA9U8TtrHHm4rxdepCUTfU20ExkbjoSJmISK5hFWJdf7s3L3EfogcxjfNFra0arhl03x5MFY+zHV6lWV2X43qOB9qmq0ePOjqyZY4hwEpzaaiYYv5AZW9qXBAJd+OVPzuxlY7YxwtyimKyrc1LoOsYGlKgsGnAWHP8fWB4Cw4mFQeANvfg/bIPqb6XiQLUL9sehubX5MwHKYQA/MciLIgTyLLAq9Ab+RCEKZX+MWiAqP7rY6ofyxTR9Z6ffKkT/QaO49pHZEInp4ywF3Xt+IG9tf2Vpoyj15QK/yQGj5T2f42myCVMiTw+A62pSCcuGAS7xnzP9zzjv7ArEAa0OeX7DjTz3D94upowuhOfXE4y8HP/TImdUL5JThqtvztux2L5hiP1yeEefkfYBlLvmA9MWhq4VE2xHZsAmuBBgJNlNDlpIA0FgDJZbg6i9Z6gsiyF7tKVWtawhblfXUA+/xo6OmiNmyaCx98SURjbqG+jgqpWELeeWk7HdO8tK5544DLju+1YE7l7/vIxFTwtE5bPm+byTmjKEOz+sY5Ik9sM48PP+sFG5uDKuziBWH2gjlWrl+3SDgNrYGx8cN0pCwXgB9DKVyucamLlSb1glOTu/JCsCkRiGjitCqWQBToGr5SAuGp3KNmBlIqHUFKoJuMhAS0hIxDKgxsd4fVmnMbXyuStwc7++F79gcKq2RFa4H/MUJkmrKTnNG9kvHpZocn7yR/Y4bw9z0wVzg+7NB9KVo53OVGtW4Gm+R6mRnaJSID96Vym/cmB2Oudoi/FuNIrFWzPwkwLLtB2XUtWewDqEu15J04NLmj44r9Ajw5je8YjKFhF7kLufm2WzrddJYxjkxrfXlHRoxpRaD6cbd2/Cu2LRPI8k/1ltcWcpQR/lZMNp+ahOq89NfFgnyQjzTDLwI21kseIBQXCzw63CUHSO6yy94kavB43u/k/Nd6eRSnn2wYf/94gYgFQzuvwTlueNkTnwjEUR04v49LYcxBpQYBclaBieU0+dngLeOpLdIjynu/YHZp10/7mevjMa0t14nlyllrjocoyaCXyzWLYabjCAJV4NmTDLQ/7Am4wyqh8MsU2i0Rq4yQzaoPuBcjzYzxCg3uFh3mTveJB3hnckgicgfZiTKkkaYYdTpHBwURgGrjoycgOxY1Zu8zkCjFVpMCMCcDcWz1ShEg7ZC9G2WVBoV/BBO1ANJTUQ0x10VvpMTxOrJkSluL0vVys7OGlCaqpJaCkcxgCU7+gzd2MJQ4bwunj2XsL8Uw+lCyTeVUw75l+meQjkNHqWwdRE+3aDit7cB4TzoLvieZrrZPGCzOOemcBGPvsQ/YaiJb9XCHIDYmcwWirjTZDTMkz/rJdueusLpUq+edA7UqDrSuKc2WHki2FZCspAQDDn6qJN1k3RSpcex/kxF9sZDz8VClS68f0xCuQxO9ZbINWHBcSS7RHDgPH84+dyuP9HEKbQvACjYEqTjGSgP8Q+hqwJNkvF0lnNACDu0VaYqNK+w68eAJw3DGAKfOsRJY7gv/9B1nsohuOJ/KMn6Jvo+IMEOJPhpRqMFsoVuZS7RCDdJl4rq4pixppJaH/X4ogLx4qrNU52YECwxjGG5BwXT2w6OL4RNNNVBymMwiDddQ2lWj9Pc2HRWnhWw07gtWNzmdqs1hLkAw8k9biiQynaNXOcz11Wa7tc/Wk0Thm3dXBElROI1hAxmCc1s/XvTFPXs+G3Kc6yLhkZHYGndbnjoVadHrEvI09a3z6x2EYkClmeBTTPgqfTuQN1ziZP49nUAaWvFHWiGo6ljs259+Y9ELDLabzOA7L+mypIXa3CbuWQuLcHnbrXj+4U3h5+B/QqdPrd/xXvG04d5+7SgRshmTZC0HVA/0lSkQK29N0MeOdTiEG6tASYvcs9eY+Cj9UWjYPIZ8OkGpCvwld0BjMH2TSdhIShhwyBZWuwjem82mwYIXHCgzqrqSxq7T4fzewJ17RZekp4XhXGS2yrCgopqoDyf3piUzNod6JeVtDvLFeduwhuSUI32TZogv3+LdJVLLX4hGUQUaWCaX0eF6uYEcV4XZ6bnJxBzruXmFj/xU2gBhWuCh49s+3XHxdL/5E4gDgVoH6sdSIZ5IcO02XRSmQb3bbPDcVZkwW8W7xZG2CyCjixYlHOjuHbzhB3u269cbX+2QwAVYS7v7ft7SC+pdslBbGE/nEK0j0AKtprcUz+gzjETSPXs0SWv+d6DnNLcW+lZ0nsom+4KirK1SM7fIinghzwRYZqx6Nmd05eAhOboOwCaFITLv4CRaVH6vbH2Pxqfug4Bnp5iJEHZjI6ZvMj+HakIR76YBQxwYn8H9x+Bd970YURl9OPGwZPhkAmi6fVAq51v9W9oSGAg4x9egSFBwxOjd9beCB7Ao+I64hsR5hQfd9amHYcyAblk61JUNTIeLjAQKYHCQ38ouxFkomQeJymC9Qx+ZL+uKXYPZ+ynHfwUGLO6gcSjQyONVCIM/Xrd76n8FLckcBI3TA+sEhgkgGIud8gC3616LW3ctmx2fDbgF6mrjn/01lDDd49Siou1eZHxzqjBrZ1K5tkporc9+fup1BD/ud5daqRInlMoGF1CQZSgzVzfjYEaOtRPPjXkWwwuMVLHm/FxuT+wrvVcgNYJ5osjuk/YS3X+nChQ6CtOOJfwE1/eGdv22if8lZFq1B2drPn9qa2BChhp4ixeXX3hPRCzIkK7MltxwUGbkMuR9n52MXdSgi3Hzdfbh73KTri7pXp4PUAY/zu9JyoWoBxHwFfLBjE2o+FDBr4MRA2Q09tzapG8LCDkT9EnlmaMvHhwUYAPrz+taKKE830XyXJmrtjLhkQ+m8foylyj/lkk5mzlNqqMIuWEz190ZKKxvJozKafEhZxGLTNbuynptqr9Xy63diPSxwpzoObkj0Mjzkr+9R/rDcJmx+zBinKKvWfEs8mxcPI6QXU6Adf+3ZoJ/+qCBYuHmUAhRPbIUaM7nRCj2aMhvFLihLVFXzn/PFmeFdZ27gKZkB0t4jx0KsTa0JrWlQGnlC1rkSQo5SP7mgaYmSN5FWb8/ikk2CEwo8Y+H1ntMBA393SVDdymQi1EkEjbLctpFHIxL1Bf3SqX0P2l6EvrhUEz2weM+q8nEZPXRlYXxghgZ9fNM2jQasutv+QJkCEK+NfrNknRMpjsCglD4eMU9BVPlNGO+knslRdnfJvdkM7kpAjxo4nMcs2wbgAf47LVSz9EXLmBAOzIe4Hkc3pIhqs/OU9ksTrR0lQeuODg5YWRXq76Y62pDL/AUZuqjBumFyMFmy/8oPV/uVmNar7atSgzc27EpgsrOptMaxAG8kzUYnBooEw9bXpSJnSK01dG825ahS0TarkhTYhmyvdP4XC0Z7a7wOPo7c0EQuVdy2cDxWypzRaPnykx//qVhzjp2qd+PeKyKLdJZQxJHzdaiNYa6knYPlBHl/T5SHVX+/GzBbYdgsDRQskNWJlpSdWARxWW+yYNeaX8pb+HjXOU7xSF9fuaCIbozkM8HQNe0tZHQPVNZ1YENrJ1CcfB+dACE/PsZSWV6zn1yC9YoZT23kwRmY3n3soBKoE3ppZHbdcIeuSzo9uXlghjycfpxgBgQGZYECSeyDiBykKPld2TlgungGWwd8Lu3sqrPwbbZ8N01WseMw2YZsP/qfJJ12etw9IQjDspxCZAa2tXSCfeZYjfEZVpN9QcV3xvhwjTnOIE5qOX7EIYLu/1kONzFQbeChuJNlkyEQgFtSTNMhyrJwN50XDeXwX8MpScI3kKuTNY0koEQzqTCO3BImAulPKSEXj6irdoLDLwO2hU/kdf2hFt3nr8msnKWxQsV00XkUuZb7tME4vABQNGosrNnEB/Tiq7ombnEnM/U838TSG48JGTb6gATi766DfLc6VT68ku8iBxvMxq228XWnGsb9UsEOstullA3+Kwn7tbMohLbysnVWTURIe1ItAvdmguEXo6JwEijMCAABWJsmyK476rSbW3Elj+t4Tq4YvYHFXg+vGfe3iGTMSLLW3/6mLygItwM85GEXylMkFfaPxn/AogM3qSnECS2z/9zCofY+hKchJRY+4O7cwH8Ov5ciuJXgl1z+ji1Y9zQr9rbiKkqHPKee5/k4t7ou3XaOb+uJ4A9yOE81ZgoQzIuh3bLBimLUD2BaxN4HWE8SVk8HlT69/D0TuQ4g67l6ReWl4S1QIhKyqXNg88vZPpq6A5YWEfVNdzsD05w6QPrQmr/fJL3QAAohQH+N6SS1XcdfGdrzgV18gf7qUutjg3JHO5hgMG2e45wfZ5MNoXIWIU8/pGpTfIgoqvdzij5jlhj+dS7RogdzacblZhlexWK0HAfowRthaEFAouo3jUvxrgU3x+fn3C7it1S8ewGqY4TFcbsAxl+P1m4/Iz1T7kMLrjc30HtiWsG1MydG/kNsZAijGHr/sZ7o1wQSfZSzKELdShwLwTBa2lyl3q4gCbHcCp82/r5txHE52h+FXMva1cIhoBqLFfQgo8wMtD478gcvka/BbbTjT4VVj86G+l1OCwrt7d2uZsPa83nTF4ldgp1jCGZVwAWXSGyASHjQ8tg0EoHS89Alv6xgnpPeweG8nKapLDT02g0uVDSUM3CkDDx4WRyq8G9s82UmU9Ebbk8oaURHll3241d7amfuge6pLUaBeLJ0A+I52wJNAoXl3chgLL1j93wQPDqhHAraWCgkcHFBriE3tevlTCvtIGjglcEl+SoUFj7SryLKvnuNrSvuxqhDjcwZp1KGoF++ZKs4mu/FG3JraBxZK5RW/Ncw2gRPQUDlHRJ0QgCjXkyI5j+m6eUJ6gDlI5Pge8vJHPa7kt3MGk6a8thxhMobMeAAMUWMgnawc7rBApVkffee9GuxlK7qUbsMWlucnLoM1KJ1otBXYHmaUEyPEpl5J3BfUYrHMFaYKtJzcYTZZLAAK8hMt3jZ1twrllF1HOCuhi8Yp/K5sTX17dotcKLrFsUTyNAcCGZE+imH0UoWuK8Dgu4R0uG0ymXyVsNP8mKjj04AX+Mlrv1TGjFPWs4cJKkFs3Xhy6rQsw+MnWSjNiw+jGFmp/Dj8KRt8yDUokWtmpLix3aiXiTtPewK2UrjfN+lEk0Rz3o4fR4MF7OM2tx9+tvfiV0RLbTIozrEJcoKzj5f4yyRrJuD1vKQAAAA" alt="Solstice Partners custom wine label" />
              <div class="g-lbl g-lbl-blanc">
                <span class="g-lbl-app">Édition Limitée</span>
                <span class="g-lbl-brand">Solstice Partners</span>
                <span class="g-lbl-rule"></span>
                <span class="g-lbl-class">Blanc de Blancs</span>
                <span class="g-lbl-var">Loire · Sancerre</span>
                <span class="g-lbl-year">MMXXV</span>
              </div>
            </div>
          </div>
        </div>
        <p class="g-label-name">${t.galCard3Name}</p>
        <p class="g-label-desc">${t.galCard3Desc}</p>
      </div>

    </div>
  </div>
</section>

<!-- LABEL BUILDER CTA -->
<section id="builder-cta">
  <div class="section-wrap">
    <div class="builder-cta-inner reveal">
      <div class="builder-cta-copy">
        <span class="section-kicker">${t.bcKicker}</span>
        <h2 class="section-title">${t.bcTitleHtml}</h2>
        <p class="section-sub">${t.bcSub}</p>
        <a href="/preview" class="btn-primary">${t.bcCta}</a>
      </div>
      <a href="/preview" class="builder-cta-visual" aria-label="Open the label builder">
        <span class="bcv-line bcv-appellation">Appellation Contrôlée</span>
        <span class="bcv-brand">your brand</span>
        <span class="bcv-rule"></span>
        <span class="bcv-line bcv-class">Grand Réserve</span>
        <span class="bcv-line bcv-year">MMXXV</span>
      </a>
    </div>
  </div>
</section>

<!-- ETHOS -->
<section id="ethos">
  <div class="section-wrap">
    <div class="ethos-inner">
      <div>
        <span class="section-kicker reveal ethos-kicker">${t.ethosKicker}</span>
        <blockquote class="ethos-quote reveal reveal-d1">
          ${t.ethosQuoteHtml}
        </blockquote>
      </div>
      <div class="ethos-list">
        <div class="ethos-item reveal reveal-d2">
          <span class="ethos-num">${t.ethos1Term}</span>
          <p class="ethos-body">${t.ethos1Body}</p>
        </div>
        <div class="ethos-item reveal reveal-d3">
          <span class="ethos-num">${t.ethos2Term}</span>
          <p class="ethos-body">${t.ethos2Body}</p>
        </div>
        <div class="ethos-item reveal reveal-d4">
          <span class="ethos-num">${t.ethos3Term}</span>
          <p class="ethos-body">${t.ethos3Body}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TRUST / TESTIMONIALS — HIDDEN until real content is ready.
     To enable: delete the "<!- -" opener on the next line and the "- ->" closer
     after </section>, then replace the two sample quotes with real, authorized
     client testimonials. Styles live under the "TRUST / TESTIMONIALS" CSS block. -->
<!--
<section id="trust">
  <div class="section-wrap">
    <div class="trust-header reveal">
      <span class="section-kicker">${t.trustKicker}</span>
      <h2 class="section-title">${t.trustTitleHtml}</h2>
    </div>
    <div class="trust-grid">
      <figure class="trust-quote reveal reveal-d1">
        <blockquote>“The bottle became the talking point of the whole evening — three clients asked where we had it made.”</blockquote>
        <figcaption><span class="tq-role">Sample testimonial</span><span class="tq-meta">Replace with a real, authorized client quote</span></figcaption>
      </figure>
      <figure class="trust-quote reveal reveal-d2">
        <blockquote>“It looked like it came from a century-old estate. No one believed the label was designed for us.”</blockquote>
        <figcaption><span class="tq-role">Sample testimonial</span><span class="tq-meta">Replace with a real, authorized client quote</span></figcaption>
      </figure>
    </div>
  </div>
</section>
-->

<!-- CONTACT -->
<section id="contact">
  <div class="section-wrap">
    <div class="contact-layout">
      <div class="contact-intro">
        <span class="section-kicker reveal">${t.contactKicker}</span>
        <h2 class="section-title reveal reveal-d1">${t.contactTitleHtml}</h2>
        <p class="section-sub reveal reveal-d2">${t.contactSub}</p>
        <div class="contact-detail reveal reveal-d3">
          <span class="contact-detail-label">${t.contactEmailLabel}</span>
          <span class="contact-detail-value">hello@emptywine.com</span>
        </div>
        <div class="contact-detail reveal reveal-d4">
          <span class="contact-detail-label">${t.contactResponseLabel}</span>
          <span class="contact-detail-value">${t.contactResponseValue}</span>
        </div>
      </div>
      <div class="reveal reveal-d2">
        <form class="contact-form" id="contact-form" novalidate>
          <div id="contact-error" role="alert">${t.cfError}</div>
          <div class="field-group">
            <div class="field">
              <label for="cf-name">${t.cfName}</label>
              <input id="cf-name" name="name" type="text" placeholder="${t.cfNamePh}" required />
              <span class="field-error">${t.cfNameErr}</span>
            </div>
            <div class="field">
              <label for="cf-company">${t.cfCompany}</label>
              <input id="cf-company" name="company" type="text" placeholder="${t.cfCompanyPh}" required />
              <span class="field-error">${t.cfCompanyErr}</span>
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <label for="cf-email">${t.cfEmail}</label>
              <input id="cf-email" name="email" type="email" placeholder="${t.cfEmailPh}" required />
              <span class="field-error">${t.cfEmailErr}</span>
            </div>
            <div class="field">
              <label for="cf-phone">${t.cfPhone}</label>
              <input id="cf-phone" name="phone" type="tel" placeholder="${t.cfPhonePh}" />
            </div>
          </div>
          <div class="field">
            <label for="cf-message">${t.cfMessage}</label>
            <textarea id="cf-message" name="message" placeholder="${t.cfMessagePh}"></textarea>
            <span class="field-hint">${t.cfHint}</span>
          </div>
          <div class="hp-field" aria-hidden="true">
            <label for="cf-website">Leave this field blank</label>
            <input id="cf-website" name="website" type="text" tabindex="-1" autocomplete="off" />
          </div>
          <button type="submit">${t.cfSubmit}</button>
        </form>
        <div id="contact-success" role="status" aria-live="polite">
          <p>${t.cfSuccess}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <a href="#" class="footer-logo" aria-label="emptywine — home">
    <svg class="brand-mark footer-mark" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#8a6a3c"/>
      <path fill="#fbfaf7" d="M18.4 8h3.2v4.2q0 1.1 .75 1.95l.7 .8q1.45 1.6 1.45 3.9V29.4q0 1.5-1.5 1.5h-6.4q-1.5 0-1.5-1.5V20.85q0-2.3 1.45-3.9l.7-.8Q18.4 13.3 18.4 12.2z"/>
      <rect x="15.4" y="22.6" width="9.2" height="4.4" fill="#8a6a3c"/>
    </svg>
    <span class="brand-word">emptywine</span>
  </a>
  <p class="footer-copy">${t.footerCopy}</p>
  <nav class="footer-links" aria-label="Footer navigation">
    <a href="#how">${t.navProcess}</a>
    <a href="#gallery">${t.navLabels}</a>
    <a href="#ethos">${t.navWhyUs}</a>
    <a href="#contact">${t.navContact}</a>
  </nav>
</footer>

<script>
(function() {
  'use strict';

  var nav = document.getElementById('main-nav');
  var navSentinel = document.getElementById('nav-sentinel');
  if (nav && navSentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function(entries) {
      nav.classList.toggle('scrolled', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(navSentinel);
  }

  // Bottles are static inline SVGs — no image loading required.

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('visible'); });
  }

  // Spotlight glow that tracks the cursor across each gallery bottle
  document.querySelectorAll('.g-label-card').forEach(function(card) {
    card.addEventListener('pointermove', function(e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  var form = document.getElementById('contact-form');
  if (form) {
    var formError = document.getElementById('contact-error');
    var emailRe = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    var formReadyAt = Date.now();

    function setFieldError(input, hasError) {
      var field = input.closest('.field');
      if (field) field.classList.toggle('error', hasError);
    }

    ['cf-name', 'cf-company', 'cf-email'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function() { setFieldError(el, false); });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (formError) formError.style.display = 'none';

      var nameEl = document.getElementById('cf-name');
      var companyEl = document.getElementById('cf-company');
      var emailEl = document.getElementById('cf-email');

      var nameBad = !nameEl.value.trim();
      var companyBad = !companyEl.value.trim();
      var emailBad = !emailRe.test(emailEl.value.trim());
      setFieldError(nameEl, nameBad);
      setFieldError(companyEl, companyBad);
      setFieldError(emailEl, emailBad);
      var firstBad = nameBad ? nameEl : companyBad ? companyEl : emailBad ? emailEl : null;
      if (firstBad) { firstBad.focus(); return; }

      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = '${t.cfSending}';
      btn.disabled = true;
      var data = {};
      new FormData(form).forEach(function(val, key) { data[key] = val; });
      data.elapsed = Date.now() - formReadyAt;
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function(r) {
        if (!r.ok) throw new Error('failed');
        document.getElementById('contact-success').style.display = 'block';
        form.style.display = 'none';
      }).catch(function() {
        btn.textContent = original;
        btn.disabled = false;
        if (formError) formError.style.display = 'block';
      });
    });
  }
})();
</script>
</body>
</html>`;
}
