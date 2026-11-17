// 把五上自然的關卡外殼（沒有題目）加進 data/ns5.js，題目之後由 tools/assemble.mjs 填。已經有的關卡不動。
// ns5 已經登記在書架上，空的關卡會出現在地圖上，所以「題目寫好了才加那一關」：
//   node drafts/ns5/add-levels.mjs 6 7 8 9     （只加第 6～9 關）
// 關卡名和 intro 是依 JDPS zn5 骨架和課本目次暫定的，出題前回課本核對，必要時改這裡再執行（已存在的關卡要手動刪掉重加）。
import { readFileSync, writeFileSync } from 'node:fs';
const file = new URL('../../data/ns5.js', import.meta.url);
const src = readFileSync(file, 'utf8');
const start = src.indexOf('const NS5 = ') + 'const NS5 = '.length, end = src.lastIndexOf('};') + 1;
const book = JSON.parse(src.slice(start, end));
const lv = (n, z, name, lesson, intro) => ({ id: 'ns5-' + String(n).padStart(2, '0'), z, name, lesson, draft: true, intro, q: [] });
const plan = [
  // 單元一 太陽與光（ns5-01～05，2026-11-17 已完成，題目檔 ns5-questions-U1.json）
  lv(1, 0, '太陽和影子', '單元一 活動 1', '太陽和影子永遠在相反的方向。一天之中，影子的方向和長短都會跟著太陽改變。'),
  lv(2, 0, '太陽的方位與高度角', '單元一 活動 1', '太陽的位置可以用方位和高度角來說。用吸管、棉線、量角器和指北針，自己做太陽觀測器！'),
  lv(3, 0, '四季的太陽', '單元一 活動 1', '春分、夏至、秋分、冬至，太陽升起和落下的方位不一樣，中午的高度角和白天的長短也不一樣。'),
  lv(4, 0, '光的折射', '單元一 活動 2', '光在同一種介質裡直直前進；斜斜的進入另一種介質時，會在交界處偏折，這就是光的折射。'),
  lv(5, 0, '彩虹與放大鏡', '單元一 活動 2', '陽光是由不同顏色的光組成的。放大鏡兩邊薄、中間厚，可以把光匯聚，也能看到放大或倒立的影像。'),
  // 單元二 植物世界（JDPS L06～L09）
  lv(6, 1, '根莖葉的功能', '單元二 活動 1', '根吸水、莖運輸、葉蒸散，葉子還會製造養分。'),
  lv(7, 1, '植物的構造與特化', '單元二 活動 1', '植物由細胞組成；有些根、莖、葉長成特別的樣子，有特別的功能。'),
  lv(8, 1, '植物的繁殖', '單元二 活動 2', '花授粉以後長出果實和種子；植物也能用根、莖、葉來繁殖。'),
  lv(9, 1, '植物與人類生活', '單元二 活動 3', '人類的食衣住行都用得到植物，還向植物學習發明了新科技。'),
  // 單元三 水溶液（JDPS L10～L14）
  lv(10, 2, '溶解現象', '單元三 活動 1', '東西溶解在水裡，看不見了，重量卻不會改變。'),
  lv(11, 2, '取回溶解的物質', '單元三 活動 1', '把水分蒸發掉，就能取回溶在水裡的物質。'),
  lv(12, 2, '酸鹼與石蕊試紙', '單元三 活動 2', '用石蕊試紙檢測生活中的水溶液是酸性、鹼性還是中性。'),
  lv(13, 2, '指示劑與酸鹼混合', '單元三 活動 2', '紫色高麗菜汁也能當酸鹼指示劑；酸性和鹼性的水溶液混合，性質會改變。'),
  lv(14, 2, '水溶液的導電性', '單元三 活動 3', '有些水溶液會導電，有些不會。接上電路測測看！'),
  // 單元四 力與運動（JDPS L15～L18）
  lv(15, 3, '重力與重量', '單元四 活動 1', '地球會吸引物體，物體的重量就是受到地球重力的影響。'),
  lv(16, 3, '彈簧秤與力的大小', '單元四 活動 1', '在彈性限度內，施力愈大，彈簧伸長得愈長。'),
  lv(17, 3, '摩擦力', '單元四 活動 2', '摩擦力會影響物體的運動；生活中有時要增加摩擦力，有時要減少。'),
  lv(18, 3, '運動的快慢', '單元四 活動 3', '用距離和時間比較快慢；運動的物體有動能。'),
];
const want = process.argv.slice(2).map(Number);
if (!want.length) { console.log('要指定關卡號碼，例如：node drafts/ns5/add-levels.mjs 6 7 8 9'); process.exit(1); }
for (const x of plan.filter((p) => want.includes(Number(p.id.slice(4)))))
  if (!book.levels.some((l) => l.id === x.id)) book.levels.push(x);
book.levels.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(file, src.slice(0, start) + JSON.stringify(book, null, 1) + src.slice(end));
console.log('關卡：' + book.levels.map((l) => l.id.slice(4)).join(' '));
