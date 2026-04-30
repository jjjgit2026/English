// ES5版本的单词管理模块

// 单词管理对象
window.WordManager = {
    // 加载单词数据
    loadWords: function(filePath, callback) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open('GET', filePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        callback(data);
                    } catch (e) {
                        console.error('解析JSON失败:', e);
                        callback(null);
                    }
                } else {
                    console.error('加载单词数据失败，状态码:', xhr.status);
                    callback(null);
                }
            }
        };
        xhr.send(null);
    },

    // 初始化单词学习记录
    initWordLearningRecord: function(user, bookFile, word) {
        var userData = window.DataManager.getUserData(user);
        if (!userData.wordLearningRecords) {
            userData.wordLearningRecords = {};
        }
        var wordKey = bookFile + '_' + word.word;
        if (!userData.wordLearningRecords[wordKey]) {
            userData.wordLearningRecords[wordKey] = {
                word: word.word,
                translations: word.translations || [],
                examples: word.examples || [],
                phonetic: word.phonetic || '',
                bookFile: bookFile,
                learned: false,
                lastReviewed: null,
                reviewCount: 0,
                correctCount: 0,
                errorCount: 0,
                learningProgress: 0
            };
            window.DataManager.saveUserData(user, userData);
        }
    },

    // 更新单词学习记录
    updateWordLearningRecord: function(user, bookFile, word, isCorrect) {
        var userData = window.DataManager.getUserData(user);
        if (!userData.wordLearningRecords) {
            userData.wordLearningRecords = {};
        }
        var wordKey = bookFile + '_' + word.word;
        if (!userData.wordLearningRecords[wordKey]) {
            this.initWordLearningRecord(user, bookFile, word);
        }
        var record = userData.wordLearningRecords[wordKey];
        record.lastReviewed = new Date().toISOString();
        record.reviewCount++;
        if (isCorrect) {
            record.correctCount++;
        } else {
            record.errorCount++;
        }
        record.learningProgress = Math.min(100, Math.round((record.correctCount / record.reviewCount) * 100));
        if (record.learningProgress >= 80) {
            record.learned = true;
        }
        window.DataManager.saveUserData(user, userData);
    },

    // 获取单词学习记录
    getWordLearningRecord: function(user, bookFile, word) {
        var userData = window.DataManager.getUserData(user);
        if (!userData.wordLearningRecords) {
            userData.wordLearningRecords = {};
        }
        var wordKey = bookFile + '_' + word.word;
        return userData.wordLearningRecords[wordKey] || null;
    },

    // 获取已学习的单词数量
    getLearnedWordsCount: function(user, bookFile) {
        var userData = window.DataManager.getUserData(user);
        if (!userData.wordLearningRecords) {
            return 0;
        }
        var count = 0;
        for (var key in userData.wordLearningRecords) {
            if (userData.wordLearningRecords.hasOwnProperty(key) && 
                userData.wordLearningRecords[key].bookFile === bookFile && 
                userData.wordLearningRecords[key].learned) {
                count++;
            }
        }
        return count;
    },

    // 生成单词链
    generateWordChain: function(words) {
        if (!words || words.length === 0) return [];
        
        var chain = [];
        var used = {};
        
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (!used[word.word]) {
                chain.push({
                    word: word.word,
                    translations: word.translations || [],
                    examples: word.examples || [],
                    phonetic: word.phonetic || ''
                });
                used[word.word] = true;
            }
        }
        
        return chain;
    },

    // 生成错误单词链
    generateErrorWordChain: function(user) {
        var userData = window.DataManager.getUserData(user);
        var errorWords = userData.errorWords || [];
        var chain = [];
        var used = {};
        
        for (var i = 0; i < errorWords.length; i++) {
            var word = errorWords[i];
            if (!used[word.word]) {
                chain.push({
                    word: word.word,
                    translations: word.translations || [],
                    examples: word.examples || [],
                    phonetic: word.phonetic || ''
                });
                used[word.word] = true;
            }
        }
        
        return chain;
    },

    // 标记单词为已学习
    markWordAsLearned: function(user, bookFile, word) {
        var userData = window.DataManager.getUserData(user);
        if (!userData.wordLearningRecords) {
            userData.wordLearningRecords = {};
        }
        var wordKey = bookFile + '_' + word.word;
        if (!userData.wordLearningRecords[wordKey]) {
            this.initWordLearningRecord(user, bookFile, word);
        }
        var record = userData.wordLearningRecords[wordKey];
        record.learned = true;
        record.learningProgress = 100;
        window.DataManager.saveUserData(user, userData);
    },

    // 生成练习题目
    generatePracticeQuestion: function(word) {
        var question = {
            word: word.word,
            translations: word.translations || [],
            examples: word.examples || [],
            phonetic: word.phonetic || '',
            options: []
        };
        
        // 添加正确答案
        question.options.push({
            text: question.translations[0] || '',
            correct: true
        });
        
        // 这里可以添加错误选项，暂时只添加正确答案
        
        return question;
    },

    // 检查练习答案
    checkPracticeAnswer: function(question, answer) {
        return question.translations.some(function(translation) {
            return translation === answer;
        });
    },

    // 检查拼写
    checkSpelling: function(word, input) {
        return word.toLowerCase() === input.toLowerCase();
    },

    // 检查听写
    checkWriting: function(word, input) {
        return word.toLowerCase() === input.toLowerCase();
    }
};