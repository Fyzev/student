#!/bin/bash

# 学生管理系统启动脚本

echo "🚀 学生管理系统启动脚本"
echo "================================"

# 检查Node.js版本
echo "📋 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 16+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js 版本过低，需要 16+ 版本"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $(node -v)"

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi

echo "✅ npm 检查通过: $(npm -v)"

# 创建必要的目录
echo "📁 创建必要目录..."
mkdir -p backend/logs
mkdir -p backend/uploads
mkdir -p frontend/dist

# 安装后端依赖
echo "📦 安装后端依赖..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 后端依赖安装失败"
        exit 1
    fi
else
    echo "✅ 后端依赖已存在"
fi

# 检查环境变量文件
if [ ! -f ".env" ]; then
    echo "📝 创建环境变量文件..."
    cp env.example .env
    echo "✅ 环境变量文件已创建，请根据需要修改 .env 文件"
fi

# 初始化数据库
echo "🗄️ 初始化数据库..."
npm run db:generate
npm run db:push

if [ $? -ne 0 ]; then
    echo "❌ 数据库初始化失败"
    exit 1
fi

echo "✅ 数据库初始化完成"

# 启动后端服务
echo "🔧 启动后端服务..."
npm run dev &
BACKEND_PID=$!

# 等待后端启动
echo "⏳ 等待后端服务启动..."
sleep 5

# 检查后端是否启动成功
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ 后端服务启动成功"
else
    echo "❌ 后端服务启动失败"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

cd ..

# 安装前端依赖
echo "📦 安装前端依赖..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 前端依赖安装失败"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
else
    echo "✅ 前端依赖已存在"
fi

# 启动前端服务
echo "🎨 启动前端服务..."
npm run dev &
FRONTEND_PID=$!

cd ..

# 等待前端启动
echo "⏳ 等待前端服务启动..."
sleep 3

echo ""
echo "🎉 学生管理系统启动完成！"
echo "================================"
echo "📱 前端地址: http://localhost:3000"
echo "🔧 后端API: http://localhost:3001"
echo "📊 健康检查: http://localhost:3001/health"
echo ""
echo "💡 提示:"
echo "- 按 Ctrl+C 停止所有服务"
echo "- 查看日志: tail -f backend/logs/app.log"
echo "- 数据库管理: cd backend && npm run db:studio"
echo ""

# 等待用户中断
trap 'echo ""; echo "🛑 正在停止服务..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo "✅ 服务已停止"; exit 0' INT

# 保持脚本运行
wait 