/* 依書目清單載入資料檔：用到哪本書才下載哪本，下載過的留在記憶體。
   資料檔是一般的 <script>（不是 module），這樣直接雙擊 index.html 也能讀。 */
(function () {
  const cache = {};

  function addScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('載入失敗：' + src));
      document.head.appendChild(s);
    });
  }

  // 資料檔用 const 宣告物件，不會掛在 window 上；用 Function 在全域範圍讀出來
  function readGlobal(name) {
    if (!/^[A-Za-z_$][\w$]*$/.test(name)) throw new Error('書目的 global 名稱不合法：' + name);
    return Function('return typeof ' + name + ' !== "undefined" ? ' + name + ' : undefined')();
  }

  function check(book, entry) {
    if (!book || typeof book !== 'object') throw new Error(entry.file + ' 裡找不到 ' + entry.global);
    if (book.id !== entry.id) throw new Error('書目 id 是 ' + entry.id + '，資料檔裡卻是 ' + book.id);
    if (!Array.isArray(book.zones) || !Array.isArray(book.levels)) throw new Error(entry.id + ' 缺 zones 或 levels');
    return book;
  }

  async function loadBook(id) {
    if (cache[id]) return cache[id];
    const entry = window.BOOKS.find((b) => b.id === id);
    if (!entry) throw new Error('書目裡沒有 ' + id);
    cache[id] = (async () => {
      await addScript(entry.file);
      return check(readGlobal(entry.global), entry);
    })();
    cache[id].catch(() => { delete cache[id]; });   // 失敗了下次可以重試
    return cache[id];
  }

  window.Loader = { loadBook };
})();
