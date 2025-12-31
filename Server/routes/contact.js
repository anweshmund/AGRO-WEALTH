import express from 'express';
import {
  submitContact,
  getContacts,
  markAsReplied
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', protect, authorize('admin'), getContacts);
router.put('/:id/replied', protect, authorize('admin'), markAsReplied);

export default router;

