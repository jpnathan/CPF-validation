const { Router } = require('express');
const getCpf = require('../controller/cpf');

const route = Router();

route.get('/find', (req, res) => {
    getCpf.getCpf(req.query, (err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
});

module.exports = route;