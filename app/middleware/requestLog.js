'use strict';

/**
 * @description 请求中间件，记录请求日志
 * @author chenbingze
 * @date 2022/3/10
 */
module.exports = () => {
  return async function requestLog(ctx, next) {

    await next();

    const query = ctx.query;
    const params = ctx.params;
    const reqBody = ctx.request.body;

    const { method, url, header } = ctx.request;
    const { status, message, body } = ctx.response;

    // 记录请求到数据库，方便追踪问题
    const data = {
      request: { method, url, header, ip: ctx.request.header['x-forwarded-for'], body: reqBody, query, params },
      response: { status, message, header: ctx.response.header, body },
      tokenValue: ctx.tokenValue,
    };

    // await ctx.service.cloudDbBase.create('request_log', data);

  };
};
