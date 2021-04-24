const express = require('express');
const app = express();
app.use(express.json());
const axios = require("axios");
const clientes = {};
contador = 0;
app.get('/clientes', (req, res) => {
    res.send(clientes);
});
app.put('/clientes', async (req, res) => {
    contador++;
    const {
        nome, endereço, idade, status
    } = req.body;
    clientes[contador] = {
        contador,
        nome,
        endereço,
        idade,
        status
    }
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteCriado",
        dados: {
            contador,
            nome,
            endereço,
            idade,
            status
        },
    });
    res.status(201).send(clientes[contador]);
});
app.listen(4000, () => {
    console.log('Clientes. Porta 4000');
});