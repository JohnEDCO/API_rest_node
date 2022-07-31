const bcryptjs = require("bcryptjs");

/**
 * Contrasena sin encriptar : hola123.01
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain) => {
    // el segundo parametro es para la aletoriedad del hash, entre mas alto el numero sera mas aleatorio pero se demorara mas en generar
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash
}
/**
 * Pasar contrasena sin encriptar y pasar contrasena encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare }