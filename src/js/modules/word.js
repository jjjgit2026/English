// 单词模块

import { currentUser, currentFile, currentWordIndex, currentStep, isErrorBookMode, errorWords, words, setWords, setCurrentWordIndex, setCurrentStep, setErrorWords, maskMode, errorBookMaskMode, setMaskMode, setErrorBookMaskMode, currentUnit, setCurrentUnit } from './init.js';

// 缓存对象
const wordCache = {};

// 加载单词数据
export async function loadPDF() {
    console.log('[加载单词数据] 开始');
    console.log('[加载单词数据] currentFile:', currentFile);
    console.log('[加载单词数据] currentUser:', currentUser);
    
    // 检查缓存
    if (wordCache[currentFile]) {
        console.log('[加载单词数据] 从缓存加载数据');
        setWords(wordCache[currentFile]);
        // 初始化课本数据
        DataManager.initBookData(currentUser, currentFile, words.length);
        // 更新统计显示
        updateStatsDisplay();
        // 渲染单词列表
        renderWordList();
        console.log('[加载单词数据] 从缓存加载完成');
        return;
    }
    
    showLoading('正在加载单词数据...');
    const pdfPath = `../../assets/PDF/${currentFile}`;
    const jsonPath = `../../data/${currentFile.replace('.pdf', '.json')}`;
    console.log('[加载单词数据] pdfPath:', pdfPath);
    console.log('[加载单词数据] jsonPath:', jsonPath);
    
    try {
        // 尝试加载JSON文件
        const response = await fetch(jsonPath);
        console.log('[加载单词数据] JSON文件响应状态:', response.status);
        if (response.ok) {
            const data = await response.json();
            console.log('[加载单词数据] JSON加载成功，单词数量:', data.length);
            setWords(data);
            // 缓存数据
            wordCache[currentFile] = data;
            console.log('[加载单词数据] 初始化课本数据');
            // 初始化课本数据
            DataManager.initBookData(currentUser, currentFile, words.length);
            console.log('[加载单词数据] 更新统计显示');
            updateStatsDisplay();
            console.log('[加载单词数据] 渲染单词列表');
            renderWordList();
        } else {
            throw new Error('JSON文件不存在或无法加载');
        }
    } catch (error) {
        console.error('加载JSON失败:', error);
        // 回退到PDF加载
        console.log('回退到PDF加载:', pdfPath);
        await loadPDFOriginal();
    } finally {
        hideLoading();
        console.log('[加载单词数据] 结束');
    }
}

// 显示加载中
export function showLoading(message = '加载中，请稍候...') {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        const loadingText = loadingOverlay.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = message;
        }
        loadingOverlay.classList.remove('hidden');
    }
}

// 隐藏加载中
export function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

// 显示错误提示
export function showError(message) {
    alert(`错误: ${message}`);
    console.error('错误:', message);
}

// 原始PDF加载函数
export async function loadPDFOriginal() {
    showLoading('正在解析PDF文件...');
    // 初始化 PDF.js
    if (!initPdfJs()) {
        console.error('PDF.js 库未加载，使用模拟数据');
        loadMockData();
        return;
    }
    
    try {
        const pdf = await pdfjsLib.getDocument({ 
            url: `../../assets/PDF/${currentFile}`, 
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/',
            cMapPacked: true
        }).promise;
        
        // console.log('PDF加载成功，页数:', pdf.numPages);
        await processPDF(pdf);
    } catch (error) {
        console.error('加载PDF失败:', error);
        showError('加载PDF失败，使用模拟数据');
        // 使用模拟数据
        loadMockData();
    } finally {
        hideLoading();
    }
}

// 处理PDF文档
export function processPDF(pdf) {
    let pages = [];
    
    // 遍历所有页面
    for (let i = 1; i <= pdf.numPages; i++) {
        pages.push(pdf.getPage(i));
    }
    
    Promise.all(pages).then(function(pageList) {
        // console.log('获取页面成功，页面数:', pageList.length);
        let contentPromises = pageList.map(page => page.getTextContent());
        
        Promise.all(contentPromises).then(function(contentList) {
            // console.log('获取文本内容成功，页面数:', contentList.length);
            setWords([]);  // 重置单词列表
            
            // 解析每个页面的内容
            contentList.forEach((content, pageIndex) => {
                // console.log(`解析页面 ${pageIndex + 1} 的内容`);
                // console.log('原始文本项:', content.items.length);
                
                // 按行组织文本
                let lines = [];
                let currentLine = [];
                let lastY = null;
                
                // 按y坐标分组文本，使用更小的阈值确保同一行的文本被正确合并
                content.items.forEach((item, index) => {
                    // 只输出前几个文本项的信息，避免日志过多
                    if (index < 5) {
                        // console.log(`文本项 ${index}:`, item);
                    }
                    const y = item.transform[5];
                    if (lastY === null || Math.abs(y - lastY) > 0.5) {
                        if (currentLine.length > 0) {
                            lines.push(currentLine);
                            currentLine = [];
                        }
                        lastY = y;
                    }
                    currentLine.push(item);
                });
                
                // 处理小方格，确保它单独作为一列
                lines = lines.map(line => {
                    const newLine = [];
                    line.forEach(item => {
                        if (item.str === '□') {
                            // 小方格单独作为一列
                            newLine.push(item);
                        } else {
                            newLine.push(item);
                        }
                    });
                    return newLine;
                });
                
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                }
                
                // console.log(`页面 ${pageIndex + 1} 行数:`, lines.length);
                
                // 按x坐标排序每行的文本
                lines.forEach(line => {
                    line.sort((a, b) => a.transform[4] - b.transform[4]);
                });
                
                // 打印每行内容
                lines.forEach((line, lineIndex) => {
                    const lineText = line.map(item => item.str).join(' ');
                    // console.log(`页面 ${pageIndex + 1} 行 ${lineIndex + 1}:`, lineText);
                });
                
                // 寻找表格开始位置 - 找到第一个以数字序号为第一列的行
                let tableStartIndex = -1;
                // console.log(`页面 ${pageIndex + 1} 开始寻找表格，共 ${lines.length} 行`);
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    // 获取整行文本
                    const lineText = line.map(item => item.str).join(' ').trim();
                    // console.log(`页面 ${pageIndex + 1} 行 ${i + 1} 内容: "${lineText}"`);
                    
                    // 检查行内容是否以数字序号开头（如"1", "250"）
                    // 匹配行首的数字，后面可以跟空格、字母或结束
                    const match = lineText.match(/^(\d+)(\s|$)/);
                    if (match) {
                        const firstNumber = match[1];
                        tableStartIndex = i;
                        // console.log(`页面 ${pageIndex + 1} 表格开始行:`, tableStartIndex + 1, `(找到序号: ${firstNumber})`);
                        break;
                    }
                }
                
                // 从表格的第一行开始读取（包含序号行）
                if (tableStartIndex !== -1) {
                    // console.log(`开始处理表格，表格开始行: ${tableStartIndex + 1}`);
                    // 存储单词信息，用于处理跨行的数据
                    let currentWord = null;
                    let currentPhonetic = null;
                    let currentMeaning = null;
                    let currentNumber = null;
                    
                    // console.log(`开始遍历表格行，共 ${lines.length - tableStartIndex} 行`);
                    
                    // 重新组织行数据，确保序号、单词、音标和释义正确对应
                    let wordLines = [];
                    let currentEntry = null;
                    
                    for (let i = tableStartIndex; i < lines.length; i++) {
                        const line = lines[i];
                        const lineText = line.map(item => item.str).join(' ').trim();
                        // console.log(`处理行 ${i + 1}，内容: "${lineText}"`);
                        
                        // 检查是否为数字序号行（匹配行首的数字）
                        const numberMatch = lineText.match(/^(\d+)(\s|$)/);
                        if (numberMatch) {
                            const firstItem = numberMatch[1];
                                // 这是新的单词序号行
                                if (currentEntry && currentEntry.number) {
                                    wordLines.push(currentEntry);
                                    // console.log(`保存上一个单词条目:`, currentEntry);
                                }
                                currentEntry = { number: firstItem, word: '', phonetic: '', meaning: '' };
                                // console.log(`识别到新单词序号: ${firstItem}`);
                                
                                // 检查当前行是否有单词（有些PDF序号和单词在同一行）
                                if (line.length > 1) {
                                    const remainingText = line.slice(1).map(item => item.str).join(' ').trim();
                                    // console.log(`序号行剩余内容: "${remainingText}"`);
                                    // 确保剩余内容不是纯数字（避免把序号当成单词）
                                    if (remainingText && !remainingText.includes('/') && !remainingText.includes('[') && !/^\d+$/.test(remainingText)) {
                                        currentEntry.word = remainingText;
                                        // console.log(`从序号行提取单词: "${currentEntry.word}"`);
                                    }
                                }
                            } else if (currentEntry && currentEntry.number) {
                                // 这是当前单词的后续行
                                // console.log(`处理单词 ${currentEntry.number} 的后续行`);
                                
                                // 检查是否为音标行
                                if (lineText.includes('/') || lineText.includes('[')) {
                                    currentEntry.phonetic = lineText;
                                    // console.log(`提取音标: "${currentEntry.phonetic}"`);
                                } else if (lineText) {
                                    // 移除小方格后处理
                                    const cleanedText = lineText.replace(/□/g, '').trim();
                                    if (cleanedText) {
                                        // 如果还没有单词，这行可能是单词
                                        if (!currentEntry.word) {
                                            currentEntry.word = cleanedText;
                                            // console.log(`提取单词: "${currentEntry.word}"`);
                                        } else {
                                            // 这是释义行
                                            if (currentEntry.meaning) {
                                                currentEntry.meaning += ' ' + cleanedText;
                                            } else {
                                                currentEntry.meaning = cleanedText;
                                            }
                                            // console.log(`提取释义: "${currentEntry.meaning}"`);
                                        }
                                    }
                                }
                            }
                    }
                    
                    // 添加最后一个单词
                    if (currentEntry && currentEntry.number) {
                        wordLines.push(currentEntry);
                        // console.log(`保存最后一个单词条目:`, currentEntry);
                    }
                    
                    // console.log(`识别到 ${wordLines.length} 个单词条目`);
                    // console.log(`单词条目:`, wordLines);
                    
                    // 转换为单词列表并添加到总列表
                    wordLines.forEach((entry, index) => {
                        // 清理单词：区分单词内部空格和词组空格
                        let cleanWord = (entry.word || '').trim();
                        // 检查是否为单词内部空格（如"sch oo l"或"u n t i l"）
                        if (cleanWord.includes(' ') && !cleanWord.includes('-') && !cleanWord.includes('\'') && cleanWord.split(' ').every(part => part.length === 1)) {
                            // 单词内部空格，移除空格
                            cleanWord = cleanWord.replace(/\s+/g, '');
                        }
                        
                        const word = {
                            word: cleanWord,
                            phonetic: (entry.phonetic || '').trim(),
                            meaning: (entry.meaning || '').trim().replace(/□/g, '').trim(),
                            unit: 'all' // 默认单元
                        };
                        
                        if (word.word) {
                            words.push(word);
                        }
                    });
                }
            });
            
            // 缓存数据
            wordCache[currentFile] = words;
            console.log('[处理PDF] 缓存单词数据');
            
            // console.log('最终单词列表:', words);
            // console.log('单词数量:', words.length);
            
            // 初始化课本数据
            DataManager.initBookData(currentUser, currentFile, words.length);
            
            // 更新统计显示
            updateStatsDisplay();
            
            // 渲染单词列表
            renderWordList();
        });
    });
}

