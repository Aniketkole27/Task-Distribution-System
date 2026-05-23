import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    dueDate: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ['low', 'medium', 'urgent'],
      default: 'medium',
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
      ref: 'User',
      required: true,
    },

    status: {
      type: String,
      enum: [
        'todo',
        'in-progress',
        // 'submitted',
        'under-review',
        'approved',
        'rejected',
      ],
      default: 'todo',
    },

    submissionNote: {
      type: String,
      default: "",
    },

    adminNote: {
      type: String,
      default: "",
    },

    submittedAt: Date,
    lastReviewedAt: Date,

  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
