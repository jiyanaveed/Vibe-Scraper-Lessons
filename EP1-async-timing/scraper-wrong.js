// THE WRONG WAY — this is what beginners do
// Run with: node scraper-wrong.js

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Open the permit portal
  await page.goto('file:///Users/javerianaveed/YT/EP1/Demo/fake-portal.html');

  // --- THE MISTAKE ---
  // We just arrived at the page. We assume the data is there. It's not.
  // The comments and attachments load AFTER 3-5 seconds via JavaScript.
  // But we're already trying to read them right now.

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

  console.log('=== SCRAPER RESULT ===');
  console.log('Comments found:', comments.length);
  console.log(JSON.stringify(comments, null, 2));

  await browser.close();
})();
