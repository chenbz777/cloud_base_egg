/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    env: 'prod', // 推荐云函数的 egg 运行环境变量修改为 prod
    rundir: '/tmp',
    logger: {
      dir: '/tmp',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593514233357_3744';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'authorization' ];
  // 忽略注册和登陆的接口
  config.authorization = {
    ignore: [ '/admin/users/login' ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 【插件】关闭crsf,开启跨域
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [],
  };

  // 【插件】允许跨域方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT,  POST, DELETE, PATCH',
  };

  // 【插件】egg-jwt
  config.jwt = {
    secret: '123456', // 自定义 token 的加密条件字符串
  };

  config.tcb = {
    envId: process.env.TCB_ENV2,
    secretId: process.env.TENCENTCLOUD_SECRETID2,
    secretKey: process.env.TENCENTCLOUD_SECRETKEY2,
  };

  return {
    ...config,
    ...userConfig,
  };
};
