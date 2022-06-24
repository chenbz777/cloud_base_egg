'use strict';

const baseService = require('../baseService');

class AuthPermissionsService extends baseService {
  get dbName() {
    return 'admin_permissions';
  }

  async delete(dbWhere) {
    const { service } = this;

    await service.admin.rolePermissions.delete({ permissions_id: dbWhere._id });

    return await service.cloudDbBase.delete(this.dbName, dbWhere);
  }
}

module.exports = AuthPermissionsService;
