/* 小勇者：站在地圖上「現在要挑戰的地方」。點別的地方，會沿著道路跑過去。
   兩隻可以選（首頁、選單「換角色」，記在這台裝置上）：
     cat    貓劍士：灰白虎斑、藍色領巾和短披風、背上一把小木劍
     rabbit 兔探險家：米白長耳、橘色圍巾、綠色小背包
   2026-11-23 重畫（學生說舊版不可愛：臉頰外凸、眼睛太複雜）。造型規則和寵物一樣（見 pets.js）：
   兩頭身、頭和身體都是簡單圓形、眼睛只有圓點加亮點，配件只留最能代表角色的一兩樣。會眨眼。
   正面朝 +z，腳底在 y=0。回傳 { group, body, shadow, kind, animate(t, phase, walking) }。 */
import { THREE, blobShadow } from './kit.js';
import { Soft, joint, on, blink } from './soft.js';

export const HERO_KEY = 'xk-hero';
export const HERO_KINDS = ['cat', 'rabbit'];
export function heroKind() {
  try { const v = localStorage.getItem(HERO_KEY); return HERO_KINDS.includes(v) ? v : 'cat'; } catch { return 'cat'; }
}

const INK = '#2a2536';
const H = [0, 1.24, 0], R = [0.585, 0.53, 0.535];         // 頭
const B = [0, 0.52, 0];                                    // 身體

function dotEye(parent, yaw, pitch, r) {
  const a = on(H, R, yaw, pitch, -0.004);
  return joint(parent, a.p, (s) => {
    s.ball(r, INK, { s: [0.92, 1.16, 0.42], line: false, seg: 20 });
    s.ball(r * 0.34, '#ffffff', { p: [r * 0.27, r * 0.46, r * 0.38], shine: true, seg: 10 });
  }, a.r);
}
// 貼在臉上的扁圓（腮紅、口鼻的白毛、斑紋），不會凸出來
const patch = (s, yaw, pitch, w, h, color, rz = 0, out = -0.006) => { const a = on(H, R, yaw, pitch, out); s.ball(0.1, color, { p: a.p, r: [a.r[0], a.r[1], rz], s: [w / 0.1, h / 0.1, 0.13], line: false }); };
const smile = (s, y, z, r = 0.042) => { for (const k of [-1, 1]) s.torus(r, 0.0105, INK, { p: [k * r, y, z], r: [0.2, 0, Math.PI], arc: Math.PI, line: false, ts: 6, rs: 14 }); };
function legs(body, color, toe) {
  return [-1, 1].map((k) => joint(body, [k * 0.18, 0.24, 0], (j) => {
    j.ball(0.16, color, { p: [0, -0.1, 0.02], s: [0.95, 0.9, 1] });
    j.ball(0.15, toe, { p: [0, -0.155, 0.1], s: [0.95, 0.56, 1.15] });
  }));
}
function arms(body, color, hand) {
  return [-1, 1].map((k) => joint(body, [k * 0.35, 0.72, 0.04], (j) => {
    j.capsule(0.095, 0.16, color, { p: [k * 0.055, -0.12, 0.03], r: [0, 0, k * 0.4] });
    j.ball(0.105, hand, { p: [k * 0.11, -0.25, 0.05] });
  }));
}

