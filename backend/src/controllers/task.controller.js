import mongoose from 'mongoose';
import { Task } from '../models/task.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Helper to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /tasks/board/:boardId - Get tasks in a board
export const getTasksInBoard = async (req, res) => {
  const { boardId } = req.params;

  try {
    if (!isValidObjectId(boardId)) {
      throw new ApiError(400, 'Invalid board ID');
    }

    const tasks = await Task.find({ boardId });

    if (!tasks.length) {
      throw new ApiError(404, 'No tasks found for this board');
    }

    const response = new ApiResponse(200, 'Tasks fetched successfully', tasks);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
      data: error.data || null,
    });
  }
};

// POST /tasks/board/:boardId - Create task in a board
export const createTask = async (req, res) => {
  const { boardId } = req.params;
  const { title, description, status, priority, assignedTo, dueDate } = req.body;

  try {
    if (!isValidObjectId(boardId)) {
      throw new ApiError(400, 'Invalid board ID');
    }

    if (!title || !description) {
      throw new ApiError(400, 'Title and description are required');
    }

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      boardId,
    });

    const task = await newTask.save();

    const response = new ApiResponse(201, 'Task created successfully', task);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
      data: error.data || null,
    });
  }
};

// PUT /tasks/:taskId - Update a task
export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updateFields = req.body;

  try {
    if (!isValidObjectId(taskId)) {
      throw new ApiError(400, 'Invalid task ID');
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, { new: true });

    if (!updatedTask) {
      throw new ApiError(404, 'Task not found');
    }

    const response = new ApiResponse(200, 'Task updated successfully', updatedTask);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
      data: error.data || null,
    });
  }
};

// DELETE /tasks/:taskId - Delete a task
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    if (!isValidObjectId(taskId)) {
      throw new ApiError(400, 'Invalid task ID');
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      throw new ApiError(404, 'Task not found');
    }

    const response = new ApiResponse(200, 'Task deleted successfully', null);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
      data: error.data || null,
    });
  }
};
