// usaremos express para las rutas
const express = require("express");
const { getItems, createItem, getItem, updateItem, deleteItem } = require("../controllers/tracks");
const customHeader = require("../middleware/customHeader");
const { validatorCreateItem, validatorGetItem, validatorUpdateItem } = require("../validators/tracks");

const router = express.Router();

// TODO http://localhost/tracks  GET, POST, DELETE, PUT
/**
 * Listar los items
 */
router.get("/", getItems);
/**
 * Traer detalles de un item
 */
 router.get("/:id",validatorGetItem, getItem);
/**
 * Crear un item
 */
// router.post("/",validatorCreateItem,customHeader,createItem);
router.post("/",validatorCreateItem,createItem);
/**
 * Actualizar un item
 */
 router.put("/:id",validatorGetItem,validatorUpdateItem, updateItem);
/**
 * Eliminar un item
 */
 router.delete("/:id",validatorGetItem, deleteItem);

module.exports = router