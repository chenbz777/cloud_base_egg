'use strict';
const resultCode = {
  404: {
    code: 7404,
    msg: '嘿 兄弟，请检查路径是否正确',
  },
  illegal_request: {
    code: 7001,
    msg: '非法请求!',
  },
  'invalid token': {
    code: 7002,
    msg: 'token无效',
  },
  'jwt expired': {
    code: 7003,
    msg: 'token过期',
  },
  'jwt must be provided': {
    code: 7004,
    msg: '必须提供token',
  },
  no_permissions: {
    code: 7005,
    msg: '权限不足!',
  },
  parameter_verification_error: {
    code: 7006,
    msg: '参数错误',
  },
  no_user: {
    code: 7007,
    msg: '用户不存在',
  },
  error_password: {
    code: 7008,
    msg: '密码错误',
  },
  user_disable: {
    code: 7009,
    msg: '用户已被禁用',
  },
  user_no_role: {
    code: 7010,
    msg: '未分配用户角色,请联系管理员',
  },
};
module.exports = {
  resultCode,
};
