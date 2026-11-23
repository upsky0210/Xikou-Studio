/* 寵物（台灣原生動物）：第一批三隻，還沒放進遊戲，先在 tools/pet-preview.html 看造型。
     bear     小黑熊：胸前 V 字白紋
     magpie   藍鵲寶寶：紅嘴、長尾巴
     pangolin 小穿山甲：背上一片片鱗甲、尖尖的鼻子
   造型規則（docs/RPG玩法規劃-2026-11-23.md 第六節）：頭和身體都是簡單圓形、臉頰不外凸；
   眼睛只有圓點加一個亮點；不穿衣服、不拿東西；一隻只有一個最好認的特徵；一隻最多三種主色。
   stage：0 寶寶、1 少年、2 成年（只有體型和特徵變大）。正面朝 +z，腳底在 y=0。 */
import { THREE, blobShadow } from './kit.js';
import { Soft, joint, on, blink } from './hero.js';

export const PETS = [
  { id: 'bear', name: '小黑熊', sign: '胸前 V 字白紋' },
  { id: 'magpie', name: '藍鵲寶寶', sign: '紅嘴、長尾巴' },
  { id: 'pangolin', name: '小穿山甲', sign: '背上的鱗甲' },
];
const INK = '#23202e';

// 眼睛：一個圓點、一個亮點（眨眼時壓扁）
function dot(parent, at, r, color = INK) {
  return joint(parent, at.p, (s) => {
    s.ball(r, color, { s: [0.92, 1.12, 0.45], line: false, seg: 18 });
    s.ball(r * 0.34, '#ffffff', { p: [r * 0.28, r * 0.42, r * 0.4], shine: true, seg: 10 });
  }, at.r);
}
// 淡淡的腮紅：貼在臉上，不會凸出來
function blush(s, C, R, color) {
  for (const k of [-1, 1]) { const a = on(C, R, k * 0.72, -0.27, -0.012); s.ball(0.085, color, { p: a.p, r: a.r, s: [1.25, 0.72, 0.16], line: false }); }
}

/* ---------- 小黑熊 ---------- */
function bear(g, st) {
  const FUR = '#4b4a56', FUR_D = '#3b3a45', SNOUT = '#e6cfa8', V = '#fff6e0';
  const body = new THREE.Group(), head = new THREE.Group();
  g.add(body, head);
  const s = new Soft(), B = [0, 0.43, 0], BR = [0.42, 0.43, 0.38];
  s.ball(0.42, FUR, { p: B, s: [1, 1.02, 0.9] });
  // 胸前的 V：貼著身體表面的兩條
  for (const k of [-1, 1]) {
    const pts = [[0.5, 0.62], [0.26, 0.36], [0.02, 0.1]].map(([yaw, pit]) => on(B, BR, k * yaw, pit, 0.004).p);
    s.tube(pts, 0.048 + st * 0.006, V, { line: false });
    s.ball(0.048 + st * 0.006, V, { p: pts[0], line: false });
  }
  s.ball(0.05 + st * 0.006, V, { p: on(B, BR, 0, 0.09, 0.004).p, line: false });
  for (const k of [-1, 1]) s.ball(0.14, FUR, { p: [k * 0.37, 0.5, 0.1], s: [0.75, 1.25, 0.85], r: [0, 0, k * 0.35] });
  for (const k of [-1, 1]) s.ball(0.16, FUR_D, { p: [k * 0.2, 0.1, 0.16], s: [1, 0.66, 1.2] });
  s.ball(0.1, FUR, { p: [0, 0.34, -0.38] });
  body.add(s.build());
  const h = new Soft(), H = [0, 0, 0], R = [0.53, 0.48, 0.49];
  h.ball(0.5, FUR, { s: [1.06, 0.96, 0.98] });
  for (const k of [-1, 1]) {
    h.ball(0.16, FUR, { p: [k * 0.38, 0.36, -0.02], s: [1, 1, 0.6] });
    h.ball(0.095, SNOUT, { p: [k * 0.385, 0.365, 0.075], s: [1, 1, 0.4], line: false });
  }
  h.ball(0.2, SNOUT, { p: [0, -0.13, 0.4], s: [1.15, 0.82, 0.72] });
  h.ball(0.07, INK, { p: [0, -0.06, 0.54], s: [1.3, 0.85, 0.7], line: false });
  for (const k of [-1, 1]) h.torus(0.045, 0.011, INK, { p: [k * 0.045, -0.155, 0.54], r: [0.15, 0, Math.PI], arc: Math.PI, line: false, ts: 6, rs: 14 });
  head.add(h.build());
  // 深色的毛上，眼睛外面加一小圈淺色才看得清楚
  const eyes = [-1, 1].map((k) => {
    const a = on(H, R, k * 0.45, 0.02, -0.012);
    const e = new Soft(); e.ball(0.1, '#f2e6d2', { p: a.p, r: a.r, s: [0.95, 1.12, 0.2], line: false }); head.add(e.build());
    return dot(head, on(H, R, k * 0.45, 0.02, 0.004), 0.086);
  });
  return { body, head, eyes, neck: 1.12, anim: () => {} };
}

