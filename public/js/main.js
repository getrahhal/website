document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize internationalization after a brief delay to ensure all scripts are loaded
    setTimeout(() => {
        if (window.i18n) {
            window.i18n.updateLanguage();
        }
    }, 100);
}); 