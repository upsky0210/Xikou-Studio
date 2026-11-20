// 康軒 Wonder World 7 Unit 3 From Farm to Table（課本 pp.47–59）。
import { buildUnit, listen, SAY, passage, table } from './build-unit.mjs';

const { q, save } = buildUnit('U3');

// en5-08 字彙與聽力
q('L08-Q1', '聽力：聽音選字',
  '請聽英文，選出你聽到的食物。', listen('soup', 0.8), 'soup',
  [['steak', '音近字', '聽到 s 的音就選了，沒比對後面的母音和字尾'],
   ['rice', '中文意思混淆', '把同一餐常一起出現的米飯和湯記混了'],
   ['noodles', '中文意思混淆', '看到麵條常放在湯裡，就把兩個詞當成同一種食物']],
  ['先聽這個字有幾個音節。', '注意開頭的聲音，再比對每個選項的結尾。', '字尾是嘴唇先合起來再放開的 p 音。'],
  { concept: '念的是 soup（湯）。它以 s 的音開頭，以 p 的音收尾。', ref: 'Unit 3 Vocabulary（課本 p.50）' });

q('L08-Q2', '聽力：聽音選字',
  '請聽英文，選出你聽到的食物。', listen('dumplings', 0.8), 'dumplings',
  [['noodles', '音近字', '只依兩個音節的節奏作答，沒有聽清楚開頭'],
   ['sandwiches', '中文意思混淆', '把兩種可以一個一個數的食物混在一起'],
   ['French fries', '中文意思混淆', '把兩個課本裡常用複數說的食物名稱記混了']],
  ['先聽這是一個字，還是兩個字組成的詞。', '幾個選項的節奏相近，試著重聽第一個音節。', '開頭是 d 的音，第二個音節裡聽得到 l 的音。'],
  { concept: '念的是 dumplings（水餃）。dumplings 有兩個音節，第一個音節從 d 的音開始。', ref: 'Unit 3 Vocabulary（課本 p.51）' });

q('L08-Q3', '聽力：聽音選意思',
  '請聽英文，選出最符合的中文意思。', listen('steak', 0.8), '牛排',
  [['披薩', '中文意思混淆', '記得是菜單上的主餐，但把兩種食物的英文混在一起'],
   ['米飯', '中文意思混淆', '把常和主餐搭配的米飯當成聽到的那一項'],
   ['湯', '音近字', '只聽到開頭的 s，就以為是 soup']],
  ['重聽開頭，判斷第一個子音後面有沒有再接一個子音。', '接著比對母音，是像 day 的母音，還是像 too 的母音。', '這個字有 k 的尾音，想想菜單上哪道主餐的英文符合。'],
  { concept: '念的是 steak（牛排），開頭有 st 的音，中間的母音和 day 一樣，字尾是 k 的音。', ref: 'Unit 3 Vocabulary（課本 p.50）' });

q('L08-Q4', '字彙：看中文選英文',
  '菜單上哪個英文詞表示「薯條」？', null, 'French fries',
  [['sandwiches', '中文意思混淆', '把同一餐常出現的三明治和薯條混淆'],
   ['dumplings', '中文意思混淆', '只記得是複數形式，把水餃和薯條的英文記反了'],
   ['noodles', '中文意思混淆', '把外形細長的麵條和薯條混在一起']],
  ['先想想薯條是用什麼食材做的。', '這項食物的英文名稱由兩個字組成。', '看看兩個字的選項中，哪一個第二個字和油炸有關。'],
  { concept: '薯條是 French fries。故事中也提到可以用馬鈴薯做薯條。', ref: 'Unit 3 Story（課本 p.47）、Vocabulary（課本 p.51）' });

