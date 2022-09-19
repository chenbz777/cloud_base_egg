'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  // router.resources('test', '/test', controller.test);

  // router.group({ prefix: '/test' }, router => {
  //   router.get('/', controller.test.index);
  //   router.get('/:id', controller.test.show);
  //   router.post('/', controller.test.create);
  //   router.put('/:id', controller.test.update);
  //   router.delete('/:id', controller.test.destroy);
  // });

  // 路由管理模块
  require('./routers/module2')(app);
};
