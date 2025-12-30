const express = require("express");
const router = express.Router();
const mailgun = require("mailgun-js");

// Initialize Mailgun
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

// POST /newsletter
router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const data = {
    from: "Apprelab <noreply@apprelab.com>",
    to: email,
    subject: "Welcome to Apprelab Newsletter 🎉",
    text: "Thanks for joining our newsletter! We’ll keep you updated with the latest courses, projects, and opportunities."
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to send email" });
    }
    res.json({ message: "Newsletter email sent successfully", body });
  });
});

module.exports = router;
