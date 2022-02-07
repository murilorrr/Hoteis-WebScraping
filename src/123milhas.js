const puppeteer = require('puppeteer');
const readline = require('readline-sync');
const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 3000;

const recuperaDadosDinamicosNa123Milhas = async() => {
  try {
    // Configurações puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navega para 123milhas
    // linkExemploViagem = https://123milhas.com/v2/busca?de=CNF&para=MCZ&adultos=2&criancas=0&bebes=0&ida=10-10-2022&classe=3
    await page.goto("https://123milhas.com");
    
    // espera um tempinho após ir para a página escolhida
    await page.waitForTimeout(1000);

    // setando os inputs da pagina
    // input From
    const fromCity = readline.question('De onde você está saindo? ') || 'belo horizonte';
    const fromInput = await page.$('input[placeholder="Busque por aeroporto"]');
    await fromInput.type(fromCity, {delay: 100});
    await page.keyboard.press('Enter');

    // input To
    const toCity= readline.question('Para onde você vai? ') || 'maceio';
    const toInput = await page.$$('input[placeholder="Busque por aeroporto"]');
    await toInput[1].type(toCity, {delay: 300});
    await page.keyboard.press('Enter', {delay: 200});
    
    // input one way
    const oneWay= readline.question('Somente ida? sim ou nao ') || 'sim';
    const oneWayInput = await page.$$('div[role="group"] button');
    if(oneWay === 'sim') {
      await oneWayInput[1].click({delay: 200});
    } else {
      await oneWayInput[0].click({delay: 200});
    }

    // input dia da viagem
    if(oneWay === 'sim') {
      const diaViagemIda = readline.question('Qual o dia da Sua viagem? DD/MM/AAAA ')  || '10/10/2022';
      const diaIdaInput = await page.$('[id="datepicker-flights"]');

      await diaIdaInput.type(diaViagemIda);
    } else {
      const diaViagemIda = readline.question('Qual o dia da Sua viagem? DD/MM/AA ') || '10/10/22';
      const diaViagemVolta = readline.question('Qual o dia da Sua viagem? DD/MM/AA ') || '15/10/22';
      const diaIdaInput = await page.$('[id="datepicker-ida"]');
      const diaVoltaInput = await page.$('[id="datepicker-volta"]');

      await diaIdaInput.type(diaViagemIda);
      await diaVoltaInput.type(diaViagemVolta);
    }

    // input Numero de passageiros
    const numeroDePassageiros = readline.question('Qual o numero de passageiros Adultos? ') || '2';
    const numeroDePassageirosInput = await page.$('[value="1 Passageiro"]');
    await numeroDePassageirosInput.click();
    
    const adicionaAdulto = await page.$('i[color="forest"]');
    for (let referencia = 1; referencia < Number(numeroDePassageiros); referencia++) {
      await adicionaAdulto.click({delay: 30})
    }

    page.waitForTimeout(1000);

    // submição do form
    const botaoSubmit = await page.$('button[type="submit"]');
    await botaoSubmit.click()

    // Redirecionamento
    console.log('começa o timeout');

    // espera até as divs que contem o preço da viagem retornarem na página
    await page.waitForSelector(".theme-text--value-1");
    // await page.waitForSelector(".flight-time__arrow");

    // espera um pouco para nao ter erros de internet
    await page.waitForTimeout(1000);

    console.log('começa a buscar dados');


    const jsonCardDatas = await page.$$eval('.hotel-list-card__holder', Cards => {
      // inicializar os elementosBase de hotel para o nosso array
      const reference = Cards.length;
      const cardData = [];
      for (let index = 0; index < reference; index++) {
        cardData[index] = {};
      };

      // busca pelo preco de cada cardHotel
      const precos = Cards.map((Card, i) => {
        if (i<reference) cardData[i]['preço'] = Card.querySelector('.theme-text--value-1').innerText;
      });

      // busca pelo nome de cada cardHotel
      const nomes = Cards.map((Card, i) => {
        if (i<reference) cardData[i]['nome'] = Card.querySelector('h4').innerText;
      });

      // busca pelo endereco de cada cardHotel
      const endereco = Cards.map((Card, i) => {
        if (i<reference) cardData[i]['endereço'] = Card.querySelector('p.theme-text--body-3').innerText;
      });

      // busca pelos commodits de cada cardHotel
      const commodits = Cards.map((Card, i) => {
        // recupera o nóDOM de commodits
        const commoditsSpans = Card.querySelectorAll('li.hotel-commodities-list__named-list-item span');

        // insere o nó num array para que possa ter os metodos de um array
        const arrayMiddle = [...commoditsSpans];
        const arrayCommodits = arrayMiddle.map((commodit) => commodit.innerText);

        if (i<reference) cardData[i]['commodits'] = arrayCommodits;
      });

      // busca pela avaliacão de cada cardHotel
      const avaliacoes = Cards.map((Card, i) => {
        const avaliacaoNo = Card.querySelector('div.customer-grade__box-grade');
        if (avaliacaoNo && i<reference) cardData[i]['avaliação'] = avaliacaoNo.innerText;
      });
      
      return cardData;
    });

    // depois de recuperar os dados eu quero salvar eles em um arquivo no meu projeto
    fs.writeFile('HoteisData.json', JSON.stringify(jsonCardDatas, null, 2), ()=> {});

    await browser.close();
  } catch (e) {
    console.error("error mine", e);
  }
};

app.get('/', (req, res) => {
  const data = require("../HoteisData.json");

  return res.status(200).json(data);
});

app.listen(PORT, async () => {
  await recuperaDadosDinamicosNa123Milhas();
  console.log("listening on port " + PORT)
});
