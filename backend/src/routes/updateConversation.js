import express from 'express';
import Conversation from '../models/userConversation.js';
const router = express.Router();

//created a demo api to update the conversation
//THings to Do here are: send the raw conversation to this but only the last two only... that means [{model},{user}]

router.post('/', async (req, res) => {
  const { user_id, scenario_id, conversations } = req.body;
  console.log('api hitted the conversations');
  //TODO:check if the user is there or not and return the error

  //user_id
  //scenario_id
  //conversation will be array of 2 objects everytime(need to be modifesa as {role:"",text:""})
  console.log(user_id, scenario_id, conversations);
  if (!user_id || !scenario_id) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  try {
    let conversation = await Conversation.findOne({ user_id, scenario_id });
    console.log({ conversation });

    let updatedConversation = conversations.map((item) => {
      return {
        role: item.role,
        text: item.parts[0].text,
      };
    });

    if (!conversation) {
      conversation = new Conversation({
        user_id,
        scenario_id,
        conversation: updatedConversation,
      });
      console.log({ conversation });
    } else {
      for (let i = 0; i < updatedConversation.length; i++) {
        conversation.conversation.push(updatedConversation[i]);
      }
    }
    await conversation.save();
    return res.status(200).json({ success: true, conversation });
  } catch (err) {
    console.log(err);
    if (err) {
      return res.status(404).json({ message: 'unexpcted error happened' });
    }
  }
});

export default router;
