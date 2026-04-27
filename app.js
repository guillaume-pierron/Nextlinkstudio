/* NextLink Studio — JS */

/* ── MENU MOBILE ── */
function toggleMenu() {
  const navMobile = document.getElementById('navMobile');
  const menuToggle = document.querySelector('.menu-toggle');
  const isOpen = navMobile.classList.toggle('open');
  if (menuToggle) menuToggle.classList.toggle('active');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  if (!isOpen) {
    document.querySelectorAll('.nav-mobile-group.open').forEach(g => g.classList.remove('open'));
  }
}

function toggleExpertise(btn) {
  btn.closest('.nav-mobile-group').classList.toggle('open');
}

document.addEventListener('click', function(e) {
  const nav = document.querySelector('.nav-wrapper');
  const navMobile = document.getElementById('navMobile');
  const menuToggle = document.querySelector('.menu-toggle');
  if (nav && !nav.contains(e.target) && !navMobile.contains(e.target) && navMobile.classList.contains('open')) {
    navMobile.classList.remove('open');
    if (menuToggle) menuToggle.classList.remove('active');
    document.body.style.overflow = '';
    document.querySelectorAll('.nav-mobile-group.open').forEach(g => g.classList.remove('open'));
  }
});


/* ── PARALLAX ── */
(function () {
  const heroBg = document.querySelector('.hero-parallax-bg');
  const painEl = document.querySelector('.pain');
  const painBg = document.querySelector('.pain-parallax-bg');
  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    if (heroBg) {
      heroBg.style.transform = 'translateY(' + (scrollY * 0.5) + 'px)';
    }
    if (painBg && painEl) {
      const offset = (scrollY - painEl.offsetTop) * 0.4;
      painBg.style.transform = 'translateY(' + offset + 'px)';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();

/* ── NAV SHADOW ── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav-wrapper');
  if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(124,58,237,0.08)' : '';
});

/* ── FORMULAIRE CONTACT ── */
function handleSubmit(e) {
  e.preventDefault();
  const btnText = e.target.querySelector('.btn-text');
  const btnLoading = e.target.querySelector('.btn-loading');
  if (btnText) btnText.style.display = 'none';
  if (btnLoading) btnLoading.style.display = 'inline';

  setTimeout(() => {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';
  }, 1400);
}

/* ── FILTRE RÉALISATIONS ── */
function filtrer(btn, cat) {
  document.querySelectorAll('.filtre').forEach(f => f.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.portfolio-card-full').forEach(card => {
    if (cat === 'tous' || card.dataset.cat === cat) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ── FAQ ACCORDION ── */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  document.querySelectorAll('.faq-question.open').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });

  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

/* ── LEAD MAGNET ── */
function handleLeadMagnet(e) {
  e.preventDefault();
  const form = e.target;
  const success = form.parentElement.querySelector('.lead-magnet-success');
  form.style.display = 'none';
  if (success) success.style.display = 'block';
}

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.service-card, .portfolio-card, .portfolio-card-full, .pricing-card, .pricing-card-page, .step, .pain-card, .preview-card, .ef-item, .deliverable-item, .option-item, .faq-item, .resultat-item, .logo-item, .bm-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

/* ── TESTIMONIALS AUTO-SCROLL + DRAG / SWIPE ── */
(function () {
  const carousel = document.querySelector('.testimonials-carousel');
  const track    = document.querySelector('.testimonials-track');
  if (!carousel || !track) return;

  const SPEED = 0.6; // px par frame (~36 px/s à 60 fps)
  let halfWidth        = 0;
  let position         = 0;
  let paused           = false;
  let isDragging       = false;
  let lastX            = 0;
  let velocity         = 0;
  let touchStartX      = 0;
  let touchStartY      = 0;
  let touchDirectionLocked = null; // 'h' | 'v' | null

  function wrap(pos) {
    if (halfWidth === 0) return 0;
    let p = pos % (-halfWidth);
    if (p > 0) p -= halfWidth;
    return p;
  }

  function tick() {
    if (!isDragging && !paused) {
      position = wrap(position - SPEED);
      track.style.transform = 'translateX(' + position + 'px)';
    }
    requestAnimationFrame(tick);
  }

  function startDrag(x) {
    isDragging = true;
    lastX      = x;
    velocity   = 0;
    carousel.classList.add('dragging');
  }

  function moveDrag(x) {
    const delta = x - lastX;
    velocity    = delta;
    lastX       = x;
    position    = wrap(position + delta);
    track.style.transform = 'translateX(' + position + 'px)';
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    carousel.classList.remove('dragging');
    position = wrap(position + velocity * 4);
  }

  // Hover pause (desktop)
  carousel.addEventListener('mouseenter', () => { paused = true;  });
  carousel.addEventListener('mouseleave', () => { paused = false; });

  // Souris
  carousel.addEventListener('mousedown', e => { startDrag(e.clientX); e.preventDefault(); });
  window.addEventListener('mousemove',   e => { if (isDragging) moveDrag(e.clientX); });
  window.addEventListener('mouseup',     endDrag);

  // Tactile
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchDirectionLocked = null;
    paused = true;
    startDrag(e.touches[0].clientX);
  }, { passive: true });
  carousel.addEventListener('touchmove', e => {
    if (!isDragging) return;
    if (touchDirectionLocked === null) {
      const dx = Math.abs(e.touches[0].clientX - touchStartX);
      const dy = Math.abs(e.touches[0].clientY - touchStartY);
      if (dx > 6 || dy > 6) touchDirectionLocked = dx > dy ? 'h' : 'v';
    }
    if (touchDirectionLocked === 'h') {
      moveDrag(e.touches[0].clientX);
      e.preventDefault();
    }
  }, { passive: false });
  window.addEventListener('touchend', () => { endDrag(); paused = false; touchDirectionLocked = null; });

  function init() {
    halfWidth = track.scrollWidth / 2;
    if (halfWidth > 0) tick();
  }
  if (document.readyState === 'complete') { init(); }
  else { window.addEventListener('load', init); }
})();

/* ── RÉALISATIONS PREVIEW — cascade reveal ── */
(function () {
  const grid = document.querySelector('.realisations-preview .portfolio-grid--triple');
  if (!grid) return;
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        gridObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  gridObserver.observe(grid);
})();

/* ── SPOTLIGHT VISUAL REVEAL + FLOAT ── */
(function () {
  const spotlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        spotlightObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.spotlight-visual').forEach(el => {
    spotlightObserver.observe(el);
  });
})();

/* ── EXPERTISE NAV ACTIVE ON SCROLL ── */
const expertiseSections = document.querySelectorAll('.expertise-section');
if (expertiseSections.length) {
  const navLinks = document.querySelectorAll('.expertise-nav a');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          const isActive = a.href.includes(id);
          a.style.color = isActive ? 'var(--purple-vivid)' : '';
          a.style.borderColor = isActive ? 'var(--purple)' : '';
          a.style.backgroundColor = isActive ? 'var(--purple-soft)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  expertiseSections.forEach(s => sectionObserver.observe(s));
}
