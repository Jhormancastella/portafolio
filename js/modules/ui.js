function updateMobileMenuAria(isActive) {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.setAttribute('aria-expanded', isActive);
    mobileMenu.setAttribute('aria-hidden', !isActive);
  }
}

export function initUI() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('active');
      updateMobileMenuAria(isActive);
    });
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        updateMobileMenuAria(false);
      });
    });
  }

  const scrollBtn = document.getElementById('scroll-to-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => scrollBtn.classList.toggle('visible', window.pageYOffset > 300));
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu) {
      mobileMenu.classList.remove('active');
    }
  });

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      this.querySelectorAll('button[type="submit"]').forEach(btn => {
        const submitText = btn.querySelector('.submit-text');
        const loadingText = btn.querySelector('.loading-text');
        if (submitText) submitText.style.display = 'none';
        if (loadingText) loadingText.style.display = 'inline';
        btn.disabled = true;
      });
    });
  }
}
