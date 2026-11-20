// 康軒 Wonder World 7 Unit 4 A Call in the Morning（課本 pp.61–73）。
import { buildUnit, listen, SAY, passage, table } from './build-unit.mjs';

const { q, save } = buildUnit('U4');

// en5-11 字彙與聽力
q('L11-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的作息。', listen('go to bed', 0.8), 'go to bed',
  [['go to school', '音近字', '開頭兩個字一樣，沒有聽清楚最後一個字'],
   ['go home', '音近字', '只聽見 go，就猜是回家'],
   ['get up', '中文意思混淆', '把睡前和起床的作息記反了']],
  ['先數一數聽見幾個字。', '有些選項從相同的字開始，再聽最後一個字。', '最後一個字以 b 的音開頭。'],
  { concept: '念的是 go to bed（上床睡覺）。前兩個字和 go to school 相同，最後一個字是 bed。', ref: 'Unit 4 Vocabulary（課本 pp.64–65）' });

q('L11-Q2', '聽力：聽音選字',
  '請聽英文，選出你聽到的作息。', listen('do my homework', 0.8), 'do my homework',
  [['go home', '音近字', '聽見 home 的聲音就作答，漏聽連在後面的部分'],
   ['have breakfast', '中文意思混淆', '只認出這是在說自己的作息，就選了另一個常見詞'],
   ['go to school', '中文意思混淆', '把和學校有關的兩種作息混在一起']],
  ['先比較開頭的動詞。', '再聽有沒有表示「我的」的字。', '最後一個字有兩個音節，第二個音節和「工作」的英文同音。'],
  { concept: '念的是 do my homework（做我的功課）。homework 是一個有兩個音節的字。', ref: 'Unit 4 Vocabulary（課本 pp.64–65）' });

q('L11-Q3', '聽力：聽音選意思',
  '請聽英文，選出最符合的中文意思。', listen('have dinner', 0.8), '吃晚餐',
  [['吃早餐', '中文意思混淆', '聽見 have 就套用了早餐的詞'],
   ['吃午餐', '中文意思混淆', '三餐都用 have，沒有聽清楚是哪一餐'],
   ['去上學', '中文意思混淆', '把吃飯的作息換成同一單元的另一種作息']],
  ['先分辨是吃飯，還是要去某個地方。', '分辨三餐要聽動詞後面是哪個字。', '後面的字有兩個音節，第一個音節以 d 開頭。'],
  { concept: '念的是 have dinner（吃晚餐）。三餐都可以用 have，後面的 dinner 指晚餐。', ref: 'Unit 4 Vocabulary（課本 pp.64–65）' });

q('L11-Q4', '字彙：看中文選英文',
  '「去上學」的英文是哪一個？', null, 'go to school',
  [['go to bed', '中文意思混淆', '看到 go to 就選了，沒有比對要去的地方'],
   ['go home', '中文意思混淆', '把去學校和從學校回家的方向弄反了'],
   ['do my homework', '中文意思混淆', '把去上學和在家做功課當成同一件事']],
  ['想想「去上學」描述的是什麼動作。', '表示去的選項有好幾個，留意最後是哪個地方。', '選一個詞，讓最後一個字指向上課的地方。'],
  { concept: 'go to school 是去上學。school 指學校。', ref: 'Unit 4 Vocabulary（課本 pp.64–65）' });

q('L11-Q5', '字彙：依情境選作息',
  'Luna 早上起床後準備吃今天的第一餐。她要做什麼？', null, 'She has breakfast.',
  [['She has lunch.', '中文意思混淆', '知道是吃飯，卻把早餐選成午餐'],
   ['She has dinner.', '中文意思混淆', '知道是吃飯，卻把第一餐和晚餐記反'],
   ['She goes to school.', '資訊錯置', '想到起床後也要上學，沒有注意她正在準備吃東西']],
  ['找出 Luna 現在要做的事。', '她準備吃東西，留意是在說哪一餐。', '回想通常在起床後吃的那一餐，和午餐、晚餐分開。'],
  { concept: 'Luna 準備吃早餐。have breakfast 表示吃早餐，主詞是 she 時用 has。', ref: 'Unit 4 Vocabulary（課本 pp.64–65）、Grammar Tips（課本 p.68）' });

