import { db } from './modules/supabase-client.js';
import { loadThemePreference, initTheme, matrixColor } from './modules/theme.js';
import { applyLang, initLanguage, currentLang } from './modules/language.js';
import { initMatrix } from './modules/matrix.js';
import { initCarousel } from './modules/carousel.js';
import { renderProfile, renderHeroImages, renderSkills, renderProjects, renderAboutTexts } from './modules/render.js';
import { initUI } from './modules/ui.js';
import { initScrollAnimations } from './modules/scroll-animations.js';

async function loadPortfolioData() {
  const grid = document.querySelector('.portfolio-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-content"><div class="skeleton-text"></div><div class="skeleton-text skeleton-text-short"></div></div></div>
      <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-content"><div class="skeleton-text"></div><div class="skeleton-text skeleton-text-short"></div></div></div>
      <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-content"><div class="skeleton-text"></div><div class="skeleton-text skeleton-text-short"></div></div></div>
      <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-content"><div class="skeleton-text"></div><div class="skeleton-text skeleton-text-short"></div></div></div>
    `;
  }

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

document.addEventListener('DOMContentLoaded', () => {
  loadThemePreference();
  loadPortfolioData();
  initMatrix(() => matrixColor);
  initTheme();
  initLanguage();
  initCarousel();
  initUI();
  initScrollAnimations();
  applyLang(currentLang);
});
