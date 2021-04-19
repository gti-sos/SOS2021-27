//API suicide-records

var suicide=[];
var BASE_API_PATH = "/api/v1";

// 5.2 Crear recursos iniciales


module.exports.register= (app,db)=>{

app.get(BASE_API_PATH+"/suicide-records/loadInitialData",(request,response)=>{
    
    var suicide_initial=
    [
        {
            "province": "SEVILLE",
            "year": "2018",
            "suic_man": "78",
            "suic_woman": "35",
            "suic_total": "113",
            "suic_rate_mw": "2"
        },
        {
            "province": "SEVILLE",
            "year": "2017",
            "suic_man": "113",
            "suic_woman": "44",
            "suic_total": "157",
            "suic_rate_mw": "3"
        },
        {
            "province": "SEVILLE",
            "year": "2016",
            "suic_man": "88",
            "suic_woman": "26",
            "suic_total": "114",
            "suic_rate_mw": "3"
        },
        {
            "province": "BARCELONA",
            "year": "2018",
            "suic_man": "266",
            "suic_woman": "99",
            "suic_total": "365",
            "suic_rate_mw": "3"
        },
        {
            "province": "BARCELONA",
            "year": "2017",
            "suic_man": "256",
            "suic_woman": "101",
            "suic_total": "357",
            "suic_rate_mw": "3"
        },
        {
            "province": "BARCELONA",
            "year": "2016",
            "suic_man": "251",
            "suic_woman": "113",
            "suic_total": "364",
            "suic_rate_mw": "2"
        },
        {
            "province": "MADRID",
            "year": "2018",
            "suic_man": "232",
            "suic_woman": "110",
            "suic_total": "342",
            "suic_rate_mw": "2"
        },
        {
            "province": "MADRID",
            "year": "2017",
            "suic_man": "251",
            "suic_woman": "90",
            "suic_total": "341",
            "suic_rate_mw": "3"
        },
        {
            "province": "MADRID",
            "year": "2016",
            "suic_man": "218",
            "suic_woman": "87",
            "suic_total": "305",
            "suic_rate_mw": "3"
        },
        {
            "province": "VALENCIA",
            "year": "2018",
            "suic_man": "152",
            "suic_woman": "56",
            "suic_total": "208",
            "suic_rate_mw": "3"
        },
        {
            "province": "VALENCIA",
            "year": "2017",
            "suic_man": "126",
            "suic_woman": "62",
            "suic_total": "188",
            "suic_rate_mw": "2"
        },
        {
            "province": "VALENCIA",
            "year": "2016",
            "suic_man": "119",
            "suic_woman": "41",
            "suic_total": "160",
            "suic_rate_mw": "3"
        }
    ]

    
    
    db.find({},(err,data)=>{
        if(err){
            console.error("Cant access Database");
            return request.sendStatus(500);
        } else{

            if(data.length==0){

                db.insert(suicide_initial) // Metemos el array de objetos en la base de datos.
                console.log(`Loaded Initial Data: <${JSON.stringify(suicide_initial, null, 2)}>`);
                return response.sendStatus(200);
            }else{
                console.error("Database already initialized")
                return response.sendStatus(409)
            }


        }
    })
    


})



app.get(BASE_API_PATH+"/suicide-records", (req,res)=>{ 
    var query=req.query;
    /*

     ¡¡¡ No hace falta este cacho, el ultimo if es para crear una query con un operador, pero es opcional y no me sale !!!

    var querysParseadas={}

    if(query.hasOwnProperty("province")){
        querysParseadas["province"]=query["province"]
    }
    if(query.hasOwnProperty("year")){
        querysParseadas["year"]=query["year"]
    }
    if(query.hasOwnProperty("suic_man")){
        querysParseadas["suic_man"]=query["suic_man"]
    }
    if(query.hasOwnProperty("suic_woman")){
        querysParseadas["suic_woman"]=query["suic_woman"]
    }
    if(query.hasOwnProperty("suic_total")){
        querysParseadas["suic_total"]=query["suic_total"]
    }
    if(query.hasOwnProperty("suic_rate_mw")){
        querysParseadas["suic_rate_mw"]=query["suic_rate_mw"]
    }


    if(query.hasOwnProperty("suic_total_above")){
        
        greaterThan={$gt:parseInt(query["suic_total_above"])}
        console.log(greaterThan)
        querysParseadas["suic_total"]=greaterThan;

    }
    */

    // Find pedirá 2 parametros.
    // 1º Busqueda en la BD con capacidad de introducir filtrado. P.E: name:"pablo". Si no ponemos nada devuelve todo.
    // 2º Funcion para usar el filtrado resultado.



    var limit=parseInt(query.limit);
    var offset=parseInt(query.offset);

    delete query.offset;
    delete query.limit;


    db.find(query,{_id:0}).skip(offset).limit(limit).exec((err,data)=>{
        if(err){
            console.error("Error accessing resource data using GET");
            res.sendStatus(500);

        }else{
            if(data.length==0){
                console.error("Resource not found.")
                res.sendStatus(404);
            }else{
                
                console.log(`Sent Resources: <${JSON.stringify(data, null, 2)}>`);
                res.status(200).send(JSON.stringify(data, null, 2));

            }
        }
    })
    
});


// 6.2 Post a la lista de recursos.

app.post(BASE_API_PATH+"/suicide-records", (req,res)=>{ 

    if(req.body.province && req.body.year && req.body.suic_man && req.body.suic_woman && req.body.suic_total && req.body.suic_rate_mw){

        db.find({"province":req.body.province,"year":req.body.year},(err,data)=>{
            if(err){
                console.error("Error posting resource using POST");
                res.sendStatus(500);
            }else{
                if(data.length!=0){
                    console.error("Resource with same primary keys already exists.");
                    res.sendStatus(409)
    
                }else{
    
                    db.insert(req.body);
                    console.log(`Stored Resource: <${JSON.stringify(req.body, null, 2)}>`);
                    res.sendStatus(201)
                }
            }
            
        })

    }else{
        console.error("Invalid resource format.")
        return res.sendStatus(400)
    }

});


// 6.3 Get a un recurso

app.get(BASE_API_PATH+"/suicide-records/:province/:year",(req,res)=>{

    

    db.find({"province":req.params.province,"year":req.params.year},{_id:0},(err,data)=>{
        if(err){
            console.error("Error getting resource using GET");
            res.sendStatus(500);
        }else{
            if(data.length==0){
                console.error("Resource not found.")
                res.sendStatus(404);
            }else{

                res.status(200).send(JSON.stringify(data[0], null, 2));
			    console.log("Data sent:"+JSON.stringify(data[0], null, 2));
            }
            
        }
    })

    



})

// 6.4 Delete a un recurso

app.delete(BASE_API_PATH+"/suicide-records/:province/:year",(req,res)=>{
    
    db.remove({"province":req.params.province,"year":req.params.year},(err,dataRemoved)=>{
        if(err){
            console.error("Error deleting resource");
            res.sendStatus(500)
        }else{
            if(dataRemoved==0){
                console.log("There is no resource to delete with those keys");
                res.sendStatus(404)
            }else{
                console.log("The resourse has been removed.")
                res.sendStatus(200)
            }
        }
    })

})

// 6.5 Put a un recurso

app.put(BASE_API_PATH+"/suicide-records/:province/:year",(req,res)=>{

    if(req.params.province!=req.body.province || req.params.year!=req.body.year){
        console.error("Specified URL keys does not match body keys, cant change resource primary keys, delete it instead.");
        res.sendStatus(400)

    }else{
        db.update({"province":req.body.province,"year":req.body.year},req.body,(err,dataReplaced)=>{
            if(err){
                console.error("Error updating resource")
                res.sendStatus(500)
            }else{
                if(dataReplaced==0){
                    console.log("Resource not found.")
                    res.sendStatus(404)
                }else{
                    console.log("Resource Updated")
                    res.sendStatus(200);
                }
            }
        })
    }

})



// 6.6 y 6.7 son dos métodos de error, que no requieren más tratamiento.

// 6.6 POST a un recurso 

app.post(BASE_API_PATH+"/suicide-records/:province/:year", (req, res) =>{ 

	return res.sendStatus(405); 
});

// 6.7 PUT a una lista de recursos

app.put(BASE_API_PATH+"/suicide-records", (req, res) =>{ 

	return res.sendStatus(405); 
});

// 6.8 DELETE a lista de recursos

app.delete(BASE_API_PATH+"/suicide-records", (req, res) =>{
    db.remove({},{multi:true},(error,dataDeleted)=>{
        console.log(dataDeleted+ " resources has been removed.");
        res.sendStatus(200);
    })

})




}