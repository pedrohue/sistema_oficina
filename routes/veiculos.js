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

//rota para listar os veiculos
router.get('/veiculos', async (req,res) => {

    const resultados = await pool.query('SELECT * FROM veiculos')
    res.json(resultados.rows)
})

// rota para deletar veiculos
router.delete('/veiculos/:id',async (req,res)=>{

    const {id} = req.params
    await pool.query('DELETE FROM veiculos WHERE id = $1',[id])
    res.send('veiculo deletado com sucesso!')
})

module.exports = router