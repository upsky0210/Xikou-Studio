# 英語題庫規劃書（給 Codex）——康軒六上英語 Wonder World 9

> 2026-11-08，Claude Code 規劃。這次分工如下：
> - **Codex**：負責出題與自我檢查。
> - **Claude Code**：負責審核、組裝、做畫面（包括聽力播放），以及上線。
>
> 做完後，請照第 9 節交件。不要只回「完成」。

## 0. 權限與工作範圍（硬性規定）

- **工作資料夾**：`C:\AI\web-test`（整個專案）。
  - 可以讀任何檔案，用來參考格式、執行檢查工具。
- **只准寫入 `drafts/en6/`**。以下一律不准改：
  - `data/`、`js/`、`css/`、`tools/`、`index.html`
  - 其他書的 drafts
  - `source/`
  - 本規劃書
- **不要 commit、不要 push、不要上網**。
  - 教材有版權，不可上傳到任何地方，也不要把教材文字大段貼進任何對外的服務。
- **教材**：`source/康軒六上英語ww9/`，共 17 個 PDF 教師手冊（教學篇）。課本頁縮版和教學說明都在裡面。
  - 教材沒有音檔，也不需要音檔。聽力由網站用瀏覽器的英語語音朗讀，你只要寫出「要念的英文」。
- **`drafts/en6/en6.js` 是 Claude Code 已建好的骨架**，裡面有 15 關和 5 個區域。
  - 不要改 levels 的 id、z、name、lesson、intro，也不要改 zones。
  - 只能用 `tools/assemble.mjs` 把題目填進去。

## 1. 關卡切法（共 15 關，每關 7 題，共 105 題）

| 關卡 | 區域 | 單元 | 關名 | 範圍 |
|---|---|---|---|---|
| en6-01 | 0 | Unit 1 First Day of School | 字彙與聽力 | Vocabulary：played the recorder、cooked dinner、walked the dog、watched a movie、visited my grandparents、cleaned the room，以及 More Words 與故事中的字詞 |
| en6-02 | 0 | Unit 1 | 句型與文法 | Sentence A：What did you do yesterday? I cleaned the room yesterday.<br>Sentence B：Did you …? Yes, I did. / No, I didn't.<br>Grammar Tips：規則動詞加 -ed、現在與過去的時間詞 |
| en6-03 | 0 | Unit 1 | 發音與閱讀 | Phonics：-ed 讀 [d] [t] [ɪd]<br>Story 理解；Reading Skills：Make Inferences（推論） |
| en6-04 | 1 | Unit 2 A Great Day | 字彙與聽力 | Vocabulary：had breakfast / lunch / dinner、went shopping、went swimming、did the dishes、did the laundry，以及 More Words |
| en6-05 | 1 | Unit 2 | 句型與文法 | What time did you …? I … at six o'clock.<br>Did you …? 不規則動詞 do→did、have→had、go→went<br>第三人稱現在式 does、has、goes 與過去式的區分 |
| en6-06 | 1 | Unit 2 | 發音與閱讀 | Phonics：-ing、-ong<br>Story 理解；Reading Skills：Contrast（對比） |
| en6-07 | 1 | Review 1 | 綜合複習 | Unit 1～2 的字彙、句型、發音（Phonics Review 的 -ed、-ing、-ong） |
| en6-08 | 2 | Unit 3 Amy's Graduation Trip | 字彙與聽力 | Vocabulary：island、forest、beach、hot spring、lake、river、mountain、More Words，以及課本出現的臺灣地名（Sun Moon Lake、Ali Mountain 等） |
| en6-09 | 2 | Unit 3 | 句型與文法 | Where did you go last weekend? I went to the …<br>Did you go to …? Yes, I did. / No, I didn't. 過去時間詞 |
| en6-10 | 2 | Unit 3 | 發音與閱讀 | Phonics：y- [j]、-y [aɪ]、-y [ɪ]<br>Story 理解；Reading Skills：Reference（指稱） |
| en6-11 | 3 | Unit 4 A Small World | 字彙與聽力 | Vocabulary：tea shop、science museum、MRT station、convenience store、More Words，以及 Reminder 中的場所字 |
| en6-12 | 3 | Unit 4 | 句型與文法 | Where is the …? It's next to / across from / between … and … / on … Street.<br>Is the … next to …? Yes, it is. / No, it's not. |
| en6-13 | 3 | Unit 4 | 發音與閱讀 | Phonics：al、au、aw<br>Story 理解；Reading Skills：Mind Map（心智圖） |
| en6-14 | 3 | Review 2 | 綜合複習 | Unit 3～4 的字彙、句型、發音（y、al、au、aw） |
| en6-15 | 4 | Culture & Festivals | 世界節慶 | 十二個月份、課本介紹的世界節慶（New Year's Day、Groundhog Day、Saint Patrick's Day 等），以課本出現的為限 |

