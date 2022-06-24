'use strict';

/**
 * @description 全局异常统一处理
 * @author chenbingze
 * @date 2022/3/10
 */
module.exports = () => {
  return async function errorHandler(ctx, next) {
    const method = ctx.request.method;
    // 请求方法为OPTIONS, axios做验证请求
    if (method === 'OPTIONS') {
      ctx.status = 204;
      return;
    }

    try {

      // 参数校验错误
      if (ctx.status === 400) {
        const { error } = ctx.body;
        ctx.result.info({ msg: 'parameter_verification_error', data: error });
      }

      // 访问路径错误
      if (ctx.status === 404) {
        ctx.result.info({ msg: '404' });
      }

      await next();

    } catch (error) {
      const { app } = ctx;

      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', error, ctx);

      console.log('====== 有报错了兄弟!!! ======');
      console.log('❌ 提示:', error.message);
      try {
        ctx.result.info(JSON.parse(error.message));
      } catch (e) {
        ctx.result.info({ msg: error.message });
      }
      console.log('=============================');


      if (ctx.body.code === 7500) {
        ctx.status = 500;
      }
    }
  };
};
