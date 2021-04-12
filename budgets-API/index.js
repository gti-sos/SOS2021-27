//API province-budget-and-investment-in-social-promotion

var budgets=[];
var BASE_API_PATH = "/api/v1";


module.exports.register= (app)=>{

    app.get(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion/loadInitialData", (request, response) => {
        budgets_ini = [
            {
                "province": "SEVILLE",
                "year": 2018,
                "budget": 30714715,
                "invest-promotion": 2322823,
                "liquid": 28391892,
                "percentage": 7.563,
            },
            {
                "province": "BARCELONA",
                "year": 2018,
                "budget": 29178828,
                "invest-promotion": 2089505,
                "liquid": 27089323,
                "percentage": 7.161,
            }
        ]
        for(var data of budgets_ini){
            budgets.push(data)
        }
    
        console.log(`Initial data loaded: <${JSON.stringify(budgets_ini, null, 2)}>`);
        return response.sendStatus(200);
    })
    
    app.get(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion", (request, response) => {
        response.send(JSON.stringify(budgets,null,2));
    })
    
    app.post(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion", (request,response)=>{ 
        var data = request.body;
        budgets.push(data)
        console.log(`Resource stored: <${JSON.stringify(data, null, 2)}>`);
        response.sendStatus(201)
    });
    
    app.get(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion/:province/:year", (request, response)=>{
        var budget = budgets.filter(function(s){
            return s.province==String(request.params.province)&& s.year==String(request.params.year);});
    
            response.status(200).send(JSON.stringify(budget,null,2));
       
    }) ;    
    
    app.delete(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion/:province/:year", function(request, response) { 
        budgets = budgets.filter(function(s){
            if(s.province!=String(request.params.province) || s.year!=(String(request.params.year))) {
                return s;
            }
        });
    
        response.status(200).send("Eliminated correctly");
    });
    
    app.put(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion/:province/:year", function(request, response) { 
    
        for(var s in budgets){
            
            if(budgets[s].province == String(request.params.province) &&
                budgets[s].year == String(request.params.year)){
                    var changes = request.body;
                    budgets[s] = changes;
                    break;
            }
        }
        response.status(200).send("Updated correctly");
    
    });
    app.post(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion/:province/:year", function(request, response) { 
    
        response.status(405).send("Method not allowed"); 
    });
    app.put(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion", function(request, response) { 
    
        response.status(405).send("Method not allowed"); 
    });
    
    app.delete(BASE_API_PATH+"/province-budget-and-investment-in-social-promotion", (request,response)=>{
            
        budgets = []; 
        response.status(200).send("Everything has been eliminated");
    
    });

    
}