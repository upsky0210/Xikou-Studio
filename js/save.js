/* 儲存層（storage adapter）
   引擎和畫面只透過 Save.load() / Save.save() / Save.clear() 存取進度，不直接碰 localStorage 或 Firebase。

   兩種模式：
   - 登入學校 Google 帳號：進度存在 Firestore 的 progress/{uid}（每人一份，只有自己能讀寫，規則見 firestore.rules），
     這台裝置另外留一份副本（xk-cloud-{uid}），網路斷了也能繼續玩，下次連上再補存。
     共用 iPad 的訪客模式一登出就清空，所以進度一定要在雲端。
     同一個人可能同時開著兩台裝置（學校 iPad 沒關、回家用電腦）：存檔不是整份蓋過去，而是「逐關逐題合併」，
     每次寫入前先讀雲端那一份、合在一起再寫（transaction），所以兩邊做的都留得住。合併規則見 merge()。
   - 先不登入（訪客）：跟以前一樣只存在這台裝置（xk-practice-v1）。
     登入後如果這台裝置還留著訪客進度，不會自動併進帳號（共用的電腦上那份可能是別人玩的）：
     畫面用 guestLeft 看有沒有、問過本人，再呼叫 takeGuest(是不是我的)。
   - 開站時沒網路：Firebase 沒載到，先用這台裝置的副本玩（user.offline）。網路回來（online 事件、回到分頁、下一次存檔）
     會補連一次，連上就和雲端合併。sw.js 會把 Firebase 的程式放進快取，所以通常沒網路也載得到。

   Firebase 的程式從 gstatic 載入（只有要登入的人才下載，約 420 KB）。設定碼本來就是公開的，安全靠資料庫規則。
   寫入次數有限（免費方案每天 2 萬次），所以不是每答一題就寫：最多每 15 秒寫一次，過關、切到背景、登出時馬上寫。

   進度格式（v1）：
   {
     v: 1,
     reset: 1731000000000,                         // 上次按「清除進度」的時間（沒清過就沒有這一欄）；合併時比較新的那次清除算數
     books: {
       mn6: {
         exp: 70,                                  // 總 EXP（由各題 first 算出來，存一份方便老師端讀）
         badges: { "0": 1731000000000 },           // 已得島章：島索引 → 取得時間
         levels: {
           "mn6-01": {
             done: true, doneAt: 1731000000000,    // 7 題都答對過
             star: true, starAt: 1731000000000,    // 精熟（一次闖關裡第一次就答對 5 題以上；沒有就沒這兩欄，規則見 engine.js）
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
  const NOT_MINE = 'xk-guest-no';   // 登入後看到訪客進度、回答「不是我玩的」的人（uid 清單）；訪客進度有變動就清空，下次再問
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

  /* 兩份進度合在一起（哪一份放前面結果都一樣，合幾次也一樣）：
     - 每一題：答對過（ok）有一邊是就是；第一次就答對（first）有一邊是 true 就算 true；提示次數取多的。
     - 每一關：有一邊過關就是過關，過關時間取早的；精熟（star）也一樣。徽章：有一邊拿到就有，時間取早的。
     - EXP 由合併後的 first 重新算（規則同 engine.js 的 recalcExp）。
     - 清除進度：reset 比較新的那一份整份算數，另一份（清除之前的舊進度）丟掉。
     回傳全新的物件，不會動到 a、b。 */
  const EXP_PER_Q = 10;             // 和 engine.js 的 EXP_PER_Q 一樣
  const clone = (x) => JSON.parse(JSON.stringify(x));
  const keys = (a, b) => [...new Set([...Object.keys(a || {}), ...Object.keys(b || {})])];
  const early = (a, b) => (a && b ? Math.min(a, b) : a || b || 0);
  function mergeQ(x, y) {
    if (!x || !y) return clone(x || y);
    const first = x.first === true || y.first === true ? true : x.first === false || y.first === false ? false : null;
    return { ...y, ...x, first, ok: !!(x.ok || y.ok), hints: Math.max(x.hints || 0, y.hints || 0) };
  }
  function mergeLevel(x, y) {
    if (!x || !y) return clone(x || y);
    const xq = x.q || [], yq = y.q || [], q = [];
    for (let i = 0; i < Math.max(xq.length, yq.length); i++) q.push(mergeQ(xq[i], yq[i]));
    const done = !!(x.done || y.done);
    const out = { ...y, ...x, done, doneAt: done ? early(x.done && x.doneAt, y.done && y.doneAt) : 0, q };
    if (x.star || y.star) { out.star = true; out.starAt = early(x.star && x.starAt, y.star && y.starAt); }
    return out;
  }
  function mergeBook(x, y) {
    const out = x && y ? { ...y, ...x, badges: {}, levels: {} } : clone(x || y);
    if (x && y) {
      for (const z of keys(x.badges, y.badges)) out.badges[z] = early((x.badges || {})[z], (y.badges || {})[z]) || 1;
      for (const id of keys(x.levels, y.levels)) out.levels[id] = mergeLevel((x.levels || {})[id], (y.levels || {})[id]);
    }
    let n = 0;
    for (const l of Object.values(out.levels || {})) for (const q of l.q || []) if (q.first === true) n++;
    out.exp = n * EXP_PER_Q;
    return out;
  }
  function mergeBooks(a, b) {
    const out = {};
    for (const id of keys(a, b)) out[id] = mergeBook(a[id], b[id]);
    return out;
  }
  function merge(a, b) {
    const ra = a.reset || 0, rb = b.reset || 0;
    if (ra !== rb) return clone(ra > rb ? a : b);
    return { ...b, ...a, books: mergeBooks(a.books, b.books) };
  }
  // 內容一樣嗎（不管欄位順序）
  const canon = (x) => JSON.stringify(x, (_, v) => (v && typeof v === 'object' && !Array.isArray(v)
    ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, v[k]])) : v));
  const same = (a, b) => canon(a) === canon(b);

  let fb = null, booting = null;
  let user = null;          // { uid, email, name, offline? }
  let memory = null;        // 最新的進度（localStorage 不能用時至少這次記得）
  let dirty = false, timer = 0, pushing = null;
  let synced = 0;           // 上次和雲端對過的時間
  let onChange = null;      // 雲端有別台裝置的新進度時通知畫面

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

  // 這台裝置上的訪客進度有多少：{ done 過關關數, ok 答對題數, exp }；沒有答對過任何一題就當作沒有
  function guestSum() {
    const g = valid(json(ls.get(KEY)));
    if (!g) return null;
    let done = 0, ok = 0, exp = 0;
    for (const b of Object.values(g.books)) {
      for (const l of Object.values((b && b.levels) || {})) {
        if (l.done) done++;
        for (const x of l.q || []) { if (x && x.ok) ok++; if (x && x.first === true) exp += EXP_PER_Q; }
      }
    }
    return ok ? { done, ok, exp } : null;
  }

  /* 開站時沒連上登入服務（user.offline）：補連一次。Firebase 載到了、而且登入著的還是同一個人，才算連上。
     連不上就維持原狀（繼續用這台的副本），之後還會再試。 */
  let reconnecting = null;
  function reconnect() {
    if (!reconnecting) {
      const u = user;
      reconnecting = (async () => {
        try {
          await boot();
          await timeout(fb.auth.authStateReady(), 10000);
          const cu = fb.auth.currentUser;
          if (user === u && cu && cu.uid === u.uid) { user = who(cu); ls.set(LAST, JSON.stringify(user)); }
        } catch (e) { console.warn('還連不上登入服務', e); }
        reconnecting = null;
      })();
    }
    return reconnecting;
  }

  /* 和雲端對一次：讀雲端那一份 → 和這台的合併 → 有新東西才寫回去（讀和寫包在同一個 transaction，
     兩台裝置剛好同時寫也不會互相蓋掉）。雲端有這台沒有的進度，就併進這台並通知畫面。
     pull＝這台沒有要存的東西也去對一次（回到分頁時用）。 */
  async function push(pull) {
    pull = pull === true;
    clearTimeout(timer); timer = 0;
    if (user && user.offline && (dirty || pull)) await reconnect();
    if (pushing) { await pushing; if (!dirty && !pull) return true; }
    if ((!dirty && !pull) || !user || !fb || user.offline || !memory) return !dirty;
    const had = dirty;        // 只是回到分頁對一次（沒有東西要存）的話，失敗了不用記成「還沒存」
    dirty = false;
    const u = user, ref = fb.F.doc(fb.db, COL, u.uid);
    pushing = fb.F.runTransaction(fb.db, async (tx) => {
      const snap = await tx.get(ref);
      const theirs = snap.exists() ? valid(json(snap.data().json)) : null;
      const s = theirs ? merge(memory, theirs) : clone(memory);
      if (!theirs || !same(s, theirs)) {
        tx.set(ref, { email: u.email, name: u.name, json: JSON.stringify(s), at: Date.now(), updatedAt: fb.F.serverTimestamp() });
      }
      return s;
    }).then((s) => {
      synced = Date.now();
      if (user !== u || !memory) return true;                // 這段時間已經登出了
      const m = merge(memory, s);                            // memory 在等待時可能又多答了幾題，再合一次
      if (!same(m, memory)) {
        memory = m;
        ls.set(CACHE + u.uid, JSON.stringify({ at: Date.now(), s: m }));
        if (onChange) { try { onChange(m); } catch (e) { console.warn(e); } }
      }
      return true;
    }, (e) => {
      console.warn('雲端存檔失敗，稍後再試', e);
      if (had) dirty = true;
      if (dirty && !timer) timer = setTimeout(push, WAIT * 2);
      return false;
    });
    const ok = await pushing;
    pushing = null;
    return ok;
  }

  // 切到背景（換 App、關螢幕、登出 iPad 前）就先存；回到這個分頁時，隔了一分鐘以上就和雲端對一次（可能在別台裝置玩過）
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') { if (dirty) push(); }
    else if (user && Date.now() - synced > 60000) push(true);
  });
  addEventListener('pagehide', () => { if (dirty) push(); });
  // 網路回來：不管有沒有東西要存都對一次（開站時沒網路的話，這台的副本可能比雲端多，雲端也可能有別台的新進度）
  addEventListener('online', () => { if (user) push(true); });

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
    set onChange(f) { onChange = f; },   // f(進度)：雲端有別台裝置的新進度，已經併進來了
    useGuest() { ls.set(GUEST, '1'); },
    leaveGuest() { ls.del(GUEST); },

    /* 登入了，而這台裝置還留著沒登入時玩的進度、這個人也還沒回答過是不是他的 → { done, ok, exp }；否則 null。 */
    get guestLeft() {
      if (!user) return null;
      const no = json(ls.get(NOT_MINE));
      if (Array.isArray(no) && no.includes(user.uid)) return null;
      return guestSum();
    },
    /* 回答訪客進度是不是自己的。mine＝true：逐題併進帳號、存上雲端、刪掉訪客那份。
       false：那份留在這台裝置（給真正玩的人），記下這個人已經答過。回傳現在的進度。 */
    async takeGuest(mine) {
      const g = valid(json(ls.get(KEY)));
      if (!user || !g) return memory;
      if (!mine) {
        const no = json(ls.get(NOT_MINE));
        ls.set(NOT_MINE, JSON.stringify([...new Set([...(Array.isArray(no) ? no : []), user.uid])]));
        return memory;
      }
      const mine0 = memory || empty();
      const s = { ...mine0, books: mergeBooks(mine0.books, g.books) };
      ls.del(KEY); ls.del(NOT_MINE);
      await this.save(s, { now: true });
      return s;
    },

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
      // 雲端和這台的副本合在一起（這台可能有上次離線玩的、雲端可能有別台裝置玩的）
      const s = cloud && local ? merge(cloud.s, local.s) : cloud ? cloud.s : local ? local.s : empty();
      // 這台裝置的訪客進度不在這裡併（見 guestLeft / takeGuest）
      // 雲端沒有、或合併後比雲端多：補存上去
      dirty = cloudOk && (!cloud || !same(s, cloud.s));
      if (cloudOk) synced = Date.now();
      memory = s;
      ls.set(CACHE + user.uid, JSON.stringify({ at: Date.now(), s }));
      if (dirty) push();
      return s;
    },

    /* opt.now：馬上存上雲端（過關時） */
    async save(state, opt = {}) {
      memory = state;
      if (!user) { ls.set(KEY, JSON.stringify(state)); ls.del(NOT_MINE); return; }
      ls.set(CACHE + user.uid, JSON.stringify({ at: Date.now(), s: state }));
      dirty = true;
      if (opt.now) push();
      else if (!timer) timer = setTimeout(push, WAIT);
    },

    /* 清除進度。登入時要記下清除的時間（reset），不然合併時會被雲端或別台裝置的舊進度補回來。 */
    async clear() {
      if (!user) { memory = null; ls.del(KEY); ls.del(NOT_MINE); return; }
      await this.save({ ...empty(), reset: Date.now() }, { now: true });
    },
  };
})();
