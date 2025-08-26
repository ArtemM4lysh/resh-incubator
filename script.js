// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll('.service-card, .advantage-card, .pricing-card, .contact-item');

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = function() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.nav');
            const header = document.querySelector('.header .container');

            // Add mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.classList.add('mobile-menu-btn');
                menuBtn.innerHTML = '☰';
                menuBtn.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--dark-yellow);
                    cursor: pointer;
                    display: none;
                `;

                // Show menu button on mobile
                if (window.innerWidth <= 768) {
                    menuBtn.style.display = 'block';
                }

                header.appendChild(menuBtn);

                // Toggle mobile menu
                menuBtn.addEventListener('click', function() {
                    nav.classList.toggle('mobile-nav-open');
                });
            }
        }
    };

    // Call mobile menu function
    createMobileMenu();

    // Update mobile menu on resize
    window.addEventListener('resize', createMobileMenu);

    // Add phone number formatting helper
    const formatPhoneNumber = function() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            // You can add phone number formatting logic here if needed
            link.addEventListener('click', function() {
                // Analytics tracking could be added here
                console.log('Phone number clicked');
            });
        });
    };

    formatPhoneNumber();

    // Add form validation if contact form is added later
    const addFormValidation = function() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                // Add form validation logic here
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    alert('Будь ласка, заповніть всі обов\'язкові поля');
                }
            });
        });
    };

    addFormValidation();
});

// Add CSS for mobile navigation
const mobileNavCSS = `
    @media (max-width: 768px) {
        .nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav.mobile-nav-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-btn {
            display: block !important;
        }
    }
`;

// Add mobile navigation styles to head
const style = document.createElement('style');
style.textContent = mobileNavCSS;
document.head.appendChild(style);