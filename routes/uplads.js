const {Router} = require('express');  
const { check } = require('express-validator');
const { CargarArchivos, MostrarImagen, actualizarImagenCloudinary } = require('../controllers/uplads');
const { coleccionesPermitidas } = require('../helpers/validacion-bbdd');
const validarArchivoSubir = require('../middlewares/validar-archivo');
const { validarCampos } = require('../middlewares/validar-campos');
const { ValidarJWT } = require('../middlewares/validar-jwt');
//const { ValidarJWT } = require('../middlewares/validar-jwt');






const rutas = Router();


rutas.post('/',validarArchivoSubir

, CargarArchivos);


rutas.put('/:coleccion/:id',[
  //  ValidarJWT,
    validarArchivoSubir,
    check('id' , 'el id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c =>  coleccionesPermitidas (c , ["productos"])),
    validarCampos
], actualizarImagenCloudinary);



rutas.get("/:coleccion/:id" , [ 
    check('id' , 'el id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c =>  coleccionesPermitidas (c , ["productos"])),
], MostrarImagen )


module.exports = rutas;