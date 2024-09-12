import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import myUserRoute from './routes/myUserRoute.js';
import myScenerioRoute from './routes/myScenerioRoute.js';
import updateProgressRoutes from './routes/updateProgressRoutes.js';
import getScenerioRoutes from './routes/getScenerioRoutes.js';
import getUserProgressRoutes from './routes/getUserProgressRoutes.js';
import stripePaymentRoutes from './routes/stripePaymentRoutes.js';
import updateConversation from './routes/updateConversation.js';
import Stripe from 'stripe';

try {
  await mongoose.connect(
    'mongodb+srv://varunnaik1121:21477930varun@cluster0.hjwvb05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/createUser', myUserRoute);
app.use('/api/scenerio', myScenerioRoute);
app.use('/api/getScenerio', getScenerioRoutes);
app.use('/api/updateProgress', updateProgressRoutes);
app.use('/api/getUserProgress', getUserProgressRoutes);
app.use('/api/payment', stripePaymentRoutes);
app.use('/api/updateConversation', updateConversation);

app.listen(7000, () => {
  console.log('server started');
});
