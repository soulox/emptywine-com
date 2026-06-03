export const LANDING_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>emptywine — Bespoke Corporate Wine Gifts</title>
<meta name="description" content="Custom AI-designed wine labels for corporate gifting. Your brand on every bottle. An unforgettable impression." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Cinzel:wght@400;600&display=swap" rel="stylesheet" />
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --noir:     #080604;
  --noir-2:   #0e0c0a;
  --noir-3:   #1a1612;
  --noir-4:   #252018;
  --gold:     #c8a848;
  --gold-2:   #e8c858;
  --gold-3:   #f8e078;
  --gold-dim: rgba(200,168,72,0.12);
  --gold-rule: rgba(200,168,72,0.35);
  --cream:    #f5ede0;
  --cream-2:  #ede0cc;
  --cream-3:  #e0d0b8;
  --text:     #ede5d8;
  --text-2:   #8a8070;
  --text-3:   #4a4038;
  --border:   rgba(200,168,72,0.18);
}

html { scroll-behavior: smooth; }

body {
  background: var(--noir);
  color: var(--text);
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 400;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── NAV ── */
nav {
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

nav.scrolled {
  background: rgba(8,6,4,0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-color: var(--border);
}

.nav-logo {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 1.6rem;
  color: var(--gold);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.nav-links {
  display: flex;
  gap: 40px;
  list-style: none;
}

.nav-links a {
  font-family: 'Cinzel', serif;
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  color: var(--text-2);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s;
}

.nav-links a:hover { color: var(--text); }

.nav-cta {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  text-decoration: none;
  border: 1px solid var(--gold-rule);
  padding: 10px 24px;
  transition: background 0.25s, color 0.25s;
}

.nav-cta:hover { background: var(--gold); color: var(--noir); }

/* ── HERO ── */
#hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 56px 80px;
  position: relative;
  overflow: hidden;
}

.hero-bg-glow {
  position: absolute;
  top: 35%;
  right: 10%;
  width: 700px;
  height: 700px;
  background: radial-gradient(ellipse at center, rgba(200,168,72,0.055) 0%, transparent 65%);
  pointer-events: none;
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.hero-copy { flex: 1; max-width: 540px; }

.hero-kicker {
  display: block;
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.28em;
  color: var(--gold);
  margin-bottom: 32px;
  position: relative;
  padding-left: 36px;
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
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(3rem, 5.5vw, 5rem);
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: var(--cream);
  margin-bottom: 28px;
}

.hero-copy h1 em { font-style: italic; color: var(--gold-2); }

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
  font-family: 'Cinzel', serif;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--noir);
  background: var(--gold);
  text-decoration: none;
  padding: 16px 36px;
  transition: background 0.25s, transform 0.2s;
}

.btn-primary:hover { background: var(--gold-2); transform: translateY(-1px); }

.btn-ghost {
  font-family: 'Cinzel', serif;
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-2);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}

.btn-ghost:hover { color: var(--gold); border-color: var(--gold-rule); }

/* ── LABEL ART ── */
.hero-label-container {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btl-img-wrap {
  position: relative;
  width: 220px;
  height: 480px;
  flex-shrink: 0;
}

.btl-skeleton {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  background: linear-gradient(110deg, #1a1612 30%, #2a2218 50%, #1a1612 70%);
  background-size: 200% 100%;
  animation: skelShimmer 1.6s linear infinite;
}

@keyframes skelShimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.btl-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  opacity: 0;
  transition: opacity 0.8s ease;
  filter: drop-shadow(-12px 28px 44px rgba(0,0,0,0.9)) drop-shadow(0 0 60px rgba(200,168,72,0.07));
  animation: btlFloat 8s ease-in-out infinite;
}

.btl-photo.loaded {
  opacity: 1;
}

@keyframes btlFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-14px); }
}

.g-btl-wrap {
  width: 100%;
  height: 100%;
}

.g-btl-photo {
  object-fit: contain;
  animation: none;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));
}

.g-label:hover .g-btl-photo {
  filter: drop-shadow(0 28px 50px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(200,168,72,0.1));
}

.hero-btl-svg {
  width: 220px;
  height: auto;
}

/* ── (legacy label classes removed — labels now live inside bottle SVGs) ── */
.label-spotlight {
  position: absolute;
  bottom: -70px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 90px;
  background: radial-gradient(ellipse at center, rgba(200,168,72,0.2) 0%, transparent 70%);
  filter: blur(20px);
  pointer-events: none;
}

.label-mount {
  transform: rotate(-2.5deg);
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  filter:
    drop-shadow(-14px 32px 52px rgba(0,0,0,0.92))
    drop-shadow(0 4px 18px rgba(0,0,0,0.7))
    drop-shadow(0 0 70px rgba(200,168,72,0.07));
}

.label-mount:hover { transform: rotate(0deg) scale(1.03); }

.label-paper {
  width: 310px;
  height: 435px;
  background: linear-gradient(168deg, #faf6ec 0%, #f2e8d5 45%, #e6d8c2 100%);
  position: relative;
  overflow: hidden;
}

.label-paper::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23t)' opacity='0.08'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
  opacity: 0.45;
  pointer-events: none;
}

.label-frame-outer {
  position: absolute;
  inset: 11px;
  border: 1px solid rgba(150,110,25,0.5);
  pointer-events: none;
}

.label-frame-inner {
  position: absolute;
  inset: 17px;
  border: 1px solid rgba(150,110,25,0.2);
  pointer-events: none;
}

