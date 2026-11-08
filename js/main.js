/* 啟動：畫面開始跑，再註冊 service worker（離線也能開、PWA 必要條件）。
   直接雙擊 index.html（file://）時不能註冊，略過。 */
UI.start();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch((err) => console.warn('service worker 註冊失敗', err));
  });
}
