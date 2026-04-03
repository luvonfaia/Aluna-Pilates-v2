import puppeteer from 'puppeteer';
import path from 'path';

const URL = 'http://localhost:5175';
const SCREENSHOTS_DIR = 'C:/Users/sistem/Desktop/Magda-Pilates Website/Screenshots';

const viewports = [
  { name: 'announcement_hero_mobile', width: 390, height: 844 },
  { name: 'announcement_hero_tablet', width: 768, height: 1024 },
  { name: 'announcement_hero_desktop', width: 1440, height: 900 },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

    console.log(`Navigating to ${URL} at ${vp.width}x${vp.height}...`);
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait 3 seconds for animations
    await new Promise(r => setTimeout(r, 3000));

    const filePath = path.join(SCREENSHOTS_DIR, `${vp.name}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`Saved: ${filePath}`);

    await page.close();
  }

  await browser.close();
  console.log('All screenshots taken.');
})();
