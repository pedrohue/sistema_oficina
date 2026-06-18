//importar o express
const express = require('express')

//criar um roteador
const router = express.Router()

//importar a conexao com o banco de dados
const pool = require('../database') 

//rota para cadastrar os clientes 
router.post('/clientes', async (req, res) => {
    const {nome, telefone} = req.body
    await pool.query('INSERT INTO clientes (nome, telefone) VALUES ($1, $2)', [nome, telefone])
    res.send("Cliente cadastrado com sucesso!")
})  

//rota para listar os clientes
router.get('/clientes', async (req, res) => {

    //busca todos os clientes no banco de dados
    const resultados = await pool.query('SELECT * FROM clientes')
    res.json(resultados.rows)
})

//rota pra atualizar os clientes
router.put('/clientes/:id', async (req, res) => {
    //pega o id do cliente que vai ser atualizado
    const {id} = req.params
    const {nome, telefone} = req.body

    //atualiza o banco de dados
    await pool.query('UPDATE clientes SET nome = $1, telefone = $2 WHERE id = $3', [nome, telefone, id])
    res.send("Cliente atualizado com sucesso!")
})

router.delete('/clientes/:id', async (req, res) =>{
    const {id} = req.params
    await pool.query('DELETE from clientes WHERE id = $1', [id])
    res.send("Cliente deletado com sucesso!")
})

module.exports = router