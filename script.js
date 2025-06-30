// HTTPS Redirect
if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
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
    
    // Typing animation for hero title (optimized for mobile)
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        const isMobileDevice = window.innerWidth <= 768 || 'ontouchstart' in window;
        
        if (isMobileDevice) {
            // Faster animation on mobile to reduce battery usage
            typingText.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    typingText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50); // Faster on mobile
                }
            }
            
            // Start typing animation after a shorter delay on mobile
            setTimeout(typeWriter, 500);
        } else {
            // Standard animation on desktop
            typingText.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    typingText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Skill progress bar animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill bars when skills section is visible
                if (entry.target.id === 'skills') {
                    setTimeout(animateSkillBars, 500);
                }
                
                // Counter animation for stats
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    const animateElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Observe skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => observer.observe(stat));
    
    // Counter animation function
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const isPercentage = element.textContent.includes('%');
        const isPlusSign = element.textContent.includes('+');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (isPercentage ? '%' : '') + (isPlusSign ? '+' : '');
        }, 50);
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Lütfen tüm alanları doldurun.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Mesajınız gönderiliyor...', 'info');
            
            setTimeout(() => {
                showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size geri döneceğim.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles (mobile optimized)
        const isMobileNotification = window.innerWidth <= 768;
        notification.style.cssText = `
            position: fixed;
            top: ${isMobileNotification ? '10px' : '20px'};
            right: ${isMobileNotification ? '10px' : '20px'};
            left: ${isMobileNotification ? '10px' : 'auto'};
            background: ${type === 'success' ? '#64FFDA' : type === 'error' ? '#ff6b6b' : '#007BFF'};
            color: ${type === 'success' || type === 'info' ? '#0A192F' : '#FFFFFF'};
            padding: ${isMobileNotification ? '12px 16px' : '15px 20px'};
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            ${isMobileNotification ? '' : 'backdrop-filter: blur(10px);'}
            border: 1px solid rgba(100, 255, 218, 0.3);
            z-index: 10000;
            font-weight: 500;
            max-width: ${isMobileNotification ? 'none' : '400px'};
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-size: ${isMobileNotification ? '0.9em' : '1em'};
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Navbar scroll effect (optimized for mobile)
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    const isMobile = window.innerWidth <= 768;
    
    const throttledNavbarScroll = throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 25, 47, 0.98)';
            // Disable backdrop-filter on mobile for performance
            if (!isMobile) {
                navbar.style.backdropFilter = 'blur(20px)';
            }
        } else {
            navbar.style.background = 'rgba(10, 25, 47, 0.95)';
            if (!isMobile) {
                navbar.style.backdropFilter = 'blur(15px)';
            }
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 16);
    
    window.addEventListener('scroll', throttledNavbarScroll);
    
    // Parallax effect for hero section (disabled on mobile for performance)
    if (window.innerWidth > 768) {
        const throttledParallax = throttle(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }, 16);
        window.addEventListener('scroll', throttledParallax);
    }
    
    // Add glitch effect to logo on hover
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.classList.add('glitch');
            logo.setAttribute('data-text', logo.textContent);
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.classList.remove('glitch');
        });
    }
    

    
    // Project card hover effects (disabled on mobile for performance)
    if (window.innerWidth > 768) {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateX(5deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
            });
        });
    }
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    

    
    // Performance optimization: throttle scroll events
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
    
    // Apply throttling to scroll events
    const throttledScroll = throttle(() => {
        // Any scroll-related optimizations can go here
    }, 16);
    
    window.addEventListener('scroll', throttledScroll);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('Service Worker registered'))
            .catch(() => console.log('Service Worker registration failed'));
    });
}

// Utility functions
const utils = {
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Random number generator
    random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    // Generate random color
    randomColor: () => `hsl(${Math.random() * 360}, 70%, 50%)`
};

// Export utils for potential use in other scripts
window.utils = utils; 