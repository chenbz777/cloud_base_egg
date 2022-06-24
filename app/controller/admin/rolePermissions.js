'use strict';

const baseController = require('../baseController');

class AuthRolePermissionsController extends baseController {
  get serviceName() {

    return this.service.admin.rolePermissions;
  }

}

module.exports = AuthRolePermissionsController;
