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
        "1.3.6.1.2.1.5.1.0", //- icmpInMsgs
        "1.3.6.1.2.1.5.2.0", //- icmpInErrors
        "1.3.6.1.2.1.5.3.0", //- icmpInDestUnreachs
        "1.3.6.1.2.1.5.4.0", //- icmpInTimeExcds
        //"1.3.6.1.2.1.5.5.0", //- icmpInParmProbs
        //"1.3.6.1.2.1.5.6.0", //- icmpInSrcQuenchs
        //"1.3.6.1.2.1.5.7.0", //- icmpInRedirects
        //"1.3.6.1.2.1.5.8.0", //- icmpInEchos
        "1.3.6.1.2.1.5.9.0", //- icmpInEchoReps
        //"1.3.6.1.2.1.5.10.0", //- icmpInTimestamps
        //"1.3.6.1.2.1.5.11.0", //- icmpInTimestampReps
        //"1.3.6.1.2.1.5.12.0", //- icmpInAddrMasks
        //"1.3.6.1.2.1.5.13.0", //- icmpInAddrMaskReps
        "1.3.6.1.2.1.5.14.0", //- icmpOutMsgs
        //"1.3.6.1.2.1.5.15.0", //- icmpOutErrors
        "1.3.6.1.2.1.5.16.0", //- icmpOutDestUnreachs
        //"1.3.6.1.2.1.5.17.0", //- icmpOutTimeExcds
        //"1.3.6.1.2.1.5.18.0", //- icmpOutParmProbs
        //"1.3.6.1.2.1.5.19.0", //- icmpOutSrcQuenchs
        //"1.3.6.1.2.1.5.20.0", //- icmpOutRedirects
        "1.3.6.1.2.1.5.21.0", //- icmpOutEchos
        //"1.3.6.1.2.1.5.22.0", //- icmpOutEchoReps
        //"1.3.6.1.2.1.5.23.0", //- icmpOutTimestamps
        //"1.3.6.1.2.1.5.24.0", //- icmpOutTimestampReps
        //"1.3.6.1.2.1.5.25.0", //- icmpOutAddrMasks
        //"1.3.6.1.2.1.5.26.0", //- icmpOutAddrMaskReps
        ];

            var nameIOD = [
                 "icmpInMsgs",
                 "icmpInErrors",
                 "icmpInDestUnreachs",
                 "icmpInTimeExcds",
                 //"icmpInParmProbs",
                 //"icmpInSrcQuenchs",
                 //"icmpInRedirects",
                 //"icmpInEchos",
                 "icmpInEchoReps",
                 //"icmpInTimestamps",
                 //"icmpInTimestampReps",
                 //"icmpInAddrMasks",
                 //"icmpInAddrMaskReps",
                 "icmpOutMsgs",
                 //"icmpOutErrors",
                 "icmpOutDestUnreachs",
                 //"icmpOutTimeExcds",
                 //"icmpOutParmProbs",
                 //"icmpOutSrcQuenchs",
                 //"icmpOutRedirects",
                 "icmpOutEchos",
                 //"icmpOutEchoReps",
                 //"icmpOutTimestamps",
                 //"icmpOutTimestampReps",
                 //"icmpOutAddrMasks",
                 //"icmpOutAddrMaskReps",
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