q('L08-Q5', '字彙：依需求選食物',
  '食物袋裡要放米飯和湯。哪張標籤符合？', null, 'rice and soup',
  [['rice and steak', '中文意思混淆', '找對米飯，但把湯換成了牛排'],
   ['pizza and soup', '中文意思混淆', '找對湯，但把米飯換成了披薩'],
   ['rice and noodles', '中文意思混淆', '把麵條當成要裝的湯，忽略兩者是不同食物']],
  ['先圈出題目要的兩樣食物。', '每個選項用 and 連起兩樣食物，分開看。', '含有米飯的選項有好幾張，再核對後面那樣是不是湯。'],
  { concept: 'rice 是米飯，soup 是湯；標籤要同時有這兩樣食物。', ref: 'Unit 3 Vocabulary（課本 pp.50–51）' });

q('L08-Q6', '聽力：聽句子選意思',
  '請聽英文句子，選出符合內容的中文。', listen("I'd like some pizza and noodles, please.", 0.9),
  '我想要一些披薩和麵條。',
  [['我想要一些披薩和水餃。', '中文意思混淆', '第一樣聽對，卻把第二樣食物記成水餃'],
   ['我想要一些三明治和麵條。', '中文意思混淆', '第二樣聽對，卻把第一樣食物記成三明治'],
   ['我想要一些牛排和米飯。', '資訊錯置', '只聽懂是在點餐，就用自己熟悉的餐點猜測']],
  ['先聽說話的人想要幾樣食物。', '可以在連接兩樣食物的地方停一下，分別聽兩邊。', '聽聽哪個詞在後面，它指的是長條狀的食物。'],
  { concept: '說話的人用 I\'d like …, please. 點餐，and 前的 pizza 是披薩，後面的 noodles 是麵條。', ref: 'Unit 3 Vocabulary（課本 pp.50–51）、Sentence A（課本 p.52）' });

q('L08-Q7', '聽力：聽短對話',
  '請聽對話，選出客人真正點的餐點。',
  listen("Alma: Would you like some soup, Luke? Luke: No, thank you. I'd like some rice and steak. Alma: Here you are.", 0.9),
  '米飯和牛排。',
  [['米飯和一碗湯。', '對話資訊錯置', '把被拒絕的湯和點到的米飯拼在一起'],
   ['牛排和一碗湯。', '對話資訊錯置', '聽到牛排就停了，沒有確認湯已被拒絕'],
   ['披薩和牛排。', '中文意思混淆', '聽對牛排，但把 rice 記成披薩']],
  ['先聽誰在推薦、誰在點餐。', '聽客人怎麼回答第一個問句，再聽他接下來說的內容。', '客人另點了兩樣，找他表示自己想要的那一句。'],
  { concept: 'Luke 先婉拒了湯，接著點 rice 和 steak，也就是米飯和牛排。', ref: 'Unit 3 Sentence A／B（課本 pp.52–53）' });

// en5-09 句型與文法
q('L09-Q1', '文法：would 後的動詞',
  '選出正確的答案填入空格：「I would ____ some rice, please.」', null, 'like',
  [['likes', '第三人稱混淆', '把一般現在式常看到的 s 加在 would 後面的動詞上'],
   ['liked', '動詞形式混淆', '把 would 後面的動詞寫成了過去式'],
   ['liking', '動詞形式混淆', '把表示正在進行的動詞形式用在 would 後面']],
  ['先看空格前面是哪一個字。', '把這句和課本點餐時的 I\'d 開頭相比。', 'I\'d 在這裡是 I would 的縮寫，想想後面的動詞需要變化嗎？'],
  { concept: 'I\'d 是 I would 的縮寫。would 後用 like 的原形，所以填 like。', ref: 'Unit 3 Sentence A（課本 p.52）' });

q('L09-Q2', '句型：選疑問詞',
  '填入正確的疑問詞。\nA: ____ would you like to eat?\nB: I\'d like some noodles, please.', null, 'What',
  [['Where', '疑問詞混淆', '用了問地點的字，但回答說的是餐點'],
   ['When', '疑問詞混淆', '用了問時間的字，但回答沒有時間'],
   ['Who', '疑問詞混淆', '用了問人的字，但回答沒有提到任何人']],
  ['先看 B 回答的是哪一類資訊。', 'B 告訴對方自己想吃的餐點。', '要問餐點是什麼，就挑能問事物的疑問詞。'],
  { concept: 'B 說自己想吃麵條，因此 A 要用 What 問對方想吃什麼。', ref: 'Unit 3 Sentence A（課本 p.52）、Reading Skills（課本 p.10）' });

