const mongoose = require('mongoose');

const dbConnect = ()=>{
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }, (err, res)=>{
        if(!err){
            console.log("------ Conexión exitosa ------")
        }else{
            console.log("------ Error de conexión ------");
        }
    });
}
//exportamos esta funcion para poder usar esta funcion desde cualquier otro archivo
module.exports = dbConnect

