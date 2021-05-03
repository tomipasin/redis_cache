const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();

//por padrão o redise server roda na porta 6379
const redisPort = 6379
//cria um client redis na porta padrão.
const client = redis.createClient(redisPort);

//se der algum erro...
client.on("error", (err) => {
    console.log(err);
})

//aqui 
app.get("/cep", (req, res) => {
    const searchTerm = req.query.search;
    try {
        client.get(searchTerm, async (err, cep) => {
            if (err) throw err;
    
            if (cep) {
                res.status(200).send({
                    cep: JSON.parse(cep),
                    message: "Dados do cache!"
                });
                console.log("Dados do cache!")
            }
            else {
                const cep = await axios.get(`http://viacep.com.br/ws/${searchTerm}/json`);
                client.setex(searchTerm, 600, JSON.stringify(cep.data));
                res.status(200).send({
                    cep: cep.data,
                    message: "Dados da API. Este CEP não estava no cache. Agora estará ;-)"
                });
                console.log("Dados da API. Este CEP não estava no cache. Agora estará ;-)")
            }
        });
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});

const PORTA = process.env.PORT || 3000
app.listen(PORTA, () => {
    console.log(`Servidor de consulta de CEP rodando na porta ${PORTA}`);
    console.log(`Acessa http://localhost:${PORTA}/cep?search=95360000`);
});