// import Scenario from '../models/Scenerio.js';
// import express from 'express';
// import User from '../models/user.js';
import Scenario from '../models/Scenerio.js';
import User from '../models/user.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, scenarioId, conversations } = req.body;
  console.log(req.body);
  //getting the userId and scnerio ID and the conversations
  console.log('user hitted the  update progress');

  try {
    // Find the user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the scenario by scenarioId to get target words
    const scenario = await Scenario.findById(scenarioId);
    if (!scenario) {
      return res.status(404).json({ message: 'Scenario not found' });
    }

    const targetWords = scenario.targetWords;

    // Find the progress for the specific scenario
    const progressIndex = user.progress.findIndex(
      (p) => p.scenario.toString() === scenarioId
    );

    let completedWords = [];
    if (progressIndex === -1) {
      // If no progress exists for this scenario, create a new entry
      user.progress.push({
        scenario: scenarioId,
        history: conversations,
        completedWords: [],
      });
    } else {
      // If progress exists, update the history with both user and model conversations
      user.progress[progressIndex].history.push(...conversations);
      completedWords = user.progress[progressIndex].completedWords;
    }

    // Update the completed words
    conversations.forEach((conv) => {
      if (conv.role === 'user') {
        targetWords.forEach((word) => {
          if (conv.content.includes(word) && !completedWords.includes(word)) {
            completedWords.push(word);
          }
        });
      }
    });

    // Save the completed words back to progress
    if (progressIndex === -1) {
      user.progress[user.progress.length - 1].completedWords = completedWords;
    } else {
      user.progress[progressIndex].completedWords = completedWords;
    }

    // Save the user document
    await user.save();

    res.status(200).json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Error updating progress' });
  }
});

export default router;
