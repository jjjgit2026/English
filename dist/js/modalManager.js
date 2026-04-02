"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadModals = loadModals;
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
// 模态框管理模块
function loadModals() {
  console.log('[模态框管理] 开始加载模态框');

  // 检查模态框是否已存在
  if (!document.getElementById('userModal') || !document.getElementById('bookModal')) {
    // 动态加载模态框HTML
    fetch('../html/modal-templates.html').then(function (response) {
      return response.text();
    }).then(function (html) {
      document.body.insertAdjacentHTML('beforeend', html);
      console.log('[模态框管理] 模态框加载完成');
    }).catch(function (error) {
      console.error('[模态框管理] 加载模态框失败:', error);
    });
  } else {
    console.log('[模态框管理] 模态框已存在，跳过加载');
  }
}