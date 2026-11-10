/* 儲存層（storage adapter）
   引擎和畫面只透過 Save.load() / Save.save() / Save.clear() 存取進度，不直接碰 localStorage 或 Firebase。

   兩種模式：
   - 登入學校 Google 帳號：進度存在 Firestore 的 progress/{uid}（每人一份，只有自己能讀寫，規則見 firestore.rules），
     這台裝置另外留一份副本（xk-cloud-{uid}），網路斷了也能繼續玩，下次連上再補存。
     共用 iPad 的訪客模式一登出就清空，所以進度一定要在雲端。
   - 先不登入（訪客）：跟以前一樣只存在這台裝置（xk-practice-v1）。第一次登入時，會把這台裝置的訪客進度併進帳號。

   Firebase 的程式從 gstatic 載入（只有要登入的人才下載，約 420 KB）。設定碼本來就是公開的，安全靠資料庫規則。
   寫入次數有限（免費方案每天 2 萬次），所以不是每答一題就寫：最多每 15 秒寫一次，過關、切到背景、登出時馬上寫。

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
   }
   雲端文件：{ email, name, json: 上面的進度（JSON 字串）, at: 這台裝置存檔的時間（毫秒）, updatedAt: 伺服器時間 } */
(function () {
  const KEY = 'xk-practice-v1';     // 訪客進度
  const CACHE = 'xk-cloud-';        // 登入後的本機副本：xk-cloud-{uid} → { at, s }
  const LAST = 'xk-user';           // 上次登入的人（離線時用，也用來判斷要不要先載入 Firebase）
  const GUEST = 'xk-guest';         // 選了「先不登入」
  const FB = 'https://www.gstatic.com/firebasejs/13.1.0/';
  const CONFIG = {
    apiKey: 'AIzaSyBOFh8QwApwzpRQoK4Bu8dY1xCSNIw7AAY',
    authDomain: 'xikou-studio-83723.firebaseapp.com',
    projectId: 'xikou-studio-83723',
    storageBucket: 'xikou-studio-83723.firebasestorage.app',
    messagingSenderId: '430569869846',
    appId: '1:430569869846:web:ecf439776627ed921fdb37',
  };
  const ALLOW = /@(st\.)?skps\.tp\.edu\.tw$/i;   // 學生 st.skps.tp.edu.tw、老師 skps.tp.edu.tw
  const COL = 'progress';
  const WAIT = 15000;

  const empty = () => ({ v: 1, books: {} });
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* 私密模式：只留在記憶體 */ } },
    del(k) { try { localStorage.removeItem(k); } catch { /* 略過 */ } },
  };
  const json = (raw) => { try { return JSON.parse(raw); } catch { return null; } };
  const valid = (d) => (d && d.v === 1 && d.books ? d : null);
  const timeout = (p, ms) => Promise.race([p, new Promise((_, no) => setTimeout(() => no(new Error('timeout')), ms))]);

  // 兩份進度合在一起：每本書取 EXP 比較多的那份
  function merge(a, b) {
    const out = empty();
    for (const id of new Set([...Object.keys(a.books), ...Object.keys(b.books)])) {
      const x = a.books[id], y = b.books[id];
      out.books[id] = !y || (x && (x.exp || 0) >= (y.exp || 0)) ? x : y;
    }
    return out;
  }

  let fb = null, booting = null;
  let user = null;          // { uid, email, name, offline? }
  let memory = null;        // 最新的進度（localStorage 不能用時至少這次記得）
  let dirty = false, timer = 0, pushing = null;

  function boot() {
    if (fb) return Promise.resolve(fb);
    if (!booting) {
      booting = timeout(Promise.all([
        import(FB + 'firebase-app.js'), import(FB + 'firebase-auth.js'), import(FB + 'firebase-firestore-lite.js'),
      ]), 15000).then(([app, A, F]) => {
        const a = app.initializeApp(CONFIG);
        fb = { auth: A.getAuth(a), db: F.getFirestore(a), A, F };
        return fb;
      }).catch((e) => { booting = null; throw e; });
    }
    return booting;
  }

  const who = (u) => ({ uid: u.uid, email: u.email || '', name: u.displayName || (u.email || '').split('@')[0] });

  async function accept(u) {
    if (!u) { user = null; return null; }
    if (!ALLOW.test(u.email || '')) {
      await fb.A.signOut(fb.auth).catch(() => {});
      const e = new Error('不是學校帳號'); e.code = 'domain'; e.email = u.email; throw e;
    }
    user = who(u);
    ls.set(LAST, JSON.stringify(user));
    ls.del(GUEST);
    return user;
  }

  function readLocal() {
    if (!user) return valid(json(ls.get(KEY))) || memory || empty();
    const c = json(ls.get(CACHE + user.uid));
    return c && valid(c.s) ? c : null;
  }

  async function push() {
    clearTimeout(timer); timer = 0;
    if (pushing) { await pushing; if (!dirty) return true; }
    if (!dirty || !user || !fb) return !dirty;
    dirty = false;
    const s = memory, at = Date.now();
    pushing = fb.F.setDoc(fb.F.doc(fb.db, COL, user.uid), {
      email: user.email, name: user.name, json: JSON.stringify(s), at, updatedAt: fb.F.serverTimestamp(),
    }).then(() => true, (e) => {
      console.warn('雲端存檔失敗，稍後再試', e);
      dirty = true;
      if (!timer) timer = setTimeout(push, WAIT * 2);
      return false;
    });
    const ok = await pushing;
    pushing = null;
    return ok;
  }

  // 切到背景（換 App、關螢幕、登出 iPad 前）就先存
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && dirty) push(); });
  addEventListener('pagehide', () => { if (dirty) push(); });
  addEventListener('online', () => { if (dirty) push(); });

  window.Save = {
    /* 開站時呼叫：判斷有沒有登入。上次登入過，或還沒選過「先不登入」，才載入 Firebase。 */
    async init() {
      const last = json(ls.get(LAST));
      if (!last && ls.get(GUEST) === '1') return null;
      try {
        await boot();
        await timeout(fb.auth.authStateReady(), 10000);
        await fb.A.getRedirectResult(fb.auth).catch(() => {});
        return await accept(fb.auth.currentUser);
      } catch (e) {
        if (e.code === 'domain') return null;
        console.warn('連不上登入服務', e);
        if (last && last.uid) { user = { ...last, offline: true }; return user; }   // 沒網路：先用這台裝置的副本
        return null;
      }
    },
    prepare: boot,                       // 登入畫面先把 Firebase 載好，按鈕按下去才不會被擋彈出視窗
    get user() { return user; },
    get guest() { return ls.get(GUEST) === '1'; },
    useGuest() { ls.set(GUEST, '1'); },
    leaveGuest() { ls.del(GUEST); },

    async signIn() {
      await boot();
      const p = new fb.A.GoogleAuthProvider();
      p.setCustomParameters({ prompt: 'select_account' });
      try {
        const r = await fb.A.signInWithPopup(fb.auth, p);
        return await accept(r.user);
      } catch (e) {
        // 彈出視窗被擋（少數 iPad 全螢幕模式）：改成整頁跳轉，回來時 init() 會接手
        if (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment') {
          await fb.A.signInWithRedirect(fb.auth, p);
          return null;
        }
        throw e;
      }
    },

    /* 登出：先把進度存上雲端，再清掉這台裝置上這個人的資料。force＝沒存成功也要登出。 */
    async signOut(force) {
      if (user && dirty && !(await timeout(push(), 8000).catch(() => false)) && !force) return 'unsaved';
      if (fb) await fb.A.signOut(fb.auth).catch(() => {});
      if (user) ls.del(CACHE + user.uid);
      ls.del(LAST);
      user = null; memory = null; dirty = false;
      return 'ok';
    },

    async load() {
      if (!user) return (memory = readLocal());
      const local = readLocal();
      let cloud = null, cloudOk = false;
      if (fb && !user.offline) {
        try {
          const snap = await timeout(fb.F.getDoc(fb.F.doc(fb.db, COL, user.uid)), 10000);
          cloudOk = true;
          if (snap.exists()) {
            const d = snap.data();
            const s = valid(json(d.json));
            if (s) cloud = { at: d.at || 0, s };
          }
        } catch (e) { console.warn('讀不到雲端進度，先用這台裝置的副本', e); }
      }
      let s, at;
      if (cloud && (!local || cloud.at >= local.at)) ({ s, at } = cloud);
      else if (local) { ({ s, at } = local); dirty = cloudOk; }        // 這台裝置比較新（上次離線玩的）：補存上去
      else { s = empty(); at = 0; dirty = cloudOk && !cloud; }        // 第一次登入：建立雲端那一份
      // 登入前在這台裝置用訪客身分玩過：併進帳號（每本書取 EXP 多的），訪客那份就刪掉
      const g = valid(json(ls.get(KEY)));
      if (g && cloudOk) { s = merge(s, g); ls.del(KEY); dirty = true; }
      memory = s;
      ls.set(CACHE + user.uid, JSON.stringify({ at: dirty ? Date.now() : at, s }));
      if (dirty) push();
      return s;
    },

    /* opt.now：馬上存上雲端（過關時） */
    async save(state, opt = {}) {
      memory = state;
      if (!user) { ls.set(KEY, JSON.stringify(state)); return; }
      ls.set(CACHE + user.uid, JSON.stringify({ at: Date.now(), s: state }));
      dirty = true;
      if (opt.now) push();
      else if (!timer) timer = setTimeout(push, WAIT);
    },

    async clear() {
      if (!user) { memory = null; ls.del(KEY); return; }
      await this.save(empty(), { now: true });
    },
  };
})();
