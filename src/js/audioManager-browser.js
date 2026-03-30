// 音频管理模块 - 浏览器版本
class AudioManager {
    static audioCache = new Map();
    static ttsStatus = {
        native: true,
        baidu: true
    };
    
    static async playWordAudio(word, markAsLearned = false) {
        console.log('[播放音频] playWordAudio 被调用，word:', word, 'markAsLearned:', markAsLearned);
        
        // 检查缓存
        if (this.audioCache.has(word)) {
            const audioUrl = this.audioCache.get(word);
            const success = await this.playAudioFromUrl(audioUrl);
            if (success && markAsLearned) {
                this.markWordAsLearned(word);
            }
            return success;
        }
        
        // 尝试浏览器内置 TTS
        if (window.speechSynthesis && this.ttsStatus.native) {
            const success = await this.playWordAudioNative(word, markAsLearned);
            if (success) {
                return true;
            } else {
                this.ttsStatus.native = false;
                console.warn('[播放音频] 浏览器内置 TTS 失败，切换到备用方案');
            }
        }
        
        // 尝试百度 TTS
        if (this.ttsStatus.baidu) {
            const success = await this.playWordAudioBaidu(word, markAsLearned);
            if (success) {
                return true;
            } else {
                this.ttsStatus.baidu = false;
                console.warn('[播放音频] 百度 TTS 失败，所有方案都已尝试');
            }
        }
        
        // 所有方案都失败
        console.error('所有 TTS 方案都失败');
        return false;
    }
    
    static playAudioFromUrl(audioUrl) {
        return new Promise((resolve) => {
            const audio = new Audio(audioUrl);
            
            audio.onended = () => {
                resolve(true);
            };
            
            audio.onerror = () => {
                console.error('播放缓存音频失败');
                resolve(false);
            };
            
            audio.play().catch(error => {
                console.error('播放缓存音频失败:', error);
                resolve(false);
            });
        });
    }
    
    static markWordAsLearned(word) {
        try {
            // 简化版本，不依赖 DataManager
            console.log('标记单词为已学:', word);
        } catch (e) {
            console.error('[播放音频] 标记已学失败:', e);
        }
    }

