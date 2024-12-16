// main.js
// Ensure DOM is loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navButtons = document.querySelectorAll('.button');
    const uiNav = document.querySelector('.ui');

    // Map each section ID to its corresponding button
    const sectionIdToButtonMap = {};
    navButtons.forEach(btn => {
        const targetId = btn.getAttribute('data-target');
        sectionIdToButtonMap[targetId] = btn;
    });

    // Check for IntersectionObserver support
    let observer;
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            // Lowering threshold so sections activate as soon as they're reasonably in view
            threshold: 0.1
        };

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Clear active states on all nav buttons
                    navButtons.forEach(btn => btn.classList.remove('active'));

                    const currentSectionId = entry.target.id;
                    const correspondingButton = sectionIdToButtonMap[currentSectionId];
                    if (correspondingButton) {
                        correspondingButton.classList.add('active');
                    }

                    // Add/remove UI background for nav depending on section
                    if (currentSectionId === 'section-intro') {
                        uiNav.classList.add('uiactive');
                    } else {
                        uiNav.classList.remove('uiactive');
                    }
                }
            });
        }, observerOptions);

        // Observe each section if IntersectionObserver is supported
        sections.forEach(section => {
            observer.observe(section);
        });
    } else {
        // Fallback if IntersectionObserver not available:
        // You might choose a "scroll" event listener to highlight the current section,
        // or simply always show the nav background.
        uiNav.classList.add('uiactive');
    }

    // Smooth scrolling on nav click
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                // Attempt using scrollIntoView with explicit options
                if (typeof targetEl.scrollIntoView === 'function') {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    // Fallback if scrollIntoView isn't available or doesn't behave as expected
                    // This will just jump to the element smoothly if 'scroll-behavior' is supported
                    // If not, consider a polyfill for smooth scrolling.
                    window.scrollTo({
                        top: targetEl.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Optional: If you need a manual approach to highlight nav without IntersectionObserver:
    // - Use a scroll event listener.
    // - On scroll, find the section currently at the top (or near top) of the viewport.
    // - Add 'active' class to its corresponding button.
    // 
    // This is a fallback or an alternative approach if IntersectionObserver is unreliable.
    // Example (commented out):
    /*
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        let currentSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop - (sectionHeight * 0.1) && scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        if (currentSection) {
            navButtons.forEach(btn => btn.classList.remove('active'));
            const correspondingButton = sectionIdToButtonMap[currentSection];
            if (correspondingButton) {
                correspondingButton.classList.add('active');
            }

            if (currentSection === 'section-intro') {
                uiNav.classList.add('uiactive');
            } else {
                uiNav.classList.remove('uiactive');
            }
        }
    });
    */
});
