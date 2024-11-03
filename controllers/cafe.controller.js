//controladores del modulo

//----Campos tabla----
//id_cafe
//nombre_cafe
//id_grano
//id_tueste


const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los cafes de la tabla
const allCoffees = (req, res) => {
    const sql = "SELECT * FROM cafes";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 cafe específico de la tabla
const showCoffees = (req, res) => {
    const {id_cafe} = req.params;
    const sql = "SELECT * FROM cafes WHERE id_cafe = ?";
    db.query(sql, [id_cafe], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe el cafe buscado"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a modificar datos de la tabla
const storeCoffees = (req, res) => {
    const {nombre_cafe, id_grano, id_tueste} = req.body;    
    const sql = "INSERT INTO cafes (nombre_cafe, id_grano, id_tueste) VALUES (?,?,?)";
    db.query(sql, [nombre_cafe, id_grano, id_tueste], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const cafe = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(cafe); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a ingresar un cafe a la tabla

const updateCoffees = (req, res) => {
    const {id_cafe} = req.params;
    const {nombre_cafe, id_grano, id_tueste} = req.body;
    const sql = "UPDATE cafes SET nombre_cafe=?, id_grano=?, id_tueste=? WHERE id_cafe = ?";
    db.query(sql, [nombre_cafe, id_grano, id_tueste, id_cafe], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El cafe a modificar no existe"});
        };
        const cafe = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(cafe); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar un cafe de la tabla

const destroyCoffees = (req, res) => {
    const {id_cafe} = req.params;
    const sql = "DELETE FROM cafes WHERE id_cafe = ?";
    db.query(sql,[id_cafe], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El cafe a borrar no existe"});
        };
        res.json({mesaje: "Cafe Eliminado :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allCoffees, 
    showCoffees,
    storeCoffees,
    updateCoffees,
    destroyCoffees
};