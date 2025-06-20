import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/database';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { CreateUserDto, LoginDto, User } from '../types';

// 用户注册
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // 验证请求数据
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: '请求数据验证失败',
        errors: errors.array()
      });
      return;
    }

    const { username, email, password, role = 'STUDENT' }: CreateUserDto = req.body;

    // 检查用户名是否已存在
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: '用户名或邮箱已存在'
      });
      return;
    }

    // 加密密码
    const hashedPassword = await hashPassword(password);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // 生成JWT令牌
    const token = generateToken(user as User);

    res.status(201).json({
      success: true,
      message: '用户注册成功',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({
      success: false,
      message: '注册过程中发生错误'
    });
  }
};

// 用户登录
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // 验证请求数据
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: '请求数据验证失败',
        errors: errors.array()
      });
      return;
    }

    const { username, password }: LoginDto = req.body;

    // 查找用户
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email: username }
        ]
      }
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
      return;
    }

    // 验证密码
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
      return;
    }

    // 检查用户状态
    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: '账户已被禁用'
      });
      return;
    }

    // 生成JWT令牌
    const token = generateToken(user as User);

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: '登录成功',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({
      success: false,
      message: '登录过程中发生错误'
    });
  }
};

// 获取当前用户信息
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: '用户未认证'
      });
      return;
    }

    res.json({
      success: true,
      message: '获取用户信息成功',
      data: req.user
    });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({
      success: false,
      message: '获取用户信息过程中发生错误'
    });
  }
};

// 验证注册数据
export const validateRegister = [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('用户名长度必须在3-20个字符之间')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('用户名只能包含字母、数字和下划线'),
  body('email')
    .isEmail()
    .withMessage('请输入有效的邮箱地址'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('密码长度至少6个字符')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('密码必须包含大小写字母和数字'),
  body('role')
    .optional()
    .isIn(['ADMIN', 'TEACHER', 'STUDENT'])
    .withMessage('无效的用户角色')
];

// 验证登录数据
export const validateLogin = [
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空'),
  body('password')
    .notEmpty()
    .withMessage('密码不能为空')
]; 