import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
    enum: ['Sustainability', 'Investment', 'Technology', 'Climate', 'General'],
    default: 'General'
  },
  image: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
newsSchema.index({ createdAt: -1 });
newsSchema.index({ category: 1 });

const News = mongoose.model('News', newsSchema);

export default News;

