// Day 5 JavaScript - Advanced Web Application Functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to Day 5 - Advanced Web Application');
    
    // Initialize all components
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initPortfolioFilter();
    initPricingToggle();
    initContactForm();
    initBackToTop();
    initSearchOverlay();
    initStatCounters();
    initModalSystem();
    initTeamHover();
    
    // Show notification on page load
    setTimeout(() => {
        showNotification('Welcome to Day 5 of our web development journey!', 'info');
    }, 2000);
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme') || 
                         (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the theme on initial load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Update the button icon
        if (document.body.classList.contains('dark-theme')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
        
        showNotification('Theme updated!', 'info');
    });
}

// Navigation Functionality
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.innerHTML = nav.classList.contains('active') ? 
                        '<i class="fas fa-times"></i>' : 
                        '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add scrolled class to header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    });
    
    // Update active nav link based on current section
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Scroll to section functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 70,
            behavior: 'smooth'
        });
    }
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            } else {
                // Optional: remove the class when element is not in viewport
                // entry.target.classList.remove('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Pricing Toggle Functionality
function initPricingToggle() {
    const pricingToggle = document.getElementById('pricingToggle');
    
    pricingToggle.addEventListener('change', function() {
        document.body.classList.toggle('yearly-pricing', this.checked);
        
        const message = this.checked ? 
                      'Yearly pricing displayed - Save 20%!' : 
                      'Monthly pricing displayed';
        
        showNotification(message, 'info');
    });
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Add input validation on blur
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            validateInput(this, true);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all inputs
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Reset form
                contactForm.reset();
                formInputs.forEach(input => {
                    input.nextElementSibling.textContent = '';
                });
                
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            }, 2000);
        }
    });
    
    // Input validation function
    function validateInput(input, isTyping = false) {
        const validation = input.nextElementSibling;
        let isValid = true;
        let message = '';
        
        // Skip validation while typing except for specific cases
        if (isTyping && input.type !== 'email') {
            validation.textContent = '';
            return true;
        }
        
        // Different validation based on input type
        if (input.value.trim() === '' && input.required) {
            isValid = false;
            message = 'This field is required';
        } else if (input.type === 'email' && input.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        } else if (input.id === 'subject' && input.value.length < 3) {
            isValid = false;
            message = 'Subject must be at least 3 characters';
        } else if (input.id === 'message' && input.value.length < 10) {
            isValid = false;
            message = 'Message must be at least 10 characters';
        }
        
        // Update validation message
        validation.textContent = message;
        
        // Update input styling
        if (isValid) {
            input.style.borderColor = input.value.trim() !== '' ? '#4caf50' : '';
        } else {
            input.style.borderColor = '#f44336';
        }
        
        return isValid;
    }
}

// Back to Top Button Functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Search Overlay Functionality
function initSearchOverlay() {
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    
    searchToggle.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });
    
    closeSearch.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
    });
    
    // Close search on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });
    
    // Search functionality
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim().toLowerCase();
            
            if (searchTerm !== '') {
                // Simulate search
                searchOverlay.classList.remove('active');
                showNotification(`Searching for: ${searchTerm}`, 'info');
                
                // Scroll to section if search matches section id
                const sections = ['home', 'features', 'portfolio', 'pricing', 'team', 'contact'];
                
                for (const section of sections) {
                    if (section.includes(searchTerm)) {
                        setTimeout(() => {
                            scrollToSection(section);
                        }, 500);
                        break;
                    }
                }
            }
        }
    });
}

// Animated Stat Counters
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = Math.ceil(countTo / (duration / 30)); // Update every 30ms
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= countTo) {
                        target.textContent = countTo;
                        clearInterval(timer);
                    } else {
                        target.textContent = count;
                    }
                }, 30);
                
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Modal System
function initModalSystem() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        closeModalFunc();
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
    
    function closeModalFunc() {
        modal.classList.remove('active');
        setTimeout(() => {
            modalBody.innerHTML = '';
        }, 300);
    }
}

// Open modal with specific content
function openModal(projectId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    // Project details (in a real app, this would come from a database)
    const projects = {
        'project1': {
            title: 'E-commerce Platform',
            category: 'Web Application',
            client: 'RetailCorp Inc.',
            date: 'January 2025',
            description: 'A comprehensive e-commerce solution with advanced product filtering, user authentication, payment processing, and order management.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
            image: 'https://via.placeholder.com/800x500'
        },
        'project2': {
            title: 'Fitness Tracker',
            category: 'Mobile Application',
            client: 'HealthFirst',
            date: 'March 2025',
            description: 'A mobile fitness application that tracks workouts, nutrition, and progress with personalized recommendations and social sharing features.',
            technologies: ['React Native', 'Firebase', 'Google Fit API', 'Apple HealthKit'],
            image: 'https://via.placeholder.com/800x500'
        },
        'project3': {
            title: 'Dashboard Design',
            category: 'UI/UX Design',
            client: 'DataViz Corp',
            date: 'February 2025',
            description: 'A modern dashboard interface for data visualization with customizable widgets, real-time updates, and responsive design.',
            technologies: ['Figma', 'Adobe XD', 'Sketch', 'Illustrator'],
            image: 'https://via.placeholder.com/800x500'
        },
        'project4': {
            title: 'Learning Management System',
            category: 'Web Application',
            client: 'EduTech Solutions',
            date: 'April 2025',
            description: 'A comprehensive learning platform with course management, student progress tracking, assessment tools, and interactive content delivery.',
            technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
            image: 'https://via.placeholder.com/800x500'
        }
    };
    
    // Get project data
    const project = projects[projectId];
    
    if (project) {
        // Create modal content
        let content = `
            <div class="project-modal">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-details">
                    <h2>${project.title}</h2>
                    <p class="project-category">${project.category}</p>
                    
                    <div class="project-info">
                        <div class="info-item">
                            <h4>Client:</h4>
                            <p>${project.client}</p>
                        </div>
                        <div class="info-item">
                            <h4>Date:</h4>
                            <p>${project.date}</p>
                        </div>
                    </div>
                    
                    <div class="project-description">
                        <h4>Project Description:</h4>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="project-technologies">
                        <h4>Technologies Used:</h4>
                        <ul>
                            ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Set modal content
        modalBody.innerHTML = content;
        
        // Show modal
        modal.classList.add('active');
    }
}

// Team Hover Effects
function initTeamHover() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.team-social').style.bottom = '0';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.team-social').style.bottom = '-50px';
        });
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    
    // Set message and type
    notification.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type);
    
    // Show notification
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + T: Toggle theme
    if (e.altKey && e.key === 't') {
        document.getElementById('themeToggle').click();
    }
    
    // Alt + S: Open search
    if (e.altKey && e.key === 's') {
        document.getElementById('searchToggle').click();
    }
    
    // Alt + Home: Scroll to top
    if (e.altKey && e.key === 'Home') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});