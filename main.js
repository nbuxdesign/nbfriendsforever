// main.js

// Observe sections to highlight nav
const sections = document.querySelectorAll('section');
const navButtons = document.querySelectorAll('.button');

// Create a mapping from section IDs to nav buttons
const sectionIdToButtonMap = {};
navButtons.forEach(btn => {
    const targetId = btn.getAttribute('data-target');
    sectionIdToButtonMap[targetId] = btn;
});

// Use Intersection Observer to detect which section is in view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Adjust threshold as needed
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Clear active states
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to the current section's button
            const currentSectionId = entry.target.id;
            const correspondingButton = sectionIdToButtonMap[currentSectionId];
            if (correspondingButton) {
                correspondingButton.classList.add('active');
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
