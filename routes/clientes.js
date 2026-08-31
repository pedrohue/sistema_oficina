//importar o express
const express = require('express')

//criar um roteador
const router = express.Router()

//importar a conexao com o banco de dados
const pool = require('../database') 

// rota para cadastrar clientes

router.post('/clientes', async (req, res) => {

    try {

        // pega as informações enviadas pelo Postman
        const { nome, telefone } = req.body
        // validar o nome e o telefone
        if (!nome || !telefone) {
            return res.status(400).send('nome e telefone são obrigatorios')
        }
        // salva o cliente no banco de dados
        await pool.query(
            'INSERT INTO clientes (nome, telefone) VALUES ($1, $2)',
            [nome, telefone]
        )
        // resposta da API
        res.send('Cliente cadastrado com sucesso!')
    } catch (erro) {
        // mostra o erro no terminal
        console.error(erro)

        // envia uma resposta de erro para o usuário
        res.status(500).send('Erro ao cadastrar cliente')
    }
})

//rota para listar os clientes
router.get('/clientes', async (req, res) => {
    try{
    //busca todos os clientes no banco de dados
    const resultados = await pool.query('SELECT * FROM clientes')
    res.json(resultados.rows)
    } catch (erro) {
        console.error(erro)
        res.status(500).send('Erro ao buscar clientes')
    }
})

//rota pra atualizar os clientes
router.put('/clientes/:id', async (req, res) => {

    try {
    //pega o id do cliente que vai ser atualizado
    const {id} = req.params
    const {nome, telefone} = req.body

    //atualiza o banco de dados
   const resultado = await pool.query('UPDATE clientes SET nome = $1, telefone = $2 WHERE id = $3', [nome, telefone, id])
    
   if(resultado.rowCount === 0){
    res.status(404).send('cliente nao foi encontrado')
   } else {
    res.send("Cliente atualizado com sucesso!")
   }
   
} catch (erro) {
    console.error(erro)
        res.status(500).send('erro ao atualizar o cliente')
    
 }
})

router.delete('/clientes/:id', async (req, res) =>{

    try {
    const {id} = req.params
    const resultado = await pool.query('DELETE from clientes WHERE id = $1', [id])
   if (resultado.rowCount ===0){
    res.status(404).send('cliente nao foi encontrado')
   } else {
     res.send("Cliente deletado com sucesso!")
   }
   
    } catch (erro){
        console.error(erro)
        if (erro.code === "23503"){
        res.status(500).send('nao é possivel deletar o cliente pois tem um veiculo atribuido a ele')
    } else {
        res.status(500).send('erro ao deletar o cliente')
    }
}

})

module.exports = router

// try/catch:
// O bloco try executa o código que pode apresentar algum erro.
// Se ocorrer algum problema, o catch captura o erro e permite
// que a API envie uma resposta adequada ao usuário, sem quebrar a aplicação.