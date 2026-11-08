/* 儲存層（storage adapter）
   引擎和畫面只透過 Save.load() / Save.save() / Save.clear() 存取進度，不直接碰 localStorage。
   P2 改存 Firestore（學校 Google 帳號登入）時，只要換掉這個檔案的內部，介面維持不變。
   介面都回傳 Promise，因為雲端存取是非同步的；本機版雖然同步，也先照這個樣子寫。

   進度格式（v1）：
   {
     v: 1,
     books: {
       mn6: {
         exp: 70,                                  // 總 EXP（由各題 first 算出來，存一份方便老師端讀）
         badges: { "0": 1731000000000 },           // 已得島章：島索引 → 取得時間
         levels: {
           "mn6-01": {
             done: true, doneAt: 1731000000000,    // 7 題都答對過
             q: [ { first: true, ok: true, hints: 2 }, ... ]   // 每題：first＝第一次作答是否答對（null＝還沒答）、ok＝答對過、hints＝看提示次數
           }
         }
       }
     }
   } */
(function () {
  const KEY = 'xk-practice-v1';
  const empty = () => ({ v: 1, books: {} });

  let memory = null;   // localStorage 不能用（私密模式等）時，至少這次開著的時候記得

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return empty();
      const data = JSON.parse(raw);
      return data && data.v === 1 && data.books ? data : empty();
    } catch {
      return memory || empty();
    }
  }

  window.Save = {
    async load() { return read(); },
    async save(state) {
      memory = state;
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* 存不進去就只留在記憶體 */ }
    },
    async clear() {
      memory = null;
      try { localStorage.removeItem(KEY); } catch { /* 略過 */ }
    },
  };
})();
