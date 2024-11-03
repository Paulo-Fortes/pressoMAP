//controladores del modulo

//----Campos tabla----
//id_barrio
//nombre_barrio


const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los barrios de la tabla
const allDistricts = (req, res) => {
    const sql = "SELECT * FROM barrios";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 barrio específico de la tabla
const showDistricts = (req, res) => {
    const {id_barrio} = req.params;
    const sql = "SELECT * FROM barrios WHERE id_barrio = ?";
    db.query(sql, [id_barrio], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe el barrio buscado"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a ingresar un barrio a la tabla
const storeDistricts = (req, res) => {
    const {nombre_barrio} = req.body;    
    const sql = "INSERT INTO barrios (nombre_barrio) VALUES (?)";
    db.query(sql, [nombre_barrio], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const barrio = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(barrio); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a actualizar un barrio de la tabla

const updateDistricts = (req, res) => {
    const {id_barrio} = req.params;
    const {nombre_barrio} = req.body;
    const sql = "UPDATE barrios SET nombre_barrio=? WHERE id_barrio = ?";
    db.query(sql, [nombre_barrio, id_barrio], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El barrio a modificar no existe"});
        };
        const barrio = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(barrio); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar un barrio de la tabla

const destroyDistricts = (req, res) => {
    const {id_barrio} = req.params;
    const sql = "DELETE FROM barrios WHERE id_barrio = ?";
    db.query(sql,[id_barrio], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El barrio a borrar no existe"});
        };
        res.json({mesaje: "Barrio Eliminado :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allDistricts, 
    showDistricts,
    storeDistricts,
    updateDistricts,
    destroyDistricts
};