q('L09-Q3', '句型：問答配對',
  '有人問 Isla：「Would you like some soup?」Isla 想婉拒，可以怎麼回答？', null, 'No, thank you.',
  [['Yes, please.', '簡答不一致', '這是在禮貌接受對方提供的湯'],
   ['Yes, thank you.', '簡答不一致', '只注意到 thank you，忽略 Yes 表示接受'],
   ['I\'d like some, please.', '句型混淆', '用了禮貌點餐的句子，表達的是想要喝湯']],
  ['先確認 Isla 想接受還是婉拒。', '留意每句開頭是在接受或拒絕，也看看完整句子的意思。', '婉拒之後仍可以謝謝對方，檢查開頭和後半是否都符合。'],
  { concept: 'No 表示婉拒，thank you 向對方道謝，所以 No, thank you. 符合 Isla 的意思。', ref: 'Unit 3 Sentence B（課本 p.53）' });

q('L09-Q4', '文法：選出正確的句子',
  '下面哪個英文問句寫得完全正確？', null, 'Would you like some steak?',
  [['Would you like eat some steak?', '句型混淆', '在 like 後接 eat 時，漏掉了 to'],
   ['What you would like to eat?', '句型混淆', '把問句的 would 放在 you 後面，沿用了直述句的順序'],
   ['Would you like some a steak?', '可數與不可數混淆', '把 some 和 a 疊在同一個食物名稱之前']],
  ['分別看每句的問句開頭和後面接的字。', '問對方時，would 放在 you 前面。', '再看 like 後面，直接接食物就可以表達想不想吃。'],
  { concept: 'Would you like some steak? 用 Would you like 開頭，後面直接接 some steak。', ref: 'Unit 3 Sentence A／B（課本 pp.52–53）、Grammar Tips（課本 p.54）' });

q('L09-Q5', '文法：some 後的可數名詞',
  'Molly 說她想吃幾個三明治。選出正確的答案填入空格：「I\'d like some ____, please.」', null, 'sandwiches',
  [['sandwich', '可數與不可數混淆', '用單數來表示題目中的幾個三明治'],
   ['a sandwich', '可數與不可數混淆', '用了表示一個的 a，還和空格前的 some 重疊'],
   ['sandwichs', '複數字尾混淆', '知道要改複數，但在 ch 後只加了 s']],
  ['先看 Molly 想吃一個還是幾個。', '課本用 some 加可數名詞的複數表示有幾個。', '這個食物名稱以 ch 結尾，再想想要加 s 還是 es。'],
  { concept: '三明治可以一個一個數。sandwich 的複數是 sandwiches，所以用 some sandwiches。', ref: 'Unit 3 Vocabulary（課本 p.51）、Grammar Tips（課本 p.54）' });

q('L09-Q6', '聽力：聽問句選回答',
  '請聽英文問句，選出最合適的回答。', listen('What would you like to eat, Iris?', 0.9),
  'I\'d like some dumplings, please.',
  [['Yes, I\'d like to eat, thank you.', '疑問詞混淆', '只表示想吃東西，沒有回答想吃什麼'],
   ['Would you like some dumplings?', '句型混淆', '反過來問別人要不要吃，沒有說自己想吃什麼'],
   ['She\'d like some dumplings, please.', '人稱代名詞混淆', 'Iris 被直接問到，回答自己想吃的東西時要用 I']],
  ['先聽這個問句是直接問人，還是在談不在場的人。', '聽問句開頭，判斷要選餐點，還是只回答要或不要。', '直接被問到的人用自己的角度回答，並說出想吃的餐點。'],
  { concept: '問句直接問 Iris 想吃什麼。Iris 要用 I\'d like 加上食物回答。', ref: 'Unit 3 Sentence A（課本 p.52）' });

