/**
 * @param {Egg.Application} app - egg application
 */
// const multer = require('./middleware/upload');
module.exports = app => {
  const { router, controller, middleware } = app;
  // const jwtErr = middleware.jwtErr(app.config.jwt);
  const ip = middleware.ipLogger();
  router.post('/login', controller.user.passwordLogin);
  router.post('/register', ip, controller.user.register);
  /* 上传分片 */
  router.post('/uploadFile', controller.user.uploadFile);
  /* 检查分片 */
  router.post('/checkFile', controller.user.checkFile);
  /* 合并分片 */
  router.post('/mergeFile', controller.user.mergeFile);
  /* 校验是否上传过 */
  router.post('/isHavingFile', controller.user.isHavingFile);
};
