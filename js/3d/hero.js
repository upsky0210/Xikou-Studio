/* 小勇者：站在地圖上「現在要挑戰的地方」。點別的地方，會沿著道路跑過去。
   兩隻可以選（首頁、選單「換角色」，記在這台裝置上）：
     cat    貓劍士：灰白虎斑貓，深藍小圓帽配金羽毛、白色領巾、藍色短披風、腰間一把小木劍、咖啡色短靴
     rabbit 兔探險家：米白兔子，橘色圍巾、卡其色探險背心、綠色背包、手上拿著地圖
   和地圖上低多邊形的東西不同：角色用「平滑曲面」＋細緻的眼睛（虹膜、瞳孔、兩顆亮點），會眨眼。
   正面朝 +z，腳底在 y=0。回傳 { group, body, shadow, animate(t, phase, walking) }。 */
import { THREE, OUTLINE, addOutlineNormals, merge, blobShadow } from './kit.js';

export const HERO_KEY = 'xk-hero';
export const HERO_KINDS = ['cat', 'rabbit'];
export function heroKind() {
  try { const v = localStorage.getItem(HERO_KEY); return HERO_KINDS.includes(v) ? v : 'cat'; } catch { return 'cat'; }
}

/* ---------- 角色專用的材質：四段柔和的卡通光影 ---------- */
const SOFT_GRADIENT = (() => {
  const d = new Uint8Array([168, 168, 168, 255, 208, 208, 208, 255, 236, 236, 236, 255, 255, 255, 255, 255]);
  const t = new THREE.DataTexture(d, 4, 1, THREE.RGBAFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.needsUpdate = true;
  return t;
})();
const SKIN_MAT = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: SOFT_GRADIENT });
const SHINE_MAT = new THREE.MeshBasicMaterial({ vertexColors: true });
const LINE = OUTLINE.clone();
LINE.uniforms = Object.assign({}, OUTLINE.uniforms, { uWidth: { value: 0.0016 } });

/* ---------- Soft：拼平滑模型（保留圓滑的法線，不做成一面一面） ---------- */
const _c = new THREE.Color();
class Soft {
  constructor() { this.parts = []; this.shines = []; this.flat = []; }
  // o.p 位置、o.r 旋轉（先轉 y 再轉 x，方便「朝某個方向」）、o.s 縮放；o.line=false 不描邊；o.shine 不受光（眼睛亮點）
  add(geo, color, o = {}) {
    const g = geo.index ? geo.toNonIndexed() : geo;
    for (const n of Object.keys(g.attributes)) if (n !== 'position' && n !== 'normal') g.deleteAttribute(n);
    const r = o.r || [0, 0, 0], s = o.s === undefined ? 1 : o.s;
    const m = new THREE.Matrix4().compose(new THREE.Vector3(...(o.p || [0, 0, 0])),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(r[0], r[1], r[2] || 0, 'YXZ')),
      typeof s === 'number' ? new THREE.Vector3(s, s, s) : new THREE.Vector3(...s));
    g.applyMatrix4(m);
    const n = g.attributes.position.count, col = new Float32Array(n * 3);
    _c.set(color);
    for (let i = 0; i < n; i++) { col[i * 3] = _c.r; col[i * 3 + 1] = _c.g; col[i * 3 + 2] = _c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    (o.shine ? this.shines : o.line === false ? this.flat : this.parts).push(g);
    return this;
  }
  ball(r, color, o = {}) { const seg = o.seg || (r > 0.22 ? 30 : r > 0.09 ? 18 : 10); return this.add(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.7)), color, o); }
  capsule(r, len, color, o = {}) { return this.add(new THREE.CapsuleGeometry(r, len, 6, o.seg || 16), color, o); }
  cyl(rt, rb, h, color, o = {}) { return this.add(new THREE.CylinderGeometry(rt, rb, h, o.seg || 24, 1, !!o.open), color, o); }
  cone(r, h, color, o = {}) { return this.add(new THREE.ConeGeometry(r, h, o.seg || 20), color, o); }
  torus(R, tube, color, o = {}) { return this.add(new THREE.TorusGeometry(R, tube, o.ts || 10, o.rs || 32, o.arc || Math.PI * 2), color, o); }
  lathe(pts, color, o = {}) { return this.add(new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), o.seg || 28), color, o); }
  tube(points, r, color, o = {}) { return this.add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), 28, r, 10, false), color, o); }
  box(w, h, d, color, o = {}) { return this.add(new THREE.BoxGeometry(w, h, d), color, o); }
  build() {
    const group = new THREE.Group();
    if (this.parts.length) {
      const g = merge(this.parts);
      group.add(new THREE.Mesh(g, SKIN_MAT));
      const hull = new THREE.Mesh(addOutlineNormals(g.clone()), LINE);
      hull.raycast = () => {};
      group.add(hull);
    }
    if (this.flat.length) group.add(new THREE.Mesh(merge(this.flat), SKIN_MAT));
    if (this.shines.length) group.add(new THREE.Mesh(merge(this.shines), SHINE_MAT));
    return group;
  }
}