// 初始化 PDF.js
export function initPdfJs() {
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        console.log('[PDF.js] 初始化成功');
        return true;
    }
    console.warn('[PDF.js] 库未加载');
    return false;
}

// 使用模拟数据
export function loadMockData() {
    setWords([
        { word: 'apple', phonetic: '/ˈæpl/', meaning: 'n. 苹果' },
        { word: 'banana', phonetic: '/bəˈnɑːnə/', meaning: 'n. 香蕉' },
        { word: 'cat', phonetic: '/kæt/', meaning: 'n. 猫' },
        { word: 'dog', phonetic: '/dɒɡ/', meaning: 'n. 狗' },
        { word: 'elephant', phonetic: '/ˈelɪfənt/', meaning: 'n. 大象' }
    ]);
    
    // 更新统计显示
    updateStatsDisplay();
    
    // 渲染单词列表
    renderWordList();
}

// 渲染单词列表
export function renderWordList() {
    const listContainer = document.getElementById('wordList');
    if (!listContainer) return;
    
    let filteredWords = words;
    
    // 按单元筛选
    if (currentUnit !== 'all') {
        filteredWords = filteredWords.filter(w => w.unit === currentUnit);
    }
    
    // 使用文档片段批量更新
    const fragment = document.createDocumentFragment();
    
    filteredWords.forEach((word, index) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.dataset.index = index;
        wordItem.onclick = () => openWordLinkPage(index);
        
        wordItem.innerHTML = `
            <div class="word-index">${index + 1}</div>
            <div class="word-info">
                <div class="word-text ${maskMode === 'word' ? 'masked' : ''}">${word.word}</div>
                <div class="word-phonetic">${word.phonetic || ''}</div>
            </div>
            <div class="word-meaning ${maskMode === 'meaning' ? 'masked' : ''}">${word.meaning}</div>
            <div class="word-actions">
                <button class="action-btn">🔊</button>
                <button class="action-btn mastered-btn" data-word="${word.word}">已掌握</button>
            </div>
        `;
        
        // 添加事件监听器
        const wordText = wordItem.querySelector('.word-text');
        if (maskMode === 'word') {
            wordText.onclick = (e) => {
                wordText.classList.remove('masked');
                e.stopPropagation();
            };
        }
        
        const wordMeaning = wordItem.querySelector('.word-meaning');
        if (maskMode === 'meaning') {
            wordMeaning.onclick = (e) => {
                wordMeaning.classList.remove('masked');
                e.stopPropagation();
            };
        }
        
        // 处理发音按钮点击事件
        const actionBtns = wordItem.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            if (!btn.classList.contains('mastered-btn')) {
                btn.onclick = (e) => {
                    AudioManager.playWordAudio(word.word, false);
                    e.stopPropagation();
                };
            }
        });
        
        // 处理已掌握按钮点击事件
        const masteredBtn = wordItem.querySelector('.mastered-btn');
        if (masteredBtn) {
            masteredBtn.onclick = (e) => {
                const wordToRemove = masteredBtn.dataset.word;
                const userData = DataManager.getUserData(currentUser);
                
                // 从wordLearningRecords中删除该单词
                if (userData.wordLearningRecords && userData.wordLearningRecords[wordToRemove]) {
                    delete userData.wordLearningRecords[wordToRemove];
                    // 保存数据
                    DataManager.saveUserData(currentUser, userData);
                    // 重新渲染单词列表
                    renderWordList();
                    // 显示成功提示
                    alert('单词已从待复习列表中删除');
                } else {
                    // 如果单词不在待复习列表中，也显示提示
                    alert('该单词可能还没有学习哦');
                }
                e.stopPropagation();
            };
        }
        
        fragment.appendChild(wordItem);
    });
    
    // 清空容器并添加文档片段
    listContainer.innerHTML = '';
    listContainer.appendChild(fragment);
    
    // 为错词本列表也添加序号
    const errorListContainer = document.getElementById('errorWordList');
    if (errorListContainer) {
        const errorWords = DataManager.getErrorWords(currentUser);
        
        // 使用文档片段批量更新
        const errorFragment = document.createDocumentFragment();
        
        errorWords.forEach((word, index) => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.dataset.index = index;
            wordItem.onclick = () => openErrorWordLinkPage(index);
            
            wordItem.innerHTML = `
                <div class="word-index">${index + 1}</div>
                <div class="word-info">
                    <div class="word-text">${word.word}</div>
                    <div class="word-phonetic">${word.phonetic || ''}</div>
                </div>
                <div class="word-meaning">${word.meaning}</div>
                <div class="word-actions">
                    <button class="action-btn">🔊</button>
                </div>
            `;
            
            // 添加事件监听器
            const actionBtn = wordItem.querySelector('.action-btn');
            actionBtn.onclick = (e) => {
                AudioManager.playWordAudio(word.word, false);
                e.stopPropagation();
            };
            
            errorFragment.appendChild(wordItem);
        });
        
        // 清空容器并添加文档片段
        errorListContainer.innerHTML = '';
        errorListContainer.appendChild(errorFragment);
    }
}

