// 把關卡的外殼（沒有題目）加進 data/mk3.js，題目之後由 tools/assemble.mjs 填。已經有的關卡不動。
// 用法：node drafts/mk3/add-levels.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const file = new URL('../../data/mk3.js', import.meta.url);
const src = readFileSync(file, 'utf8');
const start = src.indexOf('const MK3 = ') + 'const MK3 = '.length, end = src.lastIndexOf('};') + 1;
const book = JSON.parse(src.slice(start, end));
const lv = (n, z, name, lesson, intro) => ({ id: 'mk3-' + String(n).padStart(2, '0'), z, name, lesson, draft: true, intro, q: [] });
const add = [
  lv(1, 0, '數到 10000', '單元一', '10 個一千是一萬。認識千位，學會讀和寫四位數。'),
  lv(2, 0, '錢幣、比大小與數線', '單元一', '用錢幣表示四位數；比大小從千位比起；在數線上找出數的位置。'),
  lv(3, 1, '三、四位數的加法', '單元二', '位值對齊，從個位加起，滿 10 就進位。'),
  lv(4, 1, '三、四位數的減法', '單元二', '位值對齊，從個位減起，不夠減就向前一位借。'),
  lv(5, 1, '加減估算', '單元二', '把數看成整千或整百，很快就能估出大約是多少。'),
  lv(6, 2, '認識毫米', '單元三', '1 公分平分成 10 小格，每一小格是 1 毫米。學會用尺量出幾公分幾毫米。'),
  lv(7, 2, '長度的計算', '單元三', '公分和毫米的加減：毫米和毫米算、公分和公分算，滿 10 毫米進 1 公分。'),
  lv(8, 3, '乘以一位數', '單元四', '二位數、三位數乘以一位數：從個位乘起，滿 10 就進位。'),
  lv(9, 3, '連乘與乘法估算', '單元四', '要乘兩次的問題，一步一步算；把數看成整十或整百，可以先估估看。'),
  lv(10, 4, '認識角與比大小', '單元五', '角有 1 個頂點和 2 條直直的邊。角的大小看兩條邊張開多少，和邊畫多長沒有關係。'),
  lv(11, 4, '直角、銳角和鈍角', '單元五', '三角板上有直角。比直角小的是銳角，比直角大的是鈍角。正方形和長方形的 4 個角都是直角。'),
  lv(12, 5, '認識平方公分', '單元六', '邊長 1 公分的正方形，面積是 1 平方公分。數一數有幾個，就知道面積。'),
  lv(13, 5, '切割拼湊與估估看', '單元六', '把圖形剪開再拼起來，面積不會變。不滿一格的，可以拼成整格來算。'),
  lv(14, 6, '平分與除法算式', '單元七', '把東西平分，可以用除法算式記下來。'),
  lv(15, 6, '餘數、除法直式與應用', '單元七', '分完剩下的是餘數，餘數一定比除數小。學會用直式算除法。'),
  lv(16, 7, '認識毫升', '單元八', '毫升是比較小的容量單位。學會看量杯上的刻度。'),
  lv(17, 7, '公升與毫升、容量的加減', '單元八', '1 公升＝1000 毫升。幾公升幾毫升的加減，滿 1000 毫升進 1 公升。'),
  lv(18, 8, '幾分之幾', '單元九', '把一個東西平分成幾份，其中的幾份可以用分數表示。'),
  lv(19, 8, '分數數詞序列與比大小', '單元九', '一個一個數分數；分母一樣時，分子大的分數比較大。'),
];
for (const x of add) if (!book.levels.some((l) => l.id === x.id)) book.levels.push(x);
book.levels.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(file, src.slice(0, start) + JSON.stringify(book, null, 1) + src.slice(end));
console.log('關卡：' + book.levels.map((l) => l.id.slice(4)).join(' '));