// 橢球表面上，朝某個方向（yaw 往右、pitch 往上）的點；回傳 { p, r } 讓零件貼著表面、正面朝外
function on(C, R3, yaw, pitch, out = 0) {
  const cp = Math.cos(pitch);
  return { p: [C[0] + Math.sin(yaw) * cp * (R3[0] + out), C[1] + Math.sin(pitch) * (R3[1] + out), C[2] + Math.cos(yaw) * cp * (R3[2] + out)], r: [-pitch, yaw, 0] };
}

// 一個可以轉的小零件：pivot 是轉軸的位置，fill(s) 在轉軸座標裡拼形狀
function joint(parent, pivot, fill, rot) {
  const g = new THREE.Group();
  g.position.set(...pivot);
  if (rot) g.rotation.set(rot[0], rot[1], rot[2] || 0, 'YXZ');
  const s = new Soft();
  fill(s);
  g.add(s.build());
  parent.add(g);
  return g;
}

// 眼睛：深色眼框、虹膜（下半比較亮）、瞳孔、一大一小兩顆亮點。眼睛是自己的一組，眨眼時壓扁
function eye(parent, at, size, iris, irisLight, pupilW = 0.62) {
  return joint(parent, at.p, (s) => {
    s.ball(size * 1.1, '#2b2340', { s: [0.92, 1.1, 0.38], line: false });
    s.ball(size, iris, { p: [0, 0, 0.012], s: [0.86, 1.03, 0.4], line: false });
    s.ball(size * 0.62, irisLight, { p: [0, -size * 0.36, 0.038], s: [0.95, 0.62, 0.4], line: false });
    s.ball(size * 0.6, '#14152a', { p: [0, size * 0.06, 0.048], s: [pupilW, 0.98, 0.4], line: false });
    s.ball(size * 0.3, '#ffffff', { p: [size * 0.3, size * 0.4, 0.075], shine: true, s: [1, 1.1, 0.5] });
    s.ball(size * 0.13, '#ffffff', { p: [-size * 0.3, -size * 0.38, 0.068], shine: true, s: [1, 1, 0.5] });
  }, at.r);
}

