# 溪口練功王國（國小全科練習平台）

選課本 → 走進 3D 冒險地圖（一個單元一區）→ 闖關。每關 7 題四選一，每題 3 段提示，第一次就答對 +10 EXP，一區全部過關拿徽章（在那一區插旗），集滿徽章開放王城。
純靜態網站（原生 HTML／CSS／JS，沒有框架、不用打包），可以直接放 GitHub Pages，也可以裝成 PWA。
外觀是立體的冒險 RPG：後面是 three.js 畫的 3D 王國（低多邊形＋卡通光影＋描邊），前面是厚實的遊戲介面；字型一律用思源黑體。

**網址：https://upsky0210.github.io/Xikou-Studio/**

> 這個 repo 只放網站要用的檔案。題目的作者端原始檔（`questions.json`、`drafts/`）、工具（`tools/`）、規劃文件和教師用書留在作者的電腦，不上傳；下面檔案表裡提到它們，是給作者自己看的。

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 畫面骨架（3D 地圖、名牌、上方列、畫面） |
| `css/style.css` | 樣式（遊戲介面、iPad／手機觸控尺寸） |
| `js/books.js` | **書目清單**：有哪些書、各自的資料檔 |
| `js/loader.js` | 依書目清單載入資料檔（點進哪本書才下載那本） |
| `js/engine.js` | **答題規則**：洗牌、判定、EXP、提示、過關、徽章 |
| `js/terrain.js` | 地形（礦坑、磨坊……）的名稱、代表色、小圖路徑 |
| `js/3d/world.js` | **3D 地圖主程式**：鏡頭、拖曳縮放、點選、名牌、小勇者、升旗；給 `ui.js` 用的 `window.World` |
| `js/3d/land.js` | 王國配置（三區一排來回往上走）、地形、道路、溪流、橋、樹、雲 |
| `js/3d/landmarks.js` | 每個地方的 3D 地標、徽章旗、關卡石台 |
| `js/3d/hero.js` | 小勇者 |
| `js/3d/kit.js` | 3D 工具：材質、拼模型的 Kit、描邊 |
| `vendor/three/` | three.js r160（MIT，從 3D 校園複製一份放在自己網站裡） |
| `img/zone/`、`img/hero.webp` | 3D 地標畫成的小圖（由 `tools/render-sprites.mjs` 產生） |
| `js/save.js` | **儲存層**：進度只透過這裡讀寫（目前存 localStorage） |
| `js/ui.js` | 各個畫面 |
| `js/main.js` | 啟動、註冊 service worker |
| `data/mn6.js` | 六上數學南一的題庫（由 `tools/assemble.mjs` 組裝，不要手改題目） |
| `data/fig/` | 題目用的圖（SVG，由 `tools/make-figures.mjs` 產生） |
| `questions.json` | 正式題目的作者端原始檔（含每個干擾項的迷思、verify 驗算欄位） |
| `drafts/` | 還在抽驗的題目原始檔，和產生出來的抽驗清單 |
| `sw.js`、`manifest.webmanifest`、`icons/` | PWA：離線可開、主畫面圖示（王城的 3D 圖） |
| `fonts/` | 思源黑體（放在自己網站裡，學校擋 Google Fonts 也能用） |
| `tools/check-data.mjs` | 檢查題庫格式（7 題、3 干擾、3 提示、分數標記、等值干擾項），和原始檔比對 |
| `tools/verify-answers.mjs` | 依 verify 欄位，用分數精確重算每一題的答案；`checks` 再驗算干擾項和詳解裡的每個算式 |
| `tools/make-figures.mjs` | 依題目的數字畫出題目用的圖；改了題目的數字要一起改這裡再跑一次 |
| `tools/assemble.mjs` | 把原始檔的題目組裝進資料檔 |
| `tools/review-sheet.mjs` | 產生給老師抽驗用的 Markdown 清單 |
| `tools/render-sprites.mjs`、`tools/sprites.html` | 把 3D 地標畫成 `img/zone/*.webp`、小勇者、App 圖示（要有 Edge 或 Chrome） |

## 新增一本書

1. 照 `data/mn6.js` 的格式寫一個資料檔，例如 `data/gk3.js`：

   ```js
   const GK3 = {
     id: 'gk3', subj: '國語', pub: '康軒', sem: '三上', grade: 3, note: '說明文字',
     zones: [   // 一個單元一區
       { name: '注音森林', unit: '第一單元的課本名稱', terrain: 'garden' },
       // ……
       { name: '溪口王城', unit: '全冊總複習', terrain: 'castle', final: true },   // 最後一區，集滿前面的徽章才開放
     ],
     levels: [ /* 見下一節 */ ],
   };
   ```

   `terrain` 可以用的地形寫在 `js/terrain.js`（mine 礦坑、mill 磨坊、oasis 綠洲、arena 競技場、palace 宮殿、garden 花園、mountain 山脈、maze 迷宮、castle 王城）。
   要新的地形：在 `js/3d/landmarks.js` 加一個模型函式（放進 `BUILDERS`），在 `js/terrain.js` 加名稱和顏色，再跑 `node tools/render-sprites.mjs` 產生小圖。
   `zones` 也可以只寫名稱字串，地圖上會用一般的城鎮小屋。地圖會依區域數量自動排（三區一排），不用另外寫座標。

