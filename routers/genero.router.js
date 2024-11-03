//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/genero.controller"); 

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos las cafeterias de la tabla
router.get('/', controller.allGenders);
//MÉTODO 1.2 GET - Trae apenas 1 cafeteria específica de la tabla
router.get('/:id_genero', controller.showGenders);
//MÉTODO 2 POST - Va a modificar datos de la tabla
router.post('/', controller.storeGenders);
//MÉTODO 3 PUT - Va a ingresar una cafeteria a la tabla
router.put('/:id_genero', controller.updateGenders);
//MÉTODO 4 DELETE - Va a borrar una cafeteria de la tabla
router.delete('/:id_genero', controller.destroyGenders);


//exportar routers
module.exports = router;