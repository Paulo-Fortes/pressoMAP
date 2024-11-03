//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/grano.controller"); 

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los granos de la tabla
router.get('/', controller.allGrains);
//MÉTODO 1.2 GET - Trae apenas 1 grano específica de la tabla
router.get('/:id_grano', controller.showGrains);
//MÉTODO 2 POST - Va a modificar datos de la tabla
router.post('/', controller.storeGrains);
//MÉTODO 3 PUT - Va a ingresar un grano a la tabla
router.put('/:id_grano', controller.updateGrains);
//MÉTODO 4 DELETE - Va a borrar una cafeteria de la tabla
router.delete('/:id_grano', controller.destroyGrains);


//exportar routers
module.exports = router;