// 四上英語（康軒 Wonder World 5）Unit 1 The Best Drink 的題目產生器：寫出 drafts/en4/en4-questions-U1.json。
// 題目改這支再重跑：node drafts/en4/build-U1.mjs
// 三關：en4-01 字彙與聽力、en4-02 句型與文法、en4-03 發音與閱讀。頁碼是課本印的頁碼。
//   Story pp.17–19、Vocabulary pp.20–21、Sentence A p.22、Sentence B p.23、Learn with Boka p.24、Grammar Tips p.25、
//   Reading pp.26–27（Find Details）、Phonics pp.28–29；More to Learn（p.30，Optional）不出題。
// misconception 結尾不要加句號（產生器會自己接「；」和「。」）。
import { buildUnit, listen, SAY, passage, table } from './build-unit.mjs';

const { q, save } = buildUnit('U1');

// ───────── en4-01 字彙與聽力（Vocabulary pp.20–21、Story pp.17–19）─────────
q('L01-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的飲料。', listen('soy milk', 0.8),
  'soy milk',
  [['milk tea', '音近字', '聽到 milk 就選了，沒注意 milk 是在前面還是後面'],
   ['bubble tea', '音近字', '只記得是兩個字的飲料，沒聽清楚第一個字'],
   ['hot chocolate', '中文意思混淆', '只記得是兩個字的飲料，沒有比對每個字的音']],
  ['先聽一共念了幾個字。', '再聽第二個字是 milk 還是 tea，還是別的字。', '最後聽第一個字，是很短的一個音節。'],
  { concept: '念的是 soy milk（豆漿）。milk 在後面；milk tea 是奶茶，milk 在前面。',
    ref: 'Unit 1 Vocabulary（課本 pp.20–21）' });

q('L01-Q2', '聽力：聽音選意思',
  '請聽英文，選出意思正確的中文。', listen('lemonade', 0.8),
  '檸檬水',
  [['可樂', '中文意思混淆', '課本把 cola 和 lemonade 畫在一起，兩種冷飲的英文記反了'],
   ['豆漿', '中文意思混淆', '聽到不熟的字，就選了印象最深的飲料'],
   ['熱巧克力', '音近字', 'lemonade 的 -ade 和 chocolate 的 -ate 聽起來很像']],
  ['先聽這個字有幾個音節。', '這個字開頭的音和 lemon 很像。', '想想 cola、soy milk、hot chocolate 念起來是什麼樣子，再和聽到的字比一比。'],
  { concept: '念的是 lemonade（檸檬水）。lemonade 有三個音節，開頭的音和 lemon 很像。',
    ref: 'Unit 1 Vocabulary（課本 p.20）' });

q('L01-Q3', '字彙：看中文選英文',
  '「熱巧克力」的英文是哪一個？', null,
  'hot chocolate',
  [['coffee', '中文意思混淆', '咖啡和熱巧克力都是熱熱的深色飲料，把兩個記混了'],
   ['bubble tea', '中文意思混淆', '記得熱巧克力是很甜的飲料，就選了另一種也很甜的飲料'],
   ['cola', '中文意思混淆', '可樂和熱巧克力顏色都很深，只看顏色就作答']],
  ['先想想「熱」的英文怎麼說。', '這個飲料的英文由兩個字組成。', '找第一個字是「熱」的選項。'],
  { concept: '熱巧克力是 hot chocolate。hot 是「熱的」，chocolate 是「巧克力」。',
    ref: 'Unit 1 Vocabulary（課本 p.21）' });

q('L01-Q4', '字彙：飲料的拼法',
  '「咖啡」的英文，哪一個拼對了？', null,
  'coffee',
  [['cofee', '拼字錯誤', '只寫了一個 f，忘了 coffee 有兩個 f'],
   ['coffe', '拼字錯誤', '照念的音拼，漏掉了結尾的 e'],
   ['caffee', '拼字錯誤', '把開頭的 o 寫成 a']],
  ['先看開頭是 co 還是 ca。', '再數一數中間有幾個 f。', '最後看結尾：coffee 結尾有兩個 e。'],
  { concept: '咖啡是 coffee：c-o-f-f-e-e，中間兩個 f，結尾兩個 e。',
    ref: 'Unit 1 Vocabulary（課本 p.20）' });

