const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete");

// para definir el esquema
const StorageScheme =  new mongoose.Schema(
    {
        url:{
            type: String,
        },
        filename:{
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps:true, //TODO createdAT, updatedAt (con esta variable me crea esos dos campos en todo dato que yo creeo en mongo)
    }
);
// el override es para que sobbrescriba los metodos que vienen nativos del mongoose con la opcion del mongoose-delete
StorageScheme.plugin(mongooseDelete, {overrideMethods: "all"})
// El primer dato es el nombre de la coleccion(tabla)
module.exports = mongoose.model("storages", StorageScheme)