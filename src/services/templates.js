const welcomeEmail = (name, role) => {
  const text = `Hello ${name},

I'm Chibueze Joshua, Chief Operations Officer at Apprelab.
Thank you for joining our waitlist.`;

  if (role === "learner") {
    return {
      subject: "Welcome to Apprelab – You're on the List 🎉",
      text,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0;">
            <img
              src="https://res.cloudinary.com/dtfgxixse/image/upload/v1767297125/apprelab_icon_mxfweq.png"
              alt="Apprelab Icon"
              width="80"
              height="80"
              style="display: inline-block;"
            />
          </div>

          <p>Hello ${name},</p>

          <p>
            I'm <strong>Chibueze Joshua</strong>, Co-founder and Chief Operations Officer at Apprelab.
            Thank you for joining our waitlist.
          </p>

          <p>
            We're building Apprelab for people who want to learn practical skills,
            grow their capabilities, and access meaningful opportunities affordably.
          </p>

          <p><strong>What We're Building for You:</strong></p>

          <ul>
            <li><strong>Affordable, Practical Learning</strong> – Beginner-friendly courses with hands-on lessons and clear learning paths.</li>
            <li><strong>Real Project Experience</strong> – Work on practical projects that build your confidence and portfolio.</li>
            <li><strong>Dedicated Mentorship</strong> – Guidance from mentors who help you stay on track.</li>
            <li><strong>Work Opportunities</strong> – Access internships, gigs, and employment pathways as you learn.</li>
            <li><strong>Supportive Community</strong> – Connect with learners and creators to share progress and ask questions.</li>
            <li><strong>Continuous Growth</strong> – Consistent support to help you develop faster and smarter.</li>
          </ul>

          <p>You'll be among the first to know when we launch 🚀</p>

          <p>Welcome to Apprelab — we're glad to have you with us.</p>

          <p>
            Best regards,<br/>
            <strong>Chibueze Joshua</strong><br/>
            Chief Operations Officer<br/>
            Apprelab
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;" />

          <p style="text-align: center; font-size: 14px; color: #555;">
            Follow us for more updates and opportunities 🚀
          </p>

          <div style="text-align: center; margin-top: 12px;">
            <a href="https://twitter.com/apprelab" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="X (Twitter)"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>

            <a href="https://www.linkedin.com/company/apprelab" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>

            <a href="https://www.instagram.com/apprelab" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                alt="Instagram"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>

            <a href="https://www.facebook.com/share/16ZSJVe8eu/" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px 0;">
            <img
              src="https://res.cloudinary.com/dtfgxixse/image/upload/v1767297122/apprelab_logo_swiyew.png"
              alt="Apprelab Logo"
              width="150"
              style="display: inline-block;"
            />
          </div>

          <p style="text-align: center; font-size: 12px; color: #888; margin-top: 16px;">
            © ${new Date().getFullYear()} Apprelab. All rights reserved.
          </p>
        </div>
      `,
    };
  }

  if (role === "mentor") {
    return {
      subject: "Welcome to Apprelab Mentors – Excited to Have You",
      text,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0;">
            <img
              src="https://res.cloudinary.com/dtfgxixse/image/upload/v1767297125/apprelab_icon_mxfweq.png"
              alt="Apprelab Icon"
              width="80"
              height="80"
              style="display: inline-block;"
            />
          </div>

          <p>Hello ${name},</p>

          <p>
            I'm <strong>Chibueze Joshua</strong>, Co-founder and Chief Operations Officer at Apprelab.
            Thank you for joining our mentor waitlist.
          </p>

          <p>
            Apprelab provides a platform where professionals can teach, mentor,
            earn income, and build their reputation.
          </p>

          <p><strong>What You Can Expect as a Mentor:</strong></p>

          <ul>
            <li><strong>Create Impactful Courses</strong></li>
            <li><strong>Guide Learners on Real Projects</strong></li>
            <li><strong>Host Private Bootcamps</strong></li>
            <li><strong>Access Work Opportunities</strong></li>
            <li><strong>Performance-Based Ranking</strong></li>
            <li><strong>Monetize Your Expertise</strong></li>
            <li><strong>Build Your Professional Brand</strong></li>
          </ul>

          <p>You'll receive platform access when we launch.</p>

          <p>
            Best regards,<br/>
            <strong>Chibueze Joshua</strong><br/>
            Chief Operations Officer<br/>
            Apprelab
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;" />

          <p style="text-align: center; font-size: 14px; color: #555;">
            Follow us for more updates and opportunities 🚀
          </p>

          <div style="text-align: center; margin-top: 12px;">
            <a href="https://twitter.com/apprelab" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="X (Twitter)"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>

            <a href="https://www.linkedin.com/company/apprelab" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>

            <a href="https://www.instagram.com/apprelab" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                alt="Instagram"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>

            <a href="https://www.facebook.com/share/16ZSJVe8eu/" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px 0;">
            <img
              src="https://res.cloudinary.com/dtfgxixse/image/upload/v1767297122/apprelab_logo_swiyew.png"
              alt="Apprelab Logo"
              width="150"
              style="display: inline-block;"
            />
          </div>

          <p style="text-align: center; font-size: 12px; color: #888; margin-top: 16px;">
            © ${new Date().getFullYear()} Apprelab. All rights reserved.
          </p>
        </div>
      `,
    };
  }

  if (role === "sme") {
    return {
      subject: "Welcome to Apprelab – Your Talent Solution Partner",
      text,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0;">
            <img
              src="https://res.cloudinary.com/dtfgxixse/image/upload/v1767297125/apprelab_icon_mxfweq.png"
              alt="Apprelab Icon"
              width="80"
              height="80"
              style="display: inline-block;"
            />
          </div>

          <p>Hello ${name},</p>

          <p>
            I'm <strong>Chibueze Joshua</strong>, Co-founder and Chief Operations Officer at Apprelab.
            Thank you for joining our waitlist.
          </p>

          <p>
            Apprelab connects businesses with skilled professionals trained on real-world projects.
          </p>

          <p><strong>What We Offer Hiring Partners:</strong></p>

          <ul>
            <li><strong>Easy Job Posting</strong></li>
            <li><strong>Pre-Vetted, Project-Ready Talent</strong></li>
            <li><strong>Efficient Hiring Process</strong></li>
            <li><strong>Training Partnerships</strong></li>
            <li><strong>Brand Visibility</strong></li>
            <li><strong>Streamlined Recruitment</strong></li>
          </ul>

          <p>
            Best regards,<br/>
            <strong>Chibueze Joshua</strong><br/>
            Co-founder & Chief Operations Officer<br/>
            Apprelab
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;" />

          <p style="text-align: center; font-size: 14px; color: #555;">
            Follow us for more updates and opportunities 🚀
          </p>

          <div style="text-align: center; margin-top: 12px;">
            <a href="https://twitter.com/apprelab" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="X (Twitter)"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>

            <a href="https://www.linkedin.com/company/apprelab" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>

            <a href="https://www.instagram.com/apprelab" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                alt="Instagram"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>

            <a href="https://www.facebook.com/share/16ZSJVe8eu/" target="_blank" style="margin: 0 8px;">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                width="24"
                height="24"
                style="vertical-align: middle;"
              />
            </a>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px 0;">
            <img
              src="https://res.cloudinary.com/dtfgxixse/image/upload/v1767297122/apprelab_logo_swiyew.png"
              alt="Apprelab Logo"
              width="150"
              style="display: inline-block;"
            />
          </div>

          <p style="text-align: center; font-size: 12px; color: #888; margin-top: 16px;">
            © ${new Date().getFullYear()} Apprelab. All rights reserved.
          </p>
        </div>
      `,
    };
  }
};

/* ✅ Admin notification email with branding */
const adminNotification = (name, email, role) => {
  return {
    subject: "📥 New Apprelab Waitlist Signup",
    text: `
New waitlist signup:

Name: ${name}
Email: ${email}
Role: ${role}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <img
            src="https://res.cloudinary.com/dtfgxixse/image/upload/v1767297125/apprelab_icon_mxfweq.png"
            alt="Apprelab Icon"
            width="80"
            height="80"
            style="display: inline-block;"
          />
        </div>

        <h3 style="color: #333;">📥 New Waitlist Signup</h3>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong>Role:</strong> ${role}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px 0;">
          <img
            src="https://res.cloudinary.com/dtfgxixse/image/upload/v1767297122/apprelab_logo_swiyew.png"
            alt="Apprelab Logo"
            width="150"
            style="display: inline-block;"
          />
        </div>

        <p style="text-align: center; font-size: 12px; color: #888; margin-top: 16px;">
          © ${new Date().getFullYear()} Apprelab. All rights reserved.
        </p>
      </div>
    `,
  };
};

/* ✅ Contact form admin notification */
const contactAdminNotification = (fullName, email, message) => {
  return {
    subject: "📬 New Contact Form Message",
    text: `
New contact form submission:

From: ${fullName}
Email: ${email}

Message:
${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <img
            src="https://res.cloudinary.com/dtfgxixse/image/upload/v1767297125/apprelab_icon_mxfweq.png"
            alt="Apprelab Icon"
            width="80"
            height="80"
            style="display: inline-block;"
          />
        </div>

        <h3 style="color: #333;">📬 New Contact Form Submission</h3>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>From:</strong> ${fullName}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
        </div>

        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #0057FF; margin: 20px 0;">
          <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px 0;">
          <img
            src="https://res.cloudinary.com/dtfgxixse/image/upload/v1767297122/apprelab_logo_swiyew.png"
            alt="Apprelab Logo"
            width="150"
            style="display: inline-block;"
          />
        </div>

        <p style="text-align: center; font-size: 12px; color: #888; margin-top: 16px;">
          © ${new Date().getFullYear()} Apprelab. All rights reserved.
        </p>
      </div>
    `,
  };
};

module.exports = {
  welcomeEmail,
  adminNotification,
  contactAdminNotification, // Add this export
};