q('L11-Q6', '聽力：聽句子選意思',
  '請聽英文句子，選出符合內容的中文。', listen('I go home at four twenty.', 0.9), '我四點二十分回家。',
  [['我四點十二分回家。', '數字聽錯', '辨認出回家，卻把 twenty 聽成 twelve'],
   ['我四點二十分去上學。', '中文意思混淆', '時間聽對了，但把回家和去上學記反'],
   ['我四點四十分回家。', '數字聽錯', '聽對小時和作息，但把分鐘記成 forty']],
  ['先找出句子提到的活動。', '再聽表示時間的部分，分出小時和分鐘。', '分鐘的英文有兩個音節，比對它的開頭和最後一拍。'],
  { concept: 'go home 表示回家，four twenty 是四點二十分。twenty 是二十。', ref: 'Unit 4 Vocabulary（課本 p.65）、Sentence A（課本 p.66）' });

q('L11-Q7', '聽力：聽短對話',
  '請聽對話，選出符合內容的說法。',
  listen("Dora: Do you have lunch at eleven thirty, Josh? Josh: No, I don't. I have lunch at twelve ten. I have dinner at six forty.", 0.9),
  'Josh 十二點十分吃午餐。',
  [['Josh 十一點半吃午餐。', '對話資訊錯置', '把問句的時間當成回答，漏聽 Josh 的否定'],
   ['Josh 十二點十分吃晚餐。', '時間錯置', '時間聽對了，卻配給另一餐'],
   ['Josh 六點四十分吃午餐。', '時間錯置', '把晚餐時間記成午餐時間']],
  ['先聽提到了哪幾餐。', '有人先問一個時間，留意回答有沒有同意。', '重聽回答的人否定後的第一句，把時間和那一餐配在一起。'],
  { concept: 'Josh 否認十一點半吃午餐，接著說十二點十分吃午餐、六點四十分吃晚餐。', ref: 'Unit 4 Sentence A／B（課本 pp.66–67）' });

// en5-12 句型與文法
q('L12-Q1', '文法：直述句的動詞',
  '選出正確的答案填入空格：「Gianna ____ to school at seven forty.」', null, 'goes',
  [['go', '第三人稱混淆', '把 I go to school 的 go 原封不動地用在人名後面'],
   ['gos', '第三人稱混淆', '知道第三人稱動詞要變，卻只在 go 後加 s'],
   ['going', '動詞形式混淆', '把表示正在進行的動詞形式直接放到主詞後面']],
  ['先圈出主詞，看看是幾個人。', '把 Gianna 換成 she，再看空格後面的 to school。', '回想 go 在課本的動詞表中，接在 she 後面是哪個形式。'],
  { concept: 'Gianna 是單數主詞。go to school 接在她後面時，go 要變成 goes。', ref: 'Unit 4 Vocabulary（課本 p.64）、Grammar Tips（課本 p.68）' });

q('L12-Q2', '句型：詢問幾點',
  '選出正確的答案填入空格。\nA: What ____ do they get up?\nB: They get up at six forty-five.', null, 'time',
  [['day', '疑問詞混淆', '把問幾點當成問哪一天'],
   ['place', '疑問詞混淆', '把精確到幾點的回答當成在問地點'],
   ['month', '疑問詞混淆', '知道是在問時間，卻用了問月份的字']],
  ['先看 B 回答什麼。', 'B 用 at 加上鐘面上的時間。', '挑出能和 What 合起來問「幾點」的字。'],
  { concept: '回答是六點四十五分，問句要用 What time，詢問做這件事的時間。', ref: 'Unit 4 Sentence A（課本 p.66）、Grammar Tips（課本 p.68）' });

