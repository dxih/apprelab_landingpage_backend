const Waitlist = require("../models/Waitlist");
const { sendEmail } = require("../services/emailService");
const { welcomeEmail, adminNotification } = require("../services/templates");

const joinWaitlist = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existing = await Waitlist.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const newUser = await Waitlist.create({ name, email, role });

    // Welcome email
    const welcome = welcomeEmail(name, role);
    await sendEmail({
      to: email,
      subject: welcome.subject,
      html: welcome.html,
      text: welcome.text,
    });

    // Admin notification
    const admin = adminNotification(name, email, role);
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
    });

    return res.status(201).json({
      success: true,
      message: "Joined waitlist successfully",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { joinWaitlist };
