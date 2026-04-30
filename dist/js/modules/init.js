// ES5版本的初始化模块

// 初始化应用
function initApp() {
    console.log('初始化应用...');
    // 检查本地存储中的用户信息
    checkUserInfo();
    // 初始化事件监听器
    initEventListeners();
}

// 检查用户信息
function checkUserInfo() {
    var savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        window.currentUser = JSON.parse(savedUser);
        window.currentUserName = window.currentUser.name;
        console.log('已加载用户:', window.currentUserName);
    } else {
        console.log('未找到用户信息，显示用户选择弹窗');
        showUserModal();
    }
}

// 初始化事件监听器
function initEventListeners() {
    console.log('初始化事件监听器...');
    // 这里可以添加事件监听器
}

// 导出函数
window.initApp = initApp;
window.checkUserInfo = checkUserInfo;
window.initEventListeners = initEventListeners;