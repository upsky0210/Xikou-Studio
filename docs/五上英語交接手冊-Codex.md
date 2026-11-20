# 五上英語（en5）交接手冊（給 Codex）

> 2026-11-20 Claude Code 撰寫。Unit 1（en5-01～03，21 題）已由 Claude Code 做完當樣板；**Unit 2 → Review 1 → Unit 3 → Unit 4 → Review 2 由 Codex 接手**。2026-11-20 全書 14 關 98 題做完（都是草稿，待老師抽驗）。
> 開工前依序讀：`CLAUDE.md` → `docs/五年級題庫交接手冊-Codex.md` 第 0、2、7、8 節（共同權限與規格）→ 這份 → `drafts/en5/build-U1.mjs`（樣板）→ `drafts/en5/自檢報告-U1.md`。
> 六上那份 `docs/國小練習平台-英語題庫規劃書-Codex.md` 是同一套題型的原始規格，**這份沒寫到的，照那份**；兩份衝突時以這份為準。

## 0. 權限（硬性規定）

- 可以讀整個 `C:\AI\web-test`。**只能寫**：
  - `drafts/en5/`（產生器、題目檔、抽驗清單、自檢報告）
  - `data/en5.js`（只能用 `drafts/en5/add-levels.mjs` 加關、用 `tools/assemble.mjs` 填題目，不要手改）
- 不可以改：`js/`、`css/`、`index.html`、`sw.js`、`tools/`、`docs/`、`CLAUDE.md`、`README.md`、別本書的檔案，以及 `drafts/en5/build-unit.mjs`（Unit 1 也在用；真的要改就寫在自檢報告）。
- 不要 commit、push、連網、安裝套件。
- 教材 `source/康軒五上英語ww7/` 有版權，不上傳、不把整段原文搬進題目檔。

## 1. 教材怎麼讀

- 文字檔：`source/_text/康軒五上英語ww7/`（橫排，順序正常）。沒有這個資料夾就在 repo 根目錄跑 `python -I tools/pdf2text.py .`；缺檔或跑不了就停下來回報。
- 一個單元讀「教學篇」那一檔就夠，裡面有課本頁縮版和教學說明：
  - Unit 2：`04_國小英語WW7教冊(教學篇)_U2.txt`
  - Review 1：`05_國小英語WW7教冊(教學篇)_R1.txt`
  - Unit 3：`06_國小英語WW7教冊(教學篇)_U3.txt`
  - Unit 4：`07_國小英語WW6教冊(教學篇)_U4.txt`（檔名寫 WW6 是出版社的筆誤，內容是 WW7 的 Unit 4）
  - Review 2：`08_國小英語WW7教冊(教學篇)_R2.txt`
  - Reading Skills（各單元的閱讀技巧總說明）：`01_國小英語WW7教冊(教學篇)_Reading Skills.txt`（課本 p.10–11）
- **頁碼用課本印的頁碼**：每頁縮版上有 `twenty-six`、`26` 這種頁碼，不是文字檔的「第 N 頁」。
- 文字檔裡混了很多教師用的東西，**只有課本正文能當前提**：
  - 可以當前提：Story、Vocabulary、Sentence A／B、Grammar Tips、Reading、Phonics（Sound It Out、Listen and Chant、Listen, Point, and Say）、Reading Skills、Review。
  - 不能當前提（只能拿來想情境）：「教學補充」「補充單字」「延伸單字」「議題融入」「國際文化延伸」「引導提問」「錄音內容」「More to Learn（Optional）」。
  - 不能照抄：課本和習作的練習題（Listen and Number、Read and Choose、Read and Write 等）、「錄音內容」的腳本、Story 和 Reading 的原文。可以引用 Story 一句 12 個字以內的話。
- 故事人物（男女要分清楚，語音會用不同聲音）：Amy（女）、Kevin（男）、Joe（男，英國來的新同學）、Boka（男）、Jello（女）、Ella（女，法國）、Tommy（男，加拿大）。

## 2. 關卡與分批

