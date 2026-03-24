// 单词管理模块

import { getCurrentUser, getCurrentFile } from './userManager.js';

let words = [];
let currentUnit = 'all';
let maskMode = 'none';
let errorBookMaskMode = 'none';
let currentWordIndex = 0;
let currentStep = 'learn';
let isErrorBookMode = false;
let errorWords = [];

/**
 * 加载单词数据
 */
export async function loadPDF() {
    console.log('[加载单词数据] 开始');
    const currentFile = getCurrentFile();
    const currentUser = getCurrentUser();
    console.log('[加载单词数据] currentFile:', currentFile);
    console.log('[加载单词数据] currentUser:', currentUser);
    showLoading();
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
            words = data;
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

/**
 * 原始PDF加载函数
 */
export async function loadPDFOriginal() {
    // 初始化 PDF.js
    if (!initPdfJs()) {
        console.error('PDF.js 库未加载，使用模拟数据');
        loadMockData();
        return;
    }
    
    try {
        const pdf = await pdfjsLib.getDocument({ 
            url: `../../assets/PDF/${getCurrentFile()}`, 
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/',
            cMapPacked: true
        }).promise;
        
        // console.log('PDF加载成功，页数:', pdf.numPages);
        await processPDF(pdf);
    } catch (error) {
        console.error('加载PDF失败:', error);
        // 使用模拟数据
        loadMockData();
    }
}

/**
 * 处理PDF文档
 */
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
            words = [];  // 重置单词列表
            
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
            
            // console.log('最终单词列表:', words);
            // console.log('单词数量:', words.length);
            
            // 初始化课本数据
            DataManager.initBookData(getCurrentUser(), getCurrentFile(), words.length);
            
            // 更新统计显示
            updateStatsDisplay();
            
            // 渲染单词列表
            renderWordList();
        });
    });
}

/**
 * 使用模拟数据
 */
export function loadMockData() {
    words = [
        { word: 'apple', phonetic: '/ˈæpl/', meaning: 'n. 苹果' },
        { word: 'banana', phonetic: '/bəˈnɑːnə/', meaning: 'n. 香蕉' },
        { word: 'cat', phonetic: '/kæt/', meaning: 'n. 猫' },
        { word: 'dog', phonetic: '/dɒɡ/', meaning: 'n. 狗' },
        { word: 'elephant', phonetic: '/ˈelɪfənt/', meaning: 'n. 大象' }
    ];
    
    // 更新统计显示
    updateStatsDisplay();
    
    // 渲染单词列表
    renderWordList();
}

/**
 * 渲染单词列表
 */
export function renderWordList() {
    const listContainer = document.getElementById('wordList');
    if (!listContainer) return;
    
    let filteredWords = words;
    
    // 按单元筛选
    if (currentUnit !== 'all') {
        filteredWords = filteredWords.filter(w => w.unit === currentUnit);
    }
    
    listContainer.innerHTML = filteredWords.map((word, index) => {
        return `
        <div class="word-item" data-index="${index}" onclick="openWordLinkPage(${index})"><div class="word-index">
                ${index + 1}
            </div>
            <div class="word-info">
                <div class="word-text ${maskMode === 'word' ? 'masked' : ''}" ${maskMode === 'word' ? 'onclick="this.classList.remove(\'masked\'); event.stopPropagation();"' : ''}>${word.word}</div>
                <div class="word-phonetic">${word.phonetic || ''}</div>
            </div>
            <div class="word-meaning ${maskMode === 'meaning' ? 'masked' : ''}" ${maskMode === 'meaning' ? 'onclick="this.classList.remove(\'masked\'); event.stopPropagation();"' : ''}>${word.meaning}</div>
            <div class="word-actions">
                <button class="action-btn" onclick="AudioManager.playWordAudio('${word.word}', false); event.stopPropagation();">🔊</button>
            </div>
        </div>
        `;
    }).join('');
    
    // 为错词本列表也添加序号
    const errorListContainer = document.getElementById('errorWordList');
    if (errorListContainer) {
        const errorWords = DataManager.getErrorWords(getCurrentUser());
        errorListContainer.innerHTML = errorWords.map((word, index) => {
            return `
            <div class="word-item" data-index="${index}" onclick="openErrorWordLinkPage(${index})"><div class="word-index">
                    ${index + 1}
                </div>
                <div class="word-info">
                    <div class="word-text">${word.word}</div>
                    <div class="word-phonetic">${word.phonetic || ''}</div>
                </div>
                <div class="word-meaning">${word.meaning}</div>
                <div class="word-actions">
                    <button class="action-btn" onclick="AudioManager.playWordAudio('${word.word}', false); event.stopPropagation();">🔊</button>
                </div>
            </div>
            `;
        }).join('');
    }
}

