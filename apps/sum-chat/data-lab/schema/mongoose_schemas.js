// users 컬렉션
const UserSchema = {
  user_id: { type: String, required: true, unique: true },
  joined_at: { type: Date, default: Date.now },
  tier: { type: String, default: 'S' } // optional
};

// sessions 컬렉션
const SessionSchema = {
  session_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  start_time: { type: Date, default: Date.now },
  user_id: { type: String, required: true }
};

// messages 컬렉션
const MessageSchema = {
  session_id: { type: String, required: true },
  user_id: { type: String, required: true },
  input: { type: String, required: true },
  response: { type: String, required: true },
  mode: { type: String },
  tone: { type: String },
  tier_a: { type: Number },
  tier_b: { type: String },
  slip: { type: Boolean },
  ethics: { type: [String] },
  timestamp: { type: Date, default: Date.now }
};

module.exports = { UserSchema, SessionSchema, MessageSchema }; 