import express from 'express';
import {
  getBookmarks,
  toggleBookmark,
  checkBookmark
} from '../controllers/bookmarkController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getBookmarks);
router.get('/check/:projectId', protect, checkBookmark);
router.post('/', protect, toggleBookmark);

export default router;

