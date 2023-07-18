import { Router } from 'express';

import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';
import { RentingGamesController } from '../controllers/rentingGamesController.js';

//add missing imports

const router = Router();

/** auth endpoints */
router.post(
  '/rentingGames/add',
  isValidJwt,
  RentingGamesController.addRentingGame
);
router.get(
  '/rentingGames/:id',
  isValidJwt,
  RentingGamesController.getRentingGamesByUser
);
/** non auth endpoint */
router.get('/rentingGames/game/:id', RentingGamesController.getRentingGameById);
router.get('/bestRentingGames/:id', RentingGamesController.getBestGameRenting);
router.get('/rentingGames', RentingGamesController.listGames);

export default router;
