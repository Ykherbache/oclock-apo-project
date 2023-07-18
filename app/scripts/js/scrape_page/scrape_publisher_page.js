const fs = require("fs");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
let browser;
const publisherIdList = [
  "02nxXHFzGt",
  "134bN9cRFH",
  "1bpNRnodVQ",
  "1LE7oe5KVZ",
  "1mOFkrecKk",
  "1SunYePk0l",
  "1TaoBxZ3GH",
  "1x2GajPh0m",
  "1YPHFznRI7",
  "28g8IvTjBN",
  "2RWFJbsJmQ",
  "3AgeSlSrHP",
  "3K6AQGJUvK",
  "3QcMaznB1X",
  "3WceDnhCHA",
  "3zDHNPXDFz",
  "43I0JfzAEF",
  "4JVULpw7vl",
  "4rXVz09uUD",
  "4TflJQPugP",
  "4v3VcpI0zm",
  "58ZpdJ3uXe",
  "59ianWQ21G",
  "6aHrtQYNPv",
  "6ATCFkudlz",
  "6npFgxU7eU",
  "7GTti1NuCH",
  "8CSLsiS0aW",
  "8eHESCflqX",
  "8Gj0vioBI1",
  "8jkrvEWUQC",
  "9GlpSO4zcy",
  "9lMarAJDRu",
  "9MisEjkXkk",
  "9UanxBIwen",
  "A2MUVRaKvj",
  "A36XX4oXsn",
  "A9fOQJikgo",
  "AbMPy58gPh",
  "ACVD6AQxe1",
  "afC4QDlzPw",
  "AH5bbHG1jp",
  "aHjtFBSGhK",
  "AJOLlAUFw6",
  "aJQc5Z11N1",
  "AqOMMqQvmo",
  "AVv4sVGITy",
  "BafaDUdI0B",
  "beoSVYQtGP",
  "BGjcsTJLdf",
  "BhORjPosne",
  "bhvEU5fuxJ",
  "BjbJIU4hZR",
  "BJklzd40Sb",
  "BlHozckjZf",
  "blnRebAiwM",
  "bpYLn8Rmdi",
  "BrfTva4mEF",
  "BVlOoe04E1",
  "c9GDAGm3iE",
  "cAKxFsI6VL",
  "CdwkzCJP4k",
  "cdziQJD1Jy",
  "d5oY0duBgG",
  "D9fZQ9X3Gb",
  "D9QaGDatvs",
  "dBKzBklNbA",
  "DDsmeFrEB1",
  "DILYwqowKI",
  "DnrZyD1mJW",
  "dqFhGsGXYQ",
  "drLRBKM1hx",
  "EFw8VuSG6W",
  "eJue6JPxqV",
  "Eldb8KQw4u",
  "Er8I3hmZPS",
  "Ew2FuTB8R1",
  "EzK672818k",
  "f4mQL4Hahl",
  "F7yTcbdubQ",
  "f90eOxjdVh",
  "FcOewEIr5d",
  "FDS0ErvIaS",
  "fENxqpb067",
  "FfPY7CwLB5",
  "FG63HUGsWf",
  "fGkpTAUXla",
  "fIUPi2WQY8",
  "fjvkGaFrI1",
  "Fkhpl9xtZi",
  "fLH8tXTBBp",
  "fp9ajXmUFW",
  "FPVGsaCkMJ",
  "frcCuQg1wB",
  "FS0RPtaVXi",
  "fZduAVGr8B",
  "geGEEdKZJI",
  "GHwtYnok7U",
  "gniNJ5XEjM",
  "GOjMF4tRDJ",
  "gqQJJWghXI",
  "grsA2gjY1z",
  "GrvfAjJt9v",
  "GRz1xTaF6Z",
  "gtEJZ3LsMl",
  "GUrKOPDFa8",
  "HAInGFwhnD",
  "HcDB74iiQE",
  "hCWOy8oalg",
  "hDGcV4oOcY",
  "HfhqRoxYRy",
  "hg8a3jxrn9",
  "hgYDqbGKRL",
  "HRULm3KDzq",
  "hRyavENXm0",
  "htH0Ntr1Le",
  "hwtBSyR7An",
  "iCBntlvqRD",
  "IDT2HGPnlV",
  "igC4T3ApSN",
  "IGga0L4ShF",
  "IGIv2BGAoI",
  "igQ5BwIHOW",
  "IirRC59g8r",
  "iJrnhLWbww",
  "iktKa9ZtDl",
  "IlM8J9RnXP",
  "IwPBbPMwWe",
  "j0VtumYgyN",
  "j6ztuBDWVy",
  "j7VDqw6p7p",
  "J8pMyONAQy",
  "j9RXlIHGyr",
  "ja1W0hp62r",
  "jF4KGWCkCq",
  "JsYNPmm1LT",
  "jtlVtE9udZ",
  "jVKDlz7qmo",
  "jyc9bV7f9D",
  "ke1fAdGIGF",
  "Kin8kLD4gZ",
  "KIOqDFY5h9",
  "kkhAInYvqI",
  "KM5BrLoTF3",
  "kM98P8Iplw",
  "Kn3uB9tY93",
  "kWtMc5dW6x",
  "kxpYTdTa3L",
  "kYDwJgCh9D",
  "L5aqoFBWAO",
  "l5zH2afgRq",
  "LBpROWr0eA",
  "LeEpEe1zeK",
  "LJ4DWU1gZS",
  "LjmghcBsOU",
  "LvQuI182nK",
  "M0j3iwMtqL",
  "m4T08lQftL",
  "m8395Elfut",
  "md4kqWMZSE",
  "mdjAyzqUAf",
  "mErhWqeWcQ",
  "mGVCPaJvDN",
  "Mrl5zumwgE",
  "n0we3bxvUP",
  "N9OCaceHgg",
  "njVFVNfJc7",
  "NKUH1XoUej",
  "nl3J7018LJ",
  "nXkH65MZyn",
  "Nz4vpToxr1",
  "o2YGpXhhcB",
  "ObFpzUtXN7",
  "oFIGIC4bxh",
  "OGoqTbpq1J",
  "oGZbpnrogq",
  "OJHakpjWbW",
  "OLY3Cwottw",
  "oMJpRsFrIj",
  "oN2Xb8z3yj",
  "oQcGa4viSd",
  "oQF5cscvFw",
  "OQJtEkBNQV",
  "oTEffGR594",
  "oY61GmlE01",
  "oZcHBJkmoL",
  "pzgCTcPFZ6",
  "Q7ja3Cw6OT",
  "Qe9kI2Dgrd",
  "QEJC5VGQ5t",
  "QsRTkCBEbH",
  "Qx6KrgnjCA",
  "r2R8bUHIRD",
  "R3ObaMl0Tx",
  "r8eNXdXWWa",
  "rCTebnKaRJ",
  "Rd3XYOnRcV",
  "rEHzg5Xmbs",
  "RfpCQcXViD",
  "rKoXgziCtP",
  "RY4XltbNAz",
  "S7gECDWWly",
  "sddM6eP8Oj",
  "SootQmFciG",
  "spvQs2eVPi",
  "suEC3FjsVj",
  "sWSs9QEvAJ",
  "SXnhc3S9lv",
  "t0q9qTZeiq",
  "T1xYAKL0MQ",
  "T2jwhukCWf",
  "tcF3NFFpHV",
  "Td79E1RD7c",
  "TlNR46ZPAY",
  "ToCf9WCBmP",
  "TpGyVwxvun",
  "tsDLHKSBKe",
  "u02tuZCku5",
  "uEVzrA1yB0",
  "UPqP0MXLqj",
  "UqOXSFZ8Sy",
  "UQWdZDlH0S",
  "Ux5GwHZoTi",
  "v4d6zuwN2Z",
  "V56GZp1sfw",
  "vbLOOGREaH",
  "VgduxB4fMU",
  "VJ5nXRHPzv",
  "vJkLBDgn1j",
  "VKIPDDgZ2X",
  "vPTEV8KZxq",
  "w1jOf2uAOD",
  "wbUt7Br7ex",
  "wTja2FPklC",
  "WTqA23KAej",
  "x2HWAp0JNn",
  "X3jaHkneuz",
  "x7CHPz7tNy",
  "x7DawOOE5Z",
  "x7r9LWx2vR",
  "xaz6xzfPyW",
  "xgyBbWOKtq",
  "xjncKjZ9gW",
  "xKRqNHnGbN",
  "xkwk4iNb1Z",
  "xLAQpo3pJb",
  "XoIJb35yqe",
  "Xq3VQhNYZC",
  "XUf47NWGsH",
  "xVwmtOw1KR",
  "XYrFXkBbCv",
  "xZ9Eh7qBo0",
  "Xzlb5MMo16",
  "yCiDuHNHET",
  "yDiHhfq9uf",
  "YhlTzyWb3p",
  "yM3jQXL1Dt",
  "YnNKwCizDo",
  "YSSwMzGsuO",
  "YXGqYgPuvL",
  "yZC6erXAAf",
  "zFEk5YmwwQ",
  "ZH42BTFHSJ",
  "zhzjgM44wA",
  "zIeJ3cpCF2",
  "ZisCDEwRzO",
  "ZLAEuhd3AD",
  "ZmKHBQ9nqH",
  "zQqJAyWX85",
  "zvkwiYDtp0",
  "ZVqjaIQDME",
  "zVquHSP79Z",
];
// Function to initialize the Puppeteer browser instance
async function initializeBrowser() {
  browser = await puppeteer.launch({ headless: "new" });
}

