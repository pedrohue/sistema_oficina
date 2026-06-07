//vai importar o express para criar o servidor
const express = require('express')

///imporat a conexao com o banco de dados
const pool = require('./database')

//cria o servidor
const app = express()

//vai fazer com que a api entenda o JSON
app.use(express.json())

//crinado as rotas
app.get('/', (req,res) => {

    res.send("API FUNCIONANDO!")
})

//rota para cadastrar os clientes 
app.post('/clientes', async (req, res) => {
    const {nome, telefone} =req.body

    await pool.query('INSERT INTO clientes (nome, telefone) VALUES ($1, $2)', [nome, telefone])

    res.send("Cliente cadastrado com sucesso!")
})

//rota para listar os clientes
app.get('/clientes', async (req, res) => {

    //busca todos os clientes no banco de dados
    const resultados = await pool.query('SELECT * FROM clientes')
    res.json(resultados.rows)
})

//rota pra atualizar os clientes
app.put('/clientes/:id', async (req, res) => {
    //pega o id do cliente que vai ser atualizado
    const {id} = req.params
    const {nome, telefone} = req.body

    //atualiza o banco de dados
    await pool.query('UPDATE clientes SET nome = $1, telefone = $2 WHERE id = $3', [nome, telefone, id])

    res.send("Cliente atualizado com sucesso!")
})


//liga a api
app.listen(3000, () => {
    console.log("Servidor rodando na porta:http://localhost:3000/teste-banco")
})