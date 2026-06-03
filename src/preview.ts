export const PREVIEW_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Label Preview — emptywine</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Cinzel:wght@400;600&display=swap" rel="stylesheet" />
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --noir:   #080604;
  --gold:   #c8a848;
  --cream:  #f5ede0;
  --text:   #ede5d8;
  --text-2: #8a8070;
  --border: rgba(200,168,72,0.18);

  /* ── Label position on the bottle image ──────────────────────────
     Tweak these once you see your specific bottle PNG:
     --lbl-top    : distance from top of bottle image to label top
     --lbl-left   : left edge of label (% of bottle image width)
     --lbl-width  : label width (% of bottle image width)
     --lbl-height : label height (% of bottle image height)
  ──────────────────────────────────────────────────────────────── */
  --lbl-top:    44%;
  --lbl-left:   14%;
  --lbl-width:  72%;
  --lbl-height: 30%;
  --lbl-rotate: 0deg;
}

html { scroll-behavior: smooth; }
body {
  background: var(--noir);
  color: var(--text);
  font-family: 'Cormorant Garamond', Georgia, serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
}

/* ── NAV ── */
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 68px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.nav-logo {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.5rem;
  color: var(--gold);
  text-decoration: none;
}

.nav-back {
  font-family: 'Cinzel', serif;
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  color: var(--text-2);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-back:hover { color: var(--text); }

/* ── LAYOUT ── */
.preview-layout {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 0;
}

/* ── BOTTLE STAGE ── */
.bottle-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 48px;
  background: #060504;
  position: relative;
  overflow: hidden;
}

.bottle-stage::before {
  content: '';
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(200,168,72,0.05) 0%, transparent 65%);
  pointer-events: none;
}

.bottle-wrap {
  position: relative;
  display: inline-block;
  max-height: 75vh;
  filter: drop-shadow(0 40px 80px rgba(0,0,0,0.9)) drop-shadow(0 0 60px rgba(200,168,72,0.06));
}

/* Skeleton while bottle loads */
.bottle-skeleton {
  width: 320px;
  height: 600px;
  background: linear-gradient(110deg, #141210 30%, #201c18 50%, #141210 70%);
  background-size: 200% 100%;
  animation: skelShimmer 1.6s linear infinite;
  border-radius: 2px;
}

@keyframes skelShimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.bottle-img {
  display: block;
  max-height: 75vh;
  width: auto;
  opacity: 0;
  transition: opacity 0.6s ease;
  position: relative;
}

.bottle-img.loaded { opacity: 1; }

/* ── LABEL OVERLAY ── */
.label-overlay {
  position: absolute;
  top:    var(--lbl-top);
  left:   var(--lbl-left);
  width:  var(--lbl-width);
  height: var(--lbl-height);
  transform: rotate(var(--lbl-rotate));
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: all 0.3s ease;
}

.label-paper {
  width: 100%;
  height: 100%;
  background: linear-gradient(168deg, #faf6ec 0%, #f2e8d5 45%, #e6d8c2 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Paper texture */
.label-paper::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23t)' opacity='0.07'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
  pointer-events: none;
  opacity: 0.4;
}

.label-frame-outer {
  position: absolute;
  inset: 6%;
  border: 1px solid rgba(150,110,25,0.48);
  pointer-events: none;
}

.label-frame-inner {
  position: absolute;
  inset: 9%;
  border: 1px solid rgba(150,110,25,0.18);
  pointer-events: none;
}

.label-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0;
  padding: 10% 12%;
  width: 100%;
  height: 100%;
}

.lbl-appellation {
  font-family: 'Cinzel', serif;
  font-size: clamp(0.3rem, 1.2vw, 0.5rem);
  letter-spacing: 0.2em;
  color: rgba(60,40,10,0.55);
  margin-bottom: 6%;
}

.lbl-brand {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1rem, 4vw, 2.2rem);
  line-height: 1;
  color: #18110a;
  margin-bottom: 5%;
}

.lbl-rule {
  width: 70%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(130,90,18,0.5), transparent);
  margin-bottom: 5%;
}

