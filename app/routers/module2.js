'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.group({ prefix: '/module2' }, router => {

    router.group({ prefix: '/test' }, router => {
      router.get('/', controller.test.index);
      router.get('/:id', controller.test.show);
      router.post('/', controller.test.create);
      router.put('/:id', controller.test.update);
      router.delete('/:id', controller.test.destroy);
    });
  });
};
