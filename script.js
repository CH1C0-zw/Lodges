document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-list a');
    const heroImageBg = document.querySelector('.hero-image-bg');
    const heroHeader = document.querySelector('.hero-header');
    const heroContent = document.querySelector('.hero-content');
    
    // Function to open the menu
    const openMenu = () => {
        menuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    };
    
    // Function to close the menu
    const closeMenu = () => {
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    };
    
    // Menu Toggle Event Listeners
    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    
    // Close Menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Smooth Scroll Anchor Handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (hash === '#') return;
            
            e.preventDefault();
            
            // Smooth scroll to the target section
            document.querySelector(hash).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close menu if it was open
            closeMenu();
        });
    });
    
    // ==================================== 
    // SCROLL EFFECTS
    // ====================================
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Pixels before effects trigger
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 1. BLUR BACKGROUND when scrolling past threshold
        if (scrollTop > scrollThreshold && heroImageBg) {
            heroImageBg.classList.add('scrolled');
        } else if (heroImageBg) {
            heroImageBg.classList.remove('scrolled');
        }
        
        // 2. HIDE/SHOW HEADER based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling DOWN - hide header
            if (heroHeader) {
                heroHeader.classList.add('hidden');
            }
        } else if (scrollTop < lastScrollTop) {
            // Scrolling UP - show header
            if (heroHeader) {
                heroHeader.classList.remove('hidden');
            }
        }
        
        // 3. FADE OUT HERO CONTENT as you scroll
        if (heroContent && scrollTop < window.innerHeight) {
            const opacity = 1 - (scrollTop / (window.innerHeight * 0.8));
            heroContent.style.opacity = Math.max(0, opacity);
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Optional: Remove transitions on initial load to prevent animation flash
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});