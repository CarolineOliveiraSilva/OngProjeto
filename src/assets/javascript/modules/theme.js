const theme = {
    toggleButton: document.getElementById('botao-alternar-tema'),
    htmlElement: document.documentElement,

    init() {
        if (!this.toggleButton) return;

        this.toggleButton.addEventListener('click', () => {
            const currentTheme = this.htmlElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme);
        });

        const savedTheme = localStorage.getItem('theme') || 'light';
        this.applyTheme(savedTheme);
    },

    applyTheme(theme) {
        this.htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            this.toggleButton.setAttribute('aria-label', 'Ativar modo claro');
            this.toggleButton.textContent = '☀️';
        } else {
            this.toggleButton.setAttribute('aria-label', 'Ativar modo escuro');
            this.toggleButton.textContent = '🌙';
        }
    }
};

export { theme };