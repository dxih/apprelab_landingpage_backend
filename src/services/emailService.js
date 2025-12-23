const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// send email function
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Apprelab" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Email Error:', error.message);
  }
};

module.exports = { sendEmail };
