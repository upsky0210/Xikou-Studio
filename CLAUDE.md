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
- 每次組裝完看 `check-data.mjs` 最後的「正解是最長選項」比例：超過 40% 要把干擾項寫得和正解一樣長（`--long` 列出題目）。

## 檔案放哪裡
- 規劃書、任務書、審核報告放 `docs/`；舊的題目來源檔放 `drafts/`。
- `private/`（不上傳）：拆解別人網站的報告等內部文件，只留在自己電腦。repo 是公開的，這類文件不要放進來。

## 已定案的方向（細節見 `docs/規劃報告.md`）
- 防亂點（2026-11-12 老師選定三條都做，規則都在 `js/engine.js` 開頭）：答錯鎖 2 秒；同一題錯兩次要先看提示；
  「過關」（7 題都答對過）和「精熟」（一次闖關裡第一次就答對 5 題以上，可以再練一次拿）分開，徽章看整區精熟。已經發出去的徽章不收回。
- P2 雲端存檔：Firebase Auth＋Firestore，只換 `js/save.js` 的內部。學生用 `@st.skps.tp.edu.tw` 登入，每人只能讀寫自己那份；老師用 `@skps.tp.edu.tw`。
  - 2026-11-10 已做好：Firebase 專案 `xikou-studio-83723`（用教師帳號建立，Spark 免費方案），登入畫面、雲端存檔、`firestore.rules`。細節見 `README.md`「雲端存檔（P2）」。
  - 2026-11-12 存檔改成逐關逐題合併（同一個帳號開兩台裝置不會互相蓋掉），寫入前先讀雲端再合併。真的帳號、真的兩台裝置還沒實測。
  - 2026-11-12 開站時沒網路，網路回來會補連、補存；登入後不再自動把這台裝置的訪客進度併進帳號，先問「這是你玩的嗎」；沒登入時首頁有登入按鈕。
  - 2026-11-13 老師要求：開站**先到首頁選角色，選好了才跳出登入視窗**（不要一開站就是整頁的登入畫面）。
  - 整站的問題清單和後續分工見 `docs/網站審核與分工計畫-2026-11-12.md`。
  - 還沒做：共同擁有者、OAuth 同意畫面（內部／外部）和管理控制台信任用戶端 ID（學生帳號未滿 18 歲要這步才能登入）、真的 iPad 全螢幕測登入、老師看全班進度的頁面。
- iPad 是共用、訪客模式，登出就清空，所以雲端存檔是必要的。
- 英語聽力用瀏覽器語音朗讀（`js/ui.js` 的 `Say`）；預錄音檔是之後的第二階段。

## 五年級題庫的分工（2026-11-16）
- 規格和權限寫在 `docs/五年級題庫交接手冊-Codex.md`。11/16～17 先由 Claude Code 出題（Fable 5.2 做畫圖的幾何單元和國語、Opus 做其他、Sonnet 子代理做 PDF 轉文字和跑檢查），額度到了沒做完的整批交 Codex；分工表和狀態在手冊第 0.1 節，做完一批就更新狀態。
- Claude Code 省額度：一個單元開一個新對話；課本先讀 `source/_text/` 的文字檔（不上傳；新電腦跑 `python -I tools/pdf2text.py .`，要先 `pip install pypdfium2`）。國語是直排，抽出來行序會顛倒。
- 五上版本：國語、英語康軒；數學、自然、社會南一。書的代號 mn5（2026-11-16 全部 23 關 161 題做完，都是草稿、待老師抽驗）、ns5、ss5、ck5（2026-11-16 全部 12 關 84 題做完，都是草稿、待老師抽驗；第 1～3 課 Claude Code、第 4～12 課 Codex；題目改 `drafts/ck5/build-L*.mjs` 再重跑）、en5。
- 四上數學（康軒，代號 mk4）：2026-11-16 規劃 21 關 147 題，JDPS 骨架＋題目重寫；各單元由哪個模型做寫在手冊第 0.2 節。課本文字檔用 `python -I tools/pdf2text-pypdf.py . 康軒四上數學`（pypdf）。2026-11-16 做完單元三、五、六、八、十共 10 關 70 題、圖 13 張（草稿、待老師抽驗，`drafts/mk4/自檢報告-U3-U6-U10.md`、`自檢報告-U5-U8.md`）；其餘 11 關（單元一、二、四、七、九）還沒出題，也還沒登記到 `js/books.js`。題目寫在 `drafts/mk4/mk4-questions-U*.json`，圖改 `tools/make-figures-mk4.mjs`。
- JDPS 底稿：`node tools/jdps-base.mjs mn5 zn5 n5 gk5` 產生到 `private/jdps/`（不上傳，每台電腦要各自有 `private/jdps/JDPS-SS`）。
