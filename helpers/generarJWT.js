const jwt = require("jsonwebtoken");


const generarJWT = (id = "") =>{

    // como es una callback bamso a generar la promesa manualmente
    return new Promise((resolve, reject) =>{

        const payload ={id};  //el payload es lo que nosotros enviamso en el jwt ojo no enviemos password o datos importantes

        //instruccion para generar el jwt
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{  //llama el payload y la llave publica
            expiresIn: "4h"  //expreta en 4 horas
        }, (err, token)=>{
            if( err ){
                console.log(err);
                reject( "no se pued generar el token")  // si el id no es valdio tira reject
            }else{
                resolve( token ); // si el id es valido geneta el jwt
            }
        })
    })

};


module.exports ={generarJWT}