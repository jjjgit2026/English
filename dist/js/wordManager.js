"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLetter = addLetter;
exports.backToHome = backToHome;
exports.backToWordList = backToWordList;
exports.checkPracticeAnswer = checkPracticeAnswer;
exports.checkSpelling = checkSpelling;
exports.checkWriting = checkWriting;
exports.clearWriteInput = clearWriteInput;
exports.closeBookModal = closeBookModal;
exports.generateErrorWordChain = generateErrorWordChain;
exports.generatePracticeQuestion = generatePracticeQuestion;
exports.generateUnitTabs = generateUnitTabs;
exports.generateWordChain = generateWordChain;
exports.getPhoneticColor = getPhoneticColor;
exports.goToNextWord = goToNextWord;
exports.goToPrevWord = goToPrevWord;
exports.hideLoading = hideLoading;
exports.initPdfJs = initPdfJs;
exports.isStepCompleted = isStepCompleted;
exports.loadMockData = loadMockData;
exports.loadPDF = loadPDF;
exports.loadPDFOriginal = loadPDFOriginal;
exports.nextStep = nextStep;
exports.openArticleListPage = openArticleListPage;
exports.openErrorWordLinkPage = openErrorWordLinkPage;
exports.openWordLinkPage = openWordLinkPage;
exports.processPDF = processPDF;
exports.removeLetter = removeLetter;
exports.renderErrorWordList = renderErrorWordList;
exports.renderWordList = renderWordList;
exports.resetLearningSteps = resetLearningSteps;
exports.showBookModal = showBookModal;
exports.showLoading = showLoading;
exports.showUserModal = showUserModal;
exports.startDetailedLearning = startDetailedLearning;
exports.startLearning = startLearning;
exports.switchStep = switchStep;
exports.updateErrorWordLearningContent = updateErrorWordLearningContent;
exports.updateErrorWordNavigationButtons = updateErrorWordNavigationButtons;
exports.updateLearningContent = updateLearningContent;
exports.updateNavigationButtons = updateNavigationButtons;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _userManager = require("./userManager.js");
var _statsManager = require("./statsManager.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // 单词管理模块
var words = [];
var currentUnit = 'all';
var maskMode = 'none';
var errorBookMaskMode = 'none';
var currentWordIndex = 0;
var currentStep = 'learn';
var isErrorBookMode = false;
var errorWords = [];

/**
 * 加载单词数据
 */
function loadPDF() {
  return _loadPDF.apply(this, arguments);
}
/**
 * 原始PDF加载函数
 */
function _loadPDF() {
  _loadPDF = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var currentFile, currentUser, pdfPath, jsonPath, response, data, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          console.log('[加载单词数据] 开始');
          currentFile = (0, _userManager.getCurrentFile)();
          currentUser = (0, _userManager.getCurrentUser)();
          console.log('[加载单词数据] currentFile:', currentFile);
          console.log('[加载单词数据] currentUser:', currentUser);
          showLoading();
          pdfPath = "../../assets/PDF/".concat(currentFile);
          jsonPath = "../../data/".concat(currentFile.replace('.pdf', '.json'));
          console.log('[加载单词数据] pdfPath:', pdfPath);
          console.log('[加载单词数据] jsonPath:', jsonPath);
          _context.p = 1;
          _context.n = 2;
          return fetch(jsonPath);
        case 2:
          response = _context.v;
          console.log('[加载单词数据] JSON文件响应状态:', response.status);
          if (!response.ok) {
            _context.n = 4;
            break;
          }
          _context.n = 3;
          return response.json();
        case 3:
          data = _context.v;
          console.log('[加载单词数据] JSON加载成功，单词数量:', data.length);
          words = data;
          console.log('[加载单词数据] 初始化课本数据');
          // 初始化课本数据
          DataManager.initBookData(currentUser, currentFile, words.length);
          console.log('[加载单词数据] 更新统计显示');
          (0, _statsManager.updateStatsDisplay)();
          console.log('[加载单词数据] 渲染单词列表');
          renderWordList();
          _context.n = 5;
          break;
        case 4:
          throw new Error('JSON文件不存在或无法加载');
        case 5:
          _context.n = 7;
          break;
        case 6:
          _context.p = 6;
          _t = _context.v;
          console.error('加载JSON失败:', _t);
          // 回退到PDF加载
          console.log('回退到PDF加载:', pdfPath);
          _context.n = 7;
          return loadPDFOriginal();
        case 7:
          _context.p = 7;
          hideLoading();
          console.log('[加载单词数据] 结束');
          return _context.f(7);
        case 8:
          return _context.a(2);
      }
    }, _callee, null, [[1, 6, 7, 8]]);
  }));
  return _loadPDF.apply(this, arguments);
}
function loadPDFOriginal() {
  return _loadPDFOriginal.apply(this, arguments);
}
/**
 * 处理PDF文档
 */
