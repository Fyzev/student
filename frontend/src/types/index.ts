// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// 用户相关类型
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

// 学生相关类型
export interface Student {
  id: number;
  student_id: string;
  name: string;
  gender: 'male' | 'female';
  date_of_birth: string;
  phone: string;
  email: string;
  address: string;
  class_id: number;
  enrollment_date: string;
  status: 'active' | 'inactive' | 'graduated';
  created_at: string;
  updated_at: string;
  class?: Class;
}

export interface CreateStudentForm {
  student_id: string;
  name: string;
  gender: 'male' | 'female';
  date_of_birth: string;
  phone: string;
  email: string;
  address: string;
  class_id: number;
}

export interface UpdateStudentForm extends Partial<CreateStudentForm> {
  status?: 'active' | 'inactive' | 'graduated';
}

// 教师相关类型
export interface Teacher {
  id: number;
  teacher_id: string;
  name: string;
  gender: 'male' | 'female';
  phone: string;
  email: string;
  department: string;
  position: string;
  hire_date: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface CreateTeacherForm {
  teacher_id: string;
  name: string;
  gender: 'male' | 'female';
  phone: string;
  email: string;
  department: string;
  position: string;
  hire_date: string;
}

export interface UpdateTeacherForm extends Partial<CreateTeacherForm> {
  status?: 'active' | 'inactive';
}

// 班级相关类型
export interface Class {
  id: number;
  name: string;
  grade: string;
  academic_year: string;
  teacher_id: number;
  capacity: number;
  current_students: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  teacher?: Teacher;
  students?: Student[];
}

export interface CreateClassForm {
  name: string;
  grade: string;
  academic_year: string;
  teacher_id: number;
  capacity: number;
}

export interface UpdateClassForm extends Partial<CreateClassForm> {
  status?: 'active' | 'inactive';
}

// 课程相关类型
export interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  credits: number;
  teacher_id: number;
  semester: string;
  academic_year: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  teacher?: Teacher;
}

export interface CreateCourseForm {
  code: string;
  name: string;
  description: string;
  credits: number;
  teacher_id: number;
  semester: string;
  academic_year: string;
}

export interface UpdateCourseForm extends Partial<CreateCourseForm> {
  status?: 'active' | 'inactive';
}

// 选课相关类型
export interface Enrollment {
  id: number;
  student_id: number;
  course_id: number;
  enrollment_date: string;
  status: 'enrolled' | 'dropped' | 'completed';
  created_at: string;
  updated_at: string;
  student?: Student;
  course?: Course;
}

export interface CreateEnrollmentForm {
  student_id: number;
  course_id: number;
}

export interface UpdateEnrollmentForm {
  status: 'enrolled' | 'dropped' | 'completed';
}

// 成绩相关类型
export interface Grade {
  id: number;
  student_id: number;
  course_id: number;
  score: number;
  grade: string;
  semester: string;
  academic_year: string;
  exam_date: string;
  created_at: string;
  updated_at: string;
  student?: Student;
  course?: Course;
}

export interface CreateGradeForm {
  student_id: number;
  course_id: number;
  score: number;
  semester: string;
  academic_year: string;
  exam_date: string;
}

export interface UpdateGradeForm extends Partial<CreateGradeForm> {
  grade?: string;
}

// 考勤相关类型
export interface Attendance {
  id: number;
  student_id: number;
  course_id: number;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  created_at: string;
  updated_at: string;
  student?: Student;
  course?: Course;
}

export interface CreateAttendanceForm {
  student_id: number;
  course_id: number;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface UpdateAttendanceForm extends Partial<CreateAttendanceForm> {}

// 通知相关类型
export interface Notice {
  id: number;
  title: string;
  content: string;
  type: 'announcement' | 'notice' | 'event';
  priority: 'low' | 'medium' | 'high';
  author_id: number;
  target_audience: 'all' | 'students' | 'teachers' | 'admins';
  publish_date: string;
  expiry_date?: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  author?: User;
}

export interface CreateNoticeForm {
  title: string;
  content: string;
  type: 'announcement' | 'notice' | 'event';
  priority: 'low' | 'medium' | 'high';
  target_audience: 'all' | 'students' | 'teachers' | 'admins';
  publish_date: string;
  expiry_date?: string;
}

export interface UpdateNoticeForm extends Partial<CreateNoticeForm> {
  status?: 'draft' | 'published' | 'archived';
}

// 分页类型
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
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

// 统计类型
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalCourses: number;
  attendanceRate: number;
  averageGrade: number;
}

// 文件上传类型
export interface FileUpload {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  path: string;
  uploaded_by: number;
  created_at: string;
  uploaded_by_user?: User;
}

// 系统设置类型
export interface SystemSettings {
  id: number;
  key: string;
  value: string;
  description: string;
  updated_at: string;
}

// 日志类型
export interface SystemLog {
  id: number;
  user_id: number;
  action: string;
  resource: string;
  resource_id?: number;
  details?: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
  user?: User;
} 