import express from 'express';
import  {createTask ,deleteTask ,getTasksInBoard ,updateTask} from '../controllers/task.controller.js';

const router = express.Router();

// GET /boards/:boardId/tasks - get tasks in a board
router.get('/:boardId', getTasksInBoard);

// POST /boards/:boardId/tasks - create task in a board
router.post('/:boardId', createTask);

// PUT /tasks/:taskId - update task
router.put('/:taskId', updateTask);

// DELETE /tasks/:taskId - delete task
router.delete('/:taskId', deleteTask);


export default router;
