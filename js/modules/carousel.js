export let currentAngle = 0;
let autoRotateInterval;

export function updateCarousel() {
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

export function updateIndicators() {
  const indicators = document.querySelectorAll('.indicator');
  const total = indicators.length;
  if (!total) return;
  const angleStep = 360 / total;
  const activeIndex = Math.round(((-currentAngle % 360 + 360) % 360) / angleStep) % total;
  indicators.forEach((ind, i) => ind.classList.toggle('active', i === activeIndex));
}

export function startAutoRotate() {
  const total = document.querySelectorAll('.skill-item-3d').length;
  if (!total) return;
  const angleStep = 360 / total;
  autoRotateInterval = setInterval(() => {
    currentAngle -= angleStep;
    updateCarousel();
    updateIndicators();
  }, 3000);
}

export function resetAutoRotate() {
  clearInterval(autoRotateInterval);
  startAutoRotate();
}

export function initCarousel() {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  if (prevBtn && nextBtn) {
    const getStep = () => 360 / (document.querySelectorAll('.skill-item-3d').length || 12);
    prevBtn.addEventListener('click', () => { 
      currentAngle += getStep(); 
      updateCarousel(); 
      updateIndicators(); 
      resetAutoRotate(); 
    });
    nextBtn.addEventListener('click', () => { 
      currentAngle -= getStep(); 
      updateCarousel(); 
      updateIndicators(); 
      resetAutoRotate(); 
    });
  }
  
  window.addEventListener('resize', updateCarousel);
}
