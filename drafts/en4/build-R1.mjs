// 四上英語（康軒 Wonder World 5）Review 1 的題目產生器：寫出 drafts/en4/en4-questions-R1.json。
// 題目改這支再重跑：node drafts/en4/build-R1.mjs
// 一關：en4-07 綜合複習（Unit 1～2）。課本 Review 1 pp.45–48：Listen and Number、Read and Number（Sequence）、Three in a Row。
import { buildUnit, listen, SAY, passage } from './build-unit.mjs';

const { q, save } = buildUnit('R1');

q('L07-Q1', '字彙：分辨飲料和水果',
  '下面哪一個不是水果？', null,
  'lemonade',
  [['guavas', '字彙分類混淆', '不熟芭樂的英文，就以為它不是水果'],
   ['papayas', '字彙分類混淆', '不熟木瓜的英文，就以為它不是水果'],
   ['grapes', '字彙分類混淆', '把葡萄和用葡萄做的飲料記混了']],
  ['先把每個字翻成中文。', '這四個字裡有三個是 Unit 2 的水果。', '剩下的那一個是 Unit 1 學過、用來喝的。'],
  { concept: 'lemonade 是檸檬水，是 Unit 1 的飲料；guavas（芭樂）、papayas（木瓜）、grapes（葡萄）都是 Unit 2 的水果。',
    ref: 'Unit 1 Vocabulary（課本 p.20）、Unit 2 Vocabulary（課本 p.34）' });

q('L07-Q2', '聽力：聽短對話',
  '請聽對話，選出正確的說法。',
  listen("Tom: Does Lily like soy milk? Ann: Yes, she does. She likes milk, too.", 0.9),
  'Lily 喜歡豆漿，也喜歡牛奶。',
  [['Lily 喜歡豆漿，不喜歡牛奶。', '對話資訊錯置', '沒聽懂句尾 too 是「也」的意思'],
   ['Lily 不喜歡豆漿，她喜歡牛奶。', '對話資訊錯置', '沒聽清楚 Ann 的回答是 Yes'],
   ['Ann 喜歡豆漿和牛奶。', '人稱混淆', '把回答的人 Ann 當成喜歡飲料的人']],
  ['先聽 Tom 問的是誰。', 'Ann 回答 Yes 還是 No？', '最後一句的 too 是「也」，她還喜歡什麼？'],
  { concept: 'Tom 問 Lily 喜不喜歡豆漿，Ann 說 Yes, she does. She likes milk, too.：Lily 喜歡豆漿，也喜歡牛奶。',
    ref: 'Unit 1 Sentence B（課本 p.23）、Review 1 Listen and Number（課本 p.45）' });

q('L07-Q3', '句型：綜合回答',
  '「Does your mom need guavas?」媽媽需要三個芭樂，要怎麼回答？', null,
  'Yes, she does. She needs three guavas.',
  [['Yes, she do. She needs three guavas.', '助動詞混淆', '用 does 問，回答卻用了 do'],
   ['Yes, she does. She need three guavas.', '第三人稱混淆', 'she 後面的 need 忘了加 s'],
   ['Yes, he does. He needs three guavas.', '人稱混淆', '媽媽是女生，要用 she']],
  ['媽媽是女生，要用 he 還是 she？', '用 does 問，簡答也用 does。', '最後檢查 she 後面的 need 要不要加 s。'],
  { concept: '媽媽用 she；用 Does 問就用 she does 回答；she 後面用 needs：Yes, she does. She needs three guavas.',
    ref: 'Unit 1 Sentence B（課本 p.23）、Unit 2 Sentence B（課本 p.37）' });

const shop = passage(
  "Ella goes to a fruit store. First, she asks for papayas, but the store doesn't have papayas. Next, the clerk shows her some guavas. Ella needs four guavas. Then she sees lemonade. She likes lemonade, so she buys one bottle. Finally, she says thank you and goes home."
);

q('L07-Q4', '閱讀：排序（Sequence）',
  '依上面的短文，Ella 到水果店做的第一件事是什麼？', shop,
  '問店裡有沒有木瓜。',
  [['買四個芭樂。', '順序錯置', '芭樂是店員後來才拿給她看的'],
   ['買一瓶檸檬水。', '順序錯置', '買檸檬水是 Then 之後的事'],
   ['說謝謝然後回家。', '順序錯置', '這是 Finally 後面的最後一件事']],
  ['找出短文裡的 First、Next、Then、Finally。', 'First 標示的是第一件事。', '讀 First 後面那一句，她問的是哪一種水果？'],
  { concept: 'First, she asks for papayas：Ella 第一件事是問有沒有木瓜，可是店裡沒有。',
    ref: 'Review 1 Read and Number（課本 pp.46–47）、Reading Skills：Sequence' });

q('L07-Q5', '閱讀：排序（Sequence）',
  '短文提到 Ella 需要四個芭樂（Ella needs four guavas.），下一句說她看到了什麼？', shop,
  '檸檬水',
  [['芭樂', '順序錯置', '這是店員在前一句拿給她看的水果'],
   ['木瓜', '順序錯置', '跳回了 First：她一開始問的是木瓜，但店裡沒有'],
   ['葡萄', '文意推論過度', '短文沒有提到葡萄']],
  ['先找到 Ella needs four guavas. 這一句。', '它的下一句用 Then 開頭。', '讀 Then she sees … 後面是什麼？她喜歡它，所以買了一瓶。'],
  { concept: '順序是：問木瓜 → 店員拿芭樂 → 要四個芭樂 → Then 看到檸檬水買一瓶 → Finally 說謝謝回家。',
    ref: 'Review 1 Read and Number（課本 pp.46–47）、Reading Skills：Sequence' });

q('L07-Q6', '發音：比較母音',
  '哪一個字的母音和 night 的母音相同？可以按喇叭聽每個字。', SAY,
  'pie',
  [['tea', '母音混淆', '把長音 e 和長音 i 聽混了'],
   ['tree', '母音混淆', '看到字裡有長音，就以為和 night 一樣'],
   ['bit', '長短音混淆', '看到有 i 就選了，沒注意 bit 的 i 是短音']],
  ['先念 night，它的 igh 念什麼音？', '把選項分成長音 e、長音 i 和短音。', '長音 i 還可以拼成 i_e 或 ie。'],
  { concept: 'night 的 igh 和 pie 的 ie 都念長音 i；tea、tree 念長音 e，bit 念短音 i。',
    ref: 'Unit 2 Phonics（課本 p.42）、Review 1 Three in a Row（課本 p.48）' });

q('L07-Q7', '聽力：聽句子選意思',
  '請聽英文，選出意思正確的中文。', listen('She needs two pineapples and one bottle of juice.', 0.9),
  '她需要兩個鳳梨和一瓶果汁。',
  [['她需要兩個蘋果和一瓶果汁。', '音近字', '聽到 pineapples 的後半 apples，就以為是蘋果'],
   ['她需要兩個鳳梨和一瓶檸檬水。', '中文意思混淆', '鳳梨聽對了，但把 juice 聽成檸檬水'],
   ['他需要兩個鳳梨和一瓶果汁。', '人稱混淆', '把開頭的 she 聽成 he']],
  ['先聽句子開頭是 He 還是 She。', '再聽 and 前面的水果是哪一個。', '最後聽 one bottle of 後面是什麼飲料。'],
  { concept: 'She needs two pineapples and one bottle of juice. 是「她需要兩個鳳梨和一瓶果汁」。',
    ref: 'Unit 2 Sentence B（課本 p.37）、Review 1 Read and Number（課本 p.46）' });

save();