/* ---------- 藍鵲寶寶 ---------- */
function magpie(g, st) {
  const BLUE = '#3f86dd', BLUE_D = '#2a63b4', NIGHT = '#2d3050', BELLY = '#dcebfa', RED = '#ea4a35';
  const body = new THREE.Group(), head = new THREE.Group();
  g.add(body, head);
  const s = new Soft();
  s.ball(0.4, BLUE, { p: [0, 0.46, 0], s: [0.98, 1.02, 0.95] });
  s.ball(0.3, BELLY, { p: [0, 0.4, 0.165], s: [1.0, 1.02, 0.82], line: false });
  for (const k of [-1, 1]) {
    s.capsule(0.032, 0.06, RED, { p: [k * 0.14, 0.07, 0.04] });
    for (const a of [-0.5, 0, 0.5]) s.capsule(0.03, 0.09, RED, { p: [k * 0.14 + Math.sin(a) * 0.06, 0.03, 0.1], r: [Math.PI / 2, 0, -a], seg: 8 });
  }
  body.add(s.build());
  const wings = [-1, 1].map((k) => joint(body, [k * 0.37, 0.62, 0], (j) => {
    j.ball(0.2, BLUE_D, { p: [k * 0.02, -0.15, 0.02], s: [0.4, 1.02, 0.85], r: [0, 0, k * 0.2] });
  }));
  // 長尾巴：三根，末端白色，往右上翹起來（正面也看得到）
  const L = 0.74 + st * 0.1;
  const tail = joint(body, [0.1, 0.3, -0.3], (j) => {
    for (const [x, len, z] of [[0, L, 0], [0.13, L * 0.8, 0.02], [-0.13, L * 0.8, 0.02]]) {
      j.capsule(0.085, len, x ? BLUE : BLUE_D, { p: [x, len / 2 + 0.06, z], s: [1, 1, 0.45], r: [0, 0, -x * 0.9] });
      j.ball(0.095, '#ffffff', { p: [x * (1 + len * 0.55), len + 0.07, z], s: [1, 1.1, 0.52] });
    }
  }, [-0.1, 0, -0.95]);
  const h = new Soft(), H = [0, 0, 0], R = [0.47, 0.45, 0.46];
  h.ball(0.46, NIGHT, { s: [1.02, 0.98, 1] });
  h.ball(0.2, BELLY, { p: [0, 0.35, -0.16], s: [1, 0.62, 1], line: false });
  h.cone(0.115, 0.2, RED, { p: [0, -0.1, 0.5], r: [Math.PI / 2 + 0.05, 0, 0], s: [1.15, 1, 0.85] });
  for (const [x, r] of [[0, 0.16], [0.05, 0.36]]) h.capsule(0.026, 0.1, NIGHT, { p: [x - 0.02, 0.47, 0.02], r: [0, 0, -r], seg: 8 });
  head.add(h.build());
  const eyes = [-1, 1].map((k) => {
    const a = on(H, R, k * 0.5, 0.0, -0.012);
    const e = new Soft(); e.ball(0.108, '#ffd85c', { p: a.p, r: a.r, s: [0.96, 1.08, 0.2], line: false }); head.add(e.build());
    return dot(head, on(H, R, k * 0.5, 0.0, 0.004), 0.088);
  });
  return { body, head, eyes, neck: 1.1, anim: (t) => { const f = Math.sin(t * 2.2) * 0.05; wings[0].rotation.z = -f; wings[1].rotation.z = f; tail.rotation.z = -0.95 + Math.sin(t * 1.4) * 0.06; } };
}

