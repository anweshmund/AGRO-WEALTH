import express from 'express';
import {
  getMessages,
  getMessage,
  sendMessage,
  markMessageAsRead,
  deleteMessage
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getMessages);
router.get('/:id', protect, getMessage);
router.post('/', protect, sendMessage);
router.put('/:id/read', protect, markMessageAsRead);
router.delete('/:id', protect, deleteMessage);

export default router;

