// 四上英語（康軒 Wonder World 5）Unit 4 My Favorite Subject 的題目產生器：寫出 drafts/en4/en4-questions-U4.json。
// 題目改這支再重跑：node drafts/en4/build-U4.mjs
// 三關：en4-11 字彙與聽力、en4-12 句型與文法、en4-13 發音與閱讀。頁碼是課本印的頁碼。
//   Story pp.63–65、Vocabulary pp.66–67、Sentence A p.68、Sentence B p.69、Learn with Boka p.70、Grammar Tips p.71、
//   Reading pp.72–73（Compare and Contrast）、Phonics pp.74–75；More to Learn（p.76，Optional）不出題。
import { buildUnit, listen, SAY, passage, table } from './build-unit.mjs';

const { q, save } = buildUnit('U4');

// ───────── en4-11 字彙與聽力（Vocabulary pp.66–67、Story pp.63–65）─────────
q('L11-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的科目。', listen('science', 0.8),
  'science',
  [['social studies', '音近字', '開頭都是 s 的音，只聽開頭就作答'],
   ['music', '音近字', '結尾都有 s 的音，只聽結尾就作答'],
   ['Chinese', '音近字', '結尾有相似的音，沒聽清楚開頭']],
  ['先聽開頭的音。', '開頭是 s 的有兩個選項，再聽它是一個字還是兩個字。', '這個科目只有一個字，母音和 night 一樣。'],
  { concept: '念的是 science（自然科學）。science 只有一個字，開頭的 sc 念 s 的音；social studies 是兩個字。',
    ref: 'Unit 4 Vocabulary（課本 p.67）' });

q('L11-Q2', '聽力：聽音選意思',
  '請聽英文，選出意思正確的中文。', listen('social studies', 0.8),
  '社會',
  [['自然科學', '音近字', 'social 和 science 開頭都是 s 的音，只聽開頭就作答'],
   ['音樂', '中文意思混淆', '沒聽清楚，就選了課本上排在旁邊的科目'],
   ['體育', '中文意思混淆', '只記得這個科目的英文很長，和體育記混了']],
  ['先聽一共念了幾個字。', '這個科目有兩個字，第二個字是 studies。', '想想課本上學地方、歷史和生活的那一科。'],
  { concept: '念的是 social studies（社會），有兩個字；science 是自然科學，只有一個字。',
    ref: 'Unit 4 Vocabulary（課本 p.67）' });

q('L11-Q3', '字彙：看中文選英文',
  '「體育」的英文是哪一個？', null,
  'PE',
  [['art', '中文意思混淆', '美術和體育都是要動手動腳的課，記混了'],
   ['music', '中文意思混淆', '音樂和體育常常在別的教室上，記混了'],
   ['math', '中文意思混淆', '只記得是很短的英文，和數學記混了']],
  ['體育的英文很短，是一個縮寫。', '縮寫的每個字母都要大寫。', '這兩個字母是 Physical Education 這兩個字的開頭字母。'],
  { concept: '體育是 PE（Physical Education 的縮寫），兩個字母都大寫。',
    ref: 'Unit 4 Vocabulary（課本 p.67）' });

q('L11-Q4', '字彙：科目的拼法',
  '「自然科學」的英文，哪一個拼對了？', null,
  'science',
  [['sience', '拼字錯誤', '照念的音拼，漏掉了 s 後面不發音的 c'],
   ['scence', '拼字錯誤', '漏掉了中間的 i'],
   ['sciense', '拼字錯誤', '把結尾的 ce 寫成 se']],
  ['science 開頭的 s 後面有一個不發音的字母。', '先寫 sci，再寫 en。', '結尾和 nice 的結尾一樣，是 ce。'],
  { concept: '自然科學是 science：s-c-i-e-n-c-e。開頭 sc 念 s 的音，結尾是 ce。',
    ref: 'Unit 4 Vocabulary（課本 p.67）' });