/* ---------- 小穿山甲 ---------- */
function pangolin(g, st) {
  const SCALE = '#a8754a', SCALE_D = '#8d5f39', SKIN = '#f3dfc0', PINK = '#f0b7a0';
  const body = new THREE.Group(), head = new THREE.Group();
  g.add(body, head);
  // 一片鱗甲：扁扁的圓片，貼著圓球表面、尖端朝下
  const scale = (s, C, R, yaw, pit, r, dark) => { const a = on(C, R, yaw, pit, 0.012); s.ball(r, dark ? SCALE_D : SCALE, { p: a.p, r: a.r, s: [1, 1.18, 0.26], seg: 14 }); };
  const s = new Soft(), B = [0, 0.43, 0], BR = [0.41, 0.42, 0.38];
  s.ball(0.41, SKIN, { p: B, s: [1, 1.02, 0.92] });
  for (let row = 0; row < 4; row++) {
    const pit = 0.75 - row * 0.45, n = 6 + (row === 1 || row === 2 ? 1 : 0);
    for (let i = 0; i < n; i++) scale(s, B, BR, 1.0 + (Math.PI * 2 - 2.0) * ((i + (row % 2 ? 0.25 : 0.5)) / n), pit, 0.16 + st * 0.006, row % 2);
  }
  for (const k of [-1, 1]) s.ball(0.12, SKIN, { p: [k * 0.36, 0.44, 0.18], s: [0.75, 1.2, 0.85], r: [0, 0, k * 0.35] });
  for (const k of [-1, 1]) s.ball(0.15, SKIN, { p: [k * 0.2, 0.1, 0.15], s: [1, 0.66, 1.2] });
  body.add(s.build());
  // 粗尾巴：繞到右前方，上面也有鱗甲
  const tail = joint(body, [0, 0.16, -0.3], (j) => {
    const N = 5 + st;
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1), a = u * 1.5, r = 0.2 * (1 - u * 0.62);
      j.ball(r, i % 2 ? SCALE_D : SCALE, { p: [Math.sin(a) * (0.5 + st * 0.07), -0.02 + u * 0.02, 0.36 - Math.cos(a) * 0.42], s: [1, 0.86, 1] });
    }
  });
  const h = new Soft(), H = [0, 0, 0], R = [0.48, 0.45, 0.46];
  h.ball(0.46, SKIN, { s: [1.03, 0.97, 1] });
  // 頭頂到後腦：一整頂鱗片帽（先鋪一層底，再一排一排疊上鱗片）
  const CR = [0.487, 0.458, 0.472];
  h.add(new THREE.SphereGeometry(0.47, 34, 18, 0, Math.PI * 2, 0, 1.62), SCALE_D, { s: [1.036, 0.975, 1.005], r: [-0.62, 0, 0] });
  for (let row = 0; row < 5; row++) {
    const th = 0.22 + row * 0.33, n = [4, 8, 11, 13, 14][row];
    for (let i = 0; i < n; i++) {
      // 鱗片排在帽子自己的座標裡（帽子往後仰 0.62），再轉成頭的座標
      const az = ((i + (row % 2 ? 0.5 : 0)) / n) * Math.PI * 2;
      const v = new THREE.Vector3(Math.sin(th) * Math.sin(az), Math.cos(th), Math.sin(th) * Math.cos(az)).applyAxisAngle(new THREE.Vector3(1, 0, 0), -0.62);
      scale(h, H, CR, Math.atan2(v.x, v.z), Math.asin(v.y), 0.115, (row + i) % 2);
    }
  }
  // 短短圓圓的吻部、粉紅鼻頭
  h.ball(0.17, SKIN, { p: [0, -0.14, 0.43], s: [0.95, 0.78, 0.95] });
  h.ball(0.055, PINK, { p: [0, -0.115, 0.59], s: [1.2, 0.85, 0.7], line: false });
  h.torus(0.05, 0.01, INK, { p: [0, -0.185, 0.575], r: [0.35, 0, Math.PI + 0.35], arc: Math.PI - 0.7, line: false, ts: 6, rs: 14 });
  for (const k of [-1, 1]) h.ball(0.085, SKIN, { p: [k * 0.47, 0.0, 0.1], s: [0.45, 1, 0.9] });
  blush(h, H, R, '#f5b6a0');
  head.add(h.build());
  const eyes = [-1, 1].map((k) => dot(head, on(H, R, k * 0.48, -0.02, -0.004), 0.088));
  return { body, head, eyes, neck: 1.1, anim: (t) => { tail.rotation.y = Math.sin(t * 1.3) * 0.08; } };
}

