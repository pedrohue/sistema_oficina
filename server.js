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


//liga a api
app.listen(3000, () => {
    console.log("Servidor rodando na porta:http://localhost:3000/teste-banco")
})