/* ---------- 貓劍士 ---------- */
function cat(body) {
  const FUR = '#b3b6c2', FUR_D = '#9a9dab', WHITE = '#f7f4ee', STRIPE = '#5d6070', PINK = '#ff9fb0', INNER = '#ffc4cf',
    BOOT = '#7a4c2a', BOOT_L = '#a5703f', CAPE = '#3d63d6', CAPE_D = '#2b4aa8', HAT = '#26315a', GOLD = '#ffc23a';
  const s = new Soft();
  // 身體：梨形的灰色身體＋白肚子
  s.lathe([[0, 0.4], [0.27, 0.42], [0.36, 0.52], [0.38, 0.66], [0.34, 0.84], [0.25, 1.0], [0.16, 1.1], [0, 1.12]], FUR);
  s.ball(0.25, WHITE, { p: [0, 0.71, 0.27], s: [1, 1.2, 0.5] });
  // 皮帶＋金扣
  s.torus(0.365, 0.045, '#6b4426', { p: [0, 0.56, 0], r: [Math.PI / 2, 0, 0], s: [1, 1, 1] });
  s.box(0.15, 0.12, 0.05, GOLD, { p: [0, 0.56, 0.37] });
  s.box(0.08, 0.05, 0.06, '#6b4426', { p: [0, 0.56, 0.38], line: false });
  // 白色領巾＋金色別針
  s.torus(0.2, 0.065, WHITE, { p: [0, 1.06, 0.02], r: [Math.PI / 2 - 0.15, 0, 0] });
  s.cone(0.13, 0.26, WHITE, { p: [0, 0.93, 0.21], r: [0.25, 0, Math.PI] , s: [1, 1, 0.45] });
  s.ball(0.05, GOLD, { p: [0, 1.0, 0.25] });
  // 藍色短披風（從肩膀披下來，內側深藍）
  const capeGeo = (r0, r1) => new THREE.CylinderGeometry(r0, r1, 0.7, 28, 1, true, Math.PI - 1.15, 2.3).translate(0, -0.35, 0);
  s.add(capeGeo(0.27, 0.5), CAPE, { p: [0, 1.08, -0.02] });
  s.add(capeGeo(0.262, 0.49).scale(-1, 1, 1), CAPE_D, { p: [0, 1.08, -0.02] });
  // 腰間的小木劍（掛在左邊、往後斜）
  s.box(0.05, 0.62, 0.02, '#e9eef5', { p: [-0.42, 0.36, -0.12], r: [0, 0, 0.5] });
  s.torus(0.07, 0.02, GOLD, { p: [-0.31, 0.6, -0.1], r: [0, Math.PI / 2, 0.5] });
  s.capsule(0.03, 0.13, '#7a4c2a', { p: [-0.26, 0.68, -0.09], r: [0, 0, 0.5] });
  s.ball(0.04, GOLD, { p: [-0.22, 0.74, -0.09] });

  // 頭：寬寬的大頭、兩頰蓬蓬的毛
  const H = [0, 1.56, 0], R = [0.63, 0.54, 0.57];
  s.ball(0.6, FUR, { p: H, s: [R[0] / 0.6, R[1] / 0.6, R[2] / 0.6] });
  for (const k of [-1, 1]) {
    s.ball(0.22, FUR, { p: [k * 0.5, 1.4, 0.12], s: [1.15, 0.85, 0.95] });
    s.cone(0.07, 0.16, FUR, { p: [k * 0.66, 1.37, 0.08], r: [0, 0, -k * 1.95] });
    s.cone(0.055, 0.12, FUR, { p: [k * 0.62, 1.29, 0.11], r: [0, 0, -k * 2.35] });
  }
  // 口鼻：兩團白色的鼓鼓臉頰、小下巴、粉紅鼻子、ω 嘴巴
  for (const k of [-1, 1]) s.ball(0.16, WHITE, { p: [k * 0.11, 1.37, 0.44], s: [1.1, 0.82, 0.8] });
  s.ball(0.1, WHITE, { p: [0, 1.27, 0.43], s: [1.2, 0.8, 0.8] });
  s.ball(0.06, PINK, { p: [0, 1.46, 0.565], s: [1.35, 0.85, 0.85] });
  for (const k of [-1, 1]) s.torus(0.045, 0.011, '#4a3b45', { p: [k * 0.045, 1.4, 0.575], r: [0, 0, Math.PI], arc: Math.PI, line: false, ts: 6, rs: 12 });
  // 鬍鬚：細細的白線往兩邊
  for (const k of [-1, 1]) for (const [dy, a] of [[0.03, 0.12], [-0.02, -0.06]]) {
    s.capsule(0.006, 0.26, '#ffffff', { p: [k * 0.36, 1.37 + dy, 0.47], r: [0, -k * 0.35, k * (Math.PI / 2 + a)], line: false, seg: 4 });
  }
  // 粉紅腮紅
  for (const k of [-1, 1]) { const a = on(H, R, k * 0.62, -0.18, -0.02); s.ball(0.075, '#ffb0bd', { p: a.p, r: a.r, s: [1.2, 0.7, 0.3], line: false }); }
  // 額頭三條虎斑、兩頰各兩條
  for (const [yaw, len] of [[-0.2, 0.13], [0, 0.17], [0.2, 0.13]]) { const a = on(H, R, yaw, 0.62, -0.012); s.ball(0.03, STRIPE, { p: a.p, r: a.r, s: [1, len / 0.03, 0.35], line: false }); }
  for (const k of [-1, 1]) for (const pt of [0.12, -0.02]) { const a = on(H, R, k * 1.12, pt, -0.012); s.ball(0.025, STRIPE, { p: a.p, r: [a.r[0], a.r[1], Math.PI / 2 + k * 0.2], s: [1, 4.2, 0.35], line: false }); }
  // 手：灰色手臂、白色肉掌
  for (const k of [-1, 1]) {
    s.capsule(0.085, 0.28, FUR, { p: [k * 0.4, 0.84, 0.02], r: [0, 0, k * 0.5] });
    s.ball(0.115, WHITE, { p: [k * 0.5, 0.66, 0.05] });
  }
  // 小圓帽：短帽沿、紅色帽帶、一根彎彎的金羽毛
  const hatR = [0, 0, -0.16];
  s.cyl(0.36, 0.38, 0.04, HAT, { p: [0.04, 2.0, -0.04], r: hatR });
  s.lathe([[0, 0.3], [0.2, 0.28], [0.25, 0.18], [0.25, 0]], HAT, { p: [0.04, 2.01, -0.04], r: hatR });
  s.cyl(0.255, 0.255, 0.07, '#d83c3c', { p: [0.045, 2.06, -0.04], r: hatR });
  // 羽毛：扁扁的長葉形，往後斜躺；中間一條羽軸
  s.ball(0.07, GOLD, { p: [0.3, 2.22, -0.26], r: [-0.95, 0.5, 0], s: [1, 3.6, 0.28] });
  s.ball(0.05, '#ffe08a', { p: [0.305, 2.24, -0.25], r: [-0.95, 0.5, 0], s: [0.6, 3.6, 0.3], line: false });
  s.capsule(0.008, 0.42, '#c98a10', { p: [0.3, 2.2, -0.25], r: [-0.95, 0.5, 0], line: false, seg: 4 });
  body.add(s.build());

  // 眼睛：綠色、瞳孔細長一點（貓的眼睛）
  const eyes = [-1, 1].map((k) => eye(body, on(H, R, k * 0.33, 0.08, -0.035), 0.135, '#3fae5d', '#9be37f', 0.42));
  // 耳朵：三角形、裡面粉紅、耳尖一小撮毛
  const ears = [-1, 1].map((k) => joint(body, [k * 0.36, 1.92, -0.04], (j) => {
    j.cone(0.2, 0.42, FUR, { p: [0, 0.16, 0], s: [1, 1, 0.5], seg: 24 });
    j.cone(0.13, 0.3, INNER, { p: [0, 0.12, 0.05], s: [1, 1, 0.35], line: false });
    j.cone(0.035, 0.12, WHITE, { p: [-k * 0.04, 0.12, 0.08], r: [0, 0, k * 0.4], line: false });
  }, [0, 0, -k * 0.22]));
  // 腳＋短靴
  const legs = [-1, 1].map((k) => joint(body, [k * 0.17, 0.5, 0], (j) => {
    j.capsule(0.1, 0.18, FUR, { p: [0, -0.16, 0] });
    j.lathe([[0, -0.5], [0.15, -0.5], [0.15, -0.36], [0.14, -0.24], [0, -0.24]], BOOT, { seg: 20 });
    j.ball(0.14, BOOT, { p: [0, -0.43, 0.1], s: [0.95, 0.55, 1.25] });
    j.torus(0.15, 0.035, BOOT_L, { p: [0, -0.25, 0], r: [Math.PI / 2, 0, 0] });
  }));
  // 尾巴：一條往上彎的平滑尾巴，尾端深灰
  const tail = joint(body, [0, 0.55, -0.32], (j) => {
    j.tube([[0, 0, 0], [0, 0.1, -0.22], [0.05, 0.4, -0.36], [0.02, 0.72, -0.3], [-0.06, 0.88, -0.18]], 0.07, FUR_D);
    j.ball(0.08, STRIPE, { p: [-0.06, 0.88, -0.18] });
    for (const p of [[0.04, 0.3, -0.33], [0.04, 0.55, -0.35]]) j.torus(0.075, 0.018, STRIPE, { p, r: [Math.PI / 2 - 0.4, 0, 0], line: false });
  });
  return (t, phase, walking) => {
    const w = walking ? Math.sin(phase) * 0.7 : 0;
    legs[0].rotation.x = w; legs[1].rotation.x = -w;
    tail.rotation.z = Math.sin(t * (walking ? 6 : 2.2)) * 0.3;
    tail.rotation.x = walking ? -0.25 : 0;
    const flick = Math.max(0, Math.sin(t * 1.3) - 0.92) * 4;   // 偶爾抖一下耳朵
    ears[0].rotation.z = 0.22 + flick * 0.3; ears[1].rotation.z = -0.22 - flick * 0.15;
    blink(eyes, t);
  };
}

