import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';

const router = Router();

// auth required routes
router.get('/pseudo', UserController.getAllPseudo);
router.get('/cities', UserController.getAllCities);

// non auth required routes
router.put(
  '/account/user-information',
  isValidJwt,
  UserController.updateUserInformation
);
router.get('/:id', isValidJwt, UserController.getUserProfil);

export default router;
