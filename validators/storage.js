const  {check} = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    // asi seria de forma abreviada
    // (req, res, next)=> validateResults(req, res, next)
    (req, res, next)=>{
        return validateResults(req, res, next)
    }
]

module.exports = {validatorGetItem}