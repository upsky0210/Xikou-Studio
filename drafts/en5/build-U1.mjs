// 五上英語（康軒 Wonder World 7）Unit 1 Whale Watching 的題目產生器：寫出 drafts/en5/en5-questions-U1.json。
// 題目改這支再重跑：node drafts/en5/build-U1.mjs
// 三關：en5-01 字彙與聽力、en5-02 句型與文法、en5-03 發音與閱讀。頁碼是課本印的頁碼（教學篇每頁縮版上的頁碼）。
//   Story p.15–17、Vocabulary p.18–19、Sentence A p.20、Sentence B p.21、Grammar Tips p.22、Reading p.23–25、Phonics p.26–27；
//   Reading Skills「Find Details」p.10；Get Ready（p.12–14）和 More to Learn（p.28，Optional）不出題。
// 寫法規則見 docs/五上英語交接手冊-Codex.md。misconception 結尾不要加句號（產生器會自己接「；」和「。」）。
import { buildUnit, listen, SAY, passage, table } from './build-unit.mjs';

const { q, save } = buildUnit('U1');

// ───────── en5-01 字彙與聽力（Vocabulary p.18–19、Story p.15–17）─────────
q('L01-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的國家。', listen('the USA', 0.8),
  'the USA',
  [['the UK', '音近字', 'the UK 和 the USA 開頭都是 the U，只聽前半就作答'],
   ['the ROC', '音近字', 'the ROC 也是 the 後面接三個字母一個一個念，沒聽清楚是哪三個字母'],
   ['India', '音近字', 'In-di-a 和 U-S-A 都是三拍、最後都是 a 的音，只聽節奏就作答']],
  ['先聽 the 後面是一個完整的字，還是一個一個念的字母。',
   '一共念了幾個字母？是兩個還是三個？',
   '第一個字母是 U，後面還有兩個字母。'],
  { concept: '念的是 the USA（美國）。the 後面的 U、S、A 三個字母是一個一個念的。',
    ref: 'Unit 1 Vocabulary（課本 pp.18–19）' });

q('L01-Q2', '聽力：聽音選字',
  '請聽英文，選出你聽到的詞。', listen('a dolphin', 0.8),
  'a dolphin',
  [['a whale', '故事字詞混淆', '故事裡鯨魚和海豚都出現了，沒聽清楚就憑印象選了鯨魚'],
   ['a fish', '故事字詞混淆', '故事裡有人把鯨魚當成大魚，就記住了 fish'],
   ['a mammal', '音近字', 'mammal 和聽到的字一樣是兩個音節、結尾都有 l 的音']],
  ['先聽 a 後面的字有幾個音節。',
   '這個字有兩個音節，開頭是 d 的音。',
   '故事裡大家以為看到鯨魚，其實是這種比較小的動物。'],
  { concept: '念的是 a dolphin（一隻海豚）。dolphin 兩個音節，開頭是 d 的音。',
    ref: 'Unit 1 Story（課本 pp.16–17）' });

q('L01-Q3', '聽力：聽音選意思',
  '請聽英文，選出這個國家的中文。', listen('India', 0.8),
  '印度',
  [['澳大利亞', '音近字', '聽到的字和 Australia 的結尾念法很像，只聽結尾就作答'],
   ['加拿大', '音近字', '聽到的字和 Canada 一樣是三個音節、最後都是 a 的音'],
   ['美國', '音近字', '聽到的字和 U-S-A 一樣是三拍，把節奏當成線索']],
  ['先聽開頭的音，是 In、Au、Ca 還是 U？',
   '這個字開頭是 In 的音，一共三個音節。',
   '這個國家在亞洲，國名開頭是 I。'],
  { concept: '念的是 India（印度）。India 和 Australia 的結尾念法很像，要聽開頭才分得出來。',
    ref: 'Unit 1 Vocabulary（課本 pp.18–19）' });

q('L01-Q4', '字彙：看中文選英文',
  '「法國」的英文是哪一個？', null,
  'France',
  [['the UK', '中文意思混淆', '把法國和英國記混了；故事裡 Joe 來自英國、Ella 來自法國，兩國很容易記反'],
   ['Canada', '中文意思混淆', '把法國和加拿大記混了；故事裡 Tommy 來自加拿大'],
   ['the USA', '中文意思混淆', '把法國和美國記混了；故事裡有人問 Ella 是不是來自美國']],
  ['看清楚題目問的是哪一個國家的英文。',
   '這個國家的英文前面不用加 the。',
   '這個國名的字尾念 [s] 的音。'],
  { concept: '「法國」是 France，國名是專有名詞，第一個字母要大寫。故事裡 Ella 被問 Are you from the USA? 時回答不是，她來自法國。',
    ref: 'Unit 1 Vocabulary（課本 pp.18–19）、Story（課本 p.16）' });

