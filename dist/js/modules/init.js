"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonInit = commonInit;
exports.errorWords = exports.errorBookMaskMode = exports.currentWordIndex = exports.currentUserName = exports.currentUser = exports.currentUnit = exports.currentStep = exports.currentFile = exports.currentBookName = void 0;
exports.initApp = initApp;
exports.initArticleListPage = initArticleListPage;
exports.initCheckInHistoryPage = initCheckInHistoryPage;
exports.initErrorBookPage = initErrorBookPage;
exports.initGamePage = initGamePage;
exports.initIndexPage = initIndexPage;
exports.initPetHomePage = initPetHomePage;
exports.initStatsPage = initStatsPage;
exports.initWordLinkPage = initWordLinkPage;
exports.initWordListPage = initWordListPage;
exports.maskMode = exports.isErrorBookMode = void 0;
exports.setCurrentBookName = setCurrentBookName;
exports.setCurrentFile = setCurrentFile;
exports.setCurrentStep = setCurrentStep;
exports.setCurrentUnit = setCurrentUnit;
exports.setCurrentUser = setCurrentUser;
exports.setCurrentUserName = setCurrentUserName;
exports.setCurrentWordIndex = setCurrentWordIndex;
exports.setErrorBookMaskMode = setErrorBookMaskMode;
exports.setErrorWords = setErrorWords;
exports.setIsErrorBookMode = setIsErrorBookMode;
exports.setMaskMode = setMaskMode;
exports.setUserStats = setUserStats;
exports.setWords = setWords;
exports.words = exports.userStats = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url-search-params.js");
var _user = require("./user.js");
var _word = require("./word.js");
var _utils = require("./utils.js");
var _game = require("./game.js");
var _modalManager = require("../modalManager.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // 初始化模块
// 导入其他模块的函数
// 全局变量
var currentUser = exports.currentUser = 'youyou';
var currentUserName = exports.currentUserName = '悠悠';
var currentFile = exports.currentFile = '3下.pdf';
var currentBookName = exports.currentBookName = '三年级下册';
var words = exports.words = [];
var currentUnit = exports.currentUnit = 'all';
var maskMode = exports.maskMode = 'none';
var errorBookMaskMode = exports.errorBookMaskMode = 'none';
var userStats = exports.userStats = {};
var currentWordIndex = exports.currentWordIndex = 0;
var currentStep = exports.currentStep = 'learn';
var isErrorBookMode = exports.isErrorBookMode = false;
var errorWords = exports.errorWords = [];

// Setter 函数：用于其他模块修改这些变量
function setCurrentUser(value) {
  exports.currentUser = currentUser = value;
  // 同时更新window对象中的对应变量
  if (typeof window !== 'undefined') {
    window.currentUser = value;
  }
}
function setCurrentUserName(value) {
  exports.currentUserName = currentUserName = value;
  // 同时更新window对象中的对应变量
  if (typeof window !== 'undefined') {
    window.currentUserName = value;
  }
}
function setCurrentFile(value) {
  exports.currentFile = currentFile = value;
  // 同时更新window对象中的对应变量
  if (typeof window !== 'undefined') {
    window.currentFile = value;
  }
}
function setCurrentBookName(value) {
  exports.currentBookName = currentBookName = value;
  // 同时更新window对象中的对应变量
  if (typeof window !== 'undefined') {
    window.currentBookName = value;
  }
}
function setWords(value) {
  exports.words = words = value;
  // 同时更新window对象中的对应变量
  if (typeof window !== 'undefined') {
    window.words = value;
  }
}
function setCurrentUnit(value) {
  exports.currentUnit = currentUnit = value;
}
function setMaskMode(value) {
  exports.maskMode = maskMode = value;
}
function setErrorBookMaskMode(value) {
  exports.errorBookMaskMode = errorBookMaskMode = value;
}
function setUserStats(value) {
  exports.userStats = userStats = value;
}
function setCurrentWordIndex(value) {
  exports.currentWordIndex = currentWordIndex = value;
  // 同时更新window对象中的对应变量
  if (typeof window !== 'undefined') {
    window.currentWordIndex = value;
  }
}
function setCurrentStep(value) {
  exports.currentStep = currentStep = value;
  // 同时更新window对象中的对应变量
  if (typeof window !== 'undefined') {
    window.currentStep = value;
  }
}
function setIsErrorBookMode(value) {
  exports.isErrorBookMode = isErrorBookMode = value;
  // 同时更新window对象中的对应变量
  if (typeof window !== 'undefined') {
    window.isErrorBookMode = value;
  }
}
function setErrorWords(value) {
  exports.errorWords = errorWords = value;
  // 同时更新window对象中的对应变量
  if (typeof window !== 'undefined') {
    window.errorWords = value;
  }
}

// 通用初始化函数
function commonInit() {
  return _commonInit.apply(this, arguments);
} // 首页初始化
function _commonInit() {
  _commonInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          console.log('[通用初始化] 开始');
          // 加载模态框
          console.log('[通用初始化] 加载模态框');
          (0, _modalManager.loadModals)();

          // 检查并加载用户信息
          console.log('[通用初始化] 检查并加载用户信息');
          (0, _user.checkUserInfo)();

          // 加载用户最近学习的课本或默认课本
          console.log('[通用初始化] 加载用户最近学习的课本或默认课本');
          (0, _user.loadUserBook)();

          // 加载用户数据
          console.log('[通用初始化] 加载用户数据');
          _context2.n = 1;
          return (0, _user.loadUserStats)();
        case 1:
          // 加载单词数据
          console.log('[通用初始化] 加载单词数据');
          _context2.n = 2;
          return (0, _word.loadPDF)();
        case 2:
          // 更新打卡状态
          console.log('[通用初始化] 更新打卡状态');
          (0, _user.updateCheckInStatus)();

          // 初始化事件监听
          console.log('[通用初始化] 初始化事件监听');
          (0, _utils.initEventListeners)();
          console.log('[通用初始化] 结束');
        case 3:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _commonInit.apply(this, arguments);
}
function initIndexPage() {
  console.log('[首页初始化] 开始');
  // 首页特定初始化逻辑
  // 导入updateDailyTaskProgress函数
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./user.js'));
  }).then(function (_ref) {
    var updateDailyTaskProgress = _ref.updateDailyTaskProgress;
    // 更新每日任务进度
    console.log('[首页初始化] 更新每日任务进度');
    updateDailyTaskProgress();
  });
  console.log('[首页初始化] 结束');
}

