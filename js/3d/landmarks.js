/* 地圖上的地標：一個單元一個地方，每個地方都和單元的數學內容有一點關係。
     mine 質數礦坑：岩山、礦坑口、礦車裡發光的水晶
     mill 分數磨坊：會轉的風車（四片扇葉把圓分成四等份）、麥田
     oasis 小數綠洲：沙地、水池、棕櫚樹、帳篷
     arena 圓環競技場：圓形競技場，場地上畫著圓周和半徑
     palace 天秤宮殿：圓頂宮殿，前面有會擺動的大天秤（比）
     garden 孔雀花園：扇形花圃，中間的孔雀開屏（扇形）
     mountain 疾風山脈：雪山、風向袋、繞著山跑的風（速率）
     maze 規律迷宮：樹籬迷宮，中間是照規律疊起來的方塊塔
     castle 溪口王城：城堡；還沒開放時有鷹架和吊車（建造中）
   每個地標的原點在地面中心，正面朝 +z（鏡頭那一邊）。
   回傳 { group, top（標籤放多高）, flag（徽章旗插在哪）, update(t, dt), setState? } */
import { THREE, Kit, MAT, toonMat, waterMaterial, rng, matrixOf } from './kit.js';

export const C = {
  rock: '#94867a', rock2: '#7b6f64', rock3: '#a89a8b',
  wood: '#a06d3c', wood2: '#76492a', metal: '#727886', metal2: '#4f5461',
  stone: '#e8e1d4', stone2: '#cfc5b4', marble: '#f8f4ec',
  roof: '#e5493d', roof2: '#bf3a30',
  gold: '#ffc533', gold2: '#e3a21a',
  sand: '#f1dba4', sand2: '#e4c789',
  leaf: '#46a650', leaf2: '#5fbf5d', leaf3: '#2f8a43',
  hedge: '#3e9a4b', hedge2: '#52b25b',
  white: '#fbfaf5', dark: '#33293f', window: '#3d4b6e',
  purple: '#7d55d8', purple2: '#9b75ef',
  snow: '#f6f9ff', mtn: '#8f9cb5', mtn2: '#7b88a2',
};

const glowMaterial = () => new THREE.MeshBasicMaterial({ vertexColors: true });

/* ---------- 質數礦坑 ---------- */
function mine() {
  const k = new Kit(), R = rng(11);
  const rocks = [
    [0, 1.1, -1.9, 3.1, [1.25, 0.95, 1]], [-2.8, 0.6, -0.9, 2.0, [1, 0.9, 1]], [2.9, 0.5, -1.1, 1.9, [1.1, 0.85, 1]],
    [-1.3, 2.2, -3.1, 2.3, [1, 1, 1]], [1.6, 1.8, -3.3, 2.2, [1, 1.05, 1]], [-3.6, 0.2, 1.0, 1.0, [1.2, 0.8, 1]], [3.7, 0.2, 0.9, 0.9, [1, 0.8, 1.1]],
  ];
  rocks.forEach(([x, y, z, r, s], i) => k.ball(r, 1, [C.rock, C.rock2, C.rock3][i % 3], { p: [x, y, z], s, r: [R(), R() * 3, R()] }));
  // 礦坑口：黑色洞口＋木頭框
  k.box(1.8, 1.95, 1.5, C.dark, { p: [0, 0, 1.0] });
  k.box(0.34, 2.25, 0.38, C.wood, { p: [-1.05, 0, 1.78] });
  k.box(0.34, 2.25, 0.38, C.wood, { p: [1.05, 0, 1.78] });
  k.box(2.7, 0.4, 0.46, C.wood2, { p: [0, 2.15, 1.78] });
  k.box(0.05, 0.4, 0.05, C.dark, { p: [0.95, 1.8, 2.05] });
  k.ball(0.2, 0, '#ffd75e', { p: [0.95, 1.72, 2.05], glow: true });           // 燈籠
  // 鐵軌
  for (let z = 2.0; z < 5.6; z += 0.55) k.box(1.3, 0.08, 0.26, C.wood2, { p: [0, 0, z] });
  k.box(0.12, 0.1, 3.8, C.metal, { p: [-0.43, 0.08, 3.75] });
  k.box(0.12, 0.1, 3.8, C.metal, { p: [0.43, 0.08, 3.75] });
  // 礦車＋水晶（質數就像礦坑裡挖出來的寶石）
  k.box(1.4, 0.72, 1.05, C.metal, { p: [0, 0.32, 4.0] });
  k.box(1.52, 0.12, 1.17, C.metal2, { p: [0, 0.98, 4.0] });
  for (const x of [-0.62, 0.62]) for (const z of [3.68, 4.32]) k.cyl(0.26, 0.26, 0.14, 8, C.dark, { c: true, r: [0, 0, Math.PI / 2], p: [x, 0.3, z] });
  k.oct(0.38, '#b47cff', { p: [-0.32, 1.25, 3.85], s: [0.8, 1.3, 0.8], r: [0, 0.4, 0.2], glow: true });
  k.oct(0.33, '#5fe2ff', { p: [0.3, 1.2, 4.15], s: [0.8, 1.3, 0.8], r: [0, 0.2, -0.3], glow: true });
  k.oct(0.3, '#ff7be0', { p: [0.05, 1.32, 3.7], s: [0.8, 1.3, 0.8], glow: true });
  // 山上冒出來的水晶
  [[-1.9, 2.4, -0.5, 0.5, '#5fe2ff'], [2.1, 2.0, -0.7, -0.5, '#b47cff'], [0.7, 4.0, -2.5, 0.2, '#ff7be0'], [-2.9, 1.5, 0.6, 0.7, '#5fe2ff'], [-0.8, 4.1, -3.0, -0.3, '#b47cff']]
    .forEach(([x, y, z, rz, c]) => k.oct(0.5, c, { p: [x, y, z], s: [0.55, 1.5, 0.55], r: [0.1, 0, rz], glow: true }));
  // 十字鎬
  k.box(0.08, 1.3, 0.08, C.wood, { p: [1.65, 0, 2.2], r: [0, 0, 0.35] });
  k.box(0.85, 0.12, 0.12, C.metal2, { p: [1.25, 1.15, 2.2], r: [0, 0, 0.35] });
  const gm = glowMaterial();
  const group = k.build({ glowMat: gm });
  return {
    group, top: 5.4, flag: [-3.4, 0, 2.6],
    update(t) { const v = 0.82 + 0.18 * Math.sin(t * 2.2); gm.color.setRGB(v, v, v); },
  };
}

