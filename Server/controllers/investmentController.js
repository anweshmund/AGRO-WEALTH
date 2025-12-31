import Investment from '../models/Investment.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

// @desc    Get all investments
// @route   GET /api/investments
// @access  Private
export const getInvestments = async (req, res) => {
  try {
    const { investorId, projectId, status } = req.query;
    const query = {};

    // If not admin, only show user's investments
    if (req.user.role !== 'admin') {
      query.investorId = req.user._id;
    } else {
      if (investorId) query.investorId = investorId;
    }

    if (projectId) query.projectId = projectId;
    if (status) query.status = status;

    const investments = await Investment.find(query)
      .populate('investorId', 'name email avatar')
      .populate('projectId', 'title cropType location image status')
      .sort({ createdAt: -1 });

    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single investment
// @route   GET /api/investments/:id
// @access  Private
export const getInvestment = async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id)
      .populate('investorId', 'name email avatar phone location')
      .populate('projectId');

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    // Check if user has access
    if (req.user.role !== 'admin' && 
        investment.investorId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(investment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new investment
// @route   POST /api/investments
// @access  Private/Investor
export const createInvestment = async (req, res) => {
  try {
    const { projectId, amount } = req.body;

    // Validation
    if (!projectId || !amount) {
      return res.status(400).json({ message: 'Please provide project ID and amount' });
    }

    if (parseInt(amount) < 10000) {
      return res.status(400).json({ message: 'Minimum investment is ₹10,000' });
    }

    // Get project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.approved || project.status !== 'active') {
      return res.status(400).json({ message: 'Project is not available for investment' });
    }

    // Check if funding goal is reached
    if (project.amountRaised + parseInt(amount) > project.fundingGoal) {
      return res.status(400).json({ 
        message: `Investment amount exceeds remaining funding goal. Remaining: ₹${project.fundingGoal - project.amountRaised}` 
      });
    }

    // Create investment
    const investment = await Investment.create({
      investorId: req.user._id,
      projectId: project._id,
      projectTitle: project.title,
      amount: parseInt(amount),
      expectedReturn: project.expectedReturn,
      currentValue: parseInt(amount),
      status: 'active'
    });

    // Update project
    project.amountRaised += parseInt(amount);
    project.investors += 1;
    await project.save();

    // Update investor stats
    const investor = await User.findById(req.user._id);
    investor.totalInvested += parseInt(amount);
    investor.activeInvestments += 1;
    await investor.save();

    // Create notification for farmer
    await Notification.create({
      userId: project.farmerId,
      type: 'investment',
      message: `New investment of ₹${parseInt(amount).toLocaleString('en-IN')} received for "${project.title}"`,
      relatedId: investment._id,
      relatedModel: 'Investment'
    });

    // Populate before sending
    await investment.populate('projectId', 'title cropType location image');

    res.status(201).json(investment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update investment status
// @route   PUT /api/investments/:id
// @access  Private/Admin
export const updateInvestment = async (req, res) => {
  try {
    const { status, returnAmount, returnDate } = req.body;

    const investment = await Investment.findById(req.params.id);

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    if (status) investment.status = status;
    if (returnAmount !== undefined) investment.returnAmount = returnAmount;
    if (returnDate) investment.returnDate = new Date(returnDate);

    // Calculate current value based on return
    if (returnAmount) {
      investment.currentValue = returnAmount;
    }

    const updatedInvestment = await investment.save();

    res.json(updatedInvestment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

