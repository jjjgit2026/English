// ES5版本的数据管理模块

// 数据管理对象
window.DataManager = {
    // 数据版本号
    DATA_VERSION: '1.0',
    
    // 获取本地日期字符串
    getLocalDateString: function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    },

    // 获取本地时间的ISO字符串
    getLocalISOString: function(date) {
        var localDate = new Date(date);
        var offset = localDate.getTimezoneOffset() * 60000;
        var localTime = localDate.getTime() - offset;
        return new Date(localTime).toISOString();
    },

    // 获取本周开始日期（周一）
    getWeekStartDate: function() {
        var date = new Date();
        var day = date.getDay();
        var diff = date.getDate() - day + (day === 0 ? -6 : 1);
        var weekStart = new Date(date.setDate(diff));
        var year = weekStart.getFullYear();
        var month = String(weekStart.getMonth() + 1).padStart(2, '0');
        var dayOfMonth = String(weekStart.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + dayOfMonth;
    },

    // 获取本月开始日期
    getMonthStartDate: function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        return year + '-' + month + '-01';
    },

    // 检查并更新学习目标
    checkAndUpdateGoals: function(userData) {
        var today = this.getLocalDateString();
        var currentWeekStart = this.getWeekStartDate();
        var currentMonthStart = this.getMonthStartDate();
        
        // 检查每周目标
        if (userData.goals.weekly.weekStart !== currentWeekStart) {
            userData.goals.weekly = {
                target: 100,
                current: 0,
                weekStart: currentWeekStart,
                completed: false
            };
        }
        
        // 检查每月目标
        if (userData.goals.monthly.monthStart !== currentMonthStart) {
            userData.goals.monthly = {
                target: 400,
                current: 0,
                monthStart: currentMonthStart,
                completed: false
            };
        }
        
        // 计算总学习量
        var totalLearning = parseInt(userData.total.learning) || 0;
        
        // 检查学习里程碑
        var self = this;
        userData.goals.milestones.forEach(function(milestone) {
            if (!milestone.completed && totalLearning >= milestone.target) {
                milestone.completed = true;
                if (!milestone.rewarded) {
                    var rewardPoints = 0;
                    switch (milestone.target) {
                        case 100:
                            rewardPoints = 10;
                            break;
                        case 500:
                            rewardPoints = 20;
                            break;
                        case 1000:
                            rewardPoints = 50;
                            break;
                        case 5000:
                            rewardPoints = 100;
                            break;
                        case 10000:
                            rewardPoints = 200;
                            break;
                    }
                    
                    if (rewardPoints > 0) {
                        userData.total.points = (parseFloat(userData.total.points) || 0) + rewardPoints;
                        self.addPointsHistory(userData, 'income', rewardPoints, '学习里程碑奖励 - 累计学习 ' + milestone.target + ' 个单词');
                        milestone.rewarded = true;
                        alert('恭喜你达成学习里程碑！累计学习 ' + milestone.target + ' 个单词，获得 ' + rewardPoints + ' 积分奖励！');
                    }
                }
            }
        });
    },

    // 更新学习进度并检查目标完成情况
    updateLearningProgress: function(userData, wordsCount) {
        // 检查每日目标完成情况
        var dailyTarget = 15;
        if (userData.today.learning >= dailyTarget && !userData.today.goalCompleted) {
            userData.today.goalCompleted = true;
            var rewardPoints = 2;
            userData.total.points = (parseFloat(userData.total.points) || 0) + rewardPoints;
            this.addPointsHistory(userData, 'income', rewardPoints, '每日学习目标完成奖励');
            alert('恭喜你完成每日学习目标！获得 ' + rewardPoints + ' 积分奖励！');
        }
        
        // 更新每周目标进度
        userData.goals.weekly.current += wordsCount;
        if (userData.goals.weekly.current >= userData.goals.weekly.target && !userData.goals.weekly.completed) {
            userData.goals.weekly.completed = true;
            var rewardPoints = 10;
            userData.total.points = (parseFloat(userData.total.points) || 0) + rewardPoints;
            this.addPointsHistory(userData, 'income', rewardPoints, '每周学习目标完成奖励');
            alert('恭喜你完成每周学习目标！获得 ' + rewardPoints + ' 积分奖励！');
        }
        
        // 更新每月目标进度
        userData.goals.monthly.current += wordsCount;
        if (userData.goals.monthly.current >= userData.goals.monthly.target && !userData.goals.monthly.completed) {
            userData.goals.monthly.completed = true;
            var rewardPoints = 20;
            userData.total.points = (parseFloat(userData.total.points) || 0) + rewardPoints;
            this.addPointsHistory(userData, 'income', rewardPoints, '每月学习目标完成奖励');
            alert('恭喜你完成每月学习目标！获得 ' + rewardPoints + ' 积分奖励！');
        }
        
        // 检查学习里程碑
        this.checkAndUpdateGoals(userData);
    },

    // 获取用户数据
    getUserData: function(user) {
        try {
            var userKey = 'userStats_' + user;
            var data = localStorage.getItem(userKey);
            
            if (data) {
                var userData;
                try {
                    userData = JSON.parse(data);
                } catch (parseError) {
                    console.error('[DataManager] getUserData - 解析用户数据失败:', parseError);
                    userData = {
                        version: this.DATA_VERSION,
                        today: {
                            date: this.getLocalDateString(),
                            learning: 0,
                            testing: 0,
                            correct: 0,
                            error: 0,
                            checkedIn: false
                        },
                        total: {
                            learning: 0,
                            testing: 0,
                            correct: 0,
                            error: 0,
                            points: 0,
                            consecutiveDays: 0,
                            totalCheckins: 0
                        },
                        books: {},
                        checkinHistory: [],
                        pointsHistory: [],
                        pets: [],
                        goals: {
                            weekly: {
                                target: 100,
                                current: 0,
                                weekStart: this.getWeekStartDate(),
                                completed: false
                            },
                            monthly: {
                                target: 400,
                                current: 0,
                                monthStart: this.getMonthStartDate(),
                                completed: false
                            },
                            milestones: [
                                { target: 100, completed: false, rewarded: false },
                                { target: 500, completed: false, rewarded: false },
                                { target: 1000, completed: false, rewarded: false },
                                { target: 5000, completed: false, rewarded: false },
                                { target: 10000, completed: false, rewarded: false }
                            ]
                        }
                    };
                }
                
                if (userData.version && userData.version === this.DATA_VERSION) {
                    if (!userData.today || typeof userData.today !== 'object') {
                        userData.today = {
                            date: this.getLocalDateString(),
                            learning: 0,
                            testing: 0,
                            correct: 0,
                            error: 0,
                            checkedIn: false,
                            goalCompleted: false
                        };
                    } else {
                        userData.today.date = userData.today.date || this.getLocalDateString();
                        userData.today.learning = parseInt(userData.today.learning) || 0;
                        userData.today.testing = parseInt(userData.today.testing) || 0;
                        userData.today.correct = parseInt(userData.today.correct) || 0;
                        userData.today.error = parseInt(userData.today.error) || 0;
                        userData.today.checkedIn = userData.today.checkedIn || false;
                        userData.today.goalCompleted = userData.today.goalCompleted || false;
                    }
                    
                    if (!userData.total || typeof userData.total !== 'object') {
                        userData.total = {
                            learning: 0,
                            testing: 0,
                            correct: 0,
                            error: 0,
                            points: 0,
                            consecutiveDays: 0,
                            totalCheckins: 0
                        };
                    } else {
                        userData.total.learning = parseInt(userData.total.learning) || 0;
                        userData.total.testing = parseInt(userData.total.testing) || 0;
                        userData.total.correct = parseInt(userData.total.correct) || 0;
                        userData.total.error = parseInt(userData.total.error) || 0;
                        userData.total.points = parseFloat(userData.total.points) || 0;
                        userData.total.consecutiveDays = parseInt(userData.total.consecutiveDays) || 0;
                        userData.total.totalCheckins = parseInt(userData.total.totalCheckins) || 0;
                    }
                    
                    if (!userData.books || typeof userData.books !== 'object') {
                        userData.books = {};
                    } else {
                        for (var bookFile in userData.books) {
                            if (typeof userData.books[bookFile] !== 'object') {
                                userData.books[bookFile] = {
                                    totalWords: 0,
                                    learnedCount: 0
                                };
                            } else {
                                userData.books[bookFile].totalWords = parseInt(userData.books[bookFile].totalWords) || 0;
                                userData.books[bookFile].learnedCount = parseInt(userData.books[bookFile].learnedCount) || 0;
                            }
                        }
                    }
                    
                    if (!userData.goals || typeof userData.goals !== 'object') {
                        userData.goals = {
                            weekly: {
                                target: 100,
                                current: 0,
                                weekStart: this.getWeekStartDate(),
                                completed: false
                            },
                            monthly: {
                                target: 400,
                                current: 0,
                                monthStart: this.getMonthStartDate(),
                                completed: false
                            },
                            milestones: [
                                { target: 100, completed: false, rewarded: false },
                                { target: 500, completed: false, rewarded: false },
                                { target: 1000, completed: false, rewarded: false },
                                { target: 5000, completed: false, rewarded: false },
                                { target: 10000, completed: false, rewarded: false }
                            ]
                        };
                    } else {
                        if (!userData.goals.weekly || typeof userData.goals.weekly !== 'object') {
                            userData.goals.weekly = {
                                target: 100,
                                current: 0,
                                weekStart: this.getWeekStartDate(),
                                completed: false
                            };
                        } else {
                            userData.goals.weekly.target = userData.goals.weekly.target || 100;
                            userData.goals.weekly.current = parseInt(userData.goals.weekly.current) || 0;
                            userData.goals.weekly.weekStart = userData.goals.weekly.weekStart || this.getWeekStartDate();
                            userData.goals.weekly.completed = userData.goals.weekly.completed || false;
                        }
                        
                        if (!userData.goals.monthly || typeof userData.goals.monthly !== 'object') {
                            userData.goals.monthly = {
                                target: 400,
                                current: 0,
                                monthStart: this.getMonthStartDate(),
                                completed: false
                            };
                        } else {
                            userData.goals.monthly.target = userData.goals.monthly.target || 400;
                            userData.goals.monthly.current = parseInt(userData.goals.monthly.current) || 0;
                            userData.goals.monthly.monthStart = userData.goals.monthly.monthStart || this.getMonthStartDate();
                            userData.goals.monthly.completed = userData.goals.monthly.completed || false;
                        }
                        
                        if (!userData.goals.milestones || !Array.isArray(userData.goals.milestones)) {
                            userData.goals.milestones = [
                                { target: 100, completed: false, rewarded: false },
                                { target: 500, completed: false, rewarded: false },
                                { target: 1000, completed: false, rewarded: false },
                                { target: 5000, completed: false, rewarded: false },
                                { target: 10000, completed: false, rewarded: false }
                            ];
                        }
                    }
                    
                    if (!userData.wordLearningRecords || typeof userData.wordLearningRecords !== 'object') {
                        userData.wordLearningRecords = {};
                    }
                    
                    if (!userData.masteredWords || typeof userData.masteredWords !== 'object') {
                        userData.masteredWords = {};
                    }
                    
                    if (!userData.dailyTasks || typeof userData.dailyTasks !== 'object') {
                        userData.dailyTasks = {};
                    }
                    
                    this.checkAndUpdateGoals(userData);
                    
                    return userData;
                }
                
                userData.version = this.DATA_VERSION;
                
                if (!userData.today || typeof userData.today !== 'object') {
                    userData.today = {
                        date: this.getLocalDateString(),
                        learning: 0,
                        testing: 0,
                        correct: 0,
                        error: 0,
                        checkedIn: false
                    };
                } else {
                    userData.today.date = userData.today.date || this.getLocalDateString();
                    userData.today.learning = parseInt(userData.today.learning) || 0;
                    userData.today.testing = parseInt(userData.today.testing) || 0;
                    userData.today.correct = parseInt(userData.today.correct) || 0;
                    userData.today.error = parseInt(userData.today.error) || 0;
                    userData.today.checkedIn = userData.today.checkedIn || false;
                    userData.today.goalCompleted = userData.today.goalCompleted || false;
                }
                
                if (!userData.total || typeof userData.total !== 'object') {
                    userData.total = {
                        learning: 0,
                        testing: 0,
                        correct: 0,
                        error: 0,
                        points: 0,
                        consecutiveDays: 0,
                        totalCheckins: 0
                    };
                } else {
                    userData.total.learning = parseInt(userData.total.learning) || 0;
                    userData.total.testing = parseInt(userData.total.testing) || 0;
                    userData.total.correct = parseInt(userData.total.correct) || 0;
                    userData.total.error = parseInt(userData.total.error) || 0;
                    userData.total.points = parseFloat(userData.total.points) || 0;
                    userData.total.consecutiveDays = parseInt(userData.total.consecutiveDays) || 0;
                    userData.total.totalCheckins = parseInt(userData.total.totalCheckins) || 0;
                }
                
                if (!userData.books || typeof userData.books !== 'object') {
                    userData.books = {};
                } else {
                    for (var bookFile in userData.books) {
                        if (typeof userData.books[bookFile] !== 'object') {
                            userData.books[bookFile] = {
                                totalWords: 0,
                                learnedCount: 0
                            };
                        } else {
                            if (userData.books[bookFile].learnedWords && Array.isArray(userData.books[bookFile].learnedWords)) {
                                userData.books[bookFile].learnedCount = userData.books[bookFile].learnedWords.length;
                                delete userData.books[bookFile].learnedWords;
                            }
                            userData.books[bookFile].totalWords = parseInt(userData.books[bookFile].totalWords) || 0;
                            userData.books[bookFile].learnedCount = parseInt(userData.books[bookFile].learnedCount) || 0;
                        }
                    }
                }
                
                if (!userData.checkinHistory || !Array.isArray(userData.checkinHistory)) {
                    userData.checkinHistory = [];
                } else {
                    try {
                        userData.checkinHistory = userData.checkinHistory.map(function(item) {
                            if (typeof item === 'string') {
                                return { date: item, points: 5 };
                            }
                            return item;
                        });
                    } catch (mapError) {
                        console.error('转换打卡历史失败:', mapError);
                        userData.checkinHistory = [];
                    }
                }
                
                if (!userData.wordLearningRecords || typeof userData.wordLearningRecords !== 'object') {
                    userData.wordLearningRecords = {};
                }
                
                if (!userData.masteredWords || typeof userData.masteredWords !== 'object') {
                    userData.masteredWords = {};
                }
                
                if (!userData.dailyTasks || typeof userData.dailyTasks !== 'object') {
                    userData.dailyTasks = {};
                }
                
                if (!userData.today || typeof userData.today !== 'object') {
                    userData.today = {
                        date: this.getLocalDateString(),
                        learning: 0,
                        testing: 0,
                        correct: 0,
                        error: 0,
                        checkedIn: false,
                        goalCompleted: false,
                        newWordsLearned: 0,
                        reviewWordsCompleted: 0
                    };
                }
                
                if (!userData.goals || typeof userData.goals !== 'object') {
                    userData.goals = {
                        weekly: {
                            target: 100,
                            current: 0,
                            weekStart: this.getWeekStartDate(),
                            completed: false
                        },
                        monthly: {
                            target: 400,
                            current: 0,
                            monthStart: this.getMonthStartDate(),
                            completed: false
                        },
                        milestones: [
                            { target: 100, completed: false, rewarded: false },
                            { target: 500, completed: false, rewarded: false },
                            { target: 1000, completed: false, rewarded: false },
                            { target: 5000, completed: false, rewarded: false },
                            { target: 10000, completed: false, rewarded: false }
                        ]
                    };
                }
                
                this.checkAndUpdateGoals(userData);
                
                try {
                    this.saveUserData(user, userData);
                } catch (saveError) {
                    console.error('[DataManager] 保存转换后的数据失败:', saveError);
                }
                
                return userData;
            } else {
                var defaultData = {
                    version: this.DATA_VERSION,
                    today: {
                        date: this.getLocalDateString(),
                        learning: 0,
                        testing: 0,
                        correct: 0,
                        error: 0,
                        checkedIn: false
                    },
                    total: {
                        learning: 0,
                        testing: 0,
                        correct: 0,
                        error: 0,
                        points: 0,
                        consecutiveDays: 0,
                        totalCheckins: 0
                    },
                    books: {},
                    checkinHistory: [],
                    pointsHistory: [],
                    pets: [],
                    goals: {
                        weekly: {
                            target: 100,
                            current: 0,
                            weekStart: this.getWeekStartDate(),
                            completed: false
                        },
                        monthly: {
                            target: 400,
                            current: 0,
                            monthStart: this.getMonthStartDate(),
                            completed: false
                        },
                        milestones: [
                            { target: 100, completed: false, rewarded: false },
                            { target: 500, completed: false, rewarded: false },
                            { target: 1000, completed: false, rewarded: false },
                            { target: 5000, completed: false, rewarded: false },
                            { target: 10000, completed: false, rewarded: false }
                        ]
                    }
                };
                
                try {
                    var userKey = 'userStats_' + user;
                    localStorage.setItem(userKey, JSON.stringify(defaultData));
                } catch (saveError) {
                    console.error('[DataManager] 保存默认数据失败:', saveError);
                }
                
                return defaultData;
            }
        } catch (error) {
            console.error('[DataManager] getUserData - 获取用户数据失败:', error);
            var errorData = {
                version: this.DATA_VERSION,
                today: {
                    date: this.getLocalDateString(),
                    learning: 0,
                    testing: 0,
                    correct: 0,
                    error: 0,
                    checkedIn: false
                },
                total: {
                    learning: 0,
                    testing: 0,
                    correct: 0,
                    error: 0,
                    points: 0,
                    consecutiveDays: 0,
                    totalCheckins: 0
                },
                books: {},
                checkinHistory: [],
                pointsHistory: [],
                pets: [],
                goals: {
                    weekly: {
                        target: 100,
                        current: 0,
                        weekStart: this.getWeekStartDate(),
                        completed: false
                    },
                    monthly: {
                        target: 400,
                        current: 0,
                        monthStart: this.getMonthStartDate(),
                        completed: false
                    },
                    milestones: [
                        { target: 100, completed: false, rewarded: false },
                        { target: 500, completed: false, rewarded: false },
                        { target: 1000, completed: false, rewarded: false },
                        { target: 5000, completed: false, rewarded: false },
                        { target: 10000, completed: false, rewarded: false }
                    ]
                }
            };
            return errorData;
        }
    },

    // 保存用户数据
    saveUserData: function(user, data) {
        try {
            var userKey = 'userStats_' + user;
            
            var safeData = {
                version: this.DATA_VERSION,
                wordLearningRecords: typeof data.wordLearningRecords === 'object' && data.wordLearningRecords !== null ? data.wordLearningRecords : {},
                masteredWords: typeof data.masteredWords === 'object' && data.masteredWords !== null ? data.masteredWords : {},
                dailyTasks: typeof data.dailyTasks === 'object' && data.dailyTasks !== null ? data.dailyTasks : {},
                today: typeof data.today === 'object' && data.today !== null ? {
                    date: data.today.date || this.getLocalDateString(),
                    learning: data.today.learning || 0,
                    testing: data.today.testing || 0,
                    correct: data.today.correct || 0,
                    error: data.today.error || 0,
                    checkedIn: data.today.checkedIn || false,
                    goalCompleted: data.today.goalCompleted || false,
                    newWordsLearned: data.today.newWordsLearned || 0,
                    reviewWordsCompleted: data.today.reviewWordsCompleted || 0
                } : {
                    date: this.getLocalDateString(),
                    learning: 0,
                    testing: 0,
                    correct: 0,
                    error: 0,
                    checkedIn: false,
                    goalCompleted: false,
                    newWordsLearned: 0,
                    reviewWordsCompleted: 0
                },
                total: typeof data.total === 'object' && data.total !== null ? {
                    learning: parseInt(data.total.learning) || 0,
                    testing: parseInt(data.total.testing) || 0,
                    correct: parseInt(data.total.correct) || 0,
                    error: parseInt(data.total.error) || 0,
                    points: parseFloat(data.total.points) || 0,
                    consecutiveDays: parseInt(data.total.consecutiveDays) || 0,
                    totalCheckins: parseInt(data.total.totalCheckins) || 0
                } : {
                    learning: 0,
                    testing: 0,
                    correct: 0,
                    error: 0,
                    points: 0,
                    consecutiveDays: 0,
                    totalCheckins: 0
                },
                books: typeof data.books === 'object' && data.books !== null ? (function() {
                    var safeBooks = {};
                    for (var bookFile in data.books) {
                        if (typeof data.books[bookFile] === 'object' && data.books[bookFile] !== null) {
                            safeBooks[bookFile] = {
                                totalWords: parseInt(data.books[bookFile].totalWords) || 0,
                                learnedCount: parseInt(data.books[bookFile].learnedCount) || 0
                            };
                        } else {
                            safeBooks[bookFile] = {
                                totalWords: 0,
                                learnedCount: 0
                            };
                        }
                    }
                    return safeBooks;
                })() : {},
                checkinHistory: Array.isArray(data.checkinHistory) ? data.checkinHistory : [],
                pointsHistory: Array.isArray(data.pointsHistory) ? data.pointsHistory : [],
                pets: Array.isArray(data.pets) ? data.pets : [],
                goals: typeof data.goals === 'object' && data.goals !== null ? {
                    weekly: typeof data.goals.weekly === 'object' && data.goals.weekly !== null ? {
                        target: data.goals.weekly.target || 100,
                        current: parseInt(data.goals.weekly.current) || 0,
                        weekStart: data.goals.weekly.weekStart || this.getWeekStartDate(),
                        completed: data.goals.weekly.completed || false
                    } : {
                        target: 100,
                        current: 0,
                        weekStart: this.getWeekStartDate(),
                        completed: false
                    },
                    monthly: typeof data.goals.monthly === 'object' && data.goals.monthly !== null ? {
                        target: data.goals.monthly.target || 400,
                        current: parseInt(data.goals.monthly.current) || 0,
                        monthStart: data.goals.monthly.monthStart || this.getMonthStartDate(),
                        completed: data.goals.monthly.completed || false
                    } : {
                        target: 400,
                        current: 0,
                        monthStart: this.getMonthStartDate(),
                        completed: false
                    },
                    milestones: Array.isArray(data.goals.milestones) ? data.goals.milestones : [
                        { target: 100, completed: false, rewarded: false },
                        { target: 500, completed: false, rewarded: false },
                        { target: 1000, completed: false, rewarded: false },
                        { target: 5000, completed: false, rewarded: false },
                        { target: 10000, completed: false, rewarded: false }
                    ]
                } : {
                    weekly: {
                        target: 100,
                        current: 0,
                        weekStart: this.getWeekStartDate(),
                        completed: false
                    },
                    monthly: {
                        target: 400,
                        current: 0,
                        monthStart: this.getMonthStartDate(),
                        completed: false
                    },
                    milestones: [
                        { target: 100, completed: false, rewarded: false },
                        { target: 500, completed: false, rewarded: false },
                        { target: 1000, completed: false, rewarded: false },
                        { target: 5000, completed: false, rewarded: false },
                        { target: 10000, completed: false, rewarded: false }
                    ]
                }
            };
            
            if (safeData.books) {
                for (var bookFile in safeData.books) {
                    if (typeof safeData.books[bookFile] !== 'object') {
                        safeData.books[bookFile] = {
                            totalWords: 0,
                            learnedCount: 0
                        };
                    } else {
                        safeData.books[bookFile].totalWords = safeData.books[bookFile].totalWords || 0;
                        safeData.books[bookFile].learnedCount = safeData.books[bookFile].learnedCount || 0;
                    }
                }
            }
            
            localStorage.setItem(userKey, JSON.stringify(safeData));
        } catch (error) {
            console.error('[DataManager] saveUserData - 保存用户数据失败:', error);
        }
    },

    // 添加积分历史
    addPointsHistory: function(userData, type, amount, description) {
        if (!userData.pointsHistory) {
            userData.pointsHistory = [];
        }
        userData.pointsHistory.push({
            date: new Date().toISOString(),
            type: type,
            amount: amount,
            description: description
        });
    },

    // 获取错误单词
    getErrorWords: function(user) {
        var userData = this.getUserData(user);
        return userData.errorWords || [];
    },

    // 添加错误单词
    addErrorWord: function(user, word) {
        var userData = this.getUserData(user);
        if (!userData.errorWords) {
            userData.errorWords = [];
        }
        var exists = userData.errorWords.some(function(item) {
            return item.word === word.word;
        });
        if (!exists) {
            userData.errorWords.push(word);
            this.saveUserData(user, userData);
        }
    },

    // 初始化课本数据
    initBookData: function(user, bookFile, totalWords) {
        var userData = this.getUserData(user);
        if (!userData.books[bookFile]) {
            userData.books[bookFile] = {
                totalWords: totalWords,
                learnedCount: 0
            };
            this.saveUserData(user, userData);
        } else {
            userData.books[bookFile].totalWords = totalWords;
            this.saveUserData(user, userData);
        }
    }
};