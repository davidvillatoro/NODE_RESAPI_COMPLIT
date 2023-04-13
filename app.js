require('dotenv').config(); //llamamos el dotenv .config para que tome nuestras variables de entorno


const Server = require('./models/server');  


const servidor =  new Server();  //hacemos una instacia del server con la varible servidor

servidor.listen();  // llamamos el metodo de  escucha del servvidro



