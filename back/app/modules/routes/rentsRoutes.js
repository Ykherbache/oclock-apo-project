import { Router } from 'express';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';
import { RentsController } from '../controllers/rentsController.js';

const router = Router();
router.post('/rent/create', isValidJwt, RentsController.createRent);
router.put(
  '/rent/:id/updateStatus',
  isValidJwt,
  RentsController.UpdateRentStatus
);
router.get(
  '/user/account/rent/:idRentOwner/:status',
  isValidJwt,
  RentsController.getRentsByOwnerId
);
router.get(
  '/user/account/renting/:idRentRenter/:status',
  isValidJwt,
  RentsController.getRentsByRenterId
);
router.delete(
  '/rent/owner/:idOwner/:idRent',
  isValidJwt,
  RentsController.deleteByOwner
);
router.delete(
  '/rent/renter/:idRenter/:idRent',
  isValidJwt,
  RentsController.deleteByRenter
);

export default router;
