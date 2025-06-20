@echo off
chcp 65001 >nul

echo 🚀 学生管理系统启动脚本
echo ================================

REM 检查Node.js版本
echo 📋 检查环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装，请先安装 Node.js 16+
    pause
    exit /b 1
)

for /f "tokens=1,2 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:~1%
if %NODE_VERSION% lss 16 (
    echo ❌ Node.js 版本过低，需要 16+ 版本
    pause
    exit /b 1
)

echo ✅ Node.js 版本检查通过: 
node --version

REM 检查npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm 未安装
    pause
    exit /b 1
)

echo ✅ npm 检查通过:
npm --version

REM 创建必要的目录
echo 📁 创建必要目录...
if not exist "backend\logs" mkdir backend\logs
if not exist "backend\uploads" mkdir backend\uploads
if not exist "frontend\dist" mkdir frontend\dist

REM 安装后端依赖
echo 📦 安装后端依赖...
cd backend
if not exist "node_modules" (
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 后端依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo ✅ 后端依赖已存在
)

REM 检查环境变量文件
if not exist ".env" (
    echo 📝 创建环境变量文件...
    copy env.example .env >nul
    echo ✅ 环境变量文件已创建，请根据需要修改 .env 文件
)

REM 初始化数据库
echo 🗄️ 初始化数据库...
npm run db:generate
npm run db:push

if %errorlevel% neq 0 (
    echo ❌ 数据库初始化失败
    pause
    exit /b 1
)

echo ✅ 数据库初始化完成

REM 启动后端服务
echo 🔧 启动后端服务...
start "Backend Server" npm run dev

REM 等待后端启动
echo ⏳ 等待后端服务启动...
timeout /t 5 /nobreak >nul

cd ..

REM 安装前端依赖
echo 📦 安装前端依赖...
cd frontend
if not exist "node_modules" (
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 前端依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo ✅ 前端依赖已存在
)

REM 启动前端服务
echo 🎨 启动前端服务...
start "Frontend Server" npm run dev

cd ..

REM 等待前端启动
echo ⏳ 等待前端服务启动...
timeout /t 3 /nobreak >nul

echo.
echo 🎉 学生管理系统启动完成！
echo ================================
echo 📱 前端地址: http://localhost:3000
echo 🔧 后端API: http://localhost:3001
echo 📊 健康检查: http://localhost:3001/health
echo.
echo 💡 提示:
echo - 关闭命令行窗口停止所有服务
echo - 查看日志: type backend\logs\app.log
echo - 数据库管理: cd backend ^&^& npm run db:studio
echo.

pause 