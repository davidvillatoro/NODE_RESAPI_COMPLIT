const { response } = require("express");
const { Categoria } = require("../models");


//obtenerCategogias - paginado - total
const obtenerCategogias = async(req  , res = response) =>{
    const {limite = 5, desde = 0} = req.query;  //paginado ose de 5 elementes
    const query ={ estado: true};  // si ponemos campoestado solo los true se muestran

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),  //nos da el nuemor de elentos que tengamos
        Categoria.find(query)  //hacemos el filrtro
            .skip(Number(desde))
            .limit(Number(limite))  //aqui solo pasamos a numero por que en la query siempre biene en string 
    ]);

    res.json({
        total,
        categorias
    });


};


//obtenerCategoriaID 
const obtenerCategoriaID = async (req, res = response) =>{

    const { id } = req.params; // estraemos el id que traemos de los paramatres de la req

    //verificamos si esta la categoria con el id
    const categoria = await Categoria.findById(id);

    res.json( categoria);
};


const CrearCategorias =async(req, res = response) =>{

    const nombre = req.body.nombre.toUpperCase(); // extraemos el nombre del body y lo pasamos a mayusculas 

    const categoriaDB =  await Categoria.findOne({nombre}); //consulta si ya existe en la bbdd
    if(categoriaDB){
        return res.json({
            OK: false,
            msg: `la categoria ${categoriaDB.nombre} ya existe`
        });
    }

    //genetar los datos a Guardar
    const datos = {
        nombre
    }

    const categoria = new Categoria( datos );  // pasamos los datos a la const de categoria

    //guarda db
    await categoria.save();
    

    res.status(201).json({
        OK: true,
        categoria});


};



//put-categorias

const actualizarCategoria = async (req, res = response) =>{
    const { id } = req.params;
    const { ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true}); // modifica o actualiza los datos con el metodo findbyidandUpdate y mandamos el id de la categoria y los datos que modificamos y el arreglo {new: true} es para que muestre los datos actualizados  en pantalla

    res.json(categoria);
    

};


//delete categorias

const borrarCategorias = async (req, res = response) =>{

    const { id } = req.params;

    const categoriaDelete = await Categoria.findByIdAndDelete(id, {new: true});

    res.json({
        msg: `se borro la categoria ${categoriaDelete.nombre}`
    });

}



module.exports = {
    CrearCategorias,
    obtenerCategogias,
    obtenerCategoriaID,
    actualizarCategoria,
    borrarCategorias
}