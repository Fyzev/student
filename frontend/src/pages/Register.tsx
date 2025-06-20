import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlus, School } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '@/services/api';
import { RegisterForm } from '@/types';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        toast.success('注册成功！即将跳转到登录页面...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error: any) {
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(err.msg || '注册信息有误，请检查');
        });
      } else {
        const message = error.response?.data?.message || '注册失败，请重试';
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white mb-4">
            <School size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            创建新账户
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            加入学生管理系统，开启高效管理之旅
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                用户名
              </label>
              <input
                id="username"
                type="text"
                {...register('username', { 
                  required: '请输入用户名',
                  minLength: { value: 3, message: '用户名至少3个字符' },
                })}
                className="input"
                placeholder="例如：testuser"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                邮箱地址
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: '请输入邮箱地址',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: '请输入有效的邮箱地址'
                  }
                })}
                className="input"
                placeholder="例如：user@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                密码
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: '请输入密码',
                  minLength: { value: 6, message: '密码长度至少6个字符' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: '密码必须包含大小写字母和数字'
                  }
                })}
                className="input"
                placeholder="至少6位，含大小写字母和数字"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                确认密码
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: '请再次输入密码',
                  validate: value => value === password || '两次输入的密码不一致'
                })}
                className="input"
                placeholder="请再次输入密码"
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 mt-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>注册中...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus size={18} />
                    <span>立即注册</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              已经有账户了？{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                直接登录
              </button>
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-500">
          © 2024 学生管理系统. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register; 