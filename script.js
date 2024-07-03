console.log('Script loaded');

// Voeg deze objecten toe aan het begin van je script
const translations = {
    en: {
        "nav.home": "Home",
        "nav.services": "Services",
        "nav.about": "About",
        "nav.contact": "Contact",
        "home.title": "Joost Kamstra",
        "home.subtitle": "Product Discovery Coach",
        "home.intro": "As an experienced Product Discovery Coach, I empower organizations to create products that truly matter. With over a decade of experience in leading product companies, I help teams transform their product discovery process, resulting in increased value creation and reduced waste.",
        // Voeg hier meer Engelse vertalingen toe
    },
    nl: {
        "nav.home": "Home",
        "nav.services": "Diensten",
        "nav.about": "Over mij",
        "nav.contact": "Contact",
        "home.title": "Joost Kamstra",
        "home.subtitle": "Product Discovery Coach",
        "home.intro": "Als ervaren Product Discovery Coach help ik organisaties bij het creëren van producten die er echt toe doen. Met meer dan tien jaar ervaring in leidende productbedrijven, help ik teams hun product discovery proces te transformeren, wat resulteert in verhoogde waardecreatie en minder verspilling.",
        // Voeg hier meer Nederlandse vertalingen toe
    }
};

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
    console.log('Language set to:', lang);
    
    // Controleer of de taal bestaat in onze vertalingen
    if (!translations[lang]) {
        console.error(`Vertalingen voor taal "${lang}" zijn niet beschikbaar.`);
        return;
    }

    // Update de taal voor alle elementen met een data-i18n attribuut
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        } else {
            console.warn(`Vertaling ontbreekt voor sleutel "${key}" in taal "${lang}"`);
        }
    });

    // Update de active state van de taalknopppen
    document.querySelectorAll('.language-switch button').forEach(button => {
        button.classList.toggle('active', button.id === lang);
    });

    // Optioneel: sla de taalvoorkeur op in localStorage
    localStorage.setItem('preferredLanguage', lang);
}
