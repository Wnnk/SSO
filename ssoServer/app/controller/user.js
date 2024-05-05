const { Controller } = require('egg');

class LoginController extends Controller {
  async passwordLogin() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.passwordLogin();
  }
  async register() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.register();
  };

}

module.exports = LoginController;
