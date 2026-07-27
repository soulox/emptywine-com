export const PREVIEW_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Design Your Label — emptywine</title>
<meta name="description" content="Preview a bespoke wine label for your brand, live. Type your name, pick a style, and see it on the bottle." />
<link rel="canonical" href="https://emptywine.com/preview" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="emptywine" />
<meta property="og:url" content="https://emptywine.com/preview" />
<meta property="og:title" content="Design Your Label — emptywine" />
<meta property="og:description" content="Preview a bespoke wine label for your brand, live. Type your name, pick a style, and see it on the bottle." />
<meta property="og:image" content="https://emptywine.com/og.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Design Your Label — emptywine" />
<meta name="twitter:description" content="Preview a bespoke wine label for your brand, live — type your name, pick a style, download it print-ready." />
<meta name="twitter:image" content="https://emptywine.com/og.jpg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0 0 40 40'%3E%3Ccircle%20cx='20'%20cy='20'%20r='20'%20fill='%238a6a3c'/%3E%3Cpath%20fill='%23fbfaf7'%20d='M18.4%207h3.2v4.4q0%201.1%20.75%201.95l.7%20.8q1.45%201.6%201.45%203.9V30q0%201.5-1.5%201.5h-6.4q-1.5%200-1.5-1.5V18.05q0-2.3%201.45-3.9l.7-.8Q18.4%2012.5%2018.4%2011.4z'/%3E%3Crect%20x='15.4'%20y='22.2'%20width='9.2'%20height='4.4'%20fill='%238a6a3c'/%3E%3C/svg%3E" />
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #fbfaf7;
  --bg-2:     #f4f1ea;
  --bg-3:     #ece7dc;
  --ink:      #2a2723;
  --text:     #47423b;
  --muted:    #6b655c;
  --faint:    #787061;
  --bronze:   #836237;
  --bronze-2: #916f3f;
  --border:   rgba(42,39,35,0.12);

  /* label position on the SVG bottle (calibrated to the vector below) */
  --lbl-top:    41%;
  --lbl-left:   17%;
  --lbl-width:  66%;
  --lbl-height: 25.5%;

  /* per-field multipliers for label typography, driven by the size sliders */
  --scale-appellation: 1;
  --scale-brand:       1;
  --scale-class:       1;
  --scale-varietal:    1;
  --scale-vintage:     1;
}

html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Manrope', system-ui, -apple-system, sans-serif;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
}

/* visible keyboard focus indicator */
a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 2px solid var(--bronze);
  outline-offset: 3px;
  border-radius: 2px;
}

/* ── NAV ── */
#pv-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 72px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  background: rgba(251,250,247,0.86);
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
}

.nav-logo {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
}

.brand-mark { width: 32px; height: 32px; flex-shrink: 0; }

.brand-word {
  font-weight: 800;
  font-size: 1.28rem;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.nav-back {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-back:hover { color: var(--bronze); }

/* ── LAYOUT ── */
.preview-layout {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 440px;
  align-items: start;
  min-height: 0;
}

/* ── BOTTLE STAGE ── */
.bottle-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: radial-gradient(ellipse at 50% 38%, #ffffff 0%, var(--bg-2) 62%, var(--bg-3) 100%);
  position: sticky;
  top: 72px;
  height: calc(100dvh - 72px);
  overflow: hidden;
}

.bottle-wrap {
  position: relative;
  display: inline-block;
  line-height: 0;
}

.bottle-svg {
  height: min(74vh, 640px);
  width: auto;
  display: block;
  filter: drop-shadow(-10px 30px 44px rgba(58,44,26,0.24)) drop-shadow(0 6px 16px rgba(58,44,26,0.12));
}

/* ── LABEL OVERLAY ── */
.label-overlay {
  position: absolute;
  top:    var(--lbl-top);
  left:   var(--lbl-left);
  width:  var(--lbl-width);
  height: var(--lbl-height);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: filter 0.4s ease;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.28));
}