/* ---------- 分數磨坊 ---------- */
function mill() {
  const k = new Kit();
  k.cyl(1.3, 1.8, 4.4, 8, C.stone, {});
  k.cyl(1.62, 1.66, 0.24, 8, C.stone2, { p: [0, 1.4, 0] });
  k.cyl(1.45, 1.48, 0.22, 8, C.stone2, { p: [0, 3.0, 0] });
  k.box(0.8, 1.35, 0.3, C.wood2, { p: [0, 0, 1.62] });
  k.box(0.5, 0.6, 0.2, C.window, { p: [0, 2.3, 1.43] });
  k.box(0.45, 0.55, 0.2, C.window, { p: [1.25, 1.9, 0.52], r: [0, Math.PI / 2.6, 0] });
  k.cone(1.75, 2.0, 8, C.roof, { p: [0, 4.4, 0] });
  k.ball(0.18, 0, C.gold, { p: [0, 6.45, 0] });
  k.cyl(0.3, 0.3, 0.6, 8, C.wood2, { c: true, r: [Math.PI / 2, 0, 0], p: [0, 4.75, 1.35] });
  // 麥田和稻草捆
  for (const [x, z, c] of [[-4.3, 1.4, '#f0c75a'], [4.4, 1.1, '#e7d46a'], [-4.0, -2.4, '#e7d46a']]) {
    k.box(3.0, 0.16, 2.3, c, { p: [x, 0, z] });
    for (let i = 0; i < 4; i++) k.box(3.0, 0.06, 0.14, '#cf9f35', { p: [x, 0.16, z - 0.85 + i * 0.57] });
  }
  for (const [x, z, ry] of [[3.3, -1.8, 0.3], [3.9, -2.6, -0.4], [2.6, -2.9, 0.9]]) k.cyl(0.48, 0.48, 0.9, 8, '#e9c46a', { c: true, r: [0, ry, Math.PI / 2], p: [x, 0.48, z] });
  const group = k.build();

  // 扇葉：做一支（木頭支架＋帆布），轉 4 次拼起來；白、紅相間（4 等份）
  const blades = new Kit();
  for (let i = 0; i < 4; i++) {
    const arm = new Kit();
    arm.box(0.16, 3.7, 0.12, C.wood, { p: [0, 0.2, 0] });
    arm.box(1.05, 2.8, 0.06, i % 2 ? '#ff6f61' : '#fffaf0', { p: [0.6, 0.95, 0.05] });
    for (const y of [1.6, 2.5, 3.4]) arm.box(1.08, 0.05, 0.08, C.wood, { p: [0.6, y, 0.08] });
    arm.box(0.05, 2.8, 0.08, C.wood, { p: [1.11, 0.95, 0.08] });
    blades.addColored(arm.mergedParts(), new THREE.Matrix4().makeRotationZ((i * Math.PI) / 2));
  }
  blades.cyl(0.34, 0.34, 0.3, 8, C.wood2, { c: true, r: [Math.PI / 2, 0, 0], p: [0, 0, 0.1] });
  const pivot = new THREE.Group();
  pivot.position.set(0, 4.75, 1.7);
  pivot.add(blades.build({ cast: false }));
  group.add(pivot);
  return { group, top: 8.8, flag: [3.1, 0, 3.0], update(t) { pivot.rotation.z = -t * 0.9; } };
}

/* ---------- 小數綠洲 ---------- */
function palm(k, x, z, h, lean, ry, y0) {
  const p = new Kit(), n = 5, L = h / n;
  let bx = 0, by = 0;
  for (let i = 0; i < n; i++) {
    const a = (lean * (i + 0.5)) / n;
    p.cyl(0.17 - i * 0.012, 0.22 - i * 0.012, L + 0.06, 6, i % 2 ? '#a77b4f' : '#8f6640', { p: [bx, by, 0], r: [0, 0, -a] });
    bx += Math.sin(a) * L; by += Math.cos(a) * L;
  }
  for (let j = 0; j < 7; j++) {
    p.cone(0.42, 2.3, 4, j % 2 ? C.leaf : C.leaf2, { p: [bx, by, 0], r: [0, (j * Math.PI * 2) / 7, -1.95], s: [1, 1, 0.28] });
  }
  for (let j = 0; j < 3; j++) p.ball(0.17, 0, '#7a5230', { p: [bx + Math.cos(j * 2.1) * 0.22, by - 0.2, Math.sin(j * 2.1) * 0.22] });
  k.addColored(p.mergedParts(), matrixOf([x, y0, z], [0, ry, 0]));
}
function oasis() {
  const k = new Kit(), R = rng(5);
  k.cyl(5.1, 5.6, 0.25, 12, C.sand2, {});
  k.cyl(4.4, 5.0, 0.25, 12, C.sand, { p: [0, 0.25, 0] });
  k.cyl(2.5, 2.5, 0.06, 18, '#2f8fc8', { p: [-0.6, 0.45, 0.7], s: [1.3, 1, 1] });
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    k.ball(0.28 + R() * 0.15, 0, i % 2 ? '#d9c79c' : '#c4ae82', { p: [-0.6 + Math.cos(a) * 3.3, 0.5, 0.7 + Math.sin(a) * 2.55], r: [R(), R(), R()] });
  }
  palm(k, -3.4, -1.6, 4.4, 0.55, 0.4, 0.5);
  palm(k, -1.4, -2.6, 5.2, 0.35, 2.2, 0.5);
  palm(k, 2.2, 2.6, 3.8, 0.6, -2.4, 0.5);
  // 帳篷
  k.cone(1.7, 2.1, 4, '#f6efe0', { p: [2.5, 0.5, -1.8], r: [0, Math.PI / 4, 0] });
  k.cone(1.72, 0.55, 4, '#e5493d', { p: [2.5, 0.5, -1.8], r: [0, Math.PI / 4, 0], s: [1.03, 1, 1.03] });
  k.box(0.55, 0.85, 0.6, C.dark, { p: [2.5, 0.5, -1.0] });
  k.cyl(0.04, 0.04, 0.8, 4, C.wood2, { p: [2.5, 2.5, -1.8] });
  k.box(0.5, 0.3, 0.03, '#ffc533', { p: [2.77, 2.95, -1.8] });
  // 仙人掌
  k.cyl(0.3, 0.34, 1.7, 6, '#4f9a52', { p: [3.8, 0.5, 1.3] });
  k.ball(0.3, 0, '#4f9a52', { p: [3.8, 2.2, 1.3] });
  k.cyl(0.15, 0.15, 0.5, 6, '#4f9a52', { c: true, r: [0, 0, Math.PI / 2], p: [4.15, 1.3, 1.3] });
  k.cyl(0.15, 0.15, 0.6, 6, '#4f9a52', { p: [4.4, 1.3, 1.3] });
  // 寶箱
  k.box(0.9, 0.5, 0.6, C.wood, { p: [0.9, 0.5, 3.4], r: [0, -0.3, 0] });
  k.box(0.94, 0.22, 0.64, C.wood2, { p: [0.9, 1.0, 3.4], r: [0, -0.3, 0] });
  k.box(0.18, 0.22, 0.05, C.gold, { p: [0.99, 0.85, 3.72], r: [0, -0.3, 0] });
  const group = k.build();
  const water = new THREE.Mesh(new THREE.CylinderGeometry(2.35, 2.35, 0.1, 20), waterMaterial());
  water.scale.set(1.3, 1, 1);
  water.position.set(-0.6, 0.52, 0.7);
  water.receiveShadow = true;
  group.add(water);
  return { group, top: 6.2, flag: [-4.2, 0.5, 2.4], update() {} };
}

