const { validationResult } = require('express-validator');

const Usuario = require("../models/tablaUsuario");

const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();

}

const emailExiste =async(correo ="") =>{
    //verifica si el correo existe
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail){

        throw new Error(`el correo: ${ correo }, ya esta registrado`);

    }
}
 
module.exports= {
    validarCampos,
    emailExiste,

};