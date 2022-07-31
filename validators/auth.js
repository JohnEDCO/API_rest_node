const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorRegisterItem = [
    check("name")
        .exists()
        .notEmpty()
        .isLength({ min: 5, max: 50 }),
    check("age")
        .exists()
        .notEmpty()
        .isNumeric(),
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 5, max: 15 }),
    // asi seria de forma abreviada
    // (req, res, next)=> validateResults(req, res, next)
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorLogin = [
    check("password")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 5, max: 15 }),
    // asi seria de forma abreviada
    // (req, res, next)=> validateResults(req, res, next)
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = {validatorRegisterItem, validatorLogin}