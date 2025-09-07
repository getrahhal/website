class SettingsPanel {
    constructor() {
        this.panel = null;
        this.button = null;
        this.init();
    }

    init() {
        this.createSettingsButton();
        this.createSettingsPanel();
        this.setupEventListeners();
        this.updateActiveStates();
    }

    createSettingsButton() {
        // Check if button already exists
        if (document.getElementById('settingsButton')) {
            this.button = document.getElementById('settingsButton');
            return;
        }

        this.button = document.createElement('button');
        this.button.id = 'settingsButton';
        this.button.className = 'settings-button';
        this.button.setAttribute('aria-label', 'Settings');
        this.button.innerHTML = '⚙️';
        document.body.appendChild(this.button);
    }

    createSettingsPanel() {
        // Check if panel already exists
        if (document.getElementById('settingsPanel')) {
            this.panel = document.getElementById('settingsPanel');
            return;
        }

        this.panel = document.createElement('div');
        this.panel.id = 'settingsPanel';
        this.panel.className = 'settings-panel';
        
        this.panel.innerHTML = `
            <div class="settings-content">
                <div class="settings-group">
                    <label data-i18n="language">Language</label>
                    <div class="settings-options">
                        <button class="settings-option" data-language="en" data-i18n="english">English</button>
                        <button class="settings-option" data-language="ar" data-i18n="arabic">العربية</button>
                    </div>
                </div>
                <div class="settings-group">
                    <label data-i18n="theme">Theme</label>
                    <div class="settings-options">
                        <button class="settings-option" data-theme="light" data-i18n="lightTheme">Light</button>
                        <button class="settings-option" data-theme="dark" data-i18n="darkTheme">Dark</button>
                        <button class="settings-option" data-theme="system" data-i18n="systemTheme">System</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.panel);
    }

    setupEventListeners() {
        // Toggle panel
        this.button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.panel.classList.toggle('active');
        });

        // Language options
        const languageButtons = this.panel.querySelectorAll('[data-language]');
        languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const language = button.getAttribute('data-language');
                if (window.i18n) {
                    window.i18n.setLanguage(language);
                }
                this.updateActiveStates();
            });
        });

        // Theme options
        const themeButtons = this.panel.querySelectorAll('[data-theme]');
        themeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const theme = button.getAttribute('data-theme');
                if (window.themeManager) {
                    window.themeManager.setTheme(theme);
                }
                this.updateActiveStates();
            });
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.panel.contains(e.target) && !this.button.contains(e.target)) {
                this.panel.classList.remove('active');
            }
        });
    }

    updateActiveStates() {
        // Update language buttons
        const currentLanguage = window.i18n ? window.i18n.getCurrentLanguage() : 'en';
        const languageButtons = this.panel.querySelectorAll('[data-language]');
        languageButtons.forEach(button => {
            if (button.getAttribute('data-language') === currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Update theme buttons
        const currentTheme = window.themeManager ? window.themeManager.getCurrentTheme() : 'light';
        const themeButtons = this.panel.querySelectorAll('[data-theme]');
        themeButtons.forEach(button => {
            if (button.getAttribute('data-theme') === currentTheme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Re-translate the panel content
        if (window.i18n && window.i18n.translatePage) {
            window.i18n.translatePage();
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.settingsPanel = new SettingsPanel();
    });
} else {
    window.settingsPanel = new SettingsPanel();
}