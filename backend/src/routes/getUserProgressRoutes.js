import Scenario from '../models/Scenerio.js';
import express from 'express';
import User from '../models/user.js';

const router = express.Router();

///api/getUserProgress/
router.post('/', async (req, res) => {
  const { userId, scenarioId } = req.body;

  try {
    const user = await User.findOne({ userId });
    console.log({ user });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const progress = user.progress.find(
      (p) => p.scenario.toString() === scenarioId
    );

    if (!progress) {
      return res.status(200).json({ progress: null });
    }

    res.status(200).json({ progress });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ message: 'Error fetching user progress' });
  }
});

export default router;
