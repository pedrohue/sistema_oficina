//importar o express
const express = require('express')

//criar um roteador
const router = express.Router()

//importar a conexao com o banco de dados
const pool = require('../database')





//rota para cadastrar os veiculos
router.post('/veiculos', async (req, res) => {

    try {
        // pega as informaçoes enviadas pelo postman
        const { cliente_id, marca, modelo, placa, ano } = req.body

        if (!cliente_id || !marca || !modelo || !placa || !ano) {
            return res.status(400).json({ error: 'todos os campos são obrigatorios' })
        }

    //salva no banco de dados
    await pool.query('INSERT INTO veiculos (cliente_id, marca, modelo, placa, ano) VALUES ($1, $2, $3, $4, $5)', [cliente_id, marca, modelo, placa, ano])

        //resposta da api
        res.send('veiculo cadastrado com sucesso!')
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "erro ao cadastrar veiculo" })
    }
})

//rota para listar os veiculos
router.get('/veiculos', async (req,res) => {
try {
     const resultados = await pool.query('SELECT * FROM veiculos')
    res.json(resultados.rows)
} catch (error) {
    console.error(error)
    res.status(500).send('erro ao buscar veiculos')
}
   
})

// rota para deletar veiculos
router.delete('/veiculos/:id',async (req,res)=>{
 try {
     const {id} = req.params
    const resultado = await pool.query('DELETE FROM veiculos WHERE id = $1',[id])
    if (resultado.rowCount === 0) {
        res.status(404).send('veiculo nao encontrado')
    } else {
     res.send('veiculo deletado com sucesso!')
    }
 } catch (error) {
    console.error(error)
    res.status(500).send("erro ao deletar veiculo")
 }
   
})

//rota para atualizar veiculos
router.put('/veiculos/:id' ,async (req,res) => {
    try{
        const {id} = req.params
   const resultado = await pool.query('UPDATE veiculos SET cliente_id = $1, marca = $2, modelo = $3, placa = $4, ano = $5 WHERE id = $6'  , [req.body.cliente_id, req.body.marca, req.body.modelo, req.body.placa, req.body.ano, id]) 
   if (resultado.rowCount === 0) {
    res.status(404).send('veiculo nao encontrado')
 } else {
    res.send('veiculo atualizado com sucesso!')
 }
   
    } catch (error) {
        console.error(error)
        res.status(500).send('erro ao atualizar veiculo')
    }
   
})
    
module.exports = router
