/**
 * Controller for CPF validation and persistence
 */

const Cpf = require('../model/cpf');
const config = require('../config/')
const cpf = require('node-cpf');
const DataStore = require('nedb');

const db = new DataStore({ filename: 'data.db', autoload: true });

module.exports = {

    // Consult CPF into our DB
    verifyCpf: async (param, callback) => {
        // Plus consults
        config.totalConsults++;

        // If is a valid CPF, continue
        if (cpf.validate(param.cpf)) {
            // If CPF is masked, remove it
            if (cpf.isMasked(param.cpf)) param.cpf = cpf.unMask(param.cpf);
            
            // Find cpf in DB
            await db.find({ cpf: param.cpf }, (err, data) => {
                if(err) return callback("Bad request, try again", null)
                
                // If found CPF in DB return it
                if (data.length) {
                    return callback(null, data);
                } else {
                    //  Setting block to false as default on DB insert
                    param.block = false;
                    // If CPF not found, insert it into DB
                    db.insert(param, (err, data) => {
                        if (err) callback("Can't be possible save the CPF number", null);
                        else return callback(null, data);
                    });
                };
            });
        } else
            return callback("Bad request. CPF is not valid. Try again!.", null);

    },

    // Unblock CPF
    freeCpf: async (param, callback) => {
        // Plus consults
        config.totalConsults++;

        // If is a valid CPF, continue
        if (cpf.validate(param.cpf)) {
            // If CPF is masked, remove it
            if (cpf.isMasked(param.cpf)) param.cpf = cpf.unMask(param.cpf);

            // Find CPF in DB and unblocking it
            await db.update({ cpf: param.cpf }, { $set: { block: false } }, { returnUpdatedDocs: true, multi: false }, (err, numAffected, affectedDocuments, upsert) => {
                if (err) return callback("Bad request, try again", null)
                else {
                    return callback(null, affectedDocuments);
                };
            });
        } else
            return callback("Bad request. CPF is not valid. Try again!.", null);
    },
    
    // Unblock CPF
    blockCpf: async (param, callback) => {
        // Plus consults
        config.totalConsults++;

        // If is a valid CPF, continue
        if (cpf.validate(param.cpf)) {
            // If CPF is masked, remove it
            if (cpf.isMasked(param.cpf)) param.cpf = cpf.unMask(param.cpf);

            // Find CPF in DB and blocking it
            await db.update({ cpf: param.cpf }, { $set: { block: true } }, { returnUpdatedDocs: true, multi: false }, (err, numAffected, affectedDocuments, upsert) => {
                if (err) return callback("Bad request, try again", null)
                else {
                    return callback(null, affectedDocuments);
                };
            });
        } else 
            return callback("Bad request. CPF is not valid. Try again!.", null);
    },

    // Delete CPF from DB
    deleteCpf: async (param, callback) => {
        // Plus consults
        config.totalConsults++;

        // If is a valid CPF, continue
        if (cpf.validate(param.cpf)) {
            // If CPF is masked, remove it
            if (cpf.isMasked(param.cpf)) param.cpf = cpf.unMask(param.cpf);

            // Deleting from DB
            await db.update({cpf: param.cpf}, {multi: true}, (err, numRemoved) => {
                if (err) return callback("Bad request, try again", null);
                else return callback(null, numRemoved);
            })
        } else
            return callback("Bad request. CPF is not valid. Try again!.", null);
    },

    generalStatus: async (param, callback) => {
        const status = {
            consults: config.totalConsults,
            uptime: Date.now() - config.uptime,
            blacklist: 0
        }

        await db.count({ block: true }, (err, count) => {
            if(err) callback("Bad request, there was a error in BD", null);
            
            status.blacklist = count;
            callback(null, status);
        });
    }
}