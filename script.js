console.log('Script loaded');
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const languageButtons = document.querySelectorAll('.language-switch button');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    });

    // Language switch
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.id);
        });
    });

    // Set initial language based on browser settings
    setLanguage(navigator.language.split('-')[0]);

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Fade-in effect
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    fadeElems.forEach(elem => observer.observe(elem));

    // Active navigation link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    const handleScroll = throttle(() => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }, 100);

    window.addEventListener('scroll', handleScroll);
});

function setLanguage(lang) {
    // Implement this function to change the language
    console.log('Language set to:', lang);
    // You would typically load language-specific content here
    // and update the text content of elements with the 'data-i18n' attribute
}
