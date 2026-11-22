// 康軒 Wonder World 7 Unit 2 Having a Cold。頁碼依學生課本。
// node drafts/en5/build-U2.mjs → drafts/en5/en5-questions-U2.json
import { buildUnit, listen, SAY, passage, table } from './build-unit.mjs';

const { q, save } = buildUnit('U2');

// en5-04 字彙與聽力
q('L04-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的詞。', listen('a fever', 0.8),
  'a fever',
  [['a headache', '音近字', '聽到兩個音節就選了 headache，沒再比對開頭的音'],
   ['a cough', '中文意思混淆', '把發燒和咳嗽兩個常一起提到的症狀記反了'],
   ['a cold', '中文意思混淆', '把一個症狀當成整個感冒的英文']],
  ['重聽 a 後面的字，注意有幾個音節。',
   '有兩個音節的選項還要再比開頭的音。',
   '重聽第一個音節，開頭是上排牙齒輕碰下唇、往外吹氣的 f 音。'],
  { concept: '念的是 a fever（發燒）。fever 有兩個音節，開頭是 f 的音。',
    ref: 'Unit 2 Vocabulary（課本 p.32）' });

q('L04-Q2', '聽力：聽音選字',
  '請聽英文，選出你聽到的詞。', listen('a toothache', 0.8),
  'a toothache',
  [['a headache', '音近字', '只聽到字尾的 ache，把前面的身體部位聽錯了'],
   ['a stomachache', '音近字', '抓到 ache 的音就選了，沒聽清楚前半和音節數'],
   ['a sore throat', '中文意思混淆', '把嘴巴附近的兩種疼痛記混了']],
  ['重聽 a 後面的聲音，注意哪一段最熟悉。',
   '字尾有 ache 的音，前半才是分辨不同部位的線索。',
   '重聽第一個音節的開頭，在 t、h 和 st 之間比較。'],
  { concept: '念的是 a toothache（牙痛）。tooth 表示牙齒，和後面的 ache 合起來表示牙痛。',
    ref: 'Unit 2 Vocabulary（課本 pp.32–33）' });

q('L04-Q3', '聽力：聽音選意思',
  '請聽英文，選出最符合的中文意思。', listen('a runny nose', 0.8),
  '流鼻水',
  [['喉嚨痛', '中文意思混淆', '只聽到是兩個字組成的症狀，便套成另一個片語的意思'],
   ['頭在痛', '中文意思混淆', '把鼻子的症狀和頭痛記混了'],
   ['在咳嗽', '中文意思混淆', '把感冒時常一起出現的症狀混在一起']],
  ['先聽 a 後面是一個字還是兩個字。',
   '重聽最後一個字，想想它指的是哪個身體部位。',
   '最後一個字是 n 起頭，意思是臉上一個用來聞味道的部位。'],
  { concept: '念的是 a runny nose（流鼻水）。nose 是鼻子，runny nose 說的是鼻子流鼻水。',
    ref: 'Unit 2 Vocabulary（課本 pp.32–33）' });

q('L04-Q4', '字彙：看中文選英文',
  '「喉嚨痛」的英文是哪一個？', null,
  'a sore throat',
  [['a runny nose', '中文意思混淆', '把喉嚨不舒服記成鼻子流鼻水'],
   ['a stomachache', '中文意思混淆', '知道在說疼痛，卻選了肚子痛'],
   ['a toothache', '中文意思混淆', '把喉嚨痛和牙痛的部位記反了']],
  ['先看「哪裡」在痛。',
   '找一找有哪個選項用兩個字來描述疼痛的地方。',
   '表示喉嚨的字以 th 開頭，留意它在片語中的位置。'],
  { concept: '喉嚨痛是 a sore throat。sore 說明不舒服，throat 指喉嚨。',
    ref: 'Unit 2 Vocabulary（課本 pp.32–33）' });

