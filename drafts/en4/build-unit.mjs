// 四上英語題目產生器的共用函式：build-U1.mjs～build-U4.mjs、build-R1.mjs、build-R2.mjs 都用這支。不要隨便改這支（六個題目檔都在用）。
// q(題號, 題型, 題幹, 附件, 正解, [[干擾項, trap, misconception]×3], [提示×3], { concept, ref, basis })
//   concept 正解為什麼對；ref「回頭讀」要指的課本欄名和頁碼（學生課本找得到的地方）；basis 依據要點（寫進 verify，可省略）。
//   詳解固定三段：「正確概念：…」「破誤：「干擾項」：原因；…」「回頭讀：…。」
// 聽力附件用 listen(英文, 語速)；選項可點播用 SAY；短文用 passage(文字)；表格用 table([標題列], [資料列]…)。
import { writeFileSync } from 'node:fs';

export const listen = (text, rate = 0.9) => ({ listen: text, rate });
export const SAY = { speakOptions: true };
export const passage = (text) => ({ passage: text });
export const table = (headers, rows, cap) => (cap ? { t: [headers, ...rows], cap } : { t: [headers, ...rows] });

export function buildUnit(name) {
  const out = [];

  function q(id, type, stem, attachment, answer, d, hints, e) {
    if (d.length !== 3 || hints.length !== 3) throw new Error(`${id}：干擾項或提示不是 3 個`);
    if (!e.concept || !e.ref) throw new Error(`${id}：詳解少了 concept 或 ref`);
    out.push({
      id, level: id.slice(0, 3), type, stem, attachment, answer,
      distractors: d.map(([text, trap, misconception]) => ({ text, misconception, trap })),
      hints,
      explanation: `正確概念：${e.concept}\n破誤：${d.map(([t, , m]) => `「${t}」：${m}`).join('；')}。\n回頭讀：${e.ref}。`,
      verify: { kind: 'judge', basis: `${e.ref}${e.basis ? '：' + e.basis : ''}；聽力對話與閱讀短文為自行編寫` },
    });
  }

  function save() {
    const file = `en4-questions-${name}.json`;
    writeFileSync(new URL(file, import.meta.url), JSON.stringify(out, null, 1) + '\n');
    console.log(`寫出 ${out.length} 題：drafts/en4/${file}`);
  }

  return { q, save };
}
