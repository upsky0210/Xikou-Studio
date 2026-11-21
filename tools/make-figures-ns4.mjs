// 產生四上自然（ns4）單元四「好玩的電路」題目用的電路圖（SVG）：node tools/make-figures-ns4.mjs
// 輸出到 data/fig/，檔名 ns4-<關卡>-<代號>.svg。圖用 <img> 顯示，吃不到網頁字型，所以用系統字型。
// 燈泡一律畫成「沒亮」的樣子，不在圖上洩漏答案。
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = new URL('../data/fig/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const INK = '#2b2b2b', WIRE = '#d6452f', WIRE2 = '#2f6fd0', GLASS = '#eef5fb', METAL = '#b8b8b8', BAT = '#f2c14e', BAT2 = '#5b5b5b';
const FONT = "PingFang TC, 'Microsoft JhengHei', 'Noto Sans TC', sans-serif";
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="${FONT}" font-size="16" font-weight="700">
<rect width="${w}" height="${h}" fill="#fff"/>
${body}
</svg>
`;
const text = (x, y, s, size = 16, fill = INK, anchor = 'middle') =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" font-size="${size}" fill="${fill}">${s}</text>`;
const wire = (pts, color = WIRE) =>
  `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
const dot = ([x, y], color = WIRE) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${color}"/>`;
const panel = (x, y, w, h, label, body) =>
  `<g transform="translate(${x},${y})"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="10" fill="none" stroke="#d9d9d9" stroke-width="2"/>${text(22, 22, label, 18)}${body}</g>`;

/* 電池（橫放）：左上角 (x, y)，寬 90、高 34；dir=1 時正極在右，dir=-1 時正極在左。
   回傳 { svg, pos, neg }：pos／neg 是兩極的接點座標。 */
function battery(x, y, dir = 1) {
  const w = 90, h = 34, nubW = 7, nubH = 14;
  const posX = dir === 1 ? x + w + nubW : x - nubW, negX = dir === 1 ? x : x + w;
  const nubX = dir === 1 ? x + w : x - nubW;
  const capX = dir === 1 ? x + w - 18 : x;
  const s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${BAT}" stroke="${INK}" stroke-width="2"/>
<rect x="${capX}" y="${y}" width="18" height="${h}" fill="${BAT2}" stroke="${INK}" stroke-width="2"/>
<rect x="${nubX}" y="${y + (h - nubH) / 2}" width="${nubW}" height="${nubH}" fill="${METAL}" stroke="${INK}" stroke-width="2"/>
${text(dir === 1 ? x + w - 9 : x + 9, y + h / 2 + 1, '+', 18, '#fff')}${text(dir === 1 ? x + 14 : x + w - 14, y + h / 2 + 1, '－', 16)}`;
  return { svg: s, pos: [posX, y + h / 2], neg: [negX, y + h / 2] };
}

/* 沒有燈座的燈泡：玻璃罩中心 (cx, cy)。回傳 { svg, sideL, sideR, bottom }：螺紋金屬體左右兩側和底部接點的位置。 */
function bulb(cx, cy) {
  const r = 22, top = cy + 14, bot = cy + 38;
  let stripes = '';
  for (let yy = top + 5; yy < bot; yy += 6) stripes += `<line x1="${cx - 12}" y1="${yy}" x2="${cx + 12}" y2="${yy}" stroke="#888" stroke-width="1.5"/>`;
  const s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${GLASS}" stroke="${INK}" stroke-width="2"/>
<path d="M ${cx - 6} ${top} L ${cx - 6} ${cy + 2} L ${cx - 3} ${cy - 6} L ${cx} ${cy + 2} L ${cx + 3} ${cy - 6} L ${cx + 6} ${cy + 2} L ${cx + 6} ${top}" fill="none" stroke="#777" stroke-width="1.5"/>
<rect x="${cx - 12}" y="${top}" width="24" height="${bot - top}" fill="${METAL}" stroke="${INK}" stroke-width="2"/>${stripes}
<rect x="${cx - 5}" y="${bot}" width="10" height="7" rx="2" fill="#555" stroke="${INK}" stroke-width="1.5"/>`;
  return { svg: s, sideL: [cx - 12, top + 12], sideR: [cx + 12, top + 12], bottom: [cx, bot + 7] };
}

/* 裝在燈座上的燈泡：燈座中心 (cx, cy)。燈座兩側各有一個接線點。回傳 { svg, L, R }。 */
function holderBulb(cx, cy) {
  const s = `<circle cx="${cx}" cy="${cy - 30}" r="20" fill="${GLASS}" stroke="${INK}" stroke-width="2"/>
<path d="M ${cx - 6} ${cy - 12} L ${cx - 6} ${cy - 28} L ${cx - 3} ${cy - 36} L ${cx} ${cy - 28} L ${cx + 3} ${cy - 36} L ${cx + 6} ${cy - 28} L ${cx + 6} ${cy - 12}" fill="none" stroke="#777" stroke-width="1.5"/>
<rect x="${cx - 11}" y="${cy - 13}" width="22" height="9" fill="${METAL}" stroke="${INK}" stroke-width="2"/>
<rect x="${cx - 30}" y="${cy - 4}" width="60" height="16" rx="4" fill="#7a8fa6" stroke="${INK}" stroke-width="2"/>
<circle cx="${cx - 24}" cy="${cy + 4}" r="4" fill="${METAL}" stroke="${INK}" stroke-width="1.5"/><circle cx="${cx + 24}" cy="${cy + 4}" r="4" fill="${METAL}" stroke="${INK}" stroke-width="1.5"/>`;
  return { svg: s, L: [cx - 24, cy + 4], R: [cx + 24, cy + 4] };
}

const figs = {};

/* ns4-16 第 6 題：四種接法，哪一個燈泡會亮（甲：兩條線分別接電池兩極、燈泡螺紋和底部接點） */
{
  const W = 270, H = 190;
  const one = (label, kind) => {
    const b = battery(70, 132), l = bulb(135, 48);
    let w = '';
    if (kind === 'ok') {
      w = wire([b.neg, [40, b.neg[1]], [40, 112], [l.bottom[0], 112], l.bottom], WIRE2) + wire([b.pos, [235, b.pos[1]], [235, l.sideR[1]], l.sideR]);
    } else if (kind === 'twoSide') {
      w = wire([b.neg, [40, b.neg[1]], [40, l.sideL[1]], l.sideL], WIRE2) + wire([b.pos, [235, b.pos[1]], [235, l.sideR[1]], l.sideR]);
    } else if (kind === 'samePole') {
      w = wire([b.pos, [235, b.pos[1]], [235, l.sideR[1]], l.sideR]) + wire([b.pos, [195, b.pos[1]], [195, 112], [l.bottom[0], 112], l.bottom], WIRE2) + dot(b.pos);
    } else if (kind === 'oneWire') {
      w = wire([b.pos, [235, b.pos[1]], [235, 112], [l.bottom[0], 112], l.bottom]);
    }
    return panel(0, 0, W, H, label, b.svg + l.svg + w);
  };
  const body = [['甲', 'ok'], ['乙', 'twoSide'], ['丙', 'samePole'], ['丁', 'oneWire']]
    .map(([lb, k], i) => `<g transform="translate(${(i % 2) * (W + 10)},${Math.floor(i / 2) * (H + 10)})">${one(lb, k)}</g>`).join('\n');
  figs['16-a'] = svg(2 * W + 10, 2 * H + 10, body);
}

/* ns4-18 第 6 題：兩個電池的兩種接法（甲：串聯，乙：並聯），各接一個燈座上的燈泡 */
{
  const W = 300, H = 230;
  // 甲：兩個電池頭尾相接（第一個的正極碰第二個的負極）
  const b1 = battery(42, 170), b2 = battery(42 + 97, 170), lA = holderBulb(150, 70);
  const a = b1.svg + b2.svg + lA.svg + wire([b1.neg, [24, b1.neg[1]], [24, lA.L[1]], lA.L], WIRE2) + wire([b2.pos, [276, b2.pos[1]], [276, lA.R[1]], lA.R]);
  // 乙：兩個電池上下並排、方向相同；正極接正極、負極接負極
  const c1 = battery(105, 128), c2 = battery(105, 178), lB = holderBulb(150, 62);
  const b = c1.svg + c2.svg + lB.svg
    + wire([c2.neg, [60, c2.neg[1]], [60, c1.neg[1]]], WIRE2) + wire([c1.neg, [60, c1.neg[1]], [60, lB.L[1]], lB.L], WIRE2)
    + wire([c2.pos, [240, c2.pos[1]], [240, c1.pos[1]]]) + wire([c1.pos, [240, c1.pos[1]], [240, lB.R[1]], lB.R])
    + dot([60, c1.neg[1]], WIRE2) + dot([240, c1.pos[1]]);
  figs['18-a'] = svg(2 * W + 10, H, panel(0, 0, W, H, '甲', a) + `<g transform="translate(${W + 10},0)">${panel(0, 0, W, H, '乙', b)}</g>`);
}

/* ns4-19 第 6 題：兩個燈泡的兩種接法（甲：串聯在同一個通路，乙：並聯，各自和電池形成通路），電池都只有一個 */
{
  const W = 300, H = 230;
  const bA = battery(105, 180), p1 = holderBulb(95, 80), p2 = holderBulb(205, 80);
  const a = bA.svg + p1.svg + p2.svg
    + wire([bA.neg, [40, bA.neg[1]], [40, p1.L[1]], p1.L], WIRE2) + wire([p1.R, p2.L])
    + wire([bA.pos, [262, bA.pos[1]], [262, p2.R[1]], p2.R]);
  const bB = battery(105, 190), q1 = holderBulb(150, 58), q2 = holderBulb(150, 130);
  const b = bB.svg + q1.svg + q2.svg
    + wire([bB.neg, [40, bB.neg[1]], [40, q1.L[1]], q1.L], WIRE2) + wire([[40, q2.L[1]], q2.L], WIRE2) + dot([40, q2.L[1]], WIRE2)
    + wire([bB.pos, [262, bB.pos[1]], [262, q1.R[1]], q1.R]) + wire([[262, q2.R[1]], q2.R]) + dot([262, q2.R[1]]);
  figs['19-a'] = svg(2 * W + 10, H, panel(0, 0, W, H, '甲', a) + `<g transform="translate(${W + 10},0)">${panel(0, 0, W, H, '乙', b)}</g>`);
}

for (const [name, s] of Object.entries(figs)) {
  writeFileSync(new URL(`ns4-${name}.svg`, OUT), s);
  console.log(`data/fig/ns4-${name}.svg`);
}
