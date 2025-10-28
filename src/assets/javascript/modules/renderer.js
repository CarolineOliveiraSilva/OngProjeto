import dados from './data.js';
import templates from './templates.js';

const animations = {
    init() {
        setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visivel');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            const elementosAnimados = document.querySelectorAll('.animar');
            elementosAnimados.forEach(el => observer.observe(el));
        }, 100);
    }
};

const renderer = {
    renderHomePage() {
        const appRoot = document.getElementById('app-root');
        appRoot.innerHTML = templates.home;

        const frentesGrid = appRoot.querySelector('.frentes-grid');
        const impactoContainer = appRoot.querySelector('.impacto-container');

        dados.frentes.forEach(frente => {
            frentesGrid.innerHTML += templates.frenteCard(frente);
        });
        dados.impacto.forEach(item => {
            impactoContainer.innerHTML += templates.impactoItem(item);
        });

        animations.init();
    }
};

export default renderer;