function _loadPDFOriginal() {
  _loadPDFOriginal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var pdf, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (initPdfJs()) {
            _context2.n = 1;
            break;
          }
          console.error('PDF.js 库未加载，使用模拟数据');
          loadMockData();
          return _context2.a(2);
        case 1:
          _context2.p = 1;
          _context2.n = 2;
          return pdfjsLib.getDocument({
            url: "../../assets/PDF/".concat((0, _userManager.getCurrentFile)()),
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/',
            cMapPacked: true
          }).promise;
        case 2:
          pdf = _context2.v;
          _context2.n = 3;
          return processPDF(pdf);
        case 3:
          _context2.n = 5;
          break;
        case 4:
          _context2.p = 4;
          _t2 = _context2.v;
          console.error('加载PDF失败:', _t2);
          // 使用模拟数据
          loadMockData();
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 4]]);
  }));
  return _loadPDFOriginal.apply(this, arguments);
}
function processPDF(pdf) {
  var pages = [];

  // 遍历所有页面
  for (var i = 1; i <= pdf.numPages; i++) {
    pages.push(pdf.getPage(i));
  }
  Promise.all(pages).then(function (pageList) {
    // console.log('获取页面成功，页面数:', pageList.length);
    var contentPromises = pageList.map(function (page) {
      return page.getTextContent();
    });
    Promise.all(contentPromises).then(function (contentList) {
      // console.log('获取文本内容成功，页面数:', contentList.length);
      words = []; // 重置单词列表

      // 解析每个页面的内容
      contentList.forEach(function (content, pageIndex) {
        // console.log(`解析页面 ${pageIndex + 1} 的内容`);
        // console.log('原始文本项:', content.items.length);

        // 按行组织文本
        var lines = [];
        var currentLine = [];
        var lastY = null;

        // 按y坐标分组文本，使用更小的阈值确保同一行的文本被正确合并
        content.items.forEach(function (item, index) {
          // 只输出前几个文本项的信息，避免日志过多
          if (index < 5) {
            // console.log(`文本项 ${index}:`, item);
          }
          var y = item.transform[5];
          if (lastY === null || Math.abs(y - lastY) > 0.5) {
            if (currentLine.length > 0) {
              lines.push(currentLine);
              currentLine = [];
            }
            lastY = y;
          }
          currentLine.push(item);
        });

        // 处理小方格，确保它单独作为一列
        lines = lines.map(function (line) {
          var newLine = [];
          line.forEach(function (item) {
            if (item.str === '□') {
              // 小方格单独作为一列
              newLine.push(item);
            } else {
              newLine.push(item);
            }
          });
          return newLine;
        });
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }

        // console.log(`页面 ${pageIndex + 1} 行数:`, lines.length);

        // 按x坐标排序每行的文本
        lines.forEach(function (line) {
          line.sort(function (a, b) {
            return a.transform[4] - b.transform[4];
          });
        });

        // 打印每行内容
        lines.forEach(function (line, lineIndex) {
          var lineText = line.map(function (item) {
            return item.str;
          }).join(' ');
          // console.log(`页面 ${pageIndex + 1} 行 ${lineIndex + 1}:`, lineText);
        });

        // 寻找表格开始位置 - 找到第一个以数字序号为第一列的行
        var tableStartIndex = -1;
        // console.log(`页面 ${pageIndex + 1} 开始寻找表格，共 ${lines.length} 行`);
        for (var _i = 0; _i < lines.length; _i++) {
          var line = lines[_i];
          // 获取整行文本
          var lineText = line.map(function (item) {
            return item.str;
          }).join(' ').trim();
          // console.log(`页面 ${pageIndex + 1} 行 ${i + 1} 内容: "${lineText}"`);

          // 检查行内容是否以数字序号开头（如"1", "250"）
          // 匹配行首的数字，后面可以跟空格、字母或结束
          var match = lineText.match(/^(\d+)(\s|$)/);
          if (match) {
            var firstNumber = match[1];
            tableStartIndex = _i;
            // console.log(`页面 ${pageIndex + 1} 表格开始行:`, tableStartIndex + 1, `(找到序号: ${firstNumber})`);
            break;
          }
        }

        // 从表格的第一行开始读取（包含序号行）
        if (tableStartIndex !== -1) {
          // console.log(`开始处理表格，表格开始行: ${tableStartIndex + 1}`);
          // 存储单词信息，用于处理跨行的数据
          var currentWord = null;
          var currentPhonetic = null;
          var currentMeaning = null;
          var currentNumber = null;

          // console.log(`开始遍历表格行，共 ${lines.length - tableStartIndex} 行`);

          // 重新组织行数据，确保序号、单词、音标和释义正确对应
          var wordLines = [];
          var currentEntry = null;
          for (var _i2 = tableStartIndex; _i2 < lines.length; _i2++) {
            var _line = lines[_i2];
            var _lineText = _line.map(function (item) {
              return item.str;
            }).join(' ').trim();
            // console.log(`处理行 ${i + 1}，内容: "${lineText}"`);

            // 检查是否为数字序号行（匹配行首的数字）
            var numberMatch = _lineText.match(/^(\d+)(\s|$)/);
            if (numberMatch) {
              var firstItem = numberMatch[1];
              // 这是新的单词序号行
              if (currentEntry && currentEntry.number) {
                wordLines.push(currentEntry);
                // console.log(`保存上一个单词条目:`, currentEntry);
              }
              currentEntry = {
                number: firstItem,
                word: '',
                phonetic: '',
                meaning: ''
              };
              // console.log(`识别到新单词序号: ${firstItem}`);

              // 检查当前行是否有单词（有些PDF序号和单词在同一行）
              if (_line.length > 1) {
                var remainingText = _line.slice(1).map(function (item) {
                  return item.str;
                }).join(' ').trim();
                // console.log(`序号行剩余内容: "${remainingText}"`);
                // 确保剩余内容不是纯数字（避免把序号当成单词）
                if (remainingText && !remainingText.includes('/') && !remainingText.includes('[') && !/^\d+$/.test(remainingText)) {
                  currentEntry.word = remainingText;
                  // console.log(`从序号行提取单词: "${currentEntry.word}"`);
                }
              }
            } else if (currentEntry && currentEntry.number) {
              // 这是当前单词的后续行
              // console.log(`处理单词 ${currentEntry.number} 的后续行`);

              // 检查是否为音标行
              if (_lineText.includes('/') || _lineText.includes('[')) {
                currentEntry.phonetic = _lineText;
                // console.log(`提取音标: "${currentEntry.phonetic}"`);
              } else if (_lineText) {
                // 移除小方格后处理
                var cleanedText = _lineText.replace(/□/g, '').trim();
                if (cleanedText) {
                  // 如果还没有单词，这行可能是单词
                  if (!currentEntry.word) {
                    currentEntry.word = cleanedText;
                    // console.log(`提取单词: "${currentEntry.word}"`);
                  } else {
                    // 这是释义行
                    if (currentEntry.meaning) {
                      currentEntry.meaning += ' ' + cleanedText;
                    } else {
                      currentEntry.meaning = cleanedText;
                    }
                    // console.log(`提取释义: "${currentEntry.meaning}"`);
                  }
                }
              }
            }
          }

          // 添加最后一个单词
          if (currentEntry && currentEntry.number) {
            wordLines.push(currentEntry);
            // console.log(`保存最后一个单词条目:`, currentEntry);
          }

          // console.log(`识别到 ${wordLines.length} 个单词条目`);
          // console.log(`单词条目:`, wordLines);

          // 转换为单词列表并添加到总列表
          wordLines.forEach(function (entry, index) {
            // 清理单词：区分单词内部空格和词组空格
            var cleanWord = (entry.word || '').trim();
            // 检查是否为单词内部空格（如"sch oo l"或"u n t i l"）
            if (cleanWord.includes(' ') && !cleanWord.includes('-') && !cleanWord.includes('\'') && cleanWord.split(' ').every(function (part) {
              return part.length === 1;
            })) {
              // 单词内部空格，移除空格
              cleanWord = cleanWord.replace(/\s+/g, '');
            }
            var word = {
              word: cleanWord,
              phonetic: (entry.phonetic || '').trim(),
              meaning: (entry.meaning || '').trim().replace(/□/g, '').trim(),
              unit: 'all' // 默认单元
            };
            if (word.word) {
              words.push(word);
            }
          });
        }
      });

      // console.log('最终单词列表:', words);
      // console.log('单词数量:', words.length);

      // 初始化课本数据
      DataManager.initBookData((0, _userManager.getCurrentUser)(), (0, _userManager.getCurrentFile)(), words.length);

      // 更新统计显示
      (0, _statsManager.updateStatsDisplay)();

      // 渲染单词列表
      renderWordList();
    });
  });
}

