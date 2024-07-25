import User from '../models/user.js';
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, email } = req.body;
  console.log(email);
  if (!userId || !email) {
    return res.status(403).json({ message: 'not authenticated' });
  }
  const user = await User.findOne({ userId, email });
  console.log(user);
  if (!user) {
    try {
      const createdUser = new User({
        userId,
        email: email.toString(),
      });
      await createdUser.save();
      return res.status(200).json({ userDetails: createdUser });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'error creating user' });
    }
  }
  return res.send('user already created');
});

router.post('/getUser', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ userId });

    //get the user by ID
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'something went wrong' });
  }
});

export default router;
