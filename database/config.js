// aqui bamos hacer la conneccion a nuestra bbdd osea mongodb y bamos a utilizar mongosse en ves del lenguaje sql
const mongoose = require('mongoose');



const conexionDB =async() =>{  //funcion de la conneccion a la bbdd

    //lo hacemos en un try catch

    try {

        // aqui le damos la url de la coneccin que tenemos en el archivo .env
        await mongoose.connect(process.env.MONGODB_CNN, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); 

        console.log("base de datos ");
        
    } catch (error) {

        console.log(error);
        throw new Error('Error a conectarse a la bbdd');
    }


};


module.exports ={
    conexionDB
}