q('L01-Q5', '字彙：國名的寫法',
  '選出可以填入空格、而且寫法正確的國名：\n「Hi! I\'m Joe. I\'m from ____.」', null,
  'the UK',
  [['the France', '國名寫法錯誤', '以為國名前面都要加 the；France 前面不加 the'],
   ['the Japan', '國名寫法錯誤', '以為國名前面都要加 the；Japan 前面不加 the'],
   ['the Canada', '國名寫法錯誤', '以為國名前面都要加 the；Canada 前面不加 the']],
  ['四個選項都有 the，想一想哪些國名本來就有 the。',
   '課本的八個國家裡，只有用縮寫字母念的兩個國家前面有 the。',
   'France、Japan、Canada 這三個國名前面有沒有 the？'],
  { concept: '課本的國名裡，the USA（美國）和 the UK（英國）前面有 the；France、Japan、Canada 前面不加 the。',
    ref: 'Unit 1 Vocabulary（課本 pp.18–19）' });

q('L01-Q6', '聽力：聽句子選意思',
  '請聽英文句子，選出意思最符合的中文。', listen('Look! There are two whales.', 0.9),
  '看！有兩隻鯨魚。',
  [['看！有兩隻海豚。', '故事字詞混淆', '數量聽對了，但把鯨魚聽成海豚'],
   ['看！有十隻鯨魚。', '數字聽錯', '把 two 聽成 ten'],
   ['看！有一隻鯨魚。', '漏聽數量', '沒聽到數量，只抓到鯨魚這個字']],
  ['先聽句子裡有幾隻動物。',
   '再聽是哪一種動物：whale 還是 dolphin？',
   '數量是兩隻，不是一隻或十隻。'],
  { concept: '念的是 Look! There are two whales.（看！有兩隻鯨魚。）two 是兩，whale 是鯨魚。',
    ref: 'Unit 1 Story（課本 pp.16–17）' });

q('L01-Q7', '聽力：聽短對話',
  '請聽對話，選出正確的說法。',
  listen('Amy: Where are you from, Leo? Leo: I\'m from the UK. Amy: Is Lily from the UK, too? Leo: No, she\'s not. She\'s from the USA.', 0.9),
  'Lily 是從美國來的。',
  [['Lily 是從英國來的。', '對話資訊錯置', '聽到 the UK, too 就以為 Lily 也來自英國，沒聽到後面的 No, she\'s not'],
   ['Leo 是從美國來的。', '對話資訊錯置', '把 Leo 和 Lily 的國家對調了'],
   ['Amy 是從英國來的。', '對話資訊錯置', 'Amy 是發問的人，對話沒有說她從哪裡來']],
  ['先聽清楚有哪幾個人，每個人說了什麼。',
   'Amy 問 Lily 是不是也來自英國，Leo 回答 Yes 還是 No？',
   'Leo 說 No 以後，又說了 Lily 來自哪一個國家。'],
  { concept: '對話中 Leo 來自英國（the UK）；Amy 問 Lily 是不是也來自英國，Leo 說 No, she\'s not. She\'s from the USA.，所以 Lily 來自美國。',
    ref: 'Unit 1 Sentence A、Sentence B（課本 pp.20–21）' });

// ───────── en5-02 句型與文法（Sentence A p.20、Sentence B p.21、Grammar Tips p.22）─────────
q('L02-Q1', '文法：be 動詞',
  '選出正確的答案填入空格：\n「Sam and Nick ____ from Canada.」', null,
  'are',
  [['is', 'be 動詞與主詞不合', '只看到空格前的 Nick 一個人，沒注意主詞是 Sam and Nick 兩個人'],
   ['am', 'be 動詞與主詞不合', 'am 只能跟 I 一起用'],
   ['be', 'be 動詞與主詞不合', 'be 是原形，句子裡要依主詞改成 am、is 或 are']],
  ['先找出這個句子的主詞是誰。',
   '主詞是兩個人，就像 they 或 we 一樣。',
   '想一想 They ____ from Japan. 要用哪一個 be 動詞。'],
  { concept: '主詞 Sam and Nick 是兩個人，和 they 一樣要用 are：Sam and Nick are from Canada.',
    ref: 'Unit 1 Grammar Tips（課本 p.22）' });

