// AutomatizaFerrol - Main JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    if (navLinks) navLinks.classList.remove('active');
                    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Navbar background on scroll (if transparent navbar is used)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.card, .service-card, .case-card, .blog-card, .testimonial-card, .pricing-card, .benefit-card, .problem-card, .solution-card'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // FAQ toggle functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const wasOpen = item.classList.contains('open');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('open');
            });

            // Toggle the clicked one
            if (!wasOpen) {
                item.classList.add('open');
            }
        });
    });

    // Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
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
                alert('Por favor, completa todos los campos obligatorios.');
            }
        });
    });

    // Add animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .card, .service-card, .case-card, .blog-card, .testimonial-card, .pricing-card, .benefit-card, .problem-card, .solution-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: var(--error) !important;
        }
    `;
    document.head.appendChild(style);
});

// Utility function for form submission (can be used with backend)
function submitForm(formData, endpoint) {
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

// Analytics placeholder (can be replaced with actual analytics)
function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    // Replace with actual analytics call (Google Analytics, etc.)
}

// Track CTA clicks
document.addEventListener('click', function (e) {
    if (e.target.matches('.btn-primary')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            page: window.location.pathname
        });
    }
});
