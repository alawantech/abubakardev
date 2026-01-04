const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
  });
  const page = await context.newPage();
  const routes = ['/pricing','/portfolio','/contact','/services'];
  const base = 'http://localhost:5174';
  const outDir = 'build/screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const route of routes) {
    const url = base + route;
    console.log('Visiting', url);
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      const fileName = route.replace(/\//g, '_') || 'index';
      const outPath = `${outDir}/${fileName}.png`;
      await page.screenshot({ path: outPath, fullPage: true });
      console.log('Saved', outPath);
    } catch (err) {
      console.error('Failed to capture', url, err.message);
    }
  }

  await browser.close();
  console.log('Screenshots complete.');
})();