/* ---------- 圓環競技場 ---------- */
function arena() {
  const k = new Kit();
  k.cyl(3.15, 3.15, 0.14, 16, '#efd9a6', {});
  k.lathe([[3.1, 0], [3.95, 0], [3.95, 2.7], [3.1, 2.7], [3.1, 0]], 16, '#e7b377', {});
  k.lathe([[3.02, 2.7], [4.03, 2.7], [4.03, 2.88], [3.02, 2.88], [3.02, 2.7]], 16, '#f4d4a2', {});
  const Rf = 3.95 * Math.cos(Math.PI / 16) + 0.03;
  for (let i = 0; i < 16; i++) {
    const a = ((i + 0.5) * Math.PI * 2) / 16;
    if (Math.abs(Math.sin(a / 2)) < 0.2) continue;   // 正門那兩格不開窗
    for (const [y, h] of [[0.3, 0.9], [1.55, 0.8]]) k.box(0.6, h, 0.12, '#6b3f2a', { p: [Math.sin(a) * Rf, y, Math.cos(a) * Rf], r: [0, a, 0] });
  }
  // 正門
  k.box(0.55, 3.25, 0.95, '#f4d4a2', { p: [-1.08, 0, 4.0] });
  k.box(0.55, 3.25, 0.95, '#f4d4a2', { p: [1.08, 0, 4.0] });
  k.box(2.75, 0.55, 1.05, '#f4d4a2', { p: [0, 3.2, 4.0] });
  k.box(1.6, 2.55, 0.8, C.dark, { p: [0, 0, 3.92] });
  // 場地上畫圓：圓周、半徑、圓心
  k.torus(2.1, 0.06, 3, 40, Math.PI * 2, '#ffffff', { r: [Math.PI / 2, 0, 0], p: [0, 0.16, 0] });
  k.box(2.1, 0.03, 0.12, '#ffffff', { p: [1.05, 0.14, 0] });
  k.cyl(0.15, 0.15, 0.05, 8, '#ff6f61', { p: [0, 0.14, 0] });
  const group = k.build();
  // 牆上的旗子（會飄）
  const flags = [];
  [['#ff8a3d', 0.79], ['#ffc533', 2.36], ['#e5493d', 3.93], ['#5b7bff', 5.5]].forEach(([c, a]) => {
    const f = new Kit();
    f.cyl(0.06, 0.06, 1.7, 5, C.wood2, {});
    f.box(0.85, 0.5, 0.04, c, { p: [0.45, 1.15, 0] });
    const g = f.build({ cast: false });
    g.position.set(Math.sin(a) * 3.5, 2.88, Math.cos(a) * 3.5);
    group.add(g);
    flags.push(g);
  });
  return { group, top: 5.0, flag: [-4.9, 0, 2.4], update(t) { flags.forEach((g, i) => { g.rotation.y = Math.sin(t * 1.6 + i) * 0.35 - 0.6; }); } };
}

/* ---------- 天秤宮殿 ---------- */
function palace() {
  const k = new Kit();
  k.box(8.4, 0.35, 6.6, C.stone2, { p: [0, 0, -0.6] });
  k.box(7.6, 0.35, 5.8, C.stone, { p: [0, 0.35, -0.7] });
  k.box(6.8, 0.35, 5.0, C.marble, { p: [0, 0.7, -0.8] });
  k.box(5.6, 2.5, 3.0, C.marble, { p: [0, 1.05, -1.5] });
  for (const x of [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5]) k.cyl(0.2, 0.24, 2.4, 8, '#ffffff', { p: [x, 1.05, 0.55] });
  k.box(6.0, 0.4, 3.9, C.purple, { p: [0, 3.45, -1.05] });
  k.box(6.2, 0.14, 4.1, C.gold, { p: [0, 3.85, -1.05] });
  k.box(1.1, 1.8, 0.12, '#5a3d9e', { p: [0, 1.05, 0.02] });
  k.box(1.35, 0.16, 0.14, C.gold, { p: [0, 2.85, 0.03] });
  for (const x of [-1.6, 1.6]) k.box(0.5, 0.8, 0.1, C.window, { p: [x, 1.9, 0.02] });
  k.cyl(1.35, 1.35, 0.8, 10, C.marble, { p: [0, 3.99, -1.3] });
  k.dome(1.4, 10, 5, C.purple, { p: [0, 4.79, -1.3] });
  k.cone(0.16, 1.1, 6, C.gold, { p: [0, 6.15, -1.3] });
  k.ball(0.2, 0, C.gold, { p: [0, 7.3, -1.3] });
  for (const x of [-3.2, 3.2]) {
    k.cyl(0.6, 0.65, 3.8, 8, C.marble, { p: [x, 1.05, -2.0] });
    k.cyl(0.78, 0.78, 0.15, 8, C.gold, { p: [x, 4.6, -2.0] });
    k.ball(0.78, 1, C.purple2, { p: [x, 5.35, -2.0], s: [1, 1.2, 1] });
    k.cone(0.14, 0.9, 6, C.gold, { p: [x, 6.15, -2.0] });
  }
  // 天秤的底座和柱子
  k.box(1.4, 0.55, 1.4, C.stone, { p: [0, 0, 3.7] });
  k.cyl(0.14, 0.17, 2.75, 8, C.gold, { p: [0, 0.55, 3.7] });
  k.ball(0.24, 0, C.gold, { p: [0, 3.52, 3.7] });
  const group = k.build();

  // 天秤的橫桿和兩個秤盤（會擺動，秤盤一直保持水平）
  const beam = new THREE.Group();
  beam.position.set(0, 3.25, 3.7);
  const bk = new Kit();
  bk.box(3.8, 0.16, 0.18, C.gold, { p: [0, -0.08, 0] });
  bk.ball(0.13, 0, C.gold2, { p: [-1.9, 0, 0] });
  bk.ball(0.13, 0, C.gold2, { p: [1.9, 0, 0] });
  beam.add(bk.build({ cast: false }));
  const pans = [-1, 1].map((side) => {
    const pk = new Kit();
    pk.cyl(0.03, 0.03, 1.1, 4, C.gold2, { p: [0, -1.1, 0] });
    pk.cyl(0.75, 0.5, 0.16, 10, C.gold, { p: [0, -1.3, 0] });
    if (side < 0) { pk.box(0.4, 0.4, 0.4, '#5a3d9e', { p: [-0.21, -1.14, 0] }); pk.box(0.4, 0.4, 0.4, '#5a3d9e', { p: [0.21, -1.14, 0] }); }
    else for (const [x, z] of [[-0.25, 0.1], [0.23, 0.1], [0, -0.2]]) pk.ball(0.18, 0, '#ff6f61', { p: [x, -0.97, z] });
    const g = pk.build({ cast: false });
    const pivot = new THREE.Group();
    pivot.position.set(side * 1.8, 0, 0);
    pivot.add(g);
    beam.add(pivot);
    return pivot;
  });
  group.add(beam);
  return {
    group, top: 7.8, flag: [-4.6, 0, 2.6],
    update(t) { beam.rotation.z = Math.sin(t * 0.8) * 0.1; for (const p of pans) p.rotation.z = -beam.rotation.z; },
  };
}

