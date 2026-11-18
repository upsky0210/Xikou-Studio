// 五上社會題目產生器的共用函式：build-U1.mjs～build-U4.mjs 都用這支。
// q(題號, 題型, 題幹, 附件, 正解, [[干擾項, trap, misconception]×3], [提示×3], 詳解, source?)
//   詳解寫成 { concept, wrong, page, where, basis }：
//     concept 正解為什麼對；wrong 三個干擾項各錯在哪；page 課本頁碼；where 課次與段落；basis 依據要點（寫進 verify）。
//   產生的詳解固定三段：「正確概念：…」「破誤：…」「證據提示：回課本第 N 頁，第○課「○○」。」
//   source 只有題型或情境取自 JDPS 的題目才寫（完全自編的不寫）。
import { writeFileSync } from 'node:fs';

const JDPS = '改作自 JDPS-SS（CC BY-NC-SA 4.0）：';
export const table = (headers, rows) => ({ t: [headers, ...rows] });

export function buildUnit(unit) {
  const out = [];

  function q(id, type, stem, attachment, answer, d, hints, e, source) {
    if (d.length !== 3 || hints.length !== 3) throw new Error(`${id}：干擾項或提示不是 3 個`);
    const o = {
      id, level: id.slice(0, 3), type, stem, attachment, answer,
      distractors: d.map(([text, trap, misconception]) => ({ text, misconception, trap })),
      hints,
      explanation: `正確概念：${e.concept}\n破誤：${e.wrong}\n證據提示：回課本第 ${e.page} 頁，${e.where}。`,
      verify: { kind: 'judge', basis: `課本 p.${e.page}：${e.basis}` },
    };
    if (source) o.source = JDPS + source;
    out.push(o);
  }

  function save() {
    const file = `ss5-questions-U${unit}.json`;
    writeFileSync(new URL(file, import.meta.url), JSON.stringify(out, null, 1) + '\n');
    console.log(`寫出 ${out.length} 題：drafts/ss5/${file}`);
  }

  return { q, save };
}