q('L09-Q7', '情境應用：依表格問答',
  '依上表，問選項開頭的那位同學時，哪一組問答符合他的選擇？',
  table(['姓名', '想吃', '不想吃'], [['Mira', 'noodles', 'soup'], ['Hugo', 'rice', 'pizza']], '兩位同學的選擇'),
  'Mira：Would you like some soup? — No, thank you.',
  [['Mira：Would you like some noodles? — No, thank you.', '簡答不一致', 'Mira 想吃麵條，回答應該是接受'],
   ['Hugo：Would you like some rice? — No, thank you.', '簡答不一致', 'Hugo 想吃米飯，卻被寫成婉拒'],
   ['Hugo：Would you like some pizza? — Yes, please.', '資訊錯置', '把 Hugo 不想吃的食物當成想吃的']],
  ['先對照各選項指定要問的同學。', '在同一列找問句中的食物，確認在哪一欄。', '想吃就接受，不想吃就婉拒；再核對選項兩句有沒有配對。'],
  { concept: 'Mira 不想吃的是湯，所以問她要不要湯時，回答 No, thank you.。每個選項前的人名標示被問的人。', ref: 'Unit 3 Sentence B（課本 p.53）' });

// en5-10 發音與閱讀
q('L10-Q1', '聽力：聽音辨字母組合',
  '請聽英文單字，選出這個字的拼法裡有哪一組字母。', listen('noise', 0.8), 'oi',
  [['ai', '母音混淆', '把滑動的母音聽成 sail 裡的母音'],
   ['ar', '母音混淆', '套用了前一單元 car 的母音'],
   ['ee', '母音混淆', '只注意母音末端，誤以為整段都像長音 e']],
  ['先聽這個字中間的母音。', '它的聲音會滑動，和 sail 的母音比一比。', '回想土壤那個拼讀字，兩個字的母音相同，也用同一組字母。'],
  { concept: '念的是 noise。它和 soil 的母音相同，都是用 oi 來拼。', ref: 'Unit 3 Phonics Sound It Out（課本 p.58）' });

q('L10-Q2', '發音：選出母音念法不同的字',
  '哪一個字的母音念法和其他三個不同？可以點喇叭聽。', SAY, 'corn',
  [['soil', '拼字組合混淆', 'soil 拼 oi、boy 和 toy 拼 oy，看到拼法不同就以為念法不同'],
   ['boy', '母音混淆', '把開頭的 b 當成判斷依據，沒比較母音'],
   ['toy', '母音混淆', '只注意開頭的 t 和別的字不一樣，沒比較母音']],
  ['把四個字各聽一次。', '先不管開頭的子音，只聽後面的母音；oi 和 oy 的念法一樣。', '有三個字的母音和「玩具」那個英文字相同，找出剩下的字。'],
  { concept: 'soil 的 oi 和 boy、toy 的 oy 念法一樣；corn 的 or 是 Unit 2 學的另一個母音，和其他三個不同。', ref: 'Unit 3 Phonics（課本 pp.58–59）、Unit 2 Phonics（課本 pp.40–41）' });

q('L10-Q3', '發音：拼讀規則',
  '哪一個字的母音和 boy 的母音相同？', null, 'soil',
  [['sail', '拼字組合混淆', '只看到 s 和 l 相同，就把 ai 和 oi 的母音混在一起'],
   ['corn', '母音混淆', '看到中間有 o，就以為和 boy 相同，忽略了後面的 r'],
   ['paint', '拼字組合混淆', '把 ai 的念法當成 boy 裡 oy 的念法']],
  ['先念一下 boy，再念選項。', '找選項中用來表示母音的字母組合。', '回想本課教了兩種拼法來表示 boy 的母音，比比哪個選項用了另一種。'],
  { concept: 'soil 用 oi，boy 用 oy，這兩組在本課例字裡念法相同。', ref: 'Unit 3 Phonics（課本 pp.58–59）' });