q('L11-Q5', '故事：Boka 的星期二',
  '在 Unit 4 的故事裡，Boka 星期二有哪兩堂課？', null,
  'PE class and cooking class',
  [['math class and PE class', '故事細節混淆', '記得 Amy 數學考一百分，就以為 Boka 星期二有數學課'],
   ['art class and cooking class', '故事細節混淆', '把 Jello 最喜歡的美術課當成 Boka 的'],
   ['English class and PE class', '故事細節混淆', '把 Kevin 最喜歡的英語課當成 Boka 的']],
  ['回想故事裡 Kevin 猜 Boka 喜歡星期二。', '那天有 Boka 最喜歡的科目。', 'Boka 還說那天他也有另一堂課，和吃東西有關。'],
  { concept: 'Boka 最喜歡體育，他星期二有 PE class，還有 cooking class（烹飪課），所以他最喜歡星期二。',
    ref: 'Unit 4 Story（課本 p.65）' });

q('L11-Q6', '聽力：聽句子選意思',
  '請聽英文，選出意思正確的中文。', listen('My favorite subject is music.', 0.9),
  '我最喜歡的科目是音樂。',
  [['我最喜歡的科目是數學。', '音近字', 'music 和 math 開頭都是 m，只聽開頭就作答'],
   ['他最喜歡的科目是音樂。', '人稱混淆', '把開頭的 My 聽成 His'],
   ['你最喜歡的科目是音樂嗎？', '句型混淆', '把說自己的事聽成問別人']],
  ['先聽句子開頭是 My、His 還是 What\'s。', '再聽 is 後面的科目。', '這個科目開頭是 m，有兩個音節。'],
  { concept: 'My favorite subject is music. 是「我最喜歡的科目是音樂」。math 是數學，只有一個音節。',
    ref: 'Unit 4 Sentence A（課本 p.68）' });

q('L11-Q7', '聽力：聽短對話',
  '請聽對話，選出正確的說法。',
  listen("Ben: What's your favorite subject, Kay? Kay: My favorite subject is art. How about you, Ben? Ben: I like math the best.", 0.9),
  'Kay 最喜歡美術，Ben 最喜歡數學。',
  [['Kay 最喜歡數學，Ben 最喜歡美術。', '對話資訊錯置', '兩個科目都聽對了，但配錯了人'],
   ['Kay 和 Ben 都最喜歡美術。', '對話資訊錯置', '沒聽到 Ben 最後說他最喜歡的科目'],
   ['Kay 最喜歡音樂，Ben 最喜歡數學。', '音近字', '沒聽清楚 Kay 說的科目']],
  ['先聽 Ben 問 Kay 什麼，Kay 怎麼回答。', 'How about you? 是「那你呢？」，換 Ben 回答。', 'I like … the best. 也是在說最喜歡的科目。'],
  { concept: 'Kay 說 My favorite subject is art.（最喜歡美術）；Ben 說 I like math the best.（最喜歡數學）。',
    ref: 'Unit 4 Sentence A（課本 p.68）、Grammar Tips（課本 p.71）' });

// ───────── en4-12 句型與文法（Sentence A p.68、Sentence B p.69、Learn with Boka p.70、Grammar Tips p.71）─────────
q('L12-Q1', '句型：問對方最喜歡的科目',
  '你想問同學最喜歡的科目，選出正確的字填入空格：「What\'s ____ favorite subject?」', null,
  'your',
  [['you', '所有格混淆', '用了「你」，沒有用「你的」'],
   ["you're", '所有格混淆', "you're 是 you are 的縮寫，不是「你的」"],
   ['my', '人稱混淆', '用了「我的」，變成問自己']],
  ['這句是在問「你的」最喜歡的科目。', '「你」是 you，「你的」要怎麼說？', '回想 Learn with Boka：你的、我的、他的……'],
  { concept: '問對方：What\'s your favorite subject?。your 是「你的」。',
    ref: 'Unit 4 Sentence A（課本 p.68）、Learn with Boka（課本 p.70）' });

