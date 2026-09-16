const pages = document.querySelectorAll('.page');
const book = document.getElementById('book');
const counter = document.getElementById('counter');
const music = document.getElementById('bg-music');

let currentPage = 0;
let musicStarted = false;

// Fade music volume in gently
music.volume = 0;

function playAudio() {
  if (!musicStarted) {
    music.play().then(() => {
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.5) {
          vol += 0.03;
          music.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 150);
    }).catch(err => {
      console.log("Audio play blocked by browser policy", err);
    });
    musicStarted = true;
  }
}

// Page Turn Event
book.addEventListener('click', () => {
  playAudio();

  pages[currentPage].classList.remove('active');
  currentPage = (currentPage + 1) % pages.length;
  pages[currentPage].classList.add('active');

  counter.textContent = `${currentPage + 1} / ${pages.length}`;
});


/* --- Fireflies Particle System --- */
const canvas = document.getElementById('fireflies');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

class Firefly {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 2 + 1;
    this.alpha = Math.random();
    this.alphaSpeed = Math.random() * 0.015 + 0.005;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    // Warm golden-amber to glowing soft green hues
    this.color = Math.random() > 0.3 ? '255, 220, 130' : '200, 245, 170'; 
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off walls softly
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;

    // Pulsing transparency
    this.alpha += this.alphaSpeed;
    if (this.alpha <= 0.1 || this.alpha >= 0.95) {
      this.alphaSpeed *= -1;
    }
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, this.alpha)})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = `rgba(${this.color}, 0.8)`;
    ctx.fill();
    ctx.restore();
  }
}

// Generate 45 fireflies
const fireflies = Array.from({ length: 45 }, () => new Firefly());

function animate() {
  ctx.clearRect(0, 0, width, height);
  fireflies.forEach(firefly => {
    firefly.update();
    firefly.draw();
  });
  requestAnimationFrame(animate);
}

animate();
