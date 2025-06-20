import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from './utils/database';
import logger from './utils/logger';

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();
const PORT = process.env['PORT'] || 3001;

// 安全中间件
app.use(helmet());

// CORS配置
app.use(cors({
  origin: process.env['CORS_ORIGIN'] || 'http://localhost:3000',
  credentials: true
}));

// 压缩中间件
app.use(compression());

// 限流中间件
const limiter = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'), // 15分钟
  max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'), // 限制每个IP 15分钟内最多100个请求
  message: {
    success: false,
    message: '请求过于频繁，请稍后再试'
  }
});
app.use(limiter);

// 解析JSON请求体
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 静态文件服务
app.use('/uploads', express.static('uploads'));

// 健康检查
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: '服务器运行正常',
    timestamp: new Date().toISOString()
  });
});

// API路由
app.use('/api/auth', require('./routes/auth').default);

// 404处理
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    message: '请求的资源不存在'
  });
});

// 全局错误处理中间件
app.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('全局错误:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || '服务器内部错误'
  });
});

// 启动服务器
const startServer = async () => {
  try {
    // 连接数据库
    await connectDatabase();
    
    // 启动HTTP服务器
    app.listen(PORT, () => {
      logger.info(`🚀 服务器启动成功，端口: ${PORT}`);
      logger.info(`📊 健康检查: http://localhost:${PORT}/health`);
      logger.info(`🔗 API文档: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    logger.error('服务器启动失败:', error);
    process.exit(1);
  }
};

// 优雅关闭
process.on('SIGINT', async () => {
  logger.info('正在关闭服务器...');
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('正在关闭服务器...');
  await disconnectDatabase();
  process.exit(0);
});

// 启动服务器
startServer(); 