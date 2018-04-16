/**
 * Controller for CPF validation and persistence
 */

const config = require('../config/')
const cpf = require('node-cpf');
const DataStore = require('nedb');
// Setting db here
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
            await db.remove({cpf: param.cpf}, {multi: true}, (err, numRemoved) => {
                if (err) return callback("Bad request, try again", null);
                else return callback(null, numRemoved);
            })
        } else
            return callback("Bad request. CPF is not valid. Try again!.", null);
    },

    // Return the status of services
    generalStatus: async (param, callback) => {
        const status = {
            consults: config.totalConsults,
            uptime: process.uptime(),
            blacklist: 0
        }

        await db.count({ block: true }, (err, count) => {
            if(err) callback("Bad request, there was a error in BD", null);
            
            status.blacklist = count;
            return callback(null, status);
        });
    },

    // Consult a CPF
    cunsultCpf: async (param, callback) => {
        // Plus consults
        config.totalConsults++;

        // If is a valid CPF, continue
        if (cpf.validate(param.cpf)) {
            // If CPF is masked, remove it
            if (cpf.isMasked(param.cpf)) param.cpf = cpf.unMask(param.cpf);

            // Find cpf in DB
            await db.find({ cpf: param.cpf }, (err, data) => {
                if (err) return callback("Bad request, try again", null);

                // If found CPF in DB return it
                if (data.length) {
                    return callback(null, data);
                }
                else {
                    return callback('CPF do not found in Database', null);
                }
            });
        } else
            return callback("Bad request. CPF is not valid. Try again!.", null);
    },

    // Return all CPF's from DB
    getAllCpfs: async (param, callback) => {
        // getting all data from DB
        await db.find({}, (err, data) => {
            if (err) return callback("Bad request, try again", null);
            
            // If has data, mask cpf and return it
            if(data.length) {
                data.forEach(element => {
                    element.cpf = cpf.mask(element.cpf);
                });

                return callback(null, data);
            } else
                return callback({message: "Do not found cpf's registered."}, null);
        });
    }
}