// Server-side production label PDF: vector geometry, CMYK colour, embedded
// brand fonts, exact 100×120 mm trim + 2.5 mm bleed, crop marks, TrimBox/BleedBox.
// Built with pdf-lib (+ fontkit) so font embedding and CMYK are reliable.
// Colour is an approximate RGB→CMYK map (not an ICC transform); the printer's
// prepress applies the final colour-managed conversion.
import { PDFDocument, cmyk, PDFFont, PDFPage, PDFName, PDFArray, PDFNumber } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { manrope600, manrope700, cormorant400i, cormorant500i } from './fonts';

export interface LabelConfig {
  appellation: string; brand: string; klass: string; varietal: string; vintage: string;
  style: 'cream' | 'noir' | 'blanc';
  scales: { appellation: number; brand: number; class: number; varietal: number; vintage: number };
  lang: 'en' | 'fr';
}

const MM = 72 / 25.4; // pt per mm

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const a = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
  return a;
}

// parse "#rrggbb" or "rgba(r,g,b,a)" → {r,g,b,a} in 0..1
function parseColor(s: string): { r: number; g: number; b: number; a: number } {
  if (s[0] === '#') {
    return { r: parseInt(s.slice(1, 3), 16) / 255, g: parseInt(s.slice(3, 5), 16) / 255, b: parseInt(s.slice(5, 7), 16) / 255, a: 1 };
  }
  const m = s.match(/rgba?\(([^)]+)\)/)!;
  const p = m[1].split(',').map((x) => parseFloat(x.trim()));
  return { r: p[0] / 255, g: p[1] / 255, b: p[2] / 255, a: p[3] === undefined ? 1 : p[3] };
}

