// 產生題目用的圖（SVG），尺寸照題目裡的數字用程式算，不手繪：node tools/make-figures.mjs
// 輸出到 data/fig/，檔名對應關卡和題號（mn6-08-q1.svg ＝ L08 第 1 題）。
// 改了題目的數字，這裡也要跟著改，再跑一次。
// 圖是用 <img> 顯示，吃不到網頁的字型，所以標籤用系統字型（iPad 的蘋方、Windows 的微軟正黑體）。
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = new URL('../data/fig/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const INK = '#2b2b2b', FILL = '#ffe08a', FILL2 = '#a0c8eb', WALL = '#c6c6c6', ROPE = '#8b5e34';
const FONT = "PingFang TC, 'Microsoft JhengHei', 'Noto Sans TC', sans-serif";
const f = (n) => Math.round(n * 100) / 100;

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="${FONT}" font-size="16" font-weight="700">
<rect width="${w}" height="${h}" fill="#fff"/>
${body}
</svg>
`;
const text = (x, y, s, anchor = 'middle', size = 16) =>
  `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" dominant-baseline="middle" font-size="${size}" fill="${INK}" stroke="#fff" stroke-width="4" paint-order="stroke">${s}</text>`;
const line = (x1, y1, x2, y2, extra = '') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${INK}" stroke-width="2.5" ${extra}/>`;
// 數學角度（逆時針、y 往上）轉成畫面座標
const pt = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)];
const P = ([x, y]) => `${f(x)} ${f(y)}`;
// 扇形：從角度 a0 逆時針轉到 a1
function sector(cx, cy, r, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${f(cx)} ${f(cy)} L ${P(pt(cx, cy, r, a0))} A ${f(r)} ${f(r)} 0 ${large} 0 ${P(pt(cx, cy, r, a1))} Z`;
}
// 扇環（大扇形扣掉同圓心的小扇形）
function ringSector(cx, cy, R, r, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${P(pt(cx, cy, R, a0))} A ${f(R)} ${f(R)} 0 ${large} 0 ${P(pt(cx, cy, R, a1))} L ${P(pt(cx, cy, r, a1))} A ${f(r)} ${f(r)} 0 ${large} 1 ${P(pt(cx, cy, r, a0))} Z`;
}
const rightAngle = (x, y, s = 12) => `<path d="M ${f(x + s)} ${f(y)} L ${f(x + s)} ${f(y - s)} L ${f(x)} ${f(y - s)}" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
const shaded = (d, fill = FILL, rule = 'nonzero') => `<path d="${d}" fill="${fill}" fill-rule="${rule}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;

const figs = {};

/* L08-Q1：圓切成 16 等份，交錯拼成接近長方形的圖形 */
figs['mn6-08-q1'] = (() => {
  const r = 60, n = 16, half = 360 / n / 2;
  const cx = 80, cy = 95;
  let body = '';
  for (let i = 0; i < n; i++) body += shaded(sector(cx, cy, r, i * (360 / n), (i + 1) * (360 / n)), i % 2 ? FILL2 : FILL);
  const w = 2 * r * Math.sin((half * Math.PI) / 180), h = r * Math.cos((half * Math.PI) / 180);
  const x0 = 250, yB = cy + h / 2 + 6;
  for (let i = 0; i < n / 2; i++) {
    const ax = x0 + i * w;                     // 尖端朝下的扇形（弧在上面）
    body += shaded(sector(ax, yB, r, 90 - half, 90 + half), FILL);
    const bx = ax + w / 2;                     // 尖端朝上的扇形（弧在下面）
    body += shaded(sector(bx, yB - h, r, 270 - half, 270 + half), FILL2);
  }
  body += `<path d="M 148 ${cy} L 182 ${cy}" stroke="${INK}" stroke-width="3" marker-end="url(#ar)"/>`;
  // 上面那條邊由 8 段弧組成，從 x0－w/2 到 x0－w/2＋L
  const L = (n / 2) * w, left = x0 - w / 2;
  body += `<path d="M ${f(left)} ${f(yB - r - 12)} L ${f(left)} ${f(yB - r - 4)} M ${f(left)} ${f(yB - r - 8)} L ${f(left + L)} ${f(yB - r - 8)} M ${f(left + L)} ${f(yB - r - 12)} L ${f(left + L)} ${f(yB - r - 4)}" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
  body += text(left + L / 2, yB - r - 24, '長');
  body += `<path d="M ${f(left - 4)} ${f(yB)} L ${f(left - 12)} ${f(yB)} M ${f(left - 8)} ${f(yB)} L ${f(left - 8)} ${f(yB - h)} M ${f(left - 4)} ${f(yB - h)} L ${f(left - 12)} ${f(yB - h)}" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
  body += text(left - 26, yB - h / 2, '寬');
  const defs = `<defs><marker id="ar" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${INK}"/></marker></defs>`;
  return svg(Math.ceil(x0 + L + w + 20), 200, defs + body);
})();

