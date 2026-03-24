// 数据管理模块
export default class DataManager {
    static getLocalDateString() {
        const date = new Date();
        // 使用 getFullYear, getMonth, getDate 确保获取本地日期
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 数据版本号
    static DATA_VERSION = '1.0';

    static getUserData(user) {
        try {
            const userKey = `userStats_${user}`;
            const data = localStorage.getItem(userKey);
            console.log('[DataManager] getUserData - user:', user);
            console.log('[DataManager] getUserData - userKey:', userKey);
            console.log('[DataManager] getUserData - 从localStorage获取的数据:', data);
            
            if (data) {
                // 解析现有数据
                let userData;
                try {
                    userData = JSON.parse(data);
                    console.log('[DataManager] getUserData - 解析后的数据:', userData);
                } catch (parseError) {
                    console.error('[DataManager] getUserData - 解析用户数据失败:', parseError);
                    // 解析失败时使用默认数据
                    alert('用户数据解析失败，正在重置数据...');
                    userData = {
                        version: DataManager.DATA_VERSION,
                        errorWords: [],
                        today: {
                            date: DataManager.getLocalDateString(),
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
                        pets: []
                    };
                }
                
                // 检查数据版本
                console.log('[DataManager] 检查数据版本:', userData.version, 'vs', DataManager.DATA_VERSION);
                console.log('[DataManager] 版本类型:', typeof userData.version, 'vs', typeof DataManager.DATA_VERSION);
                if (userData.version && userData.version === DataManager.DATA_VERSION) {
                    console.log('[DataManager] 数据版本一致，无需转换');
                    
                    // 确保 today 对象存在且字段完整
                    if (!userData.today || typeof userData.today !== 'object') {
                        userData.today = {
                            date: DataManager.getLocalDateString(),
                            learning: 0,
                            testing: 0,
                            correct: 0,
                            error: 0,
                            checkedIn: false
                        };
                    } else {
                        // 补全 today 字段，确保所有字段都存在
                        userData.today.date = userData.today.date || DataManager.getLocalDateString();
                        // 确保字段都是有效的数字，避免NaN值
                        userData.today.learning = parseInt(userData.today.learning) || 0;
                        userData.today.testing = parseInt(userData.today.testing) || 0;
                        userData.today.correct = parseInt(userData.today.correct) || 0;
                        userData.today.error = parseInt(userData.today.error) || 0;
                        userData.today.checkedIn = userData.today.checkedIn || false;
                    }
                    
                    // 确保 total 对象存在且字段完整
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
                        // 补全 total 字段，确保所有字段都存在
                        // 确保字段都是有效的数字，避免NaN值
                        userData.total.learning = parseInt(userData.total.learning) || 0;
                        userData.total.testing = parseInt(userData.total.testing) || 0;
                        userData.total.correct = parseInt(userData.total.correct) || 0;
                        userData.total.error = parseInt(userData.total.error) || 0;
                        userData.total.points = parseFloat(userData.total.points) || 0;
                        userData.total.consecutiveDays = parseInt(userData.total.consecutiveDays) || 0;
                        userData.total.totalCheckins = parseInt(userData.total.totalCheckins) || 0;
                    }
                    
                    // 确保 books 对象存在且每个课本都有必要的字段
                    if (!userData.books || typeof userData.books !== 'object') {
                        userData.books = {};
                    } else {
                        // 确保每个课本都有必要的字段
                        for (const bookFile in userData.books) {
                            if (typeof userData.books[bookFile] !== 'object') {
                                userData.books[bookFile] = {
                                    totalWords: 0,
                                    learnedCount: 0
                                };
                            } else {
                                // 确保必要字段存在且是有效的数字，避免NaN值
                                userData.books[bookFile].totalWords = parseInt(userData.books[bookFile].totalWords) || 0;
                                userData.books[bookFile].learnedCount = parseInt(userData.books[bookFile].learnedCount) || 0;
                            }
                        }
                    }
                    
                    console.log('[DataManager] getUserData - 返回的数据:', userData);
                    return userData;
                }
                
                // 版本不一致，需要转换数据
                console.log('[DataManager] 数据版本不一致，需要转换');
                
                // 确保版本字段存在
                userData.version = DataManager.DATA_VERSION;
                
                // 确保 today 对象存在且字段完整
                if (!userData.today || typeof userData.today !== 'object') {
                    userData.today = {
                        date: DataManager.getLocalDateString(),
                        learning: 0,
                        testing: 0,
                        correct: 0,
                        error: 0,
                        checkedIn: false
                    };
                } else {
                        // 补全 today 字段，确保所有字段都存在
                        userData.today.date = userData.today.date || DataManager.getLocalDateString();
                        // 确保字段都是有效的数字，避免NaN值
                        userData.today.learning = parseInt(userData.today.learning) || 0;
                        userData.today.testing = parseInt(userData.today.testing) || 0;
                        userData.today.correct = parseInt(userData.today.correct) || 0;
                        userData.today.error = parseInt(userData.today.error) || 0;
                        userData.today.checkedIn = userData.today.checkedIn || false;
                    }
                
                // 确保 total 对象存在且字段完整
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
                    // 补全 total 字段，确保所有字段都存在
                    // 确保字段都是有效的数字，避免NaN值
                    userData.total.learning = parseInt(userData.total.learning) || 0;
                    userData.total.testing = parseInt(userData.total.testing) || 0;
                    userData.total.correct = parseInt(userData.total.correct) || 0;
                    userData.total.error = parseInt(userData.total.error) || 0;
                    userData.total.points = parseFloat(userData.total.points) || 0;
                    userData.total.consecutiveDays = parseInt(userData.total.consecutiveDays) || 0;
                    userData.total.totalCheckins = parseInt(userData.total.totalCheckins) || 0;
                }
                
                // 确保 books 对象存在
                if (!userData.books || typeof userData.books !== 'object') {
                    userData.books = {};
                } else {
                    // 转换旧的 learnedWords 数组格式为新的 learnedCount 格式
                    for (const bookFile in userData.books) {
                        if (typeof userData.books[bookFile] !== 'object') {
                            userData.books[bookFile] = {
                                totalWords: 0,
                                learnedCount: 0
                            };
                        } else {
                            // 转换旧格式数据
                            if (userData.books[bookFile].learnedWords && Array.isArray(userData.books[bookFile].learnedWords)) {
                                console.log('[DataManager] 检测到旧格式数据，转换为新格式:', bookFile);
                                userData.books[bookFile].learnedCount = userData.books[bookFile].learnedWords.length;
                                // 删除旧格式数据
                                delete userData.books[bookFile].learnedWords;
                            }
                            // 确保必要字段存在且是有效的数字，避免NaN值
                            userData.books[bookFile].totalWords = parseInt(userData.books[bookFile].totalWords) || 0;
                            userData.books[bookFile].learnedCount = parseInt(userData.books[bookFile].learnedCount) || 0;
                        }
                    }
                }
                
                // 确保 checkinHistory 数组存在并转换为新格式
                if (!userData.checkinHistory || !Array.isArray(userData.checkinHistory)) {
                    userData.checkinHistory = [];
                } else {
                    // 转换旧的字符串格式为新的对象格式
                    try {
                        userData.checkinHistory = userData.checkinHistory.map(item => {
                            if (typeof item === 'string') {
                                return { date: item, points: 5 }; // 默认为5积分
                            }
                            return item;
                        });
                    } catch (mapError) {
                        console.error('转换打卡历史失败:', mapError);
                        userData.checkinHistory = [];
                    }
                }
                
                // 确保 errorWords 数组存在
                if (!userData.errorWords || !Array.isArray(userData.errorWords)) {
                    userData.errorWords = [];
                }
                
                // 转换完成后保存回 localStorage，确保下次加载时使用新格式
                try {
                    // 使用 saveUserData 函数来保存数据，确保数据结构完整
                    DataManager.saveUserData(user, userData);
                    console.log('[DataManager] 转换后的数据已保存回 localStorage');
                } catch (saveError) {
                    console.error('[DataManager] 保存转换后的数据失败:', saveError);
                }
                
                console.log('[DataManager] getUserData - 返回的数据:', userData);
                return userData;
            } else {
                // 返回默认数据结构
                const defaultData = {
                    version: DataManager.DATA_VERSION,
                    errorWords: [],
                    today: {
                        date: DataManager.getLocalDateString(),
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
                    pets: []
                };
                
                // 保存默认数据到 localStorage，确保下次加载时使用
                try {
                    const userKey = `userStats_${user}`;
                    localStorage.setItem(userKey, JSON.stringify(defaultData));
                    console.log('[DataManager] 默认数据已保存到 localStorage');
                } catch (saveError) {
                    console.error('[DataManager] 保存默认数据失败:', saveError);
                }
                
                console.log('[DataManager] getUserData - 返回默认数据:', defaultData);
                return defaultData;
            }
        } catch (error) {
            console.error('[DataManager] getUserData - 获取用户数据失败:', error);
            const errorData = {
                version: DataManager.DATA_VERSION,
                errorWords: [],
                today: {
                    date: DataManager.getLocalDateString(),
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
                pets: []
            };
            console.log('[DataManager] getUserData - 返回错误数据:', errorData);
            return errorData;
        }
    }

    static saveUserData(user, data) {
        console.log('[DataManager] saveUserData 开始');
        console.log('[DataManager] user:', user);
        console.log('[DataManager] data:', data);
        try {
            const userKey = `userStats_${user}`;
            console.log('[DataManager] userKey:', userKey);
            
            // 确保数据结构完整
            const safeData = {
                version: DataManager.DATA_VERSION,
                errorWords: Array.isArray(data.errorWords) ? data.errorWords : [],
                today: typeof data.today === 'object' && data.today !== null ? {
                    date: data.today.date || DataManager.getLocalDateString(),
                    learning: data.today.learning || 0,
                    testing: data.today.testing || 0,
                    correct: data.today.correct || 0,
                    error: data.today.error || 0,
                    checkedIn: data.today.checkedIn || false
                } : {
                    date: DataManager.getLocalDateString(),
                    learning: 0,
                    testing: 0,
                    correct: 0,
                    error: 0,
                    checkedIn: false
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
                books: typeof data.books === 'object' && data.books !== null ? (() => {
                    const safeBooks = {};
                    for (const bookFile in data.books) {
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
                pets: Array.isArray(data.pets) ? data.pets : []
            };
            
            // 确保 books 对象中的每个课本都有必要的字段
            if (safeData.books) {
                for (const bookFile in safeData.books) {
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
            console.log('[DataManager] 数据保存成功');
            // 验证保存是否成功
            const savedData = localStorage.getItem(userKey);
            console.log('[DataManager] 验证保存结果:', savedData);
            return true;
        } catch (error) {
            console.error('保存用户数据失败:', error);
            return false;
        } finally {
            console.log('[DataManager] saveUserData 结束');
        }
    }

    static getErrorWords(user) {
        try {
            const userData = this.getUserData(user);
            return userData.errorWords || [];
        } catch (error) {
            console.error('获取错词本失败:', error);
            return [];
        }
    }

    static addErrorWord(user, word) {
        try {
            // 使用 getUserData 获取数据，确保数据结构完整和版本一致
            const userData = this.getUserData(user);
            const errorWords = userData.errorWords || [];
            
            // 检查单词是否已存在
            const exists = errorWords.some(w => w.word === word.word);
            if (!exists) {
                errorWords.push(word);
                userData.errorWords = errorWords;
                userData.today.error = (userData.today.error || 0) + 1;
                userData.total.error = (userData.total.error || 0) + 1;
                this.saveUserData(user, userData);
            }
        } catch (error) {
            console.error('添加错词失败:', error);
        }
    }

    static removeErrorWord(user, word) {
        try {
            const userData = this.getUserData(user);
            const errorWords = userData.errorWords || [];
            userData.errorWords = errorWords.filter(w => w.word !== word.word);
            this.saveUserData(user, userData);
        } catch (error) {
            console.error('移除错词失败:', error);
        }
    }

    static initBookData(user, bookFile, totalWords) {
        console.log('[DataManager] initBookData 开始');
        console.log('[DataManager] user:', user);
        console.log('[DataManager] bookFile:', bookFile);
        console.log('[DataManager] totalWords:', totalWords);
        try {
            // 使用 getUserData 获取数据，确保数据结构完整和版本一致
            let userData = DataManager.getUserData(user);
            
            // 确保 books 对象存在
            if (!userData.books) {
                userData.books = {};
                console.log('[DataManager] 创建 books 对象');
            }
            
            // 只有当课本数据不存在时才创建新的，避免重置已学单词数据
            if (!userData.books[bookFile]) {
                userData.books[bookFile] = {
                    totalWords: totalWords,
                    learnedCount: 0
                };
                console.log('[DataManager] 创建课本数据:', bookFile);
            } else {
                // 如果课本数据已存在，只更新总单词数，保留已学单词数据
                userData.books[bookFile].totalWords = totalWords;
                // 确保 learnedCount 存在
                if (userData.books[bookFile].learnedCount === undefined) {
                    userData.books[bookFile].learnedCount = 0;
                    console.log('[DataManager] 确保 learnedCount 存在');
                }
                console.log('[DataManager] 更新课本总单词数:', totalWords);
                console.log('[DataManager] 保留已学单词数量:', userData.books[bookFile].learnedCount);
            }
            
            // 确保 today 对象存在且字段完整
            if (!userData.today || typeof userData.today !== 'object') {
                userData.today = {
                    date: DataManager.getLocalDateString(),
                    learning: 0,
                    testing: 0,
                    correct: 0,
                    error: 0,
                    checkedIn: false
                };
            } else {
                // 补全 today 字段，确保所有字段都存在
                userData.today.date = userData.today.date || DataManager.getLocalDateString();
                // 确保字段都是有效的数字
                userData.today.learning = parseInt(userData.today.learning) || 0;
                userData.today.testing = parseInt(userData.today.testing) || 0;
                userData.today.correct = parseInt(userData.today.correct) || 0;
                userData.today.error = parseInt(userData.today.error) || 0;
                userData.today.checkedIn = userData.today.checkedIn || false;
            }
            
            // 确保 total 对象存在且字段完整
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
                // 补全 total 字段，确保所有字段都存在
                // 确保字段都是有效的数字
                userData.total.learning = parseInt(userData.total.learning) || 0;
                userData.total.testing = parseInt(userData.total.testing) || 0;
                userData.total.correct = parseInt(userData.total.correct) || 0;
                userData.total.error = parseInt(userData.total.error) || 0;
                userData.total.points = parseFloat(userData.total.points) || 0;
                userData.total.consecutiveDays = parseInt(userData.total.consecutiveDays) || 0;
                userData.total.totalCheckins = parseInt(userData.total.totalCheckins) || 0;
            }
            
            // 保存数据到 localStorage
            DataManager.saveUserData(user, userData);
            console.log('[DataManager] 保存课本数据成功');
            
            console.log('[DataManager] initBookData 结束');
            return userData.books[bookFile];
        } catch (error) {
            console.error('初始化课本数据失败:', error);
            return null;
        }
    }

    static markWordAsLearned(user, bookFile, word) {
        console.log('[DataManager] markWordAsLearned 开始');
        console.log('[DataManager] user:', user);
        console.log('[DataManager] bookFile:', bookFile);
        console.log('[DataManager] word:', word);
        try {
            // 使用 getUserData 获取数据，确保数据结构完整和版本一致
            let userData = DataManager.getUserData(user);
            
            // 确保所有必要的字段存在
            if (!userData.books) userData.books = {};
            if (!userData.books[bookFile]) {
                userData.books[bookFile] = {
                    totalWords: 0,
                    learnedCount: 0
                };
            }
            // 确保 today 对象存在且日期为今天
            const today = DataManager.getLocalDateString();
            if (!userData.today || userData.today.date !== today) {
                userData.today = {
                    date: today,
                    learning: 0,
                    testing: 0,
                    correct: 0,
                    error: 0,
                    checkedIn: false
                };
            }
            if (!userData.total) {
                userData.total = {
                    learning: 0,
                    testing: 0,
                    correct: 0,
                    error: 0,
                    points: 0,
                    consecutiveDays: 0,
                    totalCheckins: 0
                };
            }
            
            // 直接增加已学单词数量
            userData.books[bookFile].learnedCount = (parseInt(userData.books[bookFile].learnedCount) || 0) + 1;
            userData.today.learning = (parseInt(userData.today.learning) || 0) + 1;
            userData.total.learning = (parseInt(userData.total.learning) || 0) + 1;
            console.log('[DataManager] 增加已学单词数量:', userData.books[bookFile].learnedCount);
            console.log('[DataManager] 今日学习次数:', userData.today.learning);
            console.log('[DataManager] 累计学习次数:', userData.total.learning);
            
            // 保存数据到 localStorage
            console.log('[DataManager] 保存数据到 localStorage');
            console.log('[DataManager] 保存前的 userData:', userData);
            
            // 使用 saveUserData 函数来保存数据，确保数据结构完整
            DataManager.saveUserData(user, userData);
            console.log('[DataManager] 保存成功');
            
            // 验证保存结果
            const userKey = `userStats_${user}`;
            const savedData = localStorage.getItem(userKey);
            console.log('[DataManager] 验证保存结果:', savedData);
            const parsedSavedData = JSON.parse(savedData);
            console.log('[DataManager] 解析后的保存结果:', parsedSavedData);
            
            console.log('[DataManager] markWordAsLearned 结束');
            return userData.books[bookFile];
        } catch (error) {
            console.error('标记单词为已学失败:', error);
            return null;
        }
    }

    static getLearnedWordsCount(user, bookFile) {
        console.log('[DataManager] getLearnedWordsCount 开始');
        console.log('[DataManager] user:', user);
        console.log('[DataManager] bookFile:', bookFile);
        try {
            // 使用 getUserData 获取数据，确保数据结构完整和版本一致
            const userData = this.getUserData(user);
            console.log('[DataManager] userData:', userData);
            console.log('[DataManager] userData.books:', userData.books);
            
            // 检查数据结构是否完整
            if (userData && userData.books && userData.books[bookFile]) {
                console.log('[DataManager] 课本数据存在:', userData.books[bookFile]);
                let learnedCount = 0;
                // 同时支持旧格式（learnedWords数组）和新格式（learnedCount）
                if (userData.books[bookFile].learnedCount !== undefined) {
                    learnedCount = userData.books[bookFile].learnedCount || 0;
                } else if (Array.isArray(userData.books[bookFile].learnedWords)) {
                    learnedCount = userData.books[bookFile].learnedWords.length;
                }
                console.log('[DataManager] learnedCount:', learnedCount);
                return learnedCount;
            }
            console.log('[DataManager] 未找到已学单词数据');
            return 0;
        } catch (error) {
            console.error('获取已学单词数量失败:', error);
            return 0;
        }
    }

    static getBookData(user, bookFile) {
        try {
            const userData = this.getUserData(user);
            if (userData && userData.books && userData.books[bookFile]) {
                return userData.books[bookFile];
            }
            // 如果课本数据不存在，尝试从localStorage直接获取
            const userKey = `userStats_${user}`;
            const savedData = localStorage.getItem(userKey);
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                if (parsedData && parsedData.books && parsedData.books[bookFile]) {
                    return parsedData.books[bookFile];
                }
            }
            return null;
        } catch (error) {
            console.error('获取课本数据失败:', error);
            return null;
        }
    }

    static checkIn(user) {
        try {
            const userData = DataManager.getUserData(user);
            const today = DataManager.getLocalDateString();
            
            console.log('[DataManager] checkIn 开始');
            console.log('[DataManager] today:', today);
            console.log('[DataManager] 当前打卡状态:', userData.today.checkedIn);
            console.log('[DataManager] 当前日期:', userData.today.date);
            console.log('[DataManager] 打卡历史:', userData.checkinHistory);
            
            // 检查今天是否已经打卡（只检查 today.checkedIn，不检查打卡历史）
            if (userData.today.date === today && userData.today.checkedIn) {
                console.log('[DataManager] 今天已经打卡过了');
                return { success: false, message: '今天已经打卡过了' };
            }
            
            // 更新今日数据
            userData.today.date = today;
            userData.today.checkedIn = true;
            
            // 计算连续打卡天数
            let consecutiveDays = 1;
            if (userData.checkinHistory && userData.checkinHistory.length > 0) {
                const lastCheckin = userData.checkinHistory[userData.checkinHistory.length - 1];
                const lastDate = new Date(typeof lastCheckin === 'string' ? lastCheckin : lastCheckin.date);
                const currentDate = new Date(today);
                const diffTime = Math.abs(currentDate - lastDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    consecutiveDays = (parseInt(userData.total.consecutiveDays) || 0) + 1;
                }
            }
            
            // 确保total对象存在且字段完整
            if (!userData.total) {
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
                // 强制补全 total 字段，确保所有字段都存在
                userData.total = {
                    learning: parseInt(userData.total.learning) || 0,
                    testing: parseInt(userData.total.testing) || 0,
                    correct: parseInt(userData.total.correct) || 0,
                    error: parseInt(userData.total.error) || 0,
                    points: parseFloat(userData.total.points) || 0,
                    consecutiveDays: parseInt(userData.total.consecutiveDays) || 0,
                    totalCheckins: parseInt(userData.total.totalCheckins) || 0
                };
            }
            
            userData.total.consecutiveDays = consecutiveDays;
            userData.total.totalCheckins = (parseInt(userData.total.totalCheckins) || 0) + 1;
            
            // 确保checkinHistory数组存在
            if (!userData.checkinHistory) {
                userData.checkinHistory = [];
            }
            
            // 奖励积分
            let pointsReward = 5; // 基础打卡积分
            
            // 连续打卡奖励
            if (consecutiveDays === 3) {
                pointsReward += 10;
            } else if (consecutiveDays === 7) {
                pointsReward += 20;
            } else if (consecutiveDays === 30) {
                pointsReward += 50;
            }
            
            userData.total.points = (parseFloat(userData.total.points) || 0) + pointsReward;
            
            // 检查今天的日期是否已经在打卡历史中，避免重复
            const existingCheckinIndex = userData.checkinHistory.findIndex(item => 
                (typeof item === 'string' ? item : item.date) === today
            );
            
            if (existingCheckinIndex === -1) {
                console.log('[DataManager] 添加打卡历史:', { date: today, points: pointsReward });
                // 添加打卡历史，包含日期和积分
                userData.checkinHistory.push({ date: today, points: pointsReward });
            } else {
                console.log('[DataManager] 今天的日期已经在打卡历史中，更新积分');
                // 更新 existingCheckinIndex 对应的积分
                userData.checkinHistory[existingCheckinIndex] = { date: today, points: pointsReward };
            }
            
            // 添加积分收入记录
            this.addPointsHistory(userData, 'income', pointsReward, '每日打卡');

            
            console.log('[DataManager] 保存前的打卡历史:', userData.checkinHistory);
            
            // 保存数据并检查是否成功
            console.log('[DataManager] 保存前的完整数据:', JSON.stringify(userData, null, 2));
            const saveSuccess = DataManager.saveUserData(user, userData);
            if (!saveSuccess) {
                throw new Error('保存数据失败');
            }
            
            // 验证保存后的数据
            const savedData = localStorage.getItem(`userStats_${user}`);
            console.log('[DataManager] 保存后的完整数据:', savedData);
            
            console.log('[DataManager] checkIn 结束');
            return { success: true, message: '打卡成功', points: pointsReward, consecutiveDays };
        } catch (error) {
            console.error('打卡失败:', error);
            return { success: false, message: '打卡失败' };
        }
    }

    static getCheckInStatus(user) {
        try {
            const userData = DataManager.getUserData(user);
            const today = DataManager.getLocalDateString();
            
            console.log('getCheckInStatus - 开始，today:', today);
            console.log('getCheckInStatus - userData.today:', userData.today);
            
            // 确保 checkinHistory 数组存在
            if (!userData.checkinHistory || !Array.isArray(userData.checkinHistory)) {
                userData.checkinHistory = [];
            }
            
            // 检查今天的日期是否已经在打卡历史中
            const existingCheckinIndex = userData.checkinHistory.findIndex(item => 
                (typeof item === 'string' ? item : item.date) === today
            );
            
            console.log('getCheckInStatus - existingCheckinIndex:', existingCheckinIndex);
            
            // 检查 today 对象是否存在且日期是否为今天
            if (!userData.today || typeof userData.today !== 'object' || userData.today.date !== today) {
                // 检查今天是否已经在打卡历史中
                if (existingCheckinIndex !== -1) {
                    // 如果今天已经在打卡历史中，保持打卡状态为 true
                    userData.today = {
                        date: today,
                        learning: 0,
                        testing: 0,
                        correct: 0,
                        error: 0,
                        checkedIn: true
                    };
                } else {
                    // 如果今天不在打卡历史中，重置为未打卡
                    userData.today = {
                        date: today,
                        learning: 0,
                        testing: 0,
                        correct: 0,
                        error: 0,
                        checkedIn: false
                    };
                }
                
                // 只在日期不是今天时才保存数据
                DataManager.saveUserData(user, userData);
                console.log('getCheckInStatus - 重置 today 对象，日期设为今天');
            } else {
                // 确保 today.checkedIn 字段正确
                const oldCheckedIn = userData.today.checkedIn;
                if (existingCheckinIndex !== -1) {
                    userData.today.checkedIn = true;
                } else {
                    userData.today.checkedIn = userData.today.checkedIn || false;
                }
                
                // 确保 today 对象中的字段都是有效的数字
                userData.today.learning = parseInt(userData.today.learning) || 0;
                userData.today.testing = parseInt(userData.today.testing) || 0;
                userData.today.correct = parseInt(userData.today.correct) || 0;
                userData.today.error = parseInt(userData.today.error) || 0;
                
                // 如果打卡状态发生变化，保存数据
                if (oldCheckedIn !== userData.today.checkedIn) {
                    DataManager.saveUserData(user, userData);
                    console.log('getCheckInStatus - 打卡状态发生变化，保存数据');
                }
            }
            
            // 确保 total 对象存在
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
            }
            
            console.log('getCheckInStatus - 结束，checkedIn:', userData.today.checkedIn);
            return { checkedIn: userData.today.checkedIn || false, consecutiveDays: userData.total.consecutiveDays || 0 };
        } catch (error) {
            console.error('获取打卡状态失败:', error);
            return { checkedIn: false, consecutiveDays: 0 };
        }
    }

    static getLocalDateStringFromDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    static addPoints(user, points) {
        console.log('[DataManager] addPoints 开始');
        console.log('[DataManager] user:', user);
        console.log('[DataManager] points:', points);
        try {
            // 使用 getUserData 获取数据，确保数据结构完整和版本一致
            let userData = DataManager.getUserData(user);
            
            // 确保所有必要的字段存在
            if (!userData.total) {
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
                // 确保 total 对象中的字段都是有效的数字
                userData.total.learning = parseInt(userData.total.learning) || 0;
                userData.total.testing = parseInt(userData.total.testing) || 0;
                userData.total.correct = parseInt(userData.total.correct) || 0;
                userData.total.error = parseInt(userData.total.error) || 0;
                userData.total.points = parseFloat(userData.total.points) || 0;
                userData.total.consecutiveDays = parseInt(userData.total.consecutiveDays) || 0;
                userData.total.totalCheckins = parseInt(userData.total.totalCheckins) || 0;
            }
            
            // 确保 points 是数字，并且 userData.total.points 存在且是数字
            const pointsToAdd = parseFloat(points) || 0;
            console.log('[DataManager] pointsToAdd:', pointsToAdd);
            console.log('[DataManager] 当前积分:', userData.total.points);
            
            userData.total.points = (parseFloat(userData.total.points) || 0) + pointsToAdd;
            console.log('[DataManager] 添加后的积分:', userData.total.points);
            
            // 添加积分收入记录
            this.addPointsHistory(userData, 'income', pointsToAdd, '学习单词');
            
            // 使用 saveUserData 函数来保存数据，确保数据结构完整
            DataManager.saveUserData(user, userData);
            console.log('[DataManager] 保存成功');
            
            // 验证保存结果
            const userKey = `userStats_${user}`;
            const savedData = localStorage.getItem(userKey);
            console.log('[DataManager] 验证保存结果:', savedData);
            const parsedSavedData = JSON.parse(savedData);
            console.log('[DataManager] 解析后的保存结果:', parsedSavedData);
            console.log('[DataManager] 解析后的积分:', parsedSavedData.total.points);
            
            console.log('[DataManager] addPoints 成功:', userData.total.points);
            return true;
        } catch (error) {
            console.error('添加积分失败:', error);
            return false;
        }
    }

    static getUserPoints(user) {
        try {
            const userData = this.getUserData(user);
            return userData.total.points || 0;
        } catch (error) {
            console.error('获取用户积分失败:', error);
            return 0;
        }
    }

    static getConsecutiveDays(user) {
        try {
            const userData = this.getUserData(user);
            return userData.total.consecutiveDays || 0;
        } catch (error) {
            console.error('获取连续打卡天数失败:', error);
            return 0;
        }
    }

    static getTotalCheckins(user) {
        try {
            const userData = this.getUserData(user);
            return userData.total.totalCheckins || 0;
        } catch (error) {
            console.error('获取总打卡次数失败:', error);
            return 0;
        }
    }

    static getCheckinHistory(user) {
        try {
            const userData = this.getUserData(user);
            return userData.checkinHistory || [];
        } catch (error) {
            console.error('获取打卡历史失败:', error);
            return [];
        }
    }

    static addPointsHistory(userData, type, amount, description) {
        try {
            const today = this.getLocalDateString();
            
            const pointsRecord = {
                date: today,
                type: type, // 'income' or 'expense'
                amount: amount,
                description: description
            };
            
            if (!userData.pointsHistory) {
                userData.pointsHistory = [];
            }
            
            userData.pointsHistory.push(pointsRecord);
            return true;
        } catch (error) {
            console.error('添加积分记录失败:', error);
            return false;
        }
    }

    static getPointsHistory(user) {
        try {
            const userData = this.getUserData(user);
            return userData.pointsHistory || [];
        } catch (error) {
            console.error('获取积分记录失败:', error);
            return [];
        }
    }

    static getPointsSummary(user) {
        try {
            const userData = this.getUserData(user);
            const pointsHistory = userData.pointsHistory || [];
            
            let totalIncome = 0;
            let totalExpense = 0;
            
            pointsHistory.forEach(record => {
                if (record.type === 'income') {
                    totalIncome += record.amount;
                } else if (record.type === 'expense') {
                    totalExpense += record.amount;
                }
            });
            
            return {
                totalIncome: totalIncome,
                totalExpense: totalExpense,
                balance: userData.total.points || 0
            };
        } catch (error) {
            console.error('获取积分汇总失败:', error);
            return {
                totalIncome: 0,
                totalExpense: 0,
                balance: 0
            };
        }
    }

    // 宠物相关方法
    static getPets(user) {
        try {
            const userData = this.getUserData(user);
            return userData.pets || [];
        } catch (error) {
            console.error('获取宠物列表失败:', error);
            return [];
        }
    }

    static adoptPet(user, petType, petName) {
        try {
            const userData = this.getUserData(user);
            const adoptionCost = 50; // 领养宠物需要50积分
            
            if (userData.total.points < adoptionCost) {
                return { success: false, message: '积分不足，需要50积分才能领养宠物' };
            }
            
            // 检查是否已经领养了相同类型的宠物
            const existingPet = userData.pets.find(pet => pet.type === petType && !pet.isDead);
            if (existingPet) {
                return { success: false, message: '你已经领养了这种类型的宠物' };
            }
            
            // 扣除积分
            userData.total.points -= adoptionCost;
            
            // 添加积分支出记录
            this.addPointsHistory(userData, 'expense', adoptionCost, '领养宠物');

            
            // 添加新宠物
            const newPet = {
                id: Date.now().toString(),
                type: petType,
                name: petName,
                size: 1.0, // 初始大小
                feedCount: 0, // 喂食次数
                lastFeedDate: null, // 最后喂食日期
                isDead: false, // 是否死亡
                deathDate: null, // 死亡日期
                adoptionDate: new Date().toISOString() // 领养日期
            };
            
            userData.pets.push(newPet);
            this.saveUserData(user, userData);
            
            return { success: true, message: '宠物领养成功！', pet: newPet };
        } catch (error) {
            console.error('领养宠物失败:', error);
            return { success: false, message: '领养宠物失败' };
        }
    }

    static feedPet(user, petId) {
        try {
            const userData = this.getUserData(user);
            const pet = userData.pets.find(p => p.id === petId);
            
            if (!pet) {
                return { success: false, message: '宠物不存在' };
            }
            
            if (pet.isDead) {
                return { success: false, message: '宠物已经死亡，需要复活' };
            }
            
            // 检查是否达到最大喂食次数（180次）
            if (pet.feedCount >= 180) {
                return { success: false, message: '宠物已成年，无需再喂食' };
            }
            
            const today = this.getLocalDateString();
            if (pet.lastFeedDate === today) {
                return { success: false, message: '今天已经喂过宠物了' };
            }
            
            const feedCost = 5; // 喂食需要5积分
            if (userData.total.points < feedCost) {
                return { success: false, message: '积分不足，需要5积分才能喂食' };
            }
            
            // 扣除积分
            userData.total.points -= feedCost;
            
            // 添加积分支出记录
            this.addPointsHistory(userData, 'expense', feedCost, '喂养宠物');

            
            // 更新宠物信息
            pet.lastFeedDate = today;
            pet.feedCount += 1;
            
            // 每30天喂食，宠物大小增加20%
            if (pet.feedCount % 30 === 0) {
                pet.size *= 1.2;
            }
            
            this.saveUserData(user, userData);
            
            return { success: true, message: '宠物喂食成功！', pet };
        } catch (error) {
            console.error('喂食宠物失败:', error);
            return { success: false, message: '喂食宠物失败' };
        }
    }

    static revivePet(user, petId) {
        try {
            const userData = this.getUserData(user);
            const pet = userData.pets.find(p => p.id === petId);
            
            if (!pet) {
                return { success: false, message: '宠物不存在' };
            }
            
            if (!pet.isDead) {
                return { success: false, message: '宠物还活着，不需要复活' };
            }
            
            const reviveCost = 40; // 复活需要40积分（领养成本的80%）
            if (userData.total.points < reviveCost) {
                return { success: false, message: '积分不足，需要40积分才能复活宠物' };
            }
            
            // 扣除积分
            userData.total.points -= reviveCost;
            
            // 添加积分支出记录
            this.addPointsHistory(userData, 'expense', reviveCost, '复活宠物');

            
            // 复活宠物
            pet.isDead = false;
            pet.deathDate = null;
            pet.size = 1.0; // 恢复初始大小
            pet.feedCount = 0; // 重置喂食次数
            pet.lastFeedDate = null;
            
            this.saveUserData(user, userData);
            
            return { success: true, message: '宠物复活成功！', pet };
        } catch (error) {
            console.error('复活宠物失败:', error);
            return { success: false, message: '复活宠物失败' };
        }
    }

    static checkPetStatus(user) {
        try {
            const userData = this.getUserData(user);
            const today = this.getLocalDateString();
            let updated = false;
            
            userData.pets.forEach(pet => {
                if (!pet.isDead && pet.lastFeedDate) {
                    const lastFeedDate = new Date(pet.lastFeedDate);
                    const currentDate = new Date(today);
                    const diffTime = Math.abs(currentDate - lastFeedDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays >= 3) {
                        pet.isDead = true;
                        pet.deathDate = today;
                        updated = true;
                    }
                }
            });
            
            if (updated) {
                this.saveUserData(user, userData);
            }
            
            return userData.pets;
        } catch (error) {
            console.error('检查宠物状态失败:', error);
            return [];
        }
    }

    static clearAllUserData() {
        try {
            console.log('[DataManager] 开始清空所有用户数据...');
            const keysToRemove = [];
            
            // 遍历所有localStorage键
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('userStats_')) {
                    keysToRemove.push(key);
                }
            }
            
            // 删除所有匹配的键
            keysToRemove.forEach(key => {
                console.log('[DataManager] 删除localStorage键:', key);
                localStorage.removeItem(key);
            });
            
            console.log('[DataManager] 成功清空所有用户数据，共删除', keysToRemove.length, '个键');
            return true;
        } catch (error) {
            console.error('[DataManager] 清空用户数据失败:', error);
            return false;
        }
    }
}

// 导出DataManager类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
} else {
    window.DataManager = DataManager;
}