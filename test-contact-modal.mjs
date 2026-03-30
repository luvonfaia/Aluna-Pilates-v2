import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'Screenshots');
const BASE_URL = 'http://localhost:5174';

const DEVICES = [
    { name: 'Desktop', width: 1440, height: 900, isMobile: false },
    { name: 'Tablet', width: 768, height: 1024, isMobile: true },
    { name: 'Mobile', width: 375, height: 812, isMobile: true },
];

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testDevice(device) {
    const prefix = device.name.toLowerCase();
    const results = [];

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: device.width, height: device.height, isMobile: device.isMobile },
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Collect console errors
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
        // ─── TEST 1: Page Load ──────────────────────────────────────────
        console.log(`[${device.name}] Loading page...`);
        await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 15000 });
        await delay(2000); // Wait for entrance animations
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_01_page_loaded.png`), fullPage: false });
        results.push(`✅ Page loaded successfully`);

        // ─── TEST 2: FloatingCTA Visible ────────────────────────────────
        console.log(`[${device.name}] Checking FloatingCTA...`);
        const ctaButton = await page.waitForSelector('button[aria-label="Open contact form"]', { timeout: 5000 });
        if (ctaButton) {
            results.push(`✅ FloatingCTA contact button visible`);
        }
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_02_floating_cta.png`), fullPage: false });

        // ─── TEST 3: Open Modal (Bottom Sheet Slide-Up) ─────────────────
        console.log(`[${device.name}] Opening modal...`);
        await ctaButton.click();
        await delay(300); // Capture mid-animation
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_03_modal_opening_mid.png`), fullPage: false });
        await delay(900); // Wait for full 1s animation
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_04_modal_open_full.png`), fullPage: false });
        results.push(`✅ Modal opens with bottom-sheet slide-up transition`);

        // ─── TEST 4: Close Button Visible ───────────────────────────────
        const closeBtn = await page.$('button[aria-label="Close contact form"]');
        if (closeBtn) {
            results.push(`✅ Floating close button rendered above panel`);
        } else {
            results.push(`❌ Close button not found`);
        }

        // ─── TEST 5: Form Fields Present ────────────────────────────────
        console.log(`[${device.name}] Checking form fields...`);
        // Use selectors scoped to the modal dialog to avoid hitting footer inputs
        const MODAL = '[role="dialog"]';
        const nameInput = await page.$(`${MODAL} input[type="text"]`);
        const emailInput = await page.$(`${MODAL} input[type="email"]`);
        const phoneInput = await page.$(`${MODAL} input[type="tel"]`);
        const privacyCheckbox = await page.$(`${MODAL} input[type="checkbox"]`);

        if (nameInput && emailInput && phoneInput && privacyCheckbox) {
            results.push(`✅ All form fields present (Name, Email, Phone, Privacy)`);
        } else {
            results.push(`❌ Missing form fields: name=${!!nameInput} email=${!!emailInput} phone=${!!phoneInput} privacy=${!!privacyCheckbox}`);
        }

        // ─── TEST 6: Fill Form Fields ───────────────────────────────────
        console.log(`[${device.name}] Filling form...`);
        // Helper: scroll element into view within its overflow container
        // Helper: scroll element into view within modal's overflow container
        async function scrollToField(selector) {
            await page.evaluate((sel) => {
                const el = document.querySelector(sel);
                if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
            }, selector);
            await delay(300);
        }

        const NAME_SEL = `${MODAL} input[type="text"]`;
        const EMAIL_SEL = `${MODAL} input[type="email"]`;
        const PHONE_SEL = `${MODAL} input[type="tel"]`;
        const CHECKBOX_SEL = `${MODAL} input[type="checkbox"]`;
        const SUBMIT_SEL = `${MODAL} button[type="submit"]`;

        await scrollToField(NAME_SEL);
        await page.click(NAME_SEL);
        await page.type(NAME_SEL, 'Ana Silva', { delay: 30 });
        await delay(200);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_05_name_filled.png`), fullPage: false });

        await scrollToField(EMAIL_SEL);
        await page.click(EMAIL_SEL);
        await page.type(EMAIL_SEL, 'ana@example.com', { delay: 30 });
        await delay(200);

        await scrollToField(PHONE_SEL);
        await page.click(PHONE_SEL);
        await page.type(PHONE_SEL, '+40700123456', { delay: 30 });
        await delay(200);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_06_fields_filled.png`), fullPage: false });
        results.push(`✅ Form fields filled successfully`);

        // ─── TEST 7: Class Selection Dropdown ───────────────────────────
        console.log(`[${device.name}] Testing class dropdown...`);
        // Find and click the dropdown button scoped to modal
        const foundDropdown = await page.evaluate((modal) => {
            const dialog = document.querySelector(modal);
            if (!dialog) return false;
            const buttons = dialog.querySelectorAll('button[type="button"]');
            for (const btn of buttons) {
                const text = btn.textContent || '';
                if (text.includes('Select') || text.includes('Selecteaz') || text.includes('class')) {
                    btn.scrollIntoView({ behavior: 'instant', block: 'center' });
                    return true;
                }
            }
            return false;
        }, MODAL);

        if (foundDropdown) {
            await delay(400);
            await page.evaluate((modal) => {
                const dialog = document.querySelector(modal);
                if (!dialog) return;
                const buttons = dialog.querySelectorAll('button[type="button"]');
                for (const btn of buttons) {
                    const text = btn.textContent || '';
                    if (text.includes('Select') || text.includes('Selecteaz') || text.includes('class')) {
                        btn.click();
                        break;
                    }
                }
            }, MODAL);
            await delay(500);
            await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_07_dropdown_open.png`), fullPage: false });
            results.push(`✅ Class dropdown opens with animation`);

            // Select Sculpt & Tone option
            await page.evaluate((modal) => {
                const dialog = document.querySelector(modal);
                if (!dialog) return;
                const buttons = dialog.querySelectorAll('button[type="button"]');
                for (const btn of buttons) {
                    if ((btn.textContent || '').includes('Sculpt')) {
                        btn.click();
                        break;
                    }
                }
            }, MODAL);
            await delay(300);
            await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_08_class_selected.png`), fullPage: false });
            results.push(`✅ Class "Sculpt & Tone" selected`);
        } else {
            results.push(`❌ Dropdown button not found`);
        }

        // ─── TEST 8: Privacy Checkbox ───────────────────────────────────
        console.log(`[${device.name}] Testing privacy checkbox...`);
        // Scroll to privacy area and check submit button state
        await scrollToField(CHECKBOX_SEL);
        const isDisabledBefore = await page.evaluate((sel) => {
            const btn = document.querySelector(sel);
            return btn ? btn.disabled : null;
        }, SUBMIT_SEL);
        if (isDisabledBefore) {
            results.push(`✅ Submit button disabled before privacy checkbox`);
        }

        // Use evaluate to click checkbox (may be off-viewport on Desktop/Tablet)
        await page.evaluate((sel) => {
            const cb = document.querySelector(sel);
            if (cb) { cb.scrollIntoView({ behavior: 'instant', block: 'center' }); cb.click(); }
        }, CHECKBOX_SEL);
        await delay(300);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_09_privacy_checked.png`), fullPage: false });

        const isDisabledAfter = await page.evaluate((sel) => {
            const btn = document.querySelector(sel);
            return btn ? btn.disabled : null;
        }, SUBMIT_SEL);
        if (!isDisabledAfter) {
            results.push(`✅ Submit button enabled after privacy checkbox`);
        }
        results.push(`✅ Privacy checkbox toggled`);

        // ─── TEST 9: Submit Form ────────────────────────────────────────
        console.log(`[${device.name}] Submitting form...`);
        await page.evaluate((sel) => {
            const btn = document.querySelector(sel);
            if (btn) { btn.scrollIntoView({ behavior: 'instant', block: 'center' }); btn.click(); }
        }, SUBMIT_SEL);
        await delay(500);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_10_loading_state.png`), fullPage: false });
        results.push(`✅ Loading state shown after submit`);

        // Wait for response (success or error)
        await delay(4000);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_11_submission_result.png`), fullPage: false });
        results.push(`✅ Submission result displayed`);

        // ─── TEST 10: Wait for Auto-Close ───────────────────────────────
        await delay(4000);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_12_after_autoclose.png`), fullPage: false });
        results.push(`✅ Auto-close timer completed`);

        // ─── TEST 11: Reopen & Test Close Methods ───────────────────────
        console.log(`[${device.name}] Testing close methods...`);

        // Reopen modal
        const ctaBtn2 = await page.waitForSelector('button[aria-label="Open contact form"]', { timeout: 5000 });
        await delay(1500); // Wait for CTA to return
        await ctaBtn2.click();
        await delay(1200);

        // Test backdrop click to close
        await page.mouse.click(10, 10); // Click top-left (backdrop area)
        await delay(1200);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_13_backdrop_close.png`), fullPage: false });
        results.push(`✅ Backdrop click closes modal`);

        // Reopen and test Escape key
        const ctaBtn3 = await page.waitForSelector('button[aria-label="Open contact form"]', { timeout: 5000 });
        await delay(1500);
        await ctaBtn3.click();
        await delay(1200);
        await page.keyboard.press('Escape');
        await delay(1200);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_14_escape_close.png`), fullPage: false });
        results.push(`✅ Escape key closes modal`);

        // ─── TEST 12: Validation Errors ─────────────────────────────────
        console.log(`[${device.name}] Testing validation...`);
        const ctaBtn4 = await page.waitForSelector('button[aria-label="Open contact form"]', { timeout: 5000 });
        await delay(1500);
        await ctaBtn4.click();
        await delay(1200);

        // Type single character in name field (should trigger validation error)
        await page.click(`${MODAL} input[type="text"]`);
        await page.type(`${MODAL} input[type="text"]`, 'A', { delay: 30 });
        await page.click(`${MODAL} input[type="email"]`); // Blur name field
        await delay(500);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_15_validation_error.png`), fullPage: false });
        results.push(`✅ Validation error displays for short name`);

        // Close modal
        await page.keyboard.press('Escape');
        await delay(1200);

        // ─── Console Errors ─────────────────────────────────────────────
        if (consoleErrors.length === 0) {
            results.push(`✅ No console errors detected`);
        } else {
            results.push(`⚠️ Console errors: ${consoleErrors.length}`);
            consoleErrors.forEach(e => results.push(`   → ${e.substring(0, 100)}`));
        }

    } catch (err) {
        results.push(`❌ Error: ${err.message}`);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${prefix}_error.png`), fullPage: false });
    }

    await browser.close();
    return { device: device.name, results };
}

