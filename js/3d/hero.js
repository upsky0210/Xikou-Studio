/* 小勇者：站在地圖上「現在要挑戰的地方」。點別的地方，會沿著道路跑過去。
   大頭、短身體、紅披風、背著木劍，全部用基本形狀拼的。 */
import { THREE, Kit, blobShadow } from './kit.js';

const SKIN = '#ffd9bb', HAIR = '#5b3a22', TUNIC = '#4b63f0', CAPE = '#e5493d';

export function buildHero() {
  const k = new Kit();
  for (const x of [-0.16, 0.16]) {
    k.cyl(0.12, 0.13, 0.42, 6, '#3a3150', { p: [x, 0.08, 0] });
    k.box(0.25, 0.16, 0.38, '#6b4426', { p: [x, 0, 0.05] });
  }
  k.cyl(0.34, 0.47, 0.78, 8, TUNIC, { p: [0, 0.42, 0] });
  k.cyl(0.45, 0.46, 0.12, 8, '#7a4f2a', { p: [0, 0.52, 0] });
  k.box(0.16, 0.14, 0.06, '#ffc533', { p: [0, 0.51, 0.44] });
  for (const s of [-1, 1]) {
    k.cyl(0.1, 0.12, 0.52, 6, TUNIC, { p: [s * 0.42, 0.62, 0], r: [0, 0, s * 0.42] });
    k.ball(0.12, 1, SKIN, { p: [s * 0.62, 0.6, 0.02] });
  }
  // 頭（大頭比較可愛）
  k.ball(0.56, 2, SKIN, { p: [0, 1.66, 0] });
  k.dome(0.6, 12, 6, HAIR, { p: [0, 1.7, -0.05], r: [-0.32, 0, 0], cap: Math.PI * 0.55 });
  k.ball(0.17, 1, HAIR, { p: [0.28, 2.02, 0.34] });
  k.ball(0.15, 1, HAIR, { p: [-0.24, 2.05, 0.36] });
  for (const s of [-1, 1]) {
    k.ball(0.075, 1, '#1d2742', { p: [s * 0.2, 1.62, 0.5] });
    k.ball(0.025, 0, '#ffffff', { p: [s * 0.2 + 0.025, 1.65, 0.565] });
    k.ball(0.08, 1, '#ff9aa2', { p: [s * 0.33, 1.47, 0.44], s: [1, 0.6, 0.5] });
  }
  k.box(0.12, 0.04, 0.04, '#b5553c', { p: [0, 1.42, 0.54] });
  // 披風
  k.geo(new THREE.CylinderGeometry(0.4, 0.62, 0.95, 10, 1, true, Math.PI - 1.0, 2.0).translate(0, 0.475, 0), CAPE, { p: [0, 0.3, -0.03] });
  k.geo(new THREE.CylinderGeometry(0.39, 0.61, 0.95, 10, 1, true, Math.PI - 1.0, 2.0).translate(0, 0.475, 0).scale(-1, 1, 1), '#b8342c', { p: [0, 0.3, -0.03] });
  // 背上的木劍
  k.box(0.1, 0.85, 0.05, '#e4eaf2', { p: [0.1, 0.55, -0.52], r: [0, 0, 0.5] });
  k.box(0.34, 0.07, 0.08, '#ffc533', { p: [-0.18, 0.98, -0.52], r: [0, 0, 0.5] });
  k.box(0.07, 0.26, 0.07, '#7a4f2a', { p: [-0.27, 1.02, -0.52], r: [0, 0, 0.5] });
  const body = k.build({ cast: false });   // 會走動，用地上的陰影圓就好
  const group = new THREE.Group();
  group.add(body);
  const shadow = blobShadow(0.75, 0.35);
  shadow.position.y = 0.04;
  group.add(shadow);
  group.scale.setScalar(1.25);
  return { group, body, shadow };
}