.lbl-class {
  font-family: 'Cinzel', serif;
  font-size: clamp(0.3rem, 1vw, 0.48rem);
  letter-spacing: 0.2em;
  color: rgba(60,40,10,0.62);
  margin-bottom: 4%;
}

.lbl-varietal {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(0.5rem, 1.8vw, 0.85rem);
  color: rgba(60,40,10,0.44);
  margin-bottom: 5%;
}

.lbl-vintage {
  font-family: 'Cinzel', serif;
  font-size: clamp(0.3rem, 1.2vw, 0.55rem);
  letter-spacing: 0.28em;
  color: rgba(80,55,14,0.65);
}

/* ── EDITOR PANEL ── */
.editor-panel {
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.editor-header {
  padding: 36px 36px 24px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.editor-kicker {
  display: block;
  font-family: 'Cinzel', serif;
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  color: var(--gold);
  margin-bottom: 10px;
}

.editor-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: 1.8rem;
  color: var(--cream);
  line-height: 1.15;
}

.editor-body {
  padding: 32px 36px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex: 1;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-family: 'Cinzel', serif;
  font-size: 0.52rem;
  letter-spacing: 0.18em;
  color: var(--text-2);
}

.field input,
.field select,
.field textarea {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem;
  font-weight: 300;
  padding: 10px 0;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}

.field input:focus,
.field select:focus,
.field textarea:focus { border-color: rgba(200,168,72,0.45); }

.field input::placeholder,
.field textarea::placeholder { color: rgba(138,128,112,0.5); }

.field select option { background: #141210; }

.field textarea { resize: none; height: 72px; }

.style-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.style-chip {
  font-family: 'Cinzel', serif;
  font-size: 0.5rem;
  letter-spacing: 0.14em;
  padding: 7px 14px;
  border: 1px solid var(--border);
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.style-chip:hover { border-color: rgba(200,168,72,0.4); color: var(--text); }
.style-chip.active { border-color: var(--gold); color: var(--gold); background: rgba(200,168,72,0.08); }

.editor-footer {
  padding: 28px 36px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-preview {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: var(--gold);
  color: var(--noir);
  border: none;
  padding: 16px;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}

.btn-preview:hover { background: #e8c858; }
.btn-preview:disabled { opacity: 0.5; cursor: default; }

.btn-order {
  font-family: 'Cinzel', serif;
  font-size: 0.58rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border: 1px solid var(--border);
  color: var(--text-2);
  padding: 14px;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s;
  width: 100%;
  text-align: center;
  text-decoration: none;
  display: block;
}

.btn-order:hover { border-color: rgba(200,168,72,0.4); color: var(--text); }

.preview-note {
  font-size: 0.82rem;
  font-weight: 300;
  color: var(--text-2);
  opacity: 0.6;
  text-align: center;
  font-style: italic;
  line-height: 1.5;
}

/* ── POSITION ADJUSTER (dev tool) ── */
.adjuster {
  padding: 20px 36px;
  border-top: 1px solid rgba(200,168,72,0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.adjuster-title {
  font-family: 'Cinzel', serif;
  font-size: 0.48rem;
  letter-spacing: 0.2em;
  color: var(--text-2);
  opacity: 0.5;
}

.adj-row {
  display: grid;
  grid-template-columns: 70px 1fr 36px;
  align-items: center;
  gap: 10px;
}

.adj-row label {
  font-family: 'Cinzel', serif;
  font-size: 0.46rem;
  letter-spacing: 0.1em;
  color: var(--text-2);
  opacity: 0.6;
}

.adj-row input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  background: var(--border);
  outline: none;
  cursor: pointer;
}

.adj-row input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: var(--gold);
  border-radius: 50%;
  cursor: pointer;
}

.adj-val {
  font-family: 'Cinzel', serif;
  font-size: 0.44rem;
  color: var(--text-2);
  text-align: right;
  opacity: 0.6;
  min-width: 36px;
}

/* ── NO BOTTLE PLACEHOLDER ── */
.bottle-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 320px;
  height: 600px;
  border: 1px dashed rgba(200,168,72,0.2);
  text-align: center;
  padding: 40px;
}

.bottle-placeholder p {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1rem;
  color: var(--text-2);
  line-height: 1.7;
}

.bottle-placeholder small {
  font-family: 'Cinzel', serif;
  font-size: 0.5rem;
  letter-spacing: 0.18em;
  color: var(--text-2);
  opacity: 0.5;
}

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .preview-layout { grid-template-columns: 1fr; }
  .editor-panel { border-left: none; border-top: 1px solid var(--border); }
  .bottle-stage { padding: 40px 24px; }
}
</style>
</head>
<body>

<nav>
  <a href="/" class="nav-logo">emptywine</a>
  <a href="/#contact" class="nav-back">← Commission a Label</a>
</nav>

<div class="preview-layout">

  <!-- LEFT: Bottle + label overlay -->
  <div class="bottle-stage">
    <div class="bottle-wrap" id="bottle-wrap">

      <!-- Shown when no bottle image is uploaded yet -->
      <div class="bottle-placeholder" id="bottle-placeholder">
        <p>Bottle mockup will appear here once uploaded.</p>
        <small>UPLOAD BOTTLE.PNG TO ASSETS</small>
      </div>

      <!-- Shown once bottle.png exists in R2 -->
      <img
        class="bottle-img"
        id="bottle-img"
        alt="Wine bottle mockup"
        style="display:none"
      />

      <!-- Label overlay — sits on top of the bottle photo -->
      <div class="label-overlay" id="label-overlay">
        <div class="label-paper">
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
      <h1 class="editor-title">Design<br>Your Label</h1>
    </div>

    <div class="editor-body">

      <div class="field">
        <label for="f-brand">Brand / Company Name</label>
        <input id="f-brand" type="text" placeholder="e.g. Meridian Capital" />
      </div>

      <div class="field">
        <label for="f-collection">Collection Name</label>
        <input id="f-collection" type="text" placeholder="e.g. The Heritage Reserve" />
      </div>

      <div class="field">
        <label for="f-varietal">Wine / Varietal</label>
        <input id="f-varietal" type="text" placeholder="e.g. Burgundy · Pinot Noir" />
      </div>

      <div class="field">
        <label for="f-vintage">Vintage Year</label>
        <input id="f-vintage" type="text" placeholder="e.g. 2025" maxlength="4" />
      </div>

      <div class="field">
        <label>Label Style</label>
        <div class="style-chips" id="style-chips">
          <span class="style-chip active" data-style="cream">Cream Classic</span>
          <span class="style-chip" data-style="noir">Noir Prestige</span>
          <span class="style-chip" data-style="blanc">Blanc Épuré</span>
        </div>
      </div>

    </div>

    <div class="adjuster" id="adjuster">
      <div class="adjuster-title">LABEL POSITION ADJUSTMENT</div>
      <div class="adj-row">
        <label>Top</label>
        <input type="range" id="adj-top" min="20" max="80" value="44" />
        <span class="adj-val" id="adj-top-val">44%</span>
      </div>
      <div class="adj-row">
        <label>Left</label>
        <input type="range" id="adj-left" min="0" max="50" value="14" />
        <span class="adj-val" id="adj-left-val">14%</span>
      </div>
      <div class="adj-row">
        <label>Width</label>
        <input type="range" id="adj-width" min="20" max="90" value="72" />
        <span class="adj-val" id="adj-width-val">72%</span>
      </div>
      <div class="adj-row">
        <label>Height</label>
        <input type="range" id="adj-height" min="10" max="60" value="30" />
        <span class="adj-val" id="adj-height-val">30%</span>
      </div>
      <div class="adj-row">
        <label>Rotate</label>
        <input type="range" id="adj-rotate" min="-15" max="15" value="0" />
        <span class="adj-val" id="adj-rotate-val">0°</span>
      </div>
    </div>

    <div class="editor-footer">
      <button class="btn-preview" id="btn-preview">Update Preview</button>
      <a href="/#contact" class="btn-order">Place an Order →</a>
      <p class="preview-note">Preview updates live as you type.<br>Happy with it? Place an order below.</p>
    </div>

  </div>
</div>

<script>
(function() {
  'use strict';

  var STYLES = {
    cream: {
      paper: 'linear-gradient(168deg, #faf6ec 0%, #f2e8d5 45%, #e6d8c2 100%)',
      brand: '#18110a',
      text: 'rgba(60,40,10,0.62)',
      rule: 'rgba(130,90,18,0.5)'
    },
    noir: {
      paper: 'linear-gradient(168deg, #100e0c 0%, #1e1a14 100%)',
      brand: '#c8a848',
      text: 'rgba(200,168,72,0.62)',
      rule: 'rgba(200,168,72,0.35)'
    },
    blanc: {
      paper: '#faf9f7',
      brand: '#18100e',
      text: 'rgba(24,16,14,0.45)',
      rule: 'rgba(24,16,14,0.18)'
    }
  };

  var currentStyle = 'cream';

  // Try loading the bottle image
  var img = document.getElementById('bottle-img');
  var placeholder = document.getElementById('bottle-placeholder');
  img.addEventListener('load', function() {
    img.classList.add('loaded');
    img.style.display = 'block';
    placeholder.style.display = 'none';
  });
  img.addEventListener('error', function() {
    // Bottle not uploaded yet — keep placeholder visible
  });
  img.src = '/assets/bottle.png';

  // Live label updates
  function toRoman(year) {
    if (!year || year.length !== 4) return year || 'MMXXV';
    var n = parseInt(year, 10);
    if (isNaN(n)) return year;
    var vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    var syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    var result = '';
    for (var i = 0; i < vals.length; i++) {
      while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
    }
    return result;
  }

  function applyStyle(s) {
    var cfg = STYLES[s] || STYLES.cream;
    var paper = document.querySelector('.label-paper');
    var brand = document.getElementById('lbl-brand');
    var texts = document.querySelectorAll('.lbl-appellation, .lbl-class, .lbl-varietal, .lbl-vintage');
    var rule  = document.querySelector('.lbl-rule');
    paper.style.background = cfg.paper;
    brand.style.color = cfg.brand;
    texts.forEach(function(el) { el.style.color = cfg.text; });
    rule.style.background = 'linear-gradient(to right, transparent, ' + cfg.rule + ', transparent)';
  }

  function updateLabel() {
    var brand    = document.getElementById('f-brand').value.trim();
    var collect  = document.getElementById('f-collection').value.trim();
    var varietal = document.getElementById('f-varietal').value.trim();
    var vintage  = document.getElementById('f-vintage').value.trim();

    document.getElementById('lbl-brand').textContent   = brand || 'emptywine';
    document.getElementById('lbl-appellation').textContent = collect || 'Appellation Contrôlée';
    document.getElementById('lbl-varietal').textContent = varietal || 'Burgundy · Pinot Noir';
    document.getElementById('lbl-vintage').textContent  = toRoman(vintage) || 'MMXXV';
  }

  ['f-brand','f-collection','f-varietal','f-vintage'].forEach(function(id) {
    document.getElementById(id).addEventListener('input', updateLabel);
  });

  document.querySelectorAll('.style-chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      document.querySelectorAll('.style-chip').forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
      currentStyle = chip.getAttribute('data-style');
      applyStyle(currentStyle);
    });
  });

  document.getElementById('btn-preview').addEventListener('click', updateLabel);

  // Label position sliders
  var root = document.documentElement;
  var sliders = [
    { id: 'adj-top',    val: 'adj-top-val',    prop: '--lbl-top',    unit: '%' },
    { id: 'adj-left',   val: 'adj-left-val',   prop: '--lbl-left',   unit: '%' },
    { id: 'adj-width',  val: 'adj-width-val',  prop: '--lbl-width',  unit: '%' },
    { id: 'adj-height', val: 'adj-height-val', prop: '--lbl-height', unit: '%' },
    { id: 'adj-rotate', val: 'adj-rotate-val', prop: '--lbl-rotate', unit: 'deg' }
  ];

  sliders.forEach(function(s) {
    var input = document.getElementById(s.id);
    var display = document.getElementById(s.val);
    input.addEventListener('input', function() {
      var v = input.value + s.unit;
      root.style.setProperty(s.prop, v);
      display.textContent = v;
    });
  });

})();
</script>
</body>
</html>`;
