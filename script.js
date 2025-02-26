document.addEventListener('DOMContentLoaded', () => {
    const taglines = [
        'Turning data into insights to drive business success',
        'Transforming complex data into actionable strategies',
        'Tackling business challenges with data-driven solutions',
        'Translating numbers into compelling narratives'
    ];

    const taglineElement = document.querySelector('.tagline-wrapper');
    let currentTaglineIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseDuration = 2000;

    function typeEffect() {
        const currentTagline = taglines[currentTaglineIndex];

        if (isDeleting) {
            currentText = currentTagline.substring(0, currentText.length - 1);
            typingSpeed = deletingSpeed;
        } else {
            currentText = currentTagline.substring(0, currentText.length + 1);
            typingSpeed = 100;
        }

        taglineElement.innerHTML = `<p class="tagline">${currentText}<span class="cursor">|</span></p>`;

        if (!isDeleting && currentText === currentTagline) {
            isDeleting = true;
            typingSpeed = pauseDuration;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // Handle mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});