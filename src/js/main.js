import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import GUI from "lil-gui";

class WebGL {
  constructor() {
    //scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    //Renderer
    this.container = document.querySelector("main");
    this.renderer = new THREE.WebGLRenderer();
    this.container.appendChild(this.renderer.domElement);
    this.renderer.setPixelRatio(2);

    this.gui = new GUI();
    this.time = 0;
    this.addCamera();
    this.addMesh();
    this.addControl();
    this.addLight();
    this.render();
    this.onWindowResize();
    this.addSetting();
  }

  get viewport() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspectRatio = width / height;

    return {
      width,
      height,
      aspectRatio,
    };
  }

  addCamera() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.camera = new THREE.PerspectiveCamera(70, this.viewport.aspectRatio, 0.1, 1000);
    this.camera.position.z = 1.5;
    this.renderer.setSize(this.viewport.width, this.viewport.height);
  }

  addMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: vertex,
      fragmentShader: fragment,
      //wireframe: true,
      // side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  addLight() {
    this.light = new THREE.DirectionalLight(0xffff, 0.08);
    this.light.position.set(-100, 0, -100);
    this.scene.add(this.light);
  }

  addControl() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableDamping = true;
    // this.controls.enablePan = true;
    // this.controls.enableZoom = true;
  }
  onWindowResize() {
    this.camera.aspect = this.viewport.aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.viewport.width, this.viewport.height);
  }

  render() {
    this.time += 0.05;
    this.material.uniforms.uTime.value = this.time;
    //console.log(this.material.uniforms.uTime);
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }

  addSetting() {
    this.cameraFolder = this.gui.addFolder("camera");
    this.cameraFolder.add(this.camera.position, "x", -5, 5);
    this.cameraFolder.add(this.camera.position, "y", -5, 5);
    this.cameraFolder.add(this.camera.position, "z", -5, 5);
    this.cameraFolder.open();
  }
}

new WebGL();
