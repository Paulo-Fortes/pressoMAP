//controladores del modulo

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//----Campos tabla----
//id_usuario
//nombre_usuario
//apellido_usuario
//email_usuario
//contrasena
//id_genero
//id_resena
//imagen_usuario
//fecha_usuario

const db = require("../db/db");



//--------- M E T O D O S   H T T P ----------

//MÉTODO 1.1 GET - Trae todos los usuarios de la tabla
const allUsers = (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (error, rows) => {
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        res.json(rows);
    });
};

//MÉTODO 1.2 GET - Trae apenas 1 usuario específico de la tabla
const showUsers = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [id_usuario], (error, rows) => {
        console.log(rows);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: no existe el usuario buscada"});
        };
        //me muestra el elemento en la posicion cero si existe.
        res.json(rows[0]);
    });
};

//MÉTODO 2 POST - Va a ingresar un dato a la tabla
const storeUsers = (req, res) => {
    let imagenAsubir = "";
    if (req.file){
        imagenAsubir = req.file.filename;
    }
    const {nombre_usuario, apellido_usuario, email_usuario, contrasena, id_genero, id_resena} = req.body;    
    if(!nombre_usuario || !apellido_usuario || !email_usuario || !contrasena || !id_genero || !id_resena){
        return res.status(400).send("Todos los campos son obligatorios"); //chequear 400
    }
    //encriptación BCRYPT
    bcrypt.hash(contrasena,10,(err,hashedPassword)=>{
        if (err){
            return res.status(500).send("Error de encriptación")
        }    
        const sql = "INSERT INTO usuarios (nombre_usuario, apellido_usuario, email_usuario, contrasena, id_genero, id_resena, imagen_usuario) VALUES (?,?,?,?,?,?,?)";
        db.query(sql, [nombre_usuario, apellido_usuario, email_usuario, hashedPassword, id_genero, id_resena, imagenAsubir], (error, result) => {
            console.log(result);
            if (error){
                return res.status(500).json({error: "ERROR: Intente luego"});
            }
            const usuario = {...req.body, id: result.insertId}; //... reconstruye (json) el objeto del body
            res.status(201).json(usuario); //muestra creado con éxito el elemento
        });
    })
};

//MÉTODO 3 PUT - Va a actualizar un dato de la tabla

const updateUsers = (req, res) => {
    let imagenAsubir = "";
    if (req.file){
        imagenAsubir = req.file.filename;
    }
    const {nombre_usuario, apellido_usuario, email_usuario, contrasena, id_genero, id_resena} = req.body;    
    if(!nombre_usuario || !apellido_usuario || !email_usuario || !contrasena || !id_genero || !id_resena){
        return res.status(400).send("Todos los campos son obligatorios"); //chequear 400
    }
    //encriptación BCRYPT
    bcrypt.hash(contrasena,10,(err,hashedPassword)=>{
        if (err){
            return res.status(500).send("Error de encriptación")
        }  
        const {id_usuario} = req.params;
        const {nombre_usuario, apellido_usuario, email_usuario, contrasena, id_genero, id_resena, imagen_usuario} = req.body;
        const sql = "UPDATE usuarios SET nombre_usuario=?, apellido_usuario=?, email_usuario=?, contrasena=?, id_genero=?, id_resena=?, imagen_usuario=? WHERE id_usuario = ?";
        db.query(sql, [nombre_usuario, apellido_usuario, email_usuario, hashedPassword, id_genero, id_resena, imagen_usuario, id_usuario ], (error, result) => {
            console.log(result);
            if (error){
                return res.status(500).json({error: "ERROR: Intente luego"});
            }
            if(result.affectedRows == 0){
                return res.status(404).send({error : "ERROR: El usuario a modificar no existe"});
            };
            const usuario = {...req.body, ...req.params}; //... reconstruye el objeto del body
            res.json(usuario); //acá muestro luego de reconstruir
        });
    })
};

//MÉTODO 4 DELETE - Va a borrar un dato de la tabla

const destroyUsers = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    db.query(sql,[id_usuario], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error: "ERROR: Intente luego"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El usuario a borrar no existe"});
        };
        res.json({mesaje: "Usuario Eliminado :("});
    });
};


//exportar del modulo todas las funciones
module.exports = {
    allUsers, 
    showUsers,
    storeUsers,
    updateUsers,
    destroyUsers
};