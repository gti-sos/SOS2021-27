//API province-budget-and-investment-in-social-promotion

var budgets=[];
var BASE_API_PATH = "/api/v1";


module.exports.register= (app)=>{

    app.get("/info/province-budget-and-investment-in-social-promotion",(request,response) => {
        response.send(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link type="text/css" rel="stylesheet" href="resources/sheet.css" >
        <style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s0{background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s1{background-color:#f3f3f3;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style><div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-origin-ltr"></th><th id="1843227758C0" style="width:100px;" class="column-headers-background">A</th><th id="1843227758C1" style="width:100px;" class="column-headers-background">B</th><th id="1843227758C2" style="width:118px;" class="column-headers-background">C</th><th id="1843227758C3" style="width:160px;" class="column-headers-background">D</th><th id="1843227758C4" style="width:109px;" class="column-headers-background">E</th><th id="1843227758C5" style="width:100px;" class="column-headers-background">F</th></tr></thead><tbody><tr style="height: 20px"><th id="1843227758R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0" dir="ltr">province</td><td class="s0" dir="ltr">year</td><td class="s0" dir="ltr">budget</td><td class="s0" dir="ltr">invest-promotion</td><td class="s0" dir="ltr">liquid</td><td class="s0" dir="ltr">percentage</td></tr><tr style="height: 20px"><th id="1843227758R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td class="s1" dir="ltr">SEVILLE</td><td class="s1" dir="ltr">2018</td><td class="s1" dir="ltr">30,714,715</td><td class="s1" dir="ltr">2,322,823</td><td class="s1" dir="ltr">28,391,892</td><td class="s1" dir="ltr">7.563</td></tr><tr style="height: 20px"><th id="1843227758R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s1" dir="ltr">SEVILLE</td><td class="s1" dir="ltr">2017</td><td class="s1" dir="ltr">29,194,210</td><td class="s1" dir="ltr">2,201,782</td><td class="s1" dir="ltr">26,992,428</td><td class="s1" dir="ltr">7.542</td></tr><tr style="height: 20px"><th id="1843227758R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">4</div></th><td class="s1" dir="ltr">SEVILLE</td><td class="s1" dir="ltr">2016</td><td class="s1" dir="ltr">27,037,781</td><td class="s1" dir="ltr">2,145,096</td><td class="s1" dir="ltr">24,892,685</td><td class="s1" dir="ltr">7.934</td></tr><tr style="height: 20px"><th id="1843227758R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">5</div></th><td class="s1" dir="ltr">BARCELONA</td><td class="s1" dir="ltr">2018</td><td class="s1" dir="ltr">29,178,828</td><td class="s1" dir="ltr">2,089,505</td><td class="s1" dir="ltr">27,089,323</td><td class="s1" dir="ltr">7.161</td></tr><tr style="height: 20px"><th id="1843227758R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">6</div></th><td class="s1" dir="ltr">BARCELONA</td><td class="s1" dir="ltr">2017</td><td class="s1" dir="ltr">30,620,317</td><td class="s1" dir="ltr">2,079,758</td><td class="s1" dir="ltr">28,540,559</td><td class="s1" dir="ltr">6.792</td></tr><tr style="height: 20px"><th id="1843227758R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">7</div></th><td class="s1" dir="ltr">BARCELONA</td><td class="s1" dir="ltr">2016</td><td class="s1" dir="ltr">29,449,783</td><td class="s1" dir="ltr">1,937,622</td><td class="s1" dir="ltr">27,512,161</td><td class="s1" dir="ltr">6.579</td></tr><tr style="height: 20px"><th id="1843227758R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">8</div></th><td class="s1" dir="ltr">MADRID</td><td class="s1" dir="ltr">2018</td><td class="s1" dir="ltr">21,633,751</td><td class="s1" dir="ltr">1,742,793</td><td class="s1" dir="ltr">19,890,958</td><td class="s1" dir="ltr">8.056</td></tr><tr style="height: 20px"><th id="1843227758R8" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">9</div></th><td class="s1" dir="ltr">MADRID</td><td class="s1" dir="ltr">2017</td><td class="s1" dir="ltr">20,504,094</td><td class="s1" dir="ltr">1,628,027</td><td class="s1" dir="ltr">18,876,067</td><td class="s1" dir="ltr">7.940</td></tr><tr style="height: 20px"><th id="1843227758R9" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">10</div></th><td class="s1" dir="ltr">MADRID</td><td class="s1" dir="ltr">2016</td><td class="s1" dir="ltr">20,139,609</td><td class="s1" dir="ltr">1,520,787</td><td class="s1" dir="ltr">18,618,822</td><td class="s1" dir="ltr">7.551</td></tr><tr style="height: 20px"><th id="1843227758R10" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">11</div></th><td class="s1" dir="ltr">VALENCIA</td><td class="s1" dir="ltr">2018</td><td class="s1" dir="ltr">20,246,195</td><td class="s1" dir="ltr">1,208,254</td><td class="s1" dir="ltr">19,037,941</td><td class="s1" dir="ltr">5.968</td></tr><tr style="height: 20px"><th id="1843227758R11" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">12</div></th><td class="s1" dir="ltr">VALENCIA</td><td class="s1" dir="ltr">2017</td><td class="s1" dir="ltr">17,958,855</td><td class="s1" dir="ltr">1,008,985</td><td class="s1" dir="ltr">16,949,870</td><td class="s1" dir="ltr">5.618</td></tr><tr style="height: 20px"><th id="1843227758R12" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">13</div></th><td class="s1" dir="ltr">VALENCIA</td><td class="s1" dir="ltr">2016</td><td class="s1" dir="ltr">17,354,885</td><td class="s1" dir="ltr">965,736</td><td class="s1" dir="ltr">16,389,149</td><td class="s1" dir="ltr">5.565</td></tr></tbody></table></div>`)
    });
    
    
    app.get(BASE_API_PATH+"/budgets", (request, response) => {
        response.send(JSON.stringify(budgets,null,2));
    })
    
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
    
    
    var suicideAPI=require("./suicide-records-API");
    suicideAPI.register(app);
    
    
    app.get(BASE_API_PATH+"/precariousness",(request,response)=>{
        response.send(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link type="text/css" rel="stylesheet" href="resources/sheet.css" >
        <style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s1{border-right: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s3{border-left: none;border-right: none;background-color:#efefef;text-align:center;font-weight:bold;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s5{background-color:#efefef;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s0{background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s4{background-color:#f3f3f3;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s2{border-left: none;border-right: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style><div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-origin-ltr"></th><th id="2103245264C0" style="width:100px;" class="column-headers-background">A</th><th id="2103245264C1" style="width:100px;" class="column-headers-background">B</th><th id="2103245264C2" style="width:100px;" class="column-headers-background">C</th><th id="2103245264C3" style="width:100px;" class="column-headers-background">D</th><th id="2103245264C4" style="width:100px;" class="column-headers-background">E</th><th id="2103245264C5" style="width:100px;" class="column-headers-background">F</th></tr></thead><tbody><tr style="height: 20px"><th id="2103245264R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0" dir="ltr">province</td><td class="s1" dir="ltr">year</td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">percentage-unemploy-mens</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">percentage-unemploy-women</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">percentage-unemploy-total</div></td><td class="s3 softmerge" dir="ltr"><div class="softmerge-inner" style="width:200px;left:-3px">number-unemployed</div></td></tr><tr style="height: 20px"><th id="2103245264R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td class="s4" dir="ltr">SEVILLE</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">18</td><td class="s4" dir="ltr">25</td><td class="s4" dir="ltr">21</td><td class="s5" dir="ltr">68 434</td></tr><tr style="height: 20px"><th id="2103245264R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s4" dir="ltr">SEVILLE</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">20</td><td class="s4" dir="ltr">25</td><td class="s4" dir="ltr">22</td><td class="s5" dir="ltr">72 679</td></tr><tr style="height: 20px"><th id="2103245264R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">4</div></th><td class="s4" dir="ltr">SEVILLE</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">25</td><td class="s4" dir="ltr">30</td><td class="s4" dir="ltr">24</td><td class="s5" dir="ltr">77 627</td></tr><tr style="height: 20px"><th id="2103245264R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">5</div></th><td class="s4" dir="ltr">BARCELONA</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">10</td><td class="s4" dir="ltr">12</td><td class="s4" dir="ltr">11</td><td class="s5" dir="ltr">392 907</td></tr><tr style="height: 20px"><th id="2103245264R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">6</div></th><td class="s4" dir="ltr">BARCELONA</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">11</td><td class="s4" dir="ltr">13</td><td class="s4" dir="ltr">12</td><td class="s5" dir="ltr">418 018</td></tr><tr style="height: 20px"><th id="2103245264R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">7</div></th><td class="s4" dir="ltr">BARCELONA</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">14</td><td class="s4" dir="ltr">16</td><td class="s4" dir="ltr">15</td><td class="s5" dir="ltr">558 500</td></tr><tr style="height: 20px"><th id="2103245264R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">8</div></th><td class="s4" dir="ltr">MADRID</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">11</td><td class="s4" dir="ltr">12</td><td class="s4" dir="ltr">12</td><td class="s5" dir="ltr">396 200</td></tr><tr style="height: 20px"><th id="2103245264R8" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">9</div></th><td class="s4" dir="ltr">MADRID</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">13</td><td class="s4" dir="ltr">15</td><td class="s4" dir="ltr">14</td><td class="s5" dir="ltr">471 100</td></tr><tr style="height: 20px"><th id="2103245264R9" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">10</div></th><td class="s4" dir="ltr">MADRID</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">14</td><td class="s4" dir="ltr">15</td><td class="s4" dir="ltr">15</td><td class="s5" dir="ltr">489 100</td></tr><tr style="height: 20px"><th id="2103245264R10" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">11</div></th><td class="s4" dir="ltr">VALENCIA</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">11</td><td class="s4" dir="ltr">16</td><td class="s4" dir="ltr">13</td><td class="s5" dir="ltr">344 100</td></tr><tr style="height: 20px"><th id="2103245264R11" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">12</div></th><td class="s4" dir="ltr">VALENCIA</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">14</td><td class="s4" dir="ltr">19</td><td class="s4" dir="ltr">16</td><td class="s5" dir="ltr">410 000</td></tr><tr style="height: 20px"><th id="2103245264R12" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">13</div></th><td class="s4" dir="ltr">VALENCIA</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">18</td><td class="s4" dir="ltr">23</td><td class="s4" dir="ltr">20</td><td class="s5" dir="ltr">467 400</td></tr></tbody></table></div>`)
    });
    
}