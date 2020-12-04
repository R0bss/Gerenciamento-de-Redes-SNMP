const snmp = require ("net-snmp");


module.exports = {
    async index(request, response) {
const { ipAddr } =  request.body;

console.log(ipAddr);
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
        //system
      
          
            "1.3.6.1.2.1.1.1.0",
            "1.3.6.1.2.1.1.2.0",//- sysObjectID 
            "1.3.6.1.2.1.1.3.0",//- sysUpTime
            "1.3.6.1.2.1.1.4.0",//- sysContact 
            "1.3.6.1.2.1.1.5.0",//- sysName 
            "1.3.6.1.2.1.1.6.0",//- sysLocation 
            "1.3.6.1.2.1.1.7.0",//-- sysServices 
            
             /*
        //interface    
            "1.3.6.1.2.1.2.1.0",//- ifNumber 
        //IP   
            "1.3.6.1.2.1.4.1.0",//ipForwarding
            "1.3.6.1.2.1.4.2.0",//ipDefaultTTL
            "1.3.6.1.2.1.4.3.0",//ipInReceives
            "1.3.6.1.2.1.4.4.0",//ipInHdrErrors
            "1.3.6.1.2.1.4.5.0",//ipInAddrErrors
            "1.3.6.1.2.1.4.6.0",//ipForwDatagrams
            "1.3.6.1.2.1.4.7.0",//ipInUnknownProtos
            "1.3.6.1.2.1.4.8.0",//ipInDiscards
            "1.3.6.1.2.1.4.9.0",//ipInDelivers
            "1.3.6.1.2.1.4.10.0",//ipOutRequests
            "1.3.6.1.2.1.4.11.0",//ipOutDiscards
            "1.3.6.1.2.1.4.12.0",//ipOutNoRoutes
            "1.3.6.1.2.1.4.13.0",//ipReasmTimeout
            "1.3.6.1.2.1.4.14.0",//ipReasmReqds
            "1.3.6.1.2.1.4.15.0",//ipReasmOKs
            "1.3.6.1.2.1.4.16.0",//ipReasmFails
            "1.3.6.1.2.1.4.17.0",//ipFragOKs
            "1.3.6.1.2.1.4.18.0",//ipFragFails
            "1.3.6.1.2.1.4.19.0",//ipFragCreates
            "1.3.6.1.2.1.4.23.0",//ipRoutingDiscar
        //icmp  
          
            "1.3.6.1.2.1.5.1.0",
            "1.3.6.1.2.1.5.2.0",
            "1.3.6.1.2.1.5.3.0",
            "1.3.6.1.2.1.5.4.0",
            "1.3.6.1.2.1.5.5.0",
            "1.3.6.1.2.1.5.6.0",
            "1.3.6.1.2.1.5.7.0",
            "1.3.6.1.2.1.5.8.0",
            "1.3.6.1.2.1.5.9.0",
            "1.3.6.1.2.1.5.10.0",
            "1.3.6.1.2.1.5.11.0",
            "1.3.6.1.2.1.5.12.0",
            "1.3.6.1.2.1.5.13.0",
            "1.3.6.1.2.1.5.14.0",
            "1.3.6.1.2.1.5.15.0",
            "1.3.6.1.2.1.5.16.0",
            "1.3.6.1.2.1.5.17.0",
            "1.3.6.1.2.1.5.18.0",
            "1.3.6.1.2.1.5.19.0",
            "1.3.6.1.2.1.5.20.0",
            "1.3.6.1.2.1.5.21.0",
            "1.3.6.1.2.1.5.22.0",
            "1.3.6.1.2.1.5.23.0",
            "1.3.6.1.2.1.5.24.0",
            "1.3.6.1.2.1.5.25.0",
            "1.3.6.1.2.1.5.26.0",
        //tcp
            "1.3.6.1.2.1.6.1.0",
            "1.3.6.1.2.1.6.2.0",
            "1.3.6.1.2.1.6.3.0",
            "1.3.6.1.2.1.6.4.0",
            "1.3.6.1.2.1.6.5.0",
            "1.3.6.1.2.1.6.6.0",
            "1.3.6.1.2.1.6.7.0",
            "1.3.6.1.2.1.6.8.0",
            "1.3.6.1.2.1.6.9.0",
            "1.3.6.1.2.1.6.10.0",
            "1.3.6.1.2.1.6.11.0",
            "1.3.6.1.2.1.6.12.0",
            "1.3.6.1.2.1.6.14.0",
            "1.3.6.1.2.1.6.15.0",
        //udp
            "1.3.6.1.2.1.7.1.0",
            "1.3.6.1.2.1.7.2.0",
            "1.3.6.1.2.1.7.3.0",
            "1.3.6.1.2.1.7.4.0",
        //snmp   
            "1.3.6.1.2.1.11.1.0",
            "1.3.6.1.2.1.11.2.0",
            "1.3.6.1.2.1.11.3.0",
            "1.3.6.1.2.1.11.4.0",
            "1.3.6.1.2.1.11.5.0",
            "1.3.6.1.2.1.11.6.0",
            "1.3.6.1.2.1.11.8.0",
            "1.3.6.1.2.1.11.9.0",
            "1.3.6.1.2.1.11.10.0",
            "1.3.6.1.2.1.11.11.0",
            "1.3.6.1.2.1.11.12.0",
            "1.3.6.1.2.1.11.13.0",
            "1.3.6.1.2.1.11.14.0",
            "1.3.6.1.2.1.11.15.0",
            "1.3.6.1.2.1.11.16.0",
            "1.3.6.1.2.1.11.17.0",
            "1.3.6.1.2.1.11.18.0",
            "1.3.6.1.2.1.11.19.0",
            "1.3.6.1.2.1.11.20.0",
            "1.3.6.1.2.1.11.21.0",
            "1.3.6.1.2.1.11.22.0",
            "1.3.6.1.2.1.11.24.0",
            "1.3.6.1.2.1.11.25.0",
            "1.3.6.1.2.1.11.26.0",
            "1.3.6.1.2.1.11.27.0",
            "1.3.6.1.2.1.11.28.0",
            "1.3.6.1.2.1.11.29.0",
            "1.3.6.1.2.1.11.30.0"
            */
            ];
        var resposta = [];
        var msgOid=[];
        var msgValue=[];
        
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
        
                        msgOid[i]=varbinds[i].oid.toString();
                        msgValue[i]=varbinds[i].value.toString();
                        resposta.push(msgValue[i]);
                    }                
                } 
                return response.status(200).json({
                    resposta}
                    );                 
            }
        });
        
    },

}
