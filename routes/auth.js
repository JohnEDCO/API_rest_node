// usaremos express para las rutas
const express = require("express");
const { validatorRegisterItem, validatorLogin} = require("../validators/auth");
const { loginController, registerController } = require("../controllers/auth");

const router = express.Router();
/**
 * Crear un registro
 */
// TODO http://localhost/auth/register 
router.post("/register", validatorRegisterItem,registerController);
/**
 * Loguearse
 */
// TODO http://localhost/auth/login 
router.post("/login", validatorLogin,loginController);

module.exports = router