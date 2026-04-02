"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.promise.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyzeRecording = analyzeRecording;
exports.backToHome = backToHome;
exports.calculateScore = calculateScore;
exports.calculateSimilarity = calculateSimilarity;
exports.generateUnitTabs = generateUnitTabs;
exports.initEventListeners = initEventListeners;
exports.openArticleListPage = openArticleListPage;
exports.openCheckinHistoryPage = openCheckinHistoryPage;
exports.openErrorBookPage = openErrorBookPage;
exports.openGamePage = openGamePage;
exports.openModelEssayListPage = openModelEssayListPage;
exports.openPetHomePage = openPetHomePage;
exports.openPointsHistoryPage = openPointsHistoryPage;
exports.openStatsPage = openStatsPage;
exports.playbackRecording = playbackRecording;
exports.resetRecordingState = resetRecordingState;
exports.startDetailedLearning = startDetailedLearning;
exports.startLearning = startLearning;
exports.startRecording = startRecording;
exports.toggleRecording = toggleRecording;
exports.withUserCheck = withUserCheck;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var _init = require("./init.js");
var _user = require("./user.js");
var _word = require("./word.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // 工具模块
// 用户检查函数 - 确保用户已选择
function withUserCheck(callback) {
  return function () {
    if (_init.currentUser) {
      callback();
    } else {
      alert('请先选择用户');
      (0, _user.showUserModal)();
    }
  };
}

// 初始化事件监听
function initEventListeners() {
  // 单元标签切换
  var unitTabs = document.getElementById('unitTabs');
  if (unitTabs) {
    unitTabs.addEventListener('click', function (e) {
      if (e.target.classList.contains('unit-tab')) {
        document.querySelectorAll('.unit-tab').forEach(function (tab) {
          return tab.classList.remove('active');
        });
        e.target.classList.add('active');
        (0, _init.setCurrentUnit)(e.target.dataset.unit);
        (0, _word.renderWordList)();
      }
    });
  }

  // 遮罩模式切换
  var maskModeButtons = document.querySelectorAll('.mask-mode');
  if (maskModeButtons.length > 0) {
    maskModeButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.mask-mode').forEach(function (b) {
          return b.classList.remove('active');
        });
        this.classList.add('active');
        var mode = this.dataset.mode;

        // 检查当前页面，使用对应的遮罩模式变量
        var wordListPage = document.getElementById('wordListPage');
        var errorBookPage = document.getElementById('errorBookPage');
        if (wordListPage && wordListPage.classList.contains('active')) {
          (0, _init.setMaskMode)(mode);
          (0, _word.renderWordList)();
        } else if (errorBookPage && errorBookPage.classList.contains('active')) {
          (0, _init.setErrorBookMaskMode)(mode);
          (0, _word.renderErrorWordList)();
        }
      });
    });
  }

  // 课本选择
  document.querySelectorAll('.book-option').forEach(function (option) {
    option.addEventListener('click', function () {
      (0, _init.setCurrentFile)(this.dataset.file);
      (0, _init.setCurrentBookName)(this.dataset.name);
      (0, _user.updateBookDisplay)();
      // 保存用户选择的课本
      (0, _user.saveUserBook)();
      (0, _user.closeBookModal)();
      (0, _word.loadPDF)();
    });
  });

  // 用户选择
  document.querySelectorAll('.user-option').forEach(function (option) {
    option.addEventListener('click', function () {
      document.querySelectorAll('.user-option').forEach(function (o) {
        return o.classList.remove('selected');
      });
      this.classList.add('selected');
      (0, _init.setCurrentUser)(this.dataset.user);
      (0, _init.setCurrentUserName)(this.textContent);
      (0, _user.loadUserStats)();
    });
  });

  // 底部导航
  document.querySelectorAll('.nav-item').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.nav-item').forEach(function (i) {
        return i.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // 筛选下拉框
  var filterSelect = document.getElementById('filterSelect');
  if (filterSelect) {
    filterSelect.addEventListener('change', function () {
      (0, _word.renderWordList)();
    });
  }
}

// 开始学习 - 进入单词列表页
function startLearning() {
  window.location.href = 'word-list.html';
}

