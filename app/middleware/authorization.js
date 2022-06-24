'use strict';

/**
 * @description 授权中间件
 * @author chenbingze
 * @date 2022/3/30
 */
module.exports = () => {
  return async function authorization(ctx, next) {

    console.log('我是授权中间件');

    /**
     * 先说一下这里逻辑
     * 1、获取token
     * 2、验证 token
     */

    // 1、判断是否携带 token
    const token = ctx.get('Authorization');
    if (!token) {
      // 抛出"非法请求"异常
      throw new Error('illegal_request');
    }

    // 2、验证 token
    ctx.tokenValue = await ctx.service.token.getValue(token);

    await next();
  };
};
