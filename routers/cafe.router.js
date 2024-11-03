//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/cafe.controller"); 

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los cafes de la tabla
router.get('/', controller.allCoffees);
//MÉTODO 1.2 GET - Trae apenas 1 barrio específico de la tabla
router.get('/:id_cafe', controller.showCoffees);
//MÉTODO 2 POST - Va a modificar datos de la tabla
router.post('/', controller.storeCoffees);
//MÉTODO 3 PUT - Va a ingresar un barrio a la tabla
router.put('/:id_cafe', controller.updateCoffees);
//MÉTODO 4 DELETE - Va a borrar un barrio de la tabla
router.delete('/:id_cafe', controller.destroyCoffees);


//exportar routers
module.exports = router;