/**
 * 使用模拟数据
 */
function loadMockData() {
  words = [{
    word: 'apple',
    phonetic: '/ˈæpl/',
    meaning: 'n. 苹果'
  }, {
    word: 'banana',
    phonetic: '/bəˈnɑːnə/',
    meaning: 'n. 香蕉'
  }, {
    word: 'cat',
    phonetic: '/kæt/',
    meaning: 'n. 猫'
  }, {
    word: 'dog',
    phonetic: '/dɒɡ/',
    meaning: 'n. 狗'
  }, {
    word: 'elephant',
    phonetic: '/ˈelɪfənt/',
    meaning: 'n. 大象'
  }];

  // 更新统计显示
  (0, _statsManager.updateStatsDisplay)();

  // 渲染单词列表
  renderWordList();
}

/**
 * 渲染单词列表
 */
function renderWordList() {
  var listContainer = document.getElementById('wordList');
  if (!listContainer) return;
  var filteredWords = words;

  // 按单元筛选
  if (currentUnit !== 'all') {
    filteredWords = filteredWords.filter(function (w) {
      return w.unit === currentUnit;
    });
  }
  listContainer.innerHTML = filteredWords.map(function (word, index) {
    return "\n        <div class=\"word-item\" data-index=\"".concat(index, "\" onclick=\"openWordLinkPage(").concat(index, ")\"><div class=\"word-index\">\n                ").concat(index + 1, "\n            </div>\n            <div class=\"word-info\">\n                <div class=\"word-text ").concat(maskMode === 'word' ? 'masked' : '', "\" ").concat(maskMode === 'word' ? 'onclick="this.classList.remove(\'masked\'); event.stopPropagation();"' : '', ">").concat(word.word, "</div>\n                <div class=\"word-phonetic\">").concat(word.phonetic || '', "</div>\n            </div>\n            <div class=\"word-meaning ").concat(maskMode === 'meaning' ? 'masked' : '', "\" ").concat(maskMode === 'meaning' ? 'onclick="this.classList.remove(\'masked\'); event.stopPropagation();"' : '', ">").concat(word.meaning, "</div>\n            <div class=\"word-actions\">\n                <button class=\"action-btn\" onclick=\"AudioManager.playWordAudio('").concat(word.word, "', false); event.stopPropagation();\">\uD83D\uDD0A</button>\n            </div>\n        </div>\n        ");
  }).join('');

  // 为错词本列表也添加序号
  var errorListContainer = document.getElementById('errorWordList');
  if (errorListContainer) {
    var _errorWords = DataManager.getErrorWords((0, _userManager.getCurrentUser)());
    errorListContainer.innerHTML = _errorWords.map(function (word, index) {
      return "\n            <div class=\"word-item\" data-index=\"".concat(index, "\" onclick=\"openErrorWordLinkPage(").concat(index, ")\"><div class=\"word-index\">\n                    ").concat(index + 1, "\n                </div>\n                <div class=\"word-info\">\n                    <div class=\"word-text\">").concat(word.word, "</div>\n                    <div class=\"word-phonetic\">").concat(word.phonetic || '', "</div>\n                </div>\n                <div class=\"word-meaning\">").concat(word.meaning, "</div>\n                <div class=\"word-actions\">\n                    <button class=\"action-btn\" onclick=\"AudioManager.playWordAudio('").concat(word.word, "', false); event.stopPropagation();\">\uD83D\uDD0A</button>\n                </div>\n            </div>\n            ");
    }).join('');
  }
}

/**
 * 渲染错词列表
 */