    static playWordAudioNative(word, markAsLearned = false) {
        return new Promise((resolve) => {
            // 检查可用的语音
            const voices = window.speechSynthesis.getVoices();
            console.log('[播放音频] 可用的语音数量:', voices.length);
            if (voices.length === 0) {
                console.warn('[播放音频] 警告：没有可用的语音，可能需要等待语音加载');
                // 尝试等待语音加载
                window.speechSynthesis.onvoiceschanged = () => {
                    console.log('[播放音频] 语音已加载，重新尝试播放');
                    this.playWordAudio(word, markAsLearned);
                };
                // 显示用户提示
                alert('正在加载语音，请稍后再试');
                resolve(false);
                return;
            }
            
            // 优先选择高质量的英语语音
            const preferredVoices = [
                voices.find(v => v.name.includes('Google') && v.lang.includes('en-US')),
                voices.find(v => v.name.includes('Microsoft') && v.lang.includes('en-US')),
                voices.find(v => v.name.includes('Amazon') && v.lang.includes('en-US')),
                voices.find(v => v.lang.includes('en-US')),
                voices.find(v => v.lang.includes('en'))
            ].filter(Boolean);
            
            // 使用找到的第一个高质量语音
            const selectedVoice = preferredVoices[0] || voices[0];
            console.log('[播放音频] 使用语音:', selectedVoice.name);
            
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.voice = selectedVoice;
            
            // 调整语速和音调参数
            utterance.rate = 0.4;       // 语速（0.1-10，默认1）
            utterance.pitch = 1.1;      // 音调（0-2，默认1）
            utterance.volume = 1.0;     // 音量（0-1，默认1）
            
            console.log('[播放音频] 语音参数 - 语速:', utterance.rate, '音调:', utterance.pitch, '音量:', utterance.volume);
            
            // 监听播放事件
            utterance.onstart = () => {
                console.log('[播放音频] 开始播放');
            };
            
            utterance.onend = () => {
                console.log('[播放音频] 播放结束');
                if (markAsLearned) {
                    this.markWordAsLearned(word);
                }
                resolve(true);
            };
            
            utterance.onerror = (event) => {
                console.error('[播放音频] 播放错误:', event.error);
                resolve(false);
            };
            
            // 开始高亮动画（延迟1秒以与发音同步）
            let currentTime = 1000; // 1秒延迟
            const letters = document.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('highlight');
                    setTimeout(() => {
                        letter.classList.remove('highlight');
                    }, 200);
                }, currentTime);
                currentTime += 200;
            });
            
            try {
                // 确保语音合成未被暂停
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                }
                
                window.speechSynthesis.speak(utterance);
                console.log('[播放音频] 已调用 speechSynthesis.speak');
            } catch (e) {
                console.error('[播放音频] 调用 speak 失败:', e);
                resolve(false);
            }
        });
    }

    // 百度云语音合成服务
    static BaiduTTS = {
        // 从本地存储获取token，或使用默认值
        get token() {
            const savedToken = localStorage.getItem('baiduTtsToken');
            const tokenExpiry = localStorage.getItem('baiduTtsTokenExpiry');
            
            // 检查token是否存在且未过期
            if (savedToken && tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
                return savedToken;
            }
            
            // 使用默认token（有效期30天）
            return '24.118c409ca7ab182ec6332e2421153d91.2592000.1775397635.282335-122258848';
        },
        
        // 设置新token
        setToken(token, expiryDays = 30) {
            localStorage.setItem('baiduTtsToken', token);
            localStorage.setItem('baiduTtsTokenExpiry', (Date.now() + expiryDays * 24 * 60 * 60 * 1000).toString());
        },
        
        // 合成语音
        synthesize(text) {
            return new Promise((resolve, reject) => {
                try {
                    const url = 'https://tsn.baidu.com/text2audio';
                    
                    // 根据文本类型调整参数
                    let spd = 2; // 默认语速
                    let pit = 5; // 默认音调
                    let vol = 5; // 默认音量
                    let per = 1; // 默认发音人
                    
                    // 根据文本长度调整语速
                    if (text.length > 50) {
                        spd = 4; // 长文本适当加快语速
                    } else if (text.length < 5) {
                        spd = 2; // 短文本适当放慢语速
                    }
                    
                    // 对于句子，使用不同的发音人
                    if (text.includes(' ') && text.length > 10) {
                        per = 1; // 使用女声发音人
                    }
                    
                    const params = new URLSearchParams({
                        tex: encodeURIComponent(text),
                        lan: 'en',
                        tok: this.token,
                        ctp: 1,
                        cuid: 'web前端应用',
                        spd: spd,
                        pit: pit,
                        vol: vol,
                        per: per
                    });
                    
                    console.log('[百度TTS] 参数 - 语速:', spd, '音调:', pit, '音量:', vol, '发音人:', per);
                    
                    // 直接创建Audio对象，避免CORS问题
                    const audioUrl = `${url}?${params.toString()}`;
                    const audio = new Audio(audioUrl);
                    
                    // 预加载音频
                    audio.preload = 'auto';
                    
                    audio.oncanplaythrough = () => {
                        resolve(audioUrl);
                    };
                    
                    audio.onerror = () => {
                        reject(new Error('音频加载失败'));
                    };
                    
                    // 开始加载
                    audio.load();
                } catch (error) {
                    reject(error);
                }
            });
        },
        
        // 播放语音
        async play(text) {
            try {
                const audioUrl = await this.synthesize(text);
                const audio = new Audio(audioUrl);
                
                // 播放音频
                return new Promise((resolve) => {
                    audio.onended = () => {
                        resolve(true);
                    };
                    
                    audio.onerror = () => {
                        console.error('播放失败: 音频播放错误');
                        resolve(false);
                    };
                    
                    audio.play().catch(error => {
                        console.error('播放失败:', error);
                        resolve(false);
                    });
                });
            } catch (error) {
                console.error('播放失败:', error);
                return false;
            }
        }
    };

    static async playWordAudioBaidu(word, markAsLearned = false) {
        console.log('[播放音频] 使用百度云语音合成API，word:', word);
        
        try {
            // 开始高亮动画
            let currentTime = 500; // 0.5秒延迟
            const letters = document.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('highlight');
                    setTimeout(() => {
                        letter.classList.remove('highlight');
                    }, 200);
                }, currentTime);
                currentTime += 200;
            });
            
            // 播放语音
            const success = await this.BaiduTTS.play(word);
            
            // 播放结束后标记为已学
            if (success && markAsLearned) {
                this.markWordAsLearned(word);
            }
            
            return success;
        } catch (e) {
            console.error('[播放音频] 百度云API调用失败:', e);
            return false;
        }
    }

    static playWordAudioTwice(word) {
        this.playWordAudio(word);
        setTimeout(() => {
            this.playWordAudio(word);
        }, 1500);
    }

    static async playCurrentWordAudio() {
        const currentWordIndex = window.currentWordIndex;
        const words = window.words;
        const errorWords = window.errorWords;
        const isErrorBookMode = window.isErrorBookMode;
        const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
        if (currentWord) {
            await this.playWordAudio(currentWord.word);
        }
    }

    static async playPhoneticAudio() {
        const currentWordIndex = window.currentWordIndex;
        const words = window.words;
        const errorWords = window.errorWords;
        const isErrorBookMode = window.isErrorBookMode;
        const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
        if (currentWord) {
            await this.playWordAudio(currentWord.word);
        }
    }

    static async playExampleAudio() {
        const currentWordIndex = window.currentWordIndex;
        const words = window.words;
        const errorWords = window.errorWords;
        const isErrorBookMode = window.isErrorBookMode;
        const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
        if (currentWord && currentWord.example) {
            await this.playWordAudio(currentWord.example);
        }
    }

    static playSuccessSound() {
        try {
            const audio = new Audio('../../assets/audio/答题正确音效.MP3');
            audio.play().catch(e => {
                console.error('播放成功音效失败:', e);
            });
        } catch (e) {
            console.error('播放成功音效失败:', e);
        }
    }

    static playErrorSound() {
        try {
            const audio = new Audio('../../assets/audio/答题错误音效.MP3');
            audio.play().catch(e => {
                console.error('播放错误音效失败:', e);
            });
        } catch (e) {
            console.error('播放错误音效失败:', e);
        }
    }
}

// 将 AudioManager 暴露到全局作用域
window.AudioManager = AudioManager;