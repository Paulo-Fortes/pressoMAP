//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/marca.controller"); 

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos las marcas de la tabla
router.get('/', controller.allBrands);
//MÉTODO 1.2 GET - Trae apenas 1 marca específica de la tabla
router.get('/:id_marca', controller.showBrands);
//MÉTODO 2 POST - Va a modificar datos de la tabla
router.post('/', controller.storeBrands);
//MÉTODO 3 PUT - Va a ingresar una marca a la tabla
router.put('/:id_marca', controller.updateBrands);
//MÉTODO 4 DELETE - Va a borrar una marca de la tabla
router.delete('/:id_marca', controller.destroyBrands);


//exportar routers
module.exports = router;