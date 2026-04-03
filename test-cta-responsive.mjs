import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'Screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR);

const BASE_URL = 'http://localhost:5176';
const delay = ms => new Promise(r => setTimeout(r, ms));

const VIEWPORTS = [
    { name: 'xs_320',    width: 320,  height: 680,  isMobile: true },
    { name: 'xs_375',    width: 375,  height: 812,  isMobile: true },
    { name: 'xs_430',    width: 430,  height: 932,  isMobile: true },
    { name: 'sm_640',    width: 640,  height: 900,  isMobile: false },
    { name: 'md_768',    width: 768,  height: 1024, isMobile: false },
    { name: 'lg_1024',   width: 1024, height: 768,  isMobile: false },
    { name: 'xl_1440',   width: 1440, height: 900,  isMobile: false },
];

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox'],
    });

    for (const vp of VIEWPORTS) {
        const page = await browser.newPage();
        await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });
        await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 20000 });
        await delay(2500); // let animations settle

        // Scroll to bottom so CTA appears (page past hero)
        await page.evaluate(() => window.scrollTo({ top: 300 }));
        await delay(800);

        const file = path.join(SCREENSHOTS_DIR, `cta_resp_${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: false });
        console.log(`✅ ${vp.name} (${vp.width}×${vp.height}) — saved`);

        await page.close();
    }

    await browser.close();
    console.log('\nDone. All screenshots in Screenshots/');
}

main().catch(console.error);
