"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIn = checkIn;
exports.getUserStats = getUserStats;
exports.loadUserStats = loadUserStats;
exports.updateCheckInStatus = updateCheckInStatus;
exports.updateStatsDisplay = updateStatsDisplay;
exports.updateStatsPage = updateStatsPage;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _userManager = require("./userManager.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // 统计管理模块
var userStats = {};

/**
 * 加载用户统计数据
 */
function loadUserStats() {
  return _loadUserStats.apply(this, arguments);
}
/**
 * 更新统计显示
 */
function _loadUserStats() {
  _loadUserStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var currentUser;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          console.log('[加载用户统计数据] 开始');
          currentUser = (0, _userManager.getCurrentUser)();
          console.log('[加载用户统计数据] currentUser:', currentUser);
          try {
            // 使用 DataManager.getUserData() 确保数据结构完整
            userStats = DataManager.getUserData(currentUser);
            console.log('[加载用户统计数据] 从 DataManager 获取的用户数据:', userStats);

            // 更新统计显示
            updateStatsDisplay();
          } catch (error) {
            console.error('加载用户统计数据失败:', error);
          } finally {
            console.log('[加载用户统计数据] 结束');
          }
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _loadUserStats.apply(this, arguments);
}
function updateStatsDisplay() {
  console.log('[更新统计显示] 开始');
  var currentUser = (0, _userManager.getCurrentUser)();
  var currentFile = (0, _userManager.getCurrentFile)();
  console.log('[更新统计显示] currentUser:', currentUser);
  console.log('[更新统计显示] currentFile:', currentFile);
  console.log('[更新统计显示] words.length:', window.words ? window.words.length : 0);

  // 检查元素是否存在
  var totalWordsElement = document.getElementById('totalWords');
  var learnedWordsElement = document.getElementById('learnedWords');
  var userPointsElement = document.getElementById('userPoints');
  console.log('[更新统计显示] totalWordsElement:', totalWordsElement);
  console.log('[更新统计显示] learnedWordsElement:', learnedWordsElement);
  console.log('[更新统计显示] userPointsElement:', userPointsElement);

  // 使用DataManager获取用户数据
  var userData = DataManager.getUserData(currentUser);
  console.log('[更新统计显示] 从DataManager获取的用户数据:', userData);

  // 只有当元素存在时才更新
  if (totalWordsElement) {
    // 优先从userData获取总单词数，避免words数组未加载的问题
    var totalCount = window.words ? window.words.length : 0;
    if (userData.books && userData.books[currentFile] && userData.books[currentFile].totalWords) {
      totalCount = userData.books[currentFile].totalWords;
    }
    totalWordsElement.textContent = totalCount;
    console.log('[更新统计显示] 单词总数:', totalCount);
  }
  if (learnedWordsElement) {
    var learnedCount = 0;
    if (userData.books && userData.books[currentFile]) {
      // 同时支持旧格式（learnedWords数组）和新格式（learnedCount）
      if (userData.books[currentFile].learnedCount !== undefined) {
        learnedCount = userData.books[currentFile].learnedCount || 0;
      } else if (Array.isArray(userData.books[currentFile].learnedWords)) {
        learnedCount = userData.books[currentFile].learnedWords.length;
      }
    }
    console.log('[更新统计显示] 已学单词数量:', learnedCount);
    learnedWordsElement.textContent = learnedCount;
  }
  if (userPointsElement) {
    var points = userData.total ? parseFloat(userData.total.points) || 0 : 0;
    console.log('[更新统计显示] 学习积分:', points);
    userPointsElement.textContent = points;
  }
  console.log('[更新统计显示] 结束');
}

/**
 * 更新统计页面显示
 */
function updateStatsPage() {
  // 更新日期
  var statsDateElement = document.getElementById('statsDate');
  if (statsDateElement) {
    var today = new Date().toISOString().split('T')[0];
    statsDateElement.textContent = today;
  }

  // 获取用户数据
  var userData = DataManager.getUserData((0, _userManager.getCurrentUser)());

  // 更新今日统计
  var todayCompletedElement = document.getElementById('todayCompleted');
  var todayErrorElement = document.getElementById('todayError');
  if (todayCompletedElement) {
    todayCompletedElement.textContent = userData.today.learning || 0;
  }
  if (todayErrorElement) {
    todayErrorElement.textContent = userData.today.error || 0;
  }

  // 更新累计统计
  var totalCompletedElement = document.getElementById('totalCompleted');
  var totalErrorElement = document.getElementById('totalError');
  if (totalCompletedElement) {
    totalCompletedElement.textContent = userData.total.learning || 0;
  }
  if (totalErrorElement) {
    totalErrorElement.textContent = userData.total.error || 0;
  }
}

/**
 * 更新打卡状态
 */
function updateCheckInStatus() {
  var currentUser = (0, _userManager.getCurrentUser)();
  var checkinStatus = DataManager.getCheckInStatus(currentUser);
  var checkinStatusElement = document.getElementById('checkinStatus');
  var checkinBtn = document.getElementById('checkinBtn');
  var consecutiveDaysElement = document.getElementById('consecutiveDays');
  if (checkinStatusElement) {
    checkinStatusElement.textContent = checkinStatus.checkedIn ? '已打卡' : '未打卡';
  }
  if (checkinBtn) {
    checkinBtn.textContent = checkinStatus.checkedIn ? '已打卡' : '立即打卡';
    checkinBtn.disabled = checkinStatus.checkedIn;
  }
  if (consecutiveDaysElement) {
    consecutiveDaysElement.textContent = checkinStatus.consecutiveDays;
  }
}

/**
 * 打卡
 */
function checkIn() {
  var currentUser = (0, _userManager.getCurrentUser)();
  var result = DataManager.checkIn(currentUser);
  if (result.success) {
    alert("\u6253\u5361\u6210\u529F\uFF01\u83B7\u5F97 ".concat(result.points, " \u79EF\u5206\uFF0C\u8FDE\u7EED\u6253\u5361 ").concat(result.consecutiveDays, " \u5929"));
    updateCheckInStatus();
    updateStatsDisplay();
  } else {
    alert(result.message);
  }
}

/**
 * 获取用户统计数据
 * @returns {Object} 用户统计数据
 */
function getUserStats() {
  return userStats;
}