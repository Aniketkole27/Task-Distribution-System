import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deuDate: {
      type: String,
      required: true,
    },
    privority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      required: true,
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'completed', 'failed'],
      default: 'active',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Admin only
      required: true,
    },
  },
  { timestamps }
);

export const Project = mongoose.model('Project', projectSchema);
