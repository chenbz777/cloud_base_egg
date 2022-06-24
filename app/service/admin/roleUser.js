'use strict';

const baseService = require('../baseService');

class AuthRoleUserService extends baseService {
  get dbName() {
    return 'admin_role_user';
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
          from: 'admin_users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      ],
      addFields: {
        role: $.arrayElemAt([ '$role', 0 ]),
        user: $.arrayElemAt([ '$user', 0 ]),
      },
    };
  }

}

module.exports = AuthRoleUserService;
