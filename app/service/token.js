'use strict';

const Service = require('egg').Service;

/**
 * @desc token
 * @author chenbingze
 * @date 2022/4/7
 */
class TokenService extends Service {

  /**
   * @description 设置token
   * @param data {Object} - token数据
   * @param data {string} - token数据
   * @author chenbingze
   * @date 2022/4/7
   */
  async create(data) {
    const { app } = this;
    const config = this.app.config.jwt;

    return app.jwt.sign(data, config.secret, {
      expiresIn: 2 * 60 * 60,
    });

  }

  /**
   * @description 验证token
   * @param token {string} - token
   * @author chenbz
   * @date 2022/6/16
   */
  async verify(token) {
    if (!token) {
      return false;
    }

    const { app } = this;
    const config = this.app.config.jwt;

    return app.jwt.verify(token, config.secret);
  }

  /**
   * @description 获取token
   * @param token {string} - token
   * @author chenbingze
   * @date 2022/4/7
   */
  async getValue(token) {
    await this.verify(token);

    return this.app.jwt.decode(token);
  }
}

module.exports = TokenService;
