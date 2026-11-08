// 把題目檔（questions.json 的格式）轉成給老師抽驗用的 Markdown 清單
// 用法：node tools/review-sheet.mjs <輸出.md> <題目檔.json> ...
import { readFileSync, writeFileSync } from 'node:fs';
import { FRAC } from './lib.mjs';

const [out, ...files] = process.argv.slice(2);
if (!out || !files.length) { console.log('用法：node tools/review-sheet.mjs <輸出.md> <題目檔.json> ...'); process.exit(1); }
// Markdown 裡分數寫成 3/4、2 又 1/3（避免 2 1/3 被看成 21/3）
const md = (s) => String(s).replace(FRAC, (_, w, n, d) => (w ? `${w} 又 ` : '') + `${n}/${d}`);
const verifyText = (v) => {
  if (!v) return '（沒有 verify）';
  if (v.kind === 'judge') return `概念判斷題，請人工確認：${md(v.basis)}`;
  if (v.kind === 'expr') return `程式重算：${v.expr} ＝ ${md(v.expected)}`;
  if (v.kind === 'round') return `程式重算：${v.expr}，四捨五入到小數第 ${v.places} 位 ＝ ${v.expected}`;
  if (v.kind === 'min' || v.kind === 'max') return `程式重算：${Object.entries(v.exprs).map(([k, e]) => `${k}＝${e}`).join('、')}，最${v.kind === 'min' ? '小' : '大'}的是 ${v.expected}`;
  if (v.kind === 'gcd' || v.kind === 'lcm') return `程式重算：${v.nums.join('、')} 的${v.kind === 'gcd' ? '最大公因數' : '最小公倍數'}＝${v.expected}`;
  return `程式重算：${JSON.stringify(v)}`;
};
const checksText = (v) => (v && v.checks && v.checks.length ? `（另外驗算了干擾項和詳解裡的 ${v.checks.length} 個算式）` : '');
const attach = (a) => {
  if (!a) return '';
  if (a.t) return '\n' + a.t.map((r, i) => `| ${r.map(md).join(' | ')} |` + (i === 0 ? `\n|${r.map(() => '---').join('|')}|` : '')).join('\n') + '\n';
  if (a.list) return '\n' + a.list.map((x) => `> ${md(x)}`).join('\n>\n') + '\n';
  if (a.fig) return `\n\n![${a.alt}](../${a.fig})\n`;   // 清單放在 drafts/，圖在 data/fig/
  return `\n> ${md(a.text || a)}\n`;
};

const lines = ['# 題目抽驗清單', '',
  '每一題請看：①答案對不對 ②干擾項是不是真的會有學生選（對應的迷思合理嗎）③三段提示有沒有一段一段來、第 1 段沒有洩漏答案 ④詳解有沒有說清楚為什麼對、其他為什麼錯 ⑤題幹長度和用字六年級讀得懂嗎。',
  '有要改的，在題號後面寫下來就好（例如「L03-Q4：干擾項 C 太明顯」）。', ''];
for (const f of files) {
  const Q = JSON.parse(readFileSync(f, 'utf8'));
  let level = null;
  for (const it of Q) {
    if (it.level !== level) { level = it.level; lines.push(`## ${level}`, ''); }
    lines.push(`### ${it.id}　${md(it.type)}`, '');
    if (it.attachment) lines.push('**附件**' + attach(it.attachment));
    lines.push(`**題目**：${md(it.stem)}`, '', `**正解**：${md(it.answer)}`, '', '**干擾項**', '');
    for (const d of it.distractors) lines.push(`- ${md(d.text)}　←　${md(d.misconception)}`);
    lines.push('', '**提示**', '');
    it.hints.forEach((h, i) => lines.push(`${i + 1}. ${md(h)}`));
    const [ex, ...rest] = String(it.explanation).split('\n');
    lines.push('', `**詳解**：${md(ex)}`, ...rest.map((r) => `\n${md(r)}`), '', `**驗證**：${verifyText(it.verify)}${checksText(it.verify)}`, '', '---', '');
  }
}
writeFileSync(out, lines.join('\n'));
console.log('已產生 ' + out);
