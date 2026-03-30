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
import { initEventListeners, startLearning, startDetailedLearning, openArticleListPage, openModelEssayListPage, backToHome, generateUnitTabs, resetRecordingState, toggleRecording, startRecording, analyzeRecording, calculateScore, calculateSimilarity, playbackRecording, openErrorBookPage, openStatsPage, openPetHomePage, openCheckinHistoryPage, openPointsHistoryPage, openGamePage } from './modules/utils.js';

// 导入游戏模块
import { initGame, loadNextGameGroup, generateGameContent, selectGameItem, updateGameTimer, endGame, restartGame, backToErrorBook, switchGameMode } from './modules/game.js';

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

// 导出数据功能
window.exportData = function() {
    try {
        // 收集所有 localStorage 数据
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        
        // 创建 JSON 字符串
        const jsonStr = JSON.stringify(data, null, 2);
        
        // 创建 Blob 对象
        const blob = new Blob([jsonStr], { type: 'application/json' });
        
        // 创建下载链接
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        // 生成带有时分秒的文件名
        const now = new Date();
        const fileName = `vocabulary-app-data-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}.json`;
        
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
window.importData = function() {
    const fileInput = document.getElementById('dataFileInput');
    fileInput.click();
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // 检查文件类型
        if (!file.name.endsWith('.json')) {
            alert('请选择JSON格式的文件');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const jsonStr = e.target.result;
                
                // 验证JSON格式
                let data;
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
                const requiredFields = ['currentUser', 'currentUserName'];
                const hasRequiredFields = requiredFields.some(field => data.hasOwnProperty(field));
                
                if (!hasRequiredFields) {
                    alert('文件格式错误：缺少必要的数据字段');
                    return;
                }
                
                // 清空现有数据
                localStorage.clear();
                
                // 导入数据
                for (const key in data) {
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
    const exportBtn = document.getElementById('exportDataBtn');
    const importBtn = document.getElementById('importDataBtn');
    
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
document.addEventListener('DOMContentLoaded', function() {
    bindDataManagementEvents();
    console.log('DOM加载完成，尝试绑定数据管理按钮事件');
});

// 当用户弹窗显示时重新绑定事件
window.showUserModal = function() {
    // 显示用户弹窗
    document.getElementById('userModal').classList.add('active');
    // 重新绑定事件，确保按钮可点击
    setTimeout(bindDataManagementEvents, 100);
    console.log('显示用户弹窗，重新绑定数据管理按钮事件');
};
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
window.openModelEssayListPage = openModelEssayListPage;
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
window.switchGameMode = switchGameMode;

// 初始化应用
initApp();