// 產生三上數學（mk3）題目用的圖（SVG）：node tools/make-figures-mk3.mjs
// 圖上的每個角度、長度都從下面的資料算出來，不手繪；改了題目的數字，這裡也要跟著改，再跑一次。
// 輸出到 data/fig/，檔名 mk3-<關卡>-<代號>.svg。圖用 <img> 顯示，吃不到網頁字型，所以用系統字型。
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
const line = (x1, y1, x2, y2, stroke = INK, w = 3, extra = 'stroke-linecap="round"') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;
// 從 (cx, cy) 往「從右邊算起、逆時針 deg 度」的方向走 r
const polar = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))];
// 角的弧線：以 (cx, cy) 為頂點，從 a 度到 b 度（a < b，逆時針），半徑 r
const arc = (cx, cy, r, a, b, stroke = INK, w = 2) => {
  const [x1, y1] = polar(cx, cy, r, a), [x2, y2] = polar(cx, cy, r, b);
  return `<path d="M ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${b - a > 180 ? 1 : 0} 0 ${f(x2)} ${f(y2)}" fill="none" stroke="${stroke}" stroke-width="${w}"/>`;
};
// 一個角：頂點 (cx, cy)，兩條邊的方向 a、b（度），邊長 ra、rb；arcR 給了就畫弧線
const angle = (cx, cy, a, b, ra, rb, color = INK, arcR = 0, w = 3.5) => {
  const [x1, y1] = polar(cx, cy, ra, a), [x2, y2] = polar(cx, cy, rb, b);
  return line(cx, cy, x1, y1, color, w) + line(cx, cy, x2, y2, color, w) + (arcR ? arc(cx, cy, arcR, a, b, color, 2) : '');
};
// 直角記號：頂點 (cx, cy)，兩條邊的方向 a 和 a+90
const rightMark = (cx, cy, a, s = 13, color = INK) => {
  const [x1, y1] = polar(cx, cy, s, a), [x3, y3] = polar(cx, cy, s, a + 90), [x2, y2] = polar(x1, y1, s, a + 90);
  return `<path d="M ${f(x1)} ${f(y1)} L ${f(x2)} ${f(y2)} L ${f(x3)} ${f(y3)}" fill="none" stroke="${color}" stroke-width="1.8"/>`;
};
// 方格紙：左上角 (x0, y0)，cols×rows 格，每格 c
const grid = (x0, y0, cols, rows, c) => {
  let b = '';
  for (let i = 0; i <= cols; i++) b += line(x0 + i * c, y0, x0 + i * c, y0 + rows * c, GRID, 1, '');
  for (let j = 0; j <= rows; j++) b += line(x0, y0 + j * c, x0 + cols * c, y0 + j * c, GRID, 1, '');
  return b;
};
const angleAt = (p, q, r) => {   // 頂點 q，兩邊往 p 和 r，回傳度數
  const a = [p[0] - q[0], p[1] - q[1]], b = [r[0] - q[0], r[1] - q[1]];
  return (Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180) / Math.PI;
};
const dirOf = (q, p) => (Math.atan2(-(p[1] - q[1]), p[0] - q[0]) * 180) / Math.PI;   // 從 q 看 p 的方向（度，逆時針）

const figs = {};
const report = [];   // 印出每張圖實際的角度，寫題目時對照

