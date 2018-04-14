/**
 * API for CRUD of Max Milhas challenge .
 */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const { cpf, views } = require('./src/routes');

// Loading template settings
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('public/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Loading midlewares
app.use(
    morgan('dev')
);

// API routes
app.use(
    cpf(),
    views()
);

app.listen(3000, (err) => {
    if (err) console.log(err);
    else console.log(`flying on port 3000 now...`);
});
