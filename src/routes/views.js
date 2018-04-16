const { Router } = require('express');
const getCpf = require('../controller/cpf');

const route = Router();

route.get('/', (req, res) => {
    getCpf.generalStatus(req, (err, data) => {
        res.render('home', {status: data});
    })
});

route.get('/find', (req, res) => {
    res.render('find-cpf');
});

route.get('/all-cpfs', (req, res) => {
    getCpf.getAllCpfs(req, (err, data) => {
        res.render('all-cpf', {cpfs: data});
    })
});


module.exports = route;