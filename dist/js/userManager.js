"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUserInfo = checkUserInfo;
exports.closeUserModal = closeUserModal;
exports.getCurrentBookName = getCurrentBookName;
exports.getCurrentFile = getCurrentFile;
exports.getCurrentUser = getCurrentUser;
exports.getCurrentUserName = getCurrentUserName;
exports.loadUserBook = loadUserBook;
exports.saveUserBook = saveUserBook;
exports.setCurrentBookName = setCurrentBookName;
exports.setCurrentFile = setCurrentFile;
exports.setCurrentUser = setCurrentUser;
exports.setCurrentUserName = setCurrentUserName;
exports.updateBookDisplay = updateBookDisplay;
exports.withUserCheck = withUserCheck;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _statsManager = require("./statsManager.js");
var _wordManager = require("./wordManager.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// 用户管理模块

// 全局变量
var currentUser = 'youyou';
var currentUserName = '悠悠';
var currentFile = '3下.pdf';
var currentBookName = '三年级下册';

/**
 * 检查用户信息
 * @returns {boolean} 是否成功加载用户信息
 */
function checkUserInfo() {
  // 从localStorage获取用户信息
  var savedUser = localStorage.getItem('currentUser');
  var savedUserName = localStorage.getItem('currentUserName');
  if (savedUser && savedUserName) {
    // 使用存储的用户信息
    currentUser = savedUser;
    currentUserName = savedUserName;

    // 更新UI上的用户名称显示
    var userNameElement = document.getElementById('userName');
    if (userNameElement) {
      userNameElement.textContent = "".concat(currentUserName, "\uFF0C\u5FEB\u6765\u5B66\u5355\u8BCD\u5427\uFF01\u52A0\u6CB9\u54E6\uFF01");
    }
    var currentUserDisplayElement = document.getElementById('currentUserDisplay');
    if (currentUserDisplayElement) {
      currentUserDisplayElement.textContent = currentUserName;
    }
    return true;
  } else {
    // 显示用户选择弹窗
    document.getElementById('userModal').classList.add('active');
    return false;
  }
}

/**
 * 带用户检查的函数包装器
 * @param {Function} func - 要执行的函数
 * @returns {Function} 包装后的函数
 */
function withUserCheck(func) {
  return function () {
    if (checkUserInfo()) {
      func.apply(this, arguments);
    }
  };
}

/**
 * 加载用户最近学习的课本或默认课本
 */
function loadUserBook() {
  console.log('[加载用户课本] 开始');
  try {
    var bookKey = "userBook_".concat(currentUser);
    console.log('[加载用户课本] bookKey:', bookKey);
    var savedBook = localStorage.getItem(bookKey);
    console.log('[加载用户课本] savedBook:', savedBook);
    if (savedBook) {
      var bookData = JSON.parse(savedBook);
      currentFile = bookData.file;
      currentBookName = bookData.name;
      console.log('[加载用户课本] 加载用户保存的课本:', currentFile, currentBookName);
    } else {
      // 根据用户设置默认课本
      switch (currentUser) {
        case 'qiuqiu':
          currentFile = '7下.pdf';
          currentBookName = '七年级下册';
          break;
        case 'youyou':
          currentFile = '5下.pdf';
          currentBookName = '五年级下册';
          break;
        case 'diandian':
          currentFile = '3上.pdf';
          currentBookName = '三年级上册';
          break;
        default:
          currentFile = '3下.pdf';
          currentBookName = '三年级下册';
      }
      console.log('[加载用户课本] 加载用户默认课本:', currentFile, currentBookName);
    }
    updateBookDisplay();
  } catch (error) {
    console.error('加载用户课本失败:', error);
    // 发生错误时根据用户设置默认课本
    switch (currentUser) {
      case 'qiuqiu':
        currentFile = '7下.pdf';
        currentBookName = '七年级下册';
        break;
      case 'youyou':
        currentFile = '5下.pdf';
        currentBookName = '五年级下册';
        break;
      case 'diandian':
        currentFile = '3上.pdf';
        currentBookName = '三年级上册';
        break;
      default:
        currentFile = '3下.pdf';
        currentBookName = '三年级下册';
    }
    console.log('加载默认课本（错误处理）:', currentFile, currentBookName);
    updateBookDisplay();
  } finally {
    console.log('[加载用户课本] 结束');
  }
}

/**
 * 保存用户选择的课本
 */
function saveUserBook() {
  try {
    var bookKey = "userBook_".concat(currentUser);
    var bookData = {
      file: currentFile,
      name: currentBookName
    };
    localStorage.setItem(bookKey, JSON.stringify(bookData));
  } catch (error) {
    console.error('保存用户课本失败:', error);
  }
}

/**
 * 关闭用户选择弹窗
 */
function closeUserModal() {
  return _closeUserModal.apply(this, arguments);
}
/**
 * 更新教材显示
 */
function _closeUserModal() {
  _closeUserModal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var selectedOption, bookKey, bookData, userNameElement, currentUserDisplayElement;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          selectedOption = document.querySelector('.user-option.selected');
          if (!selectedOption) {
            _context.n = 2;
            break;
          }
          currentUser = selectedOption.dataset.user;
          currentUserName = selectedOption.textContent;

          // 保存用户信息到localStorage
          localStorage.setItem('currentUser', currentUser);
          localStorage.setItem('currentUserName', currentUserName);

          // 清除该用户的课本信息，确保使用默认课本
          bookKey = "userBook_".concat(currentUser);
          localStorage.removeItem(bookKey);

          // 加载用户默认课本
          loadUserBook();

          // 保存当前课本信息到localStorage
          bookData = {
            file: currentFile,
            name: currentBookName
          };
          localStorage.setItem(bookKey, JSON.stringify(bookData));

          // 更新UI上的用户名称显示
          userNameElement = document.getElementById('userName');
          if (userNameElement) {
            userNameElement.textContent = "".concat(currentUserName, "\uFF0C\u5FEB\u6765\u5B66\u5355\u8BCD\u5427\uFF01\u52A0\u6CB9\u54E6\uFF01");
          }
          currentUserDisplayElement = document.getElementById('currentUserDisplay');
          if (currentUserDisplayElement) {
            currentUserDisplayElement.textContent = currentUserName;
          }

          // 加载用户统计数据
          _context.n = 1;
          return (0, _statsManager.loadUserStats)();
        case 1:
          _context.n = 2;
          return (0, _wordManager.loadPDF)();
        case 2:
          document.getElementById('userModal').classList.remove('active');
        case 3:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _closeUserModal.apply(this, arguments);
}
function updateBookDisplay() {
  // 检查是否为7年级及以上教材
  var isPeopleEdition = currentFile && parseInt(currentFile[0]) >= 7;
  var bookPrefix = isPeopleEdition ? '人教版' : '外研版Join In';

  // 只在元素存在时才设置textContent
  var bookTitle = document.getElementById('bookTitle');
  if (bookTitle) {
    bookTitle.textContent = "".concat(bookPrefix, "-").concat(currentBookName);
  }
  var bookGrade = document.getElementById('bookGrade');
  if (bookGrade) {
    bookGrade.textContent = currentBookName.replace('年级', '年级 ').replace('上册', '上册').replace('下册', '下册');
  }
  var listTitle = document.getElementById('listTitle');
  if (listTitle) {
    listTitle.textContent = "".concat(bookPrefix, "-").concat(currentBookName);
  }
  var linkTitle = document.getElementById('linkTitle');
  if (linkTitle) {
    linkTitle.textContent = "".concat(bookPrefix, "-").concat(currentBookName);
  }
}

/**
 * 获取当前用户
 * @returns {string} 当前用户
 */
function getCurrentUser() {
  return currentUser;
}

/**
 * 获取当前用户名称
 * @returns {string} 当前用户名称
 */
function getCurrentUserName() {
  return currentUserName;
}

/**
 * 获取当前课本文件
 * @returns {string} 当前课本文件
 */
function getCurrentFile() {
  return currentFile;
}

/**
 * 获取当前课本名称
 * @returns {string} 当前课本名称
 */
function getCurrentBookName() {
  return currentBookName;
}

/**
 * 设置当前用户
 * @param {string} user - 用户ID
 */
function setCurrentUser(user) {
  currentUser = user;
}

/**
 * 设置当前用户名称
 * @param {string} userName - 用户名称
 */
function setCurrentUserName(userName) {
  currentUserName = userName;
}

/**
 * 设置当前课本文件
 * @param {string} file - 课本文件
 */
function setCurrentFile(file) {
  currentFile = file;
}

/**
 * 设置当前课本名称
 * @param {string} bookName - 课本名称
 */
function setCurrentBookName(bookName) {
  currentBookName = bookName;
}

// 导入其他模块的函数