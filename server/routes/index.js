const mainAppRoutes = require('./api');

const Routes = (app) => {
  app = app || {};
  ///
  // @description app.use("/path", dirPath) specifies the endpoint/route that points
  // to an internal directory that houses a separate JS file with the specific,
  // defined route logic.
  ///

  // List route modules for 'main' api routes
  // e.g. /api, /admin
  app.use('/api', mainAppRoutes);
};

module.exports = Routes;
