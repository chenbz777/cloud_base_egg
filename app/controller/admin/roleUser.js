'use strict';

const baseController = require('../baseController');

class AuthRoleUserController extends baseController {
  get serviceName() {

    return this.service.admin.roleUser;
  }

}

module.exports = AuthRoleUserController;
