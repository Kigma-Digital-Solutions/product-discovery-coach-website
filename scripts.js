document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const languageButtons = document.querySelectorAll('.language-switch button');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');

    // Load translations
    let translations = {};

    function loadTranslations(lang) {
        fetch(`locales/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                translations = data;
                setLanguage(lang);
            })
            .catch(error => console.error('Error loading translation:', error));
    }

    // Theme toggle
    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log(`Theme switched to: ${newTheme}`);
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Set initial theme based on localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    console.log(`Initial theme set to: ${savedTheme}`);

    // Language switch
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            loadTranslations(button.id);
        });
    });

    // Set initial language based on browser settings or localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    loadTranslations(savedLang || navigator.language.split('-')[0]);

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

    function setLanguage(lang) {
        console.log('Language set to:', lang);
        
        // Check if the language exists in our translations
        if (!translations) {
            console.error(`Translations for language "${lang}" are not available.`);
            return;
        }

        // Update the language for all elements with a data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const translationKey = elem.getAttribute('data-i18n');
            if (translations[translationKey]) {
                elem.textContent = translations[translationKey];
            }
        });

        // Save the chosen language in localStorage
        localStorage.setItem('preferredLanguage', lang);
    }
});
