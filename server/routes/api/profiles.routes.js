const express = require('express');
const { param } = require('express-validator');
const httpStatus = require('http-status');
const { profiles } = require('../../models');
const { profilesMiddleware } = require('./middleware');
const router = express.Router();

///
//   GET: "/" - Returns all profiles
//   GET: "/:id" - Returns profile information given the id
///

router.get(
  '',
  profilesMiddleware.getProfilesList,
  getProfilesList
)

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
  profilesMiddleware.getProfileDetails,
  getProfileDetails
);

async function getProfilesList(req, res) {
  try {
    const profilesList = await profiles.getProfilesList();


    return res
    .status(200)
    .json({ success: true, httpStatus: httpStatus.OK, profiles: profilesList });

  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: true,
      httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
      message: err && err.message ? err.message : 'Unexpected error has occurred.',
    });
  }
};

async function getProfileDetails (req, res) {
  const { id } = req.params;

  try {
    const profile = await profiles.getById(parseInt(id));

    if (!profile) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        httpStatus: httpStatus.NOT_FOUND,
        error: `Profile could not be found with the requested id (${id})`,
      });
    } else {
      return res.status(httpStatus.OK).json({
        success: true,
        httpStatus: httpStatus.OK,
        profile,
      });
    }


  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: true,
      httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
      message: err && err.message ? err.message : 'Unexpected error has occurred.',
    });
  }
}

module.exports = router;
