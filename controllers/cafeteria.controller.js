//controladores del modulo

//----Campos tabla----
//id_cafeteria
//nombre_cafeteria
//enchufes_cafeteria
//id_barrio
//id_marca



const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los cafes de la tabla
const allCoffeeShops = (req, res) => {
    const sql = "SELECT * FROM cafeterias";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 cafe específico de la tabla
const showCoffeeShops = (req, res) => {
    const {id_cafeteria} = req.params;
    const sql = "SELECT * FROM cafeterias WHERE id_cafeteria = ?";
    db.query(sql, [id_cafeteria], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe la cafeteria buscada"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a modificar datos de la tabla
const storeCoffeeShops = (req, res) => {
    const {nombre_cafeteria, enchufes_cafeteria, id_barrio, id_marca} = req.body;    
    const sql = "INSERT INTO cafeterias (nombre_cafeteria, enchufes_cafeteria, id_barrio, id_marca) VALUES (?,?,?,?)";
    db.query(sql, [nombre_cafeteria, enchufes_cafeteria, id_barrio, id_marca], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const cafeteria = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(cafeteria); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a ingresar un cafe a la tabla

const updateCoffeeShops = (req, res) => {
    const {id_cafeteria} = req.params;
    const {nombre_cafeteria, enchufes_cafeteria, id_barrio, id_marca} = req.body;
    const sql = "UPDATE cafeterias SET nombre_cafeteria=?, enchufes_cafeteria=?, id_barrio=?, id_marca=? WHERE id_cafeteria=?";
    db.query(sql, [nombre_cafeteria, enchufes_cafeteria, id_barrio, id_marca, id_cafeteria], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La cafeteria a modificar no existe"});
        };
        const cafeteria = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(cafeteria); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar una cafeteria de la tabla

const destroyCoffeeShops = (req, res) => {
    const {id_cafeteria} = req.params;
    const sql = "DELETE FROM cafeterias WHERE id_cafeteria = ?";
    db.query(sql,[id_cafeteria],
        (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La cafeteria a borrar no existe"});
        };
        res.json({mesaje: "Cafeteria Eliminada :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allCoffeeShops, 
    showCoffeeShops,
    storeCoffeeShops,
    updateCoffeeShops,
    destroyCoffeeShops
};