/* 答題規則（照題目生成規格 §2，改規則只改這個檔案）
   - 每關 7 題、四選一；選項每次進題目都重新洗牌，判定用正解「文字」比對，不用位置。
   - EXP：每題「第一次作答就答對」+10；答錯不扣、可以重試，重試答對不加；重玩已過的關也不再加。
   - 提示：每題 3 段，要依序打開；看提示不扣 EXP，但次數會記下來（給老師端做教學診斷）。
   - 過關：7 題都答對過。
   - 精熟：一次闖關裡「第一次作答就答對」5 題以上（7 題的關；題數不同照比例）。
     第一次闖關沒達到，可以「再練一次」：複習那一次第一次就答對 5 題以上也算。精熟不影響 EXP。
   - 防亂點：答錯後 2 秒內不能再選；同一題錯第 2 次起，要先打開提示才能再選
     （錯 2 次要看過 1 段、錯 3 次要看過 2 段）。
   - 徽章：一個區域（＝一個單元）「資料裡有題目的關」全部精熟就頒發；已經拿到的徽章不會收回。
     （目前質數礦坑只有 2 關資料；之後補關卡，這裡自然就變成整區的判定，不用改程式。）
     程式裡的變數還叫 island／badges，是 P1 留下的名字，意思就是「區域」和「徽章」。

   題目位置陣列：[題幹, 正解, [干擾項×3], [提示×3], 詳解, 附件?] */
