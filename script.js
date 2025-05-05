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

// 3D tilt effect for skill cards
document.querySelectorAll('.skill-card').forEach(card => {
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

// Make it extremely sensitive
const SENSITIVITY = 0.12; // Try 0.08–0.15 for ultra sensitivity

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
  targetRotation.y += deltaMove.x * SENSITIVITY;
  targetRotation.x += deltaMove.y * SENSITIVITY;
  previousMousePosition = { x: clientX, y: clientY };
}

function onPointerUp() {
  isDragging = false;
}

// Attach events to the renderer's DOM element
renderer.domElement.addEventListener('mousedown', onPointerDown);
renderer.domElement.addEventListener('mousemove', onPointerMove);
renderer.domElement.addEventListener('mouseup', onPointerUp);
renderer.domElement.addEventListener('mouseleave', onPointerUp);

renderer.domElement.addEventListener('touchstart', onPointerDown, { passive: false });
renderer.domElement.addEventListener('touchmove', onPointerMove, { passive: false });
renderer.domElement.addEventListener('touchend', onPointerUp);

// Animation loop: very fast interpolation, no idle rotation
function animate() {
  requestAnimationFrame(animate);

  // Interpolate quickly for instant response
  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.6;
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.6;

  // No idle rotation! Cube only moves when user interacts

  cube.rotation.x = currentRotation.x;
  cube.rotation.y = currentRotation.y;

  renderer.render(scene, camera);
}
animate();

// Scramble Text Effect Class
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.textContent;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        output += to;
        complete++;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Scramble effect on every scroll into view
const aboutInfo = document.getElementById('about-info-text');
const originalAboutHTML = aboutInfo.innerHTML;
const plainText = aboutInfo.textContent.replace(/\s+/g, ' ').trim(); // get plain text, collapse whitespace

const scramble = new TextScramble(aboutInfo);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Set only the plain text (no HTML) for scrambling
      aboutInfo.textContent = plainText;
      scramble.setText(plainText).then(() => {
        aboutInfo.innerHTML = originalAboutHTML; // restore HTML tags (like <b>)
      });
    }
  });
}, { threshold: 0.5 });

observer.observe(aboutInfo);

// Timeline scroll-in animation with staggered effect
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Get the index of the card
      const index = Array.from(timelineItems).indexOf(entry.target);
      // Add a staggered delay
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 200); // 200ms delay between each card
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
  timelineObserver.observe(item);
});

// Project filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 3D tilt effect for contact form
const contactForm = document.querySelector('.contact-form.rgb-shadow-3d');
if (contactForm) {
  contactForm.addEventListener('mousemove', (e) => {
    const rect = contactForm.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    contactForm.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  contactForm.addEventListener('mouseleave', () => {
    contactForm.style.transform = '';
  });
}

// Contact section interactivity
document.addEventListener('DOMContentLoaded', function() {
  // Email click: open mail client
  const emailLink = document.getElementById('contact-email');
  if (emailLink) {
    emailLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'mailto:prajitpsn@gmail.com';
    });
  }

  // Phone click: open dialer on mobile, else show alert
  const phoneLink = document.getElementById('contact-phone');
  if (phoneLink) {
    phoneLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Simple mobile detection
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        window.location.href = 'tel:+918777XXXX52';
      } else {
        alert('This feature is available on mobile devices.');
      }
    });
  }

  // Location click: open Google Maps
  const locationLink = document.getElementById('contact-location');
  if (locationLink) {
    locationLink.addEventListener('click', function(e) {
      e.preventDefault();
      // You can use a more precise address if you want
      window.open('https://www.google.com/maps/place/Kolkata,+India', '_blank');
    });
  }
});
