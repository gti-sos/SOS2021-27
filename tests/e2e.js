const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1500, height: 1200 });

//Landing page
//await page.goto('http://localhost:10000/');
await page.goto("http://sos2021-27.herokuapp.com/");
console.log("Landing page opened");
await page.screenshot({ path: './tests/screenshots/01_landing.png' });

//Info

await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(6) > a"),
]);

console.log("Clicked on Info");
await page.screenshot({ path: './tests/screenshots/02_info.png' });

//===================================Analytics========================



//==========================Integrations==================================
console.log("Clicked on integrations");
await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(4) > a"),
]);
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/04_integrations.png' });

//=====================Chuck norris 
console.log("Use of chuck norris app");
await page.click("body > main > main > div:nth-child(9) > div > div > a:nth-child(7)");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/05_use_azar1.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(4) > a");

//=====================Unemployment
console.log("Integration of unemployment");
await page.click("body > main > main > div:nth-child(9) > div > div > a:nth-child(4)");
await page.waitForTimeout(5000);

await page.screenshot({ path: './tests/screenshots/06integracion.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(4) > a");

//=====================Tabla azar
await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(3) > a"),
]);

console.log("Clicked on Actividad en loteria");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/07cargatabla.png' });


//pagina2
console.log("Pagination, page 2")
await page.click("body > main > main > main > div:nth-child(7) > td:nth-child(2) > nav > ul > li:nth-child(3) > a");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/08pagina2.png' });

//buscar  datos con error
console.log("inserting  data");
await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(1) > input');
await page.keyboard.type("Galicia");

await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(2) > input');
await page.keyboard.type("2018");

await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(3) > input');
await page.keyboard.type("1");

await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(4) > input');
await page.keyboard.type("1");

await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(5) > input');
await page.keyboard.type("2");

await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(6) > input');
await page.keyboard.type("2");

await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/09datosainsertar.png' });

await page.click("body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(7) > button"),
await page.waitForTimeout(1000);
console.log("insertado");
await page.screenshot({ path: './tests/screenshots/10inserta.png' });

//busca dato bien
console.log("searching  data");
await page.focus('body > main > main > main > table:nth-child(2) > tbody > tr > td:nth-child(1) > input');
await page.keyboard.type("Galicia");

await page.click("body > main > main > main > table:nth-child(2) > tbody > tr > button"),
await page.waitForTimeout(1000);
console.log("busqueda galicia");
await page.screenshot({ path: './tests/screenshots/11busqueda.png' });
//elimina tabla
await page.click("body > main > main > main > tr > td:nth-child(2) > button"),
await page.waitForTimeout(1000);
console.log("tabla eliminada");
await page.screenshot({ path: './tests/screenshots/12elimina.png' });
//Cerrar
await page.close();
await browser.close();
console.log("Closing browser")
})();




//  ------------------ Espacio Prueba Front Suicidios -----------------------------





// ------------------- Fin Espacio PruebaSuicidios    ------------------------