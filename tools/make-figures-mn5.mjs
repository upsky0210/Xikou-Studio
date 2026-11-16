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

/* ---------- 幾何圖 ---------- */
const FILL = '#ffe9a8', FILL2 = '#cfe6fb';
const poly = (pts, fill = FILL) => `<polygon points="${pts.map(([x, y]) => `${f(x)},${f(y)}`).join(' ')}" fill="${fill}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
const dash = (x1, y1, x2, y2, c = '#d6452f', w = 2.5) => line(x1, y1, x2, y2, c, w, 'stroke-dasharray="8 6"');
const tag = (x, y, s, size = 20) => text(x, y, s, 'middle', size);
const badge = (x, y, s) => `<circle cx="${f(x)}" cy="${f(y)}" r="14" fill="#fff" stroke="#d6452f" stroke-width="2"/>` + text(x, y + 1, s, 'middle', 16, '#d6452f');

/* L09：五邊形從頂點 A 連到 C、D，分成 3 個三角形 */
figs['mn5-09-a'] = (() => {
  const A = [240, 44], B = [400, 150], C = [340, 316], D = [140, 316], E = [80, 150];
  let b = poly([A, B, C, D, E]);
  b += dash(...A, ...C) + dash(...A, ...D);
  const mid = (...ps) => [ps.reduce((a, q) => a + q[0], 0) / ps.length, ps.reduce((a, q) => a + q[1], 0) / ps.length];
  [[A, B, C], [A, C, D], [A, D, E]].forEach((t, i) => { const [x, y] = mid(...t); b += badge(x, y, String(i + 1)); });
  b += tag(240, 22, 'A') + tag(422, 148, 'B') + tag(356, 338, 'C') + tag(124, 338, 'D') + tag(58, 148, 'E');
  return svg(480, 360, b);
})();

/* L12：四個圖形，哪一個不是線對稱圖形（甲等腰三角形、乙平行四邊形、丙長方形、丁等腰梯形） */
figs['mn5-12-a'] = (() => {
  let b = '';
  b += poly([[85, 40], [30, 160], [140, 160]]);
  b += poly([[215, 60], [325, 60], [285, 160], [175, 160]], FILL2);
  b += poly([[365, 66], [490, 66], [490, 160], [365, 160]]);
  b += poly([[560, 60], [620, 60], [655, 160], [525, 160]], FILL2);
  ['甲', '乙', '丙', '丁'].forEach((s, i) => { b += tag([85, 250, 427, 590][i], 190, s); });
  return svg(680, 214, b);
})();

/* L12：長方形上的四條虛線，哪幾條是對稱軸 */
figs['mn5-12-b'] = (() => {
  const x0 = 70, y0 = 60, w = 360, h = 200;
  let b = poly([[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]]);
  b += dash(x0 + w / 2, y0 - 22, x0 + w / 2, y0 + h + 22) + badge(x0 + w / 2, y0 - 38, '1');
  b += dash(x0 - 14, y0 - 8, x0 + w + 14, y0 + h + 8) + badge(x0 + w + 30, y0 + h + 18, '2');
  b += dash(x0 - 22, y0 + h / 2, x0 + w + 22, y0 + h / 2) + badge(x0 + w + 40, y0 + h / 2, '3');
  b += dash(x0 + 70, y0 - 22, x0 + 70, y0 + h + 22) + badge(x0 + 70, y0 - 38, '4');
  return svg(500, 300, b);
})();

/* L13：左右對稱的六邊形 ABCDEF，對稱軸是直線 AD */
figs['mn5-13-a'] = (() => {
  const A = [220, 50], B = [340, 120], C = [310, 260], D = [220, 330], E = [130, 260], F = [100, 120];
  let b = poly([A, B, C, D, E, F]);
  b += dash(220, 20, 220, 362);
  b += tag(238, 34, 'A') + tag(362, 114, 'B') + tag(332, 270, 'C') + tag(238, 348, 'D') + tag(108, 270, 'E') + tag(78, 114, 'F');
  b += text(228, 372, '對稱軸', 'start', 14, '#d6452f');
  return svg(440, 386, b);
})();

/* L13：方格紙上找點 P 的對稱點（對稱軸在第 6 條直格線；P 在左 3 格、第 2 列） */
figs['mn5-13-b'] = (() => {
  const cell = 36, cols = 12, rows = 6, x0 = 36, y0 = 44, ax = 6;
  const X = (c) => x0 + c * cell, Y = (r) => y0 + r * cell;
  let b = '';
  for (let c = 0; c <= cols; c++) b += line(X(c), Y(0), X(c), Y(rows), GRID, 1.2);
  for (let r = 0; r <= rows; r++) b += line(X(0), Y(r), X(cols), Y(r), GRID, 1.2);
  b += line(X(ax), Y(0) - 12, X(ax), Y(rows) + 12, '#d6452f', 4);
  b += text(X(ax), Y(0) - 26, '對稱軸', 'middle', 15, '#d6452f');
  const dot = (c, r, label, color) => `<circle cx="${X(c)}" cy="${Y(r)}" r="7" fill="${color}" stroke="#fff" stroke-width="1.5"/>` + text(X(c) + 6, Y(r) - 17, label, 'middle', 18, color);
  b += dot(ax - 3, 2, 'P', '#2b2b2b');
  b += dot(ax + 3, 2, '甲', '#2f6fd0') + dot(ax + 3, 4, '乙', '#2f6fd0') + dot(ax + 2, 2, '丙', '#2f6fd0') + dot(ax + 5, 2, '丁', '#2f6fd0');
  return svg(X(cols) + 36, Y(rows) + 30, b);
})();

/* ---------- 單元八：面積 ---------- */
const RED = '#d6452f', BLUE = '#2f6fd0', ROAD = '#c9c9c9', GREEN = '#cdeac0';
// 直角記號：頂點 (x,y)，沿 (ux,uy)、(vx,vy) 兩個方向各走 s
const rt = (x, y, ux, uy, vx, vy, s = 12, c = RED) => `<polyline points="${f(x + ux * s)},${f(y + uy * s)} ${f(x + ux * s + vx * s)},${f(y + uy * s + vy * s)} ${f(x + vx * s)},${f(y + vy * s)}" fill="none" stroke="${c}" stroke-width="2"/>`;
const unitNote = (x, y, u) => text(x, y, `（單位：${u}）`, 'end', 15);

/* L19-Q1：平行四邊形，底 12、高 5、斜邊 7（每 1 公分畫 30） */
figs['mn5-19-a'] = (() => {
  const base = 12, h = 5, side = 7, s = 30, off = Math.sqrt(side * side - h * h) * s;
  const x0 = 70, yb = 220, yt = yb - h * s;
  let b = poly([[x0, yb], [x0 + base * s, yb], [x0 + base * s + off, yt], [x0 + off, yt]]);
  b += dash(x0 + off, yt, x0 + off, yb) + rt(x0 + off, yb, 1, 0, 0, -1);
  b += tag(x0 + base * s / 2, yb + 24, `${base} cm`, 18) + text(x0 + off / 2 - 12, (yb + yt) / 2, `${side} cm`, 'end', 18) + text(x0 + off + 10, (yb + yt) / 2, `${h} cm`, 'start', 18, RED);
  return svg(x0 + base * s + off + 40, 270, b);
})();

/* L19-Q2：鈍角三角形，底 6、高 8（畫在外面）、斜邊 10（每 1 公分畫 26） */
figs['mn5-19-b'] = (() => {
  const base = 6, h = 8, side = 10, s = 26, off = Math.sqrt(side * side - h * h) * s;
  const xf = 80, yb = 270, A = [xf, yb - h * s], B = [xf + off, yb], C = [xf + off + base * s, yb];
  let b = poly([A, B, C]);
  b += dash(...A, xf, yb) + dash(xf, yb, ...B, RED, 2) + rt(xf, yb, 1, 0, 0, -1);
  b += tag((B[0] + C[0]) / 2, yb + 24, `${base} cm`, 18) + text(xf - 10, (A[1] + yb) / 2, `${h} cm`, 'end', 18, RED) + text(xf + off * 0.42, yb - 34, `${side} cm`, 'middle', 18);
  return svg(C[0] + 40, 310, b);
})();

/* L19-Q4：兩條平行線之間，底都是 4、高都是 5 的三個三角形（每 1 公分畫 30） */
figs['mn5-19-c'] = (() => {
  const base = 4, h = 5, s = 30, yb = 230, yt = yb - h * s, W = 720;
  let b = dash(20, yt, W - 20, yt, '#888', 2) + dash(20, yb, W - 20, yb, '#888', 2);
  const tri = [[130, 130 + base * s / 2, '甲', FILL], [300, 300 + base * s, '乙', FILL2], [470, 470 + base * s + 100, '丙', FILL]];
  for (const [x, ax, name, c] of tri) {
    b += poly([[x, yb], [x + base * s, yb], [ax, yt]], c);
    b += tag(x + base * s / 2, yb + 24, `${base} cm`, 21) + tag(x + base * s / 2, yb + 54, name, 24);
  }
  b += line(34, yt, 34, yb, RED, 2) + line(26, yt, 42, yt, RED, 2) + line(26, yb, 42, yb, RED, 2) + text(100, (yt + yb) / 2, `${h} cm`, 'end', 21, RED);
  return svg(W, 306, b);
})();

/* L19-Q7：等腰三角形 ABC，BC＝30、AB＝AC＝25；A 到 BC 的高 20、B 到 AC 的高 24（每 1 畫 10） */
figs['mn5-19-d'] = (() => {
  const bc = 30, leg = 25, s = 10, hA = Math.sqrt(leg * leg - (bc / 2) ** 2), hB = bc * hA / leg;   // 20、24
  const B = [90, 300], C = [B[0] + bc * s, 300], A = [B[0] + bc * s / 2, 300 - hA * s];
  const t = Math.sqrt(bc * bc - hB * hB) / leg, D = [C[0] + (A[0] - C[0]) * t, C[1] + (A[1] - C[1]) * t];   // B 到 AC 的垂足
  const ux = (A[0] - C[0]) / (leg * s), uy = (A[1] - C[1]) / (leg * s), vx = (B[0] - D[0]) / (hB * s), vy = (B[1] - D[1]) / (hB * s);
  let b = poly([A, B, C]);
  b += dash(...A, A[0], 300) + rt(A[0], 300, 1, 0, 0, -1);
  b += dash(...B, ...D, BLUE) + rt(D[0], D[1], ux, uy, vx, vy, 12, BLUE);
  b += tag(A[0], A[1] - 18, 'A') + tag(B[0] - 18, B[1] + 4, 'B') + tag(C[0] + 18, C[1] + 4, 'C');
  b += tag((B[0] + C[0]) / 2 + 60, 322, String(bc), 18) + text((A[0] + C[0]) / 2 + 22, (A[1] + C[1]) / 2 - 30, String(leg), 'start', 18) + text((A[0] + B[0]) / 2 - 14, (A[1] + B[1]) / 2 - 8, String(leg), 'end', 18);
  b += text(A[0] - 8, 250, String(f(hA)), 'end', 18, RED) + text(B[0] + 78, B[1] - 26, String(f(hB)), 'middle', 18, BLUE);
  b += unitNote(470, 24, '公分');
  return svg(480, 344, b);
})();

/* L20-Q1：梯形，上底 6、下底 10、高 4、左邊的腰 5（每 1 公分畫 40） */
figs['mn5-20-a'] = (() => {
  const top = 6, bot = 10, h = 4, side = 5, s = 40, off = Math.sqrt(side * side - h * h) * s;
  const x0 = 70, yb = 240, yt = yb - h * s;
  let b = poly([[x0, yb], [x0 + bot * s, yb], [x0 + off + top * s, yt], [x0 + off, yt]]);
  b += dash(x0 + off, yt, x0 + off, yb) + rt(x0 + off, yb, 1, 0, 0, -1);
  b += tag(x0 + off + top * s / 2, yt - 20, `${top} cm`, 18) + tag(x0 + bot * s / 2, yb + 24, `${bot} cm`, 18);
  b += text(x0 + off / 2 - 12, (yb + yt) / 2, `${side} cm`, 'end', 18) + text(x0 + off + 10, (yb + yt) / 2, `${h} cm`, 'start', 18, RED);
  return svg(x0 + bot * s + 40, 284, b);
})();

/* L20-Q3：橫躺的梯形（左、右兩邊平行），哪一條是高 */
figs['mn5-20-b'] = (() => {
  const P = [120, 100], Q = [120, 220], R = [400, 280], S = [400, 50];   // 左上、左下、右下、右上
  let b = poly([P, Q, R, S]);
  const yTop = (x) => P[1] + (S[1] - P[1]) * (x - P[0]) / (S[0] - P[0]), yBot = (x) => Q[1] + (R[1] - Q[1]) * (x - Q[0]) / (R[0] - Q[0]);
  b += dash(P[0], 160, S[0], 160) + rt(P[0], 160, 1, 0, 0, -1) + rt(S[0], 160, -1, 0, 0, -1) + badge(96, 160, '甲');
  b += badge(260, yTop(260) - 22, '乙');
  b += dash(300, yTop(300), 300, yBot(300), BLUE) + badge(300, yBot(300) + 22, '丙');
  b += dash(...P, ...R, '#2e9e5b') + badge(R[0] + 22, R[1] + 14, '丁');
  return svg(470, 330, b);
})();

/* L20-Q4：菱形，對角線 14 和 10（每 1 公分畫 24） */
figs['mn5-20-c'] = (() => {
  const d1 = 14, d2 = 10, s = 24, cx = 220, cy = 160;
  let b = poly([[cx - d1 * s / 2, cy], [cx, cy - d2 * s / 2], [cx + d1 * s / 2, cy], [cx, cy + d2 * s / 2]]);
  b += dash(cx - d1 * s / 2, cy, cx + d1 * s / 2, cy) + dash(cx, cy - d2 * s / 2, cx, cy + d2 * s / 2, BLUE) + rt(cx, cy, 1, 0, 0, -1);
  b += text(cx + 84, cy + 18, `${d1} cm`, 'middle', 18, RED) + text(cx - 10, cy - 62, `${d2} cm`, 'end', 18, BLUE);
  return svg(440, 320, b);
})();

/* L20-Q5：四邊形 ABCD，對角線 AC＝20，B、D 到 AC 的高是 6 和 9（每 1 公分畫 20） */
figs['mn5-20-d'] = (() => {
  const ac = 20, h1 = 6, h2 = 9, s = 20, A = [70, 170], C = [70 + ac * s, 170], B = [210, 170 - h1 * s], D = [310, 170 + h2 * s];
  let b = poly([A, B, C, D]) + line(...A, ...C, INK, 2);
  b += dash(...B, B[0], 170) + rt(B[0], 170, 1, 0, 0, -1) + dash(...D, D[0], 170, BLUE) + rt(D[0], 170, 1, 0, 0, 1, 12, BLUE);
  b += tag(A[0] - 18, A[1], 'A') + tag(B[0], B[1] - 18, 'B') + tag(C[0] + 18, C[1], 'C') + tag(D[0], D[1] + 20, 'D');
  b += text(C[0] - 70, 156, `${ac} cm`, 'middle', 18) + text(B[0] - 10, 115, `${h1} cm`, 'end', 18, RED) + text(D[0] + 10, 270, `${h2} cm`, 'start', 18, BLUE);
  return svg(520, 384, b);
})();

/* L20-Q6：梯形土地（上底 20、下底 30、高 16）開一條寬 4 的平行四邊形道路（每 1 公尺畫 14） */
figs['mn5-20-e'] = (() => {
  const top = 20, bot = 30, h = 16, road = 4, s = 14, x0 = 60, yb = 310, yt = yb - h * s, xt = x0 + 5 * s;
  let b = poly([[x0, yb], [x0 + bot * s, yb], [xt + top * s, yt], [xt, yt]], GREEN);
  const rb = x0 + 12 * s, rtx = xt + 9 * s;
  b += poly([[rb, yb], [rb + road * s, yb], [rtx + road * s, yt], [rtx, yt]], ROAD);
  b += tag(rb + road * s / 2 + 22, (yb + yt) / 2, '道路', 16);
  const brace = (x1, x2, y, label, up) => line(x1, y, x2, y, INK, 1.5) + line(x1, y - 5, x1, y + 5, INK, 1.5) + line(x2, y - 5, x2, y + 5, INK, 1.5) + tag((x1 + x2) / 2, y + (up ? -14 : 16), label, 16);
  b += brace(xt, xt + top * s, yt - 34, String(top), true) + brace(rtx, rtx + road * s, yt - 12, String(road), true);
  b += brace(x0, x0 + bot * s, yb + 36, String(bot), false) + brace(rb, rb + road * s, yb + 12, String(road), false);
  b += dash(xt + top * s, yt, xt + top * s, yb) + rt(xt + top * s, yb, -1, 0, 0, -1) + text(xt + top * s - 10, (yb + yt) / 2 + 40, String(h), 'end', 18, RED);
  b += unitNote(x0 + bot * s + 30, 22, '公尺');
  return svg(x0 + bot * s + 40, 372, b);
})();

/* L20-Q7：長方形土地 24×15，兩條寬 3 的道路（一條長方形、一條平行四邊形）（每 1 公尺畫 18） */
figs['mn5-20-f'] = (() => {
  const L = 24, W = 15, road = 3, s = 18, x0 = 70, y0 = 60, x1 = x0 + L * s, y1 = y0 + W * s;
  let b = poly([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], GREEN);
  const ry = y0 + 6 * s, tx = x0 + 8 * s, bx = x0 + 12 * s;
  b += `<rect x="${x0}" y="${ry}" width="${L * s}" height="${road * s}" fill="${ROAD}"/>`;
  b += `<polygon points="${tx},${y0} ${tx + road * s},${y0} ${bx + road * s},${y1} ${bx},${y1}" fill="${ROAD}"/>`;
  b += line(x0, ry, x1, ry, INK, 1.5) + line(x0, ry + road * s, x1, ry + road * s, INK, 1.5) + line(tx, y0, bx, y1, INK, 1.5) + line(tx + road * s, y0, bx + road * s, y1, INK, 1.5);
  b += `<rect x="${x0}" y="${y0}" width="${L * s}" height="${W * s}" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
  const brace = (xa, ya, xb, yb, label, dx, dy) => line(xa, ya, xb, yb, INK, 1.5) + tag((xa + xb) / 2 + dx, (ya + yb) / 2 + dy, label, 17);
  b += brace(x0, y1 + 14, x1, y1 + 14, String(L), 0, 16) + brace(x0 - 14, y0, x0 - 14, y1, String(W), -18, 0);
  b += brace(tx, y0 - 12, tx + road * s, y0 - 12, String(road), 0, -14) + brace(x1 + 12, ry, x1 + 12, ry + road * s, String(road), 16, 0);
  b += unitNote(x1 + 30, 20, '公尺');
  return svg(x1 + 44, y1 + 50, b);
})();

