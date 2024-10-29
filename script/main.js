// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    initializeSmoothScrolling();
    initializeTelegramLink();
    initializeLazyVideoLoading();
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Telegram link handling
function initializeTelegramLink() {
    const telegramLink = document.querySelector('a');
    
    if (telegramLink) {
        telegramLink.addEventListener('click', handleTelegramLink);
    }
}

document.querySelector('.method-btn').addEventListener('click', function() {
    // Show the Telegram payment form
    document.getElementById('telegram-form').style.display = 'block';
});


function handleTelegramLink(e) {
    e.preventDefault();
    
    const link = this.href;
    if (link) {
        // Display result
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.textContent = `Attempted to open: ${link}`;
        }
        
        // Navigate to the link
        try {
            window.location.href = link;
        } catch (error) {
            console.error('Error navigating to link:', error);
        }
    }
}

// Lazy loading video functionality
function initializeLazyVideoLoading() {
    const video = document.querySelector('video');
    
    if (!video) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadVideo(entry.target, observer);
            }
        });
    }, observerOptions);

    videoObserver.observe(video);
}

function loadVideo(videoElement, observer) {
    if (videoElement.dataset.src) {
        videoElement.src = videoElement.dataset.src;
        observer.unobserve(videoElement);
    }
}