const fs = require("fs");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
let browser;
const mechanicIdList = [
  "05zCZoLvQJ",
  "0ez69aUfuJ",
  "1382oBW7iB",
  "3dFd0RwsY4",
  "3te2oybNR4",
  "3tuJiW3pps",
  "5kvyChnWuO",
  "6YTZ0juKWy",
  "71HG4TJaoD",
  "8PN2HE86wg",
  "9mNukNBxfZ",
  "9NBcz45nN7",
  "9YdRn9J9oZ",
  "9ZlbQA8L5l",
  "amcImLdOmD",
  "AZxlPpi5oq",
  "BbTMRkwL0b",
  "Bc7R8pLoGk",
  "BeD8NYAaSU",
  "bgGxE0pI2B",
  "BGrhzIN69D",
  "ckCp1oTVMy",
  "DEvPj5twid",
  "ea1eaPBQn8",
  "ebJKldFVeS",
  "EVeAdboGUA",
  "fBOTEBUAmV",
  "fUnFqLGvxW",
  "Gan96fffLL",
  "GNtouC8NLm",
  "GsNGxZFNCK",
  "Hef8hzPH7C",
  "hmipYN1R1I",
  "i8pEFk75OI",
  "iWODHwRGuU",
  "j2A0uFmdgc",
  "jbLrZb1xIb",
  "jOAB6RhwBp",
  "JYYdBW6UCE",
  "KfTS5BwIsu",
  "Khp7U5pHZi",
  "lA3KUtVFCy",
  "MaXzmoZUoX",
  "n1GtBt35Rd",
  "ngCSHHk0H2",
  "oeg6wN9Eoc",
  "ohABM4GjbC",
  "pEHn0BKFZ8",
  "PGjmKGi26h",
  "PzEJDypMgC",
  "qu5BcGjAzk",
  "R0bGq4cAl4",
  "r6yIFvyXDD",
  "Rt6V388y6M",
  "S0O9ucexPS",
  "TEmgapaEg0",
  "tKZiGvSxAC",
  "U3zhCQH7Et",
  "U7vKyeRc0N",
  "UAV3t3FxVI",
  "uZJS07nXF5",
  "uZR0NCIA6D",
  "Voqy2dgrIM",
  "VQQsdFilIf",
  "vZsDDAdOoe",
  "WPytek5P8l",
  "wV5peB05xs",
  "XM2FYZmBHH",
  "xuphiSlrxI",
  "YlqCkWPY0r",
  "yQ4ZptdyD1",
  "yu3eas6v7A",
  "zw4KMn5rcD",
  "ZX3hYcF9H7",
];
// Function to initialize the Puppeteer browser instance
async function initializeBrowser() {
  browser = await puppeteer.launch({ headless: "new" });
}

// Batch size for concurrent scraping
const batchSize = 10;

// Function to scrape all publisher IDs in the list
async function scrapeAllmechanics() {
  const scrapedData = [];

  // Group the publisher IDs in batches
  const batches = [];
  for (let i = 0; i < mechanicIdList.length; i += batchSize) {
    const batch = mechanicIdList.slice(i, i + batchSize);
    batches.push(batch);
  }

  // Process each batch of requests concurrently
  for (const batch of batches) {
    const promises = batch.map(async (mechanicId) => {
      const data = await scrapePage(mechanicId);
      return data;
    });

    const batchData = await Promise.all(promises);
    scrapedData.push(...batchData.filter((data) => data !== null));
  }

  return scrapedData;
}

// Function to scrape the page and extract the desired data
async function scrapePage(mechanicId) {
  try {
    const url = `https://www.boardgameatlas.com/mechanic/${mechanicId}`;
    const page = await browser.newPage();

    // Navigate to the page and wait for the JavaScript to load
    await page.goto(url, { waitUntil: "networkidle0" });

    // Start the timer
    const startTime = Date.now();

    // Extract the HTML content after JavaScript has been executed
    const html = await page.content();

    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);

    // Extract the desired data using CSS selectors
    const mechanicName = $("h1").text().trim();

    // Close the page
    await page.close();

    // Calculate the time taken
    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    // Construct the data object
    const data = {
      mechanic_id: mechanicId,
      name: mechanicName,
    };
    console.log(
      `Scraped ${mechanicName} with ID ${mechanicId} in ${timeTaken} seconds`
    );
    return data;
  } catch (error) {
    console.error(`Error scraping mechanic with ID ${mechanicId}:`, error);
    return null;
  }
}
(async () => {
  // Scrape all mechanics and save the result to a file
  try {
    await initializeBrowser();
    const data = await scrapeAllmechanics();
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile("scraped_data.json", jsonData, (error) => {
      if (error) {
        console.error("Error writing to file:", error);
      } else {
        console.log("Data saved to scraped_data.json");
      }
      browser.close(); // Close the browser instance after scraping
    });
  } catch (error) {
    console.error("Error scraping mechanics:", error);
    browser.close(); // Close the browser instance in case of an error
  }
})();
