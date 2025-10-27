const menu = {
    init() {
        const projetosMenuItem = document.getElementById('projetos-menu-item');
        if (projetosMenuItem) {
            const projetosLink = projetosMenuItem.querySelector('a');
            projetosLink.addEventListener('click', (event) => {
                const menuToggle = document.querySelector('.menu-toggle');
                if (window.getComputedStyle(menuToggle).display !== 'none') {
                    event.preventDefault();
                    projetosMenuItem.classList.toggle('submenu-aberto');
                }
            });
        }
    }
};

export default menu;