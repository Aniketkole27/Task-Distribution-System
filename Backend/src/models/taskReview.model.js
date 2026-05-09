import mongoose, { mongo } from 'mongoose';

import mongoose from 'mongoose';

const taskReviewSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    decision: {
      type: String,
      enum: ['approved', 'rejected'],
      required: true,
    },
    
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model('Review', taskReviewSchema);
