//controladores del modulo

//----Campos tabla----
//id_grano
//nombre_grano
//id_pais




const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los granos de la tabla
const allGrains = (req, res) => {
    const sql = "SELECT * FROM granos";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 grano específico de la tabla
const showGrains = (req, res) => {
    const {id_grano} = req.params;
    const sql = "SELECT * FROM granos WHERE id_grano = ?";
    db.query(sql, [id_grano], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe el grano buscado"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a modificar datos de la tabla
const storeGrains = (req, res) => {
    const {nombre_grano, id_pais} = req.body;    
    const sql = "INSERT INTO granos (nombre_grano, id_pais) VALUES (?,?)";
    db.query(sql, [nombre_grano, id_pais], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const grano = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(grano); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a ingresar un grano a la tabla

const updateGrains = (req, res) => {
    const {id_grano} = req.params;
    const {nombre_grano, id_pais} = req.body;
    const sql = "UPDATE granos SET nombre_grano=?, id_pais=? WHERE id_grano=?";
    db.query(sql, [nombre_grano, id_pais, id_grano], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El grano a modificar no existe"});
        };
        const grano = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(grano); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar un grano de la tabla

const destroyGrains = (req, res) => {
    const {id_grano} = req.params;
    const sql = "DELETE FROM granos WHERE id_grano = ?";
    db.query(sql,[id_grano], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El grano a borrar no existe"});
        };
        res.json({mesaje: "Grano Eliminado :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allGrains, 
    showGrains,
    storeGrains,
    updateGrains,
    destroyGrains
};