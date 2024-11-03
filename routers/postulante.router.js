//rutas del modulo
const express = require("express");
const router = express.Router();

//// MULTER ////
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'IMG_usuarios'); // esta carpeta debe existir en el proyecto (raiz)
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); // segundos desde 1970
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        const fileTypes = /jpg|jpeg|png/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if(mimetype && path.extname) {
            return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1}, // aprox 1Mb
})

///////-------FIN MULTER--------////////

const controller = require("../controllers/postulante.controller"); //módulo de postulante

//metodo get

//para todas los postulante
router.get('/', controller.allPostulants);


//para un postulante
router.get('/:id_postulante', controller.showPostulants);

 //metodo post
router.post('/',upload.single("foto_post"), controller.storePostulants);


//metodo put
router.put('/:id_postulante', controller.updatePostulants);

//metodo delete
router.delete('/:id_postulante', controller.destroyPostulants);

//exportar routers
module.exports = router;