// Batch size for concurrent scraping
const batchSize = 10;

// Function to scrape all publisher IDs in the list
async function scrapeAllPublishers() {
  const scrapedData = [];

  // Group the publisher IDs in batches
  const batches = [];
  for (let i = 0; i < publisherIdList.length; i += batchSize) {
    const batch = publisherIdList.slice(i, i + batchSize);
    batches.push(batch);
  }

  // Process each batch of requests concurrently
  for (const batch of batches) {
    const promises = batch.map(async (publisherId) => {
      const data = await scrapePage(publisherId);
      return data;
    });

    const batchData = await Promise.all(promises);
    scrapedData.push(...batchData.filter((data) => data !== null));
  }

  return scrapedData;
}

// Function to scrape the page and extract the desired data
async function scrapePage(publisherId) {
  try {
    const url = `https://www.boardgameatlas.com/publisher/${publisherId}`;
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
    const publisherName = $("h1").text().trim();

    // Close the page
    await page.close();

    // Calculate the time taken
    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    // Construct the data object
    const data = {
      publisher_id: publisherId,
      name: publisherName,
    };
    console.log(
      `Scraped ${publisherName} with ID ${publisherId} in ${timeTaken} seconds`
    );
    return data;
  } catch (error) {
    console.error(`Error scraping publisher with ID ${publisherId}:`, error);
    return null;
  }
}

// Scrape all publishers and save the result to a file
try {
  await initializeBrowser();
  const data = await scrapeAllPublishers();
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
  console.error("Error scraping publishers:", error);
  browser.close(); // Close the browser instance in case of an error
}