/* ---------- 單元十：正方體和長方體 ---------- */
// 斜投影的方塊：前面左上角 (x,y)、寬 w、高 h、往右上退 (dx,dy)。hidden＝true 畫出看不到的邊（虛線）
function box(x, y, w, h, dx, dy, hidden, c1 = FILL2, c2 = '#e6f2fd', c3 = '#a9d0f3') {
  const F = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], K = F.map(([a, b2]) => [a + dx, b2 - dy]);
  let b = poly([F[0], F[1], K[1], K[0]], c2) + poly([F[1], F[2], K[2], K[1]], c3) + poly(F, c1);
  if (hidden) b += [[K[3], K[0]], [K[3], K[2]], [K[3], F[3]]].map(([p, q]) => dash(...p, ...q, INK, 2)).join('');
  return { body: b, F, K };
}

/* L22-Q2：正方體的視圖和透視圖 */
figs['mn5-22-a'] = (() => {
  const a = box(60, 90, 120, 120, 52, 52, false), c = box(330, 90, 120, 120, 52, 52, true);
  return svg(560, 270, a.body + c.body + tag(146, 244, '視圖') + tag(416, 244, '透視圖'));
})();

/* L22-Q3～Q5：長方體 ABCD－EFGH 的透視圖（上面 ABCD：A 左後、D 右後、B 左前、C 右前；E、F、G、H 在 A、B、C、D 的正下方） */
figs['mn5-22-b'] = (() => {
  const c = box(90, 110, 280, 140, 76, 58, true);
  const [B, C, G, F] = c.F, [A, D, H, E] = c.K;
  let b = c.body;
  b += tag(A[0] - 14, A[1] - 12, 'A') + tag(D[0] + 16, D[1] - 10, 'D') + tag(B[0] - 18, B[1], 'B') + tag(C[0] - 16, C[1] + 20, 'C');
  b += tag(E[0] + 18, E[1] - 14, 'E') + tag(H[0] + 18, H[1] + 6, 'H') + tag(F[0] - 16, F[1] + 12, 'F') + tag(G[0] + 6, G[1] + 20, 'G');
  return svg(490, 290, b);
})();

