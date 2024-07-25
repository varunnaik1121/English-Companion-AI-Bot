import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Unique identifier for each user
  email: { type: String, required: true, unique: true }, // User's email address
  // User's password (hashed and salted in a real application)
  subscriptionStatus: { type: Boolean, default: false }, // Subscription status of the user
  progress: [
    {
      scenario: { type: mongoose.Schema.Types.ObjectId, ref: 'Scenario' }, // Reference to scenario documents
      points: { type: Number, default: 0 }, // Points earned in the scenario
      completedTasks: { type: [String], default: [] }, // Array of completed tasks in the scenario
      completedWords: { type: [String], default: [] }, // Array of completed words in the scenario
      history: [
        {
          role: { type: String, required: true }, // Role in the conversation (user or model)
          content: { type: String, required: true }, // Content of the message
        },
      ],
    },
  ],
});

const User = mongoose.model('User', userSchema);
export default User;
