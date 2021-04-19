//API province-budget-and-investment-in-social-promotion

var budgets = [];
var BASE_API_PATH = "/api/v1/province-budget-and-investment-in-social-promotion";
var budgetsDB = new Datastore({filename: "budgets.db",autoload:true});


var budgets_ini = [
    {
        "province": "SEVILLE",
        "year": 2018,
        "budget": 30714715,
        "invest_promotion": 2322823,
        "liquid": 28391892,
        "percentage": 7.563,
    },
    {
        "province": "SEVILLE",
        "year": 2017,
        "budget": 29194210,
        "invest_promotion": 2201782,
        "liquid": 26992428,
        "percentage": 7.542,
    },
    {
        "province": "SEVILLE",
        "year": 2016,
        "budget": 27037781,
        "invest_promotion": 2145096,
        "liquid": 24892685,
        "percentage": 7.934,
    },
    {
        "province": "BARCELONA",
        "year": 2018,
        "budget": 29178828,
        "invest_promotion": 2089505,
        "liquid": 27089323,
        "percentage": 7.161,
    },
    {
        "province": "BARCELONA",
        "year": 2017,
        "budget": 30620317,
        "invest_promotion": 2079758,
        "liquid": 28540559,
        "percentage": 6.792,
    },
    {
        "province": "BARCELONA",
        "year": 2016,
        "budget": 29449783,
        "invest_promotion": 1937622,
        "liquid": 27512161,
        "percentage": 6.579,
    },
    {
        "province": "MADRID",
        "year": 2018,
        "budget": 21633751,
        "invest_promotion": 1742793,
        "liquid": 19890958,
        "percentage": 8.056,
    },
    {
        "province": "MADRID",
        "year": 2017,
        "budget": 20504094,
        "invest_promotion": 1628027,
        "liquid": 18876067,
        "percentage": 7.940,
    }, 
    {
        "province": "MADRID",
        "year": 2016,
        "budget": 20139609,
        "invest_promotion": 1520787,
        "liquid": 18618822,
        "percentage": 7.551,
    },
    {
        "province": "VALENCIA",
        "year": 2018,
        "budget": 20246195,
        "invest_promotion": 1208254,
        "liquid": 19037941,
        "percentage": 5.968,
    },
    {
        "province": "VALENCIA",
        "year": 2017,
        "budget": 17958855,
        "invest_promotion": 1008985,
        "liquid": 16949870,
        "percentage": 5.618,
    },
    {
        "province": "VALENCIA",
        "year": 2016,
        "budget": 17354885,
        "invest_promotion": 965736,
        "liquid": 16389149,
        "percentage": 5.565,
    },
]

