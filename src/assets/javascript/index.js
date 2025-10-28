const dados = {
    frentes: [
        { titulo: 'Reflorestamento', descricao: 'Atuamos diretamente na recuperação de áreas degradadas e na proteção de nascentes.' },
        { titulo: 'Educação Ambiental', descricao: 'Levamos conhecimento a escolas e comunidades, formando novos defensores da natureza.' },
        { titulo: 'Mobilização', descricao: 'Organizamos mutirões e eventos que unem a comunidade em prol de uma causa comum.' }
    ],
    impacto: [
        { numero: '+5.000', descricao: 'Árvores Plantadas' },
        { numero: '15', descricao: 'Nascentes Protegidas' },
        { numero: '500+', descricao: 'Voluntários Mobilizados' }
    ]
};

const templates = {
    home: `
        <section id="inicio" class="hero-banner">
            <div class="hero-conteudo">
                <h2>Acreditamos no poder da ação coletiva</h2>
                <p>Conheça a nossa história e junte-se a nós na missão de restaurar o meio ambiente.</p>
                <a href="#sobre-nos" class="botao">Descubra nossa missão</a>
            </div>
        </section>
        <section id="sobre-nos" class="secao animar">
            <div class="container sobre-container">
                <div class="sobre-imagem">
                    <img src="src/assets/imagens/logo2.png" alt="Logo da ONG EcoAção" width="200">
                </div>
                <div class="sobre-texto">
                    <h2 class="titulo-secao">Quem Somos</h2>
                    <p>A EcoAção nasceu em 2020, da união de cidadãos comuns preocupados com o futuro do nosso planeta. Somos um movimento de pessoas que transformam a indignação em ação, a preocupação em plantio e a esperança em resultados concretos.</p>
                    <p>Nossa missão é simples: restaurar ecossistemas, educar comunidades e provar que, juntos, podemos criar um futuro mais verde e sustentável.</p>
                </div>
            </div>
        </section>
        <section id="frentes" class="secao fundo-claro animar">
            <div class="container">
                <h2 class="titulo-secao">Como Colocamos Nossos Valores em Prática</h2>
                <div class="frentes-grid"></div>
                <div class="cta-central">
                    <a href="#src/pages/projetos.html" class="botao" data-link>Veja Nossos Projetos em Ação</a>
                </div>
            </div>
        </section>
        <section id="impacto" class="secao animar">
            <div class="container">
                <h2 class="titulo-secao">Nosso Impacto em Números</h2>
                <div class="impacto-container"></div>
            </div>
        </section>
        <section id="cta" class="secao fundo-claro animar">
            <div class="container cta-container">
                <h2 class="titulo-secao">Você é a peça que falta</h2>
                <p>Sua ajuda, seja com seu tempo ou com recursos, impulsiona nosso trabalho.</p>
                <div class="cta-botoes">
                    <a href="#src/pages/cadastro.html" class="botao" data-link>Quero ser Voluntário</a>
                    <a href="#src/pages/doacoes.html" class="botao" data-link>Fazer uma Doação</a>
                </div>
            </div>
        </section>
    `,
    frenteCard: (data) => `
        <div class="frente-card">
            <h3>${data.titulo}</h3>
            <p>${data.descricao}</p>
        </div>
    `,
    impactoItem: (data) => `
        <div class="impacto-item">
            <p class="numero">${data.numero}</p>
            <p class="descricao">${data.descricao}</p>
        </div>
    `
};
const formValidator = {
    init() {
        const appRoot = document.getElementById('app-root');
        appRoot.addEventListener('submit', (event) => {
            if (event.target.tagName === 'FORM') {
                event.preventDefault();
                const form = event.target;
                const isValid = this.validateForm(form);
                if (isValid) {
                    this.showSuccessMessage(form);
                }
            }
        });
    },
    validateForm(form) {
        let allFieldsValid = true;
        this.clearAllErrors(form);
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                allFieldsValid = false;
                const errorMessage = this.getErrorMessage(input);
                this.showError(input, errorMessage);
            }
        });
        return allFieldsValid;
    },
    getErrorMessage(input) {
        if (input.validity.valueMissing) return 'Este campo é obrigatório.';
        if (input.validity.typeMismatch) return 'Por favor, insira um e-mail válido.';
        if (input.validity.patternMismatch) return 'O formato está incorreto.';
        if (input.validity.tooShort) return `Deve ter no mínimo ${input.minLength} caracteres.`;
        return 'O valor inserido é inválido.';
    },
    showError(input, message) {
        input.classList.add('invalid');
        const parent = input.parentElement;
        let errorElement = parent.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            parent.appendChild(errorElement);
        }
        errorElement.textContent = message;
    },
    clearAllErrors(form) {
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
        form.querySelectorAll('.error-message').forEach(el => el.remove());
    },
    showSuccessMessage(form) {
        form.innerHTML = `<div class="success-message"><h2>Cadastro Realizado! ✅</h2><p>Obrigado por se juntar à nossa causa.</p></div>`;
    }
};

