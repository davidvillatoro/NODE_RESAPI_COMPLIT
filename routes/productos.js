const {Router} = require('express');  
const { check } = require('express-validator');
const { crearProduto, obtenrProductos, obtenerProductoPorID, actualizandoProducto, elimianrProductto } = require('../controllers/controllers-producto');
const { ValidarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeProductoPorID } = require('../helpers/validacion-bbdd');

const rutas = Router();

 rutas.get('/', obtenrProductos);

rutas.get('/:id', [
    check("id","no es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorID),
    validarCampos,
],obtenerProductoPorID);

 
rutas.post('/',[ 
    ValidarJWT,
    check("nombre","el nombre es obligatorio").not().isEmpty(),
    validarCampos
],  crearProduto );


rutas.put('/:id', [
    ValidarJWT,
    check("nombre","el nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeProductoPorID),
    validarCampos
],actualizandoProducto);



rutas.delete('/:id',
    ValidarJWT,
    check("id").custom(existeProductoPorID),
    validarCampos
, elimianrProductto);



module.exports = rutas;