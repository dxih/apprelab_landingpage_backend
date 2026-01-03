const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

AdminSchema.methods.matchPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);
