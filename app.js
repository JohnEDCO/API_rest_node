require("dotenv").config() //para que funcione bien nuestro .env en todo el entorno y poder usaar las variables de entorno
const express = require("express");
const cors = require("cors");
const morganBody = require('morgan-body');
const loggerStream = require('./utils/handleLogger');
const dbConnect = require('./config/mongo');
const app = express()

app.use(cors());
// esto para que pueda recibir informacion a traves de POST
app.use(express.json());
app.use(express.static('storage'));

morganBody(app, {
    noColors:true,
    stream:loggerStream,
    skip: function(req, res){
        return res.statusCode < 400 //TODO 2xx, 3xx, etc. lo va a omitir
    }
})
const port = process.env.PORT || 3000

//---------------Aqui se invocan las rutas---------------
// TODO localhost/api/______________  (todo lo que venga) en este caso solo cuando se ingresa a tracks
// app.use("/api", require("./routes/tracks"))
// Pero de esta forma hacemos mas dinamico estos llamados, ya que no necesitamos
// crear muchas lineas para cada ruta.
app.use("/api", require("./routes")) //con ponerle solamente routes, el sabe que estamos haciendo referencia al index
// -------------------------------------------------------
app.listen(port, () => {
    console.log(`Tu app esta lista por http://localhost:${port}`)
})
dbConnect()