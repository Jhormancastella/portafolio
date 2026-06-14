export let matrixColor = '#0F0';

export function updateThemeVariables(theme) {
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

export function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains('dark-theme');
  body.classList.toggle('dark-theme', !isDark);
  body.classList.toggle('light-theme', isDark);
  updateThemeVariables(isDark ? 'light' : 'dark');
  matrixColor = isDark ? '#006600' : '#0F0';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

export function loadThemePreference() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(`${saved}-theme`);
  updateThemeVariables(saved);
  matrixColor = saved === 'dark' ? '#0F0' : '#006600';
}

export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}
