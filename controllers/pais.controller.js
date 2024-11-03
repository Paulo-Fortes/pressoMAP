//controladores del modulo

//----Campos tabla----
//id_pais
//nombre_pais




const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los paises de la tabla
const allCountries = (req, res) => {
    const sql = "SELECT * FROM paises";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 pais específico de la tabla
const showCountries = (req, res) => {
    const {id_pais} = req.params;
    const sql = "SELECT * FROM paises WHERE id_pais = ?";
    db.query(sql, [id_pais], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe el pais buscado"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a modificar datos de la tabla
const storeCountries = (req, res) => {
    const {nombre_pais} = req.body;    
    const sql = "INSERT INTO paises (nombre_pais) VALUES (?)";
    db.query(sql, [nombre_pais], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const pais = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(pais); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a ingresar un pais a la tabla

const updateCountries = (req, res) => {
    const {id_pais} = req.params;
    const {nombre_pais} = req.body;
    const sql = "UPDATE paises SET nombre_pais=? WHERE id_pais=?";
    db.query(sql, [nombre_pais, id_pais], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El pais a modificar no existe"});
        };
        const pais = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(pais); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar un pais de la tabla

const destroyCountries = (req, res) => {
    const {id_pais} = req.params;
    const sql = "DELETE FROM paises WHERE id_pais = ?";
    db.query(sql,[id_pais], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR El pais a borrar no existe"});
        };
        res.json({mesaje: "Pais Eliminado :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allCountries, 
    showCountries,
    storeCountries,
    updateCountries,
    destroyCountries
};