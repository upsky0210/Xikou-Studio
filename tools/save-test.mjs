/* 存檔層（js/save.js）的測試：不連網路，用假的 Firebase 和假的 localStorage 跑。
   用法：node tools/save-test.mjs
   改了 js/save.js 一定要跑；全部通過最後會印「存檔測試全部通過」。 */
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const file = process.argv[2] || new URL('../js/save.js', import.meta.url);
const src = fs.readFileSync(file, 'utf8')
  .replace("import(FB + 'firebase-app.js')", "__imp('app')")
  .replace("import(FB + 'firebase-auth.js')", "__imp('auth')")
  .replace("import(FB + 'firebase-firestore-lite.js')", "__imp('fs')");
assert.ok(src.includes("__imp('fs')"), 'save.js 載入 Firebase 的寫法變了，測試要跟著改');

const clock = { t: 1_800_000_000_000 };

/* 一台裝置。cloud＝{ doc } 是「雲端那一份」，兩台裝置傳同一個物件進來就是同一個帳號開兩台。 */
function setup({ email = 'kid@st.skps.tp.edu.tw', cloud = { doc: null }, store = {}, failGet = false } = {}) {
  const ls = { ...store };
  const writes = [];
  const net = { reads: 0, fail: failGet };
  const handlers = {};
  const snapOf = () => { const d = cloud.doc; return { exists: () => !!d, data: () => d }; };
  let current = email ? { uid: 'u1', email, displayName: '小明' } : null;
  const mods = {
    app: { initializeApp: () => ({}) },
    auth: {
      getAuth: () => ({ authStateReady: async () => {}, get currentUser() { return current; } }),
      getRedirectResult: async () => null,
      signOut: async () => { current = null; },
      GoogleAuthProvider: class { setCustomParameters() {} },
      signInWithPopup: async () => ({ user: { uid: 'u2', email: 'x@gmail.com' } }),
    },
    fs: {
      getFirestore: () => ({}),
      doc: (_, c, id) => c + '/' + id,
      getDoc: async () => { if (net.fail) throw new Error('offline'); net.reads++; return snapOf(); },
      runTransaction: async (_, fn) => {
        if (net.fail) throw new Error('offline');
        let pending = null;
        const out = await fn({
          get: async () => { net.reads++; return snapOf(); },
          set: (ref, d) => { pending = { ref, d }; },
        });
        if (pending) { cloud.doc = pending.d; writes.push(pending); }
        return out;
      },
      serverTimestamp: () => 'TS',
    },
  };
  const timers = [];
  const doc = { visibilityState: 'visible', addEventListener: (ev, f) => { handlers[ev] = f; } };
  const ctx = {
    __imp: async (k) => mods[k],
    localStorage: { getItem: (k) => (k in ls ? ls[k] : null), setItem: (k, v) => { ls[k] = String(v); }, removeItem: (k) => { delete ls[k]; } },
    document: doc,
    addEventListener() {},
    setTimeout: (f, ms) => { timers.push({ f, ms }); return timers.length; },
    clearTimeout() {},
    console: { warn() {} },
    Date: { now: () => clock.t },
    Promise, JSON, Error, Set, Object, Math,
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  const show = (v) => { doc.visibilityState = v; handlers.visibilitychange(); };
  return { Save: ctx.Save, ls, writes, timers, net, cloud, show };
}
const tick = async () => { for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0)); };
const plain = (x) => JSON.parse(JSON.stringify(x));

/* 造進度用：level(5)＝7 題都答對過、其中 5 題第一次就答對、已過關 */
const q = (first, ok = first === true, hints = 0) => ({ first, ok, hints });
const level = (firsts = 7, at = 1000) => ({ done: true, doneAt: at, q: Array.from({ length: 7 }, (_, i) => q(i < firsts, true)) });
const part = (...qs) => ({ done: false, doneAt: 0, q: [...qs, ...Array.from({ length: 7 - qs.length }, () => q(null))] });
function st(books, extra = {}) {
  const out = { v: 1, ...extra, books: {} };
  for (const [id, levels] of Object.entries(books)) {
    let n = 0;
    for (const l of Object.values(levels)) n += l.q.filter((x) => x.first === true).length;
    out.books[id] = { exp: n * 10, badges: {}, levels };
  }
  return out;
}
const cloudDoc = (s, at = 1000) => ({ doc: { email: 'kid@st.skps.tp.edu.tw', name: '小明', json: JSON.stringify(s), at, updatedAt: 'TS' } });
const cached = (s, at = 1000) => ({ 'xk-user': '{"uid":"u1","email":"kid@st.skps.tp.edu.tw","name":"小明"}', 'xk-cloud-u1': JSON.stringify({ at, s }) });
const inCloud = (t) => JSON.parse(t.cloud.doc.json);

