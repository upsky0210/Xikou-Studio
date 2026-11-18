// 把五上社會的關卡外殼（沒有題目）加進 data/ss5.js，題目之後由 tools/assemble.mjs 填。已經有的關卡不動。
// 「題目寫好了才加那一關」，以免空關卡出現在地圖上：
//   node drafts/ss5/add-levels.mjs 4 5     （只加第 4、5 關）
// 一課一關，課名照課本目次。intro 是依課本暫定的，出題前回課本核對，必要時改這裡再執行（已存在的關卡要手動刪掉重加）。
import { readFileSync, writeFileSync } from 'node:fs';
const file = new URL('../../data/ss5.js', import.meta.url);
const src = readFileSync(file, 'utf8');
const start = src.indexOf('const SS5 = ') + 'const SS5 = '.length, end = src.lastIndexOf('};') + 1;
const book = JSON.parse(src.slice(start, end));
const lv = (n, z, name, lesson, intro) => ({ id: 'ss5-' + String(n).padStart(2, '0'), z, name, lesson, draft: true, intro, q: [] });
const plan = [
  // 第一單元 臺灣！我來了（ss5-01～03，2026-11-18 已完成，題目檔 ss5-questions-U1.json）
  lv(1, 0, '鳥瞰臺灣', '第一單元 第 1 課', '臺灣在北半球、北回歸線通過的地方，夾在東北亞和東南亞中間。候鳥會來這裡休息，飛機也會在這裡轉機。'),
  lv(2, 0, '海中誕生的家園', '第一單元 第 2 課', '板塊互相擠壓，讓臺灣從海中冒出來。東西南北的海岸各有不同的樣子，人們也用不同的方式利用它們。'),
  lv(3, 0, '當人類來到臺灣', '第一單元 第 3 課', '冰河時期，人類和動物從亞洲大陸走到臺灣。從地底下的遺址，可以推測史前人類怎麼生活。'),
  // 第二單元 島嶼上的生活樣貌
  lv(4, 1, '島嶼上的子民', '第二單元 第 1 課', '一起認識臺灣不同族群的信仰、部落生活與宗族傳統，看看人們怎樣把生活智慧傳給下一代。'),
  lv(5, 1, '島上居民的生活', '第二單元 第 2 課', '風俗、信仰和法律都會影響我們的生活。一起看看規範如何讓人和諧相處，又怎樣因應新的需求。'),
  // 第三單元 臺灣的物產資源
  lv(6, 2, '豐饒的土地', '第三單元 第 1 課', '從虎尾蔗糖走到屏東可可，再看看牧場和漁村。地形、氣候與人們的做法，都會影響臺灣的物產。'),
  lv(7, 2, '山中的故事', '第三單元 第 2 課', '木材、礦產和鐵道曾帶動山城發展。今天走訪這些地方，還能從哪些風景找到早期生活的線索？'),
  // 第四單元 看見福爾摩沙
  lv(8, 3, '潟湖上的海上貿易', '第四單元 第 1 課', '早期帆船為什麼會停靠在大員？一起看昔日的潟湖怎樣幫助海上交易，又怎樣慢慢改變。'),
  lv(9, 3, '大航海時期來臺的人們', '第四單元 第 2 課', '新航路把各國商船帶到東亞。跟著航線與時間軸，看看哪些人先後來到臺灣、各有什麼目的。'),
  lv(10, 3, '大航海時期對臺的影響', '第四單元 第 3 課', '貿易和開墾改變了島上居民的生活。從城堡、孔廟和歷史紀錄，找找不同勢力留下的線索。'),
];
const want = process.argv.slice(2).map(Number);
if (!want.length) { console.log('要指定關卡號碼，例如：node drafts/ss5/add-levels.mjs 4 5'); process.exit(1); }
for (const x of plan.filter((p) => want.includes(Number(p.id.slice(4))))) {
  if (!x.intro) { console.log(`${x.id} 還沒寫 intro，先在這支程式補上再加關`); process.exit(1); }
  if (!book.levels.some((l) => l.id === x.id)) book.levels.push(x);
}
book.levels.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(file, src.slice(0, start) + JSON.stringify(book, null, 1) + src.slice(end));
console.log('關卡：' + book.levels.map((l) => l.id.slice(4)).join(' '));
