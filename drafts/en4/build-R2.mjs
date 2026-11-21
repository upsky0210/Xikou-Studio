// 四上英語（康軒 Wonder World 5）Review 2 的題目產生器：寫出 drafts/en4/en4-questions-R2.json。
// 題目改這支再重跑：node drafts/en4/build-R2.mjs
// 一關：en4-14 綜合複習（Unit 3～4）。課本 Review 2 pp.77–80：Listen and Number、Read, Circle, and Write（Compare and Contrast）、Write, Read, and Play。
import { buildUnit, listen, SAY, passage } from './build-unit.mjs';

const { q, save } = buildUnit('R2');

q('L14-Q1', '字彙：分辨星期和科目',
  '下面哪一個不是科目？', null,
  'Thursday',
  [['science', '字彙分類混淆', '不熟自然科學的英文，就以為它不是科目'],
   ['music', '字彙分類混淆', '把音樂當成休閒活動，沒想到它也是一個科目'],
   ['art', '字彙分類混淆', '不熟美術的英文，就以為它不是科目']],
  ['先把每個字翻成中文。', '這四個字裡有三個是 Unit 4 的科目。', '剩下的那一個是 Unit 3 學過的，結尾是 day。'],
  { concept: 'Thursday 是星期四，是 Unit 3 的星期；science（自然科學）、music（音樂）、art（美術）都是 Unit 4 的科目。',
    ref: 'Unit 3 Vocabulary（課本 p.53）、Unit 4 Vocabulary（課本 pp.66–67）' });

q('L14-Q2', '聽力：聽短文選意思',
  '請聽英文，選出意思正確的中文。', listen('Today is Wednesday. Lily has PE class. She is swimming.', 0.9),
  '今天是星期三，Lily 在體育課游泳。',
  [['今天是星期四，Lily 在體育課游泳。', '音近字', '沒聽清楚 Today is 後面的星期'],
   ['今天是星期三，Lily 在音樂課唱歌。', '中文意思混淆', '星期聽對了，但課和動作都聽錯了'],
   ['今天是星期三，Lily 在體育課畫畫。', '中文意思混淆', '課聽對了，但沒聽清楚她在做什麼']],
  ['先聽今天是星期幾，開頭是 W。', '再聽 Lily 上的是哪一堂課。', '最後聽 She is 後面的動作。'],
  { concept: 'Today is Wednesday. Lily has PE class. She is swimming.：今天是星期三，Lily 在體育課游泳。',
    ref: 'Unit 3 Sentence A（課本 p.54）、Review 2 Listen and Number（課本 p.77）' });

q('L14-Q3', '句型：選出正確的問答',
  '下面哪一組問答是正確的？', null,
  "Is it Tuesday today? — Yes, it is. I have PE class.",
  [["Is it Tuesday today? — Yes, it isn't. I have PE class.", '簡答不一致', 'Yes 後面要用 it is，不能用 isn\'t'],
   ["What day is today? — My favorite subject is PE.", '答非所問', '問的是星期幾，卻回答最喜歡的科目'],
   ["What's your favorite subject? — It's Tuesday.", '答非所問', '問的是最喜歡的科目，卻回答星期幾']],
  ['先看每一組的問句在問什麼。', '問星期幾，就要回答星期；問科目，就要回答科目。', '再檢查 Yes 或 No 後面的簡答有沒有配對。'],
  { concept: 'Is it Tuesday today? 回答 Yes, it is.，再補充 I have PE class.。問句和回答要配合：問星期回答星期，問科目回答科目。',
    ref: 'Unit 3 Sentence B（課本 p.55）、Unit 4 Sentence A（課本 p.68）' });

const notes = passage(
  "Hi, I'm Ruby. My favorite subject is science. I have science class on Monday. I don't like math. — Hi, I'm Josh. My favorite subject is PE. I have PE class on Friday. I like science, too. I don't like math."
);

