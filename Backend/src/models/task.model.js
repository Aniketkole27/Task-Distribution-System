import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: ture,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Admin or Subadmin
      required: true,
    },
    Status: {
      type: String,
      enum: ['todo', 'in-progress', 'completed', 'failed'],
      default: 'todo',
    },
    submittedAt: Date,
    reviewedAt: Date,

    reviewComment: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
