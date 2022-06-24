'use strict';

const baseService = require('../baseService');

class AuthUsersService extends baseService {
  get dbName() {
    return 'admin_users';
  }

  async login({ user, password }) {
    const { service } = this;

    const userInfo = await this.findOne({ user });

    if (!userInfo) {
      throw new Error('no_user');
    }

    if (userInfo.password !== password) {
      throw new Error('error_password');
    }

    if (!userInfo.status) {
      throw new Error('user_disabled');
    }

    const user_id = userInfo._id;
    let role_id = null;
    let userPermissions = [];

    const roleUser = await service.admin.roleUser.findOne({ user_id });

    if (roleUser) {
      role_id = roleUser.role_id;

      const { list } = await service.admin.rolePermissions.findAll({ role_id });

      userPermissions = list;
    }

    const token = await service.token.create({ user_id, role_id });

    delete userInfo.password;
    delete userInfo._id;

    return { token, userInfo, userPermissions };
  }

  async delete(dbWhere) {
    const { service } = this;

    await service.admin.roleUser.delete({ user_id: dbWhere._id });

    return await service.cloudDbBase.delete(this.dbName, dbWhere);
  }
}

module.exports = AuthUsersService;