/* 展開圖能不能摺成正方體：讓骰子在格子上滾，六格壓到的面都不一樣才行 */
function foldsToCube(cells) {
  const key = (c) => c.join(','), set = new Set(cells.map(key)), seen = new Map([[key(cells[0]), [0, 1, 2, 3, 4, 5]]]);   // [下, 上, 北, 南, 東, 西]
  const roll = { '1,0': ([d, u, n, s, e, w]) => [e, w, n, s, u, d], '-1,0': ([d, u, n, s, e, w]) => [w, e, n, s, d, u], '0,1': ([d, u, n, s, e, w]) => [s, n, d, u, e, w], '0,-1': ([d, u, n, s, e, w]) => [n, s, u, d, e, w] };
  const todo = [cells[0]];
  while (todo.length) {
    const c = todo.pop();
    for (const [k, fn] of Object.entries(roll)) {
      const [dx, dy] = k.split(',').map(Number), n = [c[0] + dx, c[1] + dy];
      if (set.has(key(n)) && !seen.has(key(n))) { seen.set(key(n), fn(seen.get(key(c)))); todo.push(n); }
    }
  }
  return seen.size === 6 && new Set([...seen.values()].map((o) => o[0])).size === 6;
}

/* L23-Q1：四個展開圖，只有丁不能摺成正方體 */
figs['mn5-23-a'] = (() => {
  const nets = {
    甲: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]],        // 十字形（1-4-1）
    乙: [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2], [3, 2]],        // 1-3-2
    丙: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]],        // 階梯形（2-2-2）
    丁: [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1], [3, 1]],        // 一排 4 個，另外 2 個在同一側
  };
  const expect = { 甲: true, 乙: true, 丙: true, 丁: false };
  for (const [k, cells] of Object.entries(nets)) if (foldsToCube(cells) !== expect[k]) throw new Error(`mn5-23-a：${k} 能不能摺成正方體和題目不一致`);
  const s = 36, ox = { 甲: 30, 乙: 180, 丙: 366, 丁: 552 };
  let b = '';
  for (const [k, cells] of Object.entries(nets)) {
    const top = k === '甲' ? 30 : 48;
    for (const [cx, cy] of cells) b += `<rect x="${ox[k] + cx * s}" y="${top + cy * s}" width="${s}" height="${s}" fill="${FILL}" stroke="${INK}" stroke-width="2"/>`;
    const wCells = Math.max(...cells.map((c) => c[0])) + 1;
    b += tag(ox[k] + wCells * s / 2, 206, k, 26);
  }
  return svg(726, 230, b);
})();

