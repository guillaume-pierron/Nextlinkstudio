/* NextLink Studio — JS */

/* ── MENU MOBILE ── */
function toggleMenu() {
  const navMobile = document.getElementById('navMobile');
  const menuToggle = document.querySelector('.menu-toggle');
  const isOpen = navMobile.classList.toggle('open');
  if (menuToggle) menuToggle.classList.toggle('active');
  
  // Empêche le défilement de la page en arrière-plan quand le menu est ouvert
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

document.addEventListener('click', function(e) {
  const nav = document.querySelector('.nav-wrapper');
  const navMobile = document.getElementById('navMobile');
  const menuToggle = document.querySelector('.menu-toggle');
  if (nav && !nav.contains(e.target) && navMobile.classList.contains('open')) {
    navMobile.classList.remove('open');
    if (menuToggle) menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ── NAV SHADOW ── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav-wrapper');
  if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 4px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(175,102,232,0.12)' : 'none';
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
  '.service-card, .portfolio-card, .portfolio-card-full, .testimonial, .pricing-card, .pricing-card-page, .step, .pain-card, .preview-card, .ef-item, .deliverable-item, .option-item, .faq-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

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
