const { response } = require("express");
const { Producto, Categoria } = require("../models");
const {ObjectId} = require("mongoose").Types;


const coleccionPermitidas =[  //bamos a poener todas las collecciones permitidas

    'categorias',
    'productos'
];


const buscarCategoria = async (termino="", res = response) => {

    const esMongoID = ObjectId.isValid( termino );  // mira  si el id es valido
    
    if( esMongoID ){
        const categoriass = await  Categoria.findById( termino ); //buca el id  y trae los datos
        
        return res.json({
            results: ( categoriass ) ? [ categoriass ]: []  // pergunta si si el id existe manda los resutaldos si no mando un vacio []
        });
    }
    
    const exprecionRegular = new RegExp( termino, "i");   // el termino es insensibloe a  las "MAYUSCULAS" y "miniscular"
    
    const categorNombre = await Categoria.find({nombre: exprecionRegular});  // busca por nombre lo que dise find es que el nombre sea igual al temino
    
    res.json({
        results: [categorNombre]  
    });
};

const buscarProductos  = async (termino, res = response) => {

    const esMongoID = ObjectId.isValid( termino );  // mira  si el id es valido

    if( esMongoID ){
        const productos = await Producto.findById( termino ); //buca el id  y trae los datos
        
        return res.json({
            results: ( productos ) ? [ productos ]: []  // pergunta si si el id existe manda los resutaldos si no mando un vacio []
        });
    }
    
    const exprecionRegular = new RegExp( termino, "i");   // el termino es insensibloe a  las "MAYUSCULAS" y "miniscular"
    
    const productoNombre = await Producto.find({
        
        $or: [{nombre: exprecionRegular}, {Categoria: exprecionRegular}  ]
    
    }).populate("categoria","nombre");

    res.json({
        results: [productoNombre]  
    });

}




const buscar  = (req, res = response) => {

    const {coleccion, termino }= req.params;

    if(!coleccionPermitidas.includes(coleccion)){  //balidacion para las colecciones

        return res.status(400).json({ msg: `las colecciones permitidas son ${coleccionPermitidas}`})
    }


    switch (coleccion) {       //mira que coleccion es y que busca

       case "categorias":
           buscarCategoria(termino, res)
           break;

       case "productos":
           buscarProductos(termino , res)
           break;

        default:
            res.status(500).json({msg: "se me olvido hacer esta busqueda"})
    }

    
};

  
module.exports ={ 
    buscar
} 