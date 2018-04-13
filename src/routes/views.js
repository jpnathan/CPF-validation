const { Router } = require('express');

const route = Router();

route.get('/', (req, res) => {
    console.log('teste route');
    res.render('home');
});

module.exports = route;