q('L10-Q4', '聽力：聽音選字',
  '請聽英文，選出你聽到的單字。', listen('coin', 0.8), 'coin',
  [['point', '音近字', '聽出相同的母音，卻沒有辨認開頭及結尾的子音'],
   ['soil', '音近字', '聽出 oi，就選了另一個帶同組母音的字'],
   ['toy', '漏聽字尾', '母音相同，但聽漏了最後的子音']],
  ['先聽母音在哪裡，再把注意力放到它前後。', '這幾個字的母音相同，要靠開頭和結尾分辨。', '再重聽結尾，辨認是 n 單獨收尾，還是另有一個子音。'],
  { concept: '念的是 coin。開頭是 k 的音，結尾是 n 的音。point 還有 t 的尾音；soil 用 l 收尾，toy 沒有子音收尾。', ref: 'Unit 3 Phonics（課本 pp.58–59）' });

const fruitBowl = passage(
  'Ava and her sister want to make a fruit bowl. First, they wash the apples and grapes. Next, Ava cuts the apples. Then, her sister puts the apples and grapes in a big bowl. Finally, they put the bowl on the table. Their friends are ready to eat. The fruit looks good!'
);

q('L10-Q5', '閱讀：短文擷取',
  '依上面的短文，Ava 切的是哪種水果？', fruitBowl, '她切的是蘋果。',
  [['她切的是葡萄。', '資訊錯置', '兩種水果都洗了，誤以為葡萄是後來切的那種'],
   ['她切的是香蕉。', '文意推論過度', '依照自己做水果碗的習慣猜了文中沒提的水果'],
   ['她切的是番茄。', '資訊錯置', '把課本比薩短文的食材帶入了這篇文章']],
  ['先找 Ava 的名字。', '兩人一起洗水果，但有一個動作是 Ava 自己做的。', '找出表示切的動詞，讀出它後面那種水果。'],
  { concept: 'Next, Ava cuts the apples. 表示 Ava 切了蘋果。葡萄也洗過，但文中沒有說她切了葡萄。', ref: 'Unit 3 Reading（課本 pp.55–57）' });

q('L10-Q6', '閱讀技巧：排序（Sequence）',
  '依上面的短文，水果放入碗裡之後，緊接著的下一個步驟是什麼？', fruitBowl, '她們把碗放到桌上。',
  [['她們一起洗兩種水果。', '順序錯置', '跳回 First，選了第一個步驟'],
   ['Ava 把蘋果切好。', '順序錯置', '看見 Next 就選了，其實那是裝碗前的動作'],
   ['Ava 的姊妹把水果裝進碗。', '順序錯置', '選到題目指定的步驟本身']],
  ['找出 First、Next 和 Then，順著看每一步。', '先定位「水果放入碗裡」是哪一步。', '接著往後看，找出 Finally 標示的最後一個步驟。'],
  { concept: 'Then 標示把水果放入碗中。接著 Finally 標示最後一個步驟：兩人把碗放上桌。', ref: 'Reading Skills：Sequence（課本 p.11）、Unit 3 Reading（課本 pp.55–57）' });

q('L10-Q7', '故事理解',
  'Unit 3 故事一開始在農場時，有人說可以用馬鈴薯做成哪樣食物？', null, '可以做成薯條。',
  [['可以做成披薩。', '故事情節記錯', '披薩是另一個人接著說想做的食物'],
   ['可以做成三明治。', '故事情節記錯', '三明治有出現在準備餐點時，但不是這句用馬鈴薯做的食物'],
   ['可以做成牛排。', '故事字詞混淆', '把本單元字彙表的另一種餐點當成農場裡說到的食物']],
  ['回想剛到農場時，大家說到了哪些食材。', '找出有提到馬鈴薯的那一格。', '說話的人先說喜歡馬鈴薯，下一句才說能把它做成什麼。'],
  { concept: '故事在農場提到有人喜歡馬鈴薯，並說可以做成薯條。披薩和三明治在後面才提到。', ref: 'Unit 3 Story（課本 pp.47–48）' });

save();
