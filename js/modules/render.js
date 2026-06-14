import { setLangText, applyLang, currentLang } from './language.js';
import { updateCarousel, updateIndicators, startAutoRotate, currentAngle } from './carousel.js';

export function renderProfile(p) {
  document.querySelectorAll('.logo').forEach(el => el.textContent = p.logo_text);

  setLangText('.hero-subtitle', p.subtitle_es, p.subtitle_en);
  setLangText('.hero-title', p.title_es, p.title_en);
  setLangText('.hero-name', p.name_es, p.name_en);
  setLangText('.hero-description', p.description_es, p.description_en);

  const githubLinks = document.querySelectorAll('.link-github');
  githubLinks.forEach(el => el.href = p.github_url);

  const linkedinLinks = document.querySelectorAll('.link-linkedin');
  linkedinLinks.forEach(el => el.href = p.linkedin_url);

  const emailLinks = document.querySelectorAll('.link-email');
  emailLinks.forEach(el => el.href = `mailto:${p.email}`);

  document.querySelectorAll('.footer-name').forEach(el => el.textContent = p.name_es);
  setLangText('.footer-subtitle', p.footer_subtitle_es, p.footer_subtitle_en);

  const form = document.querySelector('.contact-form');
  if (form) form.action = `https://formsubmit.co/${p.email}`;
}

export function renderHeroImages(images) {
  if (!images.length) return;
  const heroCarousel = document.getElementById('hero-carousel');
  if (!heroCarousel) return;

  const urls = images.map(i => i.url);
  heroCarousel.src = urls[0];
  heroCarousel.alt = images[0].alt_text || '';

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

export function renderSkills(skills) {
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
      window.currentAngle = -index * angleStep;
      updateCarousel();
      updateIndicators();
      // resetAutoRotate(); // Need to import
    });
    indicatorsContainer.appendChild(indicator);
  });

  updateCarousel();
  startAutoRotate();
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

export function renderProjects(projects) {
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
          <img src="${p.image_url || ''}" alt="${p.image_alt || ''}" loading="lazy" decoding="async">
        </div>
      </header>
      <div class="portfolio-content">
        <h3 class="portfolio-title lang-es">${p.title_es}</h3>
        <h3 class="portfolio-title lang-en" style="display:none">${p.title_en}</h3>
      </div>
      <div class="portfolio-full-content">
        <h2 class="portfolio-title lang-es">${p.title_es}</h2>
        <h2 class="portfolio-title lang-en" style="display:none">${p.title_en}</h2>
        <p class="portfolio-description lang-es">${p.description_es || ''}</p>
        <p class="portfolio-description lang-en" style="display:none">${p.description_en || ''}</p>
        ${tags}
        <footer class="portfolio-actions">
          <div class="portfolio-buttons">${buttons}</div>
        </footer>
        <button class="btn-close-project" aria-label="Cerrar"><span class="close-x"><i class="fas fa-times"></i></span><span class="close-text lang-es">Cerrar</span><span class="close-text lang-en" style="display:none">Close</span></button>
      </div>`;

    article.addEventListener('click', (e) => {
      if (e.target.closest('.portfolio-full-content')) return;
      const all = document.querySelectorAll('.portfolio-item');
      all.forEach(item => {
        if (item !== article) {
          item.style.display = 'none';
        }
      });
      article.classList.add('expanded');
      article.querySelectorAll('.portfolio-description').forEach(d => d.classList.add('active'));
      applyLang(currentLang);
    });

    const fullContent = article.querySelector('.portfolio-full-content');
    fullContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    const closeBtn = article.querySelector('.btn-close-project');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const all = document.querySelectorAll('.portfolio-item');
      all.forEach(item => {
        item.style.display = '';
        item.classList.remove('expanded');
        item.querySelectorAll('.portfolio-description').forEach(d => d.classList.remove('active'));
      });
      applyLang(currentLang);
    });

    grid.appendChild(article);
  });

  applyLang(currentLang);
}

export function renderAboutTexts(texts) {
  const container = document.querySelector('.about-content');
  if (!container) return;
  container.innerHTML = texts.map(t => `
    <p class="about-text lang-es">${t.content_es}</p>
    <p class="about-text lang-en" style="display:none">${t.content_en}</p>
  `).join('');
  applyLang(currentLang);
}
