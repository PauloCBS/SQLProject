const express = require("express");
 //importou o express.

const app = express();
//inicializou o express.
const PORT = 3333;
//porta a qual será feita a requisição.

//testando metodo GET: onde o / representa a rota que será acessada no navegador, (reques, response) representa a função 
app.get("/message/:id/:nome", (req, res) => {
    res.send(`request id ${req.params.id} for the user name ${req.params.nome}`);
});
//we can add as many parameters as we want.
/* we can also use destructuring for req and param by adding it to a const
const{id, nome} = request.params; and in the response we can use ${id} and ${nome} */
//res serve para devolver uma resposta. Podemos usar o req para enviar ou obter informações. 


app.get("/user", (req, res) => { 
    
    const {name, age, city} = req.query;
    res.send(`the user name is ${name} and the user age is ${age} and he living at from is ${city}`);
//note that the main difference between route params and query params is that no params is necessary. 
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
//app escute a porta 3333 e retorna uma mensagem de que o servidor está rodando na porta 3333.

 