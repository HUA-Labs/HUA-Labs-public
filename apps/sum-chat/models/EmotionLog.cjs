const mongoose = require('mongoose');

const EmotionLogSchema = new mongoose.Schema({
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

module.exports = mongoose.models.EmotionLog || mongoose.model('EmotionLog', EmotionLogSchema);