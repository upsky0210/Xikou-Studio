/* 答題規則（js/engine.js）的測試：鎖定、先看提示、精熟、徽章。
   用法：node tools/engine-test.mjs
   改了 js/engine.js 一定要跑；全部通過最後會印「規則測試全部通過」。 */
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const clock = { t: 1_800_000_000_000 };
const ctx = { Date: { now: () => clock.t }, Math, Array, Object };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(new URL('../js/engine.js', import.meta.url), 'utf8'), ctx);
const E = ctx.Engine;

// 一本書：第 0 區兩關、第 1 區一關，每關 7 題；正解都是「對」，干擾項是 錯1～錯3
const mkLevel = (id, z) => ({ id, z, name: id, q: Array.from({ length: 7 }, (_, i) => [`${id} 第 ${i + 1} 題`, '對', ['錯1', '錯2', '錯3'], ['提示一', '提示二', '提示三'], '詳解']) });
const book = { id: 'tt', zones: ['一區', '二區'], levels: [mkLevel('L1', 0), mkLevel('L2', 0), mkLevel('L3', 1)] };
const fresh = () => ({ v: 1, books: {} });
const wait = (ms = E.LOCK_MS) => { clock.t += ms; };

/* 玩一關。plan[i]＝這一題先答錯幾次再答對（0＝第一次就答對）。回傳 finish 的結果。 */
function play(state, level, plan) {
  const run = E.startRun(state, book.id, level);
  E.enterQuestion(run);
  for (;;) {
    const i = run.index;
    for (let k = 0; k < (plan[i] || 0); k++) {
      while (E.needHint(run)) E.revealHint(state, run);
      assert.equal(E.answer(state, run, '錯' + (k + 1)).ok, false);
      wait();
    }
    while (E.needHint(run)) E.revealHint(state, run);
    assert.equal(E.answer(state, run, '對').ok, true);
    if (!E.next(run)) break;
    E.enterQuestion(run);
  }
  return E.finish(state, run, book);
}

