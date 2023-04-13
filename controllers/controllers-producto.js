const { query } = require("express");
const { response } = require("express");
const { Producto } = require("../models");


//obtenrProductos
const obtenrProductos = async (req, res = response) =>{

    //paginacion
    const {limite = 5, desde = 0} = req.query;
    const query ={estado: true};

    //promesa que muestre los datos
    const [total , productos] = await Promise.all([

        //MUESTRA lo que hay en total
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });

};



//obtenerProductoPorID

const obtenerProductoPorID = async (req, res = response) =>{

    const {id} = req.params;

    const producto = await  Producto.findById(id); //verificamos si esta la categoria con el id

    res.json( producto );

}



// crear productos

const crearProduto = async (req, res = response) =>{

    const {nombre, descripccion, categoria, precio} = req.body;
    

    const productoDB = await  Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            OK: false,
            msg: `el producto ${productoDB.nombre}, ya existe`
        });
    }


    const data ={
       nombre,descripccion,categoria,precio
    }

    const producto = new  Producto(data);

    await producto.save();

    res.status(201).json({
        OK:true ,
        producto});
    
};


// actualizandoProducto
const actualizandoProducto = async (req, res = response) =>{
 
    const { id } =req.params;
  
    const { categoria, ...data } = req.body;
    
    //data.nombre = data.nombre.toUpperCase();

    const producto = await  Producto.findByIdAndUpdate(id, data, {new: true});

    res.json( producto );
};

//elimianrProductto

const elimianrProductto = async (req, res = response) =>{

    const {id} = req.params;

    const eleminar = await Producto.findByIdAndDelete(id, {new: true});

    res.json({
        msg: `se borro la categoria ${eleminar.nombre}`
    });
};



module.exports ={
    crearProduto,
    obtenrProductos,
    obtenerProductoPorID,
    actualizandoProducto,
    elimianrProductto
}