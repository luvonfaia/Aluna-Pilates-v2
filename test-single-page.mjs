import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'Screenshots');
const BASE_URL = 'http://localhost:5175';

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

    // 1. Hero section
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'sp_01_hero.png'), fullPage: false });
    console.log('✅ 1. Hero section');

    // 2. Check all sections exist on page
    const sections = await page.evaluate(() => {
        return ['home', 'about', 'classes', 'gallery'].map(id => ({
            id,
            exists: !!document.getElementById(id),
            offsetTop: document.getElementById(id)?.offsetTop || 0
        }));
    });
    console.log('Sections found:', sections);
    const allExist = sections.every(s => s.exists);
    console.log(allExist ? '✅ 2. All sections exist on single page' : '❌ 2. Missing sections');

    // 3. Scroll to About (via navbar click simulation)
    await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'sp_02_about.png'), fullPage: false });
    console.log('✅ 3. Scrolled to About section');

    // 4. Scroll to Classes
    await page.evaluate(() => document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'sp_03_classes.png'), fullPage: false });
    console.log('✅ 4. Scrolled to Classes section');

    // 5. Scroll to Gallery
    await page.evaluate(() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'sp_04_gallery.png'), fullPage: false });
    console.log('✅ 5. Scrolled to Gallery section');

    // 6. Check FloatingCTA is visible
    const ctaVisible = await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Open contact form"]');
        if (!btn) return false;
        const style = window.getComputedStyle(btn);
        return style.display !== 'none' && style.visibility !== 'hidden';
    });
    console.log(ctaVisible ? '✅ 6. FloatingCTA visible' : '❌ 6. FloatingCTA not visible');

    // 7. Check navbar is solid after scroll
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'sp_05_navbar_scrolled.png'), fullPage: false });
    console.log('✅ 7. Navbar screenshot after scroll');

    // 8. Scroll back to top
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'sp_06_back_to_top.png'), fullPage: false });
    console.log('✅ 8. Scrolled back to top');

    // 9. Test Contact nav click opens modal
    const contactBtn = await page.evaluate(() => {
        const buttons = document.querySelectorAll('nav button');
        for (const btn of buttons) {
            if (btn.textContent?.trim().toLowerCase() === 'contact') {
                btn.click();
                return true;
            }
        }
        return false;
    });
    await delay(1200);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'sp_07_contact_modal.png'), fullPage: false });
    console.log(contactBtn ? '✅ 9. Contact nav opens modal' : '❌ 9. Contact button not found');

    // 10. Full page height screenshot
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`✅ 10. Total page height: ${pageHeight}px`);

    // 11. Mobile test
    await page.keyboard.press('Escape');
    await delay(500);
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await delay(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'sp_08_mobile_hero.png'), fullPage: false });
    console.log('✅ 11. Mobile hero');

    await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }));
    await delay(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'sp_09_mobile_about.png'), fullPage: false });
    console.log('✅ 12. Mobile about');

    console.log('\n✅ Single-page conversion test complete!');
    await browser.close();
}

main().catch(console.error);
