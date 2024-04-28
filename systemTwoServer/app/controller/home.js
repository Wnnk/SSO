const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '子系统2的服务器信息';
  }
}

module.exports = HomeController;
