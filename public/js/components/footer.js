class Footer {
    constructor() {
        this.init();
    }

    init() {
        this.createFooter();
        this.updateYear();
    }

    createFooter() {
        // Check if footer already exists
        const existingFooter = document.querySelector('footer');
        if (existingFooter) {
            // Update existing footer if needed
            this.updateYear();
            return;
        }

        const footer = document.createElement('footer');
        footer.innerHTML = `
            <div class="footer-content">
                <p>&copy; <span id="currentYear"></span> Rahhal. <span data-i18n="copyright">All rights reserved.</span></p>
                <p class="footer-links">
                    <a href="/privacy" data-i18n="privacyLink">Privacy Policy</a>
                </p>
                <p class="built-with" data-i18n="builtWith">Built with ❤️ in 🇸🇦</p>
            </div>
        `;

        document.body.appendChild(footer);
        this.updateYear();
    }

    updateYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.footer = new Footer();
    });
} else {
    window.footer = new Footer();
}