'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 【插件】开启跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  // 【插件】开启参数校验Plus
  validatePlus: {
    enable: true,
    package: 'egg-validate-plus',
  },

  // 【插件】路由分组
  routerGroup: {
    enable: true,
    package: 'egg-router-group',
  },

  // 【插件】egg-jwt
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