q('L01-Q5', '故事：誰喜歡什麼',
  '在 Unit 1 的故事裡，大家最後說哪一種飲料最好？', null,
  'water',
  [['juice', '故事細節混淆', 'Jello 和 Kevin 一開始喜歡果汁，但喝完還是覺得渴'],
   ['milk tea', '故事細節混淆', '記得 Boka 喜歡奶茶，就以為那是最好的飲料'],
   ['lemonade', '故事細節混淆', '店裡有賣檸檬水，但故事最後沒有說它最好']],
  ['回想故事裡大家玩完球，都覺得很渴。', '有人喝了果汁，還是說 I\'m still thirsty.', '最後大家都不渴了，喝的是不加糖、沒有味道的那一種。'],
  { concept: '故事最後大家喝了水，不渴了，說 Water is the best.（水是最好的）。',
    ref: 'Unit 1 Story（課本 pp.18–19）' });

q('L01-Q6', '聽力：聽句子選意思',
  '請聽英文，選出意思正確的中文。', listen('I like bubble tea and soy milk.', 0.9),
  '我喜歡珍珠奶茶和豆漿。',
  [['我喜歡珍珠奶茶和熱巧克力。', '中文意思混淆', '第一樣聽對了，第二樣聽成熱巧克力'],
   ['我喜歡奶茶和豆漿。', '音近字', '把 bubble tea 聽成故事裡的 milk tea'],
   ['你喜歡珍珠奶茶和豆漿嗎？', '句型混淆', '兩樣飲料都聽對了，卻把說自己喜歡聽成問別人']],
  ['先聽句子開頭，是 I like 還是 Do you like？', '再聽 and 前面的飲料。', '最後聽 and 後面的飲料，裡面有 milk。'],
  { concept: 'I like … and … 是說「我喜歡……和……」。bubble tea 是珍珠奶茶，soy milk 是豆漿。',
    ref: 'Unit 1 Vocabulary（課本 pp.20–21）、Sentence A（課本 p.22）' });

q('L01-Q7', '聽力：聽短對話',
  '請聽對話，選出正確的說法。',
  listen("Nina: Do you like coffee, Leo? Leo: No, I don't. I like hot chocolate. Nina: I like hot chocolate, too.", 0.9),
  'Leo 和 Nina 都喜歡熱巧克力。',
  [['Leo 喜歡咖啡。', '對話資訊錯置', '聽到問句裡的 coffee 就選了，沒聽到 Leo 回答 No'],
   ['Nina 喜歡咖啡，Leo 喜歡熱巧克力。', '對話資訊錯置', 'Nina 只是問 Leo 喜不喜歡咖啡，沒有說自己喜歡'],
   ['Leo 和 Nina 都喜歡檸檬水。', '中文意思混淆', '聽懂兩人喜歡同一種飲料，但飲料聽錯了']],
  ['先聽 Nina 問 Leo 什麼。', 'Leo 先回答 No，後面才說他喜歡的飲料。', '最後聽 Nina 說的話，句尾的 too 是「也」的意思。'],
  { concept: 'Leo 不喜歡咖啡，他喜歡熱巧克力；Nina 說 I like hot chocolate, too.，所以兩人都喜歡熱巧克力。',
    ref: 'Unit 1 Sentence A（課本 p.22）' });

// ───────── en4-02 句型與文法（Sentence A p.22、Sentence B p.23、Learn with Boka p.24、Grammar Tips p.25）─────────
q('L02-Q1', '句型：Do 或 Does',
  '選出正確的字填入空格：「____ you like tea?」', null,
  'Do',
  [['Does', '助動詞混淆', '記得問別人喜不喜歡要用 Does，沒看空格後面是 you'],
   ['Are', 'be 動詞混淆', '記得 Are you…? 的問句，沒注意句子已經有動詞 like'],
   ['Is', 'be 動詞混淆', '用了問 he、she 的 Is，又沒注意句子已經有動詞 like']],
  ['先看空格後面是誰。', '句子已經有動詞 like，要用 do 或 does 來問。', 'I、you、we、they 用同一個字，he、she 用另一個字。'],
  { concept: 'you 要用 Do 來問：Do you like tea? he、she 和人名才用 Does。',
    ref: 'Unit 1 Sentence A（課本 p.22）、Learn with Boka（課本 p.24）' });

