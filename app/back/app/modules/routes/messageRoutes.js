import { Router } from 'express';
import { MessageController } from '../controllers/messageController.js';
import { isValidJwt } from '../../utils/middlewares/validation/auth/verifJwt.js';

const router = Router();

router.post('/create', isValidJwt, MessageController.CreateMessage);
router.get('/list/:userId', isValidJwt, MessageController.getAllUserMessages);
router.get('/:messageId', isValidJwt, MessageController.findOneMessage);
router.delete('/', isValidJwt, MessageController.deleteMessage);
router.put(
  '/new-status/:userId/:messageId',
  isValidJwt,
  MessageController.markMessageIsRead
);
router.get(
  '/unread/:userId',
  isValidJwt,
  MessageController.getUnreadMessagesForUser
);
router.get(
  '/unread/count/:userId',
  isValidJwt,
  MessageController.countUnreadMessages
);

export default router;
