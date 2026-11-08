/* 畫面：首頁（選課本）→ 3D 冒險地圖（一個單元一區）→ 區域面板（關卡）→ 關卡說明 → 答題 → 結算
   網址用 #/ 分頁（PWA 全螢幕沒有上一頁按鈕，畫面上一律有「返回」）：
     #/                 首頁
     #/b/mn6            這本書的冒險地圖
     #/b/mn6/z/0        地圖上選了第 0 區（打開區域面板）
     #/p/mn6/mn6-01     這一關的說明 → 闖關
   3D 地圖在 js/3d/world.js（window.World）；裝置跑不動 3D 或在選單關掉時，改用平面地圖（mode-flat）。 */
(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const app = $('#app'), fx = $('#fx');
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => '&#' + c.charCodeAt(0) + ';');

  /* 題目文字：先跳脫 HTML，再把分數排成上下的樣子。
     資料裡寫 {{3/4}}（四分之三）、{{2 1/3}}（二又三分之一）；分子、分母也可以是 □。 */
  const FRAC = /\{\{\s*(?:(\d+)\s+)?([^{}\/\s]+)\s*\/\s*([^{}\/\s]+)\s*\}\}/g;
  const rich = (s) => esc(s).replace(FRAC, (_, w, n, d) =>
    `${w ? `<span class="frac-w">${w}</span>` : ''}<span class="frac" role="img" aria-label="${w ? w + '又' : ''}${d}分之${n}"><span class="fn">${n}</span><span class="fd">${d}</span></span>`);
  const plain = (s) => String(s).replace(FRAC, (_, w, n, d) => (w ? w + ' ' : '') + n + '/' + d);
  const CN = '一二三四五六七八九十';
  const LIT_START = 5;   // 第 6、7 題是素養題

  /* ---------- 小圖示（SVG） ---------- */
  const svg = (d, vb = '0 0 24 24') => `<svg class="i" viewBox="${vb}" aria-hidden="true"><path d="${d}"/></svg>`;
  const ICON = {
    jewel: svg('M7 3h10l4.5 5.5L12 21.5 2.5 8.5z'),   // 實心寶石（EXP、經驗寶石）
    trophy: svg('M6 2.5h12v2h3v2.8a4.3 4.3 0 0 1-4.1 4.3A6 6 0 0 1 13.3 15v3h3.2v3.5h-9V18h3.2v-3A6 6 0 0 1 7.1 11.6 4.3 4.3 0 0 1 3 7.3V4.5h3zm12 4V9a2.3 2.3 0 0 0 1-1.7V6.5zM6 6.5h-1v.8A2.3 2.3 0 0 0 6 9z'),
    shield: svg('M12 1.8l8.5 3.2v6.2c0 5.3-3.6 9.9-8.5 11.6C7.1 21.1 3.5 16.5 3.5 11.2V5z'),
    back: svg('M10.8 4.6L3.4 12l7.4 7.4v-4.8h9.8V9.4h-9.8z'),
    bulb: svg('M12 1.8a7.2 7.2 0 0 0-4.2 13v2.4h8.4v-2.4A7.2 7.2 0 0 0 12 1.8zM8.8 19h6.4v1.4a1.8 1.8 0 0 1-1.8 1.8h-2.8a1.8 1.8 0 0 1-1.8-1.8z'),
    menu: svg('M3.5 5.5h17v3h-17zm0 5h17v3h-17zm0 5h17v3h-17z'),
    close: svg('M6.3 4.2L12 9.9l5.7-5.7 2.1 2.1-5.7 5.7 5.7 5.7-2.1 2.1-5.7-5.7-5.7 5.7-2.1-2.1 5.7-5.7-5.7-5.7z'),
    check: svg('M9.2 16.7L4.5 12l-2.1 2.1 6.8 6.8L21.6 8.5l-2.1-2.1z'),
    lock: svg('M7 10V7.3a5 5 0 0 1 10 0V10h1.4c.9 0 1.6.7 1.6 1.6v8.8c0 .9-.7 1.6-1.6 1.6H5.6c-.9 0-1.6-.7-1.6-1.6v-8.8c0-.9.7-1.6 1.6-1.6zm2.7 0h4.6V7.3a2.3 2.3 0 0 0-4.6 0z'),
    expand: svg('M3 3h7.5v3H6v4.5H3zm10.5 0H21v7.5h-3V6h-4.5zM3 13.5h3V18h4.5v3H3zm15 0h3V21h-7.5v-3H18z'),
    hero: svg('M12 2a4.2 4.2 0 1 1 0 8.4A4.2 4.2 0 0 1 12 2zm0 9.8c4.6 0 8.3 2.4 8.3 5.6V22H3.7v-4.6c0-3.2 3.7-5.6 8.3-5.6z'),
    sword: svg('M20.3 2.2H22v1.7L12.1 14l1.8 1.8-1.4 1.4-1.6-1.6-3.6 3.6a1.6 1.6 0 1 1-2.3-2.3l3.6-3.6-1.6-1.6 1.4-1.4L10.2 12z'),
    go: svg('M8.6 3.5L17.1 12l-8.5 8.5-2.1-2.1L12.9 12 6.5 5.6z'),
    crown: svg('M3 7.2l4.6 3.6L12 4l4.4 6.8L21 7.2 19.4 18H4.6zM4.6 19.5h14.8V22H4.6z'),
    book: svg('M5 3.5A2.5 2.5 0 0 1 7.5 1H20v17H7.5a1 1 0 0 0 0 2H20v2.6H7.5A2.5 2.5 0 0 1 5 20.1z'),
    gem: svg('M7 3h10l4.5 5.5L12 21.5 2.5 8.5zm1.1 2L5.7 8h3.6l1.2-3zm4.3 0l1.2 3h3.6l-2.4-3zM9.4 10H5.9l5 6.8zm5.2 0l-1.5 6.8 5-6.8zm-1 0h-3.2L12 17.2z'),
  };

  let state = null;       // 進度（Save.load 讀進來）
  let run = null;         // 目前這次闖關
  let lastResult = null;
  let world = null;       // window.World（3D 地圖），沒有就是 null（平面地圖）
  let bookSeen = {};      // 這次打開網站後，看過哪本書的地圖（第一次進地圖先看全景）
  const lastZone = {};    // 每本書最後玩的區域（小勇者站在那裡）
  let celebrate = null;   // 剛拿到徽章：回地圖時播放升旗
  let routeSeq = 0;

  const persist = () => Save.save(state);

  /* ---------- 顏色小工具（區域的代表色 → 淺色、深色） ---------- */
  function mix(hex, to, t) {
    const a = parseInt(hex.slice(1), 16), b = parseInt(to.slice(1), 16);
    const ch = (x, s) => (x >> s) & 255;
    const c = [16, 8, 0].map((s) => Math.round(ch(a, s) + (ch(b, s) - ch(a, s)) * t));
    return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
  }
  const accVars = (c) => `--acc:${c};--acc2:${mix(c, '#ffffff', 0.78)};--acc3:${mix(c, '#000000', 0.28)}`;

  /* ---------- 模式：title（首頁）、map（3D 地圖）、flat（平面地圖）、play（闖關） ---------- */
  function setMode(m) {
    document.body.className = 'mode-' + m;
    if (m !== 'play') window.scrollTo(0, 0);
  }

  /* ---------- 上方列 ---------- */
  function updateTop(book) {
    let exp = 0, badges = 0;
    for (const b of Object.values(state.books)) { exp += b.exp || 0; badges += Object.keys(b.badges || {}).length; }
    $('#expNum').textContent = exp;
    $('#badgeNum').textContent = badges;
    const q = $('#qExp');
    if (q) q.textContent = book && state.books[book.id] ? state.books[book.id].exp : exp;
    document.title = book ? book.subj + book.sem + '・' + book.pub + '｜溪口練功王國' : '溪口練功王國';
  }

  /* ---------- 共用 ---------- */
  const unitLabel = (zi) => (zi.final ? '最終關' : '單元' + (CN[zi.no - 1] || zi.no));
  const zoneName = (book, z) => Engine.zoneInfo(book, z).name;
  const terrainOf = (zi) => Terrain.get(zi.terrain || 'generic');

  // 王城：前面各區的徽章都拿到，而且有關卡資料，才開放
  function finalOpen(book, zi) {
    const s = state.books[book.id];
    const all = Engine.regularZones(book).every((r) => s && s.badges[r.index]);
    return all && Engine.islandLevels(book, zi.index).length > 0;
  }
  function badgeCount(book) {
    const s = state.books[book.id], reg = Engine.regularZones(book);
    return { have: reg.filter((r) => s && s.badges[r.index]).length, need: reg.length };
  }

  /* 一關的 7 顆經驗寶石（每題一顆，依存檔裡每題的作答紀錄）：
       亮寶石 bright＝第一次作答就答對（first === true）
       暗寶石 dim＝曾經答錯、重試後答對（first === false 且 ok）
       空位＝還沒答對；正在作答的那一題外框會閃 */
  function gemsHTML(book, level, nowIndex = -1) {
    const saved = state.books[book.id] && state.books[book.id].levels[level.id];
    const marks = level.q.map((_, i) => {
      const q = saved && saved.q[i];
      return q && q.ok ? (q.first === true ? 'bright' : 'dim') : '';
    });
    const n = (k) => marks.filter((m) => m === k).length;
    return `<span class="gems" role="img" aria-label="亮寶石 ${n('bright')} 顆、暗寶石 ${n('dim')} 顆、空位 ${n('')} 個">${marks.map((m, i) =>
      `<i class="${m}${i === nowIndex ? ' now' : ''}"></i>`).join('')}</span>`;
  }
  const gemLegend = '<p class="gem-legend"><i class="g bright"></i>第一次就答對 <i class="g dim"></i>重試才答對 <i class="g"></i>還沒答對</p>';

  /* 附件（素養題用）：
       表格 {t: [[標題...], [資料...]]}、條列 {list: [...]}、短文 "文字" 或 {text}
       圖形 {fig: 'data/fig/檔名.svg', alt: '給看不到圖的人的說明', text?: '圖下方的說明'} */
  function attachHTML(a) {
    if (!a) return '';
    if (Array.isArray(a.t)) {
      const [head, ...rows] = a.t;
      return `<div class="attach"><div class="attach-hd">${ICON.book} 資料</div><div class="table-wrap"><table>
        <thead><tr>${head.map((c) => `<th>${rich(c)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
    }
    if (Array.isArray(a.list)) {
      return `<div class="attach"><div class="attach-hd">${ICON.book} 資料</div><ul>${a.list.map((x) => `<li>${rich(x)}</li>`).join('')}</ul></div>`;
    }
    if (typeof a.passage === 'string') {
      return `<div class="attach"><div class="attach-hd">${ICON.book} 短文</div><p class="passage">${rich(a.passage).replace(/\n/g, '<br>')}</p></div>`;
    }
    if (a.fig) {
      return `<figure class="attach fig" style="margin:2px 0 16px"><div class="attach-hd">${ICON.gem} 圖</div><img src="${esc(a.fig)}" alt="${esc(a.alt || '')}">
        ${a.text ? `<p>${rich(a.text).replace(/\n/g, '<br>')}</p>` : ''}</figure>`;
    }
    const text = typeof a === 'string' ? a : a.text;
    return text ? `<div class="attach"><div class="attach-hd">${ICON.book} 資料</div><p>${rich(text).replace(/\n/g, '<br>')}</p></div>` : '';
  }
  function explainHTML(text) {
    return String(text).split('\n').map((line) =>
      /^(驗算提示|證據提示)/.test(line) ? `<p class="check">${rich(line)}</p>` : `<p>${rich(line)}</p>`).join('');
  }

  function showError(err) {
    setMode(world ? 'map' : 'flat');
    app.innerHTML = `<section class="win err-win"><div class="ribbon">出了一點問題</div>
      <h2>資料讀不到</h2><p>${esc(err && err.message || err)}</p>
      <p><a class="btn gold" href="#/">回首頁</a></p></section>`;
  }

  // 可以點進去的區域：有關卡的區域，或王城（看建造進度）；其他「尚未開放」的不能點
  const enterable = (book, z) => Engine.islandLevels(book, z).length > 0 || Engine.zoneInfo(book, z).final;
  async function zoneEnterable(id, z) { try { return enterable(await Loader.loadBook(id), z); } catch { return false; } }

  /* ---------- 3D 地圖要的資料（每一區的狀態、名牌） ---------- */
  function currentZone(book) {
    if (lastZone[book.id] !== undefined) return lastZone[book.id];
    for (const zi of Engine.regularZones(book)) {
      const levels = Engine.islandLevels(book, zi.index);
      if (levels.some((l) => !Engine.levelSummary(state, book.id, l).done)) return zi.index;
    }
    const reg = Engine.regularZones(book);
    return reg.length ? reg[reg.length - 1].index : 0;
  }
  function zoneStatus(book, zi) {
    const levels = Engine.islandLevels(book, zi.index);
    const done = levels.filter((l) => Engine.levelSummary(state, book.id, l).done).length;
    if (zi.final && !finalOpen(book, zi)) {
      const { have, need } = badgeCount(book);
      return have >= need ? '建造中' : `徽章 ${have}／${need}`;
    }
    return levels.length ? `${done}／${levels.length} 關` : '尚未開放';
  }
  function worldVM(book) {
    const s = state.books[book.id];
    return {
      id: book.id,
      current: currentZone(book),
      zones: book.zones.map((_, z) => {
        const zi = Engine.zoneInfo(book, z), t = terrainOf(zi);
        const sums = Engine.islandLevels(book, z).map((l) => Engine.levelSummary(state, book.id, l));
        const badge = !!(s && s.badges[z]);
        const status = zoneStatus(book, zi);
        return {
          index: z, terrain: t.key, final: zi.final, color: t.color, badge,
          locked: (zi.final && !finalOpen(book, zi)) || !enterable(book, z),
          levels: sums.map((x) => ({ state: x.done ? 'done' : x.okCount ? 'going' : 'todo' })),
          next: sums.findIndex((x) => !x.done),
          label: `<span class="in"><span class="no">${zi.final ? ICON.crown : zi.no}</span><span class="tx"><b>${esc(zi.name)}</b><small>${esc(status)}</small></span>${badge ? `<span class="got">${ICON.shield}</span>` : ''}</span>`,
          aria: `${unitLabel(zi)}，${zi.name}，${status}${badge ? '，已得徽章' : ''}`,
        };
      }),
    };
  }

  /* ---------- 首頁 ---------- */
  function renderHome() {
    setMode('title');
    updateTop(null);
    const books = window.BOOKS.map((b, i) => {
      const s = state.books[b.id];
      const done = s ? Object.values(s.levels).filter((l) => l.done).length : 0;
      const exp = s ? s.exp : 0;
      return `<a class="book" href="#/b/${b.id}" style="--c:${b.color};--c2:${mix(b.color, '#000000', 0.35)}">
        <span class="pages"></span>
        <span class="cover"><small>${esc(b.pub)}</small><b>${esc(b.title)}</b>
          ${i === 0 ? '<img class="art" src="img/zone/castle.webp" alt="">' : ''}
          <span class="prog"><span class="bar"><i style="width:${Math.min(100, done * 6)}%"></i></span><em>已過關 ${done} 關 · ${exp} EXP</em></span></span></a>`;
    }).join('');
    app.innerHTML = `
      <section class="title-screen">
        <div class="logo">
          <span class="kicker">${ICON.crown} 溪口國小</span>
          <h1 class="logotype" data-text="溪口練功王國">溪口練功王國</h1>
          <p class="tagline">選一本課本，展開你的冒險</p>
        </div>
        <div>
          <div class="shelf">${books}<div class="book soon"><span class="pages"></span><span class="cover"><small>準備中</small><b>更多課本</b><span class="prog"><em>敬請期待</em></span></span></div></div>
          <p class="title-foot">題目內容皆為原創 · 進度目前只存在這台裝置</p>
        </div>
      </section>`;
    if (world) {
      Loader.loadBook(window.BOOKS[0].id).then((book) => {
        if (!document.body.classList.contains('mode-title')) return;
        world.setBook(worldVM(book));
        world.title();
      }).catch((e) => console.warn(e));
    }
  }

  /* ---------- 冒險地圖 ---------- */
  function mapChrome(book, z) {
    return `<div class="mapbar"><a class="pill" href="#/">${ICON.back}<b>首頁</b></a>
        <span class="pill"><b>${esc(book.subj + book.sem)}</b><small>${esc(book.pub)}版</small></span></div>
      ${world ? `<div class="maptools"><button class="round" id="ovBtn" type="button" aria-label="看整張地圖">${ICON.expand}<span>整張地圖</span></button>
        <button class="round" id="heroBtn" type="button" aria-label="找到小勇者">${ICON.hero}<span>小勇者在哪</span></button></div>` : ''}
      ${z === null && world ? '<p class="maptip">點一個地方，看看裡面的關卡</p>' : ''}`;
  }

  function questCard(book, level) {
    const no = book.levels.indexOf(level) + 1;
    const sum = Engine.levelSummary(state, book.id, level);
    const cls = sum.done ? 'done' : sum.okCount ? 'going' : 'todo';
    const st = sum.done ? `${ICON.trophy}<span>已過關</span><small>${sum.firstCount * Engine.EXP_PER_Q} EXP</small>`
      : sum.okCount ? `<span>進行中</span><small>${sum.okCount}／${sum.total} 題</small>` : `<span class="go">${ICON.go}</span>`;
    return `<li><a class="quest ${cls}" href="#/p/${book.id}/${encodeURIComponent(level.id)}">
      <span class="qno">${no}</span>
      <span class="qt"><b>${esc(level.name)}${level.draft ? ' <span class="tag draft">草稿・待抽驗</span>' : ''}</b><small>${esc(level.lesson)}</small>${gemsHTML(book, level)}</span>
      <span class="qst">${st}</span></a></li>`;
  }

  function soonCard(book, level) {
    const no = book.levels.indexOf(level) + 1;
    return `<li><div class="quest soon" aria-disabled="true">
      <span class="qno">${no}</span>
      <span class="qt"><b>${esc(level.name)}</b><small>${esc(level.lesson || '')}</small></span>
      <span class="qst">${ICON.lock}<span>尚未開放</span></span></div></li>`;
  }

  function medalHTML(book, zi, cls = '') {
    const t = terrainOf(zi), s = state.books[book.id], got = !!(s && s.badges[zi.index]);
    return `<div class="medal ${got ? '' : 'no'} ${cls}" style="${accVars(t.color)}"><span class="disc"><img src="${t.img}" alt=""></span>
      ${cls === 'mini' ? '' : `<b>${esc(zi.name)}</b><small>${got ? '已獲得' : '還沒拿到'}</small>`}</div>`;
  }

  function zonePanel(book, z) {
    const zi = Engine.zoneInfo(book, z), t = terrainOf(zi);
    const levels = Engine.islandLevels(book, z);
    const s = state.books[book.id], badge = !!(s && s.badges[z]);
    let body;
    if (zi.final && !finalOpen(book, zi)) {
      const { have, need } = badgeCount(book);
      body = `<div class="zlocked">
          <p class="banner">${ICON.lock}<span>${have >= need ? '八枚徽章都集滿了！王城還在建造中，下一輪開放。' : `集滿 ${need} 枚徽章，王城的大門就會打開。現在有 ${have} 枚。`}</span></p>
          <div class="row-medals">${Engine.regularZones(book).map((r) => medalHTML(book, r, 'mini')).join('')}</div>
          <p class="crane">工人正在搭鷹架、蓋城牆，每拿到一枚徽章，王城前的大道就會升起一面旗子。</p></div>`;
    } else if (!levels.length) {
      body = '<p class="banner">這一區的關卡還在準備中。</p>';
    } else {
      // 列出課名、還沒有題目的關：照順序排進清單，標「尚未開放」
      const all = book.levels.filter((l) => l.z === z);
      const soon = all.length - levels.length;
      body = `<div class="zbadge${badge ? ' got' : ''}"><span class="medal-mini">${ICON.shield}</span>
          <span>${badge ? `已經拿到「${esc(zi.name)}」的徽章！`
            : soon ? `這一區還有 ${soon} 關尚未開放。全部開放、全部過關後，就能拿到「${esc(zi.name)}」的徽章。`
            : `把這一區的 ${levels.length} 關全部過關，就能拿到「${esc(zi.name)}」的徽章。`}</span></div>
        <ol class="quests">${all.map((l) => Engine.playable(l) ? questCard(book, l) : soonCard(book, l)).join('')}</ol>`;
    }
    return `<aside class="zpanel win" style="${accVars(t.color)}" aria-label="${esc(zi.name)}">
      <button class="round x" id="zClose" type="button" aria-label="關閉">${ICON.close}</button>
      <div class="zhead"><img class="zimg" src="${t.img}" alt="">
        <div class="zt"><small>${unitLabel(zi)}${zi.terrain ? " · " + esc(t.label) : ""}</small><h2>${esc(zi.name)}</h2>${zi.unit ? `<p>${esc(zi.unit)}</p>` : ''}</div></div>
      <div class="scroll">${body}</div></aside>`;
  }

  function flatMap(book) {
    const cards = book.zones.map((_, z) => {
      const zi = Engine.zoneInfo(book, z), t = terrainOf(zi);
      const s = state.books[book.id], badge = !!(s && s.badges[z]);
      const locked = (zi.final && !finalOpen(book, zi)) || !Engine.islandLevels(book, z).length;
      const tagName = enterable(book, z) ? 'a' : 'div';
      return `<${tagName} class="fzone${badge ? ' got' : ''}${locked ? ' locked' : ''}"${tagName === 'a' ? ` href="#/b/${book.id}/z/${z}"` : ''} style="${accVars(t.color)}">
        ${badge ? `<span class="gotb" title="已得徽章">${ICON.shield}</span>` : ''}<img src="${t.img}" alt=""><small>${unitLabel(zi)}${zi.terrain ? " · " + esc(t.label) : ""}</small><b>${esc(zi.name)}</b><span class="st">${esc(zoneStatus(book, zi))}</span></${tagName}>`;
    }).join('');
    return `<div class="flat">${mapChrome(book, null)}<div class="flat-zones">${cards}</div>
      <p class="note">${esc(book.note || '')}</p></div>`;
  }

  // 面板擋住的範圍（3D 鏡頭會把選到的地方放在面板以外的空白處中間）
  function topInset() {
    const bar = $('.mapbar'), hud = $('#hud');
    if (bar) return bar.getBoundingClientRect().bottom + 6;
    return hud ? hud.offsetHeight : 0;
  }
  function panelInsets() {
    const panel = $('.zpanel');
    const ins = { l: 0, r: 0, t: topInset(), b: 0 };
    if (panel) {
      if (matchMedia('(min-width: 860px), (orientation: landscape) and (min-width: 600px)').matches) ins.r = panel.offsetWidth + 16;
      else ins.b = panel.offsetHeight;
    }
    return ins;
  }

  function renderMap(book, z) {
    const zi = z === null ? null : Engine.zoneInfo(book, z);
    if (z !== null && (!zi || z < 0 || z >= book.zones.length || !enterable(book, z))) { location.hash = '#/b/' + book.id; return; }
    updateTop(book);
    if (!world) {
      setMode('flat');
      app.innerHTML = flatMap(book) + (z !== null ? zonePanel(book, z) : '');
    } else {
      setMode('map');
      app.innerHTML = mapChrome(book, z) + (z !== null ? zonePanel(book, z) : '');
      document.body.classList.toggle('has-panel', z !== null);
      world.setBook(worldVM(book));
      const first = !bookSeen[book.id];
      bookSeen[book.id] = true;
      world.map({ z, focus: z !== null ? 'zone' : first ? 'overview' : 'keep', insets: panelInsets() });
      $('#ovBtn').onclick = () => { if (z !== null) location.hash = '#/b/' + book.id; world.map({ z: null, focus: 'overview', insets: { l: 0, r: 0, t: topInset(), b: 0 } }); };
      $('#heroBtn').onclick = () => { location.hash = '#/b/' + book.id + '/z/' + currentZone(book); };
      if (celebrate && celebrate.book === book.id && z === celebrate.z) {
        const c = celebrate;
        celebrate = null;
        setTimeout(() => { world.celebrate(c.z); toast(`${ICON.shield} 「${zoneName(book, c.z)}」插上了徽章旗！`); }, 900);
      }
    }
    const close = $('#zClose');
    if (close) close.onclick = () => { location.hash = '#/b/' + book.id; };
  }

  function toast(html) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = html;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 4200);
  }

  /* ---------- 關卡說明 ---------- */
  function renderIntro(book, level) {
    updateTop(book);
    const zi = Engine.zoneInfo(book, level.z), t = terrainOf(zi);
    const sum = Engine.levelSummary(state, book.id, level);
    const resume = !sum.done && sum.okCount > 0;
    const no = book.levels.indexOf(level) + 1;
    const backTo = '#/b/' + book.id + '/z/' + level.z;
    setMode(world ? 'map' : 'flat');
    app.innerHTML = (world ? mapChrome(book, level.z) : '') + `
      <div class="modal"><section class="win brief" style="${accVars(t.color)}">
        <div class="ribbon">${ICON.sword} 第 ${no} 關</div>
        <div class="zline"><img src="${t.img}" alt="">${unitLabel(zi)} · ${esc(zi.name)}</div>
        <h2>${esc(level.name)}</h2>
        <p class="lesson">${esc(level.lesson)}</p>
        <p class="lead">${esc(level.intro)}</p>
        <ul class="rules">
          <li><span class="ico shield">${ICON.gem}</span>共 ${level.q.length} 題，第 6、7 題是素養題。</li>
          <li><span class="ico gold">${ICON.jewel}</span>第一次作答就答對 +${Engine.EXP_PER_Q} EXP；答錯不扣分，可以再選一次。</li>
          <li><span class="ico jade">${ICON.bulb}</span>每題有 3 段提示，看提示不扣 EXP。</li>
        </ul>
        <div>${gemsHTML(book, level)}</div>${gemLegend}
        ${level.draft ? `<p class="banner draft">${ICON.book}<span>這一關是草稿，老師抽驗通過後才是正式版。題目有錯請告訴老師。</span></p>` : ''}
        ${sum.done ? `<p class="banner">${ICON.trophy}<span>你已經過關了，這次是複習，不會再加 EXP。</span></p>` : ''}
        ${resume ? `<p class="banner">${ICON.go}<span>上次答對了 ${sum.okCount} 題，會從還沒答對的題目接著做。</span></p>` : ''}
        <div class="row"><a class="btn" href="${backTo}">${ICON.back} 回到${esc(zi.name)}</a>
          <button class="btn gold big" id="start" type="button">${ICON.sword} ${sum.done ? '再練一次' : resume ? '繼續闖關' : '開始闖關'}</button></div>
      </section></div>`;
    if (world) {
      world.setBook(worldVM(book));
      world.map({ z: level.z, focus: 'zone', insets: { l: 0, r: 0, t: topInset(), b: 0 } });
    }
    $('.modal').addEventListener('click', (e) => { if (e.target.classList.contains('modal')) location.hash = backTo; });
    $('#start').onclick = () => {
      run = Engine.startRun(state, book.id, level);
      Engine.enterQuestion(run);
      lastZone[book.id] = level.z;
      if (world) world.play(level.z);
      renderQuestion(book);
    };
    $('#start').focus({ preventScroll: true });
  }

  /* ---------- 答題 ---------- */
  function hintButton(shown) {
    const left = Engine.HINTS_PER_Q - shown;
    return `<button class="btn hintbtn" id="hint" type="button">${ICON.bulb} 看提示 ${shown + 1}／${Engine.HINTS_PER_Q}
      <span class="dots">${Array.from({ length: Engine.HINTS_PER_Q }, (_, k) => `<i class="${k < shown ? 'used' : ''}"></i>`).join('')}</span><span class="sr" hidden>還有 ${left} 段</span></button>`;
  }

  function renderQuestion(book, feedback, picked) {
    setMode('play');
    const q = run.current, i = run.index, level = run.level;
    const zi = Engine.zoneInfo(book, level.z), t = terrainOf(zi);
    const solved = run.ok[i];
    const wrong = run.wrongPicks[i];
    const shown = run.shown[i];
    const short = q.options.every((o) => plain(o).length <= 14);
    const opts = q.options.map((o, k) => {
      const isWrong = wrong.includes(o), isRight = solved && o === q.answer;
      const cls = (isRight ? 'right' : isWrong ? 'wrong' : '') + (o === picked ? ' just' : '');
      return `<button class="opt ${cls}" data-k="${k}" type="button" ${solved || isWrong ? 'disabled' : ''}><span class="key">${'ABCD'[k]}</span><span class="t">${rich(o)}</span></button>`;
    }).join('');
    const hints = q.hints.slice(0, shown).map((h, k) => `<li><span class="hn">${k + 1}</span><b>提示 ${k + 1}</b>${rich(h)}</li>`).join('');
    let fb = '';
    if (feedback && feedback.ok) {
      fb = `<div class="fb ok"><b>答對了！</b>${feedback.gained ? `<span class="gain">${ICON.jewel} +${feedback.gained} EXP</span>`
        : run.review ? '<span class="sub">複習模式不加 EXP</span>' : '<span class="sub">重試答對不加 EXP，但你學會了！</span>'}</div>`;
    } else if (feedback) {
      fb = `<div class="fb no"><b>再想想看。</b><span class="sub">${shown < Engine.HINTS_PER_Q ? '卡住的話，可以打開提示。' : '把提示再讀一次，回頭看看題目的條件。'}</span></div>`;
    }
    const nextLeft = run.ok.filter((x) => !x).length;
    const no = book.levels.indexOf(level) + 1;
    const bookExp = state.books[book.id] ? state.books[book.id].exp : 0;
    app.innerHTML = `
      <div class="play" style="${accVars(t.color)}">
        <div class="qbar">
          <button class="btn" id="quit" type="button">${ICON.back} 離開</button>
          <div class="qtitle"><img src="${t.img}" alt=""><span><small>${esc(zi.name)} · 第 ${no} 關${run.review ? ' · 複習' : ''}</small><b>${esc(level.name)}</b></span></div>
          ${gemsHTML(book, level, i)}
          <span class="pill exp" id="qExpPill" title="這本書的 EXP"><i class="ico gold" aria-hidden="true">${ICON.jewel}</i><b id="qExp">${bookExp}</b><small>EXP</small></span>
        </div>
        <section class="win qcard">
          <div class="ribbon">第 ${i + 1} 題</div>
          <div class="qhd">${i >= LIT_START ? '<span class="tag lit">素養題</span>' : ''}${level.draft ? '<span class="tag draft">草稿・待抽驗</span>' : ''}<span class="qcount">${run.ok.filter(Boolean).length}／${run.ok.length} 題答對</span></div>
          ${attachHTML(q.attach)}
          <p class="stem">${rich(q.stem)}</p>
          <div class="opts${short ? ' two' : ''}">${opts}</div>
          <div aria-live="polite">${fb}</div>
          ${solved ? `<div class="explain"><div class="attach-hd">${ICON.book} 詳解</div>${explainHTML(q.explain)}</div>` : ''}
          <div class="hints">
            ${hints ? `<ol>${hints}</ol>` : ''}
            ${!solved && shown < Engine.HINTS_PER_Q ? hintButton(shown) : ''}
          </div>
          ${solved ? `<div class="nextrow"><button class="btn gold big" id="next" type="button">${nextLeft ? '下一題' : '看結算'} ${ICON.go}</button></div>` : ''}
        </section>
      </div>`;

    app.querySelectorAll('.opt').forEach((btn) => {
      btn.onclick = () => {
        const text = q.options[+btn.dataset.k];
        const rect = btn.getBoundingClientRect();
        const res = Engine.answer(state, run, text);
        persist();
        renderQuestion(book, res, text);
        updateTop(book);
        if (res.gained) flyExp(rect, '+' + res.gained);
        if (res.ok) { const el = $('.explain'); if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150); }
      };
    });
    const hb = $('#hint');
    if (hb) hb.onclick = () => {
      Engine.revealHint(state, run);
      persist();
      renderQuestion(book, feedback && !feedback.ok ? feedback : null);
      const items = app.querySelectorAll('.hints li');
      if (items.length) items[items.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    const nb = $('#next');
    if (nb) nb.onclick = () => {
      if (Engine.next(run)) { Engine.enterQuestion(run); renderQuestion(book); window.scrollTo(0, 0); }
      else finishRun(book);
    };
    $('#quit').onclick = () => { run = null; location.hash = '#/b/' + book.id + '/z/' + level.z; };
  }

  // 第一次就答對：+EXP 從按鈕飛到右上角
  function flyExp(fromRect, text) {
    const target = $('#qExpPill');
    if (!target || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = document.createElement('div');
    el.className = 'fly';
    el.innerHTML = `${ICON.jewel} ${text}`;
    fx.appendChild(el);
    const sx = fromRect.left + fromRect.width / 2 - 40, sy = fromRect.top + fromRect.height / 2 - 20;
    el.style.transform = `translate(${sx}px, ${sy}px) scale(1.2)`;
    const tr = target.getBoundingClientRect();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transform = `translate(${tr.left + tr.width / 2 - 40}px, ${tr.top}px) scale(.6)`;
      el.style.opacity = '0.2';
    }));
    setTimeout(() => { el.remove(); const p = $('#qExpPill'); if (p) { p.classList.remove('bump'); void p.offsetWidth; p.classList.add('bump'); } }, 820);
  }

  function confetti(n = 90) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#ffcb3d', '#5a75ff', '#ff5f6d', '#2fc48a', '#ffffff', '#b47cff'];
    for (let i = 0; i < n; i++) {
      const c = document.createElement('i');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.setProperty('--dx', (Math.random() - 0.5) * 200 + 'px');
      c.style.setProperty('--rot', (Math.random() * 900 - 450) + 'deg');
      c.style.animationDuration = 2.2 + Math.random() * 2 + 's';
      c.style.animationDelay = Math.random() * 0.6 + 's';
      fx.appendChild(c);
      setTimeout(() => c.remove(), 5200);
    }
  }

  function finishRun(book) {
    const res = Engine.finish(state, run, book);
    persist(); updateTop(book);
    lastResult = { run, res };
    if (res.badge !== null) celebrate = { book: book.id, z: res.badge };
    renderResult(book);
  }

  /* ---------- 過關結算 ---------- */
  function renderResult(book) {
    setMode('play');
    const { run: r, res } = lastResult;
    const sum = Engine.levelSummary(state, book.id, r.level);
    const bstate = state.books[book.id];
    const zi = Engine.zoneInfo(book, r.level.z), t = terrainOf(zi);
    app.innerHTML = `
      <div class="play" style="${accVars(t.color)}">
        <section class="win result">
          <div class="ribbon gold">${ICON.trophy} 過關！</div>
          <div class="hero-wrap"><div class="rays" aria-hidden="true"></div><img class="hero-img" src="img/hero.webp" alt=""></div>
          <h2>${esc(r.level.name)}</h2>
          ${gemsHTML(book, r.level)}${gemLegend}
          <div class="stats">
            <div class="hot"><small>這次獲得</small><b>+${r.expGained}</b><span>EXP</span></div>
            <div><small>第一次就答對</small><b>${sum.firstCount}／${sum.total}</b><span>題</span></div>
            <div><small>提示使用</small><b>${r.hintsUsed}</b><span>次</span></div>
            <div><small>這本書累計</small><b>${bstate.exp}</b><span>EXP</span></div>
          </div>
          ${r.review ? `<p class="banner">${ICON.jewel}<span>複習模式：EXP 以第一次闖關為準。</span></p>` : ''}
          ${res.badge !== null ? `<div class="badge-get">${medalHTML(book, Engine.zoneInfo(book, res.badge), 'big')}
            <p>恭喜！你拿到了<b>「${esc(zoneName(book, res.badge))}」的徽章</b>回到地圖，看看旗子升起來！</p></div>` : ''}
          <div class="row">
            <a class="btn gold big" href="#/b/${book.id}/z/${r.level.z}">${ICON.back} 回到${esc(zi.name)}</a>
            <a class="btn" id="again" href="#/p/${book.id}/${encodeURIComponent(r.level.id)}">再練一次</a>
          </div>
        </section>
      </div>`;
    $('#again').onclick = (e) => { e.preventDefault(); renderIntro(book, r.level); };
    run = null;
    window.scrollTo(0, 0);
    confetti(res.badge !== null ? 140 : 80);
  }

  /* ---------- 徽章冊 ---------- */
  async function openBadges() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const parts = [];
    for (const entry of window.BOOKS) {
      try {
        const book = await Loader.loadBook(entry.id);
        const { have, need } = badgeCount(book);
        parts.push(`<h3>${esc(book.subj + book.sem)}（${esc(book.pub)}版）</h3><p class="sum">已經拿到 ${have}／${need} 枚</p>
          <div class="medals">${Engine.regularZones(book).map((zi) => medalHTML(book, zi)).join('')}</div>`);
      } catch (e) { parts.push(`<p class="note">${esc(entry.title)} 讀不到</p>`); }
    }
    modal.innerHTML = `<section class="win badgebook"><div class="ribbon">${ICON.shield} 徽章冊</div>${parts.join('')}
      <button class="btn gold wide" type="button" id="bbClose">關閉</button></section>`;
    document.body.appendChild(modal);
    const close = () => modal.remove();
    modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('#bbClose')) close(); });
    $('#bbClose', modal).focus();
  }

  /* ---------- 路由 ---------- */
  async function route() {
    const seq = ++routeSeq;
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    document.querySelectorAll('body > .modal').forEach((m) => m.remove());
    $('#menu').hidden = true;
    try {
      if (!parts.length) return renderHome();
      if (parts[0] === 'b' && parts[1]) {
        const book = await Loader.loadBook(parts[1]);
        if (seq !== routeSeq) return;
        return renderMap(book, parts[2] === 'z' && parts[3] !== undefined ? +parts[3] : null);
      }
      if (parts[0] === 'p' && parts[1] && parts[2]) {
        const book = await Loader.loadBook(parts[1]);
        if (seq !== routeSeq) return;
        const level = book.levels.find((l) => l.id === parts[2]);
        if (!level || !Engine.playable(level)) { location.hash = '#/b/' + book.id; return; }
        return renderIntro(book, level);
      }
      location.hash = '#/';
    } catch (err) {
      console.error(err);
      showError(err);
    }
  }

  /* ---------- 選單 ---------- */
  const THREE_OFF = 'xk-3d-off';
  function threeOff() { try { return localStorage.getItem(THREE_OFF) === '1'; } catch { return false; } }
  function setupMenu() {
    const menu = $('#menu'), btn = $('#menuBtn');
    btn.innerHTML = ICON.menu;
    const open = (v) => { menu.hidden = !v; btn.setAttribute('aria-expanded', String(v)); };
    btn.onclick = (e) => { e.stopPropagation(); open(menu.hidden); };
    document.addEventListener('click', (e) => { if (!e.target.closest('.menu-wrap')) open(false); });
    const tb = $('#threeBtn');
    tb.innerHTML = `${ICON.gem} 3D 地圖：${threeOff() ? '關（點一下打開）' : '開（點一下改成平面，比較省電）'}`;
    tb.onclick = () => {
      try { if (threeOff()) localStorage.removeItem(THREE_OFF); else localStorage.setItem(THREE_OFF, '1'); localStorage.removeItem('xk-3d-quality'); } catch { /* 略過 */ }
      location.reload();
    };
    $('#clearBtn').onclick = async () => {
      open(false);
      if (!confirm('要清除這台裝置上的所有闖關進度嗎？EXP 和徽章都會歸零，不能復原。')) return;
      await Save.clear();
      state = await Save.load();
      run = null;
      Object.keys(lastZone).forEach((k) => delete lastZone[k]);
      bookSeen = {};
      location.hash = '#/';
      route();
    };
    $('#badgeBtn').innerHTML = `<i class="ico shield" aria-hidden="true">${ICON.shield}</i><b id="badgeNum">0</b><small>徽章</small>`;
    $('#badgeBtn').onclick = openBadges;
    $('.pill.exp .ico').innerHTML = ICON.jewel;
  }

  // 鍵盤：A～D 或 1～4 選答案、H 看提示、Enter 下一題、Esc 關面板
  function setupKeys() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (document.body.classList.contains('mode-play')) {
        const idx = 'abcd'.indexOf(k) >= 0 ? 'abcd'.indexOf(k) : '1234'.indexOf(k);
        if (idx >= 0) { const b = app.querySelectorAll('.opt')[idx]; if (b && !b.disabled) { b.click(); e.preventDefault(); } }
        else if (k === 'h') { const b = $('#hint'); if (b) b.click(); }
        else if (k === 'enter' && document.activeElement === document.body) { const b = $('#next'); if (b) b.click(); }
      } else if (k === 'escape') {
        const m = document.querySelector('body > .modal');
        if (m) m.remove();
        else { const c = $('#zClose'); if (c) c.click(); }
      }
    });
  }

  // 3D 地圖準備好了沒（最多等 9 秒；不能用就是 null）
  function waitWorld() {
    return new Promise((resolve) => {
      if (window.__noModule) return resolve(null);
      if (window.World !== undefined) return resolve(window.World);
      addEventListener('world-ready', () => resolve(window.World), { once: true });
      addEventListener('world-fail', () => resolve(null), { once: true });
      setTimeout(() => resolve(window.World || null), 9000);
    });
  }

  async function start() {
    state = await Save.load();
    setupMenu();
    setupKeys();
    world = await waitWorld();
    if (world) {
      world.onSelect(async (z) => {
        const parts = location.hash.replace(/^#\/?/, '').split('/');
        const id = parts[0] === 'b' ? parts[1] : null;
        if (!id) return;
        if (z !== null && !(await zoneEnterable(id, z))) { toast(`${ICON.lock} 這一區尚未開放`); return; }
        location.hash = z === null ? '#/b/' + id : '#/b/' + id + '/z/' + z;
      });
      let t = 0;
      addEventListener('resize', () => {
        clearTimeout(t);
        t = setTimeout(() => { if (document.body.classList.contains('mode-map')) world.setInsets(panelInsets()); }, 120);
      });
    }
    window.addEventListener('hashchange', route);
    route();
  }

  window.UI = { start };
})();
