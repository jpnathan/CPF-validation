// class Cpf {
    
//     getCpf ((param, callback) => {
//         console.log('acho a controller');
//     });
// };

const Cpf = require('../model/cpf');

module.exports = {
    
    getCpf: (param, callback) => {
        console.log('param', param);
        callback = (typeof callback === "function") ? callback : () => { };
        return callback(null, param.cpf);
    }
}