.label-paper {
  width: 100%;
  height: 100%;
  container-type: size;
  background: linear-gradient(168deg, #faf6ec 0%, #f2e8d5 45%, #e6d8c2 100%);
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.4s ease;
}

.label-paper::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23t)' opacity='0.06'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
  pointer-events: none;
  opacity: 0.4;
}

/* cylinder curvature: soft edge-shadows + a specular highlight band,
   so the flat label reads as wrapping the round bottle */
.label-paper::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  mix-blend-mode: soft-light;
  background: linear-gradient(90deg,
    rgba(0,0,0,0.62) 0%,
    rgba(0,0,0,0.20) 9%,
    rgba(255,255,255,0) 24%,
    rgba(255,255,255,0.50) 38%,
    rgba(255,255,255,0) 52%,
    rgba(0,0,0,0.12) 82%,
    rgba(0,0,0,0.55) 100%);
}

.label-frame-outer {
  position: absolute;
  inset: 7%;
  border: 1px solid rgba(150,110,25,0.42);
  pointer-events: none;
  transition: border-color 0.4s ease;
}

.label-frame-inner {
  position: absolute;
  inset: 10.5%;
  border: 1px solid rgba(150,110,25,0.16);
  pointer-events: none;
  transition: border-color 0.4s ease;
}

.label-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8% 9%;
  width: 100%;
  height: 100%;
}

.lbl-appellation {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: calc(5.6cqh * var(--scale-appellation));
  line-height: 1.1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(60,40,10,0.5);
  margin-bottom: 5.5cqh;
}

.lbl-brand {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-weight: 500;
  font-size: calc(17cqh * var(--scale-brand));
  line-height: 1;
  color: #18110a;
  margin-bottom: 4cqh;
  transition: color 0.4s ease;
}

.lbl-rule {
  width: 62%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(130,90,18,0.5), transparent);
  margin-bottom: 4cqh;
  transition: background 0.4s ease;
}

.lbl-class {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: calc(5.2cqh * var(--scale-class));
  line-height: 1.1;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(60,40,10,0.6);
  margin-bottom: 3.5cqh;
}

.lbl-varietal {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: calc(8.5cqh * var(--scale-varietal));
  line-height: 1.05;
  color: rgba(60,40,10,0.46);
  margin-bottom: 4cqh;
}

.lbl-vintage {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: calc(5.6cqh * var(--scale-vintage));
  line-height: 1;
  letter-spacing: 0.22em;
  color: rgba(80,55,14,0.62);
}

