const {Schema, model} = require("mongoose");  

const CategoriaEsquema = Schema({

    nombre: {
        type: String,
        required: [true, "el usuario es requerido"]
    },
   

});



CategoriaEsquema.methods.toJSON = function(){
    const {__v,  ...data} = this.toObject(); //todo los que esta antes del expres Operitor no se ba ver osea ...data
    return data;

}

module.exports = model("Categoria", CategoriaEsquema);