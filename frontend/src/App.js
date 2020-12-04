import React, { useState } from 'react';
import BarChart from './components/BarChart';
import api from './services/api';
import './App.css'

var grafico = [];
var graficoICMP = [];
var statusUDP = 'not';
var statusICMP = 'not';
var timer;

function App() {
  const [numeroIP, setNumeroIP] = useState('127.0.0.1');
  const [systemDescr, setSystemDescr] = useState('sem informação');
  const [sysUpTime, setSysUpTime] = useState(0);
  const [sysName, setSysName] = useState('');
  const [sysContact, setSysContact] = useState('');
  const [sysLocation, setSysLocation] = useState('');
  const [sysDispositivo, setSysDispositivo] = useState([]);
  const [sysMAC, setSysMAC] = useState([]);
  const [status, setStatus] = useState('not');
  const [status2, setStatus2] = useState('not');
  const [sysNameTCP, setSysNameTCP] = useState([]);
  const [sysValueTCP, setSysValueTCP] = useState([]);
  const [sysPing, setSysPing] = useState('');

  async function realizaConsulta() {
    try {
      statusUDP = 'not';
      statusICMP = 'not';
      //previne o evento default do forms de dar um reload na pagina
      //status definido como not (não ira mostrar os graficos)
      setStatus('not');
      setStatus2('not');
      //criar arry que ira receber os valores do UDP
      //grafico = [];

      //Chamada a API
      const data = {
        ipAddr: numeroIP
      }
      console.log(data);
      const responseUDP = await api.post('snmpUDP', data);
      const response = await api.post('snmp', data);
      const responseIFTable = await api.post('snmpIfTable', data);
      const responseSnmpTCP = await api.post('snmpTCP', data);
      const responseSnmpICMP = await api.post('snmpICMP', data);
      //const responsePing = await api.get('ping', data );

      const arrayUdp = responseUDP.data.arrayEspecial;
      const arrayName = responseUDP.data.nameIOD;
      const arrayICMP = responseSnmpICMP.data.arrayEspecial;
      const arrayICMPName = responseSnmpICMP.data.nameIOD;

      var arrayAux = [];
      var arrayAux1 = [];
      arrayUdp.forEach(element => {
        arrayAux.push(parseInt(element));
      });

      arrayICMP.forEach(element => {
        arrayAux1.push(parseInt(element));
      });

      let tam = arrayUdp.length;
      let tam1 = arrayICMP.length;

      if (tam > 0) {
        //necessario criar a primeira linha de cada array, a primeira linha sera interpretada como o indices do grafico pelo chart da google
        grafico = [['NameOID', 'Quantidade']];

        //Preenchendo os array com o forEach
        for (let i = 0; i < arrayAux.length; i++) {

          grafico.push([arrayName[i], arrayAux[i]]);
        }
      }

      if (grafico.length > 1) {
        statusUDP = 'ready';
        setStatus('yes');
      }

      if (tam1 > 0) {
        //necessario criar a primeira linha de cada array, a primeira linha sera interpretada como o indices do grafico pelo chart da google
        graficoICMP = [['NameOID', 'Quantidade']];

        //Preenchendo os array com o forEach
        for (let i = 0; i < arrayAux1.length; i++) {

          graficoICMP.push([arrayICMPName[i], arrayAux1[i]]);
        }
      }

      if (graficoICMP.length > 1) {
        statusICMP = 'ready';
        setStatus2('yes');
      }

      if (grafico.length > 1) {
        statusUDP = 'ready';
        setStatus('yes');
      }
      //setSysPing(responsePing.data);
      setSystemDescr(response.data.resposta[0]);
      setSysUpTime(relogio((response.data.resposta[2]) / 100));
      setSysName(response.data.resposta[4]);
      setSysContact(response.data.resposta[3]);
      setSysLocation(response.data.resposta[5]);

      setSysDispositivo(responseIFTable.data.array.dispositivo);
      var aux = responseIFTable.data.array.mac;
      var arrayMac = [];
      aux.forEach(element => {
        if (element.data.length === 0) {
          arrayMac.push("00-00-00-00");
        } else {
          let addMac = '';
          element.data.forEach(element => {
            addMac += dec2hexString(element) + '-';
          });
          arrayMac.push(addMac);
        }
      });
      setSysMAC(arrayMac);

      setSysNameTCP(responseSnmpTCP.data.nameIOD);
      const aux1 = responseSnmpTCP.data.arrayEspecial;
      var arrayTCP = [];
      aux1.forEach(element => {
        arrayTCP.push(parseInt(element));
      });

      setSysValueTCP(arrayTCP);



    } catch (error) {
      console.log(error)
    }

  }

  function conecta(e) {
    e.preventDefault();

    document.getElementById("conectar").disabled = true;
    document.getElementById("desconecta").disabled = false;
    timer = setInterval(() => {
      realizaConsulta();
    }, 1000);
  }

  function desconecta() {
    document.getElementById("conectar").disabled = false;
    document.getElementById("desconecta").disabled = true;
    setStatus('not');
    statusUDP = 'not';
    clearInterval(timer);
  }

  function dec2hexString(dec) {
    return '' + (dec + 0x10000).toString(16).substr(-2).toUpperCase();
  }

  function relogio(s) {
    function duas_casas(numero) {
      if (numero <= 9) {
        numero = "0" + numero;
      }
      return numero;
    }
    let hora = duas_casas(Math.round(s / 3600));
    let minuto = duas_casas(Math.round((s % 3600) / 60));
    let segundo = parseInt(duas_casas((s % 3600) % 60));
    let formatado = hora + ":" + minuto + ":" + segundo;

    return formatado;
  }

  return (

    <main className="corpo">

      <section className="container">
        <form className="row descricaoMaquina " >
          <div className="col consultaIp">
            <span className="input-group-text col-2" id="basic-addon1">Endereço IP: </span>
            <input
              type="text"
              className="form-control col-2"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={numeroIP}
              onChange={e => setNumeroIP(e.target.value)}
            />
            <div className="btn-group" role="group" aria-label="Basic example">
              <button id="conectar" className=" botaoAtualiza" onClick={e => conecta(e)}>Conectar</button>
            </div>

            <div className="btn-group " role="group" aria-label="Basic example">
              <button id="desconecta" className="btn bg-danger text-white" onClick={e => desconecta()}>Sair</button>
            </div>

          </div>
          <ul className="row sistema" type="none">
            <li className="input-group-prepend ">
              <span className="input-group-text" >Descrição sistema :</span>
              <span className="input-group-text valorCampo" >{systemDescr}</span>
            </li>
            <li className="input-group-prepend">
              <span className="input-group-text" >Tempo gerenciamento:</span>
              <span className="input-group-text valorCampo" >{sysUpTime} h:m:s</span>
              <span className="input-group-text" >Nome da Maquina:</span>
              <span className="input-group-text valorCampo" >{sysName}</span>
            </li>
            <li className="input-group-prepend">
              <span className="input-group-text" >Contato:</span>
              <span className="input-group-text valorCampo" >{sysContact}</span>
              <span className="input-group-text" >Localização:</span>
              <span className="input-group-text  valorCampo" >{sysLocation}</span>
            </li>
          </ul>
        </form>
      </section>
      <div className="container">
        <section className="row secaoTabela">
          <p className="col-12">Entradas de interface</p>
          <ul className="col-6 listaTabela" type="none">
            Interfaces
              {
              sysDispositivo.map((dispositivo, index) =>
                <li key={index}>
                  {dispositivo}
                  <hr className="linhaDivicao" />
                </li>

              )
            }

          </ul>
          <ul className="col-6 listaTabela" type="none">
            Endereço MAC
            {
              sysMAC.map((addrMac, index) =>
                <li key={index} >
                  {addrMac}
                  <hr className="linhaDivicao" />
                </li>
              )
            }
          </ul>
        </section>
        <section className="row secaoTabela">
          <p className="col-12">TCP</p>
          <ul className=" col-8 listaTabela" type="none">
            {
              sysNameTCP.map((nameTCP, index) =>
                <li key={index}>
                  {nameTCP}
                  <hr className="linhaDivicao" />
                </li>
              )
            }
          </ul>
          <ul className=" col-4 listaTabela" type="none">
            {
              sysValueTCP.map((valueTCP, index) =>
                <li key={index} >
                  {valueTCP}
                  <hr className="linhaDivicao" />
                </li>
              )
            }
          </ul>
        </section>

      </div>
      <section className="container graficos" >
        <p className="tituloGrafico">
          <a className="btn botaoInfo" data-toggle="collapse" href="#collapseUDP" role="button" aria-expanded="false" aria-controls="collapseUDP">
            Número total de datagramas UDP entregues a Usuários
              </a>
        </p>
        
        {status === 'yes' ? (
          <BarChart dataMapa={grafico} title={""} corMapa={'#27264A'} status={statusUDP} tituloVertical={"Quantidade de nº"} />

        ) : (<span>Sem dados disponiveis</span>)}
        <div className="collapse descricao" id="collapseUDP">
          <div className="card card-body">
            <ul type="none">
              <li>

                udpinDatagrams: O Nº total de datagramas UDP entregues a Usuários UDP
                  </li>
              <hr />
              <li>
                udpNoPorts: O Nº total de datagramas UDP recebidos para que não houve aplicação no destino porta
                  </li>
              <hr />
              <li>
                udpInErrors: Nº de datagramas UDP recebidos que poderiam não ser entregue por falta de um aplicativo na porta de destino
                  </li>
              <hr />
              <li>
                udpOutDatagrams: O Nº total de datagramas UDP enviados deste entidade
                  </li>

            </ul>
          </div>
        </div>
      </section>

      <section className="container graficos" >
        <p className="tituloGrafico">
          <a className="btn botaoInfo" data-toggle="collapse" href="#collapseICMP" role="button" aria-expanded="false" aria-controls="collapseICMP">
            ICMP
              </a>
        </p>
        
        {status2 === 'yes' ? (
          <BarChart dataMapa={graficoICMP} title={""} corMapa={'#62738C'} status={statusICMP} tituloVertical={"Quantidade de nº"} />

        ) : (<span>Sem dados disponiveis</span>)}
        <div className="collapse descricao" id="collapseICMP">
          <div className="card card-body">
            <ul type="none">
              <li>
              icmpInMsgs :O número total de mensagens ICMP que a entidade recebeu. Observe que este contador inclui todas aquelas contadas por icmpInErrors.
              </li>
              <hr />

              <li>
              icmpInErrors : O número de mensagens ICMP que a entidade recebeu, mas determinou como tendo erros específicos de ICMP (somas de verificação de ICMP incorretas, comprimento incorreto etc.).
              </li>
              <hr />

              <li>
              icmpInDestUnreachs : O número de mensagens de destino inacessível ICMP recebidas.
              </li>
              <hr />

              <li>
              icmpInTimeExcds : o número de mensagens ICMP Time Exceeded recebidas.
              </li>
              <hr />

              <li>
              icmpInEchoReps : O número de mensagens de resposta de eco ICMP recebidas.
              </li>
              <hr />

              <li>
              icmpOutMsgs : O número total de mensagens ICMP que esta entidade tentou enviar. Observe que esse contador inclui todos aqueles contados por icmpOutErrors.
              </li>
              <hr />

              <li>
              icmpOutDestUnreachs : O número de mensagens de Destino inacessível ICMP enviadas.
              </li>
              <hr />

              <li>
              icmpOutEchos : O número de mensagens ICMP Echo (solicitação) enviadas.
              </li>
              <hr />

            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
