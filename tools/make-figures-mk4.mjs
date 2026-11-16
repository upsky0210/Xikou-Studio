// 產生四上數學（mk4）題目用的圖（SVG）：node tools/make-figures-mk4.mjs
// 圖上的每個數都從下面的資料算出來，不手繪；改了題目的數字，這裡也要跟著改，再跑一次。
// 輸出到 data/fig/，檔名 mk4-<關卡>-<代號>.svg。圖用 <img> 顯示，吃不到網頁字型，所以用系統字型。
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = new URL('../data/fig/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const INK = '#2b2b2b', GRID = '#d9d9d9', BLUE = '#2f6fd0', RED = '#d6452f', FILL = '#fbe9b8', FILL2 = '#d8ebfb';
const FONT = "PingFang TC, 'Microsoft JhengHei', 'Noto Sans TC', sans-serif";
const f = (n) => Math.round(n * 100) / 100;
const rad = (d) => (d * Math.PI) / 180;
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="${FONT}" font-size="16" font-weight="700">
<rect width="${w}" height="${h}" fill="#fff"/>
${body}
</svg>
`;
const text = (x, y, s, anchor = 'middle', size = 16, fill = INK) =>
  `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" dominant-baseline="middle" font-size="${size}" fill="${fill}">${s}</text>`;
const line = (x1, y1, x2, y2, stroke = INK, w = 2, extra = '') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;
// 從 (cx, cy) 往「從右邊算起、逆時針 deg 度」的方向走 r
const polar = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))];
// 角的弧線：以 (cx, cy) 為頂點，從 a 度到 b 度（a < b，逆時針），半徑 r
const arc = (cx, cy, r, a, b, stroke = INK, w = 2) => {
  const [x1, y1] = polar(cx, cy, r, a), [x2, y2] = polar(cx, cy, r, b);
  return `<path d="M ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${b - a > 180 ? 1 : 0} 0 ${f(x2)} ${f(y2)}" fill="none" stroke="${stroke}" stroke-width="${w}"/>`;
};

/* 統計圖的框（和 make-figures-mn5.mjs 相同）：縱軸從 y0 畫到 y1、每格 step。skip＝true 時最下面畫省略符號。 */
function frame({ w, h, title, yUnit, xUnit, labels, y0, y1, step, skip, every = 1 }) {
  const L = 64, R = 24, T = 64, B = 58, gap = skip ? 26 : 0;
  const top = T, bottom = h - B, plotB = bottom - gap;
  const Y = (v) => plotB - ((v - y0) / (y1 - y0)) * (plotB - top);
  const colW = (w - L - R) / labels.length, X = (i) => L + colW * (i + 0.5);
  let b = text(w / 2, 22, title, 'middle', 18);
  b += text(L - 8, 44, yUnit, 'end', 14);
  let k = 0;
  for (let v = y0; v <= y1 + 1e-9; v += step, k++) {
    b += line(L, Y(v), w - R, Y(v), GRID, 1);
    if (k % every === 0) b += text(L - 8, Y(v), String(v), 'end', 14);   // every＝2：隔一格才標數字
  }
  if (skip) {
    b += text(L - 8, bottom, '0', 'end', 14);
    const ym = (plotB + bottom) / 2;
    b += `<path d="M ${L - 9} ${f(ym - 3)} q 4.5 -6 9 0 t 9 0 M ${L - 9} ${f(ym + 4)} q 4.5 -6 9 0 t 9 0" fill="none" stroke="${INK}" stroke-width="2"/>`;
    b += line(L, top - 6, L, ym - 7) + line(L, ym + 8, L, bottom);
  } else b += line(L, top - 6, L, bottom);
  b += line(L, bottom, w - R, bottom);
  labels.forEach((s, i) => { b += text(X(i), bottom + 18, s, 'middle', 15); });
  if (xUnit) b += text(w - R, bottom + 40, xUnit, 'end', 14);
  return { body: b, X, Y, colW, bottom };
}
const legend = (x, y, items, gap = 118) => items.map(([label, draw], i) => draw(x + i * gap, y) + text(x + i * gap + 34, y, label, 'start', 15)).join('');

