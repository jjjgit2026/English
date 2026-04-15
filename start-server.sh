#!/bin/bash
# 启动本地开发服务器

echo "🚀 启动英语学习工具开发服务器..."
echo "📂 项目目录: $(pwd)"
echo "🌐 访问地址: http://localhost:8080/src/html/index.html"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

python3 -m http.server 8080
