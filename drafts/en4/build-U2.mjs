// 四上英語（康軒 Wonder World 5）Unit 2 Let's Make Fruit Salad 的題目產生器：寫出 drafts/en4/en4-questions-U2.json。
// 題目改這支再重跑：node drafts/en4/build-U2.mjs
// 三關：en4-04 字彙與聽力、en4-05 句型與文法、en4-06 發音與閱讀。頁碼是課本印的頁碼。
//   Story pp.31–33、Vocabulary pp.34–35、Sentence A p.36、Sentence B p.37、Learn with Boka p.38、Grammar Tips p.39、
//   Reading pp.40–41（Visualize）、Phonics pp.42–43；More to Learn（p.44，Optional）不出題。
import { buildUnit, listen, SAY, passage, table } from './build-unit.mjs';

const { q, save } = buildUnit('U2');

// ───────── en4-04 字彙與聽力（Vocabulary pp.34–35、Story pp.31–33）─────────
q('L04-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的水果。', listen('guavas', 0.8),
  'guavas',
  [['grapes', '音近字', '開頭都是 g 的音，只聽開頭就作答'],
   ['papayas', '音近字', '結尾的音很像，只聽後半就作答'],
   ['bananas', '音近字', '結尾都是複數的 z 音，沒有比對開頭']],
  ['先聽開頭的音，是 g、p 還是 b？', '開頭是 g 的有兩個選項，再聽這個字有幾個音節。', '這個字有兩個音節，不是一個音節。'],
  { concept: '念的是 guavas（芭樂）。guavas 和 grapes 開頭都是 g，但 guavas 有兩個音節，grapes 只有一個。',
    ref: 'Unit 2 Vocabulary（課本 p.34）' });

q('L04-Q2', '聽力：聽音選意思',
  '請聽英文，選出意思正確的中文。', listen('pineapples', 0.8),
  '鳳梨',
  [['蘋果', '音近字', '聽到後半的 apples，就選了蘋果'],
   ['木瓜', '音近字', '只記得是有好幾個音節的水果，沒聽清楚開頭'],
   ['葡萄', '音近字', 'grapes 和 pineapples 結尾的音很像，只聽結尾就作答']],
  ['先聽這個字有幾個音節。', '這個字的後半和 apples 一樣，前面還多了一段。', '前面多了 pine 這一段，所以它不是蘋果，是課本上另一種比較大的水果。'],
  { concept: '念的是 pineapples（鳳梨）。它的後半是 apples，但整個字是鳳梨，不是蘋果。',
    ref: 'Unit 2 Vocabulary（課本 p.34）' });

q('L04-Q3', '字彙：看中文選英文',
  '「木瓜」的英文是哪一個？', null,
  'papayas',
  [['guavas', '中文意思混淆', 'guavas 和 papayas 結尾都是 -as，把芭樂和木瓜記混了'],
   ['bananas', '中文意思混淆', '香蕉和木瓜都是黃色的水果，只看顏色就作答'],
   ['pineapples', '中文意思混淆', '鳳梨和木瓜都是 p 開頭，只看第一個字母就作答']],
  ['先想想木瓜的英文開頭是什麼字母。', 'p 開頭的選項有兩個，再看哪一個字裡有 apples。', '木瓜的英文裡沒有 apples，結尾是 -ayas。'],
  { concept: '木瓜是 papayas；guavas 是芭樂、bananas 是香蕉、pineapples 是鳳梨。',
    ref: 'Unit 2 Vocabulary（課本 p.34）' });

q('L04-Q4', '字彙：水果的拼法',
  '「香蕉（複數）」的英文，哪一個拼對了？', null,
  'bananas',
  [['banannas', '拼字錯誤', '中間多寫了一個 n'],
   ['bananaes', '拼字錯誤', '以為複數要加 es'],
   ['bananes', '拼字錯誤', '把最後的 a 拿掉再加 es']],
  ['先拼出一根香蕉 banana。', '數一數 banana 裡有幾個 n。', '複數只要在 banana 後面加一個字母。'],
  { concept: '一根香蕉是 banana（b-a-n-a-n-a），兩個 n；複數直接加 s：bananas。',
    ref: 'Unit 2 Vocabulary（課本 p.34）' });

