// 康軒 Wonder World 7 Review 1（課本 pp.43–46）。
import { buildUnit, listen, passage } from './build-unit.mjs';

const { q, save } = buildUnit('R1');

q('L07-Q1', '字彙：國家',
  '「英國」的英文是哪一個？', null, 'the UK',
  [['the USA', '中文意思混淆', '知道要找縮寫，卻把英國和美國對調'],
   ['France', '中文意思混淆', '把課本中兩個歐洲國家的英文記反'],
   ['Canada', '中文意思混淆', '把英國和加拿大的國名混在一起']],
  ['先確認題目在問哪個國家。', '回想課本中用大寫字母縮寫的國名。', '在兩個縮寫中，留意字母數和最後一個字母。'],
  { concept: '英國是 the UK；美國是 the USA。', ref: 'Unit 1 Vocabulary（課本 pp.18–19）、Review 1（課本 p.43）' });

q('L07-Q2', '字彙：症狀情境',
  'Tessa 指著頭說痛。哪個英文詞表示這種症狀？', null, 'a headache',
  [['a stomachache', '中文意思混淆', '認出字尾表示痛，卻選了肚子痛'],
   ['a toothache', '中文意思混淆', '把頭痛和牙齒痛記混了'],
   ['a sore throat', '中文意思混淆', '看到是在說痛就選了，沒有對照疼痛的位置']],
  ['先找出 Tessa 指的是哪一個部位。', '比較字裡表示身體部位的部分。', '回想哪個英文字是從表示頭的字開始，再接表示疼痛的部分。'],
  { concept: 'head 指頭，headache 是頭痛。', ref: 'Unit 2 Vocabulary（課本 pp.32–33）、Review 1（課本 p.43）' });

q('L07-Q3', '句型：問答配對',
  'Megan 希望眼前的同學直接說出自己來自哪裡。她可以怎麼問？', null, 'Where are you from?',
  [['Where is she from?', '人稱代名詞混淆', '用 she 問另一位女生，沒有用 you 問眼前的人'],
   ['Where am I from?', '人稱代名詞混淆', '用了 I，變成在問自己來自哪裡'],
   ['Are you from India?', '疑問詞混淆', '直接猜一個國家，對方只要回答是或不是，不會直接說出來自哪裡']],
  ['先分清楚 Megan 在問誰。', '對眼前的人說話，要用表示「你」的人稱。', '她想讓對方說出一個地方，要用問地點的疑問詞。'],
  { concept: '直接問對方來自哪裡時，用 Where 問地點，主詞用 you，所以是 Where are you from?', ref: 'Unit 1 Sentence A（課本 p.20）、Review 1（課本 p.43）' });

const notes = passage("I'm Leah. I'm from France and my friend Eric is from the USA. I have a runny nose, but I feel OK. Eric has a stomachache. He has no fever. We are at home today. Our friend Hana is from Japan. She feels fine. She calls us after school.");

q('L07-Q4', '句型與閱讀：找出細節',
  '依上面的短文，有人問：「Does Eric have a fever?」哪個回答正確？', notes,
  "No, he doesn't. He has a stomachache.",
  [['Yes, he does. He has a stomachache.', '簡答不一致', '找對肚子痛的資訊，卻把沒有發燒答成有發燒'],
   ["No, he doesn't. He has a runny nose.", '資訊錯置', '用對否定簡答，卻把 Leah 的症狀配給 Eric'],
   ["No, he don't. He has a stomachache.", '第三人稱混淆', '找對了症狀，但問句用 Does，否定簡答要用相配的形式']],
  ['先圈出問句裡的人名和症狀。', '到短文找到 Eric，看看哪一句說了他有沒有發燒。', '再對照同一個人的另一項症狀，檢查回答有沒有配錯人。'],
  { concept: '文中 Eric 肚子痛，沒有發燒。用 Does 問、答案是否定時，簡答用 No, he doesn\'t.，再補充他的症狀。', ref: 'Review 1 Find Details（課本 pp.44–45）、Unit 2 Sentence B（課本 p.35）' });

q('L07-Q5', '發音：辨別字母組合',
  '哪個字的母音和 bark 的母音相同？', null, 'hard',
  [['bird', '拼字組合混淆', '看到 r 就歸在同一組，忽略了 r 前面的字母'],
   ['horse', '母音混淆', '把 or 的母音和 ar 的母音當成同一個'],
   ['nurse', '母音混淆', '聽到 r 的聲音，就把 ur 和 ar 歸在一起']],
  ['先回想 bark 中間的母音。', '這些字都有 r，再看緊接在 r 前面的字母。', '找出母音字母和 bark 相同的選項，再念一次確認。'],
  { concept: 'bark 和 hard 中間都是 ar；bird 的 ir、horse 的 or、nurse 的 ur 都有不同於 ar 的讀音。', ref: 'Review 1 Four in a Row（課本 p.46）、Unit 2 Phonics（課本 pp.40–41）' });

q('L07-Q6', '聽力：聽句子選意思',
  '請聽英文，選出符合內容的說法。', listen("I'm from Canada. My friend is from Taiwan.", 0.9),
  '說話的人來自加拿大。',
  [['說話的人來自臺灣。', '資訊錯置', '把朋友來自的地方當成說話者自己的'],
   ['說話的人的朋友來自加拿大。', '資訊錯置', '聽到第一個國名，就配給後面提到的朋友'],
   ['說話的人的朋友來自澳大利亞。', '中文意思混淆', '只聽出第二句介紹朋友，沒有比對那個國名的意思']],
  ['比較兩句介紹的是不是同一個人。', '句首有一次在說自己，另一次則提到朋友。', '把每句末尾的國名配給該句的主詞，再對照選項。'],
  { concept: '第一句介紹自己來自加拿大，第二句才說朋友來自臺灣。', ref: 'Unit 1 Sentence A（課本 p.20）、Review 1（課本 p.43）' });

q('L07-Q7', '聽力：聽短對話',
  '請聽對話，選出符合內容的說法。',
  listen("Grace: What's wrong, Max? Max: I have a cold. Grace: Do you have a fever? Max: No, I don't. I have a sore throat.", 0.9),
  'Max 喉嚨痛。',
  [['Max 正在發燒。', '對話資訊錯置', '聽見問句裡的症狀就選了，漏聽 Max 的否定回答'],
   ['Max 有在咳嗽。', '文意推論過度', '聽到感冒就猜他也咳嗽，但對話沒有交代'],
   ['Grace 喉嚨痛。', '對話資訊錯置', '聽對了最後說的症狀，卻配給發問的人']],
  ['先聽誰問問題、誰說自己不舒服。', '第二個問句在確認某個症狀，聽回答是同意還是否定。', '重聽回答者最後一句，核對最後提到的部位。'],
  { concept: 'Max 說自己感冒，接著否認有發燒，最後補充自己喉嚨痛。', ref: 'Unit 2 Sentence A、Grammar Tips（課本 pp.34、36）、Review 1（課本 p.43）' });

save();
