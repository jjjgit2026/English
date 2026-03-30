// 用户模块

import { currentUser, currentUserName, currentFile, currentBookName, words, setCurrentUser, setCurrentUserName, setCurrentFile, setCurrentBookName } from './init.js';
import { loadPDF } from './word.js';

// 检查用户信息
export function checkUserInfo() {
    // 从localStorage获取用户信息
    const savedUser = localStorage.getItem('currentUser');
    const savedUserName = localStorage.getItem('currentUserName');
    
    if (savedUser && savedUserName) {
        // 使用存储的用户信息
        setCurrentUser(savedUser);
        setCurrentUserName(savedUserName);
        
        // 更新UI上的用户名称显示
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = `${currentUserName}，快来学单词！`;
        }
        
        const currentUserDisplayElement = document.getElementById('currentUserDisplay');
        if (currentUserDisplayElement) {
            currentUserDisplayElement.textContent = currentUserName;
        }
        
        return true;
    } else {
            // 显示用户选择弹窗（如果元素存在）
            const userModalElement = document.getElementById('userModal');
            if (userModalElement) {
                userModalElement.classList.add('active');
            }
            return false;
        }
}

// 带用户检查的函数包装器
export function withUserCheck(func) {
    return function() {
        if (checkUserInfo()) {
            func.apply(this, arguments);
        }
    };
}

// 加载用户统计数据
export async function loadUserStats() {
    console.log('[加载用户统计数据] 开始');
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

// 加载用户最近学习的课本
export function loadUserBook() {
    console.log('[加载用户课本] 开始');
    try {
        const bookKey = `userBook_${currentUser}`;
        console.log('[加载用户课本] bookKey:', bookKey);
        const savedBook = localStorage.getItem(bookKey);
        console.log('[加载用户课本] savedBook:', savedBook);
        
        if (savedBook) {
            const bookData = JSON.parse(savedBook);
            setCurrentFile(bookData.file);
            setCurrentBookName(bookData.name);
            console.log('[加载用户课本] 加载用户保存的课本:', currentFile, currentBookName);
        } else {
            // 根据用户设置默认课本
            switch (currentUser) {
                case 'qiuqiu':
                    setCurrentFile('7下.pdf');
                    setCurrentBookName('七年级下册');
                    break;
                case 'youyou':
                    setCurrentFile('5下.pdf');
                    setCurrentBookName('五年级下册');
                    break;
                case 'diandian':
                    setCurrentFile('3上.pdf');
                    setCurrentBookName('三年级上册');
                    break;
                default:
                    setCurrentFile('3下.pdf');
                    setCurrentBookName('三年级下册');
            }
            console.log('[加载用户课本] 加载用户默认课本:', currentFile, currentBookName);
        }
        updateBookDisplay();
    } catch (error) {
        console.error('加载用户课本失败:', error);
        // 发生错误时根据用户设置默认课本
        switch (currentUser) {
            case 'qiuqiu':
                setCurrentFile('7下.pdf');
                setCurrentBookName('七年级下册');
                break;
            case 'youyou':
                setCurrentFile('5下.pdf');
                setCurrentBookName('五年级下册');
                break;
            case 'diandian':
                setCurrentFile('3上.pdf');
                setCurrentBookName('三年级上册');
                break;
            default:
                setCurrentFile('3下.pdf');
                setCurrentBookName('三年级下册');
        }
        console.log('加载默认课本（错误处理）:', currentFile, currentBookName);
        updateBookDisplay();
    } finally {
        console.log('[加载用户课本] 结束');
    }
}

// 保存用户选择的课本
export function saveUserBook() {
    try {
        const bookKey = `userBook_${currentUser}`;
        const bookData = {
            file: currentFile,
            name: currentBookName
        };
        localStorage.setItem(bookKey, JSON.stringify(bookData));
    } catch (error) {
        console.error('保存用户课本失败:', error);
    }
}

// 更新教材显示
export function updateBookDisplay() {
    // 检查是否为7年级及以上教材
    const isPeopleEdition = currentFile && parseInt(currentFile[0]) >= 7;
    const bookPrefix = isPeopleEdition ? '人教版' : '外研版Join In';
    
    // 只在元素存在时才设置textContent
    const bookTitle = document.getElementById('bookTitle');
    if (bookTitle) {
        bookTitle.textContent = `${bookPrefix}-${currentBookName}`;
    }
    
    const bookGrade = document.getElementById('bookGrade');
    if (bookGrade) {
        bookGrade.textContent = currentBookName.replace('年级', '年级 ').replace('上册', '上册').replace('下册', '下册');
    }
    
    const listTitle = document.getElementById('listTitle');
    if (listTitle) {
        listTitle.textContent = `${bookPrefix}-${currentBookName}`;
    }
    
    const linkTitle = document.getElementById('linkTitle');
    if (linkTitle) {
        linkTitle.textContent = `${bookPrefix}-${currentBookName}`;
    }
    
    // 更新文章列表页面的教材显示
    const currentBookDisplay = document.getElementById('currentBookDisplay');
    if (currentBookDisplay) {
        currentBookDisplay.textContent = `${bookPrefix}-${currentBookName}`;
    }
}

// 显示课本选择弹窗
export function showBookModal() {
    document.getElementById('bookModal').classList.add('active');
}

// 关闭课本选择弹窗
export function closeBookModal() {
    document.getElementById('bookModal').classList.remove('active');
}

// 显示用户选择弹窗
export function showUserModal() {
    document.getElementById('userModal').classList.add('active');
    
    // 延迟绑定事件，确保DOM元素已加载
    setTimeout(() => {
        const exportBtn = document.getElementById('exportDataBtn');
        const importBtn = document.getElementById('importDataBtn');
        
        if (exportBtn) {
            // 移除旧的事件监听器，避免重复绑定
            exportBtn.removeEventListener('click', window.exportData);
            exportBtn.addEventListener('click', window.exportData);
        }
        
        if (importBtn) {
            // 移除旧的事件监听器，避免重复绑定
            importBtn.removeEventListener('click', window.importData);
            importBtn.addEventListener('click', window.importData);
        }
    }, 100);
}

// 关闭用户选择弹窗
export async function closeUserModal() {
    const selectedOption = document.querySelector('.user-option.selected');
    if (selectedOption) {
        setCurrentUser(selectedOption.dataset.user);
        setCurrentUserName(selectedOption.textContent);
        
        // 保存用户信息到localStorage
        localStorage.setItem('currentUser', currentUser);
        localStorage.setItem('currentUserName', currentUserName);
        
        // 清除该用户的课本信息，确保使用默认课本
        const bookKey = `userBook_${currentUser}`;
        localStorage.removeItem(bookKey);
        
        // 加载用户默认课本
        loadUserBook();
        
        // 保存当前课本信息到localStorage
        const bookData = {
            file: currentFile,
            name: currentBookName
        };
        localStorage.setItem(bookKey, JSON.stringify(bookData));
        
        // 更新UI上的用户名称显示
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = `${currentUserName}，快来学单词！`;
        }
        
        const currentUserDisplayElement = document.getElementById('currentUserDisplay');
        if (currentUserDisplayElement) {
            currentUserDisplayElement.textContent = currentUserName;
        }
        
        // 加载用户统计数据
        await loadUserStats();
        
        // 加载单词数据
        await loadPDF();
        
        // 更新打卡状态显示
        updateCheckInStatus();
    }
    document.getElementById('userModal').classList.remove('active');
}

