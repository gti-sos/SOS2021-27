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


app.get("/info/azar-games-and-bet-activities", (request,response)=>{ 
    response.send(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link type="text/css" rel="stylesheet" href="resources/sheet.css" >
    <style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s1{border-right: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s7{background-color:#f3f3f3;text-align:left;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s3{border-left: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s4{border-left: none;border-right: none;background-color:#efefef;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s0{background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s5{background-color:#f3f3f3;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s2{border-left: none;border-right: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s6{background-color:#f3f3f3;text-align:right;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style><div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-origin-ltr"></th><th id="942107395C0" style="width:100px;" class="column-headers-background">A</th><th id="942107395C1" style="width:100px;" class="column-headers-background">B</th><th id="942107395C2" style="width:100px;" class="column-headers-background">C</th><th id="942107395C3" style="width:100px;" class="column-headers-background">D</th><th id="942107395C4" style="width:100px;" class="column-headers-background">E</th><th id="942107395C5" style="width:100px;" class="column-headers-background">F</th></tr></thead><tbody><tr style="height: 20px"><th id="942107395R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0" dir="ltr">province</td><td class="s1" dir="ltr">year</td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">catering-bingo-machine</div></td><td class="s3 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">lottery-engagement </div></td><td class="s1" dir="ltr">bingo-site</td><td class="s4 softmerge" dir="ltr"><div class="softmerge-inner" style="width:200px;left:-3px">national-lottery-expend</div></td></tr><tr style="height: 20px"><th id="942107395R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td class="s5" dir="ltr">SEVILLE</td><td class="s5" dir="ltr">2018</td><td class="s6" dir="ltr">4.965</td><td class="s7" dir="ltr">24.028.820</td><td class="s5" dir="ltr">6</td><td class="s7" dir="ltr">141.889.249</td></tr><tr style="height: 20px"><th id="942107395R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s5" dir="ltr">SEVILLE</td><td class="s5" dir="ltr">2017</td><td class="s6" dir="ltr">4.94</td><td class="s7" dir="ltr">23.339.380</td><td class="s5" dir="ltr">6</td><td class="s7" dir="ltr">138.160.377</td></tr><tr style="height: 20px"><th id="942107395R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">4</div></th><td class="s5" dir="ltr">SEVILLE</td><td class="s5" dir="ltr">2016</td><td class="s6" dir="ltr">4.778</td><td class="s7" dir="ltr">23.302.680</td><td class="s5" dir="ltr">6</td><td class="s7" dir="ltr">130.959.228</td></tr><tr style="height: 20px"><th id="942107395R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">5</div></th><td class="s5" dir="ltr">BARCELONA</td><td class="s5" dir="ltr">2018</td><td class="s6" dir="ltr">13.389</td><td class="s7" dir="ltr">56.425.240</td><td class="s5" dir="ltr">34</td><td class="s7" dir="ltr">486.535.860</td></tr><tr style="height: 20px"><th id="942107395R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">6</div></th><td class="s5" dir="ltr">BARCELONA</td><td class="s5" dir="ltr">2017</td><td class="s6" dir="ltr">13.389</td><td class="s7" dir="ltr">62.538.100</td><td class="s5" dir="ltr">34</td><td class="s7" dir="ltr">487.375.563</td></tr><tr style="height: 20px"><th id="942107395R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">7</div></th><td class="s5" dir="ltr">BARCELONA</td><td class="s5" dir="ltr">2016</td><td class="s6" dir="ltr">13.389</td><td class="s7" dir="ltr">59.640.040</td><td class="s5" dir="ltr">33</td><td class="s7" dir="ltr">498.638.230</td></tr><tr style="height: 20px"><th id="942107395R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">8</div></th><td class="s5" dir="ltr">MADRID</td><td class="s5" dir="ltr">2018</td><td class="s6" dir="ltr">17.24</td><td class="s7" dir="ltr">95.951.420</td><td class="s5" dir="ltr">45</td><td class="s7" dir="ltr">807.501.802</td></tr><tr style="height: 20px"><th id="942107395R8" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">9</div></th><td class="s5" dir="ltr">MADRID</td><td class="s5" dir="ltr">2017</td><td class="s6" dir="ltr">17.988</td><td class="s7" dir="ltr">99.264.960</td><td class="s5" dir="ltr">46</td><td class="s7" dir="ltr">802.036.655</td></tr><tr style="height: 20px"><th id="942107395R9" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">10</div></th><td class="s5" dir="ltr">MADRID</td><td class="s5" dir="ltr">2016</td><td class="s6" dir="ltr">17.236</td><td class="s7" dir="ltr">89.332.820 9</td><td class="s5" dir="ltr">43</td><td class="s7" dir="ltr">760.015.875 8</td></tr><tr style="height: 20px"><th id="942107395R10" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">11</div></th><td class="s5" dir="ltr">VALENCIA</td><td class="s5" dir="ltr">2018</td><td class="s6" dir="ltr">20.525</td><td class="s7" dir="ltr">52.916.920</td><td class="s5" dir="ltr">32</td><td class="s7" dir="ltr">355.915.035</td></tr><tr style="height: 20px"><th id="942107395R11" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">12</div></th><td class="s5" dir="ltr">VALENCIA</td><td class="s5" dir="ltr">2017</td><td class="s6" dir="ltr">20.975</td><td class="s7" dir="ltr">51.134.140</td><td class="s5" dir="ltr">30</td><td class="s7" dir="ltr">348.995.707</td></tr><tr style="height: 20px"><th id="942107395R12" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">13</div></th><td class="s5" dir="ltr">VALENCIA</td><td class="s5" dir="ltr">2016</td><td class="s6" dir="ltr">20.975</td><td class="s7" dir="ltr">48.581.940</td><td class="s5" dir="ltr">30</td><td class="s7" dir="ltr">334.546.253</td></tr></tbody></table></div>`);
    console.log("New Request to /info/azar-games-and-bet-activities has arrived");
 
});

app.get("/info/province-budget-and-investment-in-social-promotion", (request,response)=>{ 
    response.send(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link type="text/css" rel="stylesheet" href="resources/sheet.css" >
    <style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s0{background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s1{background-color:#f3f3f3;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style><div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-origin-ltr"></th><th id="1843227758C0" style="width:100px;" class="column-headers-background">A</th><th id="1843227758C1" style="width:100px;" class="column-headers-background">B</th><th id="1843227758C2" style="width:118px;" class="column-headers-background">C</th><th id="1843227758C3" style="width:160px;" class="column-headers-background">D</th><th id="1843227758C4" style="width:109px;" class="column-headers-background">E</th><th id="1843227758C5" style="width:100px;" class="column-headers-background">F</th></tr></thead><tbody><tr style="height: 20px"><th id="1843227758R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0" dir="ltr">province</td><td class="s0" dir="ltr">year</td><td class="s0" dir="ltr">budget</td><td class="s0" dir="ltr">invest-promotion</td><td class="s0" dir="ltr">liquid</td><td class="s0" dir="ltr">percentage</td></tr><tr style="height: 20px"><th id="1843227758R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td class="s1" dir="ltr">SEVILLE</td><td class="s1" dir="ltr">2018</td><td class="s1" dir="ltr">30,714,715</td><td class="s1" dir="ltr">2,322,823</td><td class="s1" dir="ltr">28,391,892</td><td class="s1" dir="ltr">7.56%</td></tr><tr style="height: 20px"><th id="1843227758R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s1" dir="ltr">SEVILLE</td><td class="s1" dir="ltr">2017</td><td class="s1" dir="ltr">29,194,210</td><td class="s1" dir="ltr">2,201,782</td><td class="s1" dir="ltr">26,992,428</td><td class="s1" dir="ltr">7.54%</td></tr><tr style="height: 20px"><th id="1843227758R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">4</div></th><td class="s1" dir="ltr">SEVILLE</td><td class="s1" dir="ltr">2016</td><td class="s1" dir="ltr">27,037,781</td><td class="s1" dir="ltr">2,145,096</td><td class="s1" dir="ltr">24,892,685</td><td class="s1" dir="ltr">7.93%</td></tr><tr style="height: 20px"><th id="1843227758R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">5</div></th><td class="s1" dir="ltr">BARCELONA</td><td class="s1" dir="ltr">2018</td><td class="s1" dir="ltr">29,178,828</td><td class="s1" dir="ltr">2,089,505</td><td class="s1" dir="ltr">27,089,323</td><td class="s1" dir="ltr">7.16%</td></tr><tr style="height: 20px"><th id="1843227758R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">6</div></th><td class="s1" dir="ltr">BARCELONA</td><td class="s1" dir="ltr">2017</td><td class="s1" dir="ltr">30,620,317</td><td class="s1" dir="ltr">2,079,758</td><td class="s1" dir="ltr">28,540,559</td><td class="s1" dir="ltr">6.79%</td></tr><tr style="height: 20px"><th id="1843227758R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">7</div></th><td class="s1" dir="ltr">BARCELONA</td><td class="s1" dir="ltr">2016</td><td class="s1" dir="ltr">29,449,783</td><td class="s1" dir="ltr">1,937,622</td><td class="s1" dir="ltr">27,512,161</td><td class="s1" dir="ltr">6.58%</td></tr><tr style="height: 20px"><th id="1843227758R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">8</div></th><td class="s1" dir="ltr">MADRID</td><td class="s1" dir="ltr">2018</td><td class="s1" dir="ltr">21,633,751</td><td class="s1" dir="ltr">1,742,793</td><td class="s1" dir="ltr">19,890,958</td><td class="s1" dir="ltr">8.06%</td></tr><tr style="height: 20px"><th id="1843227758R8" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">9</div></th><td class="s1" dir="ltr">MADRID</td><td class="s1" dir="ltr">2017</td><td class="s1" dir="ltr">20,504,094</td><td class="s1" dir="ltr">1,628,027</td><td class="s1" dir="ltr">18,876,067</td><td class="s1" dir="ltr">7.94%</td></tr><tr style="height: 20px"><th id="1843227758R9" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">10</div></th><td class="s1" dir="ltr">MADRID</td><td class="s1" dir="ltr">2016</td><td class="s1" dir="ltr">20,139,609</td><td class="s1" dir="ltr">1,520,787</td><td class="s1" dir="ltr">18,618,822</td><td class="s1" dir="ltr">7.55%</td></tr><tr style="height: 20px"><th id="1843227758R10" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">11</div></th><td class="s1" dir="ltr">VALENCIA</td><td class="s1" dir="ltr">2018</td><td class="s1" dir="ltr">20,246,195</td><td class="s1" dir="ltr">1,208,254</td><td class="s1" dir="ltr">19,037,941</td><td class="s1" dir="ltr">5.97%</td></tr><tr style="height: 20px"><th id="1843227758R11" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">12</div></th><td class="s1" dir="ltr">VALENCIA</td><td class="s1" dir="ltr">2017</td><td class="s1" dir="ltr">17,958,855</td><td class="s1" dir="ltr">1,008,985</td><td class="s1" dir="ltr">16,949,870</td><td class="s1" dir="ltr">5.62%</td></tr><tr style="height: 20px"><th id="1843227758R12" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">13</div></th><td class="s1" dir="ltr">VALENCIA</td><td class="s1" dir="ltr">2016</td><td class="s1" dir="ltr">17,354,885</td><td class="s1" dir="ltr">965,736</td><td class="s1" dir="ltr">16,389,149</td><td class="s1" dir="ltr">5.56%</td></tr></tbody></table></div>`);
 
});

app.get("/info/suicide-records", (request,response)=>{ 
    response.send(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link type="text/css" rel="stylesheet" href="resources/sheet.css" >
    <style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s1{border-right: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s4{background-color:#efefef;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s2{border-left: none;border-right: none;background-color:#efefef;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s0{background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s3{background-color:#f3f3f3;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style><div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-vertical-handle"></th><th id="1019709666C0" style="width:93px;" class="column-headers-background">A</th><th id="1019709666C1" style="width:93px;" class="column-headers-background">B</th><th id="1019709666C2" style="width:93px;" class="column-headers-background">C</th><th id="1019709666C3" style="width:93px;" class="column-headers-background">D</th><th id="1019709666C4" style="width:93px;" class="column-headers-background">E</th><th id="1019709666C5" style="width:91px;" class="column-headers-background">F</th></tr></thead><tbody><tr style="height: 20px"><th id="1019709666R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0" dir="ltr">province</td><td class="s0" dir="ltr">year</td><td class="s0" dir="ltr">suic-man</td><td class="s0" dir="ltr">suic-woman</td><td class="s1" dir="ltr">suic-total</td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:191px;left:-3px">suic-rate-mw</div></td></tr><tr><th style="height:3px;" class="freezebar-cell freezebar-horizontal-handle"></th><td class="freezebar-cell"></td><td class="freezebar-cell"></td><td class="freezebar-cell"></td><td class="freezebar-cell"></td><td class="freezebar-cell"></td><td class="freezebar-cell"></td></tr><tr style="height: 20px"><th id="1019709666R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td class="s3" dir="ltr">SEVILLE</td><td class="s3" dir="ltr">2018</td><td class="s3" dir="ltr">78</td><td class="s3" dir="ltr">35</td><td class="s3" dir="ltr">113</td><td class="s4">2</td></tr><tr style="height: 20px"><th id="1019709666R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s3" dir="ltr">SEVILLE</td><td class="s3" dir="ltr">2017</td><td class="s3" dir="ltr">113</td><td class="s3" dir="ltr">44</td><td class="s3" dir="ltr">157</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">4</div></th><td class="s3" dir="ltr">SEVILLE</td><td class="s3" dir="ltr">2016</td><td class="s3" dir="ltr">88</td><td class="s3" dir="ltr">26</td><td class="s3" dir="ltr">114</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">5</div></th><td class="s3" dir="ltr">BARCELONA</td><td class="s3" dir="ltr">2018</td><td class="s3" dir="ltr">266</td><td class="s3" dir="ltr">99</td><td class="s3" dir="ltr">365</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">6</div></th><td class="s3" dir="ltr">BARCELONA</td><td class="s3" dir="ltr">2017</td><td class="s3" dir="ltr">256</td><td class="s3" dir="ltr">101</td><td class="s3" dir="ltr">357</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">7</div></th><td class="s3" dir="ltr">BARCELONA</td><td class="s3" dir="ltr">2016</td><td class="s3" dir="ltr">251</td><td class="s3" dir="ltr">113</td><td class="s3" dir="ltr">364</td><td class="s4">2</td></tr><tr style="height: 20px"><th id="1019709666R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">8</div></th><td class="s3" dir="ltr">MADRID</td><td class="s3" dir="ltr">2018</td><td class="s3" dir="ltr">232</td><td class="s3" dir="ltr">110</td><td class="s3" dir="ltr">342</td><td class="s4">2</td></tr><tr style="height: 20px"><th id="1019709666R8" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">9</div></th><td class="s3" dir="ltr">MADRID</td><td class="s3" dir="ltr">2017</td><td class="s3" dir="ltr">251</td><td class="s3" dir="ltr">90</td><td class="s3" dir="ltr">341</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R9" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">10</div></th><td class="s3" dir="ltr">MADRID</td><td class="s3" dir="ltr">2016</td><td class="s3" dir="ltr">218</td><td class="s3" dir="ltr">87</td><td class="s3" dir="ltr">305</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R10" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">11</div></th><td class="s3" dir="ltr">VALENCIA</td><td class="s3" dir="ltr">2018</td><td class="s3" dir="ltr">152</td><td class="s3" dir="ltr">56</td><td class="s3" dir="ltr">208</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R11" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">12</div></th><td class="s3" dir="ltr">VALENCIA</td><td class="s3" dir="ltr">2017</td><td class="s3" dir="ltr">126</td><td class="s3" dir="ltr">62</td><td class="s3" dir="ltr">188</td><td class="s4">2</td></tr><tr style="height: 20px"><th id="1019709666R12" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">13</div></th><td class="s3" dir="ltr">VALENCIA</td><td class="s3" dir="ltr">2016</td><td class="s3" dir="ltr">119</td><td class="s3" dir="ltr">41</td><td class="s3" dir="ltr">160</td><td class="s4">3</td></tr></tbody></table> <p>Suicide records stats from 4 differents provinces in 3 different years <br> (https://www.ine.es/jaxiT3/dlgExport.htm?t=9936) </div>`);
 
});

app.get("/info/precariousness",(request,response)=>{
    response.send(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link type="text/css" rel="stylesheet" href="resources/sheet.css" >
    <style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s1{border-right: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s3{border-left: none;border-right: none;background-color:#efefef;text-align:center;font-weight:bold;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s5{background-color:#efefef;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s0{background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s4{background-color:#f3f3f3;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s2{border-left: none;border-right: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style><div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-origin-ltr"></th><th id="2103245264C0" style="width:100px;" class="column-headers-background">A</th><th id="2103245264C1" style="width:100px;" class="column-headers-background">B</th><th id="2103245264C2" style="width:100px;" class="column-headers-background">C</th><th id="2103245264C3" style="width:100px;" class="column-headers-background">D</th><th id="2103245264C4" style="width:100px;" class="column-headers-background">E</th><th id="2103245264C5" style="width:100px;" class="column-headers-background">F</th></tr></thead><tbody><tr style="height: 20px"><th id="2103245264R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0" dir="ltr">province</td><td class="s1" dir="ltr">year</td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">percentage-unemploy-mens</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">percentage-unemploy-women</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:99px;left:-3px">percentage-unemploy-total</div></td><td class="s3 softmerge" dir="ltr"><div class="softmerge-inner" style="width:200px;left:-3px">number-unemployed</div></td></tr><tr style="height: 20px"><th id="2103245264R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td class="s4" dir="ltr">SEVILLE</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">18</td><td class="s4" dir="ltr">25</td><td class="s4" dir="ltr">21</td><td class="s5" dir="ltr">68 434</td></tr><tr style="height: 20px"><th id="2103245264R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s4" dir="ltr">SEVILLE</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">20</td><td class="s4" dir="ltr">25</td><td class="s4" dir="ltr">22</td><td class="s5" dir="ltr">72 679</td></tr><tr style="height: 20px"><th id="2103245264R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">4</div></th><td class="s4" dir="ltr">SEVILLE</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">25</td><td class="s4" dir="ltr">30</td><td class="s4" dir="ltr">24</td><td class="s5" dir="ltr">77 627</td></tr><tr style="height: 20px"><th id="2103245264R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">5</div></th><td class="s4" dir="ltr">BARCELONA</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">10</td><td class="s4" dir="ltr">12</td><td class="s4" dir="ltr">11</td><td class="s5" dir="ltr">392 907</td></tr><tr style="height: 20px"><th id="2103245264R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">6</div></th><td class="s4" dir="ltr">BARCELONA</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">11</td><td class="s4" dir="ltr">13</td><td class="s4" dir="ltr">12</td><td class="s5" dir="ltr">418 018</td></tr><tr style="height: 20px"><th id="2103245264R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">7</div></th><td class="s4" dir="ltr">BARCELONA</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">14</td><td class="s4" dir="ltr">16</td><td class="s4" dir="ltr">15</td><td class="s5" dir="ltr">558 500</td></tr><tr style="height: 20px"><th id="2103245264R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">8</div></th><td class="s4" dir="ltr">MADRID</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">11</td><td class="s4" dir="ltr">12</td><td class="s4" dir="ltr">12</td><td class="s5" dir="ltr">396 200</td></tr><tr style="height: 20px"><th id="2103245264R8" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">9</div></th><td class="s4" dir="ltr">MADRID</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">13</td><td class="s4" dir="ltr">15</td><td class="s4" dir="ltr">14</td><td class="s5" dir="ltr">471 100</td></tr><tr style="height: 20px"><th id="2103245264R9" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">10</div></th><td class="s4" dir="ltr">MADRID</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">14</td><td class="s4" dir="ltr">15</td><td class="s4" dir="ltr">15</td><td class="s5" dir="ltr">489 100</td></tr><tr style="height: 20px"><th id="2103245264R10" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">11</div></th><td class="s4" dir="ltr">VALENCIA</td><td class="s4" dir="ltr">2018</td><td class="s4" dir="ltr">11</td><td class="s4" dir="ltr">16</td><td class="s4" dir="ltr">13</td><td class="s5" dir="ltr">344 100</td></tr><tr style="height: 20px"><th id="2103245264R11" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">12</div></th><td class="s4" dir="ltr">VALENCIA</td><td class="s4" dir="ltr">2017</td><td class="s4" dir="ltr">14</td><td class="s4" dir="ltr">19</td><td class="s4" dir="ltr">16</td><td class="s5" dir="ltr">410 000</td></tr><tr style="height: 20px"><th id="2103245264R12" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">13</div></th><td class="s4" dir="ltr">VALENCIA</td><td class="s4" dir="ltr">2016</td><td class="s4" dir="ltr">18</td><td class="s4" dir="ltr">23</td><td class="s4" dir="ltr">20</td><td class="s5" dir="ltr">467 400</td></tr></tbody></table></div>`)
});

