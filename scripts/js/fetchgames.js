import axios from "axios";
import { parseString } from "xml2js";
import db from "../../back/app/config/db.config.js";
import GamesImport from "../models/Games.js";
import PublishersImport from "../models/Publishers.js";
import CategoriesImport from "../models/Categories.js"; // Ajout de l'importation pour le modèle "Categories"
import Mechanics_TypeImport from "../models/Mechanics_Type.js"; // Ajout de l'importation pour le modèle "Mechanics_Type"

const Games = GamesImport(db.sequelize);
const Publishers = PublishersImport(db.sequelize);
const Categories = CategoriesImport(db.sequelize); // Ajout de l'importation pour le modèle "Categories"
const Mechanics_Type = Mechanics_TypeImport(db.sequelize); // Ajout de l'importation pour le modèle "Mechanics_Type"

const delay = 4000; // 1 seconde de délai entre chaque appel à l'API
const numbers = [3, 4];
const idsGame = [];

async function fetchGameDetails(idGame) {
  const apiUrl = `https://api.boardgameatlas.com/api/search?ids=${idGame}&client_id=JLBr5npPhV`;

  try {
    const response = await axios.get(apiUrl);
    const gameData = response.data.games[0];
    const existingGame = await Games.findOne({ where: { id: gameData.id } });

    if (!existingGame) {
      if (gameData.id) {
        if (
          gameData.primary_publisher &&
          gameData.primary_publisher.id !== undefined
        ) {
          const existingPublisher = await Publishers.findOne({
            where: { id: gameData.primary_publisher.id },
          });
          if (!existingPublisher) {
            const publisher = await Publishers.create({
              id: gameData.primary_publisher.id,
              name: gameData.primary_publisher.name,
            });
            console.log("Éditeur ajouté:", publisher.id);
          }
        }
        if (gameData.categories[0] !== undefined) {
          const existingCategory = await Categories.findOne({
            where: { id: gameData.categories[0].id },
          });

          if (!existingCategory) {
            const searchId = gameData.categories[0].id;
            axios
              .get(
                "https://api.boardgameatlas.com/api/game/categories?pretty=true&client_id=JLBr5npPhV"
              )
              .then((response) => {
                const categories = response.data.categories;
                const category = categories.find(
                  (category) => category.id === searchId
                );
                const newCategory = Categories.create({
                  id: gameData.categories[0].id,
                  name: category.name,
                });
                console.log("Catégorie ajoutée:", newCategory.name);
              });
          }
        }

        if (gameData.mechanics[0] !== undefined) {
          const existingMechanic = await Mechanics_Type.findOne({
            where: { id: gameData.mechanics[0].id },
          });

          if (!existingMechanic) {
            const searchMechanics = gameData.mechanics[0].id;
            axios
              .get(
                "https://api.boardgameatlas.com/api/game/mechanics?pretty=true&client_id=JLBr5npPhV"
              )
              .then((response) => {
                const mechanics = response.data.mechanics;
                const mechanic = mechanics.find(
                  (mechanic) => mechanic.id === searchMechanics
                );
                if (mechanic) {
                  const newMechanic = Mechanics_Type.create({
                    id: searchMechanics,
                    name: mechanic.name,
                  });
                  console.log("Mécanique ajoutée:", newMechanic.name);
                } else {
                  console.log(
                    "Mécanique non trouvée pour l'ID:",
                    searchMechanics
                  );
                }
              });
          }
        }

        await Games.create({
          id: gameData.id,
          img: gameData.images.medium,
          name: gameData.name,
          publisher_id: gameData.primary_publisher
            ? gameData.primary_publisher.id
            : null,
          description: gameData.description,
          category_id: gameData.categories[0]
            ? gameData.categories[0].id
            : null,
          mechanics_type_id: gameData.mechanics[0]
            ? gameData.mechanics[0].id
            : null,
          price: gameData.price,
          year_published: gameData.year_published,
          min_players: gameData.min_players,
          max_players: gameData.max_players,
          playtime: gameData.playtime,
          age_min: gameData.min_age,
          average_learning_complexity: gameData.average_learning_complexity,
          average_strategy_complexity: gameData.average_strategy_complexity,
          average_note: gameData.average_user_rating,
        });
        console.log("Jeu ajouté:", gameData.name);
      } else {
        console.log("ID du jeu introuvable");
      }
    } else {
      console.log("Jeu déjà existant:", gameData.name);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données du jeu:", error);
  }
}

async function processUrls(urls) {
  const idsGame = [];

  for (const obj of urls) {
    const url = obj.loc[0];
    const regex = /\/game\/([^/]+)/;
    const match = url.match(regex);

    if (match) {
      const idGame = match[1];
      const existingGame = await Games.findOne({ where: { id: idGame } });

      if (!existingGame) {
        idsGame.push(idGame);
      }
    }
  }

  // Commencer les appels API
  for (let i = 0; i < idsGame.length; i++) {
    await fetchGameDetails(idsGame[i]);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

async function fetchGameUrls(xmlUrl) {
  try {
    const response = await axios.get(xmlUrl);
    const xmlData = response.data;
    parseString(xmlData, (err, result) => {
      if (err) {
        console.error("Erreur lors du parsing XML:", err);
      } else {
        const urls = result.urlset.url; // Accéder aux objets URL
        processUrls(urls);
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du XML:", error);
  }
}

async function gameFetch() {
  for (const number of numbers) {
    const xmlUrl = `https://www.boardgameatlas.com/sitemap-${number}.xml`;
    await fetchGameUrls(xmlUrl);
  }
}

gameFetch();

export default { gameFetch };
