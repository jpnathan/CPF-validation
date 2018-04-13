const cpf = require('./cpf');
const views = require('./views');

module.exports = {
    cpf: () => {
        return cpf;
    },
    views: () => {
        return views;
    }
}