/* 3D 工具箱：材質、拼積木的 Kit、描邊、陰影圓、隨機數
   美術風格：低多邊形＋卡通分段光影（toon）＋深色描邊，像故事書裡的立體地圖。
   每個模型都用 three.js 的基本形狀拼出來，沒有外部圖檔，沒有授權問題。 */
import * as THREE from '../../vendor/three/build/three.module.min.js';
export { THREE };

/* ---------- 隨機數（固定種子：每次開地圖，樹和石頭都在同一個地方） ---------- */
export function rng(seed) {
  let s = (seed >>> 0) || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}

/* ---------- 平滑的雜訊（地形起伏用） ---------- */
function hash2(x, y) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
export function noise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;   // 0～1
}
export const smooth = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
export const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- 材質 ---------- */
// 卡通光影：三段亮度（暗面、中間、亮面）
export const GRADIENT = (() => {
  const d = new Uint8Array([150, 150, 150, 255, 205, 205, 205, 255, 255, 255, 255, 255]);
  const t = new THREE.DataTexture(d, 3, 1, THREE.RGBAFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.needsUpdate = true;
  return t;
})();

export const toonMat = (opts = {}) => new THREE.MeshToonMaterial(Object.assign({ vertexColors: true, gradientMap: GRADIENT }, opts));
export const MAT = {
  toon: toonMat(),
  glow: new THREE.MeshBasicMaterial({ vertexColors: true }),   // 自己會發光的部分：水晶、燈籠
};

/* 描邊：把模型往外推一點、只畫背面，看起來就像有黑色輪廓線。
   推出去的距離跟著和鏡頭的距離放大，遠近看起來線都差不多粗。 */
export const OUTLINE = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
    uColor: { value: new THREE.Color('#2a2440') },
    uWidth: { value: 0.0022 },
  }]),
  vertexShader: /* glsl */`
    attribute vec3 onormal;
    uniform float uWidth;
    #include <fog_pars_vertex>
    void main() {
      vec4 p = vec4(position, 1.0);
      vec3 on = onormal;
      #ifdef USE_INSTANCING
        p = instanceMatrix * p;
        on = mat3(instanceMatrix) * on;
      #endif
      vec4 mvPosition = modelViewMatrix * p;
      vec3 n = normalize(normalMatrix * on);
      mvPosition.xyz += n * uWidth * max(4.0, -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      #include <fog_vertex>
    }`,
  fragmentShader: /* glsl */`
    uniform vec3 uColor;
    #include <fog_pars_fragment>
    void main() {
      gl_FragColor = vec4(uColor, 1.0);
      #include <colorspace_fragment>
      #include <fog_fragment>
    }`,
  side: THREE.BackSide,
  fog: true,
});

// 描邊要用「平滑」的法線（同一個位置的頂點法線取平均），不然方塊的角會裂開
export function addOutlineNormals(geo) {
  const pos = geo.attributes.position.array, nor = geo.attributes.normal.array, n = pos.length / 3;
  const map = new Map();
  const key = (i) => Math.round(pos[i * 3] * 500) + ',' + Math.round(pos[i * 3 + 1] * 500) + ',' + Math.round(pos[i * 3 + 2] * 500);
  const keys = new Array(n);
  for (let i = 0; i < n; i++) {
    const k = keys[i] = key(i);
    let a = map.get(k);
    if (!a) map.set(k, a = [0, 0, 0]);
    a[0] += nor[i * 3]; a[1] += nor[i * 3 + 1]; a[2] += nor[i * 3 + 2];
  }
  const on = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = map.get(keys[i]), l = Math.hypot(a[0], a[1], a[2]) || 1;
    on[i * 3] = a[0] / l; on[i * 3 + 1] = a[1] / l; on[i * 3 + 2] = a[2] / l;
  }
  geo.setAttribute('onormal', new THREE.BufferAttribute(on, 3));
  return geo;
}

