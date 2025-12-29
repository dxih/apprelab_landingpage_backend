require("dotenv").config();
const Mailgun = require("mailgun.js");
const FormData = require("form-data");

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: process.env.MAILGUN_BASE_URL, // https://api.mailgun.net or EU
});

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const res = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Apprelab <${process.env.MAIL_FROM}>`,
      to,
      subject,
      html,
      text,
    });

    console.log("✅ Email sent:", res.id);

    return { success: true, id: res.id };
  } catch (err) {
    console.error("❌ Mailgun Error:", err.message);
    return { success: false, message: err.message };
  }
};

module.exports = { sendEmail };
