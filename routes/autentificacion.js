
const {Router} = require('express');  
const { check } = require('express-validator');
const { Login } = require('../controllers/auth-controlador');
const { validarCampos } = require('../middlewares/validar-campos');
//const {  usuariosPost } = require('../controllers/usuarioControler');


const rutas = Router();


rutas.post('/login',[
    check("correo", "el correo es obligatorio").isEmail(),
    check('password', "la password es obligatoria").not().isEmpty(),
    validarCampos
], Login);



module.exports = rutas;