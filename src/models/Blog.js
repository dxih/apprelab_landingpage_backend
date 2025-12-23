const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
