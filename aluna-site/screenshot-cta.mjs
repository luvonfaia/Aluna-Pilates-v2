import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 768 });

  console.log('Navigating to http://localhost:5174...');
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0', timeout: 30000 });

  console.log('Waiting 3 seconds for animations...');
  await new Promise(r => setTimeout(r, 3000));

  // Crop from y=460 to y=768
  const croppedScreenshot = await page.screenshot({
    clip: {
      x: 0,
      y: 460,
      width: 1280,
      height: 308
    }
  });

  const outputPath = 'C:/Users/sistem/Desktop/cta-aligned.png';
  fs.writeFileSync(outputPath, croppedScreenshot);
  console.log(`Screenshot saved to ${outputPath}`);

  // DOM analysis
  const analysis = await page.evaluate(() => {
    const results = {};

    // Look for WhatsApp text near y=460-768
    const allElements = document.querySelectorAll('*');
    const whatsappElements = [];
    for (const el of allElements) {
      if (el.children.length === 0 && el.textContent.includes('WhatsApp')) {
        const rect = el.getBoundingClientRect();
        whatsappElements.push({
          tag: el.tagName,
          text: el.textContent.trim(),
          visible: el.offsetWidth > 0 && el.offsetHeight > 0,
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
        });
      }
    }
    results.whatsappElements = whatsappElements;

    // Look for dividers and pill structures
    const pillCandidates = [];
    for (const el of allElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top >= 400 && rect.top <= 800 && rect.width > 80 && rect.height > 20 && rect.height < 150) {
        const style = window.getComputedStyle(el);
        const br = parseInt(style.borderRadius) || 0;
        if (br > 10) {
          pillCandidates.push({
            tag: el.tagName,
            class: el.className.substring(0, 80),
            id: el.id,
            rect: { top: Math.round(rect.top), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) },
            borderRadius: style.borderRadius,
            centerX: Math.round(rect.left + rect.width / 2)
          });
        }
      }
    }
    results.pillCandidates = pillCandidates.slice(0, 15);

    // Look for vertical dividers (narrow tall elements)
    const dividers = [];
    for (const el of allElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top >= 400 && rect.top <= 800 && rect.width >= 1 && rect.width <= 4 && rect.height > 15) {
        dividers.push({
          tag: el.tagName,
          class: el.className.substring(0, 80),
          rect: { top: Math.round(rect.top), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) },
          centerX: Math.round(rect.left + rect.width / 2)
        });
      }
    }
    results.dividers = dividers.slice(0, 10);

    return results;
  });

  console.log('\n=== DOM Analysis ===');
  console.log('WhatsApp elements:', JSON.stringify(analysis.whatsappElements, null, 2));
  console.log('\nPill candidates:', JSON.stringify(analysis.pillCandidates, null, 2));
  console.log('\nVertical dividers:', JSON.stringify(analysis.dividers, null, 2));

  await browser.close();
})();
