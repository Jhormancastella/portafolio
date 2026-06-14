let matrixInterval;

export function initMatrix(matrixColorFn) {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const isMobile = window.innerWidth < 768;
  const fontSize = isMobile ? 12 : 14;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let drops = Array(Math.floor(canvas.width / fontSize)).fill(1);

  function startMatrix() {
    if (matrixInterval) return;
    matrixInterval = setInterval(() => {
      ctx.fillStyle = document.body.classList.contains('dark-theme')
        ? 'rgba(18,18,18,0.04)' : 'rgba(255,255,255,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = typeof matrixColorFn === 'function' ? matrixColorFn() : (matrixColorFn || '#0F0');
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, isMobile ? 100 : 50);
  }

  function stopMatrix() {
    clearInterval(matrixInterval);
    matrixInterval = null;
  }

  startMatrix();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopMatrix();
    else startMatrix();
  });
}