q('L14-Q4', '閱讀：比較和對比（Compare and Contrast）',
  '上面是 Ruby 和 Josh 寫的兩段話。他們兩個都喜歡哪一科？', notes,
  '自然科學',
  [['體育', '比較不完整', '只看到 Josh 最喜歡體育，沒看 Ruby 有沒有說喜歡'],
   ['數學', '細節讀錯', '兩個人都提到數學，但都是 don\'t like'],
   ['英語', '文意推論過度', '兩段話都沒有提到英語']],
  ['先找出 Ruby 喜歡和不喜歡的科目。', '再找出 Josh 喜歡和不喜歡的科目。', 'Josh 說 I like …, too.，too 表示他和 Ruby 一樣。'],
  { concept: 'Ruby 最喜歡 science，Josh 說 I like science, too.，兩個人都喜歡自然科學；兩人都不喜歡數學。',
    ref: 'Review 2 Read, Circle, and Write（課本 pp.78–79）、Reading Skills：Compare and Contrast' });

q('L14-Q5', '閱讀：判斷對錯',
  '依上面兩段話，哪一個說法是對的？', notes,
  'Josh 星期五有體育課。',
  [['Ruby 最喜歡數學。', '細節讀錯', 'Ruby 說的是 I don\'t like math.'],
   ['Josh 不喜歡自然科學。', '細節讀錯', 'Josh 說 I like science, too.'],
   ['Ruby 星期五有自然課。', '比較不完整', '星期五是 Josh 的體育課；Ruby 的自然課在星期一']],
  ['一個一個選項回到短文裡找證據。', '注意 don\'t like 和 like 的不同。', '比一比兩個人各自的課是星期幾。'],
  { concept: 'Josh 說 I have PE class on Friday.，所以「Josh 星期五有體育課」是對的。',
    ref: 'Review 2 Read, Circle, and Write（課本 pp.78–79）' });

q('L14-Q6', '發音：比較母音',
  '哪一個字的母音和 boat 的母音相同？可以按喇叭聽每個字。', SAY,
  'snow',
  [['not', '長短音混淆', '看到 o 就選了，沒注意 not 的 o 念短音'],
   ['glue', '母音混淆', '把 ue 的音和長音 o 聽混了'],
   ['night', '拼字組合混淆', '看到 night 和 snow 一樣有不發音的字母，就以為念法一樣']],
  ['先念 boat，它的 oa 念什麼音？', '長音 o 還可以拼成 o_e 或 ow。', '找一個用 ow 拼出長音 o 的字。'],
  { concept: 'boat 的 oa 和 snow 的 ow 都念長音 o；not 念短音 o，glue 念 [u]，night 念長音 i。',
    ref: 'Unit 3 Phonics（課本 p.60）、Review 2 Write, Read, and Play（課本 p.80）' });

q('L14-Q7', '聽力：聽短對話',
  '請聽對話，選出正確的說法。',
  listen("Mark: Is it Thursday today? Ruby: No, it isn't. It's Friday. We have music class today. Mark: Great! Music is my favorite subject.", 0.9),
  '今天是星期五，Mark 最喜歡音樂。',
  [['今天是星期四，Mark 最喜歡音樂。', '對話資訊錯置', '聽到問句裡的 Thursday 就選了，沒聽到 Ruby 說 No'],
   ['今天是星期五，Ruby 最喜歡音樂。', '人稱混淆', '說最喜歡音樂的是 Mark，不是 Ruby'],
   ['今天是星期五，Mark 最喜歡數學。', '音近字', 'music 和 math 開頭都是 m，沒聽清楚']],
  ['先聽 Mark 問今天是不是星期四，Ruby 怎麼回答。', 'Ruby 說 No 以後，又說了今天真正是星期幾。', '最後聽 Mark 說哪一科是 my favorite subject。'],
  { concept: 'Ruby 說 No, it isn\'t. It\'s Friday.，今天是星期五；Mark 說 Music is my favorite subject.，他最喜歡音樂。',
    ref: 'Unit 3 Sentence B（課本 p.55）、Unit 4 Sentence A（課本 p.68）' });

save();