/* L10-Q2：哪一個是角？甲：兩條直線沒有接在一起；乙：一條直線和一條彎線；丙：兩條直線接在一起（角）；丁：兩條彎線 */
figs['mk3-10-a'] = (() => {
  const W = 660, H = 210, y = 150;
  let b = '';
  // 甲：兩條直線沒接在一起
  b += line(40, y, 72, 50) + line(98, 50, 130, y);
  // 乙：一條直線、一條彎線，接在一起
  b += line(200, y, 300, y) + `<path d="M 200 ${y} Q 262 132 280 46" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  // 丙：兩條直線接在一起，開口朝下
  b += angle(410, 48, 250, 318, 108, 120, INK, 0, 3);
  // 丁：兩條彎線接成尖尖的
  b += `<path d="M 575 46 Q 520 80 530 ${y}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`
    + `<path d="M 575 46 Q 630 80 620 ${y}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  ['甲', '乙', '丙', '丁'].forEach((s, i) => { b += text([85, 250, 415, 575][i], 188, s, 'middle', 18); });
  return svg(W, H, b);
})();

/* L10-Q3：方格紙上的∠1 和∠2，張開的程度一樣（都是一條邊沿著格線、另一條邊沿著方格的對角），∠2 的邊比較長、弧線也畫得比較大 */
figs['mk3-10-b'] = (() => {
  const c = 34, x0 = 20, y0 = 16, cols = 12, rows = 6, P = (gx, gy) => [x0 + gx * c, y0 + gy * c];
  let b = grid(x0, y0, cols, rows, c);
  const draw = (v, h, d, color, arcR, label) => {
    const V = P(...v), A = P(...h), B = P(...d);
    b += line(...V, ...A, color, 3.5) + line(...V, ...B, color, 3.5) + arc(...V, arcR, 0, 45, color, 2);
    const [lx, ly] = polar(...V, arcR + 15, 22);
    b += text(lx, ly, label, 'middle', 16, color);
    report.push(`mk3-10-b ∠${label}＝${f(angleAt(A, V, B))} 度`);
  };
  draw([1, 5], [3, 5], [3, 3], BLUE, 20, '1');     // ∠1：橫的邊 2 格、斜的邊走 2 格的對角
  draw([5, 5], [10, 5], [9, 1], RED, 46, '2');     // ∠2：橫的邊 5 格、斜的邊走 4 格的對角
  return svg(x0 * 2 + cols * c, y0 * 2 + rows * c, b);
})();

/* L10-Q4：∠1（藍，55 度，邊短）和∠2（紅，30 度，邊長）頂點對齊、下面的邊對齊，疊在一起 */
figs['mk3-10-c'] = (() => {
  const W = 380, H = 230, cx = 40, cy = 190, A1 = 55, A2 = 30, R1 = 170, R2 = 300;
  let b = '';
  b += line(cx, cy, cx + R2, cy, RED, 7) + line(...[cx, cy], ...polar(cx, cy, R2, A2), RED, 3.5);
  b += line(cx, cy, cx + R1, cy, BLUE, 3) + line(...[cx, cy], ...polar(cx, cy, R1, A1), BLUE, 3.5);
  const [x1, y1] = polar(cx, cy, R1 + 22, A1), [x2, y2] = polar(cx, cy, R2 + 6, A2);
  b += text(x1 + 6, y1, '∠1', 'middle', 17, BLUE) + text(x2 + 4, y2 - 14, '∠2', 'middle', 17, RED);
  b += `<circle cx="${cx}" cy="${cy}" r="5" fill="${INK}"/>`;
  report.push(`mk3-10-c ∠1＝${A1} 度、∠2＝${A2} 度`);
  return svg(W, H, b);
})();

/* L10-Q6：三把扇子。甲：扇骨最長、角最小；乙：扇骨最短、角最大；丙：在中間 */
figs['mk3-10-d'] = (() => {
  const fans = [['甲', 105, 150, 40], ['乙', 320, 80, 110], ['丙', 560, 120, 75]];   // [名稱, 中心 x, 扇骨長, 打開的角]
  const W = 680, H = 232, y = 180;
  let b = '';
  for (const [name, cx, r, a] of fans) {
    const s = 90 - a / 2, e = 90 + a / 2, [x1, y1] = polar(cx, y, r, s), [x2, y2] = polar(cx, y, r, e);
    b += `<path d="M ${cx} ${y} L ${f(x1)} ${f(y1)} A ${r} ${r} 0 0 0 ${f(x2)} ${f(y2)} Z" fill="${FILL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
    const n = Math.round(a / 10);
    for (let k = 1; k < n; k++) { const [x, yy] = polar(cx, y, r, s + (a * k) / n); b += line(cx, y, x, yy, '#c9a24a', 1.2); }
    b += `<circle cx="${cx}" cy="${y}" r="4.5" fill="${INK}"/>` + text(cx, y + 30, name, 'middle', 18);
    report.push(`mk3-10-d ${name}：打開 ${a} 度、扇骨 ${r}、扇面大小 ${Math.round((r * r * a) / 1000)}`);
  }
  return svg(W, H, b);
})();

