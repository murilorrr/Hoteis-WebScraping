const puppeteer = require('puppeteer');

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
    const contactName = "Davi 2. 0";
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector(".y8WcF");

    //Finds the message bar and focuses on it
    const editor = await page.$("div[tabindex='-1']");
    await editor.focus();

    //Amount of messages you want to send
    const amountOfMessages = 500;

    //Loops through cycle of sending message
    for (var i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "Are you mad at me? :( ";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']");
      await page.waitForTimeout(500);
    }
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