// 生成单词链条
export function generateWordChain() {
    const chainContainer = document.getElementById('wordChain');
    if (!chainContainer) return;
    
    // 使用文档片段批量更新
    const fragment = document.createDocumentFragment();
    
    const wordList = isErrorBookMode ? errorWords : words;
    
    wordList.forEach((word, index) => {
        const wordElement = document.createElement('div');
        wordElement.className = 'chain-word-item';
        
        const wordText = document.createElement('div');
        wordText.className = 'chain-word';
        wordText.id = `chain-word-${index}`;
        
        if (index === currentWordIndex) {
            wordText.classList.add('current');
        } else if (index < currentWordIndex) {
            wordText.classList.add('completed');
        } else {
            wordText.classList.add('pending');
        }
        
        // 在拼和写步骤中遮挡当前学习的单词
        if ((currentStep === 'spell' || currentStep === 'write') && index === currentWordIndex) {
            wordText.textContent = '**';
        } else {
            wordText.textContent = word.word;
        }
        wordText.onclick = () => {
            if (isErrorBookMode) {
                openErrorWordLinkPage(index);
            } else {
                openWordLinkPage(index);
            }
        };
        
        const wordIndex = document.createElement('div');
        wordIndex.className = 'chain-word-index';
        wordIndex.textContent = index + 1;
        
        wordElement.appendChild(wordText);
        wordElement.appendChild(wordIndex);
        fragment.appendChild(wordElement);
    });
    
    // 清空容器并添加文档片段
    chainContainer.innerHTML = '';
    chainContainer.appendChild(fragment);
    
    // 滚动到当前单词位置
    setTimeout(() => {
        const currentElement = document.getElementById(`chain-word-${currentWordIndex}`);
        if (currentElement) {
            currentElement.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
        }
    }, 100);
}

// 更新学习内容
export function updateLearningContent() {
    const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
    if (!currentWord) return;
    
    // 更新学页面
    const wordLetters = document.getElementById('wordLetters');
    if (wordLetters) {
        wordLetters.innerHTML = '';
        // 将单词按空格分割成词组
        const wordsArray = currentWord.word.split(' ');
        
        wordsArray.forEach((word, wordIndex) => {
            // 创建单词容器，确保单词作为一个整体
            const wordContainer = document.createElement('span');
            wordContainer.className = 'word-container';
            wordContainer.style.display = 'inline-block';
            wordContainer.style.whiteSpace = 'nowrap';
            
            // 为单词中的每个字母创建元素
            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                const letter = document.createElement('span');
                letter.className = 'letter';
                letter.textContent = char;
                const colorCode = getPhoneticColor(char, i, word);
                switch (colorCode) {
                    case 'r':
                        letter.style.color = '#e74c3c';
                        break;
                    case 'b':
                        letter.style.color = '#3498db';
                        break;
                    case 'g':
                        letter.style.color = '#2ecc71';
                        break;
                    default:
                        letter.style.color = '#333333';
                }
                wordContainer.appendChild(letter);
            }
            
            wordLetters.appendChild(wordContainer);
            
            // 在单词之间添加空格（除了最后一个单词）
            if (wordIndex < wordsArray.length - 1) {
                const space = document.createElement('span');
                space.className = 'letter-space';
                space.innerHTML = '&nbsp;';
                space.style.margin = '0 8px';
                wordLetters.appendChild(space);
            }
        });
    }
    
    const phoneticWrapper = document.getElementById('phoneticWrapper');
    if (phoneticWrapper) {
        phoneticWrapper.textContent = currentWord.phonetic || '';
    }
    
    const learnMeaning = document.getElementById('learnMeaning');
    if (learnMeaning) {
        learnMeaning.textContent = currentWord.meaning;
    }
    
    const learnExample = document.getElementById('learnExample');
    if (learnExample) {
        learnExample.textContent = currentWord.example || '例句';
    }
    
    const learnExampleTranslation = document.getElementById('learnExampleTranslation');
    if (learnExampleTranslation) {
        learnExampleTranslation.textContent = currentWord.translation || '例句翻译';
    }
    
    // 更新读页面
    const readWord = document.getElementById('readWord');
    if (readWord) {
        readWord.textContent = currentWord.word;
    }
    
    const readPhonetic = document.getElementById('readPhonetic');
    if (readPhonetic) {
        readPhonetic.textContent = currentWord.phonetic || '';
    }
    
    // 更新拼页面
    const spellWord = document.getElementById('spellWord');
    if (spellWord) {
        spellWord.textContent = currentWord.word;
    }
    
    const spellInputs = document.getElementById('spellInputs');
    if (spellInputs) {
        spellInputs.innerHTML = '';
        for (let i = 0; i < currentWord.word.length; i++) {
            const inputBox = document.createElement('div');
            inputBox.className = 'spell-input-box';
            inputBox.dataset.index = i;
            inputBox.onclick = () => removeLetter(i);
            spellInputs.appendChild(inputBox);
        }
    }
    
    const spellPhonetic = document.getElementById('spellPhonetic');
    if (spellPhonetic) {
        spellPhonetic.textContent = currentWord.phonetic || '';
    }
    
    const spellLetters = document.getElementById('spellLetters');
    if (spellLetters) {
        spellLetters.innerHTML = '';
        const letters = currentWord.word.split('');
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        letters.forEach((letter, index) => {
            const letterButton = document.createElement('div');
            letterButton.className = 'spell-letter';
            letterButton.textContent = letter;
            letterButton.onclick = () => addLetter(letter);
            spellLetters.appendChild(letterButton);
        });
    }
    
    // 更新写页面
    const writeWord = document.getElementById('writeWord');
    if (writeWord) {
        writeWord.textContent = currentWord.word;
    }
    
    const writePhonetic = document.getElementById('writePhonetic');
    if (writePhonetic) {
        writePhonetic.textContent = currentWord.phonetic || '';
    }
    
    const writeMeaning = document.getElementById('writeMeaning');
    if (writeMeaning) {
        writeMeaning.textContent = currentWord.meaning;
    }
    
    const writeInput = document.getElementById('writeInput');
    if (writeInput) {
        writeInput.value = '';
    }
    
    const writeResult = document.getElementById('writeResult');
    if (writeResult) {
        writeResult.textContent = '';
        writeResult.classList.remove('correct', 'incorrect');
    }
    
    // 更新练习页面
    generatePracticeQuestion(currentWord);
}

