require("dotenv").config() //para que funcione bien nuestro .env en todo el entorno y poder usaar las variables de entorno
const express = require("express")
const cors = require("cors")
const dbConnect = require('./config/mongo');
const appp = express()

appp.use(cors())

const port = process.env.PORT || 3000

appp.listen(port,()=>{
    console.log(`Tu app esta lista por http://localhost:${port}`)
})
dbConnect()