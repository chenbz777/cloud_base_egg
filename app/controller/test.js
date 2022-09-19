'use strict';

const baseController = require('./baseController');

class TestController extends baseController {

  get serviceName() {
    return this.service.test;
  }

}

module.exports = TestController;
