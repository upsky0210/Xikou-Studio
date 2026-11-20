// 把五上英語的關卡外殼（沒有題目）加進 data/en5.js，題目之後由 tools/assemble.mjs 填。已經有的關卡不動。
// 「題目寫好了才加那一關」，以免空關卡出現在地圖上：
//   node drafts/en5/add-levels.mjs 4 5 6     （只加第 4、5、6 關）
// intro 是依教學篇暫定的，出題前回課本核對，必要時改這裡再執行（已存在的關卡要手動刪掉重加）。
import { readFileSync, writeFileSync } from 'node:fs';
const file = new URL('../../data/en5.js', import.meta.url);
const src = readFileSync(file, 'utf8');
const start = src.indexOf('const EN5 = ') + 'const EN5 = '.length, end = src.lastIndexOf('};') + 1;
const book = JSON.parse(src.slice(start, end));
const lv = (n, z, name, lesson, intro) => ({ id: 'en5-' + String(n).padStart(2, '0'), z, name, lesson, draft: true, intro, q: [] });
const plan = [
  // Unit 1 Whale Watching（2026-11-20 已完成，題目檔 en5-questions-U1.json）
  lv(1, 0, '字彙與聽力', 'Unit 1', '八個國家的英文：Australia、Canada、France、India、Japan、Taiwan、the UK、the USA，還有故事裡的 whale、dolphin。'),
  lv(2, 0, '句型與文法', 'Unit 1', 'Where are you from? I\'m from Japan. Is he from the USA? Yes, he is. / No, he\'s not. be 動詞要跟著主詞變，人名、國名要大寫。'),
  lv(3, 0, '發音與閱讀', 'Unit 1', 'er、ir、ur 的念法一樣；讀短文找出細節（Find Details），再回想賞鯨的故事。'),
  // Unit 2 Having a Cold
  lv(4, 1, '字彙與聽力', 'Unit 2', '生病的說法：cold、cough、fever、headache、toothache、stomachache、runny nose、sore throat。'),
  lv(5, 1, '句型與文法', 'Unit 2', 'What\'s wrong? I have a headache. Does he have a fever? Yes, he does. / No, he doesn\'t. 說別人時 have 要改成 has。'),
  lv(6, 1, '發音與閱讀', 'Unit 2', 'ar、or 的念法；用疑問詞（Question Words）讀懂短文，再回想 Joe 感冒的故事。'),
  lv(7, 1, '綜合複習', 'Review 1', 'Unit 1～2 一起複習：國家、生病的說法、問從哪裡來和哪裡不舒服。'),
  // Unit 3 From Farm to Table
  lv(8, 2, '字彙與聽力', 'Unit 3', '食物的英文：pizza、rice、soup、steak、sandwiches、dumplings、French fries、noodles。'),
  lv(9, 2, '句型與文法', 'Unit 3', 'What would you like to eat? I\'d like some dumplings, please. Would you like some sandwiches? Yes, please. / No, thank you.'),
  lv(10, 2, '發音與閱讀', 'Unit 3', 'oi、oy 的念法；照順序讀懂步驟（Sequence），再回想從農場到餐桌的故事。'),
  // Unit 4 A Call in the Morning
  lv(11, 3, '字彙與聽力', 'Unit 4', '一天的作息：get up、have breakfast、go to school、have lunch、go home、do my homework、have dinner、go to bed。'),
  lv(12, 3, '句型與文法', 'Unit 4', 'What time do you get up? I get up at six thirty. Do you have lunch at twelve? Yes, I do. / No, I don\'t.'),
  lv(13, 3, '發音與閱讀', 'Unit 4', 'ou、ow 的念法；找出問題和解決方法（Problem and Solution），再回想早上那通電話的故事。'),
  lv(14, 3, '綜合複習', 'Review 2', 'Unit 3～4 一起複習：食物、點餐的說法、一天的作息和時間。'),
];
const want = process.argv.slice(2).map(Number);
if (!want.length) { console.log('要指定關卡號碼，例如：node drafts/en5/add-levels.mjs 4 5 6'); process.exit(1); }
for (const x of plan.filter((p) => want.includes(Number(p.id.slice(4))))) {
  if (!x.intro) { console.log(`${x.id} 還沒寫 intro，先在這支程式補上再加關`); process.exit(1); }
  if (!book.levels.some((l) => l.id === x.id)) book.levels.push(x);
}
book.levels.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(file, src.slice(0, start) + JSON.stringify(book, null, 1) + src.slice(end));
console.log('關卡：' + book.levels.map((l) => l.id.slice(4)).join(' '));
