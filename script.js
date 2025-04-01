// Particle.js configuration - more Apple-like subtle particles
particlesJS("particles-js", {
    particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: "#6d8dff" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.2, opacity_min: 0.1, sync: false } },
        size: { value: 2, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#6d8dff",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            bubble: { distance: 200, size: 3, duration: 2, opacity: 0.3, speed: 3 },
            push: { particles_nb: 2 }
        }
    },
    retina_detect: true
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Update particles color based on theme
    const particleColor = document.body.classList.contains('dark-theme') ? "#6d8dff" : "#4a6fff";
    pJSDom[0].pJS.particles.color.value = particleColor;
    pJSDom[0].pJS.particles.line_linked.color = particleColor;
    pJSDom[0].pJS.fn.particlesRefresh();
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
    
    // Show/hide back to top button
    const backToTop = document.getElementById('backToTop');
    if (scrollTop > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Reveal sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 150) {
            section.classList.add('visible');
        }
    });
    
    // Add parallax effect to skill and project cards
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        const scrollPosition = window.scrollY;
        const cardPosition = card.getBoundingClientRect().top + scrollPosition;
        const distance = scrollPosition - cardPosition;
        const translateY = distance * 0.05;
        
        if (Math.abs(translateY) < 25) {
            card.style.transform = `translateY(${translateY}px)`;
        }
    });
});

// Back to top functionality
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skill cards interaction
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('click', () => {
        // Create a pop-up when clicking on a skill
        const skillName = card.getAttribute('data-skill');
        alert(`${skillName}: Esta es una de mis principales habilidades!`);
    });
});

// Improved 3D tilt effect for project cards - more responsive
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    let timer;
    
    card.addEventListener('mousemove', e => {
        // Clear any existing timer to prevent animation lag
        if (timer) clearTimeout(timer);
        
        // Calculate the position
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        
        // Limit the rotation to a smaller range for more subtle effect
        const rotateX = ((y - centerY) / 15).toFixed(1);
        const rotateY = ((centerX - x) / 15).toFixed(1);
        
        // Apply the transform immediately without additional processing
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });
    
    card.addEventListener('mouseleave', () => {
        // Set a small timeout to prevent jittery transitions when mouse moves quickly
        timer = setTimeout(() => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }, 100);
    });
});

// Improved card hover effect
const allCards = document.querySelectorAll('.skill-card, .project-card, .contact-method');
allCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle glow effect on hover
        card.style.boxShadow = `0 10px 30px rgba(var(--primary-color), 0.2), 0 0 15px rgba(var(--primary-color), 0.15)`;
    });
    
    card.addEventListener('mouseleave', () => {
        // Remove glow effect
        card.style.boxShadow = '';
    });
});

// Initialize sections visibility
document.querySelectorAll('section').forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
        section.classList.add('visible');
    }
});
