// ES5版本的主应用模块

// 全局变量
window.currentUser = null;
window.currentUserName = '';
window.currentFile = '';
window.currentBookName = '';
window.words = [];
window.currentUnit = 1;
window.maskMode = false;
window.errorBookMaskMode = false;
window.userStats = {};
window.currentWordIndex = 0;
window.currentStep = 1;
window.isErrorBookMode = false;
window.errorWords = [];

// 数据管理模块
window.DataManager = {
    loadJSON: function(filePath, callback) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open('GET', filePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    callback(data);
                } catch (e) {
                    console.error('解析JSON失败:', e);
                    callback(null);
                }
            }
        };
        xhr.send(null);
    },
    saveToLocalStorage: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('保存到本地存储失败:', e);
            return false;
        }
    },
    loadFromLocalStorage: function(key, defaultValue) {
        try {
            var data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('从本地存储加载失败:', e);
            return defaultValue;
        }
    }
};

// 音频管理模块
window.AudioManager = {
    playWordAudio: function(word, callback) {
        var audio = new Audio();
        audio.src = 'https://dict.youdao.com/dictvoice?type=2&audio=' + encodeURIComponent(word);
        audio.onended = callback;
        audio.onerror = function() {
            console.error('音频播放失败:', word);
            if (callback) callback();
        };
        audio.play().catch(function(e) {
            console.error('音频播放被阻止:', e);
            if (callback) callback();
        });
    }
};

// 模态框管理模块
window.ModalManager = {
    showModal: function(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    },
    hideModal: function(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }
};

// 统计管理模块
window.StatsManager = {
    updateStats: function(user, stats) {
        console.log('更新统计数据:', user, stats);
        // 更新统计数据的逻辑
    },
    getStats: function(user) {
        console.log('获取统计数据:', user);
        // 获取统计数据的逻辑
    }
};

// 全局定义withUserCheck函数
window.withUserCheck = function(callback) {
    return function() {
        if (window.currentUser) {
            callback();
        } else {
            alert('请先选择用户');
            window.showUserModal();
        }
    };
};

// 导出数据功能
window.exportData = function() {
    try {
        var data = {};
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        
        var jsonStr = JSON.stringify(data, null, 2);
        var blob = new Blob([jsonStr], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        
        var now = new Date();
        var fileName = 'vocabulary-app-data-' + now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0') + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0') + '.json';
        
        a.href = url;
        a.download = fileName;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        
        alert('数据导出成功！');
    } catch (error) {
        console.error('导出数据失败:', error);
        alert('导出数据失败，请重试');
    }
};

