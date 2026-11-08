// 把作者端題目檔（questions.json 的格式）組裝進資料檔：用程式組，不手抄，題目文字一字不差。
// 用法：node tools/assemble.mjs data/mn6.js MN6 questions.json [其他題目檔.json ...]
// 規則：
//   - 題號 L03-Q2 → 資料檔裡 id 為 mn6-03 的關卡的第 2 題。
//   - 關卡本身（名稱、課次、說明、z、draft）要先寫在資料檔裡；這支程式只填 q。
//   - 資料檔開頭的註解原樣保留，物件用 JSON 格式重寫。
import { readFileSync, writeFileSync } from 'node:fs';
import { loadBook } from './lib.mjs';

const [file, globalName, ...qfiles] = process.argv.slice(2);
if (!file || !globalName || !qfiles.length) { console.log('用法：node tools/assemble.mjs <資料檔> <物件名稱> <題目檔.json> ...'); process.exit(1); }

const src = readFileSync(file, 'utf8');
const head = src.slice(0, src.indexOf(`const ${globalName}`));
const book = loadBook(file, globalName);

const filled = {};
for (const qf of qfiles) {
  for (const it of JSON.parse(readFileSync(qf, 'utf8'))) {
    const [lvTag, qTag] = it.id.split('-Q');
    const id = `${book.id}-${lvTag.slice(1)}`;
    const lv = book.levels.find((l) => l.id === id);
    if (!lv) { console.log(`資料檔裡沒有關卡 ${id}（${it.id}），請先加上關卡資料`); process.exit(1); }
    if (!filled[id]) { filled[id] = []; }
    const q = [it.stem, it.answer, it.distractors.map((d) => d.text), it.hints, it.explanation];
    if (it.attachment) q.push(it.attachment);
    filled[id][Number(qTag) - 1] = q;
  }
}
for (const [id, qs] of Object.entries(filled)) {
  const lv = book.levels.find((l) => l.id === id);
  if (qs.length !== 7 || qs.some((x) => !x)) { console.log(`${id} 的題目不是剛好 7 題（Q1～Q7）`); process.exit(1); }
  lv.q = qs;
}
writeFileSync(file, head + `const ${globalName} = ` + JSON.stringify(book, null, 1) + ';\n');
console.log(`已組裝：${Object.keys(filled).join('、')}`);
