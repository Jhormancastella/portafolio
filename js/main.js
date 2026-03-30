// ===== SUPABASE CLIENT =====
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== ESTADO GLOBAL =====
let currentLang = 'es';
let matrixColor = '#0F0';
let skillsData = [];
let currentAngle = 0;
let autoRotateInterval;

// ===== CARGAR DATOS DESDE SUPABASE =====
async function loadPortfolioData() {
  try {
    const [profile, heroImages, skills, projects, aboutTexts] = await Promise.all([
      db.from('profile').select('*').single(),
      db.from('hero_images').select('*').eq('active', true).order('sort_order'),
      db.from('skills').select('*').eq('active', true).order('sort_order'),
      db.from('projects').select('*').eq('active', true).order('sort_order'),
      db.from('about_texts').select('*').eq('active', true).order('sort_order')
    ]);

    if (profile.data) renderProfile(profile.data);
    if (heroImages.data) renderHeroImages(heroImages.data);
    if (skills.data) renderSkills(skills.data);
    if (projects.data) renderProjects(projects.data);
    if (aboutTexts.data) renderAboutTexts(aboutTexts.data);

  } catch (err) {
    console.error('Error cargando datos:', err);
  }
}

// ===== RENDER PERFIL =====
function renderProfile(p) {
  // Logo
  document.querySelectorAll('.logo').forEach(el => el.textContent = p.logo_text);

  // Hero
  setLangText('.hero-subtitle', p.subtitle_es, p.subtitle_en);
  setLangText('.hero-title', p.title_es, p.title_en);
  setLangText('.hero-name', p.name_es, p.name_en);
  setLangText('.hero-description', p.description_es, p.description_en);

  // Links sociales
  const githubLinks = document.querySelectorAll('.link-github');
  githubLinks.forEach(el => el.href = p.github_url);

  const linkedinLinks = document.querySelectorAll('.link-linkedin');
  linkedinLinks.forEach(el => el.href = p.linkedin_url);

  const emailLinks = document.querySelectorAll('.link-email');
  emailLinks.forEach(el => el.href = `mailto:${p.email}`);

  // Footer
  document.querySelectorAll('.footer-name').forEach(el => el.textContent = p.name_es);
  setLangText('.footer-subtitle', p.footer_subtitle_es, p.footer_subtitle_en);

  // Formulario de contacto
  const form = document.querySelector('.contact-form');
  if (form) form.action = `https://formsubmit.co/${p.email}`;
}

// ===== RENDER HERO IMAGES =====
function renderHeroImages(images) {
  if (!images.length) return;
  const heroCarousel = document.getElementById('hero-carousel');
  if (!heroCarousel) return;

  const urls = images.map(i => i.url);
  heroCarousel.src = urls[0];
  heroCarousel.alt = images[0].alt_text || '';

  // Precargar
  urls.forEach(url => { const img = new Image(); img.src = url; });

  let idx = 0;
  setTimeout(() => {
    setInterval(() => {
      heroCarousel.style.opacity = '0';
      setTimeout(() => {
        idx = (idx + 1) % urls.length;
        heroCarousel.src = urls[idx];
        heroCarousel.alt = images[idx].alt_text || '';
        heroCarousel.style.opacity = '1';
      }, 300);
    }, 5000);
  }, 2000);
}

// ===== RENDER SKILLS =====
function renderSkills(skills) {
  skillsData = skills;
  const carousel = document.getElementById('skills-carousel');
  const indicatorsContainer = document.getElementById('carousel-indicators');
  if (!carousel || !indicatorsContainer) return;

  carousel.innerHTML = '';
  indicatorsContainer.innerHTML = '';

  const angleStep = 360 / skills.length;

  skills.forEach((skill, index) => {
    const el = document.createElement('div');
    el.className = 'skill-item-3d';
    el.innerHTML = `<i class="${skill.icon} skill-icon-3d"></i><span class="skill-name-3d">${skill.name}</span>`;
    carousel.appendChild(el);

    const indicator = document.createElement('div');
    indicator.className = 'indicator' + (index === 0 ? ' active' : '');
    indicator.addEventListener('click', () => {
      currentAngle = -index * angleStep;
      updateCarousel();
      updateIndicators();
      resetAutoRotate();
    });
    indicatorsContainer.appendChild(indicator);
  });

  updateCarousel();
  startAutoRotate();
}

