//controladores del modulo

//----Campos tabla----
//id_marca
//nombre_marca




const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todas las marcas de la tabla
const allBrands = (req, res) => {
    const sql = "SELECT * FROM marcas";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 marca específica de la tabla
const showBrands = (req, res) => {
    const {id_marca} = req.params;
    const sql = "SELECT * FROM marcas WHERE id_marca = ?";
    db.query(sql, [id_marca], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe la marca buscada"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a modificar datos de la tabla
const storeBrands = (req, res) => {
    const {nombre_marca} = req.body;    
    const sql = "INSERT INTO marcas (nombre_marca) VALUES (?)";
    db.query(sql, [nombre_marca], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const marca = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(marca); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a ingresar una marca a la tabla

const updateBrands = (req, res) => {
    const {id_marca} = req.params;
    const {nombre_marca} = req.body;
    const sql = "UPDATE marcas SET nombre_marca=? WHERE id_marca=?";
    db.query(sql, [nombre_marca, id_marca], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La marca a modificar no existe"});
        };
        const marca = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(marca); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar una marca de la tabla

const destroyBrands = (req, res) => {
    const {id_marca} = req.params;
    const sql = "DELETE FROM marcas WHERE id_marca = ?";
    db.query(sql,[id_marca], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La marca a borrar no existe"});
        };
        res.json({mesaje: "Marca Eliminada :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allBrands, 
    showBrands,
    storeBrands,
    updateBrands,
    destroyBrands
};