q('L04-Q5', '故事：需要多少',
  '在 Unit 2 的故事裡，做水果沙拉需要幾個柳橙？', null,
  'six',
  [['five', '故事細節混淆', '只記得是五、六、七其中一個，沒有回想 Kevin 的回答'],
   ['seven', '故事細節混淆', '把 Sentence B 的 seven oranges 和故事記混了'],
   ['two', '故事細節混淆', '把材料單上的 2 apples 當成柳橙的數量']],
  ['回想故事裡的材料單 What you need。', '材料單上寫了柳橙和蘋果各要幾個。', 'Kevin 回答 We need … oranges. 的數字，比五多一。'],
  { concept: '故事裡問 How many oranges do we need?，回答 We need six oranges.，要六個柳橙。',
    ref: 'Unit 2 Story（課本 p.32）' });

q('L04-Q6', '聽力：聽句子選意思',
  '請聽英文，選出意思正確的中文。', listen('I need four bananas and two papayas.', 0.9),
  '我需要四根香蕉和兩個木瓜。',
  [['我需要四根香蕉和兩個芭樂。', '音近字', '把 papayas 聽成也是 -as 結尾的 guavas'],
   ['我需要兩根香蕉和四個木瓜。', '數字錯置', '兩樣水果都聽對了，但數字配反了'],
   ['你需要四根香蕉和兩個木瓜嗎？', '句型混淆', '水果和數字都聽對了，卻把說自己聽成問別人']],
  ['先聽句子開頭，是 I need 還是問句。', '再聽 and 前面的數字和水果。', '最後聽 and 後面的數字和水果，水果是 p 開頭。'],
  { concept: 'I need four bananas and two papayas. 是「我需要四根香蕉和兩個木瓜」。',
    ref: 'Unit 2 Vocabulary（課本 p.34）、Sentence A（課本 p.36）' });

q('L04-Q7', '聽力：聽短對話',
  '請聽對話，選出正確的說法。',
  listen("Mom: How many apples do you need, Ken? Ken: I need three apples. Mom: How about grapes? Ken: I don't need grapes. I need two oranges.", 0.9),
  'Ken 需要三個蘋果和兩個柳橙。',
  [['Ken 需要三個蘋果和兩串葡萄。', '對話資訊錯置', '聽到媽媽問 grapes，沒聽到 Ken 說 don\'t need'],
   ['Ken 需要兩個蘋果和三個柳橙。', '數字錯置', '兩樣水果都聽對了，但數字配反了'],
   ['Ken 需要三個柳橙，不需要蘋果。', '對話資訊錯置', '把蘋果的數字配給了柳橙']],
  ['先聽媽媽第一次問 Ken 什麼。', '媽媽又問了葡萄，Ken 的回答裡有 don\'t。', '最後一句 Ken 說他還需要什麼、需要幾個。'],
  { concept: 'Ken 需要三個蘋果（three apples），不需要葡萄，還需要兩個柳橙（two oranges）。',
    ref: 'Unit 2 Sentence A（課本 p.36）' });

// ───────── en4-05 句型與文法（Sentence A p.36、Sentence B p.37、Learn with Boka p.38、Grammar Tips p.39）─────────
q('L05-Q1', '文法：how many 後面用複數',
  '選出正確的字填入空格：「How many ____ do you need?」', null,
  'grapes',
  [['grape', '單複數混淆', '忘了 how many 後面的名詞要用複數'],
   ['a grape', '單複數混淆', '在 how many 後面加了 a，還用了單數'],
   ['grapees', '拼字錯誤', '知道要用複數，但多寫了 e']],
  ['how many 是在問「幾個」。', '問幾個的時候，後面的東西要用一個還是很多個的寫法？', '回想 Learn with Boka：how many 後面的名詞用什麼形式。'],
  { concept: 'how many 用來問數量，後面的名詞用複數：How many grapes do you need?',
    ref: 'Unit 2 Learn with Boka（課本 p.38）' });

