import Project from '../models/Project.js';
import Notification from '../models/Notification.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { status, approved, farmerId, cropType, location } = req.query;
    const query = {};

    if (status) query.status = status;
    if (approved !== undefined) query.approved = approved === 'true';
    if (farmerId) query.farmerId = farmerId;
    if (cropType) query.cropType = cropType;
    if (location) query.location = location;

    const projects = await Project.find(query)
      .populate('farmerId', 'name email avatar location')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('farmerId', 'name email avatar location bio phone');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Farmer
export const createProject = async (req, res) => {
  try {
    const {
      title,
      cropType,
      location,
      description,
      fundingGoal,
      duration,
      expectedReturn,
      image,
      startDate
    } = req.body;

    // Validation
    if (!title || !cropType || !location || !description || !fundingGoal || !duration || !expectedReturn) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const project = await Project.create({
      farmerId: req.user._id,
      farmerName: req.user.name,
      title,
      cropType,
      location,
      description,
      fundingGoal: parseInt(fundingGoal),
      duration: parseInt(duration),
      expectedReturn: parseInt(expectedReturn),
      image: image || '',
      startDate: startDate ? new Date(startDate) : new Date(),
      status: 'pending',
      approved: false
    });

    // Create notification for admin
    await Notification.create({
      userId: req.user._id,
      type: 'project',
      message: `New project "${title}" is pending approval`,
      relatedId: project._id,
      relatedModel: 'Project'
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Farmer or Admin
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the owner or admin
    if (project.farmerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    const {
      title,
      cropType,
      location,
      description,
      fundingGoal,
      duration,
      expectedReturn,
      image,
      startDate
    } = req.body;

    if (title) project.title = title;
    if (cropType) project.cropType = cropType;
    if (location) project.location = location;
    if (description) project.description = description;
    if (fundingGoal) project.fundingGoal = parseInt(fundingGoal);
    if (duration) project.duration = parseInt(duration);
    if (expectedReturn) project.expectedReturn = parseInt(expectedReturn);
    if (image !== undefined) project.image = image;
    if (startDate) project.startDate = new Date(startDate);

    // Recalculate end date if duration changed
    if (duration && project.startDate) {
      const endDate = new Date(project.startDate);
      endDate.setMonth(endDate.getMonth() + parseInt(duration));
      project.endDate = endDate;
    }

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Farmer or Admin
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the owner or admin
    if (project.farmerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve project
// @route   PUT /api/projects/:id/approve
// @access  Private/Admin
export const approveProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.approved = true;
    project.status = 'active';
    project.approvedBy = req.user._id;
    project.approvedAt = new Date();

    const updatedProject = await project.save();

    // Create notification for farmer
    await Notification.create({
      userId: project.farmerId,
      type: 'approval',
      message: `Your project "${project.title}" has been approved`,
      relatedId: project._id,
      relatedModel: 'Project'
    });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reject project
// @route   PUT /api/projects/:id/reject
// @access  Private/Admin
export const rejectProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.approved = false;
    project.status = 'rejected';
    project.approvedBy = req.user._id;
    project.approvedAt = new Date();

    const updatedProject = await project.save();

    // Create notification for farmer
    await Notification.create({
      userId: project.farmerId,
      type: 'approval',
      message: `Your project "${project.title}" has been rejected`,
      relatedId: project._id,
      relatedModel: 'Project'
    });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

