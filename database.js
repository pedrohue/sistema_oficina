// importa pool o postSQL
const { Pool } = require('pg')

//cria conexao com o banco 
const pool = new Pool({
    //usuario do postgre
    user: "postgres", 
  //endereco do banco de dados
    host: "localhost",
    //nome do banco de dados
    database: "oficina",
    //senha do postgre
    password: "pedro123",
    //porta do postgre
    port: 5432
})

//exporta a conexao
module.exports = pool;