| 關 | 區 z | 單元 | 關名 | 範圍（出題前回課本確認；括號是課本頁碼的大概範圍） | 批次 | 誰做 | 狀態 |
|---|---|---|---|---|---|---|---|
| en5-01～03 | 0 | Unit 1 Whale Watching | 字彙與聽力／句型與文法／發音與閱讀 | 國家、Where are you from?、Is he from…?、er ir ur、Find Details（pp.15–27） | U1 | CC-Opus | 2026-11-20 完成，待老師抽驗 |
| en5-04 | 1 | Unit 2 Having a Cold | 字彙與聽力 | cold、cough、fever、headache、toothache、stomachache、runny nose、sore throat（Story pp.29–31、Vocabulary pp.32–33） | U2 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-U2.md`） |
| en5-05 | 1 | Unit 2 | 句型與文法 | What's wrong? I have a headache. Does he/she have a fever? Yes, he does. / No, he doesn't. He has a cough. 第三人稱 has；Grammar Tips | U2 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-U2.md`） |
| en5-06 | 1 | Unit 2 | 發音與閱讀 | Phonics ar、or（car、farm、party、corn、pork…）；Reading；Reading Skills：Question Words（p.10）；Story | U2 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-U2.md`） |
| en5-07 | 1 | Review 1 | 綜合複習 | Unit 1～2 的字彙、句型、發音；Find Details（pp.43–46） | R1 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-R1.md`） |
| en5-08 | 2 | Unit 3 From Farm to Table | 字彙與聽力 | pizza、rice、soup、steak、sandwiches、dumplings、French fries、noodles；可數與不可數（pp.47–51） | U3 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-U3.md`） |
| en5-09 | 2 | Unit 3 | 句型與文法 | What would you like to eat? I'd like some … , please. Would you like some …? Yes, please. / No, thank you.；Grammar Tips | U3 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-U3.md`） |
| en5-10 | 2 | Unit 3 | 發音與閱讀 | Phonics oi、oy（coin、noise、soil、boy、joy、toy）；Reading；Reading Skills：Sequence（p.11）；Story | U3 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-U3.md`） |
| en5-11 | 3 | Unit 4 A Call in the Morning | 字彙與聽力 | get up、have breakfast、go to school、have lunch、go home、do my homework、have dinner、go to bed（pp.61–65） | U4 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-U4.md`） |
| en5-12 | 3 | Unit 4 | 句型與文法 | What time do you get up? I get up at six thirty. Do you have lunch at twelve? Yes, I do. / No, I don't.；Grammar Tips；作息表 | U4 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-U4.md`） |
| en5-13 | 3 | Unit 4 | 發音與閱讀 | Phonics ou、ow（house、mouse、shout、clown、owl、shower）；Reading；Reading Skills：Problem and Solution（p.11）；Story | U4 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-U4.md`） |
| en5-14 | 3 | Review 2 | 綜合複習 | Unit 3～4 的字彙、句型、發音；Sequence（pp.75–78） | R2 | Codex | 2026-11-20 完成，Claude Code 已抽查，待老師抽驗（`drafts/en5/自檢報告-R2.md`） |

- 表裡的字彙和句型是 Claude Code 從文字檔快速整理的，**出題前一定要回課本逐字核對**，不一樣就以課本為準，在自檢報告寫出差異。
- 關名和 intro 已寫在 `drafts/en5/add-levels.mjs`，核對後可以改 intro。
- 順序照「批次」欄：U2 → R1 → U3 → U4 → R2。換手時整批重做或整批接手，不留半關。
- **2026-11-20 起改成一次做完**（Unit 2 已抽查通過，老師不在位置上等）：R1、U3、U4、R2 連續做，**不用等 Claude Code 抽查**。但每一批照樣各自跑第 6 節的指令、各自寫自檢報告；做完一批才開始下一批。四批都做完再一起交。
- 連續做的時候，Unit 2 抽查到的事一起照做：ar 和 or 念法不同，聽 ar／or 的字時，選項放另一組（聽 corn 可以放 ar）是好的對比；不要出「依課本寫法」這種英文本身有好幾種寫法都對的題（例：stomach ache 也算對的英文）。

## 3. 每關 7 題的配置（照 Unit 1 樣板）

| 關型 | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | 聽力題數 |
|---|---|---|---|---|---|---|---|---|
| 字彙與聽力 | 聽音選字 | 聽音選字 | 聽音選意思 | 看中文選英文 | 字彙情境／字的寫法 | 聽句子選意思 | 聽短對話 | 5 |
| 句型與文法 | 動詞形式（be、have／has、do／does…） | 句型填空（疑問詞、助動詞） | 問答配對 | 選出完全正確的句子 | 本課 Grammar Tips 的重點 | 聽問句選回答 | 表格情境應用 | 1 |
| 發音與閱讀 | 聽音辨字母組合 | 選出念法不同的字（`SAY` 點播） | 拼讀規則 | 聽音選字 | 短文擷取 | 本課 Reading Skill | 故事理解 | 3 |
| 綜合複習 | 字彙 | 字彙 | 句型 | 句型 | 發音 | 聽力 | 聽力 | 2 |

全書聽力約 35～40%；一個 Unit 是 9／21 題，加上兩個 Review，全書大約 40%。

## 4. 寫法（照 `drafts/en5/build-U1.mjs`）

```js
import { buildUnit, listen, SAY, passage, table } from './build-unit.mjs';
const { q, save } = buildUnit('U2');          // 輸出 drafts/en5/en5-questions-U2.json；Review 用 'R1'、'R2'
q('L04-Q1', '聽力：聽音選字',                 // 題號、題型
  '請聽英文，選出你聽到的詞。', listen('a sore throat', 0.8),   // 題幹、附件（沒有寫 null）
  'a sore throat',                            // 正解
  [['干擾項', 'trap', 'misconception（結尾不加句號）'], [...], [...]],
  ['提示 1', '提示 2', '提示 3'],
  { concept: '正解為什麼對', ref: 'Unit 2 Vocabulary（課本 pp.32–33）', basis: '可省略' });
