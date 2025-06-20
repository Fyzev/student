import * as React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const [user] = React.useState(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-900">学生管理系统</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* 通知 */}
        <button className="p-2 text-gray-400 hover:text-gray-600 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>
        
        {/* 用户菜单 */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {user?.username || '用户'}
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-gray-600"
            title="退出登录"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 