/* 量角器：中心 (cx, cy)、半徑 R。外圈從左到右 0～180，內圈從右到左 0～180（和課本的量角器一樣）。
   rays：角的兩邊，[從右邊算起逆時針的度數, 顏色]。兩邊畫得比量角器長一點。 */
function protractor(rays, { R = 230 } = {}) {
  const W = R * 2 + 90, H = R + 86, cx = W / 2, cy = R + 44;
  // 先畫角的兩邊，再蓋上半透明的量角器，刻度的數字才不會被邊擋住
  let b = '';
  for (const [deg, color] of rays) {
    const [x, y] = polar(cx, cy, R + 34, deg);
    b += line(cx, cy, x, y, color, 3.5, 'stroke-linecap="round"');
  }
  b += `<path d="M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} L ${cx + R} ${cy + 16} L ${cx - R} ${cy + 16} Z" fill="#eef5fa" fill-opacity="0.35" stroke="${INK}" stroke-width="2"/>`;
  const num = (x, y, s, size, fill) => `<text x="${f(x)}" y="${f(y)}" text-anchor="middle" dominant-baseline="middle" font-size="${size}" fill="${fill}" stroke="#fff" stroke-width="3" paint-order="stroke">${s}</text>`;
  for (let d = 0; d <= 180; d++) {
    const len = d % 10 === 0 ? 20 : d % 5 === 0 ? 14 : 8;
    const [x1, y1] = polar(cx, cy, R, d), [x2, y2] = polar(cx, cy, R - len, d);
    b += line(x1, y1, x2, y2, INK, d % 10 === 0 ? 1.6 : 0.9);
    if (d % 10 === 0) {
      const up = d === 0 || d === 180 ? 10 : 0;     // 0 和 180 的數字往上移一點，不壓在底線上
      const [xo, yo] = polar(cx, cy, R - 33, d), [xi, yi] = polar(cx, cy, R - 57, d);
      b += num(xo, yo - up, String(180 - d), 13, INK);           // 外圈
      b += num(xi, yi - up, String(d), 12, '#8a4a00');           // 內圈
      const [xa, ya] = polar(cx, cy, R - 72, d), [xb, yb] = polar(cx, cy, 34, d);
      b += line(xa, ya, xb, yb, '#c9d3da', 0.8);
    }
  }
  b += line(cx - R, cy, cx + R, cy, INK, 1);
  b += `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${INK}"/>`;
  return svg(W, H, b);
}

/* 鐘面：只有數字，沒有時針分針。from、to 是指針開始和最後指著的數字；dir 是 '順' 或 '逆'，畫出旋轉方向的弧形箭頭。 */
function clock(from, to, dir) {
  const W = 340, cx = W / 2, cy = W / 2, R = 140;
  const at = (r, k) => [cx + r * Math.sin(rad(k * 30)), cy - r * Math.cos(rad(k * 30))];   // 數字 k 的方向
  let b = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fffdf5" stroke="${INK}" stroke-width="3"/>`;
  for (let k = 1; k <= 12; k++) {
    const [x1, y1] = at(R, k), [x2, y2] = at(R - 10, k), [xt, yt] = at(R - 26, k);
    b += line(x1, y1, x2, y2, INK, 2) + text(xt, yt, String(k), 'middle', 18);
  }
  const [xs, ys] = at(R - 44, from), [xe, ye] = at(R - 44, to);
  b += line(cx, cy, xs, ys, '#9a9a9a', 4, 'stroke-dasharray="7 5" stroke-linecap="round"');
  b += line(cx, cy, xe, ye, RED, 4.5, 'stroke-linecap="round"');
  // 方向弧線：半徑 r，從 from 到 to
  const r = 46, cw = dir === '順';
  let sweep = ((to - from) * 30 + 360) % 360;        // 順時針要轉的度數
  if (!cw) sweep = 360 - sweep;
  const [ax, ay] = at(r, from), [bx, by] = at(r, to);
  b += `<path d="M ${f(ax)} ${f(ay)} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} ${cw ? 1 : 0} ${f(bx)} ${f(by)}" fill="none" stroke="${BLUE}" stroke-width="3"/>`;
  // 箭頭：在終點，沿著旋轉方向
  const a = rad(to * 30), s = cw ? 1 : -1, tx = s * Math.cos(a), ty = s * Math.sin(a), nx = Math.sin(a), ny = -Math.cos(a);
  const tip = [bx + tx * 9, by + ty * 9], p1 = [bx - tx * 5 + nx * 8, by - ty * 5 + ny * 8], p2 = [bx - tx * 5 - nx * 8, by - ty * 5 - ny * 8];
  b += `<polygon points="${[tip, p1, p2].map((p) => `${f(p[0])},${f(p[1])}`).join(' ')}" fill="${BLUE}"/>`;
  b += `<circle cx="${cx}" cy="${cy}" r="6" fill="${INK}"/>`;
  return svg(W, W, b);
}

