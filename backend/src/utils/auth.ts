import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, JwtPayload } from '../types';

// 密码加密
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = parseInt(process.env['BCRYPT_ROUNDS'] || '12');
  return bcrypt.hash(password, saltRounds);
};

// 密码验证
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// 生成JWT令牌
export const generateToken = (user: User): string => {
  const payload: JwtPayload = {
    userId: user.id,
    username: user.username,
    role: user.role
  };

  const secret = process.env['JWT_SECRET'] || 'your-secret-key';
  const expiresIn = process.env['JWT_EXPIRES_IN'] || '7d';

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

// 验证JWT令牌
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const secret = process.env['JWT_SECRET'] || 'your-secret-key';
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    return null;
  }
};

// 从请求头提取令牌
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}; 