q('L02-Q2', '句型：Do 或 Does',
  '選出正確的字填入空格：「____ Mia like lemonade?」', null,
  'Does',
  [['Do', '助動詞混淆', '把 Do you…? 的 Do 用在人名前面'],
   ['Is', 'be 動詞混淆', '記得 Is she…? 的問句，沒注意句子已經有動詞 like'],
   ['Are', 'be 動詞混淆', '用了 be 動詞來問，沒注意句子已經有動詞 like']],
  ['先看空格後面是誰。', 'Mia 是一個人，可以用 she 代替她。', '回想 Learn with Boka：he、she、it 用哪一個字來問？'],
  { concept: 'Mia 是一個人（she），要用 Does 來問：Does Mia like lemonade?',
    ref: 'Unit 1 Sentence B（課本 p.23）、Learn with Boka（課本 p.24）' });

q('L02-Q3', '句型：回答喜不喜歡',
  '「Do you like cola?」如果你不喜歡可樂、喜歡茶，要怎麼回答？', null,
  "No, I don't. I like tea.",
  [["No, I doesn't. I like tea.", '助動詞混淆', '記得要說不喜歡，卻把 I 後面的 don\'t 換成 doesn\'t'],
   ["No, I don't. I likes tea.", '第三人稱混淆', '把說別人時才加的 s 加到 I 後面的 like'],
   ["No, you don't. I like tea.", '人稱混淆', '照著問句裡的 you 回答，忘了回答自己時要說 I']],
  ['回答自己的事要用 I。', '用 do 問，就用 do 回答。', '再檢查 I 後面的 like 要不要加 s。'],
  { concept: '用 Do you…? 問，回答自己時用 I do／I don\'t。I 後面的 like 不加 s：No, I don\'t. I like tea.',
    ref: 'Unit 1 Sentence A（課本 p.22）、Learn with Boka（課本 p.24）' });

q('L02-Q4', '文法：like 或 likes',
  '選出正確的字填入空格：「Jason ____ soy milk.」', null,
  'likes',
  [['like', '第三人稱混淆', '忘了 Jason 是一個人，like 後面要加 s'],
   ['liking', '動詞形式混淆', '把 like 加了 ing，但這句沒有 is'],
   ['to like', '動詞形式混淆', '在動詞前面多加了 to']],
  ['先看主詞是誰。', 'Jason 可以用 he 代替。', '回想課本：Boka likes milk tea. 的 likes 怎麼寫。'],
  { concept: 'Jason 是一個人（he），說他喜歡什麼時，like 要加 s：Jason likes soy milk.',
    ref: 'Unit 1 Sentence B（課本 p.23）、Grammar Tips（課本 p.25）' });

q('L02-Q5', '文法：選出正確的句子',
  '下面哪一句英文是正確的？', null,
  'Does Ben like bubble tea?',
  [['Does Ben likes bubble tea?', '動詞形式混淆', '用了 Does，後面的 like 又加了 s'],
   ['Do Ben like bubble tea?', '助動詞混淆', '把 Do you 的 Do 用在人名前面'],
   ['Does Ben liking bubble tea?', '動詞形式混淆', '把 like 加了 ing']],
  ['先看句子開頭是 Do 還是 Does，配 Ben 對不對。', '再看 like 這個字的寫法。', '回想 Grammar Tips：do 和 does 後面的動詞要用什麼形式？'],
  { concept: 'Ben 是 he，要用 Does 問；does 後面用原形動詞 like，不加 s：Does Ben like bubble tea?',
    ref: 'Unit 1 Grammar Tips（課本 p.25）' });

