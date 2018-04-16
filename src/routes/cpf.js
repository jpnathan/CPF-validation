/**
 * Routes for CPF CRUD 
 */

const { Router } = require('express');
const getCpf = require('../controller/cpf');

const route = Router();

route.post('/cpf', (req, res) => {
    getCpf.verifyCpf(req.body, (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
});

route.put('/block', (req, res) => {
    getCpf.blockCpf(req.body, (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
});

route.put('/free', (req, res) => {
    getCpf.freeCpf(req.body, (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
});

route.delete('/del', (req, res) => {
    getCpf.deleteCpf(req.body, (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
});

route.get('/status', (req, res) => {
    getCpf.generalStatus(req, (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
});

route.get('/consult', (req, res) => {
    getCpf.cunsultCpf(req.query, (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
});

route.get('/everything', (req, res) => {
    getCpf.getAllCpfs(req.query, (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
});

module.exports = route;