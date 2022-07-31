const fs = require('fs');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models/index');
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL || null;
const MEDIA_PATH = `${__dirname}/../storage`;
/**
 * Obetener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_GET__LIST_ITEMS_STORAGE")
    }

}
/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const request = matchedData(req);
        const { id } = request;
        const data = await storageModel.findById(id)
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_DETAIL_ITEM_STORAGE');
    }
}
/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const { file } = req; //asi seria usando destructuring
        console.log(file);
        const fileData = {
            url: `${PUBLIC_URL}/${file.filename}`,
            filename: file.filename,
        }
        const data = await storageModel.create(fileData);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ITEM_STORAGE');

    }

}
/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.deleteOne({_id:id});
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;

        fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1
        };
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_ITEM_STORAGE');
    }
}
// ponerlos en llaves significa destructuracion(destructuring)
module.exports = { getItems, getItem, createItem,deleteItem } 