/* L10-Q7：四邊形色紙的四個角。∠1 最小（兩邊最長）、∠2 最大 */
figs['mk3-10-e'] = (() => {
  const A = [50, 185], D = [200, 55], C = [350, 45], B = [420, 185];   // 依序是∠1、∠2、∠3、∠4 的頂點
  const pts = [A, D, C, B];
  let b = `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="${FILL2}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
  pts.forEach((q, i) => {
    const p = pts[(i + 3) % 4], r = pts[(i + 1) % 4];
    let d1 = dirOf(q, p), d2 = dirOf(q, r);
    if (d1 > d2) [d1, d2] = [d2, d1];
    if (d2 - d1 > 180) [d1, d2] = [d2, d1 + 360];
    const deg = angleAt(p, q, r), R = 30;
    b += arc(...q, R, d1, d2, RED, 2);
    const [lx, ly] = polar(...q, deg < 80 ? R + 22 : R - 13, (d1 + d2) / 2);
    b += text(lx, ly, String(i + 1), 'middle', 15, RED);
    report.push(`mk3-10-e ∠${i + 1}＝${f(deg)} 度，兩邊長 ${Math.round(Math.hypot(p[0] - q[0], p[1] - q[1]))}、${Math.round(Math.hypot(r[0] - q[0], r[1] - q[1]))}`);
  });
  return svg(470, 230, b);
})();

/* L11-Q2：四個角。甲：直角（斜放，有直角記號）；乙：銳角、邊很長；丙：鈍角、邊很短；丁：銳角 */
figs['mk3-11-a'] = (() => {
  const W = 700, H = 215;
  let b = '';
  b += angle(60, 150, 20, 110, 105, 105) + rightMark(60, 150, 20);                 // 甲：90 度
  b += angle(215, 160, 0, 40, 150, 150);                                           // 乙：40 度
  b += angle(455, 150, 0, 125, 62, 62);                                            // 丙：125 度
  b += angle(585, 160, 0, 65, 100, 100);                                           // 丁：65 度
  ['甲', '乙', '丙', '丁'].forEach((s, i) => { b += text([85, 290, 450, 635][i], 192, s, 'middle', 18); });
  report.push('mk3-11-a 甲 90、乙 40、丙 125、丁 65 度');
  return svg(W, H, b);
})();

/* L11-Q6：四個四邊形，標出每條邊的長度（1 公分畫 30），直角做上直角記號。
   甲：長方形 4×2；乙：斜放的正方形 3；丙：四條邊都是 3 但沒有直角；丁：有 2 個直角的四邊形（上 2、左 3、下 6、右 5） */
figs['mk3-11-b'] = (() => {
  const U = 30, W = 600, H = 470;
  let b = '';
  const shape = (name, pts, lens, cx, cy) => {
    const mx = (Math.min(...pts.map((p) => p[0])) + Math.max(...pts.map((p) => p[0]))) / 2, my = (Math.min(...pts.map((p) => p[1])) + Math.max(...pts.map((p) => p[1]))) / 2;
    const P = pts.map(([x, y]) => [x - mx + cx, y - my + cy]);
    b += `<polygon points="${P.map((p) => p.map(f).join(',')).join(' ')}" fill="${FILL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
    const n = P.length, rights = [];
    P.forEach((q, i) => {
      const p = P[(i + n - 1) % n], r = P[(i + 1) % n];
      if (Math.abs(angleAt(p, q, r) - 90) < 0.01) {
        let d1 = dirOf(q, p), d2 = dirOf(q, r);
        const a = ((d2 - d1 + 360) % 360) === 90 ? d1 : d2;   // 從 a 逆時針轉 90 度是另一條邊
        b += rightMark(...q, a, 11);
        rights.push(i + 1);
      }
      // 這條邊（q 到 r）的長度，寫在圖形外面
      const m = [(q[0] + r[0]) / 2, (q[1] + r[1]) / 2], len = Math.hypot(r[0] - q[0], r[1] - q[1]);
      let nx = (r[1] - q[1]) / len, ny = -(r[0] - q[0]) / len;
      if ((m[0] + nx - cx) ** 2 + (m[1] + ny - cy) ** 2 < (m[0] - cx) ** 2 + (m[1] - cy) ** 2) { nx = -nx; ny = -ny; }
      const off = 15 + 20 * Math.abs(nx);
      if (Math.abs(len / U - lens[i]) > 0.01) throw new Error(`${name} 第 ${i + 1} 條邊畫出來是 ${len / U} 公分，不是 ${lens[i]}`);
      b += text(m[0] + nx * off, m[1] + ny * off, `${lens[i]} 公分`, 'middle', 14);
    });
    b += text(cx, cy + (Math.max(...P.map((p) => p[1])) - cy) + 44, name, 'middle', 18);
    report.push(`mk3-11-b ${name}：邊長 ${lens.join('、')} 公分，直角 ${rights.length} 個`);
  };
  shape('甲', [[0, 0], [4 * U, 0], [4 * U, 2 * U], [0, 2 * U]], [4, 2, 4, 2], 150, 100);
  const R = (3 * U) / Math.SQRT2;
  shape('乙', [0, 1, 2, 3].map((k) => polar(0, 0, R, 45 + 30 + 90 * k)), [3, 3, 3, 3], 440, 105);
  const [sx, sy] = polar(0, 0, 3 * U, 60);
  shape('丙', [[0, 0], [3 * U, 0], [3 * U + sx, sy], [sx, sy]], [3, 3, 3, 3], 150, 330);
  shape('丁', [[0, 0], [2 * U, 0], [6 * U, 3 * U], [0, 3 * U]], [2, 5, 6, 3], 430, 335);
  return svg(W, H, b);
})();

