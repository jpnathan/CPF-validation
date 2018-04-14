const { Router } = require('express');

const route = Router();

route.get('/', (req, res) => {
    res.render('home');
});

route.get('/find', (req, res) => {
    res.render('find-cpf');
});

route.get('/block', (req, res) => {
    res.render('block-cpf');
});

module.exports = route;