.label-content {
  position: absolute;
  inset: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0;
}

.label-crest {
  width: 38px;
  height: 38px;
  margin-bottom: 12px;
  position: relative;
  flex-shrink: 0;
}

.label-crest::before {
  content: '';
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(110,75,15,0.45);
  transform: rotate(45deg);
}

.label-crest::after {
  content: '';
  position: absolute;
  inset: 11px;
  background: rgba(110,75,15,0.3);
  transform: rotate(45deg);
}

.label-crest-dot {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7px;
  color: rgba(110,75,15,0.65);
}

.label-appellation {
  font-family: 'Cinzel', serif;
  font-size: 0.48rem;
  letter-spacing: 0.22em;
  color: rgba(70,48,12,0.6);
  margin-bottom: 12px;
  flex-shrink: 0;
}

.label-brand {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 2.6rem;
  line-height: 1;
  color: #1a1208;
  letter-spacing: 0.02em;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.label-rule {
  width: 68%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(130,90,18,0.55), transparent);
  margin-bottom: 12px;
  flex-shrink: 0;
}

.label-classification {
  font-family: 'Cinzel', serif;
  font-size: 0.56rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  color: rgba(70,48,12,0.7);
  margin-bottom: 20px;
  flex-shrink: 0;
}

.label-varietal {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.92rem;
  font-weight: 300;
  color: rgba(70,50,18,0.55);
  margin-bottom: 20px;
  flex-shrink: 0;
}

.label-vintage {
  font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: rgba(90,62,14,0.75);
  margin-bottom: 16px;
  flex-shrink: 0;
}

.label-rule-thin {
  width: 52%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(130,90,18,0.3), transparent);
  margin-bottom: 12px;
  flex-shrink: 0;
}

.label-estate {
  font-family: 'Cinzel', serif;
  font-size: 0.4rem;
  letter-spacing: 0.16em;
  color: rgba(70,48,12,0.45);
  flex-shrink: 0;
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
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
  font-size: 1.05rem;
  color: var(--text-3);
  white-space: nowrap;
  padding: 0 28px;
  letter-spacing: 0.04em;
}

.marquee-item strong {
  font-style: normal;
  font-weight: 500;
  color: var(--text-2);
}

.marquee-dot {
  font-size: 0.38rem;
  color: var(--gold);
  opacity: 0.45;
  vertical-align: middle;
  padding: 0 4px;
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
  font-family: 'Cinzel', serif;
  font-size: 0.58rem;
  font-weight: 400;
  letter-spacing: 0.28em;
  color: var(--gold);
  margin-bottom: 18px;
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2rem, 3.5vw, 3.2rem);
  line-height: 1.12;
  color: var(--cream);
  margin-bottom: 16px;
}

.section-title em { font-style: italic; color: var(--gold-2); }

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
  padding: 120px 0;
  background: var(--noir-2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.how-header { margin-bottom: 72px; }

.how-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
}

.how-step {
  background: var(--noir-2);
  padding: 56px 44px;
}

.step-num {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
  font-size: 4rem;
  line-height: 1;
  color: var(--gold-dim);
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.step-num b {
  font-size: 1.1rem;
  vertical-align: super;
  color: var(--gold);
  opacity: 0.55;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.1em;
}

.step-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 1.45rem;
  color: var(--cream);
  margin-bottom: 12px;
  line-height: 1.2;
}

.step-body {
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-2);
  line-height: 1.78;
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
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1rem;
  color: var(--text-3);
  max-width: 260px;
  text-align: right;
  line-height: 1.75;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 44px;
  align-items: end;
}

