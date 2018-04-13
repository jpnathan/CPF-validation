import {express} from "express";

// const express = require('express')
// const load = require('express-load')
// const bodyParser = require('body-parser')
// const expressValidator = require('express-validator')
// const morgan = require('morgan')

module.exports = function () {
    const app = express();

    app.set('view engine', 'ejs')
    app.set('views', './app/views')

    app.use(express.static('public'));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(expressValidator())

    load('routes', { cwd: 'app' })
        .then('infra')
        .into(app)

    app.use((req, res, next) => {
        res.status(404).render('errorpage.ejs')
        next()
    })

    return app
}