q('L12-Q3', '句型：問答配對',
  'Serena 早餐是七點二十分吃的。有人直接問她：「Do you have breakfast at seven?」她怎麼回答最合適？', null,
  'No, I don’t. I have breakfast at seven twenty.',
  [['Yes, I do. I have breakfast at seven twenty.', '簡答不一致', '時間寫對了，前面卻答 Yes，等於先說自己七點吃早餐'],
   ['No, I don’t. I have breakfast at seven o’clock.', '時間錯置', '知道要否定，但把問句的時間搬到補充說明'],
   ['No, she doesn’t. She has breakfast at seven twenty.', '人稱代名詞混淆', 'Serena 在回答自己的作息，要用 I，不能用 she 來代替自己']],
  ['先比較題目給的時間和問句裡的時間。', '問的是不是同一個時間？先決定要肯定還是否定。', '如果是回答自己的作息，還要檢查人稱和補充的時間。'],
  { concept: '兩個時間不同，所以 Serena 要用 No, I don’t. 回答，再說自己七點二十分吃早餐。', ref: 'Unit 4 Sentence A／B（課本 pp.66–67）' });

q('L12-Q4', '文法：選出正確的問句',
  '下面哪一個英文問句寫得完全正確？', null, 'What time does Adrian have dinner?',
  [['What time do Adrian have dinner?', '第三人稱混淆', '把問 you 時用的 do 套到單數人名上'],
   ['What time does Adrian has dinner?', 'does 後接 has', '動詞已經用 does 配合主詞，卻又把 have 改成了 has'],
   ['What time Adrian does have dinner?', '句型混淆', '把主詞放在 does 前面，沒有用問句的順序']],
  ['每句都先看疑問詞後面接了什麼。', 'Adrian 是單數人名，回想他要和哪個助動詞一起用。', '再檢查助動詞放在哪裡，以及後面的主要動詞是不是原形。'],
  { concept: 'What time 後先接 does，再接 Adrian 和原形 have，才能問 Adrian 幾點吃晚餐。', ref: 'Unit 4 Grammar Tips（課本 p.68）' });

q('L12-Q5', '文法：do／does 的直述句',
  '兩個空格應依序填什麼？\nTheo ____ his homework at five.\nWe ____ our homework at four.', null, 'does／do',
  [['do／does', '第三人稱混淆', '把跟人名配對和跟 we 配對的動詞形式互換了'],
   ['does／does', '第三人稱混淆', '第一句用對了，第二句卻跟著用同一個動詞形式'],
   ['do／do', '第三人稱混淆', '把 do 原形直接用在兩個不同的主詞後面']],
  ['找出每句各自在說誰。', 'Theo 是另一個人，We 是「我們」。', '分別想一想課本裡 he 和 we 要用哪一種動詞形式。'],
  { concept: 'Theo 是單數人名，用 does；we 表示我們，用 do。兩個空格都指「做」功課。', ref: 'Unit 4 Vocabulary（課本 p.65）、Grammar Tips（課本 p.68）' });

q('L12-Q6', '聽力：聽問句選回答',
  '請聽英文問句，選出最合適的回答。', listen('What time do you go to bed, Celia?', 0.9),
  'I go to bed at nine fifteen.',
  [['I get up at nine fifteen.', '中文意思混淆', '聽出是在問時間，卻把睡覺時間和起床時間混在一起'],
   ['She goes to bed at nine fifteen.', '人稱代名詞混淆', '聽見人名後就用 she，沒有注意 Celia 是被直接問的人'],
   ['I go to bed in my room.', '疑問詞混淆', '回答了睡覺的地點，沒說幾點睡']],
  ['先聽這是在直接問誰。', '聽問句是在確認某件事，還是在問做那件事的時間。', '被問到的人要用自己的角度回答，並核對回答的是同一項作息。'],
  { concept: '問句直接問 Celia 幾點上床睡覺。Celia 用 I go to bed 加上時間回答。', ref: 'Unit 4 Vocabulary（課本 p.65）、Sentence A（課本 p.66）' });

