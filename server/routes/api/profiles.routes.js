const express = require('express');
const { param } = require('express-validator');
const httpStatus = require('http-status');
const { profilesMiddleware } = require('./middleware');
const router = express.Router();

///
//   GET: "/:id" - Returns profile information given the id
///

router.get(
  '/:id',
  [
    param('id')
      .exists()
      .withMessage('Profile identifier is required.')
      .bail()
      .matches(/\d/)
      .withMessage('Profile identifier must be a number.'),
  ],
  profilesMiddleware.getProfile,
  getProfileDetails
);

async function getProfileDetails(req, res) {
  const { id } = req.params;



  try {
    return res.status(httpStatus.OK).json({
      success: true,
      httpStatus: httpStatus.OK,
      details: 'ok',
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: true,
      httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
      message: err && err.message ? err.message : 'Unexpected error has occurred.',
    });
  }
}

module.exports = router;
