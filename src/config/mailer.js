const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const transporter = {
  sendMail: async (options) => {
    return await resend.emails.send({
      from: 'Paylance <onboarding@resend.dev>',
      to: options.to,
      subject: options.subject,
      html: options.html || `<p>${options.text}</p>`
    });
  }
};

module.exports = transporter;