/* ---------- 孔雀花園 ---------- */
function garden() {
  const k = new Kit(), R = rng(21);
  k.cyl(4.3, 4.4, 0.1, 24, '#efe2c4', {});
  const flowers = ['#ff7eb6', '#ffd23f', '#a77bff', '#ff6b6b', '#ffffff', '#ff9f43'];
  for (let i = 0; i < 6; i++) {
    const t0 = -Math.PI / 2 + 0.09 + (i * Math.PI) / 3, tl = Math.PI / 3 - 0.18;
    k.annulus(1.35, 3.7, t0, tl, 0.26, '#8a5a3c', { p: [0, 0.1, 0] });
    k.annulus(1.45, 3.6, t0 + 0.02, tl - 0.04, 0.1, flowers[i], { p: [0, 0.36, 0] });
    for (let j = 0; j < 6; j++) {
      const a = t0 + 0.1 + R() * (tl - 0.2), r = 1.8 + R() * 1.6;
      k.ball(0.13 + R() * 0.05, 0, j % 3 ? flowers[i] : C.leaf2, { p: [Math.cos(a) * r, 0.5, -Math.sin(a) * r] });
    }
  }
  // 圓形樹籬（前面留一個入口）＋拱門
  const gap = 0.75;
  k.torus(4.15, 0.34, 5, 30, Math.PI * 2 - gap, C.hedge, { r: [Math.PI / 2, 0, Math.PI / 2 + gap / 2], p: [0, 0.3, 0] });
  k.torus(1.05, 0.14, 5, 10, Math.PI, C.hedge2, { p: [0, 0.1, 4.15] });
  for (let j = 0; j < 7; j++) {
    const a = (j / 6) * Math.PI;
    k.ball(0.14, 0, j % 2 ? '#ff7eb6' : '#ffffff', { p: [Math.cos(a) * 1.05, 0.1 + Math.sin(a) * 1.05, 4.32] });
  }
  // 孔雀站的台子
  k.cyl(1.05, 1.15, 0.5, 10, C.stone, {});
  const group = k.build();

  // 孔雀（尾巴是一個大扇形，會慢慢開合）
  const bird = new Kit(), y0 = 0.5;
  for (const x of [-0.15, 0.15]) bird.cyl(0.05, 0.05, 0.5, 4, '#c98a3a', { p: [x, y0, 0.05] });
  bird.ball(0.5, 1, '#1f63c9', { p: [0, y0 + 0.85, 0], s: [0.85, 1.05, 1.1] });
  bird.cyl(0.14, 0.2, 0.9, 6, '#1f63c9', { p: [0, y0 + 1.15, 0.25], r: [0.25, 0, 0] });
  bird.ball(0.26, 1, '#2a7ae0', { p: [0, y0 + 2.1, 0.5] });
  bird.cone(0.07, 0.28, 4, '#f2b632', { c: true, p: [0, y0 + 2.07, 0.82], r: [Math.PI / 2, 0, 0] });
  for (const x of [-0.13, 0.13]) { bird.ball(0.06, 0, '#ffffff', { p: [x, y0 + 2.15, 0.68] }); bird.ball(0.035, 0, '#1d2742', { p: [x * 1.04, y0 + 2.15, 0.73] }); }
  for (const x of [-0.1, 0, 0.1]) { bird.cyl(0.015, 0.015, 0.35, 3, '#1f63c9', { p: [x, y0 + 2.3, 0.45], r: [0, 0, -x * 2] }); bird.ball(0.06, 0, '#4fd1c5', { p: [x * 1.7, y0 + 2.64, 0.45] }); }
  const peacock = new THREE.Group();
  peacock.scale.setScalar(1.3);
  peacock.position.y = 0.5 - 0.5 * 1.3;   // 放大後腳還是踩在台子上（台子高 0.5）
  peacock.add(bird.build());
  group.add(peacock);
  const tail = new Kit(), N = 9, span = 2.5, R0 = 2.5;
  for (let i = 0; i < N; i++) {
    const t0 = Math.PI - span / 2 + (i * span) / N;
    tail.sector(R0, 0.08, 2, t0 + 0.01, span / N - 0.02, ['#1fb5a3', '#2f9e44', '#3b6fe0'][i % 3], { r: [Math.PI / 2, 0, 0] });
    const ac = t0 + span / N / 2;
    for (const [rr, sz] of [[2.05, 0.26], [1.3, 0.18]]) {
      const x = rr * Math.sin(ac), y = -rr * Math.cos(ac);
      tail.cyl(sz, sz, 0.06, 8, '#ffd23f', { c: true, r: [Math.PI / 2, 0, 0], p: [x, y, 0.07] });
      tail.cyl(sz * 0.52, sz * 0.52, 0.08, 8, '#1d3fa0', { c: true, r: [Math.PI / 2, 0, 0], p: [x, y, 0.09] });
    }
  }
  const fan = new THREE.Group();
  fan.position.set(0, y0 + 0.75, -0.4);
  fan.add(tail.build({ cast: true }));
  peacock.add(fan);
  return { group, top: 5.6, flag: [4.9, 0, 1.4], update(t) { const s = 0.94 + 0.06 * Math.sin(t * 1.1); fan.scale.set(s, s, 1); } };
}

/* ---------- 疾風山脈 ---------- */
function mountain() {
  const k = new Kit(), R = rng(3);
  k.cone(3.4, 8.0, 7, C.mtn, { p: [-0.6, 0, -1.6], r: [0, 0.2, 0] });
  k.cone(1.33, 3.0, 7, C.snow, { p: [-0.6, 5.05, -1.6], r: [0, 0.2, 0] });
  k.cone(2.6, 5.6, 6, C.mtn2, { p: [3.0, 0, 0.0], r: [0, 0.5, 0] });
  k.cone(1.1, 2.3, 6, C.snow, { p: [3.0, 3.35, 0.0], r: [0, 0.5, 0] });
  k.cone(2.1, 4.2, 6, C.mtn, { p: [-3.7, 0, 1.3], r: [0, 0.9, 0] });
  k.cone(0.72, 1.4, 6, C.snow, { p: [-3.7, 2.85, 1.3], r: [0, 0.9, 0] });
  for (let i = 0; i < 7; i++) {
    const a = R() * Math.PI * 2, r = 3.2 + R() * 1.3;
    k.ball(0.5 + R() * 0.45, 0, i % 2 ? C.rock : C.rock3, { p: [Math.cos(a) * r, 0.2, Math.sin(a) * r * 0.8 + 0.4], r: [R(), R(), R()] });
  }
  for (const [x, z, h] of [[1.2, 3.3, 1.6], [-1.6, 3.6, 1.3], [4.6, 2.6, 1.4]]) {
    k.cyl(0.12, 0.14, 0.4, 5, C.wood2, { p: [x, 0, z] });
    k.cone(0.8, h, 7, C.leaf3, { p: [x, 0.35, z] });
    k.cone(0.6, h * 0.8, 7, C.leaf, { p: [x, 0.35 + h * 0.45, z] });
  }
  // 風向袋（插在第二座山頂）
  k.cyl(0.06, 0.06, 1.7, 5, C.wood2, { p: [3.0, 5.45, 0.0] });
  const group = k.build();
  const sockK = new Kit();
  sockK.cyl(0.22, 0.3, 0.45, 8, '#ff5a5f', { c: true, r: [0, 0, Math.PI / 2], p: [-0.23, 0, 0] });
  sockK.cyl(0.15, 0.22, 0.45, 8, '#ffffff', { c: true, r: [0, 0, Math.PI / 2], p: [-0.68, 0, 0] });
  sockK.cyl(0.08, 0.15, 0.45, 8, '#ff5a5f', { c: true, r: [0, 0, Math.PI / 2], p: [-1.13, 0, 0] });
  const sock = new THREE.Group();
  sock.position.set(3.0, 7.0, 0.0);
  sock.add(sockK.build({ cast: false }));
  group.add(sock);
  // 繞著山跑的風
  const windMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.85 });
  const winds = [[4.6, 2.9, 0.12, 0.7], [3.7, 5.2, -0.18, -0.9], [5.3, 1.4, 0.08, 0.5]].map(([r, y, tilt, sp]) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.07, 4, 48, Math.PI * 1.25), windMat);
    const holder = new THREE.Group();
    holder.position.set(-0.4, y, -1.0);
    holder.rotation.set(Math.PI / 2 + tilt, 0, 0);
    holder.add(m);
    m.raycast = () => {};
    group.add(holder);
    return { m, sp };
  });
  return {
    group, top: 8.6, flag: [-0.6, 7.6, -1.6],
    update(t) { sock.rotation.y = Math.sin(t * 2.3) * 0.5 + 0.4; for (const w of winds) w.m.rotation.z = t * w.sp; },
  };
}