- **題號與關卡對應**：題號 `L03-Q2` 對應 `en6-03` 的第 2 題。
- **檔案分成五份**，每份照第 4 節格式寫：
  - `drafts/en6/en6-questions-U1.json`：L01～L03
  - `drafts/en6/en6-questions-U2.json`：L04～L07
  - `drafts/en6/en6-questions-U3.json`：L08～L10
  - `drafts/en6/en6-questions-U4.json`：L11～L14
  - `drafts/en6/en6-questions-CF.json`：L15

## 2. 每關 7 題的題型配置

### 2.1「字彙與聽力」關（L01、L04、L08、L11）

| 題號 | 題型 | 怎麼出 |
|---|---|---|
| Q1 | 聽音選字 | 念一個單字或片語，學生選出聽到的拼字。干擾項是音近或形近的字，例如 lake／like／make。 |
| Q2 | 聽音選字 | 同上，換一個字；可以考較長的片語，例如 walked the dog。 |
| Q3 | 聽音選意思 | 念一個單字或片語，學生選出中文意思。 |
| Q4 | 看中文選英文 | 不用聽力；題幹給中文，例如「洗碗」，選出正確的英文片語。 |
| Q5 | 字彙情境 | 不用聽力；一句英文缺一個片語，選出最合適的。 |
| Q6 | 聽句子選圖意 | 念一句英文，例如 I walked the dog yesterday.，學生選出最符合的中文描述。 |
| Q7 | 聽短對話回答 | 念 2～4 句的原創對話，學生回答問題，例如「Kevin 昨天做了什麼？」。 |

### 2.2「句型與文法」關（L02、L05、L09、L12）

| 題號 | 題型 | 怎麼出 |
|---|---|---|
| Q1 | 動詞形式 | 選出正確的過去式或動詞形式，例如 visit → visited；go → went。 |
| Q2 | 句型填空 | 選出正確的助動詞或句型，例如 Did / Do / Does、did / didn't。 |
| Q3 | 問答配對 | 題幹是問句，選出最合適的回答。 |
| Q4 | 改錯 | 四個句子中選出完全正確的一句。干擾句各有一種典型錯誤，例如 Did you went、He goed。 |
| Q5 | 時間詞或場所 | 依時間詞判斷時態；Unit 4 則依位置圖判斷介系詞，位置圖用表格附件呈現。 |
| Q6 | 聽問句選回答 | 念一句問句，學生選出最合適的回答。 |
| Q7 | 情境應用 | 給一段情境說明，可以用表格或條列附件，例如作息表、行程表、街道位置，選出正確的句子。 |

### 2.3「發音與閱讀」關（L03、L06、L10、L13）

