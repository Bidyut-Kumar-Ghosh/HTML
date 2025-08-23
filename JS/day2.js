// Day 2 - Advanced JavaScript Concepts

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress bars with animation
    animateProgressBars();
    
    // Handle active navigation state
    handleNavigation();
    
    // Animate elements on scroll
    window.addEventListener('scroll', handleScroll);
    // Form handling
    const contactForm = document.getElementById('contactForm');
    
    // Counter functionality
    const countDisplay = document.getElementById('count');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    
    // Theme toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    
    let count = 0;

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formDetails = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Display form data in console
        console.log('Form submitted:', formDetails);
        
        // Show success message
        alert('Thank you for your message!');
        this.reset();
    });

    // Counter event listeners
    incrementBtn.addEventListener('click', () => {
        count++;
        updateCounter();
    });

    decrementBtn.addEventListener('click', () => {
        count--;
        updateCounter();
    });

    // Update counter display
    function updateCounter() {
        countDisplay.textContent = count;
        // Add animation class
        countDisplay.classList.add('highlight');
        setTimeout(() => {
            countDisplay.classList.remove('highlight');
        }, 200);
    }

    // Theme toggle functionality
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDarkTheme = document.body.classList.contains('dark-theme');
        themeToggleBtn.textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
        
        // Save theme preference
        localStorage.setItem('darkTheme', isDarkTheme);
    });

    // Load saved theme preference
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.textContent = 'Light Theme';
    }

    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            document.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'ArrowUp') {
            count++;
            updateCounter();
        } else if (e.ctrlKey && e.key === 'ArrowDown') {
            count--;
            updateCounter();
        }
    });

    // Progress bars animation
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    // Handle navigation active state
    function handleNavigation() {
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

    // Scroll animation for elements
    function handleScroll() {
        const elements = document.querySelectorAll('.card, .form-group, .hero h1, .hero-text');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Scroll to section function
    window.scrollToSection = function(sectionId) {
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
    };

    // Add scroll reveal animations
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-in-out';
        card.style.transitionDelay = `${index * 0.2}s`;
    });

    // Initial scroll check
    handleScroll();

    // Console welcome message with styling
    console.log('%cWelcome to Day 2 of JavaScript Learning! 🚀', 
        'color: #3498db; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
});
