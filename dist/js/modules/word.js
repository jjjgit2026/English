"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLetter = addLetter;
exports.backToWordList = backToWordList;
exports.changeMonth = changeMonth;
exports.checkPracticeAnswer = checkPracticeAnswer;
exports.checkSpelling = checkSpelling;
exports.checkWriting = checkWriting;
exports.clearWriteInput = clearWriteInput;
exports.generateErrorWordChain = generateErrorWordChain;
exports.generatePracticeQuestion = generatePracticeQuestion;
exports.generateWordChain = generateWordChain;
exports.getPhoneticColor = getPhoneticColor;
exports.goToNextWord = goToNextWord;
exports.goToPrevWord = goToPrevWord;
exports.hideLoading = hideLoading;
exports.initCheckinHistoryPage = initCheckinHistoryPage;
exports.initFilterButtons = initFilterButtons;
exports.initPdfJs = initPdfJs;
exports.initPointsHistoryPage = initPointsHistoryPage;
exports.initWordListPage = initWordListPage;
exports.isStepCompleted = isStepCompleted;
exports.loadMockData = loadMockData;
exports.loadPDF = loadPDF;
exports.loadPDFOriginal = loadPDFOriginal;
exports.loadPointsHistory = loadPointsHistory;
exports.loadPointsSummary = loadPointsSummary;
exports.loadUserData = loadUserData;
exports.markAsLearned = markAsLearned;
exports.nextStep = nextStep;
exports.openErrorWordLinkPage = openErrorWordLinkPage;
exports.openWordLinkPage = openWordLinkPage;
exports.processPDF = processPDF;
exports.removeLetter = removeLetter;
exports.renderCalendar = renderCalendar;
exports.renderErrorWordList = renderErrorWordList;
exports.renderWordList = renderWordList;
exports.resetLearningSteps = resetLearningSteps;
exports.showError = showError;
exports.showLoading = showLoading;
exports.startErrorWordLearning = startErrorWordLearning;
exports.switchStep = switchStep;
exports.toggleDateGroup = toggleDateGroup;
exports.updateErrorWordLearningContent = updateErrorWordLearningContent;
exports.updateErrorWordNavigationButtons = updateErrorWordNavigationButtons;
exports.updateLearningContent = updateLearningContent;
exports.updateNavigationButtons = updateNavigationButtons;
exports.updateStats = updateStats;
exports.updateStatsDisplay = updateStatsDisplay;
exports.updateStatsPage = updateStatsPage;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.pad-start.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _init = require("./init.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // 单词模块
// 当前筛选状态
var currentFilter = 'all';

// 缓存对象
var wordCache = {};

// 加载单词数据
function loadPDF() {
  return _loadPDF.apply(this, arguments);
} // 显示加载中
function _loadPDF() {
  _loadPDF = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var pdfPath, jsonPath, response, data, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          console.log('[加载单词数据] 开始');
          console.log('[加载单词数据] currentFile:', _init.currentFile);
          console.log('[加载单词数据] currentUser:', _init.currentUser);

          // 检查缓存
          if (!wordCache[_init.currentFile]) {
            _context.n = 1;
            break;
          }
          console.log('[加载单词数据] 从缓存加载数据');
          (0, _init.setWords)(wordCache[_init.currentFile]);
          // 初始化课本数据
          DataManager.initBookData(_init.currentUser, _init.currentFile, _init.words.length);
          // 更新统计显示
          updateStatsDisplay();
          // 渲染单词列表
          renderWordList();
          console.log('[加载单词数据] 从缓存加载完成');
          return _context.a(2);
        case 1:
          showLoading('正在加载单词数据...');
          pdfPath = "../../assets/PDF/".concat(_init.currentFile);
          jsonPath = "../../data/".concat(_init.currentFile.replace('.pdf', '.json'));
          console.log('[加载单词数据] pdfPath:', pdfPath);
          console.log('[加载单词数据] jsonPath:', jsonPath);
          _context.p = 2;
          _context.n = 3;
          return fetch(jsonPath);
        case 3:
          response = _context.v;
          console.log('[加载单词数据] JSON文件响应状态:', response.status);
          if (!response.ok) {
            _context.n = 5;
            break;
          }
          _context.n = 4;
          return response.json();
        case 4:
          data = _context.v;
          console.log('[加载单词数据] JSON加载成功，单词数量:', data.length);
          (0, _init.setWords)(data);
          // 缓存数据
          wordCache[_init.currentFile] = data;
          console.log('[加载单词数据] 初始化课本数据');
          // 初始化课本数据
          DataManager.initBookData(_init.currentUser, _init.currentFile, _init.words.length);
          console.log('[加载单词数据] 更新统计显示');
          updateStatsDisplay();
          console.log('[加载单词数据] 渲染单词列表');
          renderWordList();
          _context.n = 6;
          break;
        case 5:
          throw new Error('JSON文件不存在或无法加载');
        case 6:
          _context.n = 8;
          break;
        case 7:
          _context.p = 7;
          _t = _context.v;
          console.error('加载JSON失败:', _t);
          // 回退到PDF加载
          console.log('回退到PDF加载:', pdfPath);
          _context.n = 8;
          return loadPDFOriginal();
        case 8:
          _context.p = 8;
          hideLoading();
          console.log('[加载单词数据] 结束');
          return _context.f(8);
        case 9:
          return _context.a(2);
      }
    }, _callee, null, [[2, 7, 8, 9]]);
  }));
  return _loadPDF.apply(this, arguments);
}
function showLoading() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '加载中，请稍候...';
  var loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    var loadingText = loadingOverlay.querySelector('.loading-text');
    if (loadingText) {
      loadingText.textContent = message;
    }
    loadingOverlay.classList.remove('hidden');
  }
}

// 隐藏加载中
function hideLoading() {
  var loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
}

// 显示错误提示
function showError(message) {
  alert("\u9519\u8BEF: ".concat(message));
  console.error('错误:', message);
}

