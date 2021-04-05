const { response } = require("express");

var express=require("express"); // Cargamos el modulo

var app=express(); // Generamos una aplicación que hace uso de express

var port= (process.env.PORT || 10000); // Obtiene el puerto que se le indique o el 10000 en caso de no existir  (Heroku no trabaja con puerto 10000)

var BASE_API_PATH = "/api/v1";

app.listen(port, () =>{ // Cuando el servidor está listo, ejecuta el código interior.
    console.log("Server ready listening on port "+port); 
});

var path=require("path");
 
// Dirname obtiene la carpeta donde se ejecuto npm start (C:\\....).
// Use hace que cuando se llame a lo que sea que esté dentro de /, lo busque en la carpeta public...
app.use("/",express.static(path.join(__dirname + "/public")));  

var activities=[];

app.get(BASE_API_PATH+"/info/azar-games-and-bet-activities", (request,response)=>{ 
    response.send(JSON.stringify(activities,null,2));
 
});

//API province-budget-and-investment-in-social-promotion
var budgets = [];

app.get(BASE_API_PATH+"/budgets", (request, response) => {
    response.sendStatus(JSON.stringify(budgets,null,2));
})

app.get(BASE_API_PATH+"/budgets/loadInitialData", (request, response) => {
    budgets_ini = [
        {
            "province": 'SEVILLE',
            "year": 2018,
            "budget": 30714715,
            "invest-promotion": 2322823,
            "liquid": 28391892,
            "percentage": 7.563,
        },
        {
            "province": 'BARCELONA',
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

    console.log(`Loaded Initial Data: <${JSON.stringify(budgets_ini, null, 2)}>`);
	return res.sendStatus(200);
})


//API suicide-records

var suicide=[];

app.get(BASE_API_PATH+"/suicide-records", (request,response)=>{ 

    response.send(JSON.stringify(suicide,null,2));
});

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



app.get(BASE_API_PATH+"/precariousness",(request,response)=>{
    response.send(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link type="text/css" rel="stylesheet" href="resources/sheet.css" >
    <style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s1{border-right: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s3{border-left: none;border-right: none;background-color:#efefef;text-align:center;font-weight:bold;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s5{background-color:#efefef;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s0{background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s4{background-color:#f3f3f3;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s2{border-left: none;border-right: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style><div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-origin-ltr"></th><th id="2103245264C0" style="width:100px;" class="column-headers-background">A</th><th id="2103245264C1" style="width:100px;" class="column-headers-background">B</th><th id="2103245264C2" style="width:100px;" class="column-headers-background">C</th><th id="2103245264C3" style="width:100px;" class="column-headers-background">D</th><th id="2103245264C4" style="width:100px;" class="column-headers-background">E</th><th id="2103245264C5" style="width:100px;" class="column-headers-background">F</th></tr></thead><tbody><tr style="height: 20px"><th id="2103245264R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0" dir="ltr">province</td><td class="s1" dir="ltr">year</td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">percentage-unemploy-mens</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">percentage-unemploy-women</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">percentage-unemploy-total</div></td><td class="s3 softmerge" dir="ltr"><div class="softmerge-inner" style="width:200px;left:-3px">number-unemployed</div></td></tr><tr style="height: 20px"><th id="2103245264R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td class="s4" dir="ltr">SEVILLE</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">18</td><td class="s4" dir="ltr">25</td><td class="s4" dir="ltr">21</td><td class="s5" dir="ltr">68 434</td></tr><tr style="height: 20px"><th id="2103245264R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s4" dir="ltr">SEVILLE</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">20</td><td class="s4" dir="ltr">25</td><td class="s4" dir="ltr">22</td><td class="s5" dir="ltr">72 679</td></tr><tr style="height: 20px"><th id="2103245264R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">4</div></th><td class="s4" dir="ltr">SEVILLE</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">25</td><td class="s4" dir="ltr">30</td><td class="s4" dir="ltr">24</td><td class="s5" dir="ltr">77 627</td></tr><tr style="height: 20px"><th id="2103245264R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">5</div></th><td class="s4" dir="ltr">BARCELONA</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">10</td><td class="s4" dir="ltr">12</td><td class="s4" dir="ltr">11</td><td class="s5" dir="ltr">392 907</td></tr><tr style="height: 20px"><th id="2103245264R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">6</div></th><td class="s4" dir="ltr">BARCELONA</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">11</td><td class="s4" dir="ltr">13</td><td class="s4" dir="ltr">12</td><td class="s5" dir="ltr">418 018</td></tr><tr style="height: 20px"><th id="2103245264R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">7</div></th><td class="s4" dir="ltr">BARCELONA</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">14</td><td class="s4" dir="ltr">16</td><td class="s4" dir="ltr">15</td><td class="s5" dir="ltr">558 500</td></tr><tr style="height: 20px"><th id="2103245264R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">8</div></th><td class="s4" dir="ltr">MADRID</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">11</td><td class="s4" dir="ltr">12</td><td class="s4" dir="ltr">12</td><td class="s5" dir="ltr">396 200</td></tr><tr style="height: 20px"><th id="2103245264R8" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">9</div></th><td class="s4" dir="ltr">MADRID</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">13</td><td class="s4" dir="ltr">15</td><td class="s4" dir="ltr">14</td><td class="s5" dir="ltr">471 100</td></tr><tr style="height: 20px"><th id="2103245264R9" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">10</div></th><td class="s4" dir="ltr">MADRID</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">14</td><td class="s4" dir="ltr">15</td><td class="s4" dir="ltr">15</td><td class="s5" dir="ltr">489 100</td></tr><tr style="height: 20px"><th id="2103245264R10" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">11</div></th><td class="s4" dir="ltr">VALENCIA</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">11</td><td class="s4" dir="ltr">16</td><td class="s4" dir="ltr">13</td><td class="s5" dir="ltr">344 100</td></tr><tr style="height: 20px"><th id="2103245264R11" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">12</div></th><td class="s4" dir="ltr">VALENCIA</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">14</td><td class="s4" dir="ltr">19</td><td class="s4" dir="ltr">16</td><td class="s5" dir="ltr">410 000</td></tr><tr style="height: 20px"><th id="2103245264R12" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">13</div></th><td class="s4" dir="ltr">VALENCIA</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">18</td><td class="s4" dir="ltr">23</td><td class="s4" dir="ltr">20</td><td class="s5" dir="ltr">467 400</td></tr></tbody></table></div>`)
});

