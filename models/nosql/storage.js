const mongoose = require("mongoose")

// para definir el esquema
const StorageScheme =  new mongoose.Schema(
    {
        url:{
            type: String
        },
        filename:{
            type:Number
        }
    },
    {
        timestamps:true, //TODO createdAT, updatedAt (con esta variable me crea esos dos campos en todo dato que yo creeo en mongo)
        versionKey: false
    }
);
// El primer dato es el nombre de la coleccion(tabla)
module.exports = mongoose.model("storages", StorageScheme)