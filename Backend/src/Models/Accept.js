import mongoose from 'mongoose';
const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    action: String, // "Task Assigned", "Task Completed"
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  },
  { timestamps: true }
);

export const AcceptLog = mongoose.model('AcceptLog', activityLogSchema);
