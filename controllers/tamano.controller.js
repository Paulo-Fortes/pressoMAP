//controladores del modulo

//----Campos tabla----
//id_tamano
//nombre_tamano




const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los tamaños de la tabla
const allSizes = (req, res) => {
    const sql = "SELECT * FROM tamanos";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 tamaño específico de la tabla
const showSizes = (req, res) => {
    const {id_tamano} = req.params;
    const sql = "SELECT * FROM tamanos WHERE id_tamano = ?";
    db.query(sql, [id_tamano], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe el tamaño buscado"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a modificar datos de la tabla
const storeSizes = (req, res) => {
    const {nombre_tamano} = req.body;    
    const sql = "INSERT INTO tamanos (nombre_tamano) VALUES (?)";
    db.query(sql, [nombre_tamano], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const tamano = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(tamano); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a ingresar un cafe a la tabla

const updateSizes = (req, res) => {
    const {id_tamano} = req.params;
    const {nombre_tamano} = req.body;
    const sql = "UPDATE tamanos SET nombre_tamano=? WHERE id_tamano=?";
    db.query(sql, [nombre_tamano, id_tamano], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El tamaño a modificar no existe"});
        };
        const tamano = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(tamano); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar un cafe de la tabla

const destroySizes = (req, res) => {
    const {id_tamano} = req.params;
    const sql = "DELETE FROM tamanos WHERE id_tamano = ?";
    db.query(sql,[id_tamano], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El tamaño a borrar no existe"});
        };
        res.json({mesaje: "Tamaño Eliminado :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allSizes, 
    showSizes,
    storeSizes,
    updateSizes,
    destroySizes
};