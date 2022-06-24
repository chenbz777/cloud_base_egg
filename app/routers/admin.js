'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;

  const auth = middleware.authentication;

  router.group({ prefix: '/admin' }, router => {

    router.group({ prefix: '/users' }, router => {
      router.get('/', auth('admin:users:find'), controller.admin.users.index);
      router.get('/:id', auth('admin:users:findOne'), controller.admin.users.show);
      router.post('/', auth('admin:users:add'), controller.admin.users.create);
      router.put('/:id', auth('admin:users:update'), controller.admin.users.update);
      router.delete('/:id', auth('admin:users:delete'), controller.admin.users.destroy);

      router.post('/login', controller.admin.users.login);
    });

    router.group({ prefix: '/roles' }, router => {
      router.get('/', auth('admin:roles:find'), controller.admin.roles.index);
      router.get('/:id', auth('admin:roles:findOne'), controller.admin.roles.show);
      router.post('/', auth('admin:roles:add'), controller.admin.roles.create);
      router.put('/:id', auth('admin:roles:update'), controller.admin.roles.update);
      router.delete('/:id', auth('admin:roles:delete'), controller.admin.roles.destroy);
    });

    router.group({ prefix: '/permissions' }, router => {
      router.get('/', auth('admin:permissions:find'), controller.admin.permissions.index);
      router.get('/:id', auth('admin:permissions:findOne'), controller.admin.permissions.show);
      router.post('/', auth('admin:permissions:add'), controller.admin.permissions.create);
      router.put('/:id', auth('admin:permissions:update'), controller.admin.permissions.update);
      router.delete('/:id', auth('admin:permissions:delete'), controller.admin.permissions.destroy);
    });

    router.group({ prefix: '/role/user' }, router => {
      router.get('/', auth('admin:role:user:find'), controller.admin.roleUser.index);
      router.get('/:id', auth('admin:role:user:findOne'), controller.admin.roleUser.show);
      router.post('/', auth('admin:role:user:add'), controller.admin.roleUser.create);
      router.put('/:id', auth('admin:role:user:update'), controller.admin.roleUser.update);
      router.delete('/:id', auth('admin:role:user:delete'), controller.admin.roleUser.destroy);
    });

    router.group({ prefix: '/role/permissions' }, router => {
      router.get('/', auth('admin:role:permissions:find'), controller.admin.rolePermissions.index);
      router.get('/:id', auth('admin:role:permissions:findOne'), controller.admin.rolePermissions.show);
      router.post('/', auth('admin:role:permissions:add'), controller.admin.rolePermissions.create);
      router.put('/:id', auth('admin:role:permissions:update'), controller.admin.rolePermissions.update);
      router.delete('/:id', auth('admin:role:permissions:delete'), controller.admin.rolePermissions.destroy);
    });


  });
};