// 原始PDF加载函数
function loadPDFOriginal() {
  return _loadPDFOriginal.apply(this, arguments);
} // 处理PDF文档
function _loadPDFOriginal() {
  _loadPDFOriginal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var pdf, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          showLoading('正在解析PDF文件...');
          // 初始化 PDF.js
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
            url: "../../assets/PDF/".concat(_init.currentFile),
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
          showError('加载PDF失败，使用模拟数据');
          // 使用模拟数据
          loadMockData();
        case 5:
          _context2.p = 5;
          hideLoading();
          return _context2.f(5);
        case 6:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 4, 5, 6]]);
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
      (0, _init.setWords)([]); // 重置单词列表

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
              _init.words.push(word);
            }
          });
        }
      });

      // 缓存数据
      wordCache[_init.currentFile] = _init.words;
      console.log('[处理PDF] 缓存单词数据');

      // console.log('最终单词列表:', words);
      // console.log('单词数量:', words.length);

      // 初始化课本数据
      DataManager.initBookData(_init.currentUser, _init.currentFile, _init.words.length);

      // 更新统计显示
      updateStatsDisplay();

      // 渲染单词列表
      renderWordList();
    });
  });
}

// 初始化 PDF.js
function initPdfJs() {
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    console.log('[PDF.js] 初始化成功');
    return true;
  }
  console.warn('[PDF.js] 库未加载');
  return false;
}

// 使用模拟数据
function loadMockData() {
  (0, _init.setWords)([{
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
  }]);

  // 更新统计显示
  updateStatsDisplay();

  // 渲染单词列表
  renderWordList();
}

// 渲染单词列表
function renderWordList() {
  var listContainer = document.getElementById('wordList');
  if (!listContainer) return;

  // 获取用户数据
  var userData = DataManager.getUserData(_init.currentUser);
  var wordLearningRecords = userData.wordLearningRecords || {};
  var masteredWords = userData.masteredWords || {};
  var filteredWords = _init.words;

  // 按单元筛选
  if (_init.currentUnit !== 'all') {
    filteredWords = filteredWords.filter(function (w) {
      return w.unit === _init.currentUnit;
    });
  }

  // 按状态筛选
  if (currentFilter !== 'all') {
    filteredWords = filteredWords.filter(function (word) {
      var wordKey = word.word;
      switch (currentFilter) {
        case 'unlearned':
          return !wordLearningRecords[wordKey] && !masteredWords[wordKey];
        case 'learned':
          return wordLearningRecords[wordKey] && !masteredWords[wordKey];
        case 'mastered':
          return masteredWords[wordKey];
        default:
          return true;
      }
    });
  }

  // 使用文档片段批量更新
  var fragment = document.createDocumentFragment();
  filteredWords.forEach(function (word, index) {
    var wordItem = document.createElement('div');
    wordItem.className = 'word-item';
    // 找到单词在原始列表中的索引
    var originalIndex = _init.words.findIndex(function (w) {
      return w.word === word.word;
    });
    wordItem.dataset.index = originalIndex;
    wordItem.onclick = function () {
      return openWordLinkPage(originalIndex);
    };
    wordItem.innerHTML = "\n            <div class=\"word-index\">".concat(index + 1, "</div>\n            <div class=\"word-info\">\n                <div class=\"word-text ").concat(_init.maskMode === 'word' ? 'masked' : '', "\">").concat(word.word, "</div>\n                <div class=\"word-phonetic\">").concat(word.phonetic || '', "</div>\n            </div>\n            <div class=\"word-meaning ").concat(_init.maskMode === 'meaning' ? 'masked' : '', "\">").concat(word.meaning, "</div>\n            <div class=\"word-actions\">\n                <button class=\"action-btn\">\uD83D\uDD0A</button>\n            </div>\n        ");

    // 添加事件监听器
    var wordText = wordItem.querySelector('.word-text');
    if (_init.maskMode === 'word') {
      wordText.onclick = function (e) {
        wordText.classList.remove('masked');
        e.stopPropagation();
      };
    }
    var wordMeaning = wordItem.querySelector('.word-meaning');
    if (_init.maskMode === 'meaning') {
      wordMeaning.onclick = function (e) {
        wordMeaning.classList.remove('masked');
        e.stopPropagation();
      };
    }

    // 处理发音按钮点击事件
    var actionBtn = wordItem.querySelector('.action-btn');
    actionBtn.onclick = function (e) {
      AudioManager.playWordAudio(word.word, false);
      e.stopPropagation();
    };
    fragment.appendChild(wordItem);
  });

  // 清空容器并添加文档片段
  listContainer.innerHTML = '';
  listContainer.appendChild(fragment);

  // 为错词本列表也添加序号
  var errorListContainer = document.getElementById('errorWordList');
  if (errorListContainer) {
    var _errorWords = DataManager.getErrorWords(_init.currentUser);

    // 使用文档片段批量更新
    var errorFragment = document.createDocumentFragment();
    _errorWords.forEach(function (word, index) {
      var wordItem = document.createElement('div');
      wordItem.className = 'word-item';
      wordItem.dataset.index = index;
      wordItem.onclick = function () {
        return openErrorWordLinkPage(index);
      };
      wordItem.innerHTML = "\n                <div class=\"word-index\">".concat(index + 1, "</div>\n                <div class=\"word-info\">\n                    <div class=\"word-text\">").concat(word.word, "</div>\n                    <div class=\"word-phonetic\">").concat(word.phonetic || '', "</div>\n                </div>\n                <div class=\"word-meaning\">").concat(word.meaning, "</div>\n                <div class=\"word-actions\">\n                    <button class=\"action-btn\">\uD83D\uDD0A</button>\n                </div>\n            ");

      // 添加事件监听器
      var actionBtn = wordItem.querySelector('.action-btn');
      actionBtn.onclick = function (e) {
        AudioManager.playWordAudio(word.word, false);
        e.stopPropagation();
      };
      errorFragment.appendChild(wordItem);
    });

    // 清空容器并添加文档片段
    errorListContainer.innerHTML = '';
    errorListContainer.appendChild(errorFragment);
  }
}

// 初始化筛选下拉框事件
function initFilterButtons() {
  var filterSelect = document.getElementById('statusFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', function () {
      // 更新当前筛选状态
      currentFilter = filterSelect.value;
      // 重新渲染单词列表
      renderWordList();
    });
  }
}

