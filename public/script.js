fetch('http://localhost:3000/clientes')
.then(resposta =>resposta.json())
.then(clientes => {
    console.log(clientes)
})