q('L12-Q2', '句型：說別人最喜歡的科目',
  '「What\'s Kevin\'s favorite subject?」Kevin 最喜歡英語，要怎麼回答？', null,
  'His favorite subject is English.',
  [['Her favorite subject is English.', '所有格混淆', 'Kevin 是男生，要用 his'],
   ['He favorite subject is English.', '所有格混淆', '用了「他」，沒有用「他的」'],
   ['Kevin favorite subject is English.', '所有格混淆', '用人名時要加 \'s，變成 Kevin\'s']],
  ['Kevin 是男生還是女生？', '要說「他的」最喜歡的科目，不是「他」。', '回想 Sentence B：男生用 His，女生用 Her。'],
  { concept: 'Kevin 是男生，「他的」是 his：His favorite subject is English.',
    ref: 'Unit 4 Sentence B（課本 p.69）' });

q('L12-Q3', '文法：his 或 her',
  'Amy 最喜歡自然科學。選出正確的字填入空格：「____ favorite subject is science.」', null,
  'Her',
  [['She', '所有格混淆', '用了「她」，沒有用「她的」'],
   ['His', '所有格混淆', 'Amy 是女生，不能用 his'],
   ['Amy', '所有格混淆', '用人名時要加 \'s，寫成 Amy\'s']],
  ['空格要填「她的」。', 'Amy 是女生，「她」是 she。', '「她的」和「她」寫法不一樣，回想 Learn with Boka。'],
  { concept: 'Amy 是女生，「她的」是 her：Her favorite subject is science.',
    ref: 'Unit 4 Sentence B（課本 p.69）、Learn with Boka（課本 p.70）' });

q('L12-Q4', '文法：our',
  'Tom 和我都最喜歡體育。選出正確的字填入空格：「____ favorite subject is PE.」', null,
  'Our',
  [['We', '所有格混淆', '用了「我們」，沒有用「我們的」'],
   ['Their', '人稱混淆', '用了「他們的」，但說話的人自己也在裡面'],
   ['My', '人稱混淆', '只說了自己，漏掉了 Tom']],
  ['Tom 和我，合起來是「我們」。', '空格要填「我們的」。', '回想 Learn with Boka 最後一行：你們的、我們的、他們的。'],
  { concept: 'Tom 和我是「我們」，「我們的」是 our：Our favorite subject is PE.',
    ref: 'Unit 4 Learn with Boka（課本 p.70）' });

q('L12-Q5', '文法：their',
  'Boka 和 Jello 都最喜歡國語。選出正確的字填入空格：「____ favorite subject is Chinese.」', null,
  'Their',
  [['They', '所有格混淆', '用了「他們」，沒有用「他們的」'],
   ['Our', '人稱混淆', '說話的人不在裡面，不能用「我們的」'],
   ['His', '人稱混淆', '兩個人要用「他們的」，不能只用一個人的 his']],
  ['Boka 和 Jello 是兩個人，可以用 they 代替。', '空格要填「他們的」。', '「他們的」和 they 開頭一樣都是 the，但寫法不同。'],
  { concept: '兩個別人是「他們」，「他們的」是 their：Their favorite subject is Chinese.',
    ref: 'Unit 4 Learn with Boka（課本 p.70）、Grammar Tips（課本 p.71）' });

q('L12-Q6', '句型：看表格回答',
  '依表格回答：「What\'s Dan\'s favorite subject?」', table(['名字', '最喜歡的科目'], [['Mia', 'PE'], ['Dan', 'music']], 'Mia 是女生，Dan 是男生'),
  'His favorite subject is music.',
  [['Her favorite subject is music.', '所有格混淆', 'Dan 是男生，要用 his'],
   ['His favorite subject is PE.', '表格讀錯', '把 Mia 最喜歡的科目當成 Dan 的'],
   ['His favorite subject are music.', 'be 動詞混淆', '一個科目要用 is，不用 are']],
  ['先在表格找到 Dan 那一列。', 'Dan 是男生，「他的」要用哪個字？', '最後檢查 subject 後面的 be 動詞。'],
  { concept: 'Dan 最喜歡音樂，他是男生，用 his：His favorite subject is music.',
    ref: 'Unit 4 Sentence B（課本 p.69）' });

