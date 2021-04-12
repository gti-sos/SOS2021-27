const { response } = require("express");

//var lib=require(./lib.js)
// lib.myHello()

var express=require("express"); // Cargamos el modulo
var bodyParser=require("body-parser");



var app=express(); // Generamos una aplicación que hace uso de express
app.use(bodyParser.json());

var port= (process.env.PORT || 10000); // Obtiene el puerto que se le indique o el 10000 en caso de no existir  (Heroku no trabaja con puerto 10000)

var BASE_API_PATH = "/api/v1";

app.listen(port, () =>{ // Cuando el servidor está listo, ejecuta el código interior.
    console.log("Server ready listening on port "+port); 
});

var path=require("path");
const { runInNewContext } = require("vm");
 
// Dirname obtiene la carpeta donde se ejecuto npm start (C:\\....).
// Use hace que cuando se llame a lo que sea que esté dentro de /, lo busque en la carpeta public...
app.use("/",express.static(path.join(__dirname + "/public")));  

