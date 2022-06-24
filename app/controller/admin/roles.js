'use strict';

const baseController = require('../baseController');

class AuthRolesController extends baseController {
  get serviceName() {

    return this.service.admin.roles;
  }

}

module.exports = AuthRolesController;