q('L12-Q7', '情境應用：依表格問答',
  '依上表，向 Erin 問她自己的作息，哪一組問答符合紀錄？',
  table(['活動', '時間'], [['get up', '6:15 AM'], ['go home', '4:25 PM'], ['have dinner', '6:10 PM']], 'Erin 的作息表'),
  'Do you go home at four twenty-five? — Yes, I do.',
  [['Do you get up at six fifteen? — No, I don’t.', '簡答不一致', '起床時間和表格相同，卻用了否定簡答'],
   ['Do you have dinner at six thirty? — Yes, I do.', '時間錯置', '把晚餐時間六點十分看成六點半'],
   ['Do you go home at four twenty-five? — Yes, she does.', '人稱代名詞混淆', '問句直接問 Erin，她應用 I 回答自己的作息']],
  ['先把每一題問的作息對到表格左欄。', '再看右欄的時間和問句是否一致。', '時間相符要肯定，最後檢查回答是誰在說自己的作息。'],
  { concept: '表上 Erin 四點二十五分回家。問她是不是這個時間時，她用 Yes, I do. 回答。', ref: 'Unit 4 Sentence B（課本 p.67）' });

// en5-13 發音與閱讀
q('L13-Q1', '聽力：聽音辨字母組合',
  '請聽英文單字，選出這個字的拼法裡有哪一組字母。', listen('shout', 0.8), 'ou',
  [['oi', '母音混淆', '聽到滑動的母音就認作上一課 coin 的母音'],
   ['oa', '母音混淆', '把聲音聽成 coach 裡的母音'],
   ['ar', '母音混淆', '只注意起頭較開的母音，忽略聲音後面的變化']],
  ['先把注意力放在單字中間的母音。', '比較它和 coin 中間的聲音如何滑動。', '回想表示房子的拼讀字，母音和這個字相同，也用同一組字母。'],
  { concept: '念的是 shout。它和 house 中間的母音相同，都用 ou 拼。', ref: 'Unit 4 Phonics Sound It Out（課本 p.72）' });

q('L13-Q2', '發音：選出母音念法不同的字',
  '哪一個字的母音念法和其他三個不同？可以點喇叭聽。', SAY, 'horse',
  [['house', '形近字', 'house 和 horse 拼法只差一個字母，看起來很像，就以為念法也一樣'],
   ['mouse', '母音混淆', '注意到開頭是 m，卻把子音的差異當成母音不同'],
   ['clown', '拼字組合混淆', '因為它有 ow，就以為它的母音一定和有 ou 的字不同']],
  ['輪流點播，注意每個字的母音。', '有些字即使拼法不同，中間母音還是相同。', '先把母音和「老鼠」的英文字相同的放一起，再找剩下的字。'],
  { concept: 'house、mouse 的 ou 和 clown 的 ow 念法一樣；horse 的 or 是 Unit 2 學的另一個母音，和其他三個不同。', ref: 'Unit 4 Phonics（課本 pp.72–73）、Unit 2 Phonics（課本 pp.40–41）' });

q('L13-Q3', '發音：拼讀規則',
  '哪個字的母音和 mouse 的母音相同？', null, 'owl',
  [['coach', '拼字組合混淆', '只注意拼法有 o，沒分辨 oa 和 ou'],
   ['coin', '母音混淆', '把前一單元的 oi 聲音混成 ou'],
   ['load', '拼字組合混淆', '看到 oa 的第一個字母和 ou 一樣，就當成同音']],
  ['先念 mouse，注意母音怎麼滑動。', '找出選項裡可能代表母音的兩個字母。', '回想本課哪一組拼法和 mouse 裡的 ou 念法相同。'],
  { concept: 'owl 的 ow 和 mouse 的 ou 在本課念法相同。coach 和 load 的 oa、coin 的 oi 都是不同的母音。', ref: 'Unit 4 Phonics（課本 pp.72–73）、Unit 3 Phonics（課本 p.58）' });

