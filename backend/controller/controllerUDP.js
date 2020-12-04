const snmp = require ("net-snmp");


module.exports = {
    async index(request, response) {
        const { ipAddr } =  request.body;
        var options = {
             port: 161,
            retries: 1,
            timeout: 5000,
            transport: "udp4",
            trapPort: 162,
            version: snmp.Version2c,
            idBitsSize: 32,
            context: ""
        };
        /*
        var user = {
            name: "authZ3r0",
            level: snmp.SecurityLevel.noAuthNoPriv,
            authProtocol: snmp.AuthProtocols.md5,
            authKey: "moura2020",
            privProtocol: snmp.PrivProtocols.aes,
            privKey: "2020moura"
        };
        */
        
        var session = snmp.createSession (ipAddr, "public",options);
        //var session = snmp.createV3Session ("127.0.0.1", user, options);
        /*
        interface
        at
        ip -- origem destino - protocolo usado
        ***rmon 
        
        */
        
       var oids = [
        "1.3.6.1.2.1.7.1.0", 
        "1.3.6.1.2.1.7.2.0", 
        "1.3.6.1.2.1.7.3.0", 
        "1.3.6.1.2.1.7.4.0", 
        ];

            var nameIOD = [
                "udpInDatagrams",
                "udpNoPorts",
                "udpInErrors",
                "udpOutDatagrams",
            ];

        var resposta = '';
        var msgOid=[];
        var msgValue=[];
        var arrayEspecial=[];
        
        session.get (oids, function (error, varbinds)
         {
            if (error) 
            {
                console.error (error);
            } 
            else
            {
                for (var i = 0; i < varbinds.length; i++)
                {
                    if (snmp.isVarbindError (varbinds[i]))
                    {
                        console.error (snmp.varbindError (varbinds[i]));
        
                    }
                       
                    else
                    {
                        //console.log (varbinds[i].oid + " = " + varbinds[i].value);
        
                        msgOid[i]=varbinds[i].oid.toString();
                        msgValue[i]=varbinds[i].value.toString();
        
                        console.log(msgOid[i] + "-->" + msgValue[i] );  
                        resposta = msgValue[i];
                        //arrayEspecial.push(msgOid[i], msgValue[i]);
                        //nameIOD[i] = varbinds[i].value.toString();

                        arrayEspecial.push(msgValue[i]);

                    }                
                } 
                return response.status(200).json({
                   nameIOD,arrayEspecial}
                    );                 
            }
        });
        
    },

}