/* colour theming for label styles applied via JS-friendly classes */
.label-paper.style-noir { background: linear-gradient(168deg, #17140f 0%, #241f18 100%); }
.label-paper.style-noir .lbl-brand { color: #d8b25f; }
.label-paper.style-noir .lbl-appellation,
.label-paper.style-noir .lbl-class,
.label-paper.style-noir .lbl-varietal,
.label-paper.style-noir .lbl-vintage { color: rgba(216,178,95,0.7); }
.label-paper.style-noir .lbl-rule { background: linear-gradient(to right, transparent, rgba(216,178,95,0.4), transparent); }
.label-paper.style-noir .label-frame-outer { border-color: rgba(216,178,95,0.35); }
.label-paper.style-noir .label-frame-inner { border-color: rgba(216,178,95,0.15); }

.label-paper.style-blanc { background: #faf9f7; }
.label-paper.style-blanc .lbl-brand { color: #1b1512; }
.label-paper.style-blanc .lbl-appellation,
.label-paper.style-blanc .lbl-class,
.label-paper.style-blanc .lbl-varietal,
.label-paper.style-blanc .lbl-vintage { color: rgba(27,21,18,0.5); }
.label-paper.style-blanc .lbl-rule { background: linear-gradient(to right, transparent, rgba(27,21,18,0.22), transparent); }
.label-paper.style-blanc .label-frame-outer { border-color: rgba(27,21,18,0.2); }
.label-paper.style-blanc .label-frame-inner { border-color: rgba(27,21,18,0.09); }

/* ── EDITOR PANEL ── */
.editor-panel {
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: var(--bg);
}

.editor-header {
  padding: 40px 40px 28px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.editor-kicker {
  display: block;
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bronze);
  margin-bottom: 14px;
}

.editor-title {
  font-weight: 300;
  font-size: 2.1rem;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: var(--ink);
}
.editor-title em { font-style: normal; font-weight: 600; color: var(--bronze); }

.editor-body {
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 26px;
  flex: 1;
}

.field { display: flex; flex-direction: column; gap: 9px; }

.field label {
  font-weight: 700;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.field input {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  padding: 10px 0;
  outline: none;
  transition: border-color 0.25s;
  width: 100%;
}

.field input:focus { border-color: var(--bronze-2); }
.field input::placeholder { color: var(--faint); }

.style-chips { display: flex; gap: 10px; flex-wrap: wrap; }

.style-chip {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 9px 16px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 2px;
  color: var(--muted);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  user-select: none;
}

.style-chip:hover { border-color: var(--bronze-2); color: var(--ink); }
.style-chip.active { border-color: var(--bronze); color: var(--bronze); background: var(--bg-2); }

/* segmented toggle (e.g. vintage numeral format) */
.seg {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.seg-btn {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: var(--muted);
  background: transparent;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.seg-btn + .seg-btn { border-left: 1px solid var(--border); }
.seg-btn:hover { color: var(--ink); }
.seg-btn.active { color: var(--bronze); background: var(--bg-2); }

/* text-size slider */
.field-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.field-val {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 0.72rem;
  color: var(--bronze);
  font-variant-numeric: tabular-nums;
}

/* per-field text-size controls */
.size-group { display: flex; flex-direction: column; gap: 14px; }

.size-row {
  display: grid;
  grid-template-columns: 88px 1fr 40px;
  align-items: center;
  gap: 14px;
}

.size-row > span:first-child {
  font-weight: 600;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.size-row .field-val { text-align: right; font-size: 0.68rem; }
.size-row .slider { margin: 0; }

input[type=range].slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 2px;
  background: var(--border);
  outline: none;
  cursor: pointer;
  margin: 6px 0;
}

input[type=range].slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bronze);
  border: 2px solid var(--bg);
  box-shadow: 0 1px 4px rgba(42,39,35,0.2);
  cursor: pointer;
  transition: transform 0.15s ease;
}

input[type=range].slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
input[type=range].slider:active::-webkit-slider-thumb { transform: scale(1.05); }

input[type=range].slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bronze);
  border: 2px solid var(--bg);
  box-shadow: 0 1px 4px rgba(42,39,35,0.2);
  cursor: pointer;
}

.editor-footer {
  padding: 26px 40px 32px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.btn-order {
  font-weight: 700;
  font-size: 0.64rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: var(--ink);
  color: var(--bg);
  border: none;
  border-radius: 2px;
  padding: 17px;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
  width: 100%;
  text-align: center;
  text-decoration: none;
  display: block;
}

.btn-order:hover { background: #423d36; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(42,39,35,0.14); }
.btn-order:active { transform: translateY(0) scale(0.98); box-shadow: 0 4px 12px rgba(42,39,35,0.12); }

.preview-note {
  font-size: 0.82rem;
  font-weight: 300;
  color: var(--muted);
  text-align: center;
  line-height: 1.6;
}
.preview-note b { font-weight: 600; color: var(--bronze); }

/* ── DOWNLOAD CHOOSER ── */
.dl-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(26,22,16,0.42);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  animation: dlFade 0.25s ease;
}

.dl-overlay[hidden] { display: none; }

@keyframes dlFade { from { opacity: 0; } to { opacity: 1; } }

.dl-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 30px 70px -20px rgba(42,39,35,0.4);
  padding: 40px 40px 34px;
  animation: dlRise 0.3s cubic-bezier(0.16,1,0.3,1);
}

@keyframes dlRise { from { transform: translateY(12px); opacity: 0; } to { transform: none; opacity: 1; } }

.dl-close {
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--faint);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  transition: color 0.2s;
}
.dl-close:hover { color: var(--ink); }

.dl-kicker {
  display: block;
  font-weight: 700;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bronze);
  margin-bottom: 12px;
}

.dl-title {
  font-weight: 300;
  font-size: 1.7rem;
  letter-spacing: -0.03em;
  color: var(--ink);
  margin-bottom: 12px;
}

.dl-note {
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 26px;
}

.dl-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 22px;
}

.dl-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 20px 12px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
}

