const { response } = require("express"); 
const subirArchivo = require("../helpers/subir-archivo");
const { Producto } = require("../models");
const path = require("path");
const fs = require("fs");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const CargarArchivos =async (req ,  res = response) =>{

  
    

    try {
      
      const nombre = await subirArchivo(req.files, undefined , 'imgs'); // comando para subir el archivo  que lo lee de req , undefined de las extencion permitidas y el nombre de la carpeta 
      
      res.json({ nombre });

    } catch (error) {

        res.status(400).json({ error})
      
    }
  
};



const actualizarImagen = async (req, res =response) =>{


    const {id , coleccion} = req.params;

    let modelo; 

    switch (coleccion) {
      case 'productos':
        modelo = await Producto.findById(id);
        if(!modelo){
          res.status(400).json({
            msg: `no existe un Producto con el id ${id}`
          });
        }
        break;
    
      default:
        return res.status(500).json({msg: 'se me olvido validar esto'});
    }

    
    // ---------------limpiar imagenes previas  -----------------
    if(modelo.img) {
      // hay que borrar la imagen del servidor
      const pathimagen  = path.join(__dirname, "../uploads" , coleccion, modelo.img);  // aqui mira en la ruta uploads de la collecion  si la imgen existe ose el modelo.img

      if( fs.existsSync(pathimagen)){  // entonces si file o arvhivo exiteste en el pathimgen 

        fs.unlinkSync(pathimagen);  // entonces borra esa imagen  anterior de esta ruta 
      }
    }

    const nombre = await subirArchivo(req.files, undefined ,  coleccion);  //sube la imagen de producto a la ruta de coleccion

    modelo.img =  await nombre;   // pasa la el id y la extencion a modelo

    await  modelo.save(); //guarda el nombre en la bbdd

    res.json(modelo);

};


//---------------------------------------------------------------------------------------------------------------------------------

const actualizarImagenCloudinary = async (req, res =response) =>{


  const {id , coleccion} = req.params;

  let modelo; 

  switch (coleccion) {
    case 'productos':
      modelo = await Producto.findById(id);
      if(!modelo){
        res.status(400).json({
          msg: `no existe un Producto con el id ${id}`
        });
      }
      break;
  
    default:
      return res.status(500).json({msg: 'se me olvido validar esto'});
  }

  
  // ---------------limpiar imagenes previas  -----------------
  if(modelo.img) {

    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1 ]; //extraemos lo ultimo partido por /
    const [ public_id] = nombre.split('.');  //aqui es al contrario lo primero que este separado por el .

     cloudinary.uploader.destroy(public_id);
  }


  const { tempFilePath } = req.files.archivos;

  const { secure_url }= await cloudinary.uploader.upload( tempFilePath );

  modelo.img =  await secure_url;   // pasa la el id y la extencion a modelo

  await  modelo.save(); //guarda el nombre en la bbdd

  res.json(modelo); 

};


//---------------


const MostrarImagen  = async(req , res = response) =>{

      const { id , coleccion} = req.params;

      let modelo; 

      switch (coleccion) {
        case 'productos':
          modelo = await Producto.findById(id);
          if(!modelo){
            res.status(400).json({
              msg: `no existe un Producto con el id ${id}`
            });
          }
          break;
      
        default:
          return res.status(500).json({msg: 'se me olvido validar esto'});
      }

      
      // ---------------limpiar imagenes previas  -----------------
      if(modelo.img) {
        // hay que borrar la imagen del servidor
        const pathimagen  = path.join(__dirname, "../uploads" , coleccion, modelo.img);  // aqui mira en la ruta uploads de la collecion  si la imgen existe ose el modelo.img

        if( fs.existsSync(pathimagen)){  // entonces si file o arvhivo exiteste en el pathimgen 

            return res.sendFile(pathimagen);  // debuelve la imgen para ser consumida en el fronent
        }
      }

  
      // si el producto no tiene imagen busca en  nuesta capreta asset y da la imagen por defecto
      const pathimagen = path.join(__dirname , '../assets/no-image.jpg');  
      res.sendFile(pathimagen);
};





module.exports ={
    CargarArchivos,
    actualizarImagen,
    MostrarImagen,
    actualizarImagenCloudinary
}