// 重置学习步骤
export function resetLearningSteps() {
    const steps = document.querySelectorAll('.step-item');
    steps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    // 设置第一个步骤为活动状态
    document.querySelector('.step-item[data-step="learn"]').classList.add('active');
    
    // 隐藏所有内容区域
    const contentAreas = document.querySelectorAll('.step-content');
    contentAreas.forEach(content => {
        content.classList.remove('active');
    });
    
    // 显示第一个内容区域
    document.getElementById('contentLearn').classList.add('active');
}

// 切换学习步骤
export function switchStep(step) {
    setCurrentStep(step);
    
    // 更新步骤状态
    const steps = document.querySelectorAll('.step-item');
    steps.forEach(s => {
        s.classList.remove('active', 'completed');
        if (s.dataset.step === step) {
            s.classList.add('active');
        } else if (['learn', 'read', 'practice', 'spell', 'write'].indexOf(s.dataset.step) < ['learn', 'read', 'practice', 'spell', 'write'].indexOf(step)) {
            s.classList.add('completed');
        }
    });
    
    // 更新内容区域
    const contentAreas = document.querySelectorAll('.step-content');
    contentAreas.forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`content${step.charAt(0).toUpperCase() + step.slice(1)}`).classList.add('active');
    
    // 自动播放单词发音
    const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
    if (currentWord && currentWord.word) {
        AudioManager.playWordAudio(currentWord.word, false);
    }
    
    // 更新单词链条
    generateWordChain();
}

// 检查当前步骤是否完成
export function isStepCompleted(step) {
    console.log('[isStepCompleted] 检查步骤:', step);
    switch (step) {
        case 'learn':
            // 学习步骤：只要播放过音频就算完成
            console.log('[isStepCompleted] 学习步骤：返回 true');
            return true;
        case 'read':
            // 阅读步骤：只要播放过音频就算完成
            console.log('[isStepCompleted] 阅读步骤：返回 true');
            return true;
        case 'practice':
            // 练习步骤：需要回答正确才算完成
            const practiceOptions = document.querySelectorAll('.practice-option');
            const correctOption = Array.from(practiceOptions).find(option => option.classList.contains('correct'));
            console.log('[isStepCompleted] 练习步骤：', correctOption !== undefined);
            return correctOption !== undefined;
        case 'spell':
            // 拼写步骤：需要检查拼写是否正确
            const spellResult = document.getElementById('spellResult');
            const spellCompleted = spellResult && spellResult.classList.contains('correct');
            console.log('[isStepCompleted] 拼写步骤：', spellCompleted);
            return spellCompleted;
        case 'write':
            // 书写步骤：需要检查书写是否正确
            const writeResult = document.getElementById('writeResult');
            const writeCompleted = writeResult && writeResult.classList.contains('correct');
            console.log('[isStepCompleted] 书写步骤：', writeCompleted);
            return writeCompleted;
        default:
            console.log('[isStepCompleted] 默认：返回 true');
            return true;
    }
}

// 下一步
export function nextStep() {
    console.group('[nextStep]');
    console.log('开始');
    try {
        console.log('当前步骤:', currentStep);
        
        // 处理拼写和书写步骤的特殊逻辑
        if (currentStep === 'spell') {
            console.log('处理拼写步骤');
            const inputBoxes = document.querySelectorAll('.spell-input-box');
            let userInput = '';
            inputBoxes.forEach(box => {
                userInput += box.textContent;
            });
            
            const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
            const resultElement = document.getElementById('spellResult');
            
            if (userInput === currentWord.word) {
                console.log('拼写正确');
                resultElement.textContent = '正确！';
                resultElement.classList.add('correct');
                resultElement.classList.remove('incorrect');
                AudioManager.playSuccessSound();
                
                // 停留1秒后进入下一步
                setTimeout(() => {
                    console.log('拼写正确，进入下一步');
                    const steps = ['learn', 'read', 'practice', 'spell', 'write'];
                    const currentIndex = steps.indexOf(currentStep);
                    if (currentIndex < steps.length - 1) {
                        const nextStepName = steps[currentIndex + 1];
                        console.log('进入下一步骤:', nextStepName);
                        switchStep(nextStepName);
                    } else {
                        setTimeout(() => {
                            goToNextWord();
                        }, 500);
                    }
                }, 1000);
            } else {
                console.log('拼写错误');
                resultElement.textContent = '错误，请重试！';
                resultElement.classList.add('incorrect');
                resultElement.classList.remove('correct');
                AudioManager.playErrorSound();
                // 添加到错词本
                DataManager.addErrorWord(currentUser, currentWord);
                // 停留在当前步骤
                return;
            }
        } else if (currentStep === 'write') {
            console.log('处理书写步骤');
            const input = document.getElementById('writeInput');
            const resultElement = document.getElementById('writeResult');
            const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
            
            if (input.value.trim() === currentWord.word) {
                console.log('书写正确');
                resultElement.textContent = '正确！';
                resultElement.classList.add('correct');
                resultElement.classList.remove('incorrect');
                AudioManager.playSuccessSound();
                
                // 停留1秒后进入下一步
                setTimeout(() => {
                    console.log('书写正确，进入下一步');
                    const steps = ['learn', 'read', 'practice', 'spell', 'write'];
                    const currentIndex = steps.indexOf(currentStep);
                    if (currentIndex < steps.length - 1) {
                        const nextStepName = steps[currentIndex + 1];
                        console.log('进入下一步骤:', nextStepName);
                        switchStep(nextStepName);
                    } else {
                        setTimeout(() => {
                            goToNextWord();
                        }, 500);
                    }
                }, 1000);
            } else {
                console.log('书写错误');
                resultElement.textContent = '错误，请重试！';
                resultElement.classList.add('incorrect');
                resultElement.classList.remove('correct');
                AudioManager.playErrorSound();
                // 添加到错词本
                DataManager.addErrorWord(currentUser, currentWord);
                // 停留在当前步骤
                return;
            }
        } else {
            // 其他步骤的原有逻辑
            // 检查当前步骤是否完成
            const completed = isStepCompleted(currentStep);
            console.log('当前步骤是否完成:', completed);
            
            if (!completed) {
                console.log('步骤未完成，显示提示');
                alert('请完成当前步骤后再继续！');
                return;
            }
            
            const steps = ['learn', 'read', 'practice', 'spell', 'write'];
            const currentIndex = steps.indexOf(currentStep);
            console.log('当前步骤索引:', currentIndex);
            console.log('步骤总数:', steps.length);
            
            if (currentIndex < steps.length - 1) {
                const nextStepName = steps[currentIndex + 1];
                console.log('进入下一步骤:', nextStepName);
                switchStep(nextStepName);
            } else {
                // 所有步骤完成，进入下一个单词
                console.log('所有步骤完成，进入下一个单词');
                // 延迟调用 goToNextWord
                setTimeout(() => {
                    console.log('延迟调用 goToNextWord');
                    goToNextWord();
                }, 500);
            }
        }
    } catch (error) {
        console.error('错误:', error);
        // 即使出错也要确保用户能够继续操作
        const steps = ['learn', 'read', 'practice', 'spell', 'write'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            const nextStepName = steps[currentIndex + 1];
            switchStep(nextStepName);
        } else {
            setTimeout(() => {
                goToNextWord();
            }, 500);
        }
    } finally {
        console.log('结束');
        console.groupEnd();
    }
}

// 上一个单词
export function goToPrevWord() {
    if (currentWordIndex > 0) {
        openWordLinkPage(currentWordIndex - 1);
    }
}

