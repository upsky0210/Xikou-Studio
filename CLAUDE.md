# 溪口練功王國：給 Claude 的工作須知

這份檔案跟著 repo 走，家裡和學校的電腦都讀得到。使用者講過、以後還會用到的事，寫在這裡，不要只存在某一台電腦的記憶裡。

## 使用者
- 溪口國小老師，負責這個網站的規劃與驗收。
- **也是學校 Google Workspace 管理員**，教師網域 `skps.tp.edu.tw` 和學生網域 `st.skps.tp.edu.tw` 都由使用者管理。需要管理控制台設定的事（信任應用程式、開放服務、機構單位），直接寫出要點哪裡，不要當成「要去找管理員」。
- 回覆用繁體中文、白話，少用術語。

## 工作習慣
- 家裡和學校兩台電腦輪流做。**每次開始先 `git pull`**，避免蓋掉另一台電腦的提交。
- 上線方式：推到 `main` → GitHub Pages 約 30～60 秒更新（https://upsky0210.github.io/Xikou-Studio/ ）。使用者習慣「先推上去，我在線上看」，用手機（Android Chrome）和 Windows Chrome 測。
- `sw.js` 是先上網再用快取，一般不用改版本號；只有改了預先快取的檔案清單才把 `VERSION` 加一。
- 本機預覽：`.claude/launch.json` 的 `xikou`（port 5181）。
- 改了 `js/save.js`（存檔）一定要跑 `node tools/save-test.mjs`，最後印「存檔測試全部通過」才算好。
- 改了 `js/engine.js`（答題規則）一定要跑 `node tools/engine-test.mjs`，最後印「規則測試全部通過」才算好。

## 題庫流程（不要手改 `data/*.js` 的題目）
- 英語：改 `drafts/en6/build-questions.py` → `python -I drafts/en6/build-questions.py` 產生五份 JSON → `node tools/assemble.mjs data/en6.js EN6 <五份 JSON>` → `node tools/check-data.mjs data/en6.js EN6 <五份 JSON>`。
  `node drafts/en6/check-delivery.mjs` 會順便更新 `drafts/en6/en6.js` 和抽驗清單（最後找不到 `work/en6-skeleton.js` 而報錯是舊問題，前面的輸出仍有效）。
- 五上數學（mn5）：題目寫在 `drafts/mn5/mn5-questions-U*.json`（一個單元一個檔）→ `node tools/verify-answers.mjs <檔>` → `node tools/assemble.mjs data/mn5.js MN5 <全部的檔>` → `node tools/check-data.mjs data/mn5.js MN5 <全部的檔>`。統計圖和幾何圖改 `tools/make-figures-mn5.mjs` 再跑一次。
  五年級可以改作 JDPS-SS（底稿在 `private/jdps/`，不上傳）：改作的題目在題目檔加 `source` 欄位；課本沒教的內容不出（以 `source/` 的教師專用課本為準）。
- 其他書的作法見 `README.md`。
- 2026-11-20 老師把書架上 10 本書（六上 5 本、五上 5 本）的草稿標誌全部取消。新做的關卡（`add-levels.mjs` 加的）一開始還是 `draft: true`，老師說可以了再拿掉（刪掉資料檔裡的 `"draft": true,` 那一行就好）。
- 每次組裝完看 `check-data.mjs` 最後的「正解是最長選項」比例：超過 40% 要把干擾項寫得和正解一樣長（`--long` 列出題目）。

## 檔案放哪裡
- 規劃書、任務書、審核報告放 `docs/`；舊的題目來源檔放 `drafts/`。
- `private/`（不上傳）：拆解別人網站的報告等內部文件，只留在自己電腦。repo 是公開的，這類文件不要放進來。

## 已定案的方向（細節見 `docs/規劃報告.md`）
- 防亂點（2026-11-12 老師選定三條都做，規則都在 `js/engine.js` 開頭）：答錯鎖 2 秒；同一題錯兩次要先看提示；
  「過關」（7 題都答對過）和「精熟」（一次闖關裡第一次就答對 5 題以上，可以再練一次拿）分開，徽章看整區精熟。已經發出去的徽章不收回。
  2026-11-21 統一：錯第 2 次起，每錯一次都要再打開一段新的提示（答錯前先看的不算）；重練已過的關時題目順序洗牌；地圖頁首 EXP 只算這本書。說明見 `docs/答題畫面四項修正-2026-11-21.md`。
  2026-11-21 老師決定：先看提示再第一次答對，仍算「第一次就答對」、可以拿精熟（看提示不扣 EXP，規則不改）。
