/**
 * Logo e icone PROVVISORI dello Studio Tecnico De Falco (il cliente non ha un logo):
 * segno a squadra + nome tipografico. Da sostituire con un logo vero se esiste.
 *   node scripts/brand.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const PUB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const out = (rel, data) => { const f = path.join(PUB, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); console.log('scritto', rel); };
const ACC = '#a51d24';

// ── Logo 882x182 (stesse misure dello slot) ──
const segno = (col, fondo) => `<g transform="translate(6 6)"><rect width="170" height="170" fill="${fondo}" stroke="${col}" stroke-width="6"/><path d="M30 30v110h110z" fill="none" stroke="${col}" stroke-width="7" stroke-linejoin="miter"/><path d="M52 88v30h30z" fill="none" stroke="${col}" stroke-width="5"/></g>`;
const logo = (nome, sub, acc, fondo) => `<svg xmlns="http://www.w3.org/2000/svg" width="882" height="182" viewBox="0 0 882 182">
${segno(acc, fondo)}
<text x="214" y="98" font-family="Georgia, 'Times New Roman', serif" font-size="78" fill="${nome}" letter-spacing="2">De Falco</text>
<text x="218" y="150" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" fill="${sub}" letter-spacing="7">STUDIO TECNICO · GEOMETRA</text>
</svg>
`;
out('img/logo/logo.svg', logo('#1c1a19', ACC, ACC, 'none'));
out('img/logo/logo-light.svg', logo('#ffffff', '#f6d4d5', '#ffffff', 'none'));
out('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${ACC}"/><path d="M14 12v38h38z" fill="none" stroke="#fff" stroke-width="5"/><path d="M22 32v10h10z" fill="#fff"/></svg>
`);

// ── PNG: fondo accento, squadra bianca, griglia leggera (OG) ──
const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = (b) => { let c = 0xffffffff; for (const x of b) c = crcT[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
function png(w, h, griglia = false) {
  const bg = [0xa5, 0x1d, 0x24], gr = [0xb3, 0x33, 0x39], wh = [0xff, 0xff, 0xff];
  const S = Math.min(w, h), ox = (w - S) / 2 + S * 0.22, oy = S * 0.18, L = S * 0.62, t = Math.max(2, S * 0.045);
  const ix = ox + L * 0.2, iy = oy + L * 0.48, il = L * 0.32;
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0;
    for (let x = 0; x < w; x++) {
      // squadra: cateto verticale, cateto orizzontale, ipotenusa (x-ox) == (y-oy)
      const dx = x - ox, dy = y - oy;
      const inT = dx >= 0 && dy >= 0 && dy <= L && dx <= dy;
      const bordo = inT && (dx < t || dy > L - t || dy - dx < t * 1.4);
      const ex = x - ix, ey = y - iy;
      const piccolo = ex >= 0 && ey >= 0 && ey <= il && ex <= ey;
      const grid = griglia && (x % 40 === 0 || y % 40 === 0);
      const col = bordo || piccolo ? wh : grid ? gr : bg;
      const o = y * (w * 3 + 1) + 1 + x * 3;
      raw[o] = col[0]; raw[o + 1] = col[1]; raw[o + 2] = col[2];
    }
  }
  const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ih), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}
const ico = (p, n) => { const h = Buffer.alloc(22); h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4); h[6] = n; h[7] = n; h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12); h.writeUInt32LE(p.length, 14); h.writeUInt32LE(22, 18); return Buffer.concat([h, p]); };
out('favicon.ico', ico(png(32, 32), 32));
out('apple-touch-icon.png', png(180, 180));
out('icon-192.png', png(192, 192));
out('icon-512.png', png(512, 512));
out('img/og/og-default.png', png(1200, 630, true));