// 下一个单词
export function goToNextWord() {
    console.group('[goToNextWord]');
    console.log('开始');
    try {
        console.log('currentUser:', currentUser);
        console.log('currentFile:', currentFile);
        console.log('currentWordIndex:', currentWordIndex);
        console.log('words.length:', words.length);
        console.log('isErrorBookMode:', isErrorBookMode);
        console.log('errorWords.length:', errorWords.length);
        
        // 标记当前单词为已学
        const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
        console.log('当前单词:', currentWord);
        
        if (currentWord && currentWord.word) {
            console.log('标记单词为已学:', currentWord.word);
            console.log('[goToNextWord] 当前课本:', currentFile);
            
            // 如果是错词本模式，从错词本中删除该单词
            if (isErrorBookMode) {
                DataManager.removeErrorWord(currentUser, currentWord);
                console.log('[goToNextWord] 从错词本中删除单词成功');
            }
            
            // 使用DataManager标记单词为已学
            const bookData = DataManager.markWordAsLearned(currentUser, currentFile, currentWord);
            console.log('[goToNextWord] 标记单词为已学成功，已学数量:', bookData.learnedCount);
            
            // 使用DataManager添加积分
            DataManager.addPoints(currentUser, 1);
            console.log('[goToNextWord] 添加积分成功');
            
            // 更新统计显示
            updateStatsDisplay();
            console.log('已学标记和积分添加完成');
            
            // 执行页面重定向
            setTimeout(() => {
                console.log('延迟后执行页面重定向');
                if (isErrorBookMode) {
                    if (currentWordIndex < errorWords.length - 1) {
                        console.log('进入下一个错词:', currentWordIndex + 1);
                        openErrorWordLinkPage(currentWordIndex + 1);
                    } else {
                        console.log('最后一个错词，返回错词本页');
                        window.location.href = 'error-book.html';
                    }
                } else {
                    if (currentWordIndex < words.length - 1) {
                        console.log('进入下一个单词:', currentWordIndex + 1);
                        openWordLinkPage(currentWordIndex + 1);
                    } else {
                        console.log('最后一个单词，返回单词列表页');
                        backToWordList();
                    }
                }
            }, 500); // 增加延迟时间，确保数据完全保存
        } else {
            // 没有单词，直接进行页面重定向
            console.log('没有当前单词，直接进行页面重定向');
            setTimeout(() => {
                if (isErrorBookMode) {
                    window.location.href = 'error-book.html';
                } else {
                    if (currentWordIndex < words.length - 1) {
                        console.log('进入下一个单词:', currentWordIndex + 1);
                        openWordLinkPage(currentWordIndex + 1);
                    } else {
                        console.log('最后一个单词，返回单词列表页');
                        backToWordList();
                    }
                }
            }, 500);
        }
    } catch (error) {
        console.error('错误:', error);
        // 即使出错也要确保用户能够继续操作
        setTimeout(() => {
            if (isErrorBookMode) {
                window.location.href = 'error-book.html';
            } else {
                if (currentWordIndex < words.length - 1) {
                    openWordLinkPage(currentWordIndex + 1);
                } else {
                    backToWordList();
                }
            }
        }, 500);
    } finally {
        console.log('结束');
        console.groupEnd();
    }
}

