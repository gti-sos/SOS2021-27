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


//Cerrar
await page.close();
await browser.close();
console.log("Closing browser")
})();