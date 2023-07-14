// gamesController.js

import { GamesService } from '../services/gamesService.js';

export class GamesController {
  static getAllGames = async (req, res) => {
    try {
      const games = await GamesService.getAllGames();
      res.status(200).json(games);
    } catch (error) {
      console.error('Error fetching games:', error);
      res.status(500).json({ error: 'Error fetching games' });
    }
  };

  static getGamesByName = async (req, res) => {
    const gameName = req.params.name;
    try {
      const games = await GamesService.getGamesByName(gameName);
      res.status(200).json(games);
    } catch (error) {
      console.error(`Error fetching games with name ${gameName}:`, error);
      res.status(500).json({ error: 'Error fetching games' });
    }
  };

  static getGameById = async (req, res) => {
    const gameId = req.params.id;
    try {
      const game = await GamesService.getGameById(gameId);
      res.status(200).json(game);
    } catch (error) {
      console.error(`Error fetching game with id ${gameId}:`, error);
      res.status(500).json({ error: 'Error fetching game' });
    }
  };

  static getAllGamesName = async (req, res) => {
    try {
      const names = await GamesService.getAllGamesName();
      res.status(200).json(names);
    } catch (error) {
      console.error('Error fetching games names:', error);
      res.status(500).json({ error: 'Error fetching games names' });
    }
  };
}