.g-label-wrap {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.g-label-wrap:nth-child(2) .g-label { transform: translateY(-24px); }

.g-label {
  transition: transform 0.55s cubic-bezier(0.23, 1, 0.32, 1);
}

.g-label:hover { transform: translateY(-10px) rotate(0deg) !important; }

.g-label-card {
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.g-btl-svg {
  height: 100%;
  width: auto;
  filter: drop-shadow(-8px 20px 36px rgba(0,0,0,0.88)) drop-shadow(0 0 40px rgba(200,168,72,0.05));
  transition: filter 0.5s ease, transform 0.5s ease;
}

.g-label:hover .g-btl-svg {
  filter: drop-shadow(-8px 28px 44px rgba(0,0,0,0.92)) drop-shadow(0 0 50px rgba(200,168,72,0.1));
  transform: translateY(-10px);
}

/* rotations live on the SVG transform now */
.glc-cream, .glc-noir, .glc-blanc {
  background: transparent;
  box-shadow: none;
  border: none;
  transform: none;
}

.g-inner {
  text-align: center;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  width: 100%;
}

.g-collection {
  font-family: 'Cinzel', serif;
  font-size: 0.44rem;
  letter-spacing: 0.24em;
  opacity: 0.55;
}

.g-rule {
  width: 48px;
  height: 1px;
  background: currentColor;
  opacity: 0.22;
}

.g-brand {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.9rem;
  font-weight: 400;
  line-height: 1;
}

.g-type {
  font-family: 'Cinzel', serif;
  font-size: 0.48rem;
  letter-spacing: 0.2em;
  opacity: 0.5;
}

.glc-cream .g-collection,
.glc-cream .g-brand,
.glc-cream .g-type { color: #1a1208; }

.glc-noir .g-collection,
.glc-noir .g-brand,
.glc-noir .g-type { color: var(--gold); }

.glc-blanc .g-collection,
.glc-blanc .g-brand,
.glc-blanc .g-type { color: #1e1818; }

.glc-blanc .g-seal {
  width: 18px;
  height: 18px;
  background: #7a1c1c;
  border-radius: 50%;
  opacity: 0.72;
}

.g-label-name {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
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

/* ── PRICING ── */
#pricing {
  padding: 120px 0;
  background: var(--noir-2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.pricing-header { margin-bottom: 72px; }
.pricing-note {
  font-size: 0.92rem;
  font-weight: 300;
  color: var(--text-3);
  margin-top: 10px;
  font-style: italic;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
}

.pricing-card {
  background: var(--noir-2);
  padding: 52px 44px;
  position: relative;
}

.pricing-card.featured { background: var(--noir-3); }

.pricing-card.featured::before {
  content: 'MOST POPULAR';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-family: 'Cinzel', serif;
  font-size: 0.48rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  color: var(--noir);
  background: var(--gold);
  padding: 5px 16px;
  white-space: nowrap;
}

.pricing-tier {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: var(--gold);
  margin-bottom: 26px;
}

.pricing-amount {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: 3.4rem;
  line-height: 1;
  color: var(--cream);
  margin-bottom: 6px;
}

.pricing-amount span {
  font-size: 1.3rem;
  vertical-align: super;
  font-weight: 400;
}

.pricing-amount em {
  font-style: italic;
  font-size: 1.6rem;
  color: var(--text-2);
}

.pricing-from {
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--text-3);
  margin-bottom: 36px;
  font-style: italic;
}

.pricing-rule {
  width: 100%;
  height: 1px;
  background: var(--border);
  margin-bottom: 30px;
}

.pricing-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 40px;
}

.pricing-features li {
  font-size: 0.95rem;
  font-weight: 300;
  color: var(--text-2);
  padding-left: 20px;
  position: relative;
  line-height: 1.5;
}

.pricing-features li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--gold);
  opacity: 0.55;
  font-size: 0.68rem;
}

.pricing-cta {
  display: block;
  font-family: 'Cinzel', serif;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}

.pricing-card:not(.featured) .pricing-cta {
  border: 1px solid var(--border);
  color: var(--text-2);
}

.pricing-card:not(.featured) .pricing-cta:hover {
  border-color: var(--gold-rule);
  color: var(--gold);
}

.pricing-card.featured .pricing-cta {
  background: var(--gold);
  color: var(--noir);
}

.pricing-card.featured .pricing-cta:hover { background: var(--gold-2); }

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
  font-family: 'Cinzel', serif;
  font-size: 0.52rem;
  letter-spacing: 0.2em;
  color: var(--text-3);
  margin-bottom: 7px;
  display: block;
}

.contact-detail-value {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
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
  font-family: 'Cinzel', serif;
  font-size: 0.5rem;
  letter-spacing: 0.18em;
  color: var(--text-3);
}

.field input,
.field textarea {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  font-family: 'Cormorant Garamond', serif;
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

.contact-form button {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: var(--gold);
  color: var(--noir);
  border: none;
  padding: 18px 40px;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.25s;
}

.contact-form button:hover { background: var(--gold-2); }
.contact-form button:disabled { opacity: 0.5; cursor: default; }

#contact-success {
  display: none;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.2rem;
  color: var(--gold-2);
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
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.4rem;
  color: var(--gold);
  text-decoration: none;
  opacity: 0.65;
}

.footer-copy {
  font-family: 'Cinzel', serif;
  font-size: 0.48rem;
  letter-spacing: 0.14em;
  color: var(--text-3);
}

.footer-links { display: flex; gap: 28px; }

.footer-links a {
  font-family: 'Cinzel', serif;
  font-size: 0.5rem;
  letter-spacing: 0.14em;
  color: var(--text-3);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover { color: var(--text-2); }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  nav { padding: 0 36px; }
  #hero { padding: 100px 36px 80px; }
  .hero-inner { gap: 52px; }
  .section-wrap { padding: 0 36px; }
  .hero-btl-svg { width: 185px; }
}

@media (max-width: 900px) {
  .nav-links { display: none; }
  #hero { padding: 100px 24px 60px; }
  .hero-inner { flex-direction: column; gap: 56px; }
  .hero-copy { max-width: 100%; text-align: center; }
  .hero-kicker { padding-left: 0; }
  .hero-kicker::before { display: none; }
  .hero-actions { justify-content: center; }
  .hero-label-container { order: -1; }
  .hero-btl-svg { width: 150px; }
  .g-label-card { height: 340px; }
  .section-wrap { padding: 0 24px; }
  .how-steps { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: 1fr; gap: 56px; }
  .gallery-header { flex-direction: column; align-items: flex-start; }
  .gallery-note { text-align: left; max-width: 100%; }
  .g-label-wrap:nth-child(2) .g-label { transform: none; }
  .pricing-grid { grid-template-columns: 1fr; }
  .contact-layout { grid-template-columns: 1fr; gap: 56px; }
  .field-group { grid-template-columns: 1fr; }
  footer { padding: 32px 24px; flex-direction: column; text-align: center; }
  #how, #gallery, #pricing, #contact { padding: 80px 0; }
}
</style>
</head>
<body>

<!-- NAV -->
<nav id="main-nav">
  <a href="#" class="nav-logo">emptywine</a>
  <ul class="nav-links">
    <li><a href="#how">Process</a></li>
    <li><a href="#gallery">Labels</a></li>
    <li><a href="#pricing">Pricing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <a href="#contact" class="nav-cta">Commission a Label</a>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="hero-bg-glow" aria-hidden="true"></div>
  <div class="hero-inner">
    <div class="hero-copy">
      <span class="hero-kicker">Corporate Wine Gifting</span>
      <h1>The Label<br>is the <em>Gift</em></h1>
      <p class="hero-sub">We design bespoke wine labels with AI — each one a unique work of art carrying your brand into every boardroom, celebration, and thank-you.</p>
      <div class="hero-actions">
        <a href="#gallery" class="btn-primary">See Label Designs</a>
        <a href="#pricing" class="btn-ghost">View Pricing</a>
      </div>
    </div>
    <div class="hero-label-container">
      <div class="btl-img-wrap" id="hero-btl-wrap">
        <div class="btl-skeleton" id="hero-skeleton"></div>
        <img class="btl-photo" id="hero-photo" alt="emptywine custom label wine bottle" />
      </div>
      <!-- fallback SVG hidden by default, shown only if AI unavailable -->
      <svg class="hero-btl-svg" style="display:none" viewBox="0 0 200 540" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#030906"/><stop offset="22%" stop-color="#0b1b0d"/>
            <stop offset="48%" stop-color="#162c18"/><stop offset="75%" stop-color="#091608"/>
            <stop offset="100%" stop-color="#020604"/>
          </linearGradient>
          <linearGradient id="hcp" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#6a4812"/><stop offset="38%" stop-color="#c8a840"/>
            <stop offset="62%" stop-color="#e8c858"/><stop offset="100%" stop-color="#7a5818"/>
          </linearGradient>
          <linearGradient id="hhl" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
            <stop offset="30%" stop-color="rgba(255,255,255,0.065)"/>
            <stop offset="50%" stop-color="rgba(255,255,255,0.13)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
          </linearGradient>
          <linearGradient id="hlbl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#faf6ec"/><stop offset="100%" stop-color="#e6d8c2"/>
          </linearGradient>
          <clipPath id="hclip">
            <path d="M22,524 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L128,48 L128,148 L156,178 C171,190 178,205 178,222 L178,524 Z"/>
          </clipPath>
        </defs>
        <ellipse cx="100" cy="532" rx="54" ry="6" fill="rgba(0,0,0,0.38)"/>
        <path d="M22,524 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L128,48 L128,148 L156,178 C171,190 178,205 178,222 L178,524 Z" fill="url(#hg)"/>
        <g clip-path="url(#hclip)">
          <rect x="24" y="266" width="152" height="162" fill="url(#hlbl)"/>
          <rect x="30" y="272" width="140" height="150" fill="none" stroke="rgba(130,92,18,0.5)" stroke-width="0.8"/>
          <rect x="35" y="277" width="130" height="140" fill="none" stroke="rgba(130,92,18,0.2)" stroke-width="0.4"/>
          <text x="100" y="300" text-anchor="middle" font-family="Cinzel,serif" font-size="5.5" fill="rgba(50,33,8,0.52)" letter-spacing="1.8">APPELLATION CONTRÔLÉE</text>
          <line x1="44" y1="309" x2="156" y2="309" stroke="rgba(120,82,16,0.38)" stroke-width="0.5"/>
          <text x="100" y="340" text-anchor="middle" font-family="'Cormorant Garamond',Georgia,serif" font-style="italic" font-size="26" fill="#18110a">emptywine</text>
          <line x1="56" y1="350" x2="144" y2="350" stroke="rgba(120,82,16,0.28)" stroke-width="0.5"/>
          <text x="100" y="364" text-anchor="middle" font-family="Cinzel,serif" font-size="5.5" fill="rgba(50,33,8,0.6)" letter-spacing="1.8">GRAND RÉSERVE</text>
          <text x="100" y="384" text-anchor="middle" font-family="'Cormorant Garamond',Georgia,serif" font-style="italic" font-size="10" fill="rgba(50,35,10,0.46)">Burgundy · Pinot Noir</text>
          <text x="100" y="402" text-anchor="middle" font-family="Cinzel,serif" font-size="7" fill="rgba(70,48,12,0.65)" letter-spacing="2.8">MMXXV</text>
          <line x1="44" y1="410" x2="156" y2="410" stroke="rgba(120,82,16,0.38)" stroke-width="0.5"/>
          <text x="100" y="422" text-anchor="middle" font-family="Cinzel,serif" font-size="4.5" fill="rgba(50,33,8,0.38)" letter-spacing="1.2">MAISON EMPTYWINE · 75 cl</text>
        </g>
        <path d="M22,510 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L86,48 L86,148 L66,177 C54,190 46,205 46,221 L46,512 Z" fill="url(#hhl)"/>
        <rect x="70" y="26" width="60" height="26" rx="8" fill="url(#hcp)"/>
        <rect x="70" y="48" width="60" height="4" fill="rgba(0,0,0,0.25)"/>
        <rect x="74" y="28" width="16" height="20" rx="6" fill="rgba(255,255,255,0.09)"/>
        <rect x="83" y="14" width="34" height="16" rx="8" fill="#cabb92"/>
        <rect x="87" y="15" width="12" height="12" rx="5" fill="rgba(255,255,255,0.16)"/>
      </svg>
    </div>
  </div>
</section>

<!-- MARQUEE -->
<div id="marquee" aria-hidden="true">
  <div class="marquee-track">
    <span class="marquee-item"><strong>Finance</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Technology</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Real Estate</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Consulting</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Luxury Retail</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Private Equity</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Architecture</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Law &amp; Advisory</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Finance</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Technology</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Real Estate</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Consulting</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Luxury Retail</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Private Equity</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Architecture</strong></span><span class="marquee-dot">◆</span>
    <span class="marquee-item"><strong>Law &amp; Advisory</strong></span><span class="marquee-dot">◆</span>
  </div>
</div>

<!-- HOW IT WORKS -->
<section id="how">
  <div class="section-wrap">
    <div class="how-header">
      <span class="section-kicker reveal">The Process</span>
      <h2 class="section-title reveal reveal-d1">From Brief<br>to <em>Bottle</em></h2>
    </div>
    <div class="how-steps">
      <div class="how-step reveal">
        <span class="step-num"><b>I</b></span>
        <h3 class="step-title">Share Your Brief</h3>
        <p class="step-body">Tell us your brand, the occasion, and the impression you want to leave. Two minutes. No design experience required.</p>
      </div>
      <div class="how-step reveal reveal-d2">
        <span class="step-num"><b>II</b></span>
        <h3 class="step-title">We Design Your Label</h3>
        <p class="step-body">Our AI generates a bespoke label — refined by our team until it is unmistakably yours. You approve every detail.</p>
      </div>
      <div class="how-step reveal reveal-d3">
        <span class="step-num"><b>III</b></span>
        <h3 class="step-title">Delivered to Impress</h3>
        <p class="step-body">Premium bottles, your label, beautifully packaged. Delivered to your door or directly to each recipient.</p>
      </div>
    </div>
  </div>
</section>

<!-- LABELS GALLERY -->
<section id="gallery">
  <div class="section-wrap">
    <div class="gallery-header">
      <div>
        <span class="section-kicker reveal">Label Design</span>
        <h2 class="section-title reveal reveal-d1">Every Label,<br>a <em>Story</em></h2>
      </div>
      <p class="gallery-note reveal reveal-d2">Each design is generated uniquely for your brand. No templates. No off-the-shelf.</p>
    </div>
    <div class="gallery-grid">

      <!-- Bottle A — Cream Classic -->
      <div class="g-label-wrap reveal">
        <div class="g-label">
          <div class="g-label-card glc-cream">
            <div class="btl-img-wrap g-btl-wrap" data-src="/api/bottle/cream">
              <div class="btl-skeleton"></div>
              <img class="btl-photo g-btl-photo" alt="Cream Classic wine bottle" />
            </div>
            <svg class="g-btl-svg" style="display:none" viewBox="0 0 200 540" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gg-a" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#030906"/><stop offset="22%" stop-color="#0b1b0d"/>
                  <stop offset="48%" stop-color="#162c18"/><stop offset="75%" stop-color="#091608"/>
                  <stop offset="100%" stop-color="#020604"/>
                </linearGradient>
                <linearGradient id="cp-a" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#6a4812"/><stop offset="38%" stop-color="#c8a840"/>
                  <stop offset="62%" stop-color="#e8c858"/><stop offset="100%" stop-color="#7a5818"/>
                </linearGradient>
                <linearGradient id="hl-a" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
                  <stop offset="32%" stop-color="rgba(255,255,255,0.065)"/>
                  <stop offset="52%" stop-color="rgba(255,255,255,0.13)"/>
                  <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
                </linearGradient>
                <linearGradient id="lb-a" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#faf6ec"/><stop offset="100%" stop-color="#e6d8c2"/>
                </linearGradient>
                <clipPath id="cl-a"><path d="M22,524 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L128,48 L128,148 L156,178 C171,190 178,205 178,222 L178,524 Z"/></clipPath>
              </defs>
              <ellipse cx="100" cy="532" rx="52" ry="6" fill="rgba(0,0,0,0.35)"/>
              <path d="M22,524 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L128,48 L128,148 L156,178 C171,190 178,205 178,222 L178,524 Z" fill="url(#gg-a)"/>
              <g clip-path="url(#cl-a)">
                <rect x="24" y="266" width="152" height="160" fill="url(#lb-a)"/>
                <rect x="30" y="272" width="140" height="148" fill="none" stroke="rgba(130,92,18,0.48)" stroke-width="0.8"/>
                <rect x="35" y="277" width="130" height="138" fill="none" stroke="rgba(130,92,18,0.2)" stroke-width="0.4"/>
                <text x="100" y="299" text-anchor="middle" font-family="Cinzel,serif" font-size="5.5" fill="rgba(50,33,8,0.5)" letter-spacing="1.8">HERITAGE COLLECTION</text>
                <line x1="44" y1="308" x2="156" y2="308" stroke="rgba(120,82,16,0.36)" stroke-width="0.5"/>
                <text x="100" y="338" text-anchor="middle" font-family="'Cormorant Garamond',Georgia,serif" font-style="italic" font-size="25" fill="#18110a">emptywine</text>
                <line x1="56" y1="348" x2="144" y2="348" stroke="rgba(120,82,16,0.26)" stroke-width="0.5"/>
                <text x="100" y="362" text-anchor="middle" font-family="Cinzel,serif" font-size="5.2" fill="rgba(50,33,8,0.58)" letter-spacing="1.8">GRAND RÉSERVE</text>
                <text x="100" y="381" text-anchor="middle" font-family="'Cormorant Garamond',Georgia,serif" font-style="italic" font-size="9.5" fill="rgba(50,35,10,0.44)">Cabernet Sauvignon · 2025</text>
                <text x="100" y="400" text-anchor="middle" font-family="Cinzel,serif" font-size="7" fill="rgba(70,48,12,0.62)" letter-spacing="2.8">MMXXV</text>
                <line x1="44" y1="408" x2="156" y2="408" stroke="rgba(120,82,16,0.36)" stroke-width="0.5"/>
              </g>
              <path d="M22,510 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L86,48 L86,148 L66,177 C54,190 46,205 46,221 L46,512 Z" fill="url(#hl-a)"/>
              <rect x="70" y="26" width="60" height="26" rx="8" fill="url(#cp-a)"/>
              <rect x="70" y="48" width="60" height="4" fill="rgba(0,0,0,0.24)"/>
              <rect x="74" y="28" width="16" height="20" rx="6" fill="rgba(255,255,255,0.09)"/>
              <rect x="83" y="14" width="34" height="16" rx="8" fill="#cabb92"/>
              <rect x="87" y="15" width="12" height="12" rx="5" fill="rgba(255,255,255,0.16)"/>
            </svg>
          </div>
        </div>
        <p class="g-label-name">Cream Classic</p>
        <p class="g-label-desc">Timeless ivory with gold rules — the prestige of a heritage estate.</p>
      </div>

      <!-- Bottle B — Noir Prestige -->
      <div class="g-label-wrap reveal reveal-d2">
        <div class="g-label">
          <div class="g-label-card glc-noir">
            <div class="btl-img-wrap g-btl-wrap" data-src="/api/bottle/noir">
              <div class="btl-skeleton"></div>
              <img class="btl-photo g-btl-photo" alt="Noir Prestige wine bottle" />
            </div>
            <svg class="g-btl-svg" style="display:none" viewBox="0 0 200 540" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gg-b" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#030906"/><stop offset="22%" stop-color="#0b1b0d"/>
                  <stop offset="48%" stop-color="#162c18"/><stop offset="75%" stop-color="#091608"/>
                  <stop offset="100%" stop-color="#020604"/>
                </linearGradient>
                <linearGradient id="cp-b" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#6a4812"/><stop offset="38%" stop-color="#c8a840"/>
                  <stop offset="62%" stop-color="#e8c858"/><stop offset="100%" stop-color="#7a5818"/>
                </linearGradient>
                <linearGradient id="hl-b" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
                  <stop offset="32%" stop-color="rgba(255,255,255,0.065)"/>
                  <stop offset="52%" stop-color="rgba(255,255,255,0.13)"/>
                  <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
                </linearGradient>
                <linearGradient id="lb-b" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#100e0c"/><stop offset="100%" stop-color="#1e1a14"/>
                </linearGradient>
                <clipPath id="cl-b"><path d="M22,524 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L128,48 L128,148 L156,178 C171,190 178,205 178,222 L178,524 Z"/></clipPath>
              </defs>
              <ellipse cx="100" cy="532" rx="52" ry="6" fill="rgba(0,0,0,0.35)"/>
              <path d="M22,524 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L128,48 L128,148 L156,178 C171,190 178,205 178,222 L178,524 Z" fill="url(#gg-b)"/>
              <g clip-path="url(#cl-b)">
                <rect x="24" y="266" width="152" height="160" fill="url(#lb-b)"/>
                <rect x="30" y="272" width="140" height="148" fill="none" stroke="rgba(200,168,72,0.38)" stroke-width="0.8"/>
                <rect x="35" y="277" width="130" height="138" fill="none" stroke="rgba(200,168,72,0.16)" stroke-width="0.4"/>
                <text x="100" y="299" text-anchor="middle" font-family="Cinzel,serif" font-size="5.5" fill="rgba(200,168,72,0.55)" letter-spacing="1.8">LA SIGNATURE</text>
                <line x1="44" y1="308" x2="156" y2="308" stroke="rgba(200,168,72,0.3)" stroke-width="0.5"/>
                <text x="100" y="338" text-anchor="middle" font-family="'Cormorant Garamond',Georgia,serif" font-style="italic" font-size="25" fill="#c8a840">emptywine</text>
                <line x1="56" y1="348" x2="144" y2="348" stroke="rgba(200,168,72,0.22)" stroke-width="0.5"/>
                <text x="100" y="362" text-anchor="middle" font-family="Cinzel,serif" font-size="5.2" fill="rgba(200,168,72,0.58)" letter-spacing="1.8">PREMIER CRU</text>
                <text x="100" y="381" text-anchor="middle" font-family="'Cormorant Garamond',Georgia,serif" font-style="italic" font-size="9.5" fill="rgba(200,168,72,0.42)">Bordeaux · Merlot · 2025</text>
                <text x="100" y="400" text-anchor="middle" font-family="Cinzel,serif" font-size="7" fill="rgba(200,168,72,0.6)" letter-spacing="2.8">MMXXV</text>
                <line x1="44" y1="408" x2="156" y2="408" stroke="rgba(200,168,72,0.3)" stroke-width="0.5"/>
              </g>
              <path d="M22,510 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L86,48 L86,148 L66,177 C54,190 46,205 46,221 L46,512 Z" fill="url(#hl-b)"/>
              <rect x="70" y="26" width="60" height="26" rx="8" fill="url(#cp-b)"/>
              <rect x="70" y="48" width="60" height="4" fill="rgba(0,0,0,0.24)"/>
              <rect x="74" y="28" width="16" height="20" rx="6" fill="rgba(255,255,255,0.09)"/>
              <rect x="83" y="14" width="34" height="16" rx="8" fill="#cabb92"/>
              <rect x="87" y="15" width="12" height="12" rx="5" fill="rgba(255,255,255,0.16)"/>
            </svg>
          </div>
        </div>
        <p class="g-label-name">Noir Prestige</p>
        <p class="g-label-desc">Dark velvet with gold typography — commanding and unforgettable.</p>
      </div>

      <!-- Bottle C — Blanc Épuré -->
      <div class="g-label-wrap reveal reveal-d4">
        <div class="g-label">
          <div class="g-label-card glc-blanc">
            <div class="btl-img-wrap g-btl-wrap" data-src="/api/bottle/blanc">
              <div class="btl-skeleton"></div>
              <img class="btl-photo g-btl-photo" alt="Blanc Épuré wine bottle" />
            </div>
            <svg class="g-btl-svg" style="display:none" viewBox="0 0 200 540" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gg-c" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#030906"/><stop offset="22%" stop-color="#0b1b0d"/>
                  <stop offset="48%" stop-color="#162c18"/><stop offset="75%" stop-color="#091608"/>
                  <stop offset="100%" stop-color="#020604"/>
                </linearGradient>
                <linearGradient id="cp-c" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#3a2a2a"/><stop offset="38%" stop-color="#6a3030"/>
                  <stop offset="62%" stop-color="#8a4040"/><stop offset="100%" stop-color="#3a2222"/>
                </linearGradient>
                <linearGradient id="hl-c" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
                  <stop offset="32%" stop-color="rgba(255,255,255,0.065)"/>
                  <stop offset="52%" stop-color="rgba(255,255,255,0.13)"/>
                  <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
                </linearGradient>
                <clipPath id="cl-c"><path d="M22,524 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L128,48 L128,148 L156,178 C171,190 178,205 178,222 L178,524 Z"/></clipPath>
              </defs>
              <ellipse cx="100" cy="532" rx="52" ry="6" fill="rgba(0,0,0,0.35)"/>
              <path d="M22,524 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L128,48 L128,148 L156,178 C171,190 178,205 178,222 L178,524 Z" fill="url(#gg-c)"/>
              <g clip-path="url(#cl-c)">
                <rect x="24" y="266" width="152" height="160" fill="#faf9f7"/>
                <rect x="30" y="272" width="140" height="148" fill="none" stroke="rgba(30,24,24,0.15)" stroke-width="0.7"/>
                <text x="100" y="299" text-anchor="middle" font-family="Cinzel,serif" font-size="5.5" fill="rgba(30,24,24,0.4)" letter-spacing="1.8">ÉDITION LIMITÉE</text>
                <line x1="60" y1="308" x2="140" y2="308" stroke="rgba(30,24,24,0.12)" stroke-width="0.5"/>
                <text x="100" y="340" text-anchor="middle" font-family="'Cormorant Garamond',Georgia,serif" font-style="italic" font-size="25" fill="#1e1818">emptywine</text>
                <line x1="65" y1="350" x2="135" y2="350" stroke="rgba(30,24,24,0.1)" stroke-width="0.4"/>
                <text x="100" y="364" text-anchor="middle" font-family="Cinzel,serif" font-size="5.2" fill="rgba(30,24,24,0.38)" letter-spacing="1.8">BLANC DE BLANCS</text>
                <text x="100" y="383" text-anchor="middle" font-family="'Cormorant Garamond',Georgia,serif" font-style="italic" font-size="9.5" fill="rgba(30,24,24,0.3)">Sancerre · Loire Valley</text>
                <circle cx="100" cy="404" r="8" fill="#7a1c1c" opacity="0.72"/>
                <circle cx="100" cy="404" r="5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
                <line x1="44" y1="420" x2="156" y2="420" stroke="rgba(30,24,24,0.1)" stroke-width="0.5"/>
              </g>
              <path d="M22,510 L22,222 C22,205 29,190 44,178 L72,148 L72,48 L86,48 L86,148 L66,177 C54,190 46,205 46,221 L46,512 Z" fill="url(#hl-c)"/>
              <rect x="70" y="26" width="60" height="26" rx="8" fill="url(#cp-c)"/>
              <rect x="70" y="48" width="60" height="4" fill="rgba(0,0,0,0.24)"/>
              <rect x="74" y="28" width="16" height="20" rx="6" fill="rgba(255,255,255,0.09)"/>
              <rect x="83" y="14" width="34" height="16" rx="8" fill="#cabb92"/>
              <rect x="87" y="15" width="12" height="12" rx="5" fill="rgba(255,255,255,0.16)"/>
            </svg>
          </div>
        </div>
        <p class="g-label-name">Blanc Épuré</p>
        <p class="g-label-desc">Pure white, precise type, a single wax seal — modern and refined.</p>
      </div>

    </div>
  </div>
</section>

<!-- PRICING -->
<section id="pricing">
  <div class="section-wrap">
    <div class="pricing-header">
      <span class="section-kicker reveal">Pricing</span>
      <h2 class="section-title reveal reveal-d1">Simple,<br><em>Transparent</em></h2>
      <p class="pricing-note reveal reveal-d2">All orders include label design, premium wine, and branded packaging.</p>
    </div>
    <div class="pricing-grid">
      <div class="pricing-card reveal">
        <div class="pricing-tier">Starter</div>
        <div class="pricing-amount"><span>$</span>249</div>
        <p class="pricing-from">from · 12 bottles minimum</p>
        <div class="pricing-rule"></div>
        <ul class="pricing-features">
          <li>12 bottles minimum</li>
          <li>1 custom label design</li>
          <li>Standard delivery</li>
          <li>Email support</li>
        </ul>
        <a href="#contact" class="pricing-cta">Get Started</a>
      </div>
      <div class="pricing-card featured reveal reveal-d2">
        <div class="pricing-tier">Business</div>
        <div class="pricing-amount"><span>$</span>699</div>
        <p class="pricing-from">from · 36 bottles minimum</p>
        <div class="pricing-rule"></div>
        <ul class="pricing-features">
          <li>36 bottles minimum</li>
          <li>3 label variations</li>
          <li>Priority delivery</li>
          <li>Dedicated contact</li>
          <li>Revision rounds included</li>
        </ul>
        <a href="#contact" class="pricing-cta">Get Started</a>
      </div>
      <div class="pricing-card reveal reveal-d4">
        <div class="pricing-tier">Enterprise</div>
        <div class="pricing-amount"><em>Custom</em></div>
        <p class="pricing-from">talk to us</p>
        <div class="pricing-rule"></div>
        <ul class="pricing-features">
          <li>Unlimited scale</li>
          <li>Full white-label</li>
          <li>Dedicated account manager</li>
          <li>Same-day rush available</li>
          <li>API access for automation</li>
        </ul>
        <a href="#contact" class="pricing-cta">Contact Us</a>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="section-wrap">
    <div class="contact-layout">
      <div class="contact-intro">
        <span class="section-kicker reveal">Get in Touch</span>
        <h2 class="section-title reveal reveal-d1">Commission<br>Your <em>Label</em></h2>
        <p class="section-sub reveal reveal-d2">Tell us about your gifting needs and we will respond within 24 hours with a proposal and sample designs.</p>
        <div class="contact-detail reveal reveal-d3">
          <span class="contact-detail-label">Email</span>
          <span class="contact-detail-value">hello@emptywine.com</span>
        </div>
        <div class="contact-detail reveal reveal-d4">
          <span class="contact-detail-label">Response Time</span>
          <span class="contact-detail-value">Within 24 hours</span>
        </div>
      </div>
      <div class="reveal reveal-d2">
        <form class="contact-form" id="contact-form" novalidate>
          <div class="field-group">
            <div class="field">
              <label for="cf-name">Full Name</label>
              <input id="cf-name" name="name" type="text" placeholder="Alexandra Chen" required />
            </div>
            <div class="field">
              <label for="cf-company">Company</label>
              <input id="cf-company" name="company" type="text" placeholder="Meridian Capital" required />
            </div>
          </div>
          <div class="field-group">
            <div class="field">
              <label for="cf-email">Email</label>
              <input id="cf-email" name="email" type="email" placeholder="alex@meridian.com" required />
            </div>
            <div class="field">
              <label for="cf-phone">Phone (optional)</label>
              <input id="cf-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          <div class="field">
            <label for="cf-message">Occasion &amp; Details</label>
            <textarea id="cf-message" name="message" placeholder="e.g. 200 bottles for our annual client dinner in November. Dark label, company logo, Bordeaux preferred."></textarea>
          </div>
          <button type="submit">Send Inquiry</button>
        </form>
        <div id="contact-success">
          <p>Thank you — we will be in touch within 24 hours.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <a href="#" class="footer-logo">emptywine</a>
  <p class="footer-copy">© 2026 emptywine. All rights reserved.</p>
  <nav class="footer-links" aria-label="Footer navigation">
    <a href="#how">Process</a>
    <a href="#gallery">Labels</a>
    <a href="#pricing">Pricing</a>
    <a href="#contact">Contact</a>
  </nav>
</footer>

<script>
(function() {
  'use strict';

  var nav = document.getElementById('main-nav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }, { passive: true });

  // Load hero bottle photo
  var heroPhoto = document.getElementById('hero-photo');
  var heroSkeleton = document.getElementById('hero-skeleton');
  if (heroPhoto) {
    heroPhoto.addEventListener('load', function() {
      heroPhoto.classList.add('loaded');
      if (heroSkeleton) heroSkeleton.style.display = 'none';
    });
    heroPhoto.src = '/api/bottle/hero';
  }

  // Load gallery bottle photos
  document.querySelectorAll('.g-btl-wrap').forEach(function(wrap) {
    var src = wrap.getAttribute('data-src');
    var img = wrap.querySelector('.g-btl-photo');
    var skel = wrap.querySelector('.btl-skeleton');
    if (!src || !img) return;
    img.addEventListener('load', function() {
      img.classList.add('loaded');
      if (skel) skel.style.display = 'none';
    });
    img.src = src;
  });

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

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      var data = {};
      new FormData(form).forEach(function(val, key) { data[key] = val; });
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function(r) {
        if (!r.ok) throw new Error('failed');
        document.getElementById('contact-success').style.display = 'block';
        form.style.display = 'none';
      }).catch(function() {
        btn.textContent = 'Try Again';
        btn.disabled = false;
      });
    });
  }
})();
</script>
</body>
</html>`;
