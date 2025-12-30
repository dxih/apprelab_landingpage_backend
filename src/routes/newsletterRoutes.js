const express = require("express");
const router = express.Router();
const { sendEmail } = require("../services/emailService");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    /**
     * 1️⃣ Send welcome email to user
     */
const userEmailResult = await sendEmail({
  to: email,
  subject: "Welcome to Apprelab – Let’s Get Started! 🎉",
  text: `Welcome to Apprelab!

Hi there,

Thanks for joining our newsletter! You’re now part of a community of learners building real-world skills.

Here’s what to expect:
- Updates on new courses and projects
- Exclusive access to WorkLab opportunities
- Tips, resources, and inspiration to boost your skills

Stay tuned for the latest news and projects. 🚀

Cheers,
The Apprelab Team
`,
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: #0057FF; margin: 0; font-size: 24px;">Welcome to Apprelab!</h1>
    </div>
    <p style="font-size: 16px; color: #333;">Hi there,</p>
    <p style="font-size: 16px; color: #333;">Thanks for joining our newsletter! You’re now part of a community of learners building real-world skills.</p>

    <h2 style="color: #0057FF; font-size: 18px; margin-bottom: 10px;">Here’s what to expect:</h2>
    <ul style="font-size: 16px; color: #333; padding-left: 20px;">
      <li>Updates on new courses and projects</li>
      <li>Exclusive access to WorkLab opportunities</li>
      <li>Tips, resources, and inspiration to boost your skills</li>
    </ul>

    <p style="font-size: 16px; color: #333;">Stay tuned for the latest news and projects. 🚀</p>

    <div style="text-align: center; margin-top: 30px;">
      <a href="#" style="text-decoration: none; padding: 12px 24px; background-color: #0057FF; color: #fff; border-radius: 6px; font-weight: bold;">Visit Apprelab</a>
    </div>

    <p style="font-size: 14px; color: #888; margin-top: 20px; text-align: center;">
      You’re receiving this email because you signed up for the Apprelab newsletter.<br>
      <a href="#" style="color: #0057FF;">Unsubscribe</a> at any time.
    </p>
  </div>
  `,
});


    if (!userEmailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send welcome email",
      });
    }

    /**
     * 2️⃣ Notify admin (DO NOT block response if this fails)
     */
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Newsletter Signup 🚀",
      text: `New user joined the newsletter: ${email}`,
      html: `
        <h3>New Newsletter Signup</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    }).catch((err) => {
      console.error("❌ Admin notification failed:", err.message);
    });

    /**
     * 3️⃣ Respond to frontend
     */
    res.status(200).json({
      success: true,
      message: "Newsletter email sent",
    });
  } catch (error) {
    console.error("❌ Newsletter error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