.dl-btn:hover { border-color: var(--bronze); background: var(--bg-3); }
.dl-btn:active { transform: scale(0.98); }
.dl-btn:disabled { opacity: 0.55; cursor: default; }

.dl-btn-fmt {
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
  color: var(--ink);
}

.dl-btn-sub {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.dl-commission {
  display: block;
  text-align: center;
  font-weight: 600;
  font-size: 0.78rem;
  color: var(--bronze);
  text-decoration: none;
  transition: color 0.2s;
}
.dl-commission:hover { color: var(--bronze-2); text-decoration: underline; }

/* ── RESPONSIVE ── */
@media (max-width: 980px) {
  #pv-nav { padding: 0 24px; }
  .preview-layout { grid-template-columns: 1fr; }
  .editor-panel { border-left: none; border-top: 1px solid var(--border); }
  .bottle-stage { position: static; height: auto; padding: 40px 24px; }
  .bottle-svg { height: min(58vh, 460px); }
  .editor-header, .editor-body, .editor-footer { padding-left: 24px; padding-right: 24px; }
}

/* respect users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
</style>
</head>
<body>

<nav id="pv-nav">
  <a href="/" class="nav-logo" aria-label="emptywine — home">
    <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#8a6a3c"/>
      <path fill="#fbfaf7" d="M18.4 8h3.2v4.2q0 1.1 .75 1.95l.7 .8q1.45 1.6 1.45 3.9V29.4q0 1.5-1.5 1.5h-6.4q-1.5 0-1.5-1.5V20.85q0-2.3 1.45-3.9l.7-.8Q18.4 13.3 18.4 12.2z"/>
      <rect x="15.4" y="22.6" width="9.2" height="4.4" fill="#8a6a3c"/>
    </svg>
    <span class="brand-word">emptywine</span>
  </a>
  <a href="/" class="nav-back">← Back to site</a>
</nav>

<div class="preview-layout">

  <!-- LEFT: photographic bottle + live label overlay -->
  <div class="bottle-stage">
    <div class="bottle-wrap">
      <img class="bottle-svg" src="data:image/webp;base64,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" alt="Wine bottle mockup" />

      <!-- Label overlay — sits on the bottle body -->
      <div class="label-overlay" id="label-overlay">
        <div class="label-paper" id="label-paper">
          <div class="label-frame-outer"></div>
          <div class="label-frame-inner"></div>
          <div class="label-content">
            <span class="lbl-appellation" id="lbl-appellation">Appellation Contrôlée</span>
            <em class="lbl-brand" id="lbl-brand">emptywine</em>
            <div class="lbl-rule"></div>
            <span class="lbl-class" id="lbl-class">Grand Réserve</span>
            <span class="lbl-varietal" id="lbl-varietal">Burgundy · Pinot Noir</span>
            <span class="lbl-vintage" id="lbl-vintage">MMXXV</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- RIGHT: Editor panel -->
  <div class="editor-panel">

    <div class="editor-header">
      <span class="editor-kicker">Live Preview</span>
      <h1 class="editor-title">design<br>your <em>label</em></h1>
    </div>

    <div class="editor-body">
      <div class="field">
        <label for="f-brand">Brand / Company Name</label>
        <input id="f-brand" type="text" placeholder="Larkfield &amp; Voss" />
      </div>
      <div class="field">
        <label for="f-collection">Collection Name</label>
        <input id="f-collection" type="text" placeholder="The Heritage Reserve" />
      </div>
      <div class="field">
        <label for="f-varietal">Wine / Varietal</label>
        <input id="f-varietal" type="text" placeholder="Burgundy · Pinot Noir" />
      </div>
      <div class="field">
        <div class="field-row">
          <label for="f-vintage">Vintage Year</label>
          <div class="seg" id="vintage-format" role="group" aria-label="Vintage numeral format">
            <button type="button" class="seg-btn active" data-fmt="roman">MMXXV</button>
            <button type="button" class="seg-btn" data-fmt="arabic">2025</button>
          </div>
        </div>
        <input id="f-vintage" type="text" placeholder="2025" maxlength="4" />
      </div>
      <div class="field">
        <label>Label Style</label>
        <div class="style-chips" id="style-chips">
          <button type="button" class="style-chip active" data-style="cream" aria-pressed="true">Cream Classic</button>
          <button type="button" class="style-chip" data-style="noir" aria-pressed="false">Noir Prestige</button>
          <button type="button" class="style-chip" data-style="blanc" aria-pressed="false">Blanc Épuré</button>
        </div>
      </div>

      <div class="field">
        <label>Text Sizes</label>
        <div class="size-group" id="size-group">
          <div class="size-row">
            <span>Brand</span>
            <input class="slider" type="range" min="55" max="150" value="100" data-target="brand" aria-label="Brand text size" />
            <span class="field-val" data-val="brand">100%</span>
          </div>
          <div class="size-row">
            <span>Collection</span>
            <input class="slider" type="range" min="55" max="150" value="100" data-target="appellation" aria-label="Collection text size" />
            <span class="field-val" data-val="appellation">100%</span>
          </div>
          <div class="size-row">
            <span>Réserve</span>
            <input class="slider" type="range" min="55" max="150" value="100" data-target="class" aria-label="Classification text size" />
            <span class="field-val" data-val="class">100%</span>
          </div>
          <div class="size-row">
            <span>Varietal</span>
            <input class="slider" type="range" min="55" max="150" value="100" data-target="varietal" aria-label="Varietal text size" />
            <span class="field-val" data-val="varietal">100%</span>
          </div>
          <div class="size-row">
            <span>Vintage</span>
            <input class="slider" type="range" min="55" max="150" value="100" data-target="vintage" aria-label="Vintage text size" />
            <span class="field-val" data-val="vintage">100%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="editor-footer">
      <button type="button" class="btn-order" id="btn-commission">Commission This Label</button>
      <p class="preview-note"><b>Updates live</b> as you type. Download a print-ready file, or commission us to produce the finished bottle.</p>
    </div>

  </div>
</div>

<!-- Download chooser -->
<div class="dl-overlay" id="dl-overlay" hidden>
  <div class="dl-card" role="dialog" aria-modal="true" aria-labelledby="dl-title">
    <button type="button" class="dl-close" id="dl-close" aria-label="Close">×</button>
    <span class="dl-kicker">Print-Ready Artwork</span>
    <h2 class="dl-title" id="dl-title">Download your label</h2>
    <p class="dl-note">High-resolution label artwork, ready for the printer. Choose a format:</p>
    <div class="dl-actions">
      <button type="button" class="dl-btn" id="dl-png">
        <span class="dl-btn-fmt">PNG</span>
        <span class="dl-btn-sub">300 DPI image</span>
      </button>
      <button type="button" class="dl-btn" id="dl-pdf">
        <span class="dl-btn-fmt">PDF</span>
        <span class="dl-btn-sub">print document</span>
      </button>
    </div>
    <a href="/#contact" class="dl-commission">Prefer we print &amp; deliver it? Commission us →</a>
  </div>
</div>

<script>
(function() {
  'use strict';

  function toRoman(year) {
    if (!year || year.length !== 4) return year || 'MMXXV';
    var n = parseInt(year, 10);
    if (isNaN(n)) return year;
    var vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    var syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    var out = '';
    for (var i = 0; i < vals.length; i++) {
      while (n >= vals[i]) { out += syms[i]; n -= vals[i]; }
    }
    return out;
  }

  var vintageFmt = 'roman';

  function renderVintage() {
    var vintage = document.getElementById('f-vintage').value.trim();
    var display;
    if (!vintage) {
      display = vintageFmt === 'roman' ? 'MMXXV' : '2025';
    } else {
      display = vintageFmt === 'roman' ? toRoman(vintage) : vintage;
    }
    document.getElementById('lbl-vintage').textContent = display;
  }

  function updateLabel() {
    var brand    = document.getElementById('f-brand').value.trim();
    var collect  = document.getElementById('f-collection').value.trim();
    var varietal = document.getElementById('f-varietal').value.trim();
    document.getElementById('lbl-brand').textContent       = brand || 'emptywine';
    document.getElementById('lbl-appellation').textContent = collect || 'Appellation Contrôlée';
    document.getElementById('lbl-varietal').textContent    = varietal || 'Burgundy · Pinot Noir';
    renderVintage();
  }

  ['f-brand','f-collection','f-varietal','f-vintage'].forEach(function(id) {
    document.getElementById(id).addEventListener('input', updateLabel);
  });

  document.querySelectorAll('#vintage-format .seg-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#vintage-format .seg-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      vintageFmt = btn.getAttribute('data-fmt');
      renderVintage();
    });
  });

  // Per-field text-size sliders — each drives its own --scale-{target} var
  var root = document.documentElement;
  document.querySelectorAll('#size-group .slider').forEach(function(slider) {
    var target = slider.getAttribute('data-target');
    var valEl = document.querySelector('#size-group .field-val[data-val="' + target + '"]');
    slider.addEventListener('input', function() {
      var pct = parseInt(slider.value, 10);
      root.style.setProperty('--scale-' + target, (pct / 100).toString());
      if (valEl) valEl.textContent = pct + '%';
    });
  });

  var paper = document.getElementById('label-paper');
  document.querySelectorAll('.style-chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      document.querySelectorAll('.style-chip').forEach(function(c) {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      paper.classList.remove('style-noir', 'style-blanc');
      var s = chip.getAttribute('data-style');
      if (s === 'noir') paper.classList.add('style-noir');
      else if (s === 'blanc') paper.classList.add('style-blanc');
    });
  });

  // ── Print-ready export ─────────────────────────────────────────────
  var PALETTES = {
    cream: { bg: ['#faf6ec','#f2e8d5','#e6d8c2'], brand:'#18110a',
      app:'rgba(60,40,10,0.5)', cls:'rgba(60,40,10,0.6)', var:'rgba(60,40,10,0.46)', vin:'rgba(80,55,14,0.62)',
      rule:'rgba(130,90,18,0.5)', frameO:'rgba(150,110,25,0.42)', frameI:'rgba(150,110,25,0.16)' },
    noir: { bg: ['#17140f','#241f18'], brand:'#d8b25f',
      app:'rgba(216,178,95,0.7)', cls:'rgba(216,178,95,0.7)', var:'rgba(216,178,95,0.7)', vin:'rgba(216,178,95,0.7)',
      rule:'rgba(216,178,95,0.4)', frameO:'rgba(216,178,95,0.35)', frameI:'rgba(216,178,95,0.15)' },
    blanc: { bg: ['#faf9f7'], brand:'#1b1512',
      app:'rgba(27,21,18,0.5)', cls:'rgba(27,21,18,0.5)', var:'rgba(27,21,18,0.5)', vin:'rgba(27,21,18,0.5)',
      rule:'rgba(27,21,18,0.22)', frameO:'rgba(27,21,18,0.2)', frameI:'rgba(27,21,18,0.09)' }
  };

  function currentStyle() {
    if (paper.classList.contains('style-noir')) return 'noir';
    if (paper.classList.contains('style-blanc')) return 'blanc';
    return 'cream';
  }
  function scaleOf(name) {
    var v = parseFloat(getComputedStyle(root).getPropertyValue('--scale-' + name));
    return isNaN(v) ? 1 : v;
  }
  function txt(id) { return (document.getElementById(id).textContent || '').trim(); }

  function wrapLines(ctx, text, maxWidth) {
    var words = text.split(/\\s+/);
    var lines = [], line = '';
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + ' ' + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = words[i]; }
      else { line = test; }
    }
    if (line) lines.push(line);
    return lines;
  }

  async function renderLabelCanvas() {
    // ensure webfonts are ready before drawing to canvas
    try {
      await Promise.all([
        document.fonts.load('italic 500 100px "Cormorant Garamond"'),
        document.fonts.load('italic 400 100px "Cormorant Garamond"'),
        document.fonts.load('700 100px "Manrope"'),
        document.fonts.load('600 100px "Manrope"')
      ]);
      await document.fonts.ready;
    } catch (e) {}

    var W = 1240, H = 1400;
    var canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext('2d');
    var pal = PALETTES[currentStyle()];

    // background
    if (pal.bg.length === 1) {
      ctx.fillStyle = pal.bg[0];
    } else {
      var g = ctx.createLinearGradient(0, 0, W * 0.35, H);
      pal.bg.forEach(function(c, i) { g.addColorStop(pal.bg.length === 3 ? [0,0.45,1][i] : i, c); });
      ctx.fillStyle = g;
    }
    ctx.fillRect(0, 0, W, H);

    // frames
    ctx.lineWidth = Math.max(1.5, H * 0.0016);
    ctx.strokeStyle = pal.frameO;
    ctx.strokeRect(0.07 * W, 0.07 * H, 0.86 * W, 0.86 * H);
    ctx.strokeStyle = pal.frameI;
    ctx.strokeRect(0.105 * W, 0.105 * H, 0.79 * W, 0.79 * H);

    // content geometry (padding % is relative to width in CSS)
    var padX = 0.09 * W, padY = 0.08 * W;
    var contentX = padX, contentW = W - 2 * padX;
    var contentY = padY, contentH = H - 2 * padY;
    var cx = W / 2;

    function fontStr(el) {
      if (el.family === 'cg') return el.italic + ' ' + el.weight + ' ' + el.fs + 'px "Cormorant Garamond"';
      return el.weight + ' ' + el.fs + 'px "Manrope"';
    }

    // build ordered elements
    var els = [
      { key:'app', text: txt('lbl-appellation').toUpperCase(), family:'m', weight:700, fs:0.056*H*scaleOf('appellation'), lh:1.1, ls:0.14, color:pal.app, mb:0.055*H },
      { key:'brand', text: txt('lbl-brand'), family:'cg', italic:'italic', weight:500, fs:0.17*H*scaleOf('brand'), lh:1.0, ls:0, color:pal.brand, mb:0.04*H },
      { key:'rule', rule:true, mb:0.04*H },
      { key:'cls', text: txt('lbl-class').toUpperCase(), family:'m', weight:600, fs:0.052*H*scaleOf('class'), lh:1.1, ls:0.16, color:pal.cls, mb:0.035*H },
      { key:'var', text: txt('lbl-varietal'), family:'cg', italic:'italic', weight:400, fs:0.085*H*scaleOf('varietal'), lh:1.05, ls:0, color:pal.var, mb:0.04*H },
      { key:'vin', text: txt('lbl-vintage').toUpperCase(), family:'m', weight:600, fs:0.056*H*scaleOf('vintage'), lh:1.0, ls:0.22, color:pal.vin, mb:0 }
    ];

    // measure (wrap text, compute heights)
    var total = 0;
    els.forEach(function(el) {
      if (el.rule) { el.h = Math.max(2, H * 0.003); }
      else {
        ctx.font = fontStr(el);
        ctx.letterSpacing = (el.ls * el.fs) + 'px';
        el.lines = wrapLines(ctx, el.text, contentW);
        el.h = el.lines.length * el.fs * el.lh;
      }
      total += el.h + el.mb;
    });

    var y = contentY + Math.max(0, (contentH - total) / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    els.forEach(function(el) {
      if (el.rule) {
        var rw = contentW * 0.62;
        var grad = ctx.createLinearGradient(cx - rw/2, 0, cx + rw/2, 0);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.5, pal.rule);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(cx - rw/2, y, rw, el.h);
      } else {
        ctx.font = fontStr(el);
        ctx.letterSpacing = (el.ls * el.fs) + 'px';
        ctx.fillStyle = el.color;
        for (var i = 0; i < el.lines.length; i++) {
          ctx.fillText(el.lines[i], cx, y + i * el.fs * el.lh);
        }
      }
      y += el.h + el.mb;
    });
    ctx.letterSpacing = '0px';
    return canvas;
  }

  function dataURLToBytes(u) {
    var bin = atob(u.split(',')[1]);
    var a = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
    return a;
  }

  // Minimal single-image PDF (JPEG via DCTDecode), no external libraries
  function buildPDF(jpeg, w, h) {
    var pw = (w / 300 * 72).toFixed(2), ph = (h / 300 * 72).toFixed(2);
    var enc = function(s) { var a = new Uint8Array(s.length); for (var i=0;i<s.length;i++) a[i] = s.charCodeAt(i) & 0xff; return a; };
    var parts = [], offsets = [], pos = 0;
    function push(x) { var b = (typeof x === 'string') ? enc(x) : x; parts.push(b); pos += b.length; }
    function obj(n, body) { offsets[n] = pos; push(n + ' 0 obj\\n' + body + '\\nendobj\\n'); }

    push('%PDF-1.4\\n%\\xFF\\xFF\\xFF\\xFF\\n');
    obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    obj(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pw + ' ' + ph + '] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');
    offsets[4] = pos;
    push('4 0 obj\\n<< /Type /XObject /Subtype /Image /Width ' + w + ' /Height ' + h + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpeg.length + ' >>\\nstream\\n');
    push(jpeg);
    push('\\nendstream\\nendobj\\n');
    var content = 'q ' + pw + ' 0 0 ' + ph + ' 0 0 cm /Im0 Do Q';
    obj(5, '<< /Length ' + content.length + ' >>\\nstream\\n' + content + '\\nendstream');
    var xrefPos = pos, n = 6;
    var xref = 'xref\\n0 ' + n + '\\n0000000000 65535 f \\n';
    for (var i = 1; i < n; i++) xref += ('0000000000' + offsets[i]).slice(-10) + ' 00000 n \\n';
    push(xref);
    push('trailer\\n<< /Size ' + n + ' /Root 1 0 R >>\\nstartxref\\n' + xrefPos + '\\n%%EOF');
    var totalLen = 0; parts.forEach(function(p) { totalLen += p.length; });
    var out = new Uint8Array(totalLen), o = 0;
    parts.forEach(function(p) { out.set(p, o); o += p.length; });
    return out;
  }

  function downloadBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function() { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1500);
  }

  function fileBase() {
    var b = txt('lbl-brand') || 'emptywine';
    var slug = b.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'label';
    return slug + '-label';
  }

  var overlay = document.getElementById('dl-overlay');
  var pngBtn = document.getElementById('dl-png');
  var pdfBtn = document.getElementById('dl-pdf');

  function openChooser() { overlay.hidden = false; }
  function closeChooser() { overlay.hidden = true; }

  document.getElementById('btn-commission').addEventListener('click', openChooser);
  document.getElementById('dl-close').addEventListener('click', closeChooser);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeChooser(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && !overlay.hidden) closeChooser(); });

  async function exportLabel(fmt, btn) {
    pngBtn.disabled = true; pdfBtn.disabled = true;
    var sub = btn.querySelector('.dl-btn-sub');
    var original = sub.textContent;
    sub.textContent = 'rendering…';
    try {
      var canvas = await renderLabelCanvas();
      var name = fileBase();
      if (fmt === 'png') {
        await new Promise(function(res) { canvas.toBlob(function(b) { downloadBlob(b, name + '.png'); res(); }, 'image/png'); });
      } else {
        var jpeg = dataURLToBytes(canvas.toDataURL('image/jpeg', 0.92));
        downloadBlob(new Blob([buildPDF(jpeg, canvas.width, canvas.height)], { type: 'application/pdf' }), name + '.pdf');
      }
      closeChooser();
    } catch (e) {
      console.error('export failed', e);
      sub.textContent = 'failed — retry';
    }
    if (sub.textContent === 'rendering…') sub.textContent = original;
    else setTimeout(function() { sub.textContent = original; }, 2000);
    pngBtn.disabled = false; pdfBtn.disabled = false;
  }

  pngBtn.addEventListener('click', function() { exportLabel('png', pngBtn); });
  pdfBtn.addEventListener('click', function() { exportLabel('pdf', pdfBtn); });
})();
</script>
</body>
</html>`;