/* ---------- 貓劍士 ---------- */
function cat(body) {
  const FUR = '#b9bdca', FUR_D = '#8f94a6', WHITE = '#fbf8f2', PINK = '#ff9db0', INNER = '#ffc6d0', BLUE = '#3d6be0', BLUE_D = '#2c50b4', GOLD = '#ffc23a';
  const s = new Soft();
  s.ball(0.43, FUR, { p: B, s: [0.98, 1.02, 0.9] });
  s.ball(0.3, WHITE, { p: [0, 0.46, 0.19], s: [0.95, 1, 0.76], line: false });
  // 藍色領巾：一圈＋前面一個小三角、金色釦子
  s.torus(0.3, 0.095, BLUE, { p: [0, 0.77, 0.02], r: [Math.PI / 2, 0, 0], s: [1, 0.95, 0.9] });
  s.cone(0.15, 0.22, BLUE, { p: [0, 0.65, 0.37], r: [0.15, 0, Math.PI], s: [1, 1, 0.4] });
  s.ball(0.055, GOLD, { p: [0, 0.75, 0.42] });
  // 頭：一個圓
  s.ball(0.55, FUR, { p: H, s: [R[0] / 0.55, R[1] / 0.55, R[2] / 0.55] });
  for (const k of [-1, 1]) patch(s, k * 0.16, -0.36, 0.15, 0.115, WHITE, 0, -0.002);
  patch(s, 0, -0.46, 0.13, 0.1, WHITE, 0, -0.003);
  s.ball(0.05, PINK, { p: on(H, R, 0, -0.2, 0.012).p, s: [1.35, 0.85, 0.7], line: false });
  smile(s, H[1] - 0.175, 0.545);
  // 額頭三條短斑紋
  for (const [yaw, len] of [[-0.22, 0.075], [0, 0.1], [0.22, 0.075]]) patch(s, yaw, 0.82, 0.028, len, FUR_D);
  for (const k of [-1, 1]) patch(s, k * 0.8, -0.3, 0.1, 0.06, '#ffb9c4');
  body.add(s.build());
  const eyes = [-1, 1].map((k) => dotEye(body, k * 0.44, -0.04, 0.098));
  const ears = [-1, 1].map((k) => joint(body, [k * 0.34, 1.62, -0.02], (j) => {
    const tip = (w, h) => [[w, -0.12], [w * 0.97, -0.02], [w * 0.8, h * 0.34], [w * 0.52, h * 0.68], [w * 0.3, h * 0.88], [w * 0.14, h * 0.97], [0, h]];   // 圓頭的三角形
    j.lathe(tip(0.22, 0.27), FUR, { s: [1, 1, 0.52] });
    j.lathe(tip(0.135, 0.185), INNER, { p: [0, 0, 0.06], s: [1, 1, 0.5], line: false });
  }, [0, 0, -k * 0.32]));
  const hands = arms(body, FUR, WHITE), feet = legs(body, FUR, WHITE);
  // 短披風：從領巾往後垂
  const cape = joint(body, [0, 0.84, -0.14], (j) => {
    j.cyl(0.2, 0.4, 0.46, BLUE, { p: [0, -0.24, -0.24], s: [1, 1, 0.17], seg: 30 });
    j.cyl(0.402, 0.405, 0.05, BLUE_D, { p: [0, -0.465, -0.24], s: [1, 1, 0.172], seg: 30, line: false });
  });
  // 背上的小木劍：斜貼著披風，劍柄從右肩後面露出來
  joint(body, [-0.25, 0.83, -0.47], (j) => {
    j.capsule(0.055, 0.98, '#d9a566', { p: [0, -0.21, 0], s: [1, 1, 0.5] });
    j.capsule(0.04, 0.24, '#8a5a30', { p: [0, 0.32, 0], r: [0, 0, Math.PI / 2] });
    j.capsule(0.048, 0.22, '#8a5a30', { p: [0, 0.48, 0] });
    j.ball(0.066, GOLD, { p: [0, 0.65, 0] });
  }, [0, 0, 0.8]);
  const tail = joint(body, [0.04, 0.3, -0.27], (j) => {
    j.tube([[0, 0, 0], [0.18, -0.04, -0.22], [0.46, 0.06, -0.25], [0.63, 0.32, -0.19], [0.6, 0.54, -0.15]], 0.075, FUR);
    j.ball(0.084, FUR_D, { p: [0.6, 0.54, -0.15], s: [1, 1.2, 1] });
  });
  return (t, phase, walking) => {
    const w = walking ? Math.sin(phase) : 0;
    feet[0].rotation.x = w * 0.75; feet[1].rotation.x = -w * 0.75;
    hands[0].rotation.x = -w * 0.5; hands[1].rotation.x = w * 0.5;
    cape.rotation.x = walking ? 0.32 + Math.sin(phase * 2) * 0.06 : 0.05 + Math.sin(t * 1.6) * 0.02;
    tail.rotation.z = Math.sin(t * (walking ? 5 : 1.8)) * 0.14;
    const flick = Math.max(0, Math.sin(t * 1.3) - 0.92) * 4;
    ears[0].rotation.z = 0.32 + flick * 0.25; ears[1].rotation.z = -0.32 - flick * 0.12;
    blink(eyes, t);
  };
}

