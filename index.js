//  -->     Módulos instalados

var express=require("express"); // Cargamos el modulo
var bodyParser=require("body-parser");
var path=require("path");
var Datastore=require('nedb');


// -->      Variables para el uso del servidor y módulos

var app=express(); // Generamos una aplicación que hace uso de express
app.use(bodyParser.json());
var port= (process.env.PORT || 10000); // Obtiene el puerto que se le indique o el 10000 en caso de no existir  (Heroku no trabaja con puerto 10000)


// -->      Bases de datos
var suicideDB=new Datastore({filename: "src/backEnd/suicidesAPI/suicidesV2/suicide.db",autoload:true});
var suicideDB2=new Datastore({filename: "src/backEnd/suicidesAPI/suicidesV2/suicide.db",autoload:true});
var activitiesDB=new Datastore({filename: "src/backEnd/activitiesAPI/activitiesV1/activities.db",autoload:true});
var activitiesDBV2=new Datastore({filename: "src/backEnd/activitiesAPI/activitiesV2/activities.db",autoload:true});
var budgetsDB = new Datastore({filename: "src/backEnd/budgetsAPI/budgetsV1/budgets.db",autoload:true});
var budgetsDBV2 = new Datastore({filename: "src/backEnd/budgetsAPI/budgetsV2/budgets.db",autoload:true});



 
// -->      Funciones del servidor

app.listen(port, () =>{ // Cuando el servidor está listo, ejecuta el código interior.
    console.log("Server ready listening on port "+port); 
});
// Dirname obtiene la carpeta donde se ejecuto npm start (C:\\....).
// Use hace que cuando se llame a lo que sea que esté dentro de /, lo busque en la carpeta public...
app.use("/",express.static(path.join(__dirname + "/public")));  

    

// -->      Modulación APIS
    
var suicideAPI=require("./src/backEnd/suicidesAPI/suicidesV2");
suicideAPI.register(app,suicideDB2);

var suicideAPI=require("./src/backEnd/suicidesAPI/suicidesV1");
suicideAPI.register(app,suicideDB);

var budgetsAPI = require("./src/backEnd/budgetsAPI/budgetsV1");
budgetsAPI.register(app,budgetsDB);

var budgetsAPIV2 = require("./src/backEnd/budgetsAPI/budgetsV2");
budgetsAPIV2.register(app,budgetsDBV2);

var activitiesAPI = require("./src/backEnd/activitiesAPI/activitiesV1");
activitiesAPI.register(app,activitiesDB);

var activitiesAPIV2 = require("./src/backEnd/activitiesAPI/activitiesV2");
activitiesAPIV2.register(app,activitiesDBV2);









