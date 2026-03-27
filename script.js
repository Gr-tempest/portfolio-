// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ================ MOBILE NAVIGATION ================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger icon
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
    
    // ================ NAVBAR SCROLL EFFECT ================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ================ SMOOTH SCROLLING ================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ================ ANIMATION ON SCROLL ================
    const animatedElements = document.querySelectorAll('.fade-in, .project-card, .skill, .contact-item');
    
    if (animatedElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Add a small delay based on index for staggered animation
                    const index = Array.from(animatedElements).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.05}s`;
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            fadeObserver.observe(element);
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
    }
    
    // ================ FORM SUBMISSION ================
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animate button on submit
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    submitBtn.style.transform = 'scale(1)';
                }, 200);
            }
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-linecap="round"/>
                </svg>
                Thank you for your message! I'll get back to you soon.
            `;
            
            form.appendChild(successMessage);
            
            // Animate success message
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                successMessage.style.transition = 'all 0.5s ease';
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 100);
            
            // Reset form and remove success message after 5 seconds
            form.reset();
            
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 5000);
        });
    }
    
    // ================ PARALLAX EFFECT ================
    const heroIcon = document.querySelector('.hero-icon');
    if (heroIcon) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroIcon.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }
    
    // Mouse move parallax for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ================ ACTIVE NAVIGATION ITEM ON SCROLL ================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (sections.length > 0 && navItems.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // ================ THEME TOGGLE ================
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Toggle icons with animation
            if (sunIcon && moonIcon) {
                if (sunIcon.style.display === 'none' || !sunIcon.style.display) {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                    sunIcon.style.animation = 'spinIn 0.5s ease';
                } else {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                    moonIcon.style.animation = 'spinIn 0.5s ease';
                }
            }
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            themeToggle.click();
        }
    }
    
    // ================ SCROLL INDICATOR ================
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });
    
    // ================ MAGNETIC EFFECT FOR NAV ITEMS ================
    const navItemsMagnetic = document.querySelectorAll('.nav-item');
    navItemsMagnetic.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // ================ RIPPLE EFFECT ================
    navItemsMagnetic.forEach(item => {
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size/2 + 'px';
            ripple.style.top = e.clientY - rect.top - size/2 + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ================ SLIDING NAVIGATION INDICATOR ================
    const indicator = document.querySelector('.nav-indicator');
    const nav = document.getElementById('navbar');
    
    // Function to update indicator position
    function updateIndicator(element) {
        if (!indicator || !element || !nav) return;
        
        const rect = element.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        
        // Calculate position relative to nav
        const left = rect.left - navRect.left;
        const width = rect.width;
        
        // Update indicator with smooth animation
        indicator.style.left = left + 'px';
        indicator.style.width = width + 'px';
        indicator.style.opacity = '1';
        
        // Add glow effect
        indicator.style.boxShadow = '0 0 20px rgba(67, 97, 238, 0.7)';
    }
    
    // Function to find active section based on scroll position
    function findActiveSection() {
        const scrollPosition = window.scrollY + 200; // Offset for better UX
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return section.getAttribute('id');
            }
        }
        
        // If at the top, return home
        if (window.scrollY < 100) {
            return 'home';
        }
        
        return null;
    }
    
    // Function to set active nav item
    function setActiveNavItem(sectionId) {
        if (!sectionId) return;
        
        document.querySelectorAll('.nav-item').forEach(item => {
            const itemSection = item.getAttribute('data-section') || 
                               (item.getAttribute('href') ? item.getAttribute('href').substring(1) : '');
            
            if (itemSection === sectionId || 
                (sectionId === '' && itemSection === 'home') ||
                (item.getAttribute('href') === `#${sectionId}`)) {
                
                // Remove active class from all
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                
                // Add active class to current
                item.classList.add('active');
                
                // Update indicator position
                updateIndicator(item);
            }
        });
    }
    
    // Handle click on nav items for sliding indicator
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't prevent default for external links
            if (this.getAttribute('href') && this.getAttribute('href').includes('.html')) {
                return;
            }
            
            e.preventDefault();
            
            // Update active state
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Move indicator to clicked item
            updateIndicator(this);
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Update indicator on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const activeSection = findActiveSection();
            setActiveNavItem(activeSection);
        }, 50);
    });
    
    // Initial indicator position
    setTimeout(() => {
        // Check if there's a hash in URL
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const activeItem = document.querySelector(`.nav-item[href="#${hash}"], .nav-item[data-section="${hash}"]`);
            if (activeItem) {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                activeItem.classList.add('active');
                updateIndicator(activeItem);
            }
        } else {
            // Default to home
            const homeItem = document.querySelector('.nav-item[href="#home"], .nav-item[data-section="home"]');
            if (homeItem) {
                homeItem.classList.add('active');
                updateIndicator(homeItem);
            }
        }
    }, 100);
    
    // Update indicator on window resize
    window.addEventListener('resize', () => {
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) {
            updateIndicator(activeItem);
        }
    });
    
    // Add hover effect to move indicator temporarily
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active') && indicator) {
                // Temporarily move indicator to hovered item
                const rect = this.getBoundingClientRect();
                const navRect = nav.getBoundingClientRect();
                const left = rect.left - navRect.left;
                const width = rect.width;
                
                indicator.style.transition = 'all 0.3s ease';
                indicator.style.left = left + 'px';
                indicator.style.width = width + 'px';
                indicator.style.opacity = '0.7';
                indicator.style.background = 'linear-gradient(90deg, #4ecdc4, #4361ee)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Return indicator to active item
            const activeItem = document.querySelector('.nav-item.active');
            if (activeItem && indicator) {
                indicator.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                updateIndicator(activeItem);
                indicator.style.opacity = '1';
                indicator.style.background = 'linear-gradient(90deg, #4361ee, #4ecdc4)';
            }
        });
    });
    
    // Parallax effect on logo
    const logo = document.querySelector('.logo-img');
    if (logo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            logo.style.transform = `rotate(${scrolled * 0.1}deg) scale(${1 + scrolled * 0.0005})`;
        });
    }
    
    // ================ ADD STYLES DYNAMICALLY ================
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            margin-top: 1.5rem;
            font-weight: 500;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideInUp 0.5s ease;
            z-index: 1000;
        }
        
        .success-message svg {
            width: 24px;
            height: 24px;
            animation: checkmark 0.5s ease-in-out;
        }
        
        @keyframes checkmark {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-links a.active {
            color: var(--primary, #4361ee);
            font-weight: 600;
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
        
        .hamburger.active i {
            transform: rotate(90deg);
            transition: transform 0.3s ease;
        }
        
        .scroll-indicator {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #4361ee, #4ecdc4, #f72585);
            z-index: 9999;
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
            width: 100px;
            height: 100px;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes spinIn {
            from {
                transform: rotate(-180deg) scale(0);
            }
            to {
                transform: rotate(0) scale(1);
            }
        }
        
        .nav-item {
            position: relative;
            overflow: hidden;
        }
        
        .nav-indicator {
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        @keyframes iconPulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
        }
        
        @keyframes slideInNav {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes shimmer {
            0% {
                transform: translateX(-100%) rotate(45deg);
            }
            100% {
                transform: translateX(100%) rotate(45deg);
            }
        }
        
        .nav-item::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent
            );
            transform: rotate(45deg);
            animation: shimmer 3s infinite;
            pointer-events: none;
        }
        
        .nav-item.active::after {
            animation: shimmer 2s infinite;
        }
        
        .nav-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #f72585;
            color: white;
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: 10px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
        
        /* Dark mode styles */
        body.dark-mode {
            background-color: #1a1a1a;
            color: #ffffff;
        }
        
        body.dark-mode .navbar {
            background: rgba(26, 26, 26, 0.95);
        }
        
        body.dark-mode .project-card {
            background: #2d2d2d;
        }
    `;
    
    document.head.appendChild(style);
});