q('L04-Q5', '字彙：症狀的寫法',
  'Maya 要寫「肚子痛」的英文。哪一個拼法正確？', null,
  'a stomachache',
  [['a stomacheache', '拼字組合混淆', '誤把 stomach 的尾端拼成 che，再接疼痛的字'],
   ['a stomacache', '拼字組合混淆', '照念的音拼，漏掉了 stomach 結尾 ch 裡的 h'],
   ['a stomachake', '拼字組合混淆', '照念的音把 ache 拼成 ake']],
  ['回想課本怎麼把身體部位和疼痛寫在一起。',
   '把每個選項拆成「肚子」和「疼痛」兩半，看哪一半多了或少了字母。',
   '前半的「肚子」以 ch 結尾，後面不多加字母；後半的「疼痛」和 headache 結尾的寫法一樣。'],
  { concept: '課本把 stomach（肚子）和 ache（疼痛）直接合成 stomachache。stomacheache 多了 e、stomacache 少了 h、stomachake 把 ache 拼成了 ake。',
    ref: 'Unit 2 Vocabulary（課本 pp.32–33）' });

q('L04-Q6', '聽力：聽句子選意思',
  '請聽英文句子，選出意思最符合的中文。', listen('I have a cold and a cough.', 0.9),
  '我感冒，也咳嗽。',
  [['我感冒，也發燒。', '中文意思混淆', '聽對了感冒，卻把第二個詞當成另一種常見的感冒症狀'],
   ['我頭痛，也咳嗽。', '中文意思混淆', '聽對了第二個症狀，卻把第一個症狀的意思記錯'],
   ['我發燒，也頭痛。', '中文意思混淆', '只抓到句子在說不舒服，沒有分別確認兩個詞的意思']],
  ['重聽一次，注意說話的人提了幾種不舒服的情況。',
   '可以在連接兩個說法的地方暫停，先分別聽清楚，再合在一起想。',
   '兩個症狀的英文都以 k 的音開頭，分辨哪一個字尾帶 f 的音。'],
  { concept: '句子 I have a cold and a cough. 用 and 接起來。a cold 是感冒，a cough 是咳嗽。',
    ref: 'Unit 2 Vocabulary（課本 p.32）、Sentence A（課本 p.34）' });

q('L04-Q7', '聽力：聽短對話',
  '請聽對話，選出符合對話的說法。',
  listen("Nora: Does Mia have a cough? Mike: No, she doesn't. She has a toothache. I have a cough.", 0.9),
  'Mia 牙痛。',
  [['Mia 咳嗽。', '對話資訊錯置', '只聽前面的問句，沒注意 Mike 先否認了'],
   ['Mike 牙痛。', '對話資訊錯置', '聽到牙痛就配給說話的 Mike，沒聽出他還在說 Mia'],
   ['Mike 頭痛。', '音近字', '把有 ache 的字聽成頭痛，還把症狀配給了 Mike']],
  ['留意對話在問誰、是誰回答。',
   '回答的人有時說自己，有時說問句裡的人。聽聽看他什麼時候換了主詞。',
   '聽完否定的簡答後，下一句還在說問句裡的人。把那句的症狀和人名配在一起。'],
  { concept: "Mike 先說 No, she doesn't.，接著說 She has a toothache.，這兩句都在說 Mia。最後一句 I have a cough. 才是在說他自己。",
    ref: 'Unit 2 Sentence B（課本 p.35）' });

// en5-05 句型與文法
q('L05-Q1', '文法：直述句的動詞',
  '選出正確的答案填入空格：「Ivy ____ a cough.」', null,
  'has',
  [['have', '第三人稱混淆', '直接把 I have 裡的 have 搬到人名後面'],
   ['haves', '第三人稱混淆', '知道一個人當主詞時動詞要變，卻直接在 have 後加 s'],
   ['is', '動詞混淆', '把表示有某個症狀的動詞換成 be 動詞']],
  ['先圈出主詞，看這句在說誰。',
   '把 Ivy 換成 she，再回想課本的動詞表。',
   '這句在說她有一種症狀，想一想 have 在 she 後面要怎麼變。'],
  { concept: 'Ivy 是一個人，和 she 一樣用 has。Ivy has a cough. 表示 Ivy 咳嗽。',
    ref: 'Unit 2 Grammar Tips（課本 p.36）' });

q('L05-Q2', '句型：問句開頭',
  '選出正確的答案填入空格：「____ he have a sore throat?」', null,
  'Does',
  [['Do', '第三人稱混淆', '把 Do you 的 Do 用在 he 前面'],
   ['Is', '助動詞混淆', '記得 Is he 的問句開頭，卻沒看到後面已有 have'],
   ['Are', '助動詞混淆', '記得 Are you 這類問句開頭，卻沒看到後面已有 have']],
  ['看空格後面是誰，以及句子已經有哪個動詞。',
   '句子已經有 have，回想課本用哪一類字加在句首來提問。',
   '如果主詞是 you，可以用 Do。這題的主詞換成了 he。'],
  { concept: '問他有沒有某個症狀，用 Does he have …?。主詞是 he，句首用 Does。',
    ref: 'Unit 2 Sentence B（課本 p.35）、Grammar Tips（課本 p.36）' });

