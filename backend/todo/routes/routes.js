import express from 'express';
import { requireAuth } from '../../users/middlewares/auth.js';
import { addTodo, deleteTodo, editTodo } from '../controllers/controllers.js';
const router = express.Router();

router.post('/addTodo', requireAuth, addTodo);

router.delete('/deleteTodo/:index', requireAuth, deleteTodo);

router.put('/editTodo/:index', requireAuth, editTodo);

export default router;