// 工具模块

import { currentUser, currentFile, currentBookName, currentUnit, maskMode, errorBookMaskMode, words, isErrorBookMode, errorWords, currentWordIndex, setCurrentFile, setCurrentBookName, setCurrentUser, setCurrentUserName, setCurrentUnit, setMaskMode, setErrorBookMaskMode } from './init.js';
import { saveUserBook, showUserModal, updateBookDisplay, loadUserStats, showBookModal, closeBookModal } from './user.js';
import { renderWordList, renderErrorWordList, loadPDF } from './word.js';

// 用户检查函数 - 确保用户已选择
export function withUserCheck(callback) {
    return function() {
        if (currentUser) {
            callback();
        } else {
            alert('请先选择用户');
            showUserModal();
        }
    };
}

// 初始化事件监听
export function initEventListeners() {
    // 单元标签切换
    const unitTabs = document.getElementById('unitTabs');
    if (unitTabs) {
        unitTabs.addEventListener('click', function(e) {
            if (e.target.classList.contains('unit-tab')) {
                document.querySelectorAll('.unit-tab').forEach(tab => tab.classList.remove('active'));
                e.target.classList.add('active');
                setCurrentUnit(e.target.dataset.unit);
                renderWordList();
            }
        });
    }
    
    // 遮罩模式切换
    const maskModeButtons = document.querySelectorAll('.mask-mode');
    if (maskModeButtons.length > 0) {
        maskModeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.mask-mode').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const mode = this.dataset.mode;
                
                // 检查当前页面，使用对应的遮罩模式变量
                const wordListPage = document.getElementById('wordListPage');
                const errorBookPage = document.getElementById('errorBookPage');
                
                if (wordListPage && wordListPage.classList.contains('active')) {
                    setMaskMode(mode);
                    renderWordList();
                } else if (errorBookPage && errorBookPage.classList.contains('active')) {
                    setErrorBookMaskMode(mode);
                    renderErrorWordList();
                }
            });
        });
    }
    
    // 课本选择
    document.querySelectorAll('.book-option').forEach(option => {
        option.addEventListener('click', function() {
            setCurrentFile(this.dataset.file);
            setCurrentBookName(this.dataset.name);
            updateBookDisplay();
            // 保存用户选择的课本
            saveUserBook();
            closeBookModal();
            loadPDF();
        });
    });
    
    // 用户选择
    document.querySelectorAll('.user-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.user-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            setCurrentUser(this.dataset.user);
            setCurrentUserName(this.textContent);
            loadUserStats();
        });
    });
    
    // 底部导航
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 筛选下拉框
    const filterSelect = document.getElementById('filterSelect');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            renderWordList();
        });
    }
}

// 开始学习 - 进入单词列表页
export function startLearning() {
    window.location.href = 'word-list.html';
}

// 开始详细学习 - 进入单词学习页面
export function startDetailedLearning() {
    window.location.href = 'word-link.html?index=0';
}

// 打开文章列表页面
export function openArticleListPage() {
    window.location.href = 'article-list.html';
}

// 返回首页
export function backToHome() {
    window.location.href = 'index.html';
}

// 生成单元标签
export function generateUnitTabs() {
    const tabsContainer = document.getElementById('unitTabs');
    tabsContainer.innerHTML = '';
}

