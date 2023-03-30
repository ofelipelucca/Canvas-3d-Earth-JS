// Crie a cena, a câmera e a luz
const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 900);
camera.position.set(0, 0, 3);
const luz = new THREE.AmbientLight(0xffffff);

// Carrega a textura da terra
const terraTexture = new THREE.TextureLoader().load('https://p2.piqsels.com/preview/501/577/297/earth-map-summer-july.jpg');

// Cria a esfera para representar a terra
const terraGeometry = new THREE.SphereGeometry(1, 32, 32);
const terraMaterial = new THREE.MeshBasicMaterial({ map: terraTexture });
const terra = new THREE.Mesh(terraGeometry, terraMaterial);

// Cria as nuvens
const nuvensTexture = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1603881318118-18b1a336ea81');
const nuvensGeometry = new THREE.SphereGeometry(1.01, 32, 32);
const nuvensMaterial = new THREE.MeshLambertMaterial({
  map: nuvensTexture,
  transparent: true,
});
const nuvens = new THREE.Mesh(nuvensGeometry, nuvensMaterial);

// Adicione a esfera à cena
cena.add(terra);
cena.add(luz);

// Adicione as nuvens à Terra
terra.add(nuvens);

// Adicione event listener para capturar eventos do mouse
let isMouseDown = false;
let previousMousePosition = {
  x: 0,
  y: 0,
};
let isMoving = false;

window.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
  isMoving = true;
});

window.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y,
    };

    terra.rotation.y += deltaMove.x * 0.002;
    terra.rotation.x += deltaMove.y * 0.002;

    previousMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }
});

window.addEventListener('mouseup', (event) => {
  isMouseDown = false;
  isMoving = false;
});

// Adicione event listener para capturar eventos de zoom do mouse
window.addEventListener('wheel', (event) => {
  camera.position.z += event.deltaY * 0.01;
  if (camera.position.z < 3) {
    camera.position.z = 3;
  }
  if (camera.position.z > 7) {
    camera.position.z = 7;
  }
});

// Anexe o canvas à página HTML
const canvas = document.querySelector('#canvas');

const container = document.querySelector('#canvas-container');
container.appendChild(canvas);

// Crie o renderizador
const renderizador = new THREE.WebGLRenderer({ canvas, alpha: true});
cena.background = null;

function onWindowResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderizador.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', () => {
    onWindowResize();
});
onWindowResize();

// Função de animação
function animar() {
    requestAnimationFrame(animar);
    if (!isMoving) {
    camera.lookAt(terra.position);
    }
  renderizador.render(cena, camera);
}

// Inicie a animação
animar();
