const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: String,
  type: String,
  location: String,
  shortDescription: String,
  description: String,
  responsibilities: [String],
  requirements: [String],
  niceToHave: [String],
  offer: [String],
  applicationLink: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', JobSchema);
