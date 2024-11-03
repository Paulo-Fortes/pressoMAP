//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/tueste.controller"); 

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los tuestes de la tabla
router.get('/', controller.allRoasts);
//MÉTODO 1.2 GET - Trae apenas 1 tueste específico de la tabla
router.get('/:id_tueste', controller.showRoasts);
//MÉTODO 2 POST - Va a modificar datos de la tabla
router.post('/', controller.storeRoasts);
//MÉTODO 3 PUT - Va a ingresar un tueste a la tabla
router.put('/:id_tueste', controller.updateRoasts);
//MÉTODO 4 DELETE - Va a borrar un tueste de la tabla
router.delete('/:id_tueste', controller.destroyRoasts);


//exportar routers
module.exports = router;