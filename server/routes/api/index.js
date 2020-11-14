/**
 * App routes
 */

const MainRouter = require('express').Router();
const ProfileRoutes = require('./profiles.routes');

MainRouter.use('/profiles', ProfileRoutes);

module.exports = MainRouter;