// 单词列表页初始化
function initWordListPage() {
  console.log('[单词列表页初始化] 开始');
  // 单词列表页特定初始化逻辑
  (0, _word.renderWordList)();
  console.log('[单词列表页初始化] 结束');
}

// 单词链路页初始化
function initWordLinkPage() {
  console.log('[单词链路页初始化] 开始');
  // 处理URL参数
  var urlParams = new URLSearchParams(window.location.search);
  var index = parseInt(urlParams.get('index')) || 0;
  var errorBook = urlParams.get('errorBook') === 'true';

  // 设置当前单词索引和错误本模式
  setCurrentWordIndex(index);
  setIsErrorBookMode(errorBook);
  if (isErrorBookMode) {
    // 加载错词数据
    setErrorWords(DataManager.getErrorWords(currentUser));
    // 生成错词链条
    (0, _word.generateErrorWordChain)();
    // 更新错词学习内容
    (0, _word.updateErrorWordLearningContent)();
    // 更新错词导航按钮
    (0, _word.updateErrorWordNavigationButtons)();
  } else {
    // 生成单词链条
    (0, _word.generateWordChain)();
    // 更新学习内容
    (0, _word.updateLearningContent)();
    // 更新导航按钮
    (0, _word.updateNavigationButtons)();
  }

  // 重置学习步骤
  (0, _word.resetLearningSteps)();
  console.log('[单词链路页初始化] 结束');
}

