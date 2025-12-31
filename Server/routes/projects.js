import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  approveProject,
  rejectProject
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, authorize('farmer', 'admin'), createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.put('/:id/approve', protect, authorize('admin'), approveProject);
router.put('/:id/reject', protect, authorize('admin'), rejectProject);

export default router;

