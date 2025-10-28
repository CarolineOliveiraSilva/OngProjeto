import renderer from './renderer.js';

const router = {
    appRoot: document.getElementById('app-root'),
    basePath: window.location.hostname.includes('github.io') ? '/OngProjeto' : '',
    async init() {
        window.addEventListener('hashchange', () => this.handleRouteChange());
        await this.handleRouteChange();

        document.body.addEventListener('click', event => {
            const link = event.target.closest('[data-link]');
            if (link) {
                event.preventDefault();
                window.location.hash = link.getAttribute('href');
            }
        });
    },

    async handleRouteChange() {
    const path = window.location.hash.substring(1) || '/';
    const menuCheckbox = document.getElementById('menu-checkbox');
    
    if (menuCheckbox) {
        menuCheckbox.checked = false;
    }

    const classesDePagina = ['pagina-index', 'pagina-projetos', 'pagina-cadastro', 'pagina-doacoes'];
    this.appRoot.classList.remove(...classesDePagina);
    
    const nomeDaPagina = path === '/' ? 'index' : path.split('/').pop().replace('.html', '');
    this.appRoot.classList.add(`pagina-${nomeDaPagina}`);
    
    if (path === '/') {
        renderer.renderHomePage();
        return;
    }

    try {
        const response = await fetch(this.basePath + path);
        
        if (!response.ok) throw new Error('Página não encontrada');
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('main');
        
        if (newContent) {
            this.appRoot.innerHTML = newContent.innerHTML;

            const images = this.appRoot.querySelectorAll('img');
            images.forEach(img => {
                const srcAtual = img.getAttribute('src');
                if (srcAtual.startsWith('../')) {
                    img.src = this.basePath + '/src/' + srcAtual.substring(3);
                }
            });
        } else {
            this.appRoot.innerHTML = '<p>Erro: Conteúdo não encontrado no arquivo HTML.</p>';
        }
    } catch (error) {
        console.error('Erro ao carregar a página:', error);
        this.appRoot.innerHTML = '<h2>Página não encontrada</h2><p>Não foi possível carregar o conteúdo solicitado.</p>';
    }
}
};

export default router;