q('L05-Q3', '句型：問答配對',
  'Lena 鼻子流鼻水，牙齒沒有痛。有人問：「Does Lena have a toothache?」怎麼回答最合適？', null,
  "No, she doesn't. She has a runny nose.",
  [['Yes, she does. She has a runny nose.', '簡答不一致', '知道 Lena 流鼻水，但前面卻回答她有牙痛'],
   ["No, she don't. She has a runny nose.", '第三人稱混淆', '知道要回答 No，卻把 I 或 you 會用的否定簡答套在 she 上'],
   ["No, she doesn't. She has a sore throat.", '資訊錯置', '簡答正確，補充時卻把鼻水換成喉嚨痛']],
  ['先看問句在問哪一種症狀。',
   '把那個症狀和題目提供的情況比一比，決定要肯定還是否定。',
   '用和問句相配的簡答，再檢查第二句寫的是不是 Lena 真正的症狀。'],
  { concept: "Lena 沒有牙痛，所以用 No, she doesn't.。她流鼻水，用 She has a runny nose. 補充。",
    ref: 'Unit 2 Sentence B（課本 p.35）' });

q('L05-Q4', '文法：選出正確的句子',
  '下面哪一個英文問句寫得完全正確？', null,
  "What's wrong?",
  [['What wrong?', '漏寫 be 動詞', '只寫了 what 和 wrong，漏掉連接兩個字的 is'],
   ["Whats wrong?", '縮寫混淆', '知道要用縮寫，卻漏掉表示省略的撇號'],
   ["What's the wrong?", '句型混淆', '以為 wrong 前面和名詞一樣要加 the']],
  ['回想課本問「怎麼了？」的句型。',
   '這個問句本來有 be 動詞，即使寫成縮寫也要把它算進去。',
   '完整寫法是 What is wrong?，再看哪個選項把前兩個字正確縮在一起。'],
  { concept: "What is 縮寫成 What's。撇號放在 t 和 s 之間，表示 is 的 i 省略了。",
    ref: 'Unit 2 Story（課本 pp.30–31）、Sentence A（課本 p.34）' });

q('L05-Q5', '文法：do／does 後的動詞',
  '兩個空格應依序填什麼？\nDo you ____ a cold?\nDoes she ____ a headache?', null,
  'have／have',
  [['have／has', 'does 後接 has', '看到 she 就把直述句的 has 用在 Does 開頭的問句裡'],
   ['has／have', '第三人稱混淆', '第二空用了原形，第一空卻跟著症狀的單數名詞選 has'],
   ['has／has', 'do／does 後接 has', '以為問一個人有沒有某個症狀時，動詞一律要改成 has']],
  ['把兩句的句首圈起來，再分別看空格在哪裡。',
   '這兩句都是問句，句子前面已經有 do 或 does。',
   '課本說 do 和 does 後面的動詞都用原形，想想要填的原形是哪個。'],
  { concept: 'Do 和 Does 已經配好主詞，後面一律用動詞原形 have，所以兩個空格都填 have。',
    ref: 'Unit 2 Grammar Tips（課本 p.36）' });

q('L05-Q6', '聽力：聽問句選回答',
  '請聽問句，選出最合適的回答。', listen("What's wrong, Mike?", 0.9),
  'I have a sore throat.',
  [['He has a sore throat.', '人稱代名詞混淆', '聽見 Mike 的名字，就用第三人稱說他，沒注意是直接問 Mike'],
   ['I has a sore throat.', '第三人稱混淆', '知道要用 I 回答，卻用了 he、she、it 或單數人名後才會用的 has'],
   ['No, I don\'t have a sore throat.', '疑問詞混淆', '把請對方說明症狀的問句，聽成問他有沒有喉嚨痛']],
  ['辨認對方是在直接問一個人，還是在談另一個人。',
   '分辨對方是問有沒有指定的症狀，還是請人自己說哪裡不舒服。',
   '被問到的人回答自己的症狀時，要用 I 搭配正確的動詞。'],
  { concept: "What's wrong, Mike? 是直接問 Mike 哪裡不舒服。Mike 可以用 I have 加上一種症狀回答：I 後用 have，he、she、it 或單數人名後才用 has。",
    ref: 'Unit 2 Sentence A（課本 p.34）、Grammar Tips（課本 p.36）' });

