const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete");

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
            type:String,
            select:false // con esto evitamos que en las consultas se muestre este campo
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

// el override es para que sobbrescriba los metodos que vienen nativos del mongoose con la opcion del mongoose-delete
UsersSchema.plugin(mongooseDelete, {overrideMethods: "all"})

// El primer dato es el nombre de la coleccion(tabla)
module.exports = mongoose.model("users", UsersSchema)