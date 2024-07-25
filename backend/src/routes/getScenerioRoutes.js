import Scenario from '../models/Scenerio.js';
import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

router.get('/', async (req, res) => {
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

router.post('/getScenerioById', async (req, res) => {
  console.log('hitted the id request');
  const { id } = req.body;
  console.log(id);
  //   if (!id || !mongoose.Types.ObjectId.isValid(id)) {
  //     return res.status(400).json({ message: 'Invalid or missing scenario ID' });
  //   }
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const data = await Scenario.findOne({ _id: id });
    console.log(data);
    if (!data) {
      return res.status(404).json({ message: 'scenerio not found in db' });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error fetching the scenerio' });
  }
});

export default router;
