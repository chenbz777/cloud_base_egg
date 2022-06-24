# 云函数基础模版，基于egg

## 快速开始

#### 安装依赖

```bash
# cnpm更好
npm install
```

#### 运行

```bash
npm run dev
# open http://localhost:7001
```

## 插件列表

| 插件名称                | 描述                 |
| ----------------------- | -------------------- |
| egg-cors                | 【插件】配置跨域     |
| egg-validate-plus       | 【插件】校验参数     |
| egg-router-group        | 【插件】路由分组     |
| @cloudbase/manager-node | 【插件】云开发管理端 |
| @cloudbase/node-sdk     | 【插件】云开发服务端 |
| egg-jwt                 | 【插件】jwt          |

## 封装

`/app/controller/baseController.js`

**基础Controller,支持RESTful 风格的 URL**

`/app/service/baseService.js`

**基础Service,支持增删改查**

`/app/service/cloudDbBase.js`

**基础cloudDb,集成了聚合查询,灵活调用 => 无限的可能**



<br />

更多详细信息，后续补充...