'use strict';
const Service = require('egg').Service;
const JSEncrypt = require('node-jsencrypt');


class LoginService extends Service {
  async passwordLogin() {
    const { ctx, app } = this;
    /* 设置密钥 */
    const prvKey = this.app.config.private_key;
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPrivateKey(prvKey);
    /* 解密 */
    const paramsData = ctx.request.body.rsaParams;
    const prvData = JSON.parse(jsencrypt.decrypt(paramsData));
    const username = prvData.username;
    const password = prvData.password;
    /* 查询用户 */
    const isUser = await ctx.model.User.findOne({
      where: {
        name: username,
      },
      include: {
        model: ctx.model.Login,
        as: 'login',
        Attributes: [ 'password', 'salt' ],
      },
      attributes: [ 'name', 'id' ],
      raw: true,
    });
    if (!isUser) return ctx.fail('用户不存在');
    /* 正常需要做slat验证，现在不做 */
    if (password !== isUser['login.password']) return ctx.fail('密码错误');
    /* 发放jwt */
    const token = ctx.app.jwt.sign({
      /* token储存数据 */
      id: isUser.id,
      name: isUser.name,
    }, app.config.jwt.secret, { expiresIn: '24h' }); // token过期
    return ctx.success('登录成功', { isUser, token });
  }
}

module.exports = LoginService;