- P2 雲端存檔：Firebase Auth＋Firestore，只換 `js/save.js` 的內部。學生用 `@st.skps.tp.edu.tw` 登入，每人只能讀寫自己那份；老師用 `@skps.tp.edu.tw`。
  - 2026-11-10 已做好：Firebase 專案 `xikou-studio-83723`（用教師帳號建立，Spark 免費方案），登入畫面、雲端存檔、`firestore.rules`。細節見 `README.md`「雲端存檔（P2）」。
  - 2026-11-12 存檔改成逐關逐題合併（同一個帳號開兩台裝置不會互相蓋掉），寫入前先讀雲端再合併。真的帳號、真的兩台裝置還沒實測。
  - 2026-11-12 開站時沒網路，網路回來會補連、補存；登入後不再自動把這台裝置的訪客進度併進帳號，先問「這是你玩的嗎」；沒登入時首頁有登入按鈕。
  - 2026-11-13 老師要求：開站**先到首頁選角色，選好了才跳出登入視窗**（不要一開站就是整頁的登入畫面）。
  - 整站的問題清單和後續分工見 `docs/網站審核與分工計畫-2026-11-12.md`。
  - 還沒做：共同擁有者、OAuth 同意畫面（內部／外部）和管理控制台信任用戶端 ID（學生帳號未滿 18 歲要這步才能登入）、真的 iPad 全螢幕測登入、老師看全班進度的頁面。
- iPad 是共用、訪客模式，登出就清空，所以雲端存檔是必要的。
- 英語聽力用瀏覽器語音朗讀（`js/ui.js` 的 `Say`，2026-11-20 起有美式語音就一律用美式，發音題靠美式捲舌音分辨）；預錄音檔是之後的第二階段。

