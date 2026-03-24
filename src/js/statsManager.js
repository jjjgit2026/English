// 统计管理模块

import { getCurrentUser, getCurrentFile } from './userManager.js';

let userStats = {};

/**
 * 加载用户统计数据
 */
export async function loadUserStats() {
    console.log('[加载用户统计数据] 开始');
    const currentUser = getCurrentUser();
    console.log('[加载用户统计数据] currentUser:', currentUser);
    try {
        // 使用 DataManager.getUserData() 确保数据结构完整
        userStats = DataManager.getUserData(currentUser);
        console.log('[加载用户统计数据] 从 DataManager 获取的用户数据:', userStats);
        
        // 更新统计显示
        updateStatsDisplay();
        
    } catch (error) {
        console.error('加载用户统计数据失败:', error);
    } finally {
        console.log('[加载用户统计数据] 结束');
    }
}

/**
 * 更新统计显示
 */
export function updateStatsDisplay() {
    console.log('[更新统计显示] 开始');
    const currentUser = getCurrentUser();
    const currentFile = getCurrentFile();
    console.log('[更新统计显示] currentUser:', currentUser);
    console.log('[更新统计显示] currentFile:', currentFile);
    console.log('[更新统计显示] words.length:', window.words ? window.words.length : 0);
    
    // 检查元素是否存在
    const totalWordsElement = document.getElementById('totalWords');
    const learnedWordsElement = document.getElementById('learnedWords');
    const userPointsElement = document.getElementById('userPoints');
    
    console.log('[更新统计显示] totalWordsElement:', totalWordsElement);
    console.log('[更新统计显示] learnedWordsElement:', learnedWordsElement);
    console.log('[更新统计显示] userPointsElement:', userPointsElement);
    
    // 使用DataManager获取用户数据
    const userData = DataManager.getUserData(currentUser);
    console.log('[更新统计显示] 从DataManager获取的用户数据:', userData);
    
    // 只有当元素存在时才更新
    if (totalWordsElement) {
        // 优先从userData获取总单词数，避免words数组未加载的问题
        let totalCount = window.words ? window.words.length : 0;
        if (userData.books && userData.books[currentFile] && userData.books[currentFile].totalWords) {
            totalCount = userData.books[currentFile].totalWords;
        }
        totalWordsElement.textContent = totalCount;
        console.log('[更新统计显示] 单词总数:', totalCount);
    }
    
    if (learnedWordsElement) {
        let learnedCount = 0;
        if (userData.books && userData.books[currentFile]) {
            // 同时支持旧格式（learnedWords数组）和新格式（learnedCount）
            if (userData.books[currentFile].learnedCount !== undefined) {
                learnedCount = userData.books[currentFile].learnedCount || 0;
            } else if (Array.isArray(userData.books[currentFile].learnedWords)) {
                learnedCount = userData.books[currentFile].learnedWords.length;
            }
        }
        console.log('[更新统计显示] 已学单词数量:', learnedCount);
        learnedWordsElement.textContent = learnedCount;
    }
    
    if (userPointsElement) {
        const points = userData.total ? (parseFloat(userData.total.points) || 0) : 0;
        console.log('[更新统计显示] 学习积分:', points);
        userPointsElement.textContent = points;
    }
    
    console.log('[更新统计显示] 结束');
}

/**
 * 更新统计页面显示
 */
export function updateStatsPage() {
    // 更新日期
    const statsDateElement = document.getElementById('statsDate');
    if (statsDateElement) {
        const today = new Date().toISOString().split('T')[0];
        statsDateElement.textContent = today;
    }
    
    // 获取用户数据
    const userData = DataManager.getUserData(getCurrentUser());
    
    // 更新今日统计
    const todayCompletedElement = document.getElementById('todayCompleted');
    const todayErrorElement = document.getElementById('todayError');
    
    if (todayCompletedElement) {
        todayCompletedElement.textContent = userData.today.learning || 0;
    }
    
    if (todayErrorElement) {
        todayErrorElement.textContent = userData.today.error || 0;
    }
    
    // 更新累计统计
    const totalCompletedElement = document.getElementById('totalCompleted');
    const totalErrorElement = document.getElementById('totalError');
    
    if (totalCompletedElement) {
        totalCompletedElement.textContent = userData.total.learning || 0;
    }
    
    if (totalErrorElement) {
        totalErrorElement.textContent = userData.total.error || 0;
    }
}

/**
 * 更新打卡状态
 */
export function updateCheckInStatus() {
    const currentUser = getCurrentUser();
    const checkinStatus = DataManager.getCheckInStatus(currentUser);
    const checkinStatusElement = document.getElementById('checkinStatus');
    const checkinBtn = document.getElementById('checkinBtn');
    const consecutiveDaysElement = document.getElementById('consecutiveDays');
    
    if (checkinStatusElement) {
        checkinStatusElement.textContent = checkinStatus.checkedIn ? '已打卡' : '未打卡';
    }
    
    if (checkinBtn) {
        checkinBtn.textContent = checkinStatus.checkedIn ? '已打卡' : '立即打卡';
        checkinBtn.disabled = checkinStatus.checkedIn;
    }
    
    if (consecutiveDaysElement) {
        consecutiveDaysElement.textContent = checkinStatus.consecutiveDays;
    }
}

/**
 * 打卡
 */
export function checkIn() {
    const currentUser = getCurrentUser();
    const result = DataManager.checkIn(currentUser);
    
    if (result.success) {
        alert(`打卡成功！获得 ${result.points} 积分，连续打卡 ${result.consecutiveDays} 天`);
        updateCheckInStatus();
        updateStatsDisplay();
    } else {
        alert(result.message);
    }
}

/**
 * 获取用户统计数据
 * @returns {Object} 用户统计数据
 */
export function getUserStats() {
    return userStats;
}
