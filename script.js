 // script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const resetBtn = document.getElementById('reset-btn');
    const loveMessage = document.getElementById('love-message');
    const questionText = document.getElementById('question-text');
    const valentineGif = document.getElementById('valentine-gif');
    const buttonsContainer = document.querySelector('.buttons-container');
    
    // State variables
    let isMobile = false;
    let noBtnEscaped = false;
    let yesClicked = false;
    
    // Check if device is mobile
    function checkIfMobile() {
        isMobile = window.innerWidth <= 768 || 
                   ('ontouchstart' in window || navigator.maxTouchPoints > 0);
        return isMobile;
    }
    
    // Initialize
    checkIfMobile();
    
    // Valentine's GIFs for different states
    const gifs = {
        default: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
        yesClicked: "https://media.giphy.com/media/26tknCqiJrBQG6DrC/giphy.gif",
        noEscape: "https://media.giphy.com/media/3o7TKz8aXhq4kfQFDq/giphy.gif"
    };
    
    // Function to move the "No" button to a random position
    function moveNoButton() {
        if (yesClicked) return; // Don't move if Yes was already clicked
        
        // Get container and button dimensions
        const containerRect = buttonsContainer.getBoundingClientRect();
        const noBtnRect = noBtn.getBoundingClientRect();
        const yesBtnRect = yesBtn.getBoundingClientRect();
        
        // Calculate maximum positions to keep button within container
        const maxX = containerRect.width - noBtnRect.width;
        const maxY = containerRect.height - noBtnRect.height;
        
        // Generate random position
        let newX, newY;
        let attempts = 0;
        const maxAttempts = 20;
        
        do {
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
            attempts++;
            
            // Ensure we don't overlap with the Yes button
            const overlap = (
                newX < yesBtnRect.right - containerRect.left && 
                newX + noBtnRect.width > yesBtnRect.left - containerRect.left &&
                newY < yesBtnRect.bottom - containerRect.top && 
                newY + noBtnRect.height > yesBtnRect.top - containerRect.top
            );
            
            // Ensure minimum distance from current position for natural movement
            const currentX = parseFloat(noBtn.style.left) || 0;
            const currentY = parseFloat(noBtn.style.top) || 0;
            const distance = Math.sqrt(Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2));
            
            // If no overlap and reasonable distance, or we've tried too many times
            if ((!overlap && distance > 30) || attempts >= maxAttempts) {
                break;
            }
        } while (attempts < maxAttempts);
        
        // Apply the new position with smooth transition
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        
        // Change GIF when No button escapes
        if (!noBtnEscaped) {
            valentineGif.src = gifs.noEscape;
            noBtnEscaped = true;
            questionText.textContent = "Please say yes! ❤️";
        }
    }
    
    // Function to handle Yes button click
    function handleYesClick() {
        if (yesClicked) return;
        
        yesClicked = true;
        
        // Show love message
        loveMessage.classList.remove('hidden');
        
        // Change GIF and question text
        valentineGif.src = gifs.yesClicked;
        questionText.textContent = "Yay! I knew it! ❤️";
        
        // Make No button stop moving and show it in original position
        noBtn.style.position = 'relative';
        noBtn.style.left = '0';
        noBtn.style.top = '0';
        noBtn.style.transition = 'all 0.5s ease';
        
        // Remove event listeners from No button
        noBtn.removeEventListener('mouseenter', moveNoButton);
        noBtn.removeEventListener('touchstart', handleTouchStart);
        
        // Change button styles
        yesBtn.innerHTML = '<i class="fas fa-heart"></i> I love you too!';
        yesBtn.style.fontSize = '1.1rem';
        noBtn.style.opacity = '0.6';
        noBtn.style.cursor = 'default';
    }
    
    // Function to handle reset
    function handleReset() {
        yesClicked = false;
        noBtnEscaped = false;
        
        // Hide love message
        loveMessage.classList.add('hidden');
        
        // Reset GIF and text
        valentineGif.src = gifs.default;
        questionText.textContent = "Do you love me?";
        
        // Reset Yes button
        yesBtn.innerHTML = '<i class="fas fa-heart"></i> Yes';
        yesBtn.style.fontSize = '';
        
        // Reset No button
        noBtn.style.position = 'fixed';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.opacity = '';
        noBtn.style.cursor = '';
        noBtn.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
        
        // Re-add event listeners
        setupEventListeners();
    }
    
    // Touch start handler for mobile
    function handleTouchStart(e) {
        e.preventDefault();
        moveNoButton();
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Yes button click
        yesBtn.addEventListener('click', handleYesClick);
        
        // No button hover (desktop) or touch (mobile)
        if (isMobile) {
            noBtn.addEventListener('touchstart', handleTouchStart);
        } else {
            noBtn.addEventListener('mouseenter', moveNoButton);
        }
        
        // Reset button
        resetBtn.addEventListener('click', handleReset);
        
        // Also make No button escape when cursor gets close (for desktop)
        if (!isMobile) {
            document.addEventListener('mousemove', function(e) {
                if (yesClicked) return;
                
                const noBtnRect = noBtn.getBoundingClientRect();
                const cursorX = e.clientX;
                const cursorY = e.clientY;
                
                // Calculate distance between cursor and button center
                const btnCenterX = noBtnRect.left + noBtnRect.width / 2;
                const btnCenterY = noBtnRect.top + noBtnRect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(cursorX - btnCenterX, 2) + 
                    Math.pow(cursorY - btnCenterY, 2)
                );
                
                // If cursor is within 100px of button, move it
                if (distance < 100) {
                    moveNoButton();
                }
            });
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        checkIfMobile();
        
        // Re-setup event listeners for No button based on new device type
        noBtn.removeEventListener('mouseenter', moveNoButton);
        noBtn.removeEventListener('touchstart', handleTouchStart);
        
        if (isMobile) {
            noBtn.addEventListener('touchstart', handleTouchStart);
        } else {
            noBtn.addEventListener('mouseenter', moveNoButton);
        }
        
        // If screen is resized while No button is in a fixed position,
        // make sure it stays within bounds
        if (noBtn.style.position === 'fixed') {
            const containerRect = buttonsContainer.getBoundingClientRect();
            const noBtnRect = noBtn.getBoundingClientRect();
            
            let left = parseFloat(noBtn.style.left) || 0;
            let top = parseFloat(noBtn.style.top) || 0;
            
            // Ensure button stays within container
            if (left < 0) left = 0;
            if (top < 0) top = 0;
            if (left > containerRect.width - noBtnRect.width) {
                left = containerRect.width - noBtnRect.width;
            }
            if (top > containerRect.height - noBtnRect.height) {
                top = containerRect.height - noBtnRect.height;
            }
            
            noBtn.style.left = `${left}px`;
            noBtn.style.top = `${top}px`;
        }
    });
    
    // Initialize the application
    setupEventListeners();
    
    // Add some initial confetti effect when page loads
    setTimeout(() => {
        createHearts();
    }, 500);
    
    // Function to create floating hearts
    function createHearts() {
        const heartsContainer = document.querySelector('.card');
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.position = 'absolute';
            heart.style.color = 'rgba(255, 77, 148, 0.2)';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.zIndex = '0';
            heart.style.animation = `float ${Math.random() * 3 + 3}s infinite ease-in-out`;
            heart.style.animationDelay = Math.random() * 2 + 's';
            
            heartsContainer.appendChild(heart);
        }
        
        // Add floating animation to CSS if not already present
        if (!document.querySelector('#float-animation')) {
            const style = document.createElement('style');
            style.id = 'float-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
});