// 标记单词为学会了
export function markAsLearned() {
    console.group('[markAsLearned]');
    console.log('开始');
    try {
        console.log('currentUser:', currentUser);
        console.log('currentFile:', currentFile);
        console.log('currentWordIndex:', currentWordIndex);
        
        // 获取当前单词
        const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
        console.log('当前单词:', currentWord);
        
        if (currentWord && currentWord.word) {
            console.log('标记单词为学会了:', currentWord.word);
            console.log('[markAsLearned] 当前课本:', currentFile);
            
            // 检查是否有错误（单词是否在错词本中）
            const userData = DataManager.getUserData(currentUser);
            const isErrorWord = userData.errorWords && userData.errorWords.some(word => word.word === currentWord.word);
            console.log('单词是否在错词本中:', isErrorWord);
            
            // 如果是错词本模式，从错词本中删除该单词
            if (isErrorBookMode) {
                DataManager.removeErrorWord(currentUser, currentWord);
                console.log('[markAsLearned] 从错词本中删除单词成功');
            }
            
            // 直接增加books中的单词学习数量，不添加到wordLearningRecords
            const userData2 = DataManager.getUserData(currentUser);
            if (!userData2.books) userData2.books = {};
            if (!userData2.books[currentFile]) {
                userData2.books[currentFile] = {
                    totalWords: words.length,
                    learnedCount: 0
                };
            }
            userData2.books[currentFile].learnedCount = (parseInt(userData2.books[currentFile].learnedCount) || 0) + 1;
            console.log('[markAsLearned] 更新已学数量:', userData2.books[currentFile].learnedCount);
            
            // 更新今日学习数据
            if (!userData2.today) {
                userData2.today = {
                    date: DataManager.getLocalDateString(),
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
            userData2.today.learning = (parseInt(userData2.today.learning) || 0) + 1;
            userData2.today.newWordsLearned = (parseInt(userData2.today.newWordsLearned) || 0) + 1;
            
            // 使用DataManager添加积分
            DataManager.addPoints(currentUser, 1);
            console.log('[markAsLearned] 添加积分成功');
            
            // 保存数据
            DataManager.saveUserData(currentUser, userData2);
            console.log('[markAsLearned] 保存数据成功');
            
            // 更新统计显示
            updateStatsDisplay();
            console.log('学会了标记和积分添加完成');
            
            // 执行页面重定向
            setTimeout(() => {
                console.log('延迟后执行页面重定向');
                if (isErrorBookMode) {
                    if (currentWordIndex < errorWords.length - 1) {
                        console.log('进入下一个错词:', currentWordIndex + 1);
                        openErrorWordLinkPage(currentWordIndex + 1);
                    } else {
                        console.log('最后一个错词，返回错词本页');
                        window.location.href = 'error-book.html';
                    }
                } else {
                    if (currentWordIndex < words.length - 1) {
                        console.log('进入下一个单词:', currentWordIndex + 1);
                        openWordLinkPage(currentWordIndex + 1);
                    } else {
                        console.log('最后一个单词，返回单词列表页');
                        backToWordList();
                    }
                }
            }, 500); // 增加延迟时间，确保数据完全保存
        } else {
            // 没有单词，直接进行页面重定向
            console.log('没有当前单词，直接进行页面重定向');
            setTimeout(() => {
                if (isErrorBookMode) {
                    window.location.href = 'error-book.html';
                } else {
                    if (currentWordIndex < words.length - 1) {
                        console.log('进入下一个单词:', currentWordIndex + 1);
                        openWordLinkPage(currentWordIndex + 1);
                    } else {
                        console.log('最后一个单词，返回单词列表页');
                        backToWordList();
                    }
                }
            }, 500);
        }
    } catch (error) {
        console.error('错误:', error);
        // 即使出错也要确保用户能够继续操作
        setTimeout(() => {
            if (isErrorBookMode) {
                window.location.href = 'error-book.html';
            } else {
                if (currentWordIndex < words.length - 1) {
                    openWordLinkPage(currentWordIndex + 1);
                } else {
                    backToWordList();
                }
            }
        }, 500);
    } finally {
        console.log('结束');
        console.groupEnd();
    }
}

// 返回单词列表页
export function backToWordList() {
    if (isErrorBookMode) {
        window.location.href = 'error-book.html';
    } else {
        window.location.href = 'word-list.html';
    }
}

// 更新导航按钮状态
export function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevWordBtn');
    const nextBtn = document.getElementById('nextWordBtn');
    const wordListLength = isErrorBookMode ? errorWords.length : words.length;
    
    if (prevBtn) {
        prevBtn.disabled = currentWordIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentWordIndex === wordListLength - 1;
    }
}

// 生成练习问题
export function generatePracticeQuestion(word) {
    const questionElement = document.getElementById('practiceQuestion');
    const optionsElement = document.getElementById('practiceOptions');
    
    if (!questionElement || !optionsElement) return;
    
    // 生成问题类型
    const questionTypes = ['meaning', 'word'];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    if (questionType === 'meaning') {
        // 给出单词，选择释义
        questionElement.textContent = `"${word.word}" 的意思是？`;
        
        // 生成选项
        const options = [word.meaning];
        
        // 添加干扰选项
        while (options.length < 4) {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            if (!options.includes(randomWord.meaning)) {
                options.push(randomWord.meaning);
            }
        }
        
        // 打乱选项顺序
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        // 渲染选项
        optionsElement.innerHTML = options.map(option => {
            return `
            <div class="practice-option" onclick="checkPracticeAnswer('${option}', '${word.meaning}')">
                ${option}
            </div>
            `;
        }).join('');
    } else {
        // 给出释义，选择单词
        questionElement.textContent = `哪个单词的意思是 "${word.meaning}"？`;
        
        // 生成选项
        const options = [word.word];
        
        // 添加干扰选项
        while (options.length < 4) {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            if (!options.includes(randomWord.word)) {
                options.push(randomWord.word);
            }
        }
        
        // 打乱选项顺序
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        // 渲染选项
        optionsElement.innerHTML = options.map(option => {
            return `
            <div class="practice-option" onclick="checkPracticeAnswer('${option}', '${word.word}')">
                ${option}
            </div>
            `;
        }).join('');
    }
}

// 检查练习答案
export function checkPracticeAnswer(selected, correct) {
    const options = document.querySelectorAll('.practice-option');
    options.forEach(option => {
        if (option.textContent.trim() === correct) {
            option.classList.add('correct');
        } else if (option.textContent.trim() === selected) {
            option.classList.add('incorrect');
        }
        option.onclick = null;
    });
    
    // 播放音效
    if (selected === correct) {
        AudioManager.playSuccessSound();
        
        // 使用DataManager获取用户数据
        const userData = DataManager.getUserData(currentUser);
        
        // 更新测试和正确数量
        userData.today.testing = (userData.today.testing || 0) + 1;
        userData.total.testing = (userData.total.testing || 0) + 1;
        userData.today.correct = (userData.today.correct || 0) + 1;
        userData.total.correct = (userData.total.correct || 0) + 1;
        
        // 保存数据
        DataManager.saveUserData(currentUser, userData);
        console.log('[checkPracticeAnswer] 练习正确，更新正确数量');
    } else {
        AudioManager.playErrorSound();
        // 添加到错词本
        const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
        DataManager.addErrorWord(currentUser, currentWord);
        
        // 使用DataManager获取用户数据
        const userData = DataManager.getUserData(currentUser);
        
        // 更新测试数量
        userData.today.testing = (userData.today.testing || 0) + 1;
        userData.total.testing = (userData.total.testing || 0) + 1;
        
        // 保存数据
        DataManager.saveUserData(currentUser, userData);
        console.log('[checkPracticeAnswer] 练习错误，更新测试数量');
        
        // 检查错误状态，禁用"学会了"按钮
        if (typeof window.checkErrorWordStatus === 'function') {
            window.checkErrorWordStatus();
        }
    }
    
    // 延迟进入下一步
    setTimeout(() => {
        nextStep();
    }, 1000);
}

// 添加字母到拼写输入框
export function addLetter(letter) {
    const inputBoxes = document.querySelectorAll('.spell-input-box');
    for (let i = 0; i < inputBoxes.length; i++) {
        if (!inputBoxes[i].textContent) {
            inputBoxes[i].textContent = letter;
            break;
        }
    }
}

// 从拼写输入框移除字母
export function removeLetter(index) {
    const inputBoxes = document.querySelectorAll('.spell-input-box');
    if (inputBoxes[index]) {
        inputBoxes[index].textContent = '';
    }
}

// 检查拼写
export function checkSpelling() {
    const inputBoxes = document.querySelectorAll('.spell-input-box');
    let userInput = '';
    
    inputBoxes.forEach(box => {
        userInput += box.textContent;
    });
    
    const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
    const resultElement = document.getElementById('spellResult');
    
    if (userInput === currentWord.word) {
        resultElement.textContent = '正确！';
        resultElement.classList.add('correct');
        resultElement.classList.remove('incorrect');
        AudioManager.playSuccessSound();
    } else {
        resultElement.textContent = '错误，请重试！';
        resultElement.classList.add('incorrect');
        resultElement.classList.remove('correct');
        AudioManager.playErrorSound();
        // 添加到错词本
        DataManager.addErrorWord(currentUser, currentWord);
        
        // 检查错误状态，禁用"学会了"按钮
        if (typeof window.checkErrorWordStatus === 'function') {
            window.checkErrorWordStatus();
        }
    }
}

// 检查书写
export function checkWriting() {
    const input = document.getElementById('writeInput');
    const resultElement = document.getElementById('writeResult');
    const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
    
    if (input.value.trim() === currentWord.word) {
        resultElement.textContent = '正确！';
        resultElement.classList.add('correct');
        resultElement.classList.remove('incorrect');
        AudioManager.playSuccessSound();
    } else {
        resultElement.textContent = '错误，请重试！';
        resultElement.classList.add('incorrect');
        resultElement.classList.remove('correct');
        AudioManager.playErrorSound();
        // 添加到错词本
        DataManager.addErrorWord(currentUser, currentWord);
        
        // 检查错误状态，禁用"学会了"按钮
        if (typeof window.checkErrorWordStatus === 'function') {
            window.checkErrorWordStatus();
        }
    }
}

// 清除书写输入
export function clearWriteInput() {
    const input = document.getElementById('writeInput');
    if (input) {
        input.value = '';
    }
    
    const resultElement = document.getElementById('writeResult');
    if (resultElement) {
        resultElement.textContent = '';
        resultElement.classList.remove('correct', 'incorrect');
    }
}

// 打开单词学习页面
export function openWordLinkPage(index) {
    console.log('打开单词学习页面，索引:', index);
    setCurrentWordIndex(index);
    setCurrentStep('learn');
    window.location.href = `word-link.html?index=${index}`;
}

// 打开错词学习页面
export function openErrorWordLinkPage(index) {
    console.log('打开错词学习页面，索引:', index);
    setCurrentWordIndex(index);
    setCurrentStep('learn');
    window.location.href = `word-link.html?index=${index}&errorBook=true`;
}

// 更新统计显示
export function updateStatsDisplay() {
    // 实现统计显示更新逻辑
    console.log('更新统计显示');
}

// 生成错词链条
export function generateErrorWordChain() {
    const chainContainer = document.getElementById('wordChain');
    if (!chainContainer) return;
    chainContainer.innerHTML = '';
    
    errorWords.forEach((word, index) => {
        const wordElement = document.createElement('div');
        wordElement.className = 'chain-word-item';
        
        const wordText = document.createElement('div');
        wordText.className = 'chain-word';
        wordText.id = `chain-word-${index}`;
        
        if (index === currentWordIndex) {
            wordText.classList.add('current');
        } else if (index < currentWordIndex) {
            wordText.classList.add('completed');
        } else {
            wordText.classList.add('pending');
        }
        
        // 在拼和写步骤中遮挡当前学习的单词
        if ((currentStep === 'spell' || currentStep === 'write') && index === currentWordIndex) {
            wordText.textContent = '**';
        } else {
            wordText.textContent = word.word;
        }
        wordText.onclick = () => openErrorWordLinkPage(index);
        
        const wordIndex = document.createElement('div');
        wordIndex.className = 'chain-word-index';
        wordIndex.textContent = index + 1;
        
        wordElement.appendChild(wordText);
        wordElement.appendChild(wordIndex);
        chainContainer.appendChild(wordElement);
    });
    
    // 滚动到当前单词位置
    setTimeout(() => {
        const currentElement = document.getElementById(`chain-word-${currentWordIndex}`);
        if (currentElement) {
            currentElement.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
        }
    }, 100);
}

// 更新错词学习内容
export function updateErrorWordLearningContent() {
    const currentWord = errorWords[currentWordIndex];
    if (!currentWord) return;
    
    // 更新学页面
    const wordLetters = document.getElementById('wordLetters');
    if (wordLetters) {
        wordLetters.innerHTML = '';
        // 将单词按空格分割成词组
        const wordsArray = currentWord.word.split(' ');
        
        wordsArray.forEach((word, wordIndex) => {
            // 创建单词容器，确保单词作为一个整体
            const wordContainer = document.createElement('span');
            wordContainer.className = 'word-container';
            wordContainer.style.display = 'inline-block';
            wordContainer.style.whiteSpace = 'nowrap';
            
            // 为单词中的每个字母创建元素
            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                const letter = document.createElement('span');
                letter.className = 'letter';
                letter.textContent = char;
                const colorCode = getPhoneticColor(char, i, word);
                switch (colorCode) {
                    case 'r':
                        letter.style.color = '#e74c3c';
                        break;
                    case 'b':
                        letter.style.color = '#3498db';
                        break;
                    case 'g':
                        letter.style.color = '#2ecc71';
                        break;
                    default:
                        letter.style.color = '#333333';
                }
                wordContainer.appendChild(letter);
            }
            
            wordLetters.appendChild(wordContainer);
            
            // 在单词之间添加空格（除了最后一个单词）
            if (wordIndex < wordsArray.length - 1) {
                const space = document.createElement('span');
                space.className = 'letter-space';
                space.innerHTML = '&nbsp;';
                space.style.margin = '0 8px';
                wordLetters.appendChild(space);
            }
        });
    }
    
    const phoneticWrapper = document.getElementById('phoneticWrapper');
    if (phoneticWrapper) {
        phoneticWrapper.textContent = currentWord.phonetic || '';
    }
    
    const learnMeaning = document.getElementById('learnMeaning');
    if (learnMeaning) {
        learnMeaning.textContent = currentWord.meaning;
    }
    
    const learnExample = document.getElementById('learnExample');
    if (learnExample) {
        learnExample.textContent = currentWord.example || '例句';
    }
    
    const learnExampleTranslation = document.getElementById('learnExampleTranslation');
    if (learnExampleTranslation) {
        learnExampleTranslation.textContent = currentWord.translation || '例句翻译';
    }
    
    // 更新读页面
    const readWord = document.getElementById('readWord');
    if (readWord) {
        readWord.textContent = currentWord.word;
    }
    
    const readPhonetic = document.getElementById('readPhonetic');
    if (readPhonetic) {
        readPhonetic.textContent = currentWord.phonetic || '';
    }
    
    // 更新拼页面
    const spellWord = document.getElementById('spellWord');
    if (spellWord) {
        spellWord.textContent = currentWord.word;
    }
    
    const spellInputs = document.getElementById('spellInputs');
    if (spellInputs) {
        spellInputs.innerHTML = '';
        for (let i = 0; i < currentWord.word.length; i++) {
            const inputBox = document.createElement('div');
            inputBox.className = 'spell-input-box';
            inputBox.dataset.index = i;
            inputBox.onclick = () => removeLetter(i);
            spellInputs.appendChild(inputBox);
        }
    }
    
    const spellPhonetic = document.getElementById('spellPhonetic');
    if (spellPhonetic) {
        spellPhonetic.textContent = currentWord.phonetic || '';
    }
    
    const spellLetters = document.getElementById('spellLetters');
    if (spellLetters) {
        spellLetters.innerHTML = '';
        const letters = currentWord.word.split('');
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        letters.forEach((letter, index) => {
            const letterButton = document.createElement('div');
            letterButton.className = 'spell-letter';
            letterButton.textContent = letter;
            letterButton.onclick = () => addLetter(letter);
            spellLetters.appendChild(letterButton);
        });
    }
    
    // 更新写页面
    const writeWord = document.getElementById('writeWord');
    if (writeWord) {
        writeWord.textContent = currentWord.word;
    }
    
    const writePhonetic = document.getElementById('writePhonetic');
    if (writePhonetic) {
        writePhonetic.textContent = currentWord.phonetic || '';
    }
    
    const writeMeaning = document.getElementById('writeMeaning');
    if (writeMeaning) {
        writeMeaning.textContent = currentWord.meaning;
    }
    
    const writeInput = document.getElementById('writeInput');
    if (writeInput) {
        writeInput.value = '';
    }
    
    const writeResult = document.getElementById('writeResult');
    if (writeResult) {
        writeResult.textContent = '';
        writeResult.classList.remove('correct', 'incorrect');
    }
    
    // 更新练习页面
    generatePracticeQuestion(currentWord);
}

