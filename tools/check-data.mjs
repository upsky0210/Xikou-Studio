// 檢查題庫資料檔格式，並和作者端原始檔比對（以原始檔為準，只回報差異、不改題目）
// 用法：node tools/check-data.mjs data/mn6.js MN6 [questions.json] [其他題目檔.json ...]
import { readFileSync, existsSync } from 'node:fs';
import { loadBook, plain, badMarkup, parseValue, eq } from './lib.mjs';

const [file, globalName, ...qfiles] = process.argv.slice(2);
if (!file || !globalName) { console.log('用法：node tools/check-data.mjs <資料檔> <物件名稱> [題目檔.json ...]'); process.exit(1); }

const book = loadBook(file, globalName);
const issues = [];
const where = (lv, i) => `${lv.id} 第 ${i + 1} 題`;
const texts = (q) => [q[0], q[1], ...(q[2] || []), ...(q[3] || []), q[4]];

if (!book.id || !Array.isArray(book.zones) || !Array.isArray(book.levels)) issues.push('缺 id、zones 或 levels');
const ids = new Set();
for (const lv of book.levels) {
  if (ids.has(lv.id)) issues.push(`關卡 id 重複：${lv.id}`);
  ids.add(lv.id);
  if (!(lv.z >= 0 && lv.z < book.zones.length)) issues.push(`${lv.id} 的 z=${lv.z} 不在 zones 範圍內`);
  if (!Array.isArray(lv.q) || !lv.q.length) continue;   // 沒有題目＝尚未開放，允許
  if (lv.q.length !== 7) issues.push(`${lv.id} 有 ${lv.q.length} 題（規格是 7 題）`);
  lv.q.forEach((q, i) => {
    const [stem, ans, wrong, hints, explain, attach] = q;
    if (!stem || !ans || !explain) issues.push(`${where(lv, i)} 缺題幹、正解或詳解`);
    if (!Array.isArray(wrong) || wrong.length !== 3) issues.push(`${where(lv, i)} 干擾項不是 3 個`);
    else {
      if (wrong.includes(ans)) issues.push(`${where(lv, i)} 正解也出現在干擾項裡`);
      if (new Set(wrong).size !== 3) issues.push(`${where(lv, i)} 干擾項有重複`);
      // 數值題：干擾項不能和正解等值（例如 3/4 和 6/8）
      const av = parseValue(ans);
      if (av) for (const w of wrong) { const wv = parseValue(w); if (wv && eq(av, wv)) issues.push(`${where(lv, i)} 干擾項「${plain(w)}」和正解等值`); }
    }
    if (!Array.isArray(hints) || hints.length !== 3) issues.push(`${where(lv, i)} 提示不是 3 段`);
    for (const t of texts(q)) if (t && badMarkup(t)) issues.push(`${where(lv, i)} 分數標記寫壞了：${t.slice(0, 40)}`);
    if (attach) {
      const ok = Array.isArray(attach.t) || Array.isArray(attach.list) || typeof attach === 'string' || attach.text || attach.fig;
      if (!ok) issues.push(`${where(lv, i)} 附件格式看不懂`);
      if (attach.fig && !existsSync(attach.fig)) issues.push(`${where(lv, i)} 找不到圖檔 ${attach.fig}`);
      if (attach.fig && !attach.alt) issues.push(`${where(lv, i)} 圖形附件缺 alt 說明`);
    }
  });
}

// 和作者端原始檔比對：題號 L03-Q2 對到資料檔的 mn6-03 第 2 題
for (const qjson of qfiles) {
  const Q = JSON.parse(readFileSync(qjson, 'utf8'));
  for (const it of Q) {
    const [lvTag, qTag] = it.id.split('-Q');
    const lv = book.levels.find((l) => l.id === `${book.id}-${lvTag.slice(1)}`);
    const q = lv && lv.q && lv.q[Number(qTag) - 1];
    if (!q) { issues.push(`${qjson} ${it.id}：資料檔裡找不到這一題`); continue; }
    const cmp = (name, a, b) => { if (JSON.stringify(a) !== JSON.stringify(b)) issues.push(`${it.id} ${name}和 ${qjson} 不同`); };
    cmp('題幹', q[0], it.stem); cmp('正解', q[1], it.answer); cmp('干擾項', q[2], it.distractors.map((d) => d.text));
    cmp('提示', q[3], it.hints); cmp('詳解', q[4], it.explanation); cmp('附件', q[5] ?? null, it.attachment ?? null);
  }
  console.log(`已和 ${qjson} 比對 ${Q.length} 題`);
}

const count = book.levels.reduce((a, l) => a + (l.q ? l.q.length : 0), 0);
const drafts = book.levels.filter((l) => l.draft).map((l) => l.id);
console.log(`${book.id}：${book.zones.length} 個區域、${book.levels.length} 關、${count} 題${drafts.length ? `（草稿：${drafts.join('、')}）` : ''}`);
console.log(issues.length ? '發現問題：\n- ' + issues.join('\n- ') : '沒有問題');
process.exit(issues.length ? 1 : 0);
