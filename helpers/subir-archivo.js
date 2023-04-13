const { v4: uuidv4 } = require('uuid');
const path_ruta = require('path');


const subirArchivo = (files , extencionesValidas =['png', 'jpg','jpeg', 'gif'], carpeta = "") =>{
    //bamos a trabajr con promesas en algo que salga bien o mal 


    return new Promise((resolve , reject) =>{

            
        const {archivos} = files;
        const nombreCortado = archivos.name.split('.'); // mira el nombre que biene en el body o req y los separa por puntos 
        const extencion = nombreCortado[ nombreCortado.length - 1];  // lo que hace que jala del nombrecortado el ultimo termino por ose la extencion ejmoplo hombe.jpg  entonces corta  y extrae el ultimo termino .jpg  


        //validar las extenciones permitidas
        //const extencionesValidas = ['png', 'jpg','jpeg', 'gif'];  //arreglo de las estenciones

        if( !extencionesValidas.includes(extencion)){

            return reject(`la extencion ${extencion} no es valida,  ${extencionesValidas}`)
        }

        const nombreTemporalArvhivo =uuidv4() + "." + extencion;  // aqui nos da un id generado y le concatenamos el  ". + extencion"

        const uploadPath =path_ruta.join( __dirname,  '../uploads/' , carpeta ,nombreTemporalArvhivo); //construccion de la ruta del arvhivo
    
        archivos.mv(uploadPath, (err) => {   // esta funcion mueve el archivo a la carpeta que creamos de lo contrario muestra el err 
            if (err) {
                
                reject(err)
            }

            resolve(nombreTemporalArvhivo); 
        });


    });

    

};



module.exports = subirArchivo;