q('L02-Q2', '句型：疑問詞',
  '選出正確的答案填入空格：\nA: ____ are you from?\nB: I\'m from India.', null,
  'Where',
  [['What', '疑問詞混淆', 'What 問的是「什麼東西」，不是問從哪裡來'],
   ['Who', '疑問詞混淆', 'Who 問的是「誰」，回答要說出人'],
   ['When', '疑問詞混淆', 'When 問的是「什麼時候」，回答要說出時間']],
  ['先看 B 的回答說了什麼。',
   'B 回答的是一個國家，是一個地方。',
   '問「從哪裡來」要用問地方的疑問詞。'],
  { concept: 'B 回答 I\'m from India.，說的是地方，所以要用問地方的 Where：Where are you from?',
    ref: 'Unit 1 Sentence A（課本 p.20）' });

q('L02-Q3', '句型：問答配對',
  'Ken 來自日本。有人問：「Is Ken from the USA?」最合適的回答是哪一個？', null,
  'No, he\'s not. He\'s from Japan.',
  [['Yes, he is. He\'s from Japan.', '簡答不一致', '前面說 Yes（是美國），後面又說來自日本，前後矛盾'],
   ['No, she\'s not. She\'s from Japan.', '人稱代名詞混淆', 'Ken 是男生，要用 he，不是 she'],
   ['No, I\'m not. I\'m from Japan.', '人稱代名詞混淆', '問的是 Ken，不是問「你」，所以不能用 I 回答']],
  ['先想一想：Ken 是不是來自美國？要回答 Yes 還是 No？',
   '問句問的是 Ken，回答時要用代替 Ken 的代名詞。',
   'Ken 是男生；再檢查 Yes／No 和後面那一句有沒有前後矛盾。'],
  { concept: 'Ken 不是來自美國，所以回答 No；Ken 是男生，用 he：No, he\'s not. He\'s from Japan.',
    ref: 'Unit 1 Sentence B（課本 p.21）' });

q('L02-Q4', '文法：選出正確的句子',
  '下面四個句子，哪一個完全正確？', null,
  'Tom and I are from the UK.',
  [['Tom and I am from the UK.', 'be 動詞與主詞不合', '看到 I 就用 am，沒注意主詞是 Tom and I 兩個人'],
   ['Ken and Yuki is from Japan.', 'be 動詞與主詞不合', '主詞是兩個人，卻用了 is'],
   ['She are from India.', 'be 動詞與主詞不合', 'she 是一個人，要用 is，不是 are']],
  ['每一句都先找出主詞，看主詞是一個人還是兩個人以上。',
   'Tom and I 是兩個人，就像 we 一樣。',
   'we 要配的 be 動詞，也是 they 要配的那一個。'],
  { concept: 'Tom and I 是兩個人，和 we 一樣用 are：Tom and I are from the UK.',
    ref: 'Unit 1 Grammar Tips（課本 p.22）' });

q('L02-Q5', '文法：專有名詞大寫',
  '下面哪一個句子的大寫完全正確？', null,
  'Amy and Kevin are from Taiwan.',
  [['Amy and kevin are from Taiwan.', '專有名詞大寫', 'Kevin 是人名，第一個字母要大寫'],
   ['Amy and Kevin are from taiwan.', '專有名詞大寫', 'Taiwan 是國名，第一個字母要大寫'],
   ['Amy And Kevin Are From Taiwan.', '專有名詞大寫', '以為每一個字都要大寫；and、are、from 不是專有名詞，不用大寫']],
  ['先找出句子裡哪些字是人名或國名。',
   '人名、國名是專有名詞，第一個字母要大寫。',
   '不是人名、國名的字（and、are、from）不用大寫。'],
  { concept: '人名 Amy、Kevin 和國名 Taiwan 是專有名詞，第一個字母要大寫；and、are、from 是一般的字，不用大寫。',
    ref: 'Unit 1 Grammar Tips（課本 p.22）' });

q('L02-Q6', '聽力：聽問句選回答',
  '請聽問句，選出最合適的回答。', listen('Where is Tommy from?', 0.9),
  'He\'s from Canada.',
  [['She\'s from Canada.', '人稱代名詞混淆', 'Tommy 是男生，要用 he，不是 she'],
   ['I\'m from Canada.', '人稱代名詞混淆', '問的是 Tommy，不是問「你」，所以不能用 I 回答'],
   ['Yes, he is.', '疑問詞問句用 Yes 回答', '用 Where 開頭的問句要回答地方，不能只說 Yes 或 No']],
  ['先聽問句是用哪一個疑問詞開頭的。',
   '問的是 Tommy 從哪裡來，回答要說出一個地方。',
   '故事裡的 Tommy 是男生，回答要用 he、she 還是 I？'],
  { concept: '念的是 Where is Tommy from?（Tommy 從哪裡來？）問句問地方，Tommy 是男生，所以回答 He\'s from Canada.',
    ref: 'Unit 1 Sentence A（課本 p.20）、Story（課本 p.16）' });

