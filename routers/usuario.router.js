//rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/usuario.controller"); 

//--------- M U L T E R ----------

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb)=> {
        cb(null, 'IMG_usuarios'); // esta carpeta debe existir en el proyecto
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

//const upload = multer({storage:"storage"});
const uploads = multer({

    storage,
    fileFilter: (req, file, cb)=>{
            console.log(file);
            const filetypes = /jpg|jpeg|png|webp/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(
                path.extname(file.originalname).toLowerCase()
            );
            if (mimetype && path.extname){
                return cb(null, true);
            };
            cb("Tipo de archivo no soportado");
        },
        limits: {fileSize: 1024 * 1024 * 1}, //aprox. 1mb
    });


//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los usuarios de la tabla
router.get('/', controller.allUsers);
//MÉTODO 1.2 GET - Trae apenas 1 usuario específico de la tabla
router.get('/:id_usuario', controller.showUsers);
//MÉTODO 2 POST - Va a ingresar datos de la tabla
router.post('/', uploads.single('imagen_usuario'), controller.storeUsers);
//MÉTODO 3 PUT - Va a modificar un usuario a la tabla
router.put('/:id_usuario', controller.updateUsers);
//MÉTODO 4 DELETE - Va a borrar un usuario de la tabla
router.delete('/:id_usuario', controller.destroyUsers);


//exportar routers
module.exports = router;