/* 拼「平滑曲面」角色的共用工具（主角 hero.js、寵物 pets.js 都用）：卡通光影材質、Soft 拼模型、貼表面的 on、可以轉的零件 joint、眨眼 blink。 */
import { THREE, OUTLINE, addOutlineNormals, merge } from './kit.js';

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
export class Soft {
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
export function on(C, R3, yaw, pitch, out = 0) {
  const cp = Math.cos(pitch);
  return { p: [C[0] + Math.sin(yaw) * cp * (R3[0] + out), C[1] + Math.sin(pitch) * (R3[1] + out), C[2] + Math.cos(yaw) * cp * (R3[2] + out)], r: [-pitch, yaw, 0] };
}

// 一個可以轉的小零件：pivot 是轉軸的位置，fill(s) 在轉軸座標裡拼形狀
export function joint(parent, pivot, fill, rot) {
  const g = new THREE.Group();
  g.position.set(...pivot);
  if (rot) g.rotation.set(rot[0], rot[1], rot[2] || 0, 'YXZ');
  const s = new Soft();
  fill(s);
  g.add(s.build());
  parent.add(g);
  return g;
}

// 眨眼：大約每 3.6 秒眨一下（0.14 秒）
export function blink(eyes, t) {
  const u = (t % 3.6) / 3.6, close = u > 0.96 ? Math.sin(((u - 0.96) / 0.04) * Math.PI) : 0;
  for (const e of eyes) e.scale.y = 1 - close * 0.9;
}
