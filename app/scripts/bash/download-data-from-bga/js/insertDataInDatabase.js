const fs = require("fs");
const mysql = require("mysql2");
const gameFile = process.argv[2];
const publishersFile = process.argv[3];
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "good_lock",
  port: 5307,
});

const disableForeignKeyChecks = () => {
  return new Promise((resolve, reject) => {
    const sql = "SET FOREIGN_KEY_CHECKS = 0";

    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const enableForeignKeyChecks = () => {
  return new Promise((resolve, reject) => {
    const sql = "SET FOREIGN_KEY_CHECKS = 1";

    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insertPublishersFromFile = async (filename) => {
  // start timer
  const start = new Date();

  const publishersData = JSON.parse(
    await fs.promises.readFile(filename, "utf8")
  );
  let totalRecords = 0;

  for (const publisher of publishersData["publisherList"]) {
    try {
      await insertPublishers([publisher.publisher_id, publisher.name]);
      totalRecords++;
    } catch (error) {
      console.error("Error inserting publisher:", error);
    }
  }

  console.log(`Inserted ${totalRecords} publisher records`);
  // end timer
  const end = new Date();
  const time = end - start;
  console.log(`Execution time inserting Publishers: ${time} ms`);
};

const insertBatchOfGamesFromFile = async (filename) => {
  // start timer
  const start = new Date();
  await disableForeignKeyChecks();

  const data = JSON.parse(await fs.promises.readFile(filename, "utf8"));

  const batchSize = 1000; // Adjust the batch size as needed
  let batch = [];
  let totalRecords = 0;

  for (const game of data) {
    const record = [
      game["id"],
      game["image_url"],
      game["name"],
      game["primary_publisher"]?.id || "n/c",
      game["description"],
      game["categories"][0] ? game["categories"][0]["id"] : "n/c",
      game["mechanics"][0] ? game["mechanics"][0]["id"] : "n/c",
      game["price"],
      game["year_published"],
      game["min_players"],
      game["max_players"],
      game["playtime"],
      game["min_age"],
      game["average_learning_complexity"],
      game["average_strategy_complexity"],
      game["average_user_rating"],
    ];

    batch.push(record);

    if (batch.length === batchSize) {
      totalRecords += batch.length;
      try {
        await insertBatch(batch);
        batch = [];
      } catch (error) {
        console.error("Error inserting records:", error);
      }
    }
  }

  if (batch.length > 0) {
    totalRecords += batch.length;
    try {
      await insertBatch(batch);
    } catch (error) {
      console.error("Error inserting records:", error);
    }
  }

  console.log(`Inserted ${totalRecords} records`);

  await enableForeignKeyChecks();

  // Execute the additional SQL queries here
  try {
    await updateCategories();
    await updateMechanicsTypes();
    await updatePublishers();
  } catch (error) {
    console.error("Error updating records:", error);
  }

  connection.end();
  // end timer
  const end = new Date();
  const time = end - start;
  console.log(`Execution time inserting Games: ${time} ms`);
};

const insertBatch = (batch) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Games (id, img, name, publisher_id, description, category_id, mechanics_type_id, price, year_published, min_players, max_players, playtime, age_min, average_learning_complexity, average_strategy_complexity, average_note) VALUES ? ON DUPLICATE KEY UPDATE img = VALUES(img), name = VALUES(name), publisher_id = VALUES(publisher_id), description = VALUES(description), category_id = VALUES(category_id), mechanics_type_id = VALUES(mechanics_type_id), price = VALUES(price), year_published = VALUES(year_published), min_players = VALUES(min_players), max_players = VALUES(max_players), playtime = VALUES(playtime), age_min = VALUES(age_min), average_learning_complexity = VALUES(average_learning_complexity), average_strategy_complexity = VALUES(average_strategy_complexity), average_note = VALUES(average_note)";

    connection.query(sql, [batch], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateCategories = () => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE Games g
    SET g.category_id = "n/c"
    WHERE g.category_id NOT IN (SELECT id FROM Categories)`;

    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateMechanicsTypes = () => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE Games g
    SET g.mechanics_type_id = "n/c"
    WHERE g.mechanics_type_id NOT IN (SELECT id FROM Mechanics_Type)`;

    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updatePublishers = () => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE Games g
    SET g.publisher_id = "n/c"
    WHERE g.publisher_id NOT IN (SELECT id FROM Publishers)`;

    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insertPublishers = (batch) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Publishers (id, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)";

    connection.query(sql, batch, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

connection.connect(async (err) => {
  if (err) throw err;
  console.log("Connected!");

  if (publishersFile) await insertPublishersFromFile(publishersFile);
  await insertBatchOfGamesFromFile(gameFile);
});