function renderErrorWordList() {
  var errorListContainer = document.getElementById('errorWordList');
  if (!errorListContainer) return;
  errorWords = DataManager.getErrorWords((0, _userManager.getCurrentUser)());
  errorListContainer.innerHTML = errorWords.map(function (word, index) {
    return "\n        <div class=\"word-item\" data-index=\"".concat(index, "\" onclick=\"openErrorWordLinkPage(").concat(index, ")\"><div class=\"word-index\">\n                ").concat(index + 1, "\n            </div>\n            <div class=\"word-info\">\n                <div class=\"word-text\">").concat(word.word, "</div>\n                <div class=\"word-phonetic\">").concat(word.phonetic || '', "</div>\n            </div>\n            <div class=\"word-meaning\">").concat(word.meaning, "</div>\n            <div class=\"word-actions\">\n                <button class=\"action-btn\" onclick=\"AudioManager.playWordAudio('").concat(word.word, "', false); event.stopPropagation();\">\uD83D\uDD0A</button>\n            </div>\n        </div>\n        ");
  }).join('');
}

/**
 * 打开单词链路页面
 */
function openWordLinkPage(index) {
  window.location.href = "word-link.html?index=".concat(index);
}

/**
 * 打开错词链路页面
 */
function openErrorWordLinkPage(index) {
  window.location.href = "word-link.html?index=".concat(index, "&errorBook=true");
}

/**
 * 生成单词链条
 */
function generateWordChain() {
  var chainContainer = document.getElementById('wordChain');
  if (!chainContainer) return;
  chainContainer.innerHTML = '';
  words.forEach(function (word, index) {
    var wordElement = document.createElement('div');
    wordElement.className = 'chain-word-item';
    var wordText = document.createElement('div');
    wordText.className = 'chain-word';
    wordText.id = "chain-word-".concat(index);
    if (index === currentWordIndex) {
      wordText.classList.add('current');
    } else if (index < currentWordIndex) {
      wordText.classList.add('completed');
    } else {
      wordText.classList.add('pending');
    }

    // 在拼和写步骤中遮挡当前学习的单词
    if ((currentStep === 'spell' || currentStep === 'write') && index === currentWordIndex) {
      wordText.textContent = '**';
    } else {
      wordText.textContent = word.word;
    }
    wordText.onclick = function () {
      return openWordLinkPage(index);
    };
    var wordIndex = document.createElement('div');
    wordIndex.className = 'chain-word-index';
    wordIndex.textContent = index + 1;
    wordElement.appendChild(wordText);
    wordElement.appendChild(wordIndex);
    chainContainer.appendChild(wordElement);
  });

  // 滚动到当前单词位置
  setTimeout(function () {
    var currentElement = document.getElementById("chain-word-".concat(currentWordIndex));
    if (currentElement) {
      currentElement.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      });
    }
  }, 100);
}

/**
 * 生成错词链条
 */
function generateErrorWordChain() {
  var chainContainer = document.getElementById('wordChain');
  if (!chainContainer) return;
  chainContainer.innerHTML = '';
  errorWords.forEach(function (word, index) {
    var wordElement = document.createElement('div');
    wordElement.className = 'chain-word-item';
    var wordText = document.createElement('div');
    wordText.className = 'chain-word';
    wordText.id = "chain-word-".concat(index);
    if (index === currentWordIndex) {
      wordText.classList.add('current');
    } else if (index < currentWordIndex) {
      wordText.classList.add('completed');
    } else {
      wordText.classList.add('pending');
    }

    // 在拼和写步骤中遮挡当前学习的单词
    if ((currentStep === 'spell' || currentStep === 'write') && index === currentWordIndex) {
      wordText.textContent = '**';
    } else {
      wordText.textContent = word.word;
    }
    wordText.onclick = function () {
      return openErrorWordLinkPage(index);
    };
    var wordIndex = document.createElement('div');
    wordIndex.className = 'chain-word-index';
    wordIndex.textContent = index + 1;
    wordElement.appendChild(wordText);
    wordElement.appendChild(wordIndex);
    chainContainer.appendChild(wordElement);
  });

  // 滚动到当前单词位置
  setTimeout(function () {
    var currentElement = document.getElementById("chain-word-".concat(currentWordIndex));
    if (currentElement) {
      currentElement.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      });
    }
  }, 100);
}

/**
 * 更新学习内容
 */
