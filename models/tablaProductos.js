const {Schema, model} = require("mongoose");  

const ProductosEsquema = Schema({

    nombre: {
        type: String,
        required: [true, "el usuario es requerido"],
   
    },    
    descripccion: {
        type: String,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: false
    },
    precio: {
        type: Number,
        default: 0
    },
    img: {type: String},

    

});



ProductosEsquema.methods.toJSON = function(){
    const {__v,  ...data} = this.toObject(); //todo los que esta antes del expres Operitor no se ba ver osea ...data
    return data;

}

module.exports = model("Producto", ProductosEsquema);