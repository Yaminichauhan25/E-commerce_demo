import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userDetails' },
  deviceId: String,
  token: String,
});

export const Session = mongoose.model('Session', sessionSchema);