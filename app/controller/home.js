'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    const { ctx } = this;

    ctx.result.success('hello egg');
  }
}

module.exports = HomeController;
