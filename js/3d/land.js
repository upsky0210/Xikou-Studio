/* 王國的大地：配置、地形高低、地面顏色、道路、溪流、橋、池塘、樹、石頭、雲
   配置：一個單元一區，三區一排，像蛇一樣來回往上走（第 1 排左→右，第 2 排右→左……），
   最後走上王城。一條溪在每兩排之間穿過，道路過溪的地方自動架橋。
   座標：x 往右、z 往鏡頭（南），y 往上。每區有「地標」（site）和地標前面路上的「廣場」（plaza）。 */
import { THREE, Kit, MAT, OUTLINE, addOutlineNormals, merge, paint, matrixOf, rng, noise, smooth, lerp, waterMaterial } from './kit.js';

const COLS = [-20, 0, 20];
const ROW_GAP = 24;
const SITE_Z0 = 28;
const PLAZA_DZ = 6;
const SIDE_X = 32;      // 排和排之間的道路從兩側繞過去
const WATER_Y = 0.1;

/* ---------- 配置 ---------- */
export function makeLayout(zones) {
  const regular = zones.filter((z) => !z.final);
  const fin = zones.find((z) => z.final) || null;
  const rows = Math.max(1, Math.ceil(regular.length / 3));
  const spots = regular.map((z, i) => {
    const r = Math.floor(i / 3), c = i % 3;
    const col = r % 2 === 0 ? c : 2 - c;
    const x = COLS[col], sz = SITE_Z0 - r * ROW_GAP;
    return { index: z.index, terrain: z.terrain, final: false, row: r, site: [x, sz], plaza: [x, sz + PLAZA_DZ] };
  });
  // 最後一區（往王城的大道從它的廣場往北走）：地標放到大道的東邊
  const last = spots[spots.length - 1];
  if (fin && last) last.site = [last.plaza[0] + 11, last.plaza[1] - 5];
  const castleZ = SITE_Z0 - rows * ROW_GAP - 2;
  const castle = fin ? { index: fin.index, terrain: fin.terrain || 'castle', final: true, row: rows, site: [0, castleZ], plaza: [0, castleZ + 7.5] } : null;

  // 道路：出發點 → 每一排的廣場 → 兩側轉彎 → … → 王城門口
  const road = [];
  const first = spots[0];
  if (first) road.push([first.plaza[0] - 12, first.plaza[1] + 3.5]);
  for (let r = 0; r < rows; r++) {
    const rowSpots = spots.filter((s) => s.row === r);
    for (const s of rowSpots) road.push(s.plaza);
    const nextRow = spots.filter((s) => s.row === r + 1);
    if (nextRow.length) {
      const sx = (r % 2 === 0 ? 1 : -1) * SIDE_X, z0 = rowSpots[0].plaza[1], z1 = nextRow[0].plaza[1];
      road.push([sx * 0.9, z0 - 2.2], [sx, lerp(z0, z1, 0.33)], [sx, lerp(z0, z1, 0.66)], [sx * 0.9, z1 + 1.8]);
    }
  }
  if (castle && last) {
    const gz = castle.plaza[1];
    road.push([lerp(last.plaza[0], 0, 0.5), last.plaza[1] - 6], [0, lerp(last.plaza[1], gz, 0.55)], [0, gz]);
  }

  // 溪流：從東北的山上下來，在每兩排之間來回流，最後往南流出地圖
  const creek = [];
  const gapZ = [];
  for (let r = 0; r < rows; r++) {
    const a = spots.filter((s) => s.row === r), b = spots.filter((s) => s.row === r + 1);
    if (b.length) gapZ.push((a[0].site[1] - 6 + b[0].plaza[1] + 1.5) / 2);
    else if (castle) gapZ.push((a[0].site[1] - 6 + castle.plaza[1]) / 2);
  }
  gapZ.reverse();   // 從北邊（王城那邊）開始
  let side = 1;     // 北邊第一段由東往西流
  creek.push([side * 40, gapZ[0] - 40], [side * 36, gapZ[0] - 18]);
  gapZ.forEach((gz, i) => {
    const x0 = side * 38, x1 = -side * 38;
    creek.push([x0, gz - 2]);
    for (let k = 1; k <= 4; k++) { const t = k / 5; creek.push([lerp(x0, x1, t), gz + Math.sin(i * 2.1 + k * 1.7) * 1.6]); }
    creek.push([x1, gz + 2]);
    side = -side;   // 現在在 side 那一側，往南轉到下一段
    if (i < gapZ.length - 1) creek.push([side * 41.5, lerp(gz, gapZ[i + 1], 0.5)]);
  });
  const endZ = (first ? first.plaza[1] : 30) + 10;
  creek.push([side * 42, endZ], [side * 44, endZ + 30], [side * 48, endZ + 70]);

  // 空著的地方放一個池塘（最後一排沒有排滿時，東邊會空出來）
  const lastRow = spots.filter((s) => s.row === rows - 1);
  const lake = lastRow.length < 3 ? { x: lastRow.length === 2 ? 25 : 18, z: lastRow[0].site[1] + 2, r: 4.2 } : null;

  const all = castle ? [...spots, castle] : spots;
  const xs = all.flatMap((s) => [s.site[0], s.plaza[0]]), zs = all.flatMap((s) => [s.site[1], s.plaza[1]]);
  const bounds = { x0: Math.min(...xs) - 8, x1: Math.max(...xs) + 8, z0: Math.min(...zs) - 8, z1: Math.max(...zs) + 6 };
  if (first) bounds.x0 = Math.min(bounds.x0, first.plaza[0] - 14);
  return { zones: all, spots, castle, road, creek, lake, bounds };
}

