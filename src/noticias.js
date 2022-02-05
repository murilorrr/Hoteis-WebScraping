const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch( { headless: true});
  const page = await browser.newPage();
  await page.goto('https://www.cnnbrasil.com.br/');

  const DadosDeImgNoticia = await page.$$eval('li img.home__title__thumb', imgs => {

    const result = {};
    // inicializar os elementosBase de img para o nosso array
    imgs.map((img,i) => {
      result[i] = {};
      result[i]['src'] = img.src;
      return console.log(img.src);
    });
    imgs.map((img, i) => {
      result[i]['title'] = img.title;
      return console.log(img.title);
    });

    return result;
  });

  fs.writeFile('Noticias.json', JSON.stringify(DadosDeImgNoticia, null, 2), ()=> {});

  await browser.close();
})();