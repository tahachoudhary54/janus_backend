const nodemailer = require('nodemailer');

// Setup standard Nodemailer transport
// Note: If using Gmail, it's recommended to use an App Password rather than standard password.
// The user will need to add EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS to their .env file.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials missing. Skipping email send to:', to);
    return;
  }

  const mailOptions = {
    from: `"Janus Gomes" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