// 1. 第一次登入、沒有雲端資料、裝置上有訪客進度 → 併進帳號、寫上雲端、刪掉訪客那份
{
  const t = setup({ store: { 'xk-practice-v1': JSON.stringify(st({ mn6: { 'mn6-01': level(3) } })) } });
  assert.equal((await t.Save.init()).email, 'kid@st.skps.tp.edu.tw');
  const s = await t.Save.load(); await tick();
  assert.equal(s.books.mn6.exp, 30);
  assert.equal(t.writes.length, 1);
  assert.equal(t.writes[0].ref, 'progress/u1');
  assert.deepEqual(Object.keys(t.writes[0].d).sort(), ['at', 'email', 'json', 'name', 'updatedAt']);   // 規則只准這五欄
  assert.equal(typeof t.writes[0].d.at, 'number');
  assert.equal(inCloud(t).books.mn6.exp, 30);
  assert.ok(!('xk-practice-v1' in t.ls));
  assert.ok('xk-cloud-u1' in t.ls && 'xk-user' in t.ls);
  // 存檔：不馬上寫，15 秒後才寫；過關（now）馬上寫
  s.books.mn6.levels['mn6-02'] = part(q(true)); s.books.mn6.exp = 40;
  await t.Save.save(s);
  assert.equal(t.writes.length, 1);
  assert.equal(t.timers.at(-1).ms, 15000);
  s.books.mn6.levels['mn6-02'] = part(q(true), q(true)); s.books.mn6.exp = 50;
  await t.Save.save(s, { now: true }); await tick();
  assert.equal(t.writes.length, 2);
  assert.equal(inCloud(t).books.mn6.exp, 50);
  // 內容沒變再存一次：讀了發現一樣，不寫
  await t.Save.save(s, { now: true }); await tick();
  assert.equal(t.writes.length, 2);
  // 登出：清掉這個人的副本
  assert.equal(await t.Save.signOut(), 'ok');
  assert.ok(!('xk-cloud-u1' in t.ls) && !('xk-user' in t.ls));
  assert.equal(t.Save.user, null);
  console.log('1 ok  第一次登入，訪客進度併進帳號');
}
// 2. 雲端比這台多 → 用雲端的，不寫
{
  const big = st({ mn6: { 'mn6-01': level(7), 'mn6-02': level(2) } });
  const t = setup({ cloud: cloudDoc(big, 2000), store: cached(st({ mn6: { 'mn6-01': level(7) } })) });
  await t.Save.init();
  const s = await t.Save.load(); await tick();
  assert.equal(s.books.mn6.exp, 90);
  assert.equal(t.writes.length, 0);
  console.log('2 ok  雲端比較多：用雲端的，不寫');
}
// 3. 這台比雲端多（上次離線玩）→ 合併後補寫上去
{
  const t = setup({ cloud: cloudDoc(st({ mn6: { 'mn6-01': level(1) } })), store: cached(st({ mn6: { 'mn6-01': level(1), 'mn6-02': level(6) } }), 3000) });
  await t.Save.init();
  const s = await t.Save.load(); await tick();
  assert.equal(s.books.mn6.exp, 70);
  assert.equal(t.writes.length, 1);
  assert.equal(inCloud(t).books.mn6.exp, 70);
  console.log('3 ok  這台比較多：補寫上雲端');
}
// 4. 讀不到雲端（離線）→ 用裝置副本，不寫；訪客進度先不動
{
  const t = setup({ failGet: true, store: { ...cached(st({ mn6: { 'mn6-01': level(7) } }), 3000), 'xk-practice-v1': JSON.stringify(st({ mn6: { 'mn6-01': level(1) } })) } });
  await t.Save.init();
  const s = await t.Save.load(); await tick();
  assert.equal(s.books.mn6.exp, 70);
  assert.equal(t.writes.length, 0);
  assert.ok('xk-practice-v1' in t.ls);
  console.log('4 ok  離線：用這台的副本');
}
// 5. 不是學校帳號 → 登出、不算登入
{
  const t = setup({ email: 'someone@gmail.com' });
  assert.equal(await t.Save.init(), null);
  assert.equal(t.Save.user, null);
  await assert.rejects(t.Save.signIn(), (e) => e.code === 'domain');
  console.log('5 ok  不是學校帳號：擋掉');
}
// 6. 選過「先不登入」、沒登入過 → 不載入 Firebase，訪客進度照舊
{
  const t = setup({ store: { 'xk-guest': '1', 'xk-practice-v1': JSON.stringify(st({ mn6: { 'mn6-01': level(2) } })) } });
  assert.equal(await t.Save.init(), null);
  const s = await t.Save.load();
  assert.equal(s.books.mn6.exp, 20);
  s.books.mn6.exp = 25;
  await t.Save.save(s);
  assert.equal(JSON.parse(t.ls['xk-practice-v1']).books.mn6.exp, 25);
  assert.equal(t.writes.length, 0);
  console.log('6 ok  訪客：只存在這台裝置');
}
// 7. 老師帳號可以登入
{
  const t = setup({ email: 'teacher@skps.tp.edu.tw' });
  assert.equal((await t.Save.init()).email, 'teacher@skps.tp.edu.tw');
  console.log('7 ok  老師帳號可以登入');
}
// 8. 兩台裝置同時開著（A1）：學校 iPad 沒關，回家用電腦過了三關，隔天 iPad 再答一題 → 兩邊的都要留著
{
  const cloud = cloudDoc(st({ mn6: { 'mn6-01': level(7) } }));
  const ipad = setup({ cloud }), home = setup({ cloud });
  await ipad.Save.init(); const si = await ipad.Save.load();
  await home.Save.init(); const sh = await home.Save.load();
  await tick();
  // 回家：過了三關
  Object.assign(sh.books.mn6.levels, { 'mn6-02': level(7, 5000), 'mn6-03': level(5, 6000), 'mn6-04': level(6, 7000) });
  sh.books.mn6.exp = 250; sh.books.mn6.badges = { 0: 7000 };
  await home.Save.save(sh, { now: true }); await tick();
  assert.equal(inCloud(home).books.mn6.exp, 250);
  // 隔天 iPad（畫面還是舊的）在第 5 關答對一題
  let told = null;
  ipad.Save.onChange = (s) => { told = s; };
  si.books.mn6.levels['mn6-05'] = part(q(true));
  si.books.mn6.exp = 80;
  await ipad.Save.save(si, { now: true }); await tick();
  const c = inCloud(ipad);
  assert.deepEqual(Object.keys(c.books.mn6.levels).sort(), ['mn6-01', 'mn6-02', 'mn6-03', 'mn6-04', 'mn6-05']);
  assert.equal(c.books.mn6.exp, 260);                        // 70 + 70 + 50 + 60 + 10
  assert.equal(c.books.mn6.badges[0], 7000);
  assert.ok(told, 'iPad 的畫面要收到合併後的進度');
  assert.equal(told.books.mn6.exp, 260);
  assert.ok(told.books.mn6.levels['mn6-03'].done);
  assert.equal(JSON.parse(ipad.ls['xk-cloud-u1']).s.books.mn6.exp, 260);
  // iPad 用舊畫面的進度再存一次，也不會把雲端蓋回去
  await ipad.Save.save(si, { now: true }); await tick();
  assert.equal(inCloud(ipad).books.mn6.exp, 260);
  // 家裡電腦下次打開：看得到 iPad 那一題
  const again = setup({ cloud, store: plain(home.ls) });
  await again.Save.init();
  assert.equal((await again.Save.load()).books.mn6.levels['mn6-05'].q[0].ok, true);
  console.log('8 ok  兩台裝置同時開著：兩邊的進度都留著');
}
// 9. 同一題兩邊都做過：答對過算數、第一次答對有一邊是就算、提示取多的、過關時間取早的；結果和先後順序無關
{
  const a = st({ en6: { 'en6-01': { done: false, doneAt: 0, q: [q(false, true, 2), q(false, false, 1), q(null), q(true), q(null), q(null), q(null)] } } });
  const b = st({ en6: { 'en6-01': { done: true, doneAt: 9000, q: [q(true), q(false, true, 3), q(true), q(false, true), q(true), q(true), q(true)] } }, ns6: { 'ns6-01': level(4, 100) } });
  const run = async (first, second) => {
    const cloud = cloudDoc(first);
    const t = setup({ cloud, store: cached(second) });
    await t.Save.init(); const s = await t.Save.load(); await tick();
    assert.deepEqual(plain(s), inCloud(t));
    return plain(s);
  };
  const ab = await run(a, b), ba = await run(b, a);
  const sorted = (x) => JSON.stringify(x, (_, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, v[k]])) : v));
  assert.equal(sorted(ab), sorted(ba));
  const l = ab.books.en6.levels['en6-01'];
  assert.deepEqual(l.q[0], q(true, true, 2));
  assert.deepEqual(l.q[1], q(false, true, 3));
  assert.deepEqual(l.q[3], q(true, true, 0));
  assert.equal(l.done, true); assert.equal(l.doneAt, 9000);
  assert.equal(ab.books.en6.exp, 60);                         // 第 2 題兩邊第一次都答錯，其餘 6 題有一邊第一次就答對
  assert.equal(ab.books.ns6.exp, 40);
  console.log('9 ok  同一題兩邊都做過：逐題合併，和順序無關');
}
// 10. 清除進度：不會被雲端或另一台的舊進度補回來
{
  const cloud = cloudDoc(st({ mn6: { 'mn6-01': level(7), 'mn6-02': level(7) } }));
  const a = setup({ cloud }), b = setup({ cloud });
  await a.Save.init(); await a.Save.load();
  await b.Save.init(); const sb = await b.Save.load();
  await tick();
  clock.t += 5000;
  await a.Save.clear();
  const sa = await a.Save.load(); await tick();
  assert.deepEqual(plain(sa.books), {});
  assert.deepEqual(inCloud(a).books, {});
  assert.equal(inCloud(a).reset, clock.t);
  // 另一台還開著舊進度，回到分頁時對一次：也跟著清空
  let told = null;
  b.Save.onChange = (s) => { told = s; };
  clock.t += 120000;
  b.show('hidden'); b.show('visible'); await tick();
  assert.ok(told); assert.deepEqual(plain(told.books), {});
  assert.deepEqual(inCloud(b).books, {});
  // 清除之後的新進度照常合併
  told.books.mn6 = { exp: 10, badges: {}, levels: { 'mn6-01': part(q(true)) } };
  await b.Save.save(told, { now: true }); await tick();
  assert.equal(inCloud(b).books.mn6.exp, 10);
  assert.equal(sb.books.mn6.exp, 140);                       // 舊畫面那份物件沒被動到
  console.log('10 ok 清除進度：別台裝置的舊進度不會補回來');
}
// 11. 回到分頁：隔一分鐘以上才去雲端對一次；沒有新東西就不寫
{
  const cloud = cloudDoc(st({ mn6: { 'mn6-01': level(7) } }));
  const t = setup({ cloud }), other = setup({ cloud });
  await t.Save.init(); await t.Save.load();
  await other.Save.init(); const so = await other.Save.load();
  await tick();
  let told = 0;
  t.Save.onChange = () => { told++; };
  const reads = t.net.reads;
  clock.t += 30000;
  t.show('hidden'); t.show('visible'); await tick();
  assert.equal(t.net.reads, reads);                          // 才 30 秒：不去讀
  clock.t += 60000;
  t.show('hidden'); t.show('visible'); await tick();
  assert.equal(t.net.reads, reads + 1);
  assert.equal(told, 0); assert.equal(t.writes.length, 0);   // 雲端沒變：不通知、不寫
  so.books.mn6.levels['mn6-02'] = level(7); so.books.mn6.exp = 140;
  await other.Save.save(so, { now: true }); await tick();
  clock.t += 90000;
  t.show('hidden'); t.show('visible'); await tick();
  assert.equal(told, 1); assert.equal(t.writes.length, 0);   // 另一台有新進度：通知畫面，自己不用寫
  console.log('11 ok 回到分頁：重新和雲端對一次');
}
// 12. 寫入失敗（斷線）：資料留在這台，30 秒後再試，連上後補寫，而且先合併別台的進度
{
  const cloud = cloudDoc(st({ mn6: { 'mn6-01': level(7) } }));
  const t = setup({ cloud }), other = setup({ cloud });
  await t.Save.init(); const s = await t.Save.load();
  await other.Save.init(); const so = await other.Save.load();
  await tick();
  t.net.fail = true;
  s.books.mn6.levels['mn6-02'] = level(3); s.books.mn6.exp = 100;
  await t.Save.save(s, { now: true }); await tick();
  assert.equal(t.writes.length, 0);
  assert.equal(t.timers.at(-1).ms, 30000);
  assert.equal(JSON.parse(t.ls['xk-cloud-u1']).s.books.mn6.exp, 100);
  so.books.sk6 = { exp: 70, badges: {}, levels: { 'sk6-01': level(7) } };
  await other.Save.save(so, { now: true }); await tick();
  t.net.fail = false;
  await t.timers.at(-1).f(); await tick();
  assert.equal(inCloud(t).books.mn6.exp, 100);
  assert.equal(inCloud(t).books.sk6.exp, 70);
  console.log('12 ok 斷線後補寫：先合併再寫');
}
// 13. 回到分頁時對雲端失敗（剛好沒網路）：沒有東西要存，所以不算「還沒存」，登出不會被擋
{
  const t = setup({ cloud: cloudDoc(st({ mn6: { 'mn6-01': level(7) } })) });
  await t.Save.init(); await t.Save.load(); await tick();
  const n = t.timers.length;
  t.net.fail = true;
  clock.t += 120000;
  t.show('hidden'); t.show('visible'); await tick();
  assert.equal(t.timers.length, n);                          // 不排重試
  assert.equal(await t.Save.signOut(), 'ok');
  console.log('13 ok 回到分頁時沒網路：不影響登出');
}
console.log('存檔測試全部通過');
