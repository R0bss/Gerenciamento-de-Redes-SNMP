

var snmp = require("net-snmp");

module.exports = {
    async index(request, response) {
        const { ipAddr } =  request.body;

// Default options
var options = {
    port: 161,
    retries: 1,
    timeout: 5000,
    backoff: 1.0,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version2c,
    backwardsGetNexts: true,
    idBitsSize: 32
};

var session = snmp.createSession (ipAddr, "public", options);

var oid = "1.3.6.1.2.1.2.2";

//var oid = "1.3.6.1.2.1.4.21.1";
var columns = [2,6]; // ifDescr  e ifPhysAddress  

// ifDescr = Uma string textual contendo informações sobre a interface. Esta string deve incluir o nome do fabricante, o nome do produto e a versão do hardware / software da interface.
// ifPhysAddress = 	O endereço da interface na camada de protocolo imediatamente `abaixo 'da camada de rede na pilha de protocolo. Para interfaces que não possuem tal endereço (por exemplo, uma linha serial), este objeto deve conter uma string de octeto de comprimento zero.


function sortInt (a, b) {
    if (a > b)
        return 1;
    else if (b > a)
        return -1;
    else
        return 0;
}

function responseCb (error, table) {
    if (error) {
        console.error (error.toString ());
    } else {
        // This code is purely used to print rows out in index order,
        // ifIndex's are integers so we'll sort them numerically using
        // the sortInt() function above
        var indexes = [];

        var array = {dispositivo: [], mac: []};
        var arrayMac = [];
        

        for (index in table)
            indexes.push (parseInt (index));
            indexes.sort (sortInt);
        
        // Use the sorted indexes we've calculated to walk through each
        // row in order
        
        for (var i = 0; i < indexes.length; i++) {
            // Like indexes we sort by column, so use the same trick here,
            // some rows may not have the same columns as other rows, so
            // we calculate this per row
            var columns = [];
            for (column in table[indexes[i]])
                columns.push (parseInt (column));
            columns.sort (sortInt);
            
            // Print index, then each column indented under the index
            //console.log ("row for index = " + indexes[i]);


            for (var j = 0; j < columns.length; j++) {
                //console.log ("   column " + columns[j] + " = "
                //        + table[indexes[i]][columns[j]]);
                    //teste.column.push(""+table[indexes[i]][columns[j]]);
                    //console.log("" + table[indexes[i]][columns[j]]);
                if (j == 0) {
                    //console.log(table[indexes[i]][columns[j]]); /// Descricao do Dispositivo
                    dispositivo = "" + table[indexes[i]][columns[j]];
                    array.dispositivo.push(dispositivo);
                    //push([])    
                }else{
                    //console.log("" + table[indexes[i]][columns[j]]); // MAC]
                    //mac = JSON.stringify(table[indexes[i]][columns[j]]);
                    mac = table[indexes[i]][columns[j]];
                    //array.mac.push(mac);
                    array.mac.push(mac);


                }

            }

        }
        return response.status(200).json({array}
        ); 

    }
}

var maxRepetitions = 20;

// The maxRepetitions argument is optional, and will be ignored unless using
// SNMP verison 2c

session.tableColumns (oid, columns, maxRepetitions, responseCb);

},
}