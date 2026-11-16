// 把新關卡的外殼（沒有題目）加進 data/mn5.js，題目之後由 tools/assemble.mjs 填。已經有的關卡不動。
// 用法：node drafts/mn5/add-levels.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const file = new URL('../../data/mn5.js', import.meta.url);
const src = readFileSync(file, 'utf8');
const start = src.indexOf('const MN5 = ') + 'const MN5 = '.length, end = src.lastIndexOf('};') + 1;
const book = JSON.parse(src.slice(start, end));
const add = [
  { id: 'mn5-19', z: 7, name: '平行四邊形和三角形的面積', lesson: '單元八', draft: true, intro: '平行四邊形的面積＝底×高，三角形的面積＝底×高÷2。高要和底垂直，斜邊不是高。', q: [] },
  { id: 'mn5-20', z: 7, name: '梯形和複合圖形的面積', lesson: '單元八', draft: true, intro: '梯形的面積＝（上底＋下底）×高÷2。沒有公式的圖形，可以切開、扣掉或移動，變成學過的圖形。', q: [] },
  { id: 'mn5-22', z: 9, name: '正方體和長方體', lesson: '單元十', draft: true, intro: '正方體和長方體都有 8 個頂點、12 個邊、6 個面。相鄰的邊（面）互相垂直，相對的邊（面）互相平行。', q: [] },
  { id: 'mn5-23', z: 9, name: '展開圖和表面積', lesson: '單元十', draft: true, intro: '沿著盒子的邊剪開就是展開圖。6 個面的面積總和叫作表面積。', q: [] },
];
for (const lv of add) if (!book.levels.some((l) => l.id === lv.id)) book.levels.push(lv);
book.levels.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(file, src.slice(0, start) + JSON.stringify(book, null, 1) + src.slice(end));
console.log('關卡：' + book.levels.map((l) => l.id.slice(4)).join(' '));
