// src/config/mailer.js
// -----------------------------------------------
// Yeh file Nodemailer setup karti hai
// Flask mein tha: smtplib.SMTP_SSL("smtp.gmail.com")
// Node mein same kaam Nodemailer karta hai
// -----------------------------------------------

const nodemailer = require('nodemailer');

// "Transporter" matlab email bhejna ka darwaza
// Flask mein: server = smtplib.SMTP_SSL(...)
//             server.login(sender_email, app_password)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  family: 4, // 👈 yeh line add karo — IPv4 force karti hai
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.APP_PASSWORD,
  }
});

module.exports = transporter;