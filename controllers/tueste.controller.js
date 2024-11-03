//controladores del modulo

//----Campos tabla----
//id_tueste
//nombre_tueste



const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los tuestes de la tabla
const allRoasts = (req, res) => {
    const sql = "SELECT * FROM tuestes";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 tueste específico de la tabla
const showRoasts = (req, res) => {
    const {id_tueste} = req.params;
    const sql = "SELECT * FROM tuestes WHERE id_tueste = ?";
    db.query(sql, [id_tueste], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe el tueste buscado"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a modificar datos de la tabla
const storeRoasts = (req, res) => {
    const {nombre_tueste} = req.body;    
    const sql = "INSERT INTO tuestes (nombre_tueste) VALUES (?)";
    db.query(sql, [nombre_tueste], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const tueste = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(tueste); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a ingresar un tueste a la tabla

const updateRoasts = (req, res) => {
    const {id_tueste} = req.params;
    const {nombre_tueste} = req.body;
    const sql = "UPDATE tuestes SET nombre_tueste=? WHERE id_tueste=?";
    db.query(sql, [nombre_tueste, id_tueste], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El tueste a modificar no existe"});
        };
        const tueste = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(tueste); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar un tueste de la tabla

const destroyRoasts = (req, res) => {
    const {id_tueste} = req.params;
    const sql = "DELETE FROM tuestes WHERE id_tueste = ?";
    db.query(sql,[id_tueste], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El tueste a borrar no existe"});
        };
        res.json({mesaje: "Tueste Eliminado :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allRoasts, 
    showRoasts,
    storeRoasts,
    updateRoasts,
    destroyRoasts
};