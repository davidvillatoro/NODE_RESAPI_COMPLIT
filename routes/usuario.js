
const {Router} = require('express');  //bamos a destructurar del paquete expres para sacar el Router 
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarioControler');
const {validarCampos, emailExiste} = require('../middlewares/validar-campos');
const { ValidarJWT } = require('../middlewares/validar-jwt');

const rutas = Router();  // llamamso al funcion 

//jalamos la rutas de la variable y  el metodo que  deseamos usar get , post , put ,delete aqui no lleba nombe las rutas solo la diagonal / en la funcion de rout del server lleba el nombre de la ruta 


rutas.get('/',[
    validarCampos
] ,usuariosGet);  // aqui en la ruta ponemos el tipo ya se get ,put etc y el controlador o la logica dela funcion 


rutas.post('/',[
    // estas validaciones se hacen con el paquete de express-validator
    
    ValidarJWT,
    check("nombre", "el nombre no es valido").not().isEmpty(),  
    check("correo").custom(emailExiste), // el custom es para jalar la valiacion especifica que hacemos para crear correos
    validarCampos
], usuariosPost);

rutas.put('/:id', usuariosPut);

rutas.delete('/', usuariosDelete); 




module.exports = rutas;