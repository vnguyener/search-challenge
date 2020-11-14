const { validationResult } = require('express-validator');
const httpStatus = require('http-status');

const validateParams = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    httpStatus: httpStatus.UNPROCESSABLE_ENTITY,
    error: 'Validation error(s) has occurred.',
    validationErrors: extractedErrors,
  });
};

module.exports = validateParams;
