export const PREVIEW_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Design Your Label — emptywine</title>
<meta name="description" content="Preview a bespoke wine label for your brand, live. Type your name, pick a style, and see it on the bottle." />
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
  --faint:    #a79f93;
  --bronze:   #8a6a3c;
  --bronze-2: #a3814f;
  --border:   rgba(42,39,35,0.12);

  /* label position on the SVG bottle (calibrated to the vector below) */
  --lbl-top:    47%;
  --lbl-left:   16.5%;
  --lbl-width:  67%;
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
  min-height: 0;
}

/* ── BOTTLE STAGE ── */
.bottle-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 48px;
  background: radial-gradient(ellipse at 50% 38%, #ffffff 0%, var(--bg-2) 62%, var(--bg-3) 100%);
  position: relative;
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
  font-weight: 700;
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 9px 16px;
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
  .bottle-stage { padding: 48px 24px; }
  .bottle-svg { height: min(58vh, 460px); }
  .editor-header, .editor-body, .editor-footer { padding-left: 24px; padding-right: 24px; }
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

  <!-- LEFT: SVG bottle + live label overlay -->
  <div class="bottle-stage">
    <div class="bottle-wrap">
      <svg class="bottle-svg" viewBox="0 0 200 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wine bottle mockup">
        <defs>
          <linearGradient id="pv-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#0a1a0d"/><stop offset="22%" stop-color="#173318"/>
            <stop offset="50%" stop-color="#264f28"/><stop offset="78%" stop-color="#132b15"/>
            <stop offset="100%" stop-color="#081408"/>
          </linearGradient>
          <linearGradient id="pv-cap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#6a5230"/><stop offset="40%" stop-color="#9c7c47"/>
            <stop offset="62%" stop-color="#b89760"/><stop offset="100%" stop-color="#63481f"/>
          </linearGradient>
          <linearGradient id="pv-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
            <stop offset="34%" stop-color="rgba(255,255,255,0.07)"/>
            <stop offset="52%" stop-color="rgba(255,255,255,0.17)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
          </linearGradient>
        </defs>
        <path d="M24,582 L24,250 C24,230 32,212 50,198 L78,168 L78,54 L122,54 L122,168 L150,198 C168,212 176,230 176,250 L176,582 Z" fill="url(#pv-glass)"/>
        <path d="M24,570 L24,250 C24,230 32,212 50,198 L78,168 L78,54 L94,54 L94,168 L70,197 C58,212 50,230 50,249 L50,572 Z" fill="url(#pv-shine)"/>
        <rect x="76" y="30" width="48" height="26" rx="3" fill="url(#pv-cap)"/>
        <rect x="76" y="52" width="48" height="5" fill="rgba(0,0,0,0.3)"/>
        <rect x="80" y="32" width="12" height="18" rx="3" fill="rgba(255,255,255,0.12)"/>
      </svg>

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
          <span class="style-chip active" data-style="cream">Cream Classic</span>
          <span class="style-chip" data-style="noir">Noir Prestige</span>
          <span class="style-chip" data-style="blanc">Blanc Épuré</span>
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
      document.querySelectorAll('.style-chip').forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
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
