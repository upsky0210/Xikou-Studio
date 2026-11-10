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

## 題庫流程（不要手改 `data/*.js` 的題目）
- 英語：改 `drafts/en6/build-questions.py` → `python -I drafts/en6/build-questions.py` 產生五份 JSON → `node tools/assemble.mjs data/en6.js EN6 <五份 JSON>` → `node tools/check-data.mjs data/en6.js EN6 <五份 JSON>`。
  `node drafts/en6/check-delivery.mjs` 會順便更新 `drafts/en6/en6.js` 和抽驗清單（最後找不到 `work/en6-skeleton.js` 而報錯是舊問題，前面的輸出仍有效）。
- 其他書的作法見 `README.md`。

## 已定案的方向（細節見 `規劃報告.md`）
- P2 雲端存檔：Firebase Auth＋Firestore，只換 `js/save.js` 的內部。學生用 `@st.skps.tp.edu.tw` 登入，每人只能讀寫自己那份；老師用 `@skps.tp.edu.tw`。
  - 2026-11-10 已做好：Firebase 專案 `xikou-studio-83723`（用教師帳號建立，Spark 免費方案），登入畫面、雲端存檔、`firestore.rules`。細節見 `README.md`「雲端存檔（P2）」。
  - 還沒做：共同擁有者、OAuth 同意畫面（內部／外部）和管理控制台信任用戶端 ID（學生帳號未滿 18 歲要這步才能登入）、真的 iPad 全螢幕測登入、老師看全班進度的頁面。
- iPad 是共用、訪客模式，登出就清空，所以雲端存檔是必要的。
- 英語聽力用瀏覽器語音朗讀（`js/ui.js` 的 `Say`）；預錄音檔是之後的第二階段。
