// 國小全科練習平台 — en5（五上英語・康軒 Wonder World 7）
// 題目：依康軒五上英語教師手冊（教學篇）各單元的學習重點自行編寫；聽力對話與閱讀短文皆為原創。Unit 1 由 Claude Code 做樣板（2026-11-20），其餘照 docs/五上英語交接手冊-Codex.md 接手。
// 四個 Unit 各三關（字彙與聽力／句型與文法／發音與閱讀）＋ Review 1、Review 2 各一關，共 14 關；Get Ready、附錄、More to Learn 不出題。
// zones：一個 Unit 一區，Review 1 放在 Unit 2 那區、Review 2 放在 Unit 4 那區；主題地名 2026-11-20 老師選定：賞鯨港灣、感冒診所（新做 clinic 地標）、開心農場、早安校園。還沒寫好題目的關先不放，地圖上顯示「尚未開放」。
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
   "name": "賞鯨港灣",
   "unit": "Unit 1 Whale Watching",
   "terrain": "isle"
  },
  {
   "name": "感冒診所",
   "unit": "Unit 2 Having a Cold",
   "terrain": "clinic"
  },
  {
   "name": "開心農場",
   "unit": "Unit 3 From Farm to Table",
   "terrain": "garden"
  },
  {
   "name": "早安校園",
   "unit": "Unit 4 A Call in the Morning",
   "terrain": "school"
  }
 ],
 "levels": [
  {
   "id": "en5-01",
   "z": 0,
   "name": "字彙與聽力",
   "lesson": "Unit 1",
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
     "正確概念：念的是 the USA（美國）。the 後面的 U、S、A 三個字母是一個一個念的。\n破誤：「the UK」：the UK 和 the USA 開頭都是 the U，只聽前半就作答；「the ROC」：the ROC 也是 the 後面接三個字母一個一個念，沒聽清楚是哪三個字母；「India」：In-di-a 和 U-S-A 一樣念成三拍，只聽節奏、沒聽清楚開頭就作答。\n回頭讀：Unit 1 Vocabulary（課本 pp.18–19）。",
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
      "Amy 問 Lily 是不是也像 Leo 一樣來自英國，Leo 回答 Yes 還是 No？",
      "Leo 說 No 以後，又說了 Lily 來自哪一個國家。"
     ],
     "正確概念：對話中 Leo 來自英國（the UK）；Amy 問 Lily 是不是也像 Leo 一樣來自英國，Leo 說 No, she's not. She's from the USA.，所以 Lily 來自美國。\n破誤：「Lily 是從英國來的。」：聽到 the UK, too 就以為 Lily 也來自英國，沒聽到後面的 No, she's not；「Leo 是從美國來的。」：把 Leo 和 Lily 的國家對調了；「Amy 是從英國來的。」：Amy 是發問的人，對話沒有說她從哪裡來。\n回頭讀：Unit 1 Sentence A、Sentence B（課本 pp.20–21）。",
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
      "her"
     ],
     [
      "先聽每個字的母音，不要只看拼法。",
      "er、ir、ur 這三組字母的念法是一樣的。",
      "找一找哪一個字沒有 er、ir 或 ur。"
     ],
     "正確概念：bird 的 ir、nurse 的 ur、her 的 er 念法都一樣；fist 只有 i，念短音 i，和其他三個不同。\n破誤：「bird」：看到 ir 和 ur、er 的字母不同，就以為念法也不同；「nurse」：看到 ur 和 ir、er 的字母不同，就以為念法也不同；「her」：看到 er 和 ir、ur 的字母不同，就以為念法也不同。\n回頭讀：Unit 1 Phonics Sound It Out、Listen, Point, and Say（課本 pp.26–27）。",
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
      "重聽第一個音節，開頭是上排牙齒輕碰下唇、往外吹氣的 f 音。"
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
     "Maya 要寫「肚子痛」的英文。哪一個拼法正確？",
     "a stomachache",
     [
      "a stomacheache",
      "a stomacache",
      "a stomachake"
     ],
     [
      "回想課本怎麼把身體部位和疼痛寫在一起。",
      "把每個選項拆成「肚子」和「疼痛」兩半，看哪一半多了或少了字母。",
      "前半的「肚子」以 ch 結尾，後面不多加字母；後半的「疼痛」和 headache 結尾的寫法一樣。"
     ],
     "正確概念：課本把 stomach（肚子）和 ache（疼痛）直接合成 stomachache。stomacheache 多了 e、stomacache 少了 h、stomachake 把 ache 拼成了 ake。\n破誤：「a stomacheache」：誤把 stomach 的尾端拼成 che，再接疼痛的字；「a stomacache」：照念的音拼，漏掉了 stomach 結尾 ch 裡的 h；「a stomachake」：照念的音把 ache 拼成 ake。\n回頭讀：Unit 2 Vocabulary（課本 pp.32–33）。"
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
      "Are"
     ],
     [
      "看空格後面是誰，以及句子已經有哪個動詞。",
      "句子已經有 have，回想課本用哪一類字加在句首來提問。",
      "如果主詞是 you，可以用 Do。這題的主詞換成了 he。"
     ],
     "正確概念：問他有沒有某個症狀，用 Does he have …?。主詞是 he，句首用 Does。\n破誤：「Do」：把 Do you 的 Do 用在 he 前面；「Is」：記得 Is he 的問句開頭，卻沒看到後面已有 have；「Are」：記得 Are you 這類問句開頭，卻沒看到後面已有 have。\n回頭讀：Unit 2 Sentence B（課本 p.35）、Grammar Tips（課本 p.36）。"
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
     "正確概念：開頭介紹說話的人是 Ruby。她用 I have a fever, so I stay at home. 說自己發燒，所以待在家裡。\n破誤：「She has a cold.」：把 Ivan 的症狀當成 Ruby 的症狀；「She has a headache.」：看到 Ruby 不舒服，就自行猜她頭痛；「She has a sore throat.」：看到文中有人感冒，就自行加上喉嚨痛，也弄錯了人。\n回頭讀：Unit 2 Reading（課本 pp.37–39）、Sentence A（課本 p.34）。",
     {
      "passage": "I'm Ruby. I'm in Taiwan. My friend Ivan is in the UK. We like to draw pictures of animals. I'm drawing a whale for him today. I have a fever, so I stay at home. Ivan has a cold. He's at home, too. We talk on the phone. I tell him about my picture."
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
      "passage": "I'm Ruby. I'm in Taiwan. My friend Ivan is in the UK. We like to draw pictures of animals. I'm drawing a whale for him today. I have a fever, so I stay at home. Ivan has a cold. He's at home, too. We talk on the phone. I tell him about my picture."
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
  },
  {
   "id": "en5-07",
   "z": 1,
   "name": "綜合複習",
   "lesson": "Review 1",
   "intro": "Unit 1～2 一起複習：國家、生病的說法、問從哪裡來和哪裡不舒服。",
   "q": [
    [
     "「英國」的英文是哪一個？",
     "the UK",
     [
      "the USA",
      "France",
      "Canada"
     ],
     [
      "先確認題目在問哪個國家。",
      "回想課本中用大寫字母縮寫的國名。",
      "在兩個縮寫中，留意字母數和最後一個字母。"
     ],
     "正確概念：英國是 the UK；美國是 the USA。\n破誤：「the USA」：知道要找縮寫，卻把英國和美國對調；「France」：把課本中兩個歐洲國家的英文記反；「Canada」：把英國和加拿大的國名混在一起。\n回頭讀：Unit 1 Vocabulary（課本 pp.18–19）、Review 1（課本 p.43）。"
    ],
    [
     "Tessa 指著頭說痛。哪個英文詞表示這種症狀？",
     "a headache",
     [
      "a stomachache",
      "a toothache",
      "a sore throat"
     ],
     [
      "先找出 Tessa 指的是哪一個部位。",
      "比較字裡表示身體部位的部分。",
      "回想哪個英文字是從表示頭的字開始，再接表示疼痛的部分。"
     ],
     "正確概念：head 指頭，headache 是頭痛。\n破誤：「a stomachache」：認出字尾表示痛，卻選了肚子痛；「a toothache」：把頭痛和牙齒痛記混了；「a sore throat」：看到是在說痛就選了，沒有對照疼痛的位置。\n回頭讀：Unit 2 Vocabulary（課本 pp.32–33）、Review 1（課本 p.43）。"
    ],
    [
     "Megan 想知道眼前的同學來自哪裡。她可以怎麼問？",
     "Where are you from?",
     [
      "Where is she from?",
      "Where am I from?",
      "Are you from India?"
     ],
     [
      "先分清楚 Megan 在問誰。",
      "對眼前的人說話，要用表示「你」的人稱。",
      "她想讓對方說出一個地方，要用問地點的疑問詞。"
     ],
     "正確概念：直接問對方來自哪裡時，用 Where 問地點，主詞用 you，所以是 Where are you from?\n破誤：「Where is she from?」：用 she 問另一位女生，沒有用 you 問眼前的人；「Where am I from?」：用了 I，變成在問自己來自哪裡；「Are you from India?」：直接猜一個國家，只能確認是不是來自印度。\n回頭讀：Unit 1 Sentence A（課本 p.20）、Review 1（課本 p.43）。"
    ],
    [
     "依上面的短文，有人問：「Does Eric have a fever?」哪個回答正確？",
     "No, he doesn't. He has a stomachache.",
     [
      "Yes, he does. He has a stomachache.",
      "No, he doesn't. He has a runny nose.",
      "No, he don't. He has a stomachache."
     ],
     [
      "先圈出問句裡的人名和症狀。",
      "到短文找到 Eric，看看哪一句說了他有沒有發燒。",
      "再對照同一個人的另一項症狀，檢查回答有沒有配錯人。"
     ],
     "正確概念：文中 Eric 肚子痛，沒有發燒。用 Does 問、答案是否定時，簡答用 No, he doesn't.，再補充他的症狀。\n破誤：「Yes, he does. He has a stomachache.」：找對肚子痛的資訊，卻把沒有發燒答成有發燒；「No, he doesn't. He has a runny nose.」：用對否定簡答，卻把 Leah 的症狀配給 Eric；「No, he don't. He has a stomachache.」：找對了症狀，但問句用 Does，否定簡答要用相配的形式。\n回頭讀：Review 1 Find Details（課本 pp.44–45）、Unit 2 Sentence B（課本 p.35）。",
     {
      "passage": "I'm Leah. I'm from France and my friend Eric is from the USA. I have a runny nose, but I feel OK. Eric has a stomachache. He has no fever. We are at home today. Our friend Hana is from Japan. She feels fine. She calls us after school."
     }
    ],
    [
     "哪個字的母音和 bark 的母音相同？",
     "hard",
     [
      "bird",
      "horse",
      "nurse"
     ],
     [
      "先回想 bark 中間的母音。",
      "這些字都有 r，再看緊接在 r 前面的字母。",
      "找出母音字母和 bark 相同的選項，再念一次確認。"
     ],
     "正確概念：bark 和 hard 中間都是 ar；bird 的 ir、horse 的 or、nurse 的 ur 都有不同於 ar 的讀音。\n破誤：「bird」：看到 r 就歸在同一組，忽略了 r 前面的字母；「horse」：把 or 的母音和 ar 的母音當成同一個；「nurse」：聽到 r 的聲音，就把 ur 和 ar 歸在一起。\n回頭讀：Review 1 Four in a Row（課本 p.46）、Unit 2 Phonics（課本 pp.40–41）。"
    ],
    [
     "請聽英文，選出符合內容的說法。",
     "說話的人來自加拿大。",
     [
      "說話的人來自臺灣。",
      "說話的人的朋友來自加拿大。",
      "說話的人的朋友來自澳大利亞。"
     ],
     [
      "比較兩句介紹的是不是同一個人。",
      "句首有一次在說自己，另一次則提到朋友。",
      "把每句末尾的國名配給該句的主詞，再對照選項。"
     ],
     "正確概念：第一句介紹自己來自加拿大，第二句才說朋友來自臺灣。\n破誤：「說話的人來自臺灣。」：把朋友來自的地方當成說話者自己的；「說話的人的朋友來自加拿大。」：聽到第一個國名，就配給後面提到的朋友；「說話的人的朋友來自澳大利亞。」：只聽出第二句介紹朋友，沒有比對那個國名的意思。\n回頭讀：Unit 1 Sentence A（課本 p.20）、Review 1（課本 p.43）。",
     {
      "listen": "I'm from Canada. My friend is from Taiwan.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，選出符合內容的說法。",
     "Max 喉嚨痛。",
     [
      "Max 正在發燒。",
      "Max 有在咳嗽。",
      "Grace 喉嚨痛。"
     ],
     [
      "先聽誰問問題、誰說自己不舒服。",
      "第二個問句在確認某個症狀，聽回答是同意還是否定。",
      "重聽回答者最後一句，核對最後提到的部位。"
     ],
     "正確概念：Max 說自己感冒，接著否認有發燒，最後補充自己喉嚨痛。\n破誤：「Max 正在發燒。」：聽見問句裡的症狀就選了，漏聽 Max 的否定回答；「Max 有在咳嗽。」：聽到感冒就猜他也咳嗽，但對話沒有交代；「Grace 喉嚨痛。」：聽對了最後說的症狀，卻配給發問的人。\n回頭讀：Unit 2 Sentence A、Grammar Tips（課本 pp.34、36）、Review 1（課本 p.43）。",
     {
      "listen": "Grace: What's wrong, Max? Max: I have a cold. Grace: Do you have a fever? Max: No, I don't. I have a sore throat.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en5-08",
   "z": 2,
   "name": "字彙與聽力",
   "lesson": "Unit 3",
   "intro": "食物的英文：pizza、rice、soup、steak、sandwiches、dumplings、French fries、noodles。",
   "q": [
    [
     "請聽英文，選出你聽到的食物。",
     "soup",
     [
      "steak",
      "rice",
      "noodles"
     ],
     [
      "先聽這個字有幾個音節。",
      "注意開頭的聲音，再比對每個選項的結尾。",
      "字尾是嘴唇先合起來再放開的 p 音。"
     ],
     "正確概念：念的是 soup（湯）。它以 s 的音開頭，以 p 的音收尾。\n破誤：「steak」：聽到 s 的音就選了，沒比對後面的母音和字尾；「rice」：把同一餐常一起出現的米飯和湯記混了；「noodles」：看到麵條常放在湯裡，就把兩個詞當成同一種食物。\n回頭讀：Unit 3 Vocabulary（課本 p.50）。",
     {
      "listen": "soup",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出你聽到的食物。",
     "dumplings",
     [
      "noodles",
      "sandwiches",
      "French fries"
     ],
     [
      "先聽這是一個字，還是兩個字組成的詞。",
      "幾個選項的節奏相近，試著重聽第一個音節。",
      "開頭是 d 的音，第二個音節裡聽得到 l 的音。"
     ],
     "正確概念：念的是 dumplings（水餃）。dumplings 有兩個音節，第一個音節從 d 的音開始。\n破誤：「noodles」：只依兩個音節的節奏作答，沒有聽清楚開頭；「sandwiches」：把兩種可以一個一個數的食物混在一起；「French fries」：把兩個課本裡常用複數說的食物名稱記混了。\n回頭讀：Unit 3 Vocabulary（課本 p.51）。",
     {
      "listen": "dumplings",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出最符合的中文意思。",
     "牛排",
     [
      "披薩",
      "米飯",
      "湯"
     ],
     [
      "重聽開頭，判斷第一個子音後面有沒有再接一個子音。",
      "接著比對母音，是像 day 的母音，還是像 too 的母音。",
      "這個字有 k 的尾音，想想菜單上哪道主餐的英文符合。"
     ],
     "正確概念：念的是 steak（牛排），開頭有 st 的音，中間的母音和 day 一樣，字尾是 k 的音。\n破誤：「披薩」：記得是菜單上的主餐，但把兩種食物的英文混在一起；「米飯」：把常和主餐搭配的米飯當成聽到的那一項；「湯」：只聽到開頭的 s，就以為是 soup。\n回頭讀：Unit 3 Vocabulary（課本 p.50）。",
     {
      "listen": "steak",
      "rate": 0.8
     }
    ],
    [
     "菜單上哪個英文詞表示「薯條」？",
     "French fries",
     [
      "sandwiches",
      "dumplings",
      "noodles"
     ],
     [
      "先想想薯條是用什麼食材做的。",
      "這項食物的英文名稱由兩個字組成。",
      "看看兩個字的選項中，哪一個第二個字和油炸有關。"
     ],
     "正確概念：薯條是 French fries。故事中也提到可以用馬鈴薯做薯條。\n破誤：「sandwiches」：把同一餐常出現的三明治和薯條混淆；「dumplings」：只記得是複數形式，把水餃和薯條的英文記反了；「noodles」：把外形細長的麵條和薯條混在一起。\n回頭讀：Unit 3 Story（課本 p.47）、Vocabulary（課本 p.51）。"
    ],
    [
     "食物袋裡要放米飯和湯。哪張標籤符合？",
     "rice and soup",
     [
      "rice and steak",
      "pizza and soup",
      "rice and noodles"
     ],
     [
      "先圈出題目要的兩樣食物。",
      "每個選項用 and 連起兩樣食物，分開看。",
      "含有米飯的選項有好幾張，再核對後面那樣是不是湯。"
     ],
     "正確概念：rice 是米飯，soup 是湯；標籤要同時有這兩樣食物。\n破誤：「rice and steak」：找對米飯，但把湯換成了牛排；「pizza and soup」：找對湯，但把米飯換成了披薩；「rice and noodles」：把麵條當成要裝的湯，忽略兩者是不同食物。\n回頭讀：Unit 3 Vocabulary（課本 pp.50–51）。"
    ],
    [
     "請聽英文句子，選出符合內容的中文。",
     "我想要一些披薩和麵條。",
     [
      "我想要一些披薩和水餃。",
      "我想要一些三明治和麵條。",
      "我想要一些牛排和米飯。"
     ],
     [
      "先聽說話的人想要幾樣食物。",
      "可以在連接兩樣食物的地方停一下，分別聽兩邊。",
      "聽聽哪個詞在後面，它指的是長條狀的食物。"
     ],
     "正確概念：說話的人用 I'd like …, please. 點餐，and 前的 pizza 是披薩，後面的 noodles 是麵條。\n破誤：「我想要一些披薩和水餃。」：第一樣聽對，卻把第二樣食物記成水餃；「我想要一些三明治和麵條。」：第二樣聽對，卻把第一樣食物記成三明治；「我想要一些牛排和米飯。」：只聽懂是在點餐，就用自己熟悉的餐點猜測。\n回頭讀：Unit 3 Vocabulary（課本 pp.50–51）、Sentence A（課本 p.52）。",
     {
      "listen": "I'd like some pizza and noodles, please.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，選出客人真正點的餐點。",
     "米飯和牛排。",
     [
      "米飯和一碗湯。",
      "牛排和一碗湯。",
      "披薩和牛排。"
     ],
     [
      "先聽誰在推薦、誰在點餐。",
      "聽客人怎麼回答第一個問句，再聽他接下來說的內容。",
      "客人另點了兩樣，找他表示自己想要的那一句。"
     ],
     "正確概念：Luke 先婉拒了湯，接著點 rice 和 steak，也就是米飯和牛排。\n破誤：「米飯和一碗湯。」：把被拒絕的湯和點到的米飯拼在一起；「牛排和一碗湯。」：聽到牛排就停了，沒有確認湯已被拒絕；「披薩和牛排。」：聽對牛排，但把 rice 記成披薩。\n回頭讀：Unit 3 Sentence A／B（課本 pp.52–53）。",
     {
      "listen": "Alma: Would you like some soup, Luke? Luke: No, thank you. I'd like some rice and steak. Alma: Here you are.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en5-09",
   "z": 2,
   "name": "句型與文法",
   "lesson": "Unit 3",
   "intro": "What would you like to eat? I'd like some dumplings, please. Would you like some sandwiches? Yes, please. / No, thank you.",
   "q": [
    [
     "選出正確的答案填入空格：「I would ____ some rice, please.」",
     "like",
     [
      "likes",
      "liked",
      "liking"
     ],
     [
      "先看空格前面是哪一個字。",
      "把這句和課本點餐時的 I'd 開頭相比。",
      "I'd 在這裡是 I would 的縮寫，想想後面的動詞需要變化嗎？"
     ],
     "正確概念：I'd 是 I would 的縮寫。would 後用 like 的原形，所以填 like。\n破誤：「likes」：把一般現在式常看到的 s 加在 would 後面的動詞上；「liked」：把 would 後面的動詞寫成了過去式；「liking」：把表示正在進行的動詞形式用在 would 後面。\n回頭讀：Unit 3 Sentence A（課本 p.52）。"
    ],
    [
     "填入正確的疑問詞。\nA: ____ would you like to eat?\nB: I'd like some noodles, please.",
     "What",
     [
      "Where",
      "When",
      "Who"
     ],
     [
      "先看 B 回答的是哪一類資訊。",
      "B 告訴對方自己想吃的餐點。",
      "要問餐點是什麼，就挑能問事物的疑問詞。"
     ],
     "正確概念：B 說自己想吃麵條，因此 A 要用 What 問對方想吃什麼。\n破誤：「Where」：用了問地點的字，但回答說的是餐點；「When」：用了問時間的字，但回答沒有時間；「Who」：用了問人的字，但回答沒有提到任何人。\n回頭讀：Unit 3 Sentence A（課本 p.52）、Reading Skills（課本 p.10）。"
    ],
    [
     "有人問 Isla：「Would you like some soup?」Isla 想婉拒，可以怎麼回答？",
     "No, thank you.",
     [
      "Yes, please.",
      "Yes, thank you.",
      "I'd like some, please."
     ],
     [
      "先確認 Isla 想接受還是婉拒。",
      "留意每句開頭是在接受或拒絕，也看看完整句子的意思。",
      "婉拒之後仍可以謝謝對方，檢查開頭和後半是否都符合。"
     ],
     "正確概念：No 表示婉拒，thank you 向對方道謝，所以 No, thank you. 符合 Isla 的意思。\n破誤：「Yes, please.」：這是在禮貌接受對方提供的湯；「Yes, thank you.」：只注意到 thank you，忽略 Yes 表示接受；「I'd like some, please.」：用了禮貌點餐的句子，表達的是想要喝湯。\n回頭讀：Unit 3 Sentence B（課本 p.53）。"
    ],
    [
     "下面哪個英文問句寫得完全正確？",
     "Would you like some steak?",
     [
      "Would you like eat some steak?",
      "What you would like to eat?",
      "Would you like some a steak?"
     ],
     [
      "分別看每句的問句開頭和後面接的字。",
      "問對方時，would 放在 you 前面。",
      "再看 like 後面，直接接食物就可以表達想不想吃。"
     ],
     "正確概念：Would you like some steak? 用 Would you like 開頭，後面直接接 some steak。\n破誤：「Would you like eat some steak?」：在 like 後接 eat 時，漏掉了 to；「What you would like to eat?」：把問句的 would 放在 you 後面，沿用了直述句的順序；「Would you like some a steak?」：把 some 和 a 疊在同一個食物名稱之前。\n回頭讀：Unit 3 Sentence A／B（課本 pp.52–53）、Grammar Tips（課本 p.54）。"
    ],
    [
     "Molly 說她想吃幾個三明治。選出正確的答案填入空格：「I'd like some ____, please.」",
     "sandwiches",
     [
      "sandwich",
      "a sandwich",
      "sandwichs"
     ],
     [
      "先看 Molly 想吃一個還是幾個。",
      "課本用 some 加可數名詞的複數表示有幾個。",
      "這個食物名稱以 ch 結尾，再想想要加 s 還是 es。"
     ],
     "正確概念：三明治可以一個一個數。sandwich 的複數是 sandwiches，所以用 some sandwiches。\n破誤：「sandwich」：用單數來表示題目中的幾個三明治；「a sandwich」：用了表示一個的 a，還和空格前的 some 重疊；「sandwichs」：知道要改複數，但在 ch 後只加了 s。\n回頭讀：Unit 3 Vocabulary（課本 p.51）、Grammar Tips（課本 p.54）。"
    ],
    [
     "請聽英文問句，選出最合適的回答。",
     "I'd like some dumplings, please.",
     [
      "Yes, I'd like to eat, thank you.",
      "Would you like some dumplings?",
      "She'd like some dumplings, please."
     ],
     [
      "先聽這個問句是直接問人，還是在談不在場的人。",
      "聽問句開頭，判斷要選餐點，還是只回答要或不要。",
      "直接被問到的人用自己的角度回答，並說出想吃的餐點。"
     ],
     "正確概念：問句直接問 Iris 想吃什麼。Iris 要用 I'd like 加上食物回答。\n破誤：「Yes, I'd like to eat, thank you.」：只表示想吃東西，沒有回答想吃什麼；「Would you like some dumplings?」：反過來問別人要不要吃，沒有說自己想吃什麼；「She'd like some dumplings, please.」：Iris 被直接問到，回答自己想吃的東西時要用 I。\n回頭讀：Unit 3 Sentence A（課本 p.52）。",
     {
      "listen": "What would you like to eat, Iris?",
      "rate": 0.9
     }
    ],
    [
     "依上表，問選項開頭的那位同學時，哪一組問答符合他的選擇？",
     "Mira：Would you like some soup? — No, thank you.",
     [
      "Mira：Would you like some noodles? — No, thank you.",
      "Hugo：Would you like some rice? — No, thank you.",
      "Hugo：Would you like some pizza? — Yes, please."
     ],
     [
      "先對照各選項指定要問的同學。",
      "在同一列找問句中的食物，確認在哪一欄。",
      "想吃就接受，不想吃就婉拒；再核對選項兩句有沒有配對。"
     ],
     "正確概念：Mira 不想吃的是湯，所以問她要不要湯時，回答 No, thank you.。每個選項前的人名標示被問的人。\n破誤：「Mira：Would you like some noodles? — No, thank you.」：Mira 想吃麵條，回答應該是接受；「Hugo：Would you like some rice? — No, thank you.」：Hugo 想吃米飯，卻被寫成婉拒；「Hugo：Would you like some pizza? — Yes, please.」：把 Hugo 不想吃的食物當成想吃的。\n回頭讀：Unit 3 Sentence B（課本 p.53）。",
     {
      "t": [
       [
        "姓名",
        "想吃",
        "不想吃"
       ],
       [
        "Mira",
        "noodles",
        "soup"
       ],
       [
        "Hugo",
        "rice",
        "pizza"
       ]
      ],
      "cap": "兩位同學的選擇"
     }
    ]
   ]
  },
  {
   "id": "en5-10",
   "z": 2,
   "name": "發音與閱讀",
   "lesson": "Unit 3",
   "intro": "oi、oy 的念法；照順序讀懂步驟（Sequence），再回想從農場到餐桌的故事。",
   "q": [
    [
     "請聽英文單字，選出這個字的拼法裡有哪一組字母。",
     "oi",
     [
      "ai",
      "ar",
      "ee"
     ],
     [
      "先聽這個字中間的母音。",
      "它的聲音會滑動，和 sail 的母音比一比。",
      "回想土壤那個拼讀字，兩個字的母音相同，也用同一組字母。"
     ],
     "正確概念：念的是 noise。它和 soil 的母音相同，都是用 oi 來拼。\n破誤：「ai」：把滑動的母音聽成 sail 裡的母音；「ar」：套用了前一單元 car 的母音；「ee」：只注意母音末端，誤以為整段都像長音 e。\n回頭讀：Unit 3 Phonics Sound It Out（課本 p.58）。",
     {
      "listen": "noise",
      "rate": 0.8
     }
    ],
    [
     "哪一個字的母音念法和其他三個不同？可以點喇叭聽。",
     "corn",
     [
      "soil",
      "boy",
      "toy"
     ],
     [
      "把四個字各聽一次。",
      "先不管開頭的子音，只聽後面的母音；oi 和 oy 的念法一樣。",
      "有三個字的母音和「玩具」那個英文字相同，找出剩下的字。"
     ],
     "正確概念：soil 的 oi 和 boy、toy 的 oy 念法一樣；corn 的 or 是 Unit 2 學的另一個母音，和其他三個不同。\n破誤：「soil」：soil 拼 oi、boy 和 toy 拼 oy，看到拼法不同就以為念法不同；「boy」：把開頭的 b 當成判斷依據，沒比較母音；「toy」：只注意開頭的 t 和別的字不一樣，沒比較母音。\n回頭讀：Unit 3 Phonics（課本 pp.58–59）、Unit 2 Phonics（課本 pp.40–41）。",
     {
      "speakOptions": true
     }
    ],
    [
     "哪一個字的母音和 boy 的母音相同？",
     "soil",
     [
      "sail",
      "corn",
      "paint"
     ],
     [
      "先念一下 boy，再念選項。",
      "找選項中用來表示母音的字母組合。",
      "回想本課教了兩種拼法來表示 boy 的母音，比比哪個選項用了另一種。"
     ],
     "正確概念：soil 用 oi，boy 用 oy，這兩組在本課例字裡念法相同。\n破誤：「sail」：只看到 s 和 l 相同，就把 ai 和 oi 的母音混在一起；「corn」：看到中間有 o，就以為和 boy 相同，忽略了後面的 r；「paint」：把 ai 的念法當成 boy 裡 oy 的念法。\n回頭讀：Unit 3 Phonics（課本 pp.58–59）。"
    ],
    [
     "請聽英文，選出你聽到的單字。",
     "coin",
     [
      "point",
      "soil",
      "toy"
     ],
     [
      "先聽母音在哪裡，再把注意力放到它前後。",
      "這幾個字的母音相同，要靠開頭和結尾分辨。",
      "再重聽結尾，辨認是 n 單獨收尾，還是另有一個子音。"
     ],
     "正確概念：念的是 coin。開頭是 k 的音，結尾是 n 的音。point 還有 t 的尾音；soil 用 l 收尾，toy 沒有子音收尾。\n破誤：「point」：聽出相同的母音，卻沒有辨認開頭及結尾的子音；「soil」：聽出 oi，就選了另一個帶同組母音的字；「toy」：母音相同，但聽漏了最後的子音。\n回頭讀：Unit 3 Phonics（課本 pp.58–59）。",
     {
      "listen": "coin",
      "rate": 0.8
     }
    ],
    [
     "依上面的短文，Ava 切的是哪種水果？",
     "她切的是蘋果。",
     [
      "她切的是葡萄。",
      "她切的是香蕉。",
      "她切的是番茄。"
     ],
     [
      "先找 Ava 的名字。",
      "兩人一起洗水果，但有一個動作是 Ava 自己做的。",
      "找出表示切的動詞，讀出它後面那種水果。"
     ],
     "正確概念：Next, Ava cuts the apples. 表示 Ava 切了蘋果。葡萄也洗過，但文中沒有說她切了葡萄。\n破誤：「她切的是葡萄。」：兩種水果都洗了，誤以為葡萄是後來切的那種；「她切的是香蕉。」：依照自己做水果碗的習慣猜了文中沒提的水果；「她切的是番茄。」：把課本比薩短文的食材帶入了這篇文章。\n回頭讀：Unit 3 Reading（課本 pp.55–57）。",
     {
      "passage": "Ava and her sister want to make a fruit bowl. First, they wash the apples and grapes. Next, Ava cuts the apples. Then, her sister puts the apples and grapes in a big bowl. Finally, they put the bowl on the table. Their friends are ready to eat. The fruit looks good!"
     }
    ],
    [
     "依上面的短文，水果放入碗裡之後，緊接著的下一個步驟是什麼？",
     "她們把碗放到桌上。",
     [
      "她們一起洗兩種水果。",
      "Ava 把蘋果切好。",
      "Ava 的姊妹把水果裝進碗。"
     ],
     [
      "找出 First、Next 和 Then，順著看每一步。",
      "先定位「水果放入碗裡」是哪一步。",
      "接著往後看，找出 Finally 標示的最後一個步驟。"
     ],
     "正確概念：Then 標示把水果放入碗中。接著 Finally 標示最後一個步驟：兩人把碗放上桌。\n破誤：「她們一起洗兩種水果。」：跳回 First，選了第一個步驟；「Ava 把蘋果切好。」：看見 Next 就選了，其實那是裝碗前的動作；「Ava 的姊妹把水果裝進碗。」：選到題目指定的步驟本身。\n回頭讀：Reading Skills：Sequence（課本 p.11）、Unit 3 Reading（課本 pp.55–57）。",
     {
      "passage": "Ava and her sister want to make a fruit bowl. First, they wash the apples and grapes. Next, Ava cuts the apples. Then, her sister puts the apples and grapes in a big bowl. Finally, they put the bowl on the table. Their friends are ready to eat. The fruit looks good!"
     }
    ],
    [
     "Unit 3 故事一開始在農場時，有人說可以用馬鈴薯做成哪樣食物？",
     "可以做成薯條。",
     [
      "可以做成披薩。",
      "可以做成三明治。",
      "可以做成牛排。"
     ],
     [
      "回想剛到農場時，大家說到了哪些食材。",
      "找出有提到馬鈴薯的那一格。",
      "說話的人先說喜歡馬鈴薯，下一句才說能把它做成什麼。"
     ],
     "正確概念：故事在農場提到有人喜歡馬鈴薯，並說可以做成薯條。披薩和三明治在後面才提到。\n破誤：「可以做成披薩。」：披薩是另一個人接著說想做的食物；「可以做成三明治。」：三明治有出現在準備餐點時，但不是這句用馬鈴薯做的食物；「可以做成牛排。」：把本單元字彙表的另一種餐點當成農場裡說到的食物。\n回頭讀：Unit 3 Story（課本 pp.47–48）。"
    ]
   ]
  },
  {
   "id": "en5-11",
   "z": 3,
   "name": "字彙與聽力",
   "lesson": "Unit 4",
   "intro": "一天的作息：get up、have breakfast、go to school、have lunch、go home、do my homework、have dinner、go to bed。",
   "q": [
    [
     "請聽英文，選出你聽到的作息。",
     "go to bed",
     [
      "go to school",
      "go home",
      "get up"
     ],
     [
      "先數一數聽見幾個字。",
      "有些選項從相同的字開始，再聽最後一個字。",
      "最後一個字以 b 的音開頭。"
     ],
     "正確概念：念的是 go to bed（上床睡覺）。前兩個字和 go to school 相同，最後一個字是 bed。\n破誤：「go to school」：開頭兩個字一樣，沒有聽清楚最後一個字；「go home」：只聽見 go，就猜是回家；「get up」：把睡前和起床的作息記反了。\n回頭讀：Unit 4 Vocabulary（課本 pp.64–65）。",
     {
      "listen": "go to bed",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出你聽到的作息。",
     "do my homework",
     [
      "go home",
      "have breakfast",
      "go to school"
     ],
     [
      "先比較開頭的動詞。",
      "再聽有沒有表示「我的」的字。",
      "最後一個字有兩個音節，第二個音節和「工作」的英文同音。"
     ],
     "正確概念：念的是 do my homework（做我的功課）。homework 是一個有兩個音節的字。\n破誤：「go home」：聽見 home 的聲音就作答，漏聽連在後面的部分；「have breakfast」：只認出這是在說自己的作息，就選了另一個常見詞；「go to school」：把和學校有關的兩種作息混在一起。\n回頭讀：Unit 4 Vocabulary（課本 pp.64–65）。",
     {
      "listen": "do my homework",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出最符合的中文意思。",
     "吃晚餐",
     [
      "吃早餐",
      "吃午餐",
      "去上學"
     ],
     [
      "先分辨是吃飯，還是要去某個地方。",
      "分辨三餐要聽動詞後面是哪個字。",
      "後面的字有兩個音節，第一個音節以 d 開頭。"
     ],
     "正確概念：念的是 have dinner（吃晚餐）。三餐都可以用 have，後面的 dinner 指晚餐。\n破誤：「吃早餐」：聽見 have 就套用了早餐的詞；「吃午餐」：三餐都用 have，沒有聽清楚是哪一餐；「去上學」：把吃飯的作息換成同一單元的另一種作息。\n回頭讀：Unit 4 Vocabulary（課本 pp.64–65）。",
     {
      "listen": "have dinner",
      "rate": 0.8
     }
    ],
    [
     "「去上學」的英文是哪一個？",
     "go to school",
     [
      "go to bed",
      "go home",
      "do my homework"
     ],
     [
      "想想「去上學」描述的是什麼動作。",
      "表示去的選項有好幾個，留意最後是哪個地方。",
      "選一個詞，讓最後一個字指向上課的地方。"
     ],
     "正確概念：go to school 是去上學。school 指學校。\n破誤：「go to bed」：看到 go to 就選了，沒有比對要去的地方；「go home」：把去學校和從學校回家的方向弄反了；「do my homework」：把去上學和在家做功課當成同一件事。\n回頭讀：Unit 4 Vocabulary（課本 pp.64–65）。"
    ],
    [
     "Luna 早上起床後準備吃今天的第一餐。她要做什麼？",
     "She has breakfast.",
     [
      "She has lunch.",
      "She has dinner.",
      "She goes to school."
     ],
     [
      "找出 Luna 現在要做的事。",
      "她準備吃東西，留意是在說哪一餐。",
      "回想通常在起床後吃的那一餐，和午餐、晚餐分開。"
     ],
     "正確概念：Luna 準備吃早餐。have breakfast 表示吃早餐，主詞是 she 時用 has。\n破誤：「She has lunch.」：知道是吃飯，卻把早餐選成午餐；「She has dinner.」：知道是吃飯，卻把第一餐和晚餐記反；「She goes to school.」：想到起床後也要上學，沒有注意她正在準備吃東西。\n回頭讀：Unit 4 Vocabulary（課本 pp.64–65）、Grammar Tips（課本 p.68）。"
    ],
    [
     "請聽英文句子，選出符合內容的中文。",
     "我四點二十分回家。",
     [
      "我四點十二分回家。",
      "我四點二十分去上學。",
      "我四點四十分回家。"
     ],
     [
      "先找出句子提到的活動。",
      "再聽表示時間的部分，分出小時和分鐘。",
      "分鐘的英文有兩個音節，比對它的開頭和最後一拍。"
     ],
     "正確概念：go home 表示回家，four twenty 是四點二十分。twenty 是二十。\n破誤：「我四點十二分回家。」：辨認出回家，卻把 twenty 聽成 twelve；「我四點二十分去上學。」：時間聽對了，但把回家和去上學記反；「我四點四十分回家。」：聽對小時和作息，但把分鐘記成 forty。\n回頭讀：Unit 4 Vocabulary（課本 p.65）、Sentence A（課本 p.66）。",
     {
      "listen": "I go home at four twenty.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，選出符合內容的說法。",
     "Josh 十二點十分吃午餐。",
     [
      "Josh 十一點半吃午餐。",
      "Josh 十二點十分吃晚餐。",
      "Josh 六點四十分吃午餐。"
     ],
     [
      "先聽提到了哪幾餐。",
      "有人先問一個時間，留意回答有沒有同意。",
      "重聽回答的人否定後的第一句，把時間和那一餐配在一起。"
     ],
     "正確概念：Josh 否認十一點半吃午餐，接著說十二點十分吃午餐、六點四十分吃晚餐。\n破誤：「Josh 十一點半吃午餐。」：把問句的時間當成回答，漏聽 Josh 的否定；「Josh 十二點十分吃晚餐。」：時間聽對了，卻配給另一餐；「Josh 六點四十分吃午餐。」：把晚餐時間記成午餐時間。\n回頭讀：Unit 4 Sentence A／B（課本 pp.66–67）。",
     {
      "listen": "Dora: Do you have lunch at eleven thirty, Josh? Josh: No, I don't. I have lunch at twelve ten. I have dinner at six forty.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en5-12",
   "z": 3,
   "name": "句型與文法",
   "lesson": "Unit 4",
   "intro": "What time do you get up? I get up at six thirty. Do you have lunch at twelve? Yes, I do. / No, I don't.",
   "q": [
    [
     "選出正確的答案填入空格：「Gianna ____ to school at seven forty.」",
     "goes",
     [
      "go",
      "gos",
      "going"
     ],
     [
      "先圈出主詞，看看是幾個人。",
      "把 Gianna 換成 she，再看空格後面的 to school。",
      "回想 go 在課本的動詞表中，接在 she 後面是哪個形式。"
     ],
     "正確概念：Gianna 是單數主詞。go to school 接在她後面時，go 要變成 goes。\n破誤：「go」：把 I go to school 的 go 原封不動地用在人名後面；「gos」：知道第三人稱動詞要變，卻只在 go 後加 s；「going」：把表示正在進行的動詞形式直接放到主詞後面。\n回頭讀：Unit 4 Vocabulary（課本 p.64）、Grammar Tips（課本 p.68）。"
    ],
    [
     "選出正確的答案填入空格。\nA: What ____ do they get up?\nB: They get up at six forty-five.",
     "time",
     [
      "day",
      "place",
      "month"
     ],
     [
      "先看 B 回答什麼。",
      "B 用 at 加上鐘面上的時間。",
      "挑出能和 What 合起來問「幾點」的字。"
     ],
     "正確概念：回答是六點四十五分，問句要用 What time，詢問做這件事的時間。\n破誤：「day」：把問幾點當成問哪一天；「place」：把精確到幾點的回答當成在問地點；「month」：知道是在問時間，卻用了問月份的字。\n回頭讀：Unit 4 Sentence A（課本 p.66）、Grammar Tips（課本 p.68）。"
    ],
    [
     "Serena 早餐是七點二十分吃的。有人直接問她：「Do you have breakfast at seven?」她怎麼回答最合適？",
     "No, I don't. I have breakfast at seven twenty.",
     [
      "Yes, I do. I have breakfast at seven twenty.",
      "No, I don't. I have breakfast at seven o'clock.",
      "No, she doesn't. She has breakfast at seven twenty."
     ],
     [
      "先比較題目給的時間和問句裡的時間。",
      "問的是不是同一個時間？先決定要肯定還是否定。",
      "如果是回答自己的作息，還要檢查人稱和補充的時間。"
     ],
     "正確概念：兩個時間不同，所以 Serena 要用 No, I don't. 回答，再說自己七點二十分吃早餐。\n破誤：「Yes, I do. I have breakfast at seven twenty.」：時間寫對了，前面卻答 Yes，等於先說自己七點吃早餐；「No, I don't. I have breakfast at seven o'clock.」：知道要否定，但把問句的時間搬到補充說明；「No, she doesn't. She has breakfast at seven twenty.」：Serena 在回答自己的作息，要用 I，不能用 she 來代替自己。\n回頭讀：Unit 4 Sentence A／B（課本 pp.66–67）。"
    ],
    [
     "下面哪一個英文問句寫得完全正確？",
     "What time does Adrian have dinner?",
     [
      "What time do Adrian have dinner?",
      "What time does Adrian has dinner?",
      "What time Adrian does have dinner?"
     ],
     [
      "每句都先看疑問詞後面接了什麼。",
      "Adrian 是單數人名，回想他要和哪個助動詞一起用。",
      "再檢查助動詞放在哪裡，以及後面的主要動詞是不是原形。"
     ],
     "正確概念：What time 後先接 does，再接 Adrian 和原形 have，才能問 Adrian 幾點吃晚餐。\n破誤：「What time do Adrian have dinner?」：把問 you 時用的 do 套到單數人名上；「What time does Adrian has dinner?」：動詞已經用 does 配合主詞，卻又把 have 改成了 has；「What time Adrian does have dinner?」：把主詞放在 does 前面，沒有用問句的順序。\n回頭讀：Unit 4 Grammar Tips（課本 p.68）。"
    ],
    [
     "兩個空格應依序填什麼？\nTheo ____ his homework at five.\nWe ____ our homework at four.",
     "does／do",
     [
      "do／does",
      "does／does",
      "do／do"
     ],
     [
      "找出每句各自在說誰。",
      "Theo 是另一個人，We 是「我們」。",
      "分別想一想課本裡 he 和 we 要用哪一種動詞形式。"
     ],
     "正確概念：Theo 是單數人名，用 does；we 表示我們，用 do。兩個空格都指「做」功課。\n破誤：「do／does」：把跟人名配對和跟 we 配對的動詞形式互換了；「does／does」：第一句用對了，第二句卻跟著用同一個動詞形式；「do／do」：把 do 原形直接用在兩個不同的主詞後面。\n回頭讀：Unit 4 Vocabulary（課本 p.65）、Grammar Tips（課本 p.68）。"
    ],
    [
     "請聽英文問句，選出最合適的回答。",
     "I go to bed at nine fifteen.",
     [
      "I get up at nine fifteen.",
      "She goes to bed at nine fifteen.",
      "I go to bed in my room."
     ],
     [
      "先聽這是在直接問誰。",
      "聽問句是在確認某件事，還是在問做那件事的時間。",
      "被問到的人要用自己的角度回答，並核對回答的是同一項作息。"
     ],
     "正確概念：問句直接問 Celia 幾點上床睡覺。Celia 用 I go to bed 加上時間回答。\n破誤：「I get up at nine fifteen.」：聽出是在問時間，卻把睡覺時間和起床時間混在一起；「She goes to bed at nine fifteen.」：聽見人名後就用 she，沒有注意 Celia 是被直接問的人；「I go to bed in my room.」：回答了睡覺的地點，沒說幾點睡。\n回頭讀：Unit 4 Vocabulary（課本 p.65）、Sentence A（課本 p.66）。",
     {
      "listen": "What time do you go to bed, Celia?",
      "rate": 0.9
     }
    ],
    [
     "依上表，向 Erin 問她自己的作息，哪一組問答符合紀錄？",
     "Do you go home at four twenty-five? — Yes, I do.",
     [
      "Do you get up at six fifteen? — No, I don't.",
      "Do you have dinner at six thirty? — Yes, I do.",
      "Do you go home at four twenty-five? — Yes, she does."
     ],
     [
      "先把每一題問的作息對到表格左欄。",
      "再看右欄的時間和問句是否一致。",
      "時間相符要肯定，最後檢查回答是誰在說自己的作息。"
     ],
     "正確概念：表上 Erin 四點二十五分回家。問她是不是這個時間時，她用 Yes, I do. 回答。\n破誤：「Do you get up at six fifteen? — No, I don't.」：起床時間和表格相同，卻用了否定簡答；「Do you have dinner at six thirty? — Yes, I do.」：把晚餐時間六點十分看成六點半；「Do you go home at four twenty-five? — Yes, she does.」：問句直接問 Erin，她應用 I 回答自己的作息。\n回頭讀：Unit 4 Sentence B（課本 p.67）。",
     {
      "t": [
       [
        "活動",
        "時間"
       ],
       [
        "get up",
        "6:15 AM"
       ],
       [
        "go home",
        "4:25 PM"
       ],
       [
        "have dinner",
        "6:10 PM"
       ]
      ],
      "cap": "Erin 的作息表"
     }
    ]
   ]
  },
  {
   "id": "en5-13",
   "z": 3,
   "name": "發音與閱讀",
   "lesson": "Unit 4",
   "intro": "ou、ow 的念法；找出問題和解決方法（Problem and Solution），再回想早上那通電話的故事。",
   "q": [
    [
     "請聽英文單字，選出這個字的拼法裡有哪一組字母。",
     "ou",
     [
      "oi",
      "oa",
      "ar"
     ],
     [
      "先把注意力放在單字中間的母音。",
      "比較它和 coin 中間的聲音如何滑動。",
      "回想表示房子的拼讀字，母音和這個字相同，也用同一組字母。"
     ],
     "正確概念：念的是 shout。它和 house 中間的母音相同，都用 ou 拼。\n破誤：「oi」：聽到滑動的母音就認作上一課 coin 的母音；「oa」：把聲音聽成 coach 裡的母音；「ar」：只注意起頭較開的母音，忽略聲音後面的變化。\n回頭讀：Unit 4 Phonics Sound It Out（課本 p.72）。",
     {
      "listen": "shout",
      "rate": 0.8
     }
    ],
    [
     "哪一個字的母音念法和其他三個不同？可以點喇叭聽。",
     "horse",
     [
      "house",
      "mouse",
      "clown"
     ],
     [
      "輪流點播，注意每個字的母音。",
      "有些字即使拼法不同，中間母音還是相同。",
      "先把母音和「老鼠」的英文字相同的放一起，再找剩下的字。"
     ],
     "正確概念：house、mouse 的 ou 和 clown 的 ow 念法一樣；horse 的 or 是 Unit 2 學的另一個母音，和其他三個不同。\n破誤：「house」：house 和 horse 拼法只差一個字母，看起來很像，就以為念法也一樣；「mouse」：注意到開頭是 m，卻把子音的差異當成母音不同；「clown」：因為它有 ow，就以為它的母音一定和有 ou 的字不同。\n回頭讀：Unit 4 Phonics（課本 pp.72–73）、Unit 2 Phonics（課本 pp.40–41）。",
     {
      "speakOptions": true
     }
    ],
    [
     "哪個字的母音和 mouse 的母音相同？",
     "owl",
     [
      "coach",
      "coin",
      "load"
     ],
     [
      "先念 mouse，注意母音怎麼滑動。",
      "找出選項裡可能代表母音的兩個字母。",
      "回想本課哪一組拼法和 mouse 裡的 ou 念法相同。"
     ],
     "正確概念：owl 的 ow 和 mouse 的 ou 在本課念法相同。coach 和 load 的 oa、coin 的 oi 都是不同的母音。\n破誤：「coach」：只注意拼法有 o，沒分辨 oa 和 ou；「coin」：把前一單元的 oi 聲音混成 ou；「load」：看到 oa 的第一個字母和 ou 一樣，就當成同音。\n回頭讀：Unit 4 Phonics（課本 pp.72–73）、Unit 3 Phonics（課本 p.58）。"
    ],
    [
     "請聽英文，選出你聽到的單字。",
     "shower",
     [
      "shout",
      "house",
      "clown"
     ],
     [
      "先聽開頭有沒有像 sh 的聲音。",
      "再聽母音和 clown 的 ow 一不一樣。",
      "比一比開頭相同的字，重聽結尾是 t 的音，還是像 her 的 er 音。"
     ],
     "正確概念：念的是 shower，開頭是 sh，結尾是像 her 的 er 音。shout 有相同的開頭和母音，但結尾是 t 的音。\n破誤：「shout」：開頭和母音相同，但沒有留意結尾的音；「house」：只聽到相同的母音，沒比對開頭和結尾；「clown」：抓到相同的母音，就選了另一個帶 ow 的字。\n回頭讀：Unit 4 Phonics Sound It Out（課本 p.72）。",
     {
      "listen": "shower",
      "rate": 0.8
     }
    ],
    [
     "依上面的短文，Lydia 希望幾點上床睡覺？",
     "她希望九點半上床。",
     [
      "她希望八點半上床。",
      "她希望九點整上床。",
      "她希望十點半上床。"
     ],
     [
      "先定位短文在說什麼作息。",
      "找出說 Lydia 自己希望怎麼做的句子。",
      "讀出那句 at 後面的兩個數字，注意小時和分鐘。"
     ],
     "正確概念：短文說 She wants to go to bed at nine thirty.。nine thirty 是九點三十分。\n破誤：「她希望八點半上床。」：讀到分鐘是三十分，卻把小時看錯了；「她希望九點整上床。」：看見 nine 就作答，漏讀後面的分鐘；「她希望十點半上床。」：把課本課文裡的目標時間帶入這篇短文。\n回頭讀：Unit 4 Reading（課本 pp.69–71）、Sentence A（課本 p.66）。",
     {
      "passage": "Lydia goes to bed late. She wants to go to bed at nine thirty. She plays with her toys after dinner, so she starts her homework late. Now she does her homework before dinner. After dinner, she puts her books in her bag and gets ready for bed. Her new plan helps her go to bed on time."
     }
    ],
    [
     "依上面的短文，為了解決太晚開始寫功課的問題，Lydia 改成怎麼做？",
     "改在晚餐前寫功課。",
     [
      "改在晚餐後玩玩具。",
      "改在晚餐後寫功課。",
      "晚餐前先把書放進書包。"
     ],
     [
      "找出她原先太晚寫功課的原因。",
      "接著找 Now，它帶出和原先不同的做法。",
      "看新計畫裡寫功課和吃晚餐的先後順序。"
     ],
     "正確概念：Lydia 原先晚餐後玩玩具，所以很晚才開始寫功課。她的新辦法是把寫功課移到晚餐前。\n破誤：「改在晚餐後玩玩具。」：把使她晚寫功課的舊習慣當成新方法；「改在晚餐後寫功課。」：知道計畫改了寫功課的時段，卻看反 before 和 after；「晚餐前先把書放進書包。」：把整理書包的安排當成處理功課的辦法，還把它放錯時間。\n回頭讀：Reading Skills：Problem and Solution（課本 p.11）、Unit 4 Reading（課本 pp.69–71）。",
     {
      "passage": "Lydia goes to bed late. She wants to go to bed at nine thirty. She plays with her toys after dinner, so she starts her homework late. Now she does her homework before dinner. After dinner, she puts her books in her bag and gets ready for bed. Her new plan helps her go to bed on time."
     }
    ],
    [
     "Unit 4 的故事裡，Amy 和 Boka 約好幾點在公園見？",
     "早上七點半。",
     [
      "早上六點半。",
      "早上八點整。",
      "早上六點整。"
     ],
     [
      "故事提到好幾個時間，先分開起床、打電話和見面的時間。",
      "找出 Amy 接完電話後答應見面的那一格。",
      "留意她在提到公園之後說的時間。"
     ],
     "正確概念：Amy 在掛電話前約 Boka 七點半到公園。六點半是通話時的時間；八點和六點分別是兩人提到的起床時間。\n破誤：「早上六點半。」：把 Boka 打電話時的時間當成約見面的時間；「早上八點整。」：把 Amy 平常週末起床的時間當成約見面的時間；「早上六點整。」：把 Boka 平常起床的時間當成約見面的時間。\n回頭讀：Unit 4 Story（課本 pp.61–63）。"
    ]
   ]
  },
  {
   "id": "en5-14",
   "z": 3,
   "name": "綜合複習",
   "lesson": "Review 2",
   "intro": "Unit 3～4 一起複習：食物、點餐的說法、一天的作息和時間。",
   "q": [
    [
     "菜單上哪一項是「麵條」？",
     "noodles",
     [
      "French fries",
      "dumplings",
      "sandwiches"
     ],
     [
      "先想想麵條是哪一類食物。",
      "把每個選項和課本的食物圖片配對。",
      "先刪掉油炸的、包餡的和夾麵包的，剩下的就是一碗一碗吃的那一種。"
     ],
     "正確概念：noodles 是麵條；French fries 是薯條、dumplings 是水餃、sandwiches 是三明治。\n破誤：「French fries」：把兩種細長的食物名稱記反了；「dumplings」：認出是菜單上的複數食物名稱，卻把麵條認成水餃；「sandwiches」：把三明治和麵條的英文記混了。\n回頭讀：Unit 3 Vocabulary（課本 p.51）、Review 2（課本 p.75）。"
    ],
    [
     "Gwen 說她晚餐後會完成老師布置的功課。選出符合她意思的片語填入空格：「I ____ after dinner.」",
     "do my homework",
     [
      "go to bed",
      "go to school",
      "have breakfast"
     ],
     [
      "先圈出 Gwen 要做的事。",
      "有些作息也在晚間，還要看她那時要完成什麼。",
      "找一個表示「完成自己的作業」的作息片語。"
     ],
     "正確概念：do my homework 是做我的功課。after dinner 說的是她做功課的時間。\n破誤：「go to bed」：想到晚餐過後也會睡覺，卻忽略她說要完成老師布置的事；「go to school」：把在學校上課和在家完成作業當成同一件事；「have breakfast」：只依同一單元的作息選了吃早餐，沒有比對活動內容。\n回頭讀：Unit 4 Vocabulary（課本 p.65）、Review 2（課本 pp.75、77）。"
    ],
    [
     "店員想請客人自己說想吃什麼。哪一句問法符合店員的意思？",
     "What would you like to eat?",
     [
      "Would you like some noodles?",
      "What time do you have dinner?",
      "What would you like to drink?"
     ],
     [
      "先看店員要客人說的是食物、飲料，還是時間。",
      "他想聽客人自己說出餐點，可以用疑問詞提問。",
      "再讀問句的最後一個動詞，分清楚是要吃還是要喝。"
     ],
     "正確概念：What would you like to eat? 可以讓客人自己說想吃什麼。用 Would you like some noodles? 則是詢問要不要吃指定的食物。\n破誤：「Would you like some noodles?」：特別問要不要吃麵條，沒有讓客人說出想點的餐點；「What time do you have dinner?」：問的是幾點吃晚餐，沒有問要吃什麼；「What would you like to drink?」：問的是想喝什麼，沒有問要點什麼食物。\n回頭讀：Unit 3 Sentence A／B（課本 pp.52–53）、Review 2（課本 p.75）。"
    ],
    [
     "依上面的短文，哪一句正確說出 Adele 寫功課前的上一項作息和時間？英文也要寫對。",
     "She has dinner at six fifteen.",
     [
      "She have dinner at six fifteen.",
      "She has dinner at seven ten.",
      "She goes to bed at nine o'clock."
     ],
     [
      "先在短文裡圈出 Adele 做功課的那一句。",
      "把短文的時間按先後排列，找出做功課之前最近的時間。",
      "看那個時間屬於哪一項作息，再選使用第三人稱的句子。"
     ],
     "正確概念：Adele 七點十分寫功課。再往前一項有標明時間的作息是六點十五分吃晚餐，所以選 She has dinner at six fifteen.。\n破誤：「She have dinner at six fifteen.」：找對作息和時間，卻忘了 she 後面的 have 要改成 has；「She has dinner at seven ten.」：找對上一項作息，卻把寫功課的時間配給晚餐；「She goes to bed at nine o'clock.」：上床時間讀對了，但那是寫完功課以後的作息。\n回頭讀：Review 2 Sequence（課本 pp.76–77）、Unit 4 Grammar Tips（課本 p.68）。",
     {
      "passage": "I'm Adele. On Fridays, I go home at four forty. I put my bag on a chair when I get home. I have dinner at six fifteen. At seven ten, I do my homework. I go to bed at nine. I like to read a book before I go to bed."
     }
    ],
    [
     "哪個字的母音和 clown 的母音相同？",
     "loud",
     [
      "soil",
      "coin",
      "joy"
     ],
     [
      "先念 clown，留意中間的母音。",
      "把選項的母音和上一單元的 oi／oy 比一比。",
      "想想本課哪組字母雖然和 clown 的拼法不同，卻有相同的母音。"
     ],
     "正確概念：loud 的 ou 和 clown 的 ow 在這兩個字裡同音。soil、coin 的 oi 和 joy 的 oy 讀的是另一個母音。\n破誤：「soil」：把 oi 的滑動方向聽成和 clown 裡的母音一樣；「coin」：看到有 o，就把 oi 當成 clown 的 ow；「joy」：看到字母 o，沒有分辨 oy 和 ow 的讀音。\n回頭讀：Review 2 Play and Say（課本 p.78）、Unit 4 Phonics（課本 pp.72–73）。"
    ],
    [
     "請聽英文，選出意思最符合的中文。",
     "你想吃一些三明治和薯條嗎？",
     [
      "你想吃一些三明治和水餃嗎？",
      "你想吃一些麵條和薯條嗎？",
      "我想吃一些三明治和薯條。"
     ],
     [
      "聽句子開頭，是在問人，還是在說自己的選擇？",
      "再聽後半提了幾項食物。",
      "利用連接兩項食物的地方分開聽，核對兩樣食物和問句的用途。"
     ],
     "正確概念：Would you like …? 是問對方要不要。sandwiches 和 French fries 指三明治和薯條。\n破誤：「你想吃一些三明治和水餃嗎？」：聽對第一項食物，把第二項記成水餃；「你想吃一些麵條和薯條嗎？」：聽對第二項食物，把第一項記成麵條；「我想吃一些三明治和薯條。」：聽對兩樣食物，卻把詢問對方意願聽成自己點餐。\n回頭讀：Unit 3 Vocabulary（課本 p.51）、Sentence B（課本 p.53）、Review 2（課本 p.75）。",
     {
      "listen": "Would you like some sandwiches and French fries?",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，選出符合內容的說法。",
     "Andy 六點二十分吃晚餐，想吃披薩和湯。",
     [
      "Andy 七點整吃晚餐，想吃披薩和湯。",
      "Andy 六點二十分吃晚餐，想吃水餃和湯。",
      "Andy 六點二十分吃午餐，想吃披薩和湯。"
     ],
     [
      "先聽兩個問句各在問什麼。",
      "第一個回答有否定，後面才補上真正的時間。",
      "再把最後一句的兩樣食物和實際用餐時間放在一起。"
     ],
     "正確概念：Andy 否認七點吃晚餐，說自己六點二十分吃晚餐，最後選了披薩和湯。\n破誤：「Andy 七點整吃晚餐，想吃披薩和湯。」：餐點聽對了，但把問句提到的時間當成實際時間；「Andy 六點二十分吃晚餐，想吃水餃和湯。」：時間和湯都聽對了，把披薩記成水餃；「Andy 六點二十分吃午餐，想吃披薩和湯。」：聽對時間和餐點，但把晚餐記成午餐。\n回頭讀：Unit 3 Sentence A（課本 p.52）、Unit 4 Sentence B（課本 p.67）、Review 2（課本 p.75）。",
     {
      "listen": "Sonia: Do you have dinner at seven, Andy? Andy: No, I don't. I have dinner at six twenty. Sonia: What would you like to eat? Andy: I'd like some pizza and soup, please.",
      "rate": 0.9
     }
    ]
   ]
  }
 ]
};
