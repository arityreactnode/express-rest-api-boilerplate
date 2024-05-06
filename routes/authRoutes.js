const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authentication');
const { verifyValidation, registerValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation, changePasswordValidation } = require('../validations/auth');
const validatereq = require('../middleware/validate');


const router = express.Router();

router.get('/who', authenticate, authController.who);
router.get('/verify', validatereq(verifyValidation), authController.verify);
router.post('/register', validatereq(registerValidation), authController.register);
router.post('/login', validatereq(loginValidation), authController.login);
router.post('/forgot-password', validatereq(forgotPasswordValidation), authController.forgotpassword);
router.post('/reset-password', validatereq(resetPasswordValidation), authController.resetPassword);
router.put('/change-password', authenticate, validatereq(changePasswordValidation), authController.changePassword);

module.exports = router;
