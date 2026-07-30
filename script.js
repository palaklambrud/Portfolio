/* ==========================================================================
   PALAK LAMBRUD , PORTFOLIO SCRIPT
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

  /* ---------- Gallery: card carousel + swipeable lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');

  // Build the list of viewable images from every card that has a data-full attribute
  // (the "coming soon" placeholder card has none, so it's skipped automatically ,
  // just add more <button class="gallery-card" data-full="..."> cards later and they'll be included).
  const galleryCardEls = Array.from(document.querySelectorAll('.gallery-card[data-full]'));
  const galleryImages = galleryCardEls.map(card => card.getAttribute('data-full'));

  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = (index + galleryImages.length) % galleryImages.length; // wrap around
    lightboxImg.src = galleryImages[currentIndex];
    lightboxImg.alt = `Creative work item ${currentIndex + 1}`;
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
  };

  const openLightbox = (startIndex) => {
    showImage(startIndex);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryCardEls.forEach((card, index) => {
    card.addEventListener('click', () => openLightbox(index));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
  lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));

  // Close when clicking the dark overlay (outside the image/controls)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard controls: Escape closes, arrow keys navigate
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });

  // Touch swipe support inside the lightbox (left/right to navigate)
  let touchStartX = 0;
  const swipeThreshold = 40; // minimum px distance to count as a swipe

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) < swipeThreshold) return;
    if (deltaX < 0) {
      showImage(currentIndex + 1); // swiped left → next
    } else {
      showImage(currentIndex - 1); // swiped right → previous
    }
  }, { passive: true });

});
