document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('currentYear');
    yearSpan.textContent = new Date().getFullYear();
}); 