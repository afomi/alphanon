import * as THREE from './three.js';
import { OrbitControls } from './orbitcontrols.js';
import { CSS2DRenderer, CSS2DObject } from './css2drenderer.js';
import GUI from './dat.gui.module.js';

import { periodicTableElements, alphanonCanvas, alphanonRenderer } from "./alphanon/canvas.js"

// Alphanon - App Setup
let alphanonApp = {
  amplitude: 7,
  octaves: 10, // 10 full sine waves (octaves)
  points: [],
  totalPoints: 118,
  sphereHeight: 80,

  // Three.js variables
  scene: null,
  canvas: null,
  renderer: null,
  labelRenderer: null,
  controls: null,
  nodesGroup: new THREE.Group(),

  createLabeledElement: function(thisNode) {
    const node = new THREE.Group();

    node.position.x = thisNode.position.x;
    node.position.y = thisNode.position.y;
    node.position.z = thisNode.position.z;

    // Create the text label using a DOM element
    const labelDiv = document.createElement('div');
    labelDiv.textContent = thisNode.userData.name;
    labelDiv.style.fontSize = '12px';
    labelDiv.style.color = 'black';
    labelDiv.style.backgroundColor = 'rgba(255,255,255,0.7)';
    labelDiv.style.padding = '2px';
    labelDiv.style.paddingLeft = '10px';
    labelDiv.style.paddingRight = '10px';
    labelDiv.style.borderRadius = '4px';
    const label = new CSS2DObject(labelDiv);
    // Position the label above the node.
    label.position.set(1, 0, 0);
    node.add(label);

    this.nodesGroup.add(node);
    this.scene.add(this.nodesGroup);
  },
  setupDatGui: function() {
    const params = {
      draw: false,
      height: 5,
      amplitude: 1
    };

    // DATGUI UI controls
    // const gui = new GUI.GUI();
    // gui.add(params, 'draw').name('Draw Sine Wave').onChange(this.drawOctave);
    // gui.add(params, 'height', 1, 10).step(0.1).onChange();
    // gui.add(params, 'amplitude', 0.1, 5).step(0.1).onChange();
  },
  init: function() {
    this.setupThreeJS();

    this.drawMainOctaveLine();
    // this.drawOctave(1);
    // this.drawRotatedOctave(1);
    // this.drawRotatedOctave2(1);
    // this.drawRotatedOctave3(1);
    this.drawOctaveSpheres();
    this.setupDatGui();

    this.animate();

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

    this.addTickmarksPerOctave(8);
  },
  setupThreeJS: function() {
    // Environment Setup: Browser
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Three.js Setup (Canvas and Renderer)
    // Get the canvas and set up the renderer.
    this.canvas = alphanonCanvas();
    this.renderer = alphanonRenderer(this.canvas);

    // Three.js Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xF4F4F4 );

    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    // const camera = new THREE.OrthographicCamera(0, width, height, 0, -1000, 2000);

    this.camera.position.set(0, 0, 70);

    // Handles window resizing
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });


    // Shows a Three.js Axes Helper
    // The X axis is red. The Y axis is green. The Z axis is blue.
    const axesHelper = new THREE.AxesHelper( 500 );
    axesHelper.position.set(0, 0, 0);
    this.scene.add( axesHelper );

    // Three.js OrbitControls with rotation disabled (2D zoom only).
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableRotate = true; // true | false - Enable the scene to be rotated?
    this.controls.enablePan = true; // true | false - Lock panning?

    // Three.js CSS2DRenderer for text labels.
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(this.width, this.height);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    document.getElementById('three-js-css-container').appendChild(this.labelRenderer.domElement);

    // Add axis labels via HTML overlays ---
    const container = document.getElementById('three-js-css-container');
  },
  animate: function() {
    requestAnimationFrame(function() {this.animate()}.bind(this))

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  },
  drawMainOctaveLine: function() {
    // Create the points for a line
    // Create spheres at each octave point
    for (let i = 0; i <= this.totalPoints; i++) {
      const t = i / this.totalPoints;
      const y = (this.sphereHeight / 2) - t * this.sphereHeight;
      const x = Math.sin(t * this.octaves * Math.PI) * this.amplitude;
      const z = Math.cos(t * frequency * Math.PI) * (this.amplitude);
      this.amplitude = this.amplitude * 1.028;
      points.push(new THREE.Vector3(-x, y, z));

      const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(-x, y, z);
      sphere.userData.name = periodicTableElements[i][1]
      this.scene.add(sphere);
      this.createLabeledElement(sphere)
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x333333 });
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
  },
  drawOctave: function(octave = 1) { // note: used for background visual effect
    let drawPoints = 100
    let amplitude = 7;
    // Create the points for an octave line
    for (let i = 0; i <= drawPoints; i++) {
      const t = i / drawPoints;
      const y = (this.sphereHeight / 2) - t * this.sphereHeight;
      const x = Math.sin(t * this.octaves * Math.PI) * amplitude;
      // const z = Math.cos(t * frequency * Math.PI) * (amplitude);
      const z = 0
      // amplitude = amplitude * 1.018
      amplitude = amplitude * 1.018
      // const z = Math.sin(i * 2 * Math.PI);
      points.push(new THREE.Vector3(-x, y, z));

      const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x333333 });
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
  },
  drawRotatedOctave: function(octave = 1) { // note: used for background visual effect
    let drawPoints = 100
    let amplitude = 7;
    // Create the points for an octave line
    for (let i = 0; i <= drawPoints; i++) {
      const t = i / drawPoints;
      const y = (this.sphereHeight / 2) - t * this.sphereHeight;
      const x = 0 //Math.sin(t * this.octaves * Math.PI) * amplitude;
      const z = Math.sin(t * this.octaves * Math.PI) * amplitude;
      amplitude = amplitude * 1.018
      points.push(new THREE.Vector3(-x, y, z));

      const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x333333 });
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
  },
  drawRotatedOctave2: function(octave = 1) { // note: used for background visual effect
    let drawPoints = 100
    let amplitude = 7;
    // Create the points for an octave line
    for (let i = 0; i <= drawPoints; i++) {
      const t = i / drawPoints;
      const y = (this.sphereHeight / 2) - t * this.sphereHeight;
      const x = -Math.sin(t * this.octaves * Math.PI) * amplitude;
      const z = 0
      amplitude = amplitude * 1.018
      points.push(new THREE.Vector3(-x, y, z));

      const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x333333 });
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
  },
  drawRotatedOctave3: function(octave = 1) { // note: used for background visual effect
    let drawPoints = 100
    let amplitude = 7;
    // Create the points for an octave line
    for (let i = 0; i <= drawPoints; i++) {
      const t = i / drawPoints;
      const y = (this.sphereHeight / 2) - t * this.sphereHeight;
      const x = 0;
      const z = -Math.sin(t * this.octaves * Math.PI) * amplitude;
      amplitude = amplitude * 1.018
      points.push(new THREE.Vector3(-x, y, z));

      const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x333333 });
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
  },
  drawOctaveSpheres: function() {
    // Add green spheres at each octave (t = 0.1, 0.2, ..., 1.0)
    const sphereGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });

    // let amplitude = 7;

    for (let i = 0; i < this.octaves; i++) {
      const t = i / this.octaves;
      const y = (this.sphereHeight / 2) - t * this.sphereHeight;
      const x = Math.sin(t * this.octaves * Math.PI) * this.amplitude;
      const z = 0;
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(-x, y, z);
      this.scene.add(sphere);

      // createLabeledElement(sphere)

      // Create a div element for the label
      // const labelDiv = document.createElement('div');
      // labelDiv.className = 'label';
      // labelDiv.textContent = `Octave ${i}`;
      // labelDiv.style.color = 'white';
      // labelDiv.style.fontSize = '12px';

      // // Create a CSS2DObject and attach it to the sphere
      // const label = new CSS2DObject(labelDiv);
      // label.position.set(0, 0.5, 0); // Adjust label position relative to the sphere
      // sphere.add(label);
    }
  },
  addTickmarksPerOctave: function(ticksPerOctave = 4) {
    let amplitude = 2;
    const tickLength = 0.3;
    const tickMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });

    for (let octave = 0; octave < this.octaves; octave++) {
      for (let i = 0; i < ticksPerOctave; i++) {
        const t = (octave + i / ticksPerOctave) / frequency;
        const y = (this.sphereHeight / 2) - t * this.sphereHeight;
        const x = -Math.sin(t * frequency * Math.PI) * amplitude;
        amplitude = amplitude * 1.008

        const tickGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x - tickLength, y, 0),
          new THREE.Vector3(x + tickLength, y, 0),
        ]);
        this.scene.add(new THREE.Line(tickGeom, tickMaterial));
      }
    }
  }
}


let amplitude = 7;
const frequency = 10; // 10 full sine waves (octaves)

const points = [];
const sphereHeight = 80;

export { alphanonApp }