// 更新错词导航按钮
export function updateErrorWordNavigationButtons() {
    const prevBtn = document.getElementById('prevWordBtn');
    const nextBtn = document.getElementById('nextWordBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentWordIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentWordIndex === errorWords.length - 1;
    }
}

// 渲染错词列表
export function renderErrorWordList() {
    const listContainer = document.getElementById('errorWordList');
    if (!listContainer) return;
    
    const errorWords = DataManager.getErrorWords(currentUser);
    
    // 更新错词本标题，显示数量
    const errorBookTitle = document.querySelector('#errorBookPage .list-title');
    if (errorBookTitle) {
        errorBookTitle.textContent = `错词本 (${errorWords.length})`;
    }
    
    if (errorWords.length === 0) {
        listContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">错词本为空</div>';
        return;
    }
    
    listContainer.innerHTML = errorWords.map((word, index) => {
        return `
        <div class="word-item" data-index="${index}" onclick="openErrorWordLinkPage(${index})"><div class="word-info">
                <div class="word-text ${errorBookMaskMode === 'word' ? 'masked' : ''}" ${errorBookMaskMode === 'word' ? 'onclick="this.classList.remove(\'masked\'); event.stopPropagation();"' : ''}>${word.word}</div>
                <div class="word-phonetic">${word.phonetic || ''}</div>
            </div>
            <div class="word-meaning ${errorBookMaskMode === 'meaning' ? 'masked' : ''}" ${errorBookMaskMode === 'meaning' ? 'onclick="this.classList.remove(\'masked\'); event.stopPropagation();"' : ''}>${word.meaning}</div>
            <div class="word-actions">
                <button class="action-btn" onclick="AudioManager.playWordAudio('${word.word}', false); event.stopPropagation();">🔊</button>
            </div>
        </div>
        `;
    }).join('');
}

// 开始错词学习
export function startErrorWordLearning() {
    setErrorWords(DataManager.getErrorWords(currentUser));
    if (errorWords.length === 0) {
        alert('错词本为空');
        return;
    }
    setCurrentWordIndex(0);
    setCurrentStep('learn');
    openErrorWordLinkPage(0);
}