save();
```

- 詳解自動組成「正確概念：…／破誤：「干擾項」：原因；…／回頭讀：…。」三段。`ref` 只能指學生課本找得到的欄名和頁碼。
- 題號 `L04-Q1` 對到 `en5-04` 第 1 題。
- 附件：`listen(英文, 語速)`（單字 0.8、句子和對話 0.9）、`SAY`（選項旁加喇叭，四個選項都要是英文）、`passage(短文)`（同一篇給 Q5、Q6 用時，用同一個變數，一字不差）、`table([標題列], [資料列…], '表名')`（手機上最多 3 欄）。
- 干擾項的 `trap` 照六上規劃書第 6 節的表，Unit 1 另外用了：be 動詞與主詞不合、人稱代名詞混淆、專有名詞大寫、國名寫法錯誤、故事字詞混淆、故事情節記錯、資訊錯置、時間錯置、數字聽錯。

## 5. 一定要守的規則（Unit 1 已照做，Claude Code 抽查就查這些）

1. **聽力（英語老師試聽六上後的教訓）**
   - 瀏覽器語音分不出 a／the、字尾 -s、-ed 讀 [t] 還是 [d]：**不要出「只差這一點」的聽音選字**。干擾項要差在聽得出來的地方（不同的字、開頭或結尾子音不同、音節數不同、明顯不同的母音）。
   - **同音的拼法不能當成「聽得出來」的差別**：er、ir、ur 念法一樣，oi／oy 同音，ou／ow 同音；**ar 和 or 念法不同**（car／corn，Unit 2 已依課本修正，2026-11-20）。「聽音辨字母組合」的選項不可以同時放同音的兩組（例：聽 her 時選項不可以同時有 er 和 ir；聽 coin 時不可以同時有 oi 和 oy）。選項也不可以是正解拼法的一部分（聽 burn 時不可以放 u，因為 burn 裡就有 u）。
   - 題幹只寫指示，不寫要念的內容或正解（`check-data.mjs` 會擋）；提示也不能寫出要念的字。
   - 對話寫成 `Amy: …  Leo: …`，網站會用男女兩種聲音念。**男生名字要在 `js/ui.js` 的 `BOYS` 名單裡**才會用男聲（已加 Joe、Boka、Tommy、Ken、Nick、Luke、Tim、Mark、Josh、Raj、Dev、Ren，另有 Kevin、Tom、Ben、Leo、Sam、Peter 等）。要用名單外的男生名字，寫在自檢報告請 Claude Code 加。
   - 時間寫成念得自然的樣子：`six thirty`、`at seven o'clock`，不要寫 `6:30`。一題 `listen` 不超過 60 個字。
   - 問句的回答選項寫完整句（`He's from Canada.`，不是只寫 `Canada`）。
