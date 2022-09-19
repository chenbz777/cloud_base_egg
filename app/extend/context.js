'use strict';

const resultResponse = require('../result/resultResponse');
const result = Symbol('Context#result');

// app/extend/context.js
module.exports = {
  get result() {
    if (!this[result]) {
      this[result] = {
        success: data => {
          this.body = resultResponse.success(data);
        },
        info: ({ code, msg, data }) => {
          this.body = resultResponse.info({ code, msg, data });
        },
      };
    }
    return this[result];
  },

  async purl(url, config) {
    config = Object.assign({
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      timeout: 6000,
    }, config);

    const { data } = await this.curl(url, config);

    return data;
  },

  async gurl(url, config) {
    config = Object.assign({
      method: 'GET',
    }, config);
    const result = await this.purl(url, config);

    return result;
  },

  async pwurl(url, config) {
    const result = await this.purl(url, config);

    if (result.errcode) {
      const { errcode: code, errmsg: msg } = result;
      const error = JSON.stringify({ code, msg });
      throw new Error(error);
    }

    return result;
  },

  async gwurl(url, config) {
    config = Object.assign({
      method: 'GET',
    }, config);
    const result = await this.pwurl(url, config);

    return result;
  },

  async pourl(url, config) {
    const token = await this.service.platform.token.getToken();

    config = Object.assign(config, {
      headers: {
        Authorization: token,
      },
    });

    const result = await this.purl(url, config);

    if (result.code !== 200) {
      const { code, msg, data } = result;
      const error = JSON.stringify({ code, msg, data });
      throw new Error(error);
    }

    return result.data;
  },

  async gourl(url, config) {
    config = Object.assign({
      method: 'GET',
    }, config);

    const result = await this.pourl(url, config);

    return result;
  },

  async download(fileName, buffer) {

    this.set('Content-Type', 'application/octet-stream');
    this.set('Content-Disposition', `attachment;filename=${encodeURIComponent(fileName)}`);
    this.set('Content-Length', buffer.length);

    this.body = buffer;
  },

};
