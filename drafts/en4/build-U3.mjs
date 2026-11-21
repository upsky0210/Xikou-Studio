// 四上英語（康軒 Wonder World 5）Unit 3 A Fun Day 的題目產生器：寫出 drafts/en4/en4-questions-U3.json。
// 題目改這支再重跑：node drafts/en4/build-U3.mjs
// 三關：en4-08 字彙與聽力、en4-09 句型與文法、en4-10 發音與閱讀。頁碼是課本印的頁碼。
//   Story pp.49–51、Vocabulary pp.52–53、Sentence A p.54、Sentence B p.55、Learn with Boka p.56、Grammar Tips p.57、
//   Reading pp.58–59（Take Notes）、Phonics pp.60–61；More to Learn（p.62，Optional）不出題。
import { buildUnit, listen, SAY, passage, table } from './build-unit.mjs';

const { q, save } = buildUnit('U3');

// ───────── en4-08 字彙與聽力（Vocabulary pp.52–53、Story pp.49–51）─────────
q('L08-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的星期。', listen('Thursday', 0.8),
  'Thursday',
  [['Tuesday', '音近字', '沒分清楚開頭是 t 還是 th 的音'],
   ['Wednesday', '音近字', '記得是一週中間的日子，沒聽清楚開頭'],
   ['Saturday', '音近字', '結尾都是 day，只聽結尾就作答']],
  ['所有星期的結尾都是 day，要聽前面。', '開頭是 T 的有兩個，再分清楚開頭是 Tues 還是 Thurs。', '這個字開頭要把舌頭放在牙齒中間，像 three 的開頭。'],
  { concept: '念的是 Thursday（星期四）。Thursday 開頭的 th 和 three 一樣；Tuesday（星期二）開頭是 t 的音。',
    ref: 'Unit 3 Vocabulary（課本 pp.52–53）' });

q('L08-Q2', '聽力：聽音選意思',
  '請聽英文，選出意思正確的中文。', listen('Wednesday', 0.8),
  '星期三',
  [['星期二', '中文意思混淆', '記得 Wednesday 在一週中間，但和前一天記混了'],
   ['星期四', '中文意思混淆', '記得 Wednesday 在一週中間，但和後一天記混了'],
   ['星期日', '中文意思混淆', '只聽到 day，沒聽清楚前面']],
  ['先聽開頭的音，是 W、T 還是 S？', '開頭是 W 的星期只有一個。', '它排在 Tuesday 和 Thursday 中間。'],
  { concept: '念的是 Wednesday（星期三），開頭是 w 的音；中間的 d 不發音。',
    ref: 'Unit 3 Vocabulary（課本 p.53）' });

q('L08-Q3', '字彙：看中文選英文',
  '「星期六」的英文是哪一個？', null,
  'Saturday',
  [['Sunday', '中文意思混淆', 'Saturday 和 Sunday 開頭都是 S，把週末的兩天記反了'],
   ['Thursday', '中文意思混淆', 'Saturday 和 Thursday 都有 ur 的音，把兩天記混了'],
   ['Friday', '中文意思混淆', '記得是週末前後的日子，和星期五記混了']],
  ['先想想星期六的英文開頭是什麼字母。', '開頭是 S 的有兩天，都在週末。', '它是 Friday 的隔天。'],
  { concept: '星期六是 Saturday，星期日是 Sunday。兩個都是 S 開頭，Saturday 比較長。',
    ref: 'Unit 3 Vocabulary（課本 pp.52–53）' });

q('L08-Q4', '字彙：星期的拼法',
  '「星期三」的英文，哪一個拼對了？', null,
  'Wednesday',
  [['Wensday', '拼字錯誤', '照念的音拼，漏掉了不發音的 d 和中間的 e'],
   ['Wedensday', '拼字錯誤', '把 d 和 n 中間多寫了一個 e'],
   ['Wednsday', '拼字錯誤', '漏掉了 n 後面的 e']],
  ['Wednesday 有一個字母寫出來卻不發音。', '先寫 Wed，再寫 nes。', '最後接上所有星期都有的結尾。'],
  { concept: '星期三是 Wednesday：W-e-d-n-e-s-d-a-y。中間的 d 寫出來但不發音。',
    ref: 'Unit 3 Vocabulary（課本 p.53）' });

