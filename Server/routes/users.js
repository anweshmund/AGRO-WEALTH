import express from 'express';
import { getUserProfile, updateUserProfile, getAllUsers } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllUsers);
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);

export default router;

