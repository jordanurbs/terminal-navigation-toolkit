import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  tasks: {
    type: Map,
    of: Boolean,
    default: {}
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient queries
progressSchema.index({ userId: 1, day: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress; 