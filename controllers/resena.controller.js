//controladores del modulo

//----Campos tabla----
//id_resena
//nota_resena
//comentario_resena
//id_cafeteria
//id_cafe
//id_tamano



const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todas las reseñas de la tabla
const allReviews = (req, res) => {
    const sql = "SELECT * FROM resenas";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 reseña específica de la tabla
const showReviews = (req, res) => {
    const {id_resena} = req.params;
    const sql = "SELECT * FROM resenas WHERE id_resena = ?";
    db.query(sql, [id_resena], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe la reseña buscada"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a modificar datos de la tabla
const storeReviews = (req, res) => {
    const {nota_resena, comentario_resena, id_cafeteria, id_cafe, id_tamano} = req.body;    
    const sql = "INSERT INTO resenas (nota_resena, comentario_resena, id_cafeteria, id_cafe, id_tamano) VALUES (?,?,?,?,?)";
    db.query(sql, [nota_resena, comentario_resena, id_cafeteria, id_cafe, id_tamano], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const resena = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(resena); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a ingresar una reseña a la tabla

const updateReviews = (req, res) => {
    const {id_resena} = req.params;
    const {nota_resena, comentario_resena, id_cafeteria, id_cafe, id_tamano} = req.body;
    const sql = "UPDATE resenas SET nota_resena=?, comentario_resena=?, id_cafeteria=?, id_cafe=?, id_tamano=? WHERE id_resena=?";
    db.query(sql, [nota_resena, comentario_resena, id_cafeteria, id_cafe, id_tamano, id_resena], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La reseña a modificar no existe"});
        };
        const resena = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(resena); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar una reseña de la tabla

const destroyReviews = (req, res) => {
    const {id_resena} = req.params;
    const sql = "DELETE FROM resenas WHERE id_resena = ?";
    db.query(sql,[id_resena], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La reseña a borrar no existe"});
        };
        res.json({mesaje: "Reseña Eliminada :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allReviews, 
    showReviews,
    storeReviews,
    updateReviews,
    destroyReviews
};