// 1. 答錯後 2 秒內不能再選；時間到才可以
{
  const s = fresh(), run = E.startRun(s, book.id, book.levels[0]);
  E.enterQuestion(run);
  assert.equal(E.answer(s, run, '錯1').ok, false);
  const r = E.answer(s, run, '對');
  assert.equal(r.blocked, true);                               // 馬上再點：不算
  assert.equal(run.ok[0], false);
  assert.equal(s.books.tt.levels.L1.q[0].ok, false);
  wait(E.LOCK_MS - 1);
  assert.equal(E.answer(s, run, '對').blocked, true);
  wait(1);
  assert.equal(E.answer(s, run, '對').ok, true);
  assert.equal(s.books.tt.levels.L1.q[0].first, false);        // 第一次是答錯的，不加 EXP
  assert.equal(s.books.tt.exp, 0);
  console.log('1 ok  答錯後鎖 2 秒');
}
// 2. 同一題錯兩次：要先看 1 段提示；錯三次：要看過 2 段
{
  const s = fresh(), run = E.startRun(s, book.id, book.levels[0]);
  E.enterQuestion(run);
  E.answer(s, run, '錯1'); wait();
  assert.equal(E.needHint(run), false);                        // 錯一次：不用
  E.answer(s, run, '錯2'); wait();
  assert.equal(E.needHint(run), true);
  assert.equal(E.answer(s, run, '對').blocked, true);          // 沒看提示：等再久也不能選
  wait(60000);
  assert.equal(E.answer(s, run, '對').blocked, true);
  E.revealHint(s, run);
  assert.equal(E.needHint(run), false);
  E.answer(s, run, '錯3'); wait();
  assert.equal(E.needHint(run), true);                         // 錯三次：要第 2 段
  E.revealHint(s, run);
  assert.equal(E.answer(s, run, '對').ok, true);
  assert.equal(s.books.tt.levels.L1.q[0].hints, 2);
  console.log('2 ok  錯兩次要先看提示');
}
// 3. 亂點過關：過關但不精熟、沒有徽章（就算整區都這樣過）
{
  const s = fresh();
  const a = play(s, book.levels[0], [3, 3, 3, 3, 3, 3, 3]);
  assert.equal(a.newlyDone, true); assert.equal(a.star, false); assert.equal(a.firstNow, 0); assert.equal(a.need, 5);
  const b = play(s, book.levels[1], [1, 1, 1, 0, 0, 0, 0]);    // 第一次答對 4 題：差一題
  assert.equal(b.star, false); assert.equal(b.firstNow, 4); assert.equal(b.badge, null);
  assert.equal(E.islandComplete(s, book, 0), false);
  assert.deepEqual(Object.keys(s.books.tt.badges), []);
  assert.equal(E.levelSummary(s, book.id, book.levels[0]).done, true);
  assert.equal(E.levelSummary(s, book.id, book.levels[0]).star, false);
  // 再練一次（複習）：這次第一次就答對 5 題 → 精熟；EXP 不變
  const exp = s.books.tt.exp;
  const c = play(s, book.levels[0], [0, 0, 0, 0, 0, 1, 1]);
  assert.equal(c.star, true); assert.equal(c.newlyStar, true); assert.equal(c.firstNow, 5); assert.equal(c.badge, null);
  assert.equal(s.books.tt.exp, exp);
  assert.equal(s.books.tt.levels.L1.star, true);
  // 另一關也練到精熟 → 這時才拿到徽章
  const d = play(s, book.levels[1], [0, 0, 0, 0, 0, 0, 2]);
  assert.equal(d.newlyStar, true); assert.equal(d.badge, 0);
  assert.ok(s.books.tt.badges[0]);
  // 精熟之後複習考差了：不會收回
  const e = play(s, book.levels[1], [1, 1, 1, 1, 1, 1, 1]);
  assert.equal(e.star, true); assert.equal(e.newlyStar, false);
  console.log('3 ok  亂點只算過關；再練一次可以拿精熟；整區精熟才有徽章');
}
// 4. 第一次闖關就第一次答對 5 題以上：直接精熟，一關的區直接拿徽章
{
  const s = fresh();
  const r = play(s, book.levels[2], [0, 0, 1, 0, 0, 2, 0]);
  assert.equal(r.star, true); assert.equal(r.newlyStar, true); assert.equal(r.firstNow, 5); assert.equal(r.badge, 1);
  assert.equal(s.books.tt.exp, 50);
  console.log('4 ok  第一次闖關就精熟');
}
// 5. 加這條規則之前的舊進度：過關而且第一次答對題數夠 → 算精熟；不夠 → 只算過關；已有的徽章留著
{
  const lv = (firsts) => ({ done: true, doneAt: 1, q: Array.from({ length: 7 }, (_, i) => ({ first: i < firsts, ok: true, hints: 0 })) });
  const s = { v: 1, books: { tt: { exp: 0, badges: { 1: 5 }, levels: { L1: lv(6), L2: lv(2), L3: lv(1) } } } };
  assert.equal(E.levelSummary(s, book.id, book.levels[0]).star, true);
  assert.equal(E.levelSummary(s, book.id, book.levels[1]).star, false);
  assert.equal(E.islandComplete(s, book, 0), false);
  assert.equal(E.syncBadges(s, book).length, 0);
  assert.ok(s.books.tt.badges[1]);                             // 舊規則拿到的徽章不收回
  console.log('5 ok  舊進度照新規則判定，已有的徽章不收回');
}
// 6. 一關做到一半離開再回來：精熟看存檔裡每題的第一次作答
{
  const s = fresh(), level = book.levels[2];
  let run = E.startRun(s, book.id, level);
  E.enterQuestion(run);
  for (let i = 0; i < 4; i++) { E.answer(s, run, '對'); E.next(run); E.enterQuestion(run); }
  run = E.startRun(s, book.id, level);                         // 離開後重新進來：從第 5 題接著做
  assert.equal(run.index, 4);
  E.enterQuestion(run);
  E.answer(s, run, '錯1'); wait(); E.answer(s, run, '對'); E.next(run); E.enterQuestion(run);
  E.answer(s, run, '對'); E.next(run); E.enterQuestion(run);
  E.answer(s, run, '錯1'); wait(); E.answer(s, run, '對');
  assert.equal(E.next(run), false);
  const r = E.finish(s, run, book);
  assert.equal(r.firstNow, 5); assert.equal(r.star, true);
  console.log('6 ok  分兩次做完也算得出精熟');
}
assert.equal(E.masterNeed(7), 5);
console.log('規則測試全部通過');
