import mongoose from 'mongoose';
const scenarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  targetWords: [String],
  subscriptionOnly: { type: Boolean, default: false },
  modelPrompt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  firstText: { type: String, required: true }, // Add this field
});

const Scenario = mongoose.model('Scenario', scenarioSchema);
export default Scenario;
