const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")

const authMiddleware = async(req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "ERROR_SESSION_TOKEN",401)
            return
        }
        // en el heeader la variable authorization viene con un inico que es barear y ese nolo necesitamos
        // por eso damos split y cogemos el ultimo valor quye seria el token
        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)
        if(!dataToken._id){
            handleHttpError(res, "ERROR_ID_TOKEN",401)
            return
        }
        const user = await usersModel.findById(dataToken._id)
        req.user = user
        next()
    } catch (error) {
        handleHttpError(res, "ERROR_NOT_SESSION",401)
    }
}

module.exports = authMiddleware