const axios = require("axios");
const fs = require("fs");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const client_ids = [
  "Rb6qnFOFw1",
  "V4BmX5iNiT",
  "YdnNy3U6it",
  "mw4aWQxCLq",
  "dv4NBs1acB",
  "CdFCCtIQSn",
];

const num_api_calls = Math.ceil(152973 / 100);
const url = "https://api.boardgameatlas.com/api/search";

async function makeRequests() {
  let requestCount = 0;
  let skip = 0;
  for (let i = 0; i < num_api_calls; i++) {
    let currentClient = client_ids[i % client_ids.length];
    try {
      let response = await axios.get(url, {
        params: {
          client_id: currentClient,
          limit: 100,
          skip: skip,
        },
      });
      let data = response.data;
      let dataJSON = JSON.stringify(data, null, 2);
      fs.writeFileSync(`data${i}.json`, dataJSON);
      console.log(`Data written to file data${i}.json`);

      requestCount++;
      if (requestCount % 60 === 0) {
        // If we have reached the rate limit, wait for 60 seconds before the next request
        await delay(60000);
      } else {
        // Otherwise, wait for 1 second before the next request
        await delay(1000);
      }

      // Increment the skip value for the next API call
      skip += 100;
    } catch (error) {
      console.log(error);
    }
  }
}

makeRequests();
