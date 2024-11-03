//controladores del modulo

//----Campos tabla----
//id_genero
//nombre_genero



const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los generos de la tabla
const allGenders = (req, res) => {
    const sql = "SELECT * FROM generos";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 genero específico de la tabla
const showGenders = (req, res) => {
    const {id_genero} = req.params;
    const sql = "SELECT * FROM generos WHERE id_genero = ?";
    db.query(sql, [id_genero], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe el genero buscado"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a modificar datos de la tabla
const storeGenders = (req, res) => {
    const {nombre_genero} = req.body;    
    const sql = "INSERT INTO generos (nombre_genero) VALUES (?)";
    db.query(sql, [nombre_genero], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const genero = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(genero); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a ingresar un genero a la tabla

const updateGenders = (req, res) => {
    const {id_genero} = req.params;
    const {nombre_genero} = req.body;
    const sql = "UPDATE generos SET nombre_genero=? WHERE id_genero = ?";
    db.query(sql, [nombre_genero, id_genero], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El genero a modificar no existe"});
        };
        const genero = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(genero); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar un genero de la tabla

const destroyGenders = (req, res) => {
    const {id_genero} = req.params;
    const sql = "DELETE FROM generos WHERE id_genero = ?";
    db.query(sql,[id_genero], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El genero a borrar no existe"});
        };
        res.json({mesaje: "Genero Eliminado :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allGenders, 
    showGenders,
    storeGenders,
    updateGenders,
    destroyGenders
};