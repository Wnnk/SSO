const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '子系统1的数据';
  }
}

module.exports = HomeController;
