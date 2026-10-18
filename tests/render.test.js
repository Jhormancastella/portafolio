import { describe, it, expect, beforeEach } from 'vitest';
import { renderProfile } from '../js/modules/render.js';

describe('renderProfile WhatsApp links', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <a class="link-whatsapp"></a>
      <a class="link-whatsapp"></a>
    `;
  });

  it('sets WhatsApp links using a country-code number', () => {
    renderProfile({ whatsapp_number: '+57 (300) 123-4567' });

    document.querySelectorAll('.link-whatsapp').forEach(link => {
      expect(link.href).toBe('https://wa.me/573001234567');
      expect(link.style.display).toBe('');
    });
  });

  it('hides WhatsApp links when the number is missing or invalid', () => {
    renderProfile({ whatsapp_number: '' });

    document.querySelectorAll('.link-whatsapp').forEach(link => {
      expect(link.style.display).toBe('none');
      expect(link.getAttribute('href')).toBe('');
    });
  });
});
