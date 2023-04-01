// Crie a cena, a câmera e a luz
const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 900);
camera.position.set(0, 0, 3);

// Carrega a textura da terra
const terraTexture = new THREE.TextureLoader().load('https://p2.piqsels.com/preview/501/577/297/earth-map-summer-july.jpg');
const ceuTexture = new THREE.TextureLoader().load('https://cdn.pixabay.com/photo/2016/09/08/12/00/stars-1654074_960_720.jpg');

// Cria a esfera para representar a terra
const terraGeometry = new THREE.SphereGeometry(1, 32, 32);
const terraMaterial = new THREE.MeshBasicMaterial({ map: terraTexture });
const terra = new THREE.Mesh(terraGeometry, terraMaterial);

const ceuGeometry = new THREE.SphereGeometry(250, 64, 64);
const ceuMaterial = new THREE.MeshBasicMaterial({ map: ceuTexture, side: THREE.BackSide });
const ceu = new THREE.Mesh(ceuGeometry, ceuMaterial);

// Adicione a esfera à cena
cena.add(ceu);
cena.add(terra);

// Adicione event listener para capturar eventos do mouse
let isMouseDown = false;
let previousMousePosition = {
  x: 0,
  y: 0,
};
let isMoving = false;

function onPointerStart(event) {
  isMouseDown = true;
  previousMousePosition = {
    x: event.clientX || event.touches[0].clientX,
    y: event.clientY || event.touches[0].clientY,
  };
  isMoving = true;
}

function onPointerMove(event) {
  if (isMouseDown) {
    const deltaMove = {
      x: (event.clientX || event.touches[0].clientX) - previousMousePosition.x,
      y: (event.clientY || event.touches[0].clientY) - previousMousePosition.y,
    };

    terra.rotation.y += deltaMove.x * 0.008;
    terra.rotation.x += deltaMove.y * 0.008;

    previousMousePosition = {
      x: event.clientX || event.touches[0].clientX,
      y: event.clientY || event.touches[0].clientY,
    };
    ceu.rotation.copy(terra.rotation);
  }
}

function onPointerEnd(event) {
  isMouseDown = false;
  isMoving = false;
}

window.addEventListener('pointerdown', onPointerStart);
window.addEventListener('pointermove', onPointerMove);
window.addEventListener('pointerup', onPointerEnd);

// Anexe o canvas à página HTML
const canvas = document.querySelector('#canvas');

const container = document.querySelector('#canvas-container');
container.appendChild(canvas);

// Crie o renderizador
const renderizador = new THREE.WebGLRenderer({ canvas });

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
