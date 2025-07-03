import express from 'express';

const router = express.Router();
import { joinus, login } from '../controllers/controllers.js';
// Joinus route
router.post('/joinus', joinus); 
// Login route  
router.post('/login', login);
// Export the router
export default router;