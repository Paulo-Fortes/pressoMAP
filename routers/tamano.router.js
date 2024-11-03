//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/tamano.controller"); 

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los tamaños de la tabla
router.get('/', controller.allSizes);
//MÉTODO 1.2 GET - Trae apenas 1 tamaño específica de la tabla
router.get('/:id_tamano', controller.showSizes);
//MÉTODO 2 POST - Va a modificar datos de la tabla
router.post('/', controller.storeSizes);
//MÉTODO 3 PUT - Va a ingresar un tamaño a la tabla
router.put('/:id_tamano', controller.updateSizes);
//MÉTODO 4 DELETE - Va a borrar un tamaño de la tabla
router.delete('/:id_tamano', controller.destroySizes);


//exportar routers
module.exports = router;