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
    return res.status(500).json({ message: 'error finding the scenerios' });
  }
});

router.post('/addScenerio', async (req, res) => {
  console.log('route hitted');
  const newScenario = new Scenario({
    name: 'Visiting a Bank',
    description:
      'In this scenario, the user is visiting a bank for financial services. The other person is a bank representative providing assistance.',
    targetWords: [
      'bank',
      'account',
      'deposit',
      'withdrawal',
      'loan',
      'interest',
      'service',
      'balance',
    ],
    subscriptionOnly: false,
    modelPrompt:
      "You're Ms. Davis, a bank representative. Start with a professional greeting and ask about their banking needs, e.g., 'Hello! How can I assist you today?' Guide them through services like deposits, withdrawals, and loans. Discuss interest rates and account balances concisely. Answer any questions about banking procedures and provide necessary forms. Confirm their transactions and offer additional assistance. Ensure they understand the services provided. If asked about unrelated topics, politely respond that you don't know.",
    firstText: 'Hello! How can I assist you with your banking needs today?',
    imageUrl:
      'https://media.istockphoto.com/id/147732062/photo/a-up-close-view-of-the-white-pillared-entrance-of-a-bank.jpg?s=612x612&w=0&k=20&c=zI7yCD8SuwjlAnGj7hKhH1qPBA836KFb6A5mAGRDJ1c=',
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
