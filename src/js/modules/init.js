// 初始化模块

// 导入其他模块的函数
import { checkUserInfo, loadUserBook, saveUserBook, loadUserStats, updateCheckInStatus } from './user.js';
import { loadPDF, renderWordList, generateWordChain, updateLearningContent, updateNavigationButtons, resetLearningSteps, generateErrorWordChain, updateErrorWordLearningContent, updateErrorWordNavigationButtons, renderErrorWordList, updateStatsPage, initCheckinHistoryPage, initPointsHistoryPage } from './word.js';
import { initEventListeners } from './utils.js';
import { initGame } from './game.js';
import { loadModals } from '../modalManager.js';

// 全局变量
export let currentUser = 'youyou';
export let currentUserName = '悠悠';
export let currentFile = '3下.pdf';
export let currentBookName = '三年级下册';
export let words = [];
export let currentUnit = 'all';
export let maskMode = 'none';
export let errorBookMaskMode = 'none';
export let userStats = {};
export let currentWordIndex = 0;
export let currentStep = 'learn';
export let isErrorBookMode = false;
export let errorWords = [];

// Setter 函数：用于其他模块修改这些变量
export function setCurrentUser(value) {
    currentUser = value;
    // 同时更新window对象中的对应变量
    if (typeof window !== 'undefined') {
        window.currentUser = value;
    }
}

export function setCurrentUserName(value) {
    currentUserName = value;
    // 同时更新window对象中的对应变量
    if (typeof window !== 'undefined') {
        window.currentUserName = value;
    }
}

export function setCurrentFile(value) {
    currentFile = value;
    // 同时更新window对象中的对应变量
    if (typeof window !== 'undefined') {
        window.currentFile = value;
    }
}

export function setCurrentBookName(value) {
    currentBookName = value;
    // 同时更新window对象中的对应变量
    if (typeof window !== 'undefined') {
        window.currentBookName = value;
    }
}

export function setWords(value) {
    words = value;
    // 同时更新window对象中的对应变量
    if (typeof window !== 'undefined') {
        window.words = value;
    }
}

export function setCurrentUnit(value) {
    currentUnit = value;
}

export function setMaskMode(value) {
    maskMode = value;
}

export function setErrorBookMaskMode(value) {
    errorBookMaskMode = value;
}

export function setUserStats(value) {
    userStats = value;
}

export function setCurrentWordIndex(value) {
    currentWordIndex = value;
    // 同时更新window对象中的对应变量
    if (typeof window !== 'undefined') {
        window.currentWordIndex = value;
    }
}

export function setCurrentStep(value) {
    currentStep = value;
    // 同时更新window对象中的对应变量
    if (typeof window !== 'undefined') {
        window.currentStep = value;
    }
}

export function setIsErrorBookMode(value) {
    isErrorBookMode = value;
    // 同时更新window对象中的对应变量
    if (typeof window !== 'undefined') {
        window.isErrorBookMode = value;
    }
}

export function setErrorWords(value) {
    errorWords = value;
    // 同时更新window对象中的对应变量
    if (typeof window !== 'undefined') {
        window.errorWords = value;
    }
}

// 通用初始化函数
export async function commonInit() {
    console.log('[通用初始化] 开始');
    // 加载模态框
    console.log('[通用初始化] 加载模态框');
    loadModals();
    
    // 检查并加载用户信息
    console.log('[通用初始化] 检查并加载用户信息');
    checkUserInfo();
    
    // 加载用户最近学习的课本或默认课本
    console.log('[通用初始化] 加载用户最近学习的课本或默认课本');
    loadUserBook();
    
    // 加载用户数据
    console.log('[通用初始化] 加载用户数据');
    await loadUserStats();
    
    // 加载单词数据
    console.log('[通用初始化] 加载单词数据');
    await loadPDF();
    
    // 更新打卡状态
    console.log('[通用初始化] 更新打卡状态');
    updateCheckInStatus();
    
    // 初始化事件监听
    console.log('[通用初始化] 初始化事件监听');
    initEventListeners();
    console.log('[通用初始化] 结束');
}

// 首页初始化
export function initIndexPage() {
    console.log('[首页初始化] 开始');
    // 首页特定初始化逻辑
    // 导入updateDailyTaskProgress函数
    import('./user.js').then(({ updateDailyTaskProgress }) => {
        // 更新每日任务进度
        console.log('[首页初始化] 更新每日任务进度');
        updateDailyTaskProgress();
    });
    console.log('[首页初始化] 结束');
}