/* ---------- 合併幾何（同一個模型的零件合成一個，畫的時候只要一次） ---------- */
export function merge(geos) {
  let n = 0;
  for (const g of geos) n += g.attributes.position.count;
  const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3);
  let o = 0;
  for (const g of geos) {
    pos.set(g.attributes.position.array, o * 3);
    nor.set(g.attributes.normal.array, o * 3);
    col.set(g.attributes.color.array, o * 3);
    o += g.attributes.position.count;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setAttribute('color', new THREE.BufferAttribute(col, 3));
  out.computeBoundingSphere();
  out.computeBoundingBox();
  return out;
}

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _s = new THREE.Vector3(), _p = new THREE.Vector3(), _c = new THREE.Color();
export const matrixOf = (p = [0, 0, 0], r = [0, 0, 0], s = 1) => {
  _e.set(r[0] || 0, r[1] || 0, r[2] || 0);
  _q.setFromEuler(_e);
  if (typeof s === 'number') _s.set(s, s, s); else _s.set(s[0], s[1], s[2]);
  _p.set(p[0] || 0, p[1] || 0, p[2] || 0);
  return new THREE.Matrix4().compose(_p, _q, _s);
};

// 幫幾何塗上單一顏色，轉成每個面自己的頂點（平面著色＝低多邊形的面感）
export function paint(geo, color, matrix) {
  const g = geo.index ? geo.toNonIndexed() : geo.clone();
  geo.dispose();
  for (const name of Object.keys(g.attributes)) if (name !== 'position') g.deleteAttribute(name);
  if (matrix) g.applyMatrix4(matrix);
  g.computeVertexNormals();
  const n = g.attributes.position.count, col = new Float32Array(n * 3);
  _c.set(color);
  for (let i = 0; i < n; i++) { col[i * 3] = _c.r; col[i * 3 + 1] = _c.g; col[i * 3 + 2] = _c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
}

/* ---------- Kit：用基本形狀拼模型 ----------
   位置 p 是「底部中心」（方塊、圓柱、圓錐），球和其他形狀是中心。
   r 是旋轉（弧度，XYZ 順序），s 是縮放。glow: true 的零件不受光影影響（自己發光）。 */
export class Kit {
  constructor() { this.parts = []; this.glows = []; }
  geo(g, color, o = {}) {
    (o.glow ? this.glows : this.parts).push(paint(g, color, matrixOf(o.p, o.r, o.s)));
    return this;
  }
  // 已經塗好顏色的幾何（例如別的 Kit 合併出來的），再套一個變換加進來
  addColored(g, matrix) {
    const c = g.clone();
    if (matrix) { c.applyMatrix4(matrix); }
    this.parts.push(c);
    return this;
  }
  // c: true＝位置是幾何中心（要轉向的圓柱，例如輪子、橫放的稻草捆）
  box(w, h, d, color, o = {}) { return this.geo(new THREE.BoxGeometry(w, h, d).translate(0, o.c ? 0 : h / 2, 0), color, o); }
  cyl(rt, rb, h, seg, color, o = {}) { return this.geo(new THREE.CylinderGeometry(rt, rb, h, seg, 1, false, o.t0 || 0, o.tl || Math.PI * 2).translate(0, o.c ? 0 : h / 2, 0), color, o); }
  cone(r, h, seg, color, o = {}) { return this.geo(new THREE.ConeGeometry(r, h, seg, 1, false, o.t0 || 0, o.tl || Math.PI * 2).translate(0, o.c ? 0 : h / 2, 0), color, o); }
  // 平放的扇環（花圃）：t0、tl 是角度（0＝+x，往 -z 方向轉），h 是厚度
  annulus(r0, r1, t0, tl, h, color, o = {}) {
    const sh = new THREE.Shape();
    sh.moveTo(Math.cos(t0) * r1, Math.sin(t0) * r1);
    sh.absarc(0, 0, r1, t0, t0 + tl, false);
    sh.lineTo(Math.cos(t0 + tl) * r0, Math.sin(t0 + tl) * r0);
    sh.absarc(0, 0, r0, t0 + tl, t0, true);
    const g = new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false, curveSegments: 6 }).rotateX(-Math.PI / 2);
    return this.geo(g, color, o);
  }
  ball(r, detail, color, o = {}) { return this.geo(new THREE.IcosahedronGeometry(r, detail), color, o); }
  oct(r, color, o = {}) { return this.geo(new THREE.OctahedronGeometry(r, 0), color, o); }
  dome(r, ws, hs, color, o = {}) { return this.geo(new THREE.SphereGeometry(r, ws, hs, 0, Math.PI * 2, 0, o.cap || Math.PI / 2), color, o); }
  lathe(points, seg, color, o = {}) { return this.geo(new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), seg), color, o); }
  torus(r, tube, rs, ts, arc, color, o = {}) { return this.geo(new THREE.TorusGeometry(r, tube, rs, ts, arc), color, o); }
  sector(r, h, seg, t0, tl, color, o = {}) { return this.geo(new THREE.CylinderGeometry(r, r, h, seg, 1, false, t0, tl).translate(0, h / 2, 0), color, o); }
  empty() { return !this.parts.length && !this.glows.length; }
  mergedParts() { return merge(this.parts); }

  /* 組成物件：一般零件一個 mesh、發光零件一個 mesh、描邊一個 mesh */
  build({ outline = true, cast = true, receive = true, glowMat = null } = {}) {
    const group = new THREE.Group();
    let solid = null, glow = null;
    if (this.parts.length) {
      solid = new THREE.Mesh(merge(this.parts), MAT.toon);
      solid.castShadow = cast; solid.receiveShadow = receive;
      group.add(solid);
    }
    if (this.glows.length) {
      glow = new THREE.Mesh(merge(this.glows), glowMat || MAT.glow);
      glow.castShadow = cast;
      group.add(glow);
    }
    if (outline) {
      const all = [solid, glow].filter(Boolean).map((m) => m.geometry);
      const hull = addOutlineNormals(all.length > 1 ? merge(all) : all[0].clone());
      const line = new THREE.Mesh(hull, OUTLINE);
      line.raycast = () => {};
      group.add(line);
    }
    group.userData.solid = solid;
    group.userData.glow = glow;
    return group;
  }
}

