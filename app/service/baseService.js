'use strict';

// app/service/baseService.js
const Service = require('egg').Service;

/**
 * @desc 基础Service,集成增删改查
 * @author chenbingze
 * @date 2022/4/7
 */
class BaseService extends Service {

  /**
   * @description 数据库名称
   * @author chenbingze
   * @date 2022/4/7
   */
  get dbName() {
    return '';
  }

  get dbConfig() {

    return {};
  }

  /**
   * @description 动态判断新增 or 删除
   * @param dbWhere {object} - 修改条件,默认根据_id来查找,也可以指定其它条件
   * @param data {object} - 要新增 or 修改的数据
   * @author chenbz
   * @date 2022/4/29
   */
  async set(dbWhere, data) {
    const result = await this.findOne(dbWhere);
    if (!result) {
      return await this.create(data);
    }
    return await this.update(dbWhere, data);
  }

  /**
   * @description 新增
   * @param data {object} - 新增数据
   * @author chenbingze
   * @date 2022/4/7
   */
  async create(data) {
    const { service } = this;

    return await service.cloudDbBase.create(this.dbName, data);
  }

  /**
   * @description 删除
   * @param dbWhere {object} 删除条件,默认根据_id来删除，也可以传入指定字段
   * @author chenbingze
   * @date 2022/4/7
   */
  async delete(dbWhere) {
    const { service } = this;

    return await service.cloudDbBase.delete(this.dbName, dbWhere);
  }

  /**
   * @description 更新
   * @param dbWhere {object} - 修改条件,默认根据_id来查找,也可以指定其它条件
   * @param data {object} - 要修改的数据
   * @author chenbingze
   * @date 2022/4/7
   */
  async update(dbWhere, data) {
    const { service } = this;

    return await service.cloudDbBase.update(this.dbName, dbWhere, data);
  }

  /**
   * @description 查询
   * @param dbWhere {object} - 查询条件
   * @param dbConfig {object} - 查询配置,例如: dataToString 格式化时间
   * @author chenbingze
   * @date 2022/4/7
   */
  async findAll(dbWhere, dbConfig) {
    const { service } = this;

    dbConfig = Object.assign(this.dbConfig, dbConfig);

    return await service.cloudDbBase.findAll(this.dbName, dbWhere, dbConfig);
  }

  /**
   * @description 查询
   * @param dbWhere {object} - 查询条件
   * @param dbConfig {object} - 查询配置,例如: page, pageSize
   * @author chenbingze
   * @date 2022/4/7
   */
  async find(dbWhere, dbConfig) {
    const { service } = this;

    dbConfig = Object.assign(this.dbConfig, dbConfig);

    return await service.cloudDbBase.find(this.dbName, dbWhere, dbConfig);
  }

  /**
   * @description 查询单条数据
   * @param dbWhere {object} - 查询条件
   * @param dbConfig {object} - 查询条件
   * @author chenbingze
   * @date 2022/4/7
   */
  async findOne(dbWhere, dbConfig) {
    const { service } = this;

    dbConfig = Object.assign(this.dbConfig, dbConfig);

    return await service.cloudDbBase.findOne(this.dbName, dbWhere, dbConfig);
  }

  get aggregate() {
    const { service } = this;

    return service.cloudDbBase.aggregate(this.dbName);
  }

}

module.exports = BaseService;