/* ---------- 規律迷宮 ---------- */
function maze() {
  const k = new Kit();
  k.box(7.6, 0.3, 7.6, '#e3d6b8', {});
  const MAZE = [
    '#########',
    '#...#...#',
    '#.#.#.#.#',
    '#.#...#.#',
    '#.##.##.#',
    '#...o...#',
    '###.#.###',
    '#.......#',
    '####.####',
  ];
  const cell = 0.82, off = (MAZE.length - 1) / 2;
  MAZE.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch !== '#') return;
    k.box(cell, 1.05, cell, (i + j) % 2 ? C.hedge : C.hedge2, { p: [(i - off) * cell, 0.3, (j - off) * cell] });
  }));
  for (const x of [-0.85, 0.85]) k.box(0.5, 1.7, 0.5, C.stone, { p: [x, 0.3, 3.95] });
  k.box(2.2, 0.36, 0.56, C.stone, { p: [0, 2.0, 3.95] });
  for (const x of [-3.8, 3.8]) for (const z of [-3.8, 3.8]) { k.cyl(0.32, 0.32, 1.5, 6, C.stone, { p: [x, 0, z] }); k.ball(0.22, 0, C.gold, { p: [x, 1.68, z] }); }
  k.cyl(0.5, 0.6, 0.3, 8, C.stone, { p: [0, 0.3, 0] });
  const group = k.build();
  // 中間的規律塔：紅、藍、黃、紅、藍……一層轉一點
  const tk = new Kit(), cols = ['#ff5a5f', '#5b7bff', '#ffd23f', '#ff5a5f', '#5b7bff'];
  cols.forEach((c, i) => tk.box(0.62, 0.62, 0.62, c, { p: [0, i * 0.62, 0], r: [0, (i * Math.PI) / 8, 0] }));
  tk.oct(0.3, '#fff3a0', { p: [0, 3.55, 0], glow: true });
  const tower = new THREE.Group();
  tower.position.set(0, 0.6, 0);
  tower.add(tk.build());
  group.add(tower);
  return { group, top: 5.0, flag: [-4.8, 0, 2.6], update(t) { tower.rotation.y = t * 0.6; } };
}

/* ---------- 溪口王城 ---------- */
function castle() {
  const k = new Kit(), S = 5.2;
  const wall = '#ebe4d8';
  k.box(2 * S + 0.9, 2.6, 0.9, wall, { p: [0, 0, -S] });
  k.box(0.9, 2.6, 2 * S, wall, { p: [-S, 0, 0] });
  k.box(0.9, 2.6, 2 * S, wall, { p: [S, 0, 0] });
  for (const x of [-3.25, 3.25]) k.box(S - 1.3, 2.6, 0.9, wall, { p: [x, 0, S] });
  // 垛口
  for (let x = -S + 1.2; x <= S - 1.2; x += 1.0) {
    k.box(0.5, 0.5, 0.95, C.stone2, { p: [x, 2.6, -S] });
    if (Math.abs(x) > 2.3) k.box(0.5, 0.5, 0.95, C.stone2, { p: [x, 2.6, S] });
    k.box(0.95, 0.5, 0.5, C.stone2, { p: [-S, 2.6, x] });
    k.box(0.95, 0.5, 0.5, C.stone2, { p: [S, 2.6, x] });
  }
  for (const x of [-S, S]) for (const z of [-S, S]) {
    k.cyl(1.15, 1.25, 4.2, 10, '#efe9df', { p: [x, 0, z] });
    k.cyl(1.34, 1.34, 0.36, 10, C.stone2, { p: [x, 4.2, z] });
    k.cone(1.45, 2.4, 10, C.roof, { p: [x, 4.56, z] });
    k.ball(0.16, 0, C.gold, { p: [x, 7.0, z] });
    k.box(0.4, 0.7, 0.1, C.window, { p: [x, 2.4, z + 1.17], r: [0, 0, 0] });
  }
  // 城門
  for (const x of [-1.75, 1.75]) {
    k.box(1.3, 3.4, 1.4, '#efe9df', { p: [x, 0, S] });
    k.cone(1.05, 1.5, 4, C.roof2, { p: [x, 3.4, S], r: [0, Math.PI / 4, 0] });
  }
  k.box(2.6, 0.55, 1.1, '#efe9df', { p: [0, 2.3, S] });
  k.box(2.2, 2.3, 1.0, C.dark, { p: [0, 0, S] });
  // 主堡
  k.box(5.2, 4.6, 4.4, '#f2ece2', { p: [0, 0, -1.2] });
  k.box(5.5, 0.3, 4.7, C.stone2, { p: [0, 4.6, -1.2] });
  k.cone(4.0, 2.8, 4, C.roof, { p: [0, 4.9, -1.2], r: [0, Math.PI / 4, 0] });
  for (const x of [-1.4, 1.4]) k.box(0.55, 0.95, 0.1, C.window, { p: [x, 2.4, 1.02] });
  k.box(0.7, 1.15, 0.1, C.window, { p: [0, 1.0, 1.02] });
  for (const x of [-2.0, 2.0]) { k.box(0.75, 1.7, 0.06, '#4f6bff', { p: [x, 2.0, 1.04] }); k.box(0.75, 0.16, 0.08, C.gold, { p: [x, 3.6, 1.05] }); }
  // 最高的塔
  k.cyl(1.3, 1.4, 7.6, 10, '#f2ece2', { p: [1.9, 0, -2.6] });
  k.cyl(1.48, 1.48, 0.36, 10, C.stone2, { p: [1.9, 7.6, -2.6] });
  k.cone(1.7, 3.0, 10, C.roof, { p: [1.9, 7.96, -2.6] });
  k.box(0.45, 0.8, 0.1, C.window, { p: [1.9, 5.6, -1.25] });
  k.cyl(0.05, 0.05, 1.6, 5, C.gold2, { p: [1.9, 10.8, -2.6] });
  k.box(1.1, 0.62, 0.05, C.gold, { p: [2.47, 11.6, -2.6] });
  const group = k.build();

  // 還沒開放：鐵柵門、鷹架、吊車、施工牌
  const lock = new Kit();
  for (let i = 0; i < 5; i++) lock.box(0.09, 2.2, 0.1, '#3a3f4c', { p: [-0.9 + i * 0.45, 0, S + 0.52] });
  for (const y of [0.6, 1.3, 2.0]) lock.box(2.1, 0.09, 0.1, '#3a3f4c', { p: [0, y, S + 0.53] });
  const wood = '#d2a368';
  for (const x of [0.2, 3.6]) for (const z of [-4.3, -0.9]) lock.box(0.13, 9.4, 0.13, wood, { p: [x, 0, z] });
  for (const y of [2.4, 4.4, 6.4, 8.4]) {
    lock.box(3.55, 0.12, 0.13, wood, { p: [1.9, y, -0.9] });
    lock.box(3.55, 0.12, 0.13, wood, { p: [1.9, y, -4.3] });
    lock.box(0.13, 0.12, 3.55, wood, { p: [0.2, y, -2.6] });
    lock.box(0.13, 0.12, 3.55, wood, { p: [3.6, y, -2.6] });
    lock.box(3.4, 0.08, 0.6, '#b9874c', { p: [1.9, y + 0.12, -0.6] });
  }
  for (const y of [2.4, 4.4, 6.4]) lock.box(0.08, 2.75, 0.08, wood, { p: [1.9, y, -0.85], r: [0, 0, 0.95] });
  lock.cyl(0.05, 0.05, 1.4, 4, C.wood2, { p: [3.2, 0, S + 2.0] });
  lock.box(1.8, 0.85, 0.1, '#ff9f43', { p: [3.2, 1.0, S + 2.0] });
  for (const x of [-0.55, 0, 0.55]) lock.box(0.14, 0.95, 0.06, C.dark, { p: [3.2 + x, 0.96, S + 2.07], r: [0, 0, 0.6] });
  lock.box(0.35, 11, 0.35, '#f2b632', { p: [-3.4, 0, -3.3] });
  const locked = lock.build();
  const jib = new THREE.Group();
  jib.position.set(-3.4, 11, -3.3);
  const jk = new Kit();
  jk.box(7.2, 0.3, 0.3, '#f2b632', { p: [2.3, 0, 0] });
  jk.box(0.9, 0.7, 0.6, C.metal2, { p: [-1.1, -0.7, 0] });
  jk.box(0.75, 0.7, 0.75, '#e5493d', { p: [0, -0.75, 0.35] });
  jk.box(0.03, 3.2, 0.03, C.dark, { p: [4.9, -3.2, 0] });
  jk.box(0.62, 0.5, 0.62, C.stone2, { p: [4.9, -3.7, 0] });
  jib.add(jk.build({ cast: false }));
  locked.add(jib);
  group.add(locked);
  return {
    group, top: 12.6, flag: null,
    update(t) { jib.rotation.y = Math.sin(t * 0.35) * 0.55 + 0.2; },
    setState({ open }) { locked.visible = !open; },
  };
}

