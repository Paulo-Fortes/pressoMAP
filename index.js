// CONFIGURAR LO QUE SERIA UN SERVIDOR CON LAS MINIMAS PRESTACIONES PARA CORRER EXPRESS
//QUE ESTE ESCUCHANDO Y TENGAMOS UNA RUTA PRINCIPAL

const express = require("express");
const app = express();

app.use(express.json());
//en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera lo voy a utilizar


//--------------- SECCIÓN DE LAS RUTAS DE INDEX -----------------

//Ruta 1 - Barrio
const barrioRouter = require('./routers/barrio.router');
app.use('/barrio', barrioRouter);
//Ruta 2 - Cafe
const cafeRouter = require('./routers/cafe.router');
app.use('/cafe', cafeRouter);
//Ruta 3 - Cafeteria
const cafeteriaRouter = require('./routers/cafeteria.router');
app.use('/cafeteria', cafeteriaRouter);
//Ruta 4 - Contacto
const contactoRouter = require('./routers/contacto.router');
app.use('/contacto', contactoRouter);
//Ruta 5 - Genero
const generoRouter = require('./routers/genero.router');
app.use('/genero', generoRouter);
//Ruta 6 - Grano
const granoRouter = require('./routers/grano.router');
app.use('/grano', granoRouter);
//Ruta 7 - Marca
const marcaRouter = require('./routers/marca.router');
app.use('/marca', marcaRouter);
//Ruta 8 - Pais
const paisRouter = require('./routers/pais.router');
app.use('/pais', paisRouter);
//Ruta 9 - Postulante
const postulanteRouter = require('./routers/postulante.router');
app.use('/postulante', postulanteRouter);
//Ruta 10 - Reseña
const resenaRouter = require('./routers/resena.router');
app.use('/resena', resenaRouter);
//Ruta 11 - Tamaños
const tamanoRouter = require('./routers/tamano.router');
app.use('/tamano', tamanoRouter);
//Ruta 12 - Tuestes
const tuesteRouter = require('./routers/tueste.router');
app.use('/tueste', tuesteRouter);
// //Ruta 13 - Usuarios
const usuarioRouter = require('./routers/usuario.router');
app.use('/usuario', usuarioRouter);



//RAIZ DEL PROYECTO
app.get("/", (req, res) => {
    res.send("Conectados a la base de datos de pressoMAP");
});


//Esta es la ruta principal del proyecto "/"
const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));

