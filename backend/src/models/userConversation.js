import mongoose from 'mongoose';
const ConversationSchema = new mongoose.Schema({
  user_id: {
    type: String,
    // ref: 'User',
    required: true,
  },
  scenario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scenario',
    required: true,
  },
  conversation: [
    {
      role: {
        type: String, // 'user' or 'model'
        enum: ['user', 'model'],
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to update the timestamp on new conversation
ConversationSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;
