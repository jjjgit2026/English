// 游戏模块

import { currentUser } from './init.js';
import DataManager from '../dataManager.js';
import AudioManager from '../audioManager.js';

// 听音辨词游戏相关
let audioGameWords = [];
let currentAudioWordIndex = 0;
let audioCorrectCount = 0;
let audioGameStartTime = 0;
let audioGameTimerInterval = null;

// 拼写挑战游戏相关
let spellingGameWords = [];
let currentSpellingWordIndex = 0;
let spellingCorrectCount = 0;
let spellingGameStartTime = 0;
let spellingGameTimerInterval = null;

// 记忆卡片游戏相关
let memoryGameCards = [];
let flippedCards = [];
let matchedCards = [];
let memoryCorrectCount = 0;
let memoryGameStartTime = 0;
let memoryGameTimerInterval = null;
let allReviewWords = [];
let currentMemoryGroupIndex = 0;
const MEMORY_GROUP_SIZE = 5;

// 初始化听音辨词游戏
export function initAudioGame() {
    // 获取所有单词
    const allWords = window.words || [];
    
    // 生成复习计划（听音辨词对应发音错误）
    audioGameWords = DataManager.generateDailyReviewPlan(currentUser, allWords, 'audio');
    currentAudioWordIndex = 0;
    audioCorrectCount = 0;
    
    // 设置总数
    document.getElementById('audioTotalCount').textContent = audioGameWords.length;
    document.getElementById('audioCorrectCount').textContent = audioCorrectCount;
    document.getElementById('audioProgressFill').style.width = '0%';
    
    // 检查是否有单词
    if (audioGameWords.length === 0) {
        alert('当前没有待复习的单词');
        goBack();
        return;
    }
    
    // 加载第一个单词
    loadNextAudioWord();
    
    // 开始计时
    audioGameStartTime = Date.now();
    if (audioGameTimerInterval) {
        clearInterval(audioGameTimerInterval);
    }
    audioGameTimerInterval = setInterval(updateAudioGameTimer, 1000);
}

// 加载下一个听音辨词单词
function loadNextAudioWord() {
    if (currentAudioWordIndex >= audioGameWords.length) {
        // 游戏结束
        endAudioGame();
        return;
    }
    
    const currentWord = audioGameWords[currentAudioWordIndex];
    
    // 生成选项（包含正确答案和3个干扰项）
    const options = generateOptions(currentWord, audioGameWords);
    
    // 显示选项
    displayAudioOptions(options, currentWord);
    
    // 自动播放发音
    playCurrentWord();
}

// 生成选项
function generateOptions(correctWord, allWords) {
    const options = [correctWord.word];
    
    // 随机选择3个干扰项
    const shuffledWords = [...allWords].sort(() => 0.5 - Math.random());
    for (const word of shuffledWords) {
        if (word.word !== correctWord.word && options.length < 4) {
            options.push(word.word);
        }
    }
    
    // 打乱选项顺序
    return options.sort(() => 0.5 - Math.random());
}

// 显示听音辨词选项
function displayAudioOptions(options, correctWord) {
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'audio-option';
        optionElement.textContent = option;
        optionElement.onclick = () => checkAudioAnswer(option, correctWord);
        optionsContainer.appendChild(optionElement);
    });
}

// 播放当前单词
function playCurrentWord() {
    if (currentAudioWordIndex < audioGameWords.length) {
        const currentWord = audioGameWords[currentAudioWordIndex];
        if (typeof AudioManager !== 'undefined') {
            AudioManager.playWordAudio(currentWord.word);
        }
    }
}

// 检查听音辨词答案
function checkAudioAnswer(selectedOption, correctWord) {
    // 获取所有选项元素
    const optionElements = document.querySelectorAll('.audio-option');
    
    if (selectedOption === correctWord.word) {
        // 正确
        audioCorrectCount++;
        document.getElementById('audioCorrectCount').textContent = audioCorrectCount;
        
        // 更新进度条
        const progress = (audioCorrectCount / audioGameWords.length) * 100;
        document.getElementById('audioProgressFill').style.width = progress + '%';
        
        // 为正确选项添加绿色样式
        optionElements.forEach(element => {
            if (element.textContent === selectedOption) {
                element.style.background = '#e8f5e8';
                element.style.border = '2px solid #4CAF50';
                element.style.color = '#4CAF50';
            }
        });
        
        // 播放成功音效
        AudioManager.playSuccessSound();
        
        // 更新复习任务进度
        DataManager.updateTaskProgress(currentUser, 'review');
        
        // 保存单词学习记录
        DataManager.saveWordLearningRecord(currentUser, correctWord.word, correctWord.meaning);
        
        // 延迟加载下一个单词
        setTimeout(() => {
            currentAudioWordIndex++;
            loadNextAudioWord();
        }, 1000);
    } else {
        // 错误
        AudioManager.playErrorSound();
        // 记录发音步骤错误
        DataManager.recordStepError(currentUser, correctWord.word, 'read');
    }
}

