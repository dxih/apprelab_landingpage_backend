const Contact = require('../models/Contact');
const { sendEmail } = require('../services/emailService');
const { contactAdminNotification } = require('../services/templates');

const sendContactMessage = async (req, res, next) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newMessage = await Contact.create({ fullName, email, message });

    // Notify admin
    await sendEmail(process.env.ADMIN_EMAIL, 'New Contact Message', contactAdminNotification(fullName, email, message));

    res.status(201).json({ success: true, message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendContactMessage };
