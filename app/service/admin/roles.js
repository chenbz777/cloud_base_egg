'use strict';

const baseService = require('../baseService');

class AuthRolesService extends baseService {
  get dbName() {
    return 'admin_roles';
  }

  async delete(dbWhere) {
    const { service } = this;

    await service.admin.roleUser.delete({ role_id: dbWhere._id });
    await service.admin.rolePermissions.delete({ role_id: dbWhere._id });

    return await service.cloudDbBase.delete(this.dbName, dbWhere);
  }
}

module.exports = AuthRolesService;
