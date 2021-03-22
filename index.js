var cool = require("cool-ascii-faces");
var express=require("express");

var app=express();
var port= (process.env.PORT || 10000); // Obtiene el puerto que se le indique o el 10000 en caso de no existir  (Heroku no trabaja con puerto 10000)

app.get("/cool", (request,response)=>{ 
    response.send(cool());
    console.log("New Request to /cool has arrived");
 
});

app.listen(port, () =>{
    console.log("Server ready listening on port "+port);
});


var path=require("path");

// Dirname obtiene la carpeta donde se ejecuto npm start (C:\\....). Path permite concatenar directorios con join, para tener un metodo estandar en windows y linux.
// Use hace que cuando se llame a lo que sea que esté dentro de /, lo busque en la carpeta public...
app.use("/",express.static(path.join(__dirname + "/public")));  