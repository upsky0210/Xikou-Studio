import { writeFileSync } from 'node:fs';

// 四上自然（ns4）共用：q(id, 題型, 題幹, 正解, [[干擾項, trap, misconception]×3], [提示×3], 正確概念, 頁碼, 證據, 附件?, JDPS 來源?)
export const fig = (name, alt) => ({ fig: `data/fig/ns4-${name}.svg`, alt });
export const table = (headers, rows) => ({ t: [headers, ...rows] });

export function buildUnit(unit) {
  const questions = [];

  function q(id, type, stem, answer, wrong, hints, concept, page, evidence, attachment = null, source = null) {
    const distractors = wrong.map(([text, trap, misconception]) => ({ text, trap, misconception }));
    const basis = `課本 p.${page}：${evidence}`;
    questions.push({
      id, level: id.split('-')[0], type, stem, attachment, answer, distractors, hints,
      explanation: `正確概念：${concept}\n證據提示：課本第 ${page} 頁，${evidence}`,
      verify: { kind: 'judge', basis },
      ...(source ? { source: '改作自 JDPS-SS（CC BY-NC-SA 4.0）：' + source } : {}),
    });
  }

  function save() {
    const file = `ns4-questions-U${unit}.json`;
    writeFileSync(new URL(file, import.meta.url), JSON.stringify(questions, null, 1) + '\n');
    console.log(`寫出 ${questions.length} 題：drafts/ns4/${file}`);
  }

  return { q, save };
}
