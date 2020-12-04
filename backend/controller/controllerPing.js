//const snmp = require ("net-snmp");
var shell = require('shelljs');

module.exports = {
    async index(request, response) {
        
        
        var resposta = [];

        resposta = shell.exec("ping -w 90 -n 1 127.0.0.1");


        return response.status(200).json(resposta.stdout
            );                 
    },


}