| 題號 | 題型 | 怎麼出 |
|---|---|---|
| Q1 | 聽音辨字母組合 | 念一個字，學生選出它含有哪一種讀音或拼法。例如念 talked，選「-ed 讀 [t]」。 |
| Q2 | 選出讀音不同的字 | 四個選項都是英文字，學生選出讀音不同的那一個。附件用 `{"speakOptions": true}`，讓每個選項都能點播。 |
| Q3 | 拼讀規則 | 不用聽力；選出符合某個讀音的字，例如「哪個字的 y 讀 [aɪ]？」 |
| Q4 | 聽音選字 | 念 Phonics Word Bank 或 Sound It Out 範圍內的字，選出拼字。干擾項是同組讀音的近似字。 |
| Q5 | 短文擷取 | 原創英文短文（50～90 字），用 `{"passage": "…"}` 附件；學生回答直接寫在文中的事實。 |
| Q6 | 閱讀技巧 | 同一篇短文，考本單元的 Reading Skill：推論、對比、指稱或心智圖。 |
| Q7 | 故事理解 | 考本單元 Story 的情節或人物，可以引用課本一句不超過 12 個字的短對話；不要整段照抄。 |

### 2.4「綜合複習」關（L07、L14）與「世界節慶」關（L15）

- **綜合複習**：字彙 2 題、句型 2 題、發音 1 題、聽力 2 題。範圍以該 Review 單元和前兩個 Unit 為限。
- **世界節慶**：
  - 月份 2 題，其中聽力 1 題；
  - 節慶與月份配對 2 題；
  - 節慶短文閱讀 2 題，短文需原創；
  - 聽句子選節慶 1 題。

**全書的聽力題約占 35～40%**（每關 2～3 題）。

## 3. 聽力題的寫法（重要）

- **附件格式**：`{"listen": "要念的英文", "rate": 0.9}`。
  - `rate` 是語速，範圍 0.6～1。單字建議 0.8，句子和對話建議 0.9。不寫就用 1。
- **網站怎麼呈現**：網站會顯示「播放」和「慢速播放」兩個按鈕，學生可以重複聽。`listen` 的文字**不會出現在畫面上**，要等答完題才在詳解中出現。所以：
  - 題幹只寫指示，例如「請聽英文，選出你聽到的單字。」，**不能寫出要念的內容，也不能寫出正解**。檢查工具會擋。
  - `listen` 只能用英文和標點，不能有中文、注音或音標。
  - 不要放括號註解或「A:」「B:」這種念出來會很怪的標記。對話請用人名開頭，例如 `Kevin: What did you do yesterday? Amy: I visited my grandparents.`，網站會整段念出。
  - 數字和時間寫成語音念得自然的形式，例如 `six thirty`、`at five o'clock`，不要寫 `6:30`。
  - 一題的 `listen` 不超過 60 個字。
- **選項可點播**：`{"speakOptions": true}` 會在每個選項旁加喇叭，用在「選出讀音不同的字」這類題目。這時四個選項必須都是英文。
- **不要出要學生開口念的題目**。網站沒有收音功能。
- **聽力的干擾項**要針對「聽錯」設計：
  - 音近字，例如 walked／worked
  - 母音混淆，例如 lake／like
  - 字尾 -ed 漏聽，例如 cook／cooked
  - 時間數字聽錯，例如 five／nine
  - 同句中出現過、但不是答案的資訊，例如對話裡提到兩個人做不同的事

## 4. 題目檔格式（JSON 陣列，比照 `drafts/ck6-questions-L02-L03.json`）

```json
{
  "id": "L01-Q1",
  "level": "L01 Unit 1 字彙與聽力",
  "type": "聽力：聽音選字",
  "stem": "請聽英文，選出你聽到的片語。",
  "attachment": { "listen": "walked the dog", "rate": 0.8 },
  "answer": "walked the dog",
  "distractors": [
    { "text": "watched the dog", "trap": "音近動詞", "misconception": "walked 和 watched 開頭相同，只聽前半就作答。" },
    { "text": "walk the dog", "trap": "漏聽 -ed", "misconception": "沒聽到字尾 -ed 的 [t] 音，選成現在式。" },
    { "text": "worked the dog", "trap": "母音混淆", "misconception": "把 walk [ɔ] 聽成 work [ɝ]。" }
  ],
  "hints": ["先聽第一個字是什麼動作。", "注意字尾：有沒有聽到 -ed 的 [t] 音？", "這個動作和狗有關，是帶狗去散步。"],
  "explanation": "正確概念：念的是 walked the dog（遛狗），walked 是 walk 的過去式，-ed 讀 [t]。破誤：watched 是看；walk 少了 -ed；worked 的母音不同，而且 work the dog 不是課本用法。回頭讀：Unit 1 Vocabulary（課本 p.10）。",
  "verify": { "kind": "judge", "basis": "Unit 1 Vocabulary：walked the dog（課本 p.10，教學篇 U1 第 4 頁）" }
}
```

