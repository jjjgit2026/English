"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url-search-params.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// 音频管理模块 - 浏览器版本
var AudioManager = /*#__PURE__*/function () {
  function AudioManager() {
    _classCallCheck(this, AudioManager);
  }
  return _createClass(AudioManager, null, [{
    key: "playWordAudio",
    value: function () {
      var _playWordAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(word) {
        var markAsLearned,
          audioUrl,
          success,
          _success,
          _success2,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              markAsLearned = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
              console.log('[播放音频] playWordAudio 被调用，word:', word, 'markAsLearned:', markAsLearned);

              // 检查缓存
              if (!this.audioCache.has(word)) {
                _context.n = 2;
                break;
              }
              audioUrl = this.audioCache.get(word);
              _context.n = 1;
              return this.playAudioFromUrl(audioUrl);
            case 1:
              success = _context.v;
              if (success && markAsLearned) {
                this.markWordAsLearned(word);
              }
              return _context.a(2, success);
            case 2:
              if (!(window.speechSynthesis && this.ttsStatus.native)) {
                _context.n = 5;
                break;
              }
              _context.n = 3;
              return this.playWordAudioNative(word, markAsLearned);
            case 3:
              _success = _context.v;
              if (!_success) {
                _context.n = 4;
                break;
              }
              return _context.a(2, true);
            case 4:
              this.ttsStatus.native = false;
              console.warn('[播放音频] 浏览器内置 TTS 失败，切换到备用方案');
            case 5:
              if (!this.ttsStatus.baidu) {
                _context.n = 8;
                break;
              }
              _context.n = 6;
              return this.playWordAudioBaidu(word, markAsLearned);
            case 6:
              _success2 = _context.v;
              if (!_success2) {
                _context.n = 7;
                break;
              }
              return _context.a(2, true);
            case 7:
              this.ttsStatus.baidu = false;
              console.warn('[播放音频] 百度 TTS 失败，所有方案都已尝试');
            case 8:
              // 所有方案都失败
              console.error('所有 TTS 方案都失败');
              return _context.a(2, false);
          }
        }, _callee, this);
      }));
      function playWordAudio(_x) {
        return _playWordAudio.apply(this, arguments);
      }
      return playWordAudio;
    }()
  }, {
    key: "playAudioFromUrl",
    value: function playAudioFromUrl(audioUrl) {
      return new Promise(function (resolve) {
        var audio = new Audio(audioUrl);
        audio.onended = function () {
          resolve(true);
        };
        audio.onerror = function () {
          console.error('播放缓存音频失败');
          resolve(false);
        };
        audio.play().catch(function (error) {
          console.error('播放缓存音频失败:', error);
          resolve(false);
        });
      });
    }
  }, {
    key: "markWordAsLearned",
    value: function markWordAsLearned(word) {
      try {
        // 简化版本，不依赖 DataManager
        console.log('标记单词为已学:', word);
      } catch (e) {
        console.error('[播放音频] 标记已学失败:', e);
      }
    }
  }, {
    key: "playWordAudioNative",
    value: function playWordAudioNative(word) {
      var _this = this;
      var markAsLearned = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return new Promise(function (resolve) {
        // 检查可用的语音
        var voices = window.speechSynthesis.getVoices();
        console.log('[播放音频] 可用的语音数量:', voices.length);
        if (voices.length === 0) {
          console.warn('[播放音频] 警告：没有可用的语音，可能需要等待语音加载');
          // 尝试等待语音加载
          window.speechSynthesis.onvoiceschanged = function () {
            console.log('[播放音频] 语音已加载，重新尝试播放');
            _this.playWordAudio(word, markAsLearned);
          };
          // 显示用户提示
          alert('正在加载语音，请稍后再试');
          resolve(false);
          return;
        }

        // 优先选择高质量的英语语音
        var preferredVoices = [voices.find(function (v) {
          return v.name.includes('Google') && v.lang.includes('en-US');
        }), voices.find(function (v) {
          return v.name.includes('Microsoft') && v.lang.includes('en-US');
        }), voices.find(function (v) {
          return v.name.includes('Amazon') && v.lang.includes('en-US');
        }), voices.find(function (v) {
          return v.lang.includes('en-US');
        }), voices.find(function (v) {
          return v.lang.includes('en');
        })].filter(Boolean);

        // 使用找到的第一个高质量语音
        var selectedVoice = preferredVoices[0] || voices[0];
        console.log('[播放音频] 使用语音:', selectedVoice.name);
        var utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.voice = selectedVoice;

        // 调整语速和音调参数
        utterance.rate = 0.4; // 语速（0.1-10，默认1）
        utterance.pitch = 1.1; // 音调（0-2，默认1）
        utterance.volume = 1.0; // 音量（0-1，默认1）

        console.log('[播放音频] 语音参数 - 语速:', utterance.rate, '音调:', utterance.pitch, '音量:', utterance.volume);

        // 监听播放事件
        utterance.onstart = function () {
          console.log('[播放音频] 开始播放');
        };
        utterance.onend = function () {
          console.log('[播放音频] 播放结束');
          if (markAsLearned) {
            _this.markWordAsLearned(word);
          }
          resolve(true);
        };
        utterance.onerror = function (event) {
          console.error('[播放音频] 播放错误:', event.error);
          resolve(false);
        };

        // 开始高亮动画（延迟1秒以与发音同步）
        var currentTime = 1000; // 1秒延迟
        var letters = document.querySelectorAll('.letter');
        letters.forEach(function (letter, index) {
          setTimeout(function () {
            letter.classList.add('highlight');
            setTimeout(function () {
              letter.classList.remove('highlight');
            }, 200);
          }, currentTime);
          currentTime += 200;
        });
        try {
          // 确保语音合成未被暂停
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.speak(utterance);
          console.log('[播放音频] 已调用 speechSynthesis.speak');
        } catch (e) {
          console.error('[播放音频] 调用 speak 失败:', e);
          resolve(false);
        }
      });
    }

    // 百度云语音合成服务
  }, {
    key: "playWordAudioBaidu",
    value: function () {
      var _playWordAudioBaidu = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(word) {
        var markAsLearned,
          currentTime,
          letters,
          success,
          _args2 = arguments,
          _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              markAsLearned = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
              console.log('[播放音频] 使用百度云语音合成API，word:', word);
              _context2.p = 1;
              // 开始高亮动画
              currentTime = 500; // 0.5秒延迟
              letters = document.querySelectorAll('.letter');
              letters.forEach(function (letter, index) {
                setTimeout(function () {
                  letter.classList.add('highlight');
                  setTimeout(function () {
                    letter.classList.remove('highlight');
                  }, 200);
                }, currentTime);
                currentTime += 200;
              });

              // 播放语音
              _context2.n = 2;
              return this.BaiduTTS.play(word);
            case 2:
              success = _context2.v;
              // 播放结束后标记为已学
              if (success && markAsLearned) {
                this.markWordAsLearned(word);
              }
              return _context2.a(2, success);
            case 3:
              _context2.p = 3;
              _t = _context2.v;
              console.error('[播放音频] 百度云API调用失败:', _t);
              return _context2.a(2, false);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function playWordAudioBaidu(_x2) {
        return _playWordAudioBaidu.apply(this, arguments);
      }
      return playWordAudioBaidu;
    }()
  }, {
    key: "playWordAudioTwice",
    value: function playWordAudioTwice(word) {
      var _this2 = this;
      this.playWordAudio(word);
      setTimeout(function () {
        _this2.playWordAudio(word);
      }, 1500);
    }
  }, {
    key: "playCurrentWordAudio",
    value: function () {
      var _playCurrentWordAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var currentWordIndex, words, errorWords, isErrorBookMode, currentWord;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              currentWordIndex = window.currentWordIndex;
              words = window.words;
              errorWords = window.errorWords;
              isErrorBookMode = window.isErrorBookMode;
              currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
              if (!currentWord) {
                _context3.n = 1;
                break;
              }
              _context3.n = 1;
              return this.playWordAudio(currentWord.word);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function playCurrentWordAudio() {
        return _playCurrentWordAudio.apply(this, arguments);
      }
      return playCurrentWordAudio;
    }()
  }, {
    key: "playPhoneticAudio",
    value: function () {
      var _playPhoneticAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var currentWordIndex, words, errorWords, isErrorBookMode, currentWord;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              currentWordIndex = window.currentWordIndex;
              words = window.words;
              errorWords = window.errorWords;
              isErrorBookMode = window.isErrorBookMode;
              currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
              if (!currentWord) {
                _context4.n = 1;
                break;
              }
              _context4.n = 1;
              return this.playWordAudio(currentWord.word);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function playPhoneticAudio() {
        return _playPhoneticAudio.apply(this, arguments);
      }
      return playPhoneticAudio;
    }()
  }, {
    key: "playExampleAudio",
    value: function () {
      var _playExampleAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var currentWordIndex, words, errorWords, isErrorBookMode, currentWord;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              currentWordIndex = window.currentWordIndex;
              words = window.words;
              errorWords = window.errorWords;
              isErrorBookMode = window.isErrorBookMode;
              currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
              if (!(currentWord && currentWord.example)) {
                _context5.n = 1;
                break;
              }
              _context5.n = 1;
              return this.playWordAudio(currentWord.example);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function playExampleAudio() {
        return _playExampleAudio.apply(this, arguments);
      }
      return playExampleAudio;
    }()
  }, {
    key: "playSuccessSound",
    value: function playSuccessSound() {
      try {
        var audio = new Audio('../../assets/audio/答题正确音效.MP3');
        audio.play().catch(function (e) {
          console.error('播放成功音效失败:', e);
        });
      } catch (e) {
        console.error('播放成功音效失败:', e);
      }
    }
  }, {
    key: "playErrorSound",
    value: function playErrorSound() {
      try {
        var audio = new Audio('../../assets/audio/答题错误音效.MP3');
        audio.play().catch(function (e) {
          console.error('播放错误音效失败:', e);
        });
      } catch (e) {
        console.error('播放错误音效失败:', e);
      }
    }
  }]);
}(); // 将 AudioManager 暴露到全局作用域
_defineProperty(AudioManager, "audioCache", new Map());
_defineProperty(AudioManager, "ttsStatus", {
  native: true,
  baidu: true
});
_defineProperty(AudioManager, "BaiduTTS", {
  // 从本地存储获取token，或使用默认值
  get token() {
    var savedToken = localStorage.getItem('baiduTtsToken');
    var tokenExpiry = localStorage.getItem('baiduTtsTokenExpiry');

    // 检查token是否存在且未过期
    if (savedToken && tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
      return savedToken;
    }

    // 使用默认token（有效期30天）
    return '24.118c409ca7ab182ec6332e2421153d91.2592000.1775397635.282335-122258848';
  },
  // 设置新token
  setToken(token) {
    var expiryDays = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    localStorage.setItem('baiduTtsToken', token);
    localStorage.setItem('baiduTtsTokenExpiry', (Date.now() + expiryDays * 24 * 60 * 60 * 1000).toString());
  },
  // 合成语音
  synthesize(text) {
    var _this3 = this;
    return new Promise(function (resolve, reject) {
      try {
        var url = 'https://tsn.baidu.com/text2audio';

        // 根据文本类型调整参数
        var spd = 2; // 默认语速
        var pit = 5; // 默认音调
        var vol = 5; // 默认音量
        var per = 1; // 默认发音人

        // 根据文本长度调整语速
        if (text.length > 50) {
          spd = 4; // 长文本适当加快语速
        } else if (text.length < 5) {
          spd = 2; // 短文本适当放慢语速
        }

        // 对于句子，使用不同的发音人
        if (text.includes(' ') && text.length > 10) {
          per = 1; // 使用女声发音人
        }
        var params = new URLSearchParams({
          tex: encodeURIComponent(text),
          lan: 'en',
          tok: _this3.token,
          ctp: 1,
          cuid: 'web前端应用',
          spd: spd,
          pit: pit,
          vol: vol,
          per: per
        });
        console.log('[百度TTS] 参数 - 语速:', spd, '音调:', pit, '音量:', vol, '发音人:', per);

        // 直接创建Audio对象，避免CORS问题
        var audioUrl = "".concat(url, "?").concat(params.toString());
        var audio = new Audio(audioUrl);

        // 预加载音频
        audio.preload = 'auto';
        audio.oncanplaythrough = function () {
          resolve(audioUrl);
        };
        audio.onerror = function () {
          reject(new Error('音频加载失败'));
        };

        // 开始加载
        audio.load();
      } catch (error) {
        reject(error);
      }
    });
  },
  // 播放语音
  play(text) {
    var _this4 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var audioUrl, audio, _t2;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            _context6.p = 0;
            _context6.n = 1;
            return _this4.synthesize(text);
          case 1:
            audioUrl = _context6.v;
            audio = new Audio(audioUrl); // 播放音频
            return _context6.a(2, new Promise(function (resolve) {
              audio.onended = function () {
                resolve(true);
              };
              audio.onerror = function () {
                console.error('播放失败: 音频播放错误');
                resolve(false);
              };
              audio.play().catch(function (error) {
                console.error('播放失败:', error);
                resolve(false);
              });
            }));
          case 2:
            _context6.p = 2;
            _t2 = _context6.v;
            console.error('播放失败:', _t2);
            return _context6.a(2, false);
        }
      }, _callee6, null, [[0, 2]]);
    }))();
  }
});
window.AudioManager = AudioManager;