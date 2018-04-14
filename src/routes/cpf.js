/**
 * Routes for CPF CRUD 
 */

const { Router } = require('express');
const getCpf = require('../controller/cpf');

const route = Router();

route.post('/cpf', (req, res) => {
    getCpf.verifyCpf(req.body, (err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
});

route.post('/block', (req, res) => {
    getCpf.blockCpf(req.body, (err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
});

module.exports = route;