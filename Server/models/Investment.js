import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
  investorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Investor ID is required']
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project ID is required']
  },
  projectTitle: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Investment amount is required'],
    min: [10000, 'Minimum investment is ₹10,000']
  },
  expectedReturn: {
    type: Number,
    required: true
  },
  currentValue: {
    type: Number,
    default: function() {
      return this.amount;
    }
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  returnAmount: {
    type: Number,
    default: 0
  },
  returnDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
investmentSchema.index({ investorId: 1, status: 1 });
investmentSchema.index({ projectId: 1 });
investmentSchema.index({ createdAt: -1 });

const Investment = mongoose.model('Investment', investmentSchema);

export default Investment;

