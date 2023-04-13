const {Router} = require('express');  
const { check } = require('express-validator');
const { CrearCategorias, obtenerCategogias, obtenerCategoriaID, actualizarCategoria, borrarCategorias } = require('../controllers/categorias-controlers');
const { existeCategoriaPorId } = require('../helpers/validacion-bbdd');
const { validarCampos } = require('../middlewares/validar-campos');
const { ValidarJWT } = require('../middlewares/validar-jwt');






const rutas = Router();


rutas.get('/', obtenerCategogias);

rutas.get('/:id', [
 
    check("id","no es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
],obtenerCategoriaID);


rutas.post('/',[
     ValidarJWT ,
    check("nombre","el nombre es obligatorio").not().isEmpty(),
    validarCampos
],  CrearCategorias );

rutas.put('/:id', [
    ValidarJWT,
    check("nombre","el nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria);

rutas.delete('/:id',
//ValidarJWT,
    check("id").custom(existeCategoriaPorId),
    validarCampos
,borrarCategorias);



module.exports = rutas;