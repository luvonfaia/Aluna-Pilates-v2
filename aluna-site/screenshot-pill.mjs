import puppeteer from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import { writeFileSync } from 'fs';

const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 800;
const CROP_HEIGHT = 100;

async function cropBottom(page, outputPath) {
  const buf = await page.screenshot({
    type: 'png',
    clip: {
      x: 0,
      y: VIEWPORT_HEIGHT - CROP_HEIGHT,
      width: VIEWPORT_WIDTH,
      height: CROP_HEIGHT
    }
  });
  writeFileSync(outputPath, buf);
  console.log(`Saved: ${outputPath}`);
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });

console.log('Navigating to http://localhost:5174 ...');
await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

// scroll-0: hero (dark bg)
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 300));
await cropBottom(page, 'C:\\Users\\sistem\\Desktop\\scroll-0.png');

// scroll-900: philosophy (light cream)
await page.evaluate(() => window.scrollTo(0, 900));
await new Promise(r => setTimeout(r, 500));
await cropBottom(page, 'C:\\Users\\sistem\\Desktop\\scroll-900.png');

// scroll-1600: classes (light)
await page.evaluate(() => window.scrollTo(0, 1600));
await new Promise(r => setTimeout(r, 500));
await cropBottom(page, 'C:\\Users\\sistem\\Desktop\\scroll-1600.png');

// scroll-2400: spotlight dark/light split
await page.evaluate(() => window.scrollTo(0, 2400));
await new Promise(r => setTimeout(r, 500));
await cropBottom(page, 'C:\\Users\\sistem\\Desktop\\scroll-2400.png');

await browser.close();
console.log('All done.');