q('L02-Q7', '情境應用：依表格問答',
  '依上表，哪一組問答正確？',
  table(['名字', '來自哪裡'], [['Lily（女生）', 'Australia'], ['Ben（男生）', 'Canada'], ['Anna（女生）', 'India']], '三位新朋友'),
  'Is Ben from Canada? Yes, he is.',
  [['Is Lily from India? Yes, she is.', '資訊錯置', '把 Lily 和 Anna 的國家看錯了，Lily 來自澳大利亞'],
   ['Is Anna from India? No, she\'s not.', '簡答不一致', 'Anna 真的來自印度，應該回答 Yes, she is.'],
   ['Is Ben from Canada? Yes, she is.', '人稱代名詞混淆', 'Ben 是男生，要用 he，不是 she']],
  ['每一組都先對照表格，看問的那個人是不是來自那個國家。',
   '國家對了，再看回答用的是 Yes 還是 No、是 he 還是 she。',
   '表格裡只有一個男生，看看問他的那一組回答對不對。'],
  { concept: 'Ben 來自加拿大，而且是男生，所以 Is Ben from Canada? 要回答 Yes, he is.',
    ref: 'Unit 1 Sentence B（課本 p.21）' });

// ───────── en5-03 發音與閱讀（Phonics p.26–27、Reading p.23–25、Reading Skills p.10、Story p.15–17）─────────
q('L03-Q1', '聽力：聽音辨字母組合',
  '請聽英文單字，選出這個字的拼法裡有哪一組字母。', listen('her', 0.8),
  'er',
  [['ee', '母音混淆', '把聽到的字聽成 he，以為是 ee 的長音'],
   ['ea', '母音混淆', '把聽到的字聽成長音 e，以為是 ea 的拼法'],
   ['ar', '母音混淆', '聽到捲舌的 r 音，就以為是 ar']],
  ['先聽這個字的母音是長音 e，還是捲舌的音。',
   '這個字的母音是捲舌的音，和 girl、nurse 的母音一樣。',
   '這個字和 he 只差在後面多了一個字母。'],
  { concept: '念的是 her，母音是 er 的念法，和 girl 的 ir、nurse 的 ur 念法一樣；he 才是長音 e。',
    ref: 'Unit 1 Phonics（課本 pp.26–27）' });

q('L03-Q2', '發音：選出母音念法不同的字',
  '下面四個字，哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。', SAY,
  'fist',
  [['bird', '拼字組合混淆', '看到 ir 和 ur、er 的字母不同，就以為念法也不同'],
   ['nurse', '拼字組合混淆', '看到 ur 和 ir、er 的字母不同，就以為念法也不同'],
   ['her', '拼字組合混淆', '看到 er 和 ir、ur 的字母不同，就以為念法也不同']],
  ['先聽每個字的母音，不要只看拼法。',
   'er、ir、ur 這三組字母的念法是一樣的。',
   '找一找哪一個字沒有 er、ir 或 ur。'],
  { concept: 'bird 的 ir、nurse 的 ur、her 的 er 念法都一樣；fist 只有 i，念短音 i，和其他三個不同。',
    ref: 'Unit 1 Phonics Sound It Out、Listen, Point, and Say（課本 pp.26–27）' });

q('L03-Q3', '發音：拼讀規則',
  '下面哪一個字有和 girl 的 ir 一樣的念法？', null,
  'purple',
  [['fist', '拼字組合混淆', '看到 i 就以為和 girl 一樣；fist 只有 i，後面沒有 r，念短音 i'],
   ['blue', '拼字組合混淆', '看到 u 就以為是 ur；blue 的 u 後面沒有 r'],
   ['he', '拼字組合混淆', '看到 e 就以為是 er；he 的 e 後面沒有 r，念長音 e']],
  ['girl 的 ir 是母音後面接 r。',
   'er、ir、ur 這三組的念法一樣，找一找哪一個字有其中一組。',
   '只看母音後面有沒有接 r。'],
  { concept: 'purple 的 ur 和 girl 的 ir 念法一樣；fist、blue、he 的母音後面都沒有 r，念法不同。',
    ref: 'Unit 1 Phonics Sound It Out、Listen and Chant（課本 p.26）' });

