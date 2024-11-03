const mysql = require("mysql2");

//conexion con la bbdd
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pressomapbd"
});

connection.connect((error)=>{
    if(error){
        return console.error(error);
    }
    console.log("Estamos conectados a la bbdd de pressoMAP");
});

//exportar del modulo la funcion connection

module.exports = connection;