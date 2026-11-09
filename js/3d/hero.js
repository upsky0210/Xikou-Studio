/* 小勇者：站在地圖上「現在要挑戰的地方」。點別的地方，會沿著道路跑過去。
   兩隻可以選（選單「換角色」，記在這台裝置上）：
     cat    貓劍士：灰白虎斑貓，小圓帽、藍色短披風、背著木劍、咖啡色短靴
     rabbit 兔探險家：米白兔子，橘色圍巾、綠色背包、手上拿著地圖
   全部用基本形狀拼的；腳、尾巴、耳朵是分開的小零件，走路時會動。
   正面朝 +z，腳底在 y=0。回傳 { group, body, shadow, animate(t, phase, walking) }。 */
import { THREE, Kit, blobShadow } from './kit.js';

export const HERO_KEY = 'xk-hero';
export const HERO_KINDS = ['cat', 'rabbit'];
export function heroKind() {
  try { const v = localStorage.getItem(HERO_KEY); return HERO_KINDS.includes(v) ? v : 'cat'; } catch { return 'cat'; }
}

// 一個可以轉的小零件：pivot 是轉軸的位置，fill(k) 在轉軸座標裡拼形狀
function joint(parent, pivot, fill) {
  const g = new THREE.Group();
  g.position.set(...pivot);
  const k = new Kit();
  fill(k);
  g.add(k.build({ cast: false }));
  parent.add(g);
  return g;
}