/* ---------- 折線的最近距離 ----------
   near()：只找 CELL 公尺以內的點（地形只在乎很近的時候），用格子分桶，很快；找不到回傳 [-1, CELL]。
   nearest()：一定找到最近的點（勇者、關卡石台用，次數很少）。 */
const CELL = 5;
function polyline(points) {
  const n = points.length, xs = new Float32Array(n), zs = new Float32Array(n), grid = new Map();
  const key = (cx, cz) => (cx + 500) * 1000 + (cz + 500);
  points.forEach((p, i) => {
    xs[i] = p.x; zs[i] = p.z;
    const k = key(Math.floor(p.x / CELL), Math.floor(p.z / CELL));
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(i);
  });
  return {
    xs, zs, n,
    near(x, z) {
      const cx = Math.floor(x / CELL), cz = Math.floor(z / CELL);
      let best = CELL * CELL, bi = -1;
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
        const list = grid.get(key(cx + a, cz + b));
        if (list) for (const i of list) { const dx = xs[i] - x, dz = zs[i] - z, d = dx * dx + dz * dz; if (d < best) { best = d; bi = i; } }
      }
      return [bi, Math.sqrt(best)];
    },
    nearest(x, z) {
      let best = 1e9, bi = 0;
      for (let i = 0; i < n; i++) { const dx = xs[i] - x, dz = zs[i] - z, d = dx * dx + dz * dz; if (d < best) { best = d; bi = i; } }
      return [bi, Math.sqrt(best)];
    },
  };
}
const curveOf = (pts, y = 0) => new THREE.CatmullRomCurve3(pts.map(([x, z]) => new THREE.Vector3(x, y, z)), false, 'centripetal');

/* ---------- 地面顏色 ---------- */
const hex = (h) => new THREE.Color(h);
const PAL = {
  grass: ['#95d05a', '#88c74f', '#a1d963'].map(hex), forest: ['#6fb04a', '#79b952'].map(hex),
  rock: ['#a4a9b3', '#959ba7', '#b3b6bd'].map(hex), snow: hex('#f4f7fc'),
  sand: ['#f0dca4', '#e9d090'].map(hex), wet: hex('#d9c590'), dirt: hex('#dcbb7f'),
  mine: ['#b1a18b', '#c0af95', '#98a463'].map(hex),
  farm: ['#ecc95a', '#d9d36a', '#b6d35c', '#f1d57e'].map(hex), furrow: hex('#c9a640'),
  dry: ['#ddc68d', '#d2bb80'].map(hex),
  lawn: ['#83d46c', '#77c862'].map(hex), paving: hex('#ece6da'),
  meadow: ['#73cb62', '#69c15a'].map(hex), flower: ['#ff8cc0', '#ffe066', '#ffffff', '#b794ff'].map(hex),
  moss: ['#a9ad9f', '#93b45c'].map(hex), hedge: ['#6db35b', '#64a853'].map(hex),
  plaza: ['#ddd6c9', '#d3cbbd'].map(hex),
};
const pick = (arr, v) => arr[Math.min(arr.length - 1, Math.floor(v * arr.length))];

