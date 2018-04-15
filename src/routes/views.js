const { Router } = require('express');

const route = Router();

route.get('/', (req, res) => {
    res.render('home');
});

route.get('/find', (req, res) => {
    res.render('find-cpf');
});


module.exports = route;