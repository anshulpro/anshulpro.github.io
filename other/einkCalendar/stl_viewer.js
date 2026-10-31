import * as THREE from './vendor/three/three.module.js';
import { STLLoader } from './vendor/three/STLLoader.js';
import { OrbitControls } from './vendor/three/OrbitControls.js';

const viewers = [
    { id: 'stl-viewer-1', file: 'display_panel_v3.stl' },
    { id: 'stl-viewer-2', file: 'back_panel_v1.stl' },
    { id: 'stl-viewer-3', file: 'back_panel_cover_v1.stl' },
];

function createViewer({ id, file }) {
    const container = document.getElementById(id);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 2000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 10, 7);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, -5, -5);
    scene.add(fillLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    const loader = new STLLoader();
    loader.load(file, (geometry) => {
        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox;

        const center = new THREE.Vector3();
        bbox.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);

        const size = new THREE.Vector3();
        bbox.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const fitScale = 3 / maxDim;

        const material = new THREE.MeshPhongMaterial({
            color: 0x3a3a3a,
            specular: 0x222222,
            shininess: 30,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(fitScale);
        scene.add(mesh);

        camera.position.set(0, 2, 6);
        camera.lookAt(0, 0, 0);
        controls.update();
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    new ResizeObserver(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }).observe(container);
}

viewers.forEach(createViewer);
