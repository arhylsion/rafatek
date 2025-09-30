// --- Function to handle fade-in and slide-up on scroll ---
function handleScrollAnimation() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// --- Navbar background change on scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-blue-900', 'shadow-md', 'bg-opacity-90');
    } else {
        navbar.classList.remove('bg-blue-900', 'shadow-md', 'bg-opacity-90');
    }
});

// --- Header Slider (Background & Dots) ---
const headerSlides = document.querySelectorAll('.header-slide');
const headerDots = document.querySelectorAll('.dot');
let headerCurrent = 0;

function showHeaderSlide(index) {
    headerSlides.forEach((s, i) => {
        s.classList.toggle("active", i === index);
    });
    headerDots.forEach((dot, i) => {
        dot.classList.toggle('bg-white', i === index);
        dot.classList.toggle('opacity-100', i === index);
        dot.classList.toggle('bg-gray-400', i !== index);
        dot.classList.toggle('opacity-70', i !== index);
    });
    headerCurrent = index;
}

headerDots.forEach((dot, i) => dot.addEventListener("click", () => showHeaderSlide(i)));

setInterval(() => {
    let next = (headerCurrent + 1) % headerSlides.length;
    showHeaderSlide(next);
}, 5000);

// --- About Us Slider (Vision & Mission) ---
const aboutSlides = document.querySelectorAll('#vision-mission-box .slide-text');
let currentAboutSlide = 0;

function showAboutSlide(index) {
    aboutSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        slide.classList.toggle('hidden', i !== index);
    });
}
setInterval(() => {
    currentAboutSlide = (currentAboutSlide + 1) % aboutSlides.length;
    showAboutSlide(currentAboutSlide);
}, 4000);

// --- Services Slider ---
const servicesSlides = document.querySelector('#services-slides > div');
const servicesTexts = document.querySelector('#services-texts > div');
const servicesIndicators = document.querySelectorAll('.indicator');
let serviceIndex = 0;

function showServiceSlide(index) {
    serviceIndex = index;
    servicesSlides.style.transform = `translateX(-${index * 100}%)`;
    servicesTexts.style.transform = `translateX(-${index * 100}%)`;
    servicesIndicators.forEach((line, i) => {
        if (i === index) {
            line.classList.add('bg-blue-900', 'h-12');
            line.classList.remove('bg-gray-400', 'h-8');
        } else {
            line.classList.add('bg-gray-400', 'h-8');
            line.classList.remove('bg-blue-900', 'h-12');
        }
    });
}

servicesIndicators.forEach((line, i) => line.addEventListener("click", () => showServiceSlide(i)));
setInterval(() => {
    serviceIndex = (serviceIndex + 1) % servicesIndicators.length;
    showServiceSlide(serviceIndex);
}, 5000);

// --- FAQ Accordion ---
document.querySelectorAll(".toggle").forEach(button => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        const isOpen = content.classList.contains('open');

        document.querySelectorAll('.faq-content.open').forEach(openContent => {
            if (openContent !== content) {
                openContent.classList.remove('open');
            }
        });

        if (isOpen) {
            content.classList.remove('open');
        } else {
            content.classList.add('open');
        }
    });
});

// --- WhatsApp Popup ---
const waContainer = document.getElementById('wa-container');
const waPopup = document.getElementById('wa-popup');

waContainer.addEventListener('mouseenter', () => {
    waPopup.classList.remove('opacity-0');
    waPopup.classList.add('opacity-100');
});

waContainer.addEventListener('mouseleave', () => {
    waPopup.classList.remove('opacity-100');
    waPopup.classList.add('opacity-0');
});

// --- Scroll to Top Button ---
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollTopBtn.classList.remove("hidden");
    } else {
        scrollTopBtn.classList.add("hidden");
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Hamburger Menu ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuCloseButton = document.getElementById('mobile-menu-close');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuButton.addEventListener('click', openMobileMenu);
mobileMenuCloseButton.addEventListener('click', closeMobileMenu);

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Initial calls
showHeaderSlide(0);
showServiceSlide(0);
showAboutSlide(0);

document.addEventListener('DOMContentLoaded', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    if (loaderWrapper) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loaderWrapper.style.opacity = '0';
                setTimeout(() => {
                    loaderWrapper.style.display = 'none';
                }, 700); 
            }, 1000); 
        });
    }
});