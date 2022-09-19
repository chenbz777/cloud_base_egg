'use strict';

const Service = require('egg').Service;
const utils = require('../utils');

/**
 *
 * @desc 数据库基础版，集成通用增删改查
 * @author chenbingze
 * @date 2022/3/13
 */
class CloudDbBaseService extends Service {

  /**
   * @description 添加数据
   * @param dbName {string} - 数据库名称
   * @param dbData {object} - 要添加的数据
   * @param dbData {array} - 要添加批量的数据
   * @author chenbingze
   * @date 2022/3/13
   */
  async create(dbName, dbData) {
    const { app: { db } } = this;

    const isArray = Array.isArray(dbData);

    if (isArray) {
      dbData.map(item => {
        // 剔除自定义ID
        delete item._id;

        // 给数据库添加上创建时间和修改时间
        item.created_at = new Date();
        item.updated_at = new Date();
        return item;
      });
    } else {
      // 剔除自定义ID
      delete dbData._id;

      // 给数据库添加上创建时间和修改时间
      dbData.created_at = new Date();
      dbData.updated_at = new Date();
    }

    const result = await db.collection(dbName)
      .add(dbData);

    return result;
  }

  async softDelete(dbName, dbWhere = {}) {

    const dbData = {
      deleted_at: new Date(),
    };

    return await this.update(dbName, dbWhere, dbData);
  }

  async restoreSoftDelete(dbName, dbWhere = {}) {

    const dbData = {
      deleted_at: null,
    };

    return await this.update(dbName, dbWhere, dbData);
  }

  /**
   * @description 删除数据
   * @param dbName {string} - 数据库名称
   * @param dbWhere {object} - 根据条件删除
   * @author chenbingze
   * @date 2022/3/13
   */
  async delete(dbName, dbWhere = {}) {
    const { app: { db } } = this;

    const result = await db
      .collection(dbName)
      .where(dbWhere)
      .remove();

    return result;
  }

  /**
   * @description 修改数据
   * @param dbName {string} - 数据库名称
   * @param dbWhere {object} - 根据条件删除
   * @param dbData {object} - 要修改的数据
   * @author chenbingze
   * @date 2022/3/13
   */
  async update(dbName, dbWhere = {}, dbData = {}) {
    const { app: { db } } = this;

    // 剔除不允许更新的字段
    delete dbData._id;

    // 不能修改创建时间
    delete dbData.created_at;
    // 编辑修改时间
    dbData.updated_at = new Date();

    // 更新单文档
    const result = await db.collection(dbName)
      .where(dbWhere)
      .update(dbData);

    return result;
  }

  /**
   * @description 查询所有数据
   * @param dbName {string} - 数据库名称
   * @param dbWhere {object} - 查询条件
   * @param dbConfig {object} - 配置
   * @param dbConfig.dateToString {boolean} - 格式化时间
   * @author chenbingze
   * @date 2022/3/13
   */
  async findAll(dbName, dbWhere = {}, dbConfig = {}) {
    const { app: { db } } = this;

    // 默认按创建时间排序
    const sortData = {
      created_at: -1,
    };

    let dateFormat = 'yyyy-MM-dd hh:mm:ss';

    const {
      addFields,
      addFieldsArr = [],
      project,
      lookup,
      lookups = [],
      limit = 1000,
      skip,
      sort,
      group,
      dateToString,
    } = dbConfig;

    if (dateToString) {
      if ((typeof dateToString) === 'string') {
        dateFormat = dateToString;
      }
    }

    // 集合对象
    let aggregate = await db.collection(dbName)
      .aggregate();

    // 指定的字段
    if (project) {
      aggregate = await aggregate.project(project);
    }

    // 查询条件
    if (dbWhere) {
      aggregate = await aggregate.match(dbWhere);
    }

    // 联表查询
    if (lookup) {
      aggregate = await aggregate.lookup(lookup);
    }

    if (lookups.length) {
      for (let i = 0; i < lookups.length; i++) {
        aggregate = await aggregate.lookup(lookups[i]);
      }
    }

    // 添加字段
    if (addFields) {
      aggregate = await aggregate.addFields(addFields);
    }

    if (addFieldsArr.length) {
      for (let i = 0; i < addFieldsArr.length; i++) {
        aggregate = await aggregate.addFields(addFieldsArr[i]);
      }
    }

    // 合并排序
    if (sort) {
      Object.assign(sortData, sort);
    }

    // 排序
    aggregate = await aggregate.sort(sortData);

    // 分组
    if (group) {
      aggregate = await aggregate.group(group);
    }

    // 跳过对应数量
    if (skip) {
      aggregate = await aggregate.skip(skip);
    }

    // 限制输出
    if (limit) {
      aggregate = await aggregate.limit(limit);
    }

    const { data: list } = await aggregate.end();

    const { data: aggregateCount } = await db.collection(dbName)
      .aggregate()
      .match(dbWhere)
      .count('count')
      .end();

    if (dateToString) {
      list.map(item => {
        item.created_at = utils.date.getDateToString(item.created_at, dateFormat);
        item.updated_at = utils.date.getDateToString(item.updated_at, dateFormat);

        return item;
      });
    }

    const total = aggregateCount.length ? aggregateCount[0].count : 0;

    return { list, total };
  }

  /**
   * @description 查询分页数据
   * @param dbName {String} - 数据库名称
   * @param dbWhere {Object} - 查询条件
   * @param dbConfig {Object} - 配置
   * @author chenbingze
   * @date 2022/3/13
   */
  async find(dbName, dbWhere = {}, dbConfig = {}) {

    const page = Number(dbConfig.page) || 1;
    const pageSize = Number(dbConfig.pageSize) || 10;

    dbConfig = Object.assign({
      limit: pageSize,
      skip: (page - 1) * pageSize,
    }, dbConfig);

    const { list, total } = await this.findAll(dbName, dbWhere, dbConfig);

    const totalPages = Math.ceil(total / pageSize);

    return { list, total, page, pageSize, totalPages };
  }

  /**
   * @description 查询单条数据
   * @param dbName {String} - 数据库名称
   * @param dbWhere {Object} - 查询条件
   * @param dbConfig {Object} - 配置
   * @author chenbingze
   * @date 2022/3/13
   */
  async findOne(dbName, dbWhere = {}, dbConfig = {}) {

    dbConfig = Object.assign({
      limit: 1,
    }, dbConfig);

    const { list, total } = await this.findAll(dbName, dbWhere, dbConfig);

    if (total) {
      return list[0];
    }

    return null;
  }

  async aggregate(dbName) {
    const { app: { db } } = this;

    return await db.collection(dbName)
      .aggregate();
  }

}

module.exports = CloudDbBaseService;