- **欄位**：
  - `trap`：錯誤類型的名稱，見第 6 節。
  - `misconception`：學生為什麼會選這個干擾項。
  - `verify.basis`：教材依據，寫課本頁碼或教學篇哪一頁、哪一欄。一律用 `"kind": "judge"`。
- **附件**：
  - 不需要附件就寫 `null`。
  - 表格：`{"t": [["欄1","欄2"],["…","…"]], "cap": "標題"}`。
  - 條列：`{"list": ["…","…"], "cap": "標題"}`。
  - 短文：`{"passage": "…"}`；同一篇短文給同關兩題用時，兩題的附件要一字不差。
- **語言**：
  - 題幹、提示、詳解用台灣正體中文。
  - 英文內容放在引號裡，或直接作為選項。
  - 選項依題型可以是英文或中文。
- **詳解三段格式**：
  1. 「正確概念：……」
  2. 「破誤：……」：逐一說明三個干擾項為什麼錯。
  3. 「回頭讀：Unit X 的 Story／Vocabulary／Sentence A／Grammar Tips／Phonics（課本 p.__）」：要指學生課本找得到的欄名和頁碼，不要寫「教師手冊」或「習作」。

## 5. 出題前提與原創（硬性規定）

- **前提範圍**：只考課本正文教過的內容。正文包括：
  - Story、Vocabulary（含 More Words）、Sentence A／B
  - Grammar Tips、Reminder、Phonics（Sound It Out、Word Bank）
  - Reading Skills、Review、Culture & Festivals
- **不當前提**：教學篇的「教學補充」「延伸」「文化小知識」只能拿來設計情境，不能當成學生已學過的知識。
- **不照抄**：
  - 不抄課本或習作的練習題，例如 Listen and Number、Look and Fill In、習作的題目與選項。
  - 課本的 Listen and Number 對話腳本、Story 文字，都不能整段拿來當聽力內容或閱讀短文。
  - 聽力對話與閱讀短文要自己寫，可以用課本人物（Amy、Kevin、Boka、Emma、Jello）和本課句型。
- **字彙範圍**：以該單元與之前單元的字彙為主。非本冊的字只能出現在干擾項或短文的次要位置，而且必須是國小常見字。
- **文法術語**：題幹可以用「過去式」「助動詞 did」「介系詞」等課本 Grammar Tips 用過的說法，不要用課本沒出現的術語。
- **發音標示**：用課本用的 [d] [t] [ɪd]、[j] [aɪ] [ɪ] 等標示，不要另用 KK 或 IPA 的其他寫法。

## 6. 干擾項錯誤類型（`trap` 欄位，請從這些選，必要時可加）

| trap | 例子 |
|---|---|
| 規則過去式誤用 | goed、haved、doed；cleanned |
| did 後接過去式 | Did you went …? / I didn't cleaned … |
| 時態與時間詞不合 | I clean the room yesterday. / I cleaned the room every day. |
| 第三人稱混淆 | Amy go swimming every day. / Amy does the dishes yesterday. |
| 簡答不一致 | Did you …? — Yes, I do. / No, I wasn't. |
| 介系詞混淆 | next to／across from／between 對調；between 後面少了 and |
| 疑問詞混淆 | 問 Where 回答時間；問 What time 回答地點 |
| -ed 讀音混淆 | [d] [t] [ɪd] 互換 |
| y 讀音混淆 | y- [j]／-y [aɪ]／-y [ɪ] 互換 |
| 拼字組合混淆 | -ing／-ong；al／au／aw |
| 音近字 | walked／worked；lake／like；beach／peach |
| 漏聽字尾 | cook／cooked；shop／shopping |
| 中文意思混淆 | did the dishes（洗碗）↔ did the laundry（洗衣服） |
| 對話資訊錯置 | 選到對話中另一個人做的事，或另一個時間 |
| 文意推論過度 | 短文沒寫的事 |

