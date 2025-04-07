// Enhanced Particle.js configuration for a more dynamic background
particlesJS("particles-js", {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 1000 } },
        color: { value: ["#6d8dff", "#38caff", "#ff64c8", "#836FFF"] },
        shape: { 
            type: ["circle", "triangle", "edge"],
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 }
        },
        opacity: { 
            value: 0.4, 
            random: true, 
            anim: { enable: true, speed: 0.3, opacity_min: 0.1, sync: false } 
        },
        size: { 
            value: 5, 
            random: true, 
            anim: { enable: true, speed: 2, size_min: 0.5, sync: false } 
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#6d8dff",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
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
            bubble: { distance: 200, size: 6, duration: 2, opacity: 0.4, speed: 3 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});

// Add floating geometric shapes to the background
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    
    // Create dynamic floating elements
    function createFloatingElements() {
        const container = document.querySelector('.particle-container');
        const shapes = ['circle', 'square', 'triangle', 'hexagon'];
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
        
        // Create 15 floating elements
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            element.classList.add('floating-element', shape);
            element.style.backgroundColor = color;
            element.style.opacity = (Math.random() * 0.12 + 0.03).toString(); // 0.03 to 0.15
            
            // Random size between 20 and 120px
            const size = Math.floor(Math.random() * 100 + 20);
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            
            // Random position
            element.style.left = `${Math.random() * 100}vw`;
            element.style.top = `${Math.random() * 100}vh`;
            
            // Random animation duration between 15 and 40 seconds
            const duration = Math.random() * 25 + 15;
            element.style.animation = `float ${duration}s ease-in-out infinite`;
            element.style.animationDelay = `${Math.random() * -20}s`;
            
            container.appendChild(element);
        }
    }
});

// Theme toggle with updated particle colors
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Update particles for dark/light theme
    const particleColors = document.body.classList.contains('dark-theme') 
        ? ["#6d8dff", "#38caff", "#ff64c8", "#A876FF"] 
        : ["#4a6fff", "#38caff", "#ff64c8", "#836FFF"];
        
    pJSDom[0].pJS.particles.color.value = particleColors;
    pJSDom[0].pJS.particles.line_linked.color = particleColors[0];
    pJSDom[0].pJS.fn.particlesRefresh();
    
    // Update floating elements colors
    document.querySelectorAll('.floating-element').forEach(element => {
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
        element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    });
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
    
    // Skip 3D tilt effect for UX project cards
    if (card.closest('#ux-projects')) {
        return;
    }
    
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
    // Check if the card contains a link
    const linkElement = card.querySelector('a');
    const hasLink = linkElement !== null;
    
    // Set cursor style based on whether the card has a link
    if (hasLink) {
        card.style.cursor = 'pointer';
    } else {
        card.style.cursor = 'default';
    }
    
    card.addEventListener('mouseenter', () => {
        // Add subtle glow effect on hover, but less intense for UX project cards
        if (card.closest('#ux-projects')) {
            card.style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.1)`;
        } else {
            card.style.boxShadow = `0 10px 30px rgba(var(--primary-color), 0.2), 0 0 15px rgba(var(--primary-color), 0.15)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        // Remove glow effect
        card.style.boxShadow = '';
    });
    
    // Make the entire card clickable if it contains a link
    if (hasLink) {
        card.addEventListener('click', (e) => {
            // Only navigate if the click wasn't directly on the link element
            // This prevents duplicate navigation when clicking the actual link
            if (!e.target.closest('a')) {
                const href = linkElement.getAttribute('href');
                const target = linkElement.getAttribute('target');
                
                if (target === '_blank') {
                    window.open(href, '_blank');
                } else {
                    window.location.href = href;
                }
            }
        });
    }
});

// Update skill cards cursor style
skillCards.forEach(card => {
    // We don't want skill cards to show pointer cursor unless they have links
    if (!card.querySelector('a')) {
        card.style.cursor = 'default';
    }
});

// Initialize sections visibility
document.querySelectorAll('section').forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
        section.classList.add('visible');
    }
});

// Add these functions at the end of your existing script.js file

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});