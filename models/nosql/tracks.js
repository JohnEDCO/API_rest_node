const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete");
// para definir el esquema
const TracksScheme =  new mongoose.Schema(
    {
        name:{
            type: String
        },
        album:{
            type: String
        },
        cover:{
            type:String,
            validate: {
                validator: (req) =>{
                    return true
                },
                message: "ERROR_URL"
            }
        },
        artist:{
            name:{
                type: String
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration:{
            start:{
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId:{
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps:true, //TODO createdAT, updatedAt (con esta variable me crea esos dos campos en todo dato que yo creeo en mongo)
        versionKey: false
    }
);
// el override es para que sobbrescriba los metodos que vienen nativos del mongoose con la opcion del mongoose-delete
TracksScheme.plugin(mongooseDelete, {overrideMethods: "all"})

// El primer dato es el nombre de la coleccion(tabla)
module.exports = mongoose.model("tracks", TracksScheme)