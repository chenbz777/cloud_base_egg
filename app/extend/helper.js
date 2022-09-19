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

  requestLog(data) {
    const { ctx } = this;

    const ips = ctx.request.header['x-forwarded-for'] ? ctx.request.header['x-forwarded-for'].replace(/\s*/g, '')
      .split(',') : [];

    const query = ctx.query || {};
    const params = ctx.params || {};
    const reqBody = ctx.request.body || {};

    let reqData = {};

    if (Object.keys(query).length) {
      reqData = ctx.query;
    }
    if (Object.keys(params).length) {
      reqData = ctx.query;
    }
    if (Object.keys(reqBody).length) {
      reqData = ctx.request.body;
    }

    const requestData = {
      date: getUtils.date.getDateToString(),
      ua: ctx.request.header['user-agent'],
      tokenValue: ctx.tokenValue || '',
      distinctId: ctx.tokenValue ? ctx.tokenValue.unionid : '',
      ip: ctx.request.header['x-real-ip'],
      ips,
      reqUrl: ctx.request.header.origin || '',
      url: ctx.request.url,
      method: ctx.request.method,
      reqData,
      resBody: ctx.response.body,
      timeConsuming: Date.now() - ctx.startReq,
      ...data,
    };

    return requestData;
  },

  requestLogHtml(requestLog) {
    const {
      date,
      distinctId,
      ip,
      ips,
      method,
      url,
      ua,
      reqData,
      tokenValue,
      reqUrl,
      resBody,
      timeConsuming,
      error,
    } = requestLog ? requestLog : this.requestLog();

    const html = `<div style="color: #3d485d;">

        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">创建时间</h4>
            <span style="border: 2px solid #0052d9; padding: 2px 10px; color: #0052d9;border-radius: 4px;">${date}</span>
        </div>
        
        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">ua</h4>
            <p style="margin: 0;">${ua}</p>
        </div>
        
        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">tokenValue</h4>
            <pre style="width: 100%; overflow-y: scroll;">${JSON.stringify(tokenValue, null, 2)}</pre>
        </div>
        
        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">用户唯一标识</h4>
            <span style="border: 2px solid #0052d9; padding: 2px 10px; color: #0052d9;border-radius: 4px;">${distinctId || null}</span>
        </div>

        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">ip地址</h4>
            <span
                style="border: 2px solid #0052d9; padding: 2px 10px; color: #0052d9;border-radius: 4px;">${ip || null}</span>
        </div>

        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">ip地址数组(代理)</h4>
            <pre style="width: 100%; overflow-y: scroll;">${JSON.stringify(ips, null, 2)}</pre>
        </div>
        
        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">请求来源</h4>
            <span
                style="border: 2px solid #0052d9; padding: 2px 10px; color: #0052d9;border-radius: 4px;word-break:break-all;display: inline-block;">${reqUrl}</span>
        </div>
        
        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">请求路径</h4>
            <span
                style="border: 2px solid #0052d9; padding: 2px 10px; color: #0052d9;border-radius: 4px;display: inline-block;">${url}</span>
        </div>

        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">请求类型</h4>
            <span style="border: 2px solid #0052d9; padding: 2px 10px; color: #0052d9;border-radius: 4px;">${method}</span>
        </div>
        
        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">请求参数</h4>
            <pre style="width: 100%; overflow-y: scroll;">${JSON.stringify(reqData, null, 2)}</pre>
        </div>

        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">响应结果</h4>
            <pre style="width: 100%; overflow-y: scroll;">${JSON.stringify(resBody, null, 2)}</pre>
        </div>
        
        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">耗费时间</h4>
            <span style="border: 2px solid #0052d9; padding: 2px 10px; color: #0052d9;border-radius: 4px;">${timeConsuming || null} ms</span>
        </div>

        ${error ?
        `<div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
                border: 2px solid #f64041;
                box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
                border-radius: 4px;
                box-sizing: border-box;
                padding: 10px;
                margin-top: 10px;">
                    <h4 style="margin: 0 0 10px 0;color: #f64041;">错误信息</h4>
                    <pre style="width: 100%; overflow-y: scroll;">${error}</pre>
            </div>` : ''
      }

    </div>`;

    return html;
  },

  errorLogHtml({ info, error }) {
    const html = `<div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;">
            <h4 style="margin: 0 0 10px 0;">其它信息</h4>
            <pre style="width: 100%; overflow-y: scroll;">${JSON.stringify(info, null, 2)}</pre>
        </div>
        <div style="background-image: linear-gradient(0deg,#fff,#f3f5f8);
                border: 2px solid #f64041;
                box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
                border-radius: 4px;
                box-sizing: border-box;
                padding: 10px;
                margin-top: 10px;">
                    <h4 style="margin: 0 0 10px 0;color: #f64041;">错误信息</h4>
                    <pre style="width: 100%; overflow-y: scroll;">${JSON.stringify(error, null, 2)}</pre>
            </div>`;

    return html;
  },
};
