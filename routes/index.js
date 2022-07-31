// usaremos express para las rutas
const express = require("express");
const fs = require("fs"); //este ya viene con node, no toca instalar nada
const router = express.Router();

// __dirname es una constante de node, y esto lo que hace es darnos la ruta absoluta
// donde se encuentra el archivo (en nuestra maquina)
const PATH_ROUTES = __dirname; 

//funcion para remover la extension al nombre del archivo que obtenemos en el array de abajo
const removeExtension = (fileName)=>{
    // "tracks.js" nos devolveeria ["tracks", "js"] para elejir el primero hacemos uso de shift()
    return fileName.split('.').shift()
}
// esto nos devuelve un arra con los nombres de los archivos que tenemos en al carpeta routes
fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name = removeExtension(file)
    if(name!=="index"){
        console.log(`cargando ruta ${name}`);
        // con el require le decimo que haga uso en especifico de esa ruta que ya tenemos creada en la carpeta routes
        router.use(`/${name}`, require(`./${file}`));
    }
});

module.exports = router