const figs = {};

/* ===== 單元三 角度 ===== */
/* L06-Q2：一邊對齊右邊刻度 0 的線（內圈的 0），另一邊在內圈 65 */
figs['mk4-06-a'] = protractor([[0, BLUE], [65, RED]]);
/* L06-Q3：一邊對齊左邊刻度 0 的線（外圈的 0），另一邊在外圈 125（＝從右邊算 55 度的方向） */
figs['mk4-06-b'] = protractor([[180, BLUE], [180 - 125, RED]]);
/* L06-Q4：兩邊都不在刻度 0：內圈 30 和內圈 110，角是 80 度 */
figs['mk4-06-c'] = protractor([[30, BLUE], [110, RED]]);

/* L07-Q3：指針從 9 逆時針轉到 2（7 大格，210 度） */
figs['mk4-07-a'] = clock(9, 2, '逆');
/* L07-Q6：一條直線上的三個角：∠1＝35 度、∠2＝？、∠3＝65 度 */
figs['mk4-07-b'] = (() => {
  const A1 = 35, A3 = 65, W = 460, H = 250, cx = 230, cy = 200, R = 190;
  let b = line(cx - 210, cy, cx + 210, cy, INK, 3);
  for (const d of [A1, 180 - A3]) { const [x, y] = polar(cx, cy, R, d); b += line(cx, cy, x, y, INK, 3); }
  b += arc(cx, cy, 62, 0, A1, BLUE) + arc(cx, cy, 46, A1, 180 - A3, RED) + arc(cx, cy, 62, 180 - A3, 180, BLUE);
  const lab = (r, d, s, c) => { const [x, y] = polar(cx, cy, r, d); return text(x, y, s, 'middle', 17, c); };
  b += lab(92, A1 / 2, `${A1}°`, BLUE) + lab(74, (A1 + 180 - A3) / 2, '？', RED) + lab(92, 180 - A3 / 2, `${A3}°`, BLUE);
  b += `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${INK}"/>`;
  return svg(W, H, b);
})();

