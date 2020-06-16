const path = require('path');
const express = require('express');
const hbs = require('hbs');
const puppeteer = require('puppeteer');
const app = express();

/*** Define paths for Express config ***/
const publicDirPath = path.join(__dirname, 'public')
const viewsPath = path.join(__dirname, 'templates/views')

/*** Setup handlebars engine ***/
app.set('view engine', 'hbs')
app.set('views', viewsPath)

/*** Setup static directory to serve ***/
app.use(express.static(publicDirPath))

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Weather App'
})
});

app.get('/screenshot', function (req, res) {
  res.send('Screenshot created succussfully ! please verify your root folder');
});

app.post('/screenshot-click', (req, res) => {
  generateScreenshot();
  res.sendStatus(200);
});

app.post('/pdf-click', (req, res) => {
  generatePDF();
  res.sendStatus(200);
});

const generateScreenshot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({
      width: 1920,
      height: 1080
  });
  await page.goto('https://example.com/');
  await page.screenshot({
      path: 'screenshot.png'
  });

  browser.close();
};

const generatePDF = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com/', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'example.pdf', format: 'A4'});

  await browser.close();
};

app.listen(3000, function () {
  console.log('Puppeteer app listening on port 3000!');
});