q('L05-Q2', '句型：do 或 does',
  '選出正確的字填入空格：「How many oranges ____ Amy need?」', null,
  'does',
  [['do', '助動詞混淆', '把 How many … do you need? 的 do 用在人名前面'],
   ['is', 'be 動詞混淆', '用了 be 動詞，沒注意句子已經有動詞 need'],
   ['are', 'be 動詞混淆', '看到 oranges 是複數就用 are，沒注意句子已經有動詞 need']],
  ['先看空格後面是誰。', 'Amy 是一個人，可以用 she 代替。', '回想 Sentence B：問 he、she 需要幾個時，用哪一個字？'],
  { concept: 'Amy 是 she，要用 does：How many oranges does Amy need?',
    ref: 'Unit 2 Sentence B（課本 p.37）' });

q('L05-Q3', '文法：need 或 needs',
  '選出正確的字填入空格：「She ____ seven oranges.」', null,
  'needs',
  [['need', '第三人稱混淆', '忘了 she 後面的 need 要加 s'],
   ['needing', '動詞形式混淆', '把 need 加了 ing，但這句沒有 is'],
   ['is need', '動詞形式混淆', '在 need 前面多加了 is']],
  ['先看主詞是誰。', '主詞是 she，說她需要什麼時，need 要不要變？', '回想 Grammar Tips 表格裡 He／She 後面的寫法。'],
  { concept: 'he、she 後面的 need 要加 s：She needs seven oranges.',
    ref: 'Unit 2 Sentence B（課本 p.37）、Grammar Tips（課本 p.39）' });

q('L05-Q4', '句型：回答需要幾個',
  '「How many apples do you need?」要怎麼回答？', null,
  'I need two apples.',
  [['I need two apple.', '單複數混淆', '兩個以上的東西忘了加 s'],
   ['I needs two apples.', '第三人稱混淆', '把 he、she 才用的 needs 用在 I 後面'],
   ['Yes, I do.', '句型混淆', '別人問的是幾個，卻只回答 Yes']],
  ['別人問的是「幾個」，回答要說出數字。', '說自己需要，用 I need。', '最後檢查兩個以上的蘋果要怎麼寫。'],
  { concept: '問 How many … do you need? 要說出數量：I need two apples. I 後面用 need，兩個以上用複數 apples。',
    ref: 'Unit 2 Sentence A（課本 p.36）' });

q('L05-Q5', '文法：選出正確的句子',
  '下面哪一句英文是正確的？', null,
  'How many papayas do they need?',
  [['How many papaya do they need?', '單複數混淆', 'how many 後面用了單數'],
   ['How many papayas does they need?', '助動詞混淆', 'they 是很多人，卻用了 does'],
   ['How many papayas do they needs?', '動詞形式混淆', 'do 後面的 need 多加了 s']],
  ['先看 how many 後面的水果是不是複數。', '再看 they 要配 do 還是 does。', '最後看 do 後面的動詞有沒有多加 s。'],
  { concept: 'how many 後面用複數 papayas；they 配 do；do 後面用原形 need：How many papayas do they need?',
    ref: 'Unit 2 Sentence A（課本 p.36）、Learn with Boka（課本 p.38）' });

q('L05-Q6', '句型：看購物清單回答',
  '依購物清單回答：「How many pineapples does Dad need?」', table(['誰要買', '水果', '數量'], [['Mom', 'guavas', '3'], ['Dad', 'pineapples', '2']], '購物清單'),
  'He needs two pineapples.',
  [['He needs three pineapples.', '表格讀錯', '把媽媽要買的數量看成爸爸的'],
   ['She needs two pineapples.', '人稱混淆', '數字對了，但爸爸要用 he'],
   ['He need two pineapples.', '第三人稱混淆', 'he 後面的 need 忘了加 s']],
  ['先在清單找到 Dad 那一列。', '看 Dad 要買的水果有幾個。', '說爸爸時要用 he，再檢查 need 的寫法。'],
  { concept: '清單上 Dad 要買 2 個鳳梨。爸爸用 he，he 後面用 needs：He needs two pineapples.',
    ref: 'Unit 2 Sentence B（課本 p.37）' });

