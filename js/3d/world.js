/* 3D 王國地圖（主程式）
   畫面用一般的 HTML（ui.js），這裡只負責後面那一張 3D 地圖：
     title()        首頁：鏡頭在王國上空慢慢繞
     map({ z })     冒險地圖：可以拖曳、雙指縮放、點地方；z＝選到的區域
     play(z)        闖關中：鏡頭停在那一區，地圖停止更新（省電）
   ui.js 透過 window.World 呼叫；這個檔案載入失敗或裝置不能跑 3D 時，
   會發出 world-fail 事件，畫面改用平面地圖。
   選單裡可以把 3D 關掉（存在這台裝置的 localStorage：xk-3d-off）。 */
import { THREE, flowWater } from './kit.js';
import { makeLayout, buildLand } from './land.js';
import { buildLandmark, makeFlag, makeStone, signpost } from './landmarks.js';
import { buildHero } from './hero.js';

const OFF_KEY = 'xk-3d-off';
const QUALITY_KEY = 'xk-3d-quality';
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const PITCH = { map: 0.92, zone: 0.8, title: 0.5, play: 0.62 };

function fail(reason) {
  console.warn('3D 地圖沒有啟用：', reason);
  window.World = null;
  window.dispatchEvent(new CustomEvent('world-fail', { detail: String(reason) }));
}

