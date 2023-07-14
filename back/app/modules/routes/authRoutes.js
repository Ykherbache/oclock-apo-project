import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { checkDuplicateEmailAndPseudo } from '../../utils/middlewares/validation/auth/verifySignUp.js';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';
import { setAuthRouteRateLimit } from '../../utils/middlewares/rate-limit/setAuthRateLimit.js';
const router = Router();
router.post('/register', checkDuplicateEmailAndPseudo, AuthController.register);
router.post('/login', setAuthRouteRateLimit, AuthController.login);
router.put('/logout', isValidJwt, AuthController.logout);

export default router;
