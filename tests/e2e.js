const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1500, height: 1200 });

//Landing page
//await page.goto('http://localhost:10000/');
await page.goto("http://sos2021-27.herokuapp.com/");
console.log("Landing page opened");
await page.screenshot({ path: './tests/01_inicio.png' });


console.log("Closing browser")
})();