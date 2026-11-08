// 把 3D 地標畫成圖片：img/zone/<地形>.webp、img/hero.webp、icons/icon-512.png 等 App 圖示
// 用法：node tools/render-sprites.mjs
// 做法：開一個只在本機的小伺服器，用 Edge（無畫面模式）開 tools/sprites.html，
//       頁面畫好一張就 POST 回來存檔，全部畫完就關掉。改了 js/3d/ 裡的模型，再跑一次就好。
// 找不到 Edge 時，用 --browser 指定瀏覽器路徑（Chrome 也可以）。
import http from 'node:http';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argBrowser = process.argv.indexOf('--browser');
const BROWSER = argBrowser > 0 ? process.argv[argBrowser + 1] : [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((p) => existsSync(p));
if (!BROWSER) { console.error('找不到 Edge 或 Chrome，請用 --browser 指定路徑'); process.exit(1); }

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.json': 'application/json' };
const saved = [];
let browser = null, profile = null;

function finish(code, msg) {
  if (msg) console.log(msg);
  if (browser) browser.kill();
  server.close();
  setTimeout(async () => { if (profile) await rm(profile, { recursive: true, force: true }).catch(() => {}); process.exit(code); }, 800);
}

const body = (req) => new Promise((resolve) => { const parts = []; req.on('data', (c) => parts.push(c)); req.on('end', () => resolve(Buffer.concat(parts).toString('utf8'))); });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (req.method === 'POST' && url.pathname === '/save') {
      const { name, data } = JSON.parse(await body(req));
      // 只能寫進 img/ 和 icons/，而且只收圖片
      if (!/^(img|icons)\/[\w\-\/]+\.(webp|png)$/.test(name) || name.includes('..')) throw new Error('不允許的檔名 ' + name);
      const m = /^data:image\/(webp|png);base64,(.+)$/.exec(data);
      if (!m) throw new Error('不是圖片資料 ' + name);
      const out = path.join(ROOT, name);
      await mkdir(path.dirname(out), { recursive: true });
      await writeFile(out, Buffer.from(m[2], 'base64'));
      saved.push(name);
      res.end('ok');
      return;
    }
    if (req.method === 'POST' && url.pathname === '/done') {
      const info = JSON.parse(await body(req));
      res.end('ok');
      if (info.ok) finish(0, `完成：存了 ${saved.length} 張圖\n  ` + saved.join('\n  '));
      else finish(1, '頁面出錯：\n' + info.error);
      return;
    }
    const file = path.join(ROOT, decodeURIComponent(url.pathname));
    if (!file.startsWith(ROOT)) { res.statusCode = 403; res.end(); return; }
    const buf = await readFile(file);
    res.setHeader('content-type', TYPES[path.extname(file)] || 'application/octet-stream');
    res.end(buf);
  } catch (e) {
    res.statusCode = req.method === 'POST' ? 400 : 404;
    res.end(String(e.message || e));
    if (req.method === 'POST') console.error(e.message || e);
  }
});

server.listen(0, '127.0.0.1', async () => {
  const { port } = server.address();
  profile = path.join(os.tmpdir(), 'xk-sprites-' + port);
  browser = spawn(BROWSER, ['--headless=new', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`, '--window-size=800,800', `http://127.0.0.1:${port}/tools/sprites.html`], { stdio: 'ignore' });
  browser.on('error', (e) => finish(1, '開不了瀏覽器：' + e.message));
});
setTimeout(() => finish(1, '等太久（60 秒），可能是瀏覽器不能跑 WebGL'), 60000);
