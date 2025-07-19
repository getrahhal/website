// Get URL parameters and update greeting message
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('hi');
    const greetingElement = document.getElementById('greeting-message');
    
    if (nameParam) {
        // Decode the name parameter (handles URL encoding like Omar+Mohammed)
        const decodedName = decodeURIComponent(nameParam.replace(/\+/g, ' '));
        greetingElement.textContent = `Hi there ${decodedName}! 👋`;
    } else {
        greetingElement.textContent = 'Hi there! 👋';
    }
});

// Force HTTPS redirect (for production)
if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    location.replace('https:' + window.location.href.substring(window.location.protocol.length));
} 