module.exports.register = (app)=>{

    app.get(BASE_API_PATH+"/loadInitialData", (request, response)=>{

     budgetsDB.find({},(error,data)=>{
        if(error){
            console.error("Database cannot be accessed" + error);
                response.sendStatus(500);
         }else{
             if(data.length==0){
                 db.insert(budgets_ini);
                 console.log(`Initial data loaded: ${JSON.stringify(budgets_ini, null, 2)}`);
                     return response.sendStatus(200);
             }else{
                console.log("Database already initialized");
                    return response.sendStatus(205);
                }
            }
         })
    })
    
    app.get(BASE_API_PATH, (request, response)=>{

        var query = request.query;
		var limit = parseInt(query.limit);
		var offset = parseInt(query.offset);
        
		delete query.offset;
		delete query.limit;

		if(query.hasOwnProperty("year")){
			query.year = parseInt(query.year);
			console.log(query.year);
		}
		if(query.hasOwnProperty("budget")){
			query.budget = parseFloat(query.budget);
			console.log(query.budget);
		}
		if(query.hasOwnProperty("invest_promotion")){
			query.invest_promotion = parseFloat(query.invest_promotion);
			console.log(query.invest_promotion);
		}
		if(query.hasOwnProperty("liquid")){
			query.liquid = parseFloat(query.liquid);
			console.log(query.liquid);
		}
        if(query.hasOwnProperty("percentage")){
			query.percentage = parseFloat(query.percentage);
			console.log(query.percentage);
		}
		console.log(query);

		budgetsDB.find(query).skip(offset).limit(limit).exec((error, data)=>{
			data.forEach((i)=>{
				delete i._id;
			});
			if(data.length==0){
				console.error("Cannot find the resource");
                    response.sendStatus(400);
			}else{
				console.log(`Resources sended: <${JSON.stringify(data, null, 2)}>`);
                    response.status(200).send(JSON.stringify(data, null, 2));
			}
		});
    })
    
    app.post(BASE_API_PATH, (request,response)=>{ 

        budgetsDB.find({province: request.body.province, year: request.body.year}, (error,data)=>{
            if(error){
                console.error("Cannot post the resource using POST." + error);
                    response.sendStatus(500);
            }else{
                if(data.length==0){
                    if(!request.body.province ||
                        !request.body.year ||
                        !request.body['budget'] ||
                        !request.body['invest_promotion'] ||
                        !request.body['liquid'] ||
                        !request.body['percentage']) {
                        console.log(`Incorrect number of resources`);
                            return response.sendStatus(400);
                    }else if (!(/^([0-9])*$/.test(request.body['budget'])) ||
                        !(/^([0-9])*$/.test(request.body['invest_promotion'])) ||
                        !(/^([0-9])*$/.test(request.body['liquid'])) ||
                        !(/^([0-9])*$/.test(request.body['percentage']))) {
                        console.log(`Integers allowed only`);
                            return response.sendStatus(409);
                    }else{
                        console.log("Resource stored: "+JSON.stringify(request.body, null, 2));
                        budgetsDB.insert(request.body);
                            response.sendStatus(201);	
                    }
                }else{
                    console.log("That resource already exists");
                        response.sendStatus(409);
                }
            }
        })
    })
    
    app.get(BASE_API_PATH+"/:province/:year", (request, response)=>{

        budgetsDB.find({province: request.params.province, year: request.params.year},(error,data)=>{
            if(error){
                console.error("Cannot access to the resource using GET" + error);
                    response.sendStatus(500);
            }else{
                if(data.length==0){
                    console.error("Cannot find the resource");
                        response.sendStatus(404);
                }else{
                    var newBudget = data.map((f)=>{
                        return {province: f.province, year: f.year, "budget": f.budget, "invest_promotion": f.invest_promotion, "liquid": f.liquid, "percentage": f.percentage};
                    });
                    console.log(newBudget);
                        response.status(200).send(JSON.stringify(newBudget, null, 2));
                }
            }
        })
    });    
    
    app.delete(BASE_API_PATH+"/:province/:year", (request, response)=>{ 

        budgetsDB.remove({province: request.params.province, year: request.params.year},(error,dataRemoved)=>{
            if(error){
                console.error("Cannot delete the resource using DELETE" + error);
                    response.sendStatus(500);
            }else{
                if(dataRemoved==0){
                    console.log("Cannot find the resource with that information");
                        response.sendStatus(404);
                }else{
                    console.log("Resource deleted");
                        response.sendStatus(200);
                }
            }
        })
    });
    
    app.put(BASE_API_PATH+"/:province/:year", (request, response)=>{ 

        budgetsDB.find({}, (error,data)=>{
            if(error){
                console.error("Cannot update the resource using PUT" + error);
                    response.sendStatus(500);
            }else{
                if(data==0){
                    console.log(`Database is empty`);
                        return response.sendStatus(404);
                }else{
                    if(!request.body.province ||
                        !request.body.year ||
                        !request.body['budget'] ||
                        !request.body['invest_promotion'] ||
                        !request.body['liquid'] ||
                        !request.body['percentage']){
                        console.log(`Incorrect number of resources`);
                            return response.sendStatus(400);
                    }else{
                        budgetsDB.find({province: request.params.province, year: request.params.year}, (error,data)=>{
                            if(error){
                                console.error("Ops, something went wrong");
                                    response.sendStatus(404);
                            }
                            if (data.length==0){
                                console.log("Cannot find the resource with that information");
                                    response.sendStatus(404);
                            }else{
                                budgetsDB.update({province: request.params.province, year: request.params.year},
                                    {
                                        province: request.params.province,
                                        year: request.params.year,
                                        "budget": request.body.budget,
                                        "invest_promotion": request.body.invest_promotion,
                                        "liquid": request.body.liquid,
                                        "percentage": request.body.percentage
                                    }, 
                                    (error,dataUpdated)=>{
                                        if(error){
                                            console.error("Ops, something went wrong");
                                                response.sendStatus(404);
                                        }else{
                                            console.log("Resource updated");
                                                response.sendStatus(200);
                                        }
                                    });
                            }
                        });
                    }
                }
            }
        });
    });


    app.post(BASE_API_PATH+"/:province/:year", (request, response)=>{ 

        response.status(405).send("Method not allowed"); 
    });

    app.put(BASE_API_PATH, (request, response)=>{ 

        response.status(405).send("Method not allowed"); 
    });
    
    app.delete(BASE_API_PATH, (request,response)=>{

        budgetsDB.remove({},{multi:true},(error,dataErased)=>{
            if(error){
                console.error("Database cannot be deleted: " + error);
                    response.sendStatus(500);
            }else{
                if(dataErased==0){
                    console.error("Ops, something went wrong");
                        response.sendStatus(404);
                }else{
                    console.log("Everuthing has been eliminated");
                        response.sendStatus(200);
                }
            }
        })
    });
}
