class ThemeManager {
    constructor() {
        this.currentTheme = this.detectTheme();
        this.init();
    }

    detectTheme() {
        // Check if theme is stored in localStorage
        const stored = localStorage.getItem('theme');
        if (stored && ['light', 'dark', 'system'].includes(stored)) {
            return stored;
        }
        
        // Default to system
        return 'system';
    }

    init() {
        this.applyTheme();
        this.setupSystemThemeListener();
    }

    setTheme(theme) {
        if (!['light', 'dark', 'system'].includes(theme)) return;
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.applyTheme();
        
        // Update theme selector
        const themeSelector = document.getElementById('themeSelector');
        if (themeSelector) {
            themeSelector.value = theme;
        }
    }

    applyTheme() {
        const html = document.documentElement;
        
        if (this.currentTheme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            html.setAttribute('data-theme', this.currentTheme);
        }
    }

    setupSystemThemeListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', () => {
            if (this.currentTheme === 'system') {
                this.applyTheme();
            }
        });
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize theme manager
window.themeManager = new ThemeManager();