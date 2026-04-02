"use strict";

require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.pad-start.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/web.dom-collections.for-each.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// 数据管理模块
var DataManager = exports.default = /*#__PURE__*/function () {
  function DataManager() {
    _classCallCheck(this, DataManager);
  }
  return _createClass(DataManager, null, [{
    key: "getLocalDateString",
    value: function getLocalDateString() {
      var date = new Date();
      // 使用 getFullYear, getMonth, getDate 确保获取本地日期
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      return "".concat(year, "-").concat(month, "-").concat(day);
    }

    // 获取本地时间的ISO字符串
  }, {
    key: "getLocalISOString",
    value: function getLocalISOString(date) {
      // 创建一个新的日期对象，以确保不修改原始日期
      var localDate = new Date(date);
      // 获取本地时间与UTC时间的偏移量（毫秒）
      var offset = localDate.getTimezoneOffset() * 60000;
      // 调整为本地时间
      var localTime = localDate.getTime() - offset;
      // 创建新的日期对象并返回ISO字符串
      return new Date(localTime).toISOString();
    }

    // 获取本周开始日期（周一）
  }, {
    key: "getWeekStartDate",
    value: function getWeekStartDate() {
      var date = new Date();
      var day = date.getDay();
      var diff = date.getDate() - day + (day === 0 ? -6 : 1); // 调整为周一开始
      var weekStart = new Date(date.setDate(diff));
      var year = weekStart.getFullYear();
      var month = String(weekStart.getMonth() + 1).padStart(2, '0');
      var dayOfMonth = String(weekStart.getDate()).padStart(2, '0');
      return "".concat(year, "-").concat(month, "-").concat(dayOfMonth);
    }

    // 获取本月开始日期
  }, {
    key: "getMonthStartDate",
    value: function getMonthStartDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      return "".concat(year, "-").concat(month, "-01");
    }

    // 检查并更新学习目标
  }, {
    key: "checkAndUpdateGoals",
    value: function checkAndUpdateGoals(userData) {
      var _this = this;
      var today = this.getLocalDateString();
      var currentWeekStart = this.getWeekStartDate();
      var currentMonthStart = this.getMonthStartDate();

      // 检查每周目标
      if (userData.goals.weekly.weekStart !== currentWeekStart) {
        // 新的一周开始，重置每周目标
        userData.goals.weekly = {
          target: 100,
          current: 0,
          weekStart: currentWeekStart,
          completed: false
        };
      }

      // 检查每月目标
      if (userData.goals.monthly.monthStart !== currentMonthStart) {
        // 新的一月开始，重置每月目标
        userData.goals.monthly = {
          target: 400,
          current: 0,
          monthStart: currentMonthStart,
          completed: false
        };
      }

      // 计算总学习量（使用 total.learning 作为总学习量）
      var totalLearning = parseInt(userData.total.learning) || 0;

      // 检查学习里程碑
      userData.goals.milestones.forEach(function (milestone) {
        if (!milestone.completed && totalLearning >= milestone.target) {
          milestone.completed = true;
          if (!milestone.rewarded) {
            // 给予里程碑奖励
            var rewardPoints = 0;
            switch (milestone.target) {
              case 100:
                rewardPoints = 10;
                break;
              case 500:
                rewardPoints = 20;
                break;
              case 1000:
                rewardPoints = 50;
                break;
              case 5000:
                rewardPoints = 100;
                break;
              case 10000:
                rewardPoints = 200;
                break;
            }
            if (rewardPoints > 0) {
              userData.total.points = (parseFloat(userData.total.points) || 0) + rewardPoints;
              _this.addPointsHistory(userData, 'income', rewardPoints, "\u5B66\u4E60\u91CC\u7A0B\u7891\u5956\u52B1 - \u7D2F\u8BA1\u5B66\u4E60 ".concat(milestone.target, " \u4E2A\u5355\u8BCD"));
              milestone.rewarded = true;
              // 显示奖励提示
              alert("\u606D\u559C\u4F60\u8FBE\u6210\u5B66\u4E60\u91CC\u7A0B\u7891\uFF01\u7D2F\u8BA1\u5B66\u4E60 ".concat(milestone.target, " \u4E2A\u5355\u8BCD\uFF0C\u83B7\u5F97 ").concat(rewardPoints, " \u79EF\u5206\u5956\u52B1\uFF01"));
            }
          }
        }
      });
    }

    // 更新学习进度并检查目标完成情况
  }, {
    key: "updateLearningProgress",
    value: function updateLearningProgress(userData, wordsCount) {
      // 检查每日目标完成情况
      var dailyTarget = 15; // 每日目标15个单词
      if (userData.today.learning >= dailyTarget && !userData.today.goalCompleted) {
        userData.today.goalCompleted = true;
        // 给予每日目标奖励
        var rewardPoints = 2;
        userData.total.points = (parseFloat(userData.total.points) || 0) + rewardPoints;
        this.addPointsHistory(userData, 'income', rewardPoints, '每日学习目标完成奖励');
        // 显示奖励提示
        alert("\u606D\u559C\u4F60\u5B8C\u6210\u6BCF\u65E5\u5B66\u4E60\u76EE\u6807\uFF01\u83B7\u5F97 ".concat(rewardPoints, " \u79EF\u5206\u5956\u52B1\uFF01"));
      }

      // 更新每周目标进度
      userData.goals.weekly.current += wordsCount;
      if (userData.goals.weekly.current >= userData.goals.weekly.target && !userData.goals.weekly.completed) {
        userData.goals.weekly.completed = true;
        // 给予每周目标奖励
        var _rewardPoints = 10;
        userData.total.points = (parseFloat(userData.total.points) || 0) + _rewardPoints;
        this.addPointsHistory(userData, 'income', _rewardPoints, '每周学习目标完成奖励');
        // 显示奖励提示
        alert("\u606D\u559C\u4F60\u5B8C\u6210\u6BCF\u5468\u5B66\u4E60\u76EE\u6807\uFF01\u83B7\u5F97 ".concat(_rewardPoints, " \u79EF\u5206\u5956\u52B1\uFF01"));
      }

      // 更新每月目标进度
      userData.goals.monthly.current += wordsCount;
      if (userData.goals.monthly.current >= userData.goals.monthly.target && !userData.goals.monthly.completed) {
        userData.goals.monthly.completed = true;
        // 给予每月目标奖励
        var _rewardPoints2 = 20;
        userData.total.points = (parseFloat(userData.total.points) || 0) + _rewardPoints2;
        this.addPointsHistory(userData, 'income', _rewardPoints2, '每月学习目标完成奖励');
        // 显示奖励提示
        alert("\u606D\u559C\u4F60\u5B8C\u6210\u6BCF\u6708\u5B66\u4E60\u76EE\u6807\uFF01\u83B7\u5F97 ".concat(_rewardPoints2, " \u79EF\u5206\u5956\u52B1\uFF01"));
      }

      // 检查学习里程碑
      this.checkAndUpdateGoals(userData);
    }

    // 数据版本号
  }, {
    key: "getUserData",
    value: function getUserData(user) {
      try {
        var userKey = "userStats_".concat(user);
        var data = localStorage.getItem(userKey);
        console.log('[DataManager] getUserData - user:', user);
        console.log('[DataManager] getUserData - userKey:', userKey);
        console.log('[DataManager] getUserData - 从localStorage获取的数据:', data);
        if (data) {
          // 解析现有数据
          var userData;
          try {
            userData = JSON.parse(data);
            console.log('[DataManager] getUserData - 解析后的数据:', userData);
          } catch (parseError) {
            console.error('[DataManager] getUserData - 解析用户数据失败:', parseError);
            // 解析失败时使用默认数据
            alert('用户数据解析失败，正在重置数据...');
            userData = {
              version: DataManager.DATA_VERSION,
              errorWords: [],
              today: {
                date: DataManager.getLocalDateString(),
                learning: 0,
                testing: 0,
                correct: 0,
                error: 0,
                checkedIn: false
              },
              total: {
                learning: 0,
                testing: 0,
                correct: 0,
                error: 0,
                points: 0,
                consecutiveDays: 0,
                totalCheckins: 0
              },
              books: {},
              checkinHistory: [],
              pointsHistory: [],
              pets: [],
              goals: {
                weekly: {
                  target: 100,
                  // 每周学习目标：100个单词
                  current: 0,
                  // 当前进度
                  weekStart: DataManager.getWeekStartDate(),
                  // 本周开始日期
                  completed: false // 是否完成
                },
                monthly: {
                  target: 400,
                  // 每月学习目标：400个单词
                  current: 0,
                  // 当前进度
                  monthStart: DataManager.getMonthStartDate(),
                  // 本月开始日期
                  completed: false // 是否完成
                },
                milestones: [{
                  target: 100,
                  completed: false,
                  rewarded: false
                }, {
                  target: 500,
                  completed: false,
                  rewarded: false
                }, {
                  target: 1000,
                  completed: false,
                  rewarded: false
                }, {
                  target: 5000,
                  completed: false,
                  rewarded: false
                }, {
                  target: 10000,
                  completed: false,
                  rewarded: false
                }]
              }
            };
          }

          // 检查数据版本
          console.log('[DataManager] 检查数据版本:', userData.version, 'vs', DataManager.DATA_VERSION);
          console.log('[DataManager] 版本类型:', typeof userData.version, 'vs', typeof DataManager.DATA_VERSION);
          if (userData.version && userData.version === DataManager.DATA_VERSION) {
            console.log('[DataManager] 数据版本一致，无需转换');

            // 确保 today 对象存在且字段完整
            if (!userData.today || typeof userData.today !== 'object') {
              userData.today = {
                date: DataManager.getLocalDateString(),
                learning: 0,
                testing: 0,
                correct: 0,
                error: 0,
                checkedIn: false,
                goalCompleted: false
              };
            } else {
              // 补全 today 字段，确保所有字段都存在
              userData.today.date = userData.today.date || DataManager.getLocalDateString();
              // 确保字段都是有效的数字，避免NaN值
              userData.today.learning = parseInt(userData.today.learning) || 0;
              userData.today.testing = parseInt(userData.today.testing) || 0;
              userData.today.correct = parseInt(userData.today.correct) || 0;
              userData.today.error = parseInt(userData.today.error) || 0;
              userData.today.checkedIn = userData.today.checkedIn || false;
              userData.today.goalCompleted = userData.today.goalCompleted || false;
            }

            // 确保 total 对象存在且字段完整
            if (!userData.total || typeof userData.total !== 'object') {
              userData.total = {
                learning: 0,
                testing: 0,
                correct: 0,
                error: 0,
                points: 0,
                consecutiveDays: 0,
                totalCheckins: 0
              };
            } else {
              // 补全 total 字段，确保所有字段都存在
              // 确保字段都是有效的数字，避免NaN值
              userData.total.learning = parseInt(userData.total.learning) || 0;
              userData.total.testing = parseInt(userData.total.testing) || 0;
              userData.total.correct = parseInt(userData.total.correct) || 0;
              userData.total.error = parseInt(userData.total.error) || 0;
              userData.total.points = parseFloat(userData.total.points) || 0;
              userData.total.consecutiveDays = parseInt(userData.total.consecutiveDays) || 0;
              userData.total.totalCheckins = parseInt(userData.total.totalCheckins) || 0;
            }

            // 确保 books 对象存在且每个课本都有必要的字段
            if (!userData.books || typeof userData.books !== 'object') {
              userData.books = {};
            } else {
              // 确保每个课本都有必要的字段
              for (var bookFile in userData.books) {
                if (typeof userData.books[bookFile] !== 'object') {
                  userData.books[bookFile] = {
                    totalWords: 0,
                    learnedCount: 0
                  };
                } else {
                  // 确保必要字段存在且是有效的数字，避免NaN值
                  userData.books[bookFile].totalWords = parseInt(userData.books[bookFile].totalWords) || 0;
                  userData.books[bookFile].learnedCount = parseInt(userData.books[bookFile].learnedCount) || 0;
                }
              }
            }

            // 确保 goals 对象存在且字段完整
            if (!userData.goals || typeof userData.goals !== 'object') {
              userData.goals = {
                weekly: {
                  target: 100,
                  // 每周学习目标：100个单词
                  current: 0,
                  // 当前进度
                  weekStart: DataManager.getWeekStartDate(),
                  // 本周开始日期
                  completed: false // 是否完成
                },
                monthly: {
                  target: 400,
                  // 每月学习目标：400个单词
                  current: 0,
                  // 当前进度
                  monthStart: DataManager.getMonthStartDate(),
                  // 本月开始日期
                  completed: false // 是否完成
                },
                milestones: [{
                  target: 100,
                  completed: false,
                  rewarded: false
                }, {
                  target: 500,
                  completed: false,
                  rewarded: false
                }, {
                  target: 1000,
                  completed: false,
                  rewarded: false
                }, {
                  target: 5000,
                  completed: false,
                  rewarded: false
                }, {
                  target: 10000,
                  completed: false,
                  rewarded: false
                }]
              };
            } else {
              // 补全 weekly 目标
              if (!userData.goals.weekly || typeof userData.goals.weekly !== 'object') {
                userData.goals.weekly = {
                  target: 100,
                  current: 0,
                  weekStart: DataManager.getWeekStartDate(),
                  completed: false
                };
              } else {
                userData.goals.weekly.target = userData.goals.weekly.target || 100;
                userData.goals.weekly.current = parseInt(userData.goals.weekly.current) || 0;
                userData.goals.weekly.weekStart = userData.goals.weekly.weekStart || DataManager.getWeekStartDate();
                userData.goals.weekly.completed = userData.goals.weekly.completed || false;
              }

              // 补全 monthly 目标
              if (!userData.goals.monthly || typeof userData.goals.monthly !== 'object') {
                userData.goals.monthly = {
                  target: 400,
                  current: 0,
                  monthStart: DataManager.getMonthStartDate(),
                  completed: false
                };
              } else {
                userData.goals.monthly.target = userData.goals.monthly.target || 400;
                userData.goals.monthly.current = parseInt(userData.goals.monthly.current) || 0;
                userData.goals.monthly.monthStart = userData.goals.monthly.monthStart || DataManager.getMonthStartDate();
                userData.goals.monthly.completed = userData.goals.monthly.completed || false;
              }

              // 补全 milestones
              if (!userData.goals.milestones || !Array.isArray(userData.goals.milestones)) {
                userData.goals.milestones = [{
                  target: 100,
                  completed: false,
                  rewarded: false
                }, {
                  target: 500,
                  completed: false,
                  rewarded: false
                }, {
                  target: 1000,
                  completed: false,
                  rewarded: false
                }, {
                  target: 5000,
                  completed: false,
                  rewarded: false
                }, {
                  target: 10000,
                  completed: false,
                  rewarded: false
                }];
              }
            }

            // 确保 wordLearningRecords 对象存在
            if (!userData.wordLearningRecords || typeof userData.wordLearningRecords !== 'object') {
              userData.wordLearningRecords = {};
            }

            // 确保 masteredWords 对象存在
            if (!userData.masteredWords || typeof userData.masteredWords !== 'object') {
              userData.masteredWords = {};
            }

            // 确保 dailyTasks 对象存在
            if (!userData.dailyTasks || typeof userData.dailyTasks !== 'object') {
              userData.dailyTasks = {};
            }

            // 检查并更新学习目标
            DataManager.checkAndUpdateGoals(userData);
            console.log('[DataManager] getUserData - 返回的数据:', userData);
            return userData;
          }

          // 版本不一致，需要转换数据
          console.log('[DataManager] 数据版本不一致，需要转换');

          // 确保版本字段存在
          userData.version = DataManager.DATA_VERSION;

          // 确保 today 对象存在且字段完整
          if (!userData.today || typeof userData.today !== 'object') {
            userData.today = {
              date: DataManager.getLocalDateString(),
              learning: 0,
              testing: 0,
              correct: 0,
              error: 0,
              checkedIn: false
            };
          } else {
            // 补全 today 字段，确保所有字段都存在
            userData.today.date = userData.today.date || DataManager.getLocalDateString();
            // 确保字段都是有效的数字，避免NaN值
            userData.today.learning = parseInt(userData.today.learning) || 0;
            userData.today.testing = parseInt(userData.today.testing) || 0;
            userData.today.correct = parseInt(userData.today.correct) || 0;
            userData.today.error = parseInt(userData.today.error) || 0;
            userData.today.checkedIn = userData.today.checkedIn || false;
            userData.today.goalCompleted = userData.today.goalCompleted || false;
          }

          // 确保 total 对象存在且字段完整
          if (!userData.total || typeof userData.total !== 'object') {
            userData.total = {
              learning: 0,
              testing: 0,
              correct: 0,
              error: 0,
              points: 0,
              consecutiveDays: 0,
              totalCheckins: 0
            };
          } else {
            // 补全 total 字段，确保所有字段都存在
            // 确保字段都是有效的数字，避免NaN值
            userData.total.learning = parseInt(userData.total.learning) || 0;
            userData.total.testing = parseInt(userData.total.testing) || 0;
            userData.total.correct = parseInt(userData.total.correct) || 0;
            userData.total.error = parseInt(userData.total.error) || 0;
            userData.total.points = parseFloat(userData.total.points) || 0;
            userData.total.consecutiveDays = parseInt(userData.total.consecutiveDays) || 0;
            userData.total.totalCheckins = parseInt(userData.total.totalCheckins) || 0;
          }

          // 确保 books 对象存在
          if (!userData.books || typeof userData.books !== 'object') {
            userData.books = {};
          } else {
            // 转换旧的 learnedWords 数组格式为新的 learnedCount 格式
            for (var _bookFile in userData.books) {
              if (typeof userData.books[_bookFile] !== 'object') {
                userData.books[_bookFile] = {
                  totalWords: 0,
                  learnedCount: 0
                };
              } else {
                // 转换旧格式数据
                if (userData.books[_bookFile].learnedWords && Array.isArray(userData.books[_bookFile].learnedWords)) {
                  console.log('[DataManager] 检测到旧格式数据，转换为新格式:', _bookFile);
                  userData.books[_bookFile].learnedCount = userData.books[_bookFile].learnedWords.length;
                  // 删除旧格式数据
                  delete userData.books[_bookFile].learnedWords;
                }
                // 确保必要字段存在且是有效的数字，避免NaN值
                userData.books[_bookFile].totalWords = parseInt(userData.books[_bookFile].totalWords) || 0;
                userData.books[_bookFile].learnedCount = parseInt(userData.books[_bookFile].learnedCount) || 0;
              }
            }
          }

          // 确保 checkinHistory 数组存在并转换为新格式
          if (!userData.checkinHistory || !Array.isArray(userData.checkinHistory)) {
            userData.checkinHistory = [];
          } else {
            // 转换旧的字符串格式为新的对象格式
            try {
              userData.checkinHistory = userData.checkinHistory.map(function (item) {
                if (typeof item === 'string') {
                  return {
                    date: item,
                    points: 5
                  }; // 默认为5积分
                }
                return item;
              });
            } catch (mapError) {
              console.error('转换打卡历史失败:', mapError);
              userData.checkinHistory = [];
            }
          }

          // 确保 errorWords 数组存在
          if (!userData.errorWords || !Array.isArray(userData.errorWords)) {
            userData.errorWords = [];
          }

          // 确保 wordLearningRecords 对象存在
          if (!userData.wordLearningRecords || typeof userData.wordLearningRecords !== 'object') {
            userData.wordLearningRecords = {};
          }

          // 确保 masteredWords 对象存在
          if (!userData.masteredWords || typeof userData.masteredWords !== 'object') {
            userData.masteredWords = {};
          }

          // 确保 dailyTasks 对象存在
          if (!userData.dailyTasks || typeof userData.dailyTasks !== 'object') {
            userData.dailyTasks = {};
          }

          // 确保 today 对象存在
          if (!userData.today || typeof userData.today !== 'object') {
            userData.today = {
              date: this.getLocalDateString(),
              learning: 0,
              testing: 0,
              correct: 0,
              error: 0,
              checkedIn: false,
              goalCompleted: false,
              newWordsLearned: 0,
              reviewWordsCompleted: 0
            };
          }

          // 确保 goals 对象存在且字段完整
          if (!userData.goals || typeof userData.goals !== 'object') {
            userData.goals = {
              weekly: {
                target: 100,
                // 每周学习目标：100个单词
                current: 0,
                // 当前进度
                weekStart: DataManager.getWeekStartDate(),
                // 本周开始日期
                completed: false // 是否完成
              },
              monthly: {
                target: 400,
                // 每月学习目标：400个单词
                current: 0,
                // 当前进度
                monthStart: DataManager.getMonthStartDate(),
                // 本月开始日期
                completed: false // 是否完成
              },
              milestones: [{
                target: 100,
                completed: false,
                rewarded: false
              }, {
                target: 500,
                completed: false,
                rewarded: false
              }, {
                target: 1000,
                completed: false,
                rewarded: false
              }, {
                target: 5000,
                completed: false,
                rewarded: false
              }, {
                target: 10000,
                completed: false,
                rewarded: false
              }]
            };
          }

          // 检查并更新学习目标
          DataManager.checkAndUpdateGoals(userData);

          // 转换完成后保存回 localStorage，确保下次加载时使用新格式
          try {
            // 使用 saveUserData 函数来保存数据，确保数据结构完整
            DataManager.saveUserData(user, userData);
            console.log('[DataManager] 转换后的数据已保存回 localStorage');
          } catch (saveError) {
            console.error('[DataManager] 保存转换后的数据失败:', saveError);
          }
          console.log('[DataManager] getUserData - 返回的数据:', userData);
          return userData;
        } else {
          // 返回默认数据结构
          var defaultData = {
            version: DataManager.DATA_VERSION,
            errorWords: [],
            today: {
              date: DataManager.getLocalDateString(),
              learning: 0,
              testing: 0,
              correct: 0,
              error: 0,
              checkedIn: false
            },
            total: {
              learning: 0,
              testing: 0,
              correct: 0,
              error: 0,
              points: 0,
              consecutiveDays: 0,
              totalCheckins: 0
            },
            books: {},
            checkinHistory: [],
            pointsHistory: [],
            pets: [],
            goals: {
              weekly: {
                target: 100,
                // 每周学习目标：100个单词
                current: 0,
                // 当前进度
                weekStart: DataManager.getWeekStartDate(),
                // 本周开始日期
                completed: false // 是否完成
              },
              monthly: {
                target: 400,
                // 每月学习目标：400个单词
                current: 0,
                // 当前进度
                monthStart: DataManager.getMonthStartDate(),
                // 本月开始日期
                completed: false // 是否完成
              },
              milestones: [{
                target: 100,
                completed: false,
                rewarded: false
              }, {
                target: 500,
                completed: false,
                rewarded: false
              }, {
                target: 1000,
                completed: false,
                rewarded: false
              }, {
                target: 5000,
                completed: false,
                rewarded: false
              }, {
                target: 10000,
                completed: false,
                rewarded: false
              }]
            }
          };

          // 保存默认数据到 localStorage，确保下次加载时使用
          try {
            var _userKey = "userStats_".concat(user);
            localStorage.setItem(_userKey, JSON.stringify(defaultData));
            console.log('[DataManager] 默认数据已保存到 localStorage');
          } catch (saveError) {
            console.error('[DataManager] 保存默认数据失败:', saveError);
          }
          console.log('[DataManager] getUserData - 返回默认数据:', defaultData);
          return defaultData;
        }
      } catch (error) {
        console.error('[DataManager] getUserData - 获取用户数据失败:', error);
        var errorData = {
          version: DataManager.DATA_VERSION,
          errorWords: [],
          today: {
            date: DataManager.getLocalDateString(),
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            checkedIn: false
          },
          total: {
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            points: 0,
            consecutiveDays: 0,
            totalCheckins: 0
          },
          books: {},
          checkinHistory: [],
          pointsHistory: [],
          pets: [],
          goals: {
            weekly: {
              target: 100,
              // 每周学习目标：100个单词
              current: 0,
              // 当前进度
              weekStart: DataManager.getWeekStartDate(),
              // 本周开始日期
              completed: false // 是否完成
            },
            monthly: {
              target: 400,
              // 每月学习目标：400个单词
              current: 0,
              // 当前进度
              monthStart: DataManager.getMonthStartDate(),
              // 本月开始日期
              completed: false // 是否完成
            },
            milestones: [{
              target: 100,
              completed: false,
              rewarded: false
            }, {
              target: 500,
              completed: false,
              rewarded: false
            }, {
              target: 1000,
              completed: false,
              rewarded: false
            }, {
              target: 5000,
              completed: false,
              rewarded: false
            }, {
              target: 10000,
              completed: false,
              rewarded: false
            }]
          }
        };
        console.log('[DataManager] getUserData - 返回错误数据:', errorData);
        return errorData;
      }
    }
  }, {
    key: "saveUserData",
    value: function saveUserData(user, data) {
      console.log('[DataManager] saveUserData 开始');
      console.log('[DataManager] user:', user);
      console.log('[DataManager] data:', data);
      try {
        var userKey = "userStats_".concat(user);
        console.log('[DataManager] userKey:', userKey);

        // 确保数据结构完整
        var safeData = {
          version: DataManager.DATA_VERSION,
          errorWords: Array.isArray(data.errorWords) ? data.errorWords : [],
          wordLearningRecords: typeof data.wordLearningRecords === 'object' && data.wordLearningRecords !== null ? data.wordLearningRecords : {},
          masteredWords: typeof data.masteredWords === 'object' && data.masteredWords !== null ? data.masteredWords : {},
          dailyTasks: typeof data.dailyTasks === 'object' && data.dailyTasks !== null ? data.dailyTasks : {},
          today: typeof data.today === 'object' && data.today !== null ? {
            date: data.today.date || DataManager.getLocalDateString(),
            learning: data.today.learning || 0,
            testing: data.today.testing || 0,
            correct: data.today.correct || 0,
            error: data.today.error || 0,
            checkedIn: data.today.checkedIn || false,
            goalCompleted: data.today.goalCompleted || false,
            newWordsLearned: data.today.newWordsLearned || 0,
            reviewWordsCompleted: data.today.reviewWordsCompleted || 0
          } : {
            date: DataManager.getLocalDateString(),
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            checkedIn: false,
            goalCompleted: false,
            newWordsLearned: 0,
            reviewWordsCompleted: 0
          },
          total: typeof data.total === 'object' && data.total !== null ? {
            learning: parseInt(data.total.learning) || 0,
            testing: parseInt(data.total.testing) || 0,
            correct: parseInt(data.total.correct) || 0,
            error: parseInt(data.total.error) || 0,
            points: parseFloat(data.total.points) || 0,
            consecutiveDays: parseInt(data.total.consecutiveDays) || 0,
            totalCheckins: parseInt(data.total.totalCheckins) || 0
          } : {
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            points: 0,
            consecutiveDays: 0,
            totalCheckins: 0
          },
          books: typeof data.books === 'object' && data.books !== null ? function () {
            var safeBooks = {};
            for (var bookFile in data.books) {
              if (typeof data.books[bookFile] === 'object' && data.books[bookFile] !== null) {
                safeBooks[bookFile] = {
                  totalWords: parseInt(data.books[bookFile].totalWords) || 0,
                  learnedCount: parseInt(data.books[bookFile].learnedCount) || 0
                };
              } else {
                safeBooks[bookFile] = {
                  totalWords: 0,
                  learnedCount: 0
                };
              }
            }
            return safeBooks;
          }() : {},
          checkinHistory: Array.isArray(data.checkinHistory) ? data.checkinHistory : [],
          pointsHistory: Array.isArray(data.pointsHistory) ? data.pointsHistory : [],
          pets: Array.isArray(data.pets) ? data.pets : [],
          goals: typeof data.goals === 'object' && data.goals !== null ? {
            weekly: typeof data.goals.weekly === 'object' && data.goals.weekly !== null ? {
              target: data.goals.weekly.target || 100,
              current: parseInt(data.goals.weekly.current) || 0,
              weekStart: data.goals.weekly.weekStart || DataManager.getWeekStartDate(),
              completed: data.goals.weekly.completed || false
            } : {
              target: 100,
              current: 0,
              weekStart: DataManager.getWeekStartDate(),
              completed: false
            },
            monthly: typeof data.goals.monthly === 'object' && data.goals.monthly !== null ? {
              target: data.goals.monthly.target || 400,
              current: parseInt(data.goals.monthly.current) || 0,
              monthStart: data.goals.monthly.monthStart || DataManager.getMonthStartDate(),
              completed: data.goals.monthly.completed || false
            } : {
              target: 400,
              current: 0,
              monthStart: DataManager.getMonthStartDate(),
              completed: false
            },
            milestones: Array.isArray(data.goals.milestones) ? data.goals.milestones : [{
              target: 100,
              completed: false,
              rewarded: false
            }, {
              target: 500,
              completed: false,
              rewarded: false
            }, {
              target: 1000,
              completed: false,
              rewarded: false
            }, {
              target: 5000,
              completed: false,
              rewarded: false
            }, {
              target: 10000,
              completed: false,
              rewarded: false
            }]
          } : {
            weekly: {
              target: 100,
              current: 0,
              weekStart: DataManager.getWeekStartDate(),
              completed: false
            },
            monthly: {
              target: 400,
              current: 0,
              monthStart: DataManager.getMonthStartDate(),
              completed: false
            },
            milestones: [{
              target: 100,
              completed: false,
              rewarded: false
            }, {
              target: 500,
              completed: false,
              rewarded: false
            }, {
              target: 1000,
              completed: false,
              rewarded: false
            }, {
              target: 5000,
              completed: false,
              rewarded: false
            }, {
              target: 10000,
              completed: false,
              rewarded: false
            }]
          }
        };

        // 确保 books 对象中的每个课本都有必要的字段
        if (safeData.books) {
          for (var bookFile in safeData.books) {
            if (typeof safeData.books[bookFile] !== 'object') {
              safeData.books[bookFile] = {
                totalWords: 0,
                learnedCount: 0
              };
            } else {
              safeData.books[bookFile].totalWords = safeData.books[bookFile].totalWords || 0;
              safeData.books[bookFile].learnedCount = safeData.books[bookFile].learnedCount || 0;
            }
          }
        }
        localStorage.setItem(userKey, JSON.stringify(safeData));
        console.log('[DataManager] 数据保存成功');
        // 验证保存是否成功
        var savedData = localStorage.getItem(userKey);
        console.log('[DataManager] 验证保存结果:', savedData);
        return true;
      } catch (error) {
        console.error('保存用户数据失败:', error);
        return false;
      } finally {
        console.log('[DataManager] saveUserData 结束');
      }
    }
  }, {
    key: "getErrorWords",
    value: function getErrorWords(user) {
      try {
        var userData = this.getUserData(user);
        return userData.errorWords || [];
      } catch (error) {
        console.error('获取错词本失败:', error);
        return [];
      }
    }
  }, {
    key: "addErrorWord",
    value: function addErrorWord(user, word) {
      try {
        // 使用 getUserData 获取数据，确保数据结构完整和版本一致
        var userData = this.getUserData(user);
        var errorWords = userData.errorWords || [];

        // 检查单词是否已存在
        var exists = errorWords.some(function (w) {
          return w.word === word.word;
        });
        if (!exists) {
          errorWords.push(word);
          userData.errorWords = errorWords;
          userData.today.error = (userData.today.error || 0) + 1;
          userData.total.error = (userData.total.error || 0) + 1;
          this.saveUserData(user, userData);
        }
      } catch (error) {
        console.error('添加错词失败:', error);
      }
    }
  }, {
    key: "removeErrorWord",
    value: function removeErrorWord(user, word) {
      try {
        var userData = this.getUserData(user);
        var errorWords = userData.errorWords || [];
        userData.errorWords = errorWords.filter(function (w) {
          return w.word !== word.word;
        });
        this.saveUserData(user, userData);
      } catch (error) {
        console.error('移除错词失败:', error);
      }
    }
  }, {
    key: "initBookData",
    value: function initBookData(user, bookFile, totalWords) {
      console.log('[DataManager] initBookData 开始');
      console.log('[DataManager] user:', user);
      console.log('[DataManager] bookFile:', bookFile);
      console.log('[DataManager] totalWords:', totalWords);
      try {
        // 使用 getUserData 获取数据，确保数据结构完整和版本一致
        var userData = DataManager.getUserData(user);

        // 确保 books 对象存在
        if (!userData.books) {
          userData.books = {};
          console.log('[DataManager] 创建 books 对象');
        }

        // 只有当课本数据不存在时才创建新的，避免重置已学单词数据
        if (!userData.books[bookFile]) {
          userData.books[bookFile] = {
            totalWords: totalWords,
            learnedCount: 0
          };
          console.log('[DataManager] 创建课本数据:', bookFile);
        } else {
          // 如果课本数据已存在，只更新总单词数，保留已学单词数据
          userData.books[bookFile].totalWords = totalWords;
          // 确保 learnedCount 存在
          if (userData.books[bookFile].learnedCount === undefined) {
            userData.books[bookFile].learnedCount = 0;
            console.log('[DataManager] 确保 learnedCount 存在');
          }
          console.log('[DataManager] 更新课本总单词数:', totalWords);
          console.log('[DataManager] 保留已学单词数量:', userData.books[bookFile].learnedCount);
        }

        // 确保 today 对象存在且字段完整
        if (!userData.today || typeof userData.today !== 'object') {
          userData.today = {
            date: DataManager.getLocalDateString(),
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            checkedIn: false,
            goalCompleted: false
          };
        } else {
          // 补全 today 字段，确保所有字段都存在
          userData.today.date = userData.today.date || DataManager.getLocalDateString();
          // 确保字段都是有效的数字
          userData.today.learning = parseInt(userData.today.learning) || 0;
          userData.today.testing = parseInt(userData.today.testing) || 0;
          userData.today.correct = parseInt(userData.today.correct) || 0;
          userData.today.error = parseInt(userData.today.error) || 0;
          userData.today.checkedIn = userData.today.checkedIn || false;
        }

        // 确保 total 对象存在且字段完整
        if (!userData.total || typeof userData.total !== 'object') {
          userData.total = {
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            points: 0,
            consecutiveDays: 0,
            totalCheckins: 0
          };
        } else {
          // 补全 total 字段，确保所有字段都存在
          // 确保字段都是有效的数字
          userData.total.learning = parseInt(userData.total.learning) || 0;
          userData.total.testing = parseInt(userData.total.testing) || 0;
          userData.total.correct = parseInt(userData.total.correct) || 0;
          userData.total.error = parseInt(userData.total.error) || 0;
          userData.total.points = parseFloat(userData.total.points) || 0;
          userData.total.consecutiveDays = parseInt(userData.total.consecutiveDays) || 0;
          userData.total.totalCheckins = parseInt(userData.total.totalCheckins) || 0;
        }

        // 保存数据到 localStorage
        DataManager.saveUserData(user, userData);
        console.log('[DataManager] 保存课本数据成功');
        console.log('[DataManager] initBookData 结束');
        return userData.books[bookFile];
      } catch (error) {
        console.error('初始化课本数据失败:', error);
        return null;
      }
    }
  }, {
    key: "markWordAsLearned",
    value: function markWordAsLearned(user, bookFile, word) {
      console.log('[DataManager] markWordAsLearned 开始');
      console.log('[DataManager] user:', user);
      console.log('[DataManager] bookFile:', bookFile);
      console.log('[DataManager] word:', word);
      try {
        // 使用 getUserData 获取数据，确保数据结构完整和版本一致
        var userData = DataManager.getUserData(user);

        // 确保所有必要的字段存在
        if (!userData.books) userData.books = {};
        if (!userData.books[bookFile]) {
          userData.books[bookFile] = {
            totalWords: 0,
            learnedCount: 0
          };
        }
        // 确保 today 对象存在且日期为今天
        var today = DataManager.getLocalDateString();
        if (!userData.today || userData.today.date !== today) {
          userData.today = {
            date: today,
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            checkedIn: false,
            goalCompleted: false,
            newWordsLearned: 0,
            reviewWordsCompleted: 0
          };
        } else {
          // 补全 today 字段
          userData.today.newWordsLearned = parseInt(userData.today.newWordsLearned) || 0;
          userData.today.reviewWordsCompleted = parseInt(userData.today.reviewWordsCompleted) || 0;
        }
        if (!userData.total) {
          userData.total = {
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            points: 0,
            consecutiveDays: 0,
            totalCheckins: 0
          };
        }

        // 直接增加已学单词数量
        userData.books[bookFile].learnedCount = (parseInt(userData.books[bookFile].learnedCount) || 0) + 1;
        userData.today.learning = (parseInt(userData.today.learning) || 0) + 1;
        userData.total.learning = (parseInt(userData.total.learning) || 0) + 1;
        console.log('[DataManager] 增加已学单词数量:', userData.books[bookFile].learnedCount);
        console.log('[DataManager] 今日学习次数:', userData.today.learning);
        console.log('[DataManager] 累计学习次数:', userData.total.learning);

        // 更新新学任务进度
        this.updateTaskProgress(user, 'new');

        // 保存单词学习记录
        this.saveWordLearningRecord(user, word.word, word.meaning, true);

        // 注意：saveWordLearningRecord 方法已经调用了 saveUserData，所以这里不需要再调用
        console.log('[DataManager] 保存成功');

        // 验证保存结果
        var userKey = "userStats_".concat(user);
        var savedData = localStorage.getItem(userKey);
        console.log('[DataManager] 验证保存结果:', savedData);
        var parsedSavedData = JSON.parse(savedData);
        console.log('[DataManager] 解析后的保存结果:', parsedSavedData);
        console.log('[DataManager] markWordAsLearned 结束');
        return userData.books[bookFile];
      } catch (error) {
        console.error('标记单词为已学失败:', error);
        return null;
      }
    }
  }, {
    key: "getLearnedWordsCount",
    value: function getLearnedWordsCount(user, bookFile) {
      console.log('[DataManager] getLearnedWordsCount 开始');
      console.log('[DataManager] user:', user);
      console.log('[DataManager] bookFile:', bookFile);
      try {
        // 使用 getUserData 获取数据，确保数据结构完整和版本一致
        var userData = this.getUserData(user);
        console.log('[DataManager] userData:', userData);
        console.log('[DataManager] userData.books:', userData.books);

        // 检查数据结构是否完整
        if (userData && userData.books && userData.books[bookFile]) {
          console.log('[DataManager] 课本数据存在:', userData.books[bookFile]);
          var learnedCount = 0;
          // 同时支持旧格式（learnedWords数组）和新格式（learnedCount）
          if (userData.books[bookFile].learnedCount !== undefined) {
            learnedCount = userData.books[bookFile].learnedCount || 0;
          } else if (Array.isArray(userData.books[bookFile].learnedWords)) {
            learnedCount = userData.books[bookFile].learnedWords.length;
          }
          console.log('[DataManager] learnedCount:', learnedCount);
          return learnedCount;
        }
        console.log('[DataManager] 未找到已学单词数据');
        return 0;
      } catch (error) {
        console.error('获取已学单词数量失败:', error);
        return 0;
      }
    }
  }, {
    key: "getBookData",
    value: function getBookData(user, bookFile) {
      try {
        var userData = this.getUserData(user);
        if (userData && userData.books && userData.books[bookFile]) {
          return userData.books[bookFile];
        }
        // 如果课本数据不存在，尝试从localStorage直接获取
        var userKey = "userStats_".concat(user);
        var savedData = localStorage.getItem(userKey);
        if (savedData) {
          var parsedData = JSON.parse(savedData);
          if (parsedData && parsedData.books && parsedData.books[bookFile]) {
            return parsedData.books[bookFile];
          }
        }
        return null;
      } catch (error) {
        console.error('获取课本数据失败:', error);
        return null;
      }
    }
  }, {
    key: "checkIn",
    value: function checkIn(user) {
      try {
        var userData = DataManager.getUserData(user);
        var today = DataManager.getLocalDateString();
        console.log('[DataManager] checkIn 开始');
        console.log('[DataManager] today:', today);
        console.log('[DataManager] 当前打卡状态:', userData.today.checkedIn);
        console.log('[DataManager] 当前日期:', userData.today.date);
        console.log('[DataManager] 打卡历史:', userData.checkinHistory);

        // 检查今天是否已经打卡（只检查 today.checkedIn，不检查打卡历史）
        if (userData.today.date === today && userData.today.checkedIn) {
          console.log('[DataManager] 今天已经打卡过了');
          return {
            success: false,
            message: '今天已经打卡过了'
          };
        }

        // 检查任务是否完成
        var dailyTask = this.getDailyTask(user);

        // 检查是否有复习任务
        var hasReviewTask = this.hasWordsToReview(userData);

        // 任务完成条件：新学任务完成 + (没有复习任务 或 复习任务完成)
        var taskCompleted = dailyTask.completedNewWords >= 5 && (!hasReviewTask || dailyTask.completedReviewWords > 0);
        if (!taskCompleted) {
          console.log('[DataManager] 任务未完成，不能打卡');
          return {
            success: false,
            message: '任务未完成，不能打卡'
          };
        }

        // 更新今日数据
        userData.today.date = today;
        userData.today.checkedIn = true;

        // 计算连续打卡天数
        var consecutiveDays = 1;
        if (userData.checkinHistory && userData.checkinHistory.length > 0) {
          var lastCheckin = userData.checkinHistory[userData.checkinHistory.length - 1];
          var lastDate = new Date(typeof lastCheckin === 'string' ? lastCheckin : lastCheckin.date);
          var currentDate = new Date(today);
          var diffTime = Math.abs(currentDate - lastDate);
          var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            consecutiveDays = (parseInt(userData.total.consecutiveDays) || 0) + 1;
          }
        }

        // 确保total对象存在且字段完整
        if (!userData.total) {
          userData.total = {
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            points: 0,
            consecutiveDays: 0,
            totalCheckins: 0
          };
        } else {
          // 强制补全 total 字段，确保所有字段都存在
          userData.total = {
            learning: parseInt(userData.total.learning) || 0,
            testing: parseInt(userData.total.testing) || 0,
            correct: parseInt(userData.total.correct) || 0,
            error: parseInt(userData.total.error) || 0,
            points: parseFloat(userData.total.points) || 0,
            consecutiveDays: parseInt(userData.total.consecutiveDays) || 0,
            totalCheckins: parseInt(userData.total.totalCheckins) || 0
          };
        }
        userData.total.consecutiveDays = consecutiveDays;
        userData.total.totalCheckins = (parseInt(userData.total.totalCheckins) || 0) + 1;

        // 确保checkinHistory数组存在
        if (!userData.checkinHistory) {
          userData.checkinHistory = [];
        }

        // 奖励积分
        var pointsReward = 5; // 基础打卡积分

        // 连续打卡奖励
        if (consecutiveDays === 3) {
          pointsReward += 1;
        } else if (consecutiveDays === 7) {
          pointsReward += 2;
        } else if (consecutiveDays === 30) {
          pointsReward += 5;
        }
        userData.total.points = (parseFloat(userData.total.points) || 0) + pointsReward;

        // 检查今天的日期是否已经在打卡历史中，避免重复
        var existingCheckinIndex = userData.checkinHistory.findIndex(function (item) {
          return (typeof item === 'string' ? item : item.date) === today;
        });
        if (existingCheckinIndex === -1) {
          console.log('[DataManager] 添加打卡历史:', {
            date: today,
            points: pointsReward
          });
          // 添加打卡历史，包含日期和积分
          userData.checkinHistory.push({
            date: today,
            points: pointsReward
          });
        } else {
          console.log('[DataManager] 今天的日期已经在打卡历史中，更新积分');
          // 更新 existingCheckinIndex 对应的积分
          userData.checkinHistory[existingCheckinIndex] = {
            date: today,
            points: pointsReward
          };
        }

        // 添加积分收入记录
        this.addPointsHistory(userData, 'income', pointsReward, '每日打卡');
        console.log('[DataManager] 保存前的打卡历史:', userData.checkinHistory);

        // 保存数据并检查是否成功
        console.log('[DataManager] 保存前的完整数据:', JSON.stringify(userData, null, 2));
        var saveSuccess = DataManager.saveUserData(user, userData);
        if (!saveSuccess) {
          throw new Error('保存数据失败');
        }

        // 验证保存后的数据
        var savedData = localStorage.getItem("userStats_".concat(user));
        console.log('[DataManager] 保存后的完整数据:', savedData);
        console.log('[DataManager] checkIn 结束');
        return {
          success: true,
          message: '打卡成功',
          points: pointsReward,
          consecutiveDays
        };
      } catch (error) {
        console.error('打卡失败:', error);
        return {
          success: false,
          message: '打卡失败'
        };
      }
    }
  }, {
    key: "getCheckInStatus",
    value: function getCheckInStatus(user) {
      try {
        var userData = DataManager.getUserData(user);
        var today = DataManager.getLocalDateString();
        console.log('getCheckInStatus - 开始，today:', today);
        console.log('getCheckInStatus - userData.today:', userData.today);

        // 确保 checkinHistory 数组存在
        if (!userData.checkinHistory || !Array.isArray(userData.checkinHistory)) {
          userData.checkinHistory = [];
        }

        // 检查今天的日期是否已经在打卡历史中
        var existingCheckinIndex = userData.checkinHistory.findIndex(function (item) {
          return (typeof item === 'string' ? item : item.date) === today;
        });
        console.log('getCheckInStatus - existingCheckinIndex:', existingCheckinIndex);

        // 检查 today 对象是否存在且日期是否为今天
        if (!userData.today || typeof userData.today !== 'object' || userData.today.date !== today) {
          // 检查今天是否已经在打卡历史中
          if (existingCheckinIndex !== -1) {
            // 如果今天已经在打卡历史中，保持打卡状态为 true
            userData.today = {
              date: today,
              learning: 0,
              testing: 0,
              correct: 0,
              error: 0,
              checkedIn: true
            };
          } else {
            // 如果今天不在打卡历史中，重置为未打卡
            userData.today = {
              date: today,
              learning: 0,
              testing: 0,
              correct: 0,
              error: 0,
              checkedIn: false,
              goalCompleted: false
            };
          }

          // 只在日期不是今天时才保存数据
          DataManager.saveUserData(user, userData);
          console.log('getCheckInStatus - 重置 today 对象，日期设为今天');
        } else {
          // 确保 today.checkedIn 字段正确
          var oldCheckedIn = userData.today.checkedIn;
          if (existingCheckinIndex !== -1) {
            userData.today.checkedIn = true;
          } else {
            userData.today.checkedIn = userData.today.checkedIn || false;
          }

          // 确保 today 对象中的字段都是有效的数字
          userData.today.learning = parseInt(userData.today.learning) || 0;
          userData.today.testing = parseInt(userData.today.testing) || 0;
          userData.today.correct = parseInt(userData.today.correct) || 0;
          userData.today.error = parseInt(userData.today.error) || 0;

          // 如果打卡状态发生变化，保存数据
          if (oldCheckedIn !== userData.today.checkedIn) {
            DataManager.saveUserData(user, userData);
            console.log('getCheckInStatus - 打卡状态发生变化，保存数据');
          }
        }

        // 确保 total 对象存在
        if (!userData.total || typeof userData.total !== 'object') {
          userData.total = {
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            points: 0,
            consecutiveDays: 0,
            totalCheckins: 0
          };
        }
        console.log('getCheckInStatus - 结束，checkedIn:', userData.today.checkedIn);
        return {
          checkedIn: userData.today.checkedIn || false,
          consecutiveDays: userData.total.consecutiveDays || 0
        };
      } catch (error) {
        console.error('获取打卡状态失败:', error);
        return {
          checkedIn: false,
          consecutiveDays: 0
        };
      }
    }
  }, {
    key: "getLocalDateStringFromDate",
    value: function getLocalDateStringFromDate(date) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      return "".concat(year, "-").concat(month, "-").concat(day);
    }
  }, {
    key: "addPoints",
    value: function addPoints(user, points) {
      var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '学习单词';
      console.log('[DataManager] addPoints 开始');
      console.log('[DataManager] user:', user);
      console.log('[DataManager] points:', points);
      console.log('[DataManager] description:', description);
      try {
        // 使用 getUserData 获取数据，确保数据结构完整和版本一致
        var userData = DataManager.getUserData(user);

        // 确保所有必要的字段存在
        if (!userData.total) {
          userData.total = {
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            points: 0,
            consecutiveDays: 0,
            totalCheckins: 0
          };
        } else {
          // 确保 total 对象中的字段都是有效的数字
          userData.total.learning = parseInt(userData.total.learning) || 0;
          userData.total.testing = parseInt(userData.total.testing) || 0;
          userData.total.correct = parseInt(userData.total.correct) || 0;
          userData.total.error = parseInt(userData.total.error) || 0;
          userData.total.points = parseFloat(userData.total.points) || 0;
          userData.total.consecutiveDays = parseInt(userData.total.consecutiveDays) || 0;
          userData.total.totalCheckins = parseInt(userData.total.totalCheckins) || 0;
        }

        // 确保 points 是数字，并且 userData.total.points 存在且是数字
        var pointsToAdd = parseFloat(points) || 0;
        console.log('[DataManager] pointsToAdd:', pointsToAdd);
        console.log('[DataManager] 当前积分:', userData.total.points);
        userData.total.points = (parseFloat(userData.total.points) || 0) + pointsToAdd;
        console.log('[DataManager] 添加后的积分:', userData.total.points);

        // 添加积分收入记录
        this.addPointsHistory(userData, 'income', pointsToAdd, description);

        // 如果是学习单词，更新学习目标进度
        if (description === '学习单词') {
          this.updateLearningProgress(userData, 1); // 每次学习一个单词
        }

        // 使用 saveUserData 函数来保存数据，确保数据结构完整
        DataManager.saveUserData(user, userData);
        console.log('[DataManager] 保存成功');

        // 验证保存结果
        var userKey = "userStats_".concat(user);
        var savedData = localStorage.getItem(userKey);
        console.log('[DataManager] 验证保存结果:', savedData);
        var parsedSavedData = JSON.parse(savedData);
        console.log('[DataManager] 解析后的保存结果:', parsedSavedData);
        console.log('[DataManager] 解析后的积分:', parsedSavedData.total.points);
        console.log('[DataManager] addPoints 成功:', userData.total.points);
        return true;
      } catch (error) {
        console.error('添加积分失败:', error);
        return false;
      }
    }
  }, {
    key: "getUserPoints",
    value: function getUserPoints(user) {
      try {
        var userData = this.getUserData(user);
        return userData.total.points || 0;
      } catch (error) {
        console.error('获取用户积分失败:', error);
        return 0;
      }
    }
  }, {
    key: "getConsecutiveDays",
    value: function getConsecutiveDays(user) {
      try {
        var userData = this.getUserData(user);
        return userData.total.consecutiveDays || 0;
      } catch (error) {
        console.error('获取连续打卡天数失败:', error);
        return 0;
      }
    }
  }, {
    key: "getTotalCheckins",
    value: function getTotalCheckins(user) {
      try {
        var userData = this.getUserData(user);
        return userData.total.totalCheckins || 0;
      } catch (error) {
        console.error('获取总打卡次数失败:', error);
        return 0;
      }
    }
  }, {
    key: "getCheckinHistory",
    value: function getCheckinHistory(user) {
      try {
        var userData = this.getUserData(user);
        return userData.checkinHistory || [];
      } catch (error) {
        console.error('获取打卡历史失败:', error);
        return [];
      }
    }

    // 保存单词学习记录
  }, {
    key: "saveWordLearningRecord",
    value: function saveWordLearningRecord(user, word, meaning) {
      var isLearned = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      try {
        console.log('[DataManager] saveWordLearningRecord 开始');
        console.log('[DataManager] user:', user);
        console.log('[DataManager] word:', word);
        console.log('[DataManager] meaning:', meaning);
        console.log('[DataManager] isLearned:', isLearned);
        var userData = this.getUserData(user);
        console.log('[DataManager] 获取到的 userData:', userData);
        var wordId = word.toLowerCase();
        console.log('[DataManager] wordId:', wordId);

        // 确保 wordLearningRecords 对象存在
        if (!userData.wordLearningRecords) {
          userData.wordLearningRecords = {};
          console.log('[DataManager] 创建 wordLearningRecords 对象');
        }

        // 获取现有记录或创建新记录
        var record = userData.wordLearningRecords[wordId] || {
          word: word,
          meaning: meaning || '',
          lastLearnedAt: null,
          reviewCount: 0,
          nextReviewAt: null,
          difficulty: 1,
          reviewHistory: []
        };
        console.log('[DataManager] 现有记录:', userData.wordLearningRecords[wordId]);
        console.log('[DataManager] 新记录:', record);

        // 获取今天的日期
        var today = this.getLocalDateString();
        console.log('[DataManager] 今天的日期:', today);

        // 检查今天是否已经复习过该单词
        var hasReviewedToday = record.reviewHistory.some(function (item) {
          // 从ISO字符串中提取日期部分
          var reviewDate = item.date.split('T')[0];
          return reviewDate === today;
        });
        console.log('[DataManager] 今天是否已经复习过:', hasReviewedToday);

        // 更新记录
        record.lastLearnedAt = today;
        console.log('[DataManager] 更新学习日期:', record.lastLearnedAt);

        // 如果提供了新的释义，更新释义
        if (meaning) {
          record.meaning = meaning;
          console.log('[DataManager] 更新释义:', record.meaning);
        }
        if (isLearned && !hasReviewedToday) {
          // 只有在今天没有复习过的情况下才增加复习次数
          record.reviewCount += 1;
          console.log('[DataManager] 更新复习次数:', record.reviewCount);

          // 计算下次复习时间（基于艾宾浩斯遗忘曲线）
          var now = new Date();
          var nextReviewDate = this.calculateNextReviewTime(now, record.reviewCount);
          // 只保存日期部分
          record.nextReviewAt = this.getLocalDateStringFromDate(nextReviewDate);
          console.log('[DataManager] 下次复习日期:', record.nextReviewAt);

          // 添加复习历史（只记录日期）
          record.reviewHistory.push({
            date: today,
            difficulty: record.difficulty
          });
          console.log('[DataManager] 添加复习历史:', record.reviewHistory);
        }
        userData.wordLearningRecords[wordId] = record;
        console.log('[DataManager] 保存记录到 wordLearningRecords:', userData.wordLearningRecords);

        // 更新今日学习数据
        if (!userData.today) {
          userData.today = {
            date: today,
            learning: 0,
            testing: 0,
            correct: 0,
            error: 0,
            checkedIn: false,
            goalCompleted: false,
            newWordsLearned: 0,
            reviewWordsCompleted: 0
          };
          console.log('[DataManager] 创建 today 对象');
        }
        if (userData.today.date === today) {
          if (!record.reviewHistory || record.reviewHistory.length === 1) {
            // 新学单词
            userData.today.newWordsLearned += 1;
            console.log('[DataManager] 更新新学单词数量:', userData.today.newWordsLearned);
          } else if (!hasReviewedToday) {
            // 复习单词（只在今天第一次复习时增加计数）
            userData.today.reviewWordsCompleted += 1;
            console.log('[DataManager] 更新复习单词数量:', userData.today.reviewWordsCompleted);
          }
        }
        console.log('[DataManager] 保存前的完整 userData:', userData);
        var saveResult = this.saveUserData(user, userData);
        console.log('[DataManager] 保存结果:', saveResult);

        // 验证保存结果
        var savedData = localStorage.getItem("userStats_".concat(user));
        console.log('[DataManager] 保存后的数据:', savedData);
        console.log('[DataManager] saveWordLearningRecord 结束');
        return true;
      } catch (error) {
        console.error('保存单词学习记录失败:', error);
        return false;
      }
    }

    // 计算下次复习时间（基于艾宾浩斯遗忘曲线）
  }, {
    key: "calculateNextReviewTime",
    value: function calculateNextReviewTime(lastLearnedAt, reviewCount) {
      // 复习间隔（天）
      var intervals = [1, 2, 4, 7, 15, 30];
      // 根据复习次数选择间隔
      var intervalIndex = Math.min(reviewCount, intervals.length - 1);
      var daysToAdd = intervals[intervalIndex];
      var nextReviewAt = new Date(lastLearnedAt);
      nextReviewAt.setDate(nextReviewAt.getDate() + daysToAdd);
      return nextReviewAt;
    }

    // 生成每日复习计划
  }, {
    key: "generateDailyReviewPlan",
    value: function generateDailyReviewPlan(user, allWords) {
      try {
        var userData = this.getUserData(user);
        var today = this.getLocalDateString();
        var reviewWords = [];

        // 检查所有单词的学习记录
        var _iterator = _createForOfIteratorHelper(allWords),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var word = _step.value;
            var wordId = word.word.toLowerCase();
            var record = userData.wordLearningRecords[wordId];
            if (record && record.nextReviewAt) {
              // 直接比较日期字符串
              if (record.nextReviewAt <= today) {
                reviewWords.push(word);
              }
            }
          }

          // 添加错词本中的单词
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (userData.errorWords && userData.errorWords.length > 0) {
          var _iterator2 = _createForOfIteratorHelper(userData.errorWords),
            _step2;
          try {
            var _loop = function _loop() {
              var errorWord = _step2.value;
              if (!reviewWords.some(function (word) {
                return word.word.toLowerCase() === errorWord.word.toLowerCase();
              })) {
                reviewWords.push(errorWord);
              }
            };
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        // 限制复习单词数量
        var maxReviewWords = 10;
        return reviewWords.slice(0, maxReviewWords);
      } catch (error) {
        console.error('生成复习计划失败:', error);
        return [];
      }
    }

    // 获取今日任务
  }, {
    key: "getDailyTask",
    value: function getDailyTask(user) {
      try {
        var userData = this.getUserData(user);
        var today = this.getLocalDateString();

        // 确保 dailyTasks 对象存在
        if (!userData.dailyTasks) {
          userData.dailyTasks = {};
        }

        // 获取今日任务或创建新任务
        if (!userData.dailyTasks[today]) {
          userData.dailyTasks[today] = {
            date: today,
            newWords: 5,
            // 每日新学单词数量
            reviewWords: 10,
            // 每日复习单词数量
            completedNewWords: 0,
            completedReviewWords: 0,
            isCheckedIn: false
          };
          this.saveUserData(user, userData);
        }
        return userData.dailyTasks[today];
      } catch (error) {
        console.error('获取每日任务失败:', error);
        return {
          date: this.getLocalDateString(),
          newWords: 5,
          reviewWords: 10,
          completedNewWords: 0,
          completedReviewWords: 0,
          isCheckedIn: false
        };
      }
    }

    // 更新任务完成情况
  }, {
    key: "updateTaskProgress",
    value: function updateTaskProgress(user, taskType) {
      try {
        var userData = this.getUserData(user);
        var today = this.getLocalDateString();

        // 确保 dailyTasks 对象存在
        if (!userData.dailyTasks) {
          userData.dailyTasks = {};
        }

        // 确保今日任务存在
        if (!userData.dailyTasks[today]) {
          userData.dailyTasks[today] = {
            date: today,
            newWords: 5,
            reviewWords: 10,
            completedNewWords: 0,
            completedReviewWords: 0,
            isCheckedIn: false
          };
        }

        // 更新任务进度
        if (taskType === 'new') {
          userData.dailyTasks[today].completedNewWords += 1;
        } else if (taskType === 'review') {
          userData.dailyTasks[today].completedReviewWords += 1;
        }
        this.saveUserData(user, userData);
        return true;
      } catch (error) {
        console.error('更新任务进度失败:', error);
        return false;
      }
    }

    // 检查任务是否完成
  }, {
    key: "isTaskCompleted",
    value: function isTaskCompleted(user) {
      try {
        var dailyTask = this.getDailyTask(user);
        var userData = this.getUserData(user);
        var hasReviewTask = this.hasWordsToReview(userData);
        return dailyTask.completedNewWords >= 5 && (!hasReviewTask || dailyTask.completedReviewWords > 0);
      } catch (error) {
        console.error('检查任务完成情况失败:', error);
        return false;
      }
    }

    // 检查是否有单词需要复习
  }, {
    key: "hasWordsToReview",
    value: function hasWordsToReview(userData) {
      // 检查错词本是否有单词
      if (userData.errorWords && userData.errorWords.length > 0) {
        return true;
      }

      // 检查是否有学习记录
      if (userData.wordLearningRecords && Object.keys(userData.wordLearningRecords).length > 0) {
        var today = this.getLocalDateString();
        for (var wordId in userData.wordLearningRecords) {
          var record = userData.wordLearningRecords[wordId];
          if (record.nextReviewAt) {
            // 直接比较日期字符串
            if (record.nextReviewAt <= today) {
              return true;
            }
          }
        }
      }
      return false;
    }
  }, {
    key: "addPointsHistory",
    value: function addPointsHistory(userData, type, amount, description) {
      try {
        var today = this.getLocalDateString();
        if (!userData.pointsHistory) {
          userData.pointsHistory = [];
        }

        // 检查是否是学习单词的记录
        if (description === '学习单词') {
          // 查找当天是否已经存在学习单词的记录
          var existingRecordIndex = userData.pointsHistory.findIndex(function (record) {
            return record.date === today && record.description === '学习单词' && record.type === type;
          });
          if (existingRecordIndex !== -1) {
            // 更新现有记录的积分
            userData.pointsHistory[existingRecordIndex].amount += amount;
          } else {
            // 添加新记录
            var pointsRecord = {
              date: today,
              type: type,
              // 'income' or 'expense'
              amount: amount,
              description: description
            };
            userData.pointsHistory.push(pointsRecord);
          }
        } else {
          // 其他类型的记录直接添加
          var _pointsRecord = {
            date: today,
            type: type,
            // 'income' or 'expense'
            amount: amount,
            description: description
          };
          userData.pointsHistory.push(_pointsRecord);
        }
        return true;
      } catch (error) {
        console.error('添加积分记录失败:', error);
        return false;
      }
    }
  }, {
    key: "getPointsHistory",
    value: function getPointsHistory(user) {
      try {
        var userData = this.getUserData(user);
        return userData.pointsHistory || [];
      } catch (error) {
        console.error('获取积分记录失败:', error);
        return [];
      }
    }
  }, {
    key: "getPointsSummary",
    value: function getPointsSummary(user) {
      try {
        var userData = this.getUserData(user);
        var pointsHistory = userData.pointsHistory || [];
        var totalIncome = 0;
        var totalExpense = 0;
        pointsHistory.forEach(function (record) {
          if (record.type === 'income') {
            totalIncome += record.amount;
          } else if (record.type === 'expense') {
            totalExpense += record.amount;
          }
        });
        return {
          totalIncome: totalIncome,
          totalExpense: totalExpense,
          balance: userData.total.points || 0
        };
      } catch (error) {
        console.error('获取积分汇总失败:', error);
        return {
          totalIncome: 0,
          totalExpense: 0,
          balance: 0
        };
      }
    }

    // 宠物相关方法
  }, {
    key: "getPets",
    value: function getPets(user) {
      try {
        var userData = this.getUserData(user);
        return userData.pets || [];
      } catch (error) {
        console.error('获取宠物列表失败:', error);
        return [];
      }
    }
  }, {
    key: "adoptPet",
    value: function adoptPet(user, petType, petName) {
      var selectedImage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      try {
        var userData = this.getUserData(user);

        // 检查是否是免费宠物
        var isFreePet = petType === 'cat' || petType === 'parrot';

        // 检查免费宠物领养限制
        if (isFreePet) {
          var freePets = userData.pets.filter(function (pet) {
            return (pet.type === 'cat' || pet.type === 'parrot') && !pet.isDead;
          });
          if (freePets.length > 0) {
            return {
              success: false,
              message: '每个用户只能领养一个免费宠物'
            };
          }
        } else {
          // 非免费宠物需要积分
          var adoptionCost = 50; // 领养宠物需要50积分

          if (userData.total.points < adoptionCost) {
            return {
              success: false,
              message: '积分不足，需要50积分才能领养宠物'
            };
          }

          // 检查是否已经领养了相同类型的宠物
          var existingPet = userData.pets.find(function (pet) {
            return pet.type === petType && !pet.isDead;
          });
          if (existingPet) {
            return {
              success: false,
              message: '你已经领养了这种类型的宠物'
            };
          }

          // 扣除积分
          userData.total.points -= adoptionCost;

          // 添加积分支出记录
          this.addPointsHistory(userData, 'expense', adoptionCost, '领养宠物');
        }

        // 添加新宠物
        var newPet = {
          id: Date.now().toString(),
          type: petType,
          name: petName,
          size: 1.0,
          // 初始大小
          feedCount: 0,
          // 喂食次数
          lastFeedDate: null,
          // 最后喂食日期
          isDead: false,
          // 是否死亡
          deathDate: null,
          // 死亡日期
          adoptionDate: new Date().toISOString(),
          // 领养日期
          isFreePet: isFreePet,
          // 标记是否是免费宠物
          selectedImage: selectedImage // 存储选中的猫咪图片
        };
        userData.pets.push(newPet);
        this.saveUserData(user, userData);
        return {
          success: true,
          message: isFreePet ? '免费宠物领养成功！' : '宠物领养成功！',
          pet: newPet
        };
      } catch (error) {
        console.error('领养宠物失败:', error);
        return {
          success: false,
          message: '领养宠物失败'
        };
      }
    }
  }, {
    key: "feedPet",
    value: function feedPet(user, petId) {
      try {
        var userData = this.getUserData(user);
        var pet = userData.pets.find(function (p) {
          return p.id === petId;
        });
        if (!pet) {
          return {
            success: false,
            message: '宠物不存在'
          };
        }
        if (pet.isDead) {
          return {
            success: false,
            message: '宠物已经死亡，需要复活'
          };
        }

        // 检查是否达到最大喂食次数（180次）
        if (pet.feedCount >= 180) {
          return {
            success: false,
            message: '宠物已成年，无需再喂食'
          };
        }
        var today = this.getLocalDateString();
        if (pet.lastFeedDate === today) {
          return {
            success: false,
            message: '今天已经喂过宠物了'
          };
        }

        // 计算喂食成本：免费宠物永远6积分，其他宠物喂养10天后涨至10个，第50天开始涨至20个
        var feedCost;
        if (pet.isFreePet) {
          feedCost = 6; // 免费宠物永远6积分
        } else if (pet.feedCount >= 50) {
          feedCost = 20;
        } else if (pet.feedCount >= 10) {
          feedCost = 10;
        } else {
          feedCost = 5;
        }
        if (userData.total.points < feedCost) {
          return {
            success: false,
            message: "\u79EF\u5206\u4E0D\u8DB3\uFF0C\u9700\u8981".concat(feedCost, "\u79EF\u5206\u624D\u80FD\u5582\u98DF")
          };
        }

        // 扣除积分
        userData.total.points -= feedCost;

        // 添加积分支出记录
        this.addPointsHistory(userData, 'expense', feedCost, '喂养宠物');

        // 更新宠物信息
        pet.lastFeedDate = today;
        pet.feedCount += 1;

        // 每30天喂食，宠物大小增加20%（免费宠物不长大）
        if (!pet.isFreePet && pet.feedCount % 30 === 0) {
          pet.size *= 1.2;
        }
        this.saveUserData(user, userData);
        return {
          success: true,
          message: '宠物喂食成功！',
          pet
        };
      } catch (error) {
        console.error('喂食宠物失败:', error);
        return {
          success: false,
          message: '喂食宠物失败'
        };
      }
    }
  }, {
    key: "revivePet",
    value: function revivePet(user, petId) {
      try {
        var userData = this.getUserData(user);
        var pet = userData.pets.find(function (p) {
          return p.id === petId;
        });
        if (!pet) {
          return {
            success: false,
            message: '宠物不存在'
          };
        }
        if (!pet.isDead) {
          return {
            success: false,
            message: '宠物还活着，不需要复活'
          };
        }
        var reviveCost = 40; // 复活需要40积分（领养成本的80%）
        if (userData.total.points < reviveCost) {
          return {
            success: false,
            message: '积分不足，需要40积分才能复活宠物'
          };
        }

        // 扣除积分
        userData.total.points -= reviveCost;

        // 添加积分支出记录
        this.addPointsHistory(userData, 'expense', reviveCost, '复活宠物');

        // 复活宠物
        pet.isDead = false;
        pet.deathDate = null;
        pet.size = 1.0; // 恢复初始大小
        pet.feedCount = 0; // 重置喂食次数
        pet.lastFeedDate = null; // 保持为 null，因为还未喂食
        pet.adoptionDate = new Date().toISOString(); // 更新领养时间为当前时间

        this.saveUserData(user, userData);
        return {
          success: true,
          message: '宠物复活成功！',
          pet
        };
      } catch (error) {
        console.error('复活宠物失败:', error);
        return {
          success: false,
          message: '复活宠物失败'
        };
      }
    }
  }, {
    key: "checkPetStatus",
    value: function checkPetStatus(user) {
      var _this2 = this;
      try {
        var userData = this.getUserData(user);
        var today = new Date();
        var updated = false;

        // 过滤掉3天不喂食的免费宠物，其他宠物标记为死亡
        userData.pets = userData.pets.filter(function (pet) {
          if (!pet.isDead) {
            // 确定用于计算的日期：优先使用 lastFeedDate，否则使用 adoptionDate
            var targetDate = pet.lastFeedDate || pet.adoptionDate;
            if (targetDate) {
              var lastDate = new Date(targetDate);
              // 标准化日期，只保留年月日部分，消除时区差异
              var lastDateNormalized = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
              var todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              var diffTime = todayNormalized - lastDateNormalized;
              var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
              if (diffDays >= 3) {
                if (pet.isFreePet) {
                  // 免费宠物3天不喂食后变成未领养状态（从列表中移除）
                  updated = true;
                  return false;
                } else {
                  // 其他宠物标记为死亡
                  pet.isDead = true;
                  pet.deathDate = _this2.getLocalDateString();
                  updated = true;
                  return true;
                }
              }
            }
          }
          return true;
        });
        if (updated) {
          this.saveUserData(user, userData);
        }
        return userData.pets;
      } catch (error) {
        console.error('检查宠物状态失败:', error);
        return [];
      }
    }
  }, {
    key: "clearAllUserData",
    value: function clearAllUserData() {
      try {
        console.log('[DataManager] 开始清空所有用户数据...');
        var keysToRemove = [];

        // 遍历所有localStorage键
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key && key.startsWith('userStats_')) {
            keysToRemove.push(key);
          }
        }

        // 删除所有匹配的键
        keysToRemove.forEach(function (key) {
          console.log('[DataManager] 删除localStorage键:', key);
          localStorage.removeItem(key);
        });
        console.log('[DataManager] 成功清空所有用户数据，共删除', keysToRemove.length, '个键');
        return true;
      } catch (error) {
        console.error('[DataManager] 清空用户数据失败:', error);
        return false;
      }
    }
  }]);
}(); // 导出DataManager类
_defineProperty(DataManager, "DATA_VERSION", '1.0');
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataManager;
} else {
  window.DataManager = DataManager;
}