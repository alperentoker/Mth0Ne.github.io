// HTTPS Redirect
if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Navigation Menu Toggle with Accessibility
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Set initial ARIA attributes
        hamburger.setAttribute('aria-expanded', 'false');
        
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.contains('active');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', (!isOpen).toString());
            
            // Focus management
            if (!isOpen) {
                // Menu is opening, focus first link
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        });
        
        // Enhanced keyboard support
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
        
        // Handle keyboard navigation in mobile menu
        navMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Handle window resize to close mobile menu on desktop
        window.addEventListener('resize', throttle(() => {
            if (window.innerWidth >= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }, 250));
    }
    
    // Enhanced smooth scrolling for navigation links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = target.offsetTop - headerHeight - 20; // Extra padding
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Terminal animation removed as terminal is no longer used
    
    // Enhanced typing animation for hero title with mobile optimization
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        const isMobileDevice = window.innerWidth <= 768;
        
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, isMobileDevice ? 50 : 80);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // Enhanced Navbar scroll effect with performance optimization
    let lastScrollTop = 0;
    let ticking = false;
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background blur effect when scrolling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (only on mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
    
    // Skill progress bar animation with enhanced effects and performance
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
                bar.style.opacity = '1';
            }, index * 150);
        });
    };
    
    // Enhanced Intersection Observer for animations with mobile optimization
    const observerOptions = {
        threshold: window.innerWidth <= 768 ? 0.1 : 0.15,
        rootMargin: window.innerWidth <= 768 ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill bars when skills section is visible
                if (entry.target.id === 'skills') {
                    setTimeout(animateSkillBars, 300);
                }
                
                // Counter animation for stats with enhanced effects (except static stats)
                if (entry.target.classList.contains('stat-number') && !entry.target.classList.contains('static-stat')) {
                    animateCounter(entry.target);
                }
                
                // Stagger animations for child elements with mobile optimization
                const children = entry.target.querySelectorAll('.skill-item, .timeline-item, .certification-card, .project-card');
                const staggerDelay = window.innerWidth <= 768 ? 100 : 150;
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * staggerDelay);
                });
            }
        });
    }, observerOptions);
    
    // Add animation class to elements with enhanced selection
    const animateElements = document.querySelectorAll(`
        .skill-category, .timeline-item, .certification-card, .project-card,
        .about-content, .contact-content, .stat,
        .code-block, .education-item
    `);
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Observe sections for enhanced animations
    ['skills', 'about', 'projects', 'experience', 'education', 'certifications', 'contact'].forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) observer.observe(section);
    });
    
    // Observe stat numbers with enhanced animations (exclude static stats)
    const statNumbers = document.querySelectorAll('.stat-number:not(.static-stat)');
    statNumbers.forEach(stat => observer.observe(stat));
    
    // Enhanced Konami Code Easter Egg with mobile support
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    let konamiIndex = 0;
    let touchStartY = 0;
    let touchStartX = 0;
    let touchSequence = [];
    
    function initKonamiCode() {
        // Keyboard support
        document.addEventListener('keydown', function(e) {
            if (e.keyCode === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    triggerEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
        
        // Touch support for mobile
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            if (e.changedTouches.length === 1) {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const deltaX = touchEndX - touchStartX;
                const deltaY = touchEndY - touchStartY;
                const threshold = 50;
                
                let direction = null;
                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    if (deltaY > threshold) direction = 'down';
                    else if (deltaY < -threshold) direction = 'up';
                } else {
                    if (deltaX > threshold) direction = 'right';
                    else if (deltaX < -threshold) direction = 'left';
                }
                
                if (direction) {
                    touchSequence.push(direction);
                    if (touchSequence.length > 10) touchSequence.shift();
                    
                    // Simple touch pattern: up, up, down, down, left, right, left, right
                    const targetSequence = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
                    if (touchSequence.length >= targetSequence.length) {
                        const lastMoves = touchSequence.slice(-targetSequence.length);
                        if (JSON.stringify(lastMoves) === JSON.stringify(targetSequence)) {
                            triggerEasterEgg();
                            touchSequence = [];
                        }
                    }
                }
            }
        }, { passive: true });
    }
    
    function triggerEasterEgg() {
        // Create matrix rain effect
        createMatrixRain();
        
        // Add glitch effect to title
        const heroTitle = document.querySelector('.title-name');
        if (heroTitle) {
            heroTitle.classList.add('glitch');
            setTimeout(() => {
                heroTitle.classList.remove('glitch');
            }, 1000);
        }
        
        // Show fun message
        showEasterEggMessage();
        
        // Play fun animation
        document.body.classList.add('konami-activated');
        setTimeout(() => {
            document.body.classList.remove('konami-activated');
        }, 5000);
    }
    
    function createMatrixRain() {
        const matrixCanvas = document.createElement('canvas');
        matrixCanvas.id = 'matrix-rain';
        matrixCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            pointer-events: none;
            background: rgba(0, 0, 0, 0.8);
        `;
        document.body.appendChild(matrixCanvas);
        
        const ctx = matrixCanvas.getContext('2d');
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        
        const characters = 'ALPEREN_TOKER_DEVELOPER_CODE_MATRIX_01';
        const fontSize = window.innerWidth <= 768 ? 12 : 14;
        const columns = matrixCanvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            
            ctx.fillStyle = '#64FFDA';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const matrixInterval = setInterval(drawMatrix, 35);
        
        setTimeout(() => {
            clearInterval(matrixInterval);
            if (document.body.contains(matrixCanvas)) {
                document.body.removeChild(matrixCanvas);
            }
        }, 4000);
    }
    
    function showEasterEggMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #64FFDA, #007BFF);
                color: #0A192F;
                padding: 2rem;
                border-radius: 16px;
                text-align: center;
                z-index: 10000;
                font-family: 'Montserrat', sans-serif;
                font-weight: bold;
                font-size: clamp(1rem, 3vw, 1.2rem);
                box-shadow: 0 20px 40px rgba(100, 255, 218, 0.3);
                animation: easterEggPulse 2s ease-in-out infinite;
                max-width: 90vw;
            ">
                🎉 Konami Kodu Bulundu! 🎉<br>
                <span style="font-size: 0.9em; margin-top: 0.5rem; display: block;">
                    Tebrikler! Gizli kodu keşfettin! 🚀
                </span>
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 3000);
    }
    
    // Initialize Konami Code
    initKonamiCode();

    // Enhanced counter animation function
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const isPercentage = element.textContent.includes('%');
        const isPlusSign = element.textContent.includes('+');
        let current = 0;
        const duration = window.innerWidth <= 768 ? 1500 : 2000; // Faster on mobile
        const increment = target / (duration / 40);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (isPercentage ? '%' : '') + (isPlusSign ? '+' : '');
        }, 40);
    }
    
    // Enhanced contact form handling with improved mobile experience
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Form validation
            if (!name) {
                showNotification('Lütfen adınızı girin.', 'error');
                document.getElementById('name').focus();
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                document.getElementById('email').focus();
                return;
            }
            
            if (!subject) {
                showNotification('Lütfen bir konu girin.', 'error');
                document.getElementById('subject').focus();
                return;
            }
            
            if (!message) {
                showNotification('Lütfen mesajınızı yazın.', 'error');
                document.getElementById('message').focus();
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Gönderiliyor...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            showNotification('Mesajınız gönderiliyor...', 'info');
            
            // Create mailto link for email client
            const mailtoLink = `mailto:alperentoker149@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Ad: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`)}`;
            
            // Try to open email client
            try {
                window.location.href = mailtoLink;
                
                setTimeout(() => {
                    showNotification('E-posta istemciniz açıldı! Mesajı göndermeyi unutmayın.', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 1000);
            } catch (error) {
                // Fallback: show email details
                showFallbackMessage(name, email, subject, message);
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 2000);
            }
        });
        
        // Enhanced form validation on input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#EF4444';
                } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                    this.style.borderColor = '#EF4444';
                } else {
                    this.style.borderColor = '';
                }
            });
            
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    function showFallbackMessage(name, email, subject, message) {
        const fallbackDiv = document.createElement('div');
        fallbackDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(10, 25, 47, 0.95);
                color: white;
                padding: 2rem;
                border-radius: 16px;
                text-align: left;
                z-index: 10000;
                max-width: min(500px, 90vw);
                max-height: 80vh;
                overflow-y: auto;
                border: 1px solid #64FFDA;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
            ">
                <h3 style="color: #64FFDA; margin-bottom: 1rem; font-family: 'Montserrat', sans-serif; font-size: clamp(1.1rem, 3vw, 1.3rem);">Mesaj Detayları</h3>
                <p style="margin-bottom: 1rem; color: #CBD5E1; font-size: clamp(0.9rem, 2.5vw, 1rem);">E-posta istemciniz açılamadı. Lütfen aşağıdaki bilgileri kullanarak manuel olarak e-posta gönderin:</p>
                <div style="background: rgba(0, 0, 0, 0.3); padding: 1rem; border-radius: 8px; font-family: 'Fira Code', monospace; margin-bottom: 1rem; font-size: clamp(0.8rem, 2vw, 0.9rem); overflow-x: auto;">
                    <strong style="color: #64FFDA;">E-posta:</strong> alperentoker149@gmail.com<br>
                    <strong style="color: #64FFDA;">Konu:</strong> ${subject}<br><br>
                    <strong style="color: #64FFDA;">Ad:</strong> ${name}<br>
                    <strong style="color: #64FFDA;">E-posta:</strong> ${email}<br><br>
                    <strong style="color: #64FFDA;">Mesaj:</strong><br>${message}
                </div>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button onclick="copyToClipboard('${email}\\n${subject}\\n\\n${name}\\n${email}\\n\\n${message}')" style="
                        background: #007BFF;
                        color: white;
                        border: none;
                        padding: 0.75rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: clamp(0.9rem, 2.5vw, 1rem);
                        min-height: 44px;
                        flex: 1;
                        min-width: 120px;
                    ">Kopyala</button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                        background: #64FFDA;
                        color: #0A192F;
                        border: none;
                        padding: 0.75rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: clamp(0.9rem, 2.5vw, 1rem);
                        min-height: 44px;
                        flex: 1;
                        min-width: 120px;
                    ">Tamam</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(fallbackDiv);
        
        // Close on escape key
        function handleEscape(e) {
            if (e.key === 'Escape') {
                fallbackDiv.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        }
        document.addEventListener('keydown', handleEscape);
        
        setTimeout(() => {
            if (fallbackDiv.parentElement) {
                document.body.removeChild(fallbackDiv);
                document.removeEventListener('keydown', handleEscape);
            }
        }, 30000);
    }
    
    // Copy to clipboard function with mobile support
    window.copyToClipboard = function(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Mesaj detayları panoya kopyalandı!', 'success');
            }).catch(() => {
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }
    
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Mesaj detayları panoya kopyalandı!', 'success');
        } catch (err) {
            showNotification('Kopyalama işlemi başarısız oldu. Lütfen manuel olarak kopyalayın.', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    // Enhanced email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Enhanced notification system with mobile optimization
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Bildirimi kapat">&times;</button>
            </div>
        `;
        
        // Enhanced notification styles with mobile optimization
        const isMobile = window.innerWidth <= 768;
        notification.style.cssText = `
            position: fixed;
            top: ${isMobile ? '20px' : '100px'};
            ${isMobile ? 'left: 20px; right: 20px;' : 'right: 20px; max-width: 400px;'}
            background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            z-index: 10000;
            animation: slideIn${isMobile ? 'Down' : 'Right'} 0.3s ease-out;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-size: clamp(0.9rem, 2.5vw, 1rem);
        `;
        
        document.body.appendChild(notification);
        
        // Auto close after 5 seconds
        const autoCloseTimer = setTimeout(() => {
            notification.style.animation = `slideOut${isMobile ? 'Up' : 'Right'} 0.3s ease-in`;
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoCloseTimer);
            notification.style.animation = `slideOut${isMobile ? 'Up' : 'Right'} 0.3s ease-in`;
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        });
    }
    
    // Performance optimized throttle function
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
        };
    }
    
    // Add CSS animations for notifications with mobile support
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes slideInDown {
            from {
                transform: translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutUp {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(-100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: clamp(1.2rem, 3vw, 1.5rem);
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.2s;
            margin-left: auto;
            min-height: 44px;
            min-width: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }
        
        .notification-close:hover,
        .notification-close:focus {
            opacity: 1;
            background: rgba(255, 255, 255, 0.1);
        }
        
        .navbar.scrolled {
            background: rgba(10, 25, 47, 0.98) !important;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            z-index: 1000 !important;
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        /* Enhanced focus styles for accessibility */
        .nav-link:focus,
        .btn:focus,
        .hamburger:focus,
        .social-links a:focus,
        .project-links a:focus,
        input:focus,
        textarea:focus,
        button:focus {
            outline: 2px solid #64FFDA;
            outline-offset: 2px;
        }
        
                 /* Reduce motion for users who prefer it */
         @media (prefers-reduced-motion: reduce) {
             .notification {
                 animation: none !important;
             }
             
             .animate-on-scroll {
                 animation: none !important;
             }
         }
    `;
    document.head.appendChild(style);
    
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
    randomColor: () => `hsl(${Math.random() * 360}, 70%, 50%)`,
    
    // Check if device supports touch
    isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    
    // Get viewport dimensions
    getViewportSize: () => ({
        width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    })
};

// Export utils for potential use in other scripts
window.utils = utils; 