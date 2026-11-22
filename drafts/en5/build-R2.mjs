// 康軒 Wonder World 7 Review 2（課本 pp.75–78）。
import { buildUnit, listen, passage } from './build-unit.mjs';

const { q, save } = buildUnit('R2');

q('L14-Q1', '字彙：食物名稱',
  '菜單上哪一項是「麵條」？', null, 'noodles',
  [['French fries', '中文意思混淆', '把兩種細長的食物名稱記反了'],
   ['dumplings', '中文意思混淆', '認出是菜單上的複數食物名稱，卻把麵條認成水餃'],
   ['sandwiches', '中文意思混淆', '把三明治和麵條的英文記混了']],
  ['先想想麵條是哪一類食物。', '把每個選項和課本的食物圖片配對。', '先刪掉油炸的、包餡的和夾麵包的，剩下的就是一碗一碗吃的那一種。'],
  { concept: 'noodles 是麵條；French fries 是薯條、dumplings 是水餃、sandwiches 是三明治。', ref: 'Unit 3 Vocabulary（課本 p.51）、Review 2（課本 p.75）' });

q('L14-Q2', '字彙：依情境選作息',
  'Gwen 說她晚餐後會完成老師布置的功課。選出符合她意思的片語填入空格：「I ____ after dinner.」', null, 'do my homework',
  [['go to bed', '資訊錯置', '想到晚餐過後也會睡覺，卻忽略她說要完成老師布置的事'],
   ['go to school', '中文意思混淆', '把在學校上課和在家完成作業當成同一件事'],
   ['have breakfast', '中文意思混淆', '只依同一單元的作息選了吃早餐，沒有比對活動內容']],
  ['先圈出 Gwen 要做的事。', '有些作息也在晚間，還要看她那時要完成什麼。', '找一個表示「完成自己的作業」的作息片語。'],
  { concept: 'do my homework 是做我的功課。after dinner 說的是她做功課的時間。', ref: 'Unit 4 Vocabulary（課本 p.65）、Review 2（課本 pp.75、77）' });

q('L14-Q3', '句型：詢問想吃什麼',
  '店員想請客人自己說想吃什麼。哪一句問法符合店員的意思？', null, 'What would you like to eat?',
  [['Would you like some noodles?', '句型混淆', '特別問要不要吃麵條，沒有讓客人說出想點的餐點'],
   ['What time do you have dinner?', '疑問詞混淆', '問的是幾點吃晚餐，沒有問要吃什麼'],
   ['What would you like to drink?', '句型混淆', '問的是想喝什麼，沒有問要點什麼食物']],
  ['先看店員要客人說的是食物、飲料，還是時間。', '他想聽客人自己說出餐點，可以用疑問詞提問。', '再讀問句的最後一個動詞，分清楚是要吃還是要喝。'],
  { concept: 'What would you like to eat? 可以讓客人自己說想吃什麼。用 Would you like some noodles? 則是詢問要不要吃指定的食物。', ref: 'Unit 3 Sentence A／B（課本 pp.52–53）、Review 2（課本 p.75）' });

const friday = passage(
  "I'm Adele. On Fridays, I go home at four forty. I put my bag on a chair when I get home. I have dinner at six fifteen. At seven ten, I do my homework. I go to bed at nine. I like to read a book before I go to bed."
);

q('L14-Q4', '句型與閱讀：依序找作息',
  '依上面的短文，哪一句正確說出 Adele 寫功課前，上一項有標明時間的作息和時間？英文也要寫對。', friday, 'She has dinner at six fifteen.',
  [['She have dinner at six fifteen.', '第三人稱混淆', '找對作息和時間，卻忘了 she 後面的 have 要改成 has'],
   ['She has dinner at seven ten.', '時間錯置', '找對上一項作息，卻把寫功課的時間配給晚餐'],
   ['She goes to bed at nine o\'clock.', '順序錯置', '上床時間讀對了，但那是寫完功課以後的作息']],
  ['先在短文裡圈出 Adele 做功課的那一句。', '把短文的時間按先後排列，找出做功課之前最近的時間。', '看那個時間屬於哪一項作息，再選使用第三人稱的句子。'],
  { concept: 'Adele 七點十分寫功課。再往前一項有標明時間的作息是六點十五分吃晚餐，所以選 She has dinner at six fifteen.。', ref: 'Review 2 Sequence（課本 pp.76–77）、Unit 4 Grammar Tips（課本 p.68）' });

