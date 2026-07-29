/* ==========================================================================
   PALAK LAMBRUD — PORTFOLIO SCRIPT
   Handles: mobile nav toggle, scroll-reveal animations,
            active nav-link highlighting, dynamic footer year
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile Menu Toggle ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  // Close mobile menu whenever a nav link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Scroll Reveal (fade/slide-in on scroll) ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.15
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Growth Bar Fill Animation (signature element) ---------- */
  const growthBars = document.querySelectorAll('.growth-bar');

  const growthObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        growthObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.4
  });

  growthBars.forEach(bar => growthObserver.observe(bar));

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle(
            'active-link',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(section => navObserver.observe(section));

  /* ---------- Navbar Background on Scroll ---------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  /* ---------- Dynamic Footer Year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Poster Gallery Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const posterItems = document.querySelectorAll('.poster-item');

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  posterItems.forEach(item => {
    item.addEventListener('click', () => {
      const fullSrc = item.getAttribute('data-full');
      const altText = item.querySelector('img').getAttribute('alt');
      openLightbox(fullSrc, altText);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  // Close when clicking the dark overlay (outside the image)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

});
