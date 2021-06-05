//  -->     Módulos instalados

var express=require("express"); // Cargamos el modulo
var bodyParser=require("body-parser");
var path=require("path");
var Datastore=require('nedb');




// Cabeceras cors
var cors = require("cors");







// -->      Variables para el uso del servidor y módulos



var app=express(); // Generamos una aplicación que hace uso de express
app.use(bodyParser.json());
var port= (process.env.PORT || 10000); // Obtiene el puerto que se le indique o el 10000 en caso de no existir  (Heroku no trabaja con puerto 10000)


app.use(cors());
// -->      Bases de datos
var suicideDB=new Datastore({filename: "src/backEnd/suicidesAPI/suicidesV1/suicide.db",autoload:true});
var suicideDB2=new Datastore({filename: "src/backEnd/suicidesAPI/suicidesV2/suicide.db",autoload:true});
var suicideDB3=new Datastore({filename: "src/backEnd/suicidesAPI/integration/suicide.db",autoload:true});

var budgetsDB = new Datastore({filename: "src/backEnd/budgetsAPI/budgetsV1/budgets.db",autoload:true});
var budgetsDBV2 = new Datastore({filename: "src/backEnd/budgetsAPI/budgetsV2/budgets.db",autoload:true});

var activitiesDB=new Datastore({filename: "src/backEnd/activitiesAPI/activitiesV1/activities.db",autoload:true});
var activitiesDBV2=new Datastore({filename: "src/backEnd/activitiesAPI/activitiesV2/activities.db",autoload:true});
var activitiesDBV3=new Datastore({filename: "src/backEnd/activitiesAPI/integration/activities.db",autoload:true});

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


var suicide_integration=require("./src/backEnd/suicidesAPI/integration");
suicide_integration.register(app,suicideDB3);

var budgetsAPI = require("./src/backEnd/budgetsAPI/budgetsV1");
budgetsAPI.register(app,budgetsDB);

var budgetsAPIV2 = require("./src/backEnd/budgetsAPI/budgetsV2");
budgetsAPIV2.register(app,budgetsDBV2);

var activitiesAPI = require("./src/backEnd/activitiesAPI/activitiesV1");
activitiesAPI.register(app,activitiesDB);

var activitiesAPIV2 = require("./src/backEnd/activitiesAPI/activitiesV2");
activitiesAPIV2.register(app,activitiesDBV2);

var activities_integration=require("./src/backEnd/activitiesAPI/integration");
activities_integration.register(app,activitiesDBV3);







// Proxys

const request = require("request");




// Parameters
// You can use a shorthand for multiple API endpoints: /api|/other_api


//  ----------------- Proxis Javier García --------------------

var pathAnxiety='/api/integration/anxiety_stats';
var apiServerHost = 'https://sos2021-11.herokuapp.com';

app.use(pathAnxiety, function(req, res) {
  var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});


var pathDepression='/api/integration/depression_stats';
var apiServerHost2 = 'http://sos2021-11.herokuapp.com';

app.use(pathDepression, function(req, res) {
  var url = apiServerHost2 + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});



var pathStress='/api/v2/stress_stats';
var apiServerHost3 = 'http://sos2021-11.herokuapp.com';

app.use(pathStress, function(req, res) {
  var url = apiServerHost3 + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

// --------------------------------------------------------------


app.use("/api/v2/proxy_lifeStats", function(request, response) {
  var hostUrl = 'http://sos2021-01.herokuapp.com';
  var url = hostUrl + request.url;
  request.pipe(request(url)).pipe(response);
});
