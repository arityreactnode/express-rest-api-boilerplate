module.exports = {
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: '1h',
  mailHost: process.env.MAIL_HOST,
  mailUsername: process.env.MAIL_USERNAME,
  mailPassword: process.env.MAIL_PASSWORD,
  mailport: process.env.MAIL_PORT,
  smtpsecure: process.env.MAIL_SMTP_SECURE,
  emailfrom: process.env.EMAIL_FROM,
};
