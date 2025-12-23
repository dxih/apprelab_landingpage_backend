const welcomeEmail = (name, role) => `
  <h1>Welcome to Apprelab, ${name}!</h1>
  <p>Thank you for joining our waitlist as a <b>${role}</b>.</p>
  <p>We will keep you updated with the latest news and resources.</p>
`;

const adminNotification = (name, email, role) => `
  <h1>New Waitlist Signup</h1>
  <p>Name: ${name}</p>
  <p>Email: ${email}</p>
  <p>Role: ${role}</p>
  <p>Date: ${new Date().toLocaleString()}</p>
`;

const contactAdminNotification = (fullName, email, message) => `
  <h1>New Contact Message</h1>
  <p>Full Name: ${fullName}</p>
  <p>Email: ${email}</p>
  <p>Message: ${message}</p>
  <p>Date: ${new Date().toLocaleString()}</p>
`;

module.exports = { welcomeEmail, adminNotification, contactAdminNotification };
