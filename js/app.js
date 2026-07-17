// ============================================================
// APP LOGIC — reads js/config/catalog.js and builds:
//   1. The printable marker cards on the intro screen
//   2. The AR scene entities (assets + targets) at runtime
//   3. The found/lost UI behaviour
// You shouldn't need to edit this file to add/change pages —
// edit js/config/catalog.js instead.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const introScreen = document.getElementById('intro-screen');
  const startBtn = document.getElementById('start-btn');
  const backBtn = document.getElementById('back-btn');
  const statusBar = document.getElementById('status-bar');
  const arScene = document.getElementById('ar-scene');
  const infoPanel = document.getElementById('info-panel');
  const infoTitle = document.getElementById('info-title');
  const infoDesc = document.getElementById('info-desc');
  const markerGrid = document.getElementById('marker-grid');
  const assetsContainer = document.getElementById('ar-assets');
  const targetsContainer = document.getElementById('ar-targets');

  // ---------- 1. Wire the .mind file into the scene ----------
  arScene.setAttribute(
    'mindar-image',
    `imageTargetSrc: ${window.MIND_FILE}; autoStart: false; uiScanning: no; uiLoading: no;`
  );

  // ---------- 2. Build intro screen preview cards ----------
  window.CATALOG.forEach(item => {
    const card = document.createElement('div');
    card.className = 'marker-card';
    card.innerHTML = `<img src="${item.triggerImage}" alt="${item.name}" /><span>${item.name}</span>`;
    markerGrid.appendChild(card);
  });

  // ---------- 3. Build AR assets + target entities from catalog ----------
  window.CATALOG.forEach(item => {
    const assetId = `model-${item.targetIndex}`;

    const asset = document.createElement('a-asset-item');
    asset.setAttribute('id', assetId);
    asset.setAttribute('src', item.model.src);
    assetsContainer.appendChild(asset);

    const targetEntity = document.createElement('a-entity');
    targetEntity.setAttribute('id', `target-${item.targetIndex}`);
    targetEntity.setAttribute('mindar-image-target', `targetIndex: ${item.targetIndex}`);

    const modelEl = document.createElement('a-gltf-model');
    modelEl.setAttribute('src', `#${assetId}`);
    modelEl.setAttribute('position', item.model.position);
    modelEl.setAttribute('rotation', item.model.rotation);
    modelEl.setAttribute('scale', item.model.scale);
    if (item.model.animated) modelEl.setAttribute('animation-mixer', '');

    targetEntity.appendChild(modelEl);
    targetsContainer.appendChild(targetEntity);

    // ---------- 4. Found / lost UI behaviour ----------
    targetEntity.addEventListener('targetFound', () => {
      statusBar.textContent = `✅ Found: ${item.name}`;
      infoTitle.textContent = item.title;
      infoDesc.textContent = item.description;
      infoPanel.style.display = 'block';
      requestAnimationFrame(() => infoPanel.classList.add('visible'));
    });
    targetEntity.addEventListener('targetLost', () => {
      statusBar.textContent = '🔍 Point camera at any catalog page';
      infoPanel.classList.remove('visible');
      setTimeout(() => { infoPanel.style.display = 'none'; }, 250);
    });
  });

  // ---------- 5. Start / stop camera ----------
  startBtn.addEventListener('click', () => {
    introScreen.style.display = 'none';
    arScene.style.display = 'block';
    statusBar.style.display = 'block';
    backBtn.style.display = 'block';

    const start = () => arScene.systems['mindar-image-system'].start();
    if (arScene.hasLoaded) start();
    else arScene.addEventListener('loaded', start);
  });

  backBtn.addEventListener('click', () => {
    if (arScene.systems['mindar-image-system']) {
      arScene.systems['mindar-image-system'].stop();
    }
    arScene.style.display = 'none';
    statusBar.style.display = 'none';
    backBtn.style.display = 'none';
    infoPanel.style.display = 'none';
    infoPanel.classList.remove('visible');
    introScreen.style.display = 'flex';
  });
});
