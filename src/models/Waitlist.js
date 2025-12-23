const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid']
  },
  role: {
    type: String,
    enum: ['learner', 'mentor', 'sme'],
    required: [true, 'Role is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

waitlistSchema.index({ email: 1 }); // improves lookup speed
module.exports = mongoose.model('Waitlist', waitlistSchema);