q('L08-Q5', '故事：動物園的開放時間',
  '在 Unit 3 的故事裡，動物園星期幾到星期幾有開？', null,
  '星期二到星期日',
  [['星期一到星期五', '故事細節混淆', '以為動物園和學校一樣，週末休息'],
   ['星期一到星期日', '故事細節混淆', '以為動物園每天都開，忘了大家去的那天它沒開'],
   ['星期二到星期六', '故事細節混淆', '記得從星期二開始，但記錯了最後一天']],
  ['回想故事裡大家是星期幾去動物園的。', '那天動物園沒開，門口的牌子寫了 Opening Hours。', '牌子上寫的是從 Monday 的隔天開始，一直到 Monday 的前一天。'],
  { concept: '故事那天是 Monday，動物園沒開；牌子上寫 Opening Hours: Tuesday – Sunday，動物園星期二到星期日開。',
    ref: 'Unit 3 Story（課本 p.50）' });

q('L08-Q6', '聽力：聽句子選意思',
  '請聽英文，選出意思正確的中文。', listen("Today is Tuesday. I'm flying a kite.", 0.9),
  '今天是星期二，我在放風箏。',
  [['今天是星期四，我在放風箏。', '音近字', '把 Tuesday 聽成也是 T 開頭的 Thursday'],
   ['今天是星期二，我在唱歌。', '中文意思混淆', '星期聽對了，但沒聽清楚在做什麼'],
   ['今天是星期二，你在放風箏嗎？', '句型混淆', '把說自己在做的事聽成問別人']],
  ['先聽 Today is 後面是星期幾。', '這一天的開頭是 t 的音，不是 th。', '最後聽 I\'m 後面的動作，和 kite 有關。'],
  { concept: 'Today is Tuesday. I\'m flying a kite. 是「今天是星期二，我在放風箏」。',
    ref: 'Unit 3 Sentence A Listen and Number（課本 p.54）' });

q('L08-Q7', '聽力：聽短對話',
  '請聽對話，選出正確的說法。',
  listen("Ruby: Is it Friday today, Sam? Sam: No, it isn't. It's Saturday. Ruby: Great! Let's go to the park.", 0.9),
  '今天是星期六，他們要去公園。',
  [['今天是星期五，他們要去公園。', '對話資訊錯置', '聽到問句裡的 Friday 就選了，沒聽到 Sam 說 No'],
   ['今天是星期六，他們要去動物園。', '故事細節混淆', '星期聽對了，但把要去的地方和故事裡的動物園記混了'],
   ['今天是星期日，他們要去公園。', '音近字', '把 Saturday 聽成也是 S 開頭的 Sunday']],
  ['先聽 Ruby 問 Sam 什麼。', 'Sam 先說 No，後面才說今天是星期幾。', '最後一句 Let\'s go to … 說了他們要去哪裡。'],
  { concept: 'Sam 說 No, it isn\'t. It\'s Saturday.，今天是星期六；Ruby 說 Let\'s go to the park.，他們要去公園。',
    ref: 'Unit 3 Sentence B（課本 p.55）' });

// ───────── en4-09 句型與文法（Sentence A p.54、Sentence B p.55、Learn with Boka p.56、Grammar Tips p.57）─────────
q('L09-Q1', '句型：問今天星期幾',
  '選出正確的字填入空格：「What ____ is today?」', null,
  'day',
  [['days', '單複數混淆', '只問今天這一天，卻用了複數'],
   ['Sunday', '句型混淆', '把回答的星期放進了問句裡'],
   ['today', '句型混淆', '句子後面已經有 today，又重複了一次']],
  ['這句是在問今天是星期幾。', '問「星期幾」要用 What 加上哪一個字？', '今天只有一天，用一天的寫法。'],
  { concept: '問今天星期幾：What day is today? 回答：It\'s Sunday.',
    ref: 'Unit 3 Sentence A（課本 p.54）' });

