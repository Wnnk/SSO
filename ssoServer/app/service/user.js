'use strict';
const Service = require('egg').Service;


class LoginService extends Service {
  async passwordLogin() {
    const { ctx, app } = this;
    /* 解密数据 */
    const paramsData = ctx.request.body.rsaData;
    const prvData = ctx.helper.decryptData(paramsData);
    const { username, password } = prvData;
    console.log(username, password);
    /* 查询用户 */
    const isUser = await ctx.model.UserInfo.findOne({
      where: {
        name: username,
      },
      include: {
        model: ctx.model.UserLogin,
        as: 'login',
        Attributes: [ 'password', 'salt' ],
      },
      attributes: [ 'name', 'id' ],
      raw: true,
    });
    if (!isUser) return ctx.fail('用户不存在');
    /* 密码验证验证 */
    if (!ctx.helper.compareSaltData(password, isUser['login.password'])) return ctx.fail('密码错误');
    /* 发放jwt */
    const token = ctx.app.jwt.sign({
      /* token储存数据 */
      id: isUser.id,
      name: isUser.name,
    }, app.config.jwt.secret, { expiresIn: '24h' }); // token过期
    return ctx.success('登录成功', { isUser, token });
  }


  async register() {
    const { ctx } = this;
    // /* 解密数据 */
    const paramsData = ctx.request.body.rsaData;
    const prvData = ctx.helper.decryptData(paramsData);
    /* 校验数据 */
    const { username, password, phone, code, email } = prvData;
    if (!ctx.helper.isPhone(phone) || !ctx.helper.isPassword(password) || !username || !code) {
      return ctx.fail('参数错误');
    }
    /* 查询验证码 */
    const res = ctx.helper.addSalt(password);
    console.log(res.salt, res.hash);
    console.log(ctx.helper.compareSaltData(password, res.hash));

    /* 查询用户是否存在 */
    const isUser = await ctx.model.UserLogin.findOne({
      where: {
        phone,
      },
    });
    if (isUser) return ctx.fail('手机号已注册');
    /* 注册用户 */
    const { salt, hash } = ctx.helper.addSalt(password);

    const Userparams = {
      name: username,
      phone,
      password: hash,
      status: 0,
      salt,
      email,
      created_at: new Date(),
    };

    try {
      const Info = await ctx.model.UserInfo.create(Userparams);
      const res = await ctx.model.UserLogin.create({
        user_id: Info.dataValues.id,
        phone,
        password: hash,
        salt,
        email,
        status: 0,
      });
      if (res) {

        return ctx.success('注册成功');
      }
    } catch (error) {

      ctx.logger.error(error);
      return ctx.fail('注册失败');
    }

  }
}

module.exports = LoginService;
