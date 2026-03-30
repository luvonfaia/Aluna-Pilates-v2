import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'Screenshots');
const BASE_URL = 'http://localhost:5174';

async function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1440, height: 900 },
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    
    await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 15000 });
    await delay(2500);
    
    // Screenshot 1: CTA on hero (dark background)
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'cta_glass_01_hero_dark.png'), fullPage: false });
    console.log('✅ Screenshot 1: CTA on dark hero');
    
    // Scroll down gradually and take screenshots at different sections
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'smooth' }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'cta_glass_02_scroll_mid.png'), fullPage: false });
    console.log('✅ Screenshot 2: CTA mid-scroll');
    
    // Scroll to light section
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'smooth' }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'cta_glass_03_light_section.png'), fullPage: false });
    console.log('✅ Screenshot 3: CTA on light section');
    
    // Scroll further
    await page.evaluate(() => window.scrollTo({ top: 2400, behavior: 'smooth' }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'cta_glass_04_mid_page.png'), fullPage: false });
    console.log('✅ Screenshot 4: CTA mid-page');
    
    // Scroll to footer area (dark)
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight - 900, behavior: 'smooth' }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'cta_glass_05_footer_dark.png'), fullPage: false });
    console.log('✅ Screenshot 5: CTA near footer (dark)');
    
    // Also test mobile
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'cta_glass_06_mobile_hero.png'), fullPage: false });
    console.log('✅ Screenshot 6: Mobile CTA on hero');
    
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'smooth' }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'cta_glass_07_mobile_light.png'), fullPage: false });
    console.log('✅ Screenshot 7: Mobile CTA on light section');
    
    console.log('\n✅ All CTA glass effect screenshots taken!');
    await browser.close();
}

main().catch(console.error);
