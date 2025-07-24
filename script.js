// =================================
// MODERN PORTFOLIO JAVASCRIPT
// Professional animations and interactions
// =================================

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.createSVGAnimation();
    this.setupScrollAnimations();
    this.setupFloatingElements(); 
    this.generateProjectCards();
    this.setupFormHandling();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupHeaderScrollEffect();
    
    // Initialize animations with a slight delay for better UX
    setTimeout(() => {
      this.triggerInitialAnimations();
    }, 100);
  }

  setupEventListeners() {
    // Resize handler for responsive animations
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    // Scroll handler for parallax and other effects
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 16));

    // Enhanced button interactions
    this.setupButtonAnimations();
  }

  // =================================
  // SVG ANIMATION SYSTEM
  // =================================
  createSVGAnimation() {
    const svgContainer = document.querySelector('.svg-animation');
    if (!svgContainer) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 300 300');
    svg.classList.add('hero-svg');

    // Create animated elements
    const elements = [
      this.createAnimatedCircle(150, 150, 100, '#3b82f6', 0.1, 6),
      this.createAnimatedCircle(150, 150, 75, '#2563eb', 0.15, -8),
      this.createAnimatedPath(),
      this.createFloatingDots(),
      this.createPulsingCenter()
    ];

    elements.forEach(el => svg.appendChild(el));
    svgContainer.appendChild(svg);

    // Add CSS animation class
    svg.classList.add('svg-fade-in');
  }

  createAnimatedCircle(cx, cy, r, color, opacity, duration) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', color);
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('stroke-opacity', opacity);
    circle.setAttribute('stroke-dasharray', '5 10');

    const animateTransform = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
    animateTransform.setAttribute('attributeName', 'transform');
    animateTransform.setAttribute('type', 'rotate');
    animateTransform.setAttribute('from', '0 150 150');
    animateTransform.setAttribute('to', '360 150 150');
    animateTransform.setAttribute('dur', `${Math.abs(duration)}s`);
    animateTransform.setAttribute('repeatCount', 'indefinite');

    circle.appendChild(animateTransform);
    return circle;
  }

  createAnimatedPath() {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 75 150 Q 150 75 225 150 T 225 150');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#3b82f6');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-opacity', '0.4');
    path.setAttribute('stroke-linecap', 'round');

    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'stroke-dasharray');
    animate.setAttribute('from', '0 400');
    animate.setAttribute('to', '400 0');
    animate.setAttribute('dur', '3s');
    animate.setAttribute('repeatCount', 'indefinite');

    path.appendChild(animate);
    return path;
  }

  createFloatingDots() {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const positions = [
      { x: 100, y: 100 }, { x: 200, y: 100 },
      { x: 80, y: 200 }, { x: 220, y: 200 },
      { x: 150, y: 80 }, { x: 150, y: 220 }
    ];

    positions.forEach((pos, index) => {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', pos.x);
      dot.setAttribute('cy', pos.y);
      dot.setAttribute('r', '3');
      dot.setAttribute('fill', '#3b82f6');
      dot.setAttribute('opacity', '0.6');

      const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animate.setAttribute('attributeName', 'opacity');
      animate.setAttribute('values', '0.6;1;0.6');
      animate.setAttribute('dur', '2s');
      animate.setAttribute('begin', `${index * 0.3}s`);
      animate.setAttribute('repeatCount', 'indefinite');

      dot.appendChild(animate);
      group.appendChild(dot);
    });

    return group;
  }

  createPulsingCenter() {
    const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    center.setAttribute('cx', '150');
    center.setAttribute('cy', '150');
    center.setAttribute('r', '8');
    center.setAttribute('fill', '#2563eb');

    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'r');
    animate.setAttribute('values', '8;12;8');
    animate.setAttribute('dur', '2s');
    animate.setAttribute('repeatCount', 'indefinite');

    center.appendChild(animate);
    return center;
  }

  // =================================
  // FLOATING ELEMENTS ANIMATION
  // =================================
  setupFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    const elements = container.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
      const speed = parseFloat(element.dataset.speed) || 0.5;
      const radius = 60 + (index * 20);
      const angle = (index * 120) * (Math.PI / 180);
      
      // Initial position
      const centerX = 150;
      const centerY = 150;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      element.style.left = x + 'px';
      element.style.top = y + 'px';
      
      // Animate floating motion
      this.animateFloating(element, speed, radius, angle);
    });
  }

  animateFloating(element, speed, radius, startAngle) {
    let angle = startAngle;
    const centerX = 150;
    const centerY = 150;
    
    const animate = () => {
      angle += speed * 0.02;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius + Math.sin(angle * 2) * 10;
      
      element.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
      requestAnimationFrame(animate);
    };
    
    animate();
  }

  // =================================
  // SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
  // =================================
  setupScrollAnimations() {
    // Enhanced intersection observer with different thresholds
    const observerOptions = {
      threshold: [0, 0.1, 0.5],
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target, entry.intersectionRatio);
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(`
      .section-header, .project-card, .about-content, .skills-content,
      .contact-content, .contact-form-container, .hero-badge, .hero-title,
      .hero-description, .hero-stats, .hero-actions
    `);

    animatableElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
  }

  animateElement(element, ratio) {
    if (ratio > 0.1) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.classList.add('animated');
    }
  }

  triggerInitialAnimations() {
    // Animate hero elements immediately
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }

  // =================================
  // PROJECT CARDS GENERATION
  // =================================
  generateProjectCards() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    const projects = [
      {
        category: 'Finans & AI',
        title: 'SmartBist - Akıllı Borsa İstanbul Portföy Yönetim Sistemi',
        description: 'BIST için geliştirilen, TensorFlow ve LSTM algoritmaları kullanarak hisse senedi fiyat tahminleri yapan ve portföy optimizasyonu sağlayan gelişmiş bir finansal analiz sistemi.',
        tags: ['ASP.NET Core MVC', 'Python', 'TensorFlow', 'LSTM', 'MSSQL', 'Power BI'],
        links: [
          { text: 'GitHub\'da Görüntüle', url: 'https://github.com/Mth0Ne/YATIRIM', icon: 'github' },
          { text: 'Canlı Demo', url: '#', icon: 'external' }
        ],
        featured: true
      },
      {
        category: 'İnsan Kaynakları',
        title: 'Personel Maaş Yönetim Sistemi',
        description: 'Kurumsal şirketler için geliştirilmiş kapsamlı bordro yönetimi, maaş hesaplama, çalışan takibi ve detaylı raporlama özellikleri içeren tam entegre İK sistemi.',
        tags: ['ASP.NET Core MVC', 'C#', 'MSSQL', 'Entity Framework', 'Bootstrap'],
        links: [
          { text: 'GitHub\'da İncele', url: 'https://github.com/Mth0Ne/PayrollManagementSys', icon: 'github' }
        ],
        featured: false
      },

    ];

    projectsGrid.innerHTML = '';

    projects.forEach((project, index) => {
      const card = this.createProjectCard(project, index);
      projectsGrid.appendChild(card);
    });
  }

  createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('role', 'listitem');
    
    const linksHTML = project.links.map(link => 
      `<a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer">
        ${link.text}
        <svg class="btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          ${this.getIconSVG(link.icon)}
        </svg>
      </a>`
    ).join('');

    card.innerHTML = `
      <div class="project-category">${project.category}</div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <div class="project-links">
        ${linksHTML}
      </div>
    `;

    return card;
  }

  getIconSVG(iconType) {
    const icons = {
      github: '<path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" fill="currentColor"/>',
      external: '<path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    };
    return icons[iconType] || icons.external;
  }

  // =================================
  // ENHANCED FORM HANDLING
  // =================================
  setupFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, select, textarea');

    // Real-time validation
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (this.validateForm(form)) {
        await this.submitForm(form, submitButton);
      }
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    // Remove existing error
    this.clearFieldError(field);

    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        message = 'Geçerli bir e-posta adresi girin';
        break;
      case 'text':
        isValid = value.length >= 2;
        message = 'En az 2 karakter girin';
        break;
      case 'select-one':
        isValid = value !== '';
        message = 'Bir seçenek seçin';
        break;
      default:
        if (field.tagName === 'TEXTAREA') {
          isValid = value.length >= 10;
          message = 'En az 10 karakter girin';
        }
    }

    if (!isValid && field.hasAttribute('required')) {
      this.showFieldError(field, message);
    }

    return isValid;
  }

  validateForm(form) {
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'field-error';
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  async submitForm(form, button) {
    // Add loading state
    button.classList.add('loading');
    button.disabled = true;

    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success state
      this.showFormSuccess(form);
      form.reset();
      
    } catch (error) {
      this.showFormError('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      button.classList.remove('loading');
      button.disabled = false;
    }
  }

  showFormSuccess(form) {
    const success = document.createElement('div');
    success.className = 'form-success';
    success.innerHTML = `
      <div class="success-icon">✓</div>
      <p>Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.</p>
    `;
    
    form.style.transform = 'scale(0.95)';
    form.style.opacity = '0.5';
    
    setTimeout(() => {
      form.parentNode.insertBefore(success, form);
      setTimeout(() => {
        success.remove();
        form.style.transform = '';
        form.style.opacity = '';
      }, 4000);
    }, 500);
  }

  showFormError(message) {
    // Simple error notification
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    document.body.appendChild(error);
    
    setTimeout(() => error.remove(), 4000);
  }

  // =================================
  // MOBILE MENU FUNCTIONALITY
  // =================================
  setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      
      menuToggle.setAttribute('aria-expanded', !isOpen);
      nav.classList.toggle('mobile-nav-open');
      document.body.classList.toggle('mobile-menu-active');
      
      // Animate hamburger lines
      this.animateMenuToggle(menuToggle, !isOpen);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('mobile-nav-open')) {
        menuToggle.click();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('mobile-nav-open')) {
        menuToggle.click();
      }
    });
  }

  animateMenuToggle(toggle, isOpen) {
    const lines = toggle.querySelectorAll('.hamburger-line');
    if (isOpen) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
    }
  }

  // =================================
  // SMOOTH SCROLLING & HEADER EFFECTS
  // =================================
  setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupHeaderScrollEffect() {
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;

    const handleHeaderScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add shadow when scrolling
      if (currentScrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide/show header on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', this.throttle(handleHeaderScroll, 16));
  }

  // =================================
  // ENHANCED BUTTON ANIMATIONS
  // =================================
  setupButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', (e) => {
        this.createRippleEffect(e.target, e);
      });
      
      button.addEventListener('focus', (e) => {
        this.addFocusGlow(e.target);
      });
      
      button.addEventListener('blur', (e) => {
        this.removeFocusGlow(e.target);
      });
    });
  }

  createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  addFocusGlow(element) {
    element.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
  }

  removeFocusGlow(element) {
    element.style.boxShadow = '';
  }

  // =================================
  // EVENT HANDLING UTILITIES
  // =================================
  handleResize() {
    // Recalculate floating elements on resize
    this.setupFloatingElements();
  }

  handleScroll() {
    // Parallax effect for hero elements
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-visual');
    
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
  }

  // =================================
  // UTILITY FUNCTIONS
  // =================================
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
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
}

