const { matchedData } = require('express-validator');
const { tracksModel } = require('../models/index');
const { handleHttpError } = require('../utils/handleError');
/**
 * Obetener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const {user} = req
        const data = await tracksModel.find({})
        res.send({ data, user});
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }

}
/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async(req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findById(id)
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEM')
    }
}
/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {

    try {
        // ejemplo de matchedData que nos limpia los datos que no son necesarion en la peticion, esto para evitar que nos envien valores
        // noo validos en la peticion, matchedData nos limpia esto.
        const body = matchedData(req);

        // asi seria la forma normal 
        // const body = req.body;

        // cuando la constante se llama igual que la propiedad que vamos a usar, hacemos esto
        // ponemos la constante entre corchetes y ya no es necesario hacer uso de la propiedad
        // const { body } = req; //asi seria usando destructuring
        const data = await tracksModel.create(body);
        res.send({ data })

    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }

}
/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async(req, res) => {
    try {

        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(
            id,body
        );
        res.send({ data })

    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
}
/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async(req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        // const data = await tracksModel.deleteOne({_id:id})//con deleteOne me hace el borrado fisico
        const data = await tracksModel.delete({_id:id})//con delete se hace borrado logico
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}
// ponerlos en llaves significa destructuracion(destructuring)
module.exports = { getItems, getItem, createItem, updateItem, deleteItem } 