// 开始详细学习 - 进入单词学习页面
function startDetailedLearning() {
  window.location.href = 'word-link.html?index=0';
}

// 打开文章列表页面
function openArticleListPage() {
  window.location.href = 'article-list.html';
}

// 打开必背范文列表页面
function openModelEssayListPage() {
  // 根据当前教材确定要加载的文件
  var grade = parseInt(_init.currentFile[0]);
  var isPrimary = grade >= 3 && grade <= 6;
  var isJunior = grade >= 7 && grade <= 9;

  // 设置要加载的文件路径
  var targetFile = '';
  if (isPrimary) {
    targetFile = 'all-小学.md';
  } else if (isJunior) {
    targetFile = 'all-初中.md';
  } else {
    // 默认加载小学范文
    targetFile = 'all-小学.md';
  }

  // 跳转到文章列表页面，并传递文件参数
  window.location.href = "article-list.html?file=".concat(encodeURIComponent(targetFile));
}

// 返回首页
function backToHome() {
  window.location.href = 'index.html';
}

// 生成单元标签
function generateUnitTabs() {
  var tabsContainer = document.getElementById('unitTabs');
  tabsContainer.innerHTML = '';
}

// 重置录音状态
function resetRecordingState() {
  var recordBtn = document.getElementById('recordBtn');
  var playbackBtn = document.getElementById('playbackBtn');
  var scoreDisplay = document.getElementById('scoreDisplay');
  var recordingStatus = document.getElementById('recordingStatus');
  if (recordBtn) {
    recordBtn.textContent = '🎤 开始录音';
    recordBtn.classList.remove('recording');
  }
  if (playbackBtn) {
    playbackBtn.disabled = true;
  }
  if (scoreDisplay) {
    document.getElementById('scoreValue').textContent = '-';
  }
  if (recordingStatus) {
    recordingStatus.textContent = '';
  }
}

// 全局变量存储录音相关数据
var mediaRecorder = null;
var audioChunks = [];
var audioBlob = null;

// 切换录音状态
function toggleRecording() {
  var recordBtn = document.getElementById('recordBtn');
  var recordingStatus = document.getElementById('recordingStatus');
  if (recordBtn.classList.contains('recording')) {
    // 停止录音
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    recordBtn.textContent = '🎤 开始录音';
    recordBtn.classList.remove('recording');
    recordingStatus.textContent = '录音已停止';
  } else {
    // 开始录音
    startRecording();
    recordBtn.textContent = '⏹️ 停止录音';
    recordBtn.classList.add('recording');
    recordingStatus.textContent = '正在录音...';
  }
}