q('L02-Q6', '句型：看表格回答',
  '依表格回答：「Does Kevin like coffee?」', table(['名字', '喜歡', '不喜歡'], [['Amy', 'soy milk', 'cola'], ['Kevin', 'tea', 'coffee']], '兩個人喜歡和不喜歡的飲料'),
  "No, he doesn't. He likes tea.",
  [["Yes, he does. He likes coffee.", '表格讀錯', '看到 coffee 在 Kevin 那一列，沒看它是在「不喜歡」那一欄'],
   ["No, she doesn't. She likes tea.", '人稱混淆', '答案的意思對了，但 Kevin 是男生，要用 he'],
   ["No, he doesn't. He likes soy milk.", '表格讀錯', '把 Amy 喜歡的豆漿當成 Kevin 喜歡的']],
  ['先在表格找到 Kevin 那一列。', '看 coffee 在「喜歡」還是「不喜歡」那一欄。', 'Kevin 是男生，回答時用 he，再說出他喜歡的飲料。'],
  { concept: 'Kevin 不喜歡咖啡、喜歡茶。用 Does 問，就用 he doesn\'t 回答：No, he doesn\'t. He likes tea.',
    ref: 'Unit 1 Sentence B（課本 p.23）' });

q('L02-Q7', '句型：依情境提問',
  '你想問同學 Amy 本人喜不喜歡檸檬水，要怎麼問她？', null,
  'Do you like lemonade?',
  [['Does she like lemonade?', '人稱混淆', '直接問 Amy 本人時要說 you，she 是跟別人說 Amy 的時候才用'],
   ['Does you like lemonade?', '助動詞混淆', 'you 前面用了 Does'],
   ['Do she like lemonade?', '助動詞混淆', '用了 she，前面又配 Do']],
  ['你是直接問 Amy 本人，要叫她 you 還是 she？', '想好要用 you 以後，再選前面要用 Do 還是 Does。', '回想課本 Sentence A 問同學的句子。'],
  { concept: '直接問對方要用 you，you 配 Do：Do you like lemonade?',
    ref: 'Unit 1 Sentence A（課本 p.22）、Learn with Boka（課本 p.24）' });

// ───────── en4-03 發音與閱讀（Phonics pp.28–29、Reading pp.26–27）─────────
q('L03-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的字。可以按喇叭聽每個選項。', { ...listen('seat', 0.8), ...SAY },
  'seat',
  [['sit', '長短音混淆', '開頭和結尾一樣，但沒分出母音是長音還是短音'],
   ['beat', '音近字', '母音和結尾一樣，但沒聽清楚開頭的音'],
   ['weed', '音近字', '只聽到長音 e，沒有比對開頭和結尾']],
  ['先聽中間的母音，是長音 e 還是短音？', '再聽開頭是 s、b 還是 w 的音。', '最後聽結尾是 t 還是 d 的音。'],
  { concept: '念的是 seat。ea 念長音 e，開頭是 s，結尾是 t；sit 的 i 是短音。',
    ref: 'Unit 1 Phonics Listen, Point, and Say（課本 p.29）' });

q('L03-Q2', '發音：選出母音念法不同的字',
  '下面四個字，哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。', SAY,
  'red',
  [['tree', '拼字組合混淆', '看到 ee 和 ea、e_e 的字母不同，就以為念法也不同'],
   ['peach', '拼字組合混淆', '看到 ea 和 ee、e_e 的字母不同，就以為念法也不同'],
   ['these', '拼字組合混淆', '看到 e_e 中間隔了一個字母，就以為念法不同']],
  ['先聽每個字的母音，不要只看拼法。', 'e_e、ea、ee 這三組字母都念長音 e。', '找一找哪一個字只有一個 e，後面也沒有不發音的 e。'],
  { concept: 'tree 的 ee、peach 的 ea、these 的 e_e 都念長音 e（和 Eve 一樣）；red 只有一個 e，念短音，所以不同。',
    ref: 'Unit 1 Phonics Sound It Out（課本 p.28）' });

q('L03-Q3', '發音：長音 e',
  '哪一個字裡的 e 念長音，和 Eve 的第一個音一樣？可以按喇叭聽每個字。', SAY,
  'these',
  [['red', '長短音混淆', '看到字裡有 e，就以為都念長音'],
   ['bet', '長短音混淆', '看到 e 就選了，沒注意後面沒有不發音的 e'],
   ['bed', '長短音混淆', 'bed 只有一個 e，後面沒有不發音的 e，念短音']],
  ['先聽每個字的母音是長音還是短音。', '長音 e 可以拼成 e_e、ea 或 ee。', '找字尾有一個不發音的 e 的字。'],
  { concept: 'these 是 e_e 的拼法：字尾的 e 不發音，前面的 e 念長音，和 Eve 一樣。red、bet、bed 的 e 念短音。',
    ref: 'Unit 1 Phonics Sound It Out（課本 p.28）、Listen and Circle（課本 p.29）' });

