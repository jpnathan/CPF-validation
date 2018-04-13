const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const { cpf, views } = require('./src/routes');

// app.use(express.static(__dirname + "public/"));

// Setting engine and default views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

// Log
app.use(
    morgan('dev')
);

// API routes
app.use(
    '/api',
    cpf(),
    views()
);

app.listen(3000, (err) => {
    let date = new Date;
    if (err) console.log(err);
    else console.log(`flying on port 3000 now (${date})`);
});
