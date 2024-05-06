const { body, query } = require("express-validator");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(passwordRegex).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),
    body('fullname').matches(/^[a-zA-Z !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/).withMessage('Name must only contain letters and special characters').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
]

const verifyValidation = [
    query('token').trim().notEmpty().withMessage('Invalid Token!'),
]

const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(passwordRegex).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),
]

const changePasswordValidation = [
    body('oldPassword').notEmpty().withMessage('Old password is required').isLength({ min: 8 }).withMessage('Old password must be at least 8 characters long'),
    body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(passwordRegex).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),
]

const forgotPasswordValidation = [
    body('email').isEmail(),
]

const resetPasswordValidation = [
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(passwordRegex).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),
    body('confirmNewPassword').custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
]

module.exports = { registerValidation, verifyValidation, loginValidation, changePasswordValidation, forgotPasswordValidation, resetPasswordValidation };