// 生成单词链条
function generateWordChain() {
  var chainContainer = document.getElementById('wordChain');
  if (!chainContainer) return;

  // 使用文档片段批量更新
  var fragment = document.createDocumentFragment();
  var wordList = _init.isErrorBookMode ? _init.errorWords : _init.words;
  wordList.forEach(function (word, index) {
    var wordElement = document.createElement('div');
    wordElement.className = 'chain-word-item';
    var wordText = document.createElement('div');
    wordText.className = 'chain-word';
    wordText.id = "chain-word-".concat(index);
    if (index === _init.currentWordIndex) {
      wordText.classList.add('current');
    } else if (index < _init.currentWordIndex) {
      wordText.classList.add('completed');
    } else {
      wordText.classList.add('pending');
    }

    // 在拼和写步骤中遮挡当前学习的单词
    if ((_init.currentStep === 'spell' || _init.currentStep === 'write') && index === _init.currentWordIndex) {
      wordText.textContent = '**';
    } else {
      wordText.textContent = word.word;
    }
    wordText.onclick = function () {
      if (_init.isErrorBookMode) {
        openErrorWordLinkPage(index);
      } else {
        openWordLinkPage(index);
      }
    };
    var wordIndex = document.createElement('div');
    wordIndex.className = 'chain-word-index';
    wordIndex.textContent = index + 1;
    wordElement.appendChild(wordText);
    wordElement.appendChild(wordIndex);
    fragment.appendChild(wordElement);
  });

  // 清空容器并添加文档片段
  chainContainer.innerHTML = '';
  chainContainer.appendChild(fragment);

  // 滚动到当前单词位置
  setTimeout(function () {
    var currentElement = document.getElementById("chain-word-".concat(_init.currentWordIndex));
    if (currentElement) {
      currentElement.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      });
    }
  }, 100);
}