q('L14-Q5', '發音：比較母音',
  '哪個字的母音和 clown 的母音相同？', null, 'loud',
  [['soil', '母音混淆', '把 oi 的滑動方向聽成和 clown 裡的母音一樣'],
   ['coin', '拼字組合混淆', '看到有 o，就把 oi 當成 clown 的 ow'],
   ['joy', '拼字組合混淆', '看到字母 o，沒有分辨 oy 和 ow 的讀音']],
  ['先念 clown，留意中間的母音。', '把選項的母音和上一單元的 oi／oy 比一比。', '想想本課哪組字母雖然和 clown 的拼法不同，卻有相同的母音。'],
  { concept: 'loud 的 ou 和 clown 的 ow 在這兩個字裡同音。soil、coin 的 oi 和 joy 的 oy 讀的是另一個母音。', ref: 'Review 2 Play and Say（課本 p.78）、Unit 4 Phonics（課本 pp.72–73）' });

q('L14-Q6', '聽力：聽問句選意思',
  '請聽英文，選出意思最符合的中文。', listen('Would you like some sandwiches and French fries?', 0.9),
  '你想吃一些三明治和薯條嗎？',
  [['你想吃一些三明治和水餃嗎？', '中文意思混淆', '聽對第一項食物，把第二項記成水餃'],
   ['你想吃一些麵條和薯條嗎？', '中文意思混淆', '聽對第二項食物，把第一項記成麵條'],
   ['我想吃一些三明治和薯條。', '句型混淆', '聽對兩樣食物，卻把詢問對方意願聽成自己點餐']],
  ['聽句子開頭，是在問人，還是在說自己的選擇？', '再聽後半提了幾項食物。', '利用連接兩項食物的地方分開聽，核對兩樣食物和問句的用途。'],
  { concept: 'Would you like …? 是問對方要不要。sandwiches 和 French fries 指三明治和薯條。', ref: 'Unit 3 Vocabulary（課本 p.51）、Sentence B（課本 p.53）、Review 2（課本 p.75）' });

q('L14-Q7', '聽力：聽短對話',
  '請聽對話，選出符合內容的說法。',
  listen("Sonia: Do you have dinner at seven, Andy? Andy: No, I don't. I have dinner at six twenty. Sonia: What would you like to eat? Andy: I'd like some pizza and soup, please.", 0.9),
  'Andy 六點二十分吃晚餐，想吃披薩和湯。',
  [['Andy 七點整吃晚餐，想吃披薩和湯。', '時間錯置', '餐點聽對了，但把問句提到的時間當成實際時間'],
   ['Andy 六點二十分吃晚餐，想吃水餃和湯。', '中文意思混淆', '時間和湯都聽對了，把披薩記成水餃'],
   ['Andy 六點二十分吃午餐，想吃披薩和湯。', '資訊錯置', '聽對時間和餐點，但把晚餐記成午餐']],
  ['先聽兩個問句各在問什麼。', '第一個回答有否定，後面才補上真正的時間。', '再把最後一句的兩樣食物和實際用餐時間放在一起。'],
  { concept: 'Andy 否認七點吃晚餐，說自己六點二十分吃晚餐，最後選了披薩和湯。', ref: 'Unit 3 Sentence A（課本 p.52）、Unit 4 Sentence B（課本 p.67）、Review 2（課本 p.75）' });

save();
