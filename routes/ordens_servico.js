//importar o express
const express = require('express')

//criar o roteador
const router = express.Router()

//importar a contexao com o banco de dados
const pool = require('../database')

//rota para cadastrar ordem ed serviço
router.post('/ordens_servico', async (req,res) => {
    
    try {
        //pega as informações enviadas pelo postman
        const { cliente_id, veiculo_id, descricao, status, valor} = req.body
        if (!cliente_id || !veiculo_id || !descricao || !status || !valor) {
            return res.status(400).json({ error: 'todos os campos são obrigatorios'})
        }
    
    //salvar no banco de dados
    await pool.query(
    'INSERT INTO ordens_servico (cliente_id, veiculo_id, descricao, status, valor) VALUES ($1, $2, $3, $4, $5)',
    [cliente_id, veiculo_id, descricao, status, valor])
        //resposta da API
        res.send('ordem de serviço foi cadastrada com sucesso!')
    } catch (error){
        console.error(error)
        res.status(500).json({ error: "erro ao cadastrar ordem de serviço"})
    }
    })

    //rota para listar as ordens de serviço
   
    router.get('/ordens_servico', async (req,res) => {
     try { 
     const resultados = await pool.query("SELECT * FROM ordens_servico")
    res.json(resultados.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('erro ao buscar ordem de serviço')
    }
 })

   //rota para atualizar as ordens de serviço
   router.put ('/ordens_servico/:id', async (req,res)=> {
    try  {
    const {id} = req.params
    const { cliente_id, veiculo_id, descricao, status, valor } = req.body

   const resultado =  await pool.query('UPDATE ordens_servico SET cliente_id = $1, veiculo_id = $2, descricao = $3, status = $4, valor = $5 WHERE id = $6', [cliente_id, veiculo_id, descricao, status, valor, id])

    if (resultado.rowCount === 0) {
        return res.status(404).send('ordem de serviço nao encontrada')
    } else{
    res.send('ordem de serviço foi atualizada com sucesso!')}
    }catch (error) {
        console.error(error)
        res.status(500).send('erro ao atualizar ordem.')
      }
   })

    //rota para deletar as ordens de serviço
    router.delete('/ordens_servico/:id',async (req,res)=>{
        try{
     const{id}= req.params
     //deletar a ordem de serviço do banco de dados através do id representado como[id]
    const resultado =  await pool.query('DELETE FROM ordens_servico WHERE id = $1',[id])
     if (resultado.rowCount === 0){
        res.status(404).send('ordem de serviço nao foi encontrada')
      } else{
            res.send('ordem de serviço foi deletada com sucesso!')
        } 
    }catch (error){
        console.error(error)
        res.status(500).send('erro ao deletar ordem de serviço')
    }
      
    })

    module.exports = router