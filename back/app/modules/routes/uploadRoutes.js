import { Router } from 'express';
const router = Router();
import { upload } from '../controllers/uploadController.js';
import { setMulterConfig } from '../../utils/middlewares/upload/setMulter.js';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';
import { injectUserInRequest } from '../../utils/middlewares/user/injectUserInRequest.js';

router.post('/', isValidJwt, injectUserInRequest, setMulterConfig, upload);

export default router;