// 更新统计显示
export function updateStatsDisplay() {
    console.log('[更新统计显示] 开始');
    console.log('[更新统计显示] currentUser:', currentUser);
    console.log('[更新统计显示] currentFile:', currentFile);
    console.log('[更新统计显示] words.length:', words.length);
    
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
        let totalCount = words.length;
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

// 打卡功能
export function checkIn() {
    const result = DataManager.checkIn(currentUser);
    if (result.success) {
        // 显示打卡成功提示
        alert(`打卡成功！获得 ${result.points} 积分，连续打卡 ${result.consecutiveDays} 天`);
        // 更新打卡状态
        updateCheckInStatus();
    } else {
        // 显示已打卡提示
        alert(result.message);
    }
}

// 更新打卡状态
export function updateCheckInStatus() {
    const status = DataManager.getCheckInStatus(currentUser);
    const checkinStatusElement = document.getElementById('checkinStatus');
    const checkinBtnElement = document.getElementById('checkinBtn');
    const consecutiveDaysElement = document.getElementById('consecutiveDays');
    const userPointsElement = document.getElementById('userPoints');
    
    if (checkinStatusElement) {
        checkinStatusElement.textContent = status.checkedIn ? '已打卡' : '未打卡';
        checkinStatusElement.className = `checkin-status ${status.checkedIn ? 'checked' : ''}`;
    }
    
    if (checkinBtnElement) {
        checkinBtnElement.textContent = status.checkedIn ? '今日已打卡' : '立即打卡';
        checkinBtnElement.disabled = status.checkedIn;
    }
    
    if (consecutiveDaysElement) {
        consecutiveDaysElement.textContent = status.consecutiveDays;
    }
    
    if (userPointsElement) {
        const points = DataManager.getUserPoints(currentUser);
        userPointsElement.textContent = points;
    }
}