const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generarJWT");
const tablaUsuario = require("../models/tablaUsuario");



const Login =async(req, res = response) =>{

    const {correo, password} =req.body;  // lo que resibimos en el body

    try {

        //verificar si el email existe 
        const usuario = await tablaUsuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario/ password no son correctos - correo"
            })
        }
    
        //verificar la password
        const validarContra = bcryptjs.compareSync( password, usuario.password);  // aqui no llamamos el modelo de tabla de usuarios si no el bycryptsjs y el metodo compreSync que compara la password de la bbdd  y la que le mandamos el la req
        if(!validarContra){
            return res.status(400).json({
                msg: "Usuario/ password no son correctos - password"
            })
        }
        //generar JWT
        const token =await generarJWT( usuario.id );

        res.json({

            usuario,
            token
        })
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: "algo salio mal"
        })
        
    }

  
};



module.exports ={
    Login
} 











