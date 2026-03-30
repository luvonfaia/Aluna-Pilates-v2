import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });

// Screenshot 1: homepage top 200px
const page1 = await browser.newPage();
await page1.setViewport({ width: 1280, height: 800 });
await page1.goto('http://localhost:5174', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2000));
await page1.screenshot({
  path: 'C:/Users/sistem/Desktop/screenshot-logo-svg.png',
  clip: { x: 0, y: 0, width: 1280, height: 200 }
});
console.log('Screenshot 1 saved: screenshot-logo-svg.png');

// Screenshot 2: /about top 200px
const page2 = await browser.newPage();
await page2.setViewport({ width: 1280, height: 800 });
await page2.goto('http://localhost:5174/about', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2000));
await page2.screenshot({
  path: 'C:/Users/sistem/Desktop/screenshot-logo-svg-about.png',
  clip: { x: 0, y: 0, width: 1280, height: 200 }
});
console.log('Screenshot 2 saved: screenshot-logo-svg-about.png');

await browser.close();
console.log('Done.');
