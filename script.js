document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });

    // Add staggered animation to grid items
    const animateGridItems = (gridSelector, delay = 100) => {
        const grid = document.querySelector(gridSelector);
        if (grid) {
            const items = grid.children;
            Array.from(items).forEach((item, index) => {
                item.style.animationDelay = `${index * delay}ms`;
                item.classList.add('fade-in');
                observer.observe(item);
            });
        }
    };

    // Apply staggered animations
    animateGridItems('.crafts-grid');
    animateGridItems('.features');
    animateGridItems('.mission-goals');
    animateGridItems('.initiatives-grid');
    animateGridItems('.challenges-content');
    animateGridItems('.get-involved-options');

    // Form submission
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = form.querySelector('.btn');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            
            // Simulate form submission
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = '#28a745';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.opacity = '1';
                    btn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Parallax effect for hero section - REMOVED to fix overlap issue

    // Counter animation for stats
    const animateCounters = () => {
        const stats = document.querySelectorAll('.stat h3');
        stats.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = text;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (text.includes('%') ? '%' : '');
                    }
                }, 40);
            }
        });
    };

    // Observe stats section for counter animation
    const statsSection = document.querySelector('#impact');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.craft-item, .feature, .goal, .initiative, .challenge, .option');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
