const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  console.log('🔐 Auth middleware called for:', req.originalUrl);
  console.log('Authorization header:', req.headers.authorization);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token found, length:', token.length);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded, admin ID:', decoded.id);

      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        console.log('❌ Admin not found in database');
        return res.status(401).json({
          success: false,
          message: 'Admin not found',
        });
      }

      console.log('✅ Admin authenticated:', req.admin.email);
      next();
    } catch (error) {
      console.error('❌ Auth error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
        error: error.message
      });
    }
  } else {
    console.log('❌ No token provided');
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }
};

module.exports = { protect };