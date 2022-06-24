'use strict';

const getUtils = require('../utils');
const utils = Symbol('Helper#utils');

// app/extend/helper.js
module.exports = {
  get utils() {
    if (!this[utils]) {
      this[utils] = getUtils;
    }
    return this[utils];
  },
};