q('L05-Q7', '情境應用：依表格問答',
  '依上表，哪一組問答正確？',
  table(['姓名', '今天記下的症狀'], [['Jack（男生）', 'a fever'], ['Chloe（女生）', 'a cold'], ['Eva（女生）', 'a headache']], '健康紀錄（每人只有一項症狀）'),
  "Does Jack have a cold? No, he doesn't.",
  [['Does Eva have a headache? No, she doesn\'t.', '簡答不一致', '表格上 Eva 的症狀確實是頭痛，卻答了 No'],
   ['Does Chloe have a fever? Yes, she does.', '資訊錯置', '把 Jack 的發燒讀成 Chloe 的症狀'],
   ["Does Jack have a cold? No, she doesn't.", '人稱代名詞混淆', '知道 Jack 沒有感冒，卻用了 she 指 Jack']],
  ['每次只找問句提到的那一列。',
   '把問句中的症狀和同一列的紀錄相比，再決定要用 Yes 或 No。',
   '有兩組問的是同一個人，對照他那一列的症狀和括號裡的資料。'],
  { concept: "Jack 只有發燒的紀錄，括號寫他是男生，所以問他有沒有感冒，要回答 No, he doesn't.。",
    ref: 'Unit 2 Sentence B（課本 p.35）、Grammar Tips（課本 p.36）' });

// en5-06 發音與閱讀
q('L06-Q1', '聽力：聽音辨字母組合',
  '請聽英文單字，選出這個字的拼法裡有哪一組字母。', listen('corn', 0.8),
  'or',
  [['ir', '母音混淆', '聽出有 r 的聲音，卻和 Unit 1 的 ir 讀音混淆'],
   ['oa', '母音混淆', '只注意中間像 o 的聲音，沒聽到 r'],
   ['ee', '母音混淆', '把中間的母音聽成像 see 那樣的長音 e']],
  ['先聽單字中間的母音，再聽最後一個子音前的聲音。',
   '比較中間的聲音有沒有帶 r 的音。',
   '它的母音和 horse 裡的母音一樣。想想這個字的中間怎麼拼。'],
  { concept: '念的是 corn（玉米）。它和 horse、pork 一樣，中間的母音用 or 來拼。',
    ref: 'Unit 2 Phonics Sound It Out（課本 p.40）' });

q('L06-Q2', '發音：選出母音念法不同的字',
  '哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。', SAY,
  'car',
  [['corn', '拼字組合混淆', '只注意 corn 的字尾有 n，誤把子音的差別當成母音的差別'],
   ['horse', '拼字組合混淆', '注意到 horse 後面有 s 的音，卻沒比對中間的母音'],
   ['pork', '拼字組合混淆', '把開頭的 p 或字尾的 k 當成判斷母音的線索']],
  ['輪流點播，先比較中間的母音。',
   '這些字都帶 r 的音，聽聽 r 前面的部分有什麼差別。',
   '有三個字的母音和 horse 的相同。比較剩下的字。'],
  { concept: 'corn、horse、pork 都有 or 的讀音。car 的 ar 和這三個字的母音不同。',
    ref: 'Unit 2 Phonics Sound It Out（課本 p.40）' });

q('L06-Q3', '發音：拼讀規則',
  '哪一個字的母音和 party 第一個音節的母音相同？', null,
  'farm',
  [['form', '拼字組合混淆', '只看到 f 和 rm 一樣，沒分辨 ar 和 or'],
   ['cord', '拼字組合混淆', '知道母音後面有 r，就把 or 的讀音當成 ar'],
   ['born', '拼字組合混淆', '把這課另一組帶 r 的母音套在 party 上']],
  ['先回想 party 第一個音節怎麼念。',
   '在第一個音節裡，母音和後面的 r 要合在一起比較。',
   '看 party 的 r 前面是哪個字母，再去選項裡找相同的組合。'],
  { concept: 'party 的第一個音節和 farm 都用 ar 拼這個母音。form、cord、born 用的是 or。',
    ref: 'Unit 2 Phonics Sound It Out、Listen, Point, and Say（課本 pp.40–41）' });