q('L03-Q4', '聽力：聽音選字',
  '請聽英文，選出你聽到的單字。', listen('purse', 0.8),
  'purse',
  [['nurse', '音近字', '結尾相同、押韻，沒聽清楚開頭是 p 還是 n'],
   ['perm', '音近字', '開頭都是 p、母音一樣，沒聽清楚結尾是 s 還是 m'],
   ['purple', '音近字', '開頭的 pur 相同，沒注意到聽到的字只有一個音節']],
  ['先聽開頭的音，再聽結尾的音。',
   '開頭是 p 的音，結尾是 s 的音。',
   '這個字只有一個音節，是裝錢的東西。'],
  { concept: '念的是 purse（錢包），開頭 p、中間 ur、結尾 s 的音，只有一個音節。',
    ref: 'Unit 1 Phonics Sound It Out（課本 p.26）' });

const P1 = passage('Hi, I\'m Nina. I\'m from Canada. I like to read books about animals. This is my friend Leo. He\'s from India. He plays basketball after school. That\'s my friend Lucy. She\'s from Japan. She goes to school by bus. We all love whales. Next week, we\'re going whale watching in Hualien!');

q('L03-Q5', '閱讀：短文擷取',
  '依上面的短文回答：Where is Lucy from?', P1,
  'She\'s from Japan.',
  [['She\'s from Canada.', '資訊錯置', '把 Nina 的國家當成 Lucy 的'],
   ['She\'s from India.', '資訊錯置', '把 Leo 的國家當成 Lucy 的'],
   ['She\'s from Hualien.', '資訊錯置', '花蓮是他們下星期要去賞鯨的地方，不是 Lucy 來自的國家']],
  ['先在短文裡找到 Lucy 的名字。',
   '介紹 Lucy 的下一句，就是她來自哪裡。',
   '那一句是 She\'s from 開頭。'],
  { concept: '短文寫 That\'s my friend Lucy. She\'s from Japan.，所以 Lucy 來自日本。',
    ref: 'Unit 1 Reading（課本 pp.23–25）' });

q('L03-Q6', '閱讀技巧：找出細節（Find Details）',
  '依上面的短文，下列哪一個說法正確？', P1,
  'Lucy 搭公車上學。',
  [['Leo 喜歡讀動物的書。', '資訊錯置', '喜歡讀動物書的是 Nina，不是 Leo'],
   ['Nina 放學後打籃球。', '資訊錯置', '放學後打籃球的是 Leo，不是 Nina'],
   ['他們上星期去花蓮賞鯨。', '時間錯置', '短文說的是 Next week（下星期），還沒去']],
  ['每個選項都回短文找那個人的那一句，一句一句對。',
   '注意每一件事是誰做的，也注意時間是 next week 還是別的時候。',
   '找一找 by bus 那一句說的是誰。'],
  { concept: '短文寫 That\'s my friend Lucy. ... She goes to school by bus.，所以 Lucy 搭公車上學。找細節時要看清楚是誰、做什麼、什麼時候。',
    ref: 'Reading Skills：Find Details（課本 p.10）、Unit 1 Reading（課本 pp.23–25）' });

q('L03-Q7', '故事理解',
  '依 Unit 1 的故事 Whale Watching，下列哪一個說法正確？', null,
  'Tommy 是第一次來臺灣。',
  [['Ella 是從美國來的。', '故事情節記錯', '有人問 Ella 是不是來自美國，她回答不是，她來自法國'],
   ['Joe 是從加拿大來的。', '故事人物混淆', '來自加拿大的是 Tommy，Joe 來自英國'],
   ['大家最先看到的是鯨魚。', '故事情節記錯', '有人先喊看到鯨魚，但那其實是海豚，後來才看到鯨魚']],
  ['回想故事裡兩位新朋友 Ella 和 Tommy 怎麼介紹自己，Joe 又說自己來自哪裡。',
   '大家第一次喊 There\'s a whale. 時，看到的真的是鯨魚嗎？',
   'Tommy 自我介紹時，除了名字，還說了一件和臺灣有關的事。'],
  { concept: 'Tommy 自我介紹時說 It\'s my first time in Taiwan.（這是我第一次來臺灣。）Ella 來自法國、Joe 來自英國；大家最先看到的是海豚。',
    ref: 'Unit 1 Story（課本 pp.15–17）' });

save();
