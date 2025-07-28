export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  schoolId: string;
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

export interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  adminId: string;
  logo?: string;
  createdAt: string;
  isActive: boolean;
}

export interface Staff extends User {
  staffType: 'teacher' | 'non-teacher';
  department?: string;
  subjects?: string[];
  employeeId: string;
}

export interface Student extends User {
  studentId: string;
  grade: string;
  parentIds: string[];
  dateOfBirth: string;
  emergencyContact: string;
}

export interface Parent extends User {
  childrenIds: string[];
  occupation?: string;
  phone: string;
}

export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'parent';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  schoolId?: string;
}