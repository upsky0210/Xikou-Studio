/* 書目清單（manifest）
   一本書＝科目×年級×版本，一個資料檔。學生點進哪本書，才去下載那本書的資料檔。
   新增一本書：把資料檔放進 data/，在下面加一行。
     id      書的代號，要和資料檔裡物件的 id 一樣（例如 mn6＝數學 m、南一 n、六年級）
     title   書架上顯示的名稱
     file    資料檔路徑（相對於 index.html）
     global  資料檔裡宣告的物件名稱（例如 const MN6 = {...}）
     color   書卡左邊的色條 */
window.BOOKS = [
  { id: 'mn6', title: '六上數學', pub: '南一版', file: 'data/mn6.js', global: 'MN6', color: '#1d4ed8' },
  { id: 'ns6', title: '六上自然', pub: '南一版', file: 'data/ns6.js', global: 'NS6', color: '#16a34a' },
  { id: 'ck6', title: '六上國語', pub: '康軒版', file: 'data/ck6.js', global: 'CK6', color: '#dc2626' },
  { id: 'sk6', title: '六上社會', pub: '康軒版', file: 'data/sk6.js', global: 'SK6', color: '#d97706' },
];