## 五年級題庫的分工（2026-11-16）
- 規格和權限寫在 `docs/五年級題庫交接手冊-Codex.md`。11/16～17 先由 Claude Code 出題（Fable 5.2 做畫圖的幾何單元和國語、Opus 做其他、Sonnet 子代理做 PDF 轉文字和跑檢查），額度到了沒做完的整批交 Codex；分工表和狀態在手冊第 0.1 節，做完一批就更新狀態。
- Claude Code 省額度：一個單元開一個新對話；課本先讀 `source/_text/` 的文字檔（不上傳；新電腦跑 `python -I tools/pdf2text.py .`，要先 `pip install pypdfium2`）。國語是直排，抽出來行序會顛倒。
- 五上自然（ns5）：全書 18 關 126 題做完（2026-11-20 老師取消草稿）。單元一 5 關 Claude Code 做的樣板（2026-11-17，`drafts/ns5/自檢報告-U1.md`）；單元二～四 13 關 91 題 Codex 做（2026-11-17，`自檢報告-U2.md`～`U4.md`）。題目改 `drafts/ns5/build-U*.mjs`（共用 `build-unit.mjs`）再重跑，組裝時四個題目檔一起給。主題地名 2026-11-17 老師選定：日晷鐘塔、種子迷宮、酸鹼綠洲、疾速競技場（都用現有地形）。
- 五上社會（ss5）：一課一關，全書 10 關 70 題做完（2026-11-18，2026-11-20 老師取消草稿）。第一單元 3 關 Claude Code 做的樣板（`drafts/ss5/自檢報告-U1.md`）；第二～四單元 7 關 49 題 Codex 做（`自檢報告-U2.md`～`U4.md`）。題目改 `drafts/ss5/build-U*.mjs`（共用 `build-unit.mjs`）再重跑，組裝時四個題目檔一起給。主題地名 2026-11-18 老師選定：誕生之島（湖島）、祭典廣場、糖廠磨坊、大員古堡（新做的 `fort` 地標，仿熱蘭遮城）。
- 五上國語（ck5）主題地名 2026-11-18 老師選定：空拍氣象台、美術館（新做 `gallery`）、成長花園、黑熊山林（新做 `forest`）。
- 六上國語（ck6）主題地名 2026-11-19 老師選定：品格寶石礦坑、夜市美食街（新做 `nightmarket`）、空城計城樓（新做 `citygate`）、耶誕廣場。
- 五上英語（康軒 Wonder World 7，代號 en5）：14 關（四個 Unit 各三關＋Review 1、2）。2026-11-20 全書 14 關 98 題做完（2026-11-20 老師取消草稿），已登記書架：Unit 1 是 Claude Code 做的樣板（`drafts/en5/自檢報告-U1.md`），Unit 2～Review 2 共 11 關 77 題是 Codex 做的、Claude Code 已抽查（`自檢報告-U2.md`～`R2.md`）。規格和分工表在 `docs/五上英語交接手冊-Codex.md`。聽力還沒在真的手機上試聽。題目改 `drafts/en5/build-U*.mjs`（共用 `build-unit.mjs`）再重跑，加關用 `drafts/en5/add-levels.mjs`。對話裡的男生名字要在 `js/ui.js` 的 `BOYS` 名單裡才會用男聲。主題地名 2026-11-20 老師選定：賞鯨港灣、感冒診所（新做 `clinic`）、開心農場、早安校園。
- 五上版本：國語、英語康軒；數學、自然、社會南一。書的代號 mn5（2026-11-16 全部 23 關 161 題做完，2026-11-20 老師取消草稿）、ns5、ss5、ck5（2026-11-16 全部 12 關 84 題做完，2026-11-20 老師取消草稿；第 1～3 課 Claude Code、第 4～12 課 Codex；題目改 `drafts/ck5/build-L*.mjs` 再重跑）、en5。
- 四上英語（康軒 Wonder World 5，代號 en4）：2026-11-21 Claude Code 照五上英語（en5）的做法一次做完全書 14 關 98 題（四個 Unit 各三關＋Review 1、2），已登記書架，全部草稿、待老師抽驗（`drafts/en4/自檢報告.md`、`抽驗清單-*.md`）。課本文字檔：`python -I tools/pdf2text-pypdf.py . 康軒四上英文ww5`。題目改 `drafts/en4/build-U*.mjs`、`build-R*.mjs`（共用 `build-unit.mjs`）再重跑，組裝時六個題目檔一起給；加關用 `drafts/en4/add-levels.mjs`。主題地名 2026-11-21 老師同意：飲料綠洲、水果花園、星期鐘塔、科目校園（都用現有地形）。
- 四上數學（康軒，代號 mk4）：2026-11-16 規劃 21 關 147 題，JDPS 骨架＋題目重寫；各單元由哪個模型做寫在手冊第 0.2 節。課本文字檔用 `python -I tools/pdf2text-pypdf.py . 康軒四上數學`（pypdf）。全書 21 關 147 題做完（全部草稿、待老師抽驗）：單元三、五、六、八、十共 10 關 Claude Code 做（2026-11-16，`drafts/mk4/自檢報告-U3-U6-U10.md`、`自檢報告-U5-U8.md`，圖 13 張）；單元一、二、四、七、九共 11 關 77 題 Codex 做、Claude Code 已抽查（2026-11-20，`自檢報告-U1.md` 等五份）。2026-11-20 登記書架。主題地名 2026-11-20 老師選定（都用現有地形）：大數湖島、乘法夜市、旋轉鐘塔、分糖磨坊、健行山林、三角古堡、小數街角、併式鍛造坊、分數廣場、統計氣象台。題目寫在 `drafts/mk4/mk4-questions-U*.json`，圖改 `tools/make-figures-mk4.mjs`。
- 四上國語（南一，代號 cn4）：一課一關，全書 12 關 84 題，2026-11-21 Claude Code（Opus 5.5）一次做完，全部草稿、待老師抽驗，已登記書架。照五上國語的配置（Q1 字音字形、Q2 詞義、Q3 語文練習、Q4 寫作手法、Q5／Q7 共用自編短文、Q6 主旨），四年級短文 180～230 字。教材是「教師專用課本」（課本頁＋旁註，沒有另外的教師手冊），文字檔用 `python -I tools/pdf2text-pypdf.py . 南一四上國語`；pypdf 抽出的課文會把注音抽成同音字（例如「挑窕戰」），可當讀音線索，讀音題仍要轉圖片核對。題目改 `drafts/cn4/build-U*.mjs`（共用 `build-batch.mjs`）再重跑，組裝時四個題目檔一起給；自檢報告 `drafts/cn4/自檢報告-U1.md`～`U4.md`。主題地名 2026-11-21 老師選定：好滋味美食街、玉山山脈、傳藝美術館、故事湖島（都用現有地標）。
- 三上數學（康軒，代號 mk3）：2026-11-16 規劃 19 關 133 題，JDPS 骨架＋題目重寫，規劃和各模型分工寫在手冊第 0.3 節。課本文字檔：`python -I tools/pdf2text-pypdf.py . 康軒三上數學`。2026-11-17 做完資料檔骨架和單元三、五、六共 6 關 42 題、圖 16 張（草稿、待老師抽驗，`drafts/mk3/自檢報告-U5.md`、`自檢報告-U6-U3.md`）；其餘 13 關還沒出題，也還沒登記到 `js/books.js`。題目寫在 `drafts/mk3/mk3-questions-U*.json`，圖改 `tools/make-figures-mk3.mjs`。
- 四上自然（南一，代號 ns4）：2026-11-21 老師要全本由 Claude Code 做、不交 Codex，照五上自然的做法。全書 20 關 140 題做完（全部草稿、待老師抽驗，`drafts/ns4/自檢報告.md`），已登記書架。課本單元和 JDPS zn4 不同（地表的靜與動、水生生物與環境、有趣的聲光現象、好玩的電路），單元一和聲音全部自編，改作 25 題。題目改 `drafts/ns4/build-U*.mjs`（共用 `build-unit.mjs`）再重跑，組裝時四個題目檔一起給；電路圖改 `tools/make-figures-ns4.mjs`。課本文字檔：`python -I tools/pdf2text-pypdf.py . 南一四上自然`。主題地名（老師同意規劃）：岩層火山谷、水草湖島、聲光美術館、電光磁石塔（都用現有地形）。
- JDPS 底稿：`node tools/jdps-base.mjs mn5 zn5 n5 gk5` 產生到 `private/jdps/`（不上傳，每台電腦要各自有 `private/jdps/JDPS-SS`）。
