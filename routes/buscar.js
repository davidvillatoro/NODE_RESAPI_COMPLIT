// crearcion de una busqeuda que resiveba todo un id nombre categoria y asi todo lo ba bucar
const {Router} = require("express");
const { buscar } = require("../controllers/buscar");


const ruta = Router();

ruta.get("/:coleccion/:termino", buscar);
module.exports = ruta;