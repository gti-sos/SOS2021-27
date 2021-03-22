var cool = require("cool-ascii-faces");
const { response } = require("express");
var express=require("express");

var app=express();
var port= (process.env.PORT || 10000); // Obtiene el puerto que se le indique o el 10000 en caso de no existir

app.get("/cool", (request,response)=>{ 
    response.send(cool());
    console.log("New Request to /cool has arrived");
 
});

app.listen(port, () =>{
    console.log("Server ready listening on port "+port);
});


app.get("/info/suicide-records", (request,response)=>{ 
    response.send(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link type="text/css" rel="stylesheet" href="resources/sheet.css" >
    <style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s1{border-right: none;background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s4{background-color:#efefef;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s2{border-left: none;border-right: none;background-color:#efefef;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s0{background-color:#f3f3f3;text-align:center;font-weight:bold;font-style:italic;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s3{background-color:#f3f3f3;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style><div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-vertical-handle"></th><th id="1019709666C0" style="width:93px;" class="column-headers-background">A</th><th id="1019709666C1" style="width:93px;" class="column-headers-background">B</th><th id="1019709666C2" style="width:93px;" class="column-headers-background">C</th><th id="1019709666C3" style="width:93px;" class="column-headers-background">D</th><th id="1019709666C4" style="width:93px;" class="column-headers-background">E</th><th id="1019709666C5" style="width:91px;" class="column-headers-background">F</th></tr></thead><tbody><tr style="height: 20px"><th id="1019709666R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0" dir="ltr">province</td><td class="s0" dir="ltr">year</td><td class="s0" dir="ltr">suic-man</td><td class="s0" dir="ltr">suic-woman</td><td class="s1" dir="ltr">suic-total</td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:191px;left:-3px">suic-rate-mw</div></td></tr><tr><th style="height:3px;" class="freezebar-cell freezebar-horizontal-handle"></th><td class="freezebar-cell"></td><td class="freezebar-cell"></td><td class="freezebar-cell"></td><td class="freezebar-cell"></td><td class="freezebar-cell"></td><td class="freezebar-cell"></td></tr><tr style="height: 20px"><th id="1019709666R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td class="s3" dir="ltr">SEVILLE</td><td class="s3" dir="ltr">2018</td><td class="s3" dir="ltr">78</td><td class="s3" dir="ltr">35</td><td class="s3" dir="ltr">113</td><td class="s4">2</td></tr><tr style="height: 20px"><th id="1019709666R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s3" dir="ltr">SEVILLE</td><td class="s3" dir="ltr">2017</td><td class="s3" dir="ltr">113</td><td class="s3" dir="ltr">44</td><td class="s3" dir="ltr">157</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">4</div></th><td class="s3" dir="ltr">SEVILLE</td><td class="s3" dir="ltr">2016</td><td class="s3" dir="ltr">88</td><td class="s3" dir="ltr">26</td><td class="s3" dir="ltr">114</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">5</div></th><td class="s3" dir="ltr">BARCELONA</td><td class="s3" dir="ltr">2018</td><td class="s3" dir="ltr">266</td><td class="s3" dir="ltr">99</td><td class="s3" dir="ltr">365</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">6</div></th><td class="s3" dir="ltr">BARCELONA</td><td class="s3" dir="ltr">2017</td><td class="s3" dir="ltr">256</td><td class="s3" dir="ltr">101</td><td class="s3" dir="ltr">357</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">7</div></th><td class="s3" dir="ltr">BARCELONA</td><td class="s3" dir="ltr">2016</td><td class="s3" dir="ltr">251</td><td class="s3" dir="ltr">113</td><td class="s3" dir="ltr">364</td><td class="s4">2</td></tr><tr style="height: 20px"><th id="1019709666R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">8</div></th><td class="s3" dir="ltr">MADRID</td><td class="s3" dir="ltr">2018</td><td class="s3" dir="ltr">232</td><td class="s3" dir="ltr">110</td><td class="s3" dir="ltr">342</td><td class="s4">2</td></tr><tr style="height: 20px"><th id="1019709666R8" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">9</div></th><td class="s3" dir="ltr">MADRID</td><td class="s3" dir="ltr">2017</td><td class="s3" dir="ltr">251</td><td class="s3" dir="ltr">90</td><td class="s3" dir="ltr">341</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R9" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">10</div></th><td class="s3" dir="ltr">MADRID</td><td class="s3" dir="ltr">2016</td><td class="s3" dir="ltr">218</td><td class="s3" dir="ltr">87</td><td class="s3" dir="ltr">305</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R10" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">11</div></th><td class="s3" dir="ltr">VALENCIA</td><td class="s3" dir="ltr">2018</td><td class="s3" dir="ltr">152</td><td class="s3" dir="ltr">56</td><td class="s3" dir="ltr">208</td><td class="s4">3</td></tr><tr style="height: 20px"><th id="1019709666R11" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">12</div></th><td class="s3" dir="ltr">VALENCIA</td><td class="s3" dir="ltr">2017</td><td class="s3" dir="ltr">126</td><td class="s3" dir="ltr">62</td><td class="s3" dir="ltr">188</td><td class="s4">2</td></tr><tr style="height: 20px"><th id="1019709666R12" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">13</div></th><td class="s3" dir="ltr">VALENCIA</td><td class="s3" dir="ltr">2016</td><td class="s3" dir="ltr">119</td><td class="s3" dir="ltr">41</td><td class="s3" dir="ltr">160</td><td class="s4">3</td></tr></tbody></table> <p>Suicide records stats from 4 differents provinces in 3 different years <br> (https://www.ine.es/jaxiT3/dlgExport.htm?t=9936) </div>`);
 
});


var path=require("path");

// Dirname obtiene la carpeta donde se ejecuto npm start (C:\\....). Path permite concatenar directorios con join, para tener un metodo estandar en windows y linux.
// Use hace que cuando se llame a lo que sea que esté dentro de /, lo busque en la carpeta public...
app.use("/",express.static(path.join(__dirname + "/public")));  