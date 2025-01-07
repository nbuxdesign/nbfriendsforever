// main.js
// Ensure DOM is loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navButtons = document.querySelectorAll('.button');
  const uiNav = document.querySelector('.ui');

  // Map each section ID to its corresponding button
  const sectionIdToButtonMap = {};
  navButtons.forEach((btn) => {
    const targetId = btn.getAttribute('data-target');
    sectionIdToButtonMap[targetId] = btn;
  });

  // Check for IntersectionObserver support
  let observer;
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      // Lower threshold so sections activate as soon as they're reasonably in view
      threshold: 0.2,
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove 'active' from all buttons
          navButtons.forEach((btn) => btn.classList.remove('active'));

          // Highlight the button corresponding to the intersecting section
          const currentSectionId = entry.target.id;
          const correspondingButton = sectionIdToButtonMap[currentSectionId];
          if (correspondingButton) {
            correspondingButton.classList.add('active');
          }

          // Toggle nav styles based on whether we're in section-intro or not
          if (currentSectionId === 'section-intro') {
            uiNav.classList.add('uiactive');
            uiNav.classList.remove('buttonactive');
          } else {
            uiNav.classList.remove('uiactive');
            uiNav.classList.add('buttonactive');
          }
        }
      });
    }, observerOptions);

    // Observe each section if IntersectionObserver is supported
    sections.forEach((section) => {
      observer.observe(section);
    });
  } else {
    // Fallback if IntersectionObserver not available
    uiNav.classList.add('uiactive');
  }

  // Smooth scrolling on nav button click
  navButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        // Use scrollIntoView with smooth behavior (if supported)
        if (typeof targetEl.scrollIntoView === 'function') {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Basic fallback
          window.scrollTo({
            top: targetEl.offsetTop,
            behavior: 'smooth',
          });
        }
      }

      // ================================
      // CLOSE NAV AFTER CLICK (MOBILE)
      // ================================
      navLinks.classList.remove('show');
      hamburger.classList.remove('open');
    });
  });

  // ================================
  // HAMBURGER TOGGLE FOR MOBILE NAV
  // ================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('open');
  });
});