q('L05-Q7', '句型：依情境提問',
  '你想直接問 Ben 他需要幾根香蕉，要怎麼問？', null,
  'How many bananas do you need?',
  [['How many bananas does he need?', '人稱混淆', '直接問 Ben 本人要說 you，he 是跟別人說 Ben 的時候才用'],
   ['How many banana do you need?', '單複數混淆', 'how many 後面用了單數'],
   ['How many bananas does you need?', '助動詞混淆', 'you 前面用了 does']],
  ['你是直接問 Ben，要叫他 you 還是 he？', '再看 how many 後面的香蕉要怎麼寫。', '最後選 you 要配 do 還是 does。'],
  { concept: '直接問對方用 you，you 配 do，how many 後面用複數：How many bananas do you need?',
    ref: 'Unit 2 Sentence A（課本 p.36）' });

// ───────── en4-06 發音與閱讀（Phonics pp.42–43、Reading pp.40–41）─────────
q('L06-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的字。可以按喇叭聽每個選項。', { ...listen('pie', 0.8), ...SAY },
  'pie',
  [['tea', '母音混淆', '只聽到是一個很短的字，沒分出母音是長音 i 還是長音 e'],
   ['bit', '長短音混淆', '聽到 i 的音，但沒分出是長音還是短音'],
   ['hay', '母音混淆', '把長音 i 聽成 a_e、ay 的長音 a']],
  ['先聽開頭是 p、t、b 還是 h 的音。', '再聽母音：是長音 i、長音 e，還是長音 a？', '這個字的母音和 kite 一樣。'],
  { concept: '念的是 pie（派）。ie 念長音 i，和 kite、light 的母音一樣。',
    ref: 'Unit 2 Phonics Sound It Out（課本 p.42）、Listen, Point, and Say（課本 p.43）' });

q('L06-Q2', '發音：選出母音念法不同的字',
  '下面四個字，哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。', SAY,
  'bit',
  [['kite', '拼字組合混淆', '看到 i_e 和 ie、igh 的字母不同，就以為念法也不同'],
   ['tie', '拼字組合混淆', '看到 ie 和 i_e、igh 的字母不同，就以為念法也不同'],
   ['night', '拼字組合混淆', '看到 igh 有三個字母，就以為念法不同']],
  ['先聽每個字的母音，不要只看拼法。', 'i_e、ie、igh 這三組字母都念長音 i。', '找一找哪一個字只有一個 i，後面沒有 e，也沒有 gh。'],
  { concept: 'kite 的 i_e、tie 的 ie、night 的 igh 都念長音 i；bit 只有一個 i，念短音，所以不同。',
    ref: 'Unit 2 Phonics Sound It Out（課本 p.42）' });

q('L06-Q3', '發音：長音 i',
  '哪一個字的 i 念長音，和 bite 的母音一樣？可以按喇叭聽每個字。', SAY,
  'time',
  [['bit', '長短音混淆', '和 bite 長得很像，但少了字尾的 e，就念短音'],
   ['sit', '長短音混淆', '看到 i 就選了，沒注意後面沒有不發音的 e'],
   ['hit', '長短音混淆', '看到 i 就選了，沒注意後面沒有不發音的 e']],
  ['先聽每個字的母音是長音還是短音。', '長音 i 可以拼成 i_e、ie 或 igh。', '找字尾有一個不發音的 e 的字。'],
  { concept: 'time 是 i_e 的拼法：字尾的 e 不發音，前面的 i 念長音，和 bite 一樣。bit、sit、hit 的 i 都念短音。',
    ref: 'Unit 2 Phonics Sound It Out（課本 p.42）、Listen and Circle（課本 p.43）' });

