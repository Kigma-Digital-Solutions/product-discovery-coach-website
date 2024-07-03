document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            "nav.home": "Home",
            "nav.services": "Services",
            "nav.about": "About",
            "nav.contact": "Contact",
            "home.title": "Joost Kamstra",
            "home.subtitle": "Product Discovery Coach",
            "home.intro": "As an experienced Product Discovery Coach, I empower organizations to create products that truly matter. With over a decade of experience in leading product companies, I help teams transform their product discovery process, resulting in increased value creation and reduced waste.",
            "services.title": "Services",
            "services.intro": "I offer a range of services to help your team excel in product discovery:",
            "services.workshop.title": "Team Workshops",
            "services.workshop.description": "Immersive sessions that equip your team with practical discovery techniques, leading to immediate improvements in idea generation and validation.",
            "services.design.title": "Discovery Process Design",
            "services.design.description": "Tailored discovery frameworks that fit your organization's unique context and goals, ensuring a sustainable and effective approach to product discovery.",
            "services.coaching.title": "Hands-on Coaching",
            "services.coaching.description": "Direct guidance during live discovery activities, providing real-time feedback and optimization to enhance your team's skills and outcomes.",
            "about.title": "About Me",
            "about.description": "With extensive experience at companies like KPN, DPG Media, Ahold-Delhaize, and Sissy-Boy, I bring a wealth of knowledge in product management and coaching to help your team excel in product discovery.",
            "about.approach": "My approach is rooted in modern product management principles, focusing on creating products that are not just viable, but valuable, usable, and feasible. I believe in the power of effective discovery to drive innovation and create products that truly resonate with customers.",
            "about.experience": "My diverse background spans both B2B and B2C environments, allowing me to adapt discovery methods to various business models and customer types. Whether you're a startup or an established enterprise, I can help you navigate the complexities of product discovery and drive meaningful results.",
            "contact.title": "Contact",
            "contact.cta": "Ready to transform your product discovery?",
            "contact.description": "Whether you're struggling with product-market fit, looking to innovate in a crowded market, or simply want to make your discovery process more efficient and effective, I'm here to help. Let's work together to uncover opportunities that will delight your customers and drive your business forward.",
            "contact.button": "Contact Me",
            "footer.rights": "All rights reserved.",
            "footer.privacy": "Privacy Policy"
        },
        nl: {
            "nav.home": "Home",
            "nav.services": "Diensten",
            "nav.about": "Over mij",
            "nav.contact": "Contact",
            "home.title": "Joost Kamstra",
            "home.subtitle": "Product Discovery Coach",
            "home.intro": "Als ervaren Product Discovery Coach help ik organisaties bij het creëren van producten die er echt toe doen. Met meer dan tien jaar ervaring in leidende productbedrijven, help ik teams hun product discovery proces te transformeren, wat resulteert in verhoogde waardecreatie en minder verspilling.",
            "services.title": "Diensten",
            "services.intro": "Ik bied verschillende diensten aan om uw team te helpen excelleren in product discovery:",
            "services.workshop.title": "Team Workshops",
            "services.workshop.description": "Intensieve sessies die uw team uitrusten met praktische discovery-technieken, leidend tot directe verbeteringen in ideeëngeneratie en -validatie.",
            "services.design.title": "Discovery Proces Ontwerp",
            "services.design.description": "Op maat gemaakte discovery-raamwerken die passen bij de unieke context en doelen van uw organisatie, voor een duurzame en effectieve benadering van product discovery.",
            "services.coaching.title": "Hands-on Coaching",
            "services.coaching.description": "Directe begeleiding tijdens live discovery-activiteiten, met realtime feedback en optimalisatie om de vaardigheden en resultaten van uw team te verbeteren.",
            "about.title": "Over Mij",
            "about.description": "Met uitgebreide ervaring bij bedrijven als KPN, DPG Media, Ahold-Delhaize en Sissy-Boy, breng ik een schat aan kennis in productmanagement en coaching mee om uw team te helpen excelleren in product discovery.",
            "about.approach": "Mijn aanpak is geworteld in moderne productmanagementprincipes, gericht op het creëren van producten die niet alleen levensvatbaar zijn, maar ook waardevol, bruikbaar en haalbaar. Ik geloof in de kracht van effectieve discovery om innovatie te stimuleren en producten te creëren die echt resoneren met klanten.",
            "about.experience": "Mijn diverse achtergrond omvat zowel B2B- als B2C-omgevingen, waardoor ik discovery-methoden kan aanpassen aan verschillende bedrijfsmodellen en klanttypes. Of u nu een startup bent of een gevestigde onderneming, ik kan u helpen bij het navigeren door de complexiteit van product discovery en het behalen van betekenisvolle resultaten.",
            "contact.title": "Contact",
            "contact.cta": "Klaar om uw product discovery te transformeren?",
            "contact.description": "Of u nu worstelt met product-markt fit, zoekt naar innovatie in een drukke markt, of simpelweg uw discovery-proces efficiënter en effectiever wilt maken, ik ben er om te helpen. Laten we samenwerken om kansen te ontdekken die uw klanten zullen verrassen en uw bedrijf vooruit zullen stuwen.",
            "contact.button": "Neem Contact Op",
            "footer.rights": "Alle rechten voorbehouden.",
            "footer.privacy": "Privacybeleid"
        }
    };

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

    // Set initial language based on browser settings or localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    setLanguage(savedLang || navigator.language.split('-')[0]);

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
        if (!translations[lang]) {
            console.error(`Translations for language "${lang}" are not available.`);
            return;
        }

        // Update the language for all elements with a data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const translationKey = elem.getAttribute('data-i18n');
            if (translations[lang][translationKey]) {
                elem.textContent = translations[lang][translationKey];
            }
        });

        // Save the chosen language in localStorage
        localStorage.setItem('preferredLanguage', lang);
    }
});
