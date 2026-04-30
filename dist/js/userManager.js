// ES5版本的用户管理模块

// 用户管理对象
window.UserManager = {
    // 保存用户
    saveUser: function(user) {
        try {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('currentUserName', user.name);
            return true;
        } catch (error) {
            console.error('[UserManager] saveUser - 保存用户失败:', error);
            return false;
        }
    },

    // 获取当前用户
    getCurrentUser: function() {
        try {
            var user = localStorage.getItem('currentUser');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('[UserManager] getCurrentUser - 获取当前用户失败:', error);
            return null;
        }
    },

    // 获取当前用户名称
    getCurrentUserName: function() {
        try {
            return localStorage.getItem('currentUserName') || '';
        } catch (error) {
            console.error('[UserManager] getCurrentUserName - 获取当前用户名称失败:', error);
            return '';
        }
    },

    // 检查用户是否存在
    userExists: function(userName) {
        try {
            var users = this.getUsers();
            return users.some(function(user) {
                return user.name === userName;
            });
        } catch (error) {
            console.error('[UserManager] userExists - 检查用户是否存在失败:', error);
            return false;
        }
    },

    // 获取所有用户
    getUsers: function() {
        try {
            var users = localStorage.getItem('users');
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('[UserManager] getUsers - 获取所有用户失败:', error);
            return [];
        }
    },

    // 添加用户
    addUser: function(user) {
        try {
            var users = this.getUsers();
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('[UserManager] addUser - 添加用户失败:', error);
            return false;
        }
    },

    // 初始化用户数据
    initializeUserData: function(userName) {
        try {
            var userData = {
                name: userName,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            return userData;
        } catch (error) {
            console.error('[UserManager] initializeUserData - 初始化用户数据失败:', error);
            return null;
        }
    },

    // 更新用户最后登录时间
    updateLastLogin: function(userName) {
        try {
            var users = this.getUsers();
            var user = users.find(function(user) {
                return user.name === userName;
            });
            if (user) {
                user.lastLogin = new Date().toISOString();
                localStorage.setItem('users', JSON.stringify(users));
                return true;
            }
            return false;
        } catch (error) {
            console.error('[UserManager] updateLastLogin - 更新用户最后登录时间失败:', error);
            return false;
        }
    }
};