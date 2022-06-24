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
};
