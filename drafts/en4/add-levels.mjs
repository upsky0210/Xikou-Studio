// 把四上英語的關卡外殼（沒有題目）加進 data/en4.js，題目之後由 tools/assemble.mjs 填。已經有的關卡不動。
//   node drafts/en4/add-levels.mjs 1 2 3 …     （只加指定的關）
import { readFileSync, writeFileSync } from 'node:fs';
const file = new URL('../../data/en4.js', import.meta.url);
const src = readFileSync(file, 'utf8');
const start = src.indexOf('const EN4 = ') + 'const EN4 = '.length, end = src.lastIndexOf('};') + 1;
const book = JSON.parse(src.slice(start, end));
const lv = (n, z, name, lesson, intro) => ({ id: 'en4-' + String(n).padStart(2, '0'), z, name, lesson, draft: true, intro, q: [] });
const plan = [
  // Unit 1 The Best Drink（課本 pp.17–30）
  lv(1, 0, '字彙與聽力', 'Unit 1', '七種飲料的英文：coffee、cola、lemonade、tea、bubble tea、hot chocolate、soy milk，還有故事裡的 water、juice、milk tea。'),
  lv(2, 0, '句型與文法', 'Unit 1', 'Do you like cola? Yes, I do. / No, I don\'t. Does he like tea? Yes, he does. / No, he doesn\'t. He likes coffee. do 和 does 後面用原形動詞。'),
  lv(3, 0, '發音與閱讀', 'Unit 1', 'e_e、ea、ee 都念長音 e（Eve、tea、tree）；讀飲料的營養標示，找出細節（Find Details）。'),
  // Unit 2 Let's Make Fruit Salad（課本 pp.31–44）
  lv(4, 1, '字彙與聽力', 'Unit 2', '七種水果的英文：apples、bananas、grapes、guavas、oranges、papayas、pineapples。'),
  lv(5, 1, '句型與文法', 'Unit 2', 'How many apples do you need? I need two apples. How many oranges does she need? She needs seven oranges. how many 後面的名詞用複數。'),
  lv(6, 1, '發音與閱讀', 'Unit 2', 'i_e、ie、igh 都念長音 i（bite、pie、light）；讀短文時在腦中想像畫面（Visualize），找出誰吃水果吃得聰明。'),
  lv(7, 1, '綜合複習', 'Review 1', 'Unit 1～2 一起複習：飲料、水果、問喜不喜歡和需要幾個，再照順序讀懂對話（Sequence）。'),
  // Unit 3 A Fun Day（課本 pp.49–62）
  lv(8, 2, '字彙與聽力', 'Unit 3', '星期一到星期日：Monday、Tuesday、Wednesday、Thursday、Friday、Saturday、Sunday。'),
  lv(9, 2, '句型與文法', 'Unit 3', 'What day is today? It\'s Sunday. Is it Monday today? Yes, it is. / No, it isn\'t. It\'s Tuesday. 星期和人名、地名都要大寫。'),
  lv(10, 2, '發音與閱讀', 'Unit 3', 'o_e、oa、ow 都念長音 o（hole、goat、snow）；讀一週的打掃計畫，做筆記（Take Notes）。'),
  // Unit 4 My Favorite Subject（課本 pp.63–76）
  lv(11, 3, '字彙與聽力', 'Unit 4', '八個科目的英文：art、Chinese、English、math、music、PE、science、social studies。'),
  lv(12, 3, '句型與文法', 'Unit 4', 'What\'s your favorite subject? My favorite subject is English. What\'s his favorite subject? His favorite subject is science. 分清楚 my、your、his、her、our、their。'),
  lv(13, 3, '發音與閱讀', 'Unit 4', 'u_e 有兩種念法（cute、Luke），ue、ui 念 [u]（glue、fruit）；比較兩個人喜歡的科目（Compare and Contrast）。'),
  lv(14, 3, '綜合複習', 'Review 2', 'Unit 3～4 一起複習：星期、科目、問今天星期幾和最喜歡的科目，再比較兩封信裡的人（Compare and Contrast）。'),
];
const want = process.argv.slice(2).map(Number);
if (!want.length) { console.log('要指定關卡號碼，例如：node drafts/en4/add-levels.mjs 1 2 3'); process.exit(1); }
for (const x of plan.filter((p) => want.includes(Number(p.id.slice(4))))) {
  if (!book.levels.some((l) => l.id === x.id)) book.levels.push(x);
}
book.levels.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(file, src.slice(0, start) + JSON.stringify(book, null, 1) + src.slice(end));
console.log('關卡：' + book.levels.map((l) => l.id.slice(4)).join(' '));
