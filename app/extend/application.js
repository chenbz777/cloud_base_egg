'use strict';

const tcb = require('@cloudbase/node-sdk');
const tcbManager = require('@cloudbase/manager-node');

const TCB = Symbol('Application#tcb');
const DB = Symbol('Application#db');
const TcbManager = Symbol('Application#tcbManager');
const DbManager = Symbol('Application#dbManager');

const { utils } = require('./helper');

console.log('========== ⭐️ 拓展application ==========', utils.date.getDateTime());

// app/extend/application.js
// this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
module.exports = {

  /**
   * @description tcb服务端 实例对象
   * @author chenbingze
   * @date 2022/3/9
   */
  get tcb() {
    if (!this[TCB]) {
      console.log('还没有TCB对象', utils.date.getDateTime());

      /**
       * @param envId {string} - TCB 环境 ID，不填使用默认环境
       * @param secretId {string} - 腾讯云 API 固定密钥对，在云函数内执行可不填
       * @param secretKey {string} - 腾讯云 API 固定密钥对，在云函数内执行可不填
       */
      const { tcb: { envId, secretId, secretKey } } = this.config;

      /**
       * @desc 初始化腾讯云【服务端】SDK
       * @author chenbingze
       * @date 2022/3/9
       */
      const app = tcb.init({
        secretId,
        secretKey,
        env: envId,
      });

      this[TCB] = app;
    }

    return this[TCB];
  },

  /**
   * @description tcb服务端数据库(函数) 实例对象
   * @author chenbingze
   * @date 2022/3/9
   */
  get db() {
    if (!this[DB]) {
      console.log('还没有DB对象', utils.date.getDateTime());

      this[DB] = this.tcb.database();
    }

    return this[DB];
  },

  /**
   * @description tcb管理端 实例对象
   * @author chenbingze
   * @date 2022/3/9
   */
  get tcbManager() {
    if (!this[TcbManager]) {
      console.log('还没有TcbManager对象', utils.date.getDateTime());

      /**
       * @param envId {string} - TCB 环境 ID，不填使用默认环境
       * @param secretId {string} - 腾讯云 API 固定密钥对，在云函数内执行可不填
       * @param secretKey {string} - 腾讯云 API 固定密钥对，在云函数内执行可不填
       */
      const { tcb: { envId, secretId, secretKey } } = this.config;

      /**
       * @desc 初始化腾讯云【管理端】SDK
       * @author chenbingze
       * @date 2022/3/9
       */
      const app = new tcbManager({
        secretId,
        secretKey,
        envId,
      });

      this[TcbManager] = app;
    }

    return this[TcbManager];
  },

  /**
   * @description tcb管理端 数据库实例对象
   * @author chenbingze
   * @date 2022/3/9
   */
  get dbManager() {
    if (!this[DbManager]) {
      console.log('还没有DbManager对象', utils.date.getDateTime());

      this[DbManager] = this.tcbManager.database;
    }

    return this[DbManager];
  },

};
