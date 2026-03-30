import puppeteer from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import { writeFileSync } from 'fs';

const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 800;

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });

await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

// Full page screenshot at each scroll position to diagnose
for (const y of [0, 900, 1600, 2400]) {
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
  await new Promise(r => setTimeout(r, 500));
  const buf = await page.screenshot({ type: 'png' });
  writeFileSync(`C:\\Users\\sistem\\Desktop\\full-${y}.png`, buf);
  console.log(`Saved full-${y}.png`);
}

await browser.close();
console.log('Done.');