/* ---------- 兔探險家 ---------- */
function rabbit(body) {
  const FUR = '#f6efe2', FUR_D = '#eadfcb', WHITE = '#ffffff', PINK = '#ff9fb4', INNER = '#ffc2cf',
    SCARF = '#ee6a2c', SCARF_D = '#c9521c', VEST = '#d8a75c', VEST_D = '#b8873f', PACK = '#3c9a55', PACK_D = '#2c7a41';
  const s = new Soft();
  // 身體＋卡其色背心（背心比身體大一圈，前面開襟露出白肚子）
  s.lathe([[0, 0.4], [0.27, 0.42], [0.36, 0.52], [0.37, 0.66], [0.33, 0.84], [0.24, 1.0], [0.15, 1.1], [0, 1.12]], FUR);
  s.add(new THREE.LatheGeometry([[0.29, 0.44], [0.385, 0.53], [0.395, 0.67], [0.355, 0.85], [0.27, 1.0]].map(([x, y]) => new THREE.Vector2(x, y)), 28, Math.PI / 2 + 0.42, Math.PI * 2 - 0.84), VEST);
  s.ball(0.2, WHITE, { p: [0, 0.7, 0.2], s: [0.85, 1.15, 0.55] });
  for (const k of [-1, 1]) {
    s.box(0.13, 0.1, 0.04, VEST_D, { p: [k * 0.24, 0.6, 0.3], r: [0, k * 0.6, 0] });
    s.ball(0.02, '#7a4f2a', { p: [k * 0.22, 0.66, 0.33], line: false });
  }
  // 圍巾：繞脖子一圈＋垂下來一截（尾端黃色條紋）
  s.torus(0.22, 0.085, SCARF, { p: [0, 1.06, 0.01], r: [Math.PI / 2 - 0.12, 0, 0] });
  // 圍巾打個結，一端從右肩甩到背後、一端垂在胸前左邊（扁扁的布＋流蘇）
  s.ball(0.075, SCARF_D, { p: [0.12, 0.99, 0.22], s: [1.1, 0.85, 0.75] });
  s.box(0.17, 0.26, 0.035, SCARF, { p: [0.14, 0.85, 0.36], r: [-0.12, 0.2, 0.12] });
  s.box(0.172, 0.03, 0.04, '#ffd23f', { p: [0.13, 0.78, 0.37], r: [-0.12, 0.2, 0.12], line: false });
  for (let i = 0; i < 4; i++) s.capsule(0.012, 0.05, SCARF_D, { p: [0.07 + i * 0.045, 0.7, 0.38], r: [-0.12, 0.2, 0.12], line: false, seg: 5 });
  s.capsule(0.07, 0.3, SCARF, { p: [-0.08, 1.02, -0.3], r: [0, 0, 0.5], s: [1.3, 1, 0.5] });
  // 背包：圓圓的包、蓋子、背帶、上面捲著紅色睡墊
  s.capsule(0.24, 0.16, PACK, { p: [0, 0.68, -0.43], s: [1.05, 1, 0.55] });
  s.ball(0.22, PACK_D, { p: [0, 0.82, -0.46], s: [1.1, 0.45, 0.62] });
  s.ball(0.035, GOLD_OF(), { p: [0, 0.75, -0.3], line: false });
  for (const k of [-1, 1]) s.torus(0.2, 0.025, PACK_D, { p: [k * 0.18, 0.86, -0.12], r: [0, Math.PI / 2, 0], s: [1, 1.35, 1.2], arc: Math.PI * 1.1 });
  s.capsule(0.1, 0.42, '#d24b3c', { p: [0, 1.0, -0.47], r: [0, 0, Math.PI / 2] });
  for (const k of [-1, 1]) s.torus(0.1, 0.012, '#8a2f25', { p: [k * 0.14, 1.0, -0.47], r: [0, Math.PI / 2, 0], line: false });
  // 手臂；右手拿著摺起來的地圖
  for (const k of [-1, 1]) {
    s.capsule(0.085, 0.28, FUR, { p: [k * 0.4, 0.84, 0.02], r: [0, 0, k * 0.5] });
    s.ball(0.11, WHITE, { p: [k * 0.5, 0.66, 0.05] });
  }
  s.box(0.32, 0.24, 0.02, '#f8ebc0', { p: [0.62, 0.74, 0.15], r: [-0.25, -0.5, 0.12] });
  s.box(0.012, 0.24, 0.025, '#d8bc72', { p: [0.62, 0.74, 0.15], r: [-0.25, -0.5, 0.12], line: false });
  s.box(0.12, 0.018, 0.026, '#e5493d', { p: [0.66, 0.77, 0.17], r: [-0.25, -0.5, 0.5], line: false });
  s.box(0.08, 0.018, 0.026, '#3d8fd8', { p: [0.57, 0.7, 0.13], r: [-0.25, -0.5, -0.3], line: false });
  // 頭：圓臉、頰邊的絨毛、頭頂一小撮瀏海
  const H = [0, 1.52, 0], R = [0.58, 0.53, 0.55];
  s.ball(0.56, FUR, { p: H, s: [R[0] / 0.56, R[1] / 0.56, R[2] / 0.56] });
  for (const k of [-1, 1]) s.ball(0.2, FUR, { p: [k * 0.45, 1.36, 0.14], s: [1.1, 0.85, 0.9] });
  for (const [x, y, z, r] of [[0, 2.03, 0.12, 0.09], [0.08, 2.0, 0.2, 0.07], [-0.08, 2.0, 0.19, 0.065]]) s.ball(r, FUR_D, { p: [x, y, z] });
  // 口鼻：兩團白色的鼓鼓臉頰、粉紅小鼻子、人字嘴、兩顆大門牙
  for (const k of [-1, 1]) s.ball(0.15, WHITE, { p: [k * 0.1, 1.35, 0.42], s: [1.1, 0.82, 0.8] });
  s.ball(0.055, PINK, { p: [0, 1.44, 0.54], s: [1.35, 0.9, 0.85] });
  s.capsule(0.008, 0.06, '#5a4048', { p: [0, 1.39, 0.555], line: false, seg: 4 });
  for (const k of [-1, 1]) s.torus(0.04, 0.009, '#5a4048', { p: [k * 0.04, 1.36, 0.555], r: [0, 0, Math.PI], arc: Math.PI, line: false, ts: 6, rs: 12 });
  for (const k of [-1, 1]) s.box(0.045, 0.07, 0.02, WHITE, { p: [k * 0.025, 1.29, 0.535] });
  for (const k of [-1, 1]) { const a = on(H, R, k * 0.6, -0.2, -0.02); s.ball(0.08, '#ffaebf', { p: a.p, r: a.r, s: [1.25, 0.7, 0.3], line: false }); }
  body.add(s.build());

  // 眼睛：深咖啡色、圓圓的大眼睛
  const eyes = [-1, 1].map((k) => eye(body, on(H, R, k * 0.33, 0.06, -0.035), 0.14, '#5a3a2c', '#a8735a', 0.68));
  // 長耳朵（轉軸在耳根）：右耳彎一點比較可愛
  const ears = [-1, 1].map((k) => joint(body, [k * 0.17, 1.95, -0.04], (j) => {
    j.capsule(0.12, 0.52, FUR, { p: [0, 0.38, 0], s: [1, 1, 0.48] });
    j.capsule(0.075, 0.42, INNER, { p: [0, 0.38, 0.045], s: [1, 1, 0.3], line: false });
  }, [0, 0, -k * 0.14]));
  // 大腳（轉軸在屁股；走路時兩腳一起跳）
  const legs = [-1, 1].map((k) => joint(body, [k * 0.17, 0.48, 0], (j) => {
    j.capsule(0.1, 0.16, FUR, { p: [0, -0.2, 0] });
    j.ball(0.17, WHITE, { p: [0, -0.4, 0.1], s: [0.8, 0.48, 1.45] });
    j.ball(0.05, INNER, { p: [0, -0.47, 0.22], s: [1, 0.3, 1], line: false });
  }));
  // 毛球尾巴
  const tail = joint(body, [0, 0.52, -0.37], (j) => {
    j.ball(0.13, WHITE, { p: [0, 0, -0.08] });
    for (const [x, y] of [[0.08, 0.06], [-0.08, 0.05], [0, -0.08]]) j.ball(0.08, WHITE, { p: [x, y, -0.11] });
  });
  return (t, phase, walking) => {
    const w = walking ? Math.sin(phase) * 0.5 : 0;
    legs[0].rotation.x = w; legs[1].rotation.x = w;
    ears[0].rotation.x = walking ? -0.3 - Math.abs(Math.sin(phase)) * 0.25 : Math.sin(t * 1.6) * 0.06;
    ears[1].rotation.x = walking ? -0.25 - Math.abs(Math.sin(phase + 0.4)) * 0.3 : Math.sin(t * 1.6 + 0.8) * 0.08;
    ears[0].rotation.z = 0.14;
    ears[1].rotation.z = -0.3 - Math.max(0, Math.sin(t * 0.9) - 0.9) * 3;
    tail.position.y = 0.52 + (walking ? Math.sin(phase * 2) * 0.03 : 0);
    blink(eyes, t);
  };
}
const GOLD_OF = () => '#ffc23a';

// 眨眼：大約每 3.6 秒眨一下（0.14 秒）
function blink(eyes, t) {
  const u = (t % 3.6) / 3.6, close = u > 0.96 ? Math.sin(((u - 0.96) / 0.04) * Math.PI) : 0;
  for (const e of eyes) e.scale.y = 1 - close * 0.9;
}

export function buildHero(kind = heroKind()) {
  const body = new THREE.Group();
  const animate = (kind === 'rabbit' ? rabbit : cat)(body);
  const group = new THREE.Group();
  group.add(body);
  const shadow = blobShadow(0.75, 0.35);
  shadow.position.y = 0.04;
  group.add(shadow);
  group.scale.setScalar(1.3);
  group.userData.kind = kind;
  animate(0, 0, false);
  return { group, body, shadow, kind, animate };
}