function updateLearningContent() {
  var currentWord = words[currentWordIndex];
  if (!currentWord) return;

  // 更新学页面
  var wordLetters = document.getElementById('wordLetters');
  if (wordLetters) {
    wordLetters.innerHTML = '';
    // 将单词按空格分割成词组
    var wordsArray = currentWord.word.split(' ');
    wordsArray.forEach(function (word, wordIndex) {
      // 创建单词容器，确保单词作为一个整体
      var wordContainer = document.createElement('span');
      wordContainer.className = 'word-container';
      wordContainer.style.display = 'inline-block';
      wordContainer.style.whiteSpace = 'nowrap';

      // 为单词中的每个字母创建元素
      for (var i = 0; i < word.length; i++) {
        var char = word[i];
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.textContent = char;
        var colorCode = getPhoneticColor(char, i, word);
        switch (colorCode) {
          case 'r':
            letter.style.color = '#e74c3c';
            break;
          case 'b':
            letter.style.color = '#3498db';
            break;
          case 'g':
            letter.style.color = '#2ecc71';
            break;
          default:
            letter.style.color = '#333333';
        }
        wordContainer.appendChild(letter);
      }
      wordLetters.appendChild(wordContainer);

      // 在单词之间添加空格（除了最后一个单词）
      if (wordIndex < wordsArray.length - 1) {
        var space = document.createElement('span');
        space.className = 'letter-space';
        space.innerHTML = '&nbsp;';
        space.style.margin = '0 8px';
        wordLetters.appendChild(space);
      }
    });
  }
  var phoneticWrapper = document.getElementById('phoneticWrapper');
  if (phoneticWrapper) {
    phoneticWrapper.textContent = currentWord.phonetic || '';
  }
  var learnMeaning = document.getElementById('learnMeaning');
  if (learnMeaning) {
    learnMeaning.textContent = currentWord.meaning;
  }
  var learnExample = document.getElementById('learnExample');
  if (learnExample) {
    learnExample.textContent = currentWord.example || '例句';
  }
  var learnExampleTranslation = document.getElementById('learnExampleTranslation');
  if (learnExampleTranslation) {
    learnExampleTranslation.textContent = currentWord.translation || '例句翻译';
  }

  // 更新读页面
  var readWord = document.getElementById('readWord');
  if (readWord) {
    readWord.textContent = currentWord.word;
  }
  var readPhonetic = document.getElementById('readPhonetic');
  if (readPhonetic) {
    readPhonetic.textContent = currentWord.phonetic || '';
  }

  // 更新拼页面
  var spellWord = document.getElementById('spellWord');
  if (spellWord) {
    spellWord.textContent = currentWord.word;
  }
  var spellInputs = document.getElementById('spellInputs');
  if (spellInputs) {
    spellInputs.innerHTML = '';
    var _loop = function _loop(i) {
      var inputBox = document.createElement('div');
      inputBox.className = 'spell-input-box';
      inputBox.dataset.index = i;
      inputBox.onclick = function () {
        return removeLetter(i);
      };
      spellInputs.appendChild(inputBox);
    };
    for (var i = 0; i < currentWord.word.length; i++) {
      _loop(i);
    }
  }
  var spellPhonetic = document.getElementById('spellPhonetic');
  if (spellPhonetic) {
    spellPhonetic.textContent = currentWord.phonetic || '';
  }
  var spellLetters = document.getElementById('spellLetters');
  if (spellLetters) {
    spellLetters.innerHTML = '';
    var letters = currentWord.word.split('');
    for (var _i3 = letters.length - 1; _i3 > 0; _i3--) {
      var j = Math.floor(Math.random() * (_i3 + 1));
      var _ref = [letters[j], letters[_i3]];
      letters[_i3] = _ref[0];
      letters[j] = _ref[1];
    }
    letters.forEach(function (letter, index) {
      var letterButton = document.createElement('div');
      letterButton.className = 'spell-letter';
      letterButton.textContent = letter;
      letterButton.onclick = function () {
        return addLetter(letter);
      };
      spellLetters.appendChild(letterButton);
    });
  }

  // 更新写页面
  var writeWord = document.getElementById('writeWord');
  if (writeWord) {
    writeWord.textContent = currentWord.word;
  }
  var writePhonetic = document.getElementById('writePhonetic');
  if (writePhonetic) {
    writePhonetic.textContent = currentWord.phonetic || '';
  }
  var writeMeaning = document.getElementById('writeMeaning');
  if (writeMeaning) {
    writeMeaning.textContent = currentWord.meaning;
  }
  var writeInput = document.getElementById('writeInput');
  if (writeInput) {
    writeInput.value = '';
  }
  var writeResult = document.getElementById('writeResult');
  if (writeResult) {
    writeResult.textContent = '';
    writeResult.classList.remove('correct', 'incorrect');
  }

  // 更新练习页面
  generatePracticeQuestion(currentWord);
}

/**
 * 更新错词学习内容
 */
function updateErrorWordLearningContent() {
  var currentWord = errorWords[currentWordIndex];
  if (!currentWord) return;

  // 更新学页面
  var wordLetters = document.getElementById('wordLetters');
  if (wordLetters) {
    wordLetters.innerHTML = '';
    // 将单词按空格分割成词组
    var wordsArray = currentWord.word.split(' ');
    wordsArray.forEach(function (word, wordIndex) {
      // 创建单词容器，确保单词作为一个整体
      var wordContainer = document.createElement('span');
      wordContainer.className = 'word-container';
      wordContainer.style.display = 'inline-block';
      wordContainer.style.whiteSpace = 'nowrap';

      // 为单词中的每个字母创建元素
      for (var i = 0; i < word.length; i++) {
        var char = word[i];
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.textContent = char;
        var colorCode = getPhoneticColor(char, i, word);
        switch (colorCode) {
          case 'r':
            letter.style.color = '#e74c3c';
            break;
          case 'b':
            letter.style.color = '#3498db';
            break;
          case 'g':
            letter.style.color = '#2ecc71';
            break;
          default:
            letter.style.color = '#333333';
        }
        wordContainer.appendChild(letter);
      }
      wordLetters.appendChild(wordContainer);

      // 在单词之间添加空格（除了最后一个单词）
      if (wordIndex < wordsArray.length - 1) {
        var space = document.createElement('span');
        space.className = 'letter-space';
        space.innerHTML = '&nbsp;';
        space.style.margin = '0 8px';
        wordLetters.appendChild(space);
      }
    });
  }
  var phoneticWrapper = document.getElementById('phoneticWrapper');
  if (phoneticWrapper) {
    phoneticWrapper.textContent = currentWord.phonetic || '';
  }
  var learnMeaning = document.getElementById('learnMeaning');
  if (learnMeaning) {
    learnMeaning.textContent = currentWord.meaning;
  }
  var learnExample = document.getElementById('learnExample');
  if (learnExample) {
    learnExample.textContent = currentWord.example || '例句';
  }
  var learnExampleTranslation = document.getElementById('learnExampleTranslation');
  if (learnExampleTranslation) {
    learnExampleTranslation.textContent = currentWord.translation || '例句翻译';
  }

  // 更新读页面
  var readWord = document.getElementById('readWord');
  if (readWord) {
    readWord.textContent = currentWord.word;
  }
  var readPhonetic = document.getElementById('readPhonetic');
  if (readPhonetic) {
    readPhonetic.textContent = currentWord.phonetic || '';
  }

  // 更新拼页面
  var spellWord = document.getElementById('spellWord');
  if (spellWord) {
    spellWord.textContent = currentWord.word;
  }
  var spellInputs = document.getElementById('spellInputs');
  if (spellInputs) {
    spellInputs.innerHTML = '';
    var _loop2 = function _loop2(i) {
      var inputBox = document.createElement('div');
      inputBox.className = 'spell-input-box';
      inputBox.dataset.index = i;
      inputBox.onclick = function () {
        return removeLetter(i);
      };
      spellInputs.appendChild(inputBox);
    };
    for (var i = 0; i < currentWord.word.length; i++) {
      _loop2(i);
    }
  }
  var spellPhonetic = document.getElementById('spellPhonetic');
  if (spellPhonetic) {
    spellPhonetic.textContent = currentWord.phonetic || '';
  }
  var spellLetters = document.getElementById('spellLetters');
  if (spellLetters) {
    spellLetters.innerHTML = '';
    var letters = currentWord.word.split('');
    for (var _i4 = letters.length - 1; _i4 > 0; _i4--) {
      var j = Math.floor(Math.random() * (_i4 + 1));
      var _ref2 = [letters[j], letters[_i4]];
      letters[_i4] = _ref2[0];
      letters[j] = _ref2[1];
    }
    letters.forEach(function (letter, index) {
      var letterButton = document.createElement('div');
      letterButton.className = 'spell-letter';
      letterButton.textContent = letter;
      letterButton.onclick = function () {
        return addLetter(letter);
      };
      spellLetters.appendChild(letterButton);
    });
  }

  // 更新写页面
  var writeWord = document.getElementById('writeWord');
  if (writeWord) {
    writeWord.textContent = currentWord.word;
  }
  var writePhonetic = document.getElementById('writePhonetic');
  if (writePhonetic) {
    writePhonetic.textContent = currentWord.phonetic || '';
  }
  var writeMeaning = document.getElementById('writeMeaning');
  if (writeMeaning) {
    writeMeaning.textContent = currentWord.meaning;
  }
  var writeInput = document.getElementById('writeInput');
  if (writeInput) {
    writeInput.value = '';
  }
  var writeResult = document.getElementById('writeResult');
  if (writeResult) {
    writeResult.textContent = '';
    writeResult.classList.remove('correct', 'incorrect');
  }

  // 更新练习页面
  generatePracticeQuestion(currentWord);
}

