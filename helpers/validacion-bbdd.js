const { Categoria, Producto } = require("../models");


//validadores personalisados 

const existeCategoriaPorId = async (id) =>{
    //verificamos si existe el id
    const existeId = await Categoria.findById(id);
    if(!existeId){
        throw new Error(`el id no existe ${id}`);
    }
};


const existeProductoPorID = async (id) =>{

    const ExisteID = await Producto.findById(id);

    if(!ExisteID){
        throw new Error(`el id no existe ${id}`)
    }
}


//validar colecciones permitidas 
const coleccionesPermitidas= ( coleccion = '' , colecciones = []) =>{

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error (`la coleccion ${ coleccion} no es permitida - ${colecciones}`)
    }

    return true;
};


module.exports ={
    existeCategoriaPorId,
    existeProductoPorID,
    coleccionesPermitidas
}