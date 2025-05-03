// Loader logic
const loader = document.getElementById('loader-overlay');

function showLoader() {
  loader.classList.add('active');
}
function hideLoader() {
  loader.classList.remove('active');
}

// Top loading bar logic
const topBar = document.getElementById('top-loading-bar');

function startTopBar() {
  topBar.classList.remove('hide');
  topBar.style.width = '0';
  setTimeout(() => {
    topBar.style.width = '80%';
  }, 10);
}

function finishTopBar() {
  topBar.style.width = '100%';
  setTimeout(() => {
    topBar.classList.add('hide');
    topBar.style.width = '0';
  }, 400);
}

// Smooth scroll with top loading bar
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      startTopBar();
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
        finishTopBar();
      }, 400); // matches the bar's transition
    }
  });
});
  
// 3D tilt effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  themeToggle.textContent = body.classList.contains('light-mode') ? '🌞' : '🌙';
});

// TagCloud.js 3D Sphere
document.addEventListener("DOMContentLoaded", function() {
  const texts = [
    "PRAJIT MONDAL", "HTML", "CSS", "JAVASCRIPT", "REACT", "THREE.JS", "UI/UX",
    "GIT", "GITHUB", "NODE.JS", "EXPRESS", "MONGODB", "PYTHON", "C++", "JAVA",
    "SASS", "BOOTSTRAP", "TAILWIND", "REDUX", "TYPESCRIPT", "NEXT.JS", "SQL",
    "FIREBASE", "FIGMA", "ADOBE XD"
  ];

  TagCloud('#tag-sphere', texts, {
    radius: 120,
    maxSpeed: 'normal',
    initSpeed: 'slow',
    direction: 135,
    keep: true
  });
});

// Glow-in effect on scroll
const glowSections = document.querySelectorAll('.section-glow');
const glowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.2
});

glowSections.forEach(section => {
  glowObserver.observe(section);
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Optional: Close menu when a link is clicked (for better UX)
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// --- User interaction for rotation ---
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };

function toRadians(deg) { return deg * Math.PI / 180; }

function onPointerDown(e) {
  isDragging = true;
  previousMousePosition = {
    x: e.touches ? e.touches[0].clientX : e.clientX,
    y: e.touches ? e.touches[0].clientY : e.clientY
  };
}

function onPointerMove(e) {
  if (!isDragging) return;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const deltaMove = {
    x: clientX - previousMousePosition.x,
    y: clientY - previousMousePosition.y
  };
  targetRotation.y += deltaMove.x * 0.01;
  targetRotation.x += deltaMove.y * 0.01;
  previousMousePosition = { x: clientX, y: clientY };
}

function onPointerUp() {
  isDragging = false;
}

renderer.domElement.addEventListener('mousedown', onPointerDown);
renderer.domElement.addEventListener('mousemove', onPointerMove);
renderer.domElement.addEventListener('mouseup', onPointerUp);
renderer.domElement.addEventListener('mouseleave', onPointerUp);

renderer.domElement.addEventListener('touchstart', onPointerDown);
renderer.domElement.addEventListener('touchmove', onPointerMove);
renderer.domElement.addEventListener('touchend', onPointerUp);

// Function to create a canvas texture with text
function createTextTexture(text, bgColor = "#111", textColor = "#fff") {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);
  // Text
  ctx.font = "bold 32px Segoe UI, Arial";
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, size / 2, size / 2);
  return new THREE.CanvasTexture(canvas);
}

// Texts for each face
const faceTexts = [
  "PRAJIT",        // right
  "MONDAL",        // left
  "HTML & CSS",    // top
  "JAVASCRIPT",    // bottom
  "REACT",         // front
  "THREE.JS"       // back
];

// Optionally, use different colors for each face
const bgColors = [
  "#ff0055", "#00ffae", "#00aaff", "#ffea00", "#17ea10", "#ff00cc"
];
const textColors = [
  "#fff", "#111", "#fff", "#111", "#111", "#fff"
];

// Create materials with text textures
const materials = faceTexts.map((text, i) =>
  new THREE.MeshStandardMaterial({
    map: createTextTexture(text, bgColors[i], textColors[i]),
    roughness: 0.3,
    metalness: 0.7
  })
);

const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Animate RGB color and rotation
function animate() {
  requestAnimationFrame(animate);

  // Smoothly interpolate to target rotation
  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.15;
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.15;

  // Constant slow rotation if not dragging
  if (!isDragging) {
    targetRotation.y += 0.005;
    targetRotation.x += 0.002;
  }

  cube.rotation.x = currentRotation.x;
  cube.rotation.y = currentRotation.y;

  renderer.render(scene, camera);
}
animate();