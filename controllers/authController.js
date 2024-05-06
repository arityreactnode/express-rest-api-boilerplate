const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const Token = require('../models/Token');
const apiResponse = require('../helpers/apiResponse');
const { sendMail } = require('../helpers/mailer');
const { generateToken } = require('../helpers/utils');
const limiter = require('../middleware/rateLimit');
const { resetPassword } = require('../mailTemplate/resetPassword');
const { verifyUser } = require('../mailTemplate/verifyUser');


exports.register = [
  async (req, res) => {
    try {
      const { email, password, fullname } = req.body;
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return apiResponse.validationErrorWithData(res, 'User already exists', '');
      }

      // Create a new user
      const newUser = new User({ email, password, fullname });

      // Save the user to the database
      const saveduser = await newUser.save();

      const token = generateToken();
      await Token.create({
        userId: saveduser.id,
        token
      })
      let verifylink = `${process.env.API_URL}/api/auth/verify?token=${token}`
      await sendMail(config.emailfrom, saveduser.email, 'Verify Account', 'verify', { verifylink })
      return apiResponse.successResponseWithData(res, `User registered successfully, Verification mail send to ${email}`, newUser);
    } catch (error) {
      return apiResponse.errorResponse(res, error.message);
    }
  }
]

exports.verify = [
  async (req, res) => {
    try {
      const { token } = req.query
      const checktoken = await Token.findOne({ token }).populate('userId');
      if (!checktoken) {
        return apiResponse.notFoundResponse(res, 'Invalid Token! , Login To Generate New one')
      }
      const user = await User.findById(checktoken.userId._id);
      user.verify = true
      user.active = true
      await user.save();
      await Token.findByIdAndDelete(checktoken._id);
      const redirectUrl = process.env.APP_URL;
      return res.redirect(redirectUrl);
    } catch (error) {
      return apiResponse.errorResponse(res, error.message);
    }
  },
];

exports.login = [
  limiter,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return apiResponse.unauthorizedResponse(res, 'User Not Found');
      }
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return apiResponse.unauthorizedResponse(res, 'Invalid Password');
      }
      if (!user.verify) {
        const verifytoken = generateToken();
        await Token.create({
          userId: user._id,
          token: verifytoken
        })
        let verifylink = `${process.env.API_URL}/api/auth/verify?token=${verifytoken}`
        await sendMail(config.emailfrom, user.email, 'Verify Account', verifyUser(verifylink))
        return apiResponse.unauthorizedResponse(res, 'Please Verify Your Account!,Verification Mail Send To Your Email');
      }
      if (!user.active) {
        return apiResponse.unauthorizedResponse(res, 'Account Block , Please Contact us');
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
      });

      const data =
      {
        user: {
          id: user._id,
          email: user.email,
          fullname: user.fullname,
        },
        token,
        expiresIn: config.jwtExpiresIn,
      }

      // Return user data, token, and expiration time in the response
      return apiResponse.successResponseWithData(res, 'Login Successfully', data);
    } catch (error) {
      return apiResponse.errorResponse(res, error.message);
    }
  },
];

exports.who = [
  async (req, res) => {
    try {
      const userid = req.userId;
      if (!userid) {
        return apiResponse.unauthorizedResponse(res, 'No user found. Token may be invalid or expired.');
      }
      const userdata = await User.findById(userid);
      return apiResponse.successResponseWithData(res, 'User found', userdata);
    } catch (error) {
      return apiResponse.errorResponse(res, error.message);
    }
  },
];

exports.changePassword = [
  async (req, res) => {
    try {
      if (!req.userId) {
        return apiResponse.errorResponse(res, 'Invalid Token!');
      }
      const user = await User.findById(req.userId);
      if (!user) {
        return apiResponse.errorResponse(res, 'User not found');
      }
      const isPasswordValid = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!isPasswordValid) {
        return apiResponse.validationErrorWithData(res, 'Validation Error', 'Invalid old password');
      }
      user.password = req.body.newPassword;
      await user.save();
      return apiResponse.successResponse(res, 'Password changed successfully');
    } catch (error) {
      return apiResponse.errorResponse(res, error.message);
    }
  }
]

exports.forgotpassword = [
  async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return apiResponse.errorResponse(res, 'User not found');
      }
      const token = generateToken();
      await Token.create({
        userId: user._id,
        token
      })
      let resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;
      await sendMail(config.emailfrom, user.email, 'Password Reset', resetPassword(resetUrl))
      return apiResponse.successResponse(res, `Please check your mail,mail send to ${user.email}`);
    } catch (error) {
      return apiResponse.errorResponse(res, error.message);
    }
  }
]

exports.resetPassword = [
  async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      const tokenDoc = await Token.findOne({ token });
      if (!tokenDoc) {
        return apiResponse.notFoundResponse(res, 'Invalid or expired token');
      }
      const user = await User.findById(tokenDoc.userId);
      if (!user) {
        return apiResponse.errorResponse(res, 'User not found');
      }
      user.password = newPassword;
      await user.save();
      await Token.deleteOne({ token });

      return apiResponse.successResponse(res, 'Password reset successful');
    } catch (error) {
      return apiResponse.errorResponse(res, error.message);
    }
  }
]