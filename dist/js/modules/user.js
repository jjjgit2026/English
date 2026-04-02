"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIn = checkIn;
exports.checkUserInfo = checkUserInfo;
exports.closeBookModal = closeBookModal;
exports.closeUserModal = closeUserModal;
exports.loadUserBook = loadUserBook;
exports.loadUserStats = loadUserStats;
exports.saveUserBook = saveUserBook;
exports.showBookModal = showBookModal;
exports.showUserModal = showUserModal;
exports.updateBookDisplay = updateBookDisplay;
exports.updateCheckInStatus = updateCheckInStatus;
exports.updateDailyTaskProgress = updateDailyTaskProgress;
exports.updateStatsDisplay = updateStatsDisplay;
exports.withUserCheck = withUserCheck;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _init = require("./init.js");
var _word = require("./word.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // 用户模块
// 检查用户信息
function checkUserInfo() {
  // 从localStorage获取用户信息
  var savedUser = localStorage.getItem('currentUser');
  var savedUserName = localStorage.getItem('currentUserName');
  if (savedUser && savedUserName) {
    // 使用存储的用户信息
    (0, _init.setCurrentUser)(savedUser);
    (0, _init.setCurrentUserName)(savedUserName);

    // 更新UI上的用户名称显示
    var userNameElement = document.getElementById('userName');
    if (userNameElement) {
      userNameElement.textContent = "".concat(_init.currentUserName, "\uFF0C\u5FEB\u6765\u5B66\u5355\u8BCD\uFF01");
    }
    var currentUserDisplayElement = document.getElementById('currentUserDisplay');
    if (currentUserDisplayElement) {
      currentUserDisplayElement.textContent = _init.currentUserName;
    }
    return true;
  } else {
    // 显示用户选择弹窗（如果元素存在）
    var userModalElement = document.getElementById('userModal');
    if (userModalElement) {
      userModalElement.classList.add('active');
    }
    return false;
  }
}

// 带用户检查的函数包装器
function withUserCheck(func) {
  return function () {
    if (checkUserInfo()) {
      func.apply(this, arguments);
    }
  };
}

// 加载用户统计数据
function loadUserStats() {
  return _loadUserStats.apply(this, arguments);
} // 加载用户最近学习的课本
function _loadUserStats() {
  _loadUserStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          console.log('[加载用户统计数据] 开始');
          console.log('[加载用户统计数据] currentUser:', _init.currentUser);
          try {
            // 使用 DataManager.getUserData() 确保数据结构完整
            userStats = DataManager.getUserData(_init.currentUser);
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
function loadUserBook() {
  console.log('[加载用户课本] 开始');
  try {
    var bookKey = "userBook_".concat(_init.currentUser);
    console.log('[加载用户课本] bookKey:', bookKey);
    var savedBook = localStorage.getItem(bookKey);
    console.log('[加载用户课本] savedBook:', savedBook);
    if (savedBook) {
      var bookData = JSON.parse(savedBook);
      (0, _init.setCurrentFile)(bookData.file);
      (0, _init.setCurrentBookName)(bookData.name);
      console.log('[加载用户课本] 加载用户保存的课本:', _init.currentFile, _init.currentBookName);
    } else {
      // 根据用户设置默认课本
      switch (_init.currentUser) {
        case 'qiuqiu':
          (0, _init.setCurrentFile)('7下.pdf');
          (0, _init.setCurrentBookName)('七年级下册');
          break;
        case 'youyou':
          (0, _init.setCurrentFile)('5下.pdf');
          (0, _init.setCurrentBookName)('五年级下册');
          break;
        case 'diandian':
          (0, _init.setCurrentFile)('3上.pdf');
          (0, _init.setCurrentBookName)('三年级上册');
          break;
        default:
          (0, _init.setCurrentFile)('3下.pdf');
          (0, _init.setCurrentBookName)('三年级下册');
      }
      console.log('[加载用户课本] 加载用户默认课本:', _init.currentFile, _init.currentBookName);
    }
    updateBookDisplay();
  } catch (error) {
    console.error('加载用户课本失败:', error);
    // 发生错误时根据用户设置默认课本
    switch (_init.currentUser) {
      case 'qiuqiu':
        (0, _init.setCurrentFile)('7下.pdf');
        (0, _init.setCurrentBookName)('七年级下册');
        break;
      case 'youyou':
        (0, _init.setCurrentFile)('5下.pdf');
        (0, _init.setCurrentBookName)('五年级下册');
        break;
      case 'diandian':
        (0, _init.setCurrentFile)('3上.pdf');
        (0, _init.setCurrentBookName)('三年级上册');
        break;
      default:
        (0, _init.setCurrentFile)('3下.pdf');
        (0, _init.setCurrentBookName)('三年级下册');
    }
    console.log('加载默认课本（错误处理）:', _init.currentFile, _init.currentBookName);
    updateBookDisplay();
  } finally {
    console.log('[加载用户课本] 结束');
  }
}

// 保存用户选择的课本
function saveUserBook() {
  try {
    var bookKey = "userBook_".concat(_init.currentUser);
    var bookData = {
      file: _init.currentFile,
      name: _init.currentBookName
    };
    localStorage.setItem(bookKey, JSON.stringify(bookData));
  } catch (error) {
    console.error('保存用户课本失败:', error);
  }
}

// 更新教材显示
function updateBookDisplay() {
  // 检查是否为7年级及以上教材
  var isPeopleEdition = _init.currentFile && parseInt(_init.currentFile[0]) >= 7;
  var bookPrefix = isPeopleEdition ? '人教版' : '外研版Join In';

  // 只在元素存在时才设置textContent
  var bookTitle = document.getElementById('bookTitle');
  if (bookTitle) {
    bookTitle.textContent = "".concat(bookPrefix, "-").concat(_init.currentBookName);
  }
  var bookGrade = document.getElementById('bookGrade');
  if (bookGrade) {
    bookGrade.textContent = _init.currentBookName.replace('年级', '年级 ').replace('上册', '上册').replace('下册', '下册');
  }
  var listTitle = document.getElementById('listTitle');
  if (listTitle) {
    listTitle.textContent = "".concat(bookPrefix, "-").concat(_init.currentBookName);
  }
  var linkTitle = document.getElementById('linkTitle');
  if (linkTitle) {
    linkTitle.textContent = "".concat(bookPrefix, "-").concat(_init.currentBookName);
  }

  // 更新文章列表页面的教材显示
  var currentBookDisplay = document.getElementById('currentBookDisplay');
  if (currentBookDisplay) {
    currentBookDisplay.textContent = "".concat(bookPrefix, "-").concat(_init.currentBookName);
  }
}

// 显示课本选择弹窗
function showBookModal() {
  document.getElementById('bookModal').classList.add('active');
}

// 关闭课本选择弹窗
function closeBookModal() {
  document.getElementById('bookModal').classList.remove('active');
}

// 显示用户选择弹窗
function showUserModal() {
  document.getElementById('userModal').classList.add('active');

  // 延迟绑定事件，确保DOM元素已加载
  setTimeout(function () {
    var exportBtn = document.getElementById('exportDataBtn');
    var importBtn = document.getElementById('importDataBtn');
    if (exportBtn) {
      // 移除旧的事件监听器，避免重复绑定
      exportBtn.removeEventListener('click', window.exportData);
      exportBtn.addEventListener('click', window.exportData);
    }
    if (importBtn) {
      // 移除旧的事件监听器，避免重复绑定
      importBtn.removeEventListener('click', window.importData);
      importBtn.addEventListener('click', window.importData);
    }
  }, 100);
}

// 关闭用户选择弹窗
function closeUserModal() {
  return _closeUserModal.apply(this, arguments);
} // 更新统计显示
function _closeUserModal() {
  _closeUserModal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var selectedOption, bookKey, bookData, userNameElement, currentUserDisplayElement;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          selectedOption = document.querySelector('.user-option.selected');
          if (!selectedOption) {
            _context2.n = 3;
            break;
          }
          (0, _init.setCurrentUser)(selectedOption.dataset.user);
          (0, _init.setCurrentUserName)(selectedOption.textContent);

          // 保存用户信息到localStorage
          localStorage.setItem('currentUser', _init.currentUser);
          localStorage.setItem('currentUserName', _init.currentUserName);

          // 清除该用户的课本信息，确保使用默认课本
          bookKey = "userBook_".concat(_init.currentUser);
          localStorage.removeItem(bookKey);

          // 加载用户默认课本
          loadUserBook();

          // 保存当前课本信息到localStorage
          bookData = {
            file: _init.currentFile,
            name: _init.currentBookName
          };
          localStorage.setItem(bookKey, JSON.stringify(bookData));

          // 更新UI上的用户名称显示
          userNameElement = document.getElementById('userName');
          if (userNameElement) {
            userNameElement.textContent = "".concat(_init.currentUserName, "\uFF0C\u5FEB\u6765\u5B66\u5355\u8BCD\uFF01");
          }
          currentUserDisplayElement = document.getElementById('currentUserDisplay');
          if (currentUserDisplayElement) {
            currentUserDisplayElement.textContent = _init.currentUserName;
          }

          // 加载用户统计数据
          _context2.n = 1;
          return loadUserStats();
        case 1:
          _context2.n = 2;
          return (0, _word.loadPDF)();
        case 2:
          // 更新打卡状态显示
          updateCheckInStatus();
        case 3:
          document.getElementById('userModal').classList.remove('active');
        case 4:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _closeUserModal.apply(this, arguments);
}
function updateStatsDisplay() {
  console.log('[更新统计显示] 开始');
  console.log('[更新统计显示] currentUser:', _init.currentUser);
  console.log('[更新统计显示] currentFile:', _init.currentFile);
  console.log('[更新统计显示] words.length:', _init.words.length);

  // 检查元素是否存在
  var totalWordsElement = document.getElementById('totalWords');
  var learnedWordsElement = document.getElementById('learnedWords');
  var userPointsElement = document.getElementById('userPoints');
  console.log('[更新统计显示] totalWordsElement:', totalWordsElement);
  console.log('[更新统计显示] learnedWordsElement:', learnedWordsElement);
  console.log('[更新统计显示] userPointsElement:', userPointsElement);

  // 使用DataManager获取用户数据
  var userData = DataManager.getUserData(_init.currentUser);
  console.log('[更新统计显示] 从DataManager获取的用户数据:', userData);

  // 只有当元素存在时才更新
  if (totalWordsElement) {
    // 优先从userData获取总单词数，避免words数组未加载的问题
    var totalCount = _init.words.length;
    if (userData.books && userData.books[_init.currentFile] && userData.books[_init.currentFile].totalWords) {
      totalCount = userData.books[_init.currentFile].totalWords;
    }
    totalWordsElement.textContent = totalCount;
    console.log('[更新统计显示] 单词总数:', totalCount);
  }
  if (learnedWordsElement) {
    var learnedCount = 0;
    if (userData.books && userData.books[_init.currentFile]) {
      // 同时支持旧格式（learnedWords数组）和新格式（learnedCount）
      if (userData.books[_init.currentFile].learnedCount !== undefined) {
        learnedCount = userData.books[_init.currentFile].learnedCount || 0;
      } else if (Array.isArray(userData.books[_init.currentFile].learnedWords)) {
        learnedCount = userData.books[_init.currentFile].learnedWords.length;
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

// 打卡功能
function checkIn() {
  var result = DataManager.checkIn(_init.currentUser);
  if (result.success) {
    // 显示打卡成功提示
    alert("\u6253\u5361\u6210\u529F\uFF01\u83B7\u5F97 ".concat(result.points, " \u79EF\u5206\uFF0C\u8FDE\u7EED\u6253\u5361 ").concat(result.consecutiveDays, " \u5929"));
    // 更新打卡状态
    updateCheckInStatus();
  } else {
    // 显示已打卡提示
    alert(result.message);
  }
}

// 更新每日任务进度
function updateDailyTaskProgress() {
  var dailyTask = DataManager.getDailyTask(_init.currentUser);
  var userData = DataManager.getUserData(_init.currentUser);

  // 检查是否有复习任务
  var hasReviewTask = hasWordsToReview(userData);

  // 显示或隐藏复习任务
  var reviewTaskElement = document.querySelector('.task-item:nth-child(2)');
  if (reviewTaskElement) {
    reviewTaskElement.style.display = hasReviewTask ? 'block' : 'none';
  }

  // 更新新学任务进度
  var newTaskProgress = document.getElementById('newTaskProgress');
  var newTaskText = document.getElementById('newTaskText');
  if (newTaskProgress && newTaskText) {
    // 新学任务进度：每天学习5个单词
    var newProgress = dailyTask.completedNewWords / 5 * 100;
    newTaskProgress.style.width = "".concat(Math.min(newProgress, 100), "%");
    if (dailyTask.completedNewWords >= 5) {
      newTaskText.textContent = '已完成';
    } else {
      newTaskText.textContent = "\u8FDB\u884C\u4E2D (".concat(dailyTask.completedNewWords, "/5)");
    }
  }

  // 更新复习任务进度
  if (hasReviewTask) {
    var reviewTaskProgress = document.getElementById('reviewTaskProgress');
    var reviewTaskText = document.getElementById('reviewTaskText');
    if (reviewTaskProgress && reviewTaskText) {
      // 复习任务进度：完成消消乐游戏
      var reviewProgress = dailyTask.completedReviewWords > 0 ? 100 : 0;
      reviewTaskProgress.style.width = "".concat(reviewProgress, "%");
      if (dailyTask.completedReviewWords > 0) {
        reviewTaskText.textContent = '已完成';
      } else {
        reviewTaskText.textContent = '进行中';
      }
    }
  }

  // 检查任务是否完成，更新打卡按钮状态
  var checkinBtnElement = document.getElementById('checkinBtn');
  if (checkinBtnElement && !DataManager.getCheckInStatus(_init.currentUser).checkedIn) {
    var taskCompleted = dailyTask.completedNewWords >= 5 && (!hasReviewTask || dailyTask.completedReviewWords > 0);
    checkinBtnElement.disabled = !taskCompleted;
    if (!taskCompleted) {
      checkinBtnElement.textContent = '任务未完成';
    } else {
      checkinBtnElement.textContent = '立即打卡';
    }
  }
}

// 检查是否有单词需要复习
function hasWordsToReview(userData) {
  // 检查错词本是否有单词
  if (userData.errorWords && userData.errorWords.length > 0) {
    return true;
  }

  // 检查是否有学习记录
  if (userData.wordLearningRecords && Object.keys(userData.wordLearningRecords).length > 0) {
    var today = new Date();
    for (var wordId in userData.wordLearningRecords) {
      var record = userData.wordLearningRecords[wordId];
      if (record.nextReviewAt) {
        var nextReviewAt = new Date(record.nextReviewAt);
        if (nextReviewAt <= today) {
          return true;
        }
      }
    }
  }
  return false;
}

// 更新打卡状态
function updateCheckInStatus() {
  var status = DataManager.getCheckInStatus(_init.currentUser);
  var checkinStatusElement = document.getElementById('checkinStatus');
  var checkinBtnElement = document.getElementById('checkinBtn');
  var consecutiveDaysElement = document.getElementById('consecutiveDays');
  var userPointsElement = document.getElementById('userPoints');
  if (checkinStatusElement) {
    checkinStatusElement.textContent = status.checkedIn ? '已打卡' : '未打卡';
    checkinStatusElement.className = "checkin-status ".concat(status.checkedIn ? 'checked' : '');
  }
  if (checkinBtnElement) {
    checkinBtnElement.textContent = status.checkedIn ? '今日已打卡' : '立即打卡';
    checkinBtnElement.disabled = status.checkedIn;
  }
  if (consecutiveDaysElement) {
    consecutiveDaysElement.textContent = status.consecutiveDays;
  }
  if (userPointsElement) {
    var points = DataManager.getUserPoints(_init.currentUser);
    userPointsElement.textContent = points;
  }

  // 更新每日任务进度
  updateDailyTaskProgress();
}