// ===== RENDER PROYECTOS =====
function renderProjects(projects) {
  const grid = document.querySelector('.portfolio-grid');
  if (!grid) return;
  grid.innerHTML = '';

  projects.forEach(p => {
    const article = document.createElement('article');
    article.className = 'portfolio-item';

    const tags = p.tags && p.tags.length
      ? `<div class="portfolio-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
      : '';

    const buttons = buildProjectButtons(p);

    article.innerHTML = `
      <header class="portfolio-header">
        <div class="portfolio-image">
          <img src="${p.image_url || ''}" alt="${p.image_alt || ''}" loading="lazy">
        </div>
      </header>
      <div class="portfolio-content">
        <h3 class="portfolio-title lang-es">${p.title_es}</h3>
        <h3 class="portfolio-title lang-en" style="display:none">${p.title_en}</h3>
        <p class="portfolio-description lang-es">${p.description_es || ''}</p>
        <p class="portfolio-description lang-en" style="display:none">${p.description_en || ''}</p>
        ${tags}
        <footer class="portfolio-actions">
          <div class="portfolio-buttons">${buttons}</div>
        </footer>
      </div>`;

    grid.appendChild(article);
  });

  // Re-aplicar idioma actual
  applyLang(currentLang);

  // Toggle descripciones
  document.querySelectorAll('.portfolio-title').forEach(title => {
    title.addEventListener('click', () => {
      let next = title.nextElementSibling;
      while (next) {
        if (next.classList.contains('portfolio-description')) next.classList.toggle('active');
        next = next.nextElementSibling;
      }
    });
  });
}

function buildProjectButtons(p) {
  let btns = '';
  if (p.btn_clone_url) {
    btns += `<button class="btn-clone" onclick="window.open('${p.btn_clone_url}','_blank')">
      <span class="lang-es">Clonar</span><span class="lang-en" style="display:none">Clone</span>
    </button>`;
  }
  if (p.btn_visit_url) {
    btns += `<button class="btn-visit" onclick="window.open('${p.btn_visit_url}','_blank')">
      <span class="lang-es">Visitar</span><span class="lang-en" style="display:none">Visit</span>
    </button>`;
  }
  if (p.btn_download_url) {
    btns += `<button class="btn-download" onclick="window.open('${p.btn_download_url}','_blank')">
      <span class="lang-es">Descargar PC</span><span class="lang-en" style="display:none">Download PC</span>
    </button>`;
  }
  if (p.btn_source_url) {
    btns += `<button class="btn-visit" onclick="window.open('${p.btn_source_url}','_blank')">
      <span class="lang-es">Código Fuente</span><span class="lang-en" style="display:none">Source Code</span>
    </button>`;
  }
  if (p.btn_play_url) {
    btns += `<button class="btn-visit" onclick="window.open('${p.btn_play_url}','_blank')">
      <span class="lang-es">Jugar en Web</span><span class="lang-en" style="display:none">Play on Web</span>
    </button>`;
  }
  return btns;
}

// ===== RENDER ABOUT =====
function renderAboutTexts(texts) {
  const container = document.querySelector('.about-content');
  if (!container) return;
  container.innerHTML = texts.map(t => `
    <p class="about-text lang-es">${t.content_es}</p>
    <p class="about-text lang-en" style="display:none">${t.content_en}</p>
  `).join('');
  applyLang(currentLang);
}

// ===== HELPER IDIOMA =====
function setLangText(selector, es, en) {
  document.querySelectorAll(selector + '.lang-es').forEach(el => el.textContent = es);
  document.querySelectorAll(selector + '.lang-en').forEach(el => el.textContent = en);
}

function applyLang(lang) {
  document.querySelectorAll('.lang-es').forEach(el => el.style.display = lang === 'es' ? '' : 'none');
  document.querySelectorAll('.lang-en').forEach(el => el.style.display = lang === 'en' ? '' : 'none');
}

// ===== CARRUSEL 3D =====
function updateCarousel() {
  const skillElements = document.querySelectorAll('.skill-item-3d');
  const total = skillElements.length;
  if (!total) return;
  const angleStep = 360 / total;
  const radius = window.innerWidth < 480 ? 150 : 200;

  skillElements.forEach((el, index) => {
    const angle = (currentAngle + index * angleStep) * Math.PI / 180;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = 1 + (z / radius) * 0.5;
    el.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`;
    el.style.opacity = 0.5 + (z / radius) * 0.5;
  });
}

function updateIndicators() {
  const indicators = document.querySelectorAll('.indicator');
  const total = indicators.length;
  if (!total) return;
  const angleStep = 360 / total;
  const activeIndex = Math.round(((-currentAngle % 360 + 360) % 360) / angleStep) % total;
  indicators.forEach((ind, i) => ind.classList.toggle('active', i === activeIndex));
}