q('L12-Q7', '文法：選出正確的句子',
  '下面哪一句英文是正確的？', null,
  "What's her favorite subject?",
  [["What's she favorite subject?", '所有格混淆', '用了「她」，沒有用「她的」'],
   ['What her favorite subject?', '句型混淆', '漏了 is，What\'s 是 What is 的縮寫'],
   ["What's her favorite subjects?", '單複數混淆', '最喜歡的只有一個科目，不能用複數']],
  ['先看 What 後面有沒有 is。', '再看「她的」寫對了沒有。', '最後看「最喜歡的科目」是一個還是很多個。'],
  { concept: 'What\'s 是 What is；「她的」是 her；最喜歡的科目只有一個：What\'s her favorite subject?',
    ref: 'Unit 4 Sentence B（課本 p.69）' });

// ───────── en4-13 發音與閱讀（Phonics pp.74–75、Reading pp.72–73）─────────
q('L13-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的字。可以按喇叭聽每個選項。', { ...listen('glue', 0.8), ...SAY },
  'glue',
  [['blue', '音近字', '母音一樣，但沒聽清楚開頭是 g 還是 b'],
   ['flute', '音近字', '母音一樣，但沒注意 flute 結尾還有 t 的音'],
   ['fruit', '音近字', '母音一樣，但沒注意 fruit 開頭是 fr、結尾有 t']],
  ['四個字的母音都一樣，要比開頭和結尾。', '先聽開頭是 gl、bl 還是 fl、fr。', '再聽結尾有沒有 t 的音。'],
  { concept: '念的是 glue（膠水）。開頭是 gl，結尾沒有 t；blue 開頭是 bl。',
    ref: 'Unit 4 Phonics Sound It Out（課本 p.74）' });

q('L13-Q2', '發音：選出母音念法不同的字',
  '下面四個字，哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。', SAY,
  'clay',
  [['Luke', '拼字組合混淆', '看到 u_e 和 ue、ui 的字母不同，就以為念法也不同'],
   ['glue', '拼字組合混淆', '看到 ue 和 u_e、ui 的字母不同，就以為念法也不同'],
   ['fruit', '拼字組合混淆', '看到 ui 和 u_e、ue 的字母不同，就以為念法也不同']],
  ['先聽每個字的母音，不要只看拼法。', 'Luke 的 u_e、glue 的 ue、fruit 的 ui 念法一樣。', '找一找哪一個字裡沒有 u，母音和 day 一樣。'],
  { concept: 'Luke、glue、fruit 的母音念法一樣；clay 的 ay 念長音 a，和 day 一樣，所以不同。',
    ref: 'Unit 4 Phonics Sound It Out（課本 p.74）、Listen and Circle（課本 p.75）' });

q('L13-Q3', '發音：u_e 的兩種念法',
  'u_e 有兩種念法。哪一個字的 u_e 念法和 cute 一樣（母音前面先有 y 的音）？可以按喇叭聽每個字。', SAY,
  'mule',
  [['Luke', '發音規則混淆', 'Luke 也是 u_e，但它的母音前面沒有 y 的音'],
   ['flute', '發音規則混淆', 'flute 也是 u_e，但念法和 Luke 一樣'],
   ['glue', '拼字組合混淆', 'glue 是 ue 的拼法，母音前面沒有 y 的音']],
  ['先念 cute，c 和 u 之間像多了一個 y 的音。', 'Luke 的 u_e 沒有 y 的音，是另一種念法。', '一個一個聽，找母音前面也有 y 的音的字。'],
  { concept: 'u_e 有兩種念法：cute、mule 念 [ju]（母音前有 y 的音）；Luke、flute 念 [u]。glue 的 ue 也念 [u]。',
    ref: 'Unit 4 Phonics Sound It Out（課本 p.74）、Listen and Circle（課本 p.75）' });

