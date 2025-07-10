class I18n {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        // Check if language is stored in localStorage
        const stored = localStorage.getItem('language');
        if (stored && ['en', 'ar'].includes(stored)) {
            return stored;
        }

        // Detect from browser language
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Check if browser language is Arabic
        if (browserLang.startsWith('ar')) {
            return 'ar';
        }
        
        // Default to English
        return 'en';
    }

    init() {
        this.updateLanguage();
        this.updateDirection();
    }

    setLanguage(lang) {
        if (!['en', 'ar'].includes(lang)) return;
        
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.updateLanguage();
        this.updateDirection();
    }

    updateLanguage() {
        const t = translations[this.currentLanguage];
        
        // Update document title
        document.title = t.title;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = t.metaDescription;
        }
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (t[key]) {
                element.textContent = t[key];
            }
        });
        
        // Update all elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (t[key]) {
                element.placeholder = t[key];
            }
        });
        
        // Update all elements with data-i18n-alt attribute
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            if (t[key]) {
                element.alt = t[key];
            }
        });
        
        // Update language selector
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = this.currentLanguage;
        }
    }

    updateDirection() {
        const html = document.documentElement;
        if (this.currentLanguage === 'ar') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
        } else {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Initialize i18n
window.i18n = new I18n();