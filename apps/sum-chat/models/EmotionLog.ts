import mongoose, { Schema, models, model } from 'mongoose';

const EmotionLogSchema = new Schema({
  sessionId: { type: String, required: true },
  userId: { type: String, required: true },
  message: { type: String, required: true },
  assistant: { type: String, required: true },
  emotion: { type: String, required: true },
  slip: { type: Boolean, required: true },
  ethics: { type: Boolean, required: true },
  tier: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

export default models.EmotionLog || model('EmotionLog', EmotionLogSchema); 