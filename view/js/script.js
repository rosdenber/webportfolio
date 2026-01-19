// Loading screen with typewriter effect
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const typewriterText = document.getElementById('typewriterText');
    
    // Typewriter effect for "ROZ"
    const text = "ROZ";
    let i = 0;
    typewriterText.textContent = ""; // Start with empty text
    
    // Add blinking cursor initially
    typewriterText.classList.add("typewriter-text");
    
    const interval = setInterval(() => {
        typewriterText.textContent = text.slice(0, i + 1);
        i++;
        
        if (i >= text.length) {
            clearInterval(interval);
            
            // Keep the cursor blinking for a moment after typing completes
            setTimeout(() => {
                // Remove blinking cursor
                typewriterText.classList.remove("typewriter-text");
                
                // Add fade-out effect to the loading screen
                loadingScreen.classList.add("transition-opacity", "duration-1000");
                loadingScreen.style.pointerEvents = "none"; // Disable pointer events during transition
                
                // Fade out the loading screen
                setTimeout(() => {
                    loadingScreen.classList.add("opacity-0");
                    
                    // Hide loading screen and show main content after fade-out
                    setTimeout(() => {
                        loadingScreen.style.display = "none";
                        
                        // Show main content
                        const mainContent = document.getElementById('mainContent');
                        mainContent.style.display = "block";
                        
                        // Add fade-in effect to main content
                        mainContent.classList.add("opacity-0", "transition-opacity", "duration-500");
                        setTimeout(() => {
                            mainContent.classList.remove("opacity-0");
                        }, 10);
                    }, 500);
                }, 10);
            }, 1000); // Wait 1 second after typing completes
        }
    }, 300); // Type each letter every 300ms
});

// Scroll-triggered animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            
            // Add animation to child elements as well
            const childElements = entry.target.querySelectorAll('.animate-on-scroll');
            childElements.forEach(el => {
                // Add staggered delays for child elements
                const delay = el.dataset.animationDelay || 0;
                setTimeout(() => {
                    el.classList.add('animate-fadeInUp');
                }, delay);
            });
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('#about, #skills, #projects, #reflection');
sections.forEach(section => {
    // Add animation class initially but with opacity 0
    section.classList.add('opacity-0', 'transition-opacity', 'duration-700');
    observer.observe(section);
});

// Also observe specific elements within sections for individual animations
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(element => {
    element.classList.add('opacity-0', 'transition-opacity', 'duration-700');
});

// Create floating particles for specific sections
function createSectionParticles() {
    const sections = ['about', 'skills', 'projects', 'reflection'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const particleContainer = document.createElement('div');
            particleContainer.className = 'section-particle-container';
            
            // Create 8-10 particles per section for better coverage
            const particleCount = 8 + Math.floor(Math.random() * 3);
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'section-particle';
                
                // Random size class
                const sizes = ['small', 'medium', 'large'];
                const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
                particle.classList.add(sizeClass);
                
                // Random horizontal position
                particle.style.left = `${Math.random() * 100}%`;
                
                // Random starting vertical position (bottom 60% of section)
                const startY = 40 + Math.random() * 60; // 40-100% from top
                particle.style.setProperty('--start-y', `${startY}%`);
                
                // Set initial position using CSS variable
                particle.style.top = `var(--start-y)`;
                
                // Random delay for staggered animation
                const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4'];
                const delayClass = delays[Math.floor(Math.random() * delays.length)];
                particle.classList.add(delayClass);
                
                // Random animation duration variation
                const baseDuration = sizeClass === 'small' ? 15 : sizeClass === 'medium' ? 18 : 22;
                const variation = (Math.random() - 0.5) * 4; // +/- 2 seconds
                particle.style.animationDuration = `${baseDuration + variation}s`;
                
                particleContainer.appendChild(particle);
            }
            
            section.appendChild(particleContainer);
        }
    });
}

// Initialize section particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createSectionParticles();
});

// Note: Header scroll effect is now handled in the HTML script tag