/* ---------- 地上的陰影圓（會動的東西用：勇者） ---------- */
let blobTex = null;
export function blobShadow(r, opacity = 0.32) {
  if (!blobTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d'), grd = g.createRadialGradient(32, 32, 4, 32, 32, 31);
    grd.addColorStop(0, 'rgba(20,16,40,1)');
    grd.addColorStop(1, 'rgba(20,16,40,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    blobTex = new THREE.CanvasTexture(c);
  }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(r * 2, r * 2).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, opacity, depthWrite: false }));
  m.renderOrder = 1;
  m.raycast = () => {};
  return m;
}

/* ---------- 水面（溪流、池塘共用）：亮色流紋往前流 ---------- */
let waterTex = null;
export function waterMaterial() {
  if (!waterTex) {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 256;
    const g = c.getContext('2d');
    const grd = g.createLinearGradient(0, 0, 64, 0);
    grd.addColorStop(0, '#9fe3ff'); grd.addColorStop(0.18, '#4cb8ee'); grd.addColorStop(0.82, '#4cb8ee'); grd.addColorStop(1, '#9fe3ff');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 256);
    const r = rng(7);
    g.strokeStyle = 'rgba(255,255,255,.75)';
    g.lineCap = 'round';
    for (let i = 0; i < 22; i++) {
      const x = 10 + r() * 44, y = r() * 256, len = 10 + r() * 22;
      g.lineWidth = 2 + r() * 2.5;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 4, y + len); g.stroke();
    }
    waterTex = new THREE.CanvasTexture(c);
    waterTex.colorSpace = THREE.SRGBColorSpace;
    waterTex.wrapS = waterTex.wrapT = THREE.RepeatWrapping;
  }
  return new THREE.MeshBasicMaterial({ map: waterTex });
}
export const flowWater = (dt) => { if (waterTex) waterTex.offset.y -= dt * 0.12; };
