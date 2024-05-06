const nodemailer = require("nodemailer");
const { mailHost, mailPassword, mailUsername, mailport, smtpsecure, emailfrom } = require("../config/config");
const logger = require("./logger");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: mailHost,
	port: mailport,
	secure: smtpsecure,
	auth: {
		user: mailUsername,
		pass: mailPassword
	},
});


exports.sendMail = function (from, to, subject, html) {
	const mailOptions = {
		from: from,
		to: to,
		subject: subject,
		replyTo: emailfrom,
		html: html
	};
	return transporter.sendMail(mailOptions)
		.then((res) => {
			logger.info('Email sent successfully:', res.messageId);
		})
		.catch((error) => {
			console.log(error);
			logger.error('Error sending email:', error.message);
			throw error;
		});
};
