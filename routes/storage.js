const express = require('express');
const { createItem, getItems, getItem, deleteItem } = require('../controllers/storage');
const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require('../validators/storage');

const router = express.Router();
// TODO http://localhost:3001/api/storage
/**
 * Traer items
 */
 router.get("/", getItems);
/**
 * Traer detalle de un item
 */
router.get("/:id",validatorGetItem, getItem);
/**
 * borrar un item
 */
router.delete("/:id",validatorGetItem, deleteItem);

// single porque solo vamos a subir de a un archivo, si fueran varios usariamos multi()
router.post("/",uploadMiddleware.single("myfile"), createItem)

module.exports = router;