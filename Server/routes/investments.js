import express from 'express';
import {
  getInvestments,
  getInvestment,
  createInvestment,
  updateInvestment
} from '../controllers/investmentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getInvestments);
router.get('/:id', protect, getInvestment);
router.post('/', protect, authorize('investor', 'admin'), createInvestment);
router.put('/:id', protect, authorize('admin'), updateInvestment);

export default router;