// =================================
// CSS ANIMATIONS (Added via JS)
// =================================
const additionalStyles = `
  <style>
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    .form-success {
      background: linear-gradient(135deg, #10b981, #34d399);
      color: white;
      padding: var(--space-6);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      gap: var(--space-4);
      margin-bottom: var(--space-6);
      animation: slideInUp 0.5s ease-out;
    }
    
    .success-icon {
      font-size: var(--text-2xl);
      font-weight: bold;
    }
    
    .form-error {
      position: fixed;
      top: var(--space-6);
      right: var(--space-6);
      background: #ef4444;
      color: white;
      padding: var(--space-4) var(--space-6);
      border-radius: var(--radius-md);
      z-index: var(--z-tooltip);
      animation: slideInRight 0.3s ease-out;
    }
    
    .field-error {
      display: block;
      color: #ef4444;
      font-size: var(--text-sm);
      margin-top: var(--space-1);
    }
    
    .form-input.error,
    .form-select.error,
    .form-textarea.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .mobile-nav-open {
      position: fixed;
      top: 80px;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: var(--space-6);
      z-index: var(--z-dropdown);
      animation: slideDown 0.3s ease-out;
    }
    
    .mobile-nav-open .nav-list {
      flex-direction: column;
      gap: var(--space-4);
    }
    
    .site-header.scrolled {
      box-shadow: var(--shadow-lg);
      background: rgba(255, 255, 255, 0.95);
    }
    
    .svg-fade-in {
      opacity: 0;
      animation: fadeIn 1s ease-out 0.5s forwards;
    }
    
    @keyframes slideInUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
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
    
    @keyframes slideDown {
      from {
        transform: translateY(-10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  </style>
`;

// =================================
// INITIALIZE APPLICATION
// =================================
document.addEventListener('DOMContentLoaded', () => {
  // Add additional styles
  document.head.insertAdjacentHTML('beforeend', additionalStyles);
  
  // Initialize the portfolio app
  new PortfolioApp();
});

// =================================
// PERFORMANCE OPTIMIZATION
// =================================
// Preload critical resources
const preloadResources = [
  'styles.css'
];

preloadResources.forEach(resource => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = resource;
  link.as = 'style';
  document.head.appendChild(link);
}); 