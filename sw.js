/* Service worker：讓 PWA 離線也能開（學校網路不穩時可以繼續練習）
   策略：先上網拿最新版，拿不到才用快取。上網時一律向伺服器確認有沒有新版（cache: 'no-cache'，
   沒變的檔案伺服器只回 304，很省流量），所以改完程式上傳後，學生下次開就是新版。
   「改了要預先快取的檔案清單」時，記得把 VERSION 加一。
   字型分片、題庫資料檔和題目的圖，在第一次用到時才放進快取。
   登入和雲端存檔用的 Firebase（從 gstatic 載入）也是第一次用到時放進快取，而且先用快取：
   沒網路時開站也認得上次登入的人，網路一回來就能把進度補存上去。 */
const VERSION = 'v8';
const CACHE = 'xk-practice-' + VERSION;
const FIREBASE = 'https://www.gstatic.com/firebasejs/';   // 網址帶版本號，內容不會變（版本寫在 js/save.js）
const ZONES = ['arena', 'castle', 'civic', 'clocktower', 'eco', 'fest', 'forge', 'garden', 'generic', 'industry', 'isle', 'lane', 'magnet', 'maze', 'mill', 'mine', 'mountain', 'oasis', 'palace', 'school', 'street', 'volcano', 'weather'];   // img/zone/ 裡的全部地形小圖（新增地形要加進來）
const CORE = [
  './', 'index.html', 'manifest.webmanifest', 'css/style.css',
  'js/books.js', 'js/loader.js', 'js/save.js', 'js/engine.js', 'js/terrain.js', 'js/ui.js', 'js/main.js',
  'js/3d/kit.js', 'js/3d/land.js', 'js/3d/landmarks.js', 'js/3d/hero.js', 'js/3d/world.js',
  'vendor/three/build/three.module.min.js',
  'fonts/noto-sans-tc.css',
  'icons/icon-192.png', 'icons/apple-touch-icon.png', 'icons/icon-32.png',
  'img/hero.webp', 'img/hero-cat.webp', 'img/hero-rabbit.webp', ...ZONES.map((z) => 'img/zone/' + z + '.webp'),
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('xk-practice-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.url.startsWith(FIREBASE)) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    })));
    return;
  }
  if (new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match('index.html'))),
  );
});
