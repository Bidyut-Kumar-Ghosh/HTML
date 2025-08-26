// Day 3 - Advanced JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initializeThemeToggle();
    initializeNavigation();
    initializeGallery();
    initializeForm();
    initializeAnimations();
    initializeFeatures();
});

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.textContent = isDark ? '🌙' : '☀️';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        showNotification(`Switched to ${isDark ? 'light' : 'dark'} theme`);
    });
}

// Navigation and Scroll Handling
function initializeNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
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
    });
}

// Gallery Functionality
function initializeGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Form Handling and Validation
function initializeForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', validateInput);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Simulate form submission
            showNotification('Message sent successfully!');
            form.reset();
        }
    });
}

function validateInput(e) {
    const input = e.target;
    const validation = input.nextElementSibling;
    let isValid = true;
    let message = '';

    switch(input.type) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            message = isValid ? '' : 'Please enter a valid email address';
            break;
        case 'text':
            isValid = input.value.length >= 3;
            message = isValid ? '' : 'Must be at least 3 characters long';
            break;
        case 'textarea':
            isValid = input.value.length >= 10;
            message = isValid ? '' : 'Message must be at least 10 characters long';
            break;
    }

    validation.textContent = message;
    input.style.borderColor = isValid ? '#ddd' : '#f56565';
    return isValid;
}

function validateForm() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    let isValid = true;
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    return isValid;
}

// Animation and Intersection Observer
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// Feature Demonstrations
function initializeFeatures() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    const interactiveElements = document.querySelectorAll('.interactive-element');

    demoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.feature-card');
            card.style.transform = 'scale(1.05)';
            setTimeout(() => card.style.transform = '', 300);
        });
    });

    interactiveElements.forEach(element => {
        element.addEventListener('mousemove', handleMouseMove);
    });
}

function handleMouseMove(e) {
    const element = e.target;
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    element.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, 
        var(--secondary-color), var(--primary-color))`;
}

// Utility Functions
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Scroll Functions
function scrollToGallery() {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

function showFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}
