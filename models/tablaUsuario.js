// bamos a crear nuestro modelo con mongose es igual que cuando creamos tablas con sql

const {Schema, model} = require("mongoose");  // jalamos de moongose el esquema y modelo

const usuarioEsquema = Schema({

    nombre: {
        type: String,
        required: [true, "el usuario es requerido"]
    },
    password: {
        type: String,
        required: [true, "password requerida"],
        unique: true
    },
    correo : {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        requerid: [true ,"el correo es requerido"]
    }

});


//bamos crear una funcion donde podemos extare los datos que no queremos mostrar y cambiarlo por ejemplo la contra no la queremos mostrar y el _id queremos que se bea uid

usuarioEsquema.methods.toJSON = function(){
    const {__v, password , _id, ...usuario} = this.toObject(); //todo los que esta antes del expres Operitor no se ba ver osea ...usuario
    usuario.uid = _id; //cambiamos el _id por uid y este si se ba poder ver  a la hora de llamar en get solo cambia la vista no en la bbdd
    return usuario;

}


module.exports = model("Usuario", usuarioEsquema);