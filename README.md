# 儿童英语单词学习工具

基于外研版Join In教材的交互式英语学习应用

## 🚀 快速开始

### 启动方式1：使用启动脚本
```bash
./start-server.sh
```

### 启动方式2：直接运行Python服务器
```bash
python3 -m http.server 8080
```

### 启动方式3：使用Node.js
```bash
npx http-server -p 8080
```

然后在浏览器中访问：
```
http://localhost:8080/src/html/index.html
```

## ⚠️ 重要提示

**不能直接双击HTML文件打开！**

本项目使用ES6模块（import/export），必须通过HTTP服务器访问，否则会因浏览器安全限制导致模块加载失败，按钮无法响应。

## 📁 项目结构

```
/English
├── assets/PDF/          # 教材PDF文件(3-9年级)
├── data/               # 解析后的JSON数据和短文
├── src/
│   ├── html/           # 页面文件
│   ├── js/             # JavaScript代码
│   │   ├── modules/    # ES6模块
│   │   └── ...
│   └── style.css       # 样式文件
├── start-server.sh     # 启动脚本
└── README.md           # 本文件
```

## 🎯 核心功能

- 📚 分步学习：认读 → 跟读 → 练习 → 拼写 → 听写
- 📝 错题本：自动收集错误单词
- 🎮 游戏化：单词连连看、虚拟宠物
- 📊 统计分析：学习进度可视化
- 👥 多用户：独立学习数据
- ⭐ 打卡激励：积分和连续打卡

## 🛠️ 技术栈

- HTML5 + CSS3
- 原生JavaScript (ES6+)
- LocalStorage数据持久化
- pdf-parse库（PDF解析）

## 📖 使用说明

1. 启动本地服务器
2. 在浏览器访问首页
3. 选择用户（悠悠/兜兜）
4. 选择教材
5. 开始学习！

## 🔧 开发说明

### PDF预处理
```bash
cd src/js
node preprocess.js
```

将PDF教材转换为JSON数据文件。

## 📝 版权说明

本项目仅供个人学习使用，教材版权归外研社所有。