/* ---------- 其他（資料裡寫了還沒做的地形） ---------- */
function generic() {
  const k = new Kit();
  k.box(3.2, 2.4, 3.0, C.stone, {});
  k.cone(2.5, 1.8, 4, C.roof, { p: [0, 2.4, 0], r: [0, Math.PI / 4, 0] });
  k.box(0.8, 1.3, 0.1, C.wood2, { p: [0, 0, 1.52] });
  return { group: k.build(), top: 5, flag: [-2.8, 0, 1.8], update() {} };
}


/* ---------- 風雲氣象台（天氣）：山丘上的氣象台、會轉的風向標和風速杯、飄著下雨的雲、彩虹 ---------- */
function weather() {
  const k = new Kit(), R = rng(31);
  k.cyl(4.4, 5.2, 1.2, 10, '#9bc46a', {});
  for (let i = 0; i < 6; i++) { const a = R() * Math.PI * 2; k.ball(0.6 + R() * 0.4, 0, C.rock3, { p: [Math.cos(a) * 4.2, 1.0, Math.sin(a) * 4.0], r: [R(), R(), R()] }); }
  k.box(3.6, 2.4, 3.0, C.marble, { p: [0, 1.2, -0.6] });
  k.box(3.9, 0.3, 3.3, '#4f7fd8', { p: [0, 3.6, -0.6] });
  k.dome(1.35, 12, 6, '#e8eef8', { p: [0, 3.9, -0.6] });
  k.box(0.5, 1.4, 0.4, '#3d4b6e', { p: [0, 4.4, 0.55], r: [-0.4, 0, 0] });
  k.box(0.9, 1.4, 0.12, C.wood2, { p: [0, 1.2, 0.92] });
  for (const x of [-1.2, 1.2]) k.box(0.55, 0.6, 0.1, C.window, { p: [x, 2.2, 0.92] });
  // 百葉箱
  k.box(0.1, 1.2, 0.1, C.white, { p: [2.9, 1.2, 1.6] });
  k.box(0.9, 0.8, 0.8, C.white, { p: [2.9, 2.4, 1.6] });
  k.box(0.98, 0.12, 0.9, '#dfe6ee', { p: [2.9, 3.2, 1.6] });
  // 雨量筒
  k.cyl(0.25, 0.25, 0.8, 10, '#cfd6e0', { p: [-2.6, 1.2, 1.7] });
  // 彩虹（四道半圓）
  ['#ff6b6b', '#ffd23f', '#5fd36b', '#5b9bff'].forEach((c, i) => k.torus(3.4 - i * 0.28, 0.14, 5, 24, Math.PI, c, { p: [-0.5, 1.2, -3.6] }));
  k.cyl(0.06, 0.06, 2.0, 5, C.metal2, { p: [1.6, 3.6, -1.6] });
  k.cyl(0.05, 0.05, 0.5, 5, C.metal2, { p: [-1.6, 3.6, -1.4] });
  const group = k.build();
  // 風向標
  const vane = new THREE.Group();
  vane.position.set(1.6, 5.6, -1.6);
  const vk = new Kit();
  vk.box(1.6, 0.08, 0.08, C.metal2, { c: true });
  vk.cone(0.18, 0.4, 4, '#e5493d', { c: true, p: [0.95, 0, 0], r: [0, 0, -Math.PI / 2] });
  vk.box(0.06, 0.5, 0.4, '#e5493d', { c: true, p: [-0.75, 0, 0] });
  vane.add(vk.build({ cast: false }));
  group.add(vane);
  // 風速杯
  const cups = new THREE.Group();
  cups.position.set(-1.6, 4.1, -1.4);
  const ck = new Kit();
  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3;
    ck.box(0.7, 0.05, 0.05, C.metal2, { c: true, p: [Math.cos(a) * 0.35, 0, Math.sin(a) * 0.35], r: [0, -a, 0] });
    ck.ball(0.16, 1, '#ffffff', { p: [Math.cos(a) * 0.7, 0, Math.sin(a) * 0.7] });
  }
  cups.add(ck.build({ cast: false }));
  group.add(cups);
  // 下雨的雲
  const cloud = new THREE.Group();
  cloud.position.set(-2.2, 7.2, 0.6);
  const cl = new Kit();
  for (const [x, y, r] of [[-0.8, 0, 0.8], [0, 0.3, 1.0], [0.9, 0, 0.75], [0.2, -0.2, 0.8]]) cl.ball(r, 1, '#c9d3e6', { p: [x, y, 0], s: [1, 0.8, 0.9] });
  cloud.add(cl.build({ cast: false }));
  const drops = [];
  const dropMat = new THREE.MeshBasicMaterial({ color: '#5fb4ff' });
  for (let i = 0; i < 6; i++) {
    const d = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.3, 5), dropMat);
    d.rotation.x = Math.PI; d.position.set(-0.9 + i * 0.36, -0.8, (i % 2) * 0.3 - 0.15); d.raycast = () => {};
    cloud.add(d); drops.push(d);
  }
  group.add(cloud);
  return {
    group, top: 8.4, flag: [3.8, 1.2, -1.6],
    update(t) {
      vane.rotation.y = Math.sin(t * 0.7) * 1.2; cups.rotation.y = t * 4; cloud.position.x = -2.2 + Math.sin(t * 0.4) * 0.8;
      drops.forEach((d, i) => { d.position.y = -0.8 - ((t * 2.2 + i * 0.37) % 1) * 3.5; });
    },
  };
}