// 错误本页面初始化
function initErrorBookPage() {
  console.log('[错误本页面初始化] 开始');
  // 加载错词数据
  setErrorWords(DataManager.getErrorWords(currentUser));
  // 渲染错词列表
  (0, _word.renderErrorWordList)();
  console.log('[错误本页面初始化] 结束');
}

// 统计页面初始化
function initStatsPage() {
  console.log('[统计页面初始化] 开始');
  // 更新统计页面显示
  (0, _word.updateStatsPage)();
  console.log('[统计页面初始化] 结束');
}

// 文章列表页初始化
function initArticleListPage() {
  console.log('[文章列表页初始化] 开始');
  // 文章列表页特定初始化逻辑
  console.log('[文章列表页初始化] 结束');
}

// 打卡历史页面初始化
function initCheckInHistoryPage() {
  console.log('[打卡历史页面初始化] 开始');
  // 打卡历史页面特定初始化逻辑
  console.log('[打卡历史页面初始化] 结束');
}

// 宠物页面初始化
function initPetHomePage() {
  console.log('[宠物页面初始化] 开始');
  // 宠物页面特定初始化逻辑
  console.log('[宠物页面初始化] 结束');
}

// 游戏页面初始化
function initGamePage() {
  console.log('[游戏页面初始化] 开始');
  // 游戏页面特定初始化逻辑
  (0, _game.initGame)();
  console.log('[游戏页面初始化] 结束');
}

// 统一初始化入口
function initApp() {
  // 初始化函数
  var init = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var currentPage, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            console.log('[初始化] 开始执行 initApp');

            // 通用初始化
            _context.n = 1;
            return commonInit();
          case 1:
            // 根据页面执行特定初始化
            currentPage = window.location.pathname.split('/').pop();
            console.log('[初始化] 当前页面:', currentPage);
            _t = currentPage;
            _context.n = _t === 'index.html' ? 2 : _t === 'word-list.html' ? 3 : _t === 'word-link.html' ? 4 : _t === 'error-book.html' ? 5 : _t === 'stats.html' ? 6 : _t === 'article-list.html' ? 7 : _t === 'pet-home.html' ? 8 : _t === 'game.html' ? 9 : _t === 'checkin-history.html' ? 10 : _t === 'points-history.html' ? 11 : 12;
            break;
          case 2:
            initIndexPage();
            return _context.a(3, 13);
          case 3:
            initWordListPage();
            return _context.a(3, 13);
          case 4:
            initWordLinkPage();
            return _context.a(3, 13);
          case 5:
            initErrorBookPage();
            return _context.a(3, 13);
          case 6:
            initStatsPage();
            return _context.a(3, 13);
          case 7:
            initArticleListPage();
            return _context.a(3, 13);
          case 8:
            initPetHomePage();
            return _context.a(3, 13);
          case 9:
            initGamePage();
            return _context.a(3, 13);
          case 10:
            (0, _word.initCheckinHistoryPage)();
            return _context.a(3, 13);
          case 11:
            (0, _word.initPointsHistoryPage)();
            return _context.a(3, 13);
          case 12:
            console.log('[初始化] 未知页面，执行默认初始化');
          case 13:
            console.log('[初始化] initApp 执行完成');
          case 14:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function init() {
      return _ref2.apply(this, arguments);
    };
  }();

  // 检查DOM是否已经加载完成
  if (document.readyState === 'loading') {
    // DOM还在加载中，等待DOMContentLoaded事件
    console.log('[初始化] DOM加载中，等待DOMContentLoaded事件');
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM已经加载完成，直接执行
    console.log('[初始化] DOM已就绪，立即执行初始化');
    init();
  }
}