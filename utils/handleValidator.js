const { validationResult } = require("express-validator")

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw(); // aqui valida lo que se esta mandando por la peticion
        return next(); // ESto es decirle continua con lo que sigue en el proceso
    } catch (error) {
        res.status(403);
        res.send({errors: error.array()});
    }
}

module.exports = validateResults;