// flatten a possibly-translucent colour over an opaque background, then → CMYK
function toCmyk(fg: string, bg: { r: number; g: number; b: number }) {
  const f = parseColor(fg);
  const r = f.r * f.a + bg.r * (1 - f.a);
  const g = f.g * f.a + bg.g * (1 - f.a);
  const b = f.b * f.a + bg.b * (1 - f.a);
  const k = 1 - Math.max(r, g, b);
  if (k >= 0.9999) return cmyk(0, 0, 0, 1);
  return cmyk((1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k);
}

// style palettes mirror the on-screen PALETTES; bg is a solid representative tone
const STYLES = {
  cream: { bg: '#f2e8d5', brand: '#18110a', app: 'rgba(60,40,10,0.5)', cls: 'rgba(60,40,10,0.6)', varr: 'rgba(60,40,10,0.46)', vin: 'rgba(80,55,14,0.62)', rule: 'rgba(130,90,18,0.5)', frameO: 'rgba(150,110,25,0.42)', frameI: 'rgba(150,110,25,0.16)' },
  noir:  { bg: '#17140f', brand: '#d8b25f', app: 'rgba(216,178,95,0.7)', cls: 'rgba(216,178,95,0.7)', varr: 'rgba(216,178,95,0.7)', vin: 'rgba(216,178,95,0.7)', rule: 'rgba(216,178,95,0.4)', frameO: 'rgba(216,178,95,0.35)', frameI: 'rgba(216,178,95,0.15)' },
  blanc: { bg: '#faf9f7', brand: '#1b1512', app: 'rgba(27,21,18,0.5)', cls: 'rgba(27,21,18,0.5)', varr: 'rgba(27,21,18,0.5)', vin: 'rgba(27,21,18,0.5)', rule: 'rgba(27,21,18,0.22)', frameO: 'rgba(27,21,18,0.2)', frameI: 'rgba(27,21,18,0.09)' },
};

export async function renderLabelPdf(cfg: LabelConfig): Promise<Uint8Array> {
  const st = STYLES[cfg.style] || STYLES.cream;
  const bg = parseColor(st.bg);
  const col = (c: string) => toCmyk(c, bg);

  // geometry (pt)
  const trimW = 100 * MM, trimH = 120 * MM;
  const bleed = 2.5 * MM, safe = 2 * MM, margin = 12 * MM, capH = 9 * MM;
  const pageW = trimW + 2 * bleed + 2 * margin;
  const pageH = trimH + 2 * bleed + 2 * margin + capH;
  // box origins in pdf-lib coords (y up from bottom). caption sits below the label.
  const bleedX = margin, bleedY = margin + capH;
  const trimX = bleedX + bleed, trimY = bleedY + bleed;

  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  // full embed (not subset) — subsetting can drop accents/symbols in arbitrary
  // user input (é, ·, …); full fonts guarantee every glyph is present
  const mReg = await doc.embedFont(b64ToBytes(manrope600));
  const mBold = await doc.embedFont(b64ToBytes(manrope700));
  const cItal = await doc.embedFont(b64ToBytes(cormorant400i));
  const cMed = await doc.embedFont(b64ToBytes(cormorant500i));
  const page = doc.addPage([pageW, pageH]);

  // ── label background fills the whole bleed box (extends past trim) ──
  page.drawRectangle({ x: bleedX, y: bleedY, width: trimW + 2 * bleed, height: trimH + 2 * bleed, color: col(st.bg) });

  // ── decorative frames (relative to trim) ──
  const fO = col(st.frameO), fI = col(st.frameI);
  page.drawRectangle({ x: trimX + 0.07 * trimW, y: trimY + 0.07 * trimH, width: 0.86 * trimW, height: 0.86 * trimH, borderColor: fO, borderWidth: Math.max(0.6, trimH * 0.0016), color: undefined });
  page.drawRectangle({ x: trimX + 0.105 * trimW, y: trimY + 0.105 * trimH, width: 0.79 * trimW, height: 0.79 * trimH, borderColor: fI, borderWidth: Math.max(0.4, trimH * 0.0012), color: undefined });

  // ── content layout ──
  const LH = trimH;
  const padX = Math.max(0.09 * trimW, safe);
  const contentW = trimW - 2 * padX;
  const contentTop = trimY + trimH - Math.max(0.08 * trimW, safe); // y of top content edge (down-growing)
  const contentBottom = trimY + Math.max(0.08 * trimW, safe);
  const cx = trimX + trimW / 2;

  type El =
    | { rule: true; mb: number; h?: number }
    | { rule?: false; text: string; font: PDFFont; fs: number; lh: number; ls: number; color: ReturnType<typeof cmyk>; mb: number; lines?: string[]; h?: number };

  const els: El[] = [
    { text: cfg.appellation.toUpperCase(), font: mBold, fs: 0.056 * LH * cfg.scales.appellation, lh: 1.1, ls: 0.14, color: col(st.app), mb: 0.055 * LH },
    { text: cfg.brand, font: cMed, fs: 0.17 * LH * cfg.scales.brand, lh: 1.0, ls: 0, color: col(st.brand), mb: 0.04 * LH },
    { rule: true, mb: 0.04 * LH },
    { text: cfg.klass.toUpperCase(), font: mReg, fs: 0.052 * LH * cfg.scales.class, lh: 1.1, ls: 0.16, color: col(st.cls), mb: 0.035 * LH },
    { text: cfg.varietal, font: cItal, fs: 0.085 * LH * cfg.scales.varietal, lh: 1.05, ls: 0, color: col(st.varr), mb: 0.04 * LH },
    { text: cfg.vintage.toUpperCase(), font: mReg, fs: 0.056 * LH * cfg.scales.vintage, lh: 1.0, ls: 0.22, color: col(st.vin), mb: 0 },
  ];

  // width of a string including per-glyph letter-spacing
  const measure = (text: string, font: PDFFont, fs: number, lsPt: number) =>
    font.widthOfTextAtSize(text, fs) + Math.max(0, text.length - 1) * lsPt;

  // greedy word-wrap to contentW
  function wrap(text: string, font: PDFFont, fs: number, lsPt: number): string[] {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let line = '';
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (measure(test, font, fs, lsPt) > contentW && line) { lines.push(line); line = w; } else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }

  // measure heights
  let total = 0;
  for (const el of els) {
    if ('rule' in el && el.rule) { el.h = Math.max(1.2, LH * 0.003); }
    else if (!('rule' in el && el.rule)) {
      const e = el as Extract<El, { text: string }>;
      const lsPt = e.ls * e.fs;
      e.lines = wrap(e.text, e.font, e.fs, lsPt);
      e.h = e.lines.length * e.fs * e.lh;
    }
    total += (el.h || 0) + el.mb;
  }

  // vertical block start (centred within content area), drawing downward
  const contentH = contentTop - contentBottom;
  let y = contentTop - Math.max(0, (contentH - total) / 2); // baseline top, y decreases downward

  const drawCentered = (text: string, font: PDFFont, fs: number, lsPt: number, color: ReturnType<typeof cmyk>, yTop: number) => {
    const w = measure(text, font, fs, lsPt);
    const baseline = yTop - fs * 0.8; // approximate cap baseline from top
    if (lsPt === 0) {
      page.drawText(text, { x: cx - w / 2, y: baseline, size: fs, font, color });
    } else {
      let x = cx - w / 2;
      for (const ch of text) {
        page.drawText(ch, { x, y: baseline, size: fs, font, color });
        x += font.widthOfTextAtSize(ch, fs) + lsPt;
      }
    }
  };

  for (const el of els) {
    if ('rule' in el && el.rule) {
      const rw = contentW * 0.62;
      page.drawRectangle({ x: cx - rw / 2, y: y - (el.h || 1), width: rw, height: el.h || 1, color: col(st.rule) });
      y -= (el.h || 0) + el.mb;
    } else {
      const e = el as Extract<El, { text: string }>;
      const lsPt = e.ls * e.fs;
      let ly = y;
      for (const line of e.lines!) { drawCentered(line, e.font, e.fs, lsPt, e.color, ly); ly -= e.fs * e.lh; }
      y -= (e.h || 0) + e.mb;
    }
  }

  // ── crop marks at the four trim corners (in the margin, past the bleed) ──
  const markCol = cmyk(0, 0, 0, 1);
  const gap = 1.5 * MM, len = 5 * MM, tw = Math.max(0.4, 0.12 * MM);
  const xs = [trimX, trimX + trimW], ys = [trimY, trimY + trimH];
  const bxL = bleedX - gap, bxR = bleedX + trimW + 2 * bleed + gap;
  const byB = bleedY - gap, byT = bleedY + trimH + 2 * bleed + gap;
  for (const x of xs) {
    page.drawLine({ start: { x, y: byT }, end: { x, y: byT + len }, thickness: tw, color: markCol });
    page.drawLine({ start: { x, y: byB }, end: { x, y: byB - len }, thickness: tw, color: markCol });
  }
  for (const yy of ys) {
    page.drawLine({ start: { x: bxL, y: yy }, end: { x: bxL - len, y: yy }, thickness: tw, color: markCol });
    page.drawLine({ start: { x: bxR, y: yy }, end: { x: bxR + len, y: yy }, thickness: tw, color: markCol });
  }

  // ── spec caption in the bottom margin ──
  const capCol = cmyk(0, 0.05, 0.1, 0.6);
  const capY = margin + (capH - 3.4 * MM) / 2;
  const left = 'emptywine · ' + (cfg.lang === 'fr' ? 'ÉPREUVE' : 'DESIGN PROOF');
  const right = cfg.lang === 'fr'
    ? '100 × 120 mm · fond perdu 2,5 mm · vectoriel · CMJN approx.'
    : '100 × 120 mm · bleed 2.5 mm · vector · approx. CMYK';
  page.drawText(left, { x: margin, y: capY, size: 2.3 * MM, font: mBold, color: capCol });
  const rFs = 1.95 * MM;
  const rw = mReg.widthOfTextAtSize(right, rFs);
  page.drawText(right, { x: pageW - margin - rw, y: capY + 0.15 * MM, size: rFs, font: mReg, color: capCol });

  // ── PDF/X geometry: TrimBox + BleedBox on the page ──
  const box = (x: number, y: number, w: number, h: number) =>
    doc.context.obj([PDFNumber.of(x), PDFNumber.of(y), PDFNumber.of(x + w), PDFNumber.of(y + h)]) as PDFArray;
  page.node.set(PDFName.of('TrimBox'), box(trimX, trimY, trimW, trimH));
  page.node.set(PDFName.of('BleedBox'), box(bleedX, bleedY, trimW + 2 * bleed, trimH + 2 * bleed));

  return await doc.save();
}
