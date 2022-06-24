'use strict';

const baseService = require('../baseService');

class AuthRoleRermissionsService extends baseService {
  get dbName() {
    return 'admin_role_permissions';
  }

  get dbConfig() {
    const $ = this.app.db.command.aggregate;

    return {
      lookups: [
        {
          from: 'admin_roles',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
        {
          from: 'admin_permissions',
          localField: 'permissions_id',
          foreignField: '_id',
          as: 'permissions',
        },
      ],
      addFields: {
        role: $.arrayElemAt([ '$role', 0 ]),
        permissions: $.arrayElemAt([ '$permissions', 0 ]),
      },
    };
  }

}

module.exports = AuthRoleRermissionsService;
