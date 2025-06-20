import { Request } from 'express';

// 用户相关类型
export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// 学生相关类型
export interface Student {
  id: number;
  studentId: string;
  name: string;
  gender: Gender;
  birthDate: Date;
  phone?: string;
  address?: string;
  parentPhone?: string;
  parentName?: string;
  admissionDate: Date;
  graduationDate?: Date;
  status: StudentStatus;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  classId?: number;
  user: User;
  class?: Class;
}

export interface CreateStudentDto {
  studentId: string;
  name: string;
  gender: Gender;
  birthDate: Date;
  phone?: string;
  address?: string;
  parentPhone?: string;
  parentName?: string;
  admissionDate: Date;
  classId?: number;
  user: CreateUserDto;
}

export interface UpdateStudentDto {
  name?: string;
  gender?: Gender;
  birthDate?: Date;
  phone?: string;
  address?: string;
  parentPhone?: string;
  parentName?: string;
  graduationDate?: Date;
  status?: StudentStatus;
  avatar?: string;
  classId?: number;
}

// 教师相关类型
export interface Teacher {
  id: number;
  teacherId: string;
  name: string;
  gender: Gender;
  birthDate: Date;
  phone?: string;
  email?: string;
  address?: string;
  hireDate: Date;
  department: string;
  position: string;
  status: TeacherStatus;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
}

export interface CreateTeacherDto {
  teacherId: string;
  name: string;
  gender: Gender;
  birthDate: Date;
  phone?: string;
  email?: string;
  address?: string;
  hireDate: Date;
  department: string;
  position: string;
  user: CreateUserDto;
}

export interface UpdateTeacherDto {
  name?: string;
  gender?: Gender;
  birthDate?: Date;
  phone?: string;
  email?: string;
  address?: string;
  department?: string;
  position?: string;
  status?: TeacherStatus;
  avatar?: string;
}

// 班级相关类型
export interface Class {
  id: number;
  name: string;
  grade: string;
  description?: string;
  capacity: number;
  status: ClassStatus;
  createdAt: Date;
  updatedAt: Date;
  teacherId?: number;
  teacher?: Teacher;
  students: Student[];
  courses: Course[];
}

export interface CreateClassDto {
  name: string;
  grade: string;
  description?: string;
  capacity?: number;
  teacherId?: number;
}

export interface UpdateClassDto {
  name?: string;
  grade?: string;
  description?: string;
  capacity?: number;
  status?: ClassStatus;
  teacherId?: number;
}

// 课程相关类型
export interface Course {
  id: number;
  name: string;
  code: string;
  description?: string;
  credits: number;
  hours: number;
  status: CourseStatus;
  createdAt: Date;
  updatedAt: Date;
  teacherId?: number;
  classId?: number;
  teacher?: Teacher;
  class?: Class;
  enrollments: Enrollment[];
  grades: Grade[];
}

export interface CreateCourseDto {
  name: string;
  code: string;
  description?: string;
  credits?: number;
  hours?: number;
  teacherId?: number;
  classId?: number;
}

export interface UpdateCourseDto {
  name?: string;
  code?: string;
  description?: string;
  credits?: number;
  hours?: number;
  status?: CourseStatus;
  teacherId?: number;
  classId?: number;
}

// 选课相关类型
export interface Enrollment {
  id: number;
  status: EnrollmentStatus;
  createdAt: Date;
  updatedAt: Date;
  studentId: number;
  courseId: number;
  student: Student;
  course: Course;
}

export interface CreateEnrollmentDto {
  studentId: number;
  courseId: number;
}

export interface UpdateEnrollmentDto {
  status?: EnrollmentStatus;
}

// 成绩相关类型
export interface Grade {
  id: number;
  score: number;
  type: GradeType;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  studentId: number;
  courseId: number;
  student: Student;
  course: Course;
}

export interface CreateGradeDto {
  score: number;
  type: GradeType;
  comment?: string;
  studentId: number;
  courseId: number;
}

export interface UpdateGradeDto {
  score?: number;
  type?: GradeType;
  comment?: string;
}

// 考勤相关类型
export interface Attendance {
  id: number;
  date: Date;
  status: AttendanceStatus;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
  studentId: number;
  teacherId?: number;
  student: Student;
  teacher?: Teacher;
}

export interface CreateAttendanceDto {
  date: Date;
  status: AttendanceStatus;
  reason?: string;
  studentId: number;
  teacherId?: number;
}

export interface UpdateAttendanceDto {
  date?: Date;
  status?: AttendanceStatus;
  reason?: string;
  teacherId?: number;
}

// 通知相关类型
export interface Notice {
  id: number;
  title: string;
  content: string;
  type: NoticeType;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoticeDto {
  title: string;
  content: string;
  type?: NoticeType;
  isPublished?: boolean;
}

export interface UpdateNoticeDto {
  title?: string;
  content?: string;
  type?: NoticeType;
  isPublished?: boolean;
}

// 日志相关类型
export interface Log {
  id: number;
  level: LogLevel;
  message: string;
  details?: string;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
  userId?: number;
  user?: User;
}

export interface CreateLogDto {
  level: LogLevel;
  message: string;
  details?: string;
  ip?: string;
  userAgent?: string;
  userId?: number;
}

// 字符串字面量类型定义（替代枚举）
export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type StudentStatus = 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'DROPOUT';

export type TeacherStatus = 'ACTIVE' | 'INACTIVE' | 'RETIRED';

export type ClassStatus = 'ACTIVE' | 'INACTIVE' | 'GRADUATED';

export type CourseStatus = 'ACTIVE' | 'INACTIVE';

export type EnrollmentStatus = 'ACTIVE' | 'DROPPED';

export type GradeType = 'MIDTERM' | 'FINAL' | 'ASSIGNMENT' | 'QUIZ';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

export type NoticeType = 'GENERAL' | 'ACADEMIC' | 'ADMINISTRATIVE' | 'EMERGENCY';

export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: any;
}

// JWT相关类型
export interface JwtPayload {
  userId: number;
  username: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// 扩展Request接口
export interface AuthenticatedRequest extends Request {
  user?: User;
} 