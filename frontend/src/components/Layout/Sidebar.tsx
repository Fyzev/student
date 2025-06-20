import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  BarChart3, 
  Calendar,
  FileText,
  Settings
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    {
      path: '/dashboard',
      icon: Home,
      label: '仪表盘',
    },
    {
      path: '/student-management',
      icon: Users,
      label: '学生管理',
    },
    {
      path: '/teacher-management',
      icon: GraduationCap,
      label: '教师管理',
    },
    {
      path: '/class-management',
      icon: BookOpen,
      label: '班级管理',
    },
    {
      path: '/course-management',
      icon: BookOpen,
      label: '课程管理',
    },
    {
      path: '/grade-management',
      icon: BarChart3,
      label: '成绩管理',
    },
    {
      path: '/attendance-management',
      icon: Calendar,
      label: '考勤管理',
    },
    {
      path: '/announcements',
      icon: FileText,
      label: '通知公告',
    },
    {
      path: '/system-settings',
      icon: Settings,
      label: '系统设置',
    },
  ];

  return (
    <aside className="fixed left-0 top-16 h-full w-64 bg-white shadow-sm border-r border-gray-200">
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar; 