/* L23-Q2：長方體（長 5、寬 2、高 3）的展開圖：一排 A、C、D、E 四個側面，F 在 C 的上面、B 在 C 的下面 */
figs['mn5-23-b'] = (() => {
  const L = 5, Wd = 2, H = 3, s = 26, x0 = 40, y0 = 30 + Wd * s;
  const rects = [['A', 0, 0, Wd, H], ['C', Wd, 0, L, H], ['D', Wd + L, 0, Wd, H], ['E', Wd + L + Wd, 0, L, H], ['F', Wd, -Wd, L, Wd], ['B', Wd, H, L, Wd]];
  let b = '';
  for (const [name, cx, cy, w, h] of rects) {
    b += `<rect x="${x0 + cx * s}" y="${y0 + cy * s}" width="${w * s}" height="${h * s}" fill="${FILL2}" stroke="${INK}" stroke-width="2"/>`;
    b += tag(x0 + (cx + w / 2) * s, y0 + (cy + h / 2) * s, name);
  }
  return svg(x0 * 2 + (2 * L + 2 * Wd) * s, y0 + (H + Wd) * s + 30, b);
})();

for (const [name, content] of Object.entries(figs)) writeFileSync(new URL(name + '.svg', OUT), content);
console.log('已產生 ' + Object.keys(figs).length + ' 張圖：' + Object.keys(figs).join('、'));