/**
 * 生成练习问题
 */
function generatePracticeQuestion(word) {
  var questionElement = document.getElementById('practiceQuestion');
  var optionsElement = document.getElementById('practiceOptions');
  if (!questionElement || !optionsElement) return;

  // 生成问题（根据单词生成中文意思选择题）
  questionElement.textContent = "\"".concat(word.word, "\" \u7684\u610F\u601D\u662F\uFF1F");

  // 生成选项（包含正确答案和3个干扰项）
  var options = [word.meaning];

  // 从其他单词中随机选择3个不同的意思作为干扰项
  var otherWords = words.filter(function (w) {
    return w !== word;
  });
  while (options.length < 4 && otherWords.length > 0) {
    var randomIndex = Math.floor(Math.random() * otherWords.length);
    var randomWord = otherWords[randomIndex];
    if (!options.includes(randomWord.meaning)) {
      options.push(randomWord.meaning);
    }
    otherWords.splice(randomIndex, 1);
  }

  // 随机打乱选项顺序
  for (var i = options.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref3 = [options[j], options[i]];
    options[i] = _ref3[0];
    options[j] = _ref3[1];
  }

  // 渲染选项
  optionsElement.innerHTML = options.map(function (option, index) {
    var isCorrect = option === word.meaning;
    return "\n        <div class=\"practice-option ".concat(isCorrect ? 'correct' : '', "\" onclick=\"checkPracticeAnswer(this, ").concat(isCorrect, ")\">\n            ").concat(option, "\n        </div>\n        ");
  }).join('');
}

/**
 * 检查练习答案
 */
function checkPracticeAnswer(element, isCorrect) {
  // 禁用所有选项
  var options = document.querySelectorAll('.practice-option');
  options.forEach(function (option) {
    option.onclick = null;
  });

  // 标记正确和错误选项
  if (isCorrect) {
    element.classList.add('correct');
    // 播放正确音效
    AudioManager.playCorrectSound();
  } else {
    element.classList.add('incorrect');
    // 标记正确选项
    var correctOption = document.querySelector('.practice-option.correct');
    if (correctOption) {
      correctOption.classList.add('correct');
    }
    // 播放错误音效
    AudioManager.playErrorSound();
    // 添加到错词本
    var currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
    DataManager.addErrorWord((0, _userManager.getCurrentUser)(), currentWord);
  }
}

/**
 * 检查拼写答案
 */
function checkSpelling() {
  var spellInputs = document.querySelectorAll('.spell-input-box');
  var currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
  var userInput = '';
  spellInputs.forEach(function (input) {
    userInput += input.textContent || '';
  });
  var spellResult = document.getElementById('spellResult');
  if (spellResult) {
    if (userInput.toLowerCase() === currentWord.word.toLowerCase()) {
      spellResult.textContent = '拼写正确！';
      spellResult.classList.add('correct');
      // 播放正确音效
      AudioManager.playCorrectSound();
    } else {
      spellResult.textContent = '拼写错误，请重试！';
      spellResult.classList.add('incorrect');
      // 播放错误音效
      AudioManager.playErrorSound();
      // 添加到错词本
      DataManager.addErrorWord((0, _userManager.getCurrentUser)(), currentWord);
    }
  }
}

/**
 * 检查书写答案
 */
function checkWriting() {
  var writeInput = document.getElementById('writeInput');
  var currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
  var userInput = writeInput.value.trim();
  var writeResult = document.getElementById('writeResult');
  if (writeResult) {
    if (userInput.toLowerCase() === currentWord.word.toLowerCase()) {
      writeResult.textContent = '书写正确！';
      writeResult.classList.add('correct');
      // 播放正确音效
      AudioManager.playCorrectSound();
    } else {
      writeResult.textContent = '书写错误，请重试！';
      writeResult.classList.add('incorrect');
      // 播放错误音效
      AudioManager.playErrorSound();
      // 添加到错词本
      DataManager.addErrorWord((0, _userManager.getCurrentUser)(), currentWord);
    }
  }
}

