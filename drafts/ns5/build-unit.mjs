import { writeFileSync } from 'node:fs';

export const table = (headers, rows) => ({ t: [headers, ...rows] });

export function buildUnit(unit) {
  const questions = [];

  function q(id, type, stem, answer, wrong, hints, concept, page, evidence, attachment = null) {
    const distractors = wrong.map(([text, trap, misconception]) => ({ text, trap, misconception }));
    const basis = `課本 p.${page}：${evidence}`;
    questions.push({
      id, level: id.split('-')[0], type, stem, attachment, answer, distractors, hints,
      explanation: `正確概念：${concept}\n證據提示：課本第 ${page} 頁，${evidence}`,
      verify: { kind: 'judge', basis },
    });
  }

  function save() {
    const file = `ns5-questions-U${unit}.json`;
    writeFileSync(new URL(file, import.meta.url), JSON.stringify(questions, null, 1) + '\n');
    console.log(`寫出 ${questions.length} 題：drafts/ns5/${file}`);
  }

  return { q, save };
}
