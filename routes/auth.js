// usaremos express para las rutas
const express = require("express");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require('../models/index');

const { validatorRegisterItem, validatorLogin} = require("../validators/auth");

const router = express.Router();
/**
 * Crear un registro
 */
// TODO http://localhost/auth/login 
// TODO http://localhost/auth/register 
router.post("/register", validatorRegisterItem,async(req, res)=>{
    req = matchedData(req);
    const passwordEncrypt = await encrypt(req.password);
    const body = {...req, password:passwordEncrypt}
    const data = await usersModel.create(body)
    // esto para evitar que en la respuesta me muestre el password
    data.set("password", undefined, {strict: false});
    res.send({data})
});

module.exports = router