// 工具共用：讀資料檔、分數標記、精確的分數計算（用 BigInt，不會有小數誤差）
import { readFileSync } from 'node:fs';

// 讀資料檔（const XXX = {...}）
export function loadBook(file, globalName) {
  return new Function(readFileSync(file, 'utf8') + `;return ${globalName};`)();
}

// 分數標記：{{3/4}}、{{2 1/3}}（和 js/ui.js 的寫法一樣）
export const FRAC = /\{\{\s*(?:(\d+)\s+)?([^{}\/\s]+)\s*\/\s*([^{}\/\s]+)\s*\}\}/g;
export const plain = (s) => String(s).replace(FRAC, (_, w, n, d) => (w ? w + ' ' : '') + n + '/' + d);
// 標記有沒有寫壞（{{ 和 }} 沒成對、裡面不是分數）
export function badMarkup(s) {
  const left = String(s).replace(FRAC, '');
  return left.includes('{{') || left.includes('}}');
}

/* ---------- 有理數 ---------- */
const babs = (x) => (x < 0n ? -x : x);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a || 1n; };
export function R(n, d = 1n) {
  n = BigInt(n); d = BigInt(d);
  if (d === 0n) throw new Error('除以 0');
  if (d < 0n) { n = -n; d = -d; }
  const g = bgcd(n, d);
  return { n: n / g, d: d / g };
}
const add = (a, b) => R(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => R(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a, b) => R(a.n * b.n, a.d * b.d);
const div = (a, b) => R(a.n * b.d, a.d * b.n);
export const eq = (a, b) => a.n === b.n && a.d === b.d;
export const lt = (a, b) => a.n * b.d < b.n * a.d;

function decimal(str) {
  const [i, f = ''] = str.split('.');
  return R(BigInt(i + f), 10n ** BigInt(f.length));
}

// 解析一個值：12、0.45、5/8、2 1/3（也接受全形數字以外的常見寫法）
export function parseValue(s) {
  const t = plain(s).trim();
  let m;
  if ((m = t.match(/^(\d+)\s+(\d+)\/(\d+)$/))) return add(R(m[1]), R(m[2], m[3]));
  if ((m = t.match(/^(\d+)\/(\d+)$/))) return R(m[1], m[2]);
  if ((m = t.match(/^\d+(\.\d+)?$/))) return decimal(t);
  return null;
}

// 算式：+ - * / ( )，也接受 × ÷ ＋ －；數字可以是小數；a/b 就是除法
export function evalExpr(src) {
  const s = String(src).replace(/×/g, '*').replace(/÷/g, '/').replace(/＋/g, '+').replace(/[－−]/g, '-').replace(/\s+/g, '');
  let i = 0;
  const peek = () => s[i];
  function num() {
    const m = s.slice(i).match(/^\d+(\.\d+)?/);
    if (!m) throw new Error('算式看不懂：' + src + '（第 ' + (i + 1) + ' 個字）');
    i += m[0].length;
    return decimal(m[0]);
  }
  function factor() {
    if (peek() === '(') { i++; const v = expr(); if (s[i++] !== ')') throw new Error('括號沒有成對：' + src); return v; }
    if (peek() === '-') { i++; return mul(R(-1), factor()); }
    return num();
  }
  function term() {
    let v = factor();
    while (peek() === '*' || peek() === '/') { const op = s[i++]; const w = factor(); v = op === '*' ? mul(v, w) : div(v, w); }
    return v;
  }
  function expr() {
    let v = term();
    while (peek() === '+' || peek() === '-') { const op = s[i++]; const w = term(); v = op === '+' ? add(v, w) : sub(v, w); }
    return v;
  }
  const v = expr();
  if (i !== s.length) throw new Error('算式看不懂：' + src);
  return v;
}

// 四捨五入到小數第 places 位（正數），回傳字串
export function roundHalfUp(r, places) {
  const k = 10n ** BigInt(places);
  const scaled = (r.n * k * 2n + r.d) / (r.d * 2n);   // floor(r*k + 1/2)
  if (places === 0) return scaled.toString();
  const str = scaled.toString().padStart(places + 1, '0');
  return str.slice(0, -places) + '.' + str.slice(-places);
}

// 分數寫成最簡的帶分數或整數，例如 7/3 → "2 1/3"
export function show(r) {
  if (r.d === 1n) return r.n.toString();
  const w = r.n / r.d, rem = r.n % r.d;
  return w ? `${w} ${rem}/${r.d}` : `${rem}/${r.d}`;
}

export const gcd = (a, b) => Number(bgcd(BigInt(a), BigInt(b)));
export const lcm = (a, b) => (a / gcd(a, b)) * b;
