// Day 4 - Professional JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initializeThemeToggle();
    initializeNavigation();
    initializeSkillBars();
    initializeTestimonials();
    initializeForm();
    initializeAnimations();
    initializeModal();
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
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Handle header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
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

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        const nav = document.querySelector('nav ul');
        nav.classList.toggle('show');
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const nav = document.querySelector('nav ul');
            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
            }
        });
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.getAttribute('data-percent');
                entry.target.style.width = `${percent}%`;
            }
        });
    }, { threshold: 0.1 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Testimonials Slider
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentIndex = 0;

    // Function to show testimonial by index
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Event listeners for controls
    prevBtn.addEventListener('click', () => {
        let index = currentIndex - 1;
        if (index < 0) index = testimonials.length - 1;
        showTestimonial(index);
    });

    nextBtn.addEventListener('click', () => {
        let index = currentIndex + 1;
        if (index >= testimonials.length) index = 0;
        showTestimonial(index);
    });

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showTestimonial(index);
        });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        let index = currentIndex + 1;
        if (index >= testimonials.length) index = 0;
        showTestimonial(index);
    }, 5000);
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
            showModal('Success!', 'Your message has been sent successfully. We will get back to you soon!');
            form.reset();
        }
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (validateEmail(email)) {
            showNotification('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        } else {
            showNotification('Please enter a valid email address');
        }
    });
}

function validateInput(e) {
    const input = e.target;
    const validation = input.nextElementSibling;
    let isValid = true;
    let message = '';

    if (input.type === 'checkbox') return true;

    if (input.value.trim() === '') {
        isValid = false;
        message = 'This field is required';
    } else {
        switch(input.type) {
            case 'email':
                isValid = validateEmail(input.value);
                message = isValid ? '' : 'Please enter a valid email address';
                break;
            case 'text':
                if (input.id === 'name') {
                    isValid = input.value.length >= 3;
                    message = isValid ? '' : 'Name must be at least 3 characters long';
                } else if (input.id === 'subject') {
                    isValid = input.value.length >= 5;
                    message = isValid ? '' : 'Subject must be at least 5 characters long';
                }
                break;
            case 'textarea':
                isValid = input.value.length >= 10;
                message = isValid ? '' : 'Message must be at least 10 characters long';
                break;
        }
    }

    if (validation) {
        validation.textContent = message;
        input.style.borderColor = isValid ? '#cbd5e0' : '#f56565';
    }
    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    const inputs = document.querySelectorAll('#contactForm input:not([type="checkbox"]), #contactForm textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });

    // Check checkbox
    const consent = document.getElementById('consent');
    if (!consent.checked) {
        isValid = false;
        showNotification('Please agree to be contacted');
    }
    
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

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

function showModal(title, message) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
    `;
    
    modal.classList.add('show');
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

// Scroll to section function (used by buttons)
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Console welcome message
console.log('%cWelcome to Day 4 of Professional Web Development! 💻', 
    'color: #3182ce; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');