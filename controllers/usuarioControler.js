//aqui creamos funciones y las exportamso ose alos controladores  o funcion del crud para bbdd  

const {response, request} = require('express'); // esta importacion siver para que JS sepa que nos referimos como res un las funciones de flecha

//--------------bamos a llamar la funcio para encriptar la password
const encriptar =require("bcryptjs");

const Usuario = require("../models/tablaUsuario");



const usuariosGet = (req= request, res = response)=>{

    const params =req.query; // aqui extramos los parametros de la reques osea cuando el usuario hace una busqueda en expecifico en el get

    res.json({  msg: 'get api --- controlador'});
};

//--------------------------------------------------------------------------------

const usuariosPost = async(req, res = response)=>{

 
    const { nombre, correo, password} =req.body; // extracion de la info que biene del body
    const usuario = new Usuario({nombre, correo, password});

   

    //encriptar la password
    const vueltas =encriptar.genSaltSync(); // numero de bueltas que encripta 
    usuario.password = encriptar.hashSync(password, vueltas ); //encripta de una sola via


    await usuario.save();  // metodo para que guarde a nuestra bbdd por eso el await de lo contrario si no sale bien no se insertana 

    res.json({  msg: 'post api --- controlador',
                nombre,
                correo,
                password
            });
};

const usuariosPut = (req, res = response)=>{
    const { id } = req.params  // esto biene de la ruta donde expres manda una variable en la req de los parametros y el nombre que le dimosen la ruta 

    res.json({  msg: 'put api --- controlador', id});
};

const usuariosDelete = (req, res = response)=>{

    res.json({  msg: 'delete api --- controlador'});
};


module.exports  ={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}