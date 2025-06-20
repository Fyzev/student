import winston from 'winston';

// 创建日志记录器
const logger = winston.createLogger({
  level: process.env['LOG_LEVEL'] || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'student-management-api' },
  transports: [
    // 写入所有日志到文件
    new winston.transports.File({ 
      filename: process.env['LOG_FILE'] || 'logs/app.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // 写入错误日志到文件
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ],
});

// 在开发环境下同时输出到控制台
if (process.env['NODE_ENV'] === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger; 