const drinks = passage(
  "Tim plays basketball. Now he is thirsty. He has three drinks. The cola has thirty grams of sugar. The soy milk has five grams of sugar. Water has no sugar. Tim likes cola, but he drinks water. Water is good for him."
);

q('L03-Q4', '閱讀：找出細節（Find Details）',
  '依上面的短文，哪一種飲料的糖最多？', drinks,
  'cola',
  [['soy milk', '細節讀錯', '看到豆漿有糖，就沒和可樂的數字比一比'],
   ['water', '細節讀錯', 'Tim 最後喝的是水，就以為題目問的是他喝了什麼'],
   ['juice', '文意推論過度', '想到果汁也很甜，但短文沒有提到果汁']],
  ['先在短文裡找到有 sugar 的句子。', '把每種飲料的糖有幾公克圈出來。', '比一比數字，thirty 和 five 哪一個比較大？'],
  { concept: '可樂有 thirty grams（30 公克）糖，豆漿 5 公克，水沒有糖，所以可樂的糖最多。',
    ref: 'Unit 1 Reading（課本 pp.26–27）、Reading Skills：Find Details' });

q('L03-Q5', '閱讀：找出細節（Find Details）',
  '依上面的短文，豆漿有多少糖？', drinks,
  '5 公克',
  [['30 公克', '細節讀錯', '把可樂的糖當成豆漿的糖'],
   ['0 公克', '細節讀錯', '把水的 no sugar 當成豆漿的'],
   ['35 公克', '文意推論過度', '把可樂和豆漿的糖加在一起']],
  ['先在短文裡找到 soy milk。', '看 soy milk 那一句後面的數字。', 'five 是哪一個數字？'],
  { concept: '短文說 The soy milk has five grams of sugar.，豆漿有 5 公克的糖。',
    ref: 'Unit 1 Reading（課本 pp.26–27）、Reading Skills：Find Details' });

q('L03-Q6', '閱讀：讀營養標示',
  '課本教我們看飲料的營養標示，算出一整瓶有多少糖。第一步要先找什麼？', null,
  '一瓶有幾份（servings）',
  [['一份有多少糖（sugars）', '步驟順序混淆', '這是第二步，要先知道一瓶有幾份'],
   ['一份有多少熱量（calories）', '細節讀錯', '熱量也在標示上，但算糖不用看它'],
   ['把兩個數字乘起來', '步驟順序混淆', '這是最後一步，要先找到兩個數字才能算']],
  ['回想課本營養標示旁邊的 1、2、3 三個步驟。', '要算一整瓶的糖，需要兩個數字，最後再把它們乘起來。', '第一步和第二步各找一個數字，第二步找的是 sugars。'],
  { concept: '課本的步驟是：1. Find the servings（找一瓶有幾份）2. Find the sugars（找一份有多少糖）3. Work out（乘起來算出整瓶的糖）。',
    ref: 'Unit 1 Reading（課本 p.26）' });

q('L03-Q7', '聽力：聽短文找細節',
  '請聽英文，回答：Pete 喜歡什麼？',
  listen("Hi, I'm Eve. I like peach tea. My brother is Pete. He likes green tea. We don't like cola.", 0.9),
  '綠茶',
  [['桃子茶', '對話資訊錯置', '把說話的 Eve 喜歡的茶當成 Pete 的'],
   ['可樂', '對話資訊錯置', '聽到 cola 就選了，沒聽到前面的 don\'t'],
   ['檸檬水', '中文意思混淆', '短文沒有提到檸檬水，只憑印象作答']],
  ['先聽說話的人是誰，她喜歡什麼。', '再聽 My brother 後面說了誰，他喜歡什麼。', '注意 tea 前面的顏色，那就是 Pete 喜歡的茶。'],
  { concept: '說話的是 Eve，她喜歡桃子茶；她的兄弟 Pete 喜歡 green tea（綠茶）；他們都不喜歡可樂。',
    ref: 'Unit 1 Phonics Listen and Chant（課本 p.28）、Sentence B（課本 p.23）' });

save();
