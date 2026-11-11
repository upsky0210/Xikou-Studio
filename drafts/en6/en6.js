// 國小全科練習平台 — en6（六上英語・康軒 Wonder World 9）資料物件骨架（2026-11-08，Claude Code 建立）
// 題目由 Codex 依「國小練習平台-英語題庫規劃書-Codex.md」編寫在 drafts/en6/en6-questions-*.json，
//   再用 node tools/assemble.mjs drafts/en6/en6.js EN6 drafts/en6/en6-questions-*.json 組進本檔（只填 q）。
// 關卡與區域由 Claude Code 決定，Codex 不要改 levels 的 id、z、name、lesson、intro 與 zones。
// levels[].q 為位置陣列：[題幹, 正解, [干擾x3], [提示x3], 詳解, 附件?]；聽力附件 {listen, rate?, speakOptions?}。
const EN6 = {
 "id": "en6",
 "subj": "英語",
 "pub": "康軒",
 "sem": "六上",
 "grade": 6,
 "note": "題目依康軒六上英語（Wonder World 9）各單元的學習重點自行編寫；聽力由瀏覽器英語語音朗讀，情境與對話皆為原創。",
 "zones": [
  {
   "name": "Unit 1 First Day of School"
  },
  {
   "name": "Unit 2 A Great Day"
  },
  {
   "name": "Unit 3 Amy's Graduation Trip"
  },
  {
   "name": "Unit 4 A Small World"
  },
  {
   "name": "Culture & Festivals"
  }
 ],
 "levels": [
  {
   "id": "en6-01",
   "z": 0,
   "name": "字彙與聽力",
   "lesson": "Unit 1",
   "draft": true,
   "intro": "昨天做了什麼：played the recorder、cooked dinner、walked the dog 等動詞片語，聽音選字與聽短句。",
   "q": [
    [
     "請聽英文，選出你聽到的句子。",
     "I cooked dinner yesterday.",
     [
      "I cook dinner every day.",
      "I cooked dinner last night.",
      "I cooked dessert yesterday."
     ],
     [
      "先聽動作，再聽句尾的時間。",
      "句尾的時間是 yesterday、last night 還是 every day？",
      "說的是昨天做的事，煮的是晚餐。"
     ],
     "正確概念：念的是 I cooked dinner yesterday.（我昨天煮了晚餐）。-ed 在句子裡常念得很輕，要靠句尾的 yesterday 判斷是過去的事。\n破誤：「I cook dinner every day.」：句尾說的是 yesterday，不是 every day；說的是昨天做過的事；「I cooked dinner last night.」：動作相同，但把 yesterday 聽成 last night；「I cooked dessert yesterday.」：時間相同，但把晚餐 dinner 聽成甜點 dessert。\n回頭讀：Unit 1 Vocabulary、Sentence A（課本 pp.10–12）。",
     {
      "listen": "I cooked dinner yesterday.",
      "rate": 0.85
     }
    ],
    [
     "請聽英文，選出你聽到的片語。",
     "watched a movie",
     [
      "watched TV",
      "watched a musical",
      "watched a basketball game"
     ],
     [
      "先聽動詞後面看的東西。",
      "電視、電影、音樂劇、球賽，聽清楚是哪一個。",
      "整個片語是在說看了一部電影。"
     ],
     "正確概念：念的是 watched a movie（看了電影），不是 watched TV、watched a musical 或 watched a basketball game。\n破誤：「watched TV」：動詞相同，但把電影聽成電視；「watched a musical」：只聽到最後一字相近的開頭，就把電影聽成音樂劇；「watched a basketball game」：動詞相同，但把電影聽成籃球比賽。\n回頭讀：Unit 1 Vocabulary（課本 pp.10–11）。",
     {
      "listen": "watched a movie",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出片語的中文意思。",
     "吹直笛",
     [
      "打籃球",
      "玩線上遊戲",
      "聽音樂"
     ],
     [
      "注意動作後面接的是什麼。",
      "同一個動詞可搭配運動、遊戲或樂器。",
      "這裡說的是一種用嘴吹奏的樂器。"
     ],
     "正確概念：念的是 played the recorder，意思是吹直笛。\n破誤：「打籃球」：只聽出 played，沒有辨認後面的樂器；「玩線上遊戲」：把 played 後的名詞當成 online games；「聽音樂」：把演奏樂器和聆聽音樂混為一談。\n回頭讀：Unit 1 Vocabulary、More Words（課本 pp.10–11、15）。",
     {
      "listen": "played the recorder",
      "rate": 0.8
     }
    ],
    [
     "哪個過去式片語表示「澆花」？",
     "watered the flowers",
     [
      "visited my grandparents",
      "played online games",
      "listened to music"
     ],
     [
      "找出與植物有關的名詞。",
      "water 也能當動詞，表示澆水。",
      "規則過去式在 water 後面加 -ed。"
     ],
     "正確概念：watered the flowers 表示澆花，屬於課本 More Words。\n破誤：「visited my grandparents」：這是探望祖父母，沒有照顧植物的意思；「played online games」：這是玩線上遊戲，不是澆花；「listened to music」：這是聽音樂，不是給花澆水。\n回頭讀：Unit 1 More Words（課本 p.15）。"
    ],
    [
     "選出最合適的片語：\"My room was dirty. I ______ yesterday. Now it is clean.\"",
     "cleaned the room",
     [
      "played the recorder",
      "visited my grandparents",
      "watched a movie"
     ],
     [
      "看看前後兩句，房間有什麼變化。",
      "空格要填能造成這種變化的動作。",
      "從髒變乾淨，表示昨天做了打掃。"
     ],
     "正確概念：cleaned the room 表示打掃房間，符合前後文的變化。\n破誤：「played the recorder」：吹直笛不能解釋房間從髒變乾淨；「visited my grandparents」：探望祖父母不能解釋房間的變化；「watched a movie」：看電影沒有整理房間的意思。\n回頭讀：Unit 1 Vocabulary（課本 pp.10–11）。"
    ],
    [
     "請聽句子，選出最符合的中文描述。",
     "昨天遛狗",
     [
      "今天遛狗",
      "昨天洗狗",
      "昨晚看電影"
     ],
     [
      "分別注意動作和時間。",
      "先確認是在說今天還是已過去的一天。",
      "說話者昨天帶狗出去散步。"
     ],
     "正確概念：句子是 I walked the dog yesterday.，意思是我昨天遛狗。\n破誤：「今天遛狗」：動作相同，但把昨天聽成今天；「昨天洗狗」：把 walked 誤聽為 washed，動作不同；「昨晚看電影」：把遛狗換成別的本課活動，時間也不同。\n回頭讀：Unit 1 Vocabulary、Sentence A（課本 pp.10–12）。",
     {
      "listen": "I walked the dog yesterday.",
      "rate": 0.8
     }
    ],
    [
     "請聽對話，Amy 昨天做了什麼？",
     "探望祖父母",
     [
      "打掃房間",
      "看了一部電影",
      "吹奏直笛"
     ],
     [
      "先分清楚兩個說話者。",
      "留意被問到的人如何回答。",
      "她做的是去探望家人。"
     ],
     "正確概念：原創對話：Kevin: I cleaned the room yesterday. What did you do, Amy? Amy: I visited my grandparents. Amy 探望祖父母，打掃房間的是 Kevin。\n破誤：「打掃房間」：這是 Kevin 說自己做的事；「看了一部電影」：對話沒有說 Amy 看電影；「吹奏直笛」：把本課另一個活動套到 Amy 身上。\n回頭讀：Unit 1 Vocabulary、Sentence A（課本 pp.10–12）。",
     {
      "listen": "Kevin: I cleaned the room yesterday. What did you do, Amy? Amy: I visited my grandparents.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en6-02",
   "z": 0,
   "name": "句型與文法",
   "lesson": "Unit 1",
   "draft": true,
   "intro": "What did you do yesterday? Did you…? Yes, I did. / No, I didn't. 規則動詞過去式與時間詞。",
   "q": [
    [
     "在 \"Amy ______ her grandparents last Friday.\" 中，visit 應改成哪個形式？",
     "visited",
     [
      "visits",
      "visit",
      "visiting"
     ],
     [
      "先找句尾的時間詞。",
      "last Friday 表示過去，visit 是規則動詞。",
      "在原形後加上 -ed。"
     ],
     "正確概念：visit 的過去式是 visited，符合 last Friday。\n破誤：「visits」：把第三人稱現在式用在 last Friday 的過去情境；「visit」：沒有依過去時間改變動詞；「visiting」：把 -ing 形式當成可單獨使用的過去式。\n回頭讀：Unit 1 Sentence A／Grammar Tips（課本 p.12）。"
    ],
    [
     "選字完成問句：\"______ you watch TV last night?\"",
     "Did",
     [
      "Do",
      "Does",
      "Are"
     ],
     [
      "先看時間，再看主詞和動詞。",
      "詢問過去做過的動作，要用過去式助動詞。",
      "後面的 watch 已經是原形。"
     ],
     "正確概念：last night 是過去時間，問句用 Did you 加原形動詞。\n破誤：「Do」：忽略 last night，使用現在式助動詞；「Does」：主詞 you 不用 does，且本題是過去時間；「Are」：將 be 動詞放在原形 watch 前，不能形成此問句。\n回頭讀：Unit 1 Sentence B／Grammar Tips（課本 p.13）；More Words（課本 p.15）。"
    ],
    [
     "\"What did you do last night?\" 最適合接哪一句？",
     "I watched TV.",
     [
      "I watch TV every night.",
      "Yes, I do.",
      "No, I did not."
     ],
     [
      "先辨認這是問活動，還是問有沒有做。",
      "回答要說明過去的活動。",
      "找出用過去式直接說昨晚活動的句子。"
     ],
     "正確概念：I watched TV. 直接回答昨晚的活動。\n破誤：「I watch TV every night.」：回答每天的習慣，沒有回答昨晚做了什麼；「Yes, I do.」：只作現在式肯定簡答，沒有回答昨晚做了什麼；「No, I did not.」：只作否定簡答，沒有說明做了什麼。\n回頭讀：Unit 1 Sentence A（課本 p.12）；More Words（課本 p.15）。"
    ],
    [
     "四個句子中，哪一句完全正確？",
     "Did you visit Amy?",
     [
      "Did you visited Amy?",
      "Amy visit me yesterday.",
      "Amy did not visited me."
     ],
     [
      "檢查助動詞後面的動詞。",
      "用了 did 或 did not，後面的動詞要用原形。",
      "正確問句中的 visit 不需要再加 -ed。"
     ],
     "正確概念：Did you visit Amy? 的 did 搭配原形 visit，句型正確。\n破誤：「Did you visited Amy?」：did 後仍使用 visited，應還原成 visit；「Amy visit me yesterday.」：yesterday 要用 visited，不能用 visit；「Amy did not visited me.」：did not 後應接 visit，不再加 -ed。\n回頭讀：Unit 1 Sentence A／B（課本 pp.12–13）。"
    ],
    [
     "要表達「我昨天聽了音樂」，哪一句正確？",
     "I listened to music yesterday.",
     [
      "I listen to music yesterday.",
      "I listen to music every day.",
      "I listened to music last Friday."
     ],
     [
      "先對照中文指定的時間。",
      "昨天用過去式；每天表示習慣。",
      "動詞與 yesterday 要同時符合題意。"
     ],
     "正確概念：昨天用 yesterday，listen 的過去式是 listened。\n破誤：「I listen to music yesterday.」：yesterday 是過去，不能用 listen；「I listen to music every day.」：句子表示每天的習慣，不是昨天的事；「I listened to music last Friday.」：動詞正確，但把昨天改成上週五。\n回頭讀：Unit 1 Grammar Tips（課本 pp.12–13）；More Words（課本 p.15）。"
    ],
    [
     "請聽問句。假設你確實做了對方問的事，哪一句回答正確？",
     "Yes, I did.",
     [
      "Yes, I do.",
      "Yes, I am.",
      "Yes, I does."
     ],
     [
      "先聽問句開頭。",
      "肯定簡答要使用與問句相同的助動詞。",
      "對過去動作的肯定簡答，要用過去式。"
     ],
     "正確概念：問句是 Did you water the flowers last Friday?；肯定回答是 Yes, I did.。\n破誤：「Yes, I do.」：把過去問句回答成現在式；「Yes, I am.」：問的是動作，不是 be 動詞句；「Yes, I does.」：I 不搭配 does，且時間不是現在。\n回頭讀：Unit 1 Sentence B（課本 p.13）；More Words（課本 p.15）。",
     {
      "listen": "Did you water the flowers last Friday?",
      "rate": 0.9
     }
    ],
    [
     "依 Amy 的活動紀錄，哪一句符合「昨天」那一列？",
     "Amy cooked dinner yesterday.",
     [
      "Amy watched a movie yesterday.",
      "Amy cooks dinner yesterday.",
      "Amy cooked dinner last Friday."
     ],
     [
      "先找出昨天那一列。",
      "活動和時間都要符合紀錄，動詞也要用過去式。",
      "昨天的活動是煮晚餐。"
     ],
     "正確概念：紀錄中的昨天是 cooked dinner，因此用 Amy cooked dinner yesterday.。\n破誤：「Amy watched a movie yesterday.」：把上週五的活動移到昨天；「Amy cooks dinner yesterday.」：昨天已經過去，不能用 cooks；「Amy cooked dinner last Friday.」：把煮晚餐的日期改成上週五。\n回頭讀：Unit 1 Vocabulary、Grammar Tips（課本 pp.10–13）。",
     {
      "t": [
       [
        "時間",
        "Amy 的活動"
       ],
       [
        "last Friday",
        "watched a movie"
       ],
       [
        "yesterday",
        "cooked dinner"
       ]
      ],
      "cap": "Amy 的活動紀錄（原創）"
     }
    ]
   ]
  },
  {
   "id": "en6-03",
   "z": 0,
   "name": "發音與閱讀",
   "lesson": "Unit 1",
   "draft": true,
   "intro": "-ed 的三種讀音 [d] [t] [ɪd]；故事理解與推論（Make Inferences）。",
   "q": [
    [
     "請聽單字，選出它的 -ed 字尾讀音。",
     "-ed 讀 [ɪd]",
     [
      "-ed 讀 [d]",
      "-ed 讀 [t]",
      "-ed 不發音"
     ],
     [
      "聽聽結尾是否多出一個音節。",
      "本課有三組 -ed 讀音，先排除沒有念字尾的說法。",
      "這個字屬於結尾多出一個音節的一組。"
     ],
     "正確概念：念的是 landed；land 以 d 結尾，加 -ed 後字尾讀 [ɪd]。\n破誤：「-ed 讀 [d]」：忽略字尾多出的一個音節；「-ed 讀 [t]」：把有額外音節的字尾聽成短促的 [t]；「-ed 不發音」：完全忽略過去式字尾。\n回頭讀：Unit 1 Phonics／Sound It Out（課本 p.18）。",
     {
      "listen": "landed",
      "rate": 0.8
     }
    ],
    [
     "哪一個單字的 -ed 讀音和另外三個不同？可點播選項比較。",
     "wanted",
     [
      "listened",
      "played",
      "rained"
     ],
     [
      "只比較字尾，不要比較字首。",
      "點每個選項聽聽看，字尾有沒有多出一個音節。",
      "三個讀 [d]，另一個多一個音節，讀 [ɪd]。"
     ],
     "正確概念：want 以 t 結尾，wanted 的 -ed 讀 [ɪd]，多一個音節；其餘三字都讀 [d]。\n破誤：「listened」：listened 的 -ed 讀 [d]，與 played、rained 同組；「played」：played 的 -ed 讀 [d]，與 listened、rained 同組；「rained」：rained 的 -ed 讀 [d]，與 listened、played 同組。\n回頭讀：Unit 1 Phonics／Sound It Out（課本 p.18）。",
     {
      "speakOptions": true
     }
    ],
    [
     "哪個單字的 -ed 讀 [ɪd]？",
     "visited",
     [
      "listened",
      "watched",
      "played"
     ],
     [
      "先看原形動詞最後的聲音。",
      "原形以 t 或 d 結尾，加 -ed 後會多一個音節。",
      "visit 的最後一個音符合這個條件。"
     ],
     "正確概念：visited 的 -ed 讀 [ɪd]，與 landed、shouted 同組。\n破誤：「listened」：listen 結尾不是 t 或 d，listened 的 -ed 讀 [d]；「watched」：watched 的 -ed 讀 [t]，不多一個音節；「played」：played 的 -ed 讀 [d]，不是 [ɪd]。\n回頭讀：Unit 1 Phonics（課本 p.18）。"
    ],
    [
     "請聽單字，選出正確的拼字。",
     "rained",
     [
      "stayed",
      "played",
      "trained"
     ],
     [
      "先聽開頭，再聽字尾。",
      "這些字很相近，不能只靠母音判斷。",
      "開頭沒有多加一個 t 音，意思與下雨有關。"
     ],
     "正確概念：念的是 rained，字首是 r，字尾 -ed 讀 [d]。\n破誤：「stayed」：兩字母音和 -ed 讀音相近，但字首、結尾不同；「played」：母音相近，但沒有聽清楚字首；「trained」：多聽了開頭的 t 音。\n回頭讀：Unit 1 Phonics／Sound It Out、Word Bank（課本 p.18）。",
     {
      "listen": "rained",
      "rate": 0.8
     }
    ],
    [
     "閱讀短文，Kevin 昨天和妹妹做了什麼？",
     "一起看電影",
     [
      "一起打籃球",
      "一起吹直笛",
      "一起探望祖父母"
     ],
     [
      "先找 Kevin 出現的句子。",
      "注意 with his sister 接在哪個活動後。",
      "答案是兩個人在家一起看的內容。"
     ],
     "正確概念：Kevin 和妹妹一起看電影；短文的 watched a movie with his sister 直接提供答案。\n破誤：「一起打籃球」：把 Amy 原先想做的活動當成 Kevin 已做的事；「一起吹直笛」：吹直笛的是 Amy，不是 Kevin 和妹妹；「一起探望祖父母」：短文沒有寫探望祖父母。\n回頭讀：Unit 1 Vocabulary、More Words（課本 pp.10–11、15）；Reading Skills：Make Inferences（課本 p.4）。",
     {
      "passage": "Amy wanted to play basketball with Kevin yesterday. She looked out of the window. It rained all afternoon. Amy stayed at home and played the recorder. Kevin stayed at his home, too. He listened to music and watched a movie with his little sister. Today, Amy has her basketball in her bag. She looks out of the window and smiles. The sky is blue."
     }
    ],
    [
     "依短文，Amy 今天望向窗外微笑，最可能是什麼原因？",
     "天晴了，可以去打球",
     [
      "妹妹送她一顆新籃球",
      "爺爺帶她出去看電影",
      "她已經打贏籃球比賽"
     ],
     [
      "把昨天想做的事和今天的天氣連起來。",
      "推論要有文中線索，不能自行加入新事件。",
      "昨天因下雨留在家，今天有球而且天空是藍的。"
     ],
     "正確概念：昨天想打球卻下雨，今天帶著球、看到藍天微笑，可推論她期待天晴後打球。這是可能原因，不是已發生的比賽結果。\n破誤：「妹妹送她一顆新籃球」：文中沒有說妹妹送球，妹妹屬於 Kevin 的家庭資訊；「爺爺帶她出去看電影」：文中沒有爺爺或出門看電影的線索；「她已經打贏籃球比賽」：有籃球不代表已參加或贏得比賽。\n回頭讀：Unit 1 Reading Skills：Make Inferences（課本 p.4）；Reading／Make Inferences（課本 p.17）。",
     {
      "passage": "Amy wanted to play basketball with Kevin yesterday. She looked out of the window. It rained all afternoon. Amy stayed at home and played the recorder. Kevin stayed at his home, too. He listened to music and watched a movie with his little sister. Today, Amy has her basketball in her bag. She looks out of the window and smiles. The sky is blue."
     }
    ],
    [
     "依 Unit 1 Story，Emma 打掃房間時，在書裡發現了什麼？",
     "一張百元鈔票",
     [
      "一張電影票",
      "一張家人的照片",
      "一張音樂光碟"
     ],
     [
      "回想 Emma 說打掃後的驚喜。",
      "她提到書裡的一樣東西，和錢有關。",
      "那是一張面額一百元的物品。"
     ],
     "正確概念：Emma 在書裡找到一張百元鈔票。此題詢問故事細節，沒有沿用課本問她做了什麼的練習題。\n破誤：「一張電影票」：故事提到看電影，但 Emma 找到的不是電影票；「一張家人的照片」：把探望家人的話題誤連結成書中的照片；「一張音樂光碟」：把直笛、音樂活動誤當成書中找到的物品。\n回頭讀：Unit 1 Story（課本 p.9）。"
    ]
   ]
  },
  {
   "id": "en6-04",
   "z": 1,
   "name": "字彙與聽力",
   "lesson": "Unit 2",
   "draft": true,
   "intro": "had breakfast、went shopping、did the dishes 等不規則動詞片語，聽音選字與聽時間。",
   "q": [
    [
     "請聽英文，選出你聽到的片語。",
     "had lunch",
     [
      "has lunch",
      "have lunch",
      "had a lunch"
     ],
     [
      "先聽第一個字。",
      "注意它的尾音，以及兩個字之間有沒有多一個字。",
      "內容是過去吃午餐的動作。"
     ],
     "正確概念：念的是 had lunch（吃了午餐）；本課三餐前不加 the 或 a。\n破誤：「has lunch」：把過去式 had 聽成現在式 has；「have lunch」：把 had 的尾音聽成 have 的尾音；「had a lunch」：多聽了一個不定冠詞 a。\n回頭讀：Unit 2 Vocabulary（課本 pp.22–23）。",
     {
      "listen": "had lunch",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出你聽到的片語。",
     "went shopping",
     [
      "went swimming",
      "went shipping",
      "go shopping"
     ],
     [
      "聽完兩個字再選。",
      "第二個字的開頭與母音都要核對。",
      "這個片語是在說去購物。"
     ],
     "正確概念：念的是 went shopping，表示去購物，went 是 go 的過去式。\n破誤：「went swimming」：只聽到開頭 went 和字尾 -ing，沒有區分中間動作；「went shipping」：把 shopping 的母音聽成 shipping 的母音；「go shopping」：將 went 聽成原形 go。\n回頭讀：Unit 2 Vocabulary（課本 p.23）。",
     {
      "listen": "went shopping",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出片語的中文意思。",
     "洗衣服",
     [
      "清洗碗盤",
      "打掃房間",
      "外出購物"
     ],
     [
      "先辨認家事的對象。",
      "兩種家事都可用 did，但後面的名詞不同。",
      "這裡要清洗的是衣物。"
     ],
     "正確概念：念的是 did the laundry，意思是洗衣服。\n破誤：「清洗碗盤」：把 laundry 誤認成 dishes；「打掃房間」：把洗衣和打掃房間這兩種家事混淆；「外出購物」：把 did the laundry 和 went shopping 混淆。\n回頭讀：Unit 2 Vocabulary（課本 p.22）。",
     {
      "listen": "did the laundry",
      "rate": 0.8
     }
    ],
    [
     "哪個過去式片語表示「洗碗」？",
     "did the dishes",
     [
      "did the laundry",
      "cleaned the room",
      "had breakfast"
     ],
     [
      "先確認要清洗哪一種東西。",
      "dishes 在這個片語中是碗盤。",
      "選用 did 加上清洗碗盤的片語。"
     ],
     "正確概念：did the dishes 表示洗碗，did the laundry 則表示洗衣服。\n破誤：「did the laundry」：這是洗衣服，清洗的對象不同；「cleaned the room」：這是打掃房間，不是洗碗；「had breakfast」：這是吃早餐，不是餐後清洗碗盤。\n回頭讀：Unit 2 Vocabulary（課本 p.22）。"
    ],
    [
     "選出最合適的片語：\"Kevin was hungry at noon. He ______ with Amy at twelve.\"",
     "had lunch",
     [
      "did the laundry",
      "went swimming",
      "watered the flowers"
     ],
     [
      "注意 hungry 和 noon。",
      "中午肚子餓，通常要吃哪一餐？",
      "空格需要一個過去式的用餐片語。"
     ],
     "正確概念：had lunch 是吃了午餐，符合中午十二點肚子餓的情境。\n破誤：「did the laundry」：洗衣服不能解決 hungry 所表示的肚子餓；「went swimming」：游泳不是中午吃東西的活動；「watered the flowers」：澆花與 hungry、noon 的用餐線索不合。\n回頭讀：Unit 2 Vocabulary、Sentence A（課本 pp.22–24）。"
    ],
    [
     "請聽句子，選出最符合的中文描述。",
     "七點半吃晚餐",
     [
      "七點整吃晚餐",
      "六點半吃晚餐",
      "七點半洗碗盤"
     ],
     [
      "把活動和時間分開記住。",
      "時間要辨認整點還是半點。",
      "聽到的是晚餐，而且時間有半點。"
     ],
     "正確概念：句子是 I had dinner at seven thirty.，表示七點半吃晚餐。\n破誤：「七點整吃晚餐」：漏聽 thirty，把半點當成整點；「六點半吃晚餐」：把 seven 聽成 six；「七點半洗碗盤」：時間相同，但將用餐換成洗碗。\n回頭讀：Unit 2 Vocabulary、Sentence A（課本 pp.22–24）。",
     {
      "listen": "I had dinner at seven thirty.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，Kevin 昨天幾點洗碗？",
     "八點",
     [
      "六點半",
      "八點半",
      "六點"
     ],
     [
      "先找出題目問的是哪一個人。",
      "兩人說的是同一種家事，時間卻不同。",
      "Kevin 回答的是整點，不是半點。"
     ],
     "正確概念：原創對話：Amy: I did the dishes at six thirty yesterday. What time did you do the dishes, Kevin? Kevin: I did the dishes at eight. Kevin 的時間是八點。\n破誤：「六點半」：這是 Amy 洗碗的時間；「八點半」：把 Amy 時間中的 thirty 接到 Kevin 的時間；「六點」：選到 Amy 的時數，並漏掉半點。\n回頭讀：Unit 2 Sentence A（課本 p.24）。",
     {
      "listen": "Amy: I did the dishes at six thirty yesterday. What time did you do the dishes, Kevin? Kevin: I did the dishes at eight.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en6-05",
   "z": 1,
   "name": "句型與文法",
   "lesson": "Unit 2",
   "draft": true,
   "intro": "What time did you…? I … at six o'clock. 不規則動詞過去式（do→did、have→had、go→went）。",
   "q": [
    [
     "選字完成句子：\"We ______ swimming yesterday.\"",
     "went",
     [
      "go",
      "goes",
      "going"
     ],
     [
      "先辨認這件事發生的時間。",
      "go 的過去式不是直接加 -ed。",
      "不規則動詞要使用對應的過去式。"
     ],
     "正確概念：go 的過去式為 went，因此用 went swimming。\n破誤：「go」：忽略 yesterday，使用原形；「goes」：We 不用 goes，過去情境也不適用；「going」：把 -ing 形式當成單獨的過去式。\n回頭讀：Unit 2 Reminder、Grammar Tips（課本 pp.23–25）。"
    ],
    [
     "選字完成問句：\"What time ______ Emma have dinner yesterday?\"",
     "did",
     [
      "does",
      "do",
      "was"
     ],
     [
      "先找出時間詞。",
      "過去動作問句不因主詞是 Emma 就改用現在式。",
      "後面 have 是原形，前面需要過去式助動詞。"
     ],
     "正確概念：yesterday 表示過去，用 What time did ... have dinner?。\n破誤：「does」：只看 Emma 是第三人稱，忽略 yesterday；「do」：使用現在式，且未配合第三人稱；「was」：把 be 動詞放在 have 前，不能構成本課的動作問句。\n回頭讀：Unit 2 Sentence A／Grammar Tips（課本 p.24）。"
    ],
    [
     "\"What time did you go swimming?\" 最適合接哪一句？",
     "I went swimming at five.",
     [
      "I went swimming with my sister.",
      "I went swimming last Sunday.",
      "I went swimming at the beach."
     ],
     [
      "留意疑問詞要問哪一種資訊。",
      "What time 要求具體時刻。",
      "找出 at 後面接幾點的回答。"
     ],
     "正確概念：What time 問幾點；I went swimming at five. 回答五點。\n破誤：「I went swimming with my sister.」：回答和誰去，沒有說幾點；「I went swimming last Sunday.」：回答哪一天，沒有回答幾點；「I went swimming at the beach.」：回答地點，沒有回答時刻。\n回頭讀：Unit 2 Sentence A（課本 p.24）。"
    ],
    [
     "四個句子中，哪一句完全正確？",
     "She had lunch at one.",
     [
      "She have lunch at one yesterday.",
      "Did she had lunch at one?",
      "She did not had lunch at one."
     ],
     [
      "先看句中有沒有 did。",
      "有 did 就用原形；直接陳述過去活動才用 had。",
      "正確句子直接說她一點吃了午餐。"
     ],
     "正確概念：She had lunch at one. 使用 have 的過去式 had，時間介系詞用 at。\n破誤：「She have lunch at one yesterday.」：昨天應用 had，不是 have；「Did she had lunch at one?」：did 後要用 have，不是 had；「She did not had lunch at one.」：did not 後也要還原成 have。\n回頭讀：Unit 2 Sentence A／B、Grammar Tips（課本 pp.24–25）。"
    ],
    [
     "依序選出兩個空格的動詞：\"Amy ______ the dishes every day. She ______ the dishes yesterday, too.\"",
     "does / did",
     [
      "did / does",
      "do / did",
      "does / do"
     ],
     [
      "分別標出兩句的時間詞。",
      "every day 是習慣，yesterday 是過去。",
      "Amy 的現在式要注意第三人稱，過去式用 did。"
     ],
     "正確概念：Amy 的習慣用 does，昨天已做過的事用 did。\n破誤：「did / does」：把日常習慣與過去活動的動詞順序顛倒；「do / did」：過去式正確，但 Amy 的現在式應用 does；「does / do」：現在式正確，但 yesterday 應用 did。\n回頭讀：Unit 2 Sentence B／Grammar Tips（課本 p.25）。"
    ],
    [
     "請聽問句，選出最合適的回答。",
     "I had it at seven.",
     [
      "I had it with my dad.",
      "I had it at home.",
      "Yes, I had breakfast."
     ],
     [
      "先辨認問題要求的資訊。",
      "不是只要肯定或否定，回答要有具體時刻。",
      "找出用 at 接幾點的句子。"
     ],
     "正確概念：問句是 What time did you have breakfast yesterday?；I had it at seven. 回答七點。\n破誤：「I had it with my dad.」：回答和誰一起吃，沒有時刻；「I had it at home.」：at home 是地點，不是幾點；「Yes, I had breakfast.」：只確認有吃早餐，沒有回答時刻。\n回頭讀：Unit 2 Sentence A（課本 p.24）。",
     {
      "listen": "What time did you have breakfast yesterday?",
      "rate": 0.9
     }
    ],
    [
     "依 Kevin 昨天的紀錄，哪一句正確？",
     "He did the laundry at ten.",
     [
      "He went swimming at ten.",
      "He does the laundry at ten.",
      "He had dinner at four."
     ],
     [
      "逐一對照表格的活動與時間。",
      "昨天的活動要使用過去式。",
      "十點那一列是洗衣服。"
     ],
     "正確概念：表格記錄昨天十點洗衣服，用 He did the laundry at ten.。\n破誤：「He went swimming at ten.」：游泳時間是四點，不是十點；「He does the laundry at ten.」：紀錄是昨天的事，應用 did；「He had dinner at four.」：晚餐時間是六點，不是四點。\n回頭讀：Unit 2 Vocabulary、Sentence A（課本 pp.22–24）。",
     {
      "t": [
       [
        "時間",
        "Kevin 昨天的活動"
       ],
       [
        "10:00",
        "did the laundry"
       ],
       [
        "16:00",
        "went swimming"
       ],
       [
        "18:00",
        "had dinner"
       ]
      ],
      "cap": "Kevin 昨天的紀錄（原創，24 小時制）"
     }
    ]
   ]
  },
  {
   "id": "en6-06",
   "z": 1,
   "name": "發音與閱讀",
   "lesson": "Unit 2",
   "draft": true,
   "intro": "-ing 與 -ong 的讀音；故事理解與對比（Contrast）。",
   "q": [
    [
     "請聽單字，選出它最後三個字母的組合。",
     "-ong",
     [
      "-ing",
      "-ink",
      "-ang"
     ],
     [
      "注意字尾前的母音。",
      "本課分成兩個主要字尾組合，別只聽最後的鼻音。",
      "這個字和 long 的字尾同組。"
     ],
     "正確概念：念的是 strong，最後三個字母是 ong。\n破誤：「-ing」：把母音聽成 king 那一組；「-ink」：把母音和最後的鼻音誤聽成 ink；「-ang」：將中間母音誤聽成 sang 的母音。\n回頭讀：Unit 2 Phonics／Sound It Out（課本 p.30）。",
     {
      "listen": "strong",
      "rate": 0.8
     }
    ],
    [
     "哪個字的母音和另外三個不同？可點播選項比較。",
     "sing",
     [
      "long",
      "strong",
      "wrong"
     ],
     [
      "先分組，不必比較字首。",
      "三個字都有相同的字尾組合。",
      "找出唯一的 -ing 字。"
     ],
     "正確概念：sing 屬於 -ing；long、strong、wrong 屬於 -ong，母音不同。\n破誤：「long」：long 與 strong、wrong 都屬於 -ong；「strong」：strong 與 long、wrong 的母音相同；「wrong」：wrong 與 long、strong 都屬於 -ong。\n回頭讀：Unit 2 Phonics／Sound It Out（課本 p.30）。",
     {
      "speakOptions": true
     }
    ],
    [
     "哪個字和 \"king\" 有相同的字尾讀音？",
     "ring",
     [
      "long",
      "strong",
      "wrong"
     ],
     [
      "比較字尾的字母組合。",
      "要找母音和最後的音都相同的字。",
      "king 的字尾是 -ing。"
     ],
     "正確概念：ring 與 king 都以 -ing 結尾，字尾讀音相同。\n破誤：「long」：long 屬於 -ong，不和 king 押韻；「strong」：strong 的母音屬於 -ong 那一組；「wrong」：wrong 的字尾是 -ong，不是 -ing。\n回頭讀：Unit 2 Phonics／Sound It Out（課本 p.30）。"
    ],
    [
     "請聽單字，選出正確的拼字。",
     "king",
     [
      "ring",
      "sing",
      "wing"
     ],
     [
      "四個選項的字尾很像，先聽字首。",
      "不要只靠 -ing 作答。",
      "這個字的意思是國王。"
     ],
     "正確概念：念的是 king，和 ring、sing、wing 的字首不同。\n破誤：「ring」：字尾相同，但字首不同；「sing」：只聽出 -ing，忽略字首不是 s；「wing」：只比較字尾，沒有辨認開頭的子音。\n回頭讀：Unit 2 Phonics／Sound It Out（課本 p.30）。",
     {
      "listen": "king",
      "rate": 0.8
     }
    ],
    [
     "依短文，Kevin 昨天用什麼洗碗？",
     "洗碗機",
     [
      "自己的雙手",
      "家裡的洗衣機",
      "家裡的掃地機器人"
     ],
     [
      "找出 Kevin 的活動句。",
      "辨認 used 後面的物品。",
      "這台機器專門處理碗盤。"
     ],
     "正確概念：Kevin used a dishwasher，表示他使用洗碗機。\n破誤：「自己的雙手」：用手洗碗的是 Emma；「家裡的洗衣機」：將 dishwasher 誤解成洗衣機；「家裡的掃地機器人」：把不同家事機器的用途混淆。\n回頭讀：Unit 2 Reading（課本 pp.28–29）；Reading Skills：Contrast（課本 p.4）。",
     {
      "passage": "Emma and Kevin were busy yesterday. Emma did the dishes by hand after lunch. Kevin used a dishwasher after dinner. Emma likes to do housework by hand. She does not want to use a machine. Kevin likes to use a machine. It gives him time to play the recorder. They both help at home, but they do the dishes in different ways."
     }
    ],
    [
     "比較短文中的兩人，哪一項差異符合內容？",
     "Emma 用手洗；Kevin 用機器洗",
     [
      "Emma 用機器洗；Kevin 用手洗",
      "Emma 不做家事；Kevin 做家事",
      "Emma 洗衣服；Kevin 打掃房間"
     ],
     [
      "找出兩人做同一件事時的不同方法。",
      "by hand 和 machine 是對比的關鍵。",
      "兩人都有幫忙，差別是洗碗方式。"
     ],
     "正確概念：兩人都幫忙洗碗，Emma 用手，Kevin 用洗碗機；對比的是做法。\n破誤：「Emma 用機器洗；Kevin 用手洗」：把兩人的方式互換；「Emma 不做家事；Kevin 做家事」：Emma 也洗碗，不能說她不做家事；「Emma 洗衣服；Kevin 打掃房間」：兩人在文中都洗碗，不是這兩種活動。\n回頭讀：Unit 2 Reading／Contrast（課本 pp.28–29）；Reading Skills（課本 p.4）。",
     {
      "passage": "Emma and Kevin were busy yesterday. Emma did the dishes by hand after lunch. Kevin used a dishwasher after dinner. Emma likes to do housework by hand. She does not want to use a machine. Kevin likes to use a machine. It gives him time to play the recorder. They both help at home, but they do the dishes in different ways."
     }
    ],
    [
     "依 Unit 2 Story，Amy 和媽媽幾點回家？",
     "五點",
     [
      "六點",
      "九點",
      "六點半"
     ],
     [
      "回想 Amy 說到媽媽的那一句。",
      "故事中有不同人的回家時間，別混在一起。",
      "她們比後來去夜市的同伴早回家。"
     ],
     "正確概念：Amy 和媽媽五點回家；Kevin 等人六點去夜市、九點回家。\n破誤：「六點」：六點是後來 Kevin 等人去夜市的時間；「九點」：九點是 Kevin 等人回家的時間，不是 Amy 和媽媽；「六點半」：故事沒有說 Amy 和媽媽六點半回家。\n回頭讀：Unit 2 Story（課本 pp.20–21）。"
    ]
   ]
  },
  {
   "id": "en6-07",
   "z": 1,
   "name": "綜合複習",
   "lesson": "Review 1",
   "draft": true,
   "intro": "Unit 1、Unit 2 的字彙、句型與發音綜合練習。",
   "q": [
    [
     "哪個片語表示「探望我的祖父母」？",
     "visited my grandparents",
     [
      "played the recorder at home",
      "cooked dinner with my parents",
      "watched a movie with my sister"
     ],
     [
      "先找家人的稱呼。",
      "parents 和 grandparents 代表不同輩分。",
      "探望的動作要用 visit 的過去式。"
     ],
     "正確概念：visited my grandparents 表示探望我的祖父母。\n破誤：「played the recorder at home」：這是在家吹直笛，沒有探望家人；「cooked dinner with my parents」：這是和父母煮晚餐，不是探望祖父母；「watched a movie with my sister」：這是和妹妹看電影，人物和活動都不同。\n回頭讀：Unit 1 Vocabulary（課本 pp.10–11）；Review 1 Sentence Review（課本 p.31）。"
    ],
    [
     "選出「昨天去游泳」的英文片語。",
     "went swimming yesterday",
     [
      "went shopping yesterday",
      "did the laundry yesterday",
      "played basketball yesterday"
     ],
     [
      "各選項的時間相同，要比較活動。",
      "購物與游泳的字尾都像 -ing，別只看字尾。",
      "找與水中運動相關的字。"
     ],
     "正確概念：went swimming yesterday 表示昨天去游泳。\n破誤：「went shopping yesterday」：這是昨天購物，不是游泳；「did the laundry yesterday」：這是昨天洗衣，不是游泳；「played basketball yesterday」：這是昨天打籃球，運動項目不同。\n回頭讀：Unit 2 Vocabulary（課本 pp.22–23）；Review 1 Sentence Review（課本 p.31）。"
    ],
    [
     "選出正確問句來詢問「你昨天有煮晚餐嗎？」。",
     "Did you cook dinner yesterday?",
     [
      "Did you cooked dinner yesterday?",
      "Do you cook dinner yesterday?",
      "Does you cook dinner yesterday?"
     ],
     [
      "先看時間，再檢查助動詞後的動詞。",
      "過去問句用 did 加原形。",
      "cook 不要再加 -ed。"
     ],
     "正確概念：Did you cook dinner yesterday? 同時符合過去時間與 did 後接原形的規則。\n破誤：「Did you cooked dinner yesterday?」：did 後應接原形 cook；「Do you cook dinner yesterday?」：yesterday 的問句要用 Did；「Does you cook dinner yesterday?」：you 不用 Does，且時態也不對。\n回頭讀：Unit 1 Sentence B（課本 p.13）；Review 1 Sentence Review（課本 p.31）。"
    ],
    [
     "要回答 \"What time did you have lunch?\"，哪一句最合適？",
     "I had lunch at twelve.",
     [
      "I have lunch at twelve yesterday.",
      "I had lunch with my grandparents.",
      "I had lunch in the kitchen."
     ],
     [
      "問句要的是時間。",
      "回答過去的活動，要用 have 的過去式。",
      "選出既有過去式，也有時刻的句子。"
     ],
     "正確概念：I had lunch at twelve. 表示十二點吃了午餐。\n破誤：「I have lunch at twelve yesterday.」：yesterday 需要 had，不能用 have；「I had lunch with my grandparents.」：只回答和誰吃，沒有回答時刻；「I had lunch in the kitchen.」：只回答地點，沒有回答幾點。\n回頭讀：Unit 2 Sentence A（課本 p.24）；Review 1（課本 p.31）。"
    ],
    [
     "哪一組的兩個字有相同的字尾讀音？（動詞比較 -ed；其他字比較最後三個字母。）",
     "sing / ring",
     [
      "long / king",
      "played / cooked",
      "visited / watched"
     ],
     [
      "每組要比較指定的字尾。",
      "-ed 有三種讀音；-ing 和 -ong 也不能混為一組。",
      "找兩個都以 -ing 結尾的字。"
     ],
     "正確概念：sing 與 ring 的 -ing 相同；另外三組各自有不同的指定字尾讀音。\n破誤：「long / king」：-ong 和 -ing 的母音不同；「played / cooked」：played 的 -ed 讀 [d]，cooked 讀 [t]；「visited / watched」：visited 的 -ed 讀 [ɪd]，watched 讀 [t]。\n回頭讀：Review 1 Phonics Review（課本 p.34）。"
    ],
    [
     "請聽句子，說話者昨天做了哪一件事？",
     "打掃房間",
     [
      "洗衣服",
      "清洗碗盤",
      "探望祖父母"
     ],
     [
      "注意哪個動作前面有否定。",
      "沒有做的事和後面真正做的事要分開。",
      "答案在否定句之後的肯定句。"
     ],
     "正確概念：原創聽力：I did not do the laundry yesterday. I cleaned the room. 說話者打掃房間，沒有洗衣服。\n破誤：「洗衣服」：把句中否定的活動當成做過的事；「清洗碗盤」：將兩種家事片語混淆；「探望祖父母」：句子沒有提到這個活動。\n回頭讀：Unit 1 Vocabulary（課本 pp.10–11）；Unit 2 Sentence B（課本 p.25）；Review 1 Listening Skill（課本 pp.32–33）。",
     {
      "listen": "I did not do the laundry yesterday. I cleaned the room.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，Emma 昨天做了什麼？",
     "在家看電視",
     [
      "外出去購物",
      "在家洗衣服",
      "外出去游泳"
     ],
     [
      "先分辨問話者和回答者。",
      "題目只問 Emma，不要選另一個人的活動。",
      "她說的活動是在家看某種節目。"
     ],
     "正確概念：原創對話：Kevin: I went shopping yesterday. What did you do, Emma? Emma: I stayed at home and watched TV. Emma 在家看電視。\n破誤：「外出去購物」：把 Kevin 做的活動套到 Emma 身上；「在家洗衣服」：對話沒有說 Emma 洗衣服；「外出去游泳」：Emma 說待在家，沒有說去游泳。\n回頭讀：Unit 2 More Words（課本 p.27）；Review 1 Listening Skill（課本 pp.32–33）。",
     {
      "listen": "Kevin: I went shopping yesterday. What did you do, Emma? Emma: I stayed at home and watched TV.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en6-08",
   "z": 2,
   "name": "字彙與聽力",
   "lesson": "Unit 3",
   "draft": true,
   "intro": "island、forest、beach、hot spring、lake、river、mountain 等地點，聽音選字與聽旅遊對話。",
   "q": [
    [
     "請聽單字，選出正確的拼字。",
     "lake",
     [
      "like",
      "make",
      "late"
     ],
     [
      "分別聽字首、母音和字尾。",
      "不要只靠中間的母音判斷。",
      "這是一種有水的自然地點。"
     ],
     "正確概念：念的是 lake（湖），與 like、make、late 各有不同的聲音。\n破誤：「like」：字首字尾相同，但中間母音不同；「make」：母音相同，但字首不是 m；「late」：字首母音相同，但字尾不是 t。\n回頭讀：Unit 3 Vocabulary（課本 p.38）。",
     {
      "listen": "lake",
      "rate": 0.8
     }
    ],
    [
     "請聽單字，選出正確的拼字。",
     "beach",
     [
      "peach",
      "bench",
      "bridge"
     ],
     [
      "先比較開頭，再比較中間的母音。",
      "這個字中間沒有 n 的聲音。",
      "意思是海邊的沙灘。"
     ],
     "正確概念：念的是 beach（海灘）；peach 是桃子，bench 是長椅，bridge 是橋。\n破誤：「peach」：把字首 b 聽成 p；「bench」：把母音聽錯，並多聽了 n 的聲音；「bridge」：將字首和結尾相近的另一個地點字混淆。\n回頭讀：Unit 3 Vocabulary（課本 p.38）。",
     {
      "listen": "beach",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出正確的中文意思。",
     "溫泉",
     [
      "山中的森林",
      "流動的河流",
      "四面環水的島嶼"
     ],
     [
      "先聽這是單字還是兩個字的片語。",
      "第一個字描述溫度。",
      "這個自然地點有溫熱的水。"
     ],
     "正確概念：念的是 hot spring，意思是溫泉。\n破誤：「山中的森林」：把 hot spring 誤解成 forest；「流動的河流」：把溫泉與 river 這種水域混淆；「四面環水的島嶼」：把溫泉與 island 混淆。\n回頭讀：Unit 3 Vocabulary（課本 p.38）。",
     {
      "listen": "hot spring",
      "rate": 0.8
     }
    ],
    [
     "哪個英文地名表示「日月潭」？",
     "Sun Moon Lake",
     [
      "Beitou Hot Springs",
      "Guishan Island",
      "Ali Mountain"
     ],
     [
      "先看地點類型，不必猜縣市。",
      "日月潭屬於湖泊。",
      "名稱中有太陽、月亮與湖的英文。"
     ],
     "正確概念：Sun Moon Lake 是課本的日月潭英文名稱。\n破誤：「Beitou Hot Springs」：這是北投溫泉，不是日月潭；「Guishan Island」：這是龜山島，不是日月潭；「Ali Mountain」：這是阿里山，不是日月潭。\n回頭讀：Unit 3 Story、Vocabulary（課本 pp.36、38–39）。"
    ],
    [
     "選出最合適的地點：\"We walked in the ______. There were trees all around us.\"",
     "forest",
     [
      "hot spring",
      "river",
      "lake"
     ],
     [
      "留意四周看見了什麼。",
      "要找主要由大量樹木構成的地點。",
      "這個地點是森林。"
     ],
     "正確概念：forest 是森林；walked in the forest 與四周都是樹木相符。\n破誤：「hot spring」：溫泉的重點是溫熱泉水，並非一大片樹木；「river」：河流是水道，不是四周都是樹木的步行地點；「lake」：湖是水域，不能把在水中步行當成在林間步行。\n回頭讀：Unit 3 Vocabulary、More Words（課本 pp.38、43）。"
    ],
    [
     "請聽句子，選出最符合的中文描述。",
     "上週末去了河邊",
     [
      "上週末去了湖邊",
      "上星期五去了河邊",
      "上週末去了海灘"
     ],
     [
      "同時聽地點與時間。",
      "注意水域是河流、湖泊還是海邊。",
      "時間是上一個週末。"
     ],
     "正確概念：句子是 I went to the river last weekend.，表示上週末去了河邊。\n破誤：「上週末去了湖邊」：將 river 聽成 lake，水域種類不同；「上星期五去了河邊」：將 last weekend 換成 last Friday；「上週末去了海灘」：將 river 誤認成 beach。\n回頭讀：Unit 3 Vocabulary、Sentence A（課本 pp.38–40）。",
     {
      "listen": "I went to the river last weekend.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，Amy 上週末去了哪裡？",
     "阿里山",
     [
      "日月潭",
      "北投溫泉",
      "龜山島"
     ],
     [
      "先辨認每個人的名字。",
      "兩人的目的地不同，要找 Amy 的回答。",
      "她說的地點是一座山。"
     ],
     "正確概念：原創對話：Kevin: I went to Sun Moon Lake last weekend. Where did you go, Amy? Amy: I went to Ali Mountain. Amy 去阿里山。\n破誤：「日月潭」：日月潭是 Kevin 說自己去的地點；「北投溫泉」：對話沒有說 Amy 去北投溫泉；「龜山島」：對話沒有說 Amy 去龜山島。\n回頭讀：Unit 3 Story、Vocabulary、Sentence A（課本 pp.36、38–40）。",
     {
      "listen": "Kevin: I went to Sun Moon Lake last weekend. Where did you go, Amy? Amy: I went to Ali Mountain.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en6-09",
   "z": 2,
   "name": "句型與文法",
   "lesson": "Unit 3",
   "draft": true,
   "intro": "Where did you go last weekend? I went to the … Did you go to …? 過去時間詞。",
   "q": [
    [
     "選字完成問句：\"Did you ______ to the island last week?\"",
     "go",
     [
      "went",
      "goes",
      "going"
     ],
     [
      "先看看空格前有沒有助動詞。",
      "did 已經表達過去，後面的動詞還原。",
      "go 的原形不加字尾，也不改成 went。"
     ],
     "正確概念：Did you go ...? 中，did 後接原形 go。\n破誤：「went」：已使用 did，不能再使用過去式 went；「goes」：did 後不用第三人稱現在式 goes；「going」：did 後需要原形，不是 -ing 形式。\n回頭讀：Unit 3 Sentence B（課本 p.41）。"
    ],
    [
     "選字完成問句：\"______ did you go last weekend?\" 回答是 \"I went to the forest.\"",
     "Where",
     [
      "When",
      "Why",
      "How"
     ],
     [
      "先看回答提供哪一類資訊。",
      "the forest 是地點，不是時間或原因。",
      "問去哪裡要用詢問地點的疑問詞。"
     ],
     "正確概念：Where 問地點，能搭配 I went to the forest. 的回答。\n破誤：「When」：When 問時間，但回答提供地點；「Why」：Why 問原因，但回答沒有說原因；「How」：How 問方式，但回答是目的地。\n回頭讀：Unit 3 Sentence A（課本 p.40）。"
    ],
    [
     "\"Where did you go last Friday?\" 最適合接哪一句？",
     "I went to the beach.",
     [
      "I went at seven o’clock.",
      "I went with my grandparents.",
      "I went last weekend."
     ],
     [
      "先辨認 Where 要問什麼。",
      "回答要指出目的地。",
      "找出 went to 後面接地點的句子。"
     ],
     "正確概念：I went to the beach. 回答去了海灘，符合 Where 的提問。\n破誤：「I went at seven o’clock.」：只回答幾點，沒有說地點；「I went with my grandparents.」：只回答和誰去，沒有說地點；「I went last weekend.」：回答另一個時間，沒有說地點。\n回頭讀：Unit 3 Sentence A（課本 p.40）。"
    ],
    [
     "四個句子中，哪一句完全正確？",
     "I went to the lake.",
     [
      "Did you went to the lake?",
      "I did not went to the lake.",
      "I go to the lake yesterday."
     ],
     [
      "先區分問句、否定句與直接敘述。",
      "did 後要接原形；直接說過去的行程則用 went。",
      "正確選項直接敘述去了湖邊。"
     ],
     "正確概念：I went to the lake. 是正確的過去式敘述。\n破誤：「Did you went to the lake?」：Did 後應接 go，不是 went；「I did not went to the lake.」：did not 後應接 go，不是 went；「I go to the lake yesterday.」：直接陳述昨天的行程，要把 go 改成 went。\n回頭讀：Unit 3 Sentence A／B（課本 pp.40–41）。"
    ],
    [
     "要表達「我上週去過那個島」，哪一句正確？",
     "I went to the island last week.",
     [
      "I go to the island last week.",
      "I went to the island every week.",
      "I go to the island every weekend."
     ],
     [
      "對照中文的時間範圍。",
      "上週與每週不同；過去行程要用過去式。",
      "找出 went 和 last week 的搭配。"
     ],
     "正確概念：went 搭配 last week，表達上週已經發生的行程。\n破誤：「I go to the island last week.」：last week 是過去，不能用 go；「I went to the island every week.」：every week 是每週，不是題目指定的上週；「I go to the island every weekend.」：表示每週末的習慣，不是上週的一次行程。\n回頭讀：Unit 3 Sentence A（課本 p.40）。"
    ],
    [
     "請聽問句，選出最合適的回答。",
     "I went to the mountain.",
     [
      "I went at eight o’clock.",
      "I went with my grandparents.",
      "I went last Saturday."
     ],
     [
      "先聽疑問詞。",
      "這個問題要求一個地點。",
      "找出 to 後面接自然地點的回答。"
     ],
     "正確概念：問句是 Where did you go last Sunday?；I went to the mountain. 提供目的地。\n破誤：「I went at eight o’clock.」：回答時刻，沒有提供目的地；「I went with my grandparents.」：回答同行的人，沒有提供目的地；「I went last Saturday.」：回答日期，沒有提供目的地。\n回頭讀：Unit 3 Sentence A（課本 p.40）。",
     {
      "listen": "Where did you go last Sunday?",
      "rate": 0.9
     }
    ],
    [
     "依 Emma 的旅行紀錄，哪一句正確？",
     "She went to the forest last Sunday.",
     [
      "She went to the beach last Sunday.",
      "She goes to the forest last Sunday.",
      "She went to the forest last Saturday."
     ],
     [
      "先將每個地點配回日期。",
      "過去的行程都要用 went。",
      "森林那一列的日期是上週日。"
     ],
     "正確概念：紀錄顯示 Emma 上週日去森林，用 She went to the forest last Sunday.。\n破誤：「She went to the beach last Sunday.」：海灘是上週六的行程；「She goes to the forest last Sunday.」：last Sunday 要用 went，不是 goes；「She went to the forest last Saturday.」：森林是上週日的行程，不是週六。\n回頭讀：Unit 3 Vocabulary、Sentence A（課本 pp.38–40）。",
     {
      "t": [
       [
        "日期",
        "Emma 去的地方"
       ],
       [
        "last Saturday",
        "the beach"
       ],
       [
        "last Sunday",
        "the forest"
       ]
      ],
      "cap": "Emma 的旅行紀錄（原創）"
     }
    ]
   ]
  },
  {
   "id": "en6-10",
   "z": 2,
   "name": "發音與閱讀",
   "lesson": "Unit 3",
   "draft": true,
   "intro": "y 的三種讀音：y- [j]、-y [aɪ]、-y [ɪ]；故事理解與指稱（Reference）。",
   "q": [
    [
     "請聽單字，選出其中 y 的讀音。",
     "y 讀 [j]",
     [
      "y 讀 [aɪ]",
      "y 讀 [ɪ]",
      "y 不發音"
     ],
     [
      "注意 y 在單字開頭還是結尾。",
      "本課將 y 分成三種讀音。",
      "這個 y 位在字首，和 yellow 同組。"
     ],
     "正確概念：念的是 yard，字首 y 讀 [j]。\n破誤：「y 讀 [aɪ]」：把字首 y 當成 sky 的字尾 y；「y 讀 [ɪ]」：把字首 y 當成 baby 的字尾 y；「y 不發音」：漏掉字首實際發出的聲音。\n回頭讀：Unit 3 Phonics／Sound It Out（課本 p.46）。",
     {
      "listen": "yard",
      "rate": 0.8
     }
    ],
    [
     "哪個字的字尾 y 讀音和另外三個不同？可點播選項比較。",
     "sky",
     [
      "baby",
      "puppy",
      "sunny"
     ],
     [
      "只比較最後的 y。",
      "先找出三個同組的字。",
      "有一個 y 讀 [aɪ]，其餘讀 [ɪ]。"
     ],
     "正確概念：sky 的 y 讀 [aɪ]；baby、puppy、sunny 的 y 依本課標示讀 [ɪ]。\n破誤：「baby」：baby 的字尾 y 讀 [ɪ]，與 puppy、sunny 同組；「puppy」：puppy 的字尾 y 讀 [ɪ]，與 baby、sunny 同組；「sunny」：sunny 的字尾 y 讀 [ɪ]，與 baby、puppy 同組。\n回頭讀：Unit 3 Phonics／Sound It Out（課本 p.46）。",
     {
      "speakOptions": true
     }
    ],
    [
     "哪個字的 y 讀 [aɪ]？",
     "cry",
     [
      "yellow",
      "puppy",
      "sunny"
     ],
     [
      "先看 y 在哪個位置。",
      "本題要找與 fly、sky 同組的字。",
      "單音節 cry 的結尾 y 符合這組。"
     ],
     "正確概念：cry 的 y 讀 [aɪ]，與 fly、sky 同組。\n破誤：「yellow」：yellow 的字首 y 讀 [j]；「puppy」：puppy 的字尾 y 依本課標示讀 [ɪ]；「sunny」：sunny 的字尾 y 依本課標示讀 [ɪ]。\n回頭讀：Unit 3 Phonics／Sound It Out（課本 p.46）。"
    ],
    [
     "請聽單字，選出正確的拼字。",
     "sky",
     [
      "fly",
      "cry",
      "dry"
     ],
     [
      "這些字的最後一個母音相同，請比較字首。",
      "先聽有沒有 s 開頭的聲音。",
      "這個字的意思是天空。"
     ],
     "正確概念：念的是 sky，字首與 fly、cry、dry 不同，字尾 y 讀 [aɪ]。\n破誤：「fly」：母音相同，但開頭的聲音不同；「cry」：只注意相同的 y 讀音，忽略開頭；「dry」：把字首聽成 dry 的開頭。\n回頭讀：Unit 3 Phonics／Sound It Out、Word Bank（課本 p.46）。",
     {
      "listen": "sky",
      "rate": 0.8
     }
    ],
    [
     "依短文，女孩們中午在哪裡吃午餐？",
     "河邊",
     [
      "森林裡的樹下",
      "湖邊",
      "祖父母家裡"
     ],
     [
      "找出 At noon 那一句。",
      "辨認 had lunch 後面的地點。",
      "午餐在流動的水域旁，不是湖邊。"
     ],
     "正確概念：短文寫 the girls had lunch by a river，午餐地點是河邊。\n破誤：「森林裡的樹下」：樹下是前面走路的地方，不是指定的午餐地點；「湖邊」：湖是午餐後去的地點；「祖父母家裡」：祖父母出現在想分享照片的情境，不是用餐地點。\n回頭讀：Unit 3 Vocabulary、More Words（課本 pp.38、43）；Reading Skills：Reference（課本 p.5）。",
     {
      "passage": "Last weekend, Amy and Emma went to the forest with Amy’s dad. They walked under the tall trees and listened to the birds. At noon, the girls had lunch by a river. After lunch, they went to a lake. They took pictures there. Amy liked the lake very much. She wanted to show the pictures to her grandparents at home."
     }
    ],
    [
     "短文中 \"They took pictures there.\" 的 there 指哪裡？",
     "湖邊",
     [
      "河邊",
      "森林裡的樹下",
      "祖父母家裡"
     ],
     [
      "向前找 there 前面最近的地點。",
      "注意故事中的移動順序。",
      "拍照前一句說她們午餐後去了湖邊。"
     ],
     "正確概念：there 承接前一句的 a lake，指湖邊。\n破誤：「河邊」：這是午餐地點，但拍照句前已移動到湖邊；「森林裡的樹下」：這是較早的地點，拍照前已換地方；「祖父母家裡」：祖父母家不是拍照前出現的地點。\n回頭讀：Unit 3 Reading Skills：Reference（課本 p.5）；Reading／Reference（課本 p.45）。",
     {
      "passage": "Last weekend, Amy and Emma went to the forest with Amy’s dad. They walked under the tall trees and listened to the birds. At noon, the girls had lunch by a river. After lunch, they went to a lake. They took pictures there. Amy liked the lake very much. She wanted to show the pictures to her grandparents at home."
     }
    ],
    [
     "依 Unit 3 Story，Amy 在日月潭做了哪一項活動？",
     "沿著湖騎腳踏車",
     [
      "在森林裡健行",
      "在海灘上游泳",
      "在溫泉裡泡湯"
     ],
     [
      "分清楚旅程第一天與隔天。",
      "日月潭的活動和湖周圍的路線有關。",
      "她們騎乘的是兩個輪子的交通工具。"
     ],
     "正確概念：Amy 和同伴在日月潭沿湖騎腳踏車；森林健行是阿里山的行程。\n破誤：「在森林裡健行」：健行發生在前一天阿里山的森林；「在海灘上游泳」：把其他旅遊活動套到日月潭情節；「在溫泉裡泡湯」：故事沒有說 Amy 在日月潭泡溫泉。\n回頭讀：Unit 3 Story（課本 p.36）。"
    ]
   ]
  },
  {
   "id": "en6-11",
   "z": 3,
   "name": "字彙與聽力",
   "lesson": "Unit 4",
   "draft": true,
   "intro": "tea shop、science museum、MRT station、convenience store 等場所，聽音選字與聽問路。",
   "q": [
    [
     "請聽英文，選出你聽到的片語。",
     "tea shop",
     [
      "toy shop",
      "tea shops",
      "sweet shop"
     ],
     [
      "先聽第一個字的母音。",
      "再聽第二個字的開頭與結尾。",
      "這個場所販售茶飲，尾端沒有複數音。"
     ],
     "正確概念：念的是 tea shop（茶店），不是 toy shop、tea shops 或 sweet shop。\n破誤：「toy shop」：字尾相同，但將 tea 的母音聽成 toy；「tea shops」：多聽了 shops 最後的 s 音；「sweet shop」：只聽出相近的長母音和 shop，忽略第一個字的開頭與尾音。\n回頭讀：Unit 4 Vocabulary（課本 pp.50–51）。",
     {
      "listen": "tea shop",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出你聽到的片語。",
     "science museum",
     [
      "science museums",
      "science center",
      "history museum"
     ],
     [
      "兩個字都要聽完。",
      "第二個字較長，注意結尾是否有複數音。",
      "第一個字與科學有關，後面是博物館。"
     ],
     "正確概念：念的是 science museum（科學博物館），第二個字是單數 museum。\n破誤：「science museums」：多聽了複數的 s 音；「science center」：只確認第一個字，沒有聽出第二個字是 museum 而非 center；「history museum」：只確認後面的 museum，忽略前面的 science 與 history 不同。\n回頭讀：Unit 4 Vocabulary（課本 p.50）。",
     {
      "listen": "science museum",
      "rate": 0.8
     }
    ],
    [
     "請聽英文，選出正確的中文意思。",
     "捷運站",
     [
      "公車站牌",
      "科學博物館",
      "附近的便利商店"
     ],
     [
      "先聽前面的交通名稱。",
      "後面的字表示車站。",
      "前面是捷運常用的三個英文字母。"
     ],
     "正確概念：念的是 MRT station，意思是捷運站。\n破誤：「公車站牌」：把 MRT station 與 bus stop 混淆；「科學博物館」：將交通場所與 science museum 混淆；「附近的便利商店」：把 MRT station 與 convenience store 混淆。\n回頭讀：Unit 4 Vocabulary（課本 p.50）；Story（課本 p.48）。",
     {
      "listen": "MRT station",
      "rate": 0.8
     }
    ],
    [
     "哪個英文單字表示「圖書館」？",
     "library",
     [
      "bookstore",
      "hospital",
      "supermarket"
     ],
     [
      "先想可以借書、閱讀的地方。",
      "買書的店和借書的地方不同。",
      "圖書館的單字以 l 開頭。"
     ],
     "正確概念：library 是圖書館，課本 Reminder 收錄此場所字。\n破誤：「bookstore」：bookstore 是書店，不是圖書館；「hospital」：hospital 是醫院，不是圖書館；「supermarket」：supermarket 是超級市場，不是圖書館。\n回頭讀：Unit 4 Reminder（課本 p.51）。"
    ],
    [
     "選出最合適的場所：\"Amy wants a book to keep at home. She will buy it at the ______.\"",
     "bookstore",
     [
      "MRT station",
      "sports center",
      "library"
     ],
     [
      "注意她要借書還是買書。",
      "buy 表示購買，要找販售書籍的場所。",
      "場所名稱中包含 book。"
     ],
     "正確概念：bookstore 是書店，符合購書帶回家保存的情境。\n破誤：「MRT station」：捷運站是交通場所，不是專門買書的店；「sports center」：運動中心不是專門販售書籍的場所；「library」：圖書館通常借閱書籍；題目說 buy，表示購買。\n回頭讀：Unit 4 Reminder、More Words（課本 pp.51、55）。"
    ],
    [
     "請聽句子，選出正確的位置描述。",
     "茶店在書店旁邊",
     [
      "茶店在書店對面",
      "茶店在公園旁邊",
      "茶店在醫院對面"
     ],
     [
      "先聽兩個場所，再聽它們的關係。",
      "分辨是在同側旁邊，還是隔街對面。",
      "聽到的是茶店和賣書場所相鄰。"
     ],
     "正確概念：句子是 The tea shop is next to the bookstore.，茶店在書店旁邊。\n破誤：「茶店在書店對面」：把 next to 誤解為 across from；「茶店在公園旁邊」：位置關係相同，但把 bookstore 換成 park；「茶店在醫院對面」：場所和位置關係都與句子不同。\n回頭讀：Unit 4 Vocabulary、Reminder、Sentence A（課本 pp.50–52）。",
     {
      "listen": "The tea shop is next to the bookstore.",
      "rate": 0.9
     }
    ],
    [
     "請聽對話，便利商店在哪裡？",
     "圖書館對面",
     [
      "茶店旁邊",
      "圖書館旁邊",
      "茶店對面"
     ],
     [
      "留意回答先肯定還是否定。",
      "不要把被否定的問句當作事實。",
      "真正的位置在否定簡答之後。"
     ],
     "正確概念：原創對話：Kevin: Is the convenience store next to the tea shop? Amy: No, it is not. It is across from the library. 便利商店在圖書館對面。\n破誤：「茶店旁邊」：這是 Kevin 的問句猜測，Amy 已否定；「圖書館旁邊」：場所正確，但 across from 不是 next to；「茶店對面」：把問句中的茶店接到回答的位置關係。\n回頭讀：Unit 4 Sentence A／B、Reminder（課本 pp.51–53）。",
     {
      "listen": "Kevin: Is the convenience store next to the tea shop? Amy: No, it is not. It is across from the library.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en6-12",
   "z": 3,
   "name": "句型與文法",
   "lesson": "Unit 4",
   "draft": true,
   "intro": "Where is the …? It's next to / across from / between … and … / on … Street. Is the … next to …?",
   "q": [
    [
     "介紹現在的地圖，空格應填什麼？\"The tea shop ______ next to the park.\"",
     "is",
     [
      "are",
      "am",
      "was"
     ],
     [
      "先確認主詞代表幾個場所。",
      "一間茶店是單數，而且題目說現在。",
      "選擇單數主詞的現在式 be 動詞。"
     ],
     "正確概念：The tea shop 是單數，現在的位置敘述用 is。\n破誤：「are」：主詞是單數 tea shop，不用 are；「am」：am 只搭配 I，不搭配 tea shop；「was」：題目指定現在的位置，不是過去的位置。\n回頭讀：Unit 4 Sentence A（課本 p.52）。"
    ],
    [
     "選字完成句子：\"The library is between the bakery ______ the park.\"",
     "and",
     [
      "to",
      "from",
      "on"
     ],
     [
      "注意 between 後面有兩個場所。",
      "表示在兩者之間，要用固定的連接方式。",
      "使用 between A and B。"
     ],
     "正確概念：between A and B 表示在 A 與 B 之間。\n破誤：「to」：把 next to 的 to 移到 between 的搭配中；「from」：把 across from 的 from 移到 between 的搭配中；「on」：on 用於街道位置，不能連接 between 後的兩個場所。\n回頭讀：Unit 4 Sentence A／Grammar Tips（課本 p.52）。"
    ],
    [
     "\"Where is the science museum?\" 最適合接哪一句？",
     "It is on Green Street.",
     [
      "It is a science museum.",
      "It is open at nine o’clock.",
      "It is a very big building."
     ],
     [
      "先辨認 Where 要求的資訊。",
      "回答要告訴對方在哪裡。",
      "街道名稱可提供位置。"
     ],
     "正確概念：It is on Green Street. 說明科學博物館在 Green Street 上。\n破誤：「It is a science museum.」：回答場所名稱，沒有交代位置；「It is open at nine o’clock.」：回答開門時間，沒有交代位置；「It is a very big building.」：描述建築大小，沒有交代位置。\n回頭讀：Unit 4 Sentence A（課本 p.52）。"
    ],
    [
     "四個句子中，哪一句完全正確？",
     "The park is next to the library.",
     [
      "The park is next the library.",
      "The park is across the library.",
      "The park is between the library to the bakery."
     ],
     [
      "檢查位置片語是否完整。",
      "next、across、between 都有各自的搭配。",
      "表示在旁邊，next 後需要 to。"
     ],
     "正確概念：The park is next to the library. 完整使用 next to。\n破誤：「The park is next the library.」：next to 不能省略 to；「The park is across the library.」：表示在對面要用 across from，不能省略 from；「The park is between the library to the bakery.」：between 的兩個場所之間要用 and，不是 to。\n回頭讀：Unit 4 Sentence A／Grammar Tips（課本 p.52）。"
    ],
    [
     "依表格，完成句子：\"The tea shop is ______ the bakery and the library.\"",
     "between",
     [
      "across from",
      "on",
      "behind"
     ],
     [
      "先看三個場所是否在街道同一側。",
      "左格、右格各一個場所，中格在兩者之間。",
      "句尾已有兩個以 and 連接的場所。"
     ],
     "正確概念：茶店位於北側中格，麵包店在左、圖書館在右，所以用 between。\n破誤：「across from」：三個場所都在同側，茶店沒有隔街正對這兩個場所；「on」：on 通常接街道，不能表示在兩個店家之間；「behind」：圖上表示並排，沒有畫出茶店在兩者後方。\n回頭讀：Unit 4 Sentence A／Grammar Tips（課本 p.52）。",
     {
      "t": [
       [
        "街道兩側",
        "左格",
        "中格",
        "右格"
       ],
       [
        "北側",
        "bakery",
        "tea shop",
        "library"
       ],
       [
        "Green Street",
        "道路",
        "道路",
        "道路"
       ],
       [
        "南側",
        "MRT station",
        "science museum",
        "convenience store"
       ]
      ],
      "cap": "原創位置圖：同側相鄰格表示 next to；南北同欄隔街正對表示 across from；每格只有一個場所。"
     }
    ],
    [
     "請聽問句。假設地圖確實符合對方描述，應如何肯定回答？",
     "Yes, it is.",
     [
      "Yes, I did.",
      "Yes, it does.",
      "Yes, they are."
     ],
     [
      "聽清楚問句開頭，以及問的是人還是場所。",
      "簡答的主詞和動詞要配合原問句。",
      "一個場所用 it，be 動詞要和問句一致。"
     ],
     "正確概念：問句是 Is the bakery across from the hospital?；肯定簡答用 Yes, it is.。\n破誤：「Yes, I did.」：把現在場所的問句當成自己過去做事的問句；「Yes, it does.」：Is 開頭的問句要用 is 回答，不是 does；「Yes, they are.」：題目問單一場所，不能用複數 they are。\n回頭讀：Unit 4 Sentence B（課本 p.53）；Reminder（課本 p.51）。",
     {
      "listen": "Is the bakery across from the hospital?",
      "rate": 0.9
     }
    ],
    [
     "依位置表格，哪一句正確？",
     "The MRT station is across from the bakery.",
     [
      "The MRT station is across from the tea shop.",
      "The library is between the bakery and the tea shop.",
      "The science museum is next to the library."
     ],
     [
      "先分辨同側旁邊和隔街對面。",
      "同一欄的南北兩格才是圖上正對面。",
      "左欄的捷運站和麵包店隔街相對。"
     ],
     "正確概念：捷運站在南側左格，麵包店在北側左格，所以兩者 across from。\n破誤：「The MRT station is across from the tea shop.」：茶店在中欄，捷運站在左欄，兩者不是正對面；「The library is between the bakery and the tea shop.」：圖書館在右格；中間的是茶店；「The science museum is next to the library.」：科學博物館與圖書館分在街道兩側，不是同側相鄰。\n回頭讀：Unit 4 Sentence A／Grammar Tips（課本 p.52）。",
     {
      "t": [
       [
        "街道兩側",
        "左格",
        "中格",
        "右格"
       ],
       [
        "北側",
        "bakery",
        "tea shop",
        "library"
       ],
       [
        "Green Street",
        "道路",
        "道路",
        "道路"
       ],
       [
        "南側",
        "MRT station",
        "science museum",
        "convenience store"
       ]
      ],
      "cap": "原創位置圖：同側相鄰格表示 next to；南北同欄隔街正對表示 across from；每格只有一個場所。"
     }
    ]
   ]
  },
  {
   "id": "en6-13",
   "z": 3,
   "name": "發音與閱讀",
   "lesson": "Unit 4",
   "draft": true,
   "intro": "al、au、aw 的讀音；故事理解與心智圖（Mind Map）。",
   "q": [
    [
     "請聽單字。它的母音與哪個選項指定的字母讀音相同？",
     "talk 的 al",
     [
      "sky 的 y",
      "sing 的 i",
      "cake 的 a"
     ],
     [
      "先忽略字首字尾，只比較母音。",
      "本課 al、au、aw 的例字有相同的母音。",
      "找出本課 al 組的例字。"
     ],
     "正確概念：念的是 lawn，aw 的母音與 talk 的 al 相同。本題比較讀音，不要求單靠聲音區分同音的 al、au、aw 拼法。\n破誤：「sky 的 y」：sky 的 y 讀 [aɪ]，與聽到的母音不同；「sing 的 i」：把聽到的母音誤認成 sing 的母音；「cake 的 a」：把聽到的母音誤認成 cake 的母音。\n回頭讀：Unit 4 Phonics／Sound It Out（課本 p.58）；Unit 2 Phonics（課本 p.30）；Unit 3 Phonics（課本 p.46）。",
     {
      "listen": "lawn",
      "rate": 0.8
     }
    ],
    [
     "哪個字的母音和另外三個不同？可點播選項比較。",
     "draw",
     [
      "fly",
      "cry",
      "sky"
     ],
     [
      "先找三個母音相同的字。",
      "三個是前一單元的 y 字尾例字。",
      "剩下的字屬於本課 aw 組。"
     ],
     "正確概念：draw 的 aw 母音不同於 fly、cry、sky 的 [aɪ]。\n破誤：「fly」：fly 的 y 讀 [aɪ]，與 cry、sky 相同；「cry」：cry 的 y 讀 [aɪ]，與 fly、sky 相同；「sky」：sky 的 y 讀 [aɪ]，與 fly、cry 相同。\n回頭讀：Unit 4 Phonics（課本 p.58）；Unit 3 Phonics（課本 p.46）。",
     {
      "speakOptions": true
     }
    ],
    [
     "哪個字的母音和 \"walk\" 中 al 的讀音相同？",
     "sauce",
     [
      "sunny",
      "ring",
      "sky"
     ],
     [
      "字母拼法不同，也可能有相同的讀音。",
      "本課把 al、au、aw 放在一起比較。",
      "找出 au 組的例字。"
     ],
     "正確概念：sauce 的 au 與 walk 的 al 有相同的母音，是本課的拼讀重點。\n破誤：「sunny」：sunny 的 u 及字尾 y 都不是本課 al 的母音；「ring」：ring 的母音屬於 -ing 組，不同於 walk；「sky」：sky 的 y 讀 [aɪ]，與 walk 的母音不同。\n回頭讀：Unit 4 Phonics／Sound It Out（課本 p.58）。"
    ],
    [
     "請聽單字，選出正確的拼字。",
     "talk",
     [
      "walk",
      "chalk",
      "fork"
     ],
     [
      "這些字很相近，先比較開頭。",
      "別只靠相似的母音和最後的音判斷。",
      "這個字表示說話。"
     ],
     "正確概念：念的是 talk；與 walk、chalk、fork 的開頭不同。\n破誤：「walk」：母音和字尾相同，但字首不是 w；「chalk」：忽略字首和 talk 不同；「fork」：只聽相近母音與字尾，忽略字首及其他聲音。\n回頭讀：Unit 4 Phonics／Sound It Out（課本 p.58）。",
     {
      "listen": "talk",
      "rate": 0.8
     }
    ],
    [
     "依短文，Emma 家的對面是哪個場所？",
     "書店",
     [
      "茶店",
      "公園",
      "科學博物館"
     ],
     [
      "先找出 across from 所在的句子。",
      "不要把 next to 和 across from 混淆。",
      "對面是可以買書的場所。"
     ],
     "正確概念：短文寫 The bookstore is across from her house.，所以對面是書店。\n破誤：「茶店」：茶店在她家旁邊，不是對面；「公園」：公園在書店旁邊，文中沒有說它正對 Emma 家；「科學博物館」：文中沒有提到科學博物館。\n回頭讀：Unit 4 Vocabulary、Sentence A（課本 pp.50–52）；Reading Skills：Mind Map（課本 p.5）。",
     {
      "passage": "Emma made a map for Amy. Her house is on Green Street. The tea shop is next to her house. Amy can buy tea there. The bookstore is across from her house. Amy can buy books there. The park is next to the bookstore. Emma and Amy like to play in the park. Emma put these places on her map."
     }
    ],
    [
     "依短文製作「Emma 家附近的場所與活動」心智圖，哪個分支配對正確？",
     "書店 → 買書",
     [
      "茶店 → 買書",
      "公園 → 買茶",
      "書店 → 遊玩"
     ],
     [
      "先把場所分成三個分支。",
      "每個分支要接回文中對應的活動。",
      "找出 buy books 所屬的場所。"
     ],
     "正確概念：書店分支對應買書；茶店對應買茶，公園對應遊玩。心智圖要保留正確的分類關係。\n破誤：「茶店 → 買書」：把書店的活動放到茶店分支；「公園 → 買茶」：把茶店的活動放到公園分支；「書店 → 遊玩」：把文中公園的活動放到書店分支。\n回頭讀：Unit 4 Reading Skills：Mind Map（課本 p.5）；Reading／Mind Map（課本 pp.56–57）。",
     {
      "passage": "Emma made a map for Amy. Her house is on Green Street. The tea shop is next to her house. Amy can buy tea there. The bookstore is across from her house. Amy can buy books there. The park is next to the bookstore. Emma and Amy like to play in the park. Emma put these places on her map."
     }
    ],
    [
     "依 Unit 4 Story，哪位孩子最後認出迷路長者，叫了他一聲 \"Grandpa\"？",
     "Emma",
     [
      "Amy",
      "Kevin",
      "Boka"
     ],
     [
      "回想故事最後，誰認出了長者。",
      "他們原本正要去一位朋友家。",
      "那位朋友的名字以 E 開頭。"
     ],
     "正確概念：Emma 認出長者並叫他 Grandpa，呼應 A Small World 的情節。Grandpa 可指爺爺或外公，此題只考人物辨認。\n破誤：「Amy」：把同行的 Amy 誤認為叫出 Grandpa 的孩子；「Kevin」：把幫忙帶路的 Kevin 誤當成長者的家人；「Boka」：把同行的 Boka 誤當成長者的家人。\n回頭讀：Unit 4 Story（課本 p.49）。"
    ]
   ]
  },
  {
   "id": "en6-14",
   "z": 3,
   "name": "綜合複習",
   "lesson": "Review 2",
   "draft": true,
   "intro": "Unit 3、Unit 4 的字彙、句型與發音綜合練習。",
   "q": [
    [
     "哪個英文地名表示「愛河」？",
     "Love River",
     [
      "Sun Moon Lake",
      "Guishan Island",
      "Beitou Hot Springs"
     ],
     [
      "先判斷中文地名的水域類型。",
      "河流的英文是 river。",
      "這個名稱前面還有表示愛的英文。"
     ],
     "正確概念：Love River 是課本出現的愛河英文名稱。\n破誤：「Sun Moon Lake」：這是日月潭，是湖的名稱；「Guishan Island」：這是龜山島，是島的名稱；「Beitou Hot Springs」：這是北投溫泉，不是河流名稱。\n回頭讀：Unit 3 Vocabulary（課本 pp.38–39）；Review 2 Sentence Review（課本 p.59）。"
    ],
    [
     "哪個英文場所名稱表示「便利商店」？",
     "convenience store",
     [
      "science museum",
      "MRT station",
      "tea shop"
     ],
     [
      "先判斷場所是商店、博物館還是車站。",
      "store 表示商店，前面的字可區分種類。",
      "找出本課便利商店的完整名稱。"
     ],
     "正確概念：convenience store 是便利商店。\n破誤：「science museum」：這是科學博物館，不是便利商店；「MRT station」：這是捷運站，不是商店；「tea shop」：這是茶店，不是便利商店。\n回頭讀：Unit 4 Vocabulary（課本 p.50）；Review 2（課本 pp.59–61）。"
    ],
    [
     "選出正確問句來詢問「你上週日去了哪裡？」。",
     "Where did you go last Sunday?",
     [
      "Where did you went last Sunday?",
      "Where do you go last Sunday?",
      "Where does you go last Sunday?"
     ],
     [
      "先檢查時間詞，再看助動詞。",
      "過去地點問句用 Where did you ...?。",
      "did 後要接原形 go。"
     ],
     "正確概念：Where did you go last Sunday? 正確詢問上週日去的地點。\n破誤：「Where did you went last Sunday?」：did 後應用 go，不是 went；「Where do you go last Sunday?」：last Sunday 的過去問句要用 did；「Where does you go last Sunday?」：you 不用 does，且時態應是過去。\n回頭讀：Unit 3 Sentence A（課本 p.40）；Review 2（課本 p.60）。"
    ],
    [
     "依位置表格，哪一句正確描述書店？",
     "It is between the hospital and the bakery.",
     [
      "It is across from the hospital and the bakery.",
      "It is between the hospital to the bakery.",
      "It is on the hospital and the bakery."
     ],
     [
      "先找書店位於哪一格。",
      "兩側各有一個場所，且三者同側並排。",
      "表示在兩者之間，要用 between ... and ...。"
     ],
     "正確概念：書店在醫院與麵包店之間，因此用 between the hospital and the bakery。\n破誤：「It is across from the hospital and the bakery.」：三個場所同側並排，並未隔街相對；「It is between the hospital to the bakery.」：between 的搭配是 and，不是 to；「It is on the hospital and the bakery.」：on 不能把兩個建築當作街道來表達此位置。\n回頭讀：Unit 4 Sentence A（課本 p.52）；Review 2（課本 p.61）。",
     {
      "t": [
       [
        "位置",
        "左格",
        "中格",
        "右格"
       ],
       [
        "Park Street 同側",
        "hospital",
        "bookstore",
        "bakery"
       ]
      ],
      "cap": "原創位置圖：三個場所沿街並排，中格位於左右兩格之間。"
     }
    ],
    [
     "哪一組指定字母的母音相同？",
     "walk（al）／sauce（au）",
     [
      "sky（y）／baby（y）",
      "cry（y）／lawn（aw）",
      "puppy（y）／talk（al）"
     ],
     [
      "只比較括號指定的字母。",
      "相同拼法可能不同音；不同拼法也可能同音。",
      "本課 al、au、aw 的例字可歸在同音組。"
     ],
     "正確概念：walk 的 al 與 sauce 的 au 母音相同；其他各組指定字母的讀音不同。\n破誤：「sky（y）／baby（y）」：sky 的 y 讀 [aɪ]，baby 的 y 依本課標示讀 [ɪ]；「cry（y）／lawn（aw）」：cry 的 [aɪ] 與 lawn 的 aw 不同；「puppy（y）／talk（al）」：puppy 的字尾 y 與 talk 的 al 母音不同。\n回頭讀：Review 2 Phonics Review（課本 p.62）。"
    ],
    [
     "請聽對話，Emma 上星期五去了哪裡？",
     "森林",
     [
      "湖邊",
      "海灘",
      "溫泉"
     ],
     [
      "先聽回答是肯定還是否定。",
      "真正的地點在後面的補充句。",
      "她去了有許多樹木的地方。"
     ],
     "正確概念：原創對話：Amy: Did you go to the lake last Friday, Emma? Emma: No, I did not. I went to the forest. Emma 去森林，沒有去湖邊。\n破誤：「湖邊」：湖是被問到而否定的地點；「海灘」：對話沒有說 Emma 去海灘；「溫泉」：對話沒有說 Emma 去溫泉。\n回頭讀：Unit 3 Sentence B（課本 p.41）；Review 2（課本 p.60）。",
     {
      "listen": "Amy: Did you go to the lake last Friday, Emma? Emma: No, I did not. I went to the forest.",
      "rate": 0.9
     }
    ],
    [
     "請聽句子，哪個位置描述正確？",
     "醫院在公園對面",
     [
      "醫院在公園旁邊",
      "醫院在茶店對面",
      "書店在公園對面"
     ],
     [
      "分別辨認主詞、位置關係和另一個場所。",
      "不要只聽到其中一個場所就作答。",
      "兩個場所隔街相對。"
     ],
     "正確概念：句子是 The hospital is across from the park.，表示醫院在公園對面。\n破誤：「醫院在公園旁邊」：把 across from 誤聽成 next to；「醫院在茶店對面」：把 park 換成 tea shop；「書店在公園對面」：把 hospital 換成 bookstore。\n回頭讀：Unit 4 Reminder、Sentence A（課本 pp.51–52）；Review 2（課本 p.61）。",
     {
      "listen": "The hospital is across from the park.",
      "rate": 0.9
     }
    ]
   ]
  },
  {
   "id": "en6-15",
   "z": 4,
   "name": "世界節慶",
   "lesson": "Culture & Festivals",
   "draft": true,
   "intro": "十二個月份與世界各地的節慶。",
   "q": [
    [
     "請聽月份，選出正確的英文單字。",
     "July",
     [
      "June",
      "January",
      "February"
     ],
     [
      "聽完整個月份名稱。",
      "比較音節數與最後的母音。",
      "這個月份是六月之後的一個月。"
     ],
     "正確概念：念的是 July（七月）；June 是六月，January 是一月，February 是二月。\n破誤：「June」：把相似開頭的六月與七月混淆；「January」：只聽字首 j，沒有分辨後續音節；「February」：只注意字尾相似，沒有聽清開頭。\n回頭讀：Culture & Festivals：月份（課本 pp.64–66）。",
     {
      "listen": "July",
      "rate": 0.8
     }
    ],
    [
     "哪個英文單字表示「十二月」？",
     "December",
     [
      "September",
      "November",
      "October"
     ],
     [
      "先比較這些相近的月份字。",
      "不要只看共同的 -ber 字尾。",
      "一年最後一個月的英文以 D 開頭。"
     ],
     "正確概念：December 是十二月；September、October、November 分別是九、十、十一月。\n破誤：「September」：September 是九月，不能只看共同的字尾；「November」：November 是十一月，比十二月早一個月；「October」：October 是十月，不是十二月。\n回頭讀：Culture & Festivals：月份（課本 pp.66–67）。"
    ],
    [
     "依課本介紹，Groundhog Day（土撥鼠日）配在哪個月份？",
     "February",
     [
      "May",
      "March",
      "August"
     ],
     [
      "先回想課本前幾個月份的節慶。",
      "它在新年元旦那一個月之後。",
      "土撥鼠日配在二月。"
     ],
     "正確概念：課本將 Groundhog Day 配在 February（二月）。\n破誤：「May」：課本 May 配 Mother’s Day，不是 Groundhog Day；「March」：課本 March 配 Saint Patrick’s Day，不是 Groundhog Day；「August」：課本 August 配 Father’s Day，不是 Groundhog Day。\n回頭讀：Culture & Festivals：February／Groundhog Day、月份配對（課本 pp.64–66）。"
    ],
    [
     "依課本介紹，Saint Patrick’s Day（聖派翠克節）配在哪個月份？",
     "March",
     [
      "January",
      "February",
      "April"
     ],
     [
      "回想穿綠衣、戴綠帽的節慶在哪一欄。",
      "它在二月之後、四月之前。",
      "選三月的英文名稱。"
     ],
     "正確概念：課本將 Saint Patrick’s Day 配在 March（三月）。\n破誤：「January」：課本 January 是 New Year’s Day 的月份；「February」：課本 February 是 Groundhog Day 的月份；「April」：課本 April 是 Earth Day 的月份。\n回頭讀：Culture & Festivals：March／Saint Patrick’s Day（課本 p.64）。"
    ],
    [
     "依短文，Amy 和 Kevin 正在為哪個節慶製作海報？",
     "Earth Day",
     [
      "Groundhog Day",
      "Saint Patrick’s Day",
      "New Year’s Day"
     ],
     [
      "找出 making 和 poster 所在的句子。",
      "海報名稱直接出現在文中。",
      "它關心的是照顧地球。"
     ],
     "正確概念：短文明寫 an Earth Day poster，所以是地球日。\n破誤：「Groundhog Day」：短文直接寫 Earth Day，沒有提土撥鼠日；「Saint Patrick’s Day」：不能只因畫了樹、想到綠色，就改選聖派翠克節；「New Year’s Day」：文中是四月的地球日海報，不是元旦海報。\n回頭讀：Culture & Festivals：April／Earth Day（課本 p.65）。",
     {
      "passage": "It is April. Amy and Kevin are making an Earth Day poster at school. Amy draws a river and some trees. Kevin draws a lake. They want people to take care of the Earth. After school, they go to the park with Emma. They clean the park together. Emma says, \"We can help the Earth every day.\" The three friends smile."
     }
    ],
    [
     "依短文，哪個說法最符合 Emma 最後一句話？",
     "每天都能愛護地球",
     [
      "只有四月才能愛護地球",
      "只有在學校才能愛護地球",
      "只有畫完海報才能愛護地球"
     ],
     [
      "先找 Emma 說的最後一句。",
      "注意 every day 的範圍。",
      "她鼓勵把照顧地球變成每天都能做的事。"
     ],
     "正確概念：Emma 說可以每天幫助地球，與課本地球日鼓勵照顧地球的概念相符。\n破誤：「只有四月才能愛護地球」：every day 表示每天，不限定四月；「只有在學校才能愛護地球」：她們也去公園打掃，不限於學校；「只有畫完海報才能愛護地球」：文中沒有先完成海報才可行動的限制。\n回頭讀：Culture & Festivals：April／Earth Day（課本 p.65）。",
     {
      "passage": "It is April. Amy and Kevin are making an Earth Day poster at school. Amy draws a river and some trees. Kevin draws a lake. They want people to take care of the Earth. After school, they go to the park with Emma. They clean the park together. Emma says, \"We can help the Earth every day.\" The three friends smile."
     }
    ],
    [
     "請聽英文，依課本介紹選出最符合的節慶。",
     "Thanksgiving Day",
     [
      "Saint Patrick’s Day",
      "Dragon Boat Festival",
      "Boryeong Mud Festival"
     ],
     [
      "先聽月份，再聽食物。",
      "把月份和代表食物一起對照課本。",
      "課本十一月的節慶介紹火雞和南瓜派。"
     ],
     "正確概念：原創聽力：In November, we have turkey and pumpkin pie on this day. 依課本 November 欄，這是 Thanksgiving Day。題目限定課本介紹，不將其他地區日期當成前提。\n破誤：「Saint Patrick’s Day」：課本這個節慶談綠色衣帽與食物，不是火雞和南瓜派；「Dragon Boat Festival」：課本端午節談龍舟與粽子，不是火雞和南瓜派；「Boryeong Mud Festival」：課本保寧泥漿節談泥漿遊戲，不是這兩種食物。\n回頭讀：Culture & Festivals：November／Thanksgiving Day（課本 p.67）。",
     {
      "listen": "In November, we have turkey and pumpkin pie on this day.",
      "rate": 0.9
     }
    ]
   ]
  }
 ]
};
