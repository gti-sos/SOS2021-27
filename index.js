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
//API azar-games-and-bet-activities

var activities=[];



app.get(BASE_API_PATH+"/azar-games-and-bet-activities/loadInitialData", (request, response) => {
    activities_initial = [
        {
            "province": 'Seville',
            "year": 2018,
            "catering-bingo-machine": 4965,
            "lottery-engagement ": 24028820,
            "bingo-site": 6,
            "national-lottery-expend":141889249,
        },
        {
            "province": 'Barcelona',
            "year": 2018,
            "catering-bingo-machine":13389,
            "lottery-engagement ": 56425240,
            "bingo-site": 34,
            "national-lottery-expend":486535860,
        }
    ]
    for(var registro of activities_initial){
        activities.push(registro)
    }

    console.log(`Loaded Initial Data: <${JSON.stringify(activities_initial, null, 2)}>`);

	return response.sendStatus(200);
});
app.get(BASE_API_PATH+"/azar-games-and-bet-activities", (request,response)=>{ 
    response.send(JSON.stringify(activities,null,2));
 
});

app.post(BASE_API_PATH+"/azar-games-and-bet-activities", (req,res)=>{ 
	var recurso = req.body;
	activities.push(recurso)
    console.log(`Stored Resource: <${JSON.stringify(recurso, null, 2)}>`);
    res.sendStatus(201)
});
app.get(BASE_API_PATH+"/azar-games-and-bet-activities/:province/:year", (req, res)=>{
    var activity = activities.filter(function(s){
        return s.province==String(req.params.province)&& s.year==String(req.params.year);});

        res.status(200).send(JSON.stringify(activity,null,2));
   
}) ;    

app.delete(BASE_API_PATH+"/azar-games-and-bet-activities/:province/:year", function(req, res) { 
	activities = activities.filter(function(s){
		if(s.province!=String(req.params.province) || s.year!=(String(req.params.year))) {
			return s;
		}
	});


	res.status(200).send("Se ha eliminado correctamente");
});

app.put(BASE_API_PATH+"/azar-games-and-bet-activities/:province/:year", function(req, res) { 

	for(var s in activities){
		
		if(activities[s].province == String(req.params.province) &&
			activities[s].year == String(req.params.year)){
				var cambios = req.body;
				activities[s] = cambios;
				break;
		}
	}
    res.status(200).send("Se ha cambiado correctamente");

});
app.post(BASE_API_PATH+"/azar-games-and-bet-activities/:province/:year", function(req, res) { 

	res.status(405).send("Este metodo no  está permitido"); 
});
app.put(BASE_API_PATH+"/azar-games-and-bet-activities", function(req, res) { 

	res.status(405).send("Este metodo no  está permitido"); 
});

app.delete(BASE_API_PATH+"/azar-games-and-bet-activities", (req,res)=>{
		
	activities = []; 
	res.status(200).send("Se ha borrado todo el contenido");

});
