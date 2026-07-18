// ============================================================
// GESTURE HANDLER — adds pinch-to-zoom, one-finger drag-to-rotate,
// and two-finger drag-to-pan on whichever model is currently
// visible in the AR scene.
//
// Depends on the free "gesture-detector" component (loaded via
// CDN in index.html), which turns raw touch events into
// onefingermove / twofingermove events on the scene.
//
// You should not need to edit this file — it's generic and reads
// nothing from catalog.js. app.js attaches it to each model and
// toggles `isVisible` on found/lost automatically.
// ============================================================

AFRAME.registerComponent('gesture-handler', {
  schema: {
    minScale: { default: 0.05 },   // how far the user can zoom OUT, relative to starting scale
    maxScale: { default: 5 },      // how far the user can zoom IN, relative to starting scale
    rotationSpeed: { default: 5 }, // higher = more rotation per finger-pixel of drag
    panSpeed: { default: 0.8 }     // higher = more pan per finger-pixel of drag
  },

  init: function () {
    this.isVisible = false; // toggled externally by app.js on targetFound/targetLost
    this.scaleFactor = 1;
    this.initialScale = this.el.object3D.scale.clone();
    this.initialPosition = this.el.object3D.position.clone();

    this.handleRotate = this.handleRotate.bind(this);
    this.handleScaleAndPan = this.handleScaleAndPan.bind(this);
  },

  play: function () {
    this.el.sceneEl.addEventListener('onefingermove', this.handleRotate);
    this.el.sceneEl.addEventListener('twofingermove', this.handleScaleAndPan);
  },

  pause: function () {
    this.el.sceneEl.removeEventListener('onefingermove', this.handleRotate);
    this.el.sceneEl.removeEventListener('twofingermove', this.handleScaleAndPan);
  },

  // One finger drag → rotate the model (tilt/spin)
  handleRotate: function (event) {
    if (!this.isVisible) return;
    this.el.object3D.rotation.y += event.detail.positionChange.x * this.data.rotationSpeed;
    this.el.object3D.rotation.x += event.detail.positionChange.y * this.data.rotationSpeed;
  },

  // Two finger pinch → scale, two finger drag → pan
  handleScaleAndPan: function (event) {
    if (!this.isVisible) return;

    // Pinch (spread change) controls zoom
    if (event.detail.spreadChange) {
      this.scaleFactor += event.detail.spreadChange * 0.005;
      this.scaleFactor = Math.min(Math.max(this.scaleFactor, this.data.minScale), this.data.maxScale);
      this.el.object3D.scale.set(
        this.initialScale.x * this.scaleFactor,
        this.initialScale.y * this.scaleFactor,
        this.initialScale.z * this.scaleFactor
      );
    }

    // Two-finger drag controls pan (left/right, up/down)
    if (event.detail.positionChange) {
      this.el.object3D.position.x += event.detail.positionChange.x * this.data.panSpeed;
      this.el.object3D.position.y -= event.detail.positionChange.y * this.data.panSpeed;
    }
  },

  // Call this to reset the model back to its original scale/position/rotation
  // (handy to trigger on targetLost so re-scanning starts fresh)
  reset: function () {
    this.scaleFactor = 1;
    this.el.object3D.scale.copy(this.initialScale);
    this.el.object3D.position.copy(this.initialPosition);
    this.el.object3D.rotation.set(0, 0, 0);
  }
});