// 更新学习内容
function updateLearningContent() {
  var currentWord = _init.isErrorBookMode ? _init.errorWords[_init.currentWordIndex] : _init.words[_init.currentWordIndex];
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

// 重置学习步骤
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

// 切换学习步骤
function switchStep(step) {
  (0, _init.setCurrentStep)(step);

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
  var currentWord = _init.isErrorBookMode ? _init.errorWords[_init.currentWordIndex] : _init.words[_init.currentWordIndex];
  if (currentWord && currentWord.word) {
    AudioManager.playWordAudio(currentWord.word, false);
  }

  // 更新单词链条
  generateWordChain();
}

// 检查当前步骤是否完成
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

// 下一步
function nextStep() {
  console.group('[nextStep]');
  console.log('开始');
  try {
    console.log('当前步骤:', _init.currentStep);

    // 处理拼写和书写步骤的特殊逻辑
    if (_init.currentStep === 'spell') {
      console.log('处理拼写步骤');
      var inputBoxes = document.querySelectorAll('.spell-input-box');
      var userInput = '';
      inputBoxes.forEach(function (box) {
        userInput += box.textContent;
      });
      var currentWord = _init.isErrorBookMode ? _init.errorWords[_init.currentWordIndex] : _init.words[_init.currentWordIndex];
      var resultElement = document.getElementById('spellResult');
      if (userInput === currentWord.word) {
        console.log('拼写正确');
        resultElement.textContent = '正确！';
        resultElement.classList.add('correct');
        resultElement.classList.remove('incorrect');
        AudioManager.playSuccessSound();

        // 停留1秒后进入下一步
        setTimeout(function () {
          console.log('拼写正确，进入下一步');
          var steps = ['learn', 'read', 'practice', 'spell', 'write'];
          var currentIndex = steps.indexOf(_init.currentStep);
          if (currentIndex < steps.length - 1) {
            var nextStepName = steps[currentIndex + 1];
            console.log('进入下一步骤:', nextStepName);
            switchStep(nextStepName);
          } else {
            setTimeout(function () {
              goToNextWord();
            }, 500);
          }
        }, 1000);
      } else {
        console.log('拼写错误');
        resultElement.textContent = '错误，请重试！';
        resultElement.classList.add('incorrect');
        resultElement.classList.remove('correct');
        AudioManager.playErrorSound();
        // 添加到错词本
        DataManager.addErrorWord(_init.currentUser, currentWord);
        // 停留在当前步骤
        return;
      }
    } else if (_init.currentStep === 'write') {
      console.log('处理书写步骤');
      var input = document.getElementById('writeInput');
      var _resultElement = document.getElementById('writeResult');
      var _currentWord = _init.isErrorBookMode ? _init.errorWords[_init.currentWordIndex] : _init.words[_init.currentWordIndex];
      if (input.value.trim() === _currentWord.word) {
        console.log('书写正确');
        _resultElement.textContent = '正确！';
        _resultElement.classList.add('correct');
        _resultElement.classList.remove('incorrect');
        AudioManager.playSuccessSound();

        // 停留1秒后进入下一步
        setTimeout(function () {
          console.log('书写正确，进入下一步');
          var steps = ['learn', 'read', 'practice', 'spell', 'write'];
          var currentIndex = steps.indexOf(_init.currentStep);
          if (currentIndex < steps.length - 1) {
            var nextStepName = steps[currentIndex + 1];
            console.log('进入下一步骤:', nextStepName);
            switchStep(nextStepName);
          } else {
            setTimeout(function () {
              goToNextWord();
            }, 500);
          }
        }, 1000);
      } else {
        console.log('书写错误');
        _resultElement.textContent = '错误，请重试！';
        _resultElement.classList.add('incorrect');
        _resultElement.classList.remove('correct');
        AudioManager.playErrorSound();
        // 添加到错词本
        DataManager.addErrorWord(_init.currentUser, _currentWord);
        // 停留在当前步骤
        return;
      }
    } else {
      // 其他步骤的原有逻辑
      // 检查当前步骤是否完成
      var completed = isStepCompleted(_init.currentStep);
      console.log('当前步骤是否完成:', completed);
      if (!completed) {
        console.log('步骤未完成，显示提示');
        alert('请完成当前步骤后再继续！');
        return;
      }
      var steps = ['learn', 'read', 'practice', 'spell', 'write'];
      var currentIndex = steps.indexOf(_init.currentStep);
      console.log('当前步骤索引:', currentIndex);
      console.log('步骤总数:', steps.length);
      if (currentIndex < steps.length - 1) {
        var nextStepName = steps[currentIndex + 1];
        console.log('进入下一步骤:', nextStepName);
        switchStep(nextStepName);
      } else {
        // 所有步骤完成，进入下一个单词
        console.log('所有步骤完成，进入下一个单词');
        // 延迟调用 goToNextWord
        setTimeout(function () {
          console.log('延迟调用 goToNextWord');
          goToNextWord();
        }, 500);
      }
    }
  } catch (error) {
    console.error('错误:', error);
    // 即使出错也要确保用户能够继续操作
    var _steps = ['learn', 'read', 'practice', 'spell', 'write'];
    var _currentIndex = _steps.indexOf(_init.currentStep);
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

// 上一个单词
function goToPrevWord() {
  if (_init.currentWordIndex > 0) {
    openWordLinkPage(_init.currentWordIndex - 1);
  }
}

// 下一个单词
function goToNextWord() {
  console.group('[goToNextWord]');
  console.log('开始');
  try {
    console.log('currentUser:', _init.currentUser);
    console.log('currentFile:', _init.currentFile);
    console.log('currentWordIndex:', _init.currentWordIndex);
    console.log('words.length:', _init.words.length);
    console.log('isErrorBookMode:', _init.isErrorBookMode);
    console.log('errorWords.length:', _init.errorWords.length);

    // 标记当前单词为已学
    var currentWord = _init.isErrorBookMode ? _init.errorWords[_init.currentWordIndex] : _init.words[_init.currentWordIndex];
    console.log('当前单词:', currentWord);
    if (currentWord && currentWord.word) {
      console.log('标记单词为已学（待复习）:', currentWord.word);
      console.log('[goToNextWord] 当前课本:', _init.currentFile);

      // 如果是错词本模式，从错词本中删除该单词
      if (_init.isErrorBookMode) {
        DataManager.removeErrorWord(_init.currentUser, currentWord);
        console.log('[goToNextWord] 从错词本中删除单词成功');
      }

      // 标记单词为已学（待复习），记入wordLearningRecords
      var userData = DataManager.getUserData(_init.currentUser);
      if (!userData.wordLearningRecords) userData.wordLearningRecords = {};
      userData.wordLearningRecords[currentWord.word] = {
        learnedDate: new Date().toISOString(),
        meaning: currentWord.meaning
      };

      // 更新课本已完成学习数量
      if (!userData.books) userData.books = {};
      if (!userData.books[_init.currentFile]) {
        userData.books[_init.currentFile] = {
          totalWords: _init.words.length,
          learnedCount: 0
        };
      }
      userData.books[_init.currentFile].learnedCount = (parseInt(userData.books[_init.currentFile].learnedCount) || 0) + 1;

      // 更新今日学习数据
      if (!userData.today) {
        userData.today = {
          date: DataManager.getLocalDateString(),
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
      userData.today.learning = (parseInt(userData.today.learning) || 0) + 1;
      userData.today.newWordsLearned = (parseInt(userData.today.newWordsLearned) || 0) + 1;

      // 保存数据（先保存基础数据）
      DataManager.saveUserData(_init.currentUser, userData);
      console.log('[goToNextWord] 保存基础数据成功');

      // 更新新学任务进度
      DataManager.updateTaskProgress(_init.currentUser, 'new');

      // 使用DataManager添加积分
      DataManager.addPoints(_init.currentUser, 1, '学习单词');
      console.log('[goToNextWord] 添加积分成功');

      // 更新统计显示
      updateStatsDisplay();
      console.log('已学标记和积分添加完成');

      // 执行页面重定向
      setTimeout(function () {
        console.log('延迟后执行页面重定向');
        if (_init.isErrorBookMode) {
          if (_init.currentWordIndex < _init.errorWords.length - 1) {
            console.log('进入下一个错词:', _init.currentWordIndex + 1);
            openErrorWordLinkPage(_init.currentWordIndex + 1);
          } else {
            console.log('最后一个错词，返回错词本页');
            window.location.href = 'error-book.html';
          }
        } else {
          if (_init.currentWordIndex < _init.words.length - 1) {
            console.log('进入下一个单词:', _init.currentWordIndex + 1);
            openWordLinkPage(_init.currentWordIndex + 1);
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
        if (_init.isErrorBookMode) {
          window.location.href = 'error-book.html';
        } else {
          if (_init.currentWordIndex < _init.words.length - 1) {
            console.log('进入下一个单词:', _init.currentWordIndex + 1);
            openWordLinkPage(_init.currentWordIndex + 1);
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
      if (_init.isErrorBookMode) {
        window.location.href = 'error-book.html';
      } else {
        if (_init.currentWordIndex < _init.words.length - 1) {
          openWordLinkPage(_init.currentWordIndex + 1);
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

// 标记单词为学会了
function markAsLearned() {
  console.group('[markAsLearned]');
  console.log('开始');
  try {
    console.log('currentUser:', _init.currentUser);
    console.log('currentFile:', _init.currentFile);
    console.log('currentWordIndex:', _init.currentWordIndex);

    // 获取当前单词
    var currentWord = _init.isErrorBookMode ? _init.errorWords[_init.currentWordIndex] : _init.words[_init.currentWordIndex];
    console.log('当前单词:', currentWord);
    if (currentWord && currentWord.word) {
      console.log('标记单词为掌握:', currentWord.word);
      console.log('[markAsLearned] 当前课本:', _init.currentFile);

      // 检查是否有错误（单词是否在错词本中）
      var userData = DataManager.getUserData(_init.currentUser);
      var isErrorWord = userData.errorWords && userData.errorWords.some(function (word) {
        return word.word === currentWord.word;
      });
      console.log('单词是否在错词本中:', isErrorWord);

      // 如果是错词本模式，从错词本中删除该单词
      if (_init.isErrorBookMode) {
        DataManager.removeErrorWord(_init.currentUser, currentWord);
        console.log('[markAsLearned] 从错词本中删除单词成功');
      }

      // 标记单词为掌握
      var userData2 = DataManager.getUserData(_init.currentUser);
      if (!userData2.masteredWords) userData2.masteredWords = {};
      userData2.masteredWords[currentWord.word] = true;

      // 从wordLearningRecords中删除该单词（如果存在）
      if (userData2.wordLearningRecords && userData2.wordLearningRecords[currentWord.word]) {
        delete userData2.wordLearningRecords[currentWord.word];
      }

      // 更新课本已完成学习数量
      if (!userData2.books) userData2.books = {};
      if (!userData2.books[_init.currentFile]) {
        userData2.books[_init.currentFile] = {
          totalWords: _init.words.length,
          learnedCount: 0
        };
      }
      userData2.books[_init.currentFile].learnedCount = (parseInt(userData2.books[_init.currentFile].learnedCount) || 0) + 1;

      // 更新今日学习数据
      if (!userData2.today) {
        userData2.today = {
          date: DataManager.getLocalDateString(),
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
      userData2.today.learning = (parseInt(userData2.today.learning) || 0) + 1;
      userData2.today.newWordsLearned = (parseInt(userData2.today.newWordsLearned) || 0) + 1;

      // 保存数据（先保存基础数据）
      DataManager.saveUserData(_init.currentUser, userData2);
      console.log('[markAsLearned] 保存基础数据成功');

      // 更新新学任务进度
      DataManager.updateTaskProgress(_init.currentUser, 'new');

      // 使用DataManager添加积分
      DataManager.addPoints(_init.currentUser, 1, '学习单词');
      console.log('[markAsLearned] 添加积分成功');

      // 更新统计显示
      updateStatsDisplay();
      console.log('掌握标记和积分添加完成');

      // 执行页面重定向
      setTimeout(function () {
        console.log('延迟后执行页面重定向');
        if (_init.isErrorBookMode) {
          if (_init.currentWordIndex < _init.errorWords.length - 1) {
            console.log('进入下一个错词:', _init.currentWordIndex + 1);
            openErrorWordLinkPage(_init.currentWordIndex + 1);
          } else {
            console.log('最后一个错词，返回错词本页');
            window.location.href = 'error-book.html';
          }
        } else {
          if (_init.currentWordIndex < _init.words.length - 1) {
            console.log('进入下一个单词:', _init.currentWordIndex + 1);
            openWordLinkPage(_init.currentWordIndex + 1);
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
        if (_init.isErrorBookMode) {
          window.location.href = 'error-book.html';
        } else {
          if (_init.currentWordIndex < _init.words.length - 1) {
            console.log('进入下一个单词:', _init.currentWordIndex + 1);
            openWordLinkPage(_init.currentWordIndex + 1);
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
      if (_init.isErrorBookMode) {
        window.location.href = 'error-book.html';
      } else {
        if (_init.currentWordIndex < _init.words.length - 1) {
          openWordLinkPage(_init.currentWordIndex + 1);
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

// 返回单词列表页
function backToWordList() {
  if (_init.isErrorBookMode) {
    window.location.href = 'error-book.html';
  } else {
    window.location.href = 'word-list.html';
  }
}

// 更新导航按钮状态
function updateNavigationButtons() {
  var prevBtn = document.getElementById('prevWordBtn');
  var nextBtn = document.getElementById('nextWordBtn');
  var wordListLength = _init.isErrorBookMode ? _init.errorWords.length : _init.words.length;
  if (prevBtn) {
    prevBtn.disabled = _init.currentWordIndex === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = _init.currentWordIndex === wordListLength - 1;
  }
}

// 初始化单词列表页面
function initWordListPage() {
  // 初始化筛选按钮
  initFilterButtons();
  // 渲染单词列表
  renderWordList();
}

// 生成练习问题
function generatePracticeQuestion(word) {
  var questionElement = document.getElementById('practiceQuestion');
  var optionsElement = document.getElementById('practiceOptions');
  if (!questionElement || !optionsElement) return;

  // 生成问题类型
  var questionTypes = ['meaning', 'word'];
  var questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  if (questionType === 'meaning') {
    // 给出单词，选择释义
    questionElement.textContent = "\"".concat(word.word, "\" \u7684\u610F\u601D\u662F\uFF1F");

    // 生成选项
    var options = [word.meaning];

    // 添加干扰选项
    while (options.length < 4) {
      var randomWord = _init.words[Math.floor(Math.random() * _init.words.length)];
      if (!options.includes(randomWord.meaning)) {
        options.push(randomWord.meaning);
      }
    }

    // 打乱选项顺序
    for (var i = options.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var _ref2 = [options[j], options[i]];
      options[i] = _ref2[0];
      options[j] = _ref2[1];
    }

    // 渲染选项
    optionsElement.innerHTML = options.map(function (option) {
      return "\n            <div class=\"practice-option\" onclick=\"checkPracticeAnswer('".concat(option, "', '").concat(word.meaning, "')\">\n                ").concat(option, "\n            </div>\n            ");
    }).join('');
  } else {
    // 给出释义，选择单词
    questionElement.textContent = "\u54EA\u4E2A\u5355\u8BCD\u7684\u610F\u601D\u662F \"".concat(word.meaning, "\"\uFF1F");

    // 生成选项
    var _options = [word.word];

    // 添加干扰选项
    while (_options.length < 4) {
      var _randomWord = _init.words[Math.floor(Math.random() * _init.words.length)];
      if (!_options.includes(_randomWord.word)) {
        _options.push(_randomWord.word);
      }
    }

    // 打乱选项顺序
    for (var _i4 = _options.length - 1; _i4 > 0; _i4--) {
      var _j = Math.floor(Math.random() * (_i4 + 1));
      var _ref3 = [_options[_j], _options[_i4]];
      _options[_i4] = _ref3[0];
      _options[_j] = _ref3[1];
    }

    // 渲染选项
    optionsElement.innerHTML = _options.map(function (option) {
      return "\n            <div class=\"practice-option\" onclick=\"checkPracticeAnswer('".concat(option, "', '").concat(word.word, "')\">\n                ").concat(option, "\n            </div>\n            ");
    }).join('');
  }
}

// 检查练习答案
function checkPracticeAnswer(selected, correct) {
  var options = document.querySelectorAll('.practice-option');
  options.forEach(function (option) {
    if (option.textContent.trim() === correct) {
      option.classList.add('correct');
    } else if (option.textContent.trim() === selected) {
      option.classList.add('incorrect');
    }
    option.onclick = null;
  });

  // 播放音效
  if (selected === correct) {
    AudioManager.playSuccessSound();

    // 使用DataManager获取用户数据
    var userData = DataManager.getUserData(_init.currentUser);

    // 更新测试和正确数量
    userData.today.testing = (userData.today.testing || 0) + 1;
    userData.total.testing = (userData.total.testing || 0) + 1;
    userData.today.correct = (userData.today.correct || 0) + 1;
    userData.total.correct = (userData.total.correct || 0) + 1;

    // 保存数据
    DataManager.saveUserData(_init.currentUser, userData);
    console.log('[checkPracticeAnswer] 练习正确，更新正确数量');
  } else {
    AudioManager.playErrorSound();
    // 添加到错词本
    var currentWord = _init.isErrorBookMode ? _init.errorWords[_init.currentWordIndex] : _init.words[_init.currentWordIndex];
    DataManager.addErrorWord(_init.currentUser, currentWord);

    // 使用DataManager获取用户数据
    var _userData = DataManager.getUserData(_init.currentUser);

    // 更新测试数量
    _userData.today.testing = (_userData.today.testing || 0) + 1;
    _userData.total.testing = (_userData.total.testing || 0) + 1;

    // 保存数据
    DataManager.saveUserData(_init.currentUser, _userData);
    console.log('[checkPracticeAnswer] 练习错误，更新测试数量');

    // 检查错误状态，禁用"学会了"按钮
    if (typeof window.checkErrorWordStatus === 'function') {
      window.checkErrorWordStatus();
    }
  }

  // 延迟进入下一步
  setTimeout(function () {
    nextStep();
  }, 1000);
}

// 添加字母到拼写输入框
function addLetter(letter) {
  var inputBoxes = document.querySelectorAll('.spell-input-box');
  for (var i = 0; i < inputBoxes.length; i++) {
    if (!inputBoxes[i].textContent) {
      inputBoxes[i].textContent = letter;
      break;
    }
  }
}

// 从拼写输入框移除字母
function removeLetter(index) {
  var inputBoxes = document.querySelectorAll('.spell-input-box');
  if (inputBoxes[index]) {
    inputBoxes[index].textContent = '';
  }
}

// 检查拼写
function checkSpelling() {
  var inputBoxes = document.querySelectorAll('.spell-input-box');
  var userInput = '';
  inputBoxes.forEach(function (box) {
    userInput += box.textContent;
  });
  var currentWord = _init.isErrorBookMode ? _init.errorWords[_init.currentWordIndex] : _init.words[_init.currentWordIndex];
  var resultElement = document.getElementById('spellResult');
  if (userInput === currentWord.word) {
    resultElement.textContent = '正确！';
    resultElement.classList.add('correct');
    resultElement.classList.remove('incorrect');
    AudioManager.playSuccessSound();
  } else {
    resultElement.textContent = '错误，请重试！';
    resultElement.classList.add('incorrect');
    resultElement.classList.remove('correct');
    AudioManager.playErrorSound();
    // 添加到错词本
    DataManager.addErrorWord(_init.currentUser, currentWord);

    // 检查错误状态，禁用"学会了"按钮
    if (typeof window.checkErrorWordStatus === 'function') {
      window.checkErrorWordStatus();
    }
  }
}

// 检查书写
function checkWriting() {
  var input = document.getElementById('writeInput');
  var resultElement = document.getElementById('writeResult');
  var currentWord = _init.isErrorBookMode ? _init.errorWords[_init.currentWordIndex] : _init.words[_init.currentWordIndex];
  if (input.value.trim() === currentWord.word) {
    resultElement.textContent = '正确！';
    resultElement.classList.add('correct');
    resultElement.classList.remove('incorrect');
    AudioManager.playSuccessSound();
  } else {
    resultElement.textContent = '错误，请重试！';
    resultElement.classList.add('incorrect');
    resultElement.classList.remove('correct');
    AudioManager.playErrorSound();
    // 添加到错词本
    DataManager.addErrorWord(_init.currentUser, currentWord);

    // 检查错误状态，禁用"学会了"按钮
    if (typeof window.checkErrorWordStatus === 'function') {
      window.checkErrorWordStatus();
    }
  }
}

// 清除书写输入
function clearWriteInput() {
  var input = document.getElementById('writeInput');
  if (input) {
    input.value = '';
  }
  var resultElement = document.getElementById('writeResult');
  if (resultElement) {
    resultElement.textContent = '';
    resultElement.classList.remove('correct', 'incorrect');
  }
}

// 打开单词学习页面
function openWordLinkPage(index) {
  console.log('打开单词学习页面，索引:', index);
  (0, _init.setCurrentWordIndex)(index);
  (0, _init.setCurrentStep)('learn');
  window.location.href = "word-link.html?index=".concat(index);
}

// 打开错词学习页面
function openErrorWordLinkPage(index) {
  console.log('打开错词学习页面，索引:', index);
  (0, _init.setCurrentWordIndex)(index);
  (0, _init.setCurrentStep)('learn');
  window.location.href = "word-link.html?index=".concat(index, "&errorBook=true");
}

// 更新统计显示
function updateStatsDisplay() {
  // 实现统计显示更新逻辑
  console.log('更新统计显示');
}

// 生成错词链条
function generateErrorWordChain() {
  var chainContainer = document.getElementById('wordChain');
  if (!chainContainer) return;
  chainContainer.innerHTML = '';
  _init.errorWords.forEach(function (word, index) {
    var wordElement = document.createElement('div');
    wordElement.className = 'chain-word-item';
    var wordText = document.createElement('div');
    wordText.className = 'chain-word';
    wordText.id = "chain-word-".concat(index);
    if (index === _init.currentWordIndex) {
      wordText.classList.add('current');
    } else if (index < _init.currentWordIndex) {
      wordText.classList.add('completed');
    } else {
      wordText.classList.add('pending');
    }

    // 在拼和写步骤中遮挡当前学习的单词
    if ((_init.currentStep === 'spell' || _init.currentStep === 'write') && index === _init.currentWordIndex) {
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
    var currentElement = document.getElementById("chain-word-".concat(_init.currentWordIndex));
    if (currentElement) {
      currentElement.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      });
    }
  }, 100);
}

// 更新错词学习内容
function updateErrorWordLearningContent() {
  var currentWord = _init.errorWords[_init.currentWordIndex];
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
    for (var _i5 = letters.length - 1; _i5 > 0; _i5--) {
      var j = Math.floor(Math.random() * (_i5 + 1));
      var _ref4 = [letters[j], letters[_i5]];
      letters[_i5] = _ref4[0];
      letters[j] = _ref4[1];
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

// 更新错词导航按钮
function updateErrorWordNavigationButtons() {
  var prevBtn = document.getElementById('prevWordBtn');
  var nextBtn = document.getElementById('nextWordBtn');
  if (prevBtn) {
    prevBtn.disabled = _init.currentWordIndex === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = _init.currentWordIndex === _init.errorWords.length - 1;
  }
}

// 渲染错词列表
function renderErrorWordList() {
  var listContainer = document.getElementById('errorWordList');
  if (!listContainer) return;
  var errorWords = DataManager.getErrorWords(_init.currentUser);

  // 更新错词本标题，显示数量
  var errorBookTitle = document.querySelector('#errorBookPage .list-title');
  if (errorBookTitle) {
    errorBookTitle.textContent = "\u9519\u8BCD\u672C (".concat(errorWords.length, ")");
  }
  if (errorWords.length === 0) {
    listContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">错词本为空</div>';
    return;
  }
  listContainer.innerHTML = errorWords.map(function (word, index) {
    return "\n        <div class=\"word-item\" data-index=\"".concat(index, "\" onclick=\"openErrorWordLinkPage(").concat(index, ")\"><div class=\"word-info\">\n                <div class=\"word-text ").concat(_init.errorBookMaskMode === 'word' ? 'masked' : '', "\" ").concat(_init.errorBookMaskMode === 'word' ? 'onclick="this.classList.remove(\'masked\'); event.stopPropagation();"' : '', ">").concat(word.word, "</div>\n                <div class=\"word-phonetic\">").concat(word.phonetic || '', "</div>\n            </div>\n            <div class=\"word-meaning ").concat(_init.errorBookMaskMode === 'meaning' ? 'masked' : '', "\" ").concat(_init.errorBookMaskMode === 'meaning' ? 'onclick="this.classList.remove(\'masked\'); event.stopPropagation();"' : '', ">").concat(word.meaning, "</div>\n            <div class=\"word-actions\">\n                <button class=\"action-btn\" onclick=\"AudioManager.playWordAudio('").concat(word.word, "', false); event.stopPropagation();\">\uD83D\uDD0A</button>\n            </div>\n        </div>\n        ");
  }).join('');
}

// 开始错词学习
function startErrorWordLearning() {
  (0, _init.setErrorWords)(DataManager.getErrorWords(_init.currentUser));
  if (_init.errorWords.length === 0) {
    alert('错词本为空');
    return;
  }
  (0, _init.setCurrentWordIndex)(0);
  (0, _init.setCurrentStep)('learn');
  openErrorWordLinkPage(0);
}

// 更新统计页面显示
function updateStatsPage() {
  // 更新日期
  var statsDateElement = document.getElementById('statsDate');
  if (statsDateElement) {
    var today = new Date().toISOString().split('T')[0];
    statsDateElement.textContent = today;
  }

  // 获取用户数据
  var userData = DataManager.getUserData(_init.currentUser);

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

// 获取音标颜色
function getPhoneticColor(char, index, word) {
  // 元音字母
  var vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

  // 检查是否是元音
  if (vowels.includes(char)) {
    return 'r'; // 元音用红色
  } else {
    return 'b'; // 辅音用蓝色
  }
}

// 全局变量
var currentDate = new Date();
var checkinData = {};

// 打卡记录页面初始化
function initCheckinHistoryPage() {
  console.log('[打卡记录页面初始化] 开始');
  // 加载用户数据
  loadUserData();
  // 渲染日历
  renderCalendar();
  console.log('[打卡记录页面初始化] 结束');
}

// 加载用户数据
function loadUserData() {
  // 使用全局currentUser变量
  console.log('加载用户数据，当前用户:', _init.currentUser);
  checkinData = DataManager.getUserData(_init.currentUser);
  console.log('获取到的用户数据:', checkinData);
  console.log('打卡历史:', checkinData.checkinHistory);
  updateStats();
}

// 渲染日历
function renderCalendar() {
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();

  // 更新月份显示
  var currentMonthElement = document.getElementById('currentMonth');
  if (currentMonthElement) {
    currentMonthElement.textContent = "".concat(year, "\u5E74").concat(month + 1, "\u6708");
  }

  // 获取当月第一天
  var firstDay = new Date(year, month, 1);
  // 获取当月最后一天
  var lastDay = new Date(year, month + 1, 0);
  // 获取当月第一天是星期几
  var firstDayOfWeek = firstDay.getDay();
  // 获取当月的天数
  var daysInMonth = lastDay.getDate();

  // 计算需要显示的天数（包括上个月和下个月的部分天数）
  var startDate = new Date(year, month, 1 - firstDayOfWeek);
  var endDate = new Date(year, month, daysInMonth + (6 - lastDay.getDay()));

  // 清空日历
  var calendarBody = document.getElementById('calendarBody');
  if (calendarBody) {
    calendarBody.innerHTML = '';

    // 生成日历格子
    var tempDate = new Date(startDate);
    console.log('开始渲染日历，当前月份:', month + 1);
    console.log('打卡历史数据:', checkinData.checkinHistory);
    var _loop3 = function _loop3() {
      var dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';

      // 检查是否是当月的日期
      if (tempDate.getMonth() !== month) {
        dayElement.classList.add('other-month');
      } else {
        // 检查是否打卡
        var dateString = formatDate(tempDate);
        console.log('检查日期:', dateString);
        var checkinHistory = checkinData.checkinHistory || [];
        console.log('检查时的打卡历史长度:', checkinHistory.length);
        var checkinItem = checkinHistory.find(function (item) {
          return (typeof item === 'string' ? item : item.date) === dateString;
        });
        console.log('找到的打卡项:', checkinItem);
        if (checkinItem) {
          dayElement.classList.add('checked-in');
          // 显示积分
          var pointsElement = document.createElement('div');
          pointsElement.className = 'points';
          pointsElement.textContent = "+".concat(typeof checkinItem === 'string' ? 5 : checkinItem.points);
          dayElement.appendChild(pointsElement);
        } else {
          dayElement.classList.add('not-checked-in');
        }
      }

      // 添加日期
      var dayNumber = document.createElement('div');
      dayNumber.textContent = tempDate.getDate();
      dayElement.appendChild(dayNumber);
      calendarBody.appendChild(dayElement);

      // 移动到下一天
      tempDate.setDate(tempDate.getDate() + 1);
    };
    while (tempDate <= endDate) {
      _loop3();
    }
    console.log('日历渲染完成');
  }
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date) {
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');
  return "".concat(year, "-").concat(month, "-").concat(day);
}

// 切换月份
function changeMonth(direction) {
  currentDate.setMonth(currentDate.getMonth() + direction);
  renderCalendar();
}

// 更新统计信息
function updateStats() {
  var totalCheckins = DataManager.getTotalCheckins(_init.currentUser);
  var consecutiveDays = DataManager.getConsecutiveDays(_init.currentUser);

  // 计算本月打卡次数和积分
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var checkinHistory = checkinData.checkinHistory || [];
  var monthlyCheckins = 0;
  var monthlyPoints = 0;
  checkinHistory.forEach(function (item) {
    var date = typeof item === 'string' ? item : item.date;
    var dateParts = date.split('-');
    if (parseInt(dateParts[0]) === year && parseInt(dateParts[1]) === month + 1) {
      monthlyCheckins++;
      monthlyPoints += typeof item === 'string' ? 5 : item.points;
    }
  });
  var totalCheckinsElement = document.getElementById('totalCheckins');
  if (totalCheckinsElement) {
    totalCheckinsElement.textContent = totalCheckins;
  }
  var consecutiveDaysElement = document.getElementById('consecutiveDays');
  if (consecutiveDaysElement) {
    consecutiveDaysElement.textContent = consecutiveDays;
  }
  var monthlyCheckinsElement = document.getElementById('monthlyCheckins');
  if (monthlyCheckinsElement) {
    monthlyCheckinsElement.textContent = monthlyCheckins;
  }
  var monthlyPointsElement = document.getElementById('monthlyPoints');
  if (monthlyPointsElement) {
    monthlyPointsElement.textContent = monthlyPoints;
  }
}

// 积分收支记录页面初始化
function initPointsHistoryPage() {
  console.log('[积分收支记录页面初始化] 开始');
  // 加载积分汇总数据
  loadPointsSummary();
  // 加载积分记录
  loadPointsHistory();
  console.log('[积分收支记录页面初始化] 结束');
}

// 加载积分汇总数据
function loadPointsSummary() {
  var summary = DataManager.getPointsSummary(_init.currentUser);
  console.log('积分汇总数据:', summary);
  var totalIncomeElement = document.getElementById('totalIncome');
  if (totalIncomeElement) {
    totalIncomeElement.textContent = summary.totalIncome;
  }
  var totalExpenseElement = document.getElementById('totalExpense');
  if (totalExpenseElement) {
    totalExpenseElement.textContent = summary.totalExpense;
  }
  var currentBalanceElement = document.getElementById('currentBalance');
  if (currentBalanceElement) {
    currentBalanceElement.textContent = summary.balance;
  }
}

// 加载积分记录
function loadPointsHistory() {
  var pointsHistory = DataManager.getPointsHistory(_init.currentUser);
  console.log('积分记录数据:', pointsHistory);
  var pointsListElement = document.getElementById('pointsList');
  if (pointsListElement) {
    if (pointsHistory.length === 0) {
      pointsListElement.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">暂无积分记录</div>';
      return;
    }

    // 按日期降序排序
    pointsHistory.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    // 按日期分组
    var groupedByDate = {};
    pointsHistory.forEach(function (record) {
      if (!groupedByDate[record.date]) {
        groupedByDate[record.date] = [];
      }
      groupedByDate[record.date].push(record);
    });

    // 生成HTML
    var html = '';
    Object.keys(groupedByDate).forEach(function (date) {
      var records = groupedByDate[date];
      // 计算当天的总积分
      var dayTotal = 0;
      records.forEach(function (record) {
        if (record.type === 'income') {
          dayTotal += record.amount;
        } else {
          dayTotal -= record.amount;
        }
      });

      // 生成日期组
      html += "\n                <div class=\"points-date-group\">\n                    <div class=\"date-header\" onclick=\"toggleDateGroup('".concat(date, "')\">\n                        <div class=\"date-info\">\n                            <div class=\"date-text\">").concat(date, "</div>\n                            <div class=\"date-total\">").concat(dayTotal >= 0 ? '+' : '').concat(dayTotal, "</div>\n                        </div>\n                        <div class=\"date-toggle\">\u25BC</div>\n                    </div>\n                    <div class=\"date-records\" id=\"dateGroup_").concat(date, "\" style=\"display: none;\">\n                        ").concat(records.map(function (record) {
        var amountClass = record.type === 'income' ? 'income' : 'expense';
        var amountSign = record.type === 'income' ? '+' : '-';
        return "\n                                <div class=\"points-item\">\n                                    <div class=\"points-description\">".concat(record.description, "</div>\n                                    <div class=\"points-amount ").concat(amountClass, "\">").concat(amountSign).concat(record.amount, "</div>\n                                </div>\n                            ");
      }).join(''), "\n                    </div>\n                </div>\n            ");
    });
    pointsListElement.innerHTML = html;
  }
}

// 切换日期组的展开/折叠状态
function toggleDateGroup(date) {
  var dateGroup = document.getElementById("dateGroup_".concat(date));
  var toggleIcon = document.querySelector("[onclick=\"toggleDateGroup('".concat(date, "')\"] .date-toggle"));
  if (dateGroup) {
    if (dateGroup.style.display === 'none') {
      dateGroup.style.display = 'block';
      if (toggleIcon) {
        toggleIcon.textContent = '▲';
      }
    } else {
      dateGroup.style.display = 'none';
      if (toggleIcon) {
        toggleIcon.textContent = '▼';
      }
    }
  }
}

// 暴露函数到全局作用域
window.toggleDateGroup = toggleDateGroup;