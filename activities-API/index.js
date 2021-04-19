//API azar-games-and-bet-activities

var activities=[];
var BASE_API_PATH = "/api/v1";


module.exports.register= (app,db)=>{


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
                "province": 'Seville',
                "year": 2017,
                "catering-bingo-machine":4940,
                "lottery-engagement ": 23339380,
                "bingo-site": 6,
                "national-lottery-expend":138160377,
            },
            {
                "province": 'Seville',
                "year": 2016,
                "catering-bingo-machine":4778,
                "lottery-engagement ": 23302680,
                "bingo-site": 6,
                "national-lottery-expend":130959228,
            },
            {
                "province": 'Barcelona',
                "year": 2018,
                "catering-bingo-machine":13389,
                "lottery-engagement ": 56425240,
                "bingo-site": 34,
                "national-lottery-expend":486535860,
            },
            {
                "province": 'Barcelona',
                "year": 2017,
                "catering-bingo-machine":13389,
                "lottery-engagement ": 62538100,
                "bingo-site": 34,
                "in":487375563,
            },
            {
                "province": 'Barcelona',
                "year": 2016,
                "catering-bingo-machine":13389,
                "lottery-engagement ": 59640040,
                "bingo-site": 33,
                "national-lottery-expend":498638230,
            },
            {
                "province": 'Madrid',
                "year": 2018,
                "catering-bingo-machine":17240,
                "lottery-engagement ": 95951420,
                "bingo-site": 45,
                "national-lottery-expend":807501802,
            },
            {
                "province": 'Madrid',
                "year": 2017,
                "catering-bingo-machine":17988,
                "lottery-engagement ": 99264960,
                "bingo-site": 46,
                "national-lottery-expend":802036255,
            },
            {
                "province": 'Madrid',
                "year": 2016,
                "catering-bingo-machine":17236,
                "lottery-engagement ": 89332820,
                "bingo-site": 43,
                "national-lottery-expend":760015875,
            },
            {
                "province": 'Valencia',
                "year": 2018,
                "catering-bingo-machine":20525,
                "lottery-engagement ": 52916920,
                "bingo-site": 32,
                "national-lottery-expend":355915035,
            },
            {
                "province": 'Valencia',
                "year": 2017,
                "catering-bingo-machine":20975,
                "lottery-engagement ": 51134140,
                "bingo-site": 30,
                "national-lottery-expend":348995707,
            },
            {
                "province": 'Valencia',
                "year": 2016,
                "catering-bingo-machine":20975,
                "lottery-engagement ": 48581940,
                "bingo-site": 30,
                "national-lottery-expend":334546253,
            }
        ]

        db.find({},(err,data)=>{
            if(err){
                console.error("Cant access Database");
                return request.sendStatus(500);
            } else{
    
                if(data.length==0){
                    db.insert(activities_initial) // Metemos el array de objetos en la base de datos.
                    console.log(`Loaded Initial Data: <${JSON.stringify(activities_initial, null, 2)}>`);
                    return response.sendStatus(200);
                }else{
                    console.error("Database already initialized")
                    return response.sendStatus(409)
                }
    
    
            }
        })
        
    })
    app.get(BASE_API_PATH+"/azar-games-and-bet-activities", (req,res)=>{ 
        var query=req.query;
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
                //res.sendStatus(200);
            }
        }
    })
    
});  
    
    app.post(BASE_API_PATH+"/azar-games-and-bet-activities", (req,res)=>{ 
        if(req.body.province && req.body.year && req.body.catering-bingo-machine && req.body.lottery-engagement  && req.body.bingo-site && req.body.national-lottery-expend){

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
    app.get(BASE_API_PATH+"/azar-games-and-bet-activities/:province/:year", (req, res)=>{
        db.find({"province":req.params.province,"year":req.params.year},(err,data)=>{
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
    
    app.delete(BASE_API_PATH+"/azar-games-and-bet-activities/:province/:year", function(req, res) { 
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
    
    app.put(BASE_API_PATH+"/azar-games-and-bet-activities/:province/:year", function(req, res) { 
    
        if(req.params.province!=req.body.province || req.params.year!=req.body.year){
            console.error("Specified URL keys does not match body keys");
            res.sendStatus(400)
    
        }else{
            db.update({"province":req.body.province,"year":req.body.year},req.body,(err,dataReplaced)=>{
                console.log(dataReplaced)
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
    app.post(BASE_API_PATH+"/azar-games-and-bet-activities/:province/:year", function(req, res) { 
    
        res.status(405).send("Este metodo no  está permitido"); 
    });
    app.put(BASE_API_PATH+"/azar-games-and-bet-activities", function(req, res) { 
    
        res.status(405).send("Este metodo no  está permitido"); 
    });
    
    app.delete(BASE_API_PATH+"/azar-games-and-bet-activities", (req,res)=>{
        db.remove({},{multi:true},(error,dataDeleted)=>{
            console.log(dataDeleted+ " resources has been removed.");
            res.sendStatus(200);
        })
    
    })
    
    }