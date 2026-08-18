//importar o express
const express = require('express')

//criar o roteador
const router = express.Router()

//importar a contexao com o banco de dados
const pool = require('../database')

//rota para cadastrar ordem ed serviço
router.post('/ordens_servico', async (req,res) => {

    //pegar as informações enviadas pelo postman
    const { cliente_id, veiculo_id,descricao,status,valor} = req.body

    //salvar no banco de dados
    await pool.query(
    'INSERT INTO ordens_servico (cliente_id, veiculo_id, descricao, status, valor) VALUES ($1, $2, $3, $4, $5)',
    [cliente_id, veiculo_id, descricao, status, valor])
        //resposta da API
        res.send('ordem de serviço foi cadastrada com sucesso!')
    })

    //rota para listar as ordens de serviço
    router.get('/ordens_servico', async (req,res) => {
     const resultados = await pool.query("SELECT * FROM ordens_servico")
    res.json(resultados.rows)
  })

    module.exports = router