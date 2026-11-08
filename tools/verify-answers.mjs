// 用程式重算每一題的答案（依題目檔的 verify 欄位），抓出算錯的正解或和正解等值的干擾項
// 用法：node tools/verify-answers.mjs questions.json [其他題目檔.json ...]
//
// verify 的寫法：
//   { kind: 'expr', expr: '4/(2/3)', expected: '6' }               算式的值要等於 expected
//   { kind: 'round', expr: '125/3.2', places: 1, expected: '39.1' }  四捨五入到小數第 places 位
//   { kind: 'min' 或 'max', exprs: { 甲: '...', 乙: '...' }, expected: '乙' }  哪一個最小／最大
//   { kind: 'gcd' 或 'lcm', nums: [48, 72], expected: 24 }
//   { kind: 'factorization', n: 72, primes: [2, 2, 2, 3, 3] }
//   { kind: 'judge', basis: '判斷的理由' }                          概念判斷題，程式不算，列出來給人看
//   任何 kind 都可以再加 checks: [['算式', '期望值'], ['算式', '期望值', 小數位數], ...]
//   用來驗算干擾項的由來和詳解裡寫到的每一個數（期望值 8/3 和 2 2/3 視為相同；有小數位數時比四捨五入後的結果）。
// expr、round 的 expected 也要出現在正解文字裡（例如正解「約 39.1 元」）。
import { readFileSync } from 'node:fs';
import { plain, evalExpr, parseValue, roundHalfUp, eq, lt, show, gcd, lcm } from './lib.mjs';

const files = process.argv.slice(2);
if (!files.length) { console.log('用法：node tools/verify-answers.mjs <題目檔.json> ...'); process.exit(1); }

let bad = 0, checked = 0, judged = 0, checks = 0;
const fail = (id, msg) => { bad++; console.log(`✗ ${id}：${msg}`); };

for (const f of files) {
  for (const it of JSON.parse(readFileSync(f, 'utf8'))) {
    const v = it.verify || {};
    const ans = plain(it.answer);
    try {
      if (v.kind === 'expr' || v.kind === 'round') {
        const val = evalExpr(v.expr);
        const got = v.kind === 'round' ? roundHalfUp(val, v.places) : null;
        const exp = parseValue(String(v.expected));
        if (v.kind === 'expr' && !(exp && eq(val, exp))) fail(it.id, `${v.expr} = ${show(val)}，不是 ${v.expected}`);
        if (v.kind === 'round' && got !== String(v.expected)) fail(it.id, `${v.expr} 四捨五入到小數第 ${v.places} 位是 ${got}，不是 ${v.expected}`);
        if (!ans.includes(plain(String(v.expected)))) fail(it.id, `正解「${ans}」裡沒有 ${v.expected}`);
        // 干擾項不能和正解等值
        for (const d of it.distractors) {
          const dv = parseValue(d.text), ev = exp;
          if (dv && ev && eq(dv, ev)) fail(it.id, `干擾項「${plain(d.text)}」和正解等值`);
        }
        checked++;
      } else if (v.kind === 'min' || v.kind === 'max') {
        const vals = Object.entries(v.exprs).map(([k, e]) => [k, evalExpr(e)]);
        let best = vals[0];
        for (const x of vals) if (v.kind === 'min' ? lt(x[1], best[1]) : lt(best[1], x[1])) best = x;
        const ties = vals.filter((x) => eq(x[1], best[1]));
        if (ties.length > 1) fail(it.id, `${ties.map((x) => x[0]).join('、')} 一樣${v.kind === 'min' ? '小' : '大'}`);
        else if (best[0] !== v.expected) fail(it.id, `算出來最${v.kind === 'min' ? '小' : '大'}的是 ${best[0]}，不是 ${v.expected}`);
        if (!ans.includes(v.expected)) fail(it.id, `正解「${ans}」裡沒有 ${v.expected}`);
        checked++;
      } else if (v.kind === 'gcd' || v.kind === 'lcm') {
        const r = v.nums.reduce((a, b) => (v.kind === 'gcd' ? gcd(a, b) : lcm(a, b)));
        if (r !== v.expected) fail(it.id, `${v.kind}(${v.nums}) = ${r}，不是 ${v.expected}`);
        checked++;
      } else if (v.kind === 'factorization') {
        const prod = v.primes.reduce((a, b) => a * b, 1);
        const isPrime = (p) => p > 1 && [...Array(Math.floor(Math.sqrt(p)) + 1).keys()].slice(2).every((k) => p % k);
        if (prod !== v.n || !v.primes.every(isPrime)) fail(it.id, `${v.primes.join('×')} 不是 ${v.n} 的質因數分解`);
        checked++;
      } else if (v.kind === 'judge') {
        judged++;
      } else {
        fail(it.id, '沒有 verify 欄位，或 kind 看不懂');
      }
    } catch (e) {
      fail(it.id, e.message);
    }
    for (const c of v.checks || []) {
      try {
        const [e, want, places] = c;
        const val = evalExpr(e);
        if (places !== undefined) { const got = roundHalfUp(val, places); if (got !== String(want)) fail(it.id, `檢查 ${e} 四捨五入到第 ${places} 位是 ${got}，不是 ${want}`); }
        else { const w = parseValue(String(want)); if (!w || !eq(val, w)) fail(it.id, `檢查 ${e} ＝ ${show(val)}，不是 ${want}`); }
        checks++;
      } catch (e) { fail(it.id, '檢查算式看不懂：' + JSON.stringify(c)); }
    }
  }
}
console.log(`程式重算 ${checked} 題、概念判斷題 ${judged} 題（要人工看）、另外驗算 ${checks} 個算式，發現 ${bad} 個問題`);
process.exit(bad ? 1 : 0);
