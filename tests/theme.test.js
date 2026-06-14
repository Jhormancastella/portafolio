import { describe, it, expect, beforeEach } from 'vitest';
import { matrixColor, updateThemeVariables } from '../js/modules/theme.js';

describe('theme module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should have default matrixColor', () => {
    expect(matrixColor).toBe('#0F0');
  });

  it('should update theme variables for light theme', () => {
    updateThemeVariables('light');
    const root = document.documentElement;
    expect(root.style.backgroundColor).toBe('rgb(255, 255, 255)');
  });
});
