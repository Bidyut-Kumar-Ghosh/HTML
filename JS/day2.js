// Day 2 - Advanced JavaScript Concepts

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
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

    // Console welcome message
    console.log('%cWelcome to Day 2 of JavaScript Learning!', 'color: #3498db; font-size: 20px; font-weight: bold;');
});
