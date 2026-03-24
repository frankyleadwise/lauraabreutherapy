/* ============================================================
   LAURA ABREU THERAPY — Shared JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- SCROLL REVEAL ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- NAV SCROLL SHRINK ---- */
  const navIsland = document.querySelector('.nav-island');
  if (navIsland) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navIsland.style.boxShadow = '0 8px 40px rgba(42,32,24,0.14), inset 0 1px 0 rgba(255,255,255,0.6)';
      } else {
        navIsland.style.boxShadow = '0 4px 32px rgba(42,32,24,0.10), inset 0 1px 0 rgba(255,255,255,0.6)';
      }
    }, { passive: true });
  }

  /* ---- MOBILE HAMBURGER ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay   = document.querySelector('.mobile-overlay');
  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- ACTIVE NAV LINK ---- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-overlay a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) link.style.color = 'var(--terra)';
  });

  /* ---- SMOOTH COUNT-UP (if stat elements present) ---- */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.round(current) + (el.dataset.suffix || '');
        }, step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* ---- ACCORDION (FAQ pages) ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer   = item.querySelector('.faq-a');
    const icon     = item.querySelector('.faq-icon');
    if (!question || !answer) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : '0';
      if (icon) icon.style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)';
    });
  });

});