q('L09-Q2', '句型：回答今天星期幾',
  '「What day is today?」今天是星期一，要怎麼回答？', null,
  "It's Monday.",
  [["It's monday.", '大寫混淆', '星期的第一個字母要大寫'],
   ['Yes, it is.', '句型混淆', 'What 問句要說出答案，不能只回答 Yes'],
   ['It Monday.', '句型混淆', '漏了 is，It\'s 是 It is 的縮寫']],
  ['What 開頭的問句，要說出星期幾。', '用 It\'s 開頭，It\'s 就是 It is。', '最後檢查星期的第一個字母。'],
  { concept: '回答 What day is today? 要說 It\'s Monday.；Monday 的 M 要大寫。',
    ref: 'Unit 3 Sentence A（課本 p.54）、Learn with Boka（課本 p.56）' });

q('L09-Q3', '句型：回答是不是星期一',
  '「Is it Monday today?」今天其實是星期二，要怎麼回答？', null,
  "No, it isn't. It's Tuesday.",
  [["Yes, it is. It's Tuesday.", '簡答不一致', '今天不是星期一，卻回答 Yes'],
   ["No, it isn't. It's Monday.", '句型混淆', '說了不是，後面卻又說是星期一'],
   ["No, it is. It's Tuesday.", '簡答不一致', 'No 後面要用 isn\'t，不能用 is']],
  ['今天是不是星期一？先決定回答 Yes 還是 No。', '回答 No 時，後面要用 it isn\'t。', '最後要說出今天真正是星期幾。'],
  { concept: '今天不是星期一，回答 No, it isn\'t.，再說出真正的星期：It\'s Tuesday.',
    ref: 'Unit 3 Sentence B（課本 p.55）' });

q('L09-Q4', '文法：星期要大寫',
  '下面哪一句英文寫對了？', null,
  'I play basketball on Saturday.',
  [['I play basketball on saturday.', '大寫混淆', '星期的第一個字母沒有大寫'],
   ['i play basketball on Saturday.', '大寫混淆', '句子開頭的 I 沒有大寫'],
   ['I play Basketball on saturday.', '大寫混淆', '一般的字 basketball 不用大寫，星期卻沒大寫']],
  ['先看句子開頭的 I 有沒有大寫。', '再看星期的第一個字母。', '最後看一般的字有沒有亂用大寫。'],
  { concept: '句子開頭和 I 要大寫；星期是專有名詞，第一個字母要大寫；basketball 是一般名詞，不用大寫。',
    ref: 'Unit 3 Learn with Boka（課本 p.56）、Grammar Tips（課本 p.57）' });

q('L09-Q5', '文法：專有名詞要大寫',
  '下面的字都先用小寫寫出來。哪一個字寫在句子中間時，第一個字母也要大寫？', null,
  'christmas',
  [['basketball', '名詞種類混淆', 'basketball 是一般名詞，寫在句子中間不用大寫'],
   ['teacher', '名詞種類混淆', 'teacher 指的是任何老師，是一般名詞'],
   ['park', '名詞種類混淆', 'park 指的是任何公園，是一般名詞']],
  ['回想 Grammar Tips：哪一種名詞要大寫？', '專有名詞是一個特別的名字，像人名、地名、星期。', '找一找哪一個是一個節日的名字。'],
  { concept: 'Christmas（耶誕節）是節日的名字，是專有名詞，第一個字母要大寫；basketball、teacher、park 是一般名詞。',
    ref: 'Unit 3 Grammar Tips（課本 p.57）' });

