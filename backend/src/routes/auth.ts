import { Router } from 'express';
import { register, login, getCurrentUser, validateRegister, validateLogin } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

// 用户注册
router.post('/register', validateRegister, register);

// 用户登录
router.post('/login', validateLogin, login);

// 获取当前用户信息
router.get('/me', authenticate, getCurrentUser);

export default router; 