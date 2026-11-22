import { writeFileSync } from 'node:fs';

export const d = (text, misconception) => ({ text, misconception });

export function question(type, stem, answer, distractors, hints, concept, basis, read, att = null) {
  const corrections = distractors.map(({ text, misconception }) => `「${text}」：${misconception}`).join(' ');
  return {
    type,
    stem,
    answer,
    distractors,
    hints,
    explanation: `正確概念：${concept}\n破誤：${corrections}\n回頭讀：${read}`,
    verify: { kind: 'judge', basis },
    ...(att ? { att } : {}),
  };
}

export function writeBatch(batch, lessons) {
  const questions = [];
  for (const { level, passage, items } of lessons) {
    const id = level.split(' ')[0];
    const length = [...passage].length;
    if (items.length !== 7 || length < 250 || length > 300) {
      throw new Error(`${id} 應有 7 題及一篇 250～300 字的短文，目前 ${items.length} 題、短文 ${length} 字。`);
    }
    console.log(`${id} 短文 ${length} 字（含標點）`);
    for (const [index, item] of items.entries()) {
      const number = index + 1;
      const { type, stem, att, ...details } = item;
      const attachment = number === 5 || number === 7 ? { passage } : (att ?? null);
      questions.push({ id: `${id}-Q${number}`, level, type, stem, attachment, ...details });
    }
  }
  const file = `ck5-questions-${batch}.json`;
  writeFileSync(new URL(file, import.meta.url), JSON.stringify(questions, null, 2) + '\n', 'utf8');
  console.log(`寫出 ${questions.length} 題 → drafts/ck5/${file}`);
}
