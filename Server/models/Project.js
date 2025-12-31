import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Farmer ID is required']
  },
  farmerName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  cropType: {
    type: String,
    required: [true, 'Crop type is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  fundingGoal: {
    type: Number,
    required: [true, 'Funding goal is required'],
    min: [100000, 'Funding goal must be at least ₹1,00,000']
  },
  amountRaised: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 month']
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'rejected', 'cancelled'],
    default: 'pending'
  },
  approved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  image: {
    type: String,
    default: ''
  },
  expectedReturn: {
    type: Number,
    required: [true, 'Expected return is required'],
    min: [1, 'Expected return must be at least 1%'],
    max: [50, 'Expected return cannot exceed 50%']
  },
  investors: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate end date based on duration
projectSchema.pre('save', function(next) {
  if (this.isNew && this.startDate && this.duration) {
    const endDate = new Date(this.startDate);
    endDate.setMonth(endDate.getMonth() + this.duration);
    this.endDate = endDate;
  }
  next();
});

// Index for better query performance
projectSchema.index({ farmerId: 1, status: 1 });
projectSchema.index({ status: 1, approved: 1 });
projectSchema.index({ createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;

