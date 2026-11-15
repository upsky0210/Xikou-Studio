// 產生五上數學（mn5）題目用的圖（SVG）：node tools/make-figures-mn5.mjs
// 圖上的每個數都從下面的資料算出來，不手繪；改了題目的數字，這裡也要跟著改，再跑一次。
// 輸出到 data/fig/，檔名 mn5-<關卡>-<代號>.svg。圖用 <img> 顯示，吃不到網頁字型，所以用系統字型。
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = new URL('../data/fig/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const INK = '#2b2b2b', GRID = '#d9d9d9';
const FONT = "PingFang TC, 'Microsoft JhengHei', 'Noto Sans TC', sans-serif";
const f = (n) => Math.round(n * 100) / 100;
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="${FONT}" font-size="16" font-weight="700">
<rect width="${w}" height="${h}" fill="#fff"/>
${body}
</svg>
`;
const text = (x, y, s, anchor = 'middle', size = 16, fill = INK) =>
  `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" dominant-baseline="middle" font-size="${size}" fill="${fill}">${s}</text>`;
const line = (x1, y1, x2, y2, stroke = INK, w = 2, extra = '') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;

/* 統計圖的框：縱軸從 y0 畫到 y1、每格 step。skip＝true 時，最下面多留一段畫省略符號（0 到 y0 之間省略）。
   回傳 { body, X(i), Y(v) }：X(i) 是第 i 個項目的中心，Y(v) 是數值 v 的高度。 */
function frame({ w, h, title, yUnit, xUnit, labels, y0, y1, step, skip }) {
  const L = 64, R = 24, T = 64, B = 58, gap = skip ? 26 : 0;
  const top = T, bottom = h - B, plotB = bottom - gap;
  const Y = (v) => plotB - ((v - y0) / (y1 - y0)) * (plotB - top);
  const colW = (w - L - R) / labels.length, X = (i) => L + colW * (i + 0.5);
  let b = text(w / 2, 22, title, 'middle', 18);
  b += text(L - 8, 44, yUnit, 'end', 14);
  for (let v = y0; v <= y1 + 1e-9; v += step) {
    b += line(L, Y(v), w - R, Y(v), GRID, 1);
    b += text(L - 8, Y(v), String(v), 'end', 14);
  }
  if (skip) {
    b += text(L - 8, bottom, '0', 'end', 14);
    // 省略符號：縱軸上的雙波浪
    const ym = (plotB + bottom) / 2;
    b += `<path d="M ${L - 9} ${f(ym - 3)} q 4.5 -6 9 0 t 9 0 M ${L - 9} ${f(ym + 4)} q 4.5 -6 9 0 t 9 0" fill="none" stroke="${INK}" stroke-width="2"/>`;
    b += line(L, top - 6, L, ym - 7) + line(L, ym + 8, L, bottom);
  } else b += line(L, top - 6, L, bottom);
  b += line(L, bottom, w - R, bottom);
  labels.forEach((s, i) => { b += text(X(i), bottom + 18, s, 'middle', 15); });
  if (xUnit) b += text(w - R, bottom + 40, xUnit, 'end', 14);
  return { body: b, X, Y, colW, bottom };
}
const legend = (x, y, items) => items.map(([label, draw], i) => draw(x + i * 118, y) + text(x + i * 118 + 34, y, label, 'start', 15)).join('');

const figs = {};

/* L01：五年級四個班的資源回收量（疊加型長條圖）。下段紙類、上段寶特瓶，每格 5 公斤 */
figs['mn5-01-a'] = (() => {
  const classes = ['甲班', '乙班', '丙班', '丁班'], paper = [30, 25, 40, 20], bottle = [20, 35, 15, 30];
  const C1 = '#f3b23c', C2 = '#5aa7e0';
  const fr = frame({ w: 520, h: 400, title: '五年級各班資源回收量', yUnit: '（公斤）', labels: classes, y0: 0, y1: 65, step: 5 });
  let b = fr.body;
  classes.forEach((_, i) => {
    const x = fr.X(i) - 30, yP = fr.Y(paper[i]), yT = fr.Y(paper[i] + bottle[i]);
    b += `<rect x="${f(x)}" y="${f(yP)}" width="60" height="${f(fr.bottom - yP)}" fill="${C1}" stroke="${INK}" stroke-width="2"/>`;
    b += `<rect x="${f(x)}" y="${f(yT)}" width="60" height="${f(yP - yT)}" fill="${C2}" stroke="${INK}" stroke-width="2"/>`;
  });
  const box = (c) => (x, y) => `<rect x="${x}" y="${y - 9}" width="26" height="18" fill="${c}" stroke="${INK}" stroke-width="1.5"/>`;
  b += legend(250, 44, [['紙類', box(C1)], ['寶特瓶', box(C2)]]);
  return svg(520, 400, b);
})();

/* L02：某日 9 時到 16 時的氣溫（折線圖，0 到 22 度省略，每格 2 度） */
figs['mn5-02-a'] = (() => {
  const hours = [9, 10, 11, 12, 13, 14, 15, 16], temp = [24, 25, 28, 30, 32, 31, 27, 26];
  const fr = frame({ w: 540, h: 400, title: '10 月 8 日 9 時到 16 時的氣溫變化', yUnit: '（度）', xUnit: '（時）', labels: hours.map(String), y0: 22, y1: 34, step: 2, skip: true });
  let b = fr.body;
  hours.forEach((_, i) => { b += line(fr.X(i), fr.Y(34), fr.X(i), fr.bottom, GRID, 1); });
  b += `<polyline points="${temp.map((v, i) => `${f(fr.X(i))},${f(fr.Y(v))}`).join(' ')}" fill="none" stroke="#d6452f" stroke-width="3" stroke-linejoin="round"/>`;
  temp.forEach((v, i) => { b += `<circle cx="${f(fr.X(i))}" cy="${f(fr.Y(v))}" r="5" fill="#d6452f" stroke="#fff" stroke-width="1.5"/>`; });
  return svg(540, 400, b);
})();

/* L02：甲、乙兩家書店一月到六月的銷售量（複雜折線圖，0 到 160 本省略，每格 20 本） */
figs['mn5-02-b'] = (() => {
  const months = ['一月', '二月', '三月', '四月', '五月', '六月'];
  const A = [320, 300, 280, 260, 230, 200], B = [180, 200, 240, 260, 300, 340];
  const CA = '#2f6fd0', CB = '#e0862a';
  const fr = frame({ w: 540, h: 440, title: '甲、乙兩家書店的銷售量', yUnit: '（本）', labels: months, y0: 160, y1: 340, step: 20, skip: true });
  let b = fr.body;
  months.forEach((_, i) => { b += line(fr.X(i), fr.Y(340), fr.X(i), fr.bottom, GRID, 1); });
  const pts = (arr) => arr.map((v, i) => `${f(fr.X(i))},${f(fr.Y(v))}`).join(' ');
  b += `<polyline points="${pts(A)}" fill="none" stroke="${CA}" stroke-width="3" stroke-linejoin="round"/>`;
  b += `<polyline points="${pts(B)}" fill="none" stroke="${CB}" stroke-width="3" stroke-linejoin="round" stroke-dasharray="9 5"/>`;
  A.forEach((v, i) => { b += `<circle cx="${f(fr.X(i))}" cy="${f(fr.Y(v))}" r="5.5" fill="${CA}" stroke="#fff" stroke-width="1.5"/>`; });
  B.forEach((v, i) => { b += `<rect x="${f(fr.X(i) - 5)}" y="${f(fr.Y(v) - 5)}" width="10" height="10" fill="${CB}" stroke="#fff" stroke-width="1.5"/>`; });
  const key = (c, dash, sq) => (x, y) => line(x, y, x + 28, y, c, 3, dash ? 'stroke-dasharray="9 5"' : '')
    + (sq ? `<rect x="${x + 9}" y="${y - 5}" width="10" height="10" fill="${c}"/>` : `<circle cx="${x + 14}" cy="${y}" r="5.5" fill="${c}"/>`);
  b += legend(250, 44, [['甲書店', key(CA, false, false)], ['乙書店', key(CB, true, true)]]);
  return svg(540, 440, b);
})();

for (const [name, content] of Object.entries(figs)) writeFileSync(new URL(name + '.svg', OUT), content);
console.log('已產生 ' + Object.keys(figs).length + ' 張圖：' + Object.keys(figs).join('、'));