/**
 * 添加字母到拼写输入框
 */
function addLetter(letter) {
  var spellInputs = document.querySelectorAll('.spell-input-box');
  for (var i = 0; i < spellInputs.length; i++) {
    if (!spellInputs[i].textContent) {
      spellInputs[i].textContent = letter;
      break;
    }
  }
}

/**
 * 从拼写输入框移除字母
 */
function removeLetter(index) {
  var spellInputs = document.querySelectorAll('.spell-input-box');
  if (spellInputs[index]) {
    spellInputs[index].textContent = '';
  }
}

/**
 * 清除书写输入框
 */
function clearWriteInput() {
  var writeInput = document.getElementById('writeInput');
  if (writeInput) {
    writeInput.value = '';
  }
}

/**
 * 重置学习步骤
 */
function resetLearningSteps() {
  var steps = document.querySelectorAll('.step-item');
  steps.forEach(function (step) {
    step.classList.remove('active', 'completed');
  });

  // 设置第一个步骤为活动状态
  document.querySelector('.step-item[data-step="learn"]').classList.add('active');

  // 隐藏所有内容区域
  var contentAreas = document.querySelectorAll('.step-content');
  contentAreas.forEach(function (content) {
    content.classList.remove('active');
  });

  // 显示第一个内容区域
  document.getElementById('contentLearn').classList.add('active');
}

/**
 * 切换学习步骤
 */
function switchStep(step) {
  currentStep = step;

  // 更新步骤状态
  var steps = document.querySelectorAll('.step-item');
  steps.forEach(function (s) {
    s.classList.remove('active', 'completed');
    if (s.dataset.step === step) {
      s.classList.add('active');
    } else if (['learn', 'read', 'practice', 'spell', 'write'].indexOf(s.dataset.step) < ['learn', 'read', 'practice', 'spell', 'write'].indexOf(step)) {
      s.classList.add('completed');
    }
  });

  // 更新内容区域
  var contentAreas = document.querySelectorAll('.step-content');
  contentAreas.forEach(function (content) {
    content.classList.remove('active');
  });
  document.getElementById("content".concat(step.charAt(0).toUpperCase() + step.slice(1))).classList.add('active');

  // 自动播放单词发音
  var currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
  if (currentWord && currentWord.word) {
    AudioManager.playWordAudio(currentWord.word, false);
  }

  // 更新单词链条
  generateWordChain();
}

/**
 * 检查当前步骤是否完成
 */
function isStepCompleted(step) {
  console.log('[isStepCompleted] 检查步骤:', step);
  switch (step) {
    case 'learn':
      // 学习步骤：只要播放过音频就算完成
      console.log('[isStepCompleted] 学习步骤：返回 true');
      return true;
    case 'read':
      // 阅读步骤：只要播放过音频就算完成
      console.log('[isStepCompleted] 阅读步骤：返回 true');
      return true;
    case 'practice':
      // 练习步骤：需要回答正确才算完成
      var practiceOptions = document.querySelectorAll('.practice-option');
      var correctOption = Array.from(practiceOptions).find(function (option) {
        return option.classList.contains('correct');
      });
      console.log('[isStepCompleted] 练习步骤：', correctOption !== undefined);
      return correctOption !== undefined;
    case 'spell':
      // 拼写步骤：需要检查拼写是否正确
      var spellResult = document.getElementById('spellResult');
      var spellCompleted = spellResult && spellResult.classList.contains('correct');
      console.log('[isStepCompleted] 拼写步骤：', spellCompleted);
      return spellCompleted;
    case 'write':
      // 书写步骤：需要检查书写是否正确
      var writeResult = document.getElementById('writeResult');
      var writeCompleted = writeResult && writeResult.classList.contains('correct');
      console.log('[isStepCompleted] 书写步骤：', writeCompleted);
      return writeCompleted;
    default:
      console.log('[isStepCompleted] 默认：返回 true');
      return true;
  }
}

/**
 * 下一步
 */
function nextStep() {
  console.group('[nextStep]');
  console.log('开始');
  try {
    console.log('当前步骤:', currentStep);

    // 检查当前步骤是否完成
    var completed = isStepCompleted(currentStep);
    console.log('当前步骤是否完成:', completed);
    if (!completed) {
      console.log('步骤未完成，显示提示');
      alert('请完成当前步骤后再继续！');
      return;
    }
    var steps = ['learn', 'read', 'practice', 'spell', 'write'];
    var currentIndex = steps.indexOf(currentStep);
    console.log('当前步骤索引:', currentIndex);
    console.log('步骤总数:', steps.length);
    if (currentIndex < steps.length - 1) {
      var nextStepName = steps[currentIndex + 1];
      console.log('进入下一步骤:', nextStepName);
      switchStep(nextStepName);
    } else {
      // 所有步骤完成，进入下一个单词
      console.log('所有步骤完成，进入下一个单词');
      // 直接在这里添加日志，确保能看到执行到这里
      console.log('准备调用 goToNextWord');
      // 延迟调用 goToNextWord，确保日志被记录
      setTimeout(function () {
        console.log('延迟调用 goToNextWord');
        goToNextWord();
      }, 500); // 延长到500毫秒
    }
  } catch (error) {
    console.error('错误:', error);
    // 即使出错也要确保用户能够继续操作
    var _steps = ['learn', 'read', 'practice', 'spell', 'write'];
    var _currentIndex = _steps.indexOf(currentStep);
    if (_currentIndex < _steps.length - 1) {
      var _nextStepName = _steps[_currentIndex + 1];
      switchStep(_nextStepName);
    } else {
      setTimeout(function () {
        goToNextWord();
      }, 500);
    }
  } finally {
    console.log('结束');
    console.groupEnd();
  }
}

/**
 * 上一个单词
 */
