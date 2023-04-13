const { response } = require("express");


const validarArchivoSubir = (req, res = response , next) =>{


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivos) {  // pregunta si biene en la req el file si no manda el error400
        return res.status(400).json({
            msg: "no hay arvhivos en la peticion - validarArchivoSubir"});   // error 400 cuando no hay arvhivo en la req
      }

      next();
};







module.exports = validarArchivoSubir;