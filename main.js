// Assuming this code is in your main.js
const sections = document.querySelectorAll('section');
const navButtons = document.querySelectorAll('.button');
const uiNav = document.querySelector('.ui');

// Map each section ID to its corresponding button
const sectionIdToButtonMap = {};
navButtons.forEach(btn => {
    const targetId = btn.getAttribute('data-target');
    sectionIdToButtonMap[targetId] = btn;
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Adjust as needed
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Clear active states
            navButtons.forEach(btn => btn.classList.remove('active'));

            const currentSectionId = entry.target.id;
            const correspondingButton = sectionIdToButtonMap[currentSectionId];
            if (correspondingButton) {
                correspondingButton.classList.add('active');
            }

            // If the current section is the intro (e.g., "section-intro")
            if (currentSectionId === 'section-intro') {
                uiNav.classList.add('uiactive');
            } else {
                uiNav.classList.remove('uiactive');
            }
        }
    });
}, observerOptions);

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});

// Smooth scrolling on nav click
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
