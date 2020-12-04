const express = require('express');
const controllerSNMP = require('./controller/controllerSNMP');
const controllerSNMPIfTable = require('./controller/controllerSNMPIfTable');
const controllerTCP = require('./controller/controllerTCP');
const controllerUDP = require('./controller/controllerUDP');
const controllerPing = require('./controller/controllerPing');
const controllerICMP = require('./controller/controllerICMP');

const routes = express.Router();


routes.post('/snmp', controllerSNMP.index);
routes.post('/snmpIfTable', controllerSNMPIfTable.index);
routes.post('/snmpTCP', controllerTCP.index);
routes.post('/snmpUDP', controllerUDP.index);
routes.post('/ping', controllerPing.index);
routes.post('/snmpICMP', controllerICMP.index);



module.exports = routes;
