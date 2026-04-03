# Episode 1 — Complete Video Script & Screen Guide
## "Why My Scraper Kept Getting Empty Data"
### Topic: The Async / Timing Problem

---

## BEFORE YOU HIT RECORD — Setup Checklist

Do all of this BEFORE opening OBS.

**Step 1 — Get the demo files on your machine**

Download the 3 files I made for you and put them all in one folder on your Desktop called `scraper-demo`:
- `fake-portal.html`
- `scraper-wrong.js`
- `scraper-right.js`

**Step 2 — Install Node.js (if you don't have it)**

Go to nodejs.org → click the big green "Download" button → install it like any app.

**Step 3 — Install Playwright in your demo folder**

Open Terminal (Mac) or Command Prompt (Windows), then type:
```
cd Desktop/scraper-demo
npm init -y
npm install playwright
npx playwright install chromium
```

Wait for it to finish. This downloads the browser Playwright uses.

**Step 4 — Test that everything works**

In the same terminal, type:
```
node scraper-wrong.js
```
You should see: `Comments found: 0`

Then type:
```
node scraper-right.js
```
You should see: `Comments found: 6` with real data printed.

If both work — you're ready to record.

**Step 5 — Screen setup before recording**

- Open VS Code with the `scraper-demo` folder open (so your two JS files are visible in the sidebar)
- Open `fake-portal.html` in Chrome (just double-click the file)
- Open Terminal, navigate to `cd Desktop/scraper-demo`
- Close all other apps, notifications off, Do Not Disturb on
- Set your browser zoom to 110% so text is readable on video

---

## VIDEO SCRIPT — Minute by Minute

---

### ▶ 0:00–0:35 | THE HOOK
**What's on screen:** The fake portal open in Chrome, showing the two spinners ("Loading review comments..." and "Loading attachments...")

**You say:**

> "I spent three days staring at empty arrays. My scraper was running, it wasn't crashing, no errors — but every single time I ran it, I got zero results. Zero comments, zero attachments, completely empty. And the worst part? When I opened the website in my browser, the data was right there. I could see it. So what was going on?
>
> That was the async timing problem — and once I understood it, I never made this mistake again. Let me show you exactly what was happening."

---

### ▶ 0:35–1:30 | SHOW THE PROBLEM — Live in the browser
**What's on screen:** The fake-portal.html open in Chrome. You watch it load in real time.

**Action:** Refresh the page (Ctrl+R or Cmd+R). Watch the spinners.

**You say:**

> "Look at this permit portal. I just refreshed the page. See these two spinners? 'Loading review comments' and 'Loading attachments.' The data isn't there yet. Watch what happens."

*(Wait 3 seconds — the comments table appears)*

> "There — the comments just loaded. Three seconds after the page opened. And now watch..."

*(Wait 2 more seconds — the attachments appear)*

> "The attachments load a couple seconds after that.
>
> This is how almost every modern government portal works. The page loads first — just the shell, the layout, the header. Then the browser makes separate requests behind the scenes to go fetch the actual data. It's called asynchronous loading. Async for short.
>
> My scraper had no idea this was happening."

---

### ▶ 1:30–2:30 | SHOW THE WRONG CODE
**What's on screen:** Switch to VS Code. Open `scraper-wrong.js`. Zoom in so the code is clearly readable (Ctrl+= a few times).

**You say:**

> "Here's the code I was running. The wrong version.
>
> Line 1 — I open a browser with Playwright. Line 2 — I go to the portal URL. And then... immediately, right after that, I try to read the data."

*(Hover your mouse over the `$$eval` block — the lines that try to read the table)*

> "See this? I'm telling my scraper: go grab every table row you can find. But here's the problem — I just arrived at the page. The data hasn't loaded yet. The spinners are still spinning. There are zero table rows on the page at this moment.
>
> So my scraper does exactly what I told it to — it looks for table rows, finds none, and gives me an empty array. No errors, no warnings. Just... nothing. Because technically it worked. It looked. It just found nothing."

---

### ▶ 2:30–3:15 | RUN THE WRONG SCRAPER
**What's on screen:** Switch to Terminal. Your terminal is already in the scraper-demo folder.

**Action:** Type `node scraper-wrong.js` and press Enter.

**You say:**

> "Let me run it so you can see. I'll run the wrong version first."

*(Wait for it to finish — a second or two)*

> "Look at that. 'Comments found: 0.' Empty array. This is exactly what I was seeing for three days. The scraper ran perfectly. No crash. Just zero results.
>
> And if you're a vibe coder like me, your first instinct is — something is wrong with my selectors. Wrong CSS class. Wrong element. So you go check the page, you inspect the HTML, everything looks fine. The selector is correct. But the data still isn't there because the data wasn't there when the scraper looked."

---

### ▶ 3:15–4:15 | EXPLAIN THE CONCEPT — The Restaurant Analogy
**What's on screen:** Stay on terminal with the empty result visible. No typing — just talking.

**You say:**

> "Here's the way I think about it now.
>
> Imagine you walk into a restaurant. You sit down. The table is empty — no food yet. You immediately look at the table and say 'there's nothing to eat here' and leave.
>
> But you didn't wait for the waiter to bring the food.
>
> That's exactly what my scraper was doing. It arrived at the page — the table was empty — it looked, found nothing, and left. It didn't wait for the data to be delivered.
>
> The fix is obvious once you understand it: you have to tell your scraper to wait. Not for a fixed amount of time — not 'wait 5 seconds and hope for the best' — but wait until you actually see the food arrive. Wait until the data is actually there on the page."

---

### ▶ 4:15–5:15 | SHOW THE RIGHT CODE
**What's on screen:** Switch to VS Code. Open `scraper-right.js`.

**You say:**

> "Here's the fixed version. Everything is the same — same browser, same URL, same selector to read the data. There's only one difference."

*(Hover over the `waitForSelector` line)*

> "This line. `waitForSelector`. I'm telling Playwright: before you do anything else, wait until you can actually see a table row on this page. Don't move on until that element exists in the DOM.
>
> And I give it a timeout — 10 seconds. Meaning: if the data hasn't appeared within 10 seconds, something is genuinely wrong, throw an error and tell me.
>
> That's it. One line. That was the fix for three days of confusion."

*(Point to the two console.log lines)*

> "I also added these log lines so I can see what's happening. 'Waiting for comments to load.' Then when it appears: 'Comments appeared, now reading.' This kind of logging is what tells you your scraper is working correctly versus silently failing."

---

### ▶ 5:15–6:15 | RUN THE RIGHT SCRAPER
**What's on screen:** Switch to Terminal.

**Action:** Type `node scraper-right.js` and press Enter.

**You say:**

> "Now let me run the right version."

*(A few seconds pass — the scraper waits for the data)*

> "Watch the terminal. It's waiting. The data is loading in the background. And..."

*(Output appears)*

> "'Comments appeared! Now reading.' And look — 'Comments found: 6.' Six rows. All the data. Department, reviewer, comment, status — everything.
>
> Same portal. Same selector. One extra line of code. That's the entire difference between three days of empty arrays and a working scraper."

---

### ▶ 6:15–7:00 | THE RULE + REAL WORLD CONTEXT
**What's on screen:** Back to the fake portal in Chrome. Refresh it again so the spinners are visible.

**You say:**

> "Here's the rule I follow now: every single time I arrive at a new page in my scraper, I ask myself — is the data I want here right now, or does it load later?
>
> If I can see spinners, loading text, or the data only appears after I click something — that's async. I need waitForSelector before I try to read anything.
>
> In the real government portals I work with, this is everywhere. Review comments, attachment lists, project files — almost nothing loads instantly. Some sections load after 3 seconds. Some load after the page makes 4 or 5 background requests. Some only appear after you click a tab.
>
> Every one of those needs a wait. And every time I forgot that, I got empty data."

---

### ▶ 7:00–7:45 | WRAP UP
**What's on screen:** Back to VS Code showing the one `waitForSelector` line highlighted.

**You say:**

> "So to recap. Modern websites load their data asynchronously — the page arrives first, the data arrives later. If your scraper tries to read the data before it arrives, you get empty results. No errors, no crash — just nothing.
>
> The fix is `waitForSelector`. Tell Playwright to wait until the element actually exists on the page before you try to read it. Give it a timeout so you know if something genuinely went wrong.
>
> One line. That's it.
>
> This is literally mistake number one that every scraper beginner makes — including me. And now you know why it happens and exactly how to fix it.
>
> Next video I'll show you the iframe problem — which is the second thing that broke me, and it's a completely different kind of invisible failure. See you there."

---

## EDITING NOTES (for CapCut)

1. Trim the first 2–3 seconds before you start talking (awkward silence)
2. Trim the last 2–3 seconds after you stop talking
3. When the terminal is running and you're waiting silently — speed that section up to 1.5x
4. Add a simple text overlay at 0:00 that says: **"Why your scraper returns empty data"**
5. Add a text overlay at the moment you show `waitForSelector`: **"This one line was the fix"**
6. That's it — no music, no fancy edits needed

---

## VIDEO TITLE OPTIONS

- "Why your scraper returns empty data (and you have no idea why)"
- "I got zero results for 3 days — here's why"
- "The #1 beginner scraping mistake: async timing"

## DESCRIPTION (copy-paste)

```
If your web scraper is running without errors but returning empty data — this is probably why.

Modern websites load their content asynchronously. Your scraper arrives at the page before the data does. The fix is one line of code: waitForSelector.

I'm a vibe coder who builds real government permit scrapers. This channel is every mistake I made so you don't have to.

Files used in this video: [link to your GitHub]
```

---

## YOUR GITHUB — upload the demo files

Create a free GitHub account → new repository called `vibe-scraper-lessons` → upload the 3 demo files → paste the link in your video description. This builds your portfolio automatically.
