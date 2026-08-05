//importar o express
const express = require('express')

//criar um roteador
const router = express.Router()

//importar a conexao com o banco de dados
const pool = require('../database')





//rota para cadastrar os veiculos
router.post('/veiculos', async (req, res) => {

    // pega as informaçoes enviadas pelo postman
    const { cliente_id, marca, modelo, placa, ano } = req.body

    //salva no banco de dados
    await pool.query('INSERT INTO veiculos (cliente_id, marca, modelo, placa, ano) VALUES ($1, $2, $3, $4, $5)', [cliente_id, marca, modelo, placa, ano])

    //resposta da api
    res.send('veiculo cadastrado com sucesso!')
})

module.exports = router