(function () {
  const EXP_PER_Q = 10;
  const HINTS_PER_Q = 3;
  const LOCK_MS = 2000;             // 答錯後多久不能再選
  const MASTER_OF_7 = 5;            // 7 題裡第一次就答對幾題算精熟

  // 這一關要第一次就答對幾題才算精熟
  const masterNeed = (total) => Math.max(1, Math.ceil(total * MASTER_OF_7 / 7));
  /* 這一關精熟了嗎：存檔裡有 star（闖關或複習時達到），
     或是加這條規則之前就過關、而且當時第一次就答對的題數夠（舊進度不用重玩）。 */
  function isMastered(l, total) {
    if (!l) return false;
    if (l.star === true) return true;
    return !!l.done && l.q.filter((x) => x.first === true).length >= masterNeed(total || l.q.length);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // 把位置陣列轉成有名字的物件，選項洗牌
  function view(q) {
    const [stem, answer, wrong, hints, explain, attach] = q;
    return { stem, answer, options: shuffle([answer, ...wrong]), hints, explain, attach: attach || null };
  }

  const playable = (level) => Array.isArray(level.q) && level.q.length > 0;

  function bookState(state, bookId) {
    if (!state.books[bookId]) state.books[bookId] = { exp: 0, badges: {}, levels: {} };
    return state.books[bookId];
  }

  function levelState(state, bookId, level) {
    const b = bookState(state, bookId);
    let l = b.levels[level.id];
    if (!l) l = b.levels[level.id] = { done: false, doneAt: 0, q: [] };
    while (l.q.length < level.q.length) l.q.push({ first: null, ok: false, hints: 0 });
    return l;
  }

  function recalcExp(state, bookId) {
    const b = bookState(state, bookId);
    let n = 0;
    for (const l of Object.values(b.levels)) for (const q of l.q) if (q.first === true) n++;
    b.exp = n * EXP_PER_Q;
    return b.exp;
  }

  /* 一次闖關：
     - 沒過的關：從第一題還沒答對的地方接著做，之前答對的保留。
     - 過了的關：複習模式，從第 1 題重新來，答對與否不影響已拿到的 EXP。 */
  function startRun(state, bookId, level) {
    const saved = levelState(state, bookId, level);
    const review = saved.done;
    const ok = review ? level.q.map(() => false) : saved.q.map((x) => x.ok);
    const first = ok.indexOf(false);
    return {
      bookId, level, review,
      ok,                                   // 這次闖關中，每題是否已答對
      index: first === -1 ? 0 : first,      // 目前題號（0 起算）
      shown: level.q.map(() => 0),          // 這次每題打開了幾段提示
      wrongPicks: level.q.map(() => []),    // 這次每題選錯過的選項（畫面上變灰）
      tries: level.q.map(() => null),       // 這次每題第一次作答對不對（null＝這次還沒答；複習時用來算精熟）
      lockUntil: 0,                         // 答錯後，到這個時間之前不能再選
      expGained: 0,
      hintsUsed: 0,
      current: null,
    };
  }

  function enterQuestion(run) {
    run.current = view(run.level.q[run.index]);
    return run.current;
  }

  // 同一題錯了兩次以上：要先打開提示才能再選（錯 2 次要看過 1 段、錯 3 次要看過 2 段）
  function needHint(run) {
    const i = run.index;
    if (run.ok[i]) return false;
    const wrong = run.wrongPicks[i].length;
    const have = Math.min(HINTS_PER_Q, (run.level.q[i][3] || []).length);
    return wrong >= 2 && run.shown[i] < Math.min(have, wrong - 1);
  }

  // 作答：回傳 { ok, gained }；還在鎖定、或要先看提示時回傳 { blocked: true }，不算作答
  function answer(state, run, text) {
    if (Date.now() < run.lockUntil || needHint(run)) return { ok: false, gained: 0, blocked: true };
    const qState = levelState(state, run.bookId, run.level).q[run.index];
    const ok = text === run.current.answer;
    if (run.tries[run.index] === null) run.tries[run.index] = ok;
    let gained = 0;
    if (qState.first === null) {
      qState.first = ok;
      if (ok) gained = EXP_PER_Q;
    }
    if (ok) {
      qState.ok = true;
      run.ok[run.index] = true;
    } else {
      if (!run.wrongPicks[run.index].includes(text)) run.wrongPicks[run.index].push(text);
      run.lockUntil = Date.now() + LOCK_MS;
    }
    run.expGained += gained;
    recalcExp(state, run.bookId);
    return { ok, gained };
  }

  // 打開下一段提示：回傳打開後的段數；已經 3 段就不動
  function revealHint(state, run) {
    const i = run.index;
    if (run.shown[i] >= HINTS_PER_Q) return run.shown[i];
    run.shown[i]++;
    run.hintsUsed++;
    levelState(state, run.bookId, run.level).q[i].hints++;
    return run.shown[i];
  }

  // 下一題：回傳 false 表示這關已經全部答對
  function next(run) {
    const n = run.ok.length;
    for (let step = 1; step <= n; step++) {
      const j = (run.index + step) % n;
      if (!run.ok[j]) { run.index = j; return true; }
    }
    return false;
  }

  /* 過關結算：回傳 { newlyDone, star, newlyStar, firstNow, need, badge }
     star＝這一關現在是不是精熟、newlyStar＝這次才拿到、firstNow＝這次第一次就答對幾題、need＝精熟要幾題、
     badge＝這次新拿到的島索引，沒有就是 null */
  function finish(state, run, book) {
    const saved = levelState(state, run.bookId, run.level);
    const total = run.level.q.length, need = masterNeed(total);
    const was = isMastered(saved, total);
    let newlyDone = false;
    if (!saved.done && saved.q.every((x) => x.ok)) {
      saved.done = true;
      saved.doneAt = Date.now();
      newlyDone = true;
    }
    // 第一次闖關看存檔裡每題的 first（可能分好幾次做完）；複習看這一次的作答
    const firstNow = run.review ? run.tries.filter((x) => x === true).length : saved.q.filter((x) => x.first === true).length;
    if (saved.done && !saved.star && firstNow >= need) { saved.star = true; saved.starAt = Date.now(); }
    const star = isMastered(saved, total);
    const b = bookState(state, run.bookId);
    const z = run.level.z;
    let badge = null;
    if (!b.badges[z] && islandComplete(state, book, z)) {
      b.badges[z] = Date.now();
      badge = z;
    }
    return { newlyDone, star, newlyStar: star && !was, firstNow, need, badge };
  }

  /* 區域資料：zones 可以只寫名稱字串（舊格式），也可以寫
     { name: '質數礦坑', unit: '質因數分解和短除法', terrain: 'mine' }，
     最後的總複習區加 final: true（集滿前面各區的徽章才開放）。 */
  function zoneInfo(book, z) {
    const raw = book.zones[z];
    const info = typeof raw === 'string' ? { name: raw } : Object.assign({}, raw);
    info.index = z;
    info.final = !!info.final;
    info.no = info.final ? null : book.zones.slice(0, z + 1).filter((x) => !(x && x.final)).length;   // 第幾單元
    return info;
  }
  const regularZones = (book) => book.zones.map((_, z) => zoneInfo(book, z)).filter((zi) => !zi.final);

  function islandLevels(book, z) { return book.levels.filter((l) => l.z === z && playable(l)); }

  // 島章判定：資料裡這座島有題目的關都精熟了（P2 補滿之後就等於全島）
  function islandComplete(state, book, z) {
    const levels = islandLevels(book, z);
    if (!levels.length) return false;
    // 這一區還有列出課名、但沒有題目的關（尚未開放）：先不發徽章
    if (book.levels.some((l) => l.z === z && !playable(l))) return false;
    const b = state.books[book.id];
    return !!b && levels.every((l) => isMastered(b.levels[l.id], l.q.length));
  }

  /* 補發徽章：同一個人在兩台裝置各過了同一區的不同關，進度合併後整區都過了，
     但兩邊結算時都還沒到齊，所以沒人領到。回傳這次補發的區域索引。 */
  function syncBadges(state, book) {
    const b = state.books[book.id];
    const got = [];
    if (!b) return got;
    book.zones.forEach((_, z) => {
      if (!b.badges[z] && islandComplete(state, book, z)) { b.badges[z] = Date.now(); got.push(z); }
    });
    return got;
  }

  function levelSummary(state, bookId, level) {
    const l = state.books[bookId] && state.books[bookId].levels[level.id];
    const total = level.q ? level.q.length : 0;
    if (!l) return { done: false, star: false, okCount: 0, firstCount: 0, hints: 0, total };
    return {
      done: l.done,
      star: isMastered(l, total),
      okCount: l.q.filter((x) => x.ok).length,
      firstCount: l.q.filter((x) => x.first === true).length,
      hints: l.q.reduce((a, x) => a + x.hints, 0),
      total,
    };
  }

  window.Engine = {
    EXP_PER_Q, HINTS_PER_Q, LOCK_MS,
    shuffle, view, playable, startRun, enterQuestion, answer, needHint, masterNeed, revealHint, next, finish,
    zoneInfo, regularZones, islandLevels, islandComplete, syncBadges, levelSummary, recalcExp,
  };
})();