const fruitKids = passage(
  "We need three servings of fruit every day. Ray eats two apples every day. Sam eats three bananas every day. Lily eats one banana, one guava, and one orange every day. One apple, one banana, one guava, or one orange is one serving. Close your eyes. Can you see their fruit plates?"
);

q('L06-Q4', '閱讀：想像（Visualize）',
  '依上面的短文，Lily 每天吃幾種水果？', fruitKids,
  '三種',
  [['一種', '細節讀錯', '看到每樣水果都是 one，就以為只有一種'],
   ['兩種', '細節讀錯', '把 Ray 吃的 two apples 當成 Lily 的'],
   ['四種', '細節讀錯', '把 Ray 的蘋果也算進 Lily 的盤子']],
  ['先在短文裡找到 Lily 那一句。', '把 Lily 吃的水果一個一個圈出來。', '想像 Lily 的盤子：香蕉、芭樂、柳橙……一共幾種不同的水果？'],
  { concept: 'Lily 每天吃一根香蕉、一個芭樂、一個柳橙，一共三種水果。',
    ref: 'Unit 2 Reading（課本 pp.40–41）、Reading Skills：Visualize' });

q('L06-Q5', '閱讀：想像（Visualize）',
  '依上面的短文和課本說的（一天要吃三份、要吃不同種類），誰吃水果吃得最聰明（a smart eater）？', fruitKids,
  'Lily',
  [['Ray', '文意推論不足', 'Ray 每天只吃兩個蘋果，只有兩份，也只有一種'],
   ['Sam', '文意推論不足', 'Sam 吃了三份，但都是香蕉，沒有吃不同種類'],
   ['三個人都一樣', '文意推論不足', '只看到三個人都有吃水果，沒有比份量和種類']],
  ['回想課本：一天要吃幾份水果？', '除了份量夠，課本還說要吃不同的什麼？', '想像三個人的盤子，誰的盤子份量夠、顏色也不一樣？'],
  { concept: '課本說一天要吃三份水果，而且要吃不同種類。短文說一個香蕉、芭樂或柳橙就是一份：Lily 吃了三份、三種不同的水果，所以她吃得最聰明。',
    ref: 'Unit 2 Reading（課本 p.41）' });

q('L06-Q6', '閱讀：一份水果有多大',
  '課本說，一份水果（one serving of fruit）大約有多大？', null,
  '一個拳頭那麼大',
  [['一顆鳳梨那麼大', '細節讀錯', '課本說一顆鳳梨比一份還多'],
   ['兩個拳頭那麼大', '細節讀錯', '記得和拳頭有關，但記錯了數量'],
   ['一個手指頭那麼大', '細節讀錯', '以為一份水果只要一點點']],
  ['回想課本問 How big is one serving of fruit?', '課本請大家伸出自己身體的一個部位來比。', '這個部位是把手握起來的樣子。'],
  { concept: '課本說 It\'s about the size of a fist.：一份水果大約是一個拳頭那麼大，一顆蘋果大約就是一份。',
    ref: 'Unit 2 Reading（課本 p.41）' });

q('L06-Q7', '聽力：聽短文找細節',
  '請聽英文，回答：Mike 需要幾個蘋果？',
  listen("Hi, I'm Mike. I like apple pie. I need five apples for my pie. My mom likes pie, too.", 0.9),
  '五個',
  [['九個', '音近字', 'five 和 nine 的母音一樣都是長音 i，沒聽清楚開頭'],
   ['四個', '音近字', 'five 和 four 開頭都是 f，只聽開頭就作答'],
   ['一個', '對話資訊錯置', '把要做的一個派當成蘋果的數量']],
  ['先聽說話的人想做什麼。', '再聽 I need 後面的數字。', '這個數字的開頭是 f，母音和 pie 一樣。'],
  { concept: 'Mike 說 I need five apples for my pie.，他需要五個蘋果。five 的 i_e 念長音 i。',
    ref: 'Unit 2 Sentence A（課本 p.36）、Phonics（課本 p.42）' });

save();
