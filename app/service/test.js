'use strict';

const baseService = require('./baseService');

class ActivityGiftService extends baseService {

  get dbName() {
    return 'a_test';
  }

}

module.exports = ActivityGiftService;