const animations = {
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visivel');
                }
            });
        }, { threshold: 0.1 });
        const elementosAnimados = document.querySelectorAll('.animar');
        elementosAnimados.forEach(el => observer.observe(el));
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

const router = {
    appRoot: document.getElementById('app-root'),
    async init() {
        await this.loadPage(window.location.pathname);
        document.body.addEventListener('click', event => {
            const link = event.target.closest('[data-link]');
            if (link) {
                event.preventDefault();
                this.navigate(link.href);
            }
        });
        window.addEventListener('popstate', () => {
            this.loadPage(window.location.pathname);
        });
    },
    navigate(url) {
        history.pushState(null, null, url);
        this.loadPage(url);
    },
    async loadPage(path) {
        const normalizedPath = (path === '/' || path.endsWith('/index.html')) ? '/' : path;
        if (normalizedPath === '/') {
            renderer.renderHomePage();
            return;
        }
        try {
            const response = await fetch(normalizedPath);
            if (!response.ok) throw new Error('Página não encontrada');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('main');
            if (newContent) {
                this.appRoot.innerHTML = newContent.innerHTML;
            } else {
                this.appRoot.innerHTML = '<p>Erro: Conteúdo não encontrado.</p>';
            }
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            this.appRoot.innerHTML = '<h2>Página não encontrada</h2><p>Não foi possível carregar o conteúdo solicitado.</p>';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    router.init();
    formValidator.init();
});

(function() {
    Object.assign(formValidator, {
        init() {
            const appRoot = document.getElementById('app-root');
            appRoot.addEventListener('submit', (event) => {
                if (event.target.tagName === 'FORM') {
                    event.preventDefault();
                    const form = event.target;
                    const isValid = this.validateForm(form);
                    if (isValid) {
                        this.showSuccessMessage(form);
                    }
                }
            });
        },
        validateForm(form) {
            let allFieldsValid = true;
            this.clearAllErrors(form);
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    allFieldsValid = false;
                    const errorMessage = this.getErrorMessage(input);
                    this.showError(input, errorMessage);
                }
            });
            return allFieldsValid;
        },
        getErrorMessage(input) {
            if (input.validity.valueMissing) return 'Este campo é obrigatório.';
            if (input.validity.typeMismatch) return 'Por favor, insira um e-mail válido.';
            if (input.validity.patternMismatch) return 'O formato está incorreto.';
            if (input.validity.tooShort) return `Deve ter no mínimo ${input.minLength} caracteres.`;
            return 'O valor inserido é inválido.';
        },
        showError(input, message) {
            input.classList.add('invalid');
            const parent = input.parentElement;
            let errorElement = parent.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                parent.appendChild(errorElement);
            }
            errorElement.textContent = message;
        },
        clearAllErrors(form) {
            form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
            form.querySelectorAll('.error-message').forEach(el => el.remove());
        },
        showSuccessMessage(form) {
            form.innerHTML = `<div class="success-message"><h2>Recebido com Sucesso! ✅</h2><p>Obrigado por sua contribuição à nossa causa.</p></div>`;
        }
    });
})();