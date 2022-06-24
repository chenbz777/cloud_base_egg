'use strict';

const baseController = require('../baseController');

class AuthUsersController extends baseController {
  get serviceName() {

    return this.service.admin.users;
  }

  async login() {
    const { ctx } = this;

    const data = ctx.request.body;

    const rule = {
      user: [
        { required: true },
      ],
      password: [
        { required: true },
      ],
    };

    const validateResult = await this.ctx.validate(rule, data);
    if (!validateResult) return false;

    const result = await this.serviceName.login(data);

    ctx.result.success(result);
  }

}

module.exports = AuthUsersController;
