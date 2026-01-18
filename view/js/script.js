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

// Note: Header scroll effect is now handled in the HTML script tag