//controladores del modulo

//----Campos tabla----
//id_contacto
//comentario_contacto
//id_usuario



const db = require("../db/db");

//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los contactos de la tabla
const allContacts = (req, res) => {
    const sql = "SELECT * FROM contactos";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 cafe específico de la tabla
const showContacts = (req, res) => {
    const {id_contacto} = req.params;
    const sql = "SELECT * FROM contactos WHERE id_contacto = ?";
    db.query(sql, [id_contacto], (error, rows) => {
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
const storeContacts = (req, res) => {
    const {comentario_contacto, id_usuario} = req.body;    
    const sql = "INSERT INTO contactos (comentario_contacto, id_usuario) VALUES (?,?)";
    db.query(sql, [comentario_contacto, id_usuario], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        const contacto = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
        res.status(201).json(contacto); //muestra creado con éxito el elemento
    });
};

//MÉTODO 3 PUT - Va a ingresar un cafe a la tabla

const updateContacts = (req, res) => {
    const {id_contacto} = req.params;
    const {comentario_contacto, id_usuario} = req.body;
    const sql = "UPDATE contactos SET comentario_contacto=?, id_usuario=? WHERE id_contacto=?";
    db.query(sql, [comentario_contacto, id_usuario, id_contacto], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El contacto a modificar no existe"});
        };
        const contacto = {...req.body, ...req.params}; //... reconstruye el objeto del body
        res.json(contacto); //acá muestro luego de reconstruir
    });
};

//MÉTODO 4 DELETE - Va a borrar un cafe de la tabla

const destroyContacts = (req, res) => {
    const {id_contacto} = req.params;
    const sql = "DELETE FROM contactos WHERE id_contacto = ?";
    db.query(sql,[id_contacto], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El contacto a borrar no existe"});
        };
        res.json({mesaje: "Contacto Eliminado :("});
    });
};

//exportar del modulo todas las funciones
module.exports = {
    allContacts, 
    showContacts,
    storeContacts,
    updateContacts,
    destroyContacts
};