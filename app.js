'use strict'

const bodyParser = require('body-parser');
var express= require('express');
var app= express();

//ARCHIVOS DE RUTA
var productoRoute=require('./routes/producto.route');
var userRoute=require('./routes/user.route');
var categoriaRoute= require('./routes/categoria.route')

//CONFIGURACIÓN
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
   
     next();
 });
//rutas

app.use('/api',productoRoute);
app.use('/api',userRoute);
app.use('/api',categoriaRoute);

//Exportar
module.exports=app;
