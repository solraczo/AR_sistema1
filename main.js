// Variables globales
let camera, scene, renderer;
let container;

// Inicializar la escena
function init() {
    // Crear un contenedor para la escena
    container = document.getElementById('ar-container');

    // Configurar la escena
    scene = new THREE.Scene();

    // Configurar la cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Configurar el renderizador
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Agregar un cubo a la escena
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Manejar el redimensionamiento de la ventana
    window.addEventListener('resize', onWindowResize, false);

    // Iniciar el bucle de renderizado
    animate();
}

// Función para redimensionar la escena
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Bucle de renderizado
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Verificar compatibilidad con WebXR
function checkXRSupport() {
    if ('xr' in navigator) {
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
            if (supported) {
                console.log('AR es compatible');
                startARSession();
            } else {
                console.log('AR no es compatible');
            }
        });
    } else {
        console.log('WebXR no está disponible');
    }
}

// Iniciar la sesión de AR
async function startARSession() {
    const session = await navigator.xr.requestSession('immersive-ar');
    session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, renderer.getContext()),
    });
    session.requestReferenceSpace('local').then((referenceSpace) => {
        renderer.xr.setReferenceSpace(referenceSpace);
        renderer.xr.setSession(session);
    });
}

// Inicializar la aplicación
init();
checkXRSupport();