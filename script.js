// ============================================================
// NAV: solid background on scroll + mobile menu toggle
// ============================================================
const siteNav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  siteNav.classList.toggle('is-solid', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu after tapping a link
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// COUNTDOWN
// ============================================================
const WEDDING_DATE = new Date('2027-06-19T16:00:00').getTime();

function updateCountdown() {
  const distance = WEDDING_DATE - Date.now();
  const els = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };

  if (distance < 0) {
    els.days.textContent = els.hours.textContent = els.minutes.textContent = els.seconds.textContent = '00';
    return;
  }

  els.days.textContent = String(Math.floor(distance / 86400000)).padStart(2, '0');
  els.hours.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
  els.minutes.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
  els.seconds.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// FAQ ACCORDION
// ============================================================
document.querySelectorAll('.acc-trigger').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // close any other open panel (one open at a time reads calmer than several)
    document.querySelectorAll('.acc-trigger[aria-expanded="true"]').forEach((openBtn) => {
      if (openBtn !== btn) {
        openBtn.setAttribute('aria-expanded', 'false');
        openBtn.nextElementSibling.style.maxHeight = null;
      }
    });

    btn.setAttribute('aria-expanded', String(!isOpen));
    panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
  });
});

// ============================================================
// GALLERY LIGHTBOX
// ============================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('#galleryGrid img').forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.hidden = false;
  });
});

function closeLightbox() { lightbox.hidden = true; lightboxImg.src = ''; }
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