/* L08-Q5：邊長 20 公分的正方形，裡面畫最大的圓，塗色是正方形扣掉圓 */
figs['mn6-08-q5'] = (() => {
  const s = 200, x = 40, y = 20, r = s / 2;
  const d = `M ${x} ${y} h ${s} v ${s} h ${-s} Z M ${x + r} ${y} A ${r} ${r} 0 1 0 ${x + r} ${y + s} A ${r} ${r} 0 1 0 ${x + r} ${y} Z`;
  return svg(280, 270, shaded(d, FILL, 'evenodd') + text(x + r, y + s + 22, '20 公分') + `<circle cx="${x + r}" cy="${y + r}" r="3" fill="${INK}"/>`);
})();

/* L11-Q3：半徑 10 公分的 1/4 圓 */
figs['mn6-11-q3'] = (() => {
  const r = 160, cx = 80, cy = 190;
  return svg(270, 230, shaded(sector(cx, cy, r, 0, 90)) + rightAngle(cx, cy) +
    text(cx + r / 2, cy + 20, '10 公分') + text(cx - 8, cy - r / 2, '10 公分', 'end'));
})();

/* L12-Q1：小羊用 4 公尺的繩子綁在倉庫（6 公尺×5 公尺）外的牆角 */
figs['mn6-12-q1'] = (() => {
  const u = 24, cx = 4 * u + 30, cy = 5 * u + 30;
  let b = `<rect x="${cx}" y="${cy - 5 * u}" width="${6 * u}" height="${5 * u}" fill="${WALL}" stroke="${INK}" stroke-width="2.5"/>`;
  b += text(cx + 3 * u, cy - 2.5 * u, '倉庫');
  b += text(cx + 3 * u, cy + 18, '6 公尺') + text(cx + 6 * u + 10, cy - 2.5 * u, '5 公尺', 'start');
  b += `<line x1="${cx}" y1="${cy}" x2="${cx - 4 * u}" y2="${cy}" stroke="${ROPE}" stroke-width="4" stroke-linecap="round"/>`;
  b += `<circle cx="${cx - 4 * u}" cy="${cy}" r="9" fill="#fff" stroke="${INK}" stroke-width="2.5"/>` + text(cx - 4 * u, cy + 24, '小羊');
  b += `<circle cx="${cx}" cy="${cy}" r="5" fill="${INK}"/>` + text(cx - 2 * u, cy - 14, '繩長 4 公尺');
  return svg(cx + 6 * u + 80, cy + 50, b);
})();

/* L12-Q2：半徑 10 公分的 1/4 圓，挖掉同圓心、半徑 6 公分的 1/4 圓 */
figs['mn6-12-q2'] = (() => {
  const k = 16, cx = 80, cy = 200, R = 10 * k, r = 6 * k;
  let b = shaded(ringSector(cx, cy, R, r, 0, 90));
  b += `<path d="${sector(cx, cy, r, 0, 90)}" fill="#fff" stroke="${INK}" stroke-width="2.5" stroke-dasharray="6 5"/>`;
  b += rightAngle(cx, cy) + text(cx + r / 2, cy + 20, '6 公分') + text(cx - 8, cy - R / 2, '10 公分', 'end');
  b += line(cx, cy, cx, cy - R) + line(cx, cy, cx + R, cy);
  return svg(280, 240, b);
})();

