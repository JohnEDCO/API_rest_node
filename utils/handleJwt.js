const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
/**
 * Se debe pasar el objeto del usuario a la funcion
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return sign
};

/**
 * Pasamos el token de inicio de sesion (jwt)
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt)=>{
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        return null
    }
};

module.exports = {tokenSign, verifyToken}