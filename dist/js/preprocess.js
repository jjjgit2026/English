"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/es.string.trim.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var fs = require('fs');
var pdf = require('pdf-parse');
function preprocessPDF() {
  return _preprocessPDF.apply(this, arguments);
}
function _preprocessPDF() {
  _preprocessPDF = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var pdfFiles, _iterator2, _step2, pdfFile, dataBuffer, data, text, words, jsonFile, jsonContent, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          // 获取所有PDF文件
          pdfFiles = fs.readdirSync('./PDF').filter(function (file) {
            return file.endsWith('.pdf');
          });
          _iterator2 = _createForOfIteratorHelper(pdfFiles);
          _context.p = 1;
          _iterator2.s();
        case 2:
          if ((_step2 = _iterator2.n()).done) {
            _context.n = 7;
            break;
          }
          pdfFile = _step2.value;
          console.log("\u5F00\u59CB\u9884\u5904\u7406".concat(pdfFile, "\u6587\u4EF6..."));
          _context.p = 3;
          // 读取PDF文件
          dataBuffer = fs.readFileSync("./PDF/".concat(pdfFile)); // 解析PDF
          _context.n = 4;
          return pdf(dataBuffer);
        case 4:
          data = _context.v;
          // 提取文本
          text = data.text; // 解析文本，提取单词数据
          words = parseWords(text); // 生成JSON文件
          jsonFile = pdfFile.replace('.pdf', '.json');
          jsonContent = JSON.stringify(words, null, 2);
          fs.writeFileSync(jsonFile, jsonContent);
          console.log("\u9884\u5904\u7406\u5B8C\u6210\uFF01\u6210\u529F\u63D0\u53D6\u4E86 ".concat(words.length, " \u4E2A\u5355\u8BCD"));
          console.log("\u751F\u6210\u7684JSON\u6587\u4EF6: ".concat(jsonFile));
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          console.error("\u9884\u5904\u7406".concat(pdfFile, "\u5931\u8D25:"), _t);
        case 6:
          _context.n = 2;
          break;
        case 7:
          _context.n = 9;
          break;
        case 8:
          _context.p = 8;
          _t2 = _context.v;
          _iterator2.e(_t2);
        case 9:
          _context.p = 9;
          _iterator2.f();
          return _context.f(9);
        case 10:
          return _context.a(2);
      }
    }, _callee, null, [[3, 5], [1, 8, 9, 10]]);
  }));
  return _preprocessPDF.apply(this, arguments);
}
function parseWords(text) {
  var words = [];

  // 按行分割文本
  var lines = text.split('\n');

  // 存储当前正在处理的单词信息
  var currentWord = null;

  // 遍历每一行
  var _iterator = _createForOfIteratorHelper(lines),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var line = _step.value;
      line = line.trim();

      // 跳过空行
      if (!line) continue;

      // 检查是否是序号行（以数字开头）
      var numberMatch = line.match(/^(\d+)(\s|$)/);
      if (numberMatch) {
        // 如果有正在处理的单词，先保存
        if (currentWord) {
          words.push(currentWord);
        }

        // 开始处理新单词
        var number = numberMatch[1];
        // 提取序号后的内容
        var remainingText = line.substring(numberMatch[0].length).trim();
        currentWord = {
          number: number,
          word: '',
          phonetic: '',
          meaning: ''
        };

        // 检查剩余内容是否是单词
        if (remainingText && !remainingText.includes('/') && !remainingText.includes('[')) {
          currentWord.word = remainingText;
        }
      } else if (currentWord) {
        // 检查是否是音标行（通常以/或[开头，以/或]结尾，不包含汉字）
        var isPhonetic = line.startsWith('/') && line.endsWith('/') || line.startsWith('[') && line.endsWith(']') || line.includes('/') && !line.match(/[\u4e00-\u9fa5]/);
        if (isPhonetic) {
          currentWord.phonetic = line;
        } else {
          // 检查是否是单词行（如果之前没有提取到单词）
          if (!currentWord.word) {
            currentWord.word = line;
          } else {
            // 否则是释义行
            if (currentWord.meaning) {
              currentWord.meaning = (currentWord.meaning + ' ' + line.replace(/□/g, '').trim()).trim();
            } else {
              currentWord.meaning = line.replace(/□/g, '').trim();
            }
          }
        }
      }
    }

    // 保存最后一个单词
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (currentWord) {
    words.push(currentWord);
  }
  return words;
}

// 运行预处理
preprocessPDF();