// ============================================================
// CATALOG DATA — this is the ONLY file you need to touch when
// adding, removing, or editing a textbook page's AR content.
//
// It holds nothing but data: no logic lives here.
//   - triggerImage : preview picture of the page (shown on the
//                    intro screen so people know what to scan)
//   - targetIndex  : which position this page was in when you
//                    uploaded it to the MindAR compiler
//                    (0 = first image uploaded, 1 = second, etc.)
//   - model        : path to the .glb/.gltf file to display
//   - scale/position/rotation : how the model sits on the page
//   - title/description : shown in the info panel when found
// ============================================================

// -----------------------------------------------------------------
// DEMO MODE (works immediately, zero setup): points at MindAR's own
// free sample .mind file and models, hosted on their CDN.
// -----------------------------------------------------------------
const MIND_FILE = "https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/band.mind";

// -----------------------------------------------------------------
// YOUR REAL PROJECT: once you compile your own textbook pages,
// download the result as targets.mind, put it in assets/targets/,
// then change the line above to:
//   const MIND_FILE = "assets/targets/targets.mind";
// -----------------------------------------------------------------

const CATALOG = [
  {
    targetIndex: 0,
    name: "Sample Page 1",
    triggerImage: "https://hiukim.github.io/mind-ar-js-doc/assets/images/raccoon-2ef571baece2ee4724d0d19edf3de791.png",
    model: {
      src: "https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/raccoon/scene.gltf",
      position: "0 -0.25 0",
      rotation: "0 0 0",
      scale: "0.05 0.05 0.05",
      animated: true
    },
    title: "Raccoon Model (placeholder)",
    description: "Stand-in for e.g. a Biology diagram — replace triggerImage + model with your own."
    // Real version: triggerImage: "assets/marker-previews/page-1.png"
    //               model.src:    "assets/models/model-1.gltf"
  },
  {
    targetIndex: 1,
    name: "Sample Page 2",
    triggerImage: "https://hiukim.github.io/mind-ar-js-doc/assets/images/bear-3c737546fb0bde7a9c45b45ee999d132.png",
    model: {
      src: "https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/bear/scene.gltf",
      position: "0 -0.25 0",
      rotation: "0 0 0",
      scale: "0.05 0.05 0.05",
      animated: true
    },
    title: "Bear Model (placeholder)",
    description: "Stand-in for e.g. a Physics apparatus diagram — replace triggerImage + model with your own."
    // Real version: triggerImage: "assets/marker-previews/page-2.png"
    //               model.src:    "assets/models/model-2.gltf"
  }

  // To add Page 3:
  // 1. Add its photo to the compiler batch, re-download targets.mind
  // 2. Drop the new model file in assets/models/
  // 3. Drop a preview image in assets/marker-previews/
  // 4. Copy one of the blocks above, bump targetIndex to 2, fill in the rest
];

// Exposed as plain globals since this is loaded as a classic <script>,
// not an ES module — keeps the whole project runnable with zero build step.
window.MIND_FILE = MIND_FILE;
window.CATALOG = CATALOG;