// 更新听音辨词游戏计时器
function updateAudioGameTimer() {
    const elapsedTime = Math.floor((Date.now() - audioGameStartTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById('audioTimer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 结束听音辨词游戏
function endAudioGame() {
    // 停止计时器
    if (audioGameTimerInterval) {
        clearInterval(audioGameTimerInterval);
        audioGameTimerInterval = null;
    }
    
    // 显示游戏结束界面
    const gameResult = document.getElementById('audioGameResult');
    const gameTime = document.getElementById('audioGameTime');
    const gameScore = document.getElementById('audioGameScore');
    
    const elapsedTime = Math.floor((Date.now() - audioGameStartTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    gameTime.textContent = `${minutes}分${seconds}秒`;
    
    const score = audioCorrectCount * 100;
    gameScore.textContent = score;
    
    // 游戏结束，给用户奖励2积分（与消消乐听音选义保持一致）
    if (typeof DataManager !== 'undefined') {
        DataManager.addPoints(currentUser, 2, '玩听音辨词游戏');
    }
    
    gameResult.classList.remove('hidden');
}

// 重新开始听音辨词游戏
export function restartAudioGame() {
    // 隐藏结果界面
    document.getElementById('audioGameResult').classList.add('hidden');
    
    // 重新初始化游戏
    initAudioGame();
}

// 初始化拼写挑战游戏
export function initSpellingGame() {
    // 获取所有单词
    const allWords = window.words || [];
    
    // 生成复习计划（拼写挑战对应拼写错误）
    spellingGameWords = DataManager.generateDailyReviewPlan(currentUser, allWords, 'spelling');
    currentSpellingWordIndex = 0;
    spellingCorrectCount = 0;
    
    // 设置总数
    document.getElementById('spellingTotalCount').textContent = spellingGameWords.length;
    document.getElementById('spellingCorrectCount').textContent = spellingCorrectCount;
    document.getElementById('spellingProgressFill').style.width = '0%';
    
    // 检查是否有单词
    if (spellingGameWords.length === 0) {
        alert('当前没有待复习的单词');
        goBack();
        return;
    }
    
    // 加载第一个单词
    loadNextSpellingWord();
    
    // 开始计时
    spellingGameStartTime = Date.now();
    if (spellingGameTimerInterval) {
        clearInterval(spellingGameTimerInterval);
    }
    spellingGameTimerInterval = setInterval(updateSpellingGameTimer, 1000);
}

// 加载下一个拼写挑战单词
function loadNextSpellingWord() {
    if (currentSpellingWordIndex >= spellingGameWords.length) {
        // 游戏结束
        endSpellingGame();
        return;
    }
    
    const currentWord = spellingGameWords[currentSpellingWordIndex];
    
    // 显示释义
    document.getElementById('meaningDisplay').textContent = currentWord.meaning;
    
    // 清空输入框和反馈信息
    document.getElementById('spellingInput').value = '';
    document.getElementById('feedbackMessage').textContent = '';
    document.getElementById('feedbackMessage').className = 'feedback-message';
    
    // 聚焦输入框
    document.getElementById('spellingInput').focus();
}

// 检查拼写答案
function checkSpelling() {
    const input = document.getElementById('spellingInput').value.trim().toLowerCase();
    const currentWord = spellingGameWords[currentSpellingWordIndex];
    const feedbackMessage = document.getElementById('feedbackMessage');
    
    if (input === currentWord.word.toLowerCase()) {
        // 正确
        spellingCorrectCount++;
        document.getElementById('spellingCorrectCount').textContent = spellingCorrectCount;
        
        // 更新进度条
        const progress = (spellingCorrectCount / spellingGameWords.length) * 100;
        document.getElementById('spellingProgressFill').style.width = progress + '%';
        
        // 显示正确反馈
        feedbackMessage.textContent = '正确！';
        feedbackMessage.className = 'feedback-message correct';
        
        // 播放成功音效
        AudioManager.playSuccessSound();
        
        // 更新复习任务进度
        DataManager.updateTaskProgress(currentUser, 'review');
        
        // 保存单词学习记录
        DataManager.saveWordLearningRecord(currentUser, currentWord.word, currentWord.meaning);
        
        // 延迟加载下一个单词
        setTimeout(() => {
            currentSpellingWordIndex++;
            loadNextSpellingWord();
        }, 1000);
    } else {
        // 错误
        feedbackMessage.textContent = '错误，请重试！';
        feedbackMessage.className = 'feedback-message error';
        AudioManager.playErrorSound();
        // 记录拼写步骤错误
        DataManager.recordStepError(currentUser, currentWord.word, 'spell');
    }
}

// 处理拼写输入键盘事件
function handleSpellingInputKeyPress(event) {
    if (event.key === 'Enter') {
        checkSpelling();
    }
}

// 暴露函数给 window 对象
window.gamesCheckSpelling = checkSpelling;
window.gamesHandleSpellingInputKeyPress = handleSpellingInputKeyPress;
window.playCurrentWord = playCurrentWord;

// 更新拼写挑战游戏计时器
function updateSpellingGameTimer() {
    const elapsedTime = Math.floor((Date.now() - spellingGameStartTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById('spellingTimer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 结束拼写挑战游戏
function endSpellingGame() {
    // 停止计时器
    if (spellingGameTimerInterval) {
        clearInterval(spellingGameTimerInterval);
        spellingGameTimerInterval = null;
    }
    
    // 显示游戏结束界面
    const gameResult = document.getElementById('spellingGameResult');
    const gameTime = document.getElementById('spellingGameTime');
    const gameScore = document.getElementById('spellingGameScore');
    
    const elapsedTime = Math.floor((Date.now() - spellingGameStartTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    gameTime.textContent = `${minutes}分${seconds}秒`;
    
    const score = spellingCorrectCount * 100;
    gameScore.textContent = score;
    
    // 游戏结束，给用户奖励1积分
    if (typeof DataManager !== 'undefined') {
        DataManager.addPoints(currentUser, 1, '玩拼写挑战游戏');
    }
    
    gameResult.classList.remove('hidden');
}

// 重新开始拼写挑战游戏
export function restartSpellingGame() {
    // 隐藏结果界面
    document.getElementById('spellingGameResult').classList.add('hidden');
    
    // 重新初始化游戏
    initSpellingGame();
}

// 初始化记忆卡片游戏
export function initMemoryGame() {
    // 获取所有单词
    const allWords = window.words || [];
    
    // 生成完整的复习计划（记忆卡片对应释义错误）
    allReviewWords = DataManager.generateDailyReviewPlan(currentUser, allWords, 'memory');
    currentMemoryGroupIndex = 0;
    
    // 重置游戏状态
    flippedCards = [];
    matchedCards = [];
    memoryCorrectCount = 0;
    
    // 设置总数
    document.getElementById('memoryTotalCount').textContent = allReviewWords.length;
    document.getElementById('memoryCorrectCount').textContent = memoryCorrectCount;
    document.getElementById('memoryProgressFill').style.width = '0%';
    
    // 检查是否有单词
    if (allReviewWords.length === 0) {
        alert('当前没有待复习的单词');
        goBack();
        return;
    }
    
    // 加载第一组
    loadNextMemoryGroup();
    
    // 开始计时
    memoryGameStartTime = Date.now();
    if (memoryGameTimerInterval) {
        clearInterval(memoryGameTimerInterval);
    }
    memoryGameTimerInterval = setInterval(updateMemoryGameTimer, 1000);
}

// 加载下一组记忆卡片
function loadNextMemoryGroup() {
    // 计算当前组的起始和结束索引
    const startIndex = currentMemoryGroupIndex * MEMORY_GROUP_SIZE;
    const endIndex = startIndex + MEMORY_GROUP_SIZE;
    
    // 获取当前组的单词
    const currentGroupWords = allReviewWords.slice(startIndex, endIndex);
    
    if (currentGroupWords.length === 0) {
        // 所有组都完成了
        endMemoryGame();
        return;
    }
    
    // 生成卡片
    memoryGameCards = [];
    currentGroupWords.forEach(word => {
        // 添加单词卡片
        memoryGameCards.push({
            id: `word-${word.word}`,
            content: word.word,
            pairId: word.word
        });
        // 添加释义卡片
        memoryGameCards.push({
            id: `meaning-${word.word}`,
            content: word.meaning,
            pairId: word.word
        });
    });
    
    // 打乱卡片顺序
    memoryGameCards = memoryGameCards.sort(() => 0.5 - Math.random());
    
    // 重置当前组的状态
    flippedCards = [];
    matchedCards = [];
    
    // 生成卡片
    generateMemoryCards();
}

// 生成记忆卡片
function generateMemoryCards() {
    const cardGrid = document.getElementById('memoryCardGrid');
    cardGrid.innerHTML = '';
    
    memoryGameCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.id = card.id;
        cardElement.dataset.pairId = card.pairId;
        
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${card.content}</div>
            </div>
        `;
        
        cardElement.onclick = () => flipMemoryCard(cardElement);
        cardGrid.appendChild(cardElement);
    });
}

// 翻转记忆卡片
function flipMemoryCard(cardElement) {
    // 如果卡片已经匹配或已经翻转，不做处理
    if (cardElement.classList.contains('matched') || cardElement.classList.contains('flipped')) {
        return;
    }
    
    // 翻转卡片
    cardElement.classList.add('flipped');
    flippedCards.push(cardElement);
    
    // 如果翻转了两张卡片，检查是否匹配
    if (flippedCards.length === 2) {
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];
        
        if (card1.dataset.pairId === card2.dataset.pairId) {
            // 匹配成功
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
            memoryCorrectCount++;
            
            document.getElementById('memoryCorrectCount').textContent = memoryCorrectCount;
            
            // 更新进度条
            const totalPairs = allReviewWords.length;
            const progress = (memoryCorrectCount / totalPairs) * 100;
            document.getElementById('memoryProgressFill').style.width = progress + '%';
            
            // 播放成功音效
            AudioManager.playSuccessSound();
            
            // 保存单词学习记录
            const word = card1.dataset.pairId;
            const wordObj = allReviewWords.find(w => w.word === word);
            if (wordObj) {
                DataManager.saveWordLearningRecord(currentUser, word, wordObj.meaning);
            }
            
            // 检查当前组是否完成
            if (matchedCards.length === memoryGameCards.length) {
                // 延迟加载下一组
                setTimeout(() => {
                    currentMemoryGroupIndex++;
                    loadNextMemoryGroup();
                }, 1000);
            }
        } else {
            // 匹配失败
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                AudioManager.playErrorSound();
                // 记录练习步骤错误
                const word = card1.dataset.pairId;
                DataManager.recordStepError(currentUser, word, 'practice');
            }, 1000);
        }
        
        // 清空翻转卡片
        flippedCards = [];
    }
}

// 更新记忆卡片游戏计时器
function updateMemoryGameTimer() {
    const elapsedTime = Math.floor((Date.now() - memoryGameStartTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById('memoryTimer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 结束记忆卡片游戏
function endMemoryGame() {
    // 停止计时器
    if (memoryGameTimerInterval) {
        clearInterval(memoryGameTimerInterval);
        memoryGameTimerInterval = null;
    }
    
    // 显示游戏结束界面
    const gameResult = document.getElementById('memoryGameResult');
    const gameTime = document.getElementById('memoryGameTime');
    const gameScore = document.getElementById('memoryGameScore');
    
    const elapsedTime = Math.floor((Date.now() - memoryGameStartTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    gameTime.textContent = `${minutes}分${seconds}秒`;
    
    const score = memoryCorrectCount * 100;
    gameScore.textContent = score;
    
    // 游戏结束，给用户奖励1积分
    if (typeof DataManager !== 'undefined') {
        DataManager.addPoints(currentUser, 1, '玩记忆卡片游戏');
    }
    
    gameResult.classList.remove('hidden');
}

// 重新开始记忆卡片游戏
export function restartMemoryGame() {
    // 隐藏结果界面
    document.getElementById('memoryGameResult').classList.add('hidden');
    
    // 重新初始化游戏
    initMemoryGame();
}

// 返回首页
export function backToHome() {
    window.location.href = 'index.html';
}
