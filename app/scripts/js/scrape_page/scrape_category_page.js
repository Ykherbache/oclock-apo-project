const fs = require("fs");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
let browser;
const categoryIdList = [
  "0MdRqhkNpw",
  "20iDvpbh7A",
  "2bdFPJUvFo",
  "329DxyFL9D",
  "3B3QpKvXD3",
  "42pmul4oHH",
  "4hZlqoitAY",
  "4mOtRRwSoj",
  "5APB1MWk6X",
  "5J6M28LoWA",
  "7rV11PKqME",
  "85OKv8p5Ow",
  "a8NM5cugJX",
  "AeWXMxbm91",
  "bCBXJy9qDw",
  "bKrxqD9mYc",
  "Bq6M0TJyg7",
  "bSzUpE5oOZ",
  "buDTYyPw4D",
  "cAIkk5aLdQ",
  "CBboNLI1Uj",
  "CWYOF9xu7O",
  "dghLhwyxVb",
  "dO9HVl2TW7",
  "Ef4oYLHNhI",
  "eFaACC6y2c",
  "eX8uuNlQkQ",
  "FC6ElKI9tk",
  "FmGV9rVu1c",
  "fW5vusE96B",
  "g2Hwv8t0Y5",
  "ge8pIhEUGE",
  "gscaL52VDG",
  "gsekjrPJz0",
  "GtuMb7ei27",
  "h8wfZG0j3I",
  "hBqZ3Ar4RJ",
  "HKaYVNIxAJ",
  "JMM0TG2MSe",
  "JwHcKqxh33",
  "jX8asGGR6o",
  "jZEDOpx07e",
  "k0dglq5j6N",
  "Kk70K0524Z",
  "KSBdPfxs6F",
  "KUBCKBkGxV",
  "KzEQIwIub7",
  "mavSOM8vjH",
  "MHkqIVxwtx",
  "MWoxgHrOJD",
  "N0TkEGfEsF",
  "nfQONtMbDU",
  "nuHYRFmMjU",
  "nWDac9tQzt",
  "ODWOjWAJj3",
  "oojGpMQQ2l",
  "pacCjl7His",
  "PinhJrhnxU",
  "POlqwScVxD",
  "PzWI2uaif0",
  "QAYkTHK1Dd",
  "QB4sEpx1Uu",
  "rHvAx4hH2f",
  "rrvd68LjOR",
  "ruQAhyLfum",
  "Sod2YBWMKi",
  "ssZjU3HETz",
  "tJxatX2ZbW",
  "TKQncFVX74",
  "tQGLgwdbYH",
  "TR4CiP8Huj",
  "TYnxiuiI3X",
  "upXZ8vNfNO",
  "v4SfYtS2Lr",
  "vqZ5XzGWQD",
  "vRbkg1W0AB",
  "vXxLT0FDTZ",
  "VzyslQJGrG",
  "w8XD66FUZ2",
  "wpItJuRDiz",
  "Wr8uXcoR9p",
  "WVMOS3s2pb",
  "X8J7RM6dxX",
  "yq6hVlbM2R",
  "YrDuNj8lvr",
  "YyszHun1HP",
  "zqFmdU4Fp2",
  "ZTneo8TaIO",
  "zyj9ZK3mHB",
];
// Function to initialize the Puppeteer browser instance
async function initializeBrowser() {
  browser = await puppeteer.launch({ headless: "new" });
}

// Batch size for concurrent scraping
const batchSize = 10;

// Function to scrape all publisher IDs in the list
async function scrapeAllCategories() {
  const scrapedData = [];

  // Group the publisher IDs in batches
  const batches = [];
  for (let i = 0; i < categoryIdList.length; i += batchSize) {
    const batch = categoryIdList.slice(i, i + batchSize);
    batches.push(batch);
  }

  // Process each batch of requests concurrently
  for (const batch of batches) {
    const promises = batch.map(async (categoryId) => {
      const data = await scrapePage(categoryId);
      return data;
    });

    const batchData = await Promise.all(promises);
    scrapedData.push(...batchData.filter((data) => data !== null));
  }

  return scrapedData;
}

// Function to scrape the page and extract the desired data
async function scrapePage(categoryId) {
  try {
    const url = `https://www.boardgameatlas.com/category/${categoryId}`;
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
    const categoryName = $("h1").text().trim();

    // Close the page
    await page.close();

    // Calculate the time taken
    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    // Construct the data object
    const data = {
      publisher_id: categoryId,
      name: categoryName,
    };
    console.log(
      `Scraped ${categoryName} with ID ${categoryId} in ${timeTaken} seconds`
    );
    return data;
  } catch (error) {
    console.error(`Error scraping category with ID ${categoryId}:`, error);
    return null;
  }
}
(async () => {
  // Scrape all categories and save the result to a file
  try {
    await initializeBrowser();
    const data = await scrapeAllCategories();
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
    console.error("Error scraping categories:", error);
    browser.close(); // Close the browser instance in case of an error
  }
})();
