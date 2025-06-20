import * as React from 'react';
import { Users, BookOpen, GraduationCap, Calendar, TrendingUp, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  // 模拟数据
  const stats = [
    {
      title: '总学生数',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: '总教师数',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: GraduationCap,
      color: 'bg-green-500',
    },
    {
      title: '总课程数',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: BookOpen,
      color: 'bg-purple-500',
    },
    {
      title: '今日出勤率',
      value: '95.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Activity,
      color: 'bg-orange-500',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'student',
      message: '张三同学完成了数学作业',
      time: '2分钟前',
    },
    {
      id: 2,
      type: 'teacher',
      message: '李老师发布了新的课程通知',
      time: '15分钟前',
    },
    {
      id: 3,
      type: 'grade',
      message: '英语期中考试成绩已录入',
      time: '1小时前',
    },
    {
      id: 4,
      type: 'attendance',
      message: '王五同学请假申请已批准',
      time: '2小时前',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
        <p className="text-gray-600">欢迎回来！这里是系统概览。</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">较上月</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 图表和活动区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 图表区域 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">学生成绩趋势</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">
                  本周
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                  本月
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                  本学期
                </button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">图表区域</p>
                <p className="text-sm text-gray-400">这里将显示成绩趋势图表</p>
              </div>
            </div>
          </div>
        </div>

        {/* 最近活动 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">最近活动</h3>
            <button className="text-sm text-blue-600 hover:text-blue-500">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">添加学生</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
            <GraduationCap className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">添加教师</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
            <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">创建课程</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
            <Calendar className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">考勤管理</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 