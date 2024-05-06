const jwt = require('jsonwebtoken');
const config = require('../config/config');
const apiResponse = require('../helpers/apiResponse');

// Middleware for authenticating JWT tokens
const authenticate = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization');

    if (!token) {
        return apiResponse.unauthorizedResponse(res, 'Authentication failed. Invalid token.')
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), config.jwtSecret);
        req.userId = decoded.userId;
        req.user = decoded
        next();
    } catch (error) {
        return apiResponse.unauthorizedResponse(res, error.message)
    }
};

module.exports = authenticate;
