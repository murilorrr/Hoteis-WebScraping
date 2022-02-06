const puppeteer = require('puppeteer');
const readline = require('readline-sync');

// Login Function Logic
(async function main() {
  try {
    // Configures puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navigates to Whatsapp
    await page.goto("https://web.whatsapp.com/");

    // //Searches person by title
    await page.waitForSelector("header._1G3Wr");
    await page.waitForTimeout(5000);

    //Change to contact you want to send messages to
    const contactName = readline.question('Qual o contanto? ');
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector(".y8WcF");

    //Finds the message bar and focuses on it
    const editor = await page.$("div[tabindex='-1']");
    await editor.focus();

    //Amount of messages you want to send
    const amountOfMessages = readline.question('Qual a quantidade de mensagens? 1 default ') || 1;

    //Loops through cycle of sending message
    const message = readline.question('Qual a mensagem que deve ser enviada?: ');
    for (var i = 0; i < amountOfMessages; i++) {
      await page.type("div[title='Digite uma mensagem']", message, {delay: 30});
      
      await page.click("span[data-testid='send']");
      await page.waitForTimeout(100);
    }
    await browser.close();
  } catch (e) {
    console.error("error mine", e);
  }
})();
