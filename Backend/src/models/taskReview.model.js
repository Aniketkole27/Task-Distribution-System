import mongoose, { mongo } from 'mongoose';

import mongoose from 'mongoose';

const taskReviewSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    assingedTo: {
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
    comment: String,
  },
  { timestamps: true }
);

export const Review = mongoose.model('Review', taskReviewSchema);
