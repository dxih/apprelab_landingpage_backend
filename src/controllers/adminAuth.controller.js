const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && await admin.matchPassword(password)) {
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { loginAdmin };