/* ===== 單元六 三角形 ===== */
const polygon = (pts, fill = FILL) => `<polygon points="${pts.map((q) => `${f(q[0])},${f(q[1])}`).join(' ')}" fill="${fill}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
const centroid = (pts) => [pts.reduce((a, q) => a + q[0], 0) / pts.length, pts.reduce((a, q) => a + q[1], 0) / pts.length];
// 從 p 往遠離 c 的方向移 d
const away = (q, c, d) => { const dx = q[0] - c[0], dy = q[1] - c[1], n = Math.hypot(dx, dy); return [q[0] + (dx / n) * d, q[1] + (dy / n) * d]; };
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
// 邊上的「一樣長」記號：在 a、b 中點畫一小槓
const tick = (a, b) => { const m = mid(a, b), dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), nx = -dy / n, ny = dx / n; return line(m[0] - nx * 8, m[1] - ny * 8, m[0] + nx * 8, m[1] + ny * 8, RED, 3); };

/* L12-Q2：等腰三角形，頂角 40 度、底角 70 度；兩腰有「一樣長」的記號，右邊的底角標 ☆ */
figs['mk4-12-a'] = (() => {
  const APEX = 40, BASE = (180 - APEX) / 2, leg = 250, W = 380, H = 320;
  const half = leg * Math.sin(rad(APEX / 2)), hgt = leg * Math.cos(rad(APEX / 2));
  const A = [W / 2, 36], B = [W / 2 - half, 36 + hgt], C = [W / 2 + half, 36 + hgt], c = centroid([A, B, C]);
  let b = polygon([A, B, C]) + tick(A, B) + tick(A, C);
  b += arc(B[0], B[1], 34, 0, BASE, BLUE) + arc(C[0], C[1], 34, 180 - BASE, 180, RED);
  b += `<path d="M ${f(A[0] - 30 * Math.sin(rad(APEX / 2)))} ${f(A[1] + 30 * Math.cos(rad(APEX / 2)))} A 30 30 0 0 0 ${f(A[0] + 30 * Math.sin(rad(APEX / 2)))} ${f(A[1] + 30 * Math.cos(rad(APEX / 2)))}" fill="none" stroke="${BLUE}" stroke-width="2"/>`;
  b += text(A[0], A[1] + 52, `${APEX}°`, 'middle', 16, BLUE);
  b += text(B[0] + 52, B[1] - 20, `${BASE}°`, 'middle', 16, BLUE) + text(C[0] - 50, C[1] - 20, '☆', 'middle', 20, RED);
  return svg(W, H, b);
})();

/* L13-Q4、Q5：兩個全等三角形。甲 ABC：AB＝6、AC＝8、BC＝9 公分；乙 DEF 是甲翻面再轉一個方向（A↔D、B↔E、C↔F） */
figs['mk4-13-a'] = (() => {
  const AB = 6, AC = 8, BC = 9, k = 27;
  const ax = (AB * AB - AC * AC + BC * BC) / (2 * BC), ay = Math.sqrt(AB * AB - ax * ax);
  const base = [[ax, -ay], [0, 0], [BC, 0]];                       // A、B、C（y 向下）
  const T1 = base.map(([x, y]) => [40 + x * k, 215 + y * k]);
  const t = rad(62);                                               // 乙：左右翻面，再轉 62 度
  const raw = base.map(([x, y]) => [(-x) * Math.cos(t) - y * Math.sin(t), (-x) * Math.sin(t) + y * Math.cos(t)]);
  const minX = Math.min(...raw.map((q) => q[0])), minY = Math.min(...raw.map((q) => q[1])), maxY = Math.max(...raw.map((q) => q[1]));
  const T2 = raw.map(([x, y]) => [360 + (x - minX) * k, 40 + (y - minY) * k]);
  const H = Math.max(260, 40 + (maxY - minY) * k + 40);
  const names1 = ['A', 'B', 'C'], names2 = ['D', 'E', 'F'];
  let b = '';
  for (const [T, names, fill, tag] of [[T1, names1, FILL, '甲'], [T2, names2, FILL2, '乙']]) {
    const c = centroid(T);
    b += polygon(T, fill) + text(c[0], c[1], tag, 'middle', 20);
    T.forEach((q, i) => { const [x, y] = away(q, c, 18); b += text(x, y, names[i], 'middle', 18); });
  }
  const c1 = centroid(T1), lab = (i, j, s) => { const [x, y] = away(mid(T1[i], T1[j]), c1, 30); return text(x, y, s, 'middle', 15, BLUE); };
  b += lab(0, 1, `${AB} 公分`) + lab(0, 2, `${AC} 公分`) + lab(1, 2, `${BC} 公分`);
  return svg(640, H, b);
})();

/* ===== 單元十 統計圖 ===== */
const bar = (x, yTop, w, yBottom, fill) => `<rect x="${f(x)}" y="${f(yTop)}" width="${w}" height="${f(yBottom - yTop)}" fill="${fill}" stroke="${INK}" stroke-width="2"/>`;
const boxKey = (c) => (x, y) => `<rect x="${x}" y="${y - 9}" width="26" height="18" fill="${c}" stroke="${INK}" stroke-width="1.5"/>`;
const C1 = '#f3b23c', C2 = '#5aa7e0';

/* L20-Q2、Q3：四年甲班最喜歡的運動人數（直條圖，每格 1 人，縱軸隔一格標一個數字） */
figs['mk4-20-a'] = (() => {
  const items = ['籃球', '躲避球', '跳繩', '游泳', '羽球'], n = [9, 11, 4, 6, 5];
  const fr = frame({ w: 520, h: 400, title: '四年甲班最喜歡的運動人數長條圖', yUnit: '（人）', xUnit: '（運動）', labels: items, y0: 0, y1: 12, step: 1, every: 2 });
  let b = fr.body;
  n.forEach((v, i) => { b += bar(fr.X(i) - 26, fr.Y(v), 52, fr.bottom, C2); });
  return svg(520, 400, b);
})();

/* L20-Q5、Q6：圖書室上星期各類書借出的本數（橫條圖，橫軸每格 10 本） */
figs['mk4-20-b'] = (() => {
  const items = ['故事書', '科學書', '漫畫書', '傳記'], n = [80, 50, 65, 30], max = 90, step = 10;
  const W = 540, H = 360, L = 92, R = 46, T = 64, B = 62, rowH = (H - T - B) / items.length;
  const X = (v) => L + (v / max) * (W - L - R);
  let b = text(W / 2, 22, '圖書室上星期各類書借出本數長條圖', 'middle', 18);
  b += text(L - 8, 44, '（種類）', 'end', 14);
  for (let v = 0; v <= max; v += step) b += line(X(v), T - 6, X(v), H - B, GRID, 1) + text(X(v), H - B + 18, String(v), 'middle', 14);
  b += line(L, T - 6, L, H - B) + line(L, H - B, W - R + 14, H - B);
  b += text(W - 8, H - B + 40, '（本）', 'end', 14);
  items.forEach((s, i) => {
    const y = T + rowH * i + rowH * 0.22;
    b += `<rect x="${L}" y="${f(y)}" width="${f(X(n[i]) - L)}" height="${f(rowH * 0.56)}" fill="${C1}" stroke="${INK}" stroke-width="2"/>`;
    b += text(L - 8, y + rowH * 0.28, s, 'end', 15);
  });
  return svg(W, H, b);
})();

/* L21-Q2、Q3、Q4：小晴第 1～6 週一分鐘跳繩的次數（折線圖，0 到 60 省略，每格 2 下） */
figs['mk4-21-a'] = (() => {
  const weeks = [1, 2, 3, 4, 5, 6], n = [62, 66, 64, 70, 74, 73];
  const fr = frame({ w: 540, h: 400, title: '小晴一分鐘跳繩次數折線圖', yUnit: '（下）', xUnit: '（週）', labels: weeks.map((k) => `第 ${k} 週`), y0: 60, y1: 76, step: 2, skip: true });
  let b = fr.body;
  weeks.forEach((_, i) => { b += line(fr.X(i), fr.Y(76), fr.X(i), fr.bottom, GRID, 1); });
  b += `<polyline points="${n.map((v, i) => `${f(fr.X(i))},${f(fr.Y(v))}`).join(' ')}" fill="none" stroke="${RED}" stroke-width="3" stroke-linejoin="round"/>`;
  n.forEach((v, i) => { b += `<circle cx="${f(fr.X(i))}" cy="${f(fr.Y(v))}" r="5" fill="${RED}" stroke="#fff" stroke-width="1.5"/>`; });
  return svg(540, 400, b);
})();

/* L21-Q5：四年甲班、乙班三種回收物的重量（兩條並排的長條圖，每格 5 公斤） */
figs['mk4-21-b'] = (() => {
  const items = ['紙類', '寶特瓶', '鐵鋁罐'], A = [30, 20, 10], B = [25, 35, 15];
  const fr = frame({ w: 520, h: 420, title: '四年甲班和乙班資源回收量長條圖', yUnit: '（公斤）', xUnit: '（種類）', labels: items, y0: 0, y1: 40, step: 5 });
  let b = fr.body;
  items.forEach((_, i) => { b += bar(fr.X(i) - 40, fr.Y(A[i]), 40, fr.bottom, C1) + bar(fr.X(i), fr.Y(B[i]), 40, fr.bottom, C2); });
  b += legend(300, 44, [['甲班', boxKey(C1)], ['乙班', boxKey(C2)]], 100);
  return svg(520, 420, b);
})();

/* L21-Q6：園遊會三個攤位上午、下午賣出的杯數（疊在一起的長條圖：下段上午、上段下午，每格 10 杯） */
figs['mk4-21-c'] = (() => {
  const items = ['紅茶', '果汁', '豆漿'], AM = [40, 30, 50], PM = [30, 50, 10];
  const fr = frame({ w: 520, h: 420, title: '園遊會飲料攤賣出杯數長條圖', yUnit: '（杯）', xUnit: '（飲料）', labels: items, y0: 0, y1: 90, step: 10 });
  let b = fr.body;
  items.forEach((_, i) => { b += bar(fr.X(i) - 32, fr.Y(AM[i]), 64, fr.bottom, C1) + bar(fr.X(i) - 32, fr.Y(AM[i] + PM[i]), 64, fr.Y(AM[i]), C2); });
  b += legend(300, 44, [['上午', boxKey(C1)], ['下午', boxKey(C2)]], 100);
  return svg(520, 420, b);
})();

/* L21-Q7：小安和小平 5 次投籃練習的進球數（兩條折線，每格 1 球） */
figs['mk4-21-d'] = (() => {
  const times = [1, 2, 3, 4, 5], A = [4, 6, 5, 8, 9], B = [7, 6, 6, 5, 7];
  const fr = frame({ w: 540, h: 420, title: '小安和小平投籃進球數折線圖', yUnit: '（球）', xUnit: '（次）', labels: times.map((k) => `第 ${k} 次`), y0: 0, y1: 10, step: 1 });
  let b = fr.body;
  times.forEach((_, i) => { b += line(fr.X(i), fr.Y(10), fr.X(i), fr.bottom, GRID, 1); });
  const pts = (arr) => arr.map((v, i) => `${f(fr.X(i))},${f(fr.Y(v))}`).join(' ');
  b += `<polyline points="${pts(A)}" fill="none" stroke="${BLUE}" stroke-width="3" stroke-linejoin="round"/>`;
  b += `<polyline points="${pts(B)}" fill="none" stroke="#e0862a" stroke-width="3" stroke-linejoin="round" stroke-dasharray="9 5"/>`;
  // 第 2 次兩人都是 6 球：先畫方形（小平），再畫小一點的圓（小安），兩個記號都看得到
  B.forEach((v, i) => { b += `<rect x="${f(fr.X(i) - 7)}" y="${f(fr.Y(v) - 7)}" width="14" height="14" fill="#e0862a" stroke="#fff" stroke-width="1.5"/>`; });
  A.forEach((v, i) => { b += `<circle cx="${f(fr.X(i))}" cy="${f(fr.Y(v))}" r="5" fill="${BLUE}" stroke="#fff" stroke-width="1.5"/>`; });
  const key = (c, dash, sq) => (x, y) => line(x, y, x + 28, y, c, 3, dash ? 'stroke-dasharray="9 5"' : '')
    + (sq ? `<rect x="${x + 8}" y="${y - 6}" width="12" height="12" fill="${c}"/>` : `<circle cx="${x + 14}" cy="${y}" r="5" fill="${c}"/>`);
  b += legend(300, 44, [['小安', key(BLUE, false, false)], ['小平', key('#e0862a', true, true)]], 100);
  return svg(540, 420, b);
})();


for (const [name, content] of Object.entries(figs)) writeFileSync(new URL(name + '.svg', OUT), content);
console.log('已產生 ' + Object.keys(figs).length + ' 張圖：' + Object.keys(figs).join('、'));