/* L12-Q3：半徑 8 公分的 1/4 圓，扣掉兩條半徑圍成的等腰直角三角形 */
figs['mn6-12-q3'] = (() => {
  const r = 160, cx = 80, cy = 190;
  const a = pt(cx, cy, r, 0), c = pt(cx, cy, r, 90);
  let b = shaded(`M ${P(a)} A ${r} ${r} 0 0 0 ${P(c)} Z`);
  b += `<path d="M ${cx} ${cy} L ${P(a)} L ${P(c)} Z" fill="#fff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
  b += rightAngle(cx, cy) + text(cx + r / 2, cy + 20, '8 公分') + text(cx - 8, cy - r / 2, '8 公分', 'end');
  return svg(270, 230, b);
})();

/* L12-Q4：邊長 10 公分的正方形，扣掉以一個頂點為圓心、邊長為半徑的 1/4 圓 */
figs['mn6-12-q4'] = (() => {
  const s = 160, x = 80, y = 20, cx = x, cy = y + s;
  const d = `M ${x + s} ${y} L ${x + s} ${y + s} A ${s} ${s} 0 0 0 ${x} ${y} Z`;
  let b = `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
  b += shaded(d) + `<path d="${sector(cx, cy, s, 0, 90)}" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
  b += text(x + s / 2, y + s + 20, '10 公分') + text(x - 8, y + s / 2, '10 公分', 'end');
  return svg(270, 220, b);
})();

/* L12-Q5：長 20 公分、寬 10 公分的長方形，左右兩邊各挖掉一個直徑 10 公分的半圓 */
figs['mn6-12-q5'] = (() => {
  const k = 12, x = 30, y = 20, W = 20 * k, H = 10 * k, r = H / 2;
  const d = `M ${x} ${y} L ${x + W} ${y} A ${r} ${r} 0 0 0 ${x + W} ${y + H} L ${x} ${y + H} A ${r} ${r} 0 0 0 ${x} ${y} Z`;
  let b = `<rect x="${x}" y="${y}" width="${W}" height="${H}" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="6 5"/>`;
  b += shaded(d) + text(x + W / 2, y + H + 20, '20 公分') + text(x + W + 10, y + H / 2, '10 公分', 'start');
  return svg(x + W + 80, y + H + 40, b);
})();

/* L12-Q6：小狗用 6 公尺的繩子綁在倉庫（4 公尺×2 公尺）外的牆角，繩子可以繞過轉角 */
figs['mn6-12-q6'] = (() => {
  const u = 26, cx = 4 * u + 70, cy = 2 * u + 40;
  let b = `<rect x="${cx}" y="${cy - 2 * u}" width="${4 * u}" height="${2 * u}" fill="${WALL}" stroke="${INK}" stroke-width="2.5"/>`;
  b += text(cx + 2 * u, cy - u, '倉庫');
  b += text(cx + 2 * u, cy + 18, '4 公尺') + text(cx - 10, cy - u, '2 公尺', 'end');
  b += `<line x1="${cx}" y1="${cy}" x2="${cx - 4 * u}" y2="${cy + 4.47 * u}" stroke="${ROPE}" stroke-width="4" stroke-linecap="round"/>`;
  b += `<circle cx="${cx - 4 * u}" cy="${cy + 4.47 * u}" r="9" fill="#fff" stroke="${INK}" stroke-width="2.5"/>` + text(cx - 4 * u, cy + 4.47 * u + 24, '小狗');
  b += `<circle cx="${cx}" cy="${cy}" r="5" fill="${INK}"/>` + text(cx - 2.6 * u, cy + 1.6 * u, '繩長 6 公尺', 'end');
  return svg(cx + 4 * u + 50, Math.ceil(cy + 4.47 * u + 50), b);
})();

/* L12-Q7：長 12 公分、寬 6 公分的長方形，左邊挖掉一個半圓、右邊加上一個一樣大的半圓（直徑 6 公分） */
figs['mn6-12-q7'] = (() => {
  const k = 20, x = 30, y = 80, W = 12 * k, H = 6 * k, r = 3 * k;
  // 右半邊往上凸（逆時針），左半邊往下凹（順時針）
  const d = `M ${x} ${y + H} L ${x + W} ${y + H} L ${x + W} ${y} A ${r} ${r} 0 0 0 ${x + W / 2} ${y} A ${r} ${r} 0 0 1 ${x} ${y} Z`;
  let b = shaded(d) + `<line x1="${x}" y1="${y}" x2="${x + W}" y2="${y}" stroke="${INK}" stroke-width="1.5" stroke-dasharray="6 5"/>`;
  b += text(x + W / 2, y + H + 20, '12 公分') + text(x + W + 10, y + H / 2, '6 公分', 'start');
  b += text(x + W * 0.25, y - 14, '6 公分') + text(x + W * 0.75, y + 18, '6 公分');
  return svg(x + W + 70, y + H + 40, b);
})();

/* L17-Q1：3 張方桌排成一長排，可以坐 8 人 */
figs['mn6-17-q1'] = (() => {
  const s = 56, x = 50, y = 50, n = 3;
  let b = '';
  for (let i = 0; i < n; i++) b += `<rect x="${x + i * s}" y="${y}" width="${s}" height="${s}" fill="#e3c88f" stroke="${INK}" stroke-width="2.5"/>`;
  const seat = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="11" fill="${FILL2}" stroke="${INK}" stroke-width="2"/>`;
  for (let i = 0; i < n; i++) b += seat(x + i * s + s / 2, y - 18) + seat(x + i * s + s / 2, y + s + 18);
  b += seat(x - 18, y + s / 2) + seat(x + n * s + 18, y + s / 2);
  return svg(x * 2 + n * s, y + s + 50, b);
})();

