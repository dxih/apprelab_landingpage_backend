const mongoose = require('mongoose');

const BlogSectionSchema = new mongoose.Schema(
  {
    heading: String,
    text: String,
    image: String,
  },
  { _id: false }
);

const CommentSchema = new mongoose.Schema(
  {
    name: String,
    comment: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: String,
    category: String,
    author: String,
    date: String,
    content: [BlogSectionSchema],
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);
