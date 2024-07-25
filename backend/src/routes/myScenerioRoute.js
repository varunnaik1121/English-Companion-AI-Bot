import Scenario from '../models/Scenerio.js';
import express from 'express';
const router = express.Router();

router.get('/getAllScenerios', async (req, res) => {
  console.log('hitted the request');
  try {
    const data = await Scenario.find();
    if (!data) {
      return res.status(404).json({ message: 'Scenerio not found!' });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.json(500, { message: 'error finding the scenerios' });
  }
});

router.post('/addScenerio', async (req, res) => {
  const newScenario = new Scenario({
    name: 'Attending a Music Lesson',
    description:
      'In this scenario, the user attends a music lesson. The other person is a music teacher providing instructions and feedback.',
    targetWords: [
      'music',
      'lesson',
      'instrument',
      'practice',
      'teacher',
      'notes',
      'tune',
      'feedback',
    ],
    subscriptionOnly: true,
    modelPrompt:
      "You're rajesh, a music teacher providing a lesson to a user. Start with a friendly greeting and ask about their instrument and goals, e.g., 'Hello! What instrument are you learning and what would you like to achieve?' Provide instructions and demonstrate techniques. Give feedback on their practice, e.g., 'You did well with the notes, but let's work on the timing.' Answer any music-related questions they have. If asked about unrelated topics, respond politely with statements like 'I don't know about that' or Let's stick to this topic.always remember dont answer the questions like if they ask what you know and about your personal topics and also dont assume like you are a real music teacher so u will never know the topics outside this like giving information about other things",
    firstText: 'Hello iam your music teacher today how may i help u?',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BP8_8WnFgM7cYGSrirRGHhCsr0414JjpaA&s',
  });

  try {
    const savedScenario = await newScenario.save();
    console.log('Scenario added successfully:', savedScenario);
    return res.status(201).json('Scenerio created', savedScenario);
  } catch (err) {
    console.error('Error adding scenario:', err);
    return res.status(500).json({ message: 'Error adding Scenerio' });
  }
});

export default router;
