// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap.from('.hero-image', {
    duration: 1.2,
    y: 100,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero h1, .hero h2', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
});

// Typing animation for tagline with data science phrases
const taglines = [
    "Transforming data into actionable insights",
    "Machine Learning | Data Analytics | AI",
    "Turning complex data into clear solutions"
];

class TypingAnimation {
    constructor(element, texts, typingSpeed = 50) {
        this.element = element;
        this.texts = texts;
        this.typingSpeed = typingSpeed;
        this.currentTextIndex = 0;
        this.charIndex = 0;
        this.isTyping = true;
        this.currentTimeout = null;
        this.currentText = this.texts[0];
        this.element.textContent = '';
        this.element.style.opacity = '1';
    }

    type() {
        if (!this.isTyping) return;

        if (this.charIndex < this.currentText.length) {
            this.element.textContent = this.currentText.slice(0, this.charIndex + 1) + '|';
            this.charIndex++;
            this.currentTimeout = requestAnimationFrame(() => {
                setTimeout(() => this.type(), this.typingSpeed);
            });
        } else {
            this.currentTimeout = setTimeout(() => this.erase(), 2000);
        }
    }

    erase() {
        if (!this.isTyping) return;

        if (this.charIndex > 0) {
            this.element.textContent = this.currentText.slice(0, this.charIndex) + '|';
            this.charIndex--;
            this.currentTimeout = requestAnimationFrame(() => {
                setTimeout(() => this.erase(), this.typingSpeed / 2);
            });
        } else {
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            this.currentText = this.texts[this.currentTextIndex];
            this.currentTimeout = setTimeout(() => this.type(), 500);
        }
    }

    start() {
        this.isTyping = true;
        this.type();
    }

    stop() {
        this.isTyping = false;
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
            cancelAnimationFrame(this.currentTimeout);
        }
    }

    resume() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.type();
        }
    }
}

const tagline = document.querySelector('.tagline');
const typingAnimation = new TypingAnimation(tagline, taglines);

// Start typing animation after initial animations
setTimeout(() => typingAnimation.start(), 1500);

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        typingAnimation.stop();
    } else {
        typingAnimation.resume();
    }
});

// Optional: Handle scroll visibility
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typingAnimation.resume();
            } else {
                typingAnimation.stop();
            }
        });
    },
    { threshold: 0.5 }
);

observer.observe(tagline);

gsap.from('.cta-buttons a', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 0.8
}).then(() => {
    gsap.set('.cta-buttons a', { clearProps: 'all' });
});

// Scroll animations for sections
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.children, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navHeight = document.querySelector('.glass-nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetPosition,
                    autoKill: false
                },
                ease: 'power3.inOut'
            });
        }
    });
});


// Add active class to navigation links based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const navHeight = document.querySelector('.glass-nav').offsetHeight;
    
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });
    
    let current = '';
    const scrollPosition = window.scrollY + navHeight + 100; // Add offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll with throttling for better performance
let isScrolling;
window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(updateActiveNavLink, 50);
});

// Initial call to set active link on page load
updateActiveNavLink();
// Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');

function toggleMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking nav links on mobile
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});