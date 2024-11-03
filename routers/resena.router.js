//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/resena.controller"); 

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos las reseñas de la tabla
router.get('/', controller.allReviews);
//MÉTODO 1.2 GET - Trae apenas 1 reseña específica de la tabla
router.get('/:id_resena', controller.showReviews);
//MÉTODO 2 POST - Va a modificar datos de la tabla
router.post('/', controller.storeReviews);
//MÉTODO 3 PUT - Va a ingresar una reseña a la tabla
router.put('/:id_resena', controller.updateReviews);
//MÉTODO 4 DELETE - Va a borrar una reseña de la tabla
router.delete('/:id_resena', controller.destroyReviews);


//exportar routers
module.exports = router;