- **禁止秒刪型選項**：不要出一眼就能排除的荒謬選項，例如拼不成字的亂碼、和主題完全無關的字。
- **每題四個選項的詞性和形式要一致**：例如都是過去式片語，或都是完整句子。
- **長度平衡**：
  - 英文選項：正解的字元數（不含空白）不得比最長的干擾項多 5 個以上。
  - 中文選項：正解不得比最長的干擾項多 4 個字以上。
  - 正解是四個選項中最長的題目，全書不超過三成。
- **正解唯一**：干擾項不能部分成立，也不能和正解同義。聽力題要確認干擾項的讀音確實和念的內容不同。
- **不出**「以上皆是」「以上皆非」。

## 7. 提示

- 三段提示漸進：
  1. 先提示要注意哪裡，例如「先聽動詞」「找時間詞」；
  2. 再提示判斷規則；
  3. 最後才接近答案。
- **第 1 段不能洩漏答案。**
- 聽力題的提示不能直接寫出要念的字。

## 8. 交件前自我檢查（請實際執行並貼結果）

在 `C:\AI\web-test` 依序執行：

```bash
node tools/assemble.mjs drafts/en6/en6.js EN6 drafts/en6/en6-questions-U1.json drafts/en6/en6-questions-U2.json drafts/en6/en6-questions-U3.json drafts/en6/en6-questions-U4.json drafts/en6/en6-questions-CF.json
node tools/check-data.mjs drafts/en6/en6.js EN6 drafts/en6/en6-questions-U1.json drafts/en6/en6-questions-U2.json drafts/en6/en6-questions-U3.json drafts/en6/en6-questions-U4.json drafts/en6/en6-questions-CF.json
node tools/review-sheet.mjs drafts/en6/抽驗清單-英語.md drafts/en6/en6-questions-U1.json drafts/en6/en6-questions-U2.json drafts/en6/en6-questions-U3.json drafts/en6/en6-questions-U4.json drafts/en6/en6-questions-CF.json
```

- `check-data` 必須回報「沒有問題」。它會檢查：
  - 每關 7 題、3 個干擾項、3 段提示，以及附件格式；
  - 聽力題的題幹沒有洩答；
  - `listen` 只用英文；
  - 點播選項都是英文。
- 另外請自己寫一小段程式掃描「長度平衡」（第 6 節），列出超標的題號，修到 0 題。
- 用 `git status` 確認只有 `drafts/en6/` 底下有變動。

## 9. 交付物（全部放在 `drafts/en6/`）

1. `en6-questions-U1.json`、`-U2.json`、`-U3.json`、`-U4.json`、`-CF.json`：共 105 題。
2. `en6.js`：用 assemble 組好的資料檔。
3. `抽驗清單-英語.md`：用 review-sheet 產生。
4. `英語自檢報告.md`，內容包括：
   - ① 第 8 節三個指令的輸出結果；
   - ② 長度掃描結果；
   - ③ 各關聽力題數，與全書聽力比例；
   - ④ 每關用到的課本頁碼範圍；
   - ⑤ 沒把握的題目清單，寫明題號與原因，例如「不確定 More Words 是否算正文」；
   - ⑥ `git status` 輸出，證明只動了 `drafts/en6/`。

交件後由 Claude Code 審核。審核時會逐題檢查：正解、讀音、前提範圍、聽力內容是否念得自然、干擾項品質。審核通過後，Claude Code 才做聽力播放畫面並上線。
