const express = require('express');
const mysql = require('mysql2/promise'); 
const app = express();
const port = 3000;
const path = require('path'); 



const dbConfig = {
    host: 'localhost',
    user: 'ana',
    password: '0531', 
    database: 'ong_cadastro', 
    multipleStatements: true 
};



app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'src', 'pages', 'cadastro.html');
    res.sendFile(filePath);
});


app.post('/cadastrar', async (req, res) => {
    const data = req.body;
    let connection;

    try {
      
        connection = await mysql.createConnection(dbConfig);
        await connection.beginTransaction(); 


        const sqlUsuario = `
            INSERT INTO usuarios (nome, data_nascimento, cpf, email, telefone) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [resultUsuario] = await connection.execute(sqlUsuario, [
            data.nome,
            data.data_nascimento,
            data.cpf,
            data.email,
            data.telefone
        ]);

       
        const usuarioId = resultUsuario.insertId;
        
      
        const sqlEndereco = `
            INSERT INTO enderecos (usuario_id, cep, endereco, cidade, estado) 
            VALUES (?, ?, ?, ?, ?)
        `;
        await connection.execute(sqlEndereco, [
            usuarioId, 
            data.cep,
            data.endereco,
            data.cidade,
            data.estado
        ]);

        // Confirma as duas inserções
        await connection.commit();
        
        // Resposta de sucesso para o navegador
        res.send('<h1>🎉 Cadastro Concluído com Sucesso!</h1><p>ID do usuário: ' + usuarioId + '</p><p><a href="/">Voltar ao Formulário</a></p>');

    } catch (error) {
        
        // Em caso de erro, desfaz todas as operações
        if (connection) {
            await connection.rollback();
        }
        console.error('Erro no cadastro:', error); 
        res.status(500).send('<h1>🚫 Erro ao Processar o Cadastro.</h1><p>Detalhes: Verifique o terminal e as credenciais do banco.</p>');

    } finally {
        // Fecha a conexão
        if (connection) {
            connection.end();
        }
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});