q('L09-Q6', '字彙：星期的順序',
  '今天是 Wednesday，明天是星期幾？', null,
  'Thursday',
  [['Tuesday', '順序錯置', '選了 Wednesday 的前一天'],
   ['Friday', '順序錯置', '多算了一天'],
   ['Monday', '順序錯置', '只記得一週的開頭，沒有往後數']],
  ['先想想 Wednesday 是星期幾。', '明天要往後數一天。', '星期三的下一天，英文開頭是 Th。'],
  { concept: 'Wednesday 是星期三，明天是星期四 Thursday。順序：Sunday、Monday、Tuesday、Wednesday、Thursday、Friday、Saturday。',
    ref: 'Unit 3 Vocabulary（課本 pp.52–53）' });

q('L09-Q7', '句型：依情境提問',
  '你不確定今天是不是星期五，想問同學，要怎麼問？', null,
  'Is it Friday today?',
  [['Is it friday today?', '大寫混淆', '問法對了，但星期的第一個字母沒有大寫'],
   ['Is today it Friday?', '字序錯誤', '把 today 放錯了位置'],
   ['What day is Friday?', '句型混淆', '這樣問的是「星期五是星期幾」，意思不通']],
  ['想確定是不是某一天，要用 Is it … today? 來問。', '先看字的順序對不對。', '再檢查星期的第一個字母。'],
  { concept: '想問「今天是星期五嗎？」：Is it Friday today?；Friday 的 F 要大寫。',
    ref: 'Unit 3 Sentence B（課本 p.55）、Learn with Boka（課本 p.56）' });

// ───────── en4-10 發音與閱讀（Phonics pp.60–61、Reading pp.58–59）─────────
q('L10-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的字。可以按喇叭聽每個選項。', { ...listen('coat', 0.8), ...SAY },
  'coat',
  [['goat', '音近字', 'c 和 g 的音很像，沒聽清楚開頭'],
   ['boat', '音近字', '母音和結尾一樣，只聽後半就作答'],
   ['cat', '母音混淆', '開頭和結尾一樣，但沒聽出 oa 念長音 o']],
  ['先聽中間的母音，是長音 o 還是別的音？', '再聽開頭是 k、g 還是 b 的音。', '這個字的開頭和 cola 的開頭一樣。'],
  { concept: '念的是 coat（外套）。oa 念長音 o，開頭的 c 念 k 的音。',
    ref: 'Unit 3 Phonics Sound It Out（課本 p.60）' });

q('L10-Q2', '發音：選出母音念法不同的字',
  '下面四個字，哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。', SAY,
  'not',
  [['hole', '拼字組合混淆', '看到 o_e 和 oa、ow 的字母不同，就以為念法也不同'],
   ['goat', '拼字組合混淆', '看到 oa 和 o_e、ow 的字母不同，就以為念法也不同'],
   ['snow', '拼字組合混淆', '看到 ow 結尾，就以為念法不同']],
  ['先聽每個字的母音，不要只看拼法。', 'o_e、oa、ow 這三組字母都念長音 o。', '找一找哪一個字只有一個 o，後面沒有 e、a 或 w。'],
  { concept: 'hole 的 o_e、goat 的 oa、snow 的 ow 都念長音 o；not 只有一個 o，念短音，所以不同。',
    ref: 'Unit 3 Phonics Sound It Out（課本 p.60）、Listen and Circle（課本 p.61）' });

q('L10-Q3', '發音：長音 o',
  '哪一個字的 o 念長音，和 hole 的母音一樣？可以按喇叭聽每個字。', SAY,
  'hope',
  [['hot', '長短音混淆', '看到 o 就選了，沒注意後面沒有不發音的 e'],
   ['not', '長短音混淆', '看到 o 就選了，沒注意字尾沒有不發音的 e'],
   ['on', '長短音混淆', '看到 o 就以為念長音']],
  ['先聽每個字的母音是長音還是短音。', '長音 o 可以拼成 o_e、oa 或 ow。', '找字尾有一個不發音的 e 的字。'],
  { concept: 'hope 是 o_e 的拼法：字尾的 e 不發音，前面的 o 念長音，和 hole 一樣。hot、not、on 的 o 念短音。',
    ref: 'Unit 3 Phonics Sound It Out（課本 p.60）、Listen and Circle（課本 p.61）' });