/* ---------- 熱脹熔爐坊（熱）：紅磚鍛造坊、發光的熔爐、冒煙的煙囪、鐵砧、慢慢升起的天燈 ---------- */
function forge() {
  const k = new Kit();
  k.box(7.2, 0.3, 6.0, '#cfc3ad', {});
  k.box(5.0, 3.0, 3.6, '#c4553b', { p: [0, 0.3, -1.0] });
  for (let y = 0.8; y < 3.2; y += 0.6) k.box(5.04, 0.06, 3.64, '#a8432e', { p: [0, 0.3 + y, -1.0] });
  k.cone(3.9, 1.8, 4, '#5b3b2a', { p: [0, 3.3, -1.0], r: [0, Math.PI / 4, 0], s: [1, 1, 0.75] });
  k.box(1.1, 4.2, 1.1, '#9e3a28', { p: [1.6, 3.0, -1.8] });
  k.box(1.3, 0.3, 1.3, '#6b2a1d', { p: [1.6, 7.2, -1.8] });
  k.box(1.9, 1.5, 0.5, '#5e2a1d', { p: [-1.0, 0.3, 0.75] });
  k.box(1.3, 0.9, 0.2, '#ffb02e', { p: [-1.0, 0.5, 1.0], glow: true });
  k.box(0.9, 0.5, 0.22, '#fff2a8', { p: [-1.0, 0.6, 1.05], glow: true });
  k.box(0.9, 1.3, 0.12, C.wood2, { p: [1.3, 0.3, 0.82] });
  k.box(0.6, 0.6, 0.6, C.wood, { p: [2.6, 0.3, 2.0] });
  k.box(1.2, 0.35, 0.5, C.metal2, { p: [2.6, 0.9, 2.0] });
  k.box(0.08, 0.9, 0.08, C.wood, { p: [2.9, 1.25, 2.3], r: [0, 0, 1.1] });
  k.cyl(0.5, 0.45, 0.8, 10, C.wood, { p: [-2.9, 0.3, 1.9] });
  k.cyl(0.42, 0.42, 0.05, 10, '#4cb8ee', { p: [-2.9, 1.05, 1.9], glow: true });
  for (let i = 0; i < 4; i++) k.box(1.6, 0.12, 0.12, i % 2 ? '#ff7a3a' : C.metal, { p: [0.4, 0.3 + i * 0.14, 2.4], glow: i % 2 === 1 });
  const gm = new THREE.MeshBasicMaterial({ vertexColors: true });
  const group = k.build({ glowMat: gm });
  const smokeMat = new THREE.MeshLambertMaterial({ color: '#e6e3df', transparent: true, opacity: 0.85 });
  const puffs = [0, 1, 2, 3].map(() => { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 0), smokeMat); m.raycast = () => {}; group.add(m); return m; });
  const lantern = new THREE.Group();
  const lk = new Kit();
  lk.box(0.8, 1.0, 0.8, '#ffd76a', { glow: true });
  lk.box(0.84, 0.1, 0.84, '#e5493d', { p: [0, 0.95, 0] });
  lantern.add(lk.build({ cast: false }));
  group.add(lantern);
  return {
    group, top: 8.6, flag: [-3.4, 0.3, -2.4],
    update(t) {
      const v = 0.8 + 0.2 * Math.sin(t * 6) * Math.sin(t * 2.3); gm.color.setRGB(v, v, v);
      puffs.forEach((m, i) => { const u = (t * 0.35 + i / 4) % 1; m.position.set(1.6 + Math.sin(u * 6 + i) * 0.4, 7.6 + u * 3.2, -1.8); m.scale.setScalar(0.6 + u * 1.2); });
      const u = (t * 0.06) % 1; lantern.position.set(-2.2 + Math.sin(t * 0.8) * 0.5, 3.6 + u * 5.5, -2.6); lantern.visible = u < 0.95;
    },
  };
}

/* ---------- 地層火山谷（大地）：冒煙的火山、發光的熔岩、彩色的岩層斷崖、化石 ---------- */
function volcano() {
  const k = new Kit(), R = rng(9);
  k.cone(4.6, 6.4, 9, '#7a6457', { p: [-0.8, 0, -1.6], r: [0, 0.3, 0] });
  k.cyl(1.25, 1.45, 0.5, 9, '#5d4a40', { p: [-0.8, 5.7, -1.6], r: [0, 0.3, 0] });
  k.cyl(1.0, 1.0, 0.12, 9, '#ff7a1a', { p: [-0.8, 6.05, -1.6], glow: true });
  for (const [a, len] of [[0.3, 4.6], [1.4, 3.8], [-0.7, 3.2]]) {
    for (let i = 0; i < 5; i++) {
      const f = i / 5, r = 1.2 + f * (len - 0.8), y = 6.0 * (1 - r / 4.9);
      k.box(0.45, 0.14, 0.9, i % 2 ? '#ff8a1a' : '#ffb02e', { p: [-0.8 + Math.sin(a) * r, Math.max(0.1, y), -1.6 + Math.cos(a) * r], r: [0.9 * (1 - f), a, 0], glow: true });
    }
  }
  ['#c98f5a', '#e3c27d', '#9b7b62', '#d9a46a', '#8a6f5c'].forEach((c, i) => k.box(3.0 - i * 0.12, 0.6, 2.4, c, { p: [3.3, i * 0.6, 0.8] }));
  k.box(2.2, 0.3, 1.8, '#79b052', { p: [3.3, 3.0, 0.8] });
  for (let i = 0; i < 6; i++) { const a = R() * Math.PI * 2; k.ball(0.4 + R() * 0.4, 0, i % 2 ? '#6b5a50' : '#8a7a6e', { p: [-0.8 + Math.cos(a) * 4.6, 0.25, -1.6 + Math.sin(a) * 4.2], r: [R(), R(), R()] }); }
  k.box(1.0, 0.7, 0.8, '#d8cbb2', { p: [1.4, 0, 2.6], r: [0, 0.4, 0] });
  k.torus(0.22, 0.06, 4, 10, Math.PI * 1.6, '#8a7a6e', { p: [1.6, 0.38, 2.98], r: [0, 0.4, 0] });
  const gm = new THREE.MeshBasicMaterial({ vertexColors: true });
  const group = k.build({ glowMat: gm });
  const smokeMat = new THREE.MeshLambertMaterial({ color: '#b9b2ad', transparent: true, opacity: 0.8 });
  const puffs = [0, 1, 2, 3, 4].map(() => { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), smokeMat); m.raycast = () => {}; group.add(m); return m; });
  return {
    group, top: 9.2, flag: [3.3, 3.3, 0.8],
    update(t) {
      const v = 0.78 + 0.22 * Math.sin(t * 1.7); gm.color.setRGB(v, v, v);
      puffs.forEach((m, i) => { const u = (t * 0.25 + i / 5) % 1; m.position.set(-0.8 + Math.sin(u * 5 + i) * 0.6, 6.4 + u * 3.4, -1.6); m.scale.setScalar(0.5 + u * 1.6); });
    },
  };
}

