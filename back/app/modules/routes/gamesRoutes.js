import { Router } from 'express';
import { GamesController } from '../controllers/gamesController.js';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';

const router = Router();

router.get('/games', isValidJwt, GamesController.getAllGames);
router.get('/gamesByName/:name', isValidJwt, GamesController.getGamesByName);
router.get('/game/:id', isValidJwt, GamesController.getGameById);
router.get('/gamesName', isValidJwt, GamesController.getAllGamesName);

export default router;
