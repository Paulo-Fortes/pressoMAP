//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/pais.controller"); 

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los paises de la tabla
router.get('/', controller.allCountries);
//MÉTODO 1.2 GET - Trae apenas 1 pais específico de la tabla
router.get('/:id_pais', controller.showCountries);
//MÉTODO 2 POST - Va a modificar datos de la tabla
router.post('/', controller.storeCountries);
//MÉTODO 3 PUT - Va a ingresar un pais a la tabla
router.put('/:id_pais', controller.updateCountries);
//MÉTODO 4 DELETE - Va a borrar un pais de la tabla
router.delete('/:id_pais', controller.destroyCountries);


//exportar routers
module.exports = router;