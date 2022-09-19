'use strict';

/**
 * @description 鉴权中间件
 * @author chenbingze
 * @date 2022/3/30
 */
module.exports = permissions => {
  return async function authentication(ctx, next) {

    /**
     * 先说一下这里逻辑
     * 3、校验用户状态：0正常、1禁用
     * 4、查询用户的角色
     * 5、根据角色查询权限
     * 6、判断接口是否在权限中
     */
    console.log('我是鉴权中间件');

    const role_id = ctx.tokenValue.role_id;

    if (!role_id) {
      throw new Error('no_permissions');
    }

    const { list: userPermissions } = await ctx.service.admin.rolePermissions.findAll({ role_id });

    let isNext = false;

    userPermissions.forEach(item => {

      if ((item.permissions.label === permissions) && (item.permissions.status)) {
        isNext = true;
      }

    });

    if (!isNext) {
      throw new Error('no_permissions');
    }

    await next();
  };
};