q('L13-Q4', '聽力：聽音選字',
  '請聽英文，選出你聽到的單字。', listen('shower', 0.8), 'shower',
  [['shout', '音近字', '開頭和第一個母音相同，但沒有留意音節數和結尾'],
   ['house', '音近字', '只聽到相同的母音，沒比對開頭和結尾'],
   ['clown', '音近字', '抓到相同的母音，就選了另一個帶 ow 的字']],
  ['先聽有幾個音節。', '辨認開頭有沒有像 sh 的聲音。', '重聽後半，聽完第一個母音後還接了一個較輕的音節。'],
  { concept: '念的是 shower，有兩個音節。shout 有相同的開頭和第一個母音，但只有一個音節。', ref: 'Unit 4 Phonics Sound It Out（課本 p.72）' });

const eveningPlan = passage(
  'Lydia goes to bed late. She wants to go to bed at nine thirty. She plays with her toys after dinner, so she starts her homework late. Now she does her homework before dinner. After dinner, she puts her books in her bag and gets ready for bed. Her new plan helps her go to bed on time.'
);

q('L13-Q5', '閱讀：短文擷取',
  '依上面的短文，Lydia 希望幾點上床睡覺？', eveningPlan, '她希望九點半上床。',
  [['她希望八點半上床。', '數字混淆', '讀到分鐘是三十分，卻把小時看錯了'],
   ['她希望九點整上床。', '時間錯置', '看見 nine 就作答，漏讀後面的分鐘'],
   ['她希望十點半上床。', '資訊錯置', '把課本課文裡的目標時間帶入這篇短文']],
  ['先定位短文在說什麼作息。', '找出說 Lydia 自己希望怎麼做的句子。', '讀出那句 at 後面的兩個數字，注意小時和分鐘。'],
  { concept: '短文說 She wants to go to bed at nine thirty.。nine thirty 是九點三十分。', ref: 'Unit 4 Reading（課本 pp.69–71）、Sentence A（課本 p.66）' });

q('L13-Q6', '閱讀技巧：問題與解決辦法',
  '依上面的短文，為了解決太晚開始寫功課的問題，Lydia 改成怎麼做？', eveningPlan,
  '改在晚餐前寫功課。',
  [['改在晚餐後玩玩具。', '問題與辦法混淆', '把使她晚寫功課的舊習慣當成新方法'],
   ['改在晚餐後寫功課。', '時間錯置', '知道計畫改了寫功課的時段，卻看反 before 和 after'],
   ['晚餐前先把書放進書包。', '資訊錯置', '把整理書包的安排當成處理功課的辦法，還把它放錯時間']],
  ['找出她原先太晚寫功課的原因。', '接著找 Now，它帶出和原先不同的做法。', '看新計畫裡寫功課和吃晚餐的先後順序。'],
  { concept: 'Lydia 原先晚餐後玩玩具，所以很晚才開始寫功課。她的新辦法是把寫功課移到晚餐前。', ref: 'Reading Skills：Problem and Solution（課本 p.11）、Unit 4 Reading（課本 pp.69–71）' });

q('L13-Q7', '故事理解',
  'Unit 4 的故事裡，Amy 和 Boka 約好幾點在公園見？', null, '早上七點半。',
  [['早上六點半。', '時間錯置', '把 Boka 打電話時的時間當成約見面的時間'],
   ['早上八點整。', '時間錯置', '把 Amy 平常週末起床的時間當成約見面的時間'],
   ['早上六點整。', '時間錯置', '把 Boka 平常起床的時間當成約見面的時間']],
  ['故事提到好幾個時間，先分開起床、打電話和見面的時間。', '找出 Amy 接完電話後答應見面的那一格。', '留意她在提到公園之後說的時間。'],
  { concept: 'Amy 在掛電話前約 Boka 七點半到公園。六點半是通話時的時間；八點和六點分別是兩人提到的起床時間。', ref: 'Unit 4 Story（課本 pp.61–63）' });

save();
