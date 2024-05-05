/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, ipLogger } = app;
  const jwtErr = middleware.jwtErr(app.config.jwt);
  const ip = middleware.ipLogger();
  router.post('/login', controller.user.passwordLogin);
  router.post('/register', ip, controller.user.register);

};
