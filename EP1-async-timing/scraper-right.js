// THE RIGHT WAY — wait for the data before reading it
// Run with: node scraper-right.js

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('file:///Users/javerianaveed/YT/EP1/Demo/fake-portal.html');

  // --- THE FIX ---
  // We tell Playwright: "Don't move on until you actually SEE a table row."
  // This waits up to 10 seconds. The data arrives at 3 seconds. Perfect.

  console.log('Waiting for comments to load...');
  await page.waitForSelector('table tbody tr', { timeout: 10000 });
  console.log('Comments appeared! Now reading...');

  const comments = await page.$$eval('table tbody tr', rows =>
    rows.map(row => {
      const cells = row.querySelectorAll('td');
      return {
        dept: cells[0]?.textContent.trim(),
        reviewer: cells[1]?.textContent.trim(),
        comment: cells[2]?.textContent.trim(),
        status: cells[3]?.textContent.trim(),
      };
    })
  );

  console.log('\n=== SCRAPER RESULT ===');
  console.log('Comments found:', comments.length);
  console.log(JSON.stringify(comments, null, 2));

  await browser.close();
})();