// 更新统计页面显示
export function updateStatsPage() {
    // 更新日期
    const statsDateElement = document.getElementById('statsDate');
    if (statsDateElement) {
        const today = new Date().toISOString().split('T')[0];
        statsDateElement.textContent = today;
    }
    
    // 获取用户数据
    const userData = DataManager.getUserData(currentUser);
    
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

// 获取音标颜色
export function getPhoneticColor(char, index, word) {
    // 元音字母
    const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    
    // 检查是否是元音
    if (vowels.includes(char)) {
        return 'r'; // 元音用红色
    } else {
        return 'b'; // 辅音用蓝色
    }
}

// 全局变量
let currentDate = new Date();
let checkinData = {};

// 打卡记录页面初始化
export function initCheckinHistoryPage() {
    console.log('[打卡记录页面初始化] 开始');
    // 加载用户数据
    loadUserData();
    // 渲染日历
    renderCalendar();
    console.log('[打卡记录页面初始化] 结束');
}

// 加载用户数据
export function loadUserData() {
    // 使用全局currentUser变量
    console.log('加载用户数据，当前用户:', currentUser);
    checkinData = DataManager.getUserData(currentUser);
    console.log('获取到的用户数据:', checkinData);
    console.log('打卡历史:', checkinData.checkinHistory);
    updateStats();
}

// 渲染日历
export function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 更新月份显示
    const currentMonthElement = document.getElementById('currentMonth');
    if (currentMonthElement) {
        currentMonthElement.textContent = `${year}年${month + 1}月`;
    }
    
    // 获取当月第一天
    const firstDay = new Date(year, month, 1);
    // 获取当月最后一天
    const lastDay = new Date(year, month + 1, 0);
    // 获取当月第一天是星期几
    const firstDayOfWeek = firstDay.getDay();
    // 获取当月的天数
    const daysInMonth = lastDay.getDate();
    
    // 计算需要显示的天数（包括上个月和下个月的部分天数）
    const startDate = new Date(year, month, 1 - firstDayOfWeek);
    const endDate = new Date(year, month, daysInMonth + (6 - lastDay.getDay()));
    
    // 清空日历
    const calendarBody = document.getElementById('calendarBody');
    if (calendarBody) {
        calendarBody.innerHTML = '';
        
        // 生成日历格子
        let tempDate = new Date(startDate);
        console.log('开始渲染日历，当前月份:', month + 1);
        console.log('打卡历史数据:', checkinData.checkinHistory);
        while (tempDate <= endDate) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // 检查是否是当月的日期
            if (tempDate.getMonth() !== month) {
                dayElement.classList.add('other-month');
            } else {
                // 检查是否打卡
                const dateString = formatDate(tempDate);
                console.log('检查日期:', dateString);
                const checkinHistory = checkinData.checkinHistory || [];
                console.log('检查时的打卡历史长度:', checkinHistory.length);
                const checkinItem = checkinHistory.find(item => 
                    (typeof item === 'string' ? item : item.date) === dateString
                );
                console.log('找到的打卡项:', checkinItem);
                if (checkinItem) {
                    dayElement.classList.add('checked-in');
                    // 显示积分
                    const pointsElement = document.createElement('div');
                    pointsElement.className = 'points';
                    pointsElement.textContent = `+${typeof checkinItem === 'string' ? 5 : checkinItem.points}`;
                    dayElement.appendChild(pointsElement);
                } else {
                    dayElement.classList.add('not-checked-in');
                }
            }
            
            // 添加日期
            const dayNumber = document.createElement('div');
            dayNumber.textContent = tempDate.getDate();
            dayElement.appendChild(dayNumber);
            
            calendarBody.appendChild(dayElement);
            
            // 移动到下一天
            tempDate.setDate(tempDate.getDate() + 1);
        }
        console.log('日历渲染完成');
    }
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 切换月份
export function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

// 更新统计信息
export function updateStats() {
    const totalCheckins = DataManager.getTotalCheckins(currentUser);
    const consecutiveDays = DataManager.getConsecutiveDays(currentUser);
    
    // 计算本月打卡次数和积分
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const checkinHistory = checkinData.checkinHistory || [];
    
    let monthlyCheckins = 0;
    let monthlyPoints = 0;
    
    checkinHistory.forEach(item => {
        const date = typeof item === 'string' ? item : item.date;
        const dateParts = date.split('-');
        if (parseInt(dateParts[0]) === year && parseInt(dateParts[1]) === month + 1) {
            monthlyCheckins++;
            monthlyPoints += typeof item === 'string' ? 5 : item.points;
        }
    });
    
    const totalCheckinsElement = document.getElementById('totalCheckins');
    if (totalCheckinsElement) {
        totalCheckinsElement.textContent = totalCheckins;
    }
    
    const consecutiveDaysElement = document.getElementById('consecutiveDays');
    if (consecutiveDaysElement) {
        consecutiveDaysElement.textContent = consecutiveDays;
    }
    
    const monthlyCheckinsElement = document.getElementById('monthlyCheckins');
    if (monthlyCheckinsElement) {
        monthlyCheckinsElement.textContent = monthlyCheckins;
    }
    
    const monthlyPointsElement = document.getElementById('monthlyPoints');
    if (monthlyPointsElement) {
        monthlyPointsElement.textContent = monthlyPoints;
    }
}

// 积分收支记录页面初始化
export function initPointsHistoryPage() {
    console.log('[积分收支记录页面初始化] 开始');
    // 加载积分汇总数据
    loadPointsSummary();
    // 加载积分记录
    loadPointsHistory();
    console.log('[积分收支记录页面初始化] 结束');
}

// 加载积分汇总数据
export function loadPointsSummary() {
    const summary = DataManager.getPointsSummary(currentUser);
    console.log('积分汇总数据:', summary);
    
    const totalIncomeElement = document.getElementById('totalIncome');
    if (totalIncomeElement) {
        totalIncomeElement.textContent = summary.totalIncome;
    }
    
    const totalExpenseElement = document.getElementById('totalExpense');
    if (totalExpenseElement) {
        totalExpenseElement.textContent = summary.totalExpense;
    }
    
    const currentBalanceElement = document.getElementById('currentBalance');
    if (currentBalanceElement) {
        currentBalanceElement.textContent = summary.balance;
    }
}

// 加载积分记录
export function loadPointsHistory() {
    const pointsHistory = DataManager.getPointsHistory(currentUser);
    console.log('积分记录数据:', pointsHistory);
    
    const pointsListElement = document.getElementById('pointsList');
    if (pointsListElement) {
        if (pointsHistory.length === 0) {
            pointsListElement.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">暂无积分记录</div>';
            return;
        }
        
        // 按日期降序排序
        pointsHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // 按日期分组
        const groupedByDate = {};
        pointsHistory.forEach(record => {
            if (!groupedByDate[record.date]) {
                groupedByDate[record.date] = [];
            }
            groupedByDate[record.date].push(record);
        });
        
        // 生成HTML
        let html = '';
        Object.keys(groupedByDate).forEach(date => {
            const records = groupedByDate[date];
            // 计算当天的总积分
            let dayTotal = 0;
            records.forEach(record => {
                if (record.type === 'income') {
                    dayTotal += record.amount;
                } else {
                    dayTotal -= record.amount;
                }
            });
            
            // 生成日期组
            html += `
                <div class="points-date-group">
                    <div class="date-header" onclick="toggleDateGroup('${date}')">
                        <div class="date-info">
                            <div class="date-text">${date}</div>
                            <div class="date-total">${dayTotal >= 0 ? '+' : ''}${dayTotal}</div>
                        </div>
                        <div class="date-toggle">▼</div>
                    </div>
                    <div class="date-records" id="dateGroup_${date}" style="display: none;">
                        ${records.map(record => {
                            const amountClass = record.type === 'income' ? 'income' : 'expense';
                            const amountSign = record.type === 'income' ? '+' : '-';
                            return `
                                <div class="points-item">
                                    <div class="points-description">${record.description}</div>
                                    <div class="points-amount ${amountClass}">${amountSign}${record.amount}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });
        
        pointsListElement.innerHTML = html;
    }
}

// 切换日期组的展开/折叠状态
export function toggleDateGroup(date) {
    const dateGroup = document.getElementById(`dateGroup_${date}`);
    const toggleIcon = document.querySelector(`[onclick="toggleDateGroup('${date}')"] .date-toggle`);
    
    if (dateGroup) {
        if (dateGroup.style.display === 'none') {
            dateGroup.style.display = 'block';
            if (toggleIcon) {
                toggleIcon.textContent = '▲';
            }
        } else {
            dateGroup.style.display = 'none';
            if (toggleIcon) {
                toggleIcon.textContent = '▼';
            }
        }
    }
}

// 暴露函数到全局作用域
window.toggleDateGroup = toggleDateGroup;