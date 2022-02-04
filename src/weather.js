const puppeteer = require('puppeteer');
const readline = require('readline-sync');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const cidade = await readline.question('qual nome da cidade desejada: ');
  const url = `https://www.google.com/search?q=weather+${cidade}`;
  await page.goto(url);
  const temperatura = await page.evaluate(() =>{
    return document.getElementById('wob_tm').innerText;
  });
  console.log(`A temperatura da ${cidade} é`,temperatura);

  await browser.close();
})();