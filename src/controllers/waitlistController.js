const Waitlist = require('../models/Waitlist');
const { sendEmail } = require('../services/emailService');
const { welcomeEmail, adminNotification } = require('../services/templates');

const joinWaitlist = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existing = await Waitlist.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const newUser = await Waitlist.create({ name, email, role });

    // Send emails
    await sendEmail(email, 'Welcome to Apprelab', welcomeEmail(name, role));
    await sendEmail(process.env.ADMIN_EMAIL, 'New Waitlist Signup', adminNotification(name, email, role));

    res.status(201).json({ success: true, message: 'Joined waitlist successfully', data: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { joinWaitlist };