const maxWeek = passage(
  "Max is busy every week. He swims on Monday and Thursday. He rides a bike on Tuesday and Friday. He reads books on Wednesday and Saturday. On Sunday, he takes a rest."
);

q('L10-Q4', '閱讀：做筆記（Take Notes）',
  '幫上面的短文做筆記：Max 星期二和星期五做什麼？', maxWeek,
  '騎腳踏車',
  [['游泳', '細節讀錯', '把星期一和星期四做的事記到星期二和星期五'],
   ['看書', '細節讀錯', '把星期三和星期六做的事記錯了'],
   ['休息', '細節讀錯', '把星期日做的事當成星期二的']],
  ['先在短文裡找到 Tuesday。', '看 Tuesday 和 Friday 在同一句，那一句的動作是什麼？', 'rides a bike 的 bike 是什麼？'],
  { concept: '短文說 He rides a bike on Tuesday and Friday.，Max 星期二和星期五騎腳踏車。',
    ref: 'Unit 3 Reading（課本 pp.58–59）、Reading Skills：Take Notes' });

q('L10-Q5', '閱讀：做筆記（Take Notes）',
  '依上面的短文，Max 哪兩天看書？', maxWeek,
  '星期三和星期六',
  [['星期一和星期四', '細節讀錯', '把游泳的日子當成打掃的日子'],
   ['星期二和星期五', '細節讀錯', '把騎腳踏車的日子當成打掃的日子'],
   ['星期日', '細節讀錯', '以為週末才有空看書，但 Max 星期日休息']],
  ['先在短文裡找到 reads books。', '看那一句後面是哪兩天。', '把兩個星期翻成中文。'],
  { concept: '短文說 He reads books on Wednesday and Saturday.，Max 星期三和星期六看書。',
    ref: 'Unit 3 Reading（課本 pp.58–59）、Reading Skills：Take Notes' });

q('L10-Q6', '閱讀：課本短文',
  '這題問的是課本，不是上面 Max 的短文。課本 Reading「A Busy Week」裡，大家星期一和星期四打掃哪裡？', null,
  '臥室（bedroom）',
  [['浴室（bathroom）', '細節讀錯', '浴室是星期二和星期五打掃的'],
   ['客廳（living room）', '細節讀錯', '客廳是星期三和星期六打掃的'],
   ['哪裡都不打掃', '細節讀錯', '星期日才休息，星期一還要打掃']],
  ['回想課本把每個地方配了兩天。', '星期一和星期四打掃完以後，地上不會再有玩具。', '玩具通常放在哪一個房間？'],
  { concept: '課本說 We clean the bedroom on Monday and Thursday. No more toys on the floor.：星期一和星期四打掃臥室。',
    ref: 'Unit 3 Reading（課本 p.58）' });

q('L10-Q7', '聽力：聽短文找細節',
  '請聽英文，回答：Joe 星期幾划船？',
  listen("I'm Joe. I have a goat and a boat. On Saturday, I row the boat with my goat.", 0.9),
  '星期六',
  [['星期日', '音近字', 'Saturday 和 Sunday 開頭都是 S，沒聽清楚後面'],
   ['星期四', '音近字', 'Saturday 和 Thursday 都有 ur 的音，只聽中間就作答'],
   ['星期二', '中文意思混淆', '沒聽到星期，就隨便猜了一天']],
  ['先聽 Joe 有哪兩樣東西。', '再聽 On 後面是星期幾。', '這一天的開頭是 S，而且比 Sunday 長。'],
  { concept: 'Joe 說 On Saturday, I row the boat with my goat.，他星期六划船。goat、boat 的 oa 和 row 的 ow 都念長音 o。',
    ref: 'Unit 3 Phonics Listen and Say（課本 p.61）、Vocabulary（課本 p.53）' });

save();
