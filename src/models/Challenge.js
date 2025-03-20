import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  id: String,
  description: String,
  isCompleted: {
    type: Boolean,
    default: false
  }
});

const challengeSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  isMilestone: {
    type: Boolean,
    default: false
  },
  week: {
    type: Number,
    required: true
  },
  theme: String,
  tasks: [taskSchema],
  businessValue: String,
  commands: [{
    command: String,
    explanation: String
  }],
  expectedOutputs: mongoose.Schema.Types.Mixed
});

export default mongoose.model('Challenge', challengeSchema);