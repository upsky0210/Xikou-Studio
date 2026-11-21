import { writeFileSync } from 'node:fs';

export const table = (headers, rows, cap) => ({ t: [headers, ...rows], cap });

export function buildUnit(unit) {
  const questions = [];

  function lesson(number, name, rows) {
    rows.forEach(([type, page, stem, answer, choices, hints, concept, options = {}], index) => {
      const level = 'L' + String(number).padStart(2, '0');
      const id = level + '-Q' + (index + 1);
      const distractors = choices.map(([text, trap, misconception]) => ({ text, misconception, trap }));
      const question = {
        id, level, type, stem, attachment: options.attachment ?? null, answer, distractors, hints,
        explanation: [
          '正確概念：' + concept,
          '破誤：' + distractors.map(({ text, misconception }) => `「${text}」：${misconception}`).join('；') + '。',
          `證據提示：回課本第 ${page} 頁「${name}」。`,
        ].join('\n'),
        verify: { kind: 'judge', basis: `課本 p.${page}「${name}」：${options.basis ?? concept}` },
      };
      if (options.source) {
        question.source = '改作自 JDPS-SS（陳煥文，CC BY-NC-SA 4.0）翰林四上社會 h4：' + options.source;
      }
      questions.push(question);
    });
  }

  function save() {
    const filename = new URL(`ss4-questions-U${unit}.json`, import.meta.url);
    writeFileSync(filename, JSON.stringify(questions, null, 1) + '\n');
    console.log(`寫出 ${questions.length} 題：drafts/ss4/ss4-questions-U${unit}.json`);
  }

  return { lesson, save };
}
