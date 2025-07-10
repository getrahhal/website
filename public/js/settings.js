class SettingsManager {
    constructor() {
        this.init();
    }

    init() {
        this.createSettingsPanel();
        this.setupEventListeners();
    }

    createSettingsPanel() {
        // Create settings panel
        const settingsPanel = document.createElement('div');
        settingsPanel.id = 'settingsPanel';
        settingsPanel.className = 'settings-panel';
        
        settingsPanel.innerHTML = `
            <div class="settings-content">
                <div class="settings-group">
                    <label for="languageSelector" data-i18n="language">Language</label>
                    <select id="languageSelector" class="settings-select">
                        <option value="en" data-i18n="english">English</option>
                        <option value="ar" data-i18n="arabic">العربية</option>
                    </select>
                </div>
                <div class="settings-group">
                    <label for="themeSelector" data-i18n="theme">Theme</label>
                    <select id="themeSelector" class="settings-select">
                        <option value="light" data-i18n="lightTheme">Light</option>
                        <option value="dark" data-i18n="darkTheme">Dark</option>
                        <option value="system" data-i18n="systemTheme">System</option>
                    </select>
                </div>
            </div>
        `;

        // Add to header or create a fixed position control
        const header = document.querySelector('header');
        if (header) {
            header.appendChild(settingsPanel);
        } else {
            // Create a floating settings button
            const settingsButton = document.createElement('button');
            settingsButton.id = 'settingsButton';
            settingsButton.className = 'settings-button';
            settingsButton.innerHTML = '⚙️';
            settingsButton.title = 'Settings';
            
            document.body.appendChild(settingsButton);
            document.body.appendChild(settingsPanel);
            
            // Toggle settings panel
            settingsButton.addEventListener('click', () => {
                settingsPanel.classList.toggle('active');
            });
        }
    }

    setupEventListeners() {
        // Language selector
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                window.i18n.setLanguage(e.target.value);
            });
            
            // Set initial value
            languageSelector.value = window.i18n.getCurrentLanguage();
        }

        // Theme selector
        const themeSelector = document.getElementById('themeSelector');
        if (themeSelector) {
            themeSelector.addEventListener('change', (e) => {
                window.themeManager.setTheme(e.target.value);
            });
            
            // Set initial value
            themeSelector.value = window.themeManager.getCurrentTheme();
        }

        // Close settings panel when clicking outside
        document.addEventListener('click', (e) => {
            const settingsPanel = document.getElementById('settingsPanel');
            const settingsButton = document.getElementById('settingsButton');
            
            if (settingsPanel && settingsButton && 
                !settingsPanel.contains(e.target) && 
                !settingsButton.contains(e.target)) {
                settingsPanel.classList.remove('active');
            }
        });
    }
}

// Initialize settings manager after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.settingsManager = new SettingsManager();
});