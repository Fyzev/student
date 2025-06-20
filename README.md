# 学生管理系统

一个基于 React + Node.js + TypeScript 的现代化学生管理系统，提供完整的学生、教师、课程、成绩和考勤管理功能。

## 🚀 技术栈

### 前端
- **React 18** - 用户界面库
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速构建工具
- **Tailwind CSS** - 实用优先的CSS框架
- **React Router** - 路由管理
- **React Query** - 数据获取和缓存
- **React Hook Form** - 表单管理
- **Lucide React** - 图标库

### 后端
- **Node.js** - JavaScript运行时
- **Express.js** - Web应用框架
- **TypeScript** - 类型安全的JavaScript
- **Prisma** - 现代数据库ORM
- **SQLite** - 轻量级数据库
- **JWT** - 身份认证
- **bcryptjs** - 密码加密
- **Winston** - 日志记录

## 📁 项目结构

```
student-management-system/
├── backend/                 # Node.js后端应用
│   ├── src/
│   │   ├── controllers/    # 控制器
│   │   ├── middleware/     # 中间件
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # 路由
│   │   ├── services/       # 业务逻辑
│   │   ├── types/          # TypeScript类型定义
│   │   ├── utils/          # 工具函数
│   │   └── index.ts        # 应用入口
│   ├── prisma/             # 数据库schema
│   ├── package.json        # 依赖配置
│   └── tsconfig.json       # TypeScript配置
├── frontend/               # React前端应用
│   ├── src/
│   │   ├── components/     # 通用组件
│   │   ├── pages/          # 页面组件
│   │   ├── services/       # API服务
│   │   ├── types/          # TypeScript类型定义
│   │   ├── utils/          # 工具函数
│   │   ├── App.tsx         # 主应用组件
│   │   └── main.tsx        # 应用入口
│   ├── package.json        # 依赖配置
│   ├── vite.config.ts      # Vite配置
│   └── tailwind.config.js  # Tailwind配置
└── README.md               # 项目说明
```

## 🛠️ 功能特性

### 核心功能
- ✅ 用户认证和授权
- ✅ 学生信息管理
- ✅ 教师信息管理
- ✅ 班级管理
- ✅ 课程管理
- ✅ 选课管理
- ✅ 成绩管理
- ✅ 考勤管理
- ✅ 通知公告

### 技术特性
- 🔐 JWT身份认证
- 🛡️ 角色权限控制
- 📱 响应式设计
- 🎨 现代化UI
- ⚡ 高性能
- 🔍 数据验证
- 📊 数据统计
- 📝 操作日志

## 🚀 快速开始

### 环境要求
- Node.js 16+
- npm 或 yarn

### 1. 克隆项目
```bash
git clone <repository-url>
cd student-management-system
```

### 2. 安装依赖

#### 后端
```bash
cd backend
npm install
```

#### 前端
```bash
cd frontend
npm install
```

### 3. 配置环境变量

#### 后端
复制 `backend/env.example` 为 `backend/.env` 并配置：
```env
DATABASE_URL="file:./dev.db"
PORT=3001
JWT_SECRET=your-super-secret-jwt-key
```

### 4. 初始化数据库
```bash
cd backend
npm run db:generate
npm run db:push
```

### 5. 启动应用

#### 后端
```bash
cd backend
npm run dev
```

#### 前端
```bash
cd frontend
npm run dev
```

### 6. 访问应用
- 前端: http://localhost:3000
- 后端API: http://localhost:3001
- 健康检查: http://localhost:3001/health

## 📚 API文档

### 认证接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册
- `GET /api/auth/me` - 获取当前用户信息

### 学生管理
- `GET /api/students` - 获取学生列表
- `POST /api/students` - 创建学生
- `GET /api/students/:id` - 获取学生详情
- `PUT /api/students/:id` - 更新学生信息
- `DELETE /api/students/:id` - 删除学生

### 教师管理
- `GET /api/teachers` - 获取教师列表
- `POST /api/teachers` - 创建教师
- `GET /api/teachers/:id` - 获取教师详情
- `PUT /api/teachers/:id` - 更新教师信息
- `DELETE /api/teachers/:id` - 删除教师

### 班级管理
- `GET /api/classes` - 获取班级列表
- `POST /api/classes` - 创建班级
- `GET /api/classes/:id` - 获取班级详情
- `PUT /api/classes/:id` - 更新班级信息
- `DELETE /api/classes/:id` - 删除班级

### 课程管理
- `GET /api/courses` - 获取课程列表
- `POST /api/courses` - 创建课程
- `GET /api/courses/:id` - 获取课程详情
- `PUT /api/courses/:id` - 更新课程信息
- `DELETE /api/courses/:id` - 删除课程

### 成绩管理
- `GET /api/grades` - 获取成绩列表
- `POST /api/grades` - 创建成绩
- `GET /api/grades/:id` - 获取成绩详情
- `PUT /api/grades/:id` - 更新成绩
- `DELETE /api/grades/:id` - 删除成绩

### 考勤管理
- `GET /api/attendances` - 获取考勤列表
- `POST /api/attendances` - 创建考勤记录
- `GET /api/attendances/:id` - 获取考勤详情
- `PUT /api/attendances/:id` - 更新考勤记录
- `DELETE /api/attendances/:id` - 删除考勤记录

## 🎨 界面预览

### 登录页面
现代化的登录界面，支持用户名/邮箱登录

### 仪表盘
数据概览，包含统计卡片、图表和最近活动

### 学生管理
学生信息的增删改查，支持搜索和筛选

### 成绩管理
成绩录入和查看，支持多种成绩类型

## 🔧 开发指南

### 代码规范
- 使用 TypeScript 进行类型安全的开发
- 遵循 ESLint 和 Prettier 配置
- 使用有意义的变量和函数命名
- 添加适当的注释和文档

### 提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

### 分支管理
- `main` - 主分支，用于生产环境
- `develop` - 开发分支
- `feature/*` - 功能分支
- `hotfix/*` - 热修复分支

## 🧪 测试

### 后端测试
```bash
cd backend
npm test
```

### 前端测试
```bash
cd frontend
npm test
```

## 📦 部署

### 生产环境构建

#### 后端
```bash
cd backend
npm run build
npm start
```

#### 前端
```bash
cd frontend
npm run build
```

### Docker部署
```bash
docker-compose up -d
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 项目维护者: [Your Name]
- 邮箱: [your.email@example.com]
- 项目链接: [https://github.com/yourusername/student-management-system]

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
