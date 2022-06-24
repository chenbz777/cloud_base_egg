'use strict';

const baseController = require('../baseController');

class AuthPermissionsController extends baseController {
  get serviceName() {

    return this.service.admin.permissions;
  }

}

module.exports = AuthPermissionsController;
