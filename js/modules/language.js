export let currentLang = 'es';

export function setLangText(selector, es, en) {
  document.querySelectorAll(`${selector}.lang-es`).forEach(el => el.textContent = es);
  document.querySelectorAll(`${selector}.lang-en`).forEach(el => el.textContent = en);
}

export function applyLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-es').forEach(el => el.style.display = lang === 'es' ? '' : 'none');
  document.querySelectorAll('.lang-en').forEach(el => el.style.display = lang === 'en' ? '' : 'none');
  document.querySelectorAll('#language-toggle, #mobile-language-toggle')
    .forEach(el => el.textContent = lang === 'es' ? 'ES/EN' : 'EN/ES');
}

export function toggleLanguage(e) {
  e.preventDefault();
  applyLang(currentLang === 'es' ? 'en' : 'es');
}

export function initLanguage() {
  const langToggle = document.getElementById('language-toggle');
  const mobileLangToggle = document.getElementById('mobile-language-toggle');
  
  if (langToggle) langToggle.addEventListener('click', toggleLanguage);
  if (mobileLangToggle) mobileLangToggle.addEventListener('click', toggleLanguage);
}
