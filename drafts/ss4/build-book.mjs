// 產生 13 關的資料檔骨架。組裝題目請另跑 tools/assemble.mjs。
import { existsSync, writeFileSync } from 'node:fs';

const output = new URL('../../data/ss4.js', import.meta.url);
if (existsSync(output) && !process.argv.includes('--replace')) {
  console.error('資料檔已存在。如確定要用草稿骨架重建，才加 --replace。');
  process.exit(1);
}

const units = [
  ['家鄉的地圖與運用', [
    ['閱讀生活中的地圖', '看懂圖名、圖例、方向標和比例尺，用地圖找到想去的地方。'],
    ['善用地圖好生活', '從行政區域圖到交通路線圖，試著找鄰近地區、轉車站和旅遊景點。'],
  ]],
  ['家鄉的地形與氣候', [
    ['高低起伏的地形', '看看山地、丘陵、台地、盆地和平原的樣子，想想不同地形怎樣影響生活。'],
    ['千變萬化的氣候', '比一比各地的氣溫和雨量，再看看氣候如何影響旅遊和地方特產。'],
  ]],
  ['家鄉的人口與生活', [
    ['家鄉的人口組成', '哪些地方容易聚集居民？一起從地形、交通、工作和年齡比例找線索。'],
    ['人口變化與發展', '出生人數和長者比例的變化，會影響學校、家庭和社區服務。'],
  ]],
  ['家鄉的多元文化', [
    ['家鄉的多元飲食文化', '同樣是米，可以做出不同料理。看看家鄉食物怎樣保留傳統、發展新口味。'],
    ['家鄉的多元服飾', '有些衣服為了工作而設計，有些用於祭典或婚禮。仔細看看衣服背後的故事。'],
    ['家鄉的多元語言與命名', '從車站廣播和同學的名字，認識生活中的不同語言和命名方式。'],
  ]],
  ['家鄉的節慶與禮俗', [
    ['家鄉的傳統節慶', '親友用不同方式過年、祭祖或感謝豐收。一起看看各種節慶的心意。'],
    ['家鄉的現代節日', '家鄉有從外地傳入的節日，也有紀念國家歷史或展現地方特色的活動。'],
    ['家鄉的生命禮俗', '從迎接新生兒到成年、婚嫁，看看人們怎樣在重要時刻送上祝福。'],
  ]],
  ['家鄉故事導覽員', [
    ['家鄉故事導覽員', '找資料、訪問、整理故事，再把它們放上地圖，帶大家認識你的家鄉。'],
  ]],
];

const ordinals = ['一', '二', '三', '四', '五', '六'];
const levels = [];
const zones = units.map(([unit, lessons], z) => {
  lessons.forEach(([name, intro], index) => {
    const id = 'ss4-' + String(levels.length + 1).padStart(2, '0');
    const section = '第' + ordinals[z] + '單元';
    const lesson = z === 5 ? section + ' 綜合應用' : section + ' 第 ' + (index + 1) + ' 課';
    levels.push({ id, z, name, lesson, draft: true, intro, q: [] });
  });
  return { name: unit, unit };
});

const book = {
  id: 'ss4',
  subj: '社會',
  pub: '翰林',
  sem: '四上',
  grade: 4,
  note: '依翰林四上社會課本編寫。部分題目改作自 JDPS-SS（陳煥文，CC BY-NC-SA 4.0）。',
  zones,
  levels,
};

const header = [
  '// 國小全科練習平台 — ss4（四上社會・翰林版）',
  '// 依 115 學年度翰林四上社會課本正文編寫。前五單元一課一關，第六單元一關綜合應用。',
  '// 部分題目改作自 JDPS-SS（陳煥文，CC BY-NC-SA 4.0）。逐題出處見 drafts/ss4 的 source 欄位，改作依同一授權分享。',
  '// 題目由 tools/assemble.mjs 組裝。修改題目時，先重跑 drafts/ss4/build-U*.mjs。',
].join('\n');
writeFileSync(output, header + '\nconst SS4 = ' + JSON.stringify(book, null, 1) + ';\n');
console.log('已寫出 ' + zones.length + ' 區、' + levels.length + ' 關的 data/ss4.js');
