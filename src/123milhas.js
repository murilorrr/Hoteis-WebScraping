const puppeteer = require('puppeteer');
const readline = require('readline-sync');

(async function main() {
  try {
    // Configurações puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navega para 123milhas
    await page.goto("https://123milhas.com/");

    await page.waitForTimeout(1000);

    // Setando as Perguntas

    // const numeroDePassageiros = readline.question('Qual o numero de passageiros Adultos? ');

    // setando os inputs da pagina
    const fromCity = readline.question('De onde você está saindo? ');
    const fromInput = await page.$('input[placeholder="Busque por aeroporto"]');
    await fromInput.type(fromCity, {delay: 100});
    await page.keyboard.press('Enter');

    const toCity= readline.question('Para onde você vai? ');
    const toInput = await page.$$('input[placeholder="Busque por aeroporto"]');
    await toInput[1].type(toCity, {delay: 200});
    await page.keyboard.press('Enter', {delay: 100});
    
    const somenteIda= readline.question('Somente ida? sim ou nao ');
    const idaInput = await page.$$('div[role="group"] button');
    if(somenteIda === 'sim') {
      await idaInput[1].click({delay: 200});
    } else {
      await idaInput[0].click({delay: 200});
    }

    if(somenteIda === 'sim') {
      const diaViagemIda = readline.question('Qual o dia da Sua viagem? DD/MM/AA ');
      const diaIdaInput = await page.$('[id="datepicker-ida"]');

      await diaIdaInput.type(diaViagemIda);
    } else {
      const diaViagemIda = readline.question('Qual o dia da Sua viagem? DD/MM/AA ');
      const diaViagemVolta = readline.question('Qual o dia da Sua viagem? DD/MM/AA ');
      const diaIdaInput = await page.$('[id="datepicker-ida"]');
      const diaVoltaInput = await page.$('[id="datepicker-volta"]');

      await diaIdaInput.type(diaViagemIda);
      await diaVoltaInput.type(diaViagemVolta);
    }
    
    // const toInput = await page.$$('input[placeholder="Busque por aeroporto"]')[1];
    // toInput.type(toCity);
    // const toInput = await page.$$('div[role="group"] button');

    // document.querySelectorAll('button span.MuiButton-label');
    // await page.waitForSelector("span.MuiButton-label")[0];
    // const IdaEVolta = await page.$("button span.MuiButton-label");
    // console.log(IdaEVolta);
    // const SomenteIda = await page.waitForSelector("span.MuiButton-label")[1];
    // await page.click("span.MuiButton-label");

    // const result = await page.evaluate(() => {
    //   const nodelist = document.querySelectorAll('button span.MuiButton-label');
    //   const arrayNode = [...nodelist]fromCity
    // const botaoFromCity = document.getElementsByTagName('input')[1];
    // const botaoToCity = document.getElementsByTagName('input')[3];

    // Clicar os respectivos elementos
      
      // await editor.focus();
      // await botaoFromCity.type(fromCity);
      // await botaoToCity.type(toCity);

    // const editor = await page.$("div[tabindex='-1']");
    // await editor.focus();
    // await page.type("div[title='Digite uma mensagem']", message, {delay: 30});


      ////////////////////////////////////////////////////////////////
      // const botaoSubmit = page.$('button[type="submit"]');
      // await botaoSubmit.click()
      ////////////////////////////////////////////////////////////////


    // esperar as respostas

    // await page.evaluate(() => {
    //   const botaoAdicionaAdulto = document.getElementsByClassName('jyrmBK')[1];
    //   const botaoConfirmaPassageiros = document.getElementsByClassName('iSAFWr')[0];

      

    //   const dataIda = document.getElementsByClassName('DateInput_input_1')[0];
    //   const dataVolta = document.getElementsByClassName('DateInput_input_1')[1];

    //   console.log(botaoFromCity, botaoToCity);

      


    //   // const viagens = document.querySelectorAll('article img');
    // })




    // guardar as respostas em uma tabela no servidor




    // servir as respostas no front ou em algum console.list

    // await page.waitForSelector("header._1G3Wr");
    // await page.waitForTimeout(5000);

    //Change to contact you want to send messages to
    //Algumas perguntas//
    // const contactName = readline.question('Qual o contanto? ');
    // const contactName = readline.question('Qual o contanto? ');
    // await page.click(`button[text='${onlyVai !== null ? 'somente ida': 'Ida e Volta'}']`);
    // await page.click(`input[placeholder=Busque por aeroporto'${fromCity}`);
    // await page.click(`input[placeholder=Busque por aeroporto'${toCity}`);
    // await page.waitForSelector(".y8WcF");

    //Finds the message bar and focuses on it
    // const editor = await page.$("div[tabindex='-1']");
    // await editor.focus();

    //Amount of messages you want to send
    // const amountOfMessages = readline.question('Qual a quantidade de mensagens? 1 default ') || 1;

    //Loops through cycle of sending message
    // const message = readline.question('Qual a mensagem que deve ser enviada?: ');
    // for (var i = 0; i < amountOfMessages; i++) {
    //   await page.type("div[title='Digite uma mensagem']", message, {delay: 30});
      
    //   await page.click("span[data-testid='send']");
    //   await page.waitForTimeout(100);
    // }
    // await browser.close();
  } catch (e) {
    console.error("error mine", e);
  }
})();

// const puppeteer = require('puppeteer');
// const readline = require('readline-sync');

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   const url = `https://web.whatsapp.com/`;
//   await page.goto(url);
//   await page.waitForTimeout(2000);

//   console.log('Awaiting/Checking peering with WhatsApp phone');

//   await page.waitForSelector('#side', { timeout: 60000 }).then(() => { // Scan the QR code within the next minute.
//       console.log('Connected !');
//   }).catch((res) => {
//       console.log('Not connected !', res);
//       return -1;
//   });

//   await page.waitForTimeout(2000);
//   await page.screenshot({path:'print.jpg'})
//   const allPage = [];

//   try {
//     await page.evaluate(() =>{
//       allPage = document.getElementsByClassName('_3m_Xw');
//     });5000
//   } catch (err) {
//     console.log(err);
//   }
  
//   const ContactList = {}
//   allPage.map((elem, index) => {
//     return ContactList[index] = elem.children[0].children[0].children[1].children[0].children[0].children[0].title
//   });
//   const string = Object.values(ContactList);
//   console.log(string);
//   const questionCLI = await readline.question(`Para qual destes contatos voce deseja enviar uma msg? ${ContactList}`);
  
//   // await browser.close();
// })();