/* ---------- 貓劍士 ---------- */
function cat(body) {
  const FUR = '#a9abb6', FUR2 = '#eeebe4', STRIPE = '#62646f', PINK = '#ff9aa8', BOOT = '#7a4f2a', CAPE = '#3f6fd8', HAT = '#2f3a5c';
  const k = new Kit();
  // 身體：灰毛＋白肚子＋皮帶
  k.cyl(0.3, 0.4, 0.62, 10, FUR, { p: [0, 0.46, 0] });
  k.ball(0.27, 1, FUR2, { p: [0, 0.74, 0.2], s: [1, 1.15, 0.7] });
  k.cyl(0.39, 0.4, 0.1, 10, '#6b4426', { p: [0, 0.56, 0] });
  k.box(0.14, 0.12, 0.05, '#ffc533', { p: [0, 0.55, 0.39] });
  for (const s of [-1, 1]) {   // 手
    k.cyl(0.09, 0.11, 0.46, 6, FUR, { p: [s * 0.38, 0.66, 0], r: [0, 0, s * 0.45] });
    k.ball(0.12, 1, FUR2, { p: [s * 0.56, 0.62, 0.02] });
  }
  // 頭：稍微扁一點的大圓頭、白色口鼻、綠眼睛、額頭三條虎斑
  k.ball(0.55, 2, FUR, { p: [0, 1.5, 0], s: [1.08, 0.95, 1] });
  k.ball(0.24, 1, FUR2, { p: [0, 1.36, 0.42], s: [1.35, 0.8, 0.75] });
  k.ball(0.06, 1, PINK, { p: [0, 1.44, 0.6], s: [1.3, 0.8, 0.8] });
  k.box(0.1, 0.025, 0.02, '#4a3b3b', { p: [0, 1.33, 0.6] });
  for (const s of [-1, 1]) {
    k.ball(0.13, 1, '#57b86a', { p: [s * 0.21, 1.56, 0.44], s: [1, 1.15, 0.6] });
    k.ball(0.07, 1, '#1d2742', { p: [s * 0.21, 1.56, 0.51], s: [0.8, 1.25, 0.5] });
    k.ball(0.028, 0, '#ffffff', { p: [s * 0.21 + 0.03, 1.61, 0.55] });
    k.ball(0.07, 1, '#ffb3bd', { p: [s * 0.36, 1.36, 0.4], s: [1, 0.6, 0.5] });
    for (const dy of [-0.03, 0.03]) k.box(0.26, 0.012, 0.012, '#4a4a55', { c: true, p: [s * 0.36, 1.38 + dy, 0.5], r: [0, -s * 0.3, s * dy * 4] });   // 鬍鬚
  }
  for (const x of [-0.12, 0, 0.12]) k.box(0.05, 0.2, 0.03, STRIPE, { c: true, p: [x, 1.86, 0.36], r: [-0.75, 0, 0] });
  for (const s of [-1, 1]) k.box(0.16, 0.04, 0.03, STRIPE, { c: true, p: [s * 0.5, 1.55, 0.18], r: [0, s * 1.2, 0] });
  // 小圓帽（夾在兩耳中間，帽沿短短的，插一根小小的金羽毛）
  k.cyl(0.36, 0.36, 0.05, 14, HAT, { p: [0, 1.88, -0.06], r: [-0.12, 0, 0.1] });
  k.cyl(0.23, 0.26, 0.26, 12, HAT, { p: [0, 1.91, -0.07], r: [-0.12, 0, 0.1] });
  k.cyl(0.265, 0.265, 0.06, 12, '#e5493d', { p: [0, 1.93, -0.07], r: [-0.12, 0, 0.1] });
  k.cone(0.05, 0.32, 5, '#ffc533', { p: [0.2, 2.01, -0.14], r: [-0.3, 0, -0.5] });
  // 藍色短披風
  k.geo(new THREE.CylinderGeometry(0.38, 0.56, 0.72, 10, 1, true, Math.PI - 1.0, 2.0).translate(0, 0.36, 0), CAPE, { p: [0, 0.46, -0.03] });
  k.geo(new THREE.CylinderGeometry(0.37, 0.55, 0.72, 10, 1, true, Math.PI - 1.0, 2.0).translate(0, 0.36, 0).scale(-1, 1, 1), '#2d4fa8', { p: [0, 0.46, -0.03] });
  // 背上的木劍
  k.box(0.09, 0.78, 0.05, '#e4eaf2', { p: [0.1, 0.55, -0.48], r: [0, 0, 0.5] });
  k.box(0.32, 0.07, 0.08, '#ffc533', { p: [-0.17, 0.95, -0.48], r: [0, 0, 0.5] });
  k.box(0.07, 0.24, 0.07, '#7a4f2a', { p: [-0.25, 0.99, -0.48], r: [0, 0, 0.5] });
  body.add(k.build({ cast: false }));

  // 腳＋短靴（轉軸在屁股）
  const legs = [-1, 1].map((s) => joint(body, [s * 0.17, 0.5, 0], (j) => {
    j.cyl(0.1, 0.11, 0.3, 6, FUR, { p: [0, -0.32, 0] });
    j.cyl(0.13, 0.14, 0.24, 8, BOOT, { p: [0, -0.5, 0.01] });
    j.box(0.22, 0.12, 0.3, BOOT, { p: [0, -0.5, 0.08] });
    j.cyl(0.15, 0.15, 0.05, 8, '#9a6a3c', { p: [0, -0.28, 0.01] });
  }));
  // 耳朵
  const ears = [-1, 1].map((s) => joint(body, [s * 0.33, 1.86, -0.02], (j) => {
    j.cone(0.17, 0.34, 4, FUR, { r: [0, Math.PI / 4, s * -0.25] });
    j.cone(0.09, 0.22, 4, PINK, { p: [0, 0.02, 0.07], r: [0, Math.PI / 4, s * -0.25] });
  }));
  // 尾巴：一節一節往上翹，尖端深灰
  const tail = joint(body, [0, 0.55, -0.34], (j) => {
    for (let i = 0; i < 7; i++) {
      const a = i / 6;
      j.ball(0.085 - a * 0.015, 1, i > 4 ? STRIPE : (i % 2 ? FUR : '#8c8e99'), { p: [0, a * 0.75, -0.12 - Math.sin(a * 2.2) * 0.28] });
    }
  });
  return (t, phase, walking) => {
    const w = walking ? Math.sin(phase) * 0.7 : 0;
    legs[0].rotation.x = w; legs[1].rotation.x = -w;
    tail.rotation.z = Math.sin(t * (walking ? 6 : 2.2)) * 0.35;
    tail.rotation.x = walking ? -0.25 : 0;
    const flick = Math.max(0, Math.sin(t * 1.3) - 0.92) * 4;   // 偶爾抖一下耳朵
    ears[0].rotation.z = flick * 0.35; ears[1].rotation.z = -flick * 0.2;
  };
}

