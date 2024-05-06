const rateLimit = require('express-rate-limit');
const { rateLimitResponse } = require('../helpers/apiResponse');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    return rateLimitResponse(res, 'too many requests from this IP, please try again later after 5 minute.')
  },
});

module.exports = limiter;
