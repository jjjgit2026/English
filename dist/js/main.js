"use strict";

require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.string.pad-start.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var _dataManager = _interopRequireDefault(require("./dataManager.js"));
var _audioManager = _interopRequireDefault(require("./audioManager.js"));
var _init = require("./modules/init.js");
var _user = require("./modules/user.js");
var _word = require("./modules/word.js");
var _utils = require("./modules/utils.js");
var _game = require("./modules/game.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// 主应用模块 - 模块化入口

// 导入数据管理模块

// 导入音频管理模块

// 导入初始化模块

// 导入用户模块

// 导入单词模块

// 导入工具模块

// 导入游戏模块

// 全局定义withUserCheck函数，确保页面加载时立即可用
function withUserCheck(callback) {
  return function () {
    // 检查模块是否已经加载完成（通过检查是否有正式的showUserModal函数，而不是临时函数）
    if (typeof _user.showUserModal === 'function' && window.currentUser !== undefined) {
      if (window.currentUser) {
        callback();
      } else {
        alert('请先选择用户');
        (0, _user.showUserModal)();
      }
    } else {
      alert('应用正在加载0，请稍候...');
    }
  };
}

// 暴露withUserCheck函数给window对象
window.withUserCheck = withUserCheck;

// 暴露DataManager给window对象
window.DataManager = _dataManager.default;

// 暴露AudioManager给window对象
window.AudioManager = _audioManager.default;

// 全局变量暴露给window对象，确保HTML中的内联脚本可以访问
window.currentUser = _init.currentUser;
window.currentUserName = _init.currentUserName;
window.currentFile = _init.currentFile;
window.currentBookName = _init.currentBookName;
window.words = _init.words;
window.currentUnit = _init.currentUnit;
window.maskMode = _init.maskMode;
window.errorBookMaskMode = _init.errorBookMaskMode;
window.userStats = _init.userStats;
window.currentWordIndex = _init.currentWordIndex;
window.currentStep = _init.currentStep;

// 导出数据功能
window.exportData = function () {
  try {
    // 收集所有 localStorage 数据
    var data = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }

    // 创建 JSON 字符串
    var jsonStr = JSON.stringify(data, null, 2);

    // 创建 Blob 对象
    var blob = new Blob([jsonStr], {
      type: 'application/json'
    });

    // 创建下载链接
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');

    // 生成带有时分秒的文件名
    var now = new Date();
    var fileName = "vocabulary-app-data-".concat(now.getFullYear()).concat(String(now.getMonth() + 1).padStart(2, '0')).concat(String(now.getDate()).padStart(2, '0')).concat(String(now.getHours()).padStart(2, '0')).concat(String(now.getMinutes()).padStart(2, '0')).concat(String(now.getSeconds()).padStart(2, '0'), ".json");
    a.href = url;
    a.download = fileName;

    // 触发下载
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 释放 URL 对象
    URL.revokeObjectURL(url);
    alert('数据导出成功！');
  } catch (error) {
    console.error('导出数据失败:', error);
    alert('导出数据失败，请重试');
  }
};

// 导入数据功能
window.importData = function () {
  var fileInput = document.getElementById('dataFileInput');
  fileInput.click();
  fileInput.onchange = function (e) {
    var file = e.target.files[0];
    if (!file) return;

    // 检查文件类型
    if (!file.name.endsWith('.json')) {
      alert('请选择JSON格式的文件');
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var jsonStr = e.target.result;

        // 验证JSON格式
        var data;
        try {
          data = JSON.parse(jsonStr);
        } catch (parseError) {
          alert('文件格式错误：不是有效的JSON格式');
          return;
        }

        // 验证数据结构
        if (!data || typeof data !== 'object') {
          alert('文件格式错误：数据结构不正确');
          return;
        }

        // 验证是否包含必要的数据字段
        var requiredFields = ['currentUser', 'currentUserName'];
        var hasRequiredFields = requiredFields.some(function (field) {
          return data.hasOwnProperty(field);
        });
        if (!hasRequiredFields) {
          alert('文件格式错误：缺少必要的数据字段');
          return;
        }

        // 清空现有数据
        localStorage.clear();

        // 导入数据
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            localStorage.setItem(key, data[key]);
          }
        }
        alert('数据导入成功！请刷新页面以应用更改。');
      } catch (error) {
        console.error('导入数据失败:', error);
        alert('导入数据失败，请确保文件格式正确');
      }
    };
    reader.readAsText(file);
  };
};

// 绑定数据管理按钮事件
function bindDataManagementEvents() {
  var exportBtn = document.getElementById('exportDataBtn');
  var importBtn = document.getElementById('importDataBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', window.exportData);
    console.log('已绑定导出按钮事件');
  }
  if (importBtn) {
    importBtn.addEventListener('click', window.importData);
    console.log('已绑定导入按钮事件');
  }
}

