///
// Api middleware grouping -- where we set which routes have which middleware e.g. params, auth, etc
///

const validateParamsMiddleware = require('../../middleware/params');

const profilesMiddleware = {
  getProfileDetails: [validateParamsMiddleware],
  getProfilesList: [],
};

module.exports = {
  profilesMiddleware,
};
