const { handleHttpError } = require("../utils/handleError");


/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        console.log(user);
        const rolesByUser = user.role;
        // TODOS: en roles llegaria un array con los roles ejemplo -> ["Admin", "User","Client"] lo que hacemos es verificar si de los roles que
        // Llegaron en el array estanm en el request de la peticion
        const checkValueRol = roles.some((rolSingle)=> rolesByUser.includes(rolSingle)); //TODO: true, false
        if(!checkValueRol){
            handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
            return;
        }
        next();
    } catch (error) {
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }

}
module.exports = checkRol;