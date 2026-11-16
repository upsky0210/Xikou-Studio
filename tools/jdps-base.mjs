// 把 JDPS-SS 的題庫取出來當「底稿」：node tools/jdps-base.mjs <版本代號> [版本代號 ...]
//   例：node tools/jdps-base.mjs mn5 zn5 n5 gk5
// 讀 private/jdps/JDPS-SS/index.html（不上傳；沒有的話請老師在這台電腦跑：
//   git clone --depth 1 https://github.com/shanechen07/JDPS-SS.git private/jdps/JDPS-SS）
// 輸出 private/jdps/<代號>-base.json：[{ id, z, name, topic, lesson, intro, q: [{ stem, answer, wrong, hints, exp, attach }] }]
// 只把題庫當文字解析，不執行那個檔案裡的任何程式。分數 {3/4} 會轉成我們的寫法 {{3/4}}。
// JDPS-SS 作者陳煥文，CC BY-NC-SA 4.0；改作的題目要在題目檔加 source 欄位。
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const SRC = 'private/jdps/JDPS-SS/index.html';
const keys = process.argv.slice(2);
if (!keys.length) { console.log('用法：node tools/jdps-base.mjs <版本代號> ...（例：mn5 zn5 n5 gk5）'); process.exit(1); }
if (!existsSync(SRC)) { console.log(`找不到 ${SRC}，請先把 JDPS-SS 抓到 private/jdps/JDPS-SS`); process.exit(1); }
const lines = readFileSync(SRC, 'utf8').split('\n');
const frac = (s) => s.replace(/\{(\d+(?:\s+\d+)?\/\d+)\}/g, '{{$1}}');

for (const key of keys) {
  const start = lines.findIndex((l) => l.startsWith(`VERSIONS.${key}=`));
  if (start < 0) { console.log(`${key}：找不到這個版本`); continue; }
  let end = lines.findIndex((l, i) => i > start && /^VERSIONS\.[a-z0-9]+=/.test(l));
  if (end < 0) end = lines.length;
  const levels = [];
  let cur = null, bad = 0;
  for (const raw of lines.slice(start, end)) {
    const line = raw.trim();
    const h = line.match(/^\{id:"(L\d+)",z:(\d+),name:"([^"]*)",topic:"([^"]*)",lesson:"([^"]*)",prop:"[^"]*",intro:"([^"]*)",q:\[$/);
    if (h) { cur = { id: h[1], z: +h[2], name: h[3], topic: h[4], lesson: h[5], intro: frac(h[6]), q: [] }; levels.push(cur); continue; }
    if (!line.startsWith('["') || !cur) continue;
    // 附件的鍵有的沒加引號（{t:[...], cap:"..."}），補上引號再當 JSON 讀
    const txt = line.replace(/,\s*$/, '').replace(/([{,]\s*)(t|list|cap|passage|text|svg)\s*:/g, '$1"$2":');
    try {
      const [stem, answer, wrong, hints, exp, attach] = JSON.parse(frac(txt));
      cur.q.push({ stem, answer, wrong, hints, exp, attach: attach || null });
    } catch { bad++; console.log(`  ${key} ${cur.id} 有一行看不懂：${line.slice(0, 60)}`); }
  }
  writeFileSync(`private/jdps/${key}-base.json`, JSON.stringify(levels, null, 1));
  console.log(`${key}：${levels.length} 關、${levels.reduce((a, l) => a + l.q.length, 0)} 題${bad ? `、看不懂 ${bad} 行` : ''} → private/jdps/${key}-base.json`);
}
