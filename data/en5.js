// 國小全科練習平台 — en5（五上英語・康軒 Wonder World 7）
// 題目：依康軒五上英語教師手冊（教學篇）各單元的學習重點自行編寫；聽力對話與閱讀短文皆為原創。Unit 1 由 Claude Code 做樣板（2026-11-20），其餘照 docs/五上英語交接手冊-Codex.md 接手。
// 四個 Unit 各三關（字彙與聽力／句型與文法／發音與閱讀）＋ Review 1、Review 2 各一關，共 14 關；Get Ready、附錄、More to Learn 不出題。
// zones：一個 Unit 一區，Review 1 放在 Unit 2 那區、Review 2 放在 Unit 4 那區；主題地名與地標還沒定，先用單元名。還沒寫好題目的關先不放，地圖上顯示「尚未開放」。
// levels[].q 為位置陣列：[題幹, 正解, [干擾x3], [提示x3], 詳解, 附件?]；由 tools/assemble.mjs 從作者端題目檔（drafts/en5/en5-questions-*.json）組裝，不要手改。
// 聽力附件 {listen, rate?, speakOptions?} 由瀏覽器英語語音朗讀（js/ui.js 的 Say）。
const EN5 = {
 "id": "en5",
 "subj": "英語",
 "pub": "康軒",
 "sem": "五上",
 "grade": 5,
 "note": "題目依康軒五上英語（Wonder World 7）各單元的學習重點自行編寫；聽力由瀏覽器英語語音朗讀，情境、對話與短文皆為原創。",
 "zones": [
  {
   "name": "Unit 1 Whale Watching",
   "unit": "Unit 1 Whale Watching"
  },
  {
   "name": "Unit 2 Having a Cold",
   "unit": "Unit 2 Having a Cold"
  },
  {
   "name": "Unit 3 From Farm to Table",
   "unit": "Unit 3 From Farm to Table"
  },
  {
   "name": "Unit 4 A Call in the Morning",
   "unit": "Unit 4 A Call in the Morning"
  }
 ],
 "levels": [
  {
   "id": "en5-01",
   "z": 0,
   "name": "字彙與聽力",
   "lesson": "Unit 1",
   "draft": true,
   "intro": "八個國家的英文：Australia、Canada、France、India、Japan、Taiwan、the UK、the USA，還有故事裡的 whale、dolphin。",
   "q": [
    [
     "請聽英文，選出你聽到的國家。",
     "the USA",
     [
      "the UK",
      "the ROC",
      "India"
     ],
     [
      "先聽 the 後面是一個完整的字，還是一個一個念的字母。",
      "一共念了幾個字母？是兩個還是三個？",
      "第一個字母是 U，後面還有兩個字母。"
     ],
     "正確概念：念的是 the USA（美國）。the 後面的 U、S、A 三個字母是一個一個念的。\n破誤：「the UK」：the UK 和 the USA 開頭都是 the U，只聽前半就作答；「the ROC」：the ROC 也是 the 後面接三個字母一個一個念，沒聽清楚是哪三個字母；「India」：In-di-a 和 U-S-A 都是三拍、最後都是 a 的音，只聽節奏就作答。\n回頭讀：Unit 1 Vocabulary（課本 pp.18–19）。",
     {
      "listen": "the USA",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出你聽到的詞。",
     "a dolphin",
     [
      "a whale",
      "a fish",
      "a mammal"
     ],
     [
      "先聽 a 後面的字有幾個音節。",
      "這個字有兩個音節，開頭是 d 的音。",
      "故事裡大家以為看到鯨魚，其實是這種比較小的動物。"
     ],
     "正確概念：念的是 a dolphin（一隻海豚）。dolphin 兩個音節，開頭是 d 的音。\n破誤：「a whale」：故事裡鯨魚和海豚都出現了，沒聽清楚就憑印象選了鯨魚；「a fish」：故事裡有人把鯨魚當成大魚，就記住了 fish；「a mammal」：mammal 和聽到的字一樣是兩個音節、結尾都有 l 的音。\n回頭讀：Unit 1 Story（課本 pp.16–17）。",
     {
      "listen": "a dolphin",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出這個國家的中文。",
     "印度",
     [
      "澳大利亞",
      "加拿大",
      "美國"
     ],
     [
      "先聽開頭的音，是 In、Au、Ca 還是 U？",
      "這個字開頭是 In 的音，一共三個音節。",
      "這個國家在亞洲，國名開頭是 I。"
     ],
     "正確概念：念的是 India（印度）。India 和 Australia 的結尾念法很像，要聽開頭才分得出來。\n破誤：「澳大利亞」：聽到的字和 Australia 的結尾念法很像，只聽結尾就作答；「加拿大」：聽到的字和 Canada 一樣是三個音節、最後都是 a 的音；「美國」：聽到的字和 U-S-A 一樣是三拍，把節奏當成線索。\n回頭讀：Unit 1 Vocabulary（課本 pp.18–19）。",
     {
      "listen": "India",
      "rate": 0.8
     }
    ],
    [
     "「法國」的英文是哪一個？",
     "France",
     [
      "the UK",
      "Canada",
      "the USA"
     ],
     [
      "看清楚題目問的是哪一個國家的英文。",
      "這個國家的英文前面不用加 the。",
      "這個國名的字尾念 [s] 的音。"
     ],
     "正確概念：「法國」是 France，國名是專有名詞，第一個字母要大寫。故事裡 Ella 被問 Are you from the USA? 時回答不是，她來自法國。\n破誤：「the UK」：把法國和英國記混了；故事裡 Joe 來自英國、Ella 來自法國，兩國很容易記反；「Canada」：把法國和加拿大記混了；故事裡 Tommy 來自加拿大；「the USA」：把法國和美國記混了；故事裡有人問 Ella 是不是來自美國。\n回頭讀：Unit 1 Vocabulary（課本 pp.18–19）、Story（課本 p.16）。"
    ],
    [
     "選出可以填入空格、而且寫法正確的國名：\n「Hi! I'm Joe. I'm from ____.」",
     "the UK",
     [
      "the France",
      "the Japan",
      "the Canada"
     ],
     [
      "四個選項都有 the，想一想哪些國名本來就有 the。",
      "課本的八個國家裡，只有用縮寫字母念的兩個國家前面有 the。",
      "France、Japan、Canada 這三個國名前面有沒有 the？"
     ],
     "正確概念：課本的國名裡，the USA（美國）和 the UK（英國）前面有 the；France、Japan、Canada 前面不加 the。\n破誤：「the France」：以為國名前面都要加 the；France 前面不加 the；「the Japan」：以為國名前面都要加 the；Japan 前面不加 the；「the Canada」：以為國名前面都要加 the；Canada 前面不加 the。\n回頭讀：Unit 1 Vocabulary（課本 pp.18–19）。"
    ],
    [
     "請聽英文句子，選出意思最符合的中文。",
     "看！有兩隻鯨魚。",
     [
      "看！有兩隻海豚。",
      "看！有十隻鯨魚。",
      "看！有一隻鯨魚。"
     ],
     [
      "先聽句子裡有幾隻動物。",
      "再聽是哪一種動物：whale 還是 dolphin？",
      "數量是兩隻，不是一隻或十隻。"
     ],
     "正確概念：念的是 Look! There are two whales.（看！有兩隻鯨魚。）two 是兩，whale 是鯨魚。\n破誤：「看！有兩隻海豚。」：數量聽對了，但把鯨魚聽成海豚；「看！有十隻鯨魚。」：把 two 聽成 ten；「看！有一隻鯨魚。」：沒聽到數量，只抓到鯨魚這個字。\n回頭讀：Unit 1 Story（課本 pp.16–17）。",
     {
      "listen": "Look! There are two whales.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，選出正確的說法。",
     "Lily 是從美國來的。",
     [
      "Lily 是從英國來的。",
      "Leo 是從美國來的。",
      "Amy 是從英國來的。"
     ],
     [
      "先聽清楚有哪幾個人，每個人說了什麼。",
      "Amy 問 Lily 是不是也來自英國，Leo 回答 Yes 還是 No？",
      "Leo 說 No 以後，又說了 Lily 來自哪一個國家。"
     ],
     "正確概念：對話中 Leo 來自英國（the UK）；Amy 問 Lily 是不是也來自英國，Leo 說 No, she's not. She's from the USA.，所以 Lily 來自美國。\n破誤：「Lily 是從英國來的。」：聽到 the UK, too 就以為 Lily 也來自英國，沒聽到後面的 No, she's not；「Leo 是從美國來的。」：把 Leo 和 Lily 的國家對調了；「Amy 是從英國來的。」：Amy 是發問的人，對話沒有說她從哪裡來。\n回頭讀：Unit 1 Sentence A、Sentence B（課本 pp.20–21）。",
     {
      "listen": "Amy: Where are you from, Leo? Leo: I'm from the UK. Amy: Is Lily from the UK, too? Leo: No, she's not. She's from the USA.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en5-02",
   "z": 0,
   "name": "句型與文法",
   "lesson": "Unit 1",
   "draft": true,
   "intro": "Where are you from? I'm from Japan. Is he from the USA? Yes, he is. / No, he's not. be 動詞要跟著主詞變，人名、國名要大寫。",
   "q": [
    [
     "選出正確的答案填入空格：\n「Sam and Nick ____ from Canada.」",
     "are",
     [
      "is",
      "am",
      "be"
     ],
     [
      "先找出這個句子的主詞是誰。",
      "主詞是兩個人，就像 they 或 we 一樣。",
      "想一想 They ____ from Japan. 要用哪一個 be 動詞。"
     ],
     "正確概念：主詞 Sam and Nick 是兩個人，和 they 一樣要用 are：Sam and Nick are from Canada.\n破誤：「is」：只看到空格前的 Nick 一個人，沒注意主詞是 Sam and Nick 兩個人；「am」：am 只能跟 I 一起用；「be」：be 是原形，句子裡要依主詞改成 am、is 或 are。\n回頭讀：Unit 1 Grammar Tips（課本 p.22）。"
    ],
    [
     "選出正確的答案填入空格：\nA: ____ are you from?\nB: I'm from India.",
     "Where",
     [
      "What",
      "Who",
      "When"
     ],
     [
      "先看 B 的回答說了什麼。",
      "B 回答的是一個國家，是一個地方。",
      "問「從哪裡來」要用問地方的疑問詞。"
     ],
     "正確概念：B 回答 I'm from India.，說的是地方，所以要用問地方的 Where：Where are you from?\n破誤：「What」：What 問的是「什麼東西」，不是問從哪裡來；「Who」：Who 問的是「誰」，回答要說出人；「When」：When 問的是「什麼時候」，回答要說出時間。\n回頭讀：Unit 1 Sentence A（課本 p.20）。"
    ],
    [
     "Ken 來自日本。有人問：「Is Ken from the USA?」最合適的回答是哪一個？",
     "No, he's not. He's from Japan.",
     [
      "Yes, he is. He's from Japan.",
      "No, she's not. She's from Japan.",
      "No, I'm not. I'm from Japan."
     ],
     [
      "先想一想：Ken 是不是來自美國？要回答 Yes 還是 No？",
      "問句問的是 Ken，回答時要用代替 Ken 的代名詞。",
      "Ken 是男生；再檢查 Yes／No 和後面那一句有沒有前後矛盾。"
     ],
     "正確概念：Ken 不是來自美國，所以回答 No；Ken 是男生，用 he：No, he's not. He's from Japan.\n破誤：「Yes, he is. He's from Japan.」：前面說 Yes（是美國），後面又說來自日本，前後矛盾；「No, she's not. She's from Japan.」：Ken 是男生，要用 he，不是 she；「No, I'm not. I'm from Japan.」：問的是 Ken，不是問「你」，所以不能用 I 回答。\n回頭讀：Unit 1 Sentence B（課本 p.21）。"
    ],
    [
     "下面四個句子，哪一個完全正確？",
     "Tom and I are from the UK.",
     [
      "Tom and I am from the UK.",
      "Ken and Yuki is from Japan.",
      "She are from India."
     ],
     [
      "每一句都先找出主詞，看主詞是一個人還是兩個人以上。",
      "Tom and I 是兩個人，就像 we 一樣。",
      "we 要配的 be 動詞，也是 they 要配的那一個。"
     ],
     "正確概念：Tom and I 是兩個人，和 we 一樣用 are：Tom and I are from the UK.\n破誤：「Tom and I am from the UK.」：看到 I 就用 am，沒注意主詞是 Tom and I 兩個人；「Ken and Yuki is from Japan.」：主詞是兩個人，卻用了 is；「She are from India.」：she 是一個人，要用 is，不是 are。\n回頭讀：Unit 1 Grammar Tips（課本 p.22）。"
    ],
    [
     "下面哪一個句子的大寫完全正確？",
     "Amy and Kevin are from Taiwan.",
     [
      "Amy and kevin are from Taiwan.",
      "Amy and Kevin are from taiwan.",
      "Amy And Kevin Are From Taiwan."
     ],
     [
      "先找出句子裡哪些字是人名或國名。",
      "人名、國名是專有名詞，第一個字母要大寫。",
      "不是人名、國名的字（and、are、from）不用大寫。"
     ],
     "正確概念：人名 Amy、Kevin 和國名 Taiwan 是專有名詞，第一個字母要大寫；and、are、from 是一般的字，不用大寫。\n破誤：「Amy and kevin are from Taiwan.」：Kevin 是人名，第一個字母要大寫；「Amy and Kevin are from taiwan.」：Taiwan 是國名，第一個字母要大寫；「Amy And Kevin Are From Taiwan.」：以為每一個字都要大寫；and、are、from 不是專有名詞，不用大寫。\n回頭讀：Unit 1 Grammar Tips（課本 p.22）。"
    ],
    [
     "請聽問句，選出最合適的回答。",
     "He's from Canada.",
     [
      "She's from Canada.",
      "I'm from Canada.",
      "Yes, he is."
     ],
     [
      "先聽問句是用哪一個疑問詞開頭的。",
      "問的是 Tommy 從哪裡來，回答要說出一個地方。",
      "故事裡的 Tommy 是男生，回答要用 he、she 還是 I？"
     ],
     "正確概念：念的是 Where is Tommy from?（Tommy 從哪裡來？）問句問地方，Tommy 是男生，所以回答 He's from Canada.\n破誤：「She's from Canada.」：Tommy 是男生，要用 he，不是 she；「I'm from Canada.」：問的是 Tommy，不是問「你」，所以不能用 I 回答；「Yes, he is.」：用 Where 開頭的問句要回答地方，不能只說 Yes 或 No。\n回頭讀：Unit 1 Sentence A（課本 p.20）、Story（課本 p.16）。",
     {
      "listen": "Where is Tommy from?",
      "rate": 0.9
     }
    ],
    [
     "依上表，哪一組問答正確？",
     "Is Ben from Canada? Yes, he is.",
     [
      "Is Lily from India? Yes, she is.",
      "Is Anna from India? No, she's not.",
      "Is Ben from Canada? Yes, she is."
     ],
     [
      "每一組都先對照表格，看問的那個人是不是來自那個國家。",
      "國家對了，再看回答用的是 Yes 還是 No、是 he 還是 she。",
      "表格裡只有一個男生，看看問他的那一組回答對不對。"
     ],
     "正確概念：Ben 來自加拿大，而且是男生，所以 Is Ben from Canada? 要回答 Yes, he is.\n破誤：「Is Lily from India? Yes, she is.」：把 Lily 和 Anna 的國家看錯了，Lily 來自澳大利亞；「Is Anna from India? No, she's not.」：Anna 真的來自印度，應該回答 Yes, she is.；「Is Ben from Canada? Yes, she is.」：Ben 是男生，要用 he，不是 she。\n回頭讀：Unit 1 Sentence B（課本 p.21）。",
     {
      "t": [
       [
        "名字",
        "來自哪裡"
       ],
       [
        "Lily（女生）",
        "Australia"
       ],
       [
        "Ben（男生）",
        "Canada"
       ],
       [
        "Anna（女生）",
        "India"
       ]
      ],
      "cap": "三位新朋友"
     }
    ]
   ]
  },
  {
   "id": "en5-03",
   "z": 0,
   "name": "發音與閱讀",
   "lesson": "Unit 1",
   "draft": true,
   "intro": "er、ir、ur 的念法一樣；讀短文找出細節（Find Details），再回想賞鯨的故事。",
   "q": [
    [
     "請聽英文單字，選出這個字的拼法裡有哪一組字母。",
     "er",
     [
      "ee",
      "ea",
      "ar"
     ],
     [
      "先聽這個字的母音是長音 e，還是捲舌的音。",
      "這個字的母音是捲舌的音，和 girl、nurse 的母音一樣。",
      "這個字和 he 只差在後面多了一個字母。"
     ],
     "正確概念：念的是 her，母音是 er 的念法，和 girl 的 ir、nurse 的 ur 念法一樣；he 才是長音 e。\n破誤：「ee」：把聽到的字聽成 he，以為是 ee 的長音；「ea」：把聽到的字聽成長音 e，以為是 ea 的拼法；「ar」：聽到捲舌的 r 音，就以為是 ar。\n回頭讀：Unit 1 Phonics（課本 pp.26–27）。",
     {
      "listen": "her",
      "rate": 0.8
     }
    ],
    [
     "下面四個字，哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。",
     "fist",
     [
      "bird",
      "nurse",
      "clerk"
     ],
     [
      "先聽每個字的母音，不要只看拼法。",
      "er、ir、ur 這三組字母的念法是一樣的。",
      "找一找哪一個字沒有 er、ir 或 ur。"
     ],
     "正確概念：bird 的 ir、nurse 的 ur、clerk 的 er 念法都一樣；fist 只有 i，念短音 i，和其他三個不同。\n破誤：「bird」：看到 ir 和 ur、er 的字母不同，就以為念法也不同；「nurse」：看到 ur 和 ir、er 的字母不同，就以為念法也不同；「clerk」：看到 er 和 ir、ur 的字母不同，就以為念法也不同。\n回頭讀：Unit 1 Phonics Sound It Out、Listen, Point, and Say（課本 pp.26–27）。",
     {
      "speakOptions": true
     }
    ],
    [
     "下面哪一個字有和 girl 的 ir 一樣的念法？",
     "purple",
     [
      "fist",
      "blue",
      "he"
     ],
     [
      "girl 的 ir 是母音後面接 r。",
      "er、ir、ur 這三組的念法一樣，找一找哪一個字有其中一組。",
      "只看母音後面有沒有接 r。"
     ],
     "正確概念：purple 的 ur 和 girl 的 ir 念法一樣；fist、blue、he 的母音後面都沒有 r，念法不同。\n破誤：「fist」：看到 i 就以為和 girl 一樣；fist 只有 i，後面沒有 r，念短音 i；「blue」：看到 u 就以為是 ur；blue 的 u 後面沒有 r；「he」：看到 e 就以為是 er；he 的 e 後面沒有 r，念長音 e。\n回頭讀：Unit 1 Phonics Sound It Out、Listen and Chant（課本 p.26）。"
    ],
    [
     "請聽英文，選出你聽到的單字。",
     "purse",
     [
      "nurse",
      "perm",
      "purple"
     ],
     [
      "先聽開頭的音，再聽結尾的音。",
      "開頭是 p 的音，結尾是 s 的音。",
      "這個字只有一個音節，是裝錢的東西。"
     ],
     "正確概念：念的是 purse（錢包），開頭 p、中間 ur、結尾 s 的音，只有一個音節。\n破誤：「nurse」：結尾相同、押韻，沒聽清楚開頭是 p 還是 n；「perm」：開頭都是 p、母音一樣，沒聽清楚結尾是 s 還是 m；「purple」：開頭的 pur 相同，沒注意到聽到的字只有一個音節。\n回頭讀：Unit 1 Phonics Sound It Out（課本 p.26）。",
     {
      "listen": "purse",
      "rate": 0.8
     }
    ],
    [
     "依上面的短文回答：Where is Lucy from?",
     "She's from Japan.",
     [
      "She's from Canada.",
      "She's from India.",
      "She's from Hualien."
     ],
     [
      "先在短文裡找到 Lucy 的名字。",
      "介紹 Lucy 的下一句，就是她來自哪裡。",
      "那一句是 She's from 開頭。"
     ],
     "正確概念：短文寫 That's my friend Lucy. She's from Japan.，所以 Lucy 來自日本。\n破誤：「She's from Canada.」：把 Nina 的國家當成 Lucy 的；「She's from India.」：把 Leo 的國家當成 Lucy 的；「She's from Hualien.」：花蓮是他們下星期要去賞鯨的地方，不是 Lucy 來自的國家。\n回頭讀：Unit 1 Reading（課本 pp.23–25）。",
     {
      "passage": "Hi, I'm Nina. I'm from Canada. I like to read books about animals. This is my friend Leo. He's from India. He plays basketball after school. That's my friend Lucy. She's from Japan. She goes to school by bus. We all love whales. Next week, we're going whale watching in Hualien!"
     }
    ],
    [
     "依上面的短文，下列哪一個說法正確？",
     "Lucy 搭公車上學。",
     [
      "Leo 喜歡讀動物的書。",
      "Nina 放學後打籃球。",
      "他們上星期去花蓮賞鯨。"
     ],
     [
      "每個選項都回短文找那個人的那一句，一句一句對。",
      "注意每一件事是誰做的，也注意時間是 next week 還是別的時候。",
      "找一找 by bus 那一句說的是誰。"
     ],
     "正確概念：短文寫 That's my friend Lucy. ... She goes to school by bus.，所以 Lucy 搭公車上學。找細節時要看清楚是誰、做什麼、什麼時候。\n破誤：「Leo 喜歡讀動物的書。」：喜歡讀動物書的是 Nina，不是 Leo；「Nina 放學後打籃球。」：放學後打籃球的是 Leo，不是 Nina；「他們上星期去花蓮賞鯨。」：短文說的是 Next week（下星期），還沒去。\n回頭讀：Reading Skills：Find Details（課本 p.10）、Unit 1 Reading（課本 pp.23–25）。",
     {
      "passage": "Hi, I'm Nina. I'm from Canada. I like to read books about animals. This is my friend Leo. He's from India. He plays basketball after school. That's my friend Lucy. She's from Japan. She goes to school by bus. We all love whales. Next week, we're going whale watching in Hualien!"
     }
    ],
    [
     "依 Unit 1 的故事 Whale Watching，下列哪一個說法正確？",
     "Tommy 是第一次來臺灣。",
     [
      "Ella 是從美國來的。",
      "Joe 是從加拿大來的。",
      "大家最先看到的是鯨魚。"
     ],
     [
      "回想故事裡兩位新朋友 Ella 和 Tommy 怎麼介紹自己，Joe 又說自己來自哪裡。",
      "大家第一次喊 There's a whale. 時，看到的真的是鯨魚嗎？",
      "Tommy 自我介紹時，除了名字，還說了一件和臺灣有關的事。"
     ],
     "正確概念：Tommy 自我介紹時說 It's my first time in Taiwan.（這是我第一次來臺灣。）Ella 來自法國、Joe 來自英國；大家最先看到的是海豚。\n破誤：「Ella 是從美國來的。」：有人問 Ella 是不是來自美國，她回答不是，她來自法國；「Joe 是從加拿大來的。」：來自加拿大的是 Tommy，Joe 來自英國；「大家最先看到的是鯨魚。」：有人先喊看到鯨魚，但那其實是海豚，後來才看到鯨魚。\n回頭讀：Unit 1 Story（課本 pp.15–17）。"
    ]
   ]
  },
  {
   "id": "en5-04",
   "z": 1,
   "name": "字彙與聽力",
   "lesson": "Unit 2",
   "draft": true,
   "intro": "生病的說法：cold、cough、fever、headache、toothache、stomachache、runny nose、sore throat。",
   "q": [
    [
     "請聽英文，選出你聽到的詞。",
     "a fever",
     [
      "a headache",
      "a cough",
      "a cold"
     ],
     [
      "重聽 a 後面的字，注意有幾個音節。",
      "有兩個音節的選項還要再比開頭的音。",
      "重聽第一個音節，它開頭有輕輕送氣的 f 音。"
     ],
     "正確概念：念的是 a fever（發燒）。fever 有兩個音節，開頭是 f 的音。\n破誤：「a headache」：聽到兩個音節就選了 headache，沒再比對開頭的音；「a cough」：把發燒和咳嗽兩個常一起提到的症狀記反了；「a cold」：把一個症狀當成整個感冒的英文。\n回頭讀：Unit 2 Vocabulary（課本 p.32）。",
     {
      "listen": "a fever",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出你聽到的詞。",
     "a toothache",
     [
      "a headache",
      "a stomachache",
      "a sore throat"
     ],
     [
      "重聽 a 後面的聲音，注意哪一段最熟悉。",
      "字尾有 ache 的音，前半才是分辨不同部位的線索。",
      "重聽第一個音節的開頭，在 t、h 和 st 之間比較。"
     ],
     "正確概念：念的是 a toothache（牙痛）。tooth 表示牙齒，和後面的 ache 合起來表示牙痛。\n破誤：「a headache」：只聽到字尾的 ache，把前面的身體部位聽錯了；「a stomachache」：抓到 ache 的音就選了，沒聽清楚前半和音節數；「a sore throat」：把嘴巴附近的兩種疼痛記混了。\n回頭讀：Unit 2 Vocabulary（課本 pp.32–33）。",
     {
      "listen": "a toothache",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出最符合的中文意思。",
     "流鼻水",
     [
      "喉嚨痛",
      "頭在痛",
      "在咳嗽"
     ],
     [
      "先聽 a 後面是一個字還是兩個字。",
      "重聽最後一個字，想想它指的是哪個身體部位。",
      "最後一個字是 n 起頭，意思是臉上一個用來聞味道的部位。"
     ],
     "正確概念：念的是 a runny nose（流鼻水）。nose 是鼻子，runny nose 說的是鼻子流鼻水。\n破誤：「喉嚨痛」：只聽到是兩個字組成的症狀，便套成另一個片語的意思；「頭在痛」：把鼻子的症狀和頭痛記混了；「在咳嗽」：把感冒時常一起出現的症狀混在一起。\n回頭讀：Unit 2 Vocabulary（課本 pp.32–33）。",
     {
      "listen": "a runny nose",
      "rate": 0.8
     }
    ],
    [
     "「喉嚨痛」的英文是哪一個？",
     "a sore throat",
     [
      "a runny nose",
      "a stomachache",
      "a toothache"
     ],
     [
      "先看「哪裡」在痛。",
      "找一找有哪個選項用兩個字來描述疼痛的地方。",
      "表示喉嚨的字以 th 開頭，留意它在片語中的位置。"
     ],
     "正確概念：喉嚨痛是 a sore throat。sore 說明不舒服，throat 指喉嚨。\n破誤：「a runny nose」：把喉嚨不舒服記成鼻子流鼻水；「a stomachache」：知道在說疼痛，卻選了肚子痛；「a toothache」：把喉嚨痛和牙痛的部位記反了。\n回頭讀：Unit 2 Vocabulary（課本 pp.32–33）。"
    ],
    [
     "Maya 要寫「肚子痛」的英文。依課本，哪一個是本課字彙表的寫法？",
     "a stomachache",
     [
      "a stomacheache",
      "a stomach ache",
      "a stomach-ache"
     ],
     [
      "回想課本怎麼把身體部位和疼痛寫在一起。",
      "比一比各選項是直接合起來、分開，還是加了符號。",
      "課本把兩部分直接寫成一個字，前半表示肚子，結尾是 ch。"
     ],
     "正確概念：課本把 stomach 和 ache 直接合成 stomachache。\n破誤：「a stomacheache」：誤把 stomach 的尾端拼成 che，再接疼痛的字；「a stomach ache」：把兩個部分分開寫；「a stomach-ache」：以為兩部分之間需要連字號。\n回頭讀：Unit 2 Vocabulary（課本 pp.32–33）。"
    ],
    [
     "請聽英文句子，選出意思最符合的中文。",
     "我感冒，也咳嗽。",
     [
      "我感冒，也發燒。",
      "我頭痛，也咳嗽。",
      "我發燒，也頭痛。"
     ],
     [
      "重聽一次，注意說話的人提了幾種不舒服的情況。",
      "可以在連接兩個說法的地方暫停，先分別聽清楚，再合在一起想。",
      "兩個症狀的英文都以 k 的音開頭，分辨哪一個字尾帶 f 的音。"
     ],
     "正確概念：句子 I have a cold and a cough. 用 and 接起來。a cold 是感冒，a cough 是咳嗽。\n破誤：「我感冒，也發燒。」：聽對了感冒，卻把第二個詞當成另一種常見的感冒症狀；「我頭痛，也咳嗽。」：聽對了第二個症狀，卻把第一個症狀的意思記錯；「我發燒，也頭痛。」：只抓到句子在說不舒服，沒有分別確認兩個詞的意思。\n回頭讀：Unit 2 Vocabulary（課本 p.32）、Sentence A（課本 p.34）。",
     {
      "listen": "I have a cold and a cough.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，選出符合對話的說法。",
     "Mia 牙痛。",
     [
      "Mia 咳嗽。",
      "Mike 牙痛。",
      "Mike 頭痛。"
     ],
     [
      "留意對話在問誰、是誰回答。",
      "回答的人有時說自己，有時說問句裡的人。聽聽看他什麼時候換了主詞。",
      "聽完否定的簡答後，下一句還在說問句裡的人。把那句的症狀和人名配在一起。"
     ],
     "正確概念：Mike 先說 No, she doesn't.，接著說 She has a toothache.，這兩句都在說 Mia。最後一句 I have a cough. 才是在說他自己。\n破誤：「Mia 咳嗽。」：只聽前面的問句，沒注意 Mike 先否認了；「Mike 牙痛。」：聽到牙痛就配給說話的 Mike，沒聽出他還在說 Mia；「Mike 頭痛。」：把有 ache 的字聽成頭痛，還把症狀配給了 Mike。\n回頭讀：Unit 2 Sentence B（課本 p.35）。",
     {
      "listen": "Nora: Does Mia have a cough? Mike: No, she doesn't. She has a toothache. I have a cough.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en5-05",
   "z": 1,
   "name": "句型與文法",
   "lesson": "Unit 2",
   "draft": true,
   "intro": "What's wrong? I have a headache. He has a fever. 用 Do you 或 Does he／she 提問時，後面用原形 have。",
   "q": [
    [
     "選出正確的答案填入空格：「Ivy ____ a cough.」",
     "has",
     [
      "have",
      "haves",
      "is"
     ],
     [
      "先圈出主詞，看這句在說誰。",
      "把 Ivy 換成 she，再回想課本的動詞表。",
      "這句在說她有一種症狀，想一想 have 在 she 後面要怎麼變。"
     ],
     "正確概念：Ivy 是一個人，和 she 一樣用 has。Ivy has a cough. 表示 Ivy 咳嗽。\n破誤：「have」：直接把 I have 裡的 have 搬到人名後面；「haves」：知道一個人當主詞時動詞要變，卻直接在 have 後加 s；「is」：把表示有某個症狀的動詞換成 be 動詞。\n回頭讀：Unit 2 Grammar Tips（課本 p.36）。"
    ],
    [
     "選出正確的答案填入空格：「____ he have a sore throat?」",
     "Does",
     [
      "Do",
      "Is",
      "Has"
     ],
     [
      "看空格後面是誰，以及句子已經有哪個動詞。",
      "句子已經有 have，回想課本用哪一類字加在句首來提問。",
      "如果主詞是 you，可以用 Do。這題的主詞換成了 he。"
     ],
     "正確概念：問他有沒有某個症狀，用 Does he have …?。主詞是 he，句首用 Does。\n破誤：「Do」：把 Do you 的 Do 用在 he 前面；「Is」：記得 Is he 的問句開頭，卻沒看到後面已有 have；「Has」：把直述句裡的 has 放到句首，忘了題目要用助動詞來問。\n回頭讀：Unit 2 Sentence B（課本 p.35）、Grammar Tips（課本 p.36）。"
    ],
    [
     "Lena 鼻子流鼻水，牙齒沒有痛。有人問：「Does Lena have a toothache?」怎麼回答最合適？",
     "No, she doesn't. She has a runny nose.",
     [
      "Yes, she does. She has a runny nose.",
      "No, she don't. She has a runny nose.",
      "No, she doesn't. She has a sore throat."
     ],
     [
      "先看問句在問哪一種症狀。",
      "把那個症狀和題目提供的情況比一比，決定要肯定還是否定。",
      "用和問句相配的簡答，再檢查第二句寫的是不是 Lena 真正的症狀。"
     ],
     "正確概念：Lena 沒有牙痛，所以用 No, she doesn't.。她流鼻水，用 She has a runny nose. 補充。\n破誤：「Yes, she does. She has a runny nose.」：知道 Lena 流鼻水，但前面卻回答她有牙痛；「No, she don't. She has a runny nose.」：知道要回答 No，卻把 I 或 you 會用的否定簡答套在 she 上；「No, she doesn't. She has a sore throat.」：簡答正確，補充時卻把鼻水換成喉嚨痛。\n回頭讀：Unit 2 Sentence B（課本 p.35）。"
    ],
    [
     "下面哪一個英文問句寫得完全正確？",
     "What's wrong?",
     [
      "What wrong?",
      "Whats wrong?",
      "What's the wrong?"
     ],
     [
      "回想課本問「怎麼了？」的句型。",
      "這個問句本來有 be 動詞，即使寫成縮寫也要把它算進去。",
      "完整寫法是 What is wrong?，再看哪個選項把前兩個字正確縮在一起。"
     ],
     "正確概念：What is 縮寫成 What's。撇號放在 t 和 s 之間，表示 is 的 i 省略了。\n破誤：「What wrong?」：只寫了 what 和 wrong，漏掉連接兩個字的 is；「Whats wrong?」：知道要用縮寫，卻漏掉表示省略的撇號；「What's the wrong?」：以為 wrong 前面和名詞一樣要加 the。\n回頭讀：Unit 2 Story（課本 pp.30–31）、Sentence A（課本 p.34）。"
    ],
    [
     "兩個空格應依序填什麼？\nDo you ____ a cold?\nDoes she ____ a headache?",
     "have／have",
     [
      "have／has",
      "has／have",
      "has／has"
     ],
     [
      "把兩句的句首圈起來，再分別看空格在哪裡。",
      "這兩句都是問句，句子前面已經有 do 或 does。",
      "課本說 do 和 does 後面的動詞都用原形，想想要填的原形是哪個。"
     ],
     "正確概念：Do 和 Does 已經配好主詞，後面一律用動詞原形 have，所以兩個空格都填 have。\n破誤：「have／has」：看到 she 就把直述句的 has 用在 Does 開頭的問句裡；「has／have」：第二空用了原形，第一空卻跟著症狀的單數名詞選 has；「has／has」：以為問一個人有沒有某個症狀時，動詞一律要改成 has。\n回頭讀：Unit 2 Grammar Tips（課本 p.36）。"
    ],
    [
     "請聽問句，選出最合適的回答。",
     "I have a sore throat.",
     [
      "He has a sore throat.",
      "I has a sore throat.",
      "No, I don't have a sore throat."
     ],
     [
      "辨認對方是在直接問一個人，還是在談另一個人。",
      "分辨對方是問有沒有指定的症狀，還是請人自己說哪裡不舒服。",
      "被問到的人回答自己的症狀時，要用 I 搭配正確的動詞。"
     ],
     "正確概念：What's wrong, Mike? 是直接問 Mike 哪裡不舒服。Mike 可以用 I have 加上一種症狀回答。\n破誤：「He has a sore throat.」：聽見 Mike 的名字，就用第三人稱說他，沒注意是直接問 Mike；「I has a sore throat.」：知道要用 I 回答，卻用了一個人名後才會用的 has；「No, I don't have a sore throat.」：把請對方說明症狀的問句，聽成問他有沒有喉嚨痛。\n回頭讀：Unit 2 Sentence A（課本 p.34）、Grammar Tips（課本 p.36）。",
     {
      "listen": "What's wrong, Mike?",
      "rate": 0.9
     }
    ],
    [
     "依上表，哪一組問答正確？",
     "Does Jack have a cold? No, he doesn't.",
     [
      "Does Eva have a headache? No, she doesn't.",
      "Does Chloe have a fever? Yes, she does.",
      "Does Jack have a cold? No, she doesn't."
     ],
     [
      "每次只找問句提到的那一列。",
      "把問句中的症狀和同一列的紀錄相比，再決定要用 Yes 或 No。",
      "有兩組問的是同一個人，對照他那一列的症狀和括號裡的資料。"
     ],
     "正確概念：Jack 只有發燒的紀錄，括號寫他是男生，所以問他有沒有感冒，要回答 No, he doesn't.。\n破誤：「Does Eva have a headache? No, she doesn't.」：表格上 Eva 的症狀確實是頭痛，卻答了 No；「Does Chloe have a fever? Yes, she does.」：把 Jack 的發燒讀成 Chloe 的症狀；「Does Jack have a cold? No, she doesn't.」：知道 Jack 沒有感冒，卻用了 she 指 Jack。\n回頭讀：Unit 2 Sentence B（課本 p.35）、Grammar Tips（課本 p.36）。",
     {
      "t": [
       [
        "姓名",
        "今天記下的症狀"
       ],
       [
        "Jack（男生）",
        "a fever"
       ],
       [
        "Chloe（女生）",
        "a cold"
       ],
       [
        "Eva（女生）",
        "a headache"
       ]
      ],
      "cap": "健康紀錄（每人只有一項症狀）"
     }
    ]
   ]
  },
  {
   "id": "en5-06",
   "z": 1,
   "name": "發音與閱讀",
   "lesson": "Unit 2",
   "draft": true,
   "intro": "分辨 car 的 ar 和 corn 的 or；用疑問詞（Question Words）讀懂短文，再回想 Joe 感冒的故事。",
   "q": [
    [
     "請聽英文單字，選出這個字的拼法裡有哪一組字母。",
     "or",
     [
      "ir",
      "oa",
      "ee"
     ],
     [
      "先聽單字中間的母音，再聽最後一個子音前的聲音。",
      "比較中間的聲音有沒有帶 r 的音。",
      "它的母音和 horse 裡的母音一樣。想想這個字的中間怎麼拼。"
     ],
     "正確概念：念的是 corn（玉米）。它和 horse、pork 一樣，中間的母音用 or 來拼。\n破誤：「ir」：聽出有 r 的聲音，卻和 Unit 1 的 ir 讀音混淆；「oa」：只注意中間像 o 的聲音，沒聽到 r；「ee」：把中間的母音聽成像 see 那樣的長音 e。\n回頭讀：Unit 2 Phonics Sound It Out（課本 p.40）。",
     {
      "listen": "corn",
      "rate": 0.8
     }
    ],
    [
     "哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。",
     "car",
     [
      "corn",
      "horse",
      "pork"
     ],
     [
      "輪流點播，先比較中間的母音。",
      "這些字都帶 r 的音，聽聽 r 前面的部分有什麼差別。",
      "有三個字的母音和 horse 的相同。比較剩下的字。"
     ],
     "正確概念：corn、horse、pork 都有 or 的讀音。car 的 ar 和這三個字的母音不同。\n破誤：「corn」：只注意 corn 的字尾有 n，誤把子音的差別當成母音的差別；「horse」：注意到 horse 後面有 s 的音，卻沒比對中間的母音；「pork」：把開頭的 p 或字尾的 k 當成判斷母音的線索。\n回頭讀：Unit 2 Phonics Sound It Out（課本 p.40）。",
     {
      "speakOptions": true
     }
    ],
    [
     "哪一個字的母音和 party 第一個音節的母音相同？",
     "farm",
     [
      "form",
      "cord",
      "born"
     ],
     [
      "先回想 party 第一個音節怎麼念。",
      "在第一個音節裡，母音和後面的 r 要合在一起比較。",
      "看 party 的 r 前面是哪個字母，再去選項裡找相同的組合。"
     ],
     "正確概念：party 的第一個音節和 farm 都用 ar 拼這個母音。form、cord、born 用的是 or。\n破誤：「form」：只看到 f 和 rm 一樣，沒分辨 ar 和 or；「cord」：知道母音後面有 r，就把 or 的讀音當成 ar；「born」：把這課另一組帶 r 的母音套在 party 上。\n回頭讀：Unit 2 Phonics Sound It Out、Listen, Point, and Say（課本 pp.40–41）。"
    ],
    [
     "請聽英文，選出你聽到的單字。",
     "pork",
     [
      "cord",
      "farm",
      "born"
     ],
     [
      "先重聽中間的母音，再聽開頭和結尾。",
      "比較母音是接近 car 裡的母音，還是 horse 裡的母音。",
      "再重聽母音後面，找出用 k 的音收尾的選項。"
     ],
     "正確概念：念的是 pork。它的母音和 horse 相同，結尾是 k 的音。cord 結尾是 d 的音，born 結尾是 n 的音。\n破誤：「cord」：中間的母音一樣，卻沒有比對首尾的子音；「farm」：聽出有 r 的音就作答，沒辨認 r 前的母音；「born」：只聽到相同的母音，把開頭和結尾配給另一個帶 or 的字。\n回頭讀：Unit 2 Phonics Sound It Out（課本 p.40）、Phonics（課本 p.41）。",
     {
      "listen": "pork",
      "rate": 0.8
     }
    ],
    [
     "依上面的短文回答：What does Ruby have?",
     "She has a fever.",
     [
      "She has a cold.",
      "She has a headache.",
      "She has a sore throat."
     ],
     [
      "先找出短文是誰在說話。",
      "分辨說話的人在哪一句說自己，在哪一句說朋友。",
      "找出 I have 開頭的句子，看看後面接的是哪個症狀。"
     ],
     "正確概念：開頭介紹說話的人是 Ruby。她用 I have a fever today. 說自己今天發燒。\n破誤：「She has a cold.」：把 Ivan 的症狀當成 Ruby 的症狀；「She has a headache.」：看到 Ruby 不舒服，就自行猜她頭痛；「She has a sore throat.」：看到文中有人感冒，就自行加上喉嚨痛，也弄錯了人。\n回頭讀：Unit 2 Reading（課本 pp.37–39）、Sentence A（課本 p.34）。",
     {
      "passage": "I'm Ruby. I'm in Taiwan. My friend Ivan is in the UK. We like to draw pictures of animals. Today I draw a whale for him. I have a fever, so I stay at home. Ivan has a cold. He's at home, too. We talk on the phone. I tell him about my picture."
     }
    ],
    [
     "依上面的短文，哪個問題可以用「In the UK.」來回答？",
     "Where is Ivan?",
     [
      "Where is Ruby?",
      "Who has a cold?",
      "What does Ivan have?"
     ],
     [
      "先看題目給的回答是人、地點，還是症狀。",
      "找出問這一類資訊的疑問詞。",
      "短文提到兩個人各在不同的地方。把問句中的人名對回短文。"
     ],
     "正確概念：In the UK. 指一個地點，要用 Where 問。短文說在英國的是 Ivan，所以要問 Where is Ivan?。\n破誤：「Where is Ruby?」：看出 Where 問地點，但把 Ruby 和 Ivan 所在的地方對調；「Who has a cold?」：把問哪個人有感冒的問句當成問地點；「What does Ivan have?」：只看到 Ivan 就選了，沒注意 What does Ivan have? 在問症狀。\n回頭讀：Reading Skills：Question Words（課本 p.10）、Unit 2 Reading（課本 pp.37–39）。",
     {
      "passage": "I'm Ruby. I'm in Taiwan. My friend Ivan is in the UK. We like to draw pictures of animals. Today I draw a whale for him. I have a fever, so I stay at home. Ivan has a cold. He's at home, too. We talk on the phone. I tell him about my picture."
     }
    ],
    [
     "Unit 2 的故事裡，有人問 Boka 是不是肚子痛。Boka 怎麼回答？",
     "他只是肚子餓。",
     [
      "他真的肚子痛。",
      "他覺得頭在痛。",
      "他說他在發燒。"
     ],
     [
      "回想故事最後幾格，先分清楚誰被問到。",
      "有人猜 Boka 是不是肚子痛。他開口時是同意還是先否定？",
      "他否定後說了自己的情況。想想他那句話跟吃東西有什麼關係。"
     ],
     "正確概念：Boka 回答 No, I'm just hungry.，意思是他只是肚子餓。頭痛和發燒都是 Joe 說的症狀。\n破誤：「他真的肚子痛。」：把別人的猜測當成 Boka 的回答；「他覺得頭在痛。」：把 Joe 說的頭痛記成 Boka 的情況；「他說他在發燒。」：把 Joe 說的發燒記成 Boka 的情況。\n回頭讀：Unit 2 Story（課本 p.31）。"
    ]
   ]
  }
 ]
};
