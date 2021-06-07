const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1200 });

    await page.goto("http://sos2021-27.herokuapp.com/");
    console.log("Landing page opened");
    await page.screenshot({ path: './tests/screenshots/01_inicio.png' });

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

//=====================Fer - Integración - Gastos en educación (G04)

await page.click("body > main > main > div:nth-child(6) > div > div > a:nth-child(1)");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/fer-integracion-gastoseducacion.png' });

//=====================Fer - Integración - Índice calidad de vida (G01)

await page.click("body > main > main > div:nth-child(6) > div > div > a:nth-child(2)");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/fer-integracion-calidadvida.png' });

//=====================Fer - Uso - Estadísticas de superhéroes (externa)

await page.click("body > main > main > div:nth-child(6) > div > div > a:nth-child(3)");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/fer-uso-estadisticassuperheroes.png' });

//=====================Fer - Uso - Discografía de Daft Punk (externa)

await page.click("body > main > main > div:nth-child(6) > div > div > a:nth-child(4)");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/fer-uso-discografiadaftpunk.png' });

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

    //  ------------------ Espacio Prueba Front Suicidios -----------------------------

    // Tabla Suicidios


    console.log("Abriendo Tabla Suicidios");
    await Promise.all([
        page.waitForNavigation(),
        page.click("body > nav > ul > li:nth-child(1) > a"),
    ]);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: './tests/screenshots/suic01-TablaSuicidios.png' });


    console.log("Limpieza de Datos");
    await page.click("body > main > main > main > tr > td:nth-child(2) > button");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './tests/screenshots/suic02-BorradoTabla.png' });


    console.log("Generación de Datos");
    await page.click("body > main > main > main > tr > td:nth-child(1) > button");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './tests/screenshots/suic03-Generacion.png' });


    console.log("Segunda Página");
    await page.click("body > main > main > main > div:nth-child(7) > td:nth-child(2) > nav > ul > li:nth-child(3) > a");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './tests/screenshots/suic04-Pagina2.png' });

    console.log("Insertar Dato");
    await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(1) > input');
    await page.keyboard.type("Murcia");

    await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(2) > input');
    await page.keyboard.type("2001");

    await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(3) > input');
    await page.keyboard.type("50");

    await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(4) > input');
    await page.keyboard.type("25");

    await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(5) > input');
    await page.keyboard.type("75");

    await page.focus('body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(6) > input');
    await page.keyboard.type("2");




    console.log("Introducción Nuevos Parámetros");
    await page.click("body > main > main > main > div:nth-child(7) > td:nth-child(2) > nav > ul > li:nth-child(3) > a");
    await page.screenshot({ path: './tests/screenshots/suic05-NuevosParametros.png' });

    await page.waitForTimeout(2000);


    console.log("Insercción del dato creado");
    await page.click("body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(7) > button");



    page.on('dialog', async dialog => {
        console.log('here');
        await dialog.accept();
    });

    await page.click('body > main > main > main > div:nth-child(7) > td:nth-child(2) > nav > ul > li:nth-child(2) > a');

    
    console.log("Comprobación del dato insertado.")
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './tests/screenshots/suic06-DatoComprobado.png' });



    
    console.log("Comprobación borrado dato");
    await page.click("body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(7) > button");
    await page.waitForTimeout(2000);

    
    page.on('dialog', async dialog => {
        console.log('here');
        await dialog.accept();
    });

    await page.click('body > main > main > main > div:nth-child(7) > td:nth-child(2) > nav > ul > li:nth-child(3) > a > span:nth-child(1)');


    await page.click('body > main > main > main > div:nth-child(7) > td:nth-child(2) > nav > ul > li.active.page-item > a');

    await page.screenshot({ path: './tests/screenshots/suic07-PrimerDatoBorrado.png' });

    console.log("Comprobación borrado dato");
    await page.click("body > main > main > main > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > a");
    await page.screenshot({ path: './tests/screenshots/suic08-VistaModificación.png' });
    await page.waitForTimeout(2000);

    console.log("ComprobacionModificacion");
    await page.click("body > main > main > table > tbody > tr > td:nth-child(7) > button");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: './tests/screenshots/suic09-DatoModificado.png' });
    await page.waitForTimeout(2000);


    
    await page.click("body > main > main > button");

    await page.click("body > nav > ul > li:nth-child(4) > a");



    console.log("Ejemplo Uso");
    await page.click("body > main > main > div:nth-child(3) > div > div > a:nth-child(3)");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './tests/screenshots/suic10-EjemploUso.png' });
    await page.waitForTimeout(2000);


    await page.click("body > nav > ul > li:nth-child(4) > a");

    console.log("Ejemplo Integración");
    await page.click("body > main > main > div:nth-child(3) > div > div > a:nth-child(4)");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './tests/screenshots/suic11-EjemploIntegración.png' });
    await page.waitForTimeout(2000);
    

    // ------------------- Fin Espacio PruebaSuicidios    ------------------------


    //  ------------------ Espacio Prueba Front Promoción Social -----------------------------

    // Tabla Promoción Social


    console.log("Abriendo Tabla Promoción Social");
    await Promise.all([
        page.waitForNavigation(),
        page.click("body > nav > ul > li:nth-child(2) > a"),
    ]);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: './tests/screenshots/budget01-TablaPromocionSocial.png' });


    console.log("Borrar Tabla");
    await page.click("body > main > main > main > div:nth-child(2) > td:nth-child(2) > button");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './tests/screenshots/budget02-BorrarTabla.png' });


    console.log("Cargar Tabla");
    await page.click("body > main > main > main > div:nth-child(2) > td:nth-child(1) > button");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './tests/screenshots/budget03-CargarTabla.png' });


    console.log("Paginación");
    await page.click("body > main > main > main > div:nth-child(8) > td:nth-child(1) > nav > ul > li:nth-child(3) > a > span:nth-child(1)");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './tests/screenshots/budget04-Paginacion.png' });

    console.log("Guardar dato");
    await page.focus('body > main > main > main > table.table.table-bordered.table-hover > tbody > tr > td:nth-child(1) > input');
    await page.keyboard.type("CADIZ");

    await page.focus('body > main > main > main > table.table.table-bordered.table-hover > tbody > tr > td:nth-child(2) > input');
    await page.keyboard.type("2020");

    await page.focus('body > main > main > main > table.table.table-bordered.table-hover > tbody > tr > td:nth-child(3) > input');
    await page.keyboard.type("200");

    await page.focus('body > main > main > main > table.table.table-bordered.table-hover > tbody > tr > td:nth-child(4) > input');
    await page.keyboard.type("50");

    console.log("Guardar");
    await page.click("body > main > main > main > table.table.table-bordered.table-hover > tbody > tr:nth-child(1) > td:nth-child(7) > button");
    await page.screenshot({ path: './tests/screenshots/budget05-Guardado.png' });

    await page.waitForTimeout(2000);
    

    page.on('dialog', async dialog => {
        console.log('here');
        await dialog.accept();
    });

    await page.click('body > nav > ul > li:nth-child(2) > a');

    
    console.log("Comprobación guardado.")
    await page.waitForTimeout(2000);
    await page.screenshot({ path: './tests/screenshots/budget06-ComprobacionGuardado.png' });



    
    console.log("Comprobación borrado");
    await page.click("body > main > main > main > table.table.table-bordered.table-hover > tbody > tr:nth-child(2) > td:nth-child(8) > button");
    await page.waitForTimeout(2000);

    
    page.on('dialog', async dialog => {
        console.log('here');
        await dialog.accept();
    });


    await page.screenshot({ path: './tests/screenshots/budget07-ComprobacionBorrado.png' });

    console.log("Editar");
    await page.click("body > main > main > main > table.table.table-bordered.table-hover > tbody > tr:nth-child(2) > td:nth-child(7) > a");
    await page.screenshot({ path: './tests/screenshots/budget08-Editar.png' });
    await page.waitForTimeout(2000);

    console.log("Comprobación editar");
    await page.click("body > main > main > table > tbody > tr > td:nth-child(7) > button");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: './tests/screenshots/budget09-ComprobacionEditar.png' });
    await page.waitForTimeout(2000);

    // ------------------- Fin Espacio Prueba Promoción Social    ------------------------




    //Cerrar
    await page.close();
    await browser.close();
    console.log("Closing browser")


})();




