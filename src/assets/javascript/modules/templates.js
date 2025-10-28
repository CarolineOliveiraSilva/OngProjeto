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
                    <a href="#/src/pages/projetos.html" class="botao" data-link>Veja Nossos Projetos em Ação</a>
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
                    <a href="#/src/pages/cadastro.html" class="botao" data-link>Quero ser Voluntário</a>
                    <a href="#/src/pages/doacoes.html" class="botao" data-link>Fazer uma Doação</a>
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

export default templates;