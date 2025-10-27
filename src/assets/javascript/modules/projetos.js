const projetosModal = {
    init() {
        this.modalOverlay = document.getElementById('modal-voluntario');
        this.modalNomeProjeto = document.getElementById('modal-nome-projeto');
        this.passo1 = document.getElementById('modal-passo-1');
        this.passo2 = document.getElementById('modal-passo-2');
        this.btnConfirmar = document.getElementById('btn-ja-cadastrado');
        this.btnFechar = document.getElementById('btn-fechar-modal');
        this.mensagemSucesso = document.getElementById('mensagem-sucesso');
        this.projetoSelecionado = '';
        this.addEventListeners();
    },

    addEventListeners() {
    document.body.addEventListener('click', (event) => {
        if (event.target.matches('.btn-voluntariar')) {
            this.abrirModal(event.target);
        }
    });

    this.btnConfirmar.addEventListener('click', () => {
        this.mostrarSucesso();
    });

    this.btnFechar.addEventListener('click', () => {
        this.fecharModal();
    });

    this.modalOverlay.addEventListener('click', (event) => {
        if (event.target === this.modalOverlay) {
            this.fecharModal();
        }
    });

    this.modalOverlay.addEventListener('click', (event) => {
        if (event.target.closest('[data-link]')) {
            this.fecharModal();
        }
    });
},

    abrirModal(botao) {
        this.projetoSelecionado = botao.dataset.projetoNome;
        this.modalNomeProjeto.textContent = this.projetoSelecionado;
        this.passo1.classList.remove('hidden');
        this.passo2.classList.add('hidden');
        this.modalOverlay.classList.add('ativo');
    },

    mostrarSucesso() {
        this.mensagemSucesso.textContent = `Sua inscrição no projeto "${this.projetoSelecionado}" foi confirmada! Entraremos em contato em breve.`;
        this.passo1.classList.add('hidden');
        this.passo2.classList.remove('hidden');
    },

    fecharModal() {
        this.modalOverlay.classList.remove('ativo');
    }
};

export default projetosModal;