/**
 * 渲染错词列表
 */
export function renderErrorWordList() {
    const errorListContainer = document.getElementById('errorWordList');
    if (!errorListContainer) return;
    
    errorWords = DataManager.getErrorWords(getCurrentUser());
    errorListContainer.innerHTML = errorWords.map((word, index) => {
        return `
        <div class="word-item" data-index="${index}" onclick="openErrorWordLinkPage(${index})"><div class="word-index">
                ${index + 1}
            </div>
            <div class="word-info">
                <div class="word-text">${word.word}</div>
                <div class="word-phonetic">${word.phonetic || ''}</div>
            </div>
            <div class="word-meaning">${word.meaning}</div>
            <div class="word-actions">
                <button class="action-btn" onclick="AudioManager.playWordAudio('${word.word}', false); event.stopPropagation();">🔊</button>
            </div>
        </div>
        `;
    }).join('');
}

/**
 * 打开单词链路页面
 */
export function openWordLinkPage(index) {
    window.location.href = `word-link.html?index=${index}`;
}

/**
 * 打开错词链路页面
 */
export function openErrorWordLinkPage(index) {
    window.location.href = `word-link.html?index=${index}&errorBook=true`;
}

/**
 * 生成单词链条
 */
export function generateWordChain() {
    const chainContainer = document.getElementById('wordChain');
    if (!chainContainer) return;
    
    chainContainer.innerHTML = '';
    
    words.forEach((word, index) => {
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
        wordText.onclick = () => openWordLinkPage(index);
        
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

/**
 * 生成错词链条
 */
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

/**
 * 更新学习内容
 */
export function updateLearningContent() {
    const currentWord = words[currentWordIndex];
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

/**
 * 更新错词学习内容
 */
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

/**
 * 生成练习问题
 */
export function generatePracticeQuestion(word) {
    const questionElement = document.getElementById('practiceQuestion');
    const optionsElement = document.getElementById('practiceOptions');
    
    if (!questionElement || !optionsElement) return;
    
    // 生成问题（根据单词生成中文意思选择题）
    questionElement.textContent = `"${word.word}" 的意思是？`;
    
    // 生成选项（包含正确答案和3个干扰项）
    const options = [word.meaning];
    
    // 从其他单词中随机选择3个不同的意思作为干扰项
    const otherWords = words.filter(w => w !== word);
    while (options.length < 4 && otherWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherWords.length);
        const randomWord = otherWords[randomIndex];
        if (!options.includes(randomWord.meaning)) {
            options.push(randomWord.meaning);
        }
        otherWords.splice(randomIndex, 1);
    }
    
    // 随机打乱选项顺序
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    // 渲染选项
    optionsElement.innerHTML = options.map((option, index) => {
        const isCorrect = option === word.meaning;
        return `
        <div class="practice-option ${isCorrect ? 'correct' : ''}" onclick="checkPracticeAnswer(this, ${isCorrect})">
            ${option}
        </div>
        `;
    }).join('');
}

/**
 * 检查练习答案
 */
export function checkPracticeAnswer(element, isCorrect) {
    // 禁用所有选项
    const options = document.querySelectorAll('.practice-option');
    options.forEach(option => {
        option.onclick = null;
    });
    
    // 标记正确和错误选项
    if (isCorrect) {
        element.classList.add('correct');
        // 播放正确音效
        AudioManager.playCorrectSound();
    } else {
        element.classList.add('incorrect');
        // 标记正确选项
        const correctOption = document.querySelector('.practice-option.correct');
        if (correctOption) {
            correctOption.classList.add('correct');
        }
        // 播放错误音效
        AudioManager.playErrorSound();
        // 添加到错词本
        const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
        DataManager.addErrorWord(getCurrentUser(), currentWord);
    }
}

/**
 * 检查拼写答案
 */
export function checkSpelling() {
    const spellInputs = document.querySelectorAll('.spell-input-box');
    const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
    let userInput = '';
    
    spellInputs.forEach(input => {
        userInput += input.textContent || '';
    });
    
    const spellResult = document.getElementById('spellResult');
    if (spellResult) {
        if (userInput.toLowerCase() === currentWord.word.toLowerCase()) {
            spellResult.textContent = '拼写正确！';
            spellResult.classList.add('correct');
            // 播放正确音效
            AudioManager.playCorrectSound();
        } else {
            spellResult.textContent = '拼写错误，请重试！';
            spellResult.classList.add('incorrect');
            // 播放错误音效
            AudioManager.playErrorSound();
            // 添加到错词本
            DataManager.addErrorWord(getCurrentUser(), currentWord);
        }
    }
}

/**
 * 检查书写答案
 */
export function checkWriting() {
    const writeInput = document.getElementById('writeInput');
    const currentWord = isErrorBookMode ? errorWords[currentWordIndex] : words[currentWordIndex];
    const userInput = writeInput.value.trim();
    
    const writeResult = document.getElementById('writeResult');
    if (writeResult) {
        if (userInput.toLowerCase() === currentWord.word.toLowerCase()) {
            writeResult.textContent = '书写正确！';
            writeResult.classList.add('correct');
            // 播放正确音效
            AudioManager.playCorrectSound();
        } else {
            writeResult.textContent = '书写错误，请重试！';
            writeResult.classList.add('incorrect');
            // 播放错误音效
            AudioManager.playErrorSound();
            // 添加到错词本
            DataManager.addErrorWord(getCurrentUser(), currentWord);
        }
    }
}

/**
 * 添加字母到拼写输入框
 */
export function addLetter(letter) {
    const spellInputs = document.querySelectorAll('.spell-input-box');
    for (let i = 0; i < spellInputs.length; i++) {
        if (!spellInputs[i].textContent) {
            spellInputs[i].textContent = letter;
            break;
        }
    }
}

/**
 * 从拼写输入框移除字母
 */
export function removeLetter(index) {
    const spellInputs = document.querySelectorAll('.spell-input-box');
    if (spellInputs[index]) {
        spellInputs[index].textContent = '';
    }
}

/**
 * 清除书写输入框
 */
export function clearWriteInput() {
    const writeInput = document.getElementById('writeInput');
    if (writeInput) {
        writeInput.value = '';
    }
}

/**
 * 重置学习步骤
 */
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

/**
 * 切换学习步骤
 */
export function switchStep(step) {
    currentStep = step;
    
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

/**
 * 检查当前步骤是否完成
 */
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

/**
 * 下一步
 */
export function nextStep() {
    console.group('[nextStep]');
    console.log('开始');
    try {
        console.log('当前步骤:', currentStep);
        
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
            // 直接在这里添加日志，确保能看到执行到这里
            console.log('准备调用 goToNextWord');
            // 延迟调用 goToNextWord，确保日志被记录
            setTimeout(() => {
                console.log('延迟调用 goToNextWord');
                goToNextWord();
            }, 500); // 延长到500毫秒
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

/**
 * 上一个单词
 */
export function goToPrevWord() {
    if (currentWordIndex > 0) {
        if (isErrorBookMode) {
            openErrorWordLinkPage(currentWordIndex - 1);
        } else {
            openWordLinkPage(currentWordIndex - 1);
        }
    }
}

/**
 * 下一个单词
 */
export function goToNextWord() {
    console.group('[goToNextWord]');
    console.log('开始');
    try {
        const currentUser = getCurrentUser();
        const currentFile = getCurrentFile();
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

/**
 * 返回单词列表页
 */
export function backToWordList() {
    window.location.href = 'word-list.html';
}

/**
 * 更新导航按钮状态
 */
export function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevWordBtn');
    const nextBtn = document.getElementById('nextWordBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentWordIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentWordIndex === words.length - 1;
    }
}

/**
 * 更新错词导航按钮状态
 */
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

/**
 * 初始化 PDF.js
 */
export function initPdfJs() {
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        console.log('[PDF.js] 初始化成功');
        return true;
    }
    console.warn('[PDF.js] 库未加载');
    return false;
}

/**
 * 获取音标颜色
 */
export function getPhoneticColor(char, index, word) {
    // 这里可以根据音标规则实现不同字母的颜色标记
    // 暂时返回默认颜色
    return '';
}

/**
 * 显示加载中
 */
export function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
}

/**
 * 隐藏加载中
 */
export function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

/**
 * 开始学习 - 进入单词列表页
 */
export function startLearning() {
    window.location.href = 'word-list.html';
}

/**
 * 开始详细学习 - 进入单词学习页面
 */
export function startDetailedLearning() {
    window.location.href = 'word-link.html?index=0';
}

/**
 * 打开文章列表页面
 */
export function openArticleListPage() {
    window.location.href = 'article-list.html';
}

/**
 * 返回首页
 */
export function backToHome() {
    window.location.href = 'index.html';
}

/**
 * 显示课本选择弹窗
 */
export function showBookModal() {
    document.getElementById('bookModal').classList.add('active');
}

/**
 * 关闭课本选择弹窗
 */
export function closeBookModal() {
    document.getElementById('bookModal').classList.remove('active');
}

/**
 * 显示用户选择弹窗
 */
export function showUserModal() {
    document.getElementById('userModal').classList.add('active');
}

/**
 * 生成单元标签
 */
export function generateUnitTabs() {
    const tabsContainer = document.getElementById('unitTabs');
    if (!tabsContainer) return;
    
    tabsContainer.innerHTML = '';
}

// 导入其他模块的函数
import { updateStatsDisplay } from './statsManager.js';
