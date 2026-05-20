// ─── CURSOR ──────────────────────────

const ring = document.getElementById('cursor-ring');
const dot  = document.getElementById('cursor-dot');
const light = document.getElementById('mouse-light');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left  = mx - 2.5 + 'px';
  dot.style.top   = my - 2.5 + 'px';
  light.style.left = mx + 'px';
  light.style.top  = my + 'px';
});

function animateCursor() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a,button,.case-card,.stat-card,.method-item,.timeline-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// ─── PARTICLES ────────────────────────────────────────────────

const pContainer = document.getElementById('particles');
for (let i = 0; i < 40; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 2 + 0.5;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${size}px; height: ${size}px;
    animation-duration: ${Math.random() * 20 + 15}s;
    animation-delay: ${Math.random() * 20}s;
    opacity: ${Math.random() * 0.5 + 0.1};
  `;
  pContainer.appendChild(p);
}

// ─── CASE FILES BACKGROUND ────────────────────────────────────

const filesData = [
  { x: 62, y: 10, w: 130, h: 90, r: -8, lines: ['CASE FILE #4721', 'STATUS: OPEN', 'SUBJECT: KIRA', '12 confirmed targets', 'Pattern: Sequential'] },
  { x: 25, y: 55, w: 100, h: 70, r: 5, lines: ['KIRA EVIDENCE', 'Anomaly detected:', 'Heart failure rate', '+40% spike — Week 12'] },
  { x: 55, y: 72, w: 120, h: 80, r: -3, lines: ['WAMMY\'S HOUSE', 'Candidates: Near, Mello', 'Assessment: Ongoing', 'Priority: Classified'] },
  { x: 5,  y: 30, w: 80,  h: 60, r: 12, lines: ['YOTSUBA DATA', 'Board members: 8', 'Connections: 3 known', 'Kira-contact: Likely'] },
  { x: 70, y: 50, w: 100, h: 65, r: -12, lines: ['BEHAVIORAL LOG', 'Pattern shift: Day 104', 'Subject awareness:', 'increasing...'] },
];
const caseFilesEl = document.getElementById('caseFiles');
filesData.forEach(f => {
  const el = document.createElement('div');
  el.className = 'case-file';
  const delay = Math.random() * 6;
  const dur   = 8 + Math.random() * 6;
  el.style.cssText = `
    left: ${f.x}%; top: ${f.y}%;
    width: ${f.w}px; min-height: ${f.h}px;
    --r: ${f.r}deg;
    transform: rotate(${f.r}deg);
    animation-duration: ${dur}s;
    animation-delay: ${delay}s;
  `;
  el.innerHTML = f.lines.join('<br>');
  caseFilesEl.appendChild(el);
});

// ─── HAMBURGER ────────────────────────────────────────────────

const ham  = document.getElementById('hamburger');
const menu = document.getElementById('mobileMenu');
let menuOpen = false;
ham.addEventListener('click', () => {
  menuOpen = !menuOpen;
  menu.classList.toggle('open', menuOpen);
  ham.querySelectorAll('span')[0].style.transform = menuOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
  ham.querySelectorAll('span')[1].style.opacity   = menuOpen ? '0' : '1';
  ham.querySelectorAll('span')[2].style.transform = menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuOpen = false;
  menu.classList.remove('open');
  ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

// ─── SCROLL REVEAL ────────────────────────────────────────────

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), idx * 60);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ─── STATS COUNTER ────────────────────────────────────────────

const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.dataset.count;
        const suffix = el.dataset.count == '92' ? '%' : '+';
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, 40);
      });
      statsObs.disconnect();
    }
  });
}, { threshold: 0.3 });
const statsSection = document.getElementById('stats');
if (statsSection) statsObs.observe(statsSection);

// ─── NAVBAR SCROLL ────────────────────────────────────────────

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 80 
    ? 'rgba(0,0,0,0.92)'
    : 'rgba(0,0,0,0.6)';
});

// ─── ACTIVE NAV ───────────────────────────────────────────────

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const secObs    = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => secObs.observe(s));

// ─── SMOOTH SCROLL ────────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── FORM SUBMIT ──────────────────────────────────────────────

document.querySelector('.btn-submit').addEventListener('click', function() {
  const orig = this.querySelector('span').textContent;
  this.querySelector('span').textContent = 'Transmission Secured ✓';
  this.style.background = 'rgba(200,169,110,0.1)';
  setTimeout(() => {
    this.querySelector('span').textContent = orig;
    this.style.background = '';
  }, 3000);
});


// THEME CHANGING

const themes = [

  "obsidian",
  "crimson",
  "cyber",
  "royal",
  "ghost"
];

let currentTheme = 0;

const themeToggle =
document.getElementById("themeToggle");

// SAVED THEME 

const savedTheme =
localStorage.getItem("theme");

if(savedTheme){

  document.body.classList.add(savedTheme);

  currentTheme =
  themes.indexOf(savedTheme);

  if(currentTheme < 0){

    currentTheme = 0;
  }
}

//  CLICK 

themeToggle.onclick = () => {

  document.body.classList.remove(
    ...themes
  );

  currentTheme++;

  if(currentTheme >= themes.length){

    currentTheme = 0;
  }

  const selectedTheme =
  themes[currentTheme];

  document.body.classList.add(
    selectedTheme
  );

  localStorage.setItem(
    "theme",
    selectedTheme
  );
};


// hide button


const viewAllBtn = document.getElementById("viewAllBtn");
const allCases = document.getElementById("all-cases");

viewAllBtn.addEventListener("click", () => {

  allCases.classList.toggle("show-records");

  if(allCases.classList.contains("show-records")){

    viewAllBtn.innerHTML = "Hide Records ←";

    allCases.scrollIntoView({
      behavior:"smooth"
    });

  }

  else{

    viewAllBtn.innerHTML = "View All Cases →";

  }

});



// contact form SubmitEventbmit


const form = document.getElementById("contactForm");
const successMsg = document.getElementById("success-msg");

form.addEventListener("submit", async function(e){

  e.preventDefault();

  const data = new FormData(form);

  fetch(form.action,{
  method:"POST",
  body:data,
  headers:{
  'Accept':'application/json'
  }
})

.then(response=>{

  if(response.ok){

    successMsg.innerHTML =
    "Transmission successful.";

    form.reset();

  }

  else{

    successMsg.innerHTML =
    "Transmission failed.";

  }

})
.catch(error=>{

  successMsg.innerHTML =
  "Connection error.";

});

});

