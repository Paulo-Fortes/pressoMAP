//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/barrio.controller"); 

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los barrios de la tabla
router.get('/', controller.allDistricts);
//MÉTODO 1.2 GET - Trae apenas 1 barrio específico de la tabla
router.get('/:id_barrio', controller.showDistricts);
//MÉTODO 2 POST - Va a ingresar datos de la tabla
router.post('/', controller.storeDistricts);
//MÉTODO 3 PUT - Va a modificar un barrio a la tabla
router.put('/:id_barrio', controller.updateDistricts);
//MÉTODO 4 DELETE - Va a borrar un barrio de la tabla
router.delete('/:id_barrio', controller.destroyDistricts);


//exportar routers
module.exports = router;