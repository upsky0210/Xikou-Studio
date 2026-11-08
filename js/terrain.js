/* 地形：每個單元是一個不同的地方（礦坑、磨坊、綠洲……），最後是王城。
   這裡只放名稱、代表色和小圖；3D 模型在 js/3d/landmarks.js，小圖由 tools/render-sprites.mjs 從模型畫出來。
   資料檔的 zones 寫 { name, unit, terrain }，terrain 就是下面的 key。
   新增地形：在 js/3d/landmarks.js 加一個模型，這裡加一筆，再跑 node tools/render-sprites.mjs。 */
(function () {
  const TERRAINS = {
    mine: { label: '礦坑', color: '#8a6a52' },
    mill: { label: '磨坊', color: '#ef7d3c' },
    oasis: { label: '綠洲', color: '#e0a92e' },
    arena: { label: '競技場', color: '#e2544a' },
    palace: { label: '宮殿', color: '#8b5cf6' },
    garden: { label: '花園', color: '#16a88c' },
    mountain: { label: '山脈', color: '#3f87de' },
    maze: { label: '迷宮', color: '#43a047' },
    castle: { label: '王城', color: '#d63f6c' },
    weather: { label: '氣象台', color: '#3b9ee8' },
    forge: { label: '鍛造坊', color: '#e8622c' },
    volcano: { label: '火山谷', color: '#a8643a' },
    magnet: { label: '磁石塔', color: '#7c4ddb' },
    civic: { label: '議事城', color: '#3d6fd8' },
    lane: { label: '文化巷', color: '#c4553b' },
    industry: { label: '轉型園', color: '#e0912a' },
    eco: { label: '城鄉谷', color: '#2f9e5b' },
    school: { label: '校園', color: '#4c9a3f' },
    clocktower: { label: '鐘塔', color: '#7d55d8' },
    isle: { label: '湖島', color: '#2e8fc9' },
    street: { label: '街角', color: '#e07a2a' },
    fest: { label: '廣場', color: '#d63f6c' },
    generic: { label: '城鎮', color: '#6d7a99' },
  };
  function get(key) {
    const k = TERRAINS[key] ? key : 'generic';
    return Object.assign({ key: k, img: 'img/zone/' + k + '.webp' }, TERRAINS[k]);
  }
  window.Terrain = { TERRAINS, get };
})();
