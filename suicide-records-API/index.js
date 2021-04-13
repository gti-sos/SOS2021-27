//API suicide-records

var suicide=[];
var BASE_API_PATH = "/api/v1";

// 5.2 Crear recursos iniciales


module.exports.register= (app)=>{

app.get(BASE_API_PATH+"/suicide-records/loadInitialData",(request,response)=>{
    
    var suicide_initial=[
        {
        "province":"SEVILLE",
        "year":2018,
        "suic-man":78,
        "suic-woman":35,
        "suic-total":113,
        "suic-rate-mw":2
        },
        {
        "province":"SEVILLE",
        "year":2017,
        "suic-man":113,
        "suic-woman":44,
        "suic-total":157,
        "suic-rate-mw":3
        }
    ]

    for(var registro of suicide_initial){
        suicide.push(registro)
    }

    console.log(`Loaded Initial Data: <${JSON.stringify(suicide_initial, null, 2)}>`);
	return response.sendStatus(200);

})




// (5.1) y 6.1 GET a la lista de recursos.
app.get(BASE_API_PATH+"/suicide-records", (request,response)=>{ 

    
    response.status(200).send(JSON.stringify(suicide,null,2));
    
});


// 6.2 Post a la lista de recursos.

app.post(BASE_API_PATH+"/suicide-records", (req,res)=>{ 
	var recurso = req.body;
	suicide.push(recurso)
    console.log(`Stored Resource: <${JSON.stringify(recurso, null, 2)}>`);
    res.sendStatus(201)

      

});


// 6.3 Get a un recurso

app.get(BASE_API_PATH+"/suicide-records/:province/:year",(req,res)=>{

    var registro=suicide.filter(a => a.province==req.params.province&&a.year==req.params.year);


    res.status(200).send(JSON.stringify(registro,null,2));



})

// 6.4 Delete a un recurso

app.delete(BASE_API_PATH+"/suicide-records/:province/:year",(req,res)=>{
    
    suicide=suicide.filter(a =>  !(a.province==req.params.province&&a.year==req.params.year)) 

    res.status(200).send("Recurso eliminado correctamente")

})

// 6.5 Put a un recurso

app.put(BASE_API_PATH+"/suicide-records/:province/:year",(req,res)=>{

    var registro=suicide.filter(a => a.province==req.params.province&&a.year==req.params.year);

    var index=0;

    for(var reg of suicide){

        if(reg==registro[0]){ // [0] porque nuestro objeto se ha guardado en un array
            suicide[index]=req.body
            break;
        }
        index++;
    }

    res.status(200).send("Se ha cambiado correctamente");

})

// 6.6 POST a un recurso 

app.post(BASE_API_PATH+"/suicide-records/:province/:year", (req, res) =>{ 

	res.status(405).send("Este metodo no  está permitido"); 
});

// 6.7 PUT a una lista de recursos

app.put(BASE_API_PATH+"/suicide-records", (req, res) =>{ 

	res.status(405).send("Este metodo no  está permitido"); 
});

// 6.8 DELETE a lista de recursos

app.delete(BASE_API_PATH+"/suicide-records", (req, res) =>{
    suicide=[]
    res.status(200).send("Se ha borrado todo el contenido");

})

}