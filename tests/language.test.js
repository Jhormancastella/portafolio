import { describe, it, expect, beforeEach } from 'vitest';
import { currentLang, setLangText, applyLang } from '../js/modules/language.js';

describe('language module', () => {
  beforeEach(() => {
    // Reset DOM and state before each test
    document.body.innerHTML = `
      <span class="test-selector lang-es">Hola</span>
      <span class="test-selector lang-en">Hello</span>
    `;
    // Reset currentLang
    global.currentLang = 'es';
  });

  it('should have initial lang as es', () => {
    expect(currentLang).toBe('es');
  });

  it('should apply lang correctly', () => {
    applyLang('en');
    const esEl = document.querySelector('.test-selector.lang-es');
    const enEl = document.querySelector('.test-selector.lang-en');
    
    expect(esEl.style.display).toBe('none');
    expect(enEl.style.display).toBe('');
  });
});
