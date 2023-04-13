// aqui bamos a protejer las rutas y siempre esto en las rutas la validacion ba primera antes que las demas 

const { request, response } = require("express");

const jwt = require("jsonwebtoken");


const ValidarJWT =( req = request, res = response, next ) =>{

    const token = req.header("x_token"); //asi como isimos aqui asi el fronent tiene que enviarlos en los header x-token

    if(!token){
        return res.status(401).json({
            msg: "no hay token en la peticion"
        })
    }

    try {

       const {uid} =  jwt.verify( token, process.env.SECRETORPRIVATEKEY ); //verifica el JWT


        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })        
    }


};

module.exports ={
    ValidarJWT
}