// 页面加载完成后绑定事件
document.addEventListener('DOMContentLoaded', function () {
  bindDataManagementEvents();
  console.log('DOM加载完成，尝试绑定数据管理按钮事件');
});

// 当用户弹窗显示时重新绑定事件
window.showUserModal = function () {
  // 显示用户弹窗
  document.getElementById('userModal').classList.add('active');
  // 重新绑定事件，确保按钮可点击
  setTimeout(bindDataManagementEvents, 100);
  console.log('显示用户弹窗，重新绑定数据管理按钮事件');
};
window.isErrorBookMode = _init.isErrorBookMode;
window.errorWords = _init.errorWords;

// 暴露函数给window对象
window.checkUserInfo = _user.checkUserInfo;
window.loadUserBook = _user.loadUserBook;
window.saveUserBook = _user.saveUserBook;
window.loadUserStats = _user.loadUserStats;
window.updateCheckInStatus = _user.updateCheckInStatus;
window.updateDailyTaskProgress = _user.updateDailyTaskProgress;
window.updateBookDisplay = _user.updateBookDisplay;
window.showBookModal = _user.showBookModal;
window.closeBookModal = _user.closeBookModal;
window.showUserModal = _user.showUserModal;
window.closeUserModal = _user.closeUserModal;
window.updateStatsDisplay = _user.updateStatsDisplay;
window.checkIn = _user.checkIn;
window.loadPDF = _word.loadPDF;
window.renderWordList = _word.renderWordList;
window.generateWordChain = _word.generateWordChain;
window.updateLearningContent = _word.updateLearningContent;
window.updateNavigationButtons = _word.updateNavigationButtons;
window.resetLearningSteps = _word.resetLearningSteps;
window.switchStep = _word.switchStep;
window.isStepCompleted = _word.isStepCompleted;
window.nextStep = _word.nextStep;
window.goToPrevWord = _word.goToPrevWord;
window.goToNextWord = _word.goToNextWord;
window.backToWordList = _word.backToWordList;
window.generatePracticeQuestion = _word.generatePracticeQuestion;
window.checkPracticeAnswer = _word.checkPracticeAnswer;
window.addLetter = _word.addLetter;
window.removeLetter = _word.removeLetter;
window.checkSpelling = _word.checkSpelling;
window.checkWriting = _word.checkWriting;
window.clearWriteInput = _word.clearWriteInput;
window.generateErrorWordChain = _word.generateErrorWordChain;
window.updateErrorWordLearningContent = _word.updateErrorWordLearningContent;
window.updateErrorWordNavigationButtons = _word.updateErrorWordNavigationButtons;
window.renderErrorWordList = _word.renderErrorWordList;
window.startErrorWordLearning = _word.startErrorWordLearning;
window.openWordLinkPage = _word.openWordLinkPage;
window.openErrorWordLinkPage = _word.openErrorWordLinkPage;
window.updateStatsPage = _word.updateStatsPage;
window.getPhoneticColor = _word.getPhoneticColor;
window.initCheckinHistoryPage = _word.initCheckinHistoryPage;
window.changeMonth = _word.changeMonth;
window.initPointsHistoryPage = _word.initPointsHistoryPage;
window.markAsLearned = _word.markAsLearned;
window.initWordListPage = _word.initWordListPage;
window.restartGame = _game.restartGame;
window.backToErrorBook = _game.backToErrorBook;
window.initEventListeners = _utils.initEventListeners;
window.startLearning = _utils.startLearning;
window.startDetailedLearning = _utils.startDetailedLearning;
window.openArticleListPage = _utils.openArticleListPage;
window.openModelEssayListPage = _utils.openModelEssayListPage;
window.backToHome = _utils.backToHome;
window.generateUnitTabs = _utils.generateUnitTabs;
window.resetRecordingState = _utils.resetRecordingState;
window.toggleRecording = _utils.toggleRecording;
window.startRecording = _utils.startRecording;
window.analyzeRecording = _utils.analyzeRecording;
window.calculateScore = _utils.calculateScore;
window.calculateSimilarity = _utils.calculateSimilarity;
window.playbackRecording = _utils.playbackRecording;
window.openErrorBookPage = _utils.openErrorBookPage;
window.openStatsPage = _utils.openStatsPage;
window.openPetHomePage = _utils.openPetHomePage;
window.openCheckinHistoryPage = _utils.openCheckinHistoryPage;
window.openPointsHistoryPage = _utils.openPointsHistoryPage;
window.openGamePage = _utils.openGamePage;
window.initGame = _game.initGame;
window.loadNextGameGroup = _game.loadNextGameGroup;
window.generateGameContent = _game.generateGameContent;
window.selectGameItem = _game.selectGameItem;
window.updateGameTimer = _game.updateGameTimer;
window.endGame = _game.endGame;
window.restartGame = _game.restartGame;
window.backToErrorBook = _game.backToErrorBook;
window.switchGameMode = _game.switchGameMode;

// 初始化应用
(0, _init.initApp)();