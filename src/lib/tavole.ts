/**
 * Tavole tecniche illustrative generate (SVG) al posto delle foto che il cliente non ha.
 * Ogni tavola ha le misure dello slot originale; stile 'scuro' (antracite, per le
 * immagini a tutto campo) o 'carta' (fondo chiaro, per i "disegni" non ritagliati).
 * Servite da src/pages/img/tavole/[id].svg.ts. Per sostituirle con foto vere basta
 * cambiare l'oggetto immagine nei file dati.
 */
import type { Img } from './media';

export type Tipo = 'pianta' | 'prospetto' | 'sezione' | 'catasto' | 'rilievo' | 'cantiere' | 'ritratto';
export type Stile = 'scuro' | 'carta';

type Spec = { w: number; h: number; tipo: Tipo; stile: Stile; seme: number };
export const tavole = new Map<string, Spec>();

export function tav(id: string, w: number, h: number, tipo: Tipo, stile: Stile, alt: string, o: { drawing?: boolean; seme?: number } = {}): Img {
  tavole.set(id, { w, h, tipo, stile, seme: o.seme ?? id.length * 17 });
  return { src: `/img/tavole/${id}.svg`, width: w, height: h, alt, drawing: o.drawing };
}

// ── utilità ──
function rng(seed: number) {
  let a = seed >>> 0 || 1;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const f = (n: number) => Math.round(n * 10) / 10;
const COL = {
  scuro: { bg: '#211e1d', grid: 'rgba(255,255,255,0.05)', ln: '#ece8e4', acc: '#f19a9c', txt: '#d8d2cc', fill: 'rgba(241,154,156,0.10)' },
  carta: { bg: '#fbfaf7', grid: 'rgba(165,29,36,0.06)', ln: '#1c1a19', acc: '#a51d24', txt: '#3a3735', fill: 'rgba(165,29,36,0.06)' },
};

export function disegna(spec: Spec): string {
  const { w, h, tipo, stile } = spec;
  const r = rng(spec.seme * 7919 + w * 3 + h);
  const c = COL[stile];
  const s = Math.min(w, h) / 100; // unità
  const out: string[] = [];
  const line = (x1: number, y1: number, x2: number, y2: number, sw = 0.25, col = c.ln, extra = '') =>
    out.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col}" stroke-width="${f(sw * s)}"${extra}/>`);
  const rect = (x: number, y: number, rw: number, rh: number, sw = 0.25, col = c.ln, fill = 'none', extra = '') =>
    out.push(`<rect x="${f(x)}" y="${f(y)}" width="${f(rw)}" height="${f(rh)}" fill="${fill}" stroke="${col}" stroke-width="${f(sw * s)}"${extra}/>`);
  const text = (x: number, y: number, t: string, size = 2.2, col = c.txt, anchor = 'middle', extra = '') =>
    out.push(`<text x="${f(x)}" y="${f(y)}" font-size="${f(size * s)}" fill="${col}" text-anchor="${anchor}" font-family="Inter, Arial, sans-serif" letter-spacing="${f(size * s * 0.08)}"${extra}>${t}</text>`);
  const path = (d: string, sw = 0.25, col = c.ln, extra = '') =>
    out.push(`<path d="${d}"${extra.includes(' fill=') ? '' : ' fill="none"'} stroke="${col}" stroke-width="${f(sw * s)}"${extra}/>`);
  const dash = ` stroke-dasharray="${f(1.4 * s)} ${f(0.9 * s)}"`;

  // fondo + griglia
  out.push(`<rect width="${w}" height="${h}" fill="${c.bg}"/>`);
  const g = 5 * s;
  for (let x = g; x < w; x += g) line(x, 0, x, h, 0.08, c.grid);
  for (let y = g; y < h; y += g) line(0, y, w, y, 0.08, c.grid);
  // cornice
  const m = 4 * s;
  rect(m, m, w - 2 * m, h - 2 * m, 0.35, c.acc);
  // area utile
  const X = m * 2.6, Y = m * 2.6, W = w - X * 2, H = h - Y * 2;

  const quota = (x1: number, y: number, x2: number, val: string) => {
    line(x1, y, x2, y, 0.15, c.acc);
    line(x1, y - s, x1 + 0, y + s, 0.15, c.acc); line(x2, y - s, x2, y + s, 0.15, c.acc);
    line(x1 - 0.7 * s, y + 0.7 * s, x1 + 0.7 * s, y - 0.7 * s, 0.2, c.acc); line(x2 - 0.7 * s, y + 0.7 * s, x2 + 0.7 * s, y - 0.7 * s, 0.2, c.acc);
    text((x1 + x2) / 2, y - 0.9 * s, val, 1.7, c.acc);
  };
  const nord = (cx: number, cy: number) => {
    out.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(3 * s)}" fill="none" stroke="${c.acc}" stroke-width="${f(0.2 * s)}"/>`);
    path(`M${f(cx)} ${f(cy - 2.6 * s)}L${f(cx + 1.2 * s)} ${f(cy + 1.6 * s)}L${f(cx)} ${f(cy + 0.6 * s)}L${f(cx - 1.2 * s)} ${f(cy + 1.6 * s)}Z`, 0.2, c.acc, ` fill="${c.acc}"`);
    text(cx, cy - 3.8 * s, 'N', 1.8, c.acc);
  };

  if (tipo === 'pianta') {
    const bw = W * (0.7 + r() * 0.2), bh = H * (0.62 + r() * 0.2);
    const bx = X + (W - bw) / 2, by = Y + (H - bh) / 2 + 2 * s;
    // stanze per divisioni ricorsive
    const rooms: [number, number, number, number][] = [];
    const split = (x: number, y: number, rw: number, rh: number, d: number) => {
      if (d > 2 || rw * rh < (bw * bh) / 7) { rooms.push([x, y, rw, rh]); return; }
      if (rw > rh) { const k = rw * (0.35 + r() * 0.3); split(x, y, k, rh, d + 1); split(x + k, y, rw - k, rh, d + 1); }
      else { const k = rh * (0.35 + r() * 0.3); split(x, y, rw, k, d + 1); split(x, y + k, rw, rh - k, d + 1); }
    };
    split(bx, by, bw, bh, 0);
    const nomi = ['SOGGIORNO', 'CUCINA', 'CAMERA', 'BAGNO', 'STUDIO', 'DISIMP.', 'CAMERA', 'RIPOST.', 'LAVANDERIA'];
    rooms.forEach(([x, y, rw, rh], i) => {
      rect(x, y, rw, rh, 0.45, c.ln, i % 3 === 0 ? c.fill : 'none');
      // porta con arco
      const dw = Math.min(rw, rh) * 0.22;
      const px = x + rw * 0.2, py = y + rh;
      if (py < by + bh - 1) {
        line(px, py, px + dw, py, 0.9, c.bg);
        path(`M${f(px)} ${f(py)}A${f(dw)} ${f(dw)} 0 0 0 ${f(px + dw)} ${f(py - dw)}`, 0.15, c.acc);
        line(px, py, px, py - dw, 0.2, c.acc);
      }
      text(x + rw / 2, y + rh / 2, nomi[i % nomi.length], Math.max(1.4, Math.min(2.4, rw / s / 9)));
      text(x + rw / 2, y + rh / 2 + 2.6 * s, `${(rw * rh / (s * s) / 9).toFixed(1).replace('.', ',')} m²`, 1.4, c.acc);
    });
    rect(bx, by, bw, bh, 1.1);
    // finestre
    for (let i = 0; i < 4; i++) {
      const wx = bx + bw * (0.12 + i * 0.22);
      line(wx, by, wx + bw * 0.08, by, 1.3, c.bg); line(wx, by - 0.3 * s, wx + bw * 0.08, by - 0.3 * s, 0.15); line(wx, by + 0.3 * s, wx + bw * 0.08, by + 0.3 * s, 0.15);
    }
    quota(bx, by - 4 * s, bx + bw, `${(bw / s / 9).toFixed(2).replace('.', ',')}`);
    nord(X + W - 3 * s, Y + 3 * s);
  } else if (tipo === 'prospetto' || tipo === 'sezione') {
    const gy = Y + H * 0.84;
    const bw = W * (0.6 + r() * 0.25), bx = X + (W - bw) / 2;
    const piani = 2 + Math.floor(r() * 2);
    const ph = (H * 0.62) / piani;
    const top = gy - ph * piani;
    // terreno
    line(X, gy, X + W, gy, 0.6);
    for (let x = X; x < X + W; x += 2 * s) line(x, gy + 0.2 * s, x - 1.6 * s, gy + 2.2 * s, 0.12, c.acc);
    // tetto
    const falde = r() > 0.3;
    if (falde) path(`M${f(bx - 2 * s)} ${f(top)}L${f(bx + bw / 2)} ${f(top - ph * 0.55)}L${f(bx + bw + 2 * s)} ${f(top)}Z`, 0.5, c.ln, ` fill="${c.fill}"`);
    else rect(bx - 0.5 * s, top - 1.6 * s, bw + s, 1.6 * s, 0.4);
    rect(bx, top, bw, ph * piani, 0.6);
    for (let p = 0; p < piani; p++) {
      const y0 = top + p * ph;
      if (tipo === 'sezione') rect(bx, y0 + ph - 0.9 * s, bw, 0.9 * s, 0.25, c.ln, c.acc);
      else if (p > 0) line(bx, y0, bx + bw, y0, 0.12, c.acc, dash);
      const n = Math.max(2, Math.round(bw / (ph * 0.9)));
      for (let i = 0; i < n; i++) {
        const ww = (bw / n) * 0.42, wx = bx + (bw / n) * (i + 0.29), wy = y0 + ph * 0.22;
        if (tipo === 'prospetto') {
          const porta = p === piani - 1 && i === Math.floor(n / 2);
          rect(wx, porta ? y0 + ph * 0.18 : wy, ww, porta ? ph * 0.82 : ph * 0.5, 0.3);
          if (!porta) { line(wx + ww / 2, wy, wx + ww / 2, wy + ph * 0.5, 0.15); line(wx - 0.6 * s, wy + ph * 0.5 + 0.4 * s, wx + ww + 0.6 * s, wy + ph * 0.5 + 0.4 * s, 0.35); }
        } else if (i === 0 && p < piani - 1) {
          // scala
          let d = `M${f(wx)} ${f(y0 + ph)}`;
          for (let k = 0; k < 8; k++) d += `h${f(ww * 0.25)}v${f(-ph / 8)}`;
          path(d, 0.25, c.acc);
        }
      }
      text(bx + bw + 4 * s, y0 + ph - 0.6 * s, `+${(((piani - 1 - p) * 3)).toFixed(2).replace('.', ',')}`, 1.5, c.acc, 'start');
      line(bx + bw + 1.5 * s, y0 + ph, bx + bw + 3.5 * s, y0 + ph, 0.15, c.acc);
    }
    if (tipo === 'sezione') {
      rect(bx - 1.5 * s, gy, bw + 3 * s, 3 * s, 0.3, c.ln, c.fill);
      text(bx + bw / 2, gy + 6 * s, 'SEZIONE A-A', 1.8, c.acc);
    } else text(bx + bw / 2, gy + 6 * s, 'PROSPETTO', 1.8, c.acc);
    quota(bx, gy + 9 * s, bx + bw, `${(bw / s / 7).toFixed(2).replace('.', ',')}`);
  } else if (tipo === 'catasto') {
    const cols = 3 + Math.floor(r() * 3), rows = 2 + Math.floor((r() * 3 * H) / W + 1);
    const pts: [number, number][][] = [];
    for (let j = 0; j <= rows; j++) {
      pts.push([]);
      for (let i = 0; i <= cols; i++) {
        const edge = i === 0 || j === 0 || i === cols || j === rows;
        pts[j].push([X + (W * i) / cols + (edge ? 0 : (r() - 0.5) * (W / cols) * 0.5), Y + (H * j) / rows + (edge ? 0 : (r() - 0.5) * (H / rows) * 0.5)]);
      }
    }
    let num = 100 + Math.floor(r() * 700);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const q = [pts[j][i], pts[j][i + 1], pts[j + 1][i + 1], pts[j + 1][i]];
      const sel = r() > 0.82;
      path(`M${q.map((p) => `${f(p[0])} ${f(p[1])}`).join('L')}Z`, sel ? 0.6 : 0.25, sel ? c.acc : c.ln, sel ? ` fill="${c.fill}"` : '');
      const cx = (q[0][0] + q[1][0] + q[2][0] + q[3][0]) / 4, cy = (q[0][1] + q[1][1] + q[2][1] + q[3][1]) / 4;
      text(cx, cy, String(num), 2, sel ? c.acc : c.txt);
      num += 1 + Math.floor(r() * 9);
      if (r() > 0.6) rect(cx - 2.5 * s, cy + 1.6 * s, 5 * s, 3 * s, 0.2, c.ln, c.fill);
    }
    // strada
    const sy = Y + H * (0.3 + r() * 0.4);
    path(`M${f(X)} ${f(sy)}C${f(X + W * 0.3)} ${f(sy - 6 * s)} ${f(X + W * 0.6)} ${f(sy + 6 * s)} ${f(X + W)} ${f(sy)}`, 0.5);
    path(`M${f(X)} ${f(sy + 3 * s)}C${f(X + W * 0.3)} ${f(sy - 3 * s)} ${f(X + W * 0.6)} ${f(sy + 9 * s)} ${f(X + W)} ${f(sy + 3 * s)}`, 0.5);
    text(X + W * 0.5, sy + 2.2 * s, 'STRADA COMUNALE', 1.5, c.acc);
    text(X + 1.5 * s, Y + 3.5 * s, `FOGLIO ${10 + Math.floor(r() * 30)}`, 2, c.acc, 'start');
    nord(X + W - 4 * s, Y + 5 * s);
  } else if (tipo === 'rilievo') {
    const cx = X + W * (0.3 + r() * 0.4), cy = Y + H * (0.3 + r() * 0.4);
    for (let k = 1; k <= 9; k++) {
      let d = '';
      for (let a = 0; a <= 64; a++) {
        const t = (a / 64) * Math.PI * 2;
        const rad = k * Math.min(W, H) * 0.06 * (1 + 0.18 * Math.sin(t * 3 + k) + 0.1 * Math.cos(t * 5 - k * 0.7));
        d += `${a ? 'L' : 'M'}${f(cx + Math.cos(t) * rad * (W / Math.min(W, H)) * 0.8)} ${f(cy + Math.sin(t) * rad)}`;
      }
      path(d + 'Z', k % 5 === 0 ? 0.35 : 0.18, k % 5 === 0 ? c.ln : c.acc);
    }
    const st: [number, number][] = [];
    for (let i = 0; i < 4; i++) st.push([X + W * (0.12 + r() * 0.76), Y + H * (0.12 + r() * 0.76)]);
    path(`M${st.map((p) => `${f(p[0])} ${f(p[1])}`).join('L')}Z`, 0.25, c.ln, dash);
    st.forEach(([x, y], i) => {
      path(`M${f(x)} ${f(y - 1.6 * s)}L${f(x + 1.4 * s)} ${f(y + 0.9 * s)}L${f(x - 1.4 * s)} ${f(y + 0.9 * s)}Z`, 0.3, c.acc, ` fill="${c.fill}"`);
      text(x, y - 2.6 * s, `S${i + 1}`, 1.7, c.acc);
    });
    for (let i = 0; i < 18; i++) {
      const x = X + W * r(), y = Y + H * r();
      line(x - 0.8 * s, y, x + 0.8 * s, y, 0.18); line(x, y - 0.8 * s, x, y + 0.8 * s, 0.18);
      text(x + 1.2 * s, y - 0.6 * s, (98 + r() * 6).toFixed(2).replace('.', ','), 1.3, c.txt, 'start');
    }
  } else if (tipo === 'cantiere') {
    const gy = Y + H * 0.86;
    line(X, gy, X + W, gy, 0.6);
    const bw = W * 0.45, bx = X + W * 0.42, bh = H * 0.42;
    rect(bx, gy - bh, bw, bh, 0.5, c.ln, c.fill);
    // ponteggio
    for (let x = bx - 2 * s; x <= bx + bw + 2 * s; x += bw / 6) line(x, gy, x, gy - bh - 3 * s, 0.15, c.acc);
    for (let y = gy; y >= gy - bh - 3 * s; y -= bh / 5) line(bx - 2 * s, y, bx + bw + 2 * s, y, 0.15, c.acc);
    // gru
    const mx = X + W * 0.22, mt = Y + H * 0.12;
    rect(mx - 1.2 * s, mt, 2.4 * s, gy - mt, 0.3);
    for (let y = gy; y > mt; y -= 2.4 * s) line(mx - 1.2 * s, y, mx + 1.2 * s, y - 2.4 * s, 0.15);
    line(mx - W * 0.12, mt, mx + W * 0.62, mt, 0.4); line(mx - W * 0.12, mt + 1.6 * s, mx + W * 0.62, mt + 1.6 * s, 0.25);
    for (let x = mx - W * 0.12; x < mx + W * 0.62; x += 2 * s) line(x, mt + 1.6 * s, x + s, mt, 0.12);
    line(mx, mt, mx, mt - 5 * s, 0.3); line(mx, mt - 5 * s, mx + W * 0.5, mt, 0.15); line(mx, mt - 5 * s, mx - W * 0.1, mt, 0.15);
    rect(mx - W * 0.12, mt + 1.6 * s, 4 * s, 3 * s, 0.3, c.ln, c.fill);
    const hx = mx + W * 0.4;
    line(hx, mt + 1.6 * s, hx, gy - bh - 6 * s, 0.15, c.acc, dash);
    // recinzione
    line(X + 1.5 * s, gy - 2.6 * s, X + W - 1.5 * s, gy - 2.6 * s, 0.2, c.acc, dash);
    text(X + W * 0.75, gy + 4 * s, 'AREA DI CANTIERE', 1.7, c.acc);
  } else if (tipo === 'ritratto') {
    // monogramma al posto del ritratto
    const cx = w / 2, cy = h * 0.45;
    out.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(W * 0.32)}" fill="none" stroke="${c.acc}" stroke-width="${f(0.35 * s)}"/>`);
    text(cx, cy + W * 0.08, 'GDF', 26, c.ln, 'middle', ' font-weight="300"');
    text(cx, h * 0.78, 'RITRATTO DA INSERIRE', 3, c.acc);
  }

  // cartiglio
  if (tipo !== 'ritratto' && w > 600) {
    const cw = Math.min(W * 0.42, 34 * s), ch = 7 * s, cx0 = w - m - cw, cy0 = h - m - ch;
    rect(cx0, cy0, cw, ch, 0.25, c.acc, c.bg);
    line(cx0, cy0 + ch * 0.55, cx0 + cw, cy0 + ch * 0.55, 0.15, c.acc);
    text(cx0 + 1.2 * s, cy0 + ch * 0.4, 'STUDIO TECNICO DE FALCO', 1.4, c.acc, 'start');
    text(cx0 + 1.2 * s, cy0 + ch * 0.85, `TAV. ${String(1 + (spec.seme % 9)).padStart(2, '0')} · TAVOLA ILLUSTRATIVA`, 1.1, c.txt, 'start');
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${out.join('')}</svg>`;
}
