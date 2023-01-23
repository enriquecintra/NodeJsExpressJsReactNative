# Teste de Fullstack Ecommerce Venda e Troca

Solução BackEnd em Node.js com Express.js, autenticação com jwt e banco de dados mongodb para criação das Api e FrontEnd em ReactJS

## Iniciando Server

```
cd backend
npm install
npm start
```

Server is running on port: 3000

## Iniciando Front (Mobile)

```
cd frontend\app
npm install
npm start
```

O aplicativo será iniciado no Expo.
O Expo é uma ferramenta utilizada no desenvolvimento mobile com React Native que permite o fácil acesso às API's nativas do dispositivo sem precisar instalar qualquer dependência ou alterar código nativo. 

É possível testar na web ou em qualquer celular apontando a camera para o QRCode. 
O app será inicializado no mobile pelo aplicativo Expo Go, um app que deve estar previamente instalado no celular para fazer a emulação.


## Ngrok

Quando o app é iniciado no mobile ele não reconhece o localhost do server, para que ele  reconheça as Apis é necessário fazer uma ponte entre a servidor onde esta rodando o backend, no caso "http:\\localhost:3000", para o aplicativo mobile.

Para isso foi usado o NGROK.
O Ngrok cria uma URL pública apontando para uma porta específica na máquina onde foi executado. Há diversos casos de uso para ele. Por exemplo, demonstrar uma aplicação web enquanto está sendo desenvolvida ou permitir acesso externo via SSH mesmo onde há um firewall bloqueando.

Para o uso dessa ferramenta é necessário criar uma conta no site https://ngrok.com/, baixar a ferramenta, se conectar usando um Token e executar um comando que cria a URL pública. (Existe um passo-a-passo no site)

Com a URL pronta é só apontar o endereço no arquivo .env na variável de ambiente URLAPI e pronto, estará conectado a API, (exemplo: URLAPI=https://54a8-2804-431-c7f3-6d65-99c-6bad-5e45-5173.ngrok.io) 

Ao fazer os passos acima ao acessar a URL no browser deverá aparece o seguinte json:

{"title":"Node Express API","version":"0.0.1"}

## Postman

Na pasta raiz da solução contém um arquivo com as todas chamadas das api e outro arquivo de contendo as variáveis de ambiente.

## Prints

Na pasta images contém alguns prints das telas desenvolvidas.

### Login

![Login](/images/Login.jpeg?raw=true "Login")

### Home

![Home](/images/Home.jpeg?raw=true "Home")

### Menu

![Menu](/images/Menu.jpeg?raw=true "Menu")

### Convites

![Convites](/images/Invite.jpeg?raw=true "Convites")


