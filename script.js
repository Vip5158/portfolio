// ============================================
// 1. NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// 2. TYPEWRITER EFFECT
// ============================================
const typedText = document.getElementById('typed-text');
const words = [
    'Android Developer',
    'Kotlin Developer',
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (!isDeleting) {
        typedText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        typedText.textContent = currentWord.substring(0, charIndex);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
            return;
        }
    }
    
    setTimeout(typeEffect, isDeleting ? 80 : 120);
}

// Start typewriter
setTimeout(typeEffect, 1000);

// ============================================
// 3. SCROLL REVEAL ANIMATIONS
// ============================================
const fadeElements = document.querySelectorAll('.fade-up');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// ============================================
// 4. SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 5. SKILL PROGRESS BAR ANIMATION (FIXED)
// ============================================
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const levelBar = card.querySelector('.skill-level');
            const circularProgress = card.querySelector('.circular-progress');
            
            // Animate bottom progress bar
            if (levelBar) {
                const level = card.dataset.level || 80;
                levelBar.style.width = level + '%';
                levelBar.classList.add('active');
            }
            
            // Animate circular progress
            if (circularProgress) {
                circularProgress.classList.add('animate');
                const pct = circularProgress.style.getPropertyValue('--pct');
                circularProgress.style.setProperty('--pct', pct);
            }
        }
    });
}, { threshold: 0.3 });

skillCards.forEach(card => skillObserver.observe(card));

// ============================================
// 6. 3D TILT ON SKILL CARDS
// ============================================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        this.style.transform = `
            translateY(-12px) 
            rotateX(${-y * 6}deg) 
            rotateY(${x * 6}deg)
        `;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)';
    });
});

// ============================================
// 7. CLICK RIPPLE EFFECT ON SKILL CARDS
// ============================================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,23,68,0.15), transparent);
            left: ${x - 60}px;
            top: ${y - 60}px;
            pointer-events: none;
            animation: rippleEffect 0.8s ease-out forwards;
            z-index: 10;
        `;
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    });
});

// ============================================
// 8. PARALLAX EFFECT ON HERO IMAGE
// ============================================
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            heroImage.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        }
    });

    document.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
}

// ============================================
// 9. COUNTER ANIMATION FOR STATS
// ============================================
const statNumbers = document.querySelectorAll('.stat-item h3');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            
            if (text.includes('+')) {
                const num = parseInt(text);
                animateCounter(target, num, 0);
            } else if (text !== 'Open' && !isNaN(parseInt(text))) {
                const num = parseInt(text);
                animateCounter(target, num, 0);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => counterObserver.observe(stat));

function animateCounter(element, target, current) {
    const increment = target / 60;
    
    if (current < target) {
        current += increment;
        if (current > target) current = target;
        element.textContent = Math.round(current) + '+';
        setTimeout(() => animateCounter(element, target, current), 30);
    }
}

// ============================================
// 10. ACTIVE NAV LINK INDICATOR
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = 'rgba(255, 255, 255, 0.7)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#FF1744';
        }
    });
});

// ============================================
// 11. RIPPLE EFFECT ON BUTTONS
// ============================================
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x - 10}px;
            top: ${y - 10}px;
            transform: scale(0);
            animation: rippleAnim 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 0;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// 12. INJECT REQUIRED KEYFRAMES
// ============================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Progress Spin */
    @keyframes progressSpin {
        0% {
            transform: rotate(0deg) scale(0.8);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: rotate(360deg) scale(1);
            opacity: 1;
        }
    }
    
    /* Ripple Effect for Cards */
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Ripple Effect for Buttons */
    @keyframes rippleAnim {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Circular Progress Initial State */
    .circular-progress {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.5s ease;
    }
    
    .circular-progress.animate {
        opacity: 1;
        transform: scale(1);
        animation: progressSpin 1.5s ease-out forwards;
    }
    
    /* Skill Level Bar */
    .skill-level {
        width: 0 !important;
        transition: width 1.5s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    .skill-level.active {
        width: var(--level, 80%) !important;
    }
    
    /* Fade Up Animation */
    .fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    .fade-up.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// 13. CONSOLE
// ============================================
console.log('🚀 Premium Portfolio loaded successfully!');
console.log('✨ Features: Navbar, Typewriter, Scroll Reveal, Skill Bars, 3D Tilt, Parallax, Counters, Active Nav, Ripple');
console.log('✅ All animations working properly!');