2. **前提只來自課本正文**（第 1 節）。補充單字只能放在干擾項或短文的次要位置；**正解一定要是課本教過的字**（抽查時 L10-Q2 的 bay、L13-Q2 的 tone 是正解卻不在課本，已改成 Unit 2 的 corn、horse）。
3. **短文和對話自己寫**：可以用課本人物和本課句型，但不能是課本 Reading 或錄音腳本改幾個字。人名換新的（Unit 1 用了 Nina、Leo、Lucy、Lily、Ben、Anna、Sam、Nick、Tom；別的單元換別的名字，不要重複用同一組人和國家）。
4. **正解唯一**：干擾項不能也算對。例：「Whales and dolphins are ____」不能放 animals（也對）。寫完每題自己問一次「這個干擾項有沒有可能也對？」。
5. **提示三段漸進，第 3 段是「差一步」，不能等於答案**。Unit 1 有 5 題第一版的提示太接近答案，改過了（見自檢報告）。
6. **長度**：正解是最長選項的比例要在 40% 以下（`check-data.mjs --long` 會列出）；Unit 1 是 19%。
7. **人稱**：題目裡的人用 he／she 時，名字要看得出男女；看不出來的（Sam）不要拿來考 he／she，或在表格寫「（男生）」。

## 6. 每一批的指令（實際跑，輸出貼進自檢報告）

以 Unit 2 為例（組裝和檢查都把**已完成的全部題目檔**一起給）：

```bash
node drafts/en5/build-U2.mjs
node tools/verify-answers.mjs drafts/en5/en5-questions-U2.json
node drafts/en5/add-levels.mjs 4 5 6
node tools/assemble.mjs data/en5.js EN5 drafts/en5/en5-questions-U1.json drafts/en5/en5-questions-U2.json
node tools/check-data.mjs data/en5.js EN5 drafts/en5/en5-questions-U1.json drafts/en5/en5-questions-U2.json --long
node tools/review-sheet.mjs drafts/en5/抽驗清單-U2.md drafts/en5/en5-questions-U2.json
git status --short
```

要看到「發現 0 個問題」和「沒有問題」才算好。Review 1 是 `build-R1.mjs` → `en5-questions-R1.json`、`add-levels.mjs 7`。

## 7. 交件（每一批放在 `drafts/en5/`）

`build-<批次>.mjs`、`en5-questions-<批次>.json`、`抽驗清單-<批次>.md`、`自檢報告-<批次>.md`。自檢報告第一行寫 `Codex`，內容照 `docs/五年級題庫交接手冊-Codex.md` 第 2.5 節，另外加：

- 最前面一張表：這個單元的字彙、句型、Phonics、Reading Skill，各寫課本頁碼（和第 2 節的表不一樣的地方要標出來）。
- 每關的聽力題數。
- 用到的男生名字有沒有都在 `BOYS` 名單裡。
- 第 2 節分工表的狀態（Codex 不能改 `docs/`，寫在報告裡，Claude Code 收件時代為更新）。

## 8. 不用做的事

主題地名與 3D 地標（`zones` 不要加 `terrain`）、書架登記（已登記）、`js/ui.js` 的名單、commit 和上線：都由 Claude Code 收件時處理。
