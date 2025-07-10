import { Board } from '../models/board.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Task } from '../models/task.model.js';  

// GET /boards - List boards along with tasks
export const getBoards = async (req, res) => {
  try {
    // Fetch all boards
    const boards = await Board.find();

    if (!boards.length) {
      return res.status(404).json({
        statusCode: 404,
        message: 'No boards found',
        data: null
      });
    }

    // Fetch tasks for each board
    const boardWithTasks = await Promise.all(
      boards.map(async (board) => {
        const tasks = await Task.find({ boardId: board._id });  // Get tasks for this board
        board.tasks = tasks;  // Attach tasks to the board
        return board;
      })
    );

    return res.status(200).json(new ApiResponse(200, 'Boards fetched successfully', boardWithTasks));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      data: null
    });
  }
};



// POST /boards - Create board
export const createBoard = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Board name is required',
        data: null
      });
    }

    const newBoard = new Board({ name });
    const board = await newBoard.save();

    return res.status(201).json(new ApiResponse(201, 'Board created successfully', board));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      data: null
    });
  }
};
