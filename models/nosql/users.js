const mongoose = require("mongoose")

// para definir el esquema
const UsersSchema =  new mongoose.Schema(
    {
        name:{
            type: String
        },
        age:{
            type:Number
        },
        email:{
            type:String,
            unique:true //para que no se repitan los correos
        },
        password:{
            type:String
        },
        role:{
            type:["user", "admin"],
            default: "user",
        }
    },
    {
        timestamps:true, //TODO createdAT, updatedAt (con esta variable me crea esos dos campos en todo dato que yo creeo en mongo)
        versionKey: false
    }
);
// El primer dato es el nombre de la coleccion(tabla)
module.exports = mongoose.model("users", UsersSchema)