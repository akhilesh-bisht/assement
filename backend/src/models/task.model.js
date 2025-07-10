import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  priority: String,
  assignedTo: String,
  dueDate: Date,
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }
});

const Task = mongoose.model('Task', taskSchema);
export { Task };
