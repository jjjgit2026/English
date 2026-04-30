// ES5版本的用户模块

// 用户模块对象
window.UserModule = {
    // 显示用户弹窗
    showUserModal: function() {
        var userModal = document.getElementById('userModal');
        if (userModal) {
            userModal.classList.add('active');
        }
    },

    // 关闭用户弹窗
    closeUserModal: function() {
        var userModal = document.getElementById('userModal');
        if (userModal) {
            userModal.classList.remove('active');
        }
    },

    // 显示课本弹窗
    showBookModal: function() {
        var bookModal = document.getElementById('bookModal');
        if (bookModal) {
            bookModal.classList.add('active');
        }
    },

    // 关闭课本弹窗
    closeBookModal: function() {
        var bookModal = document.getElementById('bookModal');
        if (bookModal) {
            bookModal.classList.remove('active');
        }
    },

    // 切换用户
    switchUser: function(userName) {
        console.log('切换用户:', userName);
        // 切换用户的逻辑
    },

    // 创建新用户
    createNewUser: function(userName) {
        console.log('创建新用户:', userName);
        // 创建新用户的逻辑
    },

    // 选择课本
    selectBook: function(bookFile, bookName) {
        console.log('选择课本:', bookName);
        // 选择课本的逻辑
    }
};