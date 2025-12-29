const welcomeEmail = (name, role) => {
  const text = `Hi ${name},

I’m Chibueze Joshua, a Co-founder and the Chief Operations Officer at Apprelab.
Welcome to the waitlist!`;

  if (role === "learner") {
    return {
      subject: "Welcome to Apprelab 🎉",
      text,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Hi ${name},</p>

          <p>
            I’m Chibueze Joshua, a Co-founder and the Chief Operations Officer at Apprelab,
            and I’m really excited to welcome you to our waitlist!
          </p>

          <p>
            Thank you for signing up to be one of the first learners to experience Apprelab.
            We’re building something special for people who want real skills and real opportunities.
          </p>

          <p><strong>What’s coming for you:</strong></p>

          <ul>
            <li>Beginner-friendly courses</li>
            <li>Real-life projects</li>
            <li>Mentorship & support</li>
            <li>Internships and gigs</li>
            <li>A strong learning community</li>
          </ul>

          <p>We’ll notify you as soon as we launch 🚀</p>

          <p>
            Cheers,<br/>
            <strong>Chibueze Joshua</strong><br/>
            COO, Apprelab
          </p>
        </div>
      `,
    };
  }

  if (role === "mentor") {
    return {
      subject: "Welcome to the Apprelab Mentor Waitlist",
      text,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <p>Hi ${name},</p>

                    <p>
            I’m Chibueze Joshua, a Co-founder and the Chief Operations Officer at Apprelab,
          </p>
          <p>
            Welcome to the Apprelab mentor waitlist. We’re building a platform where professionals teach, mentor, and earn.
          </p>

          <p>
            You’ll get early access when we launch.
          </p>

          <p>
            Warm regards,<br/>
            <strong>Chibueze Joshua</strong><br/>
            COO, Apprelab
          </p>
        </div>
      `,
    };
  }

  if (role === "sme") {
    return {
      subject: "Welcome to Apprelab for Businesses",
      text,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <p>Hi ${name},</p>

                    <p>
            I’m Chibueze Joshua, a Co-founder and the Chief Operations Officer at Apprelab,
          </p>

          <p>
            Welcome to Apprelab! We’re building a powerful talent ecosystem for businesses like yours.
          </p>

          <ul>
            <li>Post jobs & gigs</li>
            <li>Access vetted talent</li>
            <li>Hire faster</li>
          </ul>

          <p>
            Warm regards,<br/>
            <strong>Chibueze Joshua</strong><br/>
            COO, Apprelab
          </p>
        </div>
      `,
    };
  }
};

const adminNotification = (name, email, role) => ({
  subject: "New Waitlist Signup",
  text: `New signup:
Name: ${name}
Email: ${email}
Role: ${role}`,
  html: `
    <div style="font-family: Arial, sans-serif;">
      <h3>New Waitlist Signup</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    </div>
  `,
});

module.exports = { welcomeEmail, adminNotification };