// 单词列表页初始化
export function initWordListPage() {
    console.log('[单词列表页初始化] 开始');
    // 单词列表页特定初始化逻辑
    renderWordList();
    console.log('[单词列表页初始化] 结束');
}

// 单词链路页初始化
export function initWordLinkPage() {
    console.log('[单词链路页初始化] 开始');
    // 处理URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get('index')) || 0;
    const errorBook = urlParams.get('errorBook') === 'true';

    // 设置当前单词索引和错误本模式
    setCurrentWordIndex(index);
    setIsErrorBookMode(errorBook);

    if (isErrorBookMode) {
        // 加载错词数据
        setErrorWords(DataManager.getErrorWords(currentUser));
        // 生成错词链条
        generateErrorWordChain();
        // 更新错词学习内容
        updateErrorWordLearningContent();
        // 更新错词导航按钮
        updateErrorWordNavigationButtons();
    } else {
        // 生成单词链条
        generateWordChain();
        // 更新学习内容
        updateLearningContent();
        // 更新导航按钮
        updateNavigationButtons();
    }
    
    // 重置学习步骤
    resetLearningSteps();
    console.log('[单词链路页初始化] 结束');
}

// 错误本页面初始化
export function initErrorBookPage() {
    console.log('[错误本页面初始化] 开始');
    // 加载错词数据
    setErrorWords(DataManager.getErrorWords(currentUser));
    // 渲染错词列表
    renderErrorWordList();
    console.log('[错误本页面初始化] 结束');
}

// 统计页面初始化
export function initStatsPage() {
    console.log('[统计页面初始化] 开始');
    // 更新统计页面显示
    updateStatsPage();
    console.log('[统计页面初始化] 结束');
}

// 文章列表页初始化
export function initArticleListPage() {
    console.log('[文章列表页初始化] 开始');
    // 文章列表页特定初始化逻辑
    console.log('[文章列表页初始化] 结束');
}

// 打卡历史页面初始化
export function initCheckInHistoryPage() {
    console.log('[打卡历史页面初始化] 开始');
    // 打卡历史页面特定初始化逻辑
    console.log('[打卡历史页面初始化] 结束');
}

// 宠物页面初始化
export function initPetHomePage() {
    console.log('[宠物页面初始化] 开始');
    // 宠物页面特定初始化逻辑
    console.log('[宠物页面初始化] 结束');
}

// 游戏页面初始化
export function initGamePage() {
    console.log('[游戏页面初始化] 开始');
    // 游戏页面特定初始化逻辑
    initGame();
    console.log('[游戏页面初始化] 结束');
}

// 统一初始化入口
export function initApp() {
    // 初始化函数
    const init = async function() {
        console.log('[初始化] 开始执行 initApp');

        // 通用初始化
        await commonInit();

        // 根据页面执行特定初始化
        const currentPage = window.location.pathname.split('/').pop();
        console.log('[初始化] 当前页面:', currentPage);

        switch(currentPage) {
            case 'index.html':
                initIndexPage();
                break;
            case 'word-list.html':
                initWordListPage();
                break;
            case 'word-link.html':
                initWordLinkPage();
                break;
            case 'error-book.html':
                initErrorBookPage();
                break;
            case 'stats.html':
                initStatsPage();
                break;
            case 'article-list.html':
                initArticleListPage();
                break;
            case 'pet-home.html':
                initPetHomePage();
                break;
            case 'game.html':
                initGamePage();
                break;
            case 'audio-game.html':
                // 初始化听音辨词游戏
                if (typeof initAudioGame === 'function') {
                    initAudioGame();
                }
                break;
            case 'spelling-game.html':
                // 初始化拼写挑战游戏
                if (typeof initSpellingGame === 'function') {
                    initSpellingGame();
                }
                break;
            case 'memory-game.html':
                // 初始化记忆卡片游戏
                if (typeof initMemoryGame === 'function') {
                    initMemoryGame();
                }
                break;
            case 'checkin-history.html':
                initCheckinHistoryPage();
                break;
            case 'points-history.html':
                initPointsHistoryPage();
                break;
            default:
                console.log('[初始化] 未知页面，执行默认初始化');
        }

        console.log('[初始化] initApp 执行完成');
    };

    // 检查DOM是否已经加载完成
    if (document.readyState === 'loading') {
        // DOM还在加载中，等待DOMContentLoaded事件
        console.log('[初始化] DOM加载中，等待DOMContentLoaded事件');
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM已经加载完成，直接执行
        console.log('[初始化] DOM已就绪，立即执行初始化');
        init();
    }
}