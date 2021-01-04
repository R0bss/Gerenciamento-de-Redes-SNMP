<h1 align="center">
    <img alt="NextLevelWeek" title="#Banner" src="./frontend/assets/Banner.jpg" />
</h1>


<h1 align="center">Projeto Gerenciamento de Redes</h1>




## 💻 Sobre o projeto

💡 Projeto SNMP - É uma aplicação voltada para monitoramento de redes utilizando a api net-snmp através do IP do dispositivo coletando e mostrando informações como TCP, UDP e ICMP através do SNMP que realiza a comunicação entre o dispositivo e o usuario.

## 🎨 Layout



### Web

<img alt="NextLevelWeek" title="#Banner" src="./frontend/assets/Layout Web.png" />

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js][nodejs]
- [React][reactjs]
- [Chart Google][chartGoogle]
- [Net-SNMP][netsnmp]

## 🚀 Como executar o projeto

Podemos considerar este projeto como sendo divido em três partes:

1. Back End (pasta server) 
2. Front End (pasta web)

💡 O Front End precisa que o Server(Back End) esteja sendo executado para funcionar.



### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js][nodejs]. 
Além disto é bom ter um editor para trabalhar com o código como [VSCode][vscode]

### 🎲 Rodando o Back End (servidor)
```bash
# Clone este repositório
$ git clone https://github.com/RobertoLRV/Gerenciamento-de-Redes-SNMP


# Vá para a pasta server
$ cd backend

# Instale as dependências
$ npm install


# Execute a aplicação em modo de desenvolvimento
$ npm run dev:backend

# O servidor inciará na porta:3333 - acesse http://localhost:3333 

```


### 🧭 Rodando a aplicação web (Front End)

```bash
# Clone este repositório
$ git clone https://github.com/RobertoLRV/Gerenciamento-de-Redes-SNMP


# Vá para a pasta da aplicação Front End
$ cd frontend

# Instale as dependências
$ yarn install

# Execute a aplicação em modo de desenvolvimento
$ yarn start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```


## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)


## 📝 Licença

Este projeto esta sobe a licença MIT.

Feito com ❤️ por Roberto Luiz e Matheus Moura 👋🏽 [Entre em contato!](https://www.linkedin.com/in/roberto-luiz-45616a139/)


[nodejs]: https://nodejs.org/
[reactjs]: https://reactjs.org
[yarn]: https://yarnpkg.com/
[npm]: https://www.npmjs.com/
[vscode]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[license]: https://opensource.org/licenses/MIT
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[netsnmp]: https://github.com/markabrahams/node-net-snmp
[chartGoogle]: https://developers.google.com/chart