// 导入数据功能
window.importData = function() {
    var fileInput = document.getElementById('dataFileInput');
    fileInput.click();
    
    fileInput.onchange = function(e) {
        var file = e.target.files[0];
        if (!file) return;
        
        if (!file.name.endsWith('.json')) {
            alert('请选择JSON格式的文件');
            return;
        }
        
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                var jsonStr = e.target.result;
                var data = JSON.parse(jsonStr);
                
                if (!data || typeof data !== 'object') {
                    alert('文件格式错误：数据结构不正确');
                    return;
                }
                
                var requiredFields = ['currentUser', 'currentUserName'];
                var hasRequiredFields = false;
                for (var i = 0; i < requiredFields.length; i++) {
                    if (data.hasOwnProperty(requiredFields[i])) {
                        hasRequiredFields = true;
                        break;
                    }
                }
                
                if (!hasRequiredFields) {
                    alert('文件格式错误：缺少必要的数据字段');
                    return;
                }
                
                localStorage.clear();
                
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
document.addEventListener('DOMContentLoaded', function() {
    bindDataManagementEvents();
    console.log('DOM加载完成，尝试绑定数据管理按钮事件');
});

// 当用户弹窗显示时重新绑定事件
window.showUserModal = function() {
    var userModal = document.getElementById('userModal');
    if (userModal) {
        userModal.classList.add('active');
        setTimeout(bindDataManagementEvents, 100);
        console.log('显示用户弹窗，重新绑定数据管理按钮事件');
    }
};

// 智能返回函数
window.goBack = function() {
    try {
        var referrer = document.referrer;
        console.log('Referrer:', referrer);
        
        if (referrer && referrer.includes('games-center.html')) {
            console.log('返回游戏中心页面');
            window.location.href = 'games-center.html';
        } else if (referrer && referrer.includes('index.html')) {
            console.log('返回首页');
            window.location.href = 'index.html';
        } else if (window.history.length > 1) {
            console.log('返回上一页');
            window.history.back();
        } else {
            console.log('返回首页');
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('返回操作失败:', error);
        window.location.href = 'index.html';
    }
};

// 初始化应用
window.initApp = function() {
    console.log('应用初始化中...');
    // 这里可以添加初始化逻辑
};

// 暴露函数给window对象
window.checkUserInfo = function() {};
window.loadUserBook = function() {};
window.saveUserBook = function() {};
window.loadUserStats = function() {};
window.updateCheckInStatus = function() {};
window.updateDailyTaskProgress = function() {};
window.updateBookDisplay = function() {};
window.showBookModal = function() {};
window.closeBookModal = function() {};
window.closeUserModal = function() {};
window.updateStatsDisplay = function() {};
window.checkIn = function() {};

window.loadPDF = function() {};
window.renderWordList = function() {};
window.generateWordChain = function() {};
window.updateLearningContent = function() {};
window.updateNavigationButtons = function() {};
window.resetLearningSteps = function() {};
window.switchStep = function() {};
window.isStepCompleted = function() {};
window.nextStep = function() {};
window.goToPrevWord = function() {};
window.goToNextWord = function() {};
window.backToWordList = function() {};
window.generatePracticeQuestion = function() {};
window.checkPracticeAnswer = function() {};
window.addLetter = function() {};
window.removeLetter = function() {};
window.checkSpelling = function() {};
window.checkWriting = function() {};
window.clearWriteInput = function() {};
window.generateErrorWordChain = function() {};
window.updateErrorWordLearningContent = function() {};
window.updateErrorWordNavigationButtons = function() {};
window.renderErrorWordList = function() {};
window.startErrorWordLearning = function() {};
window.openWordLinkPage = function() {};
window.openErrorWordLinkPage = function() {};
window.updateStatsPage = function() {};
window.getPhoneticColor = function() {};
window.initCheckinHistoryPage = function() {};
window.changeMonth = function() {};
window.initPointsHistoryPage = function() {};
window.markAsLearned = function() {};
window.initWordListPage = function() {};
window.restartGame = function() {};
window.backToErrorBook = function() {};

window.initEventListeners = function() {};
window.startLearning = function() {};
window.startDetailedLearning = function() {};
window.openArticleListPage = function() {};
window.openModelEssayListPage = function() {};
window.backToHome = function() {};
window.generateUnitTabs = function() {};
window.resetRecordingState = function() {};
window.toggleRecording = function() {};
window.startRecording = function() {};
window.analyzeRecording = function() {};
window.calculateScore = function() {};
window.calculateSimilarity = function() {};
window.playbackRecording = function() {};
window.openErrorBookPage = function() {};
window.openStatsPage = function() {};
window.openPetHomePage = function() {};
window.openCheckinHistoryPage = function() {};
window.openPointsHistoryPage = function() {};
window.openGamePage = function() {};

window.initGame = function() {};
window.loadNextGameGroup = function() {};
window.generateGameContent = function() {};
window.selectGameItem = function() {};
window.updateGameTimer = function() {};
window.endGame = function() {};
window.switchGameMode = function() {};

// 新游戏函数
window.initAudioGame = function() {};
window.restartAudioGame = function() {};
window.initSpellingGame = function() {};
window.restartSpellingGame = function() {};
window.initMemoryGame = function() {};
window.restartMemoryGame = function() {};

// 初始化应用
window.initApp();