//API province-budget-and-investment-in-social-promotion

var budgets=[];
var BASE_API_PATH = "/api/v1";


module.exports.register= (app,db)=>{

    app.get(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion/loadInitialData", (request, response) => {

        budgets_ini = [
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

     db.find({},(error,data)=>{
        if(error){
            console.error("Database cannot be accessed");
                return request.sendStatus(500);
         }else{
             if(data.length==0){
                 db.insert(budgets_ini);
                 console.log(`Initial data loaded: <${JSON.stringify(budgets_ini, null, 2)}>`);
                     return response.sendStatus(200);
             }else{
                console.error("Database already initialized")
                    return response.sendStatus(409)
                }
            }
         })
    })
    
    app.get(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion", (request, response) => {

        var query=request.query;
        var limit=parseInt(query.limit);
        var offset=parseInt(query.offset);

        delete query.offset;
        delete query.limit;
    
        db.find(query,{_id:0}).skip(offset).limit(limit).exec((error,data)=>{
            if(error){
                console.error("Cannot access to the resource using GET");
                response.sendStatus(500);
            }else{
                if(data.length==0){
                    console.error("Cannot find the resource")
                    response.sendStatus(404);
                }else{
                    console.log(`Resources sended: <${JSON.stringify(data, null, 2)}>`);
                    response.status(200).send(JSON.stringify(data, null, 2));
                }
            }
        })
    })
    
    app.post(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion", (request,response)=>{ 

        if(request.body.province && request.body.year && request.body.budget && request.body.invest_promotion && request.body.liquid && request.body.percentage){

            db.find({"province":request.body.province,"year":request.body.year},(error,data)=>{
                if(error){
                    console.error("Cannot post the resource using POST");
                    response.sendStatus(500);
                }else{
                    if(data.length!=0){
                        console.error("That resource already exists");
                        response.sendStatus(409)
                    }else{
                        db.insert(request.body);
                        console.log(`Resource stored: <${JSON.stringify(request.body, null, 2)}>`);
                        response.sendStatus(201)
                    }
                } 
            })
        }else{
            console.error("Resource format not valid")
            return response.sendStatus(400)
        }
    });
    
    app.get(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion/:province/:year", (request, response)=>{

        db.find({"province":request.params.province,"year":request.params.year},{_id:0},(error,data)=>{
            if(error){
                console.error("Cannot access to the resource using GET");
                response.sendStatus(500);
            }else{
                if(data.length==0){
                    console.error("Cannot find the resource")
                    response.sendStatus(404);
                }else{
                    response.status(200).send(JSON.stringify(data[0], null, 2));
                    console.log("Resources sended:"+JSON.stringify(data[0], null, 2));
                }
            }
        })
    });    
    
    app.delete(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion/:province/:year", function(request, response) { 

        db.remove({"province":request.params.province,"year":request.params.year},(error,remove)=>{
            if(error){
                console.error("Cannot delete the resource using DELETE");
                response.sendStatus(500)
            }else{
                if(remove==0){
                    console.log("Cannot find the resource with that information");
                    response.sendStatus(404)
                }else{
                    console.log("Resource deleted")
                    response.sendStatus(200)
                }
            }
        })
    });
    
    app.put(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion/:province/:year", function(request, response) { 
    
        if(request.params.province!=request.body.province || request.params.year!=request.body.year){
            console.error("Cannot modify the resource, keys are wrong");
            response.sendStatus(400)
        }else{
            db.update({"province":request.body.province,"year":request.body.year},request.body,(error,update)=>{
                if(error){
                    console.error("Cannot update the resource using PUT")
                    response.sendStatus(500)
                }else{
                    if(update==0){
                        console.log("Cannot find the resource with that information")
                        response.sendStatus(404)
                    }else{
                        console.log("Resource updated")
                        response.sendStatus(200);
                    }
                }
            })
        }
    });


    app.post(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion/:province/:year", function(request, response) { 

        response.status(405).send("Method not allowed"); 
    });

    app.put(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion", function(request, response) { 

        response.status(405).send("Method not allowed"); 
    });
    
    app.delete(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion", (request,response)=>{

        db.remove({},{multi:true},(error,erase)=>{
            console.log(erase + " has been eliminated");
            response.sendStatus(200);
        })
    });
}