const twoKids = passage(
  "Nick has music class on Monday. He is singing. Lucy has art class on Monday. She is painting. On Thursday, Nick and Lucy have English class. They are reading English books. They both like English."
);

q('L13-Q4', '閱讀：比較和對比（Compare and Contrast）',
  '依上面的短文，Nick 和 Lucy 都喜歡哪一科？', twoKids,
  '英語',
  [['音樂', '比較不完整', '只看到 Nick 上音樂課，沒注意 Lucy 不在音樂課'],
   ['美術', '比較不完整', '只看到 Lucy 上美術課，沒注意 Nick 不在美術課'],
   ['數學', '文意推論過度', '短文沒有提到數學']],
  ['先找出兩個人各自在星期一上什麼課。', '再找兩個人一起上的課。', 'both 是「兩個都」，看那一句前面說的是哪一科。'],
  { concept: '星期一 Nick 上音樂、Lucy 上美術，兩人不一樣；星期四兩人都上英語，They both like English.',
    ref: 'Unit 4 Reading（課本 pp.72–73）、Reading Skills：Compare and Contrast' });

q('L13-Q5', '閱讀：找出不同的地方',
  '依上面的短文，Lucy 星期一在做什麼？', twoKids,
  '畫畫',
  [['唱歌', '比較不完整', '把 Nick 在音樂課做的事當成 Lucy 的'],
   ['讀英文書', '細節讀錯', '這是兩人星期四在英語課做的事'],
   ['寫中文字', '文意推論過度', '把課本 Boka 和 Jello 在國語課做的事帶進來']],
  ['先找到 Lucy 星期一上的課。', '再看下一句 She is … 說她在做什麼。', 'painting 是 paint 加 ing，paint 是什麼？'],
  { concept: 'Lucy has art class on Monday. She is painting.：Lucy 星期一在美術課畫畫。',
    ref: 'Unit 4 Reading（課本 pp.72–73）' });

q('L13-Q6', '閱讀：課本短文',
  '課本 Reading「My Favorite Subject」裡，Boka 在體育課做什麼？', null,
  '打樂樂棒球（tee ball）',
  [['畫畫（painting）', '細節讀錯', '這是 Jello 在美術課做的事'],
   ['寫中文字（writing Chinese words）', '細節讀錯', '這是 Boka 和 Jello 一起在國語課做的事'],
   ['做菜（cooking）', '故事細節混淆', '把故事裡的烹飪課和課本短文記混了']],
  ['回想課本裡 Boka 星期二上的課。', '他在那堂課 is playing 某一種球。', '那種球的英文是兩個字，第二個字是 ball。'],
  { concept: '課本說 Boka has PE class on Tuesday. He is playing tee ball.：Boka 在體育課打樂樂棒球。',
    ref: 'Unit 4 Reading（課本 p.72）' });

q('L13-Q7', '聽力：聽短文找細節',
  '請聽英文，選出正確的說法。',
  listen("My name is Sue. I have a blue flute. I play it in music class on Friday.", 0.9),
  'Sue 星期五在音樂課吹藍色的笛子。',
  [['Sue 星期四在音樂課吹藍色的笛子。', '音近字', '沒聽清楚 on 後面的星期'],
   ['Sue 星期五在美術課吹藍色的笛子。', '中文意思混淆', '星期聽對了，但沒聽清楚是哪一堂課'],
   ['Sue 星期五在音樂課吹黃色的笛子。', '中文意思混淆', '沒聽清楚 flute 前面的顏色']],
  ['先聽 Sue 的笛子是什麼顏色。', '再聽她在哪一堂課吹笛子。', '最後聽 on 後面的星期，開頭是 F。'],
  { concept: 'Sue 說 I have a blue flute. I play it in music class on Friday.：星期五在音樂課吹藍色的笛子。blue、flute 的母音和 Sue 一樣。',
    ref: 'Unit 4 Phonics Listen and Say（課本 p.75）、Sentence A（課本 p.68）' });

save();
