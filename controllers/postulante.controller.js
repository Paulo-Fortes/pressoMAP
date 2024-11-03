//controladores del modulo

    //----Campos tabla----
    //idUsuario
    //nombreUsuario
    //nombreLocal
    //fechaComentario
    //campoComentario

const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los postulantes de la tabla
const allPostulants = (req, res) => {
    const sql = "SELECT * FROM postulantes";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 postulante específico de la tabla
const showPostulants = (req, res) => {
    const {id_postulante} = req.params;
    const sql = "SELECT * FROM postulantes WHERE id_postulante = ?";
    db.query(sql, [id_postulante], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe el postulante buscado"});
        };
        res.json(rows[0]);
        //me muestra el elemento en la posicion cero si existe.
    });
};

//MÉTODO 2 POST - Va a ingresar un postulante a la tabla
const storePostulants = (req, res) => {
    console.log(req.file);
    let userimagen="";
    if (req.file){
        userimagen=req.file.filename;
    };
    const {nombre_post, apellido_post, email_post, comentario_post} = req.body;    
    const sql = "INSERT INTO postulantes (nombre_post, apellido_post, email_post, foto_post, comentario_post) VALUES (?,?,?,?,?)";
    db.query(sql, [nombre_post, apellido_post, email_post, userimagen, comentario_post], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const postulante = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(postulante); //muestra creado con éxito el elemento
    });
    

};

//MÉTODO 3 PUT - Va a ingresar un postulante a la tabla
const updatePostulants = (req, res) => {
    const {id_postulante} = req.params;
    const {nombre_post, apellido_post, email_post, foto_post, comentario_post} = req.body;
    const sql = "UPDATE postulantes SET nombre_post=?, apellido_post=?, email_post=?, foto_post=?, comentario_post=? WHERE id_postulante = ?";
    db.query(sql, [nombre_post, apellido_post, email_post, foto_post, comentario_post, id_postulante], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El postulante a modificar no existe"});
        };
        const postulante = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(postulante); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar un postulante de la tabla
const destroyPostulants = (req, res) => {
    const {id_postulante} = req.params;
    const sql = "DELETE FROM postulantes WHERE id_postulante = ?";
    db.query(sql,[id_postulante], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: el postulante a borrar no existe"});
        };
        res.json({mesaje: "Postulante Eliminado"});
    });
};

module.exports = {
    allPostulants,
    showPostulants,
    storePostulants,
    updatePostulants,
    destroyPostulants
};