/* L17-Q2：4 個連在一起的三角形，用了 9 根木棒 */
figs['mn6-17-q2'] = (() => {
  const s = 70, h = s * Math.sqrt(3) / 2, x = 30, y = 30;
  const B = (i) => [x + i * s, y + h], T = (i) => [x + s / 2 + i * s, y];
  const sticks = [[B(0), B(1)], [B(1), B(2)], [T(0), T(1)], [T(1), T(2)], [B(0), T(0)], [T(0), B(1)], [B(1), T(1)], [T(1), B(2)], [B(2), T(2)]];
  const b = sticks.map(([p, q]) => `<line x1="${f(p[0])}" y1="${f(p[1])}" x2="${f(q[0])}" y2="${f(q[1])}" stroke="${ROPE}" stroke-width="7" stroke-linecap="round"/>`).join('');
  return svg(Math.ceil(x * 2 + 2.5 * s), Math.ceil(y * 2 + h), b);
})();

/* L17-Q4：空心方陣，每邊 4 人，一共 12 人 */
figs['mn6-17-q4'] = (() => {
  const g = 46, x = 40, y = 30, n = 4;
  let b = '';
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    if (i === 0 || j === 0 || i === n - 1 || j === n - 1) b += `<circle cx="${x + i * g}" cy="${y + j * g}" r="13" fill="${FILL}" stroke="${INK}" stroke-width="2.5"/>`;
  }
  return svg(x * 2 + (n - 1) * g, y * 2 + (n - 1) * g, b);
})();

/* L17-Q5：十字形，第 1、2、3 個圖分別用 5、9、13 塊 */
figs['mn6-17-q5'] = (() => {
  const c = 16; let b = '', ox = 20;
  for (let k = 1; k <= 3; k++) {
    const size = (2 * k + 1) * c, cx = ox + size / 2, cy = 20 + 3.5 * c;
    const cell = (i, j) => `<rect x="${cx - c / 2 + i * c}" y="${cy - c / 2 + j * c}" width="${c}" height="${c}" fill="${FILL}" stroke="${INK}" stroke-width="1.5"/>`;
    b += cell(0, 0);
    for (let t = 1; t <= k; t++) b += cell(t, 0) + cell(-t, 0) + cell(0, t) + cell(0, -t);
    b += text(cx, 20 + 7 * c + 18, `第 ${k} 個`, 'middle', 15);
    ox += size + 34;
  }
  return svg(ox, 20 + 7 * c + 40, b);
})();

for (const [name, content] of Object.entries(figs)) writeFileSync(new URL(name + '.svg', OUT), content);
console.log('已產生 ' + Object.keys(figs).length + ' 張圖：' + Object.keys(figs).join('、'));
