// 國小全科練習平台 — en4（四上英語・康軒 Wonder World 5）
// 題目：依康軒四上英語教師手冊（教學篇）各單元的學習重點自行編寫；聽力對話與閱讀短文皆為原創。全書由 Claude Code 照五上英語（en5）的做法出題（2026-11-21）。
// 四個 Unit 各三關（字彙與聽力／句型與文法／發音與閱讀）＋ Review 1、Review 2 各一關，共 14 關；Get Ready、Culture & Festivals、附錄、More to Learn 不出題。
// zones：一個 Unit 一區，Review 1 放在 Unit 2 那區、Review 2 放在 Unit 4 那區；主題地名 2026-11-21 老師同意：飲料綠洲、水果花園、星期鐘塔、科目校園（都用現有地形）。
// levels[].q 為位置陣列：[題幹, 正解, [干擾x3], [提示x3], 詳解, 附件?]；由 tools/assemble.mjs 從作者端題目檔（drafts/en4/en4-questions-*.json）組裝，不要手改。
// 聽力附件 {listen, rate?, speakOptions?} 由瀏覽器英語語音朗讀（js/ui.js 的 Say）。
const EN4 = {
 "id": "en4",
 "subj": "英語",
 "pub": "康軒",
 "sem": "四上",
 "grade": 4,
 "note": "題目依康軒四上英語（Wonder World 5）各單元的學習重點自行編寫；聽力由瀏覽器英語語音朗讀，情境、對話與短文皆為原創。",
 "zones": [
  {
   "name": "飲料綠洲",
   "unit": "Unit 1 The Best Drink",
   "terrain": "oasis"
  },
  {
   "name": "水果花園",
   "unit": "Unit 2 Let's Make Fruit Salad",
   "terrain": "garden"
  },
  {
   "name": "星期鐘塔",
   "unit": "Unit 3 A Fun Day",
   "terrain": "clocktower"
  },
  {
   "name": "科目校園",
   "unit": "Unit 4 My Favorite Subject",
   "terrain": "school"
  }
 ],
 "levels": [
  {
   "id": "en4-01",
   "z": 0,
   "name": "字彙與聽力",
   "lesson": "Unit 1",
   "draft": true,
   "intro": "七種飲料的英文：coffee、cola、lemonade、tea、bubble tea、hot chocolate、soy milk，還有故事裡的 water、juice、milk tea。",
   "q": [
    [
     "請聽英文，選出你聽到的飲料。",
     "soy milk",
     [
      "milk tea",
      "bubble tea",
      "hot chocolate"
     ],
     [
      "先聽一共念了幾個字。",
      "再聽第二個字是 milk 還是 tea，還是別的字。",
      "最後聽第一個字，是很短的一個音節。"
     ],
     "正確概念：念的是 soy milk（豆漿）。milk 在後面；milk tea 是奶茶，milk 在前面。\n破誤：「milk tea」：聽到 milk 就選了，沒注意 milk 是在前面還是後面；「bubble tea」：只記得是兩個字的飲料，沒聽清楚第一個字；「hot chocolate」：只記得是兩個字的飲料，沒有比對每個字的音。\n回頭讀：Unit 1 Vocabulary（課本 pp.20–21）。",
     {
      "listen": "soy milk",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出意思正確的中文。",
     "檸檬水",
     [
      "可樂",
      "豆漿",
      "熱巧克力"
     ],
     [
      "先聽這個字有幾個音節。",
      "這個字開頭的音和 lemon 很像。",
      "先刪掉顏色很深、你確定念法的飲料，再想想剩下的字和 lemon 有什麼關係。"
     ],
     "正確概念：念的是 lemonade（檸檬水）。lemonade 有三個音節，開頭的音和 lemon 很像。\n破誤：「可樂」：課本把 cola 和 lemonade 畫在一起，兩種冷飲的英文記反了；「豆漿」：聽到不熟的字，就選了印象最深的飲料；「熱巧克力」：聽到結尾有 d 的音，就想成 chocolate 的結尾。\n回頭讀：Unit 1 Vocabulary（課本 p.20）。",
     {
      "listen": "lemonade",
      "rate": 0.8
     }
    ],
    [
     "「熱巧克力」的英文是哪一個？",
     "hot chocolate",
     [
      "coffee",
      "bubble tea",
      "cola"
     ],
     [
      "先想想「熱」的英文怎麼說。",
      "這個飲料的英文由兩個字組成。",
      "找第一個字是「熱」的選項。"
     ],
     "正確概念：熱巧克力是 hot chocolate。hot 是「熱的」，chocolate 是「巧克力」。\n破誤：「coffee」：咖啡和熱巧克力都是熱熱的深色飲料，把兩個記混了；「bubble tea」：記得熱巧克力是很甜的飲料，就選了另一種也很甜的飲料；「cola」：可樂和熱巧克力顏色都很深，只看顏色就作答。\n回頭讀：Unit 1 Vocabulary（課本 p.21）。"
    ],
    [
     "「咖啡」的英文，哪一個拼對了？",
     "coffee",
     [
      "cofee",
      "coffe",
      "caffee"
     ],
     [
      "先看開頭是 co 還是 ca。",
      "再數一數中間有幾個 f。",
      "最後看結尾：coffee 結尾有兩個 e。"
     ],
     "正確概念：咖啡是 coffee：c-o-f-f-e-e，中間兩個 f，結尾兩個 e。\n破誤：「cofee」：只寫了一個 f，忘了 coffee 有兩個 f；「coffe」：照念的音拼，漏掉了結尾的 e；「caffee」：把開頭的 o 寫成 a。\n回頭讀：Unit 1 Vocabulary（課本 p.20）。"
    ],
    [
     "在 Unit 1 的故事裡，大家最後說哪一種飲料最好？",
     "water",
     [
      "juice",
      "milk tea",
      "lemonade"
     ],
     [
      "回想故事裡大家玩完球，都覺得很渴。",
      "有人喝了果汁，還是說 I'm still thirsty.",
      "最後大家都不渴了，喝的是不加糖、沒有味道的那一種。"
     ],
     "正確概念：故事最後大家喝了水，不渴了，說 Water is the best.（水是最好的）。\n破誤：「juice」：Jello 和 Kevin 一開始喜歡果汁，但喝完還是覺得渴；「milk tea」：記得 Boka 喜歡奶茶，就以為那是最好的飲料；「lemonade」：店裡有賣檸檬水，但故事最後沒有說它最好。\n回頭讀：Unit 1 Story（課本 pp.18–19）。"
    ],
    [
     "請聽英文，選出意思正確的中文。",
     "我喜歡珍珠奶茶和豆漿。",
     [
      "我喜歡珍珠奶茶和熱巧克力。",
      "我喜歡奶茶和豆漿。",
      "你喜歡珍珠奶茶和豆漿嗎？"
     ],
     [
      "先聽句子開頭，是 I like 還是 Do you like？",
      "再聽 and 前面的飲料。",
      "最後聽 and 後面的飲料，裡面有 milk。"
     ],
     "正確概念：I like … and … 是說「我喜歡……和……」。bubble tea 是珍珠奶茶，soy milk 是豆漿。\n破誤：「我喜歡珍珠奶茶和熱巧克力。」：第一樣聽對了，第二樣聽成熱巧克力；「我喜歡奶茶和豆漿。」：把 bubble tea 聽成故事裡的 milk tea；「你喜歡珍珠奶茶和豆漿嗎？」：兩樣飲料都聽對了，卻把說自己喜歡聽成問別人。\n回頭讀：Unit 1 Vocabulary（課本 pp.20–21）、Sentence A（課本 p.22）。",
     {
      "listen": "I like bubble tea and soy milk.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，選出正確的說法。",
     "Leo 和 Nina 都喜歡熱巧克力。",
     [
      "Leo 喜歡咖啡。",
      "Nina 喜歡咖啡，Leo 喜歡熱巧克力。",
      "Leo 和 Nina 都喜歡檸檬水。"
     ],
     [
      "先聽 Nina 問 Leo 什麼。",
      "Leo 先回答 No，後面才說他喜歡的飲料。",
      "最後聽 Nina 說的話，句尾的 too 是「也」的意思。"
     ],
     "正確概念：Leo 不喜歡咖啡，他喜歡熱巧克力；Nina 說 I like hot chocolate, too.，所以兩人都喜歡熱巧克力。\n破誤：「Leo 喜歡咖啡。」：聽到問句裡的 coffee 就選了，沒聽到 Leo 回答 No；「Nina 喜歡咖啡，Leo 喜歡熱巧克力。」：Nina 只是問 Leo 喜不喜歡咖啡，沒有說自己喜歡；「Leo 和 Nina 都喜歡檸檬水。」：聽懂兩人喜歡同一種飲料，但飲料聽錯了。\n回頭讀：Unit 1 Sentence A（課本 p.22）。",
     {
      "listen": "Nina: Do you like coffee, Leo? Leo: No, I don't. I like hot chocolate. Nina: I like hot chocolate, too.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en4-02",
   "z": 0,
   "name": "句型與文法",
   "lesson": "Unit 1",
   "draft": true,
   "intro": "Do you like cola? Yes, I do. / No, I don't. Does he like tea? Yes, he does. / No, he doesn't. He likes coffee. do 和 does 後面用原形動詞。",
   "q": [
    [
     "選出正確的字填入空格：「____ you like tea?」",
     "Do",
     [
      "Does",
      "Are",
      "Is"
     ],
     [
      "先看空格後面是誰。",
      "句子已經有動詞 like，要用 do 或 does 來問。",
      "I、you、we、they 用同一個字，he、she 用另一個字。"
     ],
     "正確概念：you 要用 Do 來問：Do you like tea?。he、she 和人名才用 Does。\n破誤：「Does」：記得問別人喜不喜歡要用 Does，沒看空格後面是 you；「Are」：記得 Are you…? 的問句，沒注意句子已經有動詞 like；「Is」：用了問 he、she 的 Is，又沒注意句子已經有動詞 like。\n回頭讀：Unit 1 Sentence A（課本 p.22）、Learn with Boka（課本 p.24）。"
    ],
    [
     "選出正確的字填入空格：「____ Mia like lemonade?」",
     "Does",
     [
      "Do",
      "Is",
      "Are"
     ],
     [
      "先看空格後面是誰。",
      "Mia 是一個人，可以用 she 代替她。",
      "回想 Learn with Boka：he、she、it 用哪一個字來問？"
     ],
     "正確概念：Mia 是一個人（she），要用 Does 來問：Does Mia like lemonade?。\n破誤：「Do」：把 Do you…? 的 Do 用在人名前面；「Is」：記得 Is she…? 的問句，沒注意句子已經有動詞 like；「Are」：用了 be 動詞來問，沒注意句子已經有動詞 like。\n回頭讀：Unit 1 Sentence B（課本 p.23）、Learn with Boka（課本 p.24）。"
    ],
    [
     "「Do you like cola?」如果你不喜歡可樂、喜歡茶，要怎麼回答？",
     "No, I don't. I like tea.",
     [
      "No, I doesn't. I like tea.",
      "No, I don't. I likes tea.",
      "No, you don't. I like tea."
     ],
     [
      "回答自己的事要用 I。",
      "用 do 問，就用 do 回答。",
      "再檢查 I 後面的 like 要不要加 s。"
     ],
     "正確概念：用 Do you…? 問，回答自己時用 I do／I don't。I 後面的 like 不加 s：No, I don't. I like tea.\n破誤：「No, I doesn't. I like tea.」：記得要說不喜歡，卻把 I 後面的 don't 換成 doesn't；「No, I don't. I likes tea.」：把說別人時才加的 s 加到 I 後面的 like；「No, you don't. I like tea.」：照著問句裡的 you 回答，忘了回答自己時要說 I。\n回頭讀：Unit 1 Sentence A（課本 p.22）、Learn with Boka（課本 p.24）。"
    ],
    [
     "選出正確的字填入空格：「Jason ____ soy milk.」",
     "likes",
     [
      "like",
      "liking",
      "to like"
     ],
     [
      "先看主詞是誰。",
      "Jason 可以用 he 代替。",
      "回想課本：Boka likes milk tea. 的 likes 怎麼寫。"
     ],
     "正確概念：Jason 是一個人（he），說他喜歡什麼時，like 要加 s：Jason likes soy milk.\n破誤：「like」：忘了 Jason 是一個人，like 後面要加 s；「liking」：把 like 加了 ing，但這句沒有 is；「to like」：在動詞前面多加了 to。\n回頭讀：Unit 1 Sentence B（課本 p.23）、Grammar Tips（課本 p.25）。"
    ],
    [
     "下面哪一句英文是正確的？",
     "Does Ben like bubble tea?",
     [
      "Does Ben likes bubble tea?",
      "Do Ben like bubble tea?",
      "Does Ben liking bubble tea?"
     ],
     [
      "先看句子開頭是 Do 還是 Does，配 Ben 對不對。",
      "再看 like 這個字的寫法。",
      "回想 Grammar Tips：do 和 does 後面的動詞要用什麼形式？"
     ],
     "正確概念：Ben 是 he，要用 Does 問；does 後面用原形動詞 like，不加 s：Does Ben like bubble tea?\n破誤：「Does Ben likes bubble tea?」：用了 Does，後面的 like 又加了 s；「Do Ben like bubble tea?」：把 Do you 的 Do 用在人名前面；「Does Ben liking bubble tea?」：把 like 加了 ing。\n回頭讀：Unit 1 Grammar Tips（課本 p.25）。"
    ],
    [
     "依表格回答：「Does Kevin like coffee?」",
     "No, he doesn't. He likes tea.",
     [
      "Yes, he does. He likes coffee.",
      "No, she doesn't. She likes tea.",
      "No, he doesn't. He likes soy milk."
     ],
     [
      "先在表格找到 Kevin 那一列。",
      "看 coffee 在「喜歡」還是「不喜歡」那一欄。",
      "Kevin 是男生，回答時用 he，再說出他喜歡的飲料。"
     ],
     "正確概念：Kevin 不喜歡咖啡、喜歡茶。用 Does 問，就用 he doesn't 回答：No, he doesn't. He likes tea.\n破誤：「Yes, he does. He likes coffee.」：看到 coffee 在 Kevin 那一列，沒看它是在「不喜歡」那一欄；「No, she doesn't. She likes tea.」：答案的意思對了，但 Kevin 是男生，要用 he；「No, he doesn't. He likes soy milk.」：把 Amy 喜歡的豆漿當成 Kevin 喜歡的。\n回頭讀：Unit 1 Sentence B（課本 p.23）。",
     {
      "t": [
       [
        "名字",
        "喜歡",
        "不喜歡"
       ],
       [
        "Amy",
        "soy milk",
        "cola"
       ],
       [
        "Kevin",
        "tea",
        "coffee"
       ]
      ],
      "cap": "兩個人喜歡和不喜歡的飲料"
     }
    ],
    [
     "你想問同學 Amy 本人喜不喜歡檸檬水，要怎麼問她？",
     "Do you like lemonade?",
     [
      "Does she like lemonade?",
      "Does you like lemonade?",
      "Do she like lemonade?"
     ],
     [
      "你是直接問 Amy 本人，要叫她 you 還是 she？",
      "想好要用 you 以後，再選前面要用 Do 還是 Does。",
      "回想課本 Sentence A 問同學的句子。"
     ],
     "正確概念：直接問對方要用 you，you 配 Do：Do you like lemonade?。\n破誤：「Does she like lemonade?」：直接問 Amy 本人時要說 you，she 是跟別人說 Amy 的時候才用；「Does you like lemonade?」：you 前面用了 Does；「Do she like lemonade?」：用了 she，前面又配 Do。\n回頭讀：Unit 1 Sentence A（課本 p.22）、Learn with Boka（課本 p.24）。"
    ]
   ]
  },
  {
   "id": "en4-03",
   "z": 0,
   "name": "發音與閱讀",
   "lesson": "Unit 1",
   "draft": true,
   "intro": "e_e、ea、ee 都念長音 e（Eve、tea、tree）；讀飲料的營養標示，找出細節（Find Details）。",
   "q": [
    [
     "請聽英文，選出你聽到的字。可以按喇叭聽每個選項。",
     "seat",
     [
      "sit",
      "beat",
      "weed"
     ],
     [
      "先聽中間的母音，是長音 e 還是短音？",
      "再聽開頭是 s、b 還是 w 的音。",
      "最後聽結尾是 t 還是 d 的音。"
     ],
     "正確概念：念的是 seat。ea 念長音 e，開頭是 s，結尾是 t；sit 的 i 是短音。\n破誤：「sit」：開頭和結尾一樣，但沒分出母音是長音還是短音；「beat」：母音和結尾一樣，但沒聽清楚開頭的音；「weed」：只聽到長音 e，沒有比對開頭和結尾。\n回頭讀：Unit 1 Phonics Listen, Point, and Say（課本 p.29）。",
     {
      "listen": "seat",
      "rate": 0.8,
      "speakOptions": true
     }
    ],
    [
     "下面四個字，哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。",
     "red",
     [
      "tree",
      "peach",
      "these"
     ],
     [
      "先聽每個字的母音，不要只看拼法。",
      "e_e、ea、ee 這三組字母都念長音 e。",
      "找一找哪一個字只有一個 e，後面也沒有不發音的 e。"
     ],
     "正確概念：tree 的 ee、peach 的 ea、these 的 e_e 都念長音 e（和 Eve 一樣）；red 只有一個 e，念短音，所以不同。\n破誤：「tree」：看到 ee 和 ea、e_e 的字母不同，就以為念法也不同；「peach」：看到 ea 和 ee、e_e 的字母不同，就以為念法也不同；「these」：看到 e_e 中間隔了一個字母，就以為念法不同。\n回頭讀：Unit 1 Phonics Sound It Out（課本 p.28）。",
     {
      "speakOptions": true
     }
    ],
    [
     "哪一個字裡的 e 念長音，和 Eve 的第一個音一樣？可以按喇叭聽每個字。",
     "these",
     [
      "red",
      "bet",
      "wed"
     ],
     [
      "先聽每個字的母音是長音還是短音。",
      "長音 e 可以拼成 e_e、ea 或 ee。",
      "找字尾有一個不發音的 e 的字。"
     ],
     "正確概念：these 是 e_e 的拼法：字尾的 e 不發音，前面的 e 念長音，和 Eve 一樣。red、bet、wed 的 e 念短音。\n破誤：「red」：看到字裡有 e，就以為都念長音；「bet」：看到 e 就選了，沒注意後面沒有不發音的 e；「wed」：和 weed 長得很像，少了一個 e 就念短音。\n回頭讀：Unit 1 Phonics Sound It Out（課本 p.28）、Listen and Circle（課本 p.29）。",
     {
      "speakOptions": true
     }
    ],
    [
     "依上面的短文，哪一種飲料的糖最多？",
     "the cola",
     [
      "the soy milk",
      "water",
      "the juice"
     ],
     [
      "先在短文裡找到有 sugar 的句子。",
      "把每種飲料的糖有幾公克圈出來。",
      "比一比數字，thirty 和 five 哪一個比較大？"
     ],
     "正確概念：可樂有 thirty grams（30 公克）糖，豆漿 5 公克，水沒有糖，所以可樂的糖最多。\n破誤：「the soy milk」：看到豆漿有糖，就沒和可樂的數字比一比；「water」：Tim 最後喝的是水，就以為題目問的是他喝了什麼；「the juice」：想到果汁也很甜，但短文沒有提到果汁。\n回頭讀：Unit 1 Reading（課本 pp.26–27）、Reading Skills：Find Details。",
     {
      "passage": "Tim plays basketball. Now he is thirsty. He has three drinks. The cola has thirty grams of sugar. The soy milk has five grams of sugar. Water has no sugar. Tim likes cola, but he drinks water. Water is good for him."
     }
    ],
    [
     "依上面的短文，豆漿有多少糖？",
     "5 公克",
     [
      "30 公克",
      "0 公克",
      "35 公克"
     ],
     [
      "先在短文裡找到 soy milk。",
      "看 soy milk 那一句後面的數字。",
      "five 是哪一個數字？"
     ],
     "正確概念：短文說 The soy milk has five grams of sugar.，豆漿有 5 公克的糖。\n破誤：「30 公克」：把可樂的糖當成豆漿的糖；「0 公克」：把水的 no sugar 當成豆漿的；「35 公克」：把可樂和豆漿的糖加在一起。\n回頭讀：Unit 1 Reading（課本 pp.26–27）、Reading Skills：Find Details。",
     {
      "passage": "Tim plays basketball. Now he is thirsty. He has three drinks. The cola has thirty grams of sugar. The soy milk has five grams of sugar. Water has no sugar. Tim likes cola, but he drinks water. Water is good for him."
     }
    ],
    [
     "課本教我們看飲料的營養標示，算出一整瓶有多少糖。第一步要先找什麼？",
     "一瓶有幾份（servings）",
     [
      "一份有多少糖（sugars）",
      "一份有多少熱量（calories）",
      "把兩個數字乘起來"
     ],
     [
      "回想課本營養標示旁邊的 1、2、3 三個步驟。",
      "要算一整瓶的糖，需要兩個數字，最後再把它們乘起來。",
      "第一步和第二步各找一個數字，第二步找的是 sugars。"
     ],
     "正確概念：課本的步驟是：1. Find the servings（找一瓶有幾份）2. Find the sugars（找一份有多少糖）3. Work out（乘起來算出整瓶的糖）。\n破誤：「一份有多少糖（sugars）」：這是第二步，要先知道一瓶有幾份；「一份有多少熱量（calories）」：熱量也在標示上，但算糖不用看它；「把兩個數字乘起來」：這是最後一步，要先找到兩個數字才能算。\n回頭讀：Unit 1 Reading（課本 p.26）。"
    ],
    [
     "請聽英文，回答：Pete 喜歡什麼？",
     "綠茶",
     [
      "桃子茶",
      "可樂",
      "檸檬水"
     ],
     [
      "先聽說話的人是誰，她喜歡什麼。",
      "再聽 My brother 後面說了誰，他喜歡什麼。",
      "注意 tea 前面的顏色，那就是 Pete 喜歡的茶。"
     ],
     "正確概念：說話的是 Eve，她喜歡桃子茶；她的兄弟 Pete 喜歡 green tea（綠茶）；他們都不喜歡可樂。\n破誤：「桃子茶」：把說話的 Eve 喜歡的茶當成 Pete 的；「可樂」：聽到 cola 就選了，沒聽到前面的 don't；「檸檬水」：短文沒有提到檸檬水，只憑印象作答。\n回頭讀：Unit 1 Phonics Listen and Chant（課本 p.28）、Sentence B（課本 p.23）。",
     {
      "listen": "Hi, I'm Eve. I like peach tea. My brother is Pete. He likes green tea. We don't like cola.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en4-04",
   "z": 1,
   "name": "字彙與聽力",
   "lesson": "Unit 2",
   "draft": true,
   "intro": "七種水果的英文：apples、bananas、grapes、guavas、oranges、papayas、pineapples。",
   "q": [
    [
     "請聽英文，選出你聽到的水果。",
     "guavas",
     [
      "grapes",
      "papayas",
      "bananas"
     ],
     [
      "先聽開頭的音，是 g、p 還是 b？",
      "開頭是 g 的有兩個選項，再聽這個字有幾個音節。",
      "這個字有兩個音節，不是一個音節。"
     ],
     "正確概念：念的是 guavas（芭樂）。guavas 和 grapes 開頭都是 g，但 guavas 有兩個音節，grapes 只有一個。\n破誤：「grapes」：開頭都是 g 的音，只聽開頭就作答；「papayas」：結尾的音很像，只聽後半就作答；「bananas」：結尾都是 s 的音，沒有比對開頭。\n回頭讀：Unit 2 Vocabulary（課本 p.34）。",
     {
      "listen": "guavas",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出意思正確的中文。",
     "鳳梨",
     [
      "蘋果",
      "木瓜",
      "葡萄"
     ],
     [
      "先聽這個字有幾個音節。",
      "這個字的後半和 apples 一樣，前面還多了一段。",
      "前面多了 pine 這一段，所以它不是蘋果，是課本上另一種比較大的水果。"
     ],
     "正確概念：念的是 pineapples（鳳梨）。它的後半是 apples，但整個字是鳳梨，不是蘋果。\n破誤：「蘋果」：聽到後半的 apples，就選了蘋果；「木瓜」：只記得是有好幾個音節的水果，沒聽清楚開頭；「葡萄」：聽到開頭的 p，就選了也是 p 開頭的葡萄。\n回頭讀：Unit 2 Vocabulary（課本 p.34）。",
     {
      "listen": "pineapples",
      "rate": 0.8
     }
    ],
    [
     "「木瓜」的英文是哪一個？",
     "papayas",
     [
      "guavas",
      "bananas",
      "pineapples"
     ],
     [
      "先想想木瓜的英文開頭是什麼字母。",
      "p 開頭的選項有兩個，再看哪一個字裡有 apples。",
      "木瓜的英文裡沒有 apples，結尾是 -ayas。"
     ],
     "正確概念：木瓜是 papayas；guavas 是芭樂、bananas 是香蕉、pineapples 是鳳梨。\n破誤：「guavas」：guavas 和 papayas 結尾都是 -as，把芭樂和木瓜記混了；「bananas」：香蕉和木瓜都是黃色的水果，只看顏色就作答；「pineapples」：鳳梨和木瓜都是 p 開頭，只看第一個字母就作答。\n回頭讀：Unit 2 Vocabulary（課本 p.34）。"
    ],
    [
     "「香蕉（複數）」的英文，哪一個拼對了？",
     "bananas",
     [
      "banannas",
      "bananaes",
      "bananes"
     ],
     [
      "先拼出一根香蕉 banana。",
      "數一數 banana 裡有幾個 n。",
      "複數只要在 banana 後面加一個字母。"
     ],
     "正確概念：一根香蕉是 banana（b-a-n-a-n-a），兩個 n；複數直接加 s：bananas。\n破誤：「banannas」：中間多寫了一個 n；「bananaes」：以為複數要加 es；「bananes」：把最後的 a 拿掉再加 es。\n回頭讀：Unit 2 Vocabulary（課本 p.34）。"
    ],
    [
     "在 Unit 2 的故事裡，做水果沙拉需要幾個柳橙？",
     "six",
     [
      "five",
      "seven",
      "two"
     ],
     [
      "回想故事裡的材料單 What you need。",
      "材料單上寫了柳橙和蘋果各要幾個。",
      "Kevin 回答 We need … oranges. 的數字，比五多一。"
     ],
     "正確概念：故事裡問 How many oranges do we need?，回答 We need six oranges.，要六個柳橙。\n破誤：「five」：只記得是五、六、七其中一個，沒有回想 Kevin 的回答；「seven」：把 Sentence B 的 seven oranges 和故事記混了；「two」：把材料單上的 2 apples 當成柳橙的數量。\n回頭讀：Unit 2 Story（課本 p.32）。"
    ],
    [
     "請聽英文，選出意思正確的中文。",
     "我需要四根香蕉和兩個木瓜。",
     [
      "我需要四根香蕉和兩個芭樂。",
      "我需要兩根香蕉和四個木瓜。",
      "你需要四根香蕉和兩個木瓜嗎？"
     ],
     [
      "先聽句子開頭，是 I need 還是問句。",
      "再聽 and 前面的數字和水果。",
      "最後聽 and 後面的數字和水果，水果是 p 開頭。"
     ],
     "正確概念：I need four bananas and two papayas. 是「我需要四根香蕉和兩個木瓜」。\n破誤：「我需要四根香蕉和兩個芭樂。」：把 papayas 聽成也是 -as 結尾的 guavas；「我需要兩根香蕉和四個木瓜。」：兩樣水果都聽對了，但數字配反了；「你需要四根香蕉和兩個木瓜嗎？」：水果和數字都聽對了，卻把說自己聽成問別人。\n回頭讀：Unit 2 Vocabulary（課本 p.34）、Sentence A（課本 p.36）。",
     {
      "listen": "I need four bananas and two papayas.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，選出正確的說法。",
     "Ken 需要三個蘋果和兩個柳橙。",
     [
      "Ken 需要三個蘋果和兩串葡萄。",
      "Ken 需要兩個蘋果和三個柳橙。",
      "Ken 需要三個柳橙，不需要蘋果。"
     ],
     [
      "先聽媽媽第一次問 Ken 什麼。",
      "媽媽又問了葡萄，Ken 的回答裡有 don't。",
      "最後一句 Ken 說他還需要什麼、需要幾個。"
     ],
     "正確概念：Ken 需要三個蘋果（three apples），不需要葡萄，還需要兩個柳橙（two oranges）。\n破誤：「Ken 需要三個蘋果和兩串葡萄。」：聽到媽媽問 grapes，沒聽到 Ken 說 don't need；「Ken 需要兩個蘋果和三個柳橙。」：兩樣水果都聽對了，但數字配反了；「Ken 需要三個柳橙，不需要蘋果。」：把蘋果的數字配給了柳橙。\n回頭讀：Unit 2 Sentence A（課本 p.36）。",
     {
      "listen": "Mom: How many apples do you need, Ken? Ken: I need three apples. Mom: How about grapes? Ken: I don't need grapes. I need two oranges.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en4-05",
   "z": 1,
   "name": "句型與文法",
   "lesson": "Unit 2",
   "draft": true,
   "intro": "How many apples do you need? I need two apples. How many oranges does she need? She needs seven oranges. how many 後面的名詞用複數。",
   "q": [
    [
     "選出正確的字填入空格：「How many ____ do you need?」",
     "grapes",
     [
      "grape",
      "a grape",
      "grapees"
     ],
     [
      "how many 是在問「幾個」。",
      "問幾個的時候，後面的東西要用一個還是很多個的寫法？",
      "回想 Learn with Boka：how many 後面的名詞用什麼形式。"
     ],
     "正確概念：how many 用來問數量，後面的名詞用複數：How many grapes do you need?\n破誤：「grape」：忘了 how many 後面的名詞要用複數；「a grape」：在 how many 後面加了 a，還用了單數；「grapees」：知道要用複數，但多寫了 e。\n回頭讀：Unit 2 Learn with Boka（課本 p.38）。"
    ],
    [
     "選出正確的字填入空格：「How many oranges ____ Amy need?」",
     "does",
     [
      "do",
      "is",
      "are"
     ],
     [
      "先看空格後面是誰。",
      "Amy 是一個人，可以用 she 代替。",
      "回想 Sentence B：問 he、she 需要幾個時，用哪一個字？"
     ],
     "正確概念：Amy 是 she，要用 does：How many oranges does Amy need?\n破誤：「do」：把 How many … do you need? 的 do 用在人名前面；「is」：用了 be 動詞，沒注意句子已經有動詞 need；「are」：看到 oranges 是複數就用 are，沒注意句子已經有動詞 need。\n回頭讀：Unit 2 Sentence B（課本 p.37）。"
    ],
    [
     "選出正確的字填入空格：「She ____ seven oranges.」",
     "needs",
     [
      "need",
      "needing",
      "is need"
     ],
     [
      "先看主詞是誰。",
      "主詞是 she，說她需要什麼時，need 要不要變？",
      "回想 Grammar Tips 表格裡 He／She 後面的寫法。"
     ],
     "正確概念：he、she 後面的 need 要加 s：She needs seven oranges.\n破誤：「need」：忘了 she 後面的 need 要加 s；「needing」：把 need 加了 ing，但這句沒有 is；「is need」：在 need 前面多加了 is。\n回頭讀：Unit 2 Sentence B（課本 p.37）、Grammar Tips（課本 p.39）。"
    ],
    [
     "「How many apples do you need?」要怎麼回答？",
     "I need two apples.",
     [
      "I need two apple.",
      "I needs two apples.",
      "Yes, I do."
     ],
     [
      "別人問的是「幾個」，回答要說出數字。",
      "說自己需要，用 I need。",
      "最後檢查兩個以上的蘋果要怎麼寫。"
     ],
     "正確概念：問 How many … do you need? 要說出數量：I need two apples.。I 後面用 need，兩個以上用複數 apples。\n破誤：「I need two apple.」：兩個以上的東西忘了加 s；「I needs two apples.」：把 he、she 才用的 needs 用在 I 後面；「Yes, I do.」：別人問的是幾個，卻只回答 Yes。\n回頭讀：Unit 2 Sentence A（課本 p.36）。"
    ],
    [
     "下面哪一句英文是正確的？",
     "How many papayas do they need?",
     [
      "How many papaya do they need?",
      "How many papayas does they need?",
      "How many papayas do they needs?"
     ],
     [
      "先看 how many 後面的水果是不是複數。",
      "再看 they 要配 do 還是 does。",
      "最後看 do 後面的動詞有沒有多加 s。"
     ],
     "正確概念：how many 後面用複數 papayas；they 配 do；do 後面用原形 need：How many papayas do they need?\n破誤：「How many papaya do they need?」：how many 後面用了單數；「How many papayas does they need?」：they 是很多人，卻用了 does；「How many papayas do they needs?」：do 後面的 need 多加了 s。\n回頭讀：Unit 2 Sentence A（課本 p.36）、Learn with Boka（課本 p.38）。"
    ],
    [
     "依購物清單回答：「How many pineapples does Dad need?」",
     "He needs two pineapples.",
     [
      "He needs three pineapples.",
      "She needs two pineapples.",
      "He need two pineapples."
     ],
     [
      "先在清單找到 Dad 那一列。",
      "看 Dad 要買的水果有幾個。",
      "說爸爸時要用 he，再檢查 need 的寫法。"
     ],
     "正確概念：清單上 Dad 要買 2 個鳳梨。爸爸用 he，he 後面用 needs：He needs two pineapples.\n破誤：「He needs three pineapples.」：把媽媽要買的數量看成爸爸的；「She needs two pineapples.」：數字對了，但爸爸要用 he；「He need two pineapples.」：he 後面的 need 忘了加 s。\n回頭讀：Unit 2 Sentence B（課本 p.37）。",
     {
      "t": [
       [
        "誰要買",
        "水果",
        "數量"
       ],
       [
        "Mom",
        "guavas",
        "3"
       ],
       [
        "Dad",
        "pineapples",
        "2"
       ]
      ],
      "cap": "購物清單"
     }
    ],
    [
     "你想直接問 Ben 他需要幾根香蕉，要怎麼問？",
     "How many bananas do you need?",
     [
      "How many bananas does he need?",
      "How many banana do you need?",
      "How many bananas does you need?"
     ],
     [
      "你是直接問 Ben，要叫他 you 還是 he？",
      "再看 how many 後面的香蕉要怎麼寫。",
      "最後選 you 要配 do 還是 does。"
     ],
     "正確概念：直接問對方用 you，you 配 do，how many 後面用複數：How many bananas do you need?\n破誤：「How many bananas does he need?」：直接問 Ben 本人要說 you，he 是跟別人說 Ben 的時候才用；「How many banana do you need?」：how many 後面用了單數；「How many bananas does you need?」：you 前面用了 does。\n回頭讀：Unit 2 Sentence A（課本 p.36）。"
    ]
   ]
  },
  {
   "id": "en4-06",
   "z": 1,
   "name": "發音與閱讀",
   "lesson": "Unit 2",
   "draft": true,
   "intro": "i_e、ie、igh 都念長音 i（bite、pie、light）；讀短文時在腦中想像畫面（Visualize），找出誰吃水果吃得聰明。",
   "q": [
    [
     "請聽英文，選出你聽到的字。可以按喇叭聽每個選項。",
     "pie",
     [
      "tea",
      "bit",
      "hay"
     ],
     [
      "先聽開頭是 p、t、b 還是 h 的音。",
      "再聽母音：是長音 i、長音 e，還是長音 a？",
      "這個字的母音和 kite 一樣。"
     ],
     "正確概念：念的是 pie（派）。ie 念長音 i，和 kite、light 的母音一樣。\n破誤：「tea」：只聽到是一個很短的字，沒分出母音是長音 i 還是長音 e；「bit」：聽到 i 的音，但沒分出是長音還是短音；「hay」：把長音 i 聽成 a_e、ay 的長音 a。\n回頭讀：Unit 2 Phonics Sound It Out（課本 p.42）、Listen, Point, and Say（課本 p.43）。",
     {
      "listen": "pie",
      "rate": 0.8,
      "speakOptions": true
     }
    ],
    [
     "下面四個字，哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。",
     "bit",
     [
      "kite",
      "tie",
      "night"
     ],
     [
      "先聽每個字的母音，不要只看拼法。",
      "i_e、ie、igh 這三組字母都念長音 i。",
      "找一找哪一個字只有一個 i，後面沒有 e，也沒有 gh。"
     ],
     "正確概念：kite 的 i_e、tie 的 ie、night 的 igh 都念長音 i；bit 只有一個 i，念短音，所以不同。\n破誤：「kite」：看到 i_e 和 ie、igh 的字母不同，就以為念法也不同；「tie」：看到 ie 和 i_e、igh 的字母不同，就以為念法也不同；「night」：看到 igh 有三個字母，就以為念法不同。\n回頭讀：Unit 2 Phonics Sound It Out（課本 p.42）。",
     {
      "speakOptions": true
     }
    ],
    [
     "哪一個字的 i 念長音，和 bite 的母音一樣？可以按喇叭聽每個字。",
     "time",
     [
      "bit",
      "sit",
      "Brit"
     ],
     [
      "先聽每個字的母音是長音還是短音。",
      "長音 i 可以拼成 i_e、ie 或 igh。",
      "找字尾有一個不發音的 e 的字。"
     ],
     "正確概念：time 是 i_e 的拼法：字尾的 e 不發音，前面的 i 念長音，和 bite 一樣。bit、sit、Brit 的 i 都念短音。\n破誤：「bit」：和 bite 長得很像，但少了字尾的 e，就念短音；「sit」：看到 i 就選了，沒注意後面沒有不發音的 e；「Brit」：看到 i 就選了，沒注意它念短音。\n回頭讀：Unit 2 Phonics Sound It Out（課本 p.42）、Listen and Circle（課本 p.43）。",
     {
      "speakOptions": true
     }
    ],
    [
     "依上面的短文，Lily 每天吃幾種水果？",
     "三種",
     [
      "一種",
      "兩種",
      "四種"
     ],
     [
      "先在短文裡找到 Lily 那一句。",
      "把 Lily 吃的水果一個一個圈出來。",
      "想像 Lily 的盤子：香蕉、芭樂、柳橙……一共幾種不同的水果？"
     ],
     "正確概念：Lily 每天吃一根香蕉、一個芭樂、一個柳橙，一共三種水果。\n破誤：「一種」：看到每樣水果都是 one，就以為只有一種；「兩種」：把 Ray 吃的 two apples 當成 Lily 的；「四種」：數水果時把 and 也算成一種。\n回頭讀：Unit 2 Reading（課本 pp.40–41）、Reading Skills：Visualize。",
     {
      "passage": "We need three servings of fruit every day. Ray eats two apples every day. Sam eats three bananas every day. Lily eats one banana, one guava, and one orange every day. Close your eyes. Can you see their fruit plates?"
     }
    ],
    [
     "依上面的短文和課本說的，誰吃水果吃得最聰明（a smart eater）？",
     "Lily",
     [
      "Ray",
      "Sam",
      "三個人都一樣"
     ],
     [
      "回想課本：一天要吃幾份水果？",
      "除了份量夠，課本還說要吃不同的什麼？",
      "想像三個人的盤子，誰的盤子份量夠、顏色也不一樣？"
     ],
     "正確概念：課本說一天要吃三份水果，而且要吃不同種類。Lily 吃三份、三種不同的水果，所以她吃得最聰明。\n破誤：「Ray」：Ray 每天只吃兩個蘋果，份量不夠三份，也只有一種；「Sam」：Sam 吃了三份，但都是香蕉，沒有吃不同種類；「三個人都一樣」：只看到三個人都有吃水果，沒有比份量和種類。\n回頭讀：Unit 2 Reading（課本 p.41）。",
     {
      "passage": "We need three servings of fruit every day. Ray eats two apples every day. Sam eats three bananas every day. Lily eats one banana, one guava, and one orange every day. Close your eyes. Can you see their fruit plates?"
     }
    ],
    [
     "課本說，一份水果（one serving of fruit）大約有多大？",
     "一個拳頭那麼大",
     [
      "一顆鳳梨那麼大",
      "兩個拳頭那麼大",
      "一個手指頭那麼大"
     ],
     [
      "回想課本問 How big is one serving of fruit?",
      "課本請大家伸出自己身體的一個部位來比。",
      "這個部位是把手握起來的樣子。"
     ],
     "正確概念：課本說 It's about the size of a fist.：一份水果大約是一個拳頭那麼大，一顆蘋果大約就是一份。\n破誤：「一顆鳳梨那麼大」：課本說一顆鳳梨比一份還多；「兩個拳頭那麼大」：記得和拳頭有關，但記錯了數量；「一個手指頭那麼大」：以為一份水果只要一點點。\n回頭讀：Unit 2 Reading（課本 p.41）。"
    ],
    [
     "請聽英文，回答：Mike 需要幾個蘋果？",
     "五個",
     [
      "九個",
      "四個",
      "一個"
     ],
     [
      "先聽說話的人想做什麼。",
      "再聽 I need 後面的數字。",
      "這個數字的開頭是 f，母音和 pie 一樣。"
     ],
     "正確概念：Mike 說 I need five apples for my pie.，他需要五個蘋果。five 的 i_e 念長音 i。\n破誤：「九個」：five 和 nine 的母音一樣都是長音 i，沒聽清楚開頭；「四個」：five 和 four 開頭都是 f，只聽開頭就作答；「一個」：把要做的一個派當成蘋果的數量。\n回頭讀：Unit 2 Sentence A（課本 p.36）、Phonics（課本 p.42）。",
     {
      "listen": "Hi, I'm Mike. I like apple pie. I need five apples for my pie. My mom likes pie, too.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en4-07",
   "z": 1,
   "name": "綜合複習",
   "lesson": "Review 1",
   "draft": true,
   "intro": "Unit 1～2 一起複習：飲料、水果、問喜不喜歡和需要幾個，再照順序讀懂對話（Sequence）。",
   "q": [
    [
     "下面哪一個不是水果？",
     "lemonade",
     [
      "guavas",
      "papayas",
      "grapes"
     ],
     [
      "先把每個字翻成中文。",
      "這四個字裡有三個是 Unit 2 的水果。",
      "剩下的那一個是 Unit 1 學過、用來喝的。"
     ],
     "正確概念：lemonade 是檸檬水，是 Unit 1 的飲料；guavas（芭樂）、papayas（木瓜）、grapes（葡萄）都是 Unit 2 的水果。\n破誤：「guavas」：不熟芭樂的英文，就以為它不是水果；「papayas」：不熟木瓜的英文，就以為它不是水果；「grapes」：把葡萄和用葡萄做的飲料記混了。\n回頭讀：Unit 1 Vocabulary（課本 p.20）、Unit 2 Vocabulary（課本 p.34）。"
    ],
    [
     "請聽對話，選出正確的說法。",
     "Lily 喜歡豆漿，也喜歡牛奶。",
     [
      "Lily 喜歡豆漿，不喜歡牛奶。",
      "Lily 不喜歡豆漿，她喜歡牛奶。",
      "Ann 喜歡豆漿和牛奶。"
     ],
     [
      "先聽 Tom 問的是誰。",
      "Ann 回答 Yes 還是 No？",
      "最後一句的 too 是「也」，她還喜歡什麼？"
     ],
     "正確概念：Tom 問 Lily 喜不喜歡豆漿，Ann 說 Yes, she does. She likes milk, too.：Lily 喜歡豆漿，也喜歡牛奶。\n破誤：「Lily 喜歡豆漿，不喜歡牛奶。」：沒聽懂句尾 too 是「也」的意思；「Lily 不喜歡豆漿，她喜歡牛奶。」：沒聽清楚 Ann 的回答是 Yes；「Ann 喜歡豆漿和牛奶。」：把回答的人 Ann 當成喜歡飲料的人。\n回頭讀：Unit 1 Sentence B（課本 p.23）、Review 1 Listen and Number（課本 p.45）。",
     {
      "listen": "Tom: Does Lily like soy milk? Ann: Yes, she does. She likes milk, too.",
      "rate": 0.9
     }
    ],
    [
     "「Does your mom need guavas?」媽媽需要三個芭樂，要怎麼回答？",
     "Yes, she does. She needs three guavas.",
     [
      "Yes, she do. She needs three guavas.",
      "Yes, she does. She need three guavas.",
      "Yes, he does. He needs three guavas."
     ],
     [
      "媽媽是女生，要用 he 還是 she？",
      "用 does 問，簡答也用 does。",
      "最後檢查 she 後面的 need 要不要加 s。"
     ],
     "正確概念：媽媽用 she；用 Does 問就用 she does 回答；she 後面用 needs：Yes, she does. She needs three guavas.\n破誤：「Yes, she do. She needs three guavas.」：用 does 問，回答卻用了 do；「Yes, she does. She need three guavas.」：she 後面的 need 忘了加 s；「Yes, he does. He needs three guavas.」：媽媽是女生，要用 she。\n回頭讀：Unit 1 Sentence B（課本 p.23）、Unit 2 Sentence B（課本 p.37）。"
    ],
    [
     "依上面的短文，Ella 到水果店做的第一件事是什麼？",
     "問店裡有沒有木瓜。",
     [
      "買四個芭樂。",
      "買一瓶檸檬水。",
      "說謝謝然後回家。"
     ],
     [
      "找出短文裡的 First、Next、Then、Finally。",
      "First 標示的是第一件事。",
      "讀 First 後面那一句，她問的是哪一種水果？"
     ],
     "正確概念：First, she asks for papayas：Ella 第一件事是問有沒有木瓜，可是店裡沒有。\n破誤：「買四個芭樂。」：芭樂是店員後來才拿給她看的；「買一瓶檸檬水。」：買檸檬水是 Then 之後的事；「說謝謝然後回家。」：這是 Finally 後面的最後一件事。\n回頭讀：Review 1 Read and Number（課本 pp.46–47）、Reading Skills：Sequence。",
     {
      "passage": "Ella goes to a fruit store. First, she asks for papayas, but the store doesn't have papayas. Next, the clerk shows her some guavas. Ella needs four guavas. Then she sees lemonade. She likes lemonade, so she buys one bottle. Finally, she says thank you and goes home."
     }
    ],
    [
     "依上面的短文，Ella 要了四個芭樂之後，接著發生什麼事？",
     "她看到檸檬水，買了一瓶。",
     [
      "店員拿芭樂給她看。",
      "她問店裡有沒有木瓜。",
      "她說謝謝然後回家。"
     ],
     [
      "先找到 Ella needs four guavas. 這一句。",
      "它後面接的是 Then 還是 Finally？",
      "讀 Then 後面那兩句，她看到什麼、做了什麼？"
     ],
     "正確概念：順序是：問木瓜 → 店員拿芭樂 → 要四個芭樂 → Then 看到檸檬水買一瓶 → Finally 說謝謝回家。\n破誤：「店員拿芭樂給她看。」：這是她要芭樂之前發生的事；「她問店裡有沒有木瓜。」：跳回了 First 的第一件事；「她說謝謝然後回家。」：跳過了 Then，直接選了最後一件事。\n回頭讀：Review 1 Read and Number（課本 pp.46–47）、Reading Skills：Sequence。",
     {
      "passage": "Ella goes to a fruit store. First, she asks for papayas, but the store doesn't have papayas. Next, the clerk shows her some guavas. Ella needs four guavas. Then she sees lemonade. She likes lemonade, so she buys one bottle. Finally, she says thank you and goes home."
     }
    ],
    [
     "哪一個字的母音和 night 的母音相同？可以按喇叭聽每個字。",
     "pie",
     [
      "tea",
      "tree",
      "bit"
     ],
     [
      "先念 night，它的 igh 念什麼音？",
      "把選項分成長音 e、長音 i 和短音。",
      "長音 i 還可以拼成 i_e 或 ie。"
     ],
     "正確概念：night 的 igh 和 pie 的 ie 都念長音 i；tea、tree 念長音 e，bit 念短音 i。\n破誤：「tea」：把長音 e 和長音 i 聽混了；「tree」：看到字裡有長音，就以為和 night 一樣；「bit」：看到有 i 就選了，沒注意 bit 的 i 是短音。\n回頭讀：Unit 2 Phonics（課本 p.42）、Review 1 Three in a Row（課本 p.48）。",
     {
      "speakOptions": true
     }
    ],
    [
     "請聽英文，選出意思正確的中文。",
     "她需要兩個鳳梨和一瓶果汁。",
     [
      "她需要兩個蘋果和一瓶果汁。",
      "她需要兩個鳳梨和一瓶檸檬水。",
      "他需要兩個鳳梨和一瓶果汁。"
     ],
     [
      "先聽句子開頭是 He 還是 She。",
      "再聽 and 前面的水果是哪一個。",
      "最後聽 one bottle of 後面是什麼飲料。"
     ],
     "正確概念：She needs two pineapples and one bottle of juice. 是「她需要兩個鳳梨和一瓶果汁」。\n破誤：「她需要兩個蘋果和一瓶果汁。」：聽到 pineapples 的後半 apples，就以為是蘋果；「她需要兩個鳳梨和一瓶檸檬水。」：鳳梨聽對了，但把 juice 聽成檸檬水；「他需要兩個鳳梨和一瓶果汁。」：把開頭的 she 聽成 he。\n回頭讀：Unit 2 Sentence B（課本 p.37）、Review 1 Read and Number（課本 p.46）。",
     {
      "listen": "She needs two pineapples and one bottle of juice.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en4-08",
   "z": 2,
   "name": "字彙與聽力",
   "lesson": "Unit 3",
   "draft": true,
   "intro": "星期一到星期日：Monday、Tuesday、Wednesday、Thursday、Friday、Saturday、Sunday。",
   "q": [
    [
     "請聽英文，選出你聽到的星期。",
     "Thursday",
     [
      "Tuesday",
      "Wednesday",
      "Saturday"
     ],
     [
      "所有星期的結尾都是 day，要聽前面。",
      "開頭是 T 的有兩個，再分清楚開頭是 Tues 還是 Thurs。",
      "這個字開頭要把舌頭放在牙齒中間，像 three 的開頭。"
     ],
     "正確概念：念的是 Thursday（星期四）。Thursday 開頭的 th 和 three 一樣；Tuesday（星期二）開頭是 t 的音。\n破誤：「Tuesday」：Tuesday 和 Thursday 開頭都是 T，只看第一個字母就作答；「Wednesday」：記得是一週中間的日子，沒聽清楚開頭；「Saturday」：結尾都是 day，只聽結尾就作答。\n回頭讀：Unit 3 Vocabulary（課本 pp.52–53）。",
     {
      "listen": "Thursday",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出意思正確的中文。",
     "星期三",
     [
      "星期二",
      "星期四",
      "星期日"
     ],
     [
      "先聽開頭的音，是 W、T、S 還是 F？",
      "開頭是 W 的星期只有一個。",
      "它排在 Tuesday 和 Thursday 中間。"
     ],
     "正確概念：念的是 Wednesday（星期三），開頭是 w 的音；中間的 d 不發音。\n破誤：「星期二」：記得 Wednesday 在一週中間，但和前一天記混了；「星期四」：記得 Wednesday 在一週中間，但和後一天記混了；「星期日」：只聽到 day，沒聽清楚前面。\n回頭讀：Unit 3 Vocabulary（課本 p.53）。",
     {
      "listen": "Wednesday",
      "rate": 0.8
     }
    ],
    [
     "「星期六」的英文是哪一個？",
     "Saturday",
     [
      "Sunday",
      "Thursday",
      "Friday"
     ],
     [
      "先想想星期六的英文開頭是什麼字母。",
      "開頭是 S 的有兩天，都在週末。",
      "一週的最後一天是星期六，它的英文比 Sunday 長。"
     ],
     "正確概念：星期六是 Saturday，星期日是 Sunday。兩個都是 S 開頭，Saturday 比較長。\n破誤：「Sunday」：Saturday 和 Sunday 開頭都是 S，把週末的兩天記反了；「Thursday」：Saturday 和 Thursday 都有 ur 的音，把兩天記混了；「Friday」：記得是週末前後的日子，和星期五記混了。\n回頭讀：Unit 3 Vocabulary（課本 pp.52–53）。"
    ],
    [
     "「星期三」的英文，哪一個拼對了？",
     "Wednesday",
     [
      "Wensday",
      "Wedensday",
      "Wednsday"
     ],
     [
      "Wednesday 有一個字母寫出來卻不發音。",
      "先寫 Wed，再寫 nes。",
      "最後接上所有星期都有的結尾。"
     ],
     "正確概念：星期三是 Wednesday：W-e-d-n-e-s-d-a-y。中間的 d 寫出來但不發音。\n破誤：「Wensday」：照念的音拼，漏掉了不發音的 d 和中間的 e；「Wedensday」：把 d 和 n 中間多寫了一個 e；「Wednsday」：漏掉了 n 後面的 e。\n回頭讀：Unit 3 Vocabulary（課本 p.53）。"
    ],
    [
     "在 Unit 3 的故事裡，動物園星期幾到星期幾有開？",
     "星期二到星期日",
     [
      "星期一到星期五",
      "星期一到星期日",
      "星期二到星期六"
     ],
     [
      "回想故事裡大家是星期幾去動物園的。",
      "那天動物園沒開，門口的牌子寫了 Opening Hours。",
      "牌子上寫的是從大家去的那一天的下一天開始，一直到週末的最後一天。"
     ],
     "正確概念：故事那天是 Monday，動物園沒開；牌子上寫 Opening Hours: Tuesday – Sunday，動物園星期二到星期日開。\n破誤：「星期一到星期五」：以為動物園和學校一樣，週末休息；「星期一到星期日」：以為動物園每天都開，忘了大家去的那天它沒開；「星期二到星期六」：記得從星期二開始，但記錯了最後一天。\n回頭讀：Unit 3 Story（課本 p.50）。"
    ],
    [
     "請聽英文，選出意思正確的中文。",
     "今天是星期二，我在放風箏。",
     [
      "今天是星期四，我在放風箏。",
      "今天是星期二，我在唱歌。",
      "今天是星期二，你在放風箏嗎？"
     ],
     [
      "先聽 Today is 後面是星期幾。",
      "這一天的開頭是 t 的音，不是 th。",
      "最後聽 I'm 後面的動作，和 kite 有關。"
     ],
     "正確概念：Today is Tuesday. I'm flying a kite. 是「今天是星期二，我在放風箏」。\n破誤：「今天是星期四，我在放風箏。」：把 Tuesday 聽成也是 T 開頭的 Thursday；「今天是星期二，我在唱歌。」：星期聽對了，但沒聽清楚在做什麼；「今天是星期二，你在放風箏嗎？」：把說自己在做的事聽成問別人。\n回頭讀：Unit 3 Sentence A Listen and Number（課本 p.54）。",
     {
      "listen": "Today is Tuesday. I'm flying a kite.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，選出正確的說法。",
     "今天是星期六，他們要去公園。",
     [
      "今天是星期五，他們要去公園。",
      "今天是星期六，他們要去動物園。",
      "今天是星期日，他們要去公園。"
     ],
     [
      "先聽 Ruby 問 Sam 什麼。",
      "Sam 先說 No，後面才說今天是星期幾。",
      "最後一句 Let's go to … 說了他們要去哪裡。"
     ],
     "正確概念：Sam 說 No, it isn't. It's Saturday.，今天是星期六；Ruby 說 Let's go to the park.，他們要去公園。\n破誤：「今天是星期五，他們要去公園。」：聽到問句裡的 Friday 就選了，沒聽到 Sam 說 No；「今天是星期六，他們要去動物園。」：星期聽對了，但把要去的地方和故事裡的動物園記混了；「今天是星期日，他們要去公園。」：把 Saturday 聽成也是 S 開頭的 Sunday。\n回頭讀：Unit 3 Sentence B（課本 p.55）。",
     {
      "listen": "Ruby: Is it Friday today, Sam? Sam: No, it isn't. It's Saturday. Ruby: Great! Let's go to the park.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en4-09",
   "z": 2,
   "name": "句型與文法",
   "lesson": "Unit 3",
   "draft": true,
   "intro": "What day is today? It's Sunday. Is it Monday today? Yes, it is. / No, it isn't. It's Tuesday. 星期和人名、地名都要大寫。",
   "q": [
    [
     "選出正確的字填入空格：「What ____ is today?」",
     "day",
     [
      "days",
      "Sunday",
      "today"
     ],
     [
      "這句是在問今天是星期幾。",
      "問「星期幾」要用 What 加上哪一個字？",
      "今天只有一天，用一天的寫法。"
     ],
     "正確概念：問今天星期幾：What day is today?。回答：It's Sunday.\n破誤：「days」：只問今天這一天，卻用了複數；「Sunday」：把回答的星期放進了問句裡；「today」：句子後面已經有 today，又重複了一次。\n回頭讀：Unit 3 Sentence A（課本 p.54）。"
    ],
    [
     "「What day is today?」今天是星期一，要怎麼回答？",
     "It's Monday.",
     [
      "It's monday.",
      "Yes, it is.",
      "It Monday."
     ],
     [
      "What 開頭的問句，要說出星期幾。",
      "用 It's 開頭，It's 就是 It is。",
      "最後檢查星期的第一個字母。"
     ],
     "正確概念：回答 What day is today? 要說 It's Monday.；Monday 的 M 要大寫。\n破誤：「It's monday.」：星期的第一個字母要大寫；「Yes, it is.」：What 問句要說出答案，不能只回答 Yes；「It Monday.」：漏了 is，It's 是 It is 的縮寫。\n回頭讀：Unit 3 Sentence A（課本 p.54）、Learn with Boka（課本 p.56）。"
    ],
    [
     "「Is it Monday today?」今天其實是星期二，要怎麼回答？",
     "No, it isn't. It's Tuesday.",
     [
      "Yes, it is. It's Tuesday.",
      "No, it isn't. It's Monday.",
      "No, it is. It's Tuesday."
     ],
     [
      "今天是不是星期一？先決定回答 Yes 還是 No。",
      "回答 No 時，後面要用 it isn't。",
      "最後要說出今天真正是星期幾。"
     ],
     "正確概念：今天不是星期一，回答 No, it isn't.，再說出真正的星期：It's Tuesday.\n破誤：「Yes, it is. It's Tuesday.」：今天不是星期一，卻回答 Yes；「No, it isn't. It's Monday.」：說了不是，後面卻又說是星期一；「No, it is. It's Tuesday.」：No 後面要用 isn't，不能用 is。\n回頭讀：Unit 3 Sentence B（課本 p.55）。"
    ],
    [
     "下面哪一句英文寫對了？",
     "I play basketball on Saturday.",
     [
      "I play basketball on saturday.",
      "i play basketball on Saturday.",
      "I play Basketball on saturday."
     ],
     [
      "先看句子開頭的 I 有沒有大寫。",
      "再看星期的第一個字母。",
      "最後看一般的字有沒有亂用大寫。"
     ],
     "正確概念：句子開頭和 I 要大寫；星期是專有名詞，第一個字母要大寫；basketball 是一般名詞，不用大寫。\n破誤：「I play basketball on saturday.」：星期的第一個字母沒有大寫；「i play basketball on Saturday.」：句子開頭的 I 沒有大寫；「I play Basketball on saturday.」：一般的字 basketball 不用大寫，星期卻沒大寫。\n回頭讀：Unit 3 Learn with Boka（課本 p.56）、Grammar Tips（課本 p.57）。"
    ],
    [
     "下面的字都先用小寫寫出來。哪一個字寫在句子中間時，第一個字母也要大寫？",
     "christmas",
     [
      "basketball",
      "teacher",
      "park"
     ],
     [
      "回想 Grammar Tips：哪一種名詞要大寫？",
      "專有名詞是一個特別的名字，像人名、地名、星期。",
      "找一找哪一個是一個節日的名字。"
     ],
     "正確概念：Christmas（耶誕節）是節日的名字，是專有名詞，第一個字母要大寫；basketball、teacher、park 是一般名詞。\n破誤：「basketball」：basketball 是一般名詞，寫在句子中間不用大寫；「teacher」：teacher 指的是任何老師，是一般名詞；「park」：park 指的是任何公園，是一般名詞。\n回頭讀：Unit 3 Grammar Tips（課本 p.57）。"
    ],
    [
     "今天是 Wednesday，明天是星期幾？",
     "Thursday",
     [
      "Tuesday",
      "Friday",
      "Monday"
     ],
     [
      "先想想 Wednesday 是星期幾。",
      "明天要往後數一天。",
      "星期三的下一天，英文開頭是 Th。"
     ],
     "正確概念：Wednesday 是星期三，明天是星期四 Thursday。順序：Sunday、Monday、Tuesday、Wednesday、Thursday、Friday、Saturday。\n破誤：「Tuesday」：選了 Wednesday 的前一天；「Friday」：多數了一天；「Monday」：只記得一週的開頭，沒有往後數。\n回頭讀：Unit 3 Vocabulary（課本 pp.52–53）。"
    ],
    [
     "你不確定今天是不是星期五，想問同學，要怎麼問？",
     "Is it Friday today?",
     [
      "Is it friday today?",
      "Is today it Friday?",
      "What day is Friday?"
     ],
     [
      "想確定是不是某一天，要用 Is it … today? 來問。",
      "先看字的順序對不對。",
      "再檢查星期的第一個字母。"
     ],
     "正確概念：想問「今天是星期五嗎？」：Is it Friday today?；Friday 的 F 要大寫。\n破誤：「Is it friday today?」：問法對了，但星期的第一個字母沒有大寫；「Is today it Friday?」：把 today 放錯了位置；「What day is Friday?」：這樣問的是「星期五是星期幾」，意思不通。\n回頭讀：Unit 3 Sentence B（課本 p.55）、Learn with Boka（課本 p.56）。"
    ]
   ]
  },
  {
   "id": "en4-10",
   "z": 2,
   "name": "發音與閱讀",
   "lesson": "Unit 3",
   "draft": true,
   "intro": "o_e、oa、ow 都念長音 o（hole、goat、snow）；讀一週的打掃計畫，做筆記（Take Notes）。",
   "q": [
    [
     "請聽英文，選出你聽到的字。可以按喇叭聽每個選項。",
     "coat",
     [
      "goat",
      "boat",
      "cat"
     ],
     [
      "先聽中間的母音，是長音 o 還是別的音？",
      "再聽開頭是 k、g 還是 b 的音。",
      "這個字的開頭和 cola 的開頭一樣。"
     ],
     "正確概念：念的是 coat（外套）。oa 念長音 o，開頭的 c 念 k 的音。\n破誤：「goat」：c 和 g 的音很像，沒聽清楚開頭；「boat」：母音和結尾一樣，只聽後半就作答；「cat」：開頭和結尾一樣，但沒聽出 oa 念長音 o。\n回頭讀：Unit 3 Phonics Sound It Out（課本 p.60）。",
     {
      "listen": "coat",
      "rate": 0.8,
      "speakOptions": true
     }
    ],
    [
     "下面四個字，哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。",
     "not",
     [
      "hole",
      "goat",
      "snow"
     ],
     [
      "先聽每個字的母音，不要只看拼法。",
      "o_e、oa、ow 這三組字母都念長音 o。",
      "找一找哪一個字只有一個 o，後面沒有 e、a 或 w。"
     ],
     "正確概念：hole 的 o_e、goat 的 oa、snow 的 ow 都念長音 o；not 只有一個 o，念短音，所以不同。\n破誤：「hole」：看到 o_e 和 oa、ow 的字母不同，就以為念法也不同；「goat」：看到 oa 和 o_e、ow 的字母不同，就以為念法也不同；「snow」：看到 ow 結尾，就以為念法不同。\n回頭讀：Unit 3 Phonics Sound It Out（課本 p.60）、Listen and Circle（課本 p.61）。",
     {
      "speakOptions": true
     }
    ],
    [
     "哪一個字的 o 念長音，和 hole 的母音一樣？可以按喇叭聽每個字。",
     "hope",
     [
      "hot",
      "not",
      "on"
     ],
     [
      "先聽每個字的母音是長音還是短音。",
      "長音 o 可以拼成 o_e、oa 或 ow。",
      "找字尾有一個不發音的 e 的字。"
     ],
     "正確概念：hope 是 o_e 的拼法：字尾的 e 不發音，前面的 o 念長音，和 hole 一樣。hot、not、on 的 o 念短音。\n破誤：「hot」：看到 o 就選了，沒注意後面沒有不發音的 e；「not」：看到 o 就選了，沒注意字尾沒有不發音的 e；「on」：看到 o 就以為念長音。\n回頭讀：Unit 3 Phonics Sound It Out（課本 p.60）、Listen and Circle（課本 p.61）。",
     {
      "speakOptions": true
     }
    ],
    [
     "幫上面的短文做筆記：Max 星期二和星期五做什麼？",
     "騎腳踏車",
     [
      "游泳",
      "打掃房間",
      "休息"
     ],
     [
      "先在短文裡找到 Tuesday。",
      "看 Tuesday 和 Friday 在同一句，那一句的動作是什麼？",
      "rides a bike 的 bike 是什麼？"
     ],
     "正確概念：短文說 He rides a bike on Tuesday and Friday.，Max 星期二和星期五騎腳踏車。\n破誤：「游泳」：把星期一和星期四做的事記到星期二和星期五；「打掃房間」：把星期三和星期六做的事記錯了；「休息」：把星期日做的事當成星期二的。\n回頭讀：Unit 3 Reading（課本 pp.58–59）、Reading Skills：Take Notes。",
     {
      "passage": "Max is busy every week. He swims on Monday and Thursday. He rides a bike on Tuesday and Friday. He cleans his bedroom on Wednesday and Saturday. On Sunday, he takes a rest."
     }
    ],
    [
     "依上面的短文，Max 哪兩天打掃房間？",
     "星期三和星期六",
     [
      "星期一和星期四",
      "星期二和星期五",
      "星期日"
     ],
     [
      "先在短文裡找到 cleans 這個字。",
      "看那一句後面是哪兩天。",
      "把兩個星期翻成中文。"
     ],
     "正確概念：短文說 He cleans his bedroom on Wednesday and Saturday.，Max 星期三和星期六打掃房間。\n破誤：「星期一和星期四」：把游泳的日子當成打掃的日子；「星期二和星期五」：把騎腳踏車的日子當成打掃的日子；「星期日」：以為週末才打掃，但 Max 星期日休息。\n回頭讀：Unit 3 Reading（課本 pp.58–59）、Reading Skills：Take Notes。",
     {
      "passage": "Max is busy every week. He swims on Monday and Thursday. He rides a bike on Tuesday and Friday. He cleans his bedroom on Wednesday and Saturday. On Sunday, he takes a rest."
     }
    ],
    [
     "課本 Reading「A Busy Week」裡，大家星期一和星期四打掃哪裡？",
     "臥室（bedroom）",
     [
      "浴室（bathroom）",
      "客廳（living room）",
      "哪裡都不打掃"
     ],
     [
      "回想課本把每個地方配了兩天。",
      "星期一和星期四打掃完以後，地上不會再有玩具。",
      "玩具通常放在哪一個房間？"
     ],
     "正確概念：課本說 We clean the bedroom on Monday and Thursday. No more toys on the floor.：星期一和星期四打掃臥室。\n破誤：「浴室（bathroom）」：浴室是星期二和星期五打掃的；「客廳（living room）」：客廳是星期三和星期六打掃的；「哪裡都不打掃」：星期日才休息，星期一還要打掃。\n回頭讀：Unit 3 Reading（課本 p.58）。"
    ],
    [
     "請聽英文，回答：Joe 星期幾划船？",
     "星期六",
     [
      "星期日",
      "星期四",
      "星期二"
     ],
     [
      "先聽 Joe 有哪兩樣東西。",
      "再聽 On 後面是星期幾。",
      "這一天的開頭是 S，而且比 Sunday 長。"
     ],
     "正確概念：Joe 說 On Saturday, I row the boat with my goat.，他星期六划船。goat、boat 的 oa 和 row 的 ow 都念長音 o。\n破誤：「星期日」：Saturday 和 Sunday 開頭都是 S，沒聽清楚後面；「星期四」：Saturday 和 Thursday 都有 ur 的音，只聽中間就作答；「星期二」：沒聽到星期，就隨便猜了一天。\n回頭讀：Unit 3 Phonics Listen and Say（課本 p.61）、Vocabulary（課本 p.53）。",
     {
      "listen": "I'm Joe. I have a goat and a boat. On Saturday, I row the boat with my goat.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en4-11",
   "z": 3,
   "name": "字彙與聽力",
   "lesson": "Unit 4",
   "draft": true,
   "intro": "八個科目的英文：art、Chinese、English、math、music、PE、science、social studies。",
   "q": [
    [
     "請聽英文，選出你聽到的科目。",
     "science",
     [
      "social studies",
      "music",
      "Chinese"
     ],
     [
      "先聽開頭的音。",
      "開頭是 s 的有兩個選項，再聽它是一個字還是兩個字。",
      "這個科目只有一個字，母音和 night 一樣。"
     ],
     "正確概念：念的是 science（自然科學）。science 只有一個字，開頭的 sc 念 s 的音；social studies 是兩個字。\n破誤：「social studies」：開頭都是 s 的音，只聽開頭就作答；「music」：結尾都有 s 的音，只聽結尾就作答；「Chinese」：結尾有相似的音，沒聽清楚開頭。\n回頭讀：Unit 4 Vocabulary（課本 p.67）。",
     {
      "listen": "science",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出意思正確的中文。",
     "社會",
     [
      "自然科學",
      "音樂",
      "體育"
     ],
     [
      "先聽一共念了幾個字。",
      "這個科目有兩個字，第二個字是 studies。",
      "想想課本上學地方、歷史和生活的那一科。"
     ],
     "正確概念：念的是 social studies（社會），有兩個字；science 是自然科學，只有一個字。\n破誤：「自然科學」：social 和 science 開頭都是 s 的音，只聽開頭就作答；「音樂」：沒聽清楚，就選了課本上排在旁邊的科目；「體育」：只記得這個科目的英文很長，和體育記混了。\n回頭讀：Unit 4 Vocabulary（課本 p.67）。",
     {
      "listen": "social studies",
      "rate": 0.8
     }
    ],
    [
     "「體育」的英文是哪一個？",
     "PE",
     [
      "art",
      "music",
      "math"
     ],
     [
      "體育的英文很短，是一個縮寫。",
      "縮寫的每個字母都要大寫。",
      "這兩個字母是 Physical Education 這兩個字的開頭字母。"
     ],
     "正確概念：體育是 PE（Physical Education 的縮寫），兩個字母都大寫。\n破誤：「art」：美術和體育都是要動手動腳的課，記混了；「music」：音樂和體育常常在別的教室上，記混了；「math」：只記得是很短的英文，和數學記混了。\n回頭讀：Unit 4 Vocabulary（課本 p.67）。"
    ],
    [
     "「自然科學」的英文，哪一個拼對了？",
     "science",
     [
      "sience",
      "scence",
      "sciense"
     ],
     [
      "science 開頭的 s 後面有一個不發音的字母。",
      "先寫 sci，再寫 en。",
      "結尾和 nice 的結尾一樣，是 ce。"
     ],
     "正確概念：自然科學是 science：s-c-i-e-n-c-e。開頭 sc 念 s 的音，結尾是 ce。\n破誤：「sience」：照念的音拼，漏掉了 s 後面不發音的 c；「scence」：漏掉了中間的 i；「sciense」：把結尾的 ce 寫成 se。\n回頭讀：Unit 4 Vocabulary（課本 p.67）。"
    ],
    [
     "在 Unit 4 的故事裡，Boka 星期二有哪兩堂課？",
     "PE class and cooking class",
     [
      "math class and PE class",
      "art class and cooking class",
      "English class and PE class"
     ],
     [
      "回想故事裡 Kevin 猜 Boka 喜歡星期二。",
      "那天有 Boka 最喜歡的科目。",
      "Boka 還說那天他也有另一堂課，和吃東西有關。"
     ],
     "正確概念：Boka 最喜歡體育，他星期二有 PE class，還有 cooking class（烹飪課），所以他最喜歡星期二。\n破誤：「math class and PE class」：記得 Amy 數學考一百分，就以為 Boka 星期二有數學課；「art class and cooking class」：把 Jello 最喜歡的美術課當成 Boka 的；「English class and PE class」：把 Kevin 最喜歡的英語課當成 Boka 的。\n回頭讀：Unit 4 Story（課本 p.65）。"
    ],
    [
     "請聽英文，選出意思正確的中文。",
     "我最喜歡的科目是音樂。",
     [
      "我最喜歡的科目是數學。",
      "他最喜歡的科目是音樂。",
      "你最喜歡的科目是音樂嗎？"
     ],
     [
      "先聽句子開頭是 My、His 還是 What's。",
      "再聽 is 後面的科目。",
      "這個科目開頭是 m，有兩個音節。"
     ],
     "正確概念：My favorite subject is music. 是「我最喜歡的科目是音樂」。math 是數學，只有一個音節。\n破誤：「我最喜歡的科目是數學。」：music 和 math 開頭都是 m，只聽開頭就作答；「他最喜歡的科目是音樂。」：把開頭的 My 聽成 His；「你最喜歡的科目是音樂嗎？」：把說自己的事聽成問別人。\n回頭讀：Unit 4 Sentence A（課本 p.68）。",
     {
      "listen": "My favorite subject is music.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，選出正確的說法。",
     "Kay 最喜歡美術，Ben 最喜歡數學。",
     [
      "Kay 最喜歡數學，Ben 最喜歡美術。",
      "Kay 和 Ben 都最喜歡美術。",
      "Kay 最喜歡音樂，Ben 最喜歡數學。"
     ],
     [
      "先聽 Ben 問 Kay 什麼，Kay 怎麼回答。",
      "How about you? 是「那你呢？」，換 Ben 回答。",
      "I like … the best. 也是在說最喜歡的科目。"
     ],
     "正確概念：Kay 說 My favorite subject is art.（最喜歡美術）；Ben 說 I like math the best.（最喜歡數學）。\n破誤：「Kay 最喜歡數學，Ben 最喜歡美術。」：兩個科目都聽對了，但配錯了人；「Kay 和 Ben 都最喜歡美術。」：沒聽到 Ben 最後說他最喜歡的科目；「Kay 最喜歡音樂，Ben 最喜歡數學。」：沒聽清楚 Kay 說的科目。\n回頭讀：Unit 4 Sentence A（課本 p.68）、Grammar Tips（課本 p.71）。",
     {
      "listen": "Ben: What's your favorite subject, Kay? Kay: My favorite subject is art. How about you, Ben? Ben: I like math the best.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en4-12",
   "z": 3,
   "name": "句型與文法",
   "lesson": "Unit 4",
   "draft": true,
   "intro": "What's your favorite subject? My favorite subject is English. What's his favorite subject? His favorite subject is science. 分清楚 my、your、his、her、our、their。",
   "q": [
    [
     "你想問同學最喜歡的科目，選出正確的字填入空格：「What's ____ favorite subject?」",
     "your",
     [
      "you",
      "you're",
      "my"
     ],
     [
      "這句是在問「你的」最喜歡的科目。",
      "「你」是 you，「你的」要怎麼說？",
      "回想 Learn with Boka：你的、我的、他的……"
     ],
     "正確概念：問對方：What's your favorite subject?。your 是「你的」。\n破誤：「you」：用了「你」，沒有用「你的」；「you're」：you're 是 you are 的縮寫，不是「你的」；「my」：用了「我的」，變成問自己。\n回頭讀：Unit 4 Sentence A（課本 p.68）、Learn with Boka（課本 p.70）。"
    ],
    [
     "「What's Kevin's favorite subject?」Kevin 最喜歡英語，要怎麼回答？",
     "His favorite subject is English.",
     [
      "Her favorite subject is English.",
      "He favorite subject is English.",
      "Kevin favorite subject is English."
     ],
     [
      "Kevin 是男生還是女生？",
      "要說「他的」最喜歡的科目，不是「他」。",
      "回想 Sentence B：男生用 His，女生用 Her。"
     ],
     "正確概念：Kevin 是男生，「他的」是 his：His favorite subject is English.\n破誤：「Her favorite subject is English.」：Kevin 是男生，要用 his；「He favorite subject is English.」：用了「他」，沒有用「他的」；「Kevin favorite subject is English.」：用人名時要加 's，變成 Kevin's。\n回頭讀：Unit 4 Sentence B（課本 p.69）。"
    ],
    [
     "Amy 最喜歡自然科學。選出正確的字填入空格：「____ favorite subject is science.」",
     "Her",
     [
      "She",
      "His",
      "Amy"
     ],
     [
      "空格要填「她的」。",
      "Amy 是女生，「她」是 she。",
      "「她的」和「她」寫法不一樣，回想 Learn with Boka。"
     ],
     "正確概念：Amy 是女生，「她的」是 her：Her favorite subject is science.\n破誤：「She」：用了「她」，沒有用「她的」；「His」：Amy 是女生，不能用 his；「Amy」：用人名時要加 's，寫成 Amy's。\n回頭讀：Unit 4 Sentence B（課本 p.69）、Learn with Boka（課本 p.70）。"
    ],
    [
     "Tom 和我都最喜歡體育。選出正確的字填入空格：「____ favorite subject is PE.」",
     "Our",
     [
      "We",
      "Their",
      "My"
     ],
     [
      "Tom 和我，合起來是「我們」。",
      "空格要填「我們的」。",
      "回想 Learn with Boka 最後一行：你們的、我們的、他們的。"
     ],
     "正確概念：Tom 和我是「我們」，「我們的」是 our：Our favorite subject is PE.\n破誤：「We」：用了「我們」，沒有用「我們的」；「Their」：用了「他們的」，但說話的人自己也在裡面；「My」：只說了自己，漏掉了 Tom。\n回頭讀：Unit 4 Learn with Boka（課本 p.70）。"
    ],
    [
     "Boka 和 Jello 都最喜歡國語。選出正確的字填入空格：「____ favorite subject is Chinese.」",
     "Their",
     [
      "They",
      "Our",
      "His"
     ],
     [
      "Boka 和 Jello 是兩個人，可以用 they 代替。",
      "空格要填「他們的」。",
      "「他們的」和 they 開頭一樣都是 the，但寫法不同。"
     ],
     "正確概念：兩個別人是「他們」，「他們的」是 their：Their favorite subject is Chinese.\n破誤：「They」：用了「他們」，沒有用「他們的」；「Our」：說話的人不在裡面，不能用「我們的」；「His」：兩個人要用「他們的」，不能只用一個人的 his。\n回頭讀：Unit 4 Learn with Boka（課本 p.70）、Grammar Tips（課本 p.71）。"
    ],
    [
     "依表格回答：「What's Dan's favorite subject?」",
     "His favorite subject is music.",
     [
      "Her favorite subject is music.",
      "His favorite subject is PE.",
      "His favorite subject are music."
     ],
     [
      "先在表格找到 Dan 那一列。",
      "Dan 是男生，「他的」要用哪個字？",
      "最後檢查 subject 後面的 be 動詞。"
     ],
     "正確概念：Dan 最喜歡音樂，他是男生，用 his：His favorite subject is music.\n破誤：「Her favorite subject is music.」：Dan 是男生，要用 his；「His favorite subject is PE.」：把 Mia 最喜歡的科目當成 Dan 的；「His favorite subject are music.」：一個科目要用 is，不用 are。\n回頭讀：Unit 4 Sentence B（課本 p.69）。",
     {
      "t": [
       [
        "名字",
        "最喜歡的科目"
       ],
       [
        "Mia",
        "PE"
       ],
       [
        "Dan",
        "music"
       ]
      ],
      "cap": "Mia 是女生，Dan 是男生"
     }
    ],
    [
     "下面哪一句英文是正確的？",
     "What's her favorite subject?",
     [
      "What's she favorite subject?",
      "What her favorite subject?",
      "What's her favorite subjects?"
     ],
     [
      "先看 What 後面有沒有 is。",
      "再看「她的」寫對了沒有。",
      "最後看「最喜歡的科目」是一個還是很多個。"
     ],
     "正確概念：What's 是 What is；「她的」是 her；最喜歡的科目只有一個：What's her favorite subject?\n破誤：「What's she favorite subject?」：用了「她」，沒有用「她的」；「What her favorite subject?」：漏了 is，What's 是 What is 的縮寫；「What's her favorite subjects?」：最喜歡的只有一個科目，不能用複數。\n回頭讀：Unit 4 Sentence B（課本 p.69）。"
    ]
   ]
  },
  {
   "id": "en4-13",
   "z": 3,
   "name": "發音與閱讀",
   "lesson": "Unit 4",
   "draft": true,
   "intro": "u_e 有兩種念法（cute、Luke），ue、ui 念 [u]（glue、fruit）；比較兩個人喜歡的科目（Compare and Contrast）。",
   "q": [
    [
     "請聽英文，選出你聽到的字。可以按喇叭聽每個選項。",
     "glue",
     [
      "blue",
      "flute",
      "fruit"
     ],
     [
      "四個字的母音都一樣，要比開頭和結尾。",
      "先聽開頭是 gl、bl 還是 fl、fr。",
      "再聽結尾有沒有 t 的音。"
     ],
     "正確概念：念的是 glue（膠水）。開頭是 gl，結尾沒有 t；blue 開頭是 bl。\n破誤：「blue」：母音一樣，但沒聽清楚開頭是 g 還是 b；「flute」：母音一樣，但沒注意 flute 結尾還有 t 的音；「fruit」：母音一樣，但沒注意 fruit 開頭是 fr、結尾有 t。\n回頭讀：Unit 4 Phonics Sound It Out（課本 p.74）。",
     {
      "listen": "glue",
      "rate": 0.8,
      "speakOptions": true
     }
    ],
    [
     "下面四個字，哪一個字的母音念法和其他三個不同？可以按喇叭聽每個字。",
     "clay",
     [
      "Luke",
      "glue",
      "fruit"
     ],
     [
      "先聽每個字的母音，不要只看拼法。",
      "Luke 的 u_e、glue 的 ue、fruit 的 ui 念法一樣。",
      "找一找哪一個字裡沒有 u，母音和 day 一樣。"
     ],
     "正確概念：Luke、glue、fruit 的母音念法一樣；clay 的 ay 念長音 a，和 day 一樣，所以不同。\n破誤：「Luke」：看到 u_e 和 ue、ui 的字母不同，就以為念法也不同；「glue」：看到 ue 和 u_e、ui 的字母不同，就以為念法也不同；「fruit」：看到 ui 和 u_e、ue 的字母不同，就以為念法也不同。\n回頭讀：Unit 4 Phonics Sound It Out（課本 p.74）、Listen and Circle（課本 p.75）。",
     {
      "speakOptions": true
     }
    ],
    [
     "u_e 有兩種念法。哪一個字的 u_e 念法和 cute 一樣（母音前面先有 y 的音）？可以按喇叭聽每個字。",
     "mule",
     [
      "Luke",
      "flute",
      "glue"
     ],
     [
      "先念 cute，c 和 u 之間像多了一個 y 的音。",
      "Luke 的 u_e 沒有 y 的音，是另一種念法。",
      "一個一個聽，找母音前面也有 y 的音的字。"
     ],
     "正確概念：u_e 有兩種念法：cute、mule 念 [ju]（母音前有 y 的音）；Luke、flute 念 [u]。glue 的 ue 也念 [u]。\n破誤：「Luke」：Luke 也是 u_e，但它的母音前面沒有 y 的音；「flute」：flute 也是 u_e，但念法和 Luke 一樣；「glue」：glue 是 ue 的拼法，母音前面沒有 y 的音。\n回頭讀：Unit 4 Phonics Sound It Out（課本 p.74）、Listen and Circle（課本 p.75）。",
     {
      "speakOptions": true
     }
    ],
    [
     "依上面的短文，Nick 和 Lucy 都喜歡哪一科？",
     "英語",
     [
      "音樂",
      "美術",
      "數學"
     ],
     [
      "先找出兩個人各自在星期一上什麼課。",
      "再找兩個人一起上的課。",
      "both 是「兩個都」，看那一句前面說的是哪一科。"
     ],
     "正確概念：星期一 Nick 上音樂、Lucy 上美術，兩人不一樣；星期四兩人都上英語，They both like English.\n破誤：「音樂」：只看到 Nick 上音樂課，沒注意 Lucy 不在音樂課；「美術」：只看到 Lucy 上美術課，沒注意 Nick 不在美術課；「數學」：短文沒有提到數學。\n回頭讀：Unit 4 Reading（課本 pp.72–73）、Reading Skills：Compare and Contrast。",
     {
      "passage": "Nick has music class on Monday. He is singing. Lucy has art class on Monday. She is painting. On Thursday, Nick and Lucy have English class. They are reading English books. They both like English."
     }
    ],
    [
     "依上面的短文，Lucy 星期一在做什麼？",
     "畫畫",
     [
      "唱歌",
      "讀英文書",
      "寫中文字"
     ],
     [
      "先找到 Lucy 星期一上的課。",
      "再看下一句 She is … 說她在做什麼。",
      "painting 是 paint 加 ing，paint 是什麼？"
     ],
     "正確概念：Lucy has art class on Monday. She is painting.：Lucy 星期一在美術課畫畫。\n破誤：「唱歌」：把 Nick 在音樂課做的事當成 Lucy 的；「讀英文書」：這是兩人星期四在英語課做的事；「寫中文字」：把課本 Boka 和 Jello 在國語課做的事帶進來。\n回頭讀：Unit 4 Reading（課本 pp.72–73）。",
     {
      "passage": "Nick has music class on Monday. He is singing. Lucy has art class on Monday. She is painting. On Thursday, Nick and Lucy have English class. They are reading English books. They both like English."
     }
    ],
    [
     "課本 Reading「My Favorite Subject」裡，Boka 在體育課做什麼？",
     "打樂樂棒球（tee ball）",
     [
      "畫畫（painting）",
      "寫中文字（writing Chinese words）",
      "做菜（cooking）"
     ],
     [
      "回想課本裡 Boka 星期二上的課。",
      "他在那堂課 is playing 某一種球。",
      "那種球的英文是兩個字，第二個字是 ball。"
     ],
     "正確概念：課本說 Boka has PE class on Tuesday. He is playing tee ball.：Boka 在體育課打樂樂棒球。\n破誤：「畫畫（painting）」：這是 Jello 在美術課做的事；「寫中文字（writing Chinese words）」：這是 Boka 和 Jello 一起在國語課做的事；「做菜（cooking）」：把故事裡的烹飪課和課本短文記混了。\n回頭讀：Unit 4 Reading（課本 p.72）。"
    ],
    [
     "請聽英文，選出正確的說法。",
     "Sue 星期五在音樂課吹藍色的笛子。",
     [
      "Sue 星期四在音樂課吹藍色的笛子。",
      "Sue 星期五在美術課吹藍色的笛子。",
      "Sue 星期五在音樂課吹黃色的笛子。"
     ],
     [
      "先聽 Sue 的笛子是什麼顏色。",
      "再聽她在哪一堂課吹笛子。",
      "最後聽 on 後面的星期，開頭是 F。"
     ],
     "正確概念：Sue 說 I have a blue flute. I play it in music class on Friday.：星期五在音樂課吹藍色的笛子。blue、flute 的母音和 Sue 一樣。\n破誤：「Sue 星期四在音樂課吹藍色的笛子。」：沒聽清楚 on 後面的星期；「Sue 星期五在美術課吹藍色的笛子。」：星期聽對了，但沒聽清楚是哪一堂課；「Sue 星期五在音樂課吹黃色的笛子。」：沒聽清楚 flute 前面的顏色。\n回頭讀：Unit 4 Phonics Listen and Say（課本 p.75）、Sentence A（課本 p.68）。",
     {
      "listen": "My name is Sue. I have a blue flute. I play it in music class on Friday.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en4-14",
   "z": 3,
   "name": "綜合複習",
   "lesson": "Review 2",
   "draft": true,
   "intro": "Unit 3～4 一起複習：星期、科目、問今天星期幾和最喜歡的科目，再比較兩封信裡的人（Compare and Contrast）。",
   "q": [
    [
     "下面哪一個不是科目？",
     "Thursday",
     [
      "science",
      "music",
      "art"
     ],
     [
      "先把每個字翻成中文。",
      "這四個字裡有三個是 Unit 4 的科目。",
      "剩下的那一個是 Unit 3 學過的，結尾是 day。"
     ],
     "正確概念：Thursday 是星期四，是 Unit 3 的星期；science（自然科學）、music（音樂）、art（美術）都是 Unit 4 的科目。\n破誤：「science」：不熟自然科學的英文，就以為它不是科目；「music」：把音樂當成休閒活動，沒想到它也是一個科目；「art」：不熟美術的英文，就以為它不是科目。\n回頭讀：Unit 3 Vocabulary（課本 p.53）、Unit 4 Vocabulary（課本 pp.66–67）。"
    ],
    [
     "請聽英文，選出意思正確的中文。",
     "今天是星期三，Lily 在體育課游泳。",
     [
      "今天是星期四，Lily 在體育課游泳。",
      "今天是星期三，Lily 在音樂課唱歌。",
      "今天是星期三，Lily 在體育課畫畫。"
     ],
     [
      "先聽今天是星期幾，開頭是 W。",
      "再聽 Lily 上的是哪一堂課。",
      "最後聽 She is 後面的動作。"
     ],
     "正確概念：Today is Wednesday. Lily has PE class. She is swimming.：今天是星期三，Lily 在體育課游泳。\n破誤：「今天是星期四，Lily 在體育課游泳。」：沒聽清楚 Today is 後面的星期；「今天是星期三，Lily 在音樂課唱歌。」：星期聽對了，但課和動作都聽錯了；「今天是星期三，Lily 在體育課畫畫。」：課聽對了，但沒聽清楚她在做什麼。\n回頭讀：Unit 3 Sentence A（課本 p.54）、Review 2 Listen and Number（課本 p.77）。",
     {
      "listen": "Today is Wednesday. Lily has PE class. She is swimming.",
      "rate": 0.9
     }
    ],
    [
     "下面哪一組問答是正確的？",
     "Is it Tuesday today? — Yes, it is. I have PE class.",
     [
      "Is it Tuesday today? — Yes, it isn't. I have PE class.",
      "What day is today? — My favorite subject is PE.",
      "What's your favorite subject? — It's Tuesday."
     ],
     [
      "先看每一組的問句在問什麼。",
      "問星期幾，就要回答星期；問科目，就要回答科目。",
      "再檢查 Yes 或 No 後面的簡答有沒有配對。"
     ],
     "正確概念：Is it Tuesday today? 回答 Yes, it is.，再補充 I have PE class.。問句和回答要配合：問星期回答星期，問科目回答科目。\n破誤：「Is it Tuesday today? — Yes, it isn't. I have PE class.」：Yes 後面要用 it is，不能用 isn't；「What day is today? — My favorite subject is PE.」：問的是星期幾，卻回答最喜歡的科目；「What's your favorite subject? — It's Tuesday.」：問的是最喜歡的科目，卻回答星期幾。\n回頭讀：Unit 3 Sentence B（課本 p.55）、Unit 4 Sentence A（課本 p.68）。"
    ],
    [
     "上面是 Ruby 和 Josh 寫的兩段話。他們兩個都喜歡哪一科？",
     "自然科學",
     [
      "體育",
      "數學",
      "英語"
     ],
     [
      "先找出 Ruby 喜歡和不喜歡的科目。",
      "再找出 Josh 喜歡和不喜歡的科目。",
      "Josh 說 I like …, too.，too 表示他和 Ruby 一樣。"
     ],
     "正確概念：Ruby 最喜歡 science，Josh 說 I like science, too.，兩個人都喜歡自然科學；兩人都不喜歡數學。\n破誤：「體育」：只看到 Josh 最喜歡體育，沒看 Ruby 有沒有說喜歡；「數學」：兩個人都提到數學，但都是 don't like；「英語」：兩段話都沒有提到英語。\n回頭讀：Review 2 Read, Circle, and Write（課本 pp.78–79）、Reading Skills：Compare and Contrast。",
     {
      "passage": "Hi, I'm Ruby. My favorite subject is science. I have science class on Monday. I don't like math. — Hi, I'm Josh. My favorite subject is PE. I have PE class on Friday. I like science, too. I don't like math."
     }
    ],
    [
     "依上面兩段話，哪一個說法是對的？",
     "Josh 星期五有體育課。",
     [
      "Ruby 最喜歡數學。",
      "Josh 不喜歡自然科學。",
      "Ruby 星期五有自然課。"
     ],
     [
      "一個一個選項回到短文裡找證據。",
      "注意 don't like 和 like 的不同。",
      "比一比兩個人各自的課是星期幾。"
     ],
     "正確概念：Josh 說 I have PE class on Friday.，所以「Josh 星期五有體育課」是對的。\n破誤：「Ruby 最喜歡數學。」：Ruby 說的是 I don't like math.；「Josh 不喜歡自然科學。」：Josh 說 I like science, too.；「Ruby 星期五有自然課。」：星期五是 Josh 的體育課；Ruby 的自然課在星期一。\n回頭讀：Review 2 Read, Circle, and Write（課本 pp.78–79）。",
     {
      "passage": "Hi, I'm Ruby. My favorite subject is science. I have science class on Monday. I don't like math. — Hi, I'm Josh. My favorite subject is PE. I have PE class on Friday. I like science, too. I don't like math."
     }
    ],
    [
     "哪一個字的母音和 boat 的母音相同？可以按喇叭聽每個字。",
     "snow",
     [
      "not",
      "glue",
      "night"
     ],
     [
      "先念 boat，它的 oa 念什麼音？",
      "長音 o 還可以拼成 o_e 或 ow。",
      "找一個用 ow 拼出長音 o 的字。"
     ],
     "正確概念：boat 的 oa 和 snow 的 ow 都念長音 o；not 念短音 o，glue 念 [u]，night 念長音 i。\n破誤：「not」：看到 o 就選了，沒注意 not 的 o 念短音；「glue」：把 ue 的音和長音 o 聽混了；「night」：看到 night 和 snow 一樣有不發音的字母，就以為念法一樣。\n回頭讀：Unit 3 Phonics（課本 p.60）、Review 2 Write, Read, and Play（課本 p.80）。",
     {
      "speakOptions": true
     }
    ],
    [
     "請聽對話，選出正確的說法。",
     "今天是星期五，Mark 最喜歡音樂。",
     [
      "今天是星期四，Mark 最喜歡音樂。",
      "今天是星期五，Ruby 最喜歡音樂。",
      "今天是星期五，Mark 最喜歡數學。"
     ],
     [
      "先聽 Mark 問今天是不是星期四，Ruby 怎麼回答。",
      "Ruby 說 No 以後，又說了今天真正是星期幾。",
      "最後聽 Mark 說哪一科是 my favorite subject。"
     ],
     "正確概念：Ruby 說 No, it isn't. It's Friday.，今天是星期五；Mark 說 Music is my favorite subject.，他最喜歡音樂。\n破誤：「今天是星期四，Mark 最喜歡音樂。」：聽到問句裡的 Thursday 就選了，沒聽到 Ruby 說 No；「今天是星期五，Ruby 最喜歡音樂。」：說最喜歡音樂的是 Mark，不是 Ruby；「今天是星期五，Mark 最喜歡數學。」：music 和 math 開頭都是 m，沒聽清楚。\n回頭讀：Unit 3 Sentence B（課本 p.55）、Unit 4 Sentence A（課本 p.68）。",
     {
      "listen": "Mark: Is it Thursday today? Ruby: No, it isn't. It's Friday. We have music class today. Mark: Great! Music is my favorite subject.",
      "rate": 0.9
     }
    ]
   ]
  }
 ]
};
