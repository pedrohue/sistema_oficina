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

   //rota para atualizar as ordens de serviço
   router.put ('/ordens_servico/:id', async (req,res)=> {
    const {id} = req.params
    const { cliente_id, veiculo_id, descricao, status, valor } = req.body
    await pool.query('UPDATE ordens_servico SET cliente_id = $1, veiculo_id = $2, descricao = $3, status = $4, valor = $5 WHERE id = $6', [cliente_id, veiculo_id, descricao, status, valor, id])
    res.send('ordem de serviço foi atualizada com sucesso!')
   })

    //rota para deletar as ordens de serviço
    router.delete('/ordens_servico/:id',async (req,res)=>{
     const{id}= req.params
     await pool.query('DELETE FROM ordens_servico WHERE id = $1',[id])
     res.send('ordem de serviço foi deletada com sucesso!')
    })

    module.exports = router