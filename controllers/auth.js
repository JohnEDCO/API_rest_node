const { usersModel } = require('../models/index');
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");

/**
 * Encargado de registrar un usuario y asingar el jwt
 * @param {*} req 
 * @param {*} res 
 */
const registerController = async (req, res) => {
    try {
        req = matchedData(req);
        const passwordEncrypt = await encrypt(req.password);
        const body = { ...req, password: passwordEncrypt }
        const dataUser = await usersModel.create(body)
        // esto para evitar que en la respuesta me muestre el password
        dataUser.set("password", undefined, { strict: false });

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}
/**
 * Encargado de loguear al usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginController = async (req, res) => {
    try {
        req = matchedData(req);
        // se usa el select porque en el modelo le dimos que el pasword se ocultara por eso toca asi
        const user = await usersModel.findOne({email: req.email})
        .select('password name role email');
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404);
            return
        }

        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword)
        if(!check){
            handleHttpError(res, 'PASSWORD_INVALID', 401)
            return
        }
        user.set("password", undefined, {strict:false})
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send({data, req})
    } catch (error) {  
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}
// ponerlos en llaves significa destructuracion(destructuring)
module.exports = { loginController, registerController } 