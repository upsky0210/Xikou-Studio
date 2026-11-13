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
  // 課本書名兩字一組、組內不斷行：放不下時斷成「六上／國語」，不會變成「六上國／語」
  const pairs = (s) => (String(s).match(/.{1,2}/gu) || []).map((p) => `<span class="nw">${esc(p)}</span>`).join('');

  /* 題目文字：先跳脫 HTML，再把分數排成上下的樣子。
     資料裡寫 {{3/4}}（四分之三）、{{2 1/3}}（二又三分之一）；分子、分母也可以是 □。 */
  const FRAC = /\{\{\s*(?:(\d+)\s+)?([^{}\/\s]+)\s*\/\s*([^{}\/\s]+)\s*\}\}/g;
  const rich = (s) => esc(s).replace(FRAC, (_, w, n, d) =>
    `${w ? `<span class="frac-w">${w}</span>` : ''}<span class="frac" role="img" aria-label="${w ? w + '又' : ''}${d}分之${n}"><span class="fn">${n}</span><span class="fd">${d}</span></span>`);
  const plain = (s) => String(s).replace(FRAC, (_, w, n, d) => (w ? w + ' ' : '') + n + '/' + d);
  const CN = '一二三四五六七八九十';
  const LIT_START = 5;   // 第 6、7 題是素養題
  // 第 6、7 題的標籤：預設都叫「素養題」；書可以在資料檔用 qTags 改成自己的名稱（例如國語：主旨與寓意、短文閱讀）
  const qTagOf = (book, i) => (i < LIT_START ? '' : (book.qTags && book.qTags[i - LIT_START]) || '素養題');
  const qTagRule = (book) => book.qTags ? `第 6 題是「${esc(book.qTags[0])}」、第 7 題是「${esc(book.qTags[1])}」` : '第 6、7 題是素養題';

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
    speaker: svg('M3 9h4l5-4.5v15L7 15H3zm12.5-1.8a6 6 0 0 1 0 9.6l-1.4-1.5a4 4 0 0 0 0-6.6zm2.6-2.9a10 10 0 0 1 0 15.4l-1.4-1.5a8 8 0 0 0 0-12.4z'),
  };

  /* ---------- 英語聽力：用瀏覽器內建的英語語音朗讀（不錄音、不上網） ----------
     題目附件 {listen: '要念的英文', rate?: 0.6～1, speakOptions?: true}
     iPad Safari 規定要使用者按了按鈕才能出聲，所以不自動播放，一律按「播放」
     選語音：各裝置列出的英語語音品質差很多，用評分挑最清楚的
       - 線上的高品質語音優先（Chrome 的 Google US English、Edge 的 Natural、Apple 的 Enhanced／Premium）
       - Windows 舊版語音（Microsoft Zira／David／Mark Desktop）字尾子音會被吃掉，只在沒有別的語音時才用
       - iPad／Mac 的特效語音（Albert、Bubbles、Zarvox…）一律排除
       - 沒有網路時只用本機語音；線上語音念到一半失敗，改用本機語音重念一次
     對話（"Kevin: … Amy: …"）：拆成一人一段，男生女生用不同聲音（沒有男聲就把音調壓低），不念出「Kevin:」 */
  const Say = (() => {
    const ok = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    const NOVELTY = /\b(Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Deranged|Good News|Hysterical|Jester|Junior|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Ralph|Fred|Kathy|Princess|Grandma|Grandpa|Eddy|Flo|Reed|Rocko|Sandy|Shelley)\b/i;
    const LEGACY = /^Microsoft (Zira|David|Mark|Hazel|George|Susan|Catherine|James|Linda|Richard|Heera|Ravi|Sean)\b(?!.*(Online|Natural))/i;
    const MALE = /\b(male|david|mark|guy|davis|tony|andrew|brian|christopher|eric|roger|steffan|jason|daniel|alex|aaron|evan|nathan|tom|arthur|oliver|rishi|gordon|lee|ryan|thomas|liam)\b/i;
    const BOYS = /^(Kevin|Tom|Ben|Tony|Mike|Jack|Sam|Peter|Bill|John|David|Eric|Andy|Leo|Max|Bob|Danny|Paul)$/i;
    let netBad = false;   // 線上語音念失敗過（網路不通），這次開網頁改用本機語音
    let main = null, male = null, female = null;
    const score = (v) => {
      let s = /^en[-_]US/i.test(v.lang) ? 10 : /^en[-_]GB/i.test(v.lang) ? 6 : 3;
      if (/(Natural|Neural|Online|Enhanced|Premium|Siri)/i.test(v.name)) s += 50;
      else if (/^Google/i.test(v.name)) s += 40;
      else if (/\b(Samantha|Ava|Allison|Susan|Nicky|Zoe|Evan|Nathan|Tom|Aaron|Joelle|Noelle)\b/i.test(v.name)) s += 30;
      if (LEGACY.test(v.name)) s -= 20;
      if (v.localService) s += 1;
      return s;
    };
    const pick = () => {
      const online = navigator.onLine !== false && !netBad;
      const en = speechSynthesis.getVoices()
        .filter((v) => /^en([-_]|$)/i.test(v.lang) && !NOVELTY.test(v.name) && (online || v.localService))
        .sort((a, b) => score(b) - score(a));
      main = en[0] || null;
      const us = en.filter((v) => /^en[-_]US/i.test(v.lang) && !LEGACY.test(v.name));
      male = us.find((v) => MALE.test(v.name)) || null;
      female = us.find((v) => !MALE.test(v.name)) || null;
    };
    if (ok) {
      pick();
      speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', pick);
      addEventListener('online', pick); addEventListener('offline', pick);
    }
    // 某個說話者用哪個聲音：男生配男聲、女生配女聲；裝置沒有就用主要聲音改音調
    const styleFor = (who) => {
      if (!who) return { voice: main, pitch: 1 };
      const mainMale = !!main && MALE.test(main.name);
      if (BOYS.test(who)) return male ? { voice: male, pitch: 1 } : { voice: main, pitch: mainMale ? 1 : 0.7 };
      return female ? { voice: female, pitch: 1 } : { voice: main, pitch: mainMale ? 1.25 : 1 };
    };
    // "Kevin: I cleaned… Amy: I visited…" → [{who:'Kevin', text:'I cleaned…'}, {who:'Amy', text:'I visited…'}]
    const turns = (text) => {
      const p = text.split(/(?:^|\s)([A-Z][a-z]+):\s+/);
      if (p.length < 3) return [{ who: '', text }];
      const out = p[0].trim() ? [{ who: '', text: p[0].trim() }] : [];
      for (let i = 1; i < p.length; i += 2) if (p[i + 1] && p[i + 1].trim()) out.push({ who: p[i], text: p[i + 1].trim() });
      return out;
    };
    let lit = null, seq = 0, keep = [];
    const off = () => { if (lit) lit.classList.remove('on'); lit = null; };
    function stop() { seq++; keep = []; if (ok) speechSynthesis.cancel(); off(); }
    // opt.words：慢速播放時句子一字一字念（每個字分開排進佇列，字和字之間自然停頓），單字和兩個字的片語照常念
    function speak(text, rate, btn, opt = {}) {
      if (!ok || !text) return;
      stop(); pick();
      const my = seq;
      let list = turns(text);
      if (opt.words) list = list.flatMap((t) => {
        const w = t.text.split(/\s+/).filter(Boolean);
        return w.length >= 3 ? w.map((x) => ({ who: t.who, text: x, word: true })) : [t];
      });
      if (btn) { lit = btn; btn.classList.add('on'); }
      // 每一段都在按按鈕當下排進佇列（iPad 只准按按鈕時出聲，不能等上一段念完才 speak）
      keep = list.map((t, i) => {
        const st = styleFor(t.who);
        const u = new SpeechSynthesisUtterance(t.text);
        if (st.voice) { u.voice = st.voice; u.lang = st.voice.lang; } else u.lang = 'en-US';
        u.rate = t.word ? Math.max(rate || 0.85, 0.8) : rate || 0.85;   // 一字一字念時單字本身不用拖太慢
        u.pitch = st.pitch;
        u.onend = () => { if (my === seq && i === list.length - 1) off(); };
        u.onerror = (e) => {
          if (my !== seq || e.error === 'canceled' || e.error === 'interrupted') return;
          if (st.voice && !st.voice.localService && !opt.retry) { netBad = true; speak(text, rate, btn, { ...opt, retry: true }); return; }
          off();
        };
        return u;
      });
      keep.forEach((u) => speechSynthesis.speak(u));
    }
    // 只剩舊版或沒有清楚語音時，畫面提醒（語音還沒載入時先不判斷）
    const poor = () => ok && !!main && (LEGACY.test(main.name) || score(main) < 10);
    return { ok, speak, stop, poor };
  })();
  const isListen = (a) => !!a && (typeof a.listen === 'string' || a.speakOptions === true);
  // 聽力附件：播放、慢速播放；speakOptions 時每個選項 A～D 都能點來聽；答對後才顯示念的內容
  function listenHTML(a, q, solved) {
    const rate = a.rate || 0.85, slow = Math.max(0.5, Math.round(rate * 70) / 100);
    return `<div class="attach listen"><div class="attach-hd">${ICON.speaker} 聽力</div><div class="listen-body">
      ${a.listen ? `<div class="say-row"><button class="btn gold say" type="button" data-say="main" data-rate="${rate}">${ICON.speaker} 播放</button>
        <button class="btn say" type="button" data-say="main" data-rate="${slow}" data-words="1">慢速播放</button></div>
        <p class="listen-tip">可以重複播放，聽清楚再作答。</p>` : ''}
      ${a.speakOptions ? `<div class="say-opts"><span>點選項聽聽看</span>${q.options.map((_, k) =>
        `<button class="say-k" type="button" data-say="opt" data-k="${k}" aria-label="念出選項 ${'ABCD'[k]}">${ICON.speaker}<b>${'ABCD'[k]}</b></button>`).join('')}</div>` : ''}
      ${Say.ok ? (Say.poor() ? '<p class="listen-warn">這台裝置的英語語音比較不清楚。聽不清楚可以按「慢速播放」，或換一台有網路的裝置。</p>' : '')
        : '<p class="listen-warn">這台裝置不能播放語音。請換一台裝置，或請老師念給你聽。</p>'}
      ${solved && a.listen ? `<p class="listen-script"><b>剛剛念的是：</b><span lang="en">${esc(a.listen)}</span></p>` : ''}
    </div></div>`;
  }

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
    // 表格、條列可帶 cap（資料標題），顯示在「資料」後面
    const capHTML = a.cap ? `<div class="attach-cap">${esc(a.cap)}</div>` : '';
    if (Array.isArray(a.t)) {
      const [head, ...rows] = a.t;
      return `<div class="attach"><div class="attach-hd">${ICON.book} 資料</div>${capHTML}<div class="table-wrap"><table>
        <thead><tr>${head.map((c) => `<th>${rich(c)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
    }
    if (Array.isArray(a.list)) {
      return `<div class="attach"><div class="attach-hd">${ICON.book} 資料</div>${capHTML}<ul>${a.list.map((x) => `<li>${rich(x)}</li>`).join('')}</ul></div>`;
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
    const star = levels.filter((l) => Engine.levelSummary(state, book.id, l).star).length;
    if (zi.final && !finalOpen(book, zi)) {
      const { have, need } = badgeCount(book);
      return have >= need ? '建造中' : `徽章 ${have}／${need}`;
    }
    return levels.length ? `精熟 ${star}／${levels.length} 關` : '尚未開放';
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
          levels: sums.map((x) => ({ state: x.star ? 'done' : x.done || x.okCount ? 'going' : 'todo' })),
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
        <span class="cover"><small>${esc(b.pub)}</small><b>${pairs(b.title)}</b>
          ${i === 0 ? '<img class="art" src="img/zone/castle.webp" alt="">' : ''}
          <span class="prog"><span class="bar"><i style="width:${Math.min(100, done * 6)}%"></i></span><em>已過關 ${done} 關 · ${exp} EXP</em></span></span></a>`;
    }).join('');
    app.innerHTML = `
      <section class="title-screen">
        <div class="logo">
          <span class="kicker">${ICON.crown} 溪口國小</span>
          <h1 class="logotype" data-text="溪口練功王國">溪口練功王國</h1>
          <p class="tagline">選一本課本，展開你的冒險</p>
          <button class="hero-chip" id="heroChip" type="button"><img src="${heroImg()}" alt=""><span><small>你的夥伴</small><b>${esc(heroName())}</b></span><em>${ICON.hero} 換角色</em></button>
          ${Save.user ? '' : `<button class="login-chip" id="homeLogin" type="button">${G_ICON}<span><b>登入學校帳號</b><small>現在沒登入，進度只存在這台裝置</small></span></button>`}
        </div>
        <div>
          <div class="shelf">${books}<div class="book soon"><span class="pages"></span><span class="cover"><small>準備中</small><b>${pairs('更多課本')}</b><span class="prog"><em>敬請期待</em></span></span></div></div>
          <p class="title-foot">題目內容皆為原創 · ${Save.user ? `進度存在雲端（${esc(Save.user.name)}）` : '進度只存在這台裝置'}</p>
        </div>
      </section>`;
    $('#heroChip').onclick = () => openHeroPick();
    // 沒登入的人：首頁就看得到登入的入口，不用去選單找
    if ($('#homeLogin')) $('#homeLogin').onclick = () => openLogin();
    // 一進站先選角色（共用的 iPad：每次打開網站，下一位同學都可以重選），選好了再問要不要登入
    let asked = false;
    try { asked = sessionStorage.getItem('xk-hero-asked') === '1'; sessionStorage.setItem('xk-hero-asked', '1'); } catch { asked = true; }
    if (!asked) openHeroPick(true, () => { if (!Save.user) openLogin(true); });
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
    // 精熟＝金獎盃；過關但還沒精熟＝提醒再練一次
    const cls = sum.star ? 'done' : sum.done ? 'going passed' : sum.okCount ? 'going' : 'todo';
    const st = sum.star ? `${ICON.trophy}<span>精熟</span><small>${sum.firstCount * Engine.EXP_PER_Q} EXP</small>`
      : sum.done ? `<span>已過關</span><small>再練拿精熟</small>`
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
            : soon ? `這一區還有 ${soon} 關尚未開放。全部開放、每一關都精熟後，就能拿到「${esc(zi.name)}」的徽章。`
            : `把這一區的 ${levels.length} 關都練到精熟（第一次就答對 ${Engine.masterNeed(levels[0].q.length)} 題以上），就能拿到「${esc(zi.name)}」的徽章。`}</span></div>
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
    const late = Engine.syncBadges(state, book);       // 別台裝置的進度併進來後，整區都過了：補發徽章
    if (late.length) {
      Save.save(state, { now: true });
      toast(`${ICON.shield} 補發徽章：${late.map((i) => '「' + esc(zoneName(book, i)) + '」').join('')}`);
    }
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
          <li><span class="ico shield">${ICON.gem}</span>共 ${level.q.length} 題，${qTagRule(book)}。</li>
          <li><span class="ico gold">${ICON.jewel}</span>第一次作答就答對 +${Engine.EXP_PER_Q} EXP；答錯不扣分，等 ${Engine.LOCK_MS / 1000} 秒可以再選。</li>
          <li><span class="ico jade">${ICON.bulb}</span>每題有 3 段提示，看提示不扣 EXP。同一題錯兩次，要先看提示才能再選。</li>
          <li><span class="ico gold">${ICON.trophy}</span>第一次就答對 ${Engine.masterNeed(level.q.length)} 題以上就是「精熟」。這一區每一關都精熟，才拿得到徽章。</li>
        </ul>
        <div>${gemsHTML(book, level)}</div>${gemLegend}
        ${level.draft ? `<p class="banner draft">${ICON.book}<span>這一關是草稿，老師抽驗通過後才是正式版。題目有錯請告訴老師。</span></p>` : ''}
        ${sum.star ? `<p class="banner">${ICON.trophy}<span>你已經精熟這一關了，這次是複習，不會再加 EXP。</span></p>`
          : sum.done ? `<p class="banner">${ICON.trophy}<span>你已經過關，但還沒精熟。這次第一次就答對 ${Engine.masterNeed(level.q.length)} 題以上，就能拿到精熟（不會再加 EXP）。</span></p>` : ''}
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
  function hintButton(shown, must) {
    const left = Engine.HINTS_PER_Q - shown;
    return `<button class="btn hintbtn${must ? ' must' : ''}" id="hint" type="button">${ICON.bulb} 看提示 ${shown + 1}／${Engine.HINTS_PER_Q}
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
    // 防亂點：答錯後先鎖 2 秒；同一題錯兩次以上，要先打開提示才能再選
    const mustHint = !solved && Engine.needHint(run);
    const wait = solved || mustHint ? 0 : Math.max(0, run.lockUntil - Date.now());
    const hold = mustHint || wait > 0;
    const opts = q.options.map((o, k) => {
      const isWrong = wrong.includes(o), isRight = solved && o === q.answer;
      const cls = (isRight ? 'right' : isWrong ? 'wrong' : hold ? 'hold' : '') + (o === picked ? ' just' : '');
      return `<button class="opt ${cls}" data-k="${k}" type="button" ${solved || isWrong || hold ? 'disabled' : ''}><span class="key">${'ABCD'[k]}</span><span class="t">${rich(o)}</span></button>`;
    }).join('');
    const hints = q.hints.slice(0, shown).map((h, k) => `<li><span class="hn">${k + 1}</span><b>提示 ${k + 1}</b>${rich(h)}</li>`).join('');
    let fb = '';
    if (feedback && feedback.ok) {
      fb = `<div class="fb ok"><b>答對了！</b>${feedback.gained ? `<span class="gain">${ICON.jewel} +${feedback.gained} EXP</span>`
        : run.review ? '<span class="sub">複習模式不加 EXP</span>' : '<span class="sub">重試答對不加 EXP，但你學會了！</span>'}</div>`;
    } else if (mustHint) {
      fb = `<div class="fb no"><b>先看提示，再選一次。</b><span class="sub">這一題已經答錯 ${wrong.length} 次了。按下面的「看提示」，讀完再想想。</span></div>`;
    } else if (feedback) {
      fb = `<div class="fb no"><b>再想想看。</b><span class="sub">${wait ? `<span id="waitTxt">等 ${Engine.LOCK_MS / 1000} 秒才能再選。</span>` : ''}${shown < Engine.HINTS_PER_Q ? '卡住的話，可以打開提示。' : '把提示再讀一次，回頭看看題目的條件。'}</span>${wait ? `<span class="lockbar" aria-hidden="true"><i style="animation-duration:${wait}ms"></i></span>` : ''}</div>`;
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
          <div class="qhd">${qTagOf(book, i) ? `<span class="tag lit">${esc(qTagOf(book, i))}</span>` : ''}${level.draft ? '<span class="tag draft">草稿・待抽驗</span>' : ''}<span class="qcount">${run.ok.filter(Boolean).length}／${run.ok.length} 題答對</span></div>
          ${isListen(q.attach) ? listenHTML(q.attach, q, solved) : attachHTML(q.attach)}
          <p class="stem">${rich(q.stem)}</p>
          <div class="opts${short ? ' two' : ''}">${opts}</div>
          <div aria-live="polite">${fb}</div>
          ${solved ? `<div class="explain"><div class="attach-hd">${ICON.book} 詳解</div>${explainHTML(q.explain)}</div>` : ''}
          <div class="hints">
            ${hints ? `<ol>${hints}</ol>` : ''}
            ${!solved && shown < Engine.HINTS_PER_Q ? hintButton(shown, mustHint) : ''}
          </div>
          ${solved ? `<div class="nextrow"><button class="btn gold big" id="next" type="button">${nextLeft ? '下一題' : '看結算'} ${ICON.go}</button></div>` : ''}
        </section>
      </div>`;

    app.querySelectorAll('.opt').forEach((btn) => {
      btn.onclick = () => {
        const text = q.options[+btn.dataset.k];
        const rect = btn.getBoundingClientRect();
        const res = Engine.answer(state, run, text);
        if (res.blocked) return;
        persist();
        renderQuestion(book, res, text);
        updateTop(book);
        if (res.gained) flyExp(rect, '+' + res.gained);
        if (res.ok) { const el = $('.explain'); if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150); }
      };
    });
    if (wait > 0) {
      // 時間到：把還能選的選項打開（題目沒換、也沒有再答錯才動）
      const r = run, until = run.lockUntil;
      setTimeout(() => {
        if (run !== r || r.lockUntil !== until || r.index !== i || r.ok[i]) return;
        app.querySelectorAll('.opt.hold').forEach((b) => { b.disabled = false; b.classList.remove('hold'); });
        app.querySelectorAll('#waitTxt, .lockbar').forEach((el) => el.remove());
      }, wait + 30);
    }
    app.querySelectorAll('[data-say]').forEach((b) => {
      b.onclick = () => Say.speak(b.dataset.say === 'opt' ? plain(q.options[+b.dataset.k]) : q.attach.listen,
        +b.dataset.rate || q.attach.rate, b, { words: b.dataset.words === '1' });
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
      Say.stop();
      if (Engine.next(run)) { Engine.enterQuestion(run); renderQuestion(book); window.scrollTo(0, 0); }
      else finishRun(book);
    };
    $('#quit').onclick = () => { Say.stop(); run = null; location.hash = '#/b/' + book.id + '/z/' + level.z; };
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
    Save.save(state, { now: true }); updateTop(book);
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
          ${res.star ? `<div class="ribbon gold">${ICON.trophy} 精熟過關！</div>` : '<div class="ribbon">過關了，還沒精熟</div>'}
          <div class="hero-wrap">${res.star ? '<div class="rays" aria-hidden="true"></div>' : ''}<img class="hero-img" src="${heroImg()}" alt=""></div>
          <h2>${esc(r.level.name)}</h2>
          ${gemsHTML(book, r.level)}${gemLegend}
          <div class="stats">
            <div class="hot"><small>這次獲得</small><b>+${r.expGained}</b><span>EXP</span></div>
            <div><small>${r.review ? '這次第一次就答對' : '第一次就答對'}</small><b>${res.firstNow}／${sum.total}</b><span>題</span></div>
            <div><small>提示使用</small><b>${r.hintsUsed}</b><span>次</span></div>
            <div><small>這本書累計</small><b>${bstate.exp}</b><span>EXP</span></div>
          </div>
          ${res.star ? (res.newlyStar ? `<p class="banner">${ICON.trophy}<span>第一次就答對 ${res.firstNow} 題，這一關精熟了！</span></p>` : '')
            : `<p class="banner">${ICON.bulb}<span>這次第一次就答對 ${res.firstNow} 題。再練一次，第一次就答對 <b>${res.need} 題以上</b>就是精熟；這一區每一關都精熟，才拿得到徽章。</span></p>`}
          ${r.review ? `<p class="banner">${ICON.jewel}<span>複習模式：EXP 以第一次闖關為準。</span></p>` : ''}
          ${res.badge !== null ? `<div class="badge-get">${medalHTML(book, Engine.zoneInfo(book, res.badge), 'big')}
            <p>恭喜！你拿到了<b>「${esc(zoneName(book, res.badge))}」的徽章</b>回到地圖，看看旗子升起來！</p></div>` : ''}
          <div class="row">
            <a class="btn${res.star ? ' gold big' : ''}" href="#/b/${book.id}/z/${r.level.z}">${ICON.back} 回到${esc(zi.name)}</a>
            <a class="btn${res.star ? '' : ' gold big'}" id="again" href="#/p/${book.id}/${encodeURIComponent(r.level.id)}">${res.star ? '再練一次' : `${ICON.sword} 再練一次拿精熟`}</a>
          </div>
        </section>
      </div>`;
    $('#again').onclick = (e) => { e.preventDefault(); renderIntro(book, r.level); };
    run = null;
    window.scrollTo(0, 0);
    if (res.star) confetti(res.badge !== null ? 140 : 80);      // 彩帶留給精熟
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

  /* ---------- 選角色：貓劍士或兔探險家（記在這台裝置上；3D 地圖、結算畫面都用它） ---------- */
  const HERO_KEY = 'xk-hero';
  const HEROES = [
    { id: 'cat', name: '貓劍士', desc: '灰白虎斑貓，戴小圓帽、背木劍' },
    { id: 'rabbit', name: '兔探險家', desc: '米白兔子，圍圍巾、拿著地圖' },
  ];
  function heroId() { try { return localStorage.getItem(HERO_KEY) === 'rabbit' ? 'rabbit' : 'cat'; } catch { return 'cat'; } }
  const heroImg = () => `img/hero-${heroId()}.webp`;
  const heroName = () => HEROES.find((h) => h.id === heroId()).name;
  /* after：視窗關掉（選好角色、按「先用…」或點旁邊）之後要做的事 */
  function openHeroPick(welcome, after) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const now = heroId();
    modal.innerHTML = `<section class="win heropick"><div class="ribbon">${ICON.hero} 選角色</div>
      <p class="sum">${welcome ? '歡迎！先' : ''}選一位夥伴陪你闖關<small>選好的角色只記在這台裝置上</small></p>
      <div class="heroes">${HEROES.map((h) => `<button class="hcard${h.id === now ? ' on' : ''}" type="button" data-hero="${h.id}" aria-pressed="${h.id === now}">
        <img src="img/hero-${h.id}.webp" alt=""><b>${esc(h.name)}</b><small>${esc(h.desc)}</small>${h.id === now ? `<span class="now">${ICON.check} 目前</span>` : ''}</button>`).join('')}</div>
      <button class="btn wide" type="button" id="hpClose">${welcome ? '先用' + esc(heroName()) : '關閉'}</button></section>`;
    document.body.appendChild(modal);
    const close = () => { modal.remove(); if (after) after(); };
    modal.addEventListener('click', (e) => {
      const c = e.target.closest('[data-hero]');
      if (c) {
        try { localStorage.setItem(HERO_KEY, c.dataset.hero); } catch { /* 私密模式：這次有效就好 */ }
        if (world && world.setHero) world.setHero(c.dataset.hero);
        document.querySelectorAll('.hero-img, #heroChip img').forEach((img) => { img.src = heroImg(); });
        const chipName = $('#heroChip b');
        if (chipName) chipName.textContent = heroName();
        close();
        return;
      }
      if (e.target === modal || e.target.closest('#hpClose')) close();
    });
    $('.hcard.on', modal).focus();
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
    setupAcct();
    const hp = $('#heroPickBtn');
    hp.innerHTML = `${ICON.hero} 換角色（貓劍士／兔探險家）`;
    hp.onclick = () => { open(false); openHeroPick(); };
    const tb = $('#threeBtn');
    tb.innerHTML = `${ICON.gem} 3D 地圖：${threeOff() ? '關（點一下打開）' : '開（點一下改成平面，比較省電）'}`;
    tb.onclick = () => {
      try { if (threeOff()) localStorage.removeItem(THREE_OFF); else localStorage.setItem(THREE_OFF, '1'); localStorage.removeItem('xk-3d-quality'); } catch { /* 略過 */ }
      location.reload();
    };
    $('#clearBtn').onclick = async () => {
      open(false);
      if (!confirm(Save.user
        ? `要清除 ${Save.user.email} 的所有闖關進度嗎？\n雲端和其他裝置上的也會一起清掉，EXP 和徽章都會歸零，不能復原。`
        : '要清除這台裝置上的所有闖關進度嗎？EXP 和徽章都會歸零，不能復原。')) return;
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

  /* ---------- 登入：學校 Google 帳號（進度存雲端）或先不登入（只存這台裝置） ---------- */
  const G_ICON = '<svg class="i g" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.4 5.7c4.3-4 6.9-9.9 6.9-17.2z"/><path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.2C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.8z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4.2-13.5-10l-7.9 6.2C6.6 42.6 14.6 48 24 48z"/></svg>';
  const LOGIN_ERR = {
    domain: '這不是學校帳號。學生請用 <b>@st.skps.tp.edu.tw</b> 的帳號登入。',
    'auth/unauthorized-domain': '這個網址還沒加進 Firebase 的「授權網域」，請告訴老師。',
    'auth/network-request-failed': '網路不通，請確認連上網路再試一次。',
    'auth/too-many-requests': '試太多次了，請等一下再試。',
  };
  /* 登入視窗：開站先到首頁，選好角色後跳出來；首頁和選單的「登入學校帳號」也會打開它。
     welcome＝剛選好角色。按「先不登入」就關掉，照樣在首頁玩（進度只存在這台裝置）。 */
  let loginOpen = false;
  function openLogin(welcome) {
    if (loginOpen || Save.user) return;
    loginOpen = true;
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<section class="win login"><div class="ribbon">${ICON.hero} 登入學校帳號</div>
      <p class="login-lead">${welcome ? `${esc(heroName())}準備好了！<br>` : ''}登入以後，進度會存到雲端</p>
      <button class="btn gold big wide" id="loginBtn" type="button" disabled>${G_ICON}<span>準備中…</span></button>
      <p class="login-tip">學生請用 <b>@st.skps.tp.edu.tw</b> 的帳號<br>換一台平板登入，進度也會跟著你</p>
      <p class="login-err" id="loginErr" hidden></p>
      <button class="login-guest" id="guestBtn" type="button">先不登入（進度只存在這台裝置）</button></section>`;
    document.body.appendChild(modal);
    const close = () => { modal.remove(); loginOpen = false; };
    const btn = $('#loginBtn', modal), err = $('#loginErr', modal);
    const label = (t) => { btn.querySelector('span').innerHTML = t.replace(/帳號登入$/, '<span class="nw">帳號登入</span>'); };
    const say = (html) => { err.innerHTML = html; err.hidden = !html; };
    Save.prepare().then(() => { btn.disabled = false; label('用學校 Google 帳號登入'); })
      .catch(() => { label('連不上登入服務'); say('連不上登入服務。請確認網路後重新整理，或先不登入。'); });
    btn.onclick = async () => {
      btn.disabled = true; label('登入中…'); say('');
      try {
        const u = await Save.signIn();
        if (u) { close(); await afterLogin(); return; }
      } catch (e) {
        console.warn(e);
        if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
          say(LOGIN_ERR[e.code] || `登入沒有成功（${esc(e.code || e.message)}）。可以再試一次，或先不登入。`);
        }
      }
      btn.disabled = false; label('用學校 Google 帳號登入');
    };
    $('#guestBtn', modal).onclick = () => { Save.useGuest(); close(); };
    btn.focus();
  }

  // 登入成功：換成這個帳號的進度，選單改成「登出」，畫面重畫
  async function afterLogin() {
    state = await Save.load();
    run = null;
    setupAcct();
    toast(`${ICON.hero} 已登入：${esc(Save.user.name)}，進度會存到雲端`);
    await checkGuest();
    route();
  }

  // 選單裡的「登入／登出」（登入之後要重設一次）
  function setupAcct() {
    const ab = $('#acctBtn');
    const closeMenu = () => { $('#menu').hidden = true; $('#menuBtn').setAttribute('aria-expanded', 'false'); };
    $('#clearBtn').hidden = !!Save.user;
    if (Save.user) {
      ab.innerHTML = `${ICON.hero} 登出（${esc(Save.user.name)}）`;
      ab.onclick = async () => {
        closeMenu();
        if (!confirm(`要登出 ${Save.user.email} 嗎？\n進度已經存在雲端，下次登入就會回來。`)) return;
        let r = await Save.signOut();
        if (r === 'unsaved') {
          if (!confirm('網路好像不通，最近幾題的進度還沒存到雲端。\n現在登出，這幾題要重做。仍要登出嗎？')) return;
          r = await Save.signOut(true);
        }
        location.hash = '#/';
        location.reload();
      };
    } else {
      ab.innerHTML = `${ICON.hero} 登入學校帳號（進度存到雲端）`;
      ab.onclick = () => { closeMenu(); openLogin(); };
    }
  }

  /* 登入後，這台裝置上還留著沒登入時玩的進度：先問是不是本人玩的，不自動併進帳號
     （電腦教室、家裡共用的電腦，那份可能是前一個人玩的）。 */
  async function checkGuest() {
    const g = Save.guestLeft;
    if (!g) return;
    const s = await new Promise((done) => {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `<section class="win login guestask"><div class="ribbon">${ICON.bulb} 這台裝置上有一份進度</div>
        <p class="login-tip">有人在這台裝置<b>沒登入</b>就玩過：</p>
        <p class="guest-sum"><span>答對 <b>${g.ok}</b> 題</span><span>過關 <b>${g.done}</b> 關</span><span><b>${g.exp}</b> EXP</span></p>
        <p class="login-tip"><b>${esc(Save.user.name)}</b>，這是你玩的嗎？</p>
        <button class="btn gold big wide" id="guestYes" type="button">是我玩的，存進帳號</button>
        <button class="btn wide" id="guestNo" type="button">不是我玩的</button>
        <p class="guest-note">選「不是我玩的」，那份進度會留在這台裝置，不會進到你的帳號。</p></section>`;
      document.body.appendChild(modal);
      const pick = async (mine) => {
        modal.querySelectorAll('.btn').forEach((b) => { b.disabled = true; });
        const r = await Save.takeGuest(mine);
        modal.remove();
        done(r);
      };
      $('#guestYes', modal).onclick = () => pick(true);
      $('#guestNo', modal).onclick = () => pick(false);
    });
    if (s) state = s;
  }

  async function start() {
    const worldP = waitWorld();
    await Save.init();
    state = await Save.load();
    await checkGuest();      // 整頁跳轉登入回來時，才會在這裡遇到
    // 同一個帳號在別台裝置玩過：存檔層已經把那邊的進度併進來，這裡換上新的進度。
    // 正在闖關或看結算就不打斷（下次換畫面就會看到）；在首頁或地圖就重畫。
    Save.onChange = (s) => {
      state = s;
      if (run || location.hash.startsWith('#/p/')) return;
      toast('已經把你在其他裝置的進度合併進來了');
      route();
    };
    setupMenu();
    setupKeys();
    world = await worldP;
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