// 开始录音
function startRecording() {
  return _startRecording.apply(this, arguments);
} // 分析录音并评分
function _startRecording() {
  _startRecording = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var stream, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return navigator.mediaDevices.getUserMedia({
            audio: true
          });
        case 1:
          stream = _context2.v;
          // 创建MediaRecorder实例
          mediaRecorder = new MediaRecorder(stream);
          audioChunks = [];

          // 监听数据可用事件
          mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
              audioChunks.push(event.data);
            }
          };

          // 监听录音结束事件
          mediaRecorder.onstop = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  // 创建音频Blob
                  audioBlob = new Blob(audioChunks, {
                    type: 'audio/wav'
                  });

                  // 分析录音并评分
                  _context.n = 1;
                  return analyzeRecording();
                case 1:
                  // 启用回放按钮
                  document.getElementById('playbackBtn').disabled = false;

                  // 停止媒体流
                  stream.getTracks().forEach(function (track) {
                    return track.stop();
                  });
                case 2:
                  return _context.a(2);
              }
            }, _callee);
          }));

          // 开始录音
          mediaRecorder.start();
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t = _context2.v;
          console.error('录音失败:', _t);
          document.getElementById('recordingStatus').textContent = '录音失败，请检查麦克风权限';
          document.getElementById('recordBtn').textContent = '🎤 开始录音';
          document.getElementById('recordBtn').classList.remove('recording');
        case 3:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return _startRecording.apply(this, arguments);
}
function analyzeRecording() {
  return _analyzeRecording.apply(this, arguments);
} // 计算得分
function _analyzeRecording() {
  _analyzeRecording = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var currentWord, recognition, audioUrl, audio, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          currentWord = _init.isErrorBookMode ? _init.errorWords[_init.currentWordIndex] : _init.words[_init.currentWordIndex];
          if (currentWord) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
        case 1:
          // 使用Web Speech API进行语音识别
          recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
          recognition.lang = 'en-US';
          recognition.interimResults = false;
          recognition.maxAlternatives = 1;

          // 创建音频URL
          audioUrl = URL.createObjectURL(audioBlob);
          audio = new Audio(audioUrl); // 模拟语音识别结果（实际项目中需要使用真实的语音识别服务）
          // 这里使用一个简单的字符串比较方法作为示例
          setTimeout(function () {
            // 模拟识别结果（实际项目中应该从recognition.onresult获取）
            var recognizedText = currentWord.word; // 这里应该是真实的识别结果

            // 计算得分
            var score = calculateScore(recognizedText, currentWord.word);

            // 显示得分
            document.getElementById('scoreValue').textContent = score;
            document.getElementById('recordingStatus').textContent = "\u8BC6\u522B\u7ED3\u679C: ".concat(recognizedText);
          }, 1000);
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t2 = _context3.v;
          console.error('分析录音失败:', _t2);
          document.getElementById('recordingStatus').textContent = '分析录音失败';
          document.getElementById('scoreValue').textContent = '-';
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return _analyzeRecording.apply(this, arguments);
}
function calculateScore(recognizedText, targetWord) {
  // 转换为小写进行比较
  var recognized = recognizedText.toLowerCase().trim();
  var target = targetWord.toLowerCase().trim();
  if (recognized === target) {
    return 100; // 完全匹配
  }

  // 计算相似度
  var similarity = calculateSimilarity(recognized, target);

  // 根据相似度计算得分（60-99分）
  var score = Math.max(60, Math.round(similarity * 100));
  return score;
}

// 计算字符串相似度（使用Levenshtein距离算法）
function calculateSimilarity(str1, str2) {
  var matrix = [];

  // 初始化矩阵
  for (var i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (var j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  // 填充矩阵
  for (var _i = 1; _i <= str2.length; _i++) {
    for (var _j = 1; _j <= str1.length; _j++) {
      if (str2.charAt(_i - 1) === str1.charAt(_j - 1)) {
        matrix[_i][_j] = matrix[_i - 1][_j - 1];
      } else {
        matrix[_i][_j] = Math.min(matrix[_i - 1][_j - 1] + 1,
        // 替换
        matrix[_i][_j - 1] + 1,
        // 插入
        matrix[_i - 1][_j] + 1 // 删除
        );
      }
    }
  }

  // 计算相似度
  var maxLength = Math.max(str1.length, str2.length);
  var distance = matrix[str2.length][str1.length];
  var similarity = 1 - distance / maxLength;
  return similarity;
}

// 回放录音
function playbackRecording() {
  if (audioBlob) {
    var recordingStatus = document.getElementById('recordingStatus');
    recordingStatus.textContent = '正在回放...';

    // 创建音频对象并播放
    var audioUrl = URL.createObjectURL(audioBlob);
    var audio = new Audio(audioUrl);
    audio.onended = function () {
      recordingStatus.textContent = '回放完成';
    };
    audio.onerror = function () {
      recordingStatus.textContent = '回放失败';
    };
    audio.play().catch(function (error) {
      console.error('回放失败:', error);
      recordingStatus.textContent = '回放失败';
    });
  }
}

// 打开错词本页面
function openErrorBookPage() {
  window.location.href = 'error-book.html';
}

// 打开统计页面
function openStatsPage() {
  window.location.href = 'stats.html';
}

// 打开宠物窝页面
function openPetHomePage() {
  window.location.href = 'pet-home.html';
}

// 打开打卡记录页面
function openCheckinHistoryPage() {
  window.location.href = 'checkin-history.html';
}

// 打开积分收支记录页面
function openPointsHistoryPage() {
  window.location.href = 'points-history.html';
}

// 打开游戏页面
function openGamePage() {
  var errorWords = DataManager.getErrorWords(_init.currentUser);
  if (errorWords.length === 0) {
    alert('错词本为空，无法玩消消乐');
    return;
  }
  window.location.href = 'game.html';
}