2. 在 `js/books.js` 加一行（`global` 要和上面的物件名稱一樣）：

   ```js
   { id: 'gk3', title: '三上國語', pub: '康軒版', file: 'data/gk3.js', global: 'GK3', color: '#4f8a2b' },
   ```

3. 檢查格式：

   ```bash
   node tools/check-data.mjs data/gk3.js GK3
   ```

不用改引擎。沒有關卡的區域會自動顯示「尚未開放」。

## 新增一關

### 1. 在資料檔的 `levels` 加上關卡

```js
{
  id: 'mn6-07',          // 整本書裡不能重複；題號 L07 會對到這一關
  z: 3,                  // 屬於第幾區（zones 的索引，從 0 開始；單元一＝0）
  name: '關卡名稱',
  lesson: '對應課次',
  intro: '進關前看到的說明',
  draft: true,           // 抽驗通過前先標成草稿，畫面會顯示「草稿・待抽驗」
  q: [],                 // 先留空，第 3 步用程式填
}
```

### 2. 在題目原始檔寫題目（和 questions.json 同格式）

每題有 `id`（L07-Q1）、`stem`、`answer`、`distractors`（每個干擾項附它鎖的迷思）、`hints`（3 段）、`explanation`、`attachment`、`verify`（給程式驗算）。

- 正解存**文字**，選項顯示時會洗牌，判定用文字比對。
- 第 6、7 題是素養題，畫面會標示。
- **分數**寫成 `{{3/4}}`，帶分數寫 `{{2 1/3}}`，畫面會排成上下的分數。分數答案一律寫最簡分數，干擾項不能和正解等值。
- 詳解可以用 `\n` 換行；以「驗算提示」開頭的那一行會用黃底框起來。
- 附件：表格 `{ t: [['標題1', '標題2'], ['資料', '資料']] }`（第一列是標題）、條列 `{ list: ['第一點', '第二點'] }`、短文直接寫字串、圖形 `{ fig: 'data/fig/檔名.svg', alt: '說明' }`。附件會顯示在題幹上面，題幹要寫「上表」「上面」。
- `verify` 的寫法見 `tools/verify-answers.mjs` 開頭。

### 3. 驗算、組裝、檢查、產生抽驗清單

```bash
node tools/verify-answers.mjs drafts/questions-L07-L08.json
```

```bash
node tools/assemble.mjs data/mn6.js MN6 questions.json drafts/questions-L03-L04.json drafts/questions-L05-L06.json drafts/questions-L07-L08.json
```

```bash
node tools/check-data.mjs data/mn6.js MN6 questions.json drafts/questions-L03-L04.json drafts/questions-L05-L06.json drafts/questions-L07-L08.json
```

```bash
node tools/review-sheet.mjs drafts/抽驗清單-L07-L08.md drafts/questions-L07-L08.json
```

### 4. 抽驗通過後

把草稿的題目搬進 `questions.json`，拿掉關卡的 `draft: true`，再跑一次組裝和檢查。

還沒寫好題目的關，`q` 留空陣列，畫面會當作尚未開放。

## 換成雲端存檔（P2）

只換 `js/save.js` 的內部，保留 `Save.load()`、`Save.save(state)`、`Save.clear()` 三個介面（都回傳 Promise）。
進度格式寫在 `save.js` 開頭的註解裡。

## 3D 地圖

- 用 three.js r160（`vendor/three/`，ES module）。不能跑 3D 的瀏覽器、直接雙擊開 `index.html`（file://）時，會自動改成平面地圖，其他功能一樣。
- 右上角選單可以把 3D 關掉（存在這台裝置）。關掉後是平面地圖，比較省電。
- 學校的 iPad 跑不動時會自動降畫質（先降解析度，再關影子），記在這台裝置；在選單切換一次 3D 開關就會重設。
- 地圖上沒有人在操作時每秒只畫 30 張；闖關時地圖停住不畫。
- 改了 `js/3d/` 的模型，跑一次 `node tools/render-sprites.mjs`，讓面板和徽章用的小圖、App 圖示跟著更新。

## 本機預覽

```bash
python -m http.server 5180
```

再打開 http://localhost:5180 。直接雙擊 `index.html` 也能玩，但是沒有 3D 地圖（改用平面地圖），也不會啟用離線功能。

## 上線（GitHub Pages）

repo：https://github.com/upsky0210/Xikou-Studio （`main` 分支的根目錄直接發布）

改完之後在這個資料夾執行：

```bash
git add -A
```

```bash
git commit -m "說明改了什麼"
```

```bash
git push
```

大約 1 分鐘後網站就是新版。`.gitignore` 是「放行清單」：只有網站要用的檔案會被傳上去，新增的文件、草稿預設都不會上傳。
iPad 的描述檔（Web Clip）網址填 `https://upsky0210.github.io/Xikou-Studio/`，勾「全螢幕」。

## 改了程式之後

`sw.js` 會先上網拿最新版，所以一般改程式不用動它。
如果改了 `sw.js` 裡 `CORE` 的檔案清單，把 `VERSION` 加一。

## 授權

- Noto Sans TC：SIL OFL 1.1
- three.js：MIT（`vendor/three/LICENSE`）
- 3D 模型、小圖、App 圖示都是用程式畫的
- 題目內容皆為原創
