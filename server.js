//vai importar o express para criar o servidor
const express = require('express')

// importa as rotas de clientes
const clientesRoutes = require('./routes/clientes')

//cria o servidor
const app = express()

//vai fazer com que a api entenda o JSON
app.use(express.json())

//usa a rota de clientes
app.use(clientesRoutes)

//crinado as rotas
app.get('/', (req,res) => {

    res.send("API FUNCIONANDO!")
})

//liga a api
app.listen(3000, () => {
    console.log("Servidor rodando na porta:http://localhost:3000/teste-banco")
})