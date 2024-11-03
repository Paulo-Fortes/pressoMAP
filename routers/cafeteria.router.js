//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/cafeteria.controller"); 

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos las cafeterias de la tabla
router.get('/', controller.allCoffeeShops);
//MÉTODO 1.2 GET - Trae apenas 1 cafeteria específica de la tabla
router.get('/:id_cafeteria', controller.showCoffeeShops);
//MÉTODO 2 POST - Va a ingresar datos a la tabla
router.post('/', controller.storeCoffeeShops);
//MÉTODO 3 PUT - Va a modificar una cafeteria de la tabla
router.put('/:id_cafeteria', controller.updateCoffeeShops);
//MÉTODO 4 DELETE - Va a borrar una cafeteria de la tabla
router.delete('/:id_cafeteria', controller.destroyCoffeeShops);


//exportar routers
module.exports = router;