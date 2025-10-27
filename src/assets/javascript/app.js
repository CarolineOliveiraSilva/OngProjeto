import router from './modules/router.js';
import formValidator from './modules/validator.js';
import menu from './modules/menu.js';
import projetosModal from './modules/projetos.js';


document.addEventListener('DOMContentLoaded', () => {
    menu.init();
    router.init();
    formValidator.init();
    projetosModal.init();
    
    console.log("Aplicação iniciada com sucesso! Todos os módulos carregados.");
});