/* ---------- 兔探險家 ---------- */
function rabbit(body) {
  const FUR = '#f4ecdd', FUR2 = '#fffaf1', PINK = '#ffaebc', SCARF = '#e8622c', PACK = '#3f9a52', VEST = '#d9a35a';
  const k = new Kit();
  // 身體：背心＋白肚子
  k.cyl(0.3, 0.4, 0.6, 10, VEST, { p: [0, 0.46, 0] });
  k.ball(0.24, 1, FUR2, { p: [0, 0.72, 0.22], s: [1, 1.2, 0.6] });
  for (const y of [0.62, 0.8]) k.ball(0.035, 0, '#7a4f2a', { p: [0.13, y, 0.34] });
  for (const s of [-1, 1]) {
    k.cyl(0.09, 0.11, 0.44, 6, FUR, { p: [s * 0.38, 0.66, 0], r: [0, 0, s * 0.42] });
    k.ball(0.12, 1, FUR2, { p: [s * 0.55, 0.62, 0.04] });
  }
  // 右手拿著摺起來的地圖
  k.box(0.3, 0.22, 0.04, '#f6e7b8', { c: true, p: [0.6, 0.72, 0.16], r: [-0.3, -0.4, 0.15] });
  k.box(0.02, 0.22, 0.045, '#d9b56a', { c: true, p: [0.6, 0.72, 0.16], r: [-0.3, -0.4, 0.15] });
  k.box(0.1, 0.03, 0.05, '#e5493d', { c: true, p: [0.64, 0.76, 0.17], r: [-0.3, -0.4, 0.15] });
  // 圍巾：繞脖子一圈＋垂下來一截
  k.torus(0.3, 0.08, 6, 14, Math.PI * 2, SCARF, { p: [0, 1.06, 0], r: [Math.PI / 2, 0, 0] });
  k.box(0.14, 0.34, 0.06, SCARF, { p: [-0.18, 0.72, 0.3], r: [0.1, 0, 0.15] });
  k.box(0.15, 0.04, 0.065, '#ffc533', { p: [-0.205, 0.78, 0.3], r: [0.1, 0, 0.15] });
  // 背包＋捲起來的睡墊
  k.box(0.52, 0.56, 0.26, PACK, { p: [0, 0.48, -0.42] });
  k.box(0.4, 0.22, 0.08, '#2f7a40', { p: [0, 0.54, -0.58] });
  k.cyl(0.11, 0.11, 0.62, 8, '#c4553b', { c: true, p: [0, 1.1, -0.42], r: [0, 0, Math.PI / 2] });
  // 頭：圓圓的臉、白色口鼻、粉紅鼻子、兩顆大門牙、深色大眼睛
  k.ball(0.52, 2, FUR, { p: [0, 1.48, 0], s: [1.02, 0.98, 1] });
  k.ball(0.22, 1, FUR2, { p: [0, 1.34, 0.4], s: [1.3, 0.85, 0.75] });
  k.ball(0.06, 1, PINK, { p: [0, 1.42, 0.57], s: [1.2, 0.85, 0.8] });
  k.box(0.09, 0.08, 0.03, '#ffffff', { p: [0, 1.22, 0.53] });
  k.box(0.006, 0.08, 0.035, '#d8d0c4', { p: [0, 1.22, 0.535] });
  for (const s of [-1, 1]) {
    k.ball(0.12, 1, '#3a2a2a', { p: [s * 0.2, 1.56, 0.43], s: [0.9, 1.15, 0.6] });
    k.ball(0.035, 0, '#ffffff', { p: [s * 0.2 + 0.035, 1.61, 0.5] });
    k.ball(0.075, 1, '#ffb3bd', { p: [s * 0.34, 1.36, 0.38], s: [1, 0.6, 0.5] });
  }
  body.add(k.build({ cast: false }));

  // 大腳（轉軸在屁股；走路時兩腳一起跳）
  const legs = [-1, 1].map((s) => joint(body, [s * 0.17, 0.48, 0], (j) => {
    j.cyl(0.11, 0.12, 0.3, 6, FUR, { p: [0, -0.34, 0] });
    j.ball(0.16, 1, FUR2, { p: [0, -0.4, 0.1], s: [0.85, 0.5, 1.5] });
  }));
  // 長耳朵：右耳彎一點比較可愛
  const ears = [-1, 1].map((s) => joint(body, [s * 0.17, 1.9, -0.04], (j) => {
    j.ball(0.13, 1, FUR, { p: [0, 0.38, 0], s: [0.85, 3.0, 0.5] });
    j.ball(0.08, 1, PINK, { p: [0, 0.38, 0.055], s: [0.8, 3.4, 0.3] });
  }));
  ears[0].rotation.z = 0.12; ears[1].rotation.z = -0.22;
  // 毛球尾巴
  const tail = joint(body, [0, 0.52, -0.38], (j) => { j.ball(0.16, 1, FUR2, { p: [0, 0, -0.06] }); });
  return (t, phase, walking) => {
    const w = walking ? Math.sin(phase) * 0.5 : 0;
    legs[0].rotation.x = w; legs[1].rotation.x = w;
    ears[0].rotation.x = walking ? -0.3 - Math.abs(Math.sin(phase)) * 0.25 : Math.sin(t * 1.6) * 0.06;
    ears[1].rotation.x = walking ? -0.25 - Math.abs(Math.sin(phase + 0.4)) * 0.3 : Math.sin(t * 1.6 + 0.8) * 0.08;
    ears[1].rotation.z = -0.22 - Math.max(0, Math.sin(t * 0.9) - 0.9) * 3;
    tail.position.y = 0.52 + (walking ? Math.sin(phase * 2) * 0.03 : 0);
  };
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
