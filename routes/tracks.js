// usaremos express para las rutas
const express = require("express");
const { getItems, createItem, getItem, updateItem, deleteItem } = require("../controllers/tracks");
const customHeader = require("../middleware/customHeader");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const { validatorCreateItem, validatorGetItem, validatorUpdateItem } = require("../validators/tracks");
const router = express.Router();

// TODO http://localhost/tracks  GET, POST, DELETE, PUT
/**
 * Listar los items
 */
router.get("/",authMiddleware, getItems);
/**
 * Traer detalles de un item
 */
 router.get("/:id",authMiddleware,validatorGetItem, getItem);
/**
 * Crear un item
 */
// router.post("/",validatorCreateItem,customHeader,createItem);
router.post("/",authMiddleware, checkRol(["admin"]),validatorCreateItem,createItem);
/**
 * Actualizar un item
 */
 router.put("/:id",authMiddleware,validatorGetItem,validatorUpdateItem, updateItem);
/**
 * Eliminar un item
 */
 router.delete("/:id",authMiddleware,validatorGetItem, deleteItem);

module.exports = router