# 島嶼小公民探險隊 網站拆解報告

來源：https://shanechen07.github.io/JDPS-SS/ （repo：shanechen07/JDPS-SS，index.html）
拆解日期：2026-11-07

## 一句話
國小國語／數學／社會／自然（三到六年級、康軒／翰林／南一，共 48 個版本）的 3D 闖關遊戲。每個版本 18 關 × 7 題，收郵票、換裝備、拿證書。作者：桃園市建德國小 煥文老師。

## 檔案組成（3.39 MB，12,320 行）

| 區塊 | 大小 | 內容 |
|---|---|---|
| CSS ×2 | 約 58k 字元 | 版面、彈窗、RWD、safe-area |
| 設定 script | 幾行 | ISLAND_API_URL＝Apps Script 網址 |
| three.js r128 | CDN 外部載入 | 3D 引擎（2021 年舊版） |
| 主程式 | 約 183 萬字元 | 遊戲邏輯＋3D 場景＋題庫 |
| └ 題庫 VERSIONS | 約 143 萬字元 | 48 版本、6,048 題 |

沒有圖片檔，角色、島嶼、郵票全用 three.js 幾何體與 SVG 程式生成；音樂用 Web Audio 即時合成。

## 架構
1. **資料層**：VERSIONS.gk3 這類物件，每版有 zones（4 座島＝4 單元）、levels（18 關）。每題是陣列：[題幹, 正解, [3 個誘答], [3 段提示], 詳解]，作答時再洗牌。
2. **3D 層**：自寫的島形演算法（chaikin 平滑、catmull 曲線、多邊形偏移）、程式化貼圖（canvas 畫地面、窗戶）、角色 makeKid／黑熊嚮導 makeBear、裝備 GEAR3D。偵測 WebGL，沒有就退回 2D；像素比上限 1.5～1.75，小螢幕更低。
3. **存檔層**：先存 localStorage（jiande-lb-session），再同步到後台；離線時用「成績回報碼」交給老師。
4. **後台**：Google Apps Script 網頁應用程式。前端用 fetch POST（text/plain 避開 CORS 預檢）呼叫 apiInit、apiSaveProgress、apiLoadProgress、apiResetProgress、apiBoard（排行榜）、apiStats（瀏覽數）、apiTeacherLogin、apiTeacherData。也能直接在 GAS 網址內執行（google.script.run）。
5. **教師後台**：帳號密碼送 GAS 驗證，拿到 token 存 sessionStorage；有管理員／一般老師兩級、班級管理、改密碼。

## 聰明的地方
- 單檔＋GitHub Pages＋GAS＝零成本、零伺服器，老師複製就能部署（?api= 參數可換成自己的後台）。
- 全部美術程式生成，沒有素材授權問題。
- 離線回報碼當備援，學校網路不穩也能交成績。
- 有 reduced-motion、焦點管理等無障礙處理。

## 問題與風險
- **答案在前端**：打開原始碼就能看到每題正解。
- **回報碼可偽造**：格式是 BD1. + base64 JSON + FNV 雜湊，雜湊不是密鑰，任何人都能自己算出「全對」的碼。
- **成績信任前端**：apiSaveProgress 直接送整份紀錄，除非 Code.gs 有驗證（repo 裡沒有，無法確認），否則可竄改。
- **太重**：學生只用 1 個版本，卻下載 48 版題庫；應拆成依版本按需載入的 JSON。
- **three.js r128** 偏舊，且有殘留的 Firestore 程式路徑。
- Code.gs 未公開，後台安全性（密碼雜湊、速率限制）看不到。

## 改進優先順序
1. 題庫依版本拆檔、懶載入（首載可降到幾百 KB）。
2. 對答案與成績改由後台判分，或至少回報碼加伺服器端簽章（HMAC）。
3. 升級 three.js、移除死碼、壓縮 JS。
