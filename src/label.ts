// Shared label visual: the CSS + markup for the wine label itself, used by both
// the live builder overlay (src/preview.ts) and the static order-proof preview
// (order page). Keeping it here means the two can't drift. The builder keeps its
// own .label-overlay positioning and .label-paper::after cylinder-curvature CSS;
// this module is only the flat label surface (backgrounds, frames, typography).
import type { LabelConfig } from './labelpdf';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// The label surface CSS. Font-sizes use container-query units (cqh) against the
// nearest sized ancestor of .label-paper, so the same markup scales to any box.
// Per-field size is driven by --scale-* custom properties (default 1).
export function labelStyles(): string {
  return `
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
  font-size: calc(5.6cqh * var(--scale-appellation, 1));
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
  font-size: calc(17cqh * var(--scale-brand, 1));
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
  font-size: calc(5.2cqh * var(--scale-class, 1));
  line-height: 1.1;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(60,40,10,0.6);
  margin-bottom: 3.5cqh;
}
.lbl-varietal {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: calc(8.5cqh * var(--scale-varietal, 1));
  line-height: 1.05;
  color: rgba(60,40,10,0.46);
  margin-bottom: 4cqh;
}
.lbl-vintage {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: calc(5.6cqh * var(--scale-vintage, 1));
  line-height: 1;
  letter-spacing: 0.22em;
  color: rgba(80,55,14,0.62);
}
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
.label-paper.style-blanc .label-frame-inner { border-color: rgba(27,21,18,0.09); }`;
}

// Builds the .label-paper markup.
//  - ids:true  → adds the ids the builder's JS drives (lbl-brand, label-paper, …)
//  - inlineScales:true → bakes --scale-* onto the element (for static renders,
//    where there is no :root default / slider JS). The builder passes false so
//    its :root vars + sliders stay in control.
export function labelMarkup(cfg: LabelConfig, opts: { ids?: boolean; inlineScales?: boolean } = {}): string {
  const cls = 'label-paper' + (cfg.style !== 'cream' ? ' style-' + cfg.style : '');
  const paperId = opts.ids ? ' id="label-paper"' : '';
  const sc = cfg.scales;
  const styleAttr = opts.inlineScales
    ? ` style="--scale-appellation:${sc.appellation};--scale-brand:${sc.brand};--scale-class:${sc.class};--scale-varietal:${sc.varietal};--scale-vintage:${sc.vintage}"`
    : '';
  const id = (name: string) => (opts.ids ? ` id="${name}"` : '');
  return `<div class="${cls}"${paperId}${styleAttr}>
  <div class="label-frame-outer"></div>
  <div class="label-frame-inner"></div>
  <div class="label-content">
    <span class="lbl-appellation"${id('lbl-appellation')}>${esc(cfg.appellation)}</span>
    <em class="lbl-brand"${id('lbl-brand')}>${esc(cfg.brand)}</em>
    <div class="lbl-rule"></div>
    <span class="lbl-class"${id('lbl-class')}>${esc(cfg.klass)}</span>
    <span class="lbl-varietal"${id('lbl-varietal')}>${esc(cfg.varietal)}</span>
    <span class="lbl-vintage"${id('lbl-vintage')}>${esc(cfg.vintage)}</span>
  </div>
</div>`;
}

// Default builder label state (matches the pre-existing hardcoded defaults).
export function defaultLabelConfig(lang: 'en' | 'fr'): LabelConfig {
  return {
    appellation: 'Appellation Contrôlée', brand: 'emptywine', klass: 'Grand Réserve',
    varietal: lang === 'fr' ? 'Bourgogne · Pinot Noir' : 'Burgundy · Pinot Noir', vintage: 'MMXXV',
    style: 'cream', lang, scales: { appellation: 1, brand: 1, class: 1, varietal: 1, vintage: 1 },
  };
}