const BUILD = { bear, magpie, pangolin };
// 各階段：整隻的大小、頭的大小、身體的大小（越大頭身比例越修長一點）
const STAGE = [{ all: 0.78, head: 1.0, body: 0.86 }, { all: 0.95, head: 0.96, body: 1.0 }, { all: 1.12, head: 0.92, body: 1.12 }];

export function buildPet(id, stage = 0) {
  const st = STAGE[stage], inner = new THREE.Group(), m = BUILD[id](inner, stage);
  m.body.scale.setScalar(st.body);
  m.head.scale.setScalar(st.head);
  const y0 = 0.6 * st.body + 0.4 * st.head * (m.neck / 1.12);
  m.head.position.y = y0;
  inner.scale.setScalar(st.all);
  const group = new THREE.Group();
  group.add(inner);
  const shadow = blobShadow(0.6 * st.all, 0.3);
  shadow.position.y = 0.02;
  group.add(shadow);
  const animate = (t) => {
    const k = Math.sin(t * 2.4);
    m.body.scale.y = st.body * (1 + k * 0.012);
    m.head.position.y = y0 + k * 0.012;
    m.head.rotation.z = Math.sin(t * 1.1) * 0.035;
    m.anim(t);
    blink(m.eyes, t);
  };
  animate(0);
  return { group, animate, height: (y0 + 0.5 * st.head) * st.all };
}

/* 蛋：顏色和要孵出來的寵物一樣 */
export function buildEgg(id) {
  const C = { bear: ['#6b6a78', '#fff6e0'], magpie: ['#6aa8ee', '#ffffff'], pangolin: ['#d7a873', '#fff0d8'] }[id];
  const s = new Soft(), pts = [];
  for (let i = 0; i <= 18; i++) { const a = -Math.PI / 2 + (i / 18) * Math.PI; pts.push([Math.max(0, Math.cos(a) * 0.4 * (1 - 0.14 * Math.sin(a))), 0.5 + Math.sin(a) * 0.5]); }
  s.lathe(pts, C[0], { seg: 34 });
  for (const [yaw, pit, r] of [[0.1, 0.1, 0.11], [0.75, 0.45, 0.08], [-0.65, 0.5, 0.09], [-0.8, -0.35, 0.1], [0.7, -0.4, 0.08], [2.2, 0.2, 0.11], [-2.2, -0.1, 0.1], [3.1, 0.5, 0.09]]) {
    const a = on([0, 0.5, 0], [0.4, 0.5, 0.4], yaw, pit, -0.004);
    s.ball(r, C[1], { p: a.p, r: a.r, s: [1, 1.1, 0.14], line: false });
  }
  const group = new THREE.Group();
  group.add(s.build());
  const shadow = blobShadow(0.42, 0.3); shadow.position.y = 0.02; group.add(shadow);
  return { group, animate: (t) => { group.rotation.z = Math.sin(t * 5) * Math.max(0, Math.sin(t * 0.8)) * 0.07; }, height: 1 };
}