function goToPrevWord() {
  if (currentWordIndex > 0) {
    if (isErrorBookMode) {
      openErrorWordLinkPage(currentWordIndex - 1);
    } else {
      openWordLinkPage(currentWordIndex - 1);
    }
  }
}

/**
 * 下一个单词
 */
function goToNextWord() {
  console.group('[goToNextWord]');
  console.log('开始');
  try {
    var currentUser = (0, _userManager.getCurrentUser)();
    var currentFile = (0, _userManager.getCurrentFile)();
    console.log('currentUser:', currentUser);
    console.log('currentFile:', currentFile);
    console.log('currentWordIndex:', currentWordIndex);
    console.log('words.length:', words.length);
    console.log('isErrorBookMode:', isErrorBookMode);
    console.log('errorWords.length:', errorWords.length);

    // 标记当前单词为已学
    var currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
    console.log('当前单词:', currentWord);
    if (currentWord && currentWord.word) {
      console.log('标记单词为已学:', currentWord.word);
      console.log('[goToNextWord] 当前课本:', currentFile);

      // 使用DataManager标记单词为已学
      var bookData = DataManager.markWordAsLearned(currentUser, currentFile, currentWord);
      console.log('[goToNextWord] 标记单词为已学成功，已学数量:', bookData.learnedCount);

      // 使用DataManager添加积分
      DataManager.addPoints(currentUser, 1);
      console.log('[goToNextWord] 添加积分成功');

      // 更新统计显示
      (0, _statsManager.updateStatsDisplay)();
      console.log('已学标记和积分添加完成');

      // 执行页面重定向
      setTimeout(function () {
        console.log('延迟后执行页面重定向');
        if (isErrorBookMode) {
          if (currentWordIndex < errorWords.length - 1) {
            console.log('进入下一个错词:', currentWordIndex + 1);
            openErrorWordLinkPage(currentWordIndex + 1);
          } else {
            console.log('最后一个错词，返回错词本页');
            window.location.href = 'error-book.html';
          }
        } else {
          if (currentWordIndex < words.length - 1) {
            console.log('进入下一个单词:', currentWordIndex + 1);
            openWordLinkPage(currentWordIndex + 1);
          } else {
            console.log('最后一个单词，返回单词列表页');
            backToWordList();
          }
        }
      }, 500); // 增加延迟时间，确保数据完全保存
    } else {
      // 没有单词，直接进行页面重定向
      console.log('没有当前单词，直接进行页面重定向');
      setTimeout(function () {
        if (isErrorBookMode) {
          window.location.href = 'error-book.html';
        } else {
          if (currentWordIndex < words.length - 1) {
            console.log('进入下一个单词:', currentWordIndex + 1);
            openWordLinkPage(currentWordIndex + 1);
          } else {
            console.log('最后一个单词，返回单词列表页');
            backToWordList();
          }
        }
      }, 500);
    }
  } catch (error) {
    console.error('错误:', error);
    // 即使出错也要确保用户能够继续操作
    setTimeout(function () {
      if (isErrorBookMode) {
        window.location.href = 'error-book.html';
      } else {
        if (currentWordIndex < words.length - 1) {
          openWordLinkPage(currentWordIndex + 1);
        } else {
          backToWordList();
        }
      }
    }, 500);
  } finally {
    console.log('结束');
    console.groupEnd();
  }
}

/**
 * 返回单词列表页
 */
function backToWordList() {
  if (isErrorBookMode) {
    window.location.href = 'error-book.html';
  } else {
    window.location.href = 'word-list.html';
  }
}

/**
 * 更新导航按钮状态
 */
function updateNavigationButtons() {
  var prevBtn = document.getElementById('prevWordBtn');
  var nextBtn = document.getElementById('nextWordBtn');
  if (prevBtn) {
    prevBtn.disabled = currentWordIndex === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = currentWordIndex === words.length - 1;
  }
}

/**
 * 更新错词导航按钮状态
 */
function updateErrorWordNavigationButtons() {
  var prevBtn = document.getElementById('prevWordBtn');
  var nextBtn = document.getElementById('nextWordBtn');
  if (prevBtn) {
    prevBtn.disabled = currentWordIndex === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = currentWordIndex === errorWords.length - 1;
  }
}

/**
 * 初始化 PDF.js
 */
function initPdfJs() {
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    console.log('[PDF.js] 初始化成功');
    return true;
  }
  console.warn('[PDF.js] 库未加载');
  return false;
}

/**
 * 获取音标颜色
 */
function getPhoneticColor(char, index, word) {
  // 这里可以根据音标规则实现不同字母的颜色标记
  // 暂时返回默认颜色
  return '';
}

/**
 * 显示加载中
 */
function showLoading() {
  var loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove('hidden');
  }
}

/**
 * 隐藏加载中
 */
function hideLoading() {
  var loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
}

/**
 * 开始学习 - 进入单词列表页
 */
function startLearning() {
  window.location.href = 'word-list.html';
}

/**
 * 开始详细学习 - 进入单词学习页面
 */
function startDetailedLearning() {
  window.location.href = 'word-link.html?index=0';
}

/**
 * 打开文章列表页面
 */
function openArticleListPage() {
  window.location.href = 'article-list.html';
}

/**
 * 返回首页
 */
function backToHome() {
  window.location.href = 'index.html';
}

/**
 * 显示课本选择弹窗
 */
function showBookModal() {
  document.getElementById('bookModal').classList.add('active');
}

/**
 * 关闭课本选择弹窗
 */
function closeBookModal() {
  document.getElementById('bookModal').classList.remove('active');
}

/**
 * 显示用户选择弹窗
 */
function showUserModal() {
  document.getElementById('userModal').classList.add('active');
}

/**
 * 生成单元标签
 */
function generateUnitTabs() {
  var tabsContainer = document.getElementById('unitTabs');
  if (!tabsContainer) return;
  tabsContainer.innerHTML = '';
}

// 导入其他模块的函数