function start() {
  try { if (localStorage.getItem(OFF_KEY) === '1') return fail('off'); } catch { /* 私密模式 */ }
  const holder = document.getElementById('world');
  const labelBox = document.getElementById('labels');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  } catch (e) { return fail(e); }
  if (!renderer.getContext()) return fail('no-webgl');

  /* ---------- 畫質：學校的 iPad 跑不動就自動降（只降不升） ---------- */
  const BASE_RATIO = Math.min(devicePixelRatio || 1, 2);
  let quality = 0;
  try { quality = Math.min(2, +localStorage.getItem(QUALITY_KEY) || 0); } catch { /* 略過 */ }
  const ratioFor = (q) => (q >= 2 ? 1 : q >= 1 ? Math.max(1, BASE_RATIO * 0.75) : BASE_RATIO);
  renderer.setPixelRatio(ratioFor(quality));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = quality < 2;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;   // 影子只在場景變的時候重算（風車、勇者等會動的東西不投影）
  holder.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = skyTexture();
  scene.fog = new THREE.Fog('#cfe5f6', 110, 290);   // 霧的距離跟著鏡頭遠近調（place 裡），遠山淡淡的
  const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.5, 700);
  const testCam = camera.clone();

  const hemi = new THREE.HemisphereLight('#e6f3ff', '#9a8562', 1.28);
  const amb = new THREE.AmbientLight('#ffffff', 0.35);
  const sun = new THREE.DirectionalLight('#ffecc8', 2.0);   // 午後偏暖的陽光
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.03;
  scene.add(hemi, amb, sun, sun.target);

  const S = {
    mode: 'idle', k: null, kingdoms: new Map(), sel: null, onSelect: null, focus: { kind: 'overview' },
    insets: { l: 0, r: 0, t: 0, b: 0 },
    cam: { x: 0, z: 0, d: 90, pitch: PITCH.title, yaw: 0, ox: 0, oy: 0 },
    goal: null, t: 0, raf: 0, last: 0, running: false, drag: null, vel: { x: 0, z: 0 }, still: 0,
    frames: [], bursts: [],
  };
  S.goal = Object.assign({}, S.cam);

  /* ---------- 鏡頭 ---------- */
  function fovFor(aspect) {
    const v = (2 * Math.atan(Math.tan((36 * Math.PI) / 360) / aspect) * 180) / Math.PI;
    return Math.min(58, Math.max(34, v));
  }
  function place(cam, c) {
    const cp = Math.cos(c.pitch), sp = Math.sin(c.pitch);
    cam.position.set(c.x + Math.sin(c.yaw) * cp * c.d, 1 + sp * c.d, c.z + Math.cos(c.yaw) * cp * c.d);
    cam.lookAt(c.x, 1, c.z);
    const w = innerWidth, h = innerHeight;
    cam.aspect = w / h;
    cam.fov = fovFor(cam.aspect);
    if (Math.abs(c.ox) > 0.5 || Math.abs(c.oy) > 0.5) cam.setViewOffset(w, h, c.ox, c.oy, w, h);
    else { cam.clearViewOffset(); }
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld();
    if (cam === camera) { scene.fog.near = c.d * 1.05 + 20; scene.fog.far = c.d * 2.6 + 90; }
  }
  const offsetFor = (ins) => {
    const w = innerWidth, h = innerHeight;
    return { ox: w / 2 - (ins.l + (w - ins.l - ins.r) / 2), oy: h / 2 - (ins.t + (h - ins.t - ins.b) / 2) };
  };
  const _v = new THREE.Vector3();
  // 找最近的距離，讓 pts 全部落在面板以外的空白區域裡
  function fit(x, z, pts, pitch, yaw, margin) {
    const { ox, oy } = offsetFor(S.insets), w = innerWidth, h = innerHeight, ins = S.insets;
    const mx = (w - ins.l - ins.r) * margin, my = (h - ins.t - ins.b) * margin;
    const x0 = ((ins.l + mx) / w) * 2 - 1, x1 = ((w - ins.r - mx) / w) * 2 - 1;
    const y0 = 1 - ((h - ins.b - my) / h) * 2, y1 = 1 - ((ins.t + my) / h) * 2;
    let lo = 10, hi = 420;
    for (let i = 0; i < 22; i++) {
      const d = (lo + hi) / 2;
      place(testCam, { x, z, d, pitch, yaw, ox, oy });
      let ok = true;
      for (const p of pts) {
        _v.copy(p).project(testCam);
        if (_v.z > 1 || _v.x < x0 || _v.x > x1 || _v.y < y0 || _v.y > y1) { ok = false; break; }
      }
      if (ok) hi = d; else lo = d;
    }
    return hi;
  }
  function refit(instant) {
    const k = S.k;
    if (!k) return;
    const off = offsetFor(S.insets);
    const g = S.goal;
    g.ox = off.ox; g.oy = off.oy;
    const f = S.focus;
    if (S.mode === 'title') {
      Object.assign(g, { x: k.center.x, z: k.center.z - 4, pitch: PITCH.title, ox: 0, oy: 0 });
      g.d = k.overviewD(PITCH.title, 0) * 0.72;
    } else if (S.mode === 'play') {
      const zn = k.zones.get(f.z);
      Object.assign(g, { x: zn.site.x, z: zn.site.z + 1.5, pitch: PITCH.play, yaw: 0.28, ox: 0, oy: 0 });
      g.d = zn.final ? 34 : 22;
    } else if (f.kind === 'zone' && k.zones.has(f.z)) {
      const zn = k.zones.get(f.z);
      g.yaw = 0; g.pitch = PITCH.zone;
      g.x = (zn.site.x + zn.plaza.x) / 2; g.z = (zn.site.z + zn.plaza.z) / 2;
      g.d = Math.max(24, fit(g.x, g.z, zn.box, g.pitch, 0, 0.04));
    } else if (f.kind === 'overview') {
      g.yaw = 0; g.pitch = PITCH.map;
      g.x = k.center.x; g.z = k.center.z;
      g.d = k.overviewD(g.pitch, 0);
    }
    clampGoal();
    if (instant || REDUCE) Object.assign(S.cam, g);
    wake();
  }
  function clampGoal() {
    const k = S.k, g = S.goal;
    if (!k || S.mode !== 'map') return;
    const b = k.bounds;
    g.x = Math.min(b.x1, Math.max(b.x0, g.x));
    g.z = Math.min(b.z1, Math.max(b.z0, g.z));
    g.d = Math.min(k.maxD, Math.max(16, g.d));
  }

  /* ---------- 建一個王國（一本書一個，建過的留著） ---------- */
  function buildKingdom(vm) {
    const layout = makeLayout(vm.zones);
    const land = buildLand(layout);
    const root = new THREE.Group();
    root.add(land.group);
    const zones = new Map(), pickables = [];
    for (const z of layout.zones) {
      const info = vm.zones.find((x) => x.index === z.index);
      const lm = buildLandmark(z.terrain);
      const y = land.height(z.site[0], z.site[1]);
      lm.group.position.set(z.site[0], y, z.site[1]);
      root.add(lm.group);
      const site = new THREE.Vector3(z.site[0], y, z.site[1]);
      const plaza = new THREE.Vector3(z.plaza[0], land.height(z.plaza[0], z.plaza[1]), z.plaza[1]);
      const plazaS = land.roadNear(z.plaza[0], z.plaza[1]);
      // 點選用的透明圓柱（地標＋廣場）
      for (const [p, r, h] of [[site, z.final ? 9 : 6.8, 14], [plaza, 4.8, 4]]) {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 10).translate(0, h / 2, 0), new THREE.MeshBasicMaterial());
        m.position.copy(p);
        m.updateMatrixWorld();
        m.userData.z = z.index;
        pickables.push(m);
      }
      // 這一區的範圍（鏡頭對焦用）
      const top = lm.top + 2.2;
      const box = [];
      for (const dx of [-7.5, 7.5]) for (const [dz, yy] of [[-7.5, 0], [-7.5, top], [7.5, 0]]) box.push(new THREE.Vector3(site.x + dx, site.y + yy, site.z + dz));
      for (const dx of [-4.5, 4.5]) for (const dz of [-2.5, 3.5]) box.push(new THREE.Vector3(plaza.x + dx, plaza.y, plaza.z + dz));
      // 標籤
      const label = document.createElement('button');
      label.type = 'button';
      label.className = 'mlabel';
      label.dataset.z = z.index;
      label.addEventListener('click', (e) => {
        e.stopPropagation();
        if (performance.now() - (S.dragAt || 0) < 350) return;   // 剛剛是在拖地圖
        if (S.onSelect) S.onSelect(z.index);
      });
      labelBox.appendChild(label);
      const lp = lm.flag && lm.flag[1] > 3 ? Math.max(lm.top, lm.flag[1] + 3.8) : lm.top;
      zones.set(z.index, {
        index: z.index, final: z.final, terrain: z.terrain, lm, site, plaza, plazaS, box, label,
        anchor: new THREE.Vector3(site.x, site.y + lp + 0.4, site.z), stones: [], flag: null, html: '', color: info && info.color,
      });
    }
    // 出發點路標
    const s0 = land.roadAt(0.5);
    const sign = signpost();
    sign.position.set(s0.x - 2.2, s0.y - 0.1, s0.z + 1.2);
    sign.rotation.y = 0.5;
    root.add(sign);
    // 往王城的大道兩旁：每一區一根旗桿，拿到那一區的徽章就升旗
    const banners = [];
    const fin = layout.castle && zones.get(layout.castle.index);
    if (fin) {
      const regular = layout.spots;
      const sA = zones.get(regular[regular.length - 1].index).plazaS + 5, sB = fin.plazaS - 2;
      const n = regular.length, rows = Math.ceil(n / 2);
      for (let i = 0; i < n; i++) {
        const row = Math.floor(i / 2), side = i % 2 ? 1 : -1;
        let s = sA + ((row + 0.5) / rows) * (sB - sA);
        if (land.bridges.some((b) => { const p = land.roadAt(s); return Math.hypot(p.x - b.x, p.z - b.z) < 4.5; })) s -= 4.6;
        const p = land.roadAt(s), l = Math.hypot(p.tx, p.tz) || 1;
        const info = vm.zones.find((x) => x.index === regular[i].index);
        const f = makeFlag(info ? info.color : '#888888', 3.0);
        f.group.position.set(p.x + (-p.tz / l) * side * 2.4, land.height(p.x + (-p.tz / l) * side * 2.4, p.z + (p.tx / l) * side * 2.4), p.z + (p.tx / l) * side * 2.4);
        f.group.rotation.y = side > 0 ? Math.PI : 0;
        f.show(false);
        root.add(f.group);
        banners.push({ z: regular[i].index, f });
      }
    }
    // 小勇者
    const hero = buildHero();
    root.add(hero.group);
    // 選到的區域外圈的光環
    const ring = new THREE.Mesh(new THREE.RingGeometry(7.0, 7.7, 56).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: '#ffe066', transparent: true, opacity: 0.85, depthWrite: false }));
    ring.visible = false;
    ring.renderOrder = 2;
    root.add(ring);

    const b = layout.bounds;
    const center = new THREE.Vector3((b.x0 + b.x1) / 2, 0, (b.z0 + b.z1) / 2);
    const allPts = [];
    for (const zn of zones.values()) allPts.push(zn.anchor.clone(), new THREE.Vector3(zn.site.x, 0, zn.site.z), new THREE.Vector3(zn.plaza.x, 0, zn.plaza.z + 2));
    allPts.push(new THREE.Vector3(s0.x - 3, 0, s0.z + 3));
    const k = {
      id: vm.id, layout, land, root, zones, pickables, banners, hero, ring, center, bounds: { x0: b.x0, x1: b.x1, z0: b.z0, z1: b.z1 },
      heroS: zones.get(layout.zones[0].index).plazaS, heroGoal: null, heroPhase: 0,
      overviewD: (pitch, yaw) => fit(center.x, center.z, allPts, pitch, yaw, 0.03),
      maxD: 200,
    };
    k.maxD = 1.2 * fit(center.x, center.z, allPts, PITCH.map, 0, 0);
    // 影子的範圍蓋住整個王國
    const span = Math.max(b.x1 - b.x0, b.z1 - b.z0) * 0.75 + 12;
    Object.assign(sun.shadow.camera, { left: -span, right: span, top: span, bottom: -span, near: 1, far: 320 });
    sun.shadow.camera.updateProjectionMatrix();
    return k;
  }

  /* ---------- 進度 → 地圖狀態（關卡石台、旗子、王城、標籤） ---------- */
  function apply(vm) {
    const k = S.k;
    if (!k) return;
    k.vm = vm;
    for (const zv of vm.zones) {
      const zn = k.zones.get(zv.index);
      if (!zn) continue;
      zn.color = zv.color;
      if (zv.label !== zn.html) { zn.label.innerHTML = zv.label; zn.html = zv.label; }
      zn.label.className = 'mlabel' + (zv.badge ? ' got' : '') + (zv.final ? ' final' : '') + (zv.locked ? ' locked' : '') + (S.sel === zv.index ? ' sel' : '');
      zn.label.style.setProperty('--acc', zv.color || '#5b7bff');
      zn.label.setAttribute('aria-label', zv.aria || '');
      // 關卡石台：沿著道路排在廣場兩邊
      const levels = zv.levels || [];
      while (zn.stones.length > levels.length) { const st = zn.stones.pop(); k.root.remove(st.group); }
      while (zn.stones.length < levels.length) { const st = makeStone(); k.root.add(st.group); zn.stones.push(st); }
      zn.stoneS = levels.map((_, i) => zn.plazaS + (i - (levels.length - 1) / 2) * 3.1);
      levels.forEach((lv, i) => {
        const st = zn.stones[i], p = k.land.roadAt(zn.stoneS[i]);
        st.group.position.set(p.x, p.y - 0.06, p.z);
        st.group.rotation.y = Math.atan2(p.tx, p.tz);
        st.set(lv.state, i === zv.next);
      });
      // 徽章旗
      if (zv.badge && !zn.flag && zn.lm.flag) {
        const f = makeFlag(zv.color || '#5b7bff');
        const [fx, fy, fz] = zn.lm.flag;
        f.group.position.set(zn.site.x + fx, zn.site.y + fy, zn.site.z + fz);
        k.root.add(f.group);
        zn.flag = f;
      } else if (!zv.badge && zn.flag) { k.root.remove(zn.flag.group); zn.flag = null; }
      if (zn.lm.setState) zn.lm.setState({ open: !zv.locked });
    }
    for (const bn of k.banners) {
      const zv = vm.zones.find((x) => x.index === bn.z);
      bn.f.show(!!(zv && zv.badge));
    }
    renderer.shadowMap.needsUpdate = true;
    wake();
  }

  /* ---------- 小勇者：沿著道路走到目標 ---------- */
  function heroGoalFor(z) {
    const k = S.k, zn = k && k.zones.get(z);
    if (!zn) return null;
    const zv = k.vm && k.vm.zones.find((x) => x.index === z);
    if (zv && zv.next >= 0 && zn.stoneS && zn.stoneS[zv.next] !== undefined) return { s: zn.stoneS[zv.next], onStone: true };
    if (zn.final) return { s: zn.plazaS - 1.5, onStone: false };
    return { s: zn.plazaS + ((zn.stoneS ? zn.stoneS.length : 0) * 3.1) / 2 + 1.4, onStone: false };
  }
  function heroTo(z, instant) {
    const k = S.k, g = heroGoalFor(z);
    if (!k || !g) return;
    k.heroGoal = g;
    if (instant || REDUCE) k.heroS = g.s;
    wake();
  }
  function stepHero(dt) {
    const k = S.k, h = k.hero, g = k.heroGoal;
    if (!g) return;
    const diff = g.s - k.heroS, dist = Math.abs(diff);
    const walking = dist > 0.05;
    if (walking) {
      const v = Math.max(11, dist * 1.6);
      k.heroS += Math.sign(diff) * Math.min(dist, v * dt);
      k.heroPhase += dt * 13;
    }
    const p = k.land.roadAt(k.heroS);
    const stoneLift = (() => {
      const zs = [...k.zones.values()];
      for (const zn of zs) if (zn.stoneS) for (const s of zn.stoneS) if (Math.abs(s - k.heroS) < 0.9) return 0.48;
      return 0;
    })();
    const hop = walking ? Math.abs(Math.sin(k.heroPhase)) * 0.45 : 0;
    h.group.position.set(p.x, p.y + stoneLift + hop, p.z);
    h.shadow.position.y = 0.04 - hop / 1.25;
    // 走路時面向前進方向；停下來轉向鏡頭
    const want = walking ? Math.atan2(p.tx * Math.sign(diff), p.tz * Math.sign(diff)) : S.cam.yaw * 0.6;
    let d = want - h.group.rotation.y;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    h.group.rotation.y += d * Math.min(1, dt * (walking ? 12 : 4));
    h.body.scale.y = walking ? 1 : 1 + Math.sin(S.t * 2.6) * 0.025;
    h.animate(S.t, k.heroPhase, walking);
    if (walking) S.still = 0;
  }

  /* ---------- 慶祝：升旗＋金色的光點（菱形閃光） ---------- */
  let sparkTex = null;
  function burst(pos) {
    if (!sparkTex) {
      const c = document.createElement('canvas');
      c.width = c.height = 32;
      const g = c.getContext('2d');
      g.fillStyle = '#fff';
      g.translate(16, 16);
      g.beginPath();
      g.moveTo(0, -15); g.lineTo(9, 0); g.lineTo(0, 15); g.lineTo(-9, 0); g.closePath();
      g.fill();
      sparkTex = new THREE.CanvasTexture(c);
    }
    const n = 70, geo = new THREE.BufferGeometry(), p = new Float32Array(n * 3), col = new Float32Array(n * 3), vel = [];
    const palette = [new THREE.Color('#ffd54a'), new THREE.Color('#ffffff'), new THREE.Color('#ff9f43'), new THREE.Color('#7fd3ff')];
    for (let i = 0; i < n; i++) {
      p[i * 3] = pos.x; p[i * 3 + 1] = pos.y; p[i * 3 + 2] = pos.z;
      const a = Math.random() * Math.PI * 2, s = 2 + Math.random() * 5;
      vel.push([Math.cos(a) * s, 5 + Math.random() * 7, Math.sin(a) * s]);
      const c = palette[i % palette.length];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(p, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 1.1, map: sparkTex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(pts);
    S.bursts.push({ pts, vel, life: 0 });
  }
  function stepBursts(dt) {
    S.bursts = S.bursts.filter((b) => {
      b.life += dt;
      const a = b.pts.geometry.attributes.position.array;
      b.vel.forEach((v, i) => { v[1] -= 9 * dt; a[i * 3] += v[0] * dt; a[i * 3 + 1] += v[1] * dt; a[i * 3 + 2] += v[2] * dt; });
      b.pts.geometry.attributes.position.needsUpdate = true;
      b.pts.material.opacity = Math.max(0, 1 - b.life / 2.2);
      if (b.life > 2.2) { scene.remove(b.pts); b.pts.geometry.dispose(); b.pts.material.dispose(); return false; }
      S.still = 0;
      return true;
    });
  }

  /* ---------- 標籤跟著地標走 ---------- */
  function placeLabels() {
    const k = S.k;
    if (!k) return;
    const w = innerWidth, h = innerHeight;
    labelBox.classList.toggle('far', S.cam.d > 95);
    for (const zn of k.zones.values()) {
      _v.copy(zn.anchor).project(camera);
      const x = (_v.x + 1) * 0.5 * w, y = (1 - _v.y) * 0.5 * h;
      const hide = _v.z > 1 || x < -80 || x > w + 80 || y < -40 || y > h + 60;
      zn.label.style.visibility = hide ? 'hidden' : '';
      if (!hide) zn.label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -100%)`;
    }
  }

  /* ---------- 操作：拖曳平移、雙指／滾輪縮放、點一下選地方 ---------- */
  const canvas = renderer.domElement;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.5);
  function groundAt(cx, cy) {
    ndc.set((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const out = new THREE.Vector3();
    return ray.ray.intersectPlane(plane, out) ? out : null;
  }
  const pointers = new Map();
  const interactive = () => S.mode === 'map' && S.k;
  function startGesture() {
    const pts = [...pointers.values()];
    if (pts.length === 1) S.drag = { kind: 'pan', g: groundAt(pts[0].x, pts[0].y), moved: S.drag ? S.drag.moved : 0, t0: S.drag ? S.drag.t0 : performance.now(), x0: pts[0].x, y0: pts[0].y, hist: [] };
    else if (pts.length >= 2) {
      const [a, b] = pts, mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      S.drag = { kind: 'pinch', g: groundAt(mx, my), dist0: Math.hypot(a.x - b.x, a.y - b.y) || 1, d0: S.cam.d, moved: 99, t0: 0, hist: [] };
    }
    S.focus = { kind: 'free' };
  }
  function panTo(cx, cy, g) {
    if (!g) return;
    place(camera, S.cam);
    const p = groundAt(cx, cy);
    if (!p) return;
    S.cam.x += g.x - p.x; S.cam.z += g.z - p.z;
    Object.assign(S.goal, S.cam);
    clampGoal(); Object.assign(S.cam, S.goal);
  }
  /* 手指按在地圖或名牌上都可以拖；放開時沒有移動才算「點」：
     點在地圖上 → 用光線找是哪一區；點在名牌上 → 交給名牌自己的 click。
     拖曳之後名牌的 click 要忽略（不然拖完會跳去那一區）。 */
  function onDown(e) {
    if (!interactive() || (e.pointerType === 'mouse' && e.button !== 0)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    S.vel.x = S.vel.z = 0;
    if (pointers.size === 1) { S.drag = null; S.downOnLabel = e.target !== canvas; }
    startGesture();
    wake();
  }
  function onMove(e) {
    if (!pointers.has(e.pointerId) || !S.drag) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.values()], d = S.drag;
    const before = { x: S.cam.x, z: S.cam.z };
    if (d.kind === 'pan' && pts.length === 1) {
      d.moved = Math.max(d.moved, Math.hypot(pts[0].x - d.x0, pts[0].y - d.y0));
      if (d.moved > 8) panTo(pts[0].x, pts[0].y, d.g);
    } else if (d.kind === 'pinch' && pts.length >= 2) {
      const [a, b] = pts, mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      S.cam.d = Math.min(S.k.maxD, Math.max(16, d.d0 * (d.dist0 / (Math.hypot(a.x - b.x, a.y - b.y) || 1))));
      S.goal.d = S.cam.d;
      panTo(mx, my, d.g);
    }
    if (d.moved > 8) S.dragAt = performance.now();
    const now = performance.now();
    d.hist.push({ t: now, dx: S.cam.x - before.x, dz: S.cam.z - before.z });
    while (d.hist.length && now - d.hist[0].t > 90) d.hist.shift();
    wake();
  }
  function onUp(e) {
    if (!pointers.has(e.pointerId)) return;
    const d = S.drag;
    pointers.delete(e.pointerId);
    if (pointers.size) { startGesture(); return; }
    S.drag = null;
    if (!d) return;
    if (d.kind === 'pan' && d.moved <= 8) {
      if (!S.downOnLabel && e.type === 'pointerup' && performance.now() - d.t0 < 700) pick(e.clientX, e.clientY);
    } else if (d.hist.length > 1) {
      const span = Math.max(16, d.hist[d.hist.length - 1].t - d.hist[0].t);
      S.vel.x = d.hist.reduce((a, h) => a + h.dx, 0) / span * 1000;
      S.vel.z = d.hist.reduce((a, h) => a + h.dz, 0) / span * 1000;
    }
  }
  canvas.addEventListener('pointerdown', onDown);
  labelBox.addEventListener('pointerdown', onDown);
  addEventListener('pointermove', onMove);
  addEventListener('pointerup', onUp);
  addEventListener('pointercancel', onUp);
  const onWheel = (e) => {
    if (!interactive()) return;
    e.preventDefault();
    S.focus = { kind: 'free' };
    place(camera, S.cam);
    const g = groundAt(e.clientX, e.clientY);
    S.cam.d = Math.min(S.k.maxD, Math.max(16, S.cam.d * Math.exp(e.deltaY * 0.0012)));
    S.goal.d = S.cam.d;
    panTo(e.clientX, e.clientY, g);
    wake();
  };
  canvas.addEventListener('wheel', onWheel, { passive: false });
  labelBox.addEventListener('wheel', onWheel, { passive: false });
  function pick(cx, cy) {
    ndc.set((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
    place(camera, S.cam);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(S.k.pickables, false)[0];
    if (S.onSelect) S.onSelect(hit ? hit.object.userData.z : null);
  }

  /* ---------- 每一格畫面 ---------- */
  function step(dt) {
    const c = S.cam, g = S.goal;
    if (!S.drag) {
      if (Math.abs(S.vel.x) + Math.abs(S.vel.z) > 0.05) {
        g.x += S.vel.x * dt; g.z += S.vel.z * dt;
        const f = Math.exp(-dt * 4.5);
        S.vel.x *= f; S.vel.z *= f;
        clampGoal();
        c.x = g.x; c.z = g.z;
      }
      if (S.mode === 'title') g.yaw += dt * 0.05;
      const a = 1 - Math.exp(-dt * 4.2);
      let moving = false;
      for (const key of ['x', 'z', 'd', 'pitch', 'yaw', 'ox', 'oy']) {
        const diff = g[key] - c[key];
        if (Math.abs(diff) > (key === 'ox' || key === 'oy' ? 0.3 : 0.002)) { c[key] += diff * a; moving = true; } else c[key] = g[key];
      }
      if (moving || S.mode === 'title') S.still = 0;
    } else S.still = 0;
    place(camera, c);
  }
  function animate(dt) {
    const k = S.k, t = S.t;
    if (!k) return;
    flowWater(dt);
    k.land.update(t, dt);
    for (const zn of k.zones.values()) {
      zn.lm.update(t, dt);
      for (const st of zn.stones) st.update(t);
      if (zn.flag) zn.flag.update(t, dt);
    }
    for (const bn of k.banners) if (bn.f.shown) bn.f.update(t, dt);
    stepHero(dt);
    stepBursts(dt);
    if (S.sel !== null && k.zones.has(S.sel)) {
      const zn = k.zones.get(S.sel);
      k.ring.visible = S.mode === 'map';
      k.ring.position.set(zn.site.x, zn.site.y + 0.12, zn.site.z);
      const s = (zn.final ? 1.3 : 1) * (1 + Math.sin(t * 3) * 0.02);
      k.ring.scale.set(s, 1, s);
      k.ring.material.opacity = 0.6 + Math.sin(t * 3) * 0.25;
    } else k.ring.visible = false;
  }
  function frame(now) {
    S.raf = 0;
    if (!S.running) return;
    // 省電：首頁慢慢繞、地圖上沒人在動的時候，每秒畫 30 張就好
    const calm = S.mode === 'title' || (S.mode === 'map' && S.still > 2 && !S.drag && !S.bursts.length);
    if (calm && now - (S.drawn || 0) < 31) { S.raf = requestAnimationFrame(frame); return; }
    const raw = (now - (S.last || now)) / 1000, dt = Math.min(0.05, raw);
    S.last = now;
    S.drawn = now;
    S.t += REDUCE ? dt * 0.25 : dt;
    step(dt);
    animate(dt);
    if (S.mode === 'map') placeLabels();
    renderer.render(scene, camera);
    if (!calm) watchSpeed(raw);
    S.still += dt;
    // 闖關中：鏡頭到位、再畫幾張就停（題目畫面在前面，後面不用一直動）
    if (S.mode === 'play' && S.still > 0.6) { S.running = false; return; }
    S.raf = requestAnimationFrame(frame);
  }
  function wake() {
    if (document.hidden || S.mode === 'idle') return;
    if (!S.running) { S.running = true; S.last = 0; }
    if (!S.raf) S.raf = requestAnimationFrame(frame);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) S.running = false; else wake(); });

  /* 太慢就降畫質：每 3 秒算一次平均，連續兩次都超過 30ms（每秒不到 33 張）才降一級。
     剛切換畫面的前 4 秒（在編譯材質）不算；一張超過 0.25 秒的（畫面被藏起來、分頁在背景）也不算。 */
  const speed = { acc: 0, n: 0, bad: 0, skip: 4 };
  function watchSpeed(raw) {
    if (quality >= 2 || (S.mode !== 'map' && S.mode !== 'title') || !raw || raw > 0.25) return;
    if (speed.skip > 0) { speed.skip -= raw; return; }
    speed.acc += raw; speed.n++;
    if (speed.acc < 3) return;
    const avg = speed.acc / speed.n;
    speed.acc = 0; speed.n = 0;
    speed.bad = avg > 0.03 ? speed.bad + 1 : 0;
    if (speed.bad >= 2) {
      speed.bad = 0; speed.skip = 4;
      quality++;
      renderer.setPixelRatio(ratioFor(quality));
      renderer.setSize(innerWidth, innerHeight);
      if (quality >= 2 && renderer.shadowMap.enabled) {
        renderer.shadowMap.enabled = false;
        scene.traverse((o) => { if (o.material) for (const m of [].concat(o.material)) m.needsUpdate = true; });
      }
      try { localStorage.setItem(QUALITY_KEY, String(quality)); } catch { /* 略過 */ }
    }
  }

  addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight);
    if (S.focus.kind !== 'free' || S.mode !== 'map') refit(true);
    wake();
  });
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); S.running = false; S.lost = true; });
  canvas.addEventListener('webglcontextrestored', () => { location.reload(); });

  /* ---------- 給 ui.js 用的介面 ---------- */
  function useBook(vm) {
    let k = S.kingdoms.get(vm.id);
    if (!k) {
      k = buildKingdom(vm);
      S.kingdoms.set(vm.id, k);
    }
    if (S.k !== k) {
      if (S.k) { scene.remove(S.k.root); for (const zn of S.k.zones.values()) zn.label.hidden = true; }
      S.k = k;
      scene.add(k.root);
      for (const zn of k.zones.values()) zn.label.hidden = false;
      const c = k.center;
      sun.position.set(c.x - 45, 80, c.z + 40);
      sun.target.position.set(c.x, 0, c.z);
      sun.target.updateMatrixWorld();
      k.fresh = true;
    }
    apply(vm);
    if (k.fresh) { heroTo(vm.current, true); k.fresh = false; }
  }
  function setMode(mode) {
    if (S.mode === 'title' && mode !== 'title') {   // 首頁一直繞圈，角度可能已經轉了好幾圈
      S.cam.yaw = Math.atan2(Math.sin(S.cam.yaw), Math.cos(S.cam.yaw));
      S.goal.yaw = S.cam.yaw;
    }
    if (mode !== S.mode) { speed.skip = 4; speed.bad = 0; }
    S.mode = mode;
    document.body.classList.toggle('world-map', mode === 'map');
    labelBox.hidden = mode !== 'map';
    if (mode !== 'map') { pointers.clear(); S.drag = null; }
  }

  window.World = {
    setBook(vm) { useBook(vm); },
    update(vm) { apply(vm); },
    onSelect(fn) { S.onSelect = fn; },
    title() {
      const first = S.mode === 'idle';
      setMode('title');
      S.sel = null;
      S.insets = { l: 0, r: 0, t: 0, b: 0 };
      refit(first);
      if (first) S.cam.yaw = S.goal.yaw = -0.5;
    },
    // z：選到的區域（null＝沒選）；focus：'zone' 對準那一區、'overview' 看全部、'keep' 鏡頭不動
    map({ z = null, focus = 'keep', insets = null, hero = true, instant = false } = {}) {
      const first = S.mode !== 'map';
      const fromPlay = S.mode === 'play';
      setMode('map');
      S.sel = z;
      if (S.k) for (const zn of S.k.zones.values()) zn.label.classList.toggle('sel', zn.index === z);
      if (insets) S.insets = insets;
      if (focus === 'zone' && z !== null) S.focus = { kind: 'zone', z };
      else if (focus === 'overview') S.focus = { kind: 'overview' };
      else if (first && S.focus.kind !== 'free' && S.focus.kind !== 'zone') S.focus = { kind: 'overview' };
      if (focus !== 'keep' || first) refit(instant || (first && !fromPlay && S.cam.d > 300));
      if (hero && S.k) heroTo(z !== null ? z : (S.k.vm ? S.k.vm.current : 0), instant);
      wake();
    },
    setInsets(insets) {
      S.insets = insets;
      if (S.focus.kind !== 'free') refit(false);
    },
    play(z) {
      setMode('play');
      S.sel = z;
      S.focus = { kind: 'zone', z };
      refit(false);
      if (S.k) heroTo(z, true);
      S.still = 0;
      wake();
    },
    celebrate(z) {
      const k = S.k, zn = k && k.zones.get(z);
      if (!zn) return;
      if (zn.flag) zn.flag.raiseFrom0();
      for (const bn of k.banners) if (bn.z === z) bn.f.raiseFrom0();
      const at = zn.flag ? zn.flag.group.position.clone().add(new THREE.Vector3(0, 3, 0)) : zn.anchor.clone();
      burst(at);
      setTimeout(() => burst(zn.anchor.clone()), 450);
      wake();
    },
    // 換角色（選單用）：每個已經蓋好的王國都換上新的小勇者
    setHero(kind) {
      for (const k of S.kingdoms.values()) {
        const old = k.hero, h = buildHero(kind);
        h.group.position.copy(old.group.position);
        h.group.rotation.y = old.group.rotation.y;
        k.root.remove(old.group);
        k.root.add(h.group);
        k.hero = h;
      }
      S.still = 0;
      wake();
    },
    // 3D 開關（選單用）
    disable() { try { localStorage.setItem(OFF_KEY, '1'); } catch { /* 略過 */ } },
    get quality() { return quality; },
    // 除錯用：上一張畫面畫了幾次、幾個三角形
    get stats() { const r = renderer.info.render; return { calls: r.calls, triangles: r.triangles, quality, ratio: renderer.getPixelRatio() }; },
  };
  setMode('idle');
  window.dispatchEvent(new Event('world-ready'));
}

function skyTexture() {
  const c = document.createElement('canvas');
  c.width = 4; c.height = 256;
  const g = c.getContext('2d'), grd = g.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0, '#4fa6f2');
  grd.addColorStop(0.55, '#9fd5ff');
  grd.addColorStop(1, '#e6f4ff');
  g.fillStyle = grd;
  g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

try { start(); } catch (e) { console.error(e); fail(e); }