/* L11-Q7：小安從家走到學校的路線（畫在方格紙上）。轉彎的地方有 7 個，其中 5 個是直角、1 個銳角、1 個鈍角 */
figs['mk3-11-c'] = (() => {
  const c = 40, x0 = 30, y0 = 30, cols = 10, rows = 8, P = ([gx, gy]) => [x0 + gx * c, y0 + gy * c];
  const path = [[1, 7], [1, 4], [4, 4], [4, 6], [7, 6], [5, 3], [5, 1], [9, 1], [9, 3]];
  let b = grid(x0, y0, cols, rows, c);
  b += `<polyline points="${path.map((p) => P(p).join(',')).join(' ')}" fill="none" stroke="${BLUE}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`;
  let right = 0, acute = 0, obtuse = 0;
  for (let i = 1; i < path.length - 1; i++) {
    const d = angleAt(path[i - 1], path[i], path[i + 1]);
    if (Math.abs(d - 90) < 0.01) right++; else if (d < 90) acute++; else obtuse++;
    report.push(`mk3-11-c 第 ${i} 個轉彎：${f(d)} 度`);
  }
  report.push(`mk3-11-c 直角 ${right} 個、銳角 ${acute} 個、鈍角 ${obtuse} 個`);
  const [hx, hy] = P(path[0]), [sx, sy] = P(path[path.length - 1]);
  b += `<circle cx="${hx}" cy="${hy}" r="8" fill="${RED}"/>` + text(hx + 14, hy + 2, '家', 'start', 17);
  b += `<circle cx="${sx}" cy="${sy}" r="8" fill="${RED}"/>` + text(sx - 14, sy + 20, '學校', 'end', 17);
  return svg(x0 * 2 + cols * c, y0 * 2 + rows * c, b);
})();

