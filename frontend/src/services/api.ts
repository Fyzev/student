import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types';

// 创建axios实例
const api: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config: any) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error: any) => {
    // 处理401错误
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API方法
export const authAPI = {
  // 用户登录
  login: (data: { username: string; password: string }) =>
    api.post<ApiResponse<{ user: any; token: string }>>('/auth/login', data),

  // 用户注册
  register: (data: { username: string; email: string; password: string; role?: string }) =>
    api.post<ApiResponse<{ user: any; token: string }>>('/auth/register', data),

  // 获取当前用户信息
  getCurrentUser: () => api.get<ApiResponse<any>>('/auth/me'),
};

export const studentsAPI = {
  // 获取学生列表
  getStudents: (params?: any) => api.get<ApiResponse<any[]>>('/students', { params }),

  // 获取单个学生
  getStudent: (id: number) => api.get<ApiResponse<any>>(`/students/${id}`),

  // 创建学生
  createStudent: (data: any) => api.post<ApiResponse<any>>('/students', data),

  // 更新学生
  updateStudent: (id: number, data: any) => api.put<ApiResponse<any>>(`/students/${id}`, data),

  // 删除学生
  deleteStudent: (id: number) => api.delete<ApiResponse<void>>(`/students/${id}`),
};

export const teachersAPI = {
  // 获取教师列表
  getTeachers: (params?: any) => api.get<ApiResponse<any[]>>('/teachers', { params }),

  // 获取单个教师
  getTeacher: (id: number) => api.get<ApiResponse<any>>(`/teachers/${id}`),

  // 创建教师
  createTeacher: (data: any) => api.post<ApiResponse<any>>('/teachers', data),

  // 更新教师
  updateTeacher: (id: number, data: any) => api.put<ApiResponse<any>>(`/teachers/${id}`, data),

  // 删除教师
  deleteTeacher: (id: number) => api.delete<ApiResponse<void>>(`/teachers/${id}`),
};

export const classesAPI = {
  // 获取班级列表
  getClasses: (params?: any) => api.get<ApiResponse<any[]>>('/classes', { params }),

  // 获取单个班级
  getClass: (id: number) => api.get<ApiResponse<any>>(`/classes/${id}`),

  // 创建班级
  createClass: (data: any) => api.post<ApiResponse<any>>('/classes', data),

  // 更新班级
  updateClass: (id: number, data: any) => api.put<ApiResponse<any>>(`/classes/${id}`, data),

  // 删除班级
  deleteClass: (id: number) => api.delete<ApiResponse<void>>(`/classes/${id}`),
};

export const coursesAPI = {
  // 获取课程列表
  getCourses: (params?: any) => api.get<ApiResponse<any[]>>('/courses', { params }),

  // 获取单个课程
  getCourse: (id: number) => api.get<ApiResponse<any>>(`/courses/${id}`),

  // 创建课程
  createCourse: (data: any) => api.post<ApiResponse<any>>('/courses', data),

  // 更新课程
  updateCourse: (id: number, data: any) => api.put<ApiResponse<any>>(`/courses/${id}`, data),

  // 删除课程
  deleteCourse: (id: number) => api.delete<ApiResponse<void>>(`/courses/${id}`),
};

export const enrollmentsAPI = {
  // 获取选课列表
  getEnrollments: (params?: any) => api.get<ApiResponse<any[]>>('/enrollments', { params }),

  // 创建选课
  createEnrollment: (data: any) => api.post<ApiResponse<any>>('/enrollments', data),

  // 更新选课状态
  updateEnrollment: (id: number, data: any) => api.put<ApiResponse<any>>(`/enrollments/${id}`, data),

  // 删除选课
  deleteEnrollment: (id: number) => api.delete<ApiResponse<void>>(`/enrollments/${id}`),
};

export const gradesAPI = {
  // 获取成绩列表
  getGrades: (params?: any) => api.get<ApiResponse<any[]>>('/grades', { params }),

  // 获取单个成绩
  getGrade: (id: number) => api.get<ApiResponse<any>>(`/grades/${id}`),

  // 创建成绩
  createGrade: (data: any) => api.post<ApiResponse<any>>('/grades', data),

  // 更新成绩
  updateGrade: (id: number, data: any) => api.put<ApiResponse<any>>(`/grades/${id}`, data),

  // 删除成绩
  deleteGrade: (id: number) => api.delete<ApiResponse<void>>(`/grades/${id}`),
};

export const attendanceAPI = {
  // 获取考勤列表
  getAttendances: (params?: any) => api.get<ApiResponse<any[]>>('/attendances', { params }),

  // 获取单个考勤
  getAttendance: (id: number) => api.get<ApiResponse<any>>(`/attendances/${id}`),

  // 创建考勤
  createAttendance: (data: any) => api.post<ApiResponse<any>>('/attendances', data),

  // 更新考勤
  updateAttendance: (id: number, data: any) => api.put<ApiResponse<any>>(`/attendances/${id}`, data),

  // 删除考勤
  deleteAttendance: (id: number) => api.delete<ApiResponse<void>>(`/attendances/${id}`),
};

export const noticesAPI = {
  // 获取通知列表
  getNotices: (params?: any) => api.get<ApiResponse<any[]>>('/notices', { params }),

  // 获取单个通知
  getNotice: (id: number) => api.get<ApiResponse<any>>(`/notices/${id}`),

  // 创建通知
  createNotice: (data: any) => api.post<ApiResponse<any>>('/notices', data),

  // 更新通知
  updateNotice: (id: number, data: any) => api.put<ApiResponse<any>>(`/notices/${id}`, data),

  // 删除通知
  deleteNotice: (id: number) => api.delete<ApiResponse<void>>(`/notices/${id}`),
};

export default api; 