function startAutoRotate() {
  const total = document.querySelectorAll('.skill-item-3d').length;
  if (!total) return;
  const angleStep = 360 / total;
  autoRotateInterval = setInterval(() => {
    currentAngle -= angleStep;
    updateCarousel();
    updateIndicators();
  }, 3000);
}

function resetAutoRotate() {
  clearInterval(autoRotateInterval);
  startAutoRotate();
}

// ===== TEMA =====
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains('dark-theme');
  body.classList.toggle('dark-theme', !isDark);
  body.classList.toggle('light-theme', isDark);
  updateThemeVariables(isDark ? 'light' : 'dark');
  matrixColor = isDark ? '#006600' : '#0F0';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function updateThemeVariables(theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.style.setProperty('--bg-primary', 'var(--light-bg-primary)');
    root.style.setProperty('--bg-secondary', 'var(--light-bg-secondary)');
    root.style.setProperty('--text-primary', 'var(--light-text-primary)');
    root.style.setProperty('--text-secondary', 'var(--light-text-secondary)');
    root.style.setProperty('--accent', 'var(--light-accent)');
    root.style.setProperty('--card-bg', 'var(--light-card-bg)');
    root.style.setProperty('--border', 'var(--light-border)');
    root.style.setProperty('--shadow', 'var(--light-shadow)');
    root.style.backgroundColor = '#ffffff';
  } else {
    root.style.setProperty('--bg-primary', '#121212');
    root.style.setProperty('--bg-secondary', '#1e1e1e');
    root.style.setProperty('--text-primary', '#e0e0e0');
    root.style.setProperty('--text-secondary', '#a0a0a0');
    root.style.setProperty('--accent', '#ffd700');
    root.style.setProperty('--card-bg', '#2a2a2a');
    root.style.setProperty('--border', '#3a3a3a');
    root.style.setProperty('--shadow', 'rgba(0,0,0,0.3)');
    root.style.backgroundColor = '#121212';
  }
}

function loadThemePreference() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(`${saved}-theme`);
  updateThemeVariables(saved);
  matrixColor = saved === 'dark' ? '#0F0' : '#006600';
}

// ===== IDIOMA =====
function toggleLanguage(e) {
  e.preventDefault();
  currentLang = currentLang === 'es' ? 'en' : 'es';
  applyLang(currentLang);
  document.querySelectorAll('#language-toggle, #mobile-language-toggle')
    .forEach(el => el.textContent = currentLang === 'es' ? 'ES/EN' : 'EN/ES');
}

// ===== MATRIX =====
function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const isMobile = window.innerWidth < 768;
  const fontSize = isMobile ? 12 : 14;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let drops = Array(Math.floor(canvas.width / fontSize)).fill(1);

  setInterval(() => {
    ctx.fillStyle = document.body.classList.contains('dark-theme')
      ? 'rgba(18,18,18,0.04)' : 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = matrixColor;
    ctx.font = `${fontSize}px monospace`;
    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, isMobile ? 100 : 50);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadThemePreference();
  loadPortfolioData();
  initMatrix();

  // Tema
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // Idioma
  document.getElementById('language-toggle').addEventListener('click', toggleLanguage);
  document.getElementById('mobile-language-toggle').addEventListener('click', toggleLanguage);

  // Menú móvil
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('active'));
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('active'));
  });

  // Carrusel botones
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if (prevBtn && nextBtn) {
    const getStep = () => 360 / (document.querySelectorAll('.skill-item-3d').length || 12);
    prevBtn.addEventListener('click', () => { currentAngle += getStep(); updateCarousel(); updateIndicators(); resetAutoRotate(); });
    nextBtn.addEventListener('click', () => { currentAngle -= getStep(); updateCarousel(); updateIndicators(); resetAutoRotate(); });
  }

  // Scroll to top
  const scrollBtn = document.getElementById('scroll-to-top');
  window.addEventListener('scroll', () => scrollBtn.classList.toggle('visible', window.pageYOffset > 300));
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Año footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Escape cierra menú
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') mobileMenu.classList.remove('active');
  });

  // Formulario contacto
  document.querySelector('.contact-form')?.addEventListener('submit', function() {
    this.querySelectorAll('button[type="submit"]').forEach(btn => {
      btn.querySelector('.submit-text')?.style && (btn.querySelector('.submit-text').style.display = 'none');
      btn.querySelector('.loading-text')?.style && (btn.querySelector('.loading-text').style.display = 'inline');
      btn.disabled = true;
    });
  });

  // Resize carrusel
  window.addEventListener('resize', updateCarousel);
});