/* ===== 單元六 面積、單元三 毫米 共用的小工具 ===== */
// 把一組方格（[col, row]）塗色，並描出整個圖形的外框
const cellShape = (x0, y0, c, cells, fill = FILL) => {
  const has = (x, y) => cells.some(([a, b2]) => a === x && b2 === y);
  let b = '';
  for (const [x, y] of cells) b += `<rect x="${x0 + x * c}" y="${y0 + y * c}" width="${c}" height="${c}" fill="${fill}"/>`;
  for (const [x, y] of cells) {
    const X = x0 + x * c, Y = y0 + y * c;
    b += line(X, Y, X + c, Y, has(x, y - 1) ? '#8a7a45' : INK, has(x, y - 1) ? 1.4 : 3);
    b += line(X, Y, X, Y + c, has(x - 1, y) ? '#8a7a45' : INK, has(x - 1, y) ? 1.4 : 3);
    if (!has(x, y + 1)) b += line(X, Y + c, X + c, Y + c, INK, 3);
    if (!has(x + 1, y)) b += line(X + c, Y, X + c, Y + c, INK, 3);
  }
  return b;
};
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const shoelace = (pts) => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
// 方格紙上的多邊形（頂點用格子座標）
const gridPoly = (x0, y0, c, pts, fill = FILL) => `<polygon points="${pts.map(([x, y]) => `${x0 + x * c},${y0 + y * c}`).join(' ')}" fill="${fill}" fill-opacity="0.85" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
/* 尺：0 刻度在 (x0, y)，畫 cm 公分，1 公分畫 u。每 1 毫米一小格、5 毫米中格、1 公分大格並標數字。 */
const ruler = (x0, y, cm, u) => {
  const H = 62, pad = 16;
  let b = `<rect x="${x0 - pad}" y="${y}" width="${cm * u + pad * 2}" height="${H}" rx="5" fill="#fff7d6" stroke="${INK}" stroke-width="2"/>`;
  for (let m = 0; m <= cm * 10; m++) {
    const X = x0 + (m * u) / 10, len = m % 10 === 0 ? 22 : m % 5 === 0 ? 15 : 9;
    b += line(X, y, X, y + len, INK, m % 10 === 0 ? 1.8 : 1, '');
    if (m % 10 === 0) b += text(X, y + 37, String(m / 10), 'middle', 15);
  }
  return b + text(x0 + cm * u + pad - 4, y + 53, '公分', 'end', 12);
};
// 放在尺上方的長條：從 a 毫米到 b 毫米
const barOnRuler = (x0, y, u, a, b2, fill, h = 20) => `<rect x="${f(x0 + (a * u) / 10)}" y="${y - h - 2}" width="${f(((b2 - a) * u) / 10)}" height="${h}" fill="${fill}" stroke="${INK}" stroke-width="2"/>`;

/* L12-Q2：方格紙上的 L 形（每格 1 平方公分）：上面兩排各 2 格、最下面一排 5 格 */
figs['mk3-12-a'] = (() => {
  const c = 38, x0 = 16, y0 = 16, cols = 7, rows = 5;
  const cells = [[1, 1], [2, 1], [1, 2], [2, 2], ...range(1, 5).map((x) => [x, 3])];
  const xs = cells.map((p) => p[0]), ys = cells.map((p) => p[1]);
  const w = Math.max(...xs) - Math.min(...xs) + 1, h = Math.max(...ys) - Math.min(...ys) + 1;
  report.push(`mk3-12-a 塗色 ${cells.length} 格；外框 ${w}×${h}＝${w * h} 格；周圍一圈 ${(w + h) * 2} 公分`);
  return svg(x0 * 2 + cols * c, y0 * 2 + rows * c, grid(x0, y0, cols, rows, c) + cellShape(x0, y0, c, cells));
})();

/* L12-Q6：四張貼紙（每格 1 平方公分）。甲 1×8、乙 3×3、丙 L 形 7 格（外框 4×4）、丁 2×4 */
figs['mk3-12-b'] = (() => {
  const c = 30, x0 = 16, y0 = 16, cols = 15, rows = 8;
  const S = {
    甲: range(1, 8).map((x) => [x, 1]),
    丁: range(10, 13).flatMap((x) => [[x, 1], [x, 2]]),
    乙: range(1, 3).flatMap((x) => range(4, 6).map((y) => [x, y])),
    丙: [...range(3, 6).map((y) => [6, y]), [7, 6], [8, 6], [9, 6]],
  };
  let b = grid(x0, y0, cols, rows, c);
  const colors = { 甲: FILL, 乙: FILL2, 丙: '#f9d5cf', 丁: '#d9f0d3' };
  for (const [k, cells] of Object.entries(S)) b += cellShape(x0, y0, c, cells, colors[k]);
  const lab = (s, gx, gy) => text(x0 + gx * c, y0 + gy * c, s, 'middle', 17);
  b += lab('甲', 0.5, 1.5) + lab('丁', 14.5, 2) + lab('乙', 0.5, 5.5) + lab('丙', 8, 4.5);
  report.push('mk3-12-b ' + Object.entries(S).map(([k, v]) => `${k} ${v.length} 格`).join('、'));
  return svg(x0 * 2 + cols * c, y0 * 2 + rows * c, b);
})();

/* L13-Q1：有半格的圖形：完整 4 格＋半格 2 個（外框 4×2） */
figs['mk3-13-a'] = (() => {
  const c = 44, x0 = 16, y0 = 16, cols = 6, rows = 4;
  const pts = [[1, 2], [2, 2], [2, 1], [4, 1], [4, 2], [5, 2], [4, 3], [2, 3]];
  report.push(`mk3-13-a 面積 ${shoelace(pts)} 格（完整 4 格、半格 2 個）`);
  return svg(x0 * 2 + cols * c, y0 * 2 + rows * c, gridPoly(x0, y0, c, pts) + grid(x0, y0, cols, rows, c).replaceAll(GRID, '#b5b5b5') + gridPoly(x0, y0, c, pts, 'none'));
})();

/* L13-Q2：橫 2 格、直 1 格的長方形（虛線）沿對角線切開，塗色的是其中一個三角形 */
figs['mk3-13-b'] = (() => {
  const c = 60, x0 = 16, y0 = 16, cols = 4, rows = 3;
  const tri = [[1, 2], [3, 2], [3, 1]];
  let b = gridPoly(x0, y0, c, tri) + grid(x0, y0, cols, rows, c).replaceAll(GRID, '#b5b5b5') + gridPoly(x0, y0, c, tri, 'none');
  b += `<rect x="${x0 + c}" y="${y0 + c}" width="${2 * c}" height="${c}" fill="none" stroke="${RED}" stroke-width="2.5" stroke-dasharray="8 6"/>`;
  report.push(`mk3-13-b 三角形面積 ${shoelace(tri)} 格`);
  return svg(x0 * 2 + cols * c, y0 * 2 + rows * c, b);
})();

/* L13-Q3：方格點上的甲（斜放的正方形）和乙（梯形），相鄰兩點的距離是 1 公分 */
figs['mk3-13-c'] = (() => {
  const c = 36, x0 = 24, y0 = 24, cols = 13, rows = 6;
  const A = [[3, 1], [5, 3], [3, 5], [1, 3]], B = [[8, 2], [10, 2], [12, 4], [6, 4]];
  let b = gridPoly(x0, y0, c, A, FILL) + gridPoly(x0, y0, c, B, FILL2);
  for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) b += `<circle cx="${x0 + i * c}" cy="${y0 + j * c}" r="2.6" fill="${INK}"/>`;
  b += text(x0 + 3.5 * c, y0 + 2.5 * c, '甲', 'middle', 18) + text(x0 + 9.5 * c, y0 + 2.5 * c, '乙', 'middle', 18);
  report.push(`mk3-13-c 甲 ${shoelace(A)} 格、乙 ${shoelace(B)} 格`);
  return svg(x0 * 2 + cols * c, y0 * 2 + rows * c, b);
})();

/* L13-Q6：平方公分板蓋在一個橢圓形的圖案上：完整在圖案裡面的方格 6 個，圖案碰到的方格一共 20 個 */
figs['mk3-13-d'] = (() => {
  const c = 42, x0 = 16, y0 = 16, cols = 7, rows = 6, cx = 3.5, cy = 3, a = 2.3, b0 = 1.8;
  const inside = (x, y) => ((x - cx) / a) ** 2 + ((y - cy) / b0) ** 2 < 1;
  let full = 0, touch = 0;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    let n = 0, all = 0;
    for (let s = 0; s <= 20; s++) for (let t = 0; t <= 20; t++) { all++; if (inside(i + s / 20, j + t / 20)) n++; }
    if (n === all) full++;
    if (n > 0) touch++;
  }
  report.push(`mk3-13-d 完整在裡面的方格 ${full} 個、碰到的方格 ${touch} 個`);
  let b = `<ellipse cx="${x0 + cx * c}" cy="${y0 + cy * c}" rx="${a * c}" ry="${b0 * c}" fill="#bfe3b4" stroke="${INK}" stroke-width="3"/>`;
  b += grid(x0, y0, cols, rows, c).replaceAll(GRID, '#8fa3ad') + `<ellipse cx="${x0 + cx * c}" cy="${y0 + cy * c}" rx="${a * c}" ry="${b0 * c}" fill="none" stroke="${INK}" stroke-width="3"/>`;
  return svg(x0 * 2 + cols * c, y0 * 2 + rows * c, b);
})();

/* L06-Q2：用尺量一條藍色的線，從 0 量到 3 公分 8 毫米 */
figs['mk3-06-a'] = (() => {
  const u = 84, x0 = 36, y = 56, cm = 6, len = 38;
  report.push(`mk3-06-a 長條 ${len} 毫米`);
  return svg(x0 * 2 + cm * u, 134, ruler(x0, y, cm, u) + barOnRuler(x0, y, u, 0, len, BLUE, 16));
})();

/* L07-Q7：用過的蠟筆放在尺上，從 0 量到 5 公分 4 毫米 */
figs['mk3-07-a'] = (() => {
  const u = 62, x0 = 36, y = 60, cm = 9, len = 54;
  const X = (m) => x0 + (m * u) / 10, top = y - 26, mid = y - 14, bot = y - 2;
  let b = ruler(x0, y, cm, u);
  b += `<path d="M ${X(0)} ${top} L ${f(X(len - 7))} ${top} L ${f(X(len))} ${mid} L ${f(X(len - 7))} ${bot} L ${X(0)} ${bot} Z" fill="#e8735a" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  b += `<rect x="${f(X(8))}" y="${top}" width="${f(X(30) - X(8))}" height="${bot - top}" fill="#fff3e0" stroke="${INK}" stroke-width="1.5"/>` + text((X(8) + X(30)) / 2, mid, '蠟筆', 'middle', 14);
  report.push(`mk3-07-a 蠟筆 ${len} 毫米`);
  return svg(x0 * 2 + cm * u, 140, b);
})();

for (const [name, content] of Object.entries(figs)) writeFileSync(new URL(name + '.svg', OUT), content);
console.log(report.join('\n'));
console.log('已產生 ' + Object.keys(figs).length + ' 張圖：' + Object.keys(figs).join('、'));
