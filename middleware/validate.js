const { validationResult } = require("express-validator");
const apiResponse = require('../helpers/apiResponse');

const validatereq = (validationRules) => {
    return async (req, res, next) => {
        await Promise.all(validationRules.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
        }
        next();
    };
};

module.exports = validatereq;