q('L06-Q4', '聽力：聽音選字',
  '請聽英文，選出你聽到的單字。', listen('pork', 0.8),
  'pork',
  [['cord', '音近字', '中間的母音一樣，卻沒有比對首尾的子音'],
   ['farm', '母音混淆', '聽出有 r 的音就作答，沒辨認 r 前的母音'],
   ['born', '音近字', '只聽到相同的母音，把開頭和結尾配給另一個帶 or 的字']],
  ['先重聽中間的母音，再聽開頭和結尾。',
   '比較母音是接近 car 裡的母音，還是 horse 裡的母音。',
   '再重聽母音後面，找出用 k 的音收尾的選項。'],
  { concept: '念的是 pork。它的母音和 horse 相同，結尾是 k 的音。cord 結尾是 d 的音，born 結尾是 n 的音。',
    ref: 'Unit 2 Phonics Sound It Out（課本 p.40）、Phonics（課本 p.41）' });

const phoneCall = passage(
  "I'm Ruby. I'm in Taiwan. My friend Ivan is in the UK. We like to draw pictures of animals. I'm drawing a whale for him today. I have a fever, so I stay at home. Ivan has a cold. He's at home, too. We talk on the phone. I tell him about my picture."
);

q('L06-Q5', '閱讀：短文擷取',
  '依上面的短文回答：What does Ruby have?', phoneCall,
  'She has a fever.',
  [['She has a cold.', '資訊錯置', '把 Ivan 的症狀當成 Ruby 的症狀'],
   ['She has a headache.', '文意推論過度', '看到 Ruby 不舒服，就自行猜她頭痛'],
   ['She has a sore throat.', '文意推論過度', '看到文中有人感冒，就自行加上喉嚨痛，也弄錯了人']],
  ['先找出短文是誰在說話。',
   '分辨說話的人在哪一句說自己，在哪一句說朋友。',
   '找出 I have 開頭的句子，看看後面接的是哪個症狀。'],
  { concept: '開頭介紹說話的人是 Ruby。她用 I have a fever, so I stay at home. 說自己發燒，所以待在家裡。',
    ref: 'Unit 2 Reading（課本 pp.37–39）、Sentence A（課本 p.34）' });

q('L06-Q6', '閱讀技巧：疑問詞（Question Words）',
  '依上面的短文，哪個問題可以用「In the UK.」來回答？', phoneCall,
  'Where is Ivan?',
  [['Where is Ruby?', '資訊錯置', '看出 Where 問地點，但把 Ruby 和 Ivan 所在的地方對調'],
   ['Who has a cold?', '疑問詞混淆', '把問哪個人有感冒的問句當成問地點'],
   ['What does Ivan have?', '疑問詞混淆', '只看到 Ivan 就選了，沒注意 What does Ivan have? 在問症狀']],
  ['先看題目給的回答是人、地點，還是症狀。',
   '找出問這一類資訊的疑問詞。',
   '短文提到兩個人各在不同的地方。把問句中的人名對回短文。'],
  { concept: 'In the UK. 指一個地點，要用 Where 問。短文說在英國的是 Ivan，所以要問 Where is Ivan?。',
    ref: 'Reading Skills：Question Words（課本 p.10）、Unit 2 Reading（課本 pp.37–39）' });

q('L06-Q7', '故事理解',
  'Unit 2 的故事裡，有人問 Boka 是不是肚子痛。Boka 怎麼回答？', null,
  '他只是肚子餓。',
  [['他真的肚子痛。', '故事情節記錯', '把別人的猜測當成 Boka 的回答'],
   ['他覺得頭在痛。', '故事人物混淆', '把 Joe 說的頭痛記成 Boka 的情況'],
   ['他說他在發燒。', '故事人物混淆', '把 Joe 說的發燒記成 Boka 的情況']],
  ['回想故事最後幾格，先分清楚誰被問到。',
   '有人猜 Boka 是不是肚子痛。他開口時是同意還是先否定？',
   '他否定後說了自己的情況。想想他那句話跟吃東西有什麼關係。'],
  { concept: "Boka 回答 No, I'm just hungry.，意思是他只是肚子餓。頭痛和發燒都是 Joe 說的症狀。",
    ref: 'Unit 2 Story（課本 p.31）' });

save();
