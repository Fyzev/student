import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../utils/auth';
import { UserRole } from '../types';
import prisma from '../utils/database';

// 扩展Request接口
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// 认证中间件
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      res.status(401).json({
        success: false,
        message: '访问令牌缺失'
      });
      return;
    }

    const payload = verifyToken(token);
    if (!payload) {
      res.status(401).json({
        success: false,
        message: '无效的访问令牌'
      });
      return;
    }

    // 从数据库获取用户信息
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true
      }
    });

    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: '用户不存在或已被禁用'
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '认证过程中发生错误'
    });
  }
};

// 角色验证中间件
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: '用户未认证'
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: '权限不足'
      });
      return;
    }

    next();
  };
};

// 管理员权限中间件
export const requireAdmin = authorize('ADMIN');

// 教师权限中间件
export const requireTeacher = authorize('TEACHER', 'ADMIN');

// 学生权限中间件
export const requireStudent = authorize('STUDENT', 'TEACHER', 'ADMIN'); 