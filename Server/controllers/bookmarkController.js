import Bookmark from '../models/Bookmark.js';
import Project from '../models/Project.js';

// @desc    Get user's bookmarks
// @route   GET /api/bookmarks
// @access  Private
export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id })
      .populate('projectId')
      .sort({ createdAt: -1 });

    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle bookmark
// @route   POST /api/bookmarks
// @access  Private
export const toggleBookmark = async (req, res) => {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: 'Please provide project ID' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if bookmark exists
    const existingBookmark = await Bookmark.findOne({
      userId: req.user._id,
      projectId: projectId
    });

    if (existingBookmark) {
      // Remove bookmark
      await Bookmark.findByIdAndDelete(existingBookmark._id);
      res.json({ message: 'Bookmark removed', bookmarked: false });
    } else {
      // Add bookmark
      const bookmark = await Bookmark.create({
        userId: req.user._id,
        projectId: projectId
      });
      await bookmark.populate('projectId');
      res.json({ message: 'Bookmark added', bookmarked: true, bookmark });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check if project is bookmarked
// @route   GET /api/bookmarks/check/:projectId
// @access  Private
export const checkBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      userId: req.user._id,
      projectId: req.params.projectId
    });

    res.json({ bookmarked: !!bookmark });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