/* ---------- 雷電磁石塔（電磁）：繞著線圈的高塔、頂端會閃的電球、馬蹄形磁鐵、指南針、電池 ---------- */
function magnet() {
  const k = new Kit();
  k.cyl(3.0, 3.4, 0.5, 10, C.stone2, {});
  k.cyl(0.9, 1.4, 6.0, 8, '#6a7891', { p: [0, 0.5, -1.0] });
  for (let i = 0; i < 9; i++) k.torus(1.25 - i * 0.05, 0.14, 5, 18, Math.PI * 2, '#d98a3a', { r: [Math.PI / 2, 0, 0], p: [0, 1.4 + i * 0.5, -1.0] });
  k.cyl(0.5, 0.7, 0.5, 8, C.metal2, { p: [0, 6.5, -1.0] });
  // 馬蹄形磁鐵：上面是紅色半圓，兩腳一紅（N）一藍（S）
  k.torus(1.0, 0.35, 6, 14, Math.PI, '#e5493d', { p: [3.1, 1.7, 1.6] });
  k.box(0.7, 1.2, 0.7, '#e5493d', { p: [2.1, 0.5, 1.6] });
  k.box(0.7, 1.2, 0.7, '#4f6bff', { p: [4.1, 0.5, 1.6] });
  for (const x of [2.1, 4.1]) k.box(0.72, 0.35, 0.72, '#e8eef6', { p: [x, 0.5, 1.6] });
  // 指南針
  k.cyl(0.8, 0.85, 0.25, 16, '#f2e6cc', { p: [-2.6, 0.5, 1.8] });
  k.box(0.55, 0.06, 0.16, '#e5493d', { p: [-2.32, 0.76, 1.8] });
  k.box(0.55, 0.06, 0.16, '#4f6bff', { p: [-2.88, 0.77, 1.8] });
  // 電池和電線
  k.cyl(0.35, 0.35, 1.2, 10, '#3b3f52', { c: true, r: [0, 0, Math.PI / 2], p: [-1.6, 0.85, 2.6] });
  k.cyl(0.36, 0.36, 0.35, 10, '#ffc533', { c: true, r: [0, 0, Math.PI / 2], p: [-1.15, 0.85, 2.6] });
  k.box(0.08, 0.08, 2.6, '#e5493d', { p: [-0.9, 0.5, 1.3] });
  const group = k.build();
  const orbMat = new THREE.MeshBasicMaterial({ color: '#9be8ff' });
  const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.75, 1), orbMat);
  orb.position.set(0, 7.6, -1.0);
  orb.raycast = () => {};
  group.add(orb);
  const boltMat = new THREE.LineBasicMaterial({ color: '#e9fbff' });
  const bolts = [0, 1, 2].map(() => {
    const g = new THREE.BufferGeometry().setFromPoints(Array.from({ length: 6 }, () => new THREE.Vector3()));
    const l = new THREE.Line(g, boltMat); l.raycast = () => {}; l.frustumCulled = false; group.add(l); return l;
  });
  return {
    group, top: 9.0, flag: [-3.0, 0.5, -1.6],
    update(t) {
      const f = Math.sin(t * 9) * Math.sin(t * 3.7);
      orbMat.color.setRGB(0.6 + 0.4 * Math.abs(f), 0.9, 1);
      orb.scale.setScalar(1 + 0.08 * f);
      bolts.forEach((l, j) => {
        const a = l.geometry.attributes.position, base = t * 2 + j * 2.1;
        for (let i = 0; i < 6; i++) {
          const u = i / 5, ang = base + u * 0.8;
          a.setXYZ(i, Math.cos(ang) * (0.7 + u * 1.6) + (Math.random() - 0.5) * 0.25, 7.6 - u * 2.2 + (Math.random() - 0.5) * 0.2, -1.0 + Math.sin(ang) * (0.7 + u * 1.6));
        }
        a.needsUpdate = true;
        l.visible = Math.sin(t * 5 + j * 2) > -0.2;
      });
    },
  };
}

const BUILDERS = { mine, mill, oasis, arena, palace, garden, mountain, maze, castle, weather, forge, volcano, magnet };
export function buildLandmark(terrain) { return (BUILDERS[terrain] || generic)(); }
export const LANDMARK_KEYS = Object.keys(BUILDERS);

/* ---------- 出發點的路標 ---------- */
export function signpost() {
  const k = new Kit();
  k.cyl(0.1, 0.12, 2.6, 6, C.wood2, {});
  k.box(1.7, 0.5, 0.12, C.wood, { p: [0.55, 1.75, 0], r: [0, 0, 0.06] });
  k.cone(0.3, 0.4, 3, C.wood, { c: true, p: [1.55, 2.0, 0], r: [0, 0, -Math.PI / 2] });
  k.box(1.3, 0.42, 0.12, C.wood, { p: [-0.4, 1.12, 0.02], r: [0, 0, -0.05] });
  k.box(0.6, 0.38, 0.04, '#5b7bff', { p: [0.25, 2.45, 0] });
  return k.build();
}

/* ---------- 徽章旗：拿到一區的徽章，就在那裡插一面旗（會飄） ---------- */
function bannerTexture(color) {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 80;
  const g = c.getContext('2d');
  g.fillStyle = color; g.fillRect(0, 0, 128, 80);
  g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(0, 0, 128, 14);
  g.fillStyle = '#ffc533'; g.fillRect(0, 70, 128, 10);
  // 旗子中間畫一顆白色寶石
  g.save(); g.translate(64, 38); g.fillStyle = '#ffffff';
  g.beginPath(); g.moveTo(-14, -16); g.lineTo(14, -16); g.lineTo(22, -5); g.lineTo(0, 22); g.lineTo(-22, -5); g.closePath(); g.fill();
  g.fillStyle = 'rgba(0,0,0,.12)'; g.beginPath(); g.moveTo(-22, -5); g.lineTo(22, -5); g.lineTo(0, 22); g.closePath(); g.fill();
  g.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
export function makeFlag(color, height = 3.4) {
  const group = new THREE.Group();
  const k = new Kit();
  k.cyl(0.07, 0.08, height, 6, '#a4adbd', {});
  k.ball(0.15, 0, C.gold, { p: [0, height + 0.08, 0] });
  k.cyl(0.24, 0.3, 0.2, 6, C.stone2, {});
  group.add(k.build({ cast: true }));
  const geo = new THREE.PlaneGeometry(1.5, 0.95, 10, 2).translate(0.75, -0.475, 0);
  const base = geo.attributes.position.array.slice();
  const cloth = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ map: bannerTexture(color), side: THREE.DoubleSide, gradientMap: MAT.toon.gradientMap }));
  cloth.position.y = height - 0.05;
  group.add(cloth);
  let raise = 1;   // 0＝旗子在下面，1＝升到頂
  return {
    group,
    raiseFrom0() { raise = 0; },
    show(on) { cloth.visible = on; },
    get shown() { return cloth.visible; },
    update(t, dt) {
      if (raise < 1) raise = Math.min(1, raise + dt * 0.6);
      const e = 1 - Math.pow(1 - raise, 3);
      cloth.position.y = 1.2 + (height - 1.25) * e;
      const a = geo.attributes.position.array;
      for (let i = 0; i < a.length; i += 3) {
        const x = base[i];
        a[i + 2] = Math.sin(x * 3.2 - t * 5) * 0.13 * (x / 1.5);
        a[i + 1] = base[i + 1] - Math.sin(x * 2 - t * 4) * 0.04 * (x / 1.5);
      }
      geo.attributes.position.needsUpdate = true;
    },
  };
}

/* ---------- 關卡石台：還沒挑戰（米色）、進行中（藍）、已過關（金色台面＋上面轉的經驗寶石） ---------- */
const STONE_TOP = { todo: '#efe7d6', going: '#7d95ff', done: '#ffd04a' };
export function makeStone() {
  const group = new THREE.Group();
  const k = new Kit();
  k.cyl(0.95, 1.12, 0.42, 8, '#cdc3ae', {});
  group.add(k.build({ cast: true }));
  const topMat = toonMat({ vertexColors: false, color: STONE_TOP.todo });
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.86, 0.08, 8).translate(0, 0.46, 0), topMat);
  top.receiveShadow = true;
  group.add(top);
  const sk = new Kit();
  sk.oct(0.42, '#4fd8ff', { s: [0.8, 1.15, 0.8], glow: true });
  const gem = sk.build({ cast: false });
  gem.position.y = 1.5;
  group.add(gem);
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.25, 1.55, 28).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: '#ffe066', transparent: true, opacity: 0.8, depthWrite: false }));
  ring.position.y = 0.06;
  ring.raycast = () => {};
  group.add(ring);
  let state = 'todo', next = false;
  return {
    group,
    set(s, isNext) { state = s; next = isNext; topMat.color.set(STONE_TOP[s]); gem.visible = s === 'done'; ring.visible = isNext; },
    update(t) {
      if (state === 'done') { gem.rotation.y = t * 1.6; gem.position.y = 1.45 + Math.sin(t * 2.4) * 0.12; }
      if (next) { const s = 1 + 0.12 * Math.sin(t * 3.2); ring.scale.set(s, 1, s); ring.material.opacity = 0.55 + 0.35 * Math.sin(t * 3.2); }
    },
  };
}
