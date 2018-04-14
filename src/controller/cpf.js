/**
 * Controller for CPF validation and persistence
 */

const Cpf = require('../model/cpf');
const cpf = require('node-cpf');
const DataStore = require('nedb');

const db = new DataStore({ filename: 'data.db', autoload: true });

module.exports = {

    // Consult CPF into our DB
    verifyCpf: async (param, callback) => {

        if (cpf.validate(param.cpf)) {
            // If CPF is masked, remove it
            if (cpf.isMasked(param.cpf)) param.cpf = cpf.unMask(param.cpf);
            
            // Find cpf in DB
            await db.find({ cpf: param.cpf }, (err, data) => {
                if(err) return callback("Ocorreu um erro inesperado, tente novamente", null)
                // If found CPF in DB return it
                if (data.length) {
                    return callback(null, data);
                } else {
                    // If CPF not found, insert it into DB
                    db.insert(param, (err, data) => {
                        if (err) callback("Não foi possível salvar o CPF", null);
                        else return callback(null, data);
                    });
                };
            });
        };

    }
}