// 重置录音状态
export function resetRecordingState() {
    const recordBtn = document.getElementById('recordBtn');
    const playbackBtn = document.getElementById('playbackBtn');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const recordingStatus = document.getElementById('recordingStatus');
    
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
let mediaRecorder = null;
let audioChunks = [];
let audioBlob = null;

// 切换录音状态
export function toggleRecording() {
    const recordBtn = document.getElementById('recordBtn');
    const recordingStatus = document.getElementById('recordingStatus');
    
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
export async function startRecording() {
    try {
        // 获取麦克风权限
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // 创建MediaRecorder实例
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        
        // 监听数据可用事件
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };
        
        // 监听录音结束事件
        mediaRecorder.onstop = async () => {
            // 创建音频Blob
            audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            
            // 分析录音并评分
            await analyzeRecording();
            
            // 启用回放按钮
            document.getElementById('playbackBtn').disabled = false;
            
            // 停止媒体流
            stream.getTracks().forEach(track => track.stop());
        };
        
        // 开始录音
        mediaRecorder.start();
    } catch (error) {
        console.error('录音失败:', error);
        document.getElementById('recordingStatus').textContent = '录音失败，请检查麦克风权限';
        document.getElementById('recordBtn').textContent = '🎤 开始录音';
        document.getElementById('recordBtn').classList.remove('recording');
    }
}

// 分析录音并评分
export async function analyzeRecording() {
    try {
        const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
        if (!currentWord) return;
        
        // 使用Web Speech API进行语音识别
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        // 创建音频URL
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        // 模拟语音识别结果（实际项目中需要使用真实的语音识别服务）
        // 这里使用一个简单的字符串比较方法作为示例
        setTimeout(() => {
            // 模拟识别结果（实际项目中应该从recognition.onresult获取）
            const recognizedText = currentWord.word; // 这里应该是真实的识别结果
            
            // 计算得分
            const score = calculateScore(recognizedText, currentWord.word);
            
            // 显示得分
            document.getElementById('scoreValue').textContent = score;
            document.getElementById('recordingStatus').textContent = `识别结果: ${recognizedText}`;
        }, 1000);
        
    } catch (error) {
        console.error('分析录音失败:', error);
        document.getElementById('recordingStatus').textContent = '分析录音失败';
        document.getElementById('scoreValue').textContent = '-';
    }
}

// 计算得分
export function calculateScore(recognizedText, targetWord) {
    // 转换为小写进行比较
    const recognized = recognizedText.toLowerCase().trim();
    const target = targetWord.toLowerCase().trim();
    
    if (recognized === target) {
        return 100; // 完全匹配
    }
    
    // 计算相似度
    const similarity = calculateSimilarity(recognized, target);
    
    // 根据相似度计算得分（60-99分）
    const score = Math.max(60, Math.round(similarity * 100));
    
    return score;
}

// 计算字符串相似度（使用Levenshtein距离算法）
export function calculateSimilarity(str1, str2) {
    const matrix = [];
    
    // 初始化矩阵
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    // 填充矩阵
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // 替换
                    matrix[i][j - 1] + 1,     // 插入
                    matrix[i - 1][j] + 1      // 删除
                );
            }
        }
    }
    
    // 计算相似度
    const maxLength = Math.max(str1.length, str2.length);
    const distance = matrix[str2.length][str1.length];
    const similarity = 1 - (distance / maxLength);
    
    return similarity;
}

// 回放录音
export function playbackRecording() {
    if (audioBlob) {
        const recordingStatus = document.getElementById('recordingStatus');
        recordingStatus.textContent = '正在回放...';
        
        // 创建音频对象并播放
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
            recordingStatus.textContent = '回放完成';
        };
        
        audio.onerror = () => {
            recordingStatus.textContent = '回放失败';
        };
        
        audio.play().catch(error => {
            console.error('回放失败:', error);
            recordingStatus.textContent = '回放失败';
        });
    }
}

// 打开错词本页面
export function openErrorBookPage() {
    window.location.href = 'error-book.html';
}

// 打开统计页面
export function openStatsPage() {
    window.location.href = 'stats.html';
}

// 打开宠物窝页面
export function openPetHomePage() {
    window.location.href = 'pet-home.html';
}

// 打开打卡记录页面
export function openCheckinHistoryPage() {
    window.location.href = 'checkin-history.html';
}

// 打开积分收支记录页面
export function openPointsHistoryPage() {
    window.location.href = 'points-history.html';
}

// 打开游戏页面
export function openGamePage() {
    const errorWords = DataManager.getErrorWords(currentUser);
    if (errorWords.length === 0) {
        alert('错词本为空，无法玩消消乐');
        return;
    }
    
    window.location.href = 'game.html';
}