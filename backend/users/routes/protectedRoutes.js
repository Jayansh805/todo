import express from 'express';
import { requireAuth } from '../middlewares/auth.js';
import User from '../model/model.js';

const router = express.Router();

router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // fetch fresh data from DB
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: `Welcome, ${user.name}`, data: user.data }); // return latest todos
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;