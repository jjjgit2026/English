// 游戏模块

import { currentUser } from './init.js';

// 假设DataManager和AudioManager是全局变量
// 如果它们不是全局变量，需要从相应的模块导入
// import DataManager from '../dataManager.js';
// import AudioManager from '../audioManager.js';

// 消消乐相关功能
let gameWords = [];
let allErrorWords = [];
let currentGroupIndex = 0;
let selectedWord = null;
let selectedMeaning = null;
let gameCorrectCount = 0; // 当前分组的正确数量
let totalCorrectCount = 0; // 全局的正确数量
let gameStartTime = 0;
let gameTimerInterval = null;

// 初始化游戏
export function initGame() {
    allErrorWords = DataManager.getErrorWords(currentUser);
    currentGroupIndex = 0;
    selectedWord = null;
    selectedMeaning = null;
    totalCorrectCount = 0;
    
    // 设置总数为所有错误单词的数量
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
export function loadNextGameGroup() {
    // 计算当前组的起始和结束索引
    const startIndex = currentGroupIndex * 5;
    const endIndex = startIndex + 5;
    
    // 获取当前组的单词
    gameWords = allErrorWords.slice(startIndex, endIndex);
    
    // 打乱顺序
    gameWords = gameWords.sort(() => 0.5 - Math.random());
    
    gameCorrectCount = 0;
    selectedWord = null;
    selectedMeaning = null;
    
    // 重置游戏界面
    document.getElementById('gameCorrectCount').textContent = totalCorrectCount;
    document.getElementById('gameProgressFill').style.width = (totalCorrectCount / allErrorWords.length) * 100 + '%';
    
    // 生成游戏内容
    generateGameContent();
}

// 生成游戏内容
export function generateGameContent() {
    const wordColumn = document.getElementById('wordColumn');
    const meaningColumn = document.getElementById('meaningColumn');
    
    wordColumn.innerHTML = '';
    meaningColumn.innerHTML = '';
    
    // 打乱单词顺序
    const shuffledWords = [...gameWords].sort(() => 0.5 - Math.random());
    const shuffledMeanings = [...gameWords].sort(() => 0.5 - Math.random());
    
    shuffledWords.forEach((word, index) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'game-item';
        wordItem.textContent = word.word;
        wordItem.dataset.word = word.word;
        wordItem.onclick = () => selectGameItem('word', wordItem, word.word);
        wordColumn.appendChild(wordItem);
    });
    
    shuffledMeanings.forEach((word, index) => {
        const meaningItem = document.createElement('div');
        meaningItem.className = 'game-item';
        meaningItem.textContent = word.meaning;
        meaningItem.dataset.meaning = word.meaning;
        meaningItem.dataset.word = word.word;
        meaningItem.onclick = () => selectGameItem('meaning', meaningItem, word.word);
        meaningColumn.appendChild(meaningItem);
    });
}

// 选择游戏项目
export function selectGameItem(type, element, word) {
    if (type === 'word') {
        // 取消之前的选择
        document.querySelectorAll('#wordColumn .game-item').forEach(item => {
            item.classList.remove('selected');
        });
        element.classList.add('selected');
        selectedWord = word;
    } else {
        document.querySelectorAll('#meaningColumn .game-item').forEach(item => {
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
            const progress = (totalCorrectCount / allErrorWords.length) * 100;
            document.getElementById('gameProgressFill').style.width = progress + '%';
            
            // 标记正确
            document.querySelectorAll(`#wordColumn .game-item[data-word="${selectedWord}"]`).forEach(item => {
                item.classList.add('correct');
                item.classList.remove('selected');
            });
            document.querySelectorAll(`#meaningColumn .game-item[data-word="${selectedMeaning}"]`).forEach(item => {
                item.classList.add('correct');
                item.classList.remove('selected');
            });
            
            // 播放成功音效
            AudioManager.playSuccessSound();
            
            // 检查是否完成当前组
            if (gameCorrectCount === gameWords.length) {
                // 延迟加载下一组
                setTimeout(() => {
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
            document.querySelectorAll('.game-item').forEach(item => {
                item.classList.remove('selected');
            });
        }
    }
}

// 更新游戏计时器
export function updateGameTimer() {
    const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById('gameTimer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 结束游戏
export function endGame() {
    // 停止计时器
    if (gameTimerInterval) {
        clearInterval(gameTimerInterval);
        gameTimerInterval = null;
    }
    
    // 显示游戏结束界面
    const gameResult = document.getElementById('gameResult');
    const gameTime = document.getElementById('gameTime');
    const gameScore = document.getElementById('gameScore');
    
    const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    gameTime.textContent = `${minutes}分${seconds}秒`;
    
    const score = totalCorrectCount * 100;
    gameScore.textContent = score;
    
    // 游戏结束，给用户奖励1积分
    if (typeof DataManager !== 'undefined') {
        DataManager.addPoints(currentUser, 1, '玩消消乐游戏');
    }
    
    gameResult.classList.remove('hidden');
}

// 重新开始游戏
export function restartGame() {
    // 隐藏结果界面
    document.getElementById('gameResult').classList.add('hidden');
    
    // 重新初始化游戏
    initGame();
}

// 返回错词本
export function backToErrorBook() {
    window.location.href = 'error-book.html';
}