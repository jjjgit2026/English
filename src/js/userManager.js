// 用户管理模块

// 全局变量
let currentUser = 'youyou';
let currentUserName = '悠悠';
let currentFile = '3下.pdf';
let currentBookName = '三年级下册';

/**
 * 检查用户信息
 * @returns {boolean} 是否成功加载用户信息
 */
export function checkUserInfo() {
    // 从localStorage获取用户信息
    const savedUser = localStorage.getItem('currentUser');
    const savedUserName = localStorage.getItem('currentUserName');
    
    if (savedUser && savedUserName) {
        // 使用存储的用户信息
        currentUser = savedUser;
        currentUserName = savedUserName;
        
        // 更新UI上的用户名称显示
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = `${currentUserName}，快来学单词吧！加油哦！`;
        }
        
        const currentUserDisplayElement = document.getElementById('currentUserDisplay');
        if (currentUserDisplayElement) {
            currentUserDisplayElement.textContent = currentUserName;
        }
        
        return true;
    } else {
        // 显示用户选择弹窗
        document.getElementById('userModal').classList.add('active');
        return false;
    }
}

/**
 * 带用户检查的函数包装器
 * @param {Function} func - 要执行的函数
 * @returns {Function} 包装后的函数
 */
export function withUserCheck(func) {
    return function() {
        if (checkUserInfo()) {
            func.apply(this, arguments);
        }
    };
}

/**
 * 加载用户最近学习的课本或默认课本
 */
export function loadUserBook() {
    console.log('[加载用户课本] 开始');
    try {
        const bookKey = `userBook_${currentUser}`;
        console.log('[加载用户课本] bookKey:', bookKey);
        const savedBook = localStorage.getItem(bookKey);
        console.log('[加载用户课本] savedBook:', savedBook);
        
        if (savedBook) {
            const bookData = JSON.parse(savedBook);
            currentFile = bookData.file;
            currentBookName = bookData.name;
            console.log('[加载用户课本] 加载用户保存的课本:', currentFile, currentBookName);
        } else {
            // 根据用户设置默认课本
            switch (currentUser) {
                case 'qiuqiu':
                    currentFile = '7下.pdf';
                    currentBookName = '七年级下册';
                    break;
                case 'youyou':
                    currentFile = '5下.pdf';
                    currentBookName = '五年级下册';
                    break;
                case 'diandian':
                    currentFile = '3上.pdf';
                    currentBookName = '三年级上册';
                    break;
                default:
                    currentFile = '3下.pdf';
                    currentBookName = '三年级下册';
            }
            console.log('[加载用户课本] 加载用户默认课本:', currentFile, currentBookName);
        }
        updateBookDisplay();
    } catch (error) {
        console.error('加载用户课本失败:', error);
        // 发生错误时根据用户设置默认课本
        switch (currentUser) {
            case 'qiuqiu':
                currentFile = '7下.pdf';
                currentBookName = '七年级下册';
                break;
            case 'youyou':
                currentFile = '5下.pdf';
                currentBookName = '五年级下册';
                break;
            case 'diandian':
                currentFile = '3上.pdf';
                currentBookName = '三年级上册';
                break;
            default:
                currentFile = '3下.pdf';
                currentBookName = '三年级下册';
        }
        console.log('加载默认课本（错误处理）:', currentFile, currentBookName);
        updateBookDisplay();
    } finally {
        console.log('[加载用户课本] 结束');
    }
}

/**
 * 保存用户选择的课本
 */
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

/**
 * 关闭用户选择弹窗
 */
export async function closeUserModal() {
    const selectedOption = document.querySelector('.user-option.selected');
    if (selectedOption) {
        currentUser = selectedOption.dataset.user;
        currentUserName = selectedOption.textContent;
        
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
            userNameElement.textContent = `${currentUserName}，快来学单词吧！加油哦！`;
        }
        
        const currentUserDisplayElement = document.getElementById('currentUserDisplay');
        if (currentUserDisplayElement) {
            currentUserDisplayElement.textContent = currentUserName;
        }
        
        // 加载用户统计数据
        await loadUserStats();
        
        // 加载单词数据
        await loadPDF();
    }
    document.getElementById('userModal').classList.remove('active');
}

/**
 * 更新教材显示
 */
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
}

/**
 * 获取当前用户
 * @returns {string} 当前用户
 */
export function getCurrentUser() {
    return currentUser;
}

/**
 * 获取当前用户名称
 * @returns {string} 当前用户名称
 */
export function getCurrentUserName() {
    return currentUserName;
}

/**
 * 获取当前课本文件
 * @returns {string} 当前课本文件
 */
export function getCurrentFile() {
    return currentFile;
}

/**
 * 获取当前课本名称
 * @returns {string} 当前课本名称
 */
export function getCurrentBookName() {
    return currentBookName;
}

/**
 * 设置当前用户
 * @param {string} user - 用户ID
 */
export function setCurrentUser(user) {
    currentUser = user;
}

/**
 * 设置当前用户名称
 * @param {string} userName - 用户名称
 */
export function setCurrentUserName(userName) {
    currentUserName = userName;
}

/**
 * 设置当前课本文件
 * @param {string} file - 课本文件
 */
export function setCurrentFile(file) {
    currentFile = file;
}

/**
 * 设置当前课本名称
 * @param {string} bookName - 课本名称
 */
export function setCurrentBookName(bookName) {
    currentBookName = bookName;
}

// 导入其他模块的函数
import { loadUserStats } from './statsManager.js';
import { loadPDF } from './wordManager.js';
