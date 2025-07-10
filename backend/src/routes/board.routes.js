import express from 'express';
import  { createBoard ,getBoards} from '../controllers/board.contoller..js';

const router = express.Router();

// GET /boards - list boards
router.get('/', getBoards);

// POST /boards - create board
router.post('/' , createBoard);

export default router;
