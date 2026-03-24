// 主应用模块 - 模块化入口

// 导入数据管理模块
import DataManager from './dataManager.js';

// 导入音频管理模块
import AudioManager from './audioManager.js';

// 导入初始化模块
import { initApp, currentUser, currentUserName, currentFile, currentBookName, words, currentUnit, maskMode, errorBookMaskMode, userStats, currentWordIndex, currentStep, isErrorBookMode, errorWords } from './modules/init.js';

// 导入用户模块
import { checkUserInfo, loadUserBook, saveUserBook, loadUserStats, updateCheckInStatus, updateBookDisplay, showBookModal, closeBookModal, showUserModal, closeUserModal, updateStatsDisplay, checkIn } from './modules/user.js';

// 导入单词模块
import { loadPDF, renderWordList, generateWordChain, updateLearningContent, updateNavigationButtons, resetLearningSteps, switchStep, isStepCompleted, nextStep, goToPrevWord, goToNextWord, backToWordList, generatePracticeQuestion, checkPracticeAnswer, addLetter, removeLetter, checkSpelling, checkWriting, clearWriteInput, generateErrorWordChain, updateErrorWordLearningContent, updateErrorWordNavigationButtons, renderErrorWordList, startErrorWordLearning, openWordLinkPage, openErrorWordLinkPage, updateStatsPage, getPhoneticColor, initCheckinHistoryPage, changeMonth, initPointsHistoryPage } from './modules/word.js';

// 导入工具模块
import { initEventListeners, startLearning, startDetailedLearning, openArticleListPage, backToHome, generateUnitTabs, resetRecordingState, toggleRecording, startRecording, analyzeRecording, calculateScore, calculateSimilarity, playbackRecording, openErrorBookPage, openStatsPage, openPetHomePage, openCheckinHistoryPage, openPointsHistoryPage, openGamePage } from './modules/utils.js';

// 导入游戏模块
import { initGame, loadNextGameGroup, generateGameContent, selectGameItem, updateGameTimer, endGame, restartGame, backToErrorBook } from './modules/game.js';

// 全局定义withUserCheck函数，确保页面加载时立即可用
function withUserCheck(callback) {
    return function() {
        // 检查模块是否已经加载完成（通过检查是否有正式的showUserModal函数，而不是临时函数）
        if (typeof showUserModal === 'function' && window.currentUser !== undefined) {
            if (window.currentUser) {
                callback();
            } else {
                alert('请先选择用户');
                showUserModal();
            }
        } else {
            alert('应用正在加载0，请稍候...');
        }
    };
}

// 暴露withUserCheck函数给window对象
window.withUserCheck = withUserCheck;

// 暴露DataManager给window对象
window.DataManager = DataManager;

// 暴露AudioManager给window对象
window.AudioManager = AudioManager;

// 全局变量暴露给window对象，确保HTML中的内联脚本可以访问
window.currentUser = currentUser;
window.currentUserName = currentUserName;
window.currentFile = currentFile;
window.currentBookName = currentBookName;
window.words = words;
window.currentUnit = currentUnit;
window.maskMode = maskMode;
window.errorBookMaskMode = errorBookMaskMode;
window.userStats = userStats;
window.currentWordIndex = currentWordIndex;
window.currentStep = currentStep;
window.isErrorBookMode = isErrorBookMode;
window.errorWords = errorWords;

// 暴露函数给window对象
window.checkUserInfo = checkUserInfo;
window.loadUserBook = loadUserBook;
window.saveUserBook = saveUserBook;
window.loadUserStats = loadUserStats;
window.updateCheckInStatus = updateCheckInStatus;
window.updateBookDisplay = updateBookDisplay;
window.showBookModal = showBookModal;
window.closeBookModal = closeBookModal;
window.showUserModal = showUserModal;
window.closeUserModal = closeUserModal;
window.updateStatsDisplay = updateStatsDisplay;
window.checkIn = checkIn;

window.loadPDF = loadPDF;
window.renderWordList = renderWordList;
window.generateWordChain = generateWordChain;
window.updateLearningContent = updateLearningContent;
window.updateNavigationButtons = updateNavigationButtons;
window.resetLearningSteps = resetLearningSteps;
window.switchStep = switchStep;
window.isStepCompleted = isStepCompleted;
window.nextStep = nextStep;
window.goToPrevWord = goToPrevWord;
window.goToNextWord = goToNextWord;
window.backToWordList = backToWordList;
window.generatePracticeQuestion = generatePracticeQuestion;
window.checkPracticeAnswer = checkPracticeAnswer;
window.addLetter = addLetter;
window.removeLetter = removeLetter;
window.checkSpelling = checkSpelling;
window.checkWriting = checkWriting;
window.clearWriteInput = clearWriteInput;
window.generateErrorWordChain = generateErrorWordChain;
window.updateErrorWordLearningContent = updateErrorWordLearningContent;
window.updateErrorWordNavigationButtons = updateErrorWordNavigationButtons;
window.renderErrorWordList = renderErrorWordList;
window.startErrorWordLearning = startErrorWordLearning;
window.openWordLinkPage = openWordLinkPage;
window.openErrorWordLinkPage = openErrorWordLinkPage;
window.updateStatsPage = updateStatsPage;
window.getPhoneticColor = getPhoneticColor;
window.initCheckinHistoryPage = initCheckinHistoryPage;
window.changeMonth = changeMonth;
window.initPointsHistoryPage = initPointsHistoryPage;
window.restartGame = restartGame;
window.backToErrorBook = backToErrorBook;

window.initEventListeners = initEventListeners;
window.startLearning = startLearning;
window.startDetailedLearning = startDetailedLearning;
window.openArticleListPage = openArticleListPage;
window.backToHome = backToHome;
window.generateUnitTabs = generateUnitTabs;
window.resetRecordingState = resetRecordingState;
window.toggleRecording = toggleRecording;
window.startRecording = startRecording;
window.analyzeRecording = analyzeRecording;
window.calculateScore = calculateScore;
window.calculateSimilarity = calculateSimilarity;
window.playbackRecording = playbackRecording;
window.openErrorBookPage = openErrorBookPage;
window.openStatsPage = openStatsPage;
window.openPetHomePage = openPetHomePage;
window.openCheckinHistoryPage = openCheckinHistoryPage;
window.openPointsHistoryPage = openPointsHistoryPage;
window.openGamePage = openGamePage;

window.initGame = initGame;
window.loadNextGameGroup = loadNextGameGroup;
window.generateGameContent = generateGameContent;
window.selectGameItem = selectGameItem;
window.updateGameTimer = updateGameTimer;
window.endGame = endGame;
window.restartGame = restartGame;
window.backToErrorBook = backToErrorBook;

// 初始化应用
initApp();