/* ---------- 兔探險家 ---------- */
function rabbit(body) {
  const FUR = '#f8f1e5', WHITE = '#ffffff', PINK = '#ff9fb2', INNER = '#ffc4d0', ORANGE = '#f0762f', ORANGE_D = '#cf5a1c', GREEN = '#43a35c', GREEN_D = '#2f8047';
  const s = new Soft();
  s.ball(0.43, FUR, { p: B, s: [0.98, 1.02, 0.9] });
  s.ball(0.3, WHITE, { p: [0, 0.46, 0.19], s: [0.95, 1, 0.76], line: false });
  // 橘色圍巾：一圈＋左邊垂下一小截
  s.torus(0.3, 0.1, ORANGE, { p: [0, 0.77, 0.02], r: [Math.PI / 2, 0, 0], s: [1, 0.95, 0.9] });
  s.capsule(0.075, 0.16, ORANGE, { p: [0.15, 0.63, 0.4], r: [-0.1, 0.2, 0.15], s: [1, 1, 0.42] });
  s.ball(0.076, ORANGE_D, { p: [0.17, 0.515, 0.405], s: [1, 0.5, 0.45], line: false });
  // 綠色小背包
  s.ball(0.27, GREEN, { p: [0, 0.54, -0.42], s: [1, 1.02, 0.62] });
  s.ball(0.245, GREEN_D, { p: [0, 0.68, -0.44], s: [1, 0.5, 0.64] });
  s.ball(0.035, '#ffc23a', { p: [0, 0.56, -0.595], line: false });
  // 頭：一個圓
  s.ball(0.55, FUR, { p: H, s: [R[0] / 0.55, R[1] / 0.55, R[2] / 0.55] });
  for (const k of [-1, 1]) patch(s, k * 0.13, -0.36, 0.12, 0.095, WHITE, 0, -0.002);
  s.ball(0.046, PINK, { p: on(H, R, 0, -0.2, 0.012).p, s: [1.3, 0.85, 0.7], line: false });
  smile(s, H[1] - 0.17, 0.545, 0.036);
  for (const k of [-1, 1]) patch(s, k * 0.8, -0.3, 0.105, 0.065, '#ffb7c6');
  body.add(s.build());
  const eyes = [-1, 1].map((k) => dotEye(body, k * 0.44, -0.04, 0.098));
  // 長耳朵：右耳微微垂下
  const ears = [-1, 1].map((k) => joint(body, [k * 0.2, 1.68, -0.03], (j) => {
    j.capsule(0.125, 0.36, FUR, { p: [0, 0.26, 0], s: [1, 1, 0.52] });
    j.capsule(0.072, 0.28, INNER, { p: [0, 0.26, 0.052], s: [1, 1, 0.3], line: false });
  }, [0, 0, -k * 0.16]));
  const hands = arms(body, FUR, WHITE), feet = legs(body, FUR, WHITE);
  const tail = joint(body, [0, 0.26, -0.4], (j) => { j.ball(0.125, WHITE, { p: [0, 0, -0.06] }); });
  return (t, phase, walking) => {
    const w = walking ? Math.sin(phase) : 0;
    feet[0].rotation.x = w * 0.5; feet[1].rotation.x = w * 0.5;
    hands[0].rotation.x = -w * 0.45; hands[1].rotation.x = w * 0.45;
    const back = walking ? -0.28 - Math.abs(w) * 0.2 : Math.sin(t * 1.6) * 0.05;
    ears[0].rotation.x = back; ears[1].rotation.x = back * 0.9;
    ears[0].rotation.z = 0.16;
    ears[1].rotation.z = -0.36 - Math.max(0, Math.sin(t * 0.9) - 0.9) * 2;
    tail.position.y = 0.26 + (walking ? Math.sin(phase * 2) * 0.02 : 0);
    blink(eyes, t);
  };
}

export function buildHero(kind = heroKind()) {
  const body = new THREE.Group();
  const animate = (kind === 'rabbit' ? rabbit : cat)(body);
  const group = new THREE.Group();
  group.add(body);
  const shadow = blobShadow(0.62, 0.35);
  shadow.position.y = 0.04;
  group.add(shadow);
  group.scale.setScalar(1.48);
  group.userData.kind = kind;
  animate(0, 0, false);
  return { group, body, shadow, kind, animate };
}