/* ---------- 大地 ---------- */
export function buildLand(layout) {
  const group = new THREE.Group();
  const R = rng(2026);
  const roadCurve = curveOf(layout.road);
  const roadLen = roadCurve.getLength();
  const roadPts = roadCurve.getSpacedPoints(Math.ceil(roadLen / 0.5));
  const creekCurve = curveOf(layout.creek);
  const creekPts = creekCurve.getSpacedPoints(Math.ceil(creekCurve.getLength() / 0.7));
  const roadLine = polyline(roadPts), creekLine = polyline(creekPts);
  const sites = layout.zones;
  const castle = layout.castle, lake = layout.lake;

  // 地形高低（不含道路整平）
  function rawHeight(x, z, dCreek) {
    let h = 0.55 + (noise(x * 0.07 + 10, z * 0.07 + 3) - 0.5) * 1.5 + (noise(x * 0.21, z * 0.21) - 0.5) * 0.5;
    const ox = Math.max(0, Math.abs(x) - 52), oz = Math.max(0, layout.bounds.z0 - 16 - z);
    const o = Math.min(34, Math.hypot(ox, oz));
    if (o > 0) h += o * 0.5 + o * o * 0.014 + noise(x * 0.11 + 5, z * 0.11) * o * 0.45;
    // 疾風山脈的後面多一些小山
    for (const s of sites) {
      if (s.terrain === 'mountain') {
        h += 3.8 * smooth(11, 3, Math.hypot(x - s.site[0] + 6, z - s.site[1] + 19));
        h += 2.6 * smooth(8, 2, Math.hypot(x - s.site[0] - 9, z - s.site[1] + 21));
      }
    }
    for (const s of sites) {
      const d = Math.min(Math.hypot(x - s.site[0], z - s.site[1]), Math.hypot(x - s.plaza[0], z - s.plaza[1]));
      h = lerp(h, 0.5, smooth(9.5, 5.5, d));
    }
    if (castle) {
      const d = Math.hypot(x - castle.site[0], z - castle.site[1]);
      h = Math.max(h, 0.5 + 3.2 * smooth(13.5, 8.5, d));
    }
    if (lake) h = lerp(h, -0.8, smooth(lake.r + 1.8, lake.r - 0.4, Math.hypot(x - lake.x, z - lake.z)));
    h = lerp(h, -0.8, smooth(3.7, 1.4, dCreek));
    return h;
  }
  function height(x, z) {
    const [ci, dc] = creekLine.near(x, z);
    let h = rawHeight(x, z, dc);
    const [ri, dr] = roadLine.near(x, z);
    if (dr < 3.2) {
      const rx = roadLine.xs[ri], rz = roadLine.zs[ri];
      const hc = rawHeight(rx, rz, creekLine.near(rx, rz)[1]);
      h = lerp(h, Math.max(hc, 0.35), smooth(3.2, 1.4, dr));
    }
    return h;
  }

  /* ---- 地形網格：每格 1.5，三角形各自一個顏色（低多邊形的拼布感） ---- */
  // 地形做得比看得到的範圍大很多，四周是山，看不到邊（不是浮在空中的島）
  const X0 = -114, X1 = 114, Z0 = layout.bounds.z0 - 84, Z1 = layout.bounds.z1 + 76, STEP = 1.75;
  const nx = Math.round((X1 - X0) / STEP), nz = Math.round((Z1 - Z0) / STEP);
  const H = new Float32Array((nx + 1) * (nz + 1)), DC = new Float32Array(H.length), DR = new Float32Array(H.length);
  for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) {
    const x = X0 + i * STEP, z = Z0 + j * STEP;
    const idx = j * (nx + 1) + i;
    const [ci, dc] = creekLine.near(x, z), [ri, dr] = roadLine.near(x, z);
    DC[idx] = dc; DR[idx] = dr;
    let h = rawHeight(x, z, dc);
    if (dr < 3.2) {
      const rx = roadLine.xs[ri], rz = roadLine.zs[ri];
      const hc = rawHeight(rx, rz, creekLine.near(rx, rz)[1]);
      h = lerp(h, Math.max(hc, 0.35), smooth(3.2, 1.4, dr));
    }
    H[idx] = h;
  }
  const zoneOf = (x, z) => {
    let best = null, bd = 1e9;
    for (const s of sites) { const d = Math.hypot(x - s.site[0], z - s.site[1]); if (d < bd) { bd = d; best = s; } }
    return [best, bd];
  };
  const pos = [], col = [];
  const c = new THREE.Color();
  const tri = (ax, ay, az, bx, by, bz, cx, cy, cz, dcm, drm) => {
    pos.push(ax, ay, az, bx, by, bz, cx, cy, cz);
    const mx = (ax + bx + cx) / 3, my = (ay + by + cy) / 3, mz = (az + bz + cz) / 3;
    // 斜率（法線的 y）
    const ux = bx - ax, uy = by - ay, uz = bz - az, vx = cx - ax, vy = cy - ay, vz = cz - az;
    const nX = uy * vz - uz * vy, nY = uz * vx - ux * vz, nZ = ux * vy - uy * vx;
    const ny = Math.abs(nY) / (Math.hypot(nX, nY, nZ) || 1);
    const n1 = noise(mx * 0.13 + 7, mz * 0.13 + 1), r = R();
    const [zone, dz] = zoneOf(mx, mz);
    const edge = 9 + noise(mx * 0.3, mz * 0.3) * 3;
    if (my > 15) c.copy(PAL.snow);
    else if ((my > 5 && ny < 0.72) || my > 10) c.copy(pick(PAL.rock, r));
    else if (my > 3.2) c.copy(pick(PAL.forest, r));
    else if (dcm < 2.2) c.copy(dcm < 1.5 ? PAL.wet : pick(PAL.sand, r));
    else if (drm < 1.0) c.copy(PAL.dirt);
    else if (lake && Math.hypot(mx - lake.x, mz - lake.z) < lake.r + 1.2) c.copy(pick(PAL.sand, r));
    else if (zone && dz < edge) {
      const t = zone.terrain;
      if (t === 'mine') c.copy(pick(PAL.mine, n1 * 0.7 + r * 0.3));
      else if (t === 'mill') {
        const f = Math.floor((mx + 100) / 3.6) * 7 + Math.floor((mz + 100) / 3.0) * 13;
        c.copy(PAL.farm[(f * 2654435761 >>> 28) % PAL.farm.length]);
        if (((mz + 100) % 1.5) < 0.5) c.lerp(PAL.furrow, 0.35);
      } else if (t === 'oasis') c.copy(pick(PAL.sand, n1));
      else if (t === 'arena') c.copy(pick(PAL.dry, r));
      else if (t === 'palace') c.copy(dz < 5 ? PAL.paving : PAL.lawn[(Math.floor(mx / 2.5) + Math.floor(mz / 2.5)) & 1]);
      else if (t === 'garden') c.copy(r < 0.07 ? pick(PAL.flower, R()) : pick(PAL.meadow, n1));
      else if (t === 'mountain') c.copy(pick(PAL.moss, n1));
      else if (t === 'maze') c.copy(pick(PAL.hedge, r));
      else if (t === 'castle') c.copy(dz < 7.5 ? pick(PAL.plaza, r) : pick(PAL.grass, n1));
      else c.copy(pick(PAL.grass, n1));
    } else c.copy(n1 > 0.62 ? pick(PAL.forest, r) : pick(PAL.grass, n1 * 0.6 + r * 0.4));
    c.multiplyScalar(0.96 + r * 0.08);
    for (let k = 0; k < 3; k++) col.push(c.r, c.g, c.b);
  };
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const a = j * (nx + 1) + i, b = a + 1, d = a + nx + 1, e = d + 1;
    const xa = X0 + i * STEP, xb = xa + STEP, za = Z0 + j * STEP, zd = za + STEP;
    const dcm = Math.min(DC[a], DC[b], DC[d], DC[e]), drm = Math.min(DR[a], DR[b], DR[d], DR[e]);
    if ((i + j) % 2) {
      tri(xa, H[a], za, xa, H[d], zd, xb, H[b], za, dcm, drm);
      tri(xb, H[b], za, xa, H[d], zd, xb, H[e], zd, dcm, drm);
    } else {
      tri(xa, H[a], za, xa, H[d], zd, xb, H[e], zd, dcm, drm);
      tri(xa, H[a], za, xb, H[e], zd, xb, H[b], za, dcm, drm);
    }
  }
  const tg = new THREE.BufferGeometry();
  tg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  tg.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  tg.computeVertexNormals();
  const terrain = new THREE.Mesh(tg, MAT.toon);
  terrain.receiveShadow = true;
  terrain.name = 'terrain';
  group.add(terrain);

  /* ---- 道路：中間淺、兩邊深的帶子，貼著地面 ---- */
  const bridges = findCrossings(roadPts, creekPts);
  const nearBridge = (p) => bridges.some((b) => Math.hypot(p.x - b.x, p.z - b.z) < 3.4);
  {
    const W = [-1.15, -0.78, 0.78, 1.15], CC = ['#c79c5e', '#f0dcaa', '#f0dcaa', '#c79c5e'].map(hex);
    const vp = [], vc = [], idx = [];
    roadPts.forEach((p, i) => {
      const t = roadCurve.getTangentAt(Math.min(1, i / (roadPts.length - 1)));
      const sx = -t.z, sz = t.x, l = Math.hypot(sx, sz) || 1;
      W.forEach((w, k) => {
        const x = p.x + (sx / l) * w, z = p.z + (sz / l) * w;
        const y = nearBridge(p) ? WATER_Y + 0.4 : height(x, z) + 0.1;
        vp.push(x, y, z);
        vc.push(CC[k].r, CC[k].g, CC[k].b);
      });
      if (i) for (let k = 0; k < 3; k++) { const a = (i - 1) * 4 + k, b = a + 1, cI = a + 4, d = b + 4; idx.push(a, b, cI, b, d, cI); }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(vp, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(vc, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: MAT.toon.gradientMap, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    m.receiveShadow = true;
    group.add(m);
  }

  /* ---- 溪流和池塘 ---- */
  const wmat = waterMaterial();
  {
    const vp = [], uv = [], idx = [];
    let dist = 0;
    creekPts.forEach((p, i) => {
      if (i) dist += p.distanceTo(creekPts[i - 1]);
      const t = creekCurve.getTangentAt(Math.min(1, i / (creekPts.length - 1)));
      const sx = -t.z, sz = t.x, l = Math.hypot(sx, sz) || 1;
      for (const [w, u] of [[-2.3, 0], [2.3, 1]]) { vp.push(p.x + (sx / l) * w, WATER_Y, p.z + (sz / l) * w); uv.push(u, dist / 7); }
      if (i) { const a = (i - 1) * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(vp, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    const m = new THREE.Mesh(g, wmat);
    group.add(m);
  }
  if (lake) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(lake.r + 1.3, 24).rotateX(-Math.PI / 2), wmat);
    m.position.set(lake.x, WATER_Y, lake.z);
    group.add(m);
  }

  /* ---- 橋 ---- */
  const bk = new Kit();
  for (const b of bridges) {
    const part = new Kit(), L = 7.6;
    for (let i = 0; i < 8; i++) {
      const x = -L / 2 + (i + 0.5) * (L / 8), y = WATER_Y + 0.28 + 0.62 * (1 - (x / (L / 2)) ** 2);
      part.box(L / 8 + 0.04, 0.24, 2.9, i % 2 ? '#a8743f' : '#b9824a', { p: [x, y, 0] });
      for (const z of [-1.38, 1.38]) part.box(0.16, 0.75, 0.16, '#7a4f2a', { p: [x, y + 0.2, z] });
      for (const z of [-1.38, 1.38]) part.box(L / 8 + 0.05, 0.12, 0.12, '#8d5d33', { p: [x, y + 0.82, z] });
    }
    bk.addColored(part.mergedParts(), matrixOf([b.x, 0, b.z], [0, -Math.atan2(b.tz, b.tx), 0]));
  }
  if (!bk.empty()) group.add(bk.build());

  /* ---- 樹、石頭、花叢（同一種東西一次畫完） ---- */
  const avoid = (x, z) => {
    for (const s of sites) {
      const big = s.final ? 13 : s.terrain === 'oasis' ? 11 : 8.8;
      if (Math.hypot(x - s.site[0], z - s.site[1]) < big) return true;
      if (Math.hypot(x - s.plaza[0], z - s.plaza[1]) < 4.5) return true;
    }
    if (lake && Math.hypot(x - lake.x, z - lake.z) < lake.r + 2.2) return true;
    return false;
  };
  const roundT = [], pineT = [], rocks = [], bushes = [];
  for (let z = Z0 + 4; z < Z1 - 4; z += 3.1) for (let x = -72; x < 72; x += 3.1) {
    const px = x + (R() - 0.5) * 2.6, pz = z + (R() - 0.5) * 2.6;
    const [, dc] = creekLine.near(px, pz), [, dr] = roadLine.near(px, pz);
    if (dc < 3.4 || dr < 2.8 || avoid(px, pz)) continue;
    const h = height(px, pz);
    if (h > 10) continue;
    const forest = noise(px * 0.075 + 40, pz * 0.075 + 40);
    const inPlay = px > layout.bounds.x0 - 4 && px < layout.bounds.x1 + 4 && pz > layout.bounds.z0 - 6 && pz < layout.bounds.z1 + 4;
    const p = inPlay ? (forest > 0.58 ? 0.75 : 0.1) : (forest > 0.45 ? 0.85 : 0.3);
    if (R() > p) {
      if (R() < 0.03) rocks.push([px, h, pz]);
      continue;
    }
    if (h > 3 || pz < layout.bounds.z0 + 4 || forest > 0.75) pineT.push([px, h, pz]); else roundT.push([px, h, pz]);
  }
  for (const s of sites) {
    if (s.terrain === 'mine' || s.terrain === 'mountain') for (let i = 0; i < 9; i++) {
      const a = R() * Math.PI * 2, r = 7 + R() * 4, x = s.site[0] + Math.cos(a) * r, z = s.site[1] + Math.sin(a) * r;
      if (roadLine.near(x, z)[1] > 2.4 && creekLine.near(x, z)[1] > 2.8) rocks.push([x, height(x, z), z]);
    }
    if (s.terrain === 'garden' || s.terrain === 'palace') for (let i = 0; i < 12; i++) {
      const a = R() * Math.PI * 2, r = 6.5 + R() * 3, x = s.site[0] + Math.cos(a) * r, z = s.site[1] + Math.sin(a) * r;
      if (roadLine.near(x, z)[1] > 2.2 && creekLine.near(x, z)[1] > 2.8) bushes.push([x, height(x, z), z]);
    }
  }
  const trunkK = new Kit(), crownK = new Kit();
  trunkK.cyl(0.17, 0.24, 1.1, 6, '#8a5a32', {});
  crownK.ball(1.05, 0, '#ffffff', { p: [0, 1.85, 0] });
  crownK.ball(0.72, 0, '#ffffff', { p: [0.32, 2.45, 0.12] });
  const pTrunkK = new Kit(), pCrownK = new Kit();
  pTrunkK.cyl(0.14, 0.2, 0.8, 6, '#8a5a32', {});
  pCrownK.cone(1.05, 1.7, 7, '#ffffff', { p: [0, 0.6, 0] });
  pCrownK.cone(0.8, 1.45, 7, '#ffffff', { p: [0, 1.45, 0] });
  pCrownK.cone(0.52, 1.15, 7, '#ffffff', { p: [0, 2.3, 0] });
  const rockK = new Kit();
  rockK.ball(0.7, 0, '#ffffff', { s: [1.2, 0.75, 1] });
  const bushK = new Kit();
  bushK.ball(0.6, 1, '#ffffff', { p: [0, 0.35, 0] });
  group.add(instanced([[trunkK.mergedParts(), false], [crownK.mergedParts(), true]], roundT, (r) => greenTint(r, 0.3, 0.5), 0.85, 1.35, R));
  group.add(instanced([[pTrunkK.mergedParts(), false], [pCrownK.mergedParts(), true]], pineT, (r) => greenTint(r, 0.38, 0.36), 0.85, 1.45, R));
  group.add(instanced([[rockK.mergedParts(), true]], rocks, (r) => new THREE.Color().setHSL(0.07, 0.06, 0.6 + r * 0.12), 0.6, 1.5, R));
  group.add(instanced([[bushK.mergedParts(), true]], bushes, (r) => new THREE.Color().setHSL([0.93, 0.13, 0.8, 0.3][Math.floor(r * 4)], 0.7, 0.66), 0.7, 1.2, R));

  /* ---- 雲（在地圖外圍慢慢飄） ---- */
  const clouds = [];
  for (let i = 0; i < 9; i++) {
    const ck = new Kit(), n = 4 + Math.floor(R() * 3);
    for (let j = 0; j < n; j++) ck.ball(1.6 + R() * 1.4, 1, '#ffffff', { p: [(j - n / 2) * 1.9 + R(), R() * 0.9, (R() - 0.5) * 1.6], s: [1, 0.72, 1] });
    const cg = ck.build({ cast: false, receive: false });
    const side = i % 3;
    const x = side === 0 ? -58 - R() * 14 : side === 1 ? 58 + R() * 14 : (R() - 0.5) * 90;
    const z = side === 2 ? layout.bounds.z0 - 30 - R() * 20 : lerp(layout.bounds.z0 - 10, layout.bounds.z1 + 20, R());
    cg.position.set(x, 17 + R() * 9, z);
    group.add(cg);
    clouds.push({ g: cg, sp: 0.4 + R() * 0.5, x0: x });
  }

  return {
    group, height, roadCurve, roadLen, roadPts, bridges,
    // 道路上第 s 公尺的位置和方向
    roadAt(s) {
      const u = Math.min(1, Math.max(0, s / roadLen));
      const p = roadCurve.getPointAt(u), t = roadCurve.getTangentAt(u);
      const y = nearBridge(p) ? bridgeY(p, bridges) : height(p.x, p.z) + 0.1;
      return { x: p.x, y, z: p.z, tx: t.x, tz: t.z };
    },
    // 離某一點最近的道路位置（公尺）
    roadNear(x, z) { return (roadLine.nearest(x, z)[0] / (roadPts.length - 1)) * roadLen; },
    update(t, dt) { for (const c2 of clouds) { c2.g.position.x = c2.x0 + Math.sin(t * 0.02 * c2.sp) * 10; } },
  };
}

function bridgeY(p, bridges) {
  let best = null, bd = 1e9;
  for (const b of bridges) { const d = Math.hypot(p.x - b.x, p.z - b.z); if (d < bd) { bd = d; best = b; } }
  const x = Math.min(3.8, bd);
  return WATER_Y + 0.4 + 0.62 * (1 - (x / 3.8) ** 2);
}

// 道路和溪流的交叉點（橋的位置），附道路方向
function findCrossings(road, creek) {
  const out = [];
  for (let i = 1; i < road.length; i++) {
    const a = road[i - 1], b = road[i];
    for (let j = 1; j < creek.length; j++) {
      const c = creek[j - 1], d = creek[j];
      const den = (b.x - a.x) * (d.z - c.z) - (b.z - a.z) * (d.x - c.x);
      if (Math.abs(den) < 1e-9) continue;
      const t = ((c.x - a.x) * (d.z - c.z) - (c.z - a.z) * (d.x - c.x)) / den;
      const u = ((c.x - a.x) * (b.z - a.z) - (c.z - a.z) * (b.x - a.x)) / den;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        const x = a.x + t * (b.x - a.x), z = a.z + t * (b.z - a.z);
        if (!out.some((o) => Math.hypot(o.x - x, o.z - z) < 6)) {
          const l = Math.hypot(b.x - a.x, b.z - a.z) || 1;
          out.push({ x, z, tx: (b.x - a.x) / l, tz: (b.z - a.z) / l });
        }
      }
    }
  }
  return out;
}

function greenTint(r, h0, l0) {
  return new THREE.Color().setHSL(h0 - 0.05 + r * 0.1, 0.5 + r * 0.15, l0 - 0.05 + r * 0.08);
}
/* 同一種東西（樹、石頭、花叢）一次畫完：parts 是 [[幾何, 要不要染色], ...]，描邊用全部零件合起來的外形 */
function instanced(parts, list, colorFn, s0, s1, R) {
  const g = new THREE.Group();
  if (!list.length) return g;
  const n = list.length;
  const meshes = parts.map(([geo, tint]) => {
    const m = new THREE.InstancedMesh(geo, MAT.toon, n);
    m.castShadow = true; m.receiveShadow = true;
    m.userData.tint = tint;
    return m;
  });
  const hull = new THREE.InstancedMesh(addOutlineNormals(merge(parts.map(([geo]) => geo))), OUTLINE, n);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  list.forEach(([x, y, z], i) => {
    const s = s0 + R() * (s1 - s0);
    e.set(0, R() * Math.PI * 2, 0); q.setFromEuler(e); sv.set(s, s * (0.9 + R() * 0.25), s); pv.set(x, y - 0.05, z);
    m.compose(pv, q, sv);
    const col = colorFn(R());
    for (const mesh of meshes) { mesh.setMatrixAt(i, m); if (mesh.userData.tint) mesh.setColorAt(i, col); }
    hull.setMatrixAt(i, m);
  });
  for (const mesh of [...meshes, hull]) { mesh.raycast = () => {}; mesh.computeBoundingSphere(); }
  g.add(...meshes, hull);
  return g;
}
