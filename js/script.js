// ===== Kitchen Cater — interactions =====
// This script is shared across pages (index.html, kontakt.html). Not every
// page has every element, so each feature block below guards on the
// elements it needs before wiring anything up.

const CONTACT_EMAIL = 'kitchencatersas@gmail.com';

document.addEventListener('DOMContentLoaded', () => {

  // ---- Loader ----
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 300);
    });
    // fallback in case 'load' already fired
    setTimeout(() => loader.classList.add('hidden'), 1800);
  }

  // ---- Year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Back to top ----
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- Header ----
  const header = document.getElementById('header');

  // ---- Mobile nav ----
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-overlay');

  if (burger && mobileNav && overlay) {
    function closeMobileNav() {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    function toggleMobileNav() {
      const isOpen = mobileNav.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      overlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    burger.addEventListener('click', toggleMobileNav);
    overlay.addEventListener('click', closeMobileNav);
    document.querySelectorAll('#mobile-nav .nav-link').forEach(a => a.addEventListener('click', closeMobileNav));
  }

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function updateActiveNav() {
    if (!sections.length) return;
    let current = sections[0].id;
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      // Only same-page anchor links (#section) get dynamic highlighting;
      // cross-page links (index.html#..., kontakt.html) keep whatever
      // active state is set in the HTML.
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        link.classList.toggle('active', href === `#${current}`);
      }
    });
  }

  // ---- Header scroll state ----
  if (header) {
    const alwaysScrolled = header.dataset.alwaysScrolled === 'true';
    function onScroll() {
      if (alwaysScrolled || window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');

      if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
      updateActiveNav();
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // ---- Reveal on scroll ----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  // ---- Menu filters ---- (data-filter excludes the Frokost link, which navigates instead)
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const menuCards = document.querySelectorAll('.menu-card');
  if (filterBtns.length && menuCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        menuCards.forEach(card => {
          const cats = card.dataset.cat.split(' ');
          const show = filter === 'all' || cats.includes(filter);
          card.classList.toggle('hide', !show);
        });
      });
    });
  }

  // ---- Gallery lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  let closeLightbox = () => {};

  if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.full;
        lightboxImg.alt = item.querySelector('img').alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  }

  // ---- PDF menu modal ----
  const pdfModal = document.getElementById('pdf-modal');
  const pdfFrame = document.getElementById('pdf-frame');
  const pdfDownload = document.getElementById('pdf-download');
  const pdfModalClose = document.getElementById('pdf-modal-close');
  let closePdfModal = () => {};

  if (pdfModal && pdfFrame && pdfDownload && pdfModalClose) {
    document.querySelectorAll('.open-pdf-menu').forEach(btn => {
      btn.addEventListener('click', () => {
        const pdfPath = btn.dataset.pdf;
        pdfFrame.src = pdfPath;
        pdfDownload.href = pdfPath;
        pdfModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    closePdfModal = () => {
      pdfModal.classList.remove('open');
      pdfFrame.src = '';
      document.body.style.overflow = '';
    };
    pdfModalClose.addEventListener('click', closePdfModal);
    pdfModal.addEventListener('click', (e) => { if (e.target === pdfModal) closePdfModal(); });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeLightbox(); closePdfModal(); }
  });

  // ---- Contact form → e-post ----
  const contactForm = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const navn = contactForm.elements.navn.value.trim();
      const mobil = contactForm.elements.mobil.value.trim();
      const antall = contactForm.elements.antall.value.trim();
      const dato = contactForm.elements.dato.value.trim();
      const melding = contactForm.elements.melding.value.trim();
      const typer = Array.from(contactForm.querySelectorAll('input[name="type"]:checked'))
        .map(cb => cb.value)
        .join(', ') || 'Ikke spesifisert';

      const subject = `Ny forespørsel fra nettsiden – ${navn}`;
      const bodyLines = [
        `Navn: ${navn}`,
        `Mobil: ${mobil}`,
        `Antall personer: ${antall || 'Ikke oppgitt'}`,
        `Dato: ${dato || 'Ikke oppgitt'}`,
        `Gjelder: ${typer}`,
        '',
        'Melding:',
        melding || '(ingen melding)'
      ];
      const body = bodyLines.join('\n');

      const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (formNote) {
        formNote.textContent = 'Åpner e-postklienten din med forespørselen utfylt — trykk send der for å fullføre.';
      }
      window.location.href = mailtoUrl;
    });
  }

});
