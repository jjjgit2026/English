"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backToErrorBook = backToErrorBook;
exports.endGame = endGame;
exports.generateGameContent = generateGameContent;
exports.initGame = initGame;
exports.loadNextGameGroup = loadNextGameGroup;
exports.restartGame = restartGame;
exports.selectGameItem = selectGameItem;
exports.switchGameMode = switchGameMode;
exports.updateGameTimer = updateGameTimer;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.pad-start.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _init = require("./init.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } // 游戏模块
// 假设DataManager和AudioManager是全局变量
// 如果它们不是全局变量，需要从相应的模块导入
// import DataManager from '../dataManager.js';
// import AudioManager from '../audioManager.js';

// 消消乐相关功能
var gameWords = [];
var allErrorWords = [];
var currentGroupIndex = 0;
var selectedWord = null;
var selectedMeaning = null;
var gameCorrectCount = 0; // 当前分组的正确数量
var totalCorrectCount = 0; // 全局的正确数量
var gameStartTime = 0;
var gameTimerInterval = null;
var currentGameMode = 'english'; // 默认模式：english（英文选义），audio（听音选义）

// 初始化游戏
function initGame() {
  // 获取所有单词（假设words是全局变量）
  var allWords = window.words || [];

  // 生成复习计划
  allErrorWords = DataManager.generateDailyReviewPlan(_init.currentUser, allWords);
  currentGroupIndex = 0;
  selectedWord = null;
  selectedMeaning = null;
  totalCorrectCount = 0;

  // 设置总数为所有复习单词的数量
  document.getElementById('gameTotalCount').textContent = allErrorWords.length;

  // 加载第一组单词
  loadNextGameGroup();

  // 开始计时
  gameStartTime = Date.now();
  if (gameTimerInterval) {
    clearInterval(gameTimerInterval);
  }
  gameTimerInterval = setInterval(updateGameTimer, 1000);
}

// 加载下一组单词
function loadNextGameGroup() {
  // 计算当前组的起始和结束索引
  var startIndex = currentGroupIndex * 5;
  var endIndex = startIndex + 5;

  // 获取当前组的单词
  gameWords = allErrorWords.slice(startIndex, endIndex);

  // 打乱顺序
  gameWords = gameWords.sort(function () {
    return 0.5 - Math.random();
  });
  gameCorrectCount = 0;
  selectedWord = null;
  selectedMeaning = null;

  // 重置游戏界面
  document.getElementById('gameCorrectCount').textContent = totalCorrectCount;
  document.getElementById('gameProgressFill').style.width = totalCorrectCount / allErrorWords.length * 100 + '%';

  // 生成游戏内容
  generateGameContent();
}

// 生成游戏内容
function generateGameContent() {
  var wordColumn = document.getElementById('wordColumn');
  var meaningColumn = document.getElementById('meaningColumn');
  wordColumn.innerHTML = '';
  meaningColumn.innerHTML = '';

  // 打乱单词顺序
  var shuffledWords = _toConsumableArray(gameWords).sort(function () {
    return 0.5 - Math.random();
  });
  var shuffledMeanings = _toConsumableArray(gameWords).sort(function () {
    return 0.5 - Math.random();
  });
  shuffledWords.forEach(function (word, index) {
    var wordItem = document.createElement('div');
    wordItem.className = 'game-item';
    if (currentGameMode === 'english') {
      // 英文选义模式：显示单词
      wordItem.textContent = word.word;
    } else {
      // 听音选义模式：显示发音按钮
      wordItem.innerHTML = '<span class="audio-icon">🔊</span>';
      // 添加点击发音功能
      wordItem.onclick = function (e) {
        // 防止触发选择事件
        e.stopPropagation();
        // 播放单词发音
        if (typeof AudioManager !== 'undefined') {
          AudioManager.playWordAudio(word.word);
        }
      };
    }
    wordItem.dataset.word = word.word;
    wordItem.onclick = function (e) {
      if (currentGameMode === 'audio') {
        // 听音选义模式：先播放发音，然后选择单词
        if (typeof AudioManager !== 'undefined') {
          AudioManager.playWordAudio(word.word);
        }
        selectGameItem('word', wordItem, word.word);
      } else {
        // 英文选义模式：选择单词
        selectGameItem('word', wordItem, word.word);
      }
    };
    wordColumn.appendChild(wordItem);
  });
  shuffledMeanings.forEach(function (word, index) {
    var meaningItem = document.createElement('div');
    meaningItem.className = 'game-item';
    meaningItem.textContent = word.meaning;
    meaningItem.dataset.meaning = word.meaning;
    meaningItem.dataset.word = word.word;
    meaningItem.onclick = function () {
      return selectGameItem('meaning', meaningItem, word.word);
    };
    meaningColumn.appendChild(meaningItem);
  });
}

// 选择游戏项目
function selectGameItem(type, element, word) {
  if (type === 'word') {
    // 取消之前的选择
    document.querySelectorAll('#wordColumn .game-item').forEach(function (item) {
      item.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedWord = word;
  } else {
    document.querySelectorAll('#meaningColumn .game-item').forEach(function (item) {
      item.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedMeaning = word;
  }

  // 检查匹配
  if (selectedWord && selectedMeaning) {
    if (selectedWord === selectedMeaning) {
      // 匹配成功
      gameCorrectCount++;
      totalCorrectCount++;
      document.getElementById('gameCorrectCount').textContent = totalCorrectCount;

      // 更新进度条
      var progress = totalCorrectCount / allErrorWords.length * 100;
      document.getElementById('gameProgressFill').style.width = progress + '%';

      // 标记正确
      document.querySelectorAll("#wordColumn .game-item[data-word=\"".concat(selectedWord, "\"]")).forEach(function (item) {
        item.classList.add('correct');
        item.classList.remove('selected');
      });
      document.querySelectorAll("#meaningColumn .game-item[data-word=\"".concat(selectedMeaning, "\"]")).forEach(function (item) {
        item.classList.add('correct');
        item.classList.remove('selected');
      });

      // 播放成功音效
      AudioManager.playSuccessSound();

      // 更新复习任务进度
      DataManager.updateTaskProgress(_init.currentUser, 'review');

      // 查找单词的释义
      var wordMeaning = '';
      var wordObj = gameWords.find(function (w) {
        return w.word === selectedWord || w === selectedWord;
      });
      if (wordObj && wordObj.meaning) {
        wordMeaning = wordObj.meaning;
      }

      // 保存单词学习记录
      DataManager.saveWordLearningRecord(_init.currentUser, selectedWord, wordMeaning);

      // 检查是否完成当前组
      if (gameCorrectCount === gameWords.length) {
        // 延迟加载下一组
        setTimeout(function () {
          currentGroupIndex++;
          if (currentGroupIndex * 5 < allErrorWords.length) {
            loadNextGameGroup();
          } else {
            // 游戏结束
            endGame();
          }
        }, 1000);
      }

      // 重置选择
      selectedWord = null;
      selectedMeaning = null;
    } else {
      // 匹配失败
      AudioManager.playErrorSound();
      // 重置选择
      selectedWord = null;
      selectedMeaning = null;
      document.querySelectorAll('.game-item').forEach(function (item) {
        item.classList.remove('selected');
      });
    }
  }
}

// 更新游戏计时器
function updateGameTimer() {
  var elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
  var minutes = Math.floor(elapsedTime / 60);
  var seconds = elapsedTime % 60;
  document.getElementById('gameTimer').textContent = "".concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
}

// 结束游戏
function endGame() {
  // 停止计时器
  if (gameTimerInterval) {
    clearInterval(gameTimerInterval);
    gameTimerInterval = null;
  }

  // 显示游戏结束界面
  var gameResult = document.getElementById('gameResult');
  var gameTime = document.getElementById('gameTime');
  var gameScore = document.getElementById('gameScore');
  var elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
  var minutes = Math.floor(elapsedTime / 60);
  var seconds = elapsedTime % 60;
  gameTime.textContent = "".concat(minutes, "\u5206").concat(seconds, "\u79D2");
  var score = totalCorrectCount * 100;
  gameScore.textContent = score;

  // 游戏结束，给用户奖励1积分
  if (typeof DataManager !== 'undefined') {
    DataManager.addPoints(_init.currentUser, 1, '玩消消乐游戏');
  }
  gameResult.classList.remove('hidden');
}

// 切换游戏模式
function switchGameMode(mode) {
  currentGameMode = mode;

  // 更新模式按钮状态
  document.getElementById('modeEnglish').classList.remove('active');
  document.getElementById('modeAudio').classList.remove('active');
  document.getElementById("mode".concat(mode === 'english' ? 'English' : 'Audio')).classList.add('active');

  // 重新生成游戏内容
  generateGameContent();
}

// 重新开始游戏
function restartGame() {
  // 隐藏结果界面
  document.getElementById('gameResult').classList.add('hidden');

  // 重新初始化游戏
  initGame();
}

// 返回错词本
function backToErrorBook() {
  window.location.href = 'error-book.html';
}