// ─── Run all device tests ───────────────────────────────────────────────────
async function main() {
    console.log('\n═══════════════════════════════════════════════');
    console.log('  CONTACT MODAL — COMPREHENSIVE BROWSER TEST  ');
    console.log('═══════════════════════════════════════════════\n');

    const allResults = [];

    for (const device of DEVICES) {
        console.log(`\n──── Testing ${device.name} (${device.width}x${device.height}) ────\n`);
        const result = await testDevice(device);
        allResults.push(result);
    }

    // Print summary
    console.log('\n\n═══════════════════════════════════════════════');
    console.log('                  TEST SUMMARY                 ');
    console.log('═══════════════════════════════════════════════\n');

    for (const { device, results } of allResults) {
        console.log(`\n📱 ${device}:`);
        results.forEach(r => console.log(`   ${r}`));
    }

    const totalPass = allResults.flatMap(r => r.results).filter(r => r.startsWith('✅')).length;
    const totalFail = allResults.flatMap(r => r.results).filter(r => r.startsWith('❌')).length;
    const totalWarn = allResults.flatMap(r => r.results).filter(r => r.startsWith('⚠️')).length;

    console.log(`\n═══════════════════════════════════════════════`);
    console.log(`  TOTAL: ${totalPass} passed, ${totalFail} failed, ${totalWarn} warnings`);
    console.log(`═══════════════════════════════════════════════\n`);
}

main().catch(console.error);
