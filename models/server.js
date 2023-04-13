
const express = require('express')
const cors = require('cors');
const { conexionDB } = require('../database/config');
const fileUpload = require("express-fileupload");
class Server{

    constructor (){
        this.app = express();  // nos creamos como una propiedad la instancia de express  que creamos en la clase de Server

        this.puerto = process.env.PORT; // mandamos a llamar el puerto y lo hacemos visible en el contructor del arvibo env

        //declaracion de las rutas paar los enpoint
        this.rutas ={
            usuario: '/api/usuarios',
            autentificacion: '/api/auth', //creamso la ruta para la autenficacion del JWT
            categorias: '/api/categorias',
            productos: "/api/productos",
            buscar: "/api/buscar",
            archivo: '/api/archivo'
        }


       /*  this.usuarioRuta = '/api/usuarios';  otro forma de llamar rutas */
       
        
        //conexion a la bbdd
        this.conectarBBDD();


        /* ojo importante llamamos los MIDDLEWARES no son mas que funciones que agregar otra funcionalidad al web server ose que se ejecuta una funcion al lenvantar el servidor */
        this.middlewares();

        this.routes();  //cuando llamemos la api resta ba jalar las rutas osea al ejecutar al app
    }

    async conectarBBDD(){ // metodo asyncrono para la funcion de conexinDB
        await conexionDB();

    }

    middlewares(){
        // los middleware se caracterizan por usar  " .use()" 
        this.app.use(express.static('public'));  // ba mostrar la caperta publica 


        //abilitando el CORS  que permite la comunicacion de los enpoint con la api de cosumo
        this.app.use(cors()); // osea que es el que permite la comunicacion de react y node de las  apis


        //bamos a poner el parceo y lectura del body osea que  bamos a desier que bamso a resibir informacion tipo JSON
        this.app.use( express.json());  //osea que toda la informacion que que benga en put,post,delete ba ser tipo json


        //para cargar arcvhivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    //bamos a crearnos un metodo para las rutas sean mas sencillas 
    routes(){
        // lo hacemos como un middleware  aqui ponemos el nombre de la ruta y de donde lo llamamos nombre es 'api/usuarios'
         this.app.use(this.rutas.usuario, require('../routes/usuario')); 
         this.app.use(this.rutas.categorias, require('../routes/categorias')); 
         this.app.use(this.rutas.autentificacion , require('../routes/autentificacion')); 
         this.app.use(this.rutas.productos , require('../routes/productos')); 
         this.app.use(this.rutas.buscar , require('../routes/buscar')); 
         this.app.use(this.rutas.archivo , require('../routes/uplads')); 
  }

    listen(){
         // metodo de escucha de express en que puerto se ba ejecutar

        this.app.listen(this.puerto, () =>{  // el proces.env.PORT el para poner el puerto que queremos
            console.log('servidor corriendo en el puerto',this.puerto);
        });
    }
};

module.exports = Server;