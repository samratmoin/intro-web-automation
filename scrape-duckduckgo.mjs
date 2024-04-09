import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: { width: 1920, height: 1080 },
  slowMo: 150,
  userDataDir: "temporary",
});

const page = await browser.newPage();
await page.goto("https://duckduckgo.com/", { waitUntil: "networkidle2" });

const searchBoxHandle = await page.waitForSelector("#searchbox_input");
await searchBoxHandle.type("https://github.com/samratmoin");

const searchButtonHandle = await page.waitForSelector('[type="submit"]');
await searchButtonHandle.click();

const firstResult = await page.waitForSelector(
  '[data-testid="result-title-a"]'
);

await setTimeout(2000);

await page.screenshot({ path: "profile.png" });

await browser.close();
