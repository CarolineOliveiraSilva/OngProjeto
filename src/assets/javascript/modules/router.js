import renderer from './renderer.js';

console.log('Objeto renderer importado:', renderer);

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

    const menuCheckbox = document.getElementById('menu-checkbox');
    
    if (menuCheckbox) {
        menuCheckbox.checked = false;
    }
},
async loadPage(path) {

    const classesDePagina = ['pagina-index','pagina-projetos', 'pagina-cadastro', 'pagina-doacoes'];
    this.appRoot.classList.remove(...classesDePagina);

let nomeDaPagina = 'index';
if (path !== '/' && path !== '/index.html') {

nomeDaPagina = path.split('/